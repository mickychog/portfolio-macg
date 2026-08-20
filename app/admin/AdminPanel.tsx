"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import type { ManagedItem } from "@/lib/portfolio-data";

type AdminItem = ManagedItem & { id: number; published?: boolean; sortOrder?: number };

export function AdminPanel() {
  const [items, setItems] = useState<AdminItem[]>([]);
  const [status, setStatus] = useState("Cargando contenido…");

  const load = async () => {
    const response = await fetch("/api/admin/content");
    if (!response.ok) { setStatus("No se pudo cargar el contenido."); return; }
    const data = (await response.json()) as { items: AdminItem[] };
    setItems(data.items); setStatus(data.items.length ? "" : "Aún no añadiste contenido desde el panel.");
  };

  useEffect(() => {
    let active = true;
    void fetch("/api/admin/content").then(async (response) => {
      if (!active) return;
      if (!response.ok) { setStatus("No se pudo cargar el contenido."); return; }
      const data = (await response.json()) as { items: AdminItem[] };
      setItems(data.items);
      setStatus(data.items.length ? "" : "Aún no añadiste contenido desde el panel.");
    });
    return () => { active = false; };
  }, []);

  const create = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("Guardando…");
    let fileKey: string | null = null;
    const certificateImage = data.get("certificateImage");
    if (certificateImage instanceof File && certificateImage.size > 0) {
      const uploadData = new FormData();
      uploadData.set("file", certificateImage);
      const uploadResponse = await fetch("/api/admin/media", { method: "POST", body: uploadData });
      if (!uploadResponse.ok) { setStatus("No se pudo cargar la imagen. Usa JPG, PNG o WebP de hasta 6 MB."); return; }
      const upload = (await uploadResponse.json()) as { key: string };
      fileKey = upload.key;
    }
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type: data.get("type"), title: data.get("title"), organization: data.get("organization"),
        period: data.get("period"), summary: data.get("summary"), category: data.get("category"),
        titleEn: String(data.get("titleEn") ?? "").trim() || null,
        organizationEn: String(data.get("organizationEn") ?? "").trim() || null,
        periodEn: String(data.get("periodEn") ?? "").trim() || null,
        summaryEn: String(data.get("summaryEn") ?? "").trim() || null,
        tags: String(data.get("tags") ?? "").split(",").map((tag) => tag.trim()).filter(Boolean),
        credentialUrl: String(data.get("credentialUrl") ?? "").trim() || null,
        fileKey,
        published: data.get("published") === "on", sortOrder: Number(data.get("sortOrder") ?? 0),
      }),
    });
    if (!response.ok) { setStatus("Revisa los datos. No se pudo guardar."); return; }
    form.reset(); setStatus("Contenido añadido correctamente."); await load();
  };

  const togglePublished = async (item: AdminItem) => {
    await fetch("/api/admin/content", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: item.id, data: { published: !item.published } }) });
    await load();
  };

  const remove = async (item: AdminItem) => {
    if (!window.confirm(`¿Eliminar “${item.title}”?`)) return;
    await fetch(`/api/admin/content?id=${item.id}`, { method: "DELETE" });
    await load();
  };

  return (
    <main className="admin-shell">
      <header className="admin-header"><div><p className="section-index">Portfolio CMS</p><h1>Gestionar contenido</h1><p>Añade proyectos, experiencia, cursos, certificados y charlas sin modificar código. Español es obligatorio; inglés es opcional y usará español como respaldo.</p></div><Link className="secondary-button" href="/">Ver portafolio ↗</Link></header>
      <div className="admin-grid">
        <form className="admin-form" onSubmit={create}>
          <h2>Nuevo elemento</h2>
          <div className="form-row"><label>Tipo<select name="type" required><option value="experience">Experiencia</option><option value="project">Proyecto</option><option value="course">Curso</option><option value="certificate">Certificado</option><option value="talk">Charla</option></select></label><label>Categoría<select name="category"><option>Full Stack</option><option>Frontend</option><option>Backend</option><option>IA y datos</option><option>Cloud & DevOps</option></select></label></div>
          <fieldset className="language-fields"><legend>Español · obligatorio</legend><label>Título<input name="title" required minLength={2} /></label><label>Organización<input name="organization" /></label><label>Periodo<input name="period" placeholder="Ene 2026 — Actualidad" /></label><label>Descripción<textarea name="summary" required minLength={10} rows={5} /></label></fieldset>
          <fieldset className="language-fields"><legend>English · optional</legend><label>Title<input name="titleEn" minLength={2} /></label><label>Organization<input name="organizationEn" /></label><label>Period<input name="periodEn" placeholder="Jan 2026 — Present" /></label><label>Description<textarea name="summaryEn" rows={5} /></label><span className="field-hint">Si dejas un campo vacío, el sitio mostrará la versión en español.</span></fieldset>
          <label>Tecnologías o etiquetas<input name="tags" placeholder="Angular, NestJS, PostgreSQL, Docker" /></label><label>Enlace de verificación<input name="credentialUrl" type="url" placeholder="https://…" /></label><label>Imagen del certificado<input name="certificateImage" type="file" accept="image/jpeg,image/png,image/webp" /><span className="field-hint">JPG, PNG o WebP · máximo 6 MB. El original no se publica.</span></label>
          <div className="form-row"><label>Orden<input name="sortOrder" type="number" min="0" defaultValue="0" /></label><label className="check-label"><input name="published" type="checkbox" defaultChecked /> Publicado</label></div>
          <button className="primary-button" type="submit">Guardar contenido</button><p className="form-status" aria-live="polite">{status}</p>
        </form>
        <section className="admin-list" aria-labelledby="content-list-title"><div className="admin-list-heading"><h2 id="content-list-title">Contenido</h2><span>{items.length} elementos</span></div>{items.map((item) => { const translated = Boolean(item.titleEn?.trim() && item.summaryEn?.trim()); return <article key={item.id}><div><span className="category">{item.type} · {item.category}</span><h3>{item.title}</h3><p>{item.organization} {item.period && `· ${item.period}`}</p><span className={`translation-badge ${translated ? "complete" : "pending"}`}>{translated ? "ES · EN completo" : "Traducción EN pendiente"}</span></div><div className="admin-item-actions"><button type="button" onClick={() => togglePublished(item)}>{item.published ? "Ocultar" : "Publicar"}</button><button className="danger" type="button" onClick={() => remove(item)}>Eliminar</button></div></article>; })}</section>
      </div>
    </main>
  );
}
