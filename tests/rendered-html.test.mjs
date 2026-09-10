import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("builds the portfolio with its core identity and production entrypoint", async () => {
  const [portfolio, data] = await Promise.all([
    readFile(new URL("../app/components/Portfolio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/portfolio-data.ts", import.meta.url), "utf8"),
    access(new URL("../.next", import.meta.url)),
  ]);
  assert.match(portfolio, /Miguel Angel/);
  assert.match(data, /Ingeniero en Ciencias de la Computación e Ingeniero Electrónico/);
  assert.match(data, /Full Stack/);
  assert.match(data, /Cloud & DevOps/);
  assert.match(data, /Proyectos seleccionados/);
  assert.match(data, /Lo que aporto al equipo/);
  assert.match(data, /Compartir lo aprendido también es construir/);
  assert.match(data, /Construyamos algo sólido/);
  assert.match(portfolio, /wa\.me\/59172084428/);
  assert.match(portfolio, /onDialogClose|certificate-dialog/);
  assert.match(portfolio, /approach-step-head|card-corner-icon/);
  assert.doesNotMatch(portfolio, /0[1-7] \/ (Stack|Sobre|Trabajo|Trayectoria|Aprendizaje|Charlas|Contacto)/);
  assert.match(data, /"image" \| "pdf" \| "embed"/);
  assert.doesNotMatch(portfolio, /managedItems|\/api\/admin|\/api\/media/);
  assert.doesNotMatch(portfolio, /codex-preview|SkeletonPreview|Your site is taking shape/);
});
