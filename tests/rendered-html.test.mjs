import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("builds the portfolio with its core identity and production entrypoint", async () => {
  const [portfolio, data] = await Promise.all([
    readFile(new URL("../app/components/Portfolio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/portfolio-data.ts", import.meta.url), "utf8"),
    access(new URL("../dist/server/index.js", import.meta.url)),
  ]);
  assert.match(portfolio, /Miguel Angel/);
  assert.match(data, /Ingeniero en Ciencias de la Computación e Ingeniero Electrónico/);
  assert.match(data, /Full Stack/);
  assert.match(data, /Cloud & DevOps/);
  assert.match(data, /Proyectos seleccionados/);
  assert.match(data, /Lo que aporto al equipo/);
  assert.match(data, /Compartir lo aprendido también es construir/);
  assert.match(data, /Construyamos algo sólido/);
  assert.doesNotMatch(portfolio, /codex-preview|SkeletonPreview|Your site is taking shape/);
});
