# Borrador Claude — Maqueta "solo Records"

Esta carpeta es una **copia de la maqueta web de Mandioca Records** que vive en el
proyecto "Mandioca Design System" de claude.ai/design (snapshot del 2026-07-14).
Existe solo en la rama `borrador_claude` — **no es código de producción** y nunca
se mergea a `main`. El sitio real se construye en `apps/web/` (Next.js).

## Para verla (diseñador 👋)

**Opción A — online, sin instalar nada:**
abrir este link en el navegador (sirve los archivos de esta rama tal cual):

> https://raw.githack.com/t0rtu-ga/mandioca/borrador_claude/borrador_claude/ui_kits/web/records.html

**Opción B — local:** descargar el repo (botón verde *Code → Download ZIP* eligiendo
la rama `borrador_claude`), y servir esta carpeta con cualquier server estático,
por ejemplo:

```bash
cd borrador_claude
python3 -m http.server 8000
# → http://localhost:8000/ui_kits/web/records.html
```

Abrir el archivo con doble click (file://) **no funciona**: la página carga sus
scripts JSX por red y el navegador lo bloquea sin un servidor.

## Qué contiene

```
borrador_claude/
├── ui_kits/web/records.html   ← LA PÁGINA (variante solo-Records)
├── ui_kits/web/site.jsx       ← Nav, Hero, Services, Roster, Footer + contenido
├── ui_kits/web/tweaks-panel.jsx
├── _ds_bundle.js              ← componentes del DS compilados (Button, Card, Lockup…)
├── styles.css                 ← entrada global (importa los tokens)
├── tokens/                    ← colores, tipografías, spacing del manual de marca
└── assets/                    ← logos mark-records-* e ilustraciones
```

La página usa React + Babel por CDN (necesita internet). Es un patrón válido
**solo para prototipos** — jamás en producción.

## Notas de fidelidad (importante)

- El límite de lectura de la herramienta truncó algunos archivos grandes al
  copiarlos. Se resolvió así:
  - `_ds_bundle.js`: se conservaron los **10 componentes completos** y se
    recortaron secciones extra (overlay de YouTube, posts sociales) que esta
    página no usa. Sintaxis verificada con Node.
  - Las 4 ilustraciones grandes (`guitarrista-1`, `el-pibe-*`, foto `mama-*`)
    se tomaron **completas del zip** "Mandioca Design System.zip" (Downloads);
    las dos ilustraciones que sí se pudieron leer directo del proyecto pesan
    byte-a-byte lo mismo que en el zip, o sea que no cambiaron desde entonces.
  - `mark-records-black/cream.svg` se generaron desde el `mark-records-yellow.svg`
    del repo sustituyendo el color de relleno (los tres comparten paths idénticos).
- No se incluyó la variante dual Records/Academy (`index.html`) ni los assets de
  Academy: esta rama es específicamente la maqueta de la Fase 1 (solo Records).

## Flujo de trabajo acordado

1. El diseñador revisa esta maqueta y da feedback.
2. Las correcciones acordadas se implementan directamente en `apps/web/` (main),
   ya como código real de Next.js.
3. Si la maqueta de claude.ai/design cambia fuerte, se vuelve a snapshotear esta
   carpeta en esta misma rama.
