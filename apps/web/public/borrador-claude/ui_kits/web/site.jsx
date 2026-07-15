/* Mandioca · Web UI Kit — interactive marketing site
   Sections: Nav, Hero, Services, Roster/Courses, Footer.
   Toggles between the two sub-brands (Records / Academy). */

const { useState } = React;
const { useTweaks: useTw, TweaksPanel: TwPanel, TweakSection: TwSection, TweakRadio: TwRadio, TweakColor: TwColor } = window;
const DS = window.MandiocaDesignSystem_109ebd;
const { Button, Badge, Card, Eyebrow, MixedTitle, Lockup, Avatar, Input } = DS;

const ASSET = "../../assets";

/* ---- per-brand content model ---------------------------------- */
const BRANDS = {
  records: {
    label: "records",
    accent: "var(--amarillo-500)",
    onAccent: "var(--negro-500)",
    eyebrow: "Sello discográfico",
    heroTitle: "Esto no es una productora normal",
    heroBody:
      "Impulsamos la democratización del arte y acompañamos al artista de principio a fin en su proceso de creación.",
    heroIllo: `${ASSET}/illustrations/guitarrista-1.svg`,
    ctaPrimary: "Postula tu proyecto",
    ctaSecondary: "Escucha el roster",
    services: [
      { t: "Mezcla", d: "Suena como tus ídolos musicales.", p: "desde $40", tone: "yellow" },
      { t: "Mastering", d: "Tu canción lista para sonar bien en la radio.", p: "desde $30", tone: "purple" },
      { t: "Asesorías", d: "Aprende a proteger tu trabajo, recibir tus regalías y a moverte en el mundo de la música.", p: "1:1", tone: "blue" },
      { t: "Plantillas", d: "¿Los contratos musicales te agobian? Tranquilo, esto ya vienen listos para firmar.", p: "pack", tone: "red" },
    ],
    rosterTitle: "El roster",
    roster: [
      { n: "La Tortuga Eléctrica", g: "Rock latino", tone: "yellow" },
      { n: "Camila Sur", g: "Cantautora", tone: "purple" },
      { n: "Barrio Vinilo", g: "Cumbia psicodélica", tone: "red" },
    ],
  },
  academy: {
    label: "academy",
    accent: "var(--verde-500)",
    onAccent: "#ffffff",
    eyebrow: "Academia de música",
    heroTitle: "Esto no es cualquier academia de música",
    heroBody:
      "Bienvenido a la casa del artista independiente, el único lugar al que tendrás que acudir para vivir de tu arte sin morir en el intento.",
    heroIllo: `${ASSET}/illustrations/musica-para-llevar.svg`,
    ctaPrimary: "Explora las rutas de aprendizaje",
    ctaSecondary: "Clase de prueba",
    services: [
      { t: "Producción de audio", d: "Ya tienes tu canción, ahora hay que inmortalizarla.", p: "", tone: "green", route: ["Producción de audio"] },
      { t: "Mezcla & Mastering", d: "No dejes que lo técnico interfiera con lo artístico.", p: "", tone: "blue", route: ["Mezcla & Mastering"] },
      { t: "Instrumentos", d: "Guitarra, bajo, teclado, batería y muchos más. ¿Cuál es tu favorito?", p: "", tone: "purple", route: ["Guitarra", "Bajo", "Batería", "Teclado", "Voz"] },
      { t: "Negocio musical", d: "Vive de tu música sin morir en el intento.", p: "", tone: "yellow", route: ["Negocio musical"] },
    ],
    rosterTitle: "Cursos en vivo",
    roster: [
      { n: "Tablaturas Latinas", g: "YouTube · gratis", tone: "green" },
      { n: "Home Studio 101", g: "Producción", tone: "blue" },
      { n: "Voz & Afinación", g: "Performance", tone: "purple" },
    ],
  },
  design: {
    label: "design",
    accent: "var(--rojo-500)",
    onAccent: "#ffffff",
    eyebrow: "Estudio de diseño",
    heroTitle: "Esto no es un estudio de diseño cualquiera",
    heroBody:
      "Identidad, portadas y dirección de arte para sellos, artistas y marcas que quieren sonar tan bien como se ven.",
    heroIllo: null,
    heroIcons: ["palette", "pen-tool", "layout-template"],
    ctaPrimary: "Cuéntanos tu proyecto",
    ctaSecondary: "Ve el portafolio",
    services: [
      { t: "Identidad de marca", d: "Logo, sistema visual y guía de uso para tu proyecto.", p: "", tone: "red" },
      { t: "Portadas & Arte", d: "Carátulas, singles y visuales para cada lanzamiento.", p: "", tone: "purple" },
      { t: "Dirección de arte", d: "Fotografía, video y estética para tu proyecto integral.", p: "", tone: "blue" },
      { t: "Diseño web", d: "Sitios y tiendas a la medida de artistas y sellos.", p: "", tone: "yellow" },
    ],
    rosterTitle: "Proyectos destacados",
    roster: [
      { n: "Barrio Vinilo — EP", g: "Identidad + portada", tone: "red" },
      { n: "Camila Sur", g: "Marca personal", tone: "purple" },
      { n: "Mandioca Records", g: "Sitio web", tone: "yellow" },
    ],
  },
};

function Icon({ name, size = 18, color = "currentColor", style = {} }) {
  return <i key={name} data-lucide={name} style={{ width: size, height: size, color, ...style }}></i>;
}

/* ---- NAV ------------------------------------------------------ */
const COURSE_MENU = [
  { label: "Todos los cursos", filter: [] },
  { label: "Producción de audio", filter: ["Producción de audio"] },
  { label: "Ingeniería de sonido", filter: ["Ingeniería de sonido"] },
  { label: "Mezcla & Mastering", filter: ["Mezcla & Mastering"] },
  { label: "Instrumentos", sub: ["Guitarra", "Bajo", "Batería", "Teclado", "Voz"] },
  { label: "Negocio musical", filter: ["Negocio musical"] },
];

function MenuItem({ label, icon, tone, caret, onClick, onMouseEnter, index = 0 }) {
  const [h, setH] = useState(false);
  const fg = onToneFg(tone);
  const rightIcon = caret || "arrow-right";
  const rightShown = caret ? true : h;
  return (
    <button onClick={onClick}
      onMouseEnter={(e) => { setH(true); onMouseEnter && onMouseEnter(e); }}
      onMouseLeave={() => setH(false)}
      style={{
        position: "relative", overflow: "hidden", width: "100%", textAlign: "left",
        display: "flex", alignItems: "center", gap: 11, padding: "8px 12px 8px 14px",
        border: "none", background: h ? "var(--blanco-200)" : "transparent", cursor: "pointer",
        borderRadius: "var(--radius-sm)", fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600,
        color: "var(--ink)", transition: "background var(--dur-base) var(--ease-out)",
        animation: "ddItem .26s var(--ease-out) both", animationDelay: `${0.02 + index * 0.03}s`,
      }}>
      <span style={{
        position: "absolute", left: 0, top: 7, bottom: 7, width: 4, borderRadius: "0 4px 4px 0",
        background: TONE_DOT[tone] || "var(--ink)", transformOrigin: "left",
        transform: h ? "scaleX(1)" : "scaleX(0)", transition: "transform var(--dur-base) var(--ease-out)",
      }}></span>
      <span style={{
        width: 22, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
        transform: h ? "scale(1.12)" : "none", transition: "transform var(--dur-base) var(--ease-out)",
      }}><Icon name={icon} size={18} color={TONE_LINE[tone] || "var(--ink)"} /></span>
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{ display: "inline-flex", color: "var(--ink-muted)", opacity: rightShown ? 1 : 0, transform: rightShown ? "translateX(0)" : "translateX(-6px)", transition: "all var(--dur-base) var(--ease-out)" }}>
        <Icon name={rightIcon} size={15} />
      </span>
    </button>
  );
}

const MENU_META = {
  "Todos los cursos": { tone: "green", icon: "layout-grid" },
  "Instrumentos": { tone: "yellow", icon: "guitar" },
};
const menuMeta = (label) => ROUTE_META[label] || MENU_META[label] || { tone: "ink", icon: "music" };
const DD_KEYFRAMES = "@keyframes ddIn{from{opacity:0;transform:translateY(-8px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes ddItem{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}";

function NavCourses({ label, onPick }) {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [open, sub]);
  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setSub(false); } };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  const pick = (filter) => { setOpen(false); setSub(false); onPick(filter); };
  const card = {
    background: "var(--paper)", border: "2px solid var(--ink)", borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-sticker)", padding: 6,
  };
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <style>{DD_KEYFRAMES}</style>
      <a href="#" onClick={(e) => { e.preventDefault(); setOpen((o) => !o); setSub(false); }} style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500,
        color: open ? "var(--blanco-50)" : "var(--blanco-600)", textDecoration: "none",
      }}>{label} <span style={{ display: "inline-flex", transform: open ? "rotate(180deg)" : "none", transition: "transform var(--dur-base) var(--ease-out)" }}><Icon name="chevron-down" size={14} /></span></a>
      {open ? (
        <div style={{ position: "absolute", top: "calc(100% + 12px)", left: 0, zIndex: 40, minWidth: 250, ...card, animation: "ddIn .2s var(--ease-out) both", transformOrigin: "top left" }}>
          <div style={{ padding: "4px 12px 8px", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Explora por ruta</div>
          {COURSE_MENU.map((item, idx) => item.sub ? (
            <div key={item.label} style={{ position: "relative" }}>
              <MenuItem label={item.label} icon={menuMeta(item.label).icon} tone={menuMeta(item.label).tone} caret="chevron-right" index={idx} onClick={() => setSub((s) => !s)} onMouseEnter={() => setSub(true)} />
              {sub ? (
                <div style={{ position: "absolute", top: -6, left: "100%", zIndex: 41, minWidth: 184, ...card, animation: "ddIn .18s var(--ease-out) both", transformOrigin: "top left" }}>
                  {item.sub.map((s, j) => <MenuItem key={s} label={s} icon={menuMeta(s).icon} tone={menuMeta(s).tone} index={j} onClick={() => pick([s])} />)}
                </div>
              ) : null}
            </div>
          ) : (
            <MenuItem key={item.label} label={item.label} icon={menuMeta(item.label).icon} tone={menuMeta(item.label).tone} index={idx} onClick={() => pick(item.filter)} onMouseEnter={() => setSub(false)} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function NavServices({ label, onPick, onDesign }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [open]);
  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  const SVC_ICON = { "Mezcla": "sliders-horizontal", "Mastering": "disc-3", "Asesorías": "messages-square", "Plantillas": "file-text" };
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <style>{DD_KEYFRAMES}</style>
      <a href="#" onClick={(e) => { e.preventDefault(); setOpen((o) => !o); }} style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500,
        color: open ? "var(--blanco-50)" : "var(--blanco-600)", textDecoration: "none",
      }}>{label} <span style={{ display: "inline-flex", transform: open ? "rotate(180deg)" : "none", transition: "transform var(--dur-base) var(--ease-out)" }}><Icon name="chevron-down" size={14} /></span></a>
      {open ? (
        <div style={{ position: "absolute", top: "calc(100% + 12px)", left: 0, zIndex: 40, minWidth: 230, background: "var(--paper)", border: "2px solid var(--ink)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sticker)", padding: 6, animation: "ddIn .2s var(--ease-out) both", transformOrigin: "top left" }}>
          <div style={{ padding: "4px 12px 8px", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Nuestros servicios</div>
          {BRANDS.records.services.map((s, idx) => (
            <MenuItem key={s.t} label={s.t} icon={SVC_ICON[s.t] || "music"} tone={s.tone} index={idx} onClick={() => { setOpen(false); onPick(s.t); }} />
          ))}
          <MenuItem label="Diseño" icon="palette" tone="red" index={BRANDS.records.services.length} onClick={() => { setOpen(false); onDesign(); }} />
        </div>
      ) : null}
    </div>
  );
}

function UserMenu({ brand, onAuth, onAccount, onTeam, onAdmin, loggedIn, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <style>{DD_KEYFRAMES}</style>
      <button onClick={() => setOpen((o) => !o)} aria-label="Cuenta" style={{
        width: 34, height: 34, borderRadius: "50%", flexShrink: 0, cursor: "pointer",
        border: "1.5px solid var(--negro-600)", background: open ? "var(--negro-700)" : "transparent",
        color: "var(--blanco-50)", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background var(--dur-base) var(--ease-out)",
      }}>
        <Icon name="user" size={17} />
      </button>
      {open ? (
        <div style={{
          position: "absolute", top: "calc(100% + 12px)", right: 0, zIndex: 40, minWidth: 190,
          background: "var(--paper)", border: "2px solid var(--ink)", borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-sticker)", padding: 6,
          animation: "ddIn .2s var(--ease-out) both", transformOrigin: "top right",
        }}>
          {loggedIn ? (
            <React.Fragment>
              <MenuItem label="Mi cuenta" icon="circle-user" tone={brand === "records" ? "yellow" : brand === "academy" ? "green" : "red"} index={0} onClick={() => { setOpen(false); onAccount && onAccount(); }} />
              <MenuItem label="Panel del equipo" icon="kanban" tone="purple" index={1} onClick={() => { setOpen(false); onTeam && onTeam(); }} />
              <MenuItem label="Panel admin" icon="shield-check" tone="red" index={2} onClick={() => { setOpen(false); onAdmin && onAdmin(); }} />
              <MenuItem label="Cerrar sesión" icon="log-out" tone="ink" index={3} onClick={() => { setOpen(false); onLogout && onLogout(); }} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <MenuItem label="Iniciar sesión" icon="log-in" tone="ink" index={0} onClick={() => { setOpen(false); onAuth && onAuth(); }} />
              <MenuItem label="Registrarse" icon="user-plus" tone={brand === "records" ? "yellow" : brand === "academy" ? "green" : "red"} index={1} onClick={() => { setOpen(false); onAuth && onAuth(); }} />
            </React.Fragment>
          )}
        </div>
      ) : null}
    </div>
  );
}

function Nav({ brand, setBrand, onCourses, onProfesores, onHome, onComunidad, onPortafolio, onFreebies, onCharla, onAuth, onAccount, onTeam, onAdmin, loggedIn, onLogout, onService, onDesignServices, enabledBrands }) {
  const items = brand === "records"
    ? (enabledBrands.includes("academy") ? ["Portafolio", "Servicios", "Cursos", "Nosotros"] : ["Servicios", "Portafolio", "Recursos", "Charla con nosotros"])
    : brand === "academy"
    ? ["Cursos", "Profesores", "Comunidad", "Nosotros"]
    : ["Portafolio", "Servicios", "Proceso", "Nosotros"];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 20,
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
      padding: "8px 14px", background: "var(--negro-500)",
      borderBottom: "2px solid var(--negro-700)",
    }}>
      <a href="#" onClick={(e) => { e.preventDefault(); onHome(); }} style={{ display: "inline-flex", textDecoration: "none", cursor: "pointer", flexShrink: 0 }}>
        <Lockup brand={brand === "records" ? "yellow" : brand === "design" ? "design" : "paper"} sublabel={brand} size={36} stacked={false} />
      </a>
      <nav style={{ display: "flex", gap: 26, flex: 1, justifyContent: "center", alignItems: "center" }}>
          {items.map((i) => (
            (brand === "academy" && i === "Cursos")
              ? <NavCourses key={i} label={i} onPick={onCourses} />
              : (brand === "records" && i === "Servicios")
              ? <NavServices key={i} label={i} onPick={onService} onDesign={onDesignServices} />
              : <a key={i} href="#" onClick={
                  (brand === "academy" && i === "Profesores") ? (e) => { e.preventDefault(); onProfesores(); }
                  : (brand === "academy" && i === "Comunidad") ? (e) => { e.preventDefault(); onComunidad(); }
                  : i === "Servicios" ? (e) => {
                      e.preventDefault();
                      const el = document.getElementById("rutas-aprendizaje");
                      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
                    }
                  : i === "Charla con nosotros" ? (e) => { e.preventDefault(); onCharla && onCharla(); }
                  : i === "Recursos" ? (e) => { e.preventDefault(); onFreebies && onFreebies(); }
                  : i === "Portafolio" ? (e) => { e.preventDefault(); onPortafolio && onPortafolio(); }
                  : undefined
                } style={{
                  fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500,
                  color: "var(--blanco-600)", textDecoration: "none", whiteSpace: "nowrap",
                }}>{i}</a>
          ))}
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        {enabledBrands.length > 1 ? (
          <div style={{
            display: "flex", padding: 3, gap: 3, borderRadius: "var(--radius-pill)",
            background: "var(--negro-700)", border: "1.5px solid var(--negro-600)",
          }}>
            {enabledBrands.map((b) => (
            <button key={b} onClick={() => setBrand(b)} style={{
              border: "none", cursor: "pointer", padding: "5px 10px",
              borderRadius: "var(--radius-pill)", fontFamily: "var(--font-ui)",
              fontSize: 12, fontWeight: 600, textTransform: "capitalize",
              background: brand === b ? (b === "records" ? "var(--amarillo-500)" : b === "academy" ? "var(--verde-500)" : "var(--rojo-500)") : "transparent",
              color: brand === b ? (b === "records" ? "var(--negro-500)" : "#fff") : "var(--blanco-600)",
              transition: "all var(--dur-base) var(--ease-out)",
            }}>{b}</button>
            ))}
          </div>
        ) : null}
        <UserMenu brand={brand} onAuth={onAuth} onAccount={onAccount} onTeam={onTeam} onAdmin={onAdmin} loggedIn={loggedIn} onLogout={onLogout} />
      </div>
    </header>
  );
}

/* ---- HERO ----------------------------------------------------- */
function Hero({ brand, onCourses, onPostula }) {
  const c = BRANDS[brand];
  const dark = brand === "records" || brand === "design";
  const scrollToRutas = () => {
    const el = document.getElementById("rutas-aprendizaje");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
  };
  return (
    <section data-brand={brand} style={{
      background: dark ? "var(--negro-500)" : "var(--verde-900)",
      color: "var(--blanco-50)", padding: "64px 40px 72px",
      borderBottom: "2px solid var(--ink)", position: "relative", overflow: "hidden",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 40, alignItems: "center", maxWidth: 1180, margin: "0 auto" }}>
        <div>
          <Eyebrow style={{ color: c.accent }}>{c.eyebrow}</Eyebrow>
          <MixedTitle size="clamp(40px, 6vw, 72px)" color="var(--blanco-50)" style={{ margin: "16px 0 24px", lineHeight: 1.28 }}>
            {c.heroTitle}
          </MixedTitle>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.55, color: "var(--blanco-600)", maxWidth: 520, margin: "0 0 28px" }}>
            {c.heroBody}
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Button variant="primary" size="lg" sticker onClick={brand === "academy" ? scrollToRutas : brand === "records" ? onPostula : undefined}>{c.ctaPrimary}</Button>
            {brand === "design" ? (
              <Button variant="outline" size="lg" style={{ color: "var(--blanco-50)", borderColor: "var(--blanco-50)" }}>
                {c.ctaSecondary}
              </Button>
            ) : null}
          </div>
        </div>
        <div style={{
          borderRadius: "var(--radius-lg)", border: "3px solid var(--ink)", overflow: "hidden",
          background: c.accent, aspectRatio: "1 / 1", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "8px 8px 0 var(--ink)",
        }}>
          {c.heroIllo ? (
            <img src={c.heroIllo} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", padding: brand === "academy" ? 24 : 0, boxSizing: "border-box" }} />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, padding: 34, width: "100%", height: "100%", boxSizing: "border-box" }}>
              {c.heroIcons.map((ic, i) => (
                <div key={ic} style={{
                  gridColumn: i === c.heroIcons.length - 1 && c.heroIcons.length % 2 === 1 ? "span 2" : undefined,
                  background: "var(--blanco-50)", border: "2px solid var(--ink)", borderRadius: "var(--radius-lg)",
                  display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-sticker-sm)",
                  aspectRatio: i === c.heroIcons.length - 1 && c.heroIcons.length % 2 === 1 ? "2 / 1" : "1 / 1",
                }}>
                  <Icon name={ic} size={48} color={c.accent} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---- SERVICES ------------------------------------------------- */
const TONE_DOT = {
  yellow: "var(--amarillo-500)", green: "var(--verde-500)", purple: "var(--morado-500)",
  red: "var(--rojo-500)", blue: "var(--azul-500)", ink: "var(--negro-500)",
};
function Services({ brand, onCourses, onService, onDesignServices }) {
  const c = BRANDS[brand];
  return (
    <section id="rutas-aprendizaje" data-brand={brand} style={{ background: "var(--paper)", padding: "64px 40px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <Eyebrow>{brand === "academy" ? "Programas" : "Servicios"}</Eyebrow>
            <MixedTitle size="38px" style={{ marginTop: 10 }}>
              {brand === "academy" ? "Rutas de aprendizaje" : brand === "design" ? "Diseño con propósito" : "A la medida de tu etapa"}
            </MixedTitle>
          </div>
          <Button variant="ghost" onClick={brand === "academy" ? onCourses : undefined}><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Ver todo <Icon name="arrow-right" size={16} /></span></Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {c.services.map((s, i) => (
            <Card key={i} variant="sticker" pad="md" onClick={brand === "academy" && s.route ? () => onCourses(s.route) : undefined} style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 188, cursor: brand === "academy" ? "pointer" : "default" }}>
              {s.p
                ? <Badge tone={s.tone} sticker>{s.p}</Badge>
                : <span aria-hidden="true" style={{ width: 16, height: 16, borderRadius: "50%", background: TONE_DOT[s.tone] || "var(--ink)", border: "2px solid var(--ink)", boxShadow: "var(--shadow-sticker-sm)" }}></span>}
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, lineHeight: 1.1, marginTop: 4 }}>{s.t}</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.45, margin: 0, flex: 1 }}>{s.d}</p>
              <a href="#" onClick={(e) => { e.preventDefault(); if (brand === "academy") onCourses(s.route); else if (brand === "records") onService(s.t); else onDesignServices(); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
                {brand === "records" ? "Ver precios" : brand === "academy" ? "Explora" : "Ver servicio"} <Icon name="arrow-up-right" size={15} />
              </a>
            </Card>
          ))}
        </div>
        {brand !== "design" && (
          <Card variant="sticker" pad="md" style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 18, background: "var(--rojo-500)", color: "var(--blanco-50)" }}>
            <Badge tone="paper" sticker>Nuevo</Badge>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, lineHeight: 1.1 }}>Servicios de Diseño Personalizado</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--blanco-300)", lineHeight: 1.45, margin: 0 }}>Portadas, identidad de artista y piezas para tu lanzamiento — hecho a mano y a tu medida.</p>
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); onDesignServices(); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: "var(--blanco-50)", textDecoration: "none", whiteSpace: "nowrap" }}>
              Solicitar <Icon name="arrow-up-right" size={15} />
            </a>
          </Card>
        )}
      </div>
    </section>
  );
}

/* ---- SERVICE PAGES ------------------------------------------------ */
const RECORDS_SERVICE_PAGES = {
  "Mezcla": {
    tone: "yellow", icon: "sliders-horizontal",
    intro: "La mezcla profesional es el arte de equilibrar cada elemento de una canción para lograr un sonido claro y envolvente, respetando siempre la visión e idea original del artista. Si ya tienes tu producción y grabaciones listas, este es el siguiente paso.",
    includesLabel: "Entregables",
    includes: ["Mezcla Stéreo", "Mezcla Instrumental", "Mezcla Acapella", "Live Mix"],
    extras: ["Stems", "Afinación de voces", "Corrección rítmica de baterías"],
    pricingNote: "Cobramos según qué tan grande es el artista: precios adaptados a la realidad de cada proyecto, según tus escuchas mensuales.",
    prices: [
      { t: "Primeros pasos", d: "0 – 1.000", p: "33.99 €" },
      { t: "Artista Emergente", d: "1.000 – 50.000", p: "78.99 €" },
      { t: "Artista Profesional", d: "50.000 – 200.000", p: "157.97 €" },
      { t: "Estrella", d: "1M ↑", p: "Personalizado" },
    ],
  },
  "Mastering": {
    tone: "purple", icon: "disc-3",
    intro: "El mastering profesional es la última revisión crítica antes del lanzamiento: se ajustan el balance espectral, la dinámica y el loudness (LUFS), y se producen las versiones finales del track adaptadas a cada destino — Spotify, Apple Music, Tidal, YouTube, CD, vinilo o broadcast.",
    includesLabel: "Entregables",
    includes: ["Master Formato Streaming", "Master Streaming High Quality", "Master formato redes sociales", "Master Formato CD"],
    extras: ["Mastering por Stems", "Mastering para Vinilos"],
    pricingNote: "Cobramos según qué tan grande es el artista: precios adaptados a la realidad de cada proyecto, según tus escuchas mensuales.",
    prices: [
      { t: "Primeros pasos", d: "0 – 1.000", p: "17.99 €" },
      { t: "Artista Emergente", d: "1.000 – 50.000", p: "33.99 €" },
      { t: "Artista Profesional", d: "50.000 – 200.000", p: "78.99 €" },
      { t: "Estrella", d: "1M ↑", p: "Personalizado" },
    ],
  },
  "Asesorías": {
    tone: "blue", icon: "messages-square",
    intro: "Sesiones 1:1 para moverte en el mundo de la música sin tropezar: contratos, regalías, distribución y estrategia de lanzamiento, explicado para los mortales.",
    includes: ["Sesión por videollamada", "Resumen escrito después de cada sesión", "Agenda a tu ritmo"],
    schedule: true,
    prices: [
      { t: "Sesión de asesoría 1:1", d: "1 hora por videollamada con nuestro equipo. Tú eliges el tema: contratos, regalías, distribución o estrategia de lanzamiento.", p: "21.99 €" },
    ],
  },
  "Plantillas": {
    tone: "red", icon: "file-signature",
    intro: "El pack de plantillas de contratos musicales es una herramienta profesional para proteger y empoderar a artistas, productores y colaboradores. Con lenguaje claro y flexible, cada contrato está adaptado a los escenarios reales de la industria independiente: desde colaboraciones espontáneas hasta acuerdos con productores, músicos de sesión, managers y otros perfiles clave en el proceso creativo.",
    includesLabel: "Formatos de contrato disponibles", includesAsList: true,
    includes: ["Contrato Productor Musical", "Contrato músico de Sesión", "Contrato de Colaboración Artística", "Contrato de Ingeniero de Mezcla", "Contrato de Ingeniero de Máster", "Contrato de Banda", "Contrato de Cesión de Derechos", "Contrato de Manager de Artista", "Splitsheet Composición Musical", "Splitsheet de Grabación o Máster"],
    footnote: "* Comprando cualquier set de plantillas obtienes acceso adicional a las posibles actualizaciones futuras de los formatos adquiridos + una asesoría gratuita de nuestro equipo para explicarte cómo usarlas.",
    prices: [
      { t: "1 Plantilla", p: "15.99 €" },
      { t: "5 Plantillas", p: "15.99 €" },
      { t: "Paquete Todas las plantillas + Las próximas que vendrán", p: "56.95 €" },
    ],
    priceTable: true,
  },
};

function ServicePage({ name, onBack, onContact, onRequest, onSchedule }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  const s = RECORDS_SERVICE_PAGES[name];
  if (!s) return null;
  return (
    <div data-brand="records">
      <section style={{ background: "var(--negro-500)", color: "var(--blanco-50)", padding: "26px 40px 48px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div><button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button></div>
          <div style={{ marginTop: 20 }}><Eyebrow style={{ color: "var(--amarillo-500)" }}>Servicios</Eyebrow></div>
          <MixedTitle size="clamp(34px, 5vw, 56px)" color="var(--blanco-50)" style={{ margin: "14px 0 12px" }}>{name}</MixedTitle>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55, color: "var(--blanco-600)", maxWidth: 620, margin: 0 }}>{s.intro}</p>
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "48px 40px 72px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {s.includesAsList ? (
              <div>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ink-muted)", display: "block", marginBottom: 12 }}>{s.includesLabel}</span>
                <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "10px 32px", maxWidth: 760 }}>
                  {s.includes.map((it, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "baseline", gap: 10, fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: TONE_DOT[s.tone], minWidth: 22 }}>{String(i + 1).padStart(2, "0")}</span>
                      {it}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
              {s.includesLabel ? <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ink-muted)" }}>{s.includesLabel}</span> : null}
              {s.includes.map((it, i) => (
                <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                  <Icon name="check" size={16} color={TONE_DOT[s.tone]} /> {it}
                </div>
              ))}
            </div>
            )}
            {s.extras ? (
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ink-muted)" }}>Adicionales</span>
                {s.extras.map((it, i) => (
                  <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                    <Icon name="plus" size={16} color={TONE_DOT[s.tone]} /> {it}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          {(s.pricingNote || s.priceTable) ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 22, alignItems: "flex-start" }}>
              {s.pricingNote ? <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.5, color: "var(--ink-muted)", margin: 0, maxWidth: 560 }}>{s.pricingNote}</p> : null}
              <table style={{ width: "100%", maxWidth: s.priceTable ? 560 : 760, borderCollapse: "collapse", border: "2px solid var(--ink)", background: "var(--blanco-50)", fontFamily: "var(--font-ui)", fontSize: 15, boxShadow: "var(--shadow-sticker-sm)" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "13px 18px", border: "2px solid var(--ink)", background: "var(--negro-500)", color: "var(--blanco-50)", fontWeight: 700, textAlign: "center" }}>{s.priceTable ? "Paquete" : "Plan"}</th>
                    {s.pricingNote ? <th style={{ padding: "13px 18px", border: "2px solid var(--ink)", background: "var(--amarillo-500)", color: "var(--negro-500)", fontWeight: 700, textAlign: "center" }}>Escuchas mensuales</th> : null}
                    <th style={{ padding: "13px 18px", border: "2px solid var(--ink)", background: "var(--amarillo-500)", color: "var(--negro-500)", fontWeight: 700, textAlign: "center" }}>{s.priceTable ? "Precio" : `Precio ${name.toLowerCase()}`}</th>
                  </tr>
                </thead>
                <tbody>
                  {(s.pricingNote ? [...s.prices].reverse() : s.prices).map((pr, i) => (
                    <tr key={i}>
                      <td style={{ padding: "12px 18px", border: "2px solid var(--ink)", textAlign: "center", fontWeight: 600 }}>{pr.t}</td>
                      {s.pricingNote ? <td style={{ padding: "12px 18px", border: "2px solid var(--ink)", textAlign: "center", fontFamily: "var(--font-body)" }}>{pr.d}</td> : null}
                      <td style={{ padding: "12px 18px", border: "2px solid var(--ink)", textAlign: "center", fontFamily: "var(--font-body)" }}>{pr.p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {s.pricingNote ? <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-muted)", margin: 0, fontStyle: "italic" }}>* Precios por canción individual (single). Para EPs o álbumes musicales se aplica un descuento.</p> : null}
              <Button variant="primary" sticker onClick={s.pricingNote ? onRequest : onContact}>Solícitalo aquí</Button>
            </div>
          ) : (
          <div style={{ display: "grid", gridTemplateColumns: s.schedule ? "minmax(280px, 560px)" : "repeat(auto-fit, minmax(210px, 1fr))", gap: 18 }}>
            {s.prices.map((pr, i) => (
              <Card key={i} variant="sticker" pad="lg" style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
                <div><Badge tone={s.tone} sticker>{pr.p}</Badge></div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, lineHeight: 1.1, marginTop: 6 }}>{pr.t}</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.45, margin: 0, flex: 1 }}>{pr.d}</p>
                <div><Button variant="primary" sticker onClick={s.schedule ? onSchedule : onContact}>{s.schedule ? "Escoge tu horario" : pr.p === "Personalizado" ? "Charla con nosotros" : "Solicitar"}</Button></div>
              </Card>
            ))}
          </div>
          )}
          {s.footnote ? (
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-muted)", margin: 0, fontStyle: "italic", maxWidth: 640 }}>{s.footnote}</p>
          ) : null}
          <Card variant="sticker" pad="lg" style={{ background: "var(--amarillo-500)", display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, lineHeight: 1.15 }}>¿Tu proyecto no encaja en ninguna opción?</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.5, color: "var(--negro-700)", margin: 0 }}>Escríbenos y lo armamos a tu medida.</p>
            </div>
            <Button variant="secondary" sticker onClick={onContact} style={{ whiteSpace: "nowrap" }}>Charla con nosotros</Button>
          </Card>
        </div>
      </section>
      <Footer brand="records" />
    </div>
  );
}

function SchedulePage({ onBack, onHome }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const DOW = ["L", "M", "X", "J", "V", "S", "D"];
  const SLOTS = ["10:00", "11:00", "12:00", "16:00", "17:00", "18:00"];
  const today = new Date();
  const [mOff, setMOff] = React.useState(0);
  const [day, setDay] = React.useState(null);
  const [slot, setSlot] = React.useState(null);
  const [sent, setSent] = React.useState(false);
  const [contact, setContact] = React.useState({ correo: true, whatsapp: false });
  const toggleContact = (k) => setContact((c) => ({ ...c, [k]: !c[k] }));
  const base = new Date(today.getFullYear(), today.getMonth() + mOff, 1);
  const y = base.getFullYear(), m = base.getMonth();
  const firstDow = (base.getDay() + 6) % 7;
  const nDays = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(firstDow).fill(null), ...Array.from({ length: nDays }, (_, i) => i + 1)];
  const isPast = (d) => new Date(y, m, d, 23, 59) < today;
  const isWeekend = (d) => { const w = new Date(y, m, d).getDay(); return w === 0 || w === 6; };
  const selectable = (d) => d && !isPast(d) && !isWeekend(d);
  const pickDay = (d) => { setDay(d); setSlot(null); };
  const dayLabel = day ? `${day} de ${MONTHS[m]} de ${y}` : null;
  const navBtn = { border: "2px solid var(--ink)", borderRadius: "var(--radius-md)", background: "var(--blanco-50)", cursor: "pointer", width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center" };
  if (sent) {
    return (
      <div data-brand="records">
        <section style={{ background: "var(--negro-500)", color: "var(--blanco-50)", padding: "26px 40px 72px", borderBottom: "2px solid var(--ink)", minHeight: "60vh", display: "flex", flexDirection: "column" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%" }}>
            <div><button onClick={onHome} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver al inicio</button></div>
          </div>
          <div style={{ maxWidth: 640, margin: "auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, padding: "40px 0" }}>
            <Badge tone="blue" sticker style={{ fontSize: 15, padding: "8px 18px" }}>Reserva confirmada</Badge>
            <MixedTitle size="clamp(34px, 5vw, 54px)" color="var(--blanco-50)" align="center">¡Nos vemos pronto!</MixedTitle>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.6, color: "var(--blanco-600)", margin: 0, maxWidth: 480 }}>
              Tu asesoría 1:1 quedó agendada para el {dayLabel} a las {slot}. Te enviaremos el enlace de la videollamada a tu correo.
            </p>
            <div style={{ marginTop: 8 }}><Button variant="primary" sticker onClick={onHome}>Volver al inicio</Button></div>
          </div>
        </section>
        <Footer brand="records" />
      </div>
    );
  }
  return (
    <div data-brand="records">
      <section style={{ background: "var(--negro-500)", color: "var(--blanco-50)", padding: "26px 40px 48px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div><button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button></div>
          <div style={{ marginTop: 20 }}><Eyebrow style={{ color: "var(--amarillo-500)" }}>Asesorías</Eyebrow></div>
          <MixedTitle size="clamp(34px, 5vw, 56px)" color="var(--blanco-50)" style={{ margin: "14px 0 12px" }}>Escoge tu horario</MixedTitle>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55, color: "var(--blanco-600)", maxWidth: 620, margin: 0 }}>Sesión de asesoría 1:1 · 1 hora por videollamada · 21.99 €</p>
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "48px 40px 72px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(320px, 480px) minmax(260px, 1fr)", gap: 28, alignItems: "start" }}>
          <Card variant="sticker" pad="lg" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button aria-label="Mes anterior" onClick={() => setMOff((o) => Math.max(0, o - 1))} disabled={mOff === 0} style={{ ...navBtn, opacity: mOff === 0 ? 0.35 : 1 }}><Icon name="chevron-left" size={18} /></button>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20 }}>{MONTHS[m]} {y}</div>
              <button aria-label="Mes siguiente" onClick={() => setMOff((o) => o + 1)} style={navBtn}><Icon name="chevron-right" size={18} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
              {DOW.map((d) => <div key={d} style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--ink-muted)", textAlign: "center", padding: "4px 0" }}>{d}</div>)}
              {cells.map((d, i) => d === null ? <div key={"e" + i}></div> : (
                <button key={i} onClick={() => selectable(d) && pickDay(d)} disabled={!selectable(d)}
                  style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, height: 44, borderRadius: "var(--radius-md)", cursor: selectable(d) ? "pointer" : "default", border: day === d ? "2px solid var(--ink)" : "2px solid transparent", background: day === d ? "var(--amarillo-500)" : selectable(d) ? "var(--blanco-50)" : "transparent", color: selectable(d) ? "var(--ink)" : "var(--ink-muted)", opacity: selectable(d) ? 1 : 0.4, boxShadow: day === d ? "var(--shadow-sticker-sm)" : "none" }}>{d}</button>
              ))}
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-muted)", margin: 0 }}>Atendemos de lunes a viernes. Zona horaria: Madrid (CET).</p>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Card variant="sticker" pad="lg" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20 }}>{day ? `Horarios · ${dayLabel}` : "Primero escoge un día"}</div>
              {day ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))", gap: 10 }}>
                  {SLOTS.map((h) => (
                    <button key={h} onClick={() => setSlot(h)} style={{ fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600, padding: "12px 0", borderRadius: "var(--radius-md)", cursor: "pointer", border: "2px solid var(--ink)", background: slot === h ? "var(--amarillo-500)" : "var(--blanco-50)", boxShadow: slot === h ? "var(--shadow-sticker-sm)" : "none" }}>{h}</button>
                  ))}
                </div>
              ) : (
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink-muted)", margin: 0 }}>Selecciona una fecha en el calendario para ver las horas disponibles.</p>
              )}
            </Card>
            <Card variant="sticker" pad="lg" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20 }}>Cuéntanos sobre ti</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Input label="Tu nombre" placeholder="Ej: Camila Torres" />
                <Input label="Nombre artístico" placeholder="Ej: La Tortuga Sound" />
              </div>
              <div>
                <label htmlFor="agenda-tema" style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 6 }}>¿Sobre qué tema quieres hablar?</label>
                <textarea id="agenda-tema" placeholder={'Ej: "Quiero entender qué firmar antes de lanzar mi EP con un productor" o "Cómo cobrar mis regalías de Spotify".'} style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.5, color: "var(--ink)", background: "var(--blanco-50)", border: "2px solid var(--ink)", borderRadius: "var(--radius-md)", padding: "10px 12px", minHeight: 90, resize: "vertical", width: "100%", boxSizing: "border-box" }}></textarea>
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 8 }}>¿Cómo prefieres que te contactemos?</span>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-muted)", margin: "0 0 10px" }}>Puedes marcar ambos si quieres que te avisemos por los dos medios.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[["correo", "mail", "Correo", "E-mail", "hola@correo.com"], ["whatsapp", "message-circle", "WhatsApp", "Número de WhatsApp", "+34 600 000 000"]].map(([k, ic, lbl, fieldLbl, ph]) => (
                    <div key={k} style={{ display: "grid", gridTemplateColumns: "170px 1fr", gap: 14, alignItems: "end" }}>
                      <label style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--ink)", cursor: "pointer", padding: "10px 0" }}>
                        <span onClick={() => toggleContact(k)} role="checkbox" aria-checked={contact[k]} style={{ width: 22, height: 22, flexShrink: 0, border: "2px solid var(--ink)", borderRadius: 6, background: contact[k] ? "var(--amarillo-500)" : "var(--blanco-50)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: contact[k] ? "var(--shadow-sticker-sm)" : "none" }}><span style={{ display: "inline-flex", visibility: contact[k] ? "visible" : "hidden" }}><Icon name="check" size={14} /></span></span>
                        <span onClick={() => toggleContact(k)} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name={ic} size={16} /> {lbl}</span>
                      </label>
                      <div style={{ opacity: contact[k] ? 1 : 0.4, pointerEvents: contact[k] ? "auto" : "none" }}><Input label={fieldLbl} placeholder={ph} disabled={!contact[k]} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card variant="sticker" pad="lg" style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18 }}>Sesión de asesoría 1:1</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-muted)", margin: 0 }}>{day && slot ? `${dayLabel}, ${slot} h · 21.99 €` : "Escoge día y hora para continuar · 21.99 €"}</p>
              </div>
              <Button variant="primary" sticker onClick={() => day && slot && setSent(true)} style={{ opacity: day && slot ? 1 : 0.45 }}>Confirmar reserva</Button>
            </Card>
          </div>
        </div>
      </section>
      <Footer brand="records" />
    </div>
  );
}

function RequestPage({ name, onBack, onHome }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  const [sent, setSent] = React.useState(false);
  const [contact, setContact] = React.useState({ correo: true, whatsapp: false });
  const toggleContact = (k) => setContact((c) => ({ ...c, [k]: !c[k] }));
  const taStyle = { fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.5, color: "var(--ink)", background: "var(--blanco-50)", border: "2px solid var(--ink)", borderRadius: "var(--radius-md)", padding: "10px 12px", minHeight: 120, resize: "vertical", width: "100%", boxSizing: "border-box" };
  const lblStyle = { fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 6 };
  if (sent) {
    return (
      <div data-brand="records">
        <section style={{ background: "var(--negro-500)", color: "var(--blanco-50)", padding: "26px 40px 72px", borderBottom: "2px solid var(--ink)", minHeight: "60vh", display: "flex", flexDirection: "column" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%" }}>
            <div><button onClick={onHome} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver al inicio</button></div>
          </div>
          <div style={{ maxWidth: 640, margin: "auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, padding: "40px 0" }}>
            <Badge tone="yellow" sticker style={{ fontSize: 15, padding: "8px 18px" }}>Solicitud enviada</Badge>
            <MixedTitle size="clamp(34px, 5vw, 54px)" color="var(--blanco-50)" align="center">¡Gracias por confiar en nosotros!</MixedTitle>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.6, color: "var(--blanco-600)", margin: 0, maxWidth: 480 }}>
              Nos contactaremos contigo tan pronto como sea posible. Ya puedes ver tu solicitud de {name.toLowerCase()} en tu panel personal de artista.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
              <Button variant="primary" sticker>Ir a mi panel de artista</Button>
              <button onClick={onHome} style={{ border: "2px solid var(--blanco-50)", borderRadius: "var(--radius-md)", background: "transparent", cursor: "pointer", padding: "10px 20px", fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600, color: "var(--blanco-50)" }}>Volver al inicio</button>
            </div>
          </div>
        </section>
        <Footer brand="records" />
      </div>
    );
  }
  return (
    <div data-brand="records">
      <section style={{ background: "var(--negro-500)", color: "var(--blanco-50)", padding: "26px 40px 48px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div><button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button></div>
          <div style={{ marginTop: 20 }}><Eyebrow style={{ color: "var(--amarillo-500)" }}>Solicitud</Eyebrow></div>
          <MixedTitle size="clamp(34px, 5vw, 56px)" color="var(--blanco-50)" style={{ margin: "14px 0 12px" }}>{`Solicita tu ${name.toLowerCase()}`}</MixedTitle>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55, color: "var(--blanco-600)", maxWidth: 620, margin: 0 }}>
            Adjunta tu perfil de artista y cuéntanos qué necesitas.
          </p>
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "48px 40px 72px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <Card variant="sticker" pad="lg" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Input label="Tu nombre" placeholder="Ej: Camila Torres" />
              <Input label="Nombre artístico o de banda" placeholder="Ej: La Tortuga Sound" />
            </div>
            <div>
              <Input label="Perfil de artista (enlace)" placeholder="https://open.spotify.com/artist/..." />
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "var(--ink-muted)", margin: "6px 0 0" }}>Spotify, YouTube, Apple Music… la plataforma donde tengas más oyentes mensuales.</p>
            </div>
            <div>
              <label htmlFor="req-desc" style={lblStyle}>¿Qué necesitas?</label>
              <textarea id="req-desc" style={taStyle} placeholder={'Ej: "Quiero la mezcla de un single con afinación de voces para mi canción X" o "Quiero la masterización de un álbum de 12 canciones".'}></textarea>
            </div>
            <div>
              <span style={lblStyle}>¿Cómo prefieres que te contactemos?</span>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-muted)", margin: "0 0 10px" }}>Puedes marcar ambos si quieres que te avisemos por los dos medios.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[["correo", "mail", "Correo", "E-mail", "hola@correo.com"], ["whatsapp", "message-circle", "WhatsApp", "Número de WhatsApp", "+34 600 000 000"]].map(([k, ic, lbl, fieldLbl, ph]) => (
                  <div key={k} style={{ display: "grid", gridTemplateColumns: "170px 1fr", gap: 14, alignItems: "end" }}>
                    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--ink)", cursor: "pointer", padding: "10px 0" }}>
                      <span onClick={() => toggleContact(k)} role="checkbox" aria-checked={contact[k]} style={{ width: 22, height: 22, flexShrink: 0, border: "2px solid var(--ink)", borderRadius: 6, background: contact[k] ? "var(--amarillo-500)" : "var(--blanco-50)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: contact[k] ? "var(--shadow-sticker-sm)" : "none" }}><span style={{ display: "inline-flex", visibility: contact[k] ? "visible" : "hidden" }}><Icon name="check" size={14} /></span></span>
                      <span onClick={() => toggleContact(k)} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name={ic} size={16} /> {lbl}</span>
                    </label>
                    <div style={{ opacity: contact[k] ? 1 : 0.4, pointerEvents: contact[k] ? "auto" : "none" }}><Input label={fieldLbl} placeholder={ph} disabled={!contact[k]} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div><Button variant="primary" sticker onClick={() => setSent(true)}>Enviar solicitud</Button></div>
            {sent ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                <Icon name="check" size={16} color="var(--verde-500)" /> ¡Recibido! Te respondemos con tu plan y precio en menos de 48 horas.
              </div>
            ) : null}
          </Card>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "var(--ink-muted)", margin: "16px 0 0", fontStyle: "italic" }}>* Con tu perfil revisamos en qué etapa estás como artista y cuántos oyentes mensuales tienes. Tomamos como referencia la plataforma con mayor cantidad de oyentes.</p>
        </div>
      </section>
      <Footer brand="records" />
    </div>
  );
}

function DesignServicesPage({ onBack, onContact }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  const services = BRANDS.design.services;
  return (
    <div data-brand="design">
      <section style={{ background: "var(--negro-500)", color: "var(--blanco-50)", padding: "26px 40px 48px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div><button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button></div>
          <div style={{ marginTop: 20 }}><Eyebrow style={{ color: "var(--rojo-500)" }}>Servicios de diseño</Eyebrow></div>
          <MixedTitle size="clamp(34px, 5vw, 56px)" color="var(--blanco-50)" style={{ margin: "14px 0 12px" }}>Diseño hecho a tu medida</MixedTitle>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55, color: "var(--blanco-600)", maxWidth: 620, margin: 0 }}>
            Cada proyecto de diseño es distinto, así que no trabajamos con precios fijos: cuéntanos qué necesitas y te enviamos una cotización a la medida.
          </p>
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "48px 40px 72px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
            {services.map((s, i) => (
              <Card key={i} variant="sticker" pad="lg" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span aria-hidden="true" style={{ width: 16, height: 16, borderRadius: "50%", background: TONE_DOT[s.tone] || "var(--ink)", border: "2px solid var(--ink)", boxShadow: "var(--shadow-sticker-sm)" }}></span>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, lineHeight: 1.1, marginTop: 4 }}>{s.t}</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.45, margin: 0 }}>{s.d}</p>
              </Card>
            ))}
          </div>
          <Card variant="sticker" pad="lg" style={{ background: "var(--rojo-500)", color: "var(--blanco-50)", display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, lineHeight: 1.15 }}>Pide tu cotización</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.5, color: "var(--blanco-300)", margin: 0 }}>Cuéntanos tu proyecto y te respondemos con una propuesta y su precio en menos de 48 horas.</p>
            </div>
            <Button variant="secondary" sticker onClick={onContact} style={{ whiteSpace: "nowrap" }}>Cuéntanos tu proyecto</Button>
          </Card>
        </div>
      </section>
      <Footer brand="design" />
    </div>
  );
}

/* ---- PORTFOLIO PAGE (Records) ----------------------------------- */
const PORTFOLIO_ITEMS = [
  { artist: "La Tortuga Eléctrica", work: "Caparazón — LP", svc: "Mezcla + Mastering", tone: "yellow", year: "2025", cover: `${ASSET}/illustrations/guitarrista-1.svg`, tracks: ["Ruta lenta", "Neon caparazón"], d: "Diez canciones grabadas en vivo en una sola sala. Mezcla analógica y master para vinilo y streaming." },
  { artist: "Camila Sur", work: "Canciones del Sur — EP", svc: "Producción + Mezcla", tone: "purple", year: "2025", cover: `${ASSET}/illustrations/musica-para-llevar.svg`, tracks: ["Viento norte", "La despedida"], d: "Producción completa desde la maqueta de voz y guitarra hasta el master final." },
  { artist: "Barrio Vinilo", work: "Cumbia Espacial — Single", svc: "Mastering + Portada", tone: "red", year: "2026", cover: `${ASSET}/illustrations/el-pibe-de-mi-barrio-yellow.svg`, tracks: ["Cumbia espacial"], d: "Master pensado para la pista y arte de portada serigrafiado a mano." },
];
const PORTFOLIO_DESIGN = [
  { client: "Festival Apoya lo Local", work: "Poster de evento", tone: "red", year: "2025", img: `${ASSET}/illustrations/apoya.svg`, d: "Cartel serigrafiado para la edición 2025 del festival." },
  { client: "Camila Sur", work: "Portada de álbum", tone: "purple", year: "2025", img: `${ASSET}/illustrations/mama-quiero-ser-artista-photo.png`, d: "Arte de portada para “Mamá, quiero ser artista”." },
  { client: "El Pibe de mi Barrio", work: "Identidad visual", tone: "yellow", year: "2026", img: `${ASSET}/illustrations/el-pibe-de-mi-barrio-green.svg`, d: "Marca e ilustraciones para el proyecto y su merch." },
];

function TrackPlayer({ name, tone, src }) {
  const [playing, setPlaying] = React.useState(false);
  const [pct, setPct] = React.useState(0);
  const raf = React.useRef(null);
  const audioRef = React.useRef(null);
  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);
  const tick = () => {
    if (audioRef.current && audioRef.current.duration) {
      setPct((audioRef.current.currentTime / audioRef.current.duration) * 100);
    } else {
      setPct((p) => { const n = p + 0.35; if (n >= 100) { setPlaying(false); return 0; } return n; });
    }
    raf.current = requestAnimationFrame(tick);
  };
  const toggle = () => {
    if (playing) {
      cancelAnimationFrame(raf.current);
      if (audioRef.current) audioRef.current.pause();
      setPlaying(false);
    } else {
      if (audioRef.current) audioRef.current.play();
      setPlaying(true);
      raf.current = requestAnimationFrame(tick);
    }
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 12px", border: "1.5px solid var(--hairline)", borderRadius: "var(--radius-md)", background: "var(--blanco-50)" }}>
      {src ? <audio ref={audioRef} src={src} onEnded={() => { setPlaying(false); setPct(0); cancelAnimationFrame(raf.current); }}></audio> : null}
      <button onClick={toggle} aria-label={playing ? "Pausar" : "Reproducir"} style={{
        width: 34, height: 34, borderRadius: "50%", border: "2px solid var(--ink)", cursor: "pointer",
        background: TONE_DOT[tone] || "var(--amarillo-500)", color: "var(--negro-500)",
        display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        boxShadow: "var(--shadow-sticker-sm)",
      }}>
        <Icon name={playing ? "pause" : "play"} size={14} />
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
        <div style={{ height: 4, borderRadius: 2, background: "var(--blanco-400)", marginTop: 6, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "var(--negro-500)", transition: "width 120ms linear" }}></div>
        </div>
      </div>
    </div>
  );
}

function PortfolioPage({ onBack }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div data-brand="records">
      <section style={{ background: "var(--negro-500)", color: "var(--blanco-50)", padding: "26px 40px 48px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div><button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button></div>
          <div style={{ marginTop: 20 }}><Eyebrow style={{ color: "var(--amarillo-500)" }}>Portafolio</Eyebrow></div>
          <MixedTitle size="clamp(34px, 5vw, 56px)" color="var(--blanco-50)" style={{ margin: "14px 0 12px" }}>Trabajos hechos en casa</MixedTitle>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55, color: "var(--blanco-600)", maxWidth: 560, margin: 0 }}>
            Lanzamientos que pasaron por el sello: escucha los tracks y mira el arte de cada proyecto.
          </p>
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "48px 40px 72px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
          <div>
            <Eyebrow>AUDIO</Eyebrow>
            <MixedTitle size="34px" style={{ marginTop: 10 }}>Lanzamientos del sello</MixedTitle>
          </div>
          {PORTFOLIO_ITEMS.map((w, i) => (
            <Card key={i} variant="sticker" pad="none" style={{ overflow: "hidden", display: "grid", gridTemplateColumns: "380px 1fr" }}>
              <div style={{ background: TONE_DOT[w.tone], borderRight: "2px solid var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 260 }}>
                <img src={w.cover} alt={`Portada de ${w.work}`} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 24, boxSizing: "border-box" }} />
              </div>
              <div style={{ padding: 26, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <Badge tone={w.tone} sticker>{w.svc}</Badge>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--ink-muted)" }}>{w.year}</span>
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, lineHeight: 1.1, marginTop: 4 }}>{w.work}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink-muted)" }}>{w.artist}</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.55, color: "var(--ink)", margin: "2px 0 6px", maxWidth: 560 }}>{w.d}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 460 }}>
                  {w.tracks.map((tname) => <TrackPlayer key={tname} name={tname} tone={w.tone} />)}
                </div>
              </div>
            </Card>
          ))}
          <div style={{ marginTop: 20 }}>
            <Eyebrow>Diseño</Eyebrow>
            <MixedTitle size="34px" style={{ marginTop: 10 }}>Piezas gráficas del estudio</MixedTitle>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {PORTFOLIO_DESIGN.map((w, i) => (
              <Card key={i} variant="sticker" pad="none" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ background: TONE_DOT[w.tone], borderBottom: "2px solid var(--ink)", aspectRatio: "4 / 3", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <img src={w.img} alt={`${w.work} — ${w.client}`} style={{ width: "100%", height: "100%", objectFit: w.img.endsWith(".png") ? "cover" : "contain", padding: w.img.endsWith(".png") ? 0 : 20, boxSizing: "border-box" }} />
                </div>
                <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Badge tone={w.tone} sticker>{w.work}</Badge>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--ink-muted)" }}>{w.year}</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, lineHeight: 1.15, marginTop: 4 }}>{w.client}</div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.5, color: "var(--ink-muted)", margin: 0 }}>{w.d}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer brand="records" />
    </div>
  );
}

/* ---- FREEBIES PAGE (Records) ------------------------------------ */
function FreebiesPage({ onBack, onAuth }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div data-brand="records">
      <section style={{ background: "var(--negro-500)", color: "var(--blanco-50)", padding: "26px 40px 48px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div><button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button></div>
          <div style={{ marginTop: 20 }}><Eyebrow style={{ color: "var(--amarillo-500)" }}>Freebies</Eyebrow></div>
          <MixedTitle size="clamp(34px, 5vw, 56px)" color="var(--blanco-50)" style={{ margin: "14px 0 12px" }}>Regalos para tu proyecto</MixedTitle>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55, color: "var(--blanco-600)", maxWidth: 560, margin: 0 }}>
            Gratis, sin letra pequeña.
          </p>
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "48px 40px 72px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
          <Card variant="sticker" pad="lg" style={{ background: "var(--amarillo-500)", display: "flex", alignItems: "center", gap: 24 }}>
            <Badge tone="ink" sticker>Concurso mensual</Badge>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 24, lineHeight: 1.15 }}>Mezcla + mastering gratis cada mes</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.5, color: "var(--negro-700)", margin: 0, maxWidth: 620 }}>
                Cada mes sorteamos un servicio completo de mezcla y mastering entre los proyectos que se postulan. Sube tu track y cruza los dedos.
              </p>
            </div>
            <Button variant="secondary" sticker style={{ whiteSpace: "nowrap" }}>Participar</Button>
          </Card>
          <Card variant="sticker" pad="lg" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div><Badge tone="red" sticker>Descarga gratis</Badge></div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 24, lineHeight: 1.15, marginTop: 8 }}>Una plantilla de contrato, gratis</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.5, color: "var(--ink-muted)", margin: 0, maxWidth: 560 }}>
                Elige una de nuestras plantillas de contratos musicales, lista para firmar. Solo necesitas una cuenta.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="primary" sticker onClick={onAuth} style={{ whiteSpace: "nowrap" }}>Reclámalo aquí</Button>
            </div>
          </Card>
        </div>
      </section>
      <Footer brand="records" />
    </div>
  );
}

/* ---- CHARLA PAGE (Records) -------------------------------------- */
function CharlaPage({ onBack }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  const [contact, setContact] = React.useState({ correo: true, whatsapp: false });
  const toggleContact = (k) => setContact((c) => ({ ...c, [k]: !c[k] }));
  const redes = ["instagram", "youtube", "tiktok", "facebook"];
  return (
    <div data-brand="records">
      <section style={{ background: "var(--negro-500)", color: "var(--blanco-50)", padding: "26px 40px 48px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div><button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button></div>
          <div style={{ marginTop: 20 }}><Eyebrow style={{ color: "var(--amarillo-500)" }}>Charla con nosotros</Eyebrow></div>
          <MixedTitle size="clamp(34px, 5vw, 56px)" color="var(--blanco-50)" style={{ margin: "14px 0 12px" }}>Cuéntanos de tu proyecto</MixedTitle>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55, color: "var(--blanco-600)", maxWidth: 560, margin: 0 }}>
            Sin formularios eternos ni respuestas automáticas: nos escribes, te leemos y charlamos.
          </p>
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "48px 40px 72px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 24, alignItems: "start" }}>
          <Card variant="sticker" pad="lg" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 24, lineHeight: 1.15 }}>Escríbenos</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Input label="Tu nombre" placeholder="Camila Sur" />
              <Input label="Nombre artístico" placeholder="La Tortuga Sound" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="charla-msg" style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13, color: "var(--ink)", letterSpacing: "0.01em" }}>¿De qué quieres charlar?</label>
              <textarea id="charla-msg" rows={5} placeholder="Mi EP necesita mezcla y no sé por dónde empezar…" style={{ fontFamily: "var(--font-ui)", fontSize: 15, color: "var(--ink)", background: "var(--surface-card)", padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "var(--border-bold) solid var(--negro-300)", outline: "none", boxSizing: "border-box", width: "100%", resize: "vertical" }}></textarea>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13, color: "var(--ink)", letterSpacing: "0.01em", display: "block", marginBottom: 4 }}>¿Cómo prefieres que te contactemos?</span>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-muted)", margin: "0 0 10px" }}>Puedes marcar ambos si quieres que te avisemos por los dos medios.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[["correo", "mail", "Correo", "E-mail", "hola@correo.com"], ["whatsapp", "message-circle", "WhatsApp", "Número de WhatsApp", "+34 600 000 000"]].map(([k, ic, lbl, fieldLbl, ph]) => (
                  <div key={k} style={{ display: "grid", gridTemplateColumns: "170px 1fr", gap: 14, alignItems: "end" }}>
                    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--ink)", cursor: "pointer", padding: "10px 0" }}>
                      <span onClick={() => toggleContact(k)} role="checkbox" aria-checked={contact[k]} style={{ width: 22, height: 22, flexShrink: 0, border: "2px solid var(--ink)", borderRadius: 6, background: contact[k] ? "var(--amarillo-500)" : "var(--blanco-50)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: contact[k] ? "var(--shadow-sticker-sm)" : "none" }}><span style={{ display: "inline-flex", visibility: contact[k] ? "visible" : "hidden" }}><Icon name="check" size={14} /></span></span>
                      <span onClick={() => toggleContact(k)} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name={ic} size={16} /> {lbl}</span>
                    </label>
                    <div style={{ opacity: contact[k] ? 1 : 0.4, pointerEvents: contact[k] ? "auto" : "none" }}><Input label={fieldLbl} placeholder={ph} disabled={!contact[k]} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div><Button variant="primary" sticker>Enviar mensaje</Button></div>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Card variant="sticker" pad="lg" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20 }}>Síguenos aquí</div>
              <div style={{ display: "flex", gap: 12 }}>
                {redes.map((n) => (
                  <a key={n} href="#" aria-label={n} style={{ width: 46, height: 46, borderRadius: "50%", border: "2px solid var(--ink)", background: "var(--amarillo-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-sticker-sm)", color: "var(--negro-500)" }}>
                    <Icon name={n === "tiktok" ? "music-2" : n} size={20} color="var(--negro-500)" />
                  </a>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-muted)", margin: 0, fontStyle: "italic" }}>Ideas y recursos semanales para tu proyecto</p>
            </Card>
          </div>
        </div>
      </section>
      <Footer brand="records" />
    </div>
  );
}

/* ---- POSTULA PAGE (Records) -------------------------------------- */
function PostulaPage({ onBack }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  const [contact, setContact] = React.useState({ correo: true, whatsapp: false });
  const toggleContact = (k) => setContact((c) => ({ ...c, [k]: !c[k] }));
  return (
    <div data-brand="records">
      <section style={{ background: "var(--negro-500)", color: "var(--blanco-50)", padding: "26px 40px 48px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div><button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button></div>
          <div style={{ marginTop: 20 }}><Eyebrow style={{ color: "var(--amarillo-500)" }}>Postula tu proyecto</Eyebrow></div>
          <MixedTitle size="clamp(34px, 5vw, 56px)" color="var(--blanco-50)" style={{ margin: "14px 0 12px" }}>Cuéntanos qué estás creando</MixedTitle>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55, color: "var(--blanco-600)", maxWidth: 620, margin: 0 }}>
            Sabemos lo difícil que puede ser estructurar un proyecto musical: registros, regalías, música, promoción… puede resultar muy agobiante. Déjanos echarle un vistazo al tuyo y veamos cómo podemos ayudarte.
          </p>
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "48px 40px 72px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 24, alignItems: "start" }}>
          <Card variant="sticker" pad="lg" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 24, lineHeight: 1.15 }}>Tu proyecto</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Input label="Tu nombre" placeholder="Camila Sur" />
              <Input label="Nombre artístico" placeholder="La Tortuga Sound" />
            </div>
            <Input label="Enlace a tu música" placeholder="Spotify, SoundCloud, YouTube…" />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="postula-msg" style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13, color: "var(--ink)", letterSpacing: "0.01em" }}>Cuéntanos de tu proyecto</label>
              <textarea id="postula-msg" rows={5} placeholder="En qué etapa estás, qué tienes grabado, qué te está costando más…" style={{ fontFamily: "var(--font-ui)", fontSize: 15, color: "var(--ink)", background: "var(--surface-card)", padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "var(--border-bold) solid var(--negro-300)", outline: "none", boxSizing: "border-box", width: "100%", resize: "vertical" }}></textarea>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13, color: "var(--ink)", letterSpacing: "0.01em", display: "block", marginBottom: 4 }}>¿Cómo prefieres que te contactemos?</span>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-muted)", margin: "0 0 10px" }}>Puedes marcar ambos si quieres que te avisemos por los dos medios.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[["correo", "mail", "Correo", "E-mail", "hola@correo.com"], ["whatsapp", "message-circle", "WhatsApp", "Número de WhatsApp", "+34 600 000 000"]].map(([k, ic, lbl, fieldLbl, ph]) => (
                  <div key={k} style={{ display: "grid", gridTemplateColumns: "170px 1fr", gap: 14, alignItems: "end" }}>
                    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--ink)", cursor: "pointer", padding: "10px 0" }}>
                      <span onClick={() => toggleContact(k)} role="checkbox" aria-checked={contact[k]} style={{ width: 22, height: 22, flexShrink: 0, border: "2px solid var(--ink)", borderRadius: 6, background: contact[k] ? "var(--amarillo-500)" : "var(--blanco-50)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: contact[k] ? "var(--shadow-sticker-sm)" : "none" }}><span style={{ display: "inline-flex", visibility: contact[k] ? "visible" : "hidden" }}><Icon name="check" size={14} /></span></span>
                      <span onClick={() => toggleContact(k)} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name={ic} size={16} /> {lbl}</span>
                    </label>
                    <div style={{ opacity: contact[k] ? 1 : 0.4, pointerEvents: contact[k] ? "auto" : "none" }}><Input label={fieldLbl} placeholder={ph} disabled={!contact[k]} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div><Button variant="primary" sticker>Postular mi proyecto</Button></div>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Card variant="sticker" pad="lg" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20 }}>¿Qué pasa después?</div>
              {[["headphones", "Escuchamos tu música y revisamos tu proyecto con calma."], ["message-circle", "Te escribimos en menos de una semana por el medio que elijas."], ["rocket", "Si encajamos, armamos juntos el plan para tu lanzamiento."]].map(([ic, txt], i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ width: 38, height: 38, borderRadius: "50%", border: "2px solid var(--ink)", background: "var(--amarillo-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "var(--shadow-sticker-sm)" }}><Icon name={ic} size={16} color="var(--negro-500)" /></span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.5, color: "var(--ink-muted)", margin: "8px 0 0" }}>{txt}</p>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </section>
      <Footer brand="records" />
    </div>
  );
}

/* ---- AUTH PAGE ---------------------------------------------------- */
function AuthPage({ brand, onBack, onLogin }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  const [mode, setMode] = React.useState("login");
  const accent = brand === "academy" ? "var(--verde-500)" : "var(--amarillo-500)";
  const tabStyle = (active) => ({
    flex: 1, padding: "10px 0", cursor: "pointer", textAlign: "center",
    fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600,
    border: "2px solid var(--ink)", borderRadius: "var(--radius-pill)",
    background: active ? accent : "transparent", color: "var(--negro-500)",
    boxShadow: active ? "var(--shadow-sticker-sm)" : "none",
    transition: "all var(--dur-base) var(--ease-out)",
  });
  return (
    <div data-brand={brand}>
      <section style={{ background: "var(--negro-500)", padding: "26px 40px 0", borderBottom: "none" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button>
        </div>
      </section>
      <section style={{ background: "var(--negro-500)", padding: "40px 40px 88px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 440, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 26 }}>
            <Lockup brand={brand === "academy" ? "paper" : "yellow"} sublabel={brand} size={34} stacked={false} />
          </div>
          <Card variant="sticker" pad="lg" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setMode("login")} style={tabStyle(mode === "login")}>Iniciar sesión</button>
              <button onClick={() => setMode("signup")} style={tabStyle(mode === "signup")}>Registrarse</button>
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, lineHeight: 1.15, marginTop: 4 }}>
              {mode === "login" ? "Qué bueno verte de nuevo" : "Bienvenido a la casa"}
            </div>
            {mode === "signup" ? <Input label="Tu nombre" placeholder="Camila Sur" /> : null}
            <Input label="Tu correo" placeholder="hola@mandioca.com" type="email" />
            <Input label="Contraseña" placeholder="••••••••" type="password" helper={mode === "signup" ? "Mínimo 8 caracteres" : undefined} />
            {mode === "login" ? (
              <a href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: "var(--ink)", alignSelf: "flex-start" }}>¿Olvidaste tu contraseña?</a>
            ) : null}
            <Button variant="primary" sticker full onClick={onLogin}>{mode === "login" ? "Entrar" : "Crear cuenta"}</Button>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-muted)", textAlign: "center" }}>
              {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setMode(mode === "login" ? "signup" : "login"); }} style={{ fontWeight: 600, color: "var(--ink)" }}>
                {mode === "login" ? "Regístrate" : "Inicia sesión"}
              </a>
            </div>
          </Card>
        </div>
      </section>
      <Footer brand={brand} />
    </div>
  );
}

/* ---- CUENTA (logged-in dashboard) -------------------------------- */
const STAGE_BASE = ["Enviada por el cliente", "Revisión del equipo Mandioca", "Pendiente de pago"];
const STAGE_DESC = {
  "Enviada por el cliente": "Nos mandaste tu solicitud con los detalles del proyecto.",
  "Revisión del equipo Mandioca": "El equipo revisa tu material y arma la cotización a medida.",
  "Pendiente de pago": "La cotización está lista; al pagar, el trabajo entra a producción.",
  "En mezcla": "Tu canción está en la consola: balance, efectos y carácter.",
  "Revisión contigo": "Te enviamos una versión para que pidas ajustes (hasta 2 rondas).",
  "Entrega final": "Recibes los archivos finales en todos los formatos que necesitas.",
  "En mastering": "Pulimos volumen y color para que suene bien en cualquier parlante.",
  "Sesión agendada": "Ya tiene fecha y hora; te llega el enlace de la videollamada.",
  "Completada": "Sesión realizada. El resumen y los materiales quedan en tu correo.",
  "Propuestas de diseño": "El equipo prepara las rutas gráficas para presentar.",
  "Exploración visual": "Moodboard y primeras direcciones visuales del proyecto.",
  "Ajustes con cliente": "Se afinan las propuestas con el feedback del cliente.",
  "Entrega de archivos": "Archivos finales en todos los formatos acordados.",
};
const MY_ORDERS = [
  { svc: "Mezcla", tone: "yellow", icon: "sliders-horizontal", proj: "“Neones” · 8 stems", id: "MDC-0142", steps: [...STAGE_BASE, "En mezcla", "Revisión contigo", "Entrega final"], at: 2, note: "Tu cotización está lista: $40. Paga para que arranquemos.",
    msgs: ["Recibimos “Neones” y tus 8 stems el 10 de julio. Todo llegó completo, Camila.", "Revisamos tus stems: están bien grabados y listos para mezclar. Cotización cerrada en $40.", "Falta tu pago de $40 para arrancar. Apenas pagues, “Neones” entra a la consola.", "Tu mezcla arranca después del pago. Tiempo estimado: 5 días hábiles.", "Cuando la mezcla esté lista te enviaremos la v1 de “Neones” para tus comentarios.", "Al aprobar la mezcla recibirás WAV, MP3 y stems mezclados de “Neones”."] },
  { svc: "Asesorías", tone: "blue", icon: "messages-square", proj: "Asesoría 1:1 · regalías", id: "MDC-0137", steps: [...STAGE_BASE, "Sesión agendada", "Completada"], at: 3, note: "Nos vemos el jueves 16 · 10:00. Te llega el enlace por correo.",
    msgs: ["Pediste una asesoría sobre regalías el 8 de julio. ¡Buen tema, Camila!", "Le asignamos tu caso a Juli, nuestra especialista en regalías y distribución.", "Pagaste los 21.99 € el 9 de julio. ¡Gracias! Quedaba solo elegir la fecha.", "Tu sesión con Juli quedó para el jueves 16 · 10:00. El enlace llega a tu correo el mismo día.", "Después de la sesión te enviaremos el resumen con los pasos para cobrar tus regalías."] },
  { svc: "Mastering", tone: "purple", icon: "disc-3", proj: "EP “Barrio Vinilo” · 4 tracks", id: "MDC-0151", steps: [...STAGE_BASE, "En mastering", "Entrega final"], at: 0, note: "Recibimos tu solicitud. El equipo la revisa en menos de 48 h.",
    msgs: ["Recibimos los 4 tracks del EP “Barrio Vinilo” hoy a las 9:14. Todo en orden.", "El equipo está escuchando tus mezclas; en menos de 48 h te llega la cotización.", "Cuando la cotización esté lista, aquí verás el monto y el botón de pago.", "El mastering del EP arranca al confirmar el pago. Estimado: 3 días hábiles.", "Al final recibirás los 4 masters en WAV + versiones para streaming."] },
];
const MY_CODES = [
  { code: "DESCUENTO-VERANO", d: "10% en mezcla · 2 jul" },
  { code: "ELPRODUCER10", d: "10% partner · 9 jul" },
  { code: "MANDIOCA-LEO24", d: "referido · al crear tu cuenta" },
];
const CONTRACTS = [
  { n: "Split sheet", d: "Reparte la autoría de una canción antes de publicarla.", tone: "yellow" },
  { n: "Contrato de featuring", d: "Colabora con otro artista con reglas claras.", tone: "purple" },
  { n: "Licencia de sincronización", d: "Tu música en video, cine o publicidad.", tone: "blue" },
  { n: "Contrato de management", d: "Define el trato con tu mánager desde el día uno.", tone: "red" },
];
function StageTrack({ steps, at, tone, sel, onPick }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      {steps.map((s, i) => {
        const done = i < at, curr = i === at, active = sel === i;
        return (
          <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, position: "relative", minWidth: 0 }}>
            {i > 0 ? <span style={{ position: "absolute", top: 12, right: "50%", width: "100%", height: 3, background: i <= at ? TONE_DOT[tone] : "var(--blanco-400)", zIndex: 0 }}></span> : null}
            <button onClick={() => onPick(active ? null : i)} aria-label={`Etapa: ${s}`} style={{ width: 26, height: 26, borderRadius: "50%", zIndex: 1, flexShrink: 0, padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--ink)", background: done ? TONE_DOT[tone] : curr ? "var(--negro-500)" : "var(--blanco-50)", color: done ? "var(--negro-500)" : "var(--blanco-50)", boxShadow: active ? "var(--shadow-sticker)" : curr ? "var(--shadow-sticker-sm)" : "none", transform: active ? "scale(1.25)" : "none", transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)" }}>
              {done ? <Icon name="check" size={13} /> : curr ? <span style={{ width: 8, height: 8, borderRadius: "50%", background: TONE_DOT[tone] }}></span> : null}
            </button>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: curr || active ? 700 : 500, lineHeight: 1.25, textAlign: "center", color: curr || active ? "var(--ink)" : done ? "var(--ink)" : "var(--ink-muted)", padding: "0 6px", textDecoration: active ? "underline" : "none" }}>{s}</span>
          </div>
        );
      })}
    </div>
  );
}
function StageDetail({ order, i }) {
  const s = order.steps[i];
  const done = i < order.at, curr = i === order.at;
  const status = done ? "Completada" : curr ? "En curso" : "Pendiente";
  return (
    <div style={{ border: "2px solid var(--ink)", borderRadius: "var(--radius-md)", background: "var(--blanco-200)", padding: "14px 18px", display: "flex", flexDirection: "column", gap: 8, animation: "ddItem .22s var(--ease-out) both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15 }}>{s}</span>
        <Badge tone={done ? order.tone : curr ? "ink" : "paper"} sticker>{status}</Badge>
      </div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "var(--ink-muted)" }}>{STAGE_DESC[s]}</div>
      <div style={{ display: "flex", gap: 9, alignItems: "flex-start", fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.5, color: "var(--ink)" }}>
        <span style={{ marginTop: 2, flexShrink: 0, display: "inline-flex" }}><Icon name="message-circle" size={15} /></span>
        <span><strong>{order.client ? "Nota interna:" : "Tu proyecto:"}</strong> {order.msgs[i]}</span>
      </div>
    </div>
  );
}
function CuentaPage({ onBack, onService }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  const [copied, setCopied] = React.useState(false);
  const [sel, setSel] = React.useState({});
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [copied, sel]);
  const code = "MANDIOCA-CAMI24";
  const copy = () => { try { navigator.clipboard.writeText(code); } catch (e) {} setCopied(true); setTimeout(() => setCopied(false), 1600); };
  return (
    <div data-brand="records">
      <section style={{ background: "var(--negro-500)", padding: "26px 40px 56px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 28, flexWrap: "wrap", marginTop: 26 }}>
            <div style={{ minWidth: 280 }}>
              <Eyebrow style={{ color: "var(--amarillo-500)" }}>Mi cuenta</Eyebrow>
              <MixedTitle size="clamp(34px, 5vw, 52px)" color="var(--blanco-50)" style={{ margin: "12px 0 10px" }}>Hola, Camila</MixedTitle>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.55, color: "var(--blanco-600)", maxWidth: 480, margin: 0 }}>Aquí vive todo lo tuyo: tus trabajos en curso, tus plantillas y tus puntos Mandioca.</p>
            </div>
            <div style={{ background: "var(--amarillo-500)", border: "2px solid var(--ink)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sticker)", padding: "18px 22px", display: "flex", alignItems: "center", gap: 20, transform: "rotate(-0.5deg)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--negro-500)" }}>Puntos Mandioca</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 44, lineHeight: 1, color: "var(--negro-500)", marginTop: 4 }}>320</div>
              </div>
              <div style={{ width: 2, alignSelf: "stretch", background: "var(--ink)", opacity: 0.25 }}></div>
              <div style={{ maxWidth: 250 }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.45, color: "var(--negro-500)" }}>Comparte tu código: por cada persona que llegue con él ganas <strong>50 pts</strong> para canjear en servicios.</div>
                <button onClick={copy} style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 700, padding: "7px 12px", background: "var(--negro-500)", color: "var(--amarillo-500)", border: "2px solid var(--ink)", borderRadius: "var(--radius-pill)" }}>{code} <Icon name={copied ? "check" : "copy"} size={14} />{copied ? " copiado" : ""}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "56px 40px 26px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <Eyebrow>Tus servicios</Eyebrow>
            <MixedTitle size="34px" style={{ marginTop: 10 }}>En qué va cada cosa</MixedTitle>
          </div>
          {MY_ORDERS.map((o) => (
            <Card key={o.id} variant="sticker" pad="lg" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <span style={{ width: 42, height: 42, borderRadius: "var(--radius-sm)", border: "2px solid var(--ink)", background: TONE_DOT[o.tone], display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={o.icon} size={19} color="var(--negro-500)" /></span>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18 }}>{o.svc} · {o.proj}</div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--ink-muted)" }}>Solicitud {o.id}</div>
                </div>
                <Badge tone={o.at === 2 ? "red" : o.tone} sticker>{o.steps[o.at]}</Badge>
              </div>
              <StageTrack steps={o.steps} at={o.at} tone={o.tone} sel={sel[o.id]} onPick={(i) => setSel((p) => ({ ...p, [o.id]: i }))} />
              {sel[o.id] != null ? <StageDetail order={o} i={sel[o.id]} /> : null}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink)" }}>{o.note}</div>
                {o.at === 2 ? <Button variant="primary" sticker onClick={() => onService && onService(o.svc)}>Pagar ahora</Button> : null}
              </div>
            </Card>
          ))}
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "40px 40px 72px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
            <div>
              <Eyebrow>Plantillas de contratos</Eyebrow>
              <MixedTitle size="34px" style={{ marginTop: 10 }}>Listas para firmar</MixedTitle>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
            {CONTRACTS.map((c) => (
              <Card key={c.n} variant="sticker" pad="md" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ width: 42, height: 42, borderRadius: "var(--radius-sm)", border: "2px solid var(--ink)", background: TONE_DOT[c.tone], display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="file-text" size={19} color="var(--negro-500)" /></span>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, lineHeight: 1.2 }}>{c.n}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.45, color: "var(--ink-muted)", flex: 1 }}>{c.d}</div>
                <Button variant="secondary" sticker full><Icon name="download" size={15} style={{ marginRight: 7 }} />Descargar</Button>
              </Card>
            ))}
          </div>
          <div style={{ marginTop: 26 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: "var(--ink-muted)" }}><Icon name="ticket-x" size={14} /> Códigos ya usados</div>
            <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {MY_CODES.map((c) => (
                <span key={c.code} title="Usado · ya no funciona" style={{ display: "inline-flex", alignItems: "baseline", gap: 6, padding: "5px 12px", borderRadius: "var(--radius-pill)", border: "1.5px solid var(--blanco-400)", background: "var(--blanco-200)", fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--ink-muted)" }}><span style={{ fontWeight: 700, letterSpacing: "0.04em", textDecoration: "line-through" }}>{c.code}</span><span>{c.d}</span></span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer brand="records" />
    </div>
  );
}

/* ---- PANEL DEL EQUIPO (developer view) --------------------------- */
const TEAM_REQUESTS = [
  { client: "Barrio Vinilo", svc: "Mastering", tone: "purple", icon: "disc-3", detail: "EP · 4 tracks", when: "hace 2 h", id: "MDC-0151" },
  { client: "Leo Andrade", svc: "Mezcla", tone: "yellow", icon: "sliders-horizontal", detail: "Single · 12 stems", when: "hace 5 h", id: "MDC-0152" },
  { client: "Sofía Prado", svc: "Asesorías", tone: "blue", icon: "messages-square", detail: "Distribución digital", when: "ayer", id: "MDC-0153" },
];
const TEAM_TASKS = [
  { t: "Cotizar mastering del EP “Barrio Vinilo”", tone: "purple", done: false },
  { t: "Mezcla v1 de “Neones” — balance de voces", tone: "yellow", done: false },
  { t: "Preparar sesión de regalías (Camila Sur)", tone: "blue", done: true },
  { t: "Subir plantilla de sync actualizada", tone: "red", done: false },
];
const TEAM_JOBS = [
  { area: "audio", client: "Camila Sur", svc: "Mezcla", tone: "yellow", icon: "sliders-horizontal", proj: "“Neones” · 8 stems", id: "MDC-0142", steps: [...STAGE_BASE, "En mezcla", "Revisión contigo", "Entrega final"], at: 2, due: "Entrega estimada: 22 jul",
    msgs: ["Solicitud recibida el 10 jul con 8 stems completos.", "Stems revisados por Nico; cotización de $40 enviada el 11 jul.", "Esperando el pago de la clienta para agendar en consola.", "Asignada a Nico · sesión reservada para el 18 jul.", "Enviar v1 y esperar comentarios (máx. 2 rondas).", "Exportar WAV, MP3 y stems mezclados; cerrar el ticket."] },
  { area: "audio", client: "Camila Sur", svc: "Asesorías", tone: "blue", icon: "messages-square", proj: "Asesoría 1:1 · regalías", id: "MDC-0137", steps: [...STAGE_BASE, "Sesión agendada", "Completada"], at: 3, due: "Jueves 16 · 10:00",
    msgs: ["Solicitud del 8 jul: dudas sobre cobro de regalías.", "Caso asignado a Juli (regalías y distribución).", "Pago de 21.99 € confirmado el 9 jul.", "Sesión agendada; enviar enlace el mismo día a las 8:00.", "Enviar resumen y checklist de regalías tras la sesión."] },
  { area: "diseño", client: "Barrio Vinilo", svc: "Portada & Arte", tone: "red", icon: "palette", proj: "Carátula EP · 3 propuestas", id: "MDC-0144", steps: [...STAGE_BASE, "Propuestas de diseño", "Ajustes con cliente", "Entrega de archivos"], at: 3, due: "Propuestas: 17 jul",
    msgs: ["Brief recibido el 9 jul: estética cumbia psicodélica, paleta cálida.", "Brief revisado por Vale; cotización enviada el 10 jul.", "Pago confirmado el 11 jul.", "Vale trabaja las 3 propuestas; presentarlas el 17 jul.", "Recoger feedback y hacer máx. 2 rondas de ajustes.", "Exportar portada en RGB/CMYK + versiones para streaming."] },
  { area: "diseño", client: "Leo Andrade", svc: "Identidad de marca", tone: "purple", icon: "pen-tool", proj: "Logo + sistema visual", id: "MDC-0148", steps: [...STAGE_BASE, "Exploración visual", "Ajustes con cliente", "Entrega de archivos"], at: 1, due: "Cotización: antes del 15 jul",
    msgs: ["Solicitud del 12 jul: identidad completa para su proyecto solista.", "En revisión: definir alcance (logo, tipografía, guía de uso) y cotizar.", "Al cotizar, aquí aparece el monto y el estado del pago.", "Moodboard y primeras rutas gráficas tras el pago.", "Presentar rutas y ajustar con el cliente.", "Entregar logo, paleta, tipografías y guía en PDF."] },
];
const JOB_AREAS = [
  { key: "audio", label: "Audio", icon: "audio-lines", tone: "yellow" },
  { key: "diseño", label: "Diseño", icon: "palette", tone: "red" },
];
function TeamPage({ onBack, embedded }) {
  React.useEffect(() => { if (!embedded) window.scrollTo(0, 0); }, []);
  const [reqs, setReqs] = React.useState(TEAM_REQUESTS.map((r) => ({ ...r, sent: false })));
  const [tasks, setTasks] = React.useState(TEAM_TASKS);
  const [jobs, setJobs] = React.useState(TEAM_JOBS);
  const [sel, setSel] = React.useState({});
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [reqs, tasks, jobs, sel]);
  const pending = reqs.filter((r) => !r.sent).length;
  const openTasks = tasks.filter((t) => !t.done).length;
  const advance = (id) => setJobs((js) => js.map((j) => j.id === id ? { ...j, at: Math.min(j.at + 1, j.steps.length - 1) } : j));
  const chip = (n, label, tone) => (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--negro-700)", border: "1.5px solid var(--negro-600)", borderRadius: "var(--radius-pill)", padding: "8px 16px" }}>
      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: TONE_DOT[tone] }}>{n}</span>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: "var(--blanco-600)" }}>{label}</span>
    </div>
  );
  return (
    <div data-brand="records">
      {embedded ? (
        <section style={{ background: "var(--paper)", padding: "42px 40px 0" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <Eyebrow>Operación del equipo</Eyebrow>
              <MixedTitle size="30px" style={{ marginTop: 8 }}>Lo que está en el taller</MixedTitle>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--negro-500)", border: "2px solid var(--ink)", borderRadius: "var(--radius-pill)", padding: "8px 16px" }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "var(--amarillo-500)" }}>{pending}</span><span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: "var(--blanco-600)" }}>solicitudes por cotizar</span></span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--negro-500)", border: "2px solid var(--ink)", borderRadius: "var(--radius-pill)", padding: "8px 16px" }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "var(--azul-500)" }}>{openTasks}</span><span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: "var(--blanco-600)" }}>tareas abiertas</span></span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--negro-500)", border: "2px solid var(--ink)", borderRadius: "var(--radius-pill)", padding: "8px 16px" }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "var(--morado-500)" }}>{jobs.filter((j) => j.at < j.steps.length - 1).length}</span><span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: "var(--blanco-600)" }}>trabajos en curso</span></span>
            </div>
          </div>
        </section>
      ) : (
      <section style={{ background: "var(--negro-500)", padding: "26px 40px 52px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button>
          <div style={{ marginTop: 26 }}>
            <Eyebrow style={{ color: "var(--morado-500)" }}>Panel del equipo</Eyebrow>
            <MixedTitle size="clamp(34px, 5vw, 52px)" color="var(--blanco-50)" style={{ margin: "12px 0 14px" }}>Al taller</MixedTitle>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {chip(pending, "solicitudes por cotizar", "yellow")}
              {chip(openTasks, "tareas abiertas", "blue")}
              {chip(jobs.filter((j) => j.at < j.steps.length - 1).length, "trabajos en curso", "purple")}
            </div>
          </div>
        </div>
      </section>
      )}
      <section style={{ background: "var(--paper)", padding: "52px 40px 10px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 22, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <Eyebrow>Solicitudes pendientes</Eyebrow>
              <MixedTitle size="28px" style={{ marginTop: 8 }}>Por cotizar</MixedTitle>
            </div>
            {reqs.map((r) => (
              <Card key={r.id} variant="sticker" pad="md" style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <span style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", border: "2px solid var(--ink)", background: TONE_DOT[r.tone], display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={r.icon} size={18} color="var(--negro-500)" /></span>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16 }}>{r.client}</div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--ink-muted)" }}>{r.svc} · {r.detail} · {r.when}</div>
                </div>
                {r.sent ? <Badge tone={r.tone} sticker>Cotización enviada</Badge> : (
                  <Button variant="secondary" sticker onClick={() => setReqs((rs) => rs.map((x) => x.id === r.id ? { ...x, sent: true } : x))}>Enviar cotización</Button>
                )}
              </Card>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <Eyebrow>Tareas</Eyebrow>
              <MixedTitle size="28px" style={{ marginTop: 8 }}>Para hoy</MixedTitle>
            </div>
            <Card variant="sticker" pad="md" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {tasks.map((t, i) => (
                <button key={t.t} onClick={() => setTasks((ts) => ts.map((x, j) => j === i ? { ...x, done: !x.done } : x))} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 6px", border: "none", borderBottom: i < tasks.length - 1 ? "1.5px solid var(--blanco-300)" : "none", background: "transparent", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ width: 20, height: 20, borderRadius: 6, border: "2px solid var(--ink)", background: t.done ? TONE_DOT[t.tone] : "var(--blanco-50)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{t.done ? <Icon name="check" size={12} color="var(--negro-500)" /> : null}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.4, color: t.done ? "var(--ink-muted)" : "var(--ink)", textDecoration: t.done ? "line-through" : "none" }}>{t.t}</span>
                </button>
              ))}
            </Card>
          </div>
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "42px 40px 72px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <Eyebrow>Trabajos en curso</Eyebrow>
            <MixedTitle size="28px" style={{ marginTop: 8 }}>Etapa por etapa</MixedTitle>
          </div>
          {JOB_AREAS.map((a) => (
            <React.Fragment key={a.key}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                <span style={{ width: 34, height: 34, borderRadius: "50%", border: "2px solid var(--ink)", background: TONE_DOT[a.tone], display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={a.icon} size={16} color="var(--negro-500)" /></span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19 }}>{a.label}</span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: "var(--ink-muted)" }}>{jobs.filter((j) => j.area === a.key).length} trabajos</span>
                <span style={{ flex: 1, height: 2, background: "var(--ink)", opacity: 0.15 }}></span>
              </div>
              {jobs.filter((j) => j.area === a.key).map((o) => (
            <Card key={o.id} variant="sticker" pad="lg" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <span style={{ width: 42, height: 42, borderRadius: "var(--radius-sm)", border: "2px solid var(--ink)", background: TONE_DOT[o.tone], display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={o.icon} size={19} color="var(--negro-500)" /></span>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18 }}>{o.client} · {o.svc} · {o.proj}</div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--ink-muted)" }}>{o.id} · {o.due}</div>
                </div>
                <Badge tone={o.tone} sticker>{o.steps[o.at]}</Badge>
                {o.at < o.steps.length - 1 ? <Button variant="secondary" sticker onClick={() => advance(o.id)}>Avanzar etapa <Icon name="arrow-right" size={15} style={{ marginLeft: 7 }} /></Button> : <Badge tone="ink" sticker>Completado</Badge>}
              </div>
              <StageTrack steps={o.steps} at={o.at} tone={o.tone} sel={sel[o.id]} onPick={(i) => setSel((p) => ({ ...p, [o.id]: i }))} />
              {sel[o.id] != null ? <StageDetail order={o} i={sel[o.id]} /> : null}
            </Card>
              ))}
            </React.Fragment>
          ))}
        </div>
      </section>
      {embedded ? null : <Footer brand="records" />}
    </div>
  );
}

/* ---- PANEL ADMIN (payments + analytics) -------------------------- */
const FEED_IN = [
  ["Camila Sur", "Mezcla · “Neones”", "$40", "Transferencia", { code: "MANDIOCA-RITA24", kind: "referido" }],
  ["Sofía Prado", "Asesoría 1:1", "21.99 €", "Tarjeta", { code: "ELPRODUCER10", kind: "partner", com: "2.20 €" }],
  ["Barrio Vinilo", "Mastering · EP", "$30", "PayPal", null],
  ["Leo Andrade", "Identidad de marca · anticipo", "$60", "Transferencia", { code: "LAFERIA10", kind: "partner", com: "$6" }],
  ["Rita Vega", "Plantilla de sync", "$12", "Tarjeta", { code: "MANDIOCA-CAMI24", kind: "referido" }],
];
const FEED_OUT = [
  ["Nico", "Mezcla “Neones” · honorarios", "$22", "Transferencia"],
  ["Juli", "3 asesorías · honorarios", "39 €", "Transferencia"],
  ["Vale", "Carátula EP · adelanto", "$35", "PayPal"],
];
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul"];
function genPay(i) {
  const out = i % 3 === 2;
  const src = out ? FEED_OUT[Math.floor(i / 3) % FEED_OUT.length] : FEED_IN[(i - Math.floor(i / 3)) % FEED_IN.length];
  let d = 14 - Math.floor(i / 2), m = 6;
  while (d <= 0) { m -= 1; d += 30; }
  const hh = 19 - ((i * 5) % 11), mm = String((i * 17) % 60).padStart(2, "0");
  return { key: `p${i}`, dir: out ? "out" : "in", who: src[0], what: src[1], amt: src[2], via: src[3], cupon: out ? null : src[4], id: (out ? "EQ-" : "PG-") + (320 - i), ok: i >= 3, date: `${d} ${MESES[m]}`, time: `${hh}:${mm}` };
}
function PayFeed() {
  const [count, setCount] = React.useState(8);
  const [done, setDone] = React.useState({});
  const [filter, setFilter] = React.useState("todos");
  const [loading, setLoading] = React.useState(false);
  const endRef = React.useRef(null);
  const MAX = 48;
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [count, done, filter, loading]);
  React.useEffect(() => {
    const el = endRef.current;
    if (!el || count >= MAX) return;
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting && !loading) {
        setLoading(true);
        setTimeout(() => { setCount((c) => Math.min(c + 8, MAX)); setLoading(false); }, 450);
      }
    }, { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, [count, loading]);
  const items = Array.from({ length: count }, (_, i) => genPay(i)).map((p) => done[p.key] ? { ...p, ok: true } : p);
  const shown = items.filter((p) => filter === "todos" || (filter === "codigos" ? !!p.cupon : filter === "entradas" ? p.dir === "in" : p.dir === "out"));
  const chip = (key, label) => (
    <button key={key} onClick={() => setFilter(key)} style={{ cursor: "pointer", fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, padding: "7px 15px", border: "2px solid var(--ink)", borderRadius: "var(--radius-pill)", background: filter === key ? "var(--negro-500)" : "var(--blanco-50)", color: filter === key ? "var(--blanco-50)" : "var(--ink)", boxShadow: filter === key ? "var(--shadow-sticker-sm)" : "none", transition: "all var(--dur-base) var(--ease-out)" }}>{label}</button>
  );
  let lastDate = null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {chip("todos", "Todos")}{chip("entradas", "Clientes (entra)")}{chip("salidas", "Equipo (sale)")}{chip("codigos", "Con código")}
      </div>
      <Card variant="sticker" pad="md" style={{ display: "flex", flexDirection: "column", gap: 0, maxHeight: 520, overflowY: "auto" }}>
        {shown.map((p) => {
          const header = p.date !== lastDate ? p.date : null;
          lastDate = p.date;
          return (
            <React.Fragment key={p.key}>
              {header ? <div style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--blanco-50)", padding: "10px 4px 8px", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", borderBottom: "2px solid var(--ink)" }}>{header === "14 jul" ? "Hoy · 14 jul" : header === "13 jul" ? "Ayer · 13 jul" : header}</div> : null}
              <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "12px 4px", borderBottom: "1.5px solid var(--blanco-300)" }}>
                <span style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid var(--ink)", background: p.dir === "in" ? "var(--verde-500)" : "var(--rojo-500)", color: p.dir === "in" ? "var(--negro-500)" : "var(--blanco-50)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={p.dir === "in" ? "arrow-down-left" : "arrow-up-right"} size={16} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.who} <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 13, color: "var(--ink-muted)" }}>· {p.what}</span></div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--ink-muted)", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span>{p.time} · {p.via} · {p.id}</span>
                    {p.cupon ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 9px", borderRadius: "var(--radius-pill)", border: "1.5px solid var(--ink)", background: p.cupon.kind === "partner" ? "var(--morado-500)" : "var(--azul-500)", color: p.cupon.kind === "partner" ? "var(--blanco-50)" : "var(--negro-500)", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700 }}>
                        <Icon name={p.cupon.kind === "partner" ? "star" : "gift"} size={11} />{p.cupon.code}{p.cupon.kind === "partner" ? ` · comisión ${p.cupon.com}` : " · referido (+50 pts)"}
                      </span>
                    ) : null}
                  </div>
                </div>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: p.dir === "in" ? "var(--verde-600)" : "var(--rojo-600)", whiteSpace: "nowrap" }}>{p.dir === "in" ? "+" : "−"}{p.amt}</span>
                {p.ok ? <Badge tone={p.dir === "in" ? "green" : "ink"} sticker style={{ flexShrink: 0 }}>{p.dir === "in" ? "Verificado" : "Pagado"}</Badge> : <Button variant="secondary" sticker onClick={() => setDone((d) => ({ ...d, [p.key]: true }))} style={{ flexShrink: 0 }}>{p.dir === "in" ? "Verificar" : "Aprobar"}</Button>}
              </div>
            </React.Fragment>
          );
        })}
        <div ref={endRef} style={{ padding: "14px 0 6px", textAlign: "center", fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: "var(--ink-muted)" }}>
          {count >= MAX ? "No hay más movimientos" : loading ? "Cargando movimientos…" : "Sigue bajando para ver más"}
        </div>
      </Card>
    </div>
  );
}
const KPIS = [
  { k: "Visitas del mes", v: "4 820", d: "+12%", up: true, tone: "yellow", icon: "users", why: "Cuánta gente llega al sitio y si crece mes a mes." },
  { k: "Tasa de conversión", v: "3.4%", d: "+0.6", up: true, tone: "green", icon: "target", why: "% de visitas que terminan en solicitud, agenda o compra." },
  { k: "Tasa de rebote", v: "48%", d: "−4", up: true, tone: "blue", icon: "log-out", why: "% que se va sin interactuar; si baja, el contenido engancha." },
  { k: "Duración de sesión", v: "2:40", d: "+15 s", up: true, tone: "purple", icon: "timer", why: "Tiempo promedio por visita; ideal cerca de 2–3 min." },
  { k: "Páginas por sesión", v: "2.3", d: "+0.2", up: true, tone: "red", icon: "layers", why: "Cuántas páginas recorren; más de 2 indica confianza." },
  { k: "Velocidad de carga", v: "1.8 s", d: "−0.3 s", up: true, tone: "ink", icon: "gauge", why: "Una página lenta dispara el rebote y pierde ventas." },
];
const TRAFFIC = [
  { s: "Instagram", p: 38, tone: "purple" },
  { s: "Búsqueda orgánica", p: 27, tone: "green" },
  { s: "Directo", p: 18, tone: "yellow" },
  { s: "YouTube", p: 12, tone: "red" },
  { s: "Referidos (códigos)", p: 5, tone: "blue" },
];
const TOP_CONVERT = [
  { pg: "Asesorías → agenda", n: 41, tone: "blue" },
  { pg: "Mezcla → solicitud", n: 26, tone: "yellow" },
  { pg: "Plantillas → descarga", n: 19, tone: "red" },
  { pg: "Postula tu proyecto", n: 11, tone: "purple" },
];
const WEEK = [52, 68, 61, 84, 92, 75, 88];
function AdminPage({ onBack }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const pend = 3;
  return (
    <div data-brand="records">
      <section style={{ background: "var(--negro-500)", padding: "26px 40px 52px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button>
          <div style={{ marginTop: 26, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div>
              <Eyebrow style={{ color: "var(--rojo-500)" }}>Panel admin</Eyebrow>
              <MixedTitle size="clamp(34px, 5vw, 52px)" color="var(--blanco-50)" style={{ margin: "12px 0 0" }}>La sala de máquinas</MixedTitle>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--negro-700)", border: "1.5px solid var(--negro-600)", borderRadius: "var(--radius-pill)", padding: "8px 16px" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "var(--rojo-500)" }}>{pend}</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: "var(--blanco-600)" }}>pagos por verificar</span>
            </div>
          </div>
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "52px 40px 16px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <Eyebrow>Verificación de pagos</Eyebrow>
            <MixedTitle size="30px" style={{ marginTop: 8 }}>Entra y sale</MixedTitle>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-muted)", margin: "8px 0 0" }}>Todos los movimientos por fecha, según van llegando. Verifica pagos de clientes y aprueba pagos al equipo desde la misma lista.</p>
          </div>
          <PayFeed />
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "42px 40px 72px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <Eyebrow>Analíticas del sitio</Eyebrow>
            <MixedTitle size="30px" style={{ marginTop: 8 }}>Cómo va la página</MixedTitle>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {KPIS.map((m) => (
              <Card key={m.k} variant="sticker" pad="md" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 34, height: 34, borderRadius: "var(--radius-sm)", border: "2px solid var(--ink)", background: TONE_DOT[m.tone], display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={m.icon} size={16} color={m.tone === "yellow" ? "var(--negro-500)" : m.tone === "ink" ? "var(--blanco-50)" : "var(--negro-500)"} /></span>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{m.k}</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 34, lineHeight: 1 }}>{m.v}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 700, color: m.up ? "var(--verde-600)" : "var(--rojo-600)" }}><Icon name={m.up ? "trending-up" : "trending-down"} size={14} />{m.d}</span>
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12.5, lineHeight: 1.45, color: "var(--ink-muted)" }}>{m.why}</div>
              </Card>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", gap: 18, alignItems: "stretch" }}>
            <Card variant="sticker" pad="md" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16 }}>Visitas de la semana</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120, flex: 1 }}>
                {WEEK.map((v, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
                    <div style={{ width: "100%", height: `${v}%`, background: i === 4 ? "var(--amarillo-500)" : "var(--negro-500)", border: "2px solid var(--ink)", borderRadius: "6px 6px 0 0" }}></div>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, color: "var(--ink-muted)" }}>{["L", "M", "X", "J", "V", "S", "D"][i]}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card variant="sticker" pad="md" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16 }}>De dónde llegan</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {TRAFFIC.map((t) => (
                  <div key={t.s} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600 }}><span>{t.s}</span><span style={{ color: "var(--ink-muted)" }}>{t.p}%</span></div>
                    <div style={{ height: 10, borderRadius: 6, border: "1.5px solid var(--ink)", background: "var(--blanco-200)", overflow: "hidden" }}><div style={{ height: "100%", width: `${t.p}%`, background: TONE_DOT[t.tone] }}></div></div>
                  </div>
                ))}
              </div>
            </Card>
            <Card variant="sticker" pad="md" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16 }}>Lo que más convierte</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {TOP_CONVERT.map((c, i) => (
                  <div key={c.pg} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 2px", borderBottom: i < TOP_CONVERT.length - 1 ? "1.5px solid var(--blanco-300)" : "none" }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: TONE_DOT[c.tone], border: "1.5px solid var(--ink)", flexShrink: 0 }}></span>
                    <span style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: 13.5 }}>{c.pg}</span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16 }}>{c.n}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-muted)" }}>Acciones completadas este mes (solicitudes, agendas, descargas).</div>
            </Card>
          </div>
        </div>
      </section>
      <TeamPage embedded={true} />
      <Footer brand="records" />
    </div>
  );
}

/* ---- ROSTER / COURSES ----------------------------------------- */
function Roster({ brand }) {
  const c = BRANDS[brand];
  return (
    <section data-brand={brand} style={{ background: brand === "records" ? "var(--amarillo-500)" : brand === "academy" ? "var(--verde-500)" : "var(--rojo-500)", padding: "60px 40px", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <MixedTitle size="40px" color={brand === "design" ? "var(--blanco-50)" : "var(--negro-500)"} style={{ marginBottom: 26 }}>{c.rosterTitle}</MixedTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {c.roster.map((r, i) => (
            <div key={i} style={{
              background: "var(--negro-500)", color: "var(--blanco-50)",
              borderRadius: "var(--radius-md)", border: "2px solid var(--ink)",
              padding: 18, display: "flex", alignItems: "center", gap: 14,
            }}>
              <Avatar name={r.n} tone={r.tone} size={52} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16 }}>{r.n}</div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--blanco-600)" }}>{r.g}</div>
              </div>
              <button aria-label="play" style={{
                width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                background: c.accent, color: c.onAccent, border: "2px solid var(--ink)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name={brand === "records" ? "play" : brand === "academy" ? "graduation-cap" : "arrow-up-right"} size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- LANDING TEASERS (Records) ---------------------------------- */
function SectionLink({ label, onClick }) {
  return <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--ink)", textDecoration: "none", whiteSpace: "nowrap" }}>{label} <Icon name="arrow-up-right" size={15} /></a>;
}

function PortfolioTeaser({ onOpen, variant = "vitrola" }) {
  const tracks = PORTFOLIO_ITEMS.flatMap((w) => w.tracks.slice(0, 1).map((t) => ({ name: t, artist: w.artist, work: w.work, tone: w.tone, cover: w.cover })));
  const [active, setActive] = React.useState(-1);
  const [pct, setPct] = React.useState(0);
  const [vol, setVol] = React.useState(0.8);
  const raf = React.useRef(null);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [active, vol, variant]);
  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);
  const tick = () => {
    setPct((p) => { const n = p + 0.3 * (0.4 + vol); if (n >= 100) { setActive(-1); return 0; } return n; });
    raf.current = requestAnimationFrame(tick);
  };
  const toggle = (i) => {
    cancelAnimationFrame(raf.current);
    if (active === i) { setActive(-1); return; }
    setActive(i); setPct(0);
    raf.current = requestAnimationFrame(tick);
  };
  const dark = variant === "vitrola";
  const cinta = variant === "cinta";
  const stickers = variant === "stickers";
  const inkFg = dark ? "var(--blanco-50)" : "var(--negro-500)";
  const mutedFg = dark ? "var(--blanco-600)" : "var(--ink-muted)";
  const sectionBg = dark ? "var(--negro-500)" : cinta ? "var(--amarillo-500)" : "var(--paper)";
  const vinyl = (
    <div aria-hidden="true" style={{ width: 190, height: 190, flexShrink: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle, var(--negro-300) 0 18%, var(--negro-700) 18% 22%, var(--negro-500) 22% 100%)", border: "2px solid var(--ink)", boxShadow: "var(--shadow-sticker)", animation: active >= 0 ? "jukeSpin 2.4s linear infinite" : "none" }}>
        <div style={{ position: "absolute", inset: "12%", borderRadius: "50%", border: "1px solid rgba(255,255,255,.14)" }}></div>
        <div style={{ position: "absolute", inset: "22%", borderRadius: "50%", border: "1px solid rgba(255,255,255,.10)" }}></div>
        <div style={{ position: "absolute", inset: "32%", borderRadius: "50%", border: "1px solid rgba(255,255,255,.08)" }}></div>
        <div style={{ position: "absolute", inset: "38%", borderRadius: "50%", background: active >= 0 ? TONE_DOT[tracks[active].tone] : "var(--amarillo-500)", border: "2px solid var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--negro-500)" }}></span>
        </div>
      </div>
    </div>
  );
  const volumeRow = (pad) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: pad }}>
      <Icon name={vol === 0 ? "volume-x" : vol < 0.5 ? "volume-1" : "volume-2"} size={18} color={inkFg} />
      <input type="range" min="0" max="1" step="0.01" value={vol} onChange={(e) => setVol(Number(e.target.value))} aria-label="Volumen" style={{ width: 160, accentColor: dark ? "var(--amarillo-500)" : "var(--negro-500)" }} />
      <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: mutedFg }}>{Math.round(vol * 100)}%</span>
      <span style={{ flex: 1 }}></span>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: mutedFg }}>{active >= 0 ? `Sonando: ${tracks[active].name}` : "Dale play a un track"}</span>
    </div>
  );
  const row = (t, i) => (
    <div key={i} style={stickers ? {
      display: "flex", alignItems: "center", gap: 14, padding: "12px 16px",
      background: "var(--blanco-50)", border: "2px solid var(--ink)", borderRadius: "var(--radius-md)",
      boxShadow: active === i ? "7px 7px 0 var(--negro-500)" : "var(--shadow-sticker-sm)",
      transform: active === i ? "translate(-3px, -3px) rotate(-0.4deg)" : i % 2 ? "rotate(0.35deg)" : "rotate(-0.3deg)",
      transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
    } : {
      display: "flex", alignItems: "center", gap: 14, padding: "14px 4px",
      borderBottom: dark ? "1.5px solid var(--negro-700)" : "1.5px solid var(--ink)",
      opacity: active >= 0 && active !== i ? (dark ? 0.55 : 0.6) : 1,
      transition: "opacity var(--dur-base) var(--ease-out)",
    }}>
      <button onClick={() => toggle(i)} aria-label={active === i ? "Pausar" : "Reproducir"} style={{ width: 38, height: 38, borderRadius: "50%", border: "2px solid var(--ink)", cursor: "pointer", background: cinta ? "var(--negro-500)" : TONE_DOT[t.tone], color: cinta ? "var(--amarillo-500)" : "var(--negro-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "var(--shadow-sticker-sm)" }}><Icon name={active === i ? "pause" : "play"} size={15} /></button>
      <span style={{ width: 44, height: 44, borderRadius: "var(--radius-sm)", border: "2px solid var(--ink)", background: TONE_DOT[t.tone], display: "inline-flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}><img src={t.cover} alt={`Portada de ${t.work}`} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4, boxSizing: "border-box" }} /></span>
      <div style={{ minWidth: 0, width: 230 }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 700, color: inkFg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: mutedFg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.artist} · {t.work}</div>
      </div>
      <div style={{ flex: 1, height: cinta ? 8 : 5, borderRadius: 4, background: dark ? "var(--negro-700)" : cinta ? "var(--amarillo-700)" : "var(--blanco-400)", overflow: "hidden", border: cinta ? "1.5px solid var(--ink)" : "none" }}>
        <div style={{ height: "100%", width: active === i ? `${pct}%` : "0%", background: dark ? "var(--amarillo-500)" : "var(--negro-500)", transition: "width 120ms linear" }}></div>
      </div>
      <Badge tone={dark ? t.tone : cinta ? "ink" : t.tone} sticker style={{ flexShrink: 0 }}>{PORTFOLIO_ITEMS[i] ? PORTFOLIO_ITEMS[i].svc : ""}</Badge>
    </div>
  );
  return (
    <section style={{ background: sectionBg, padding: "56px 40px", borderTop: "2px solid var(--ink)", borderBottom: cinta ? "2px solid var(--ink)" : "none" }}>
      <style>{"@keyframes jukeSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}"}</style>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
          <div>
            <Eyebrow style={dark ? { color: "var(--amarillo-500)" } : undefined}>Portafolio</Eyebrow>
            <MixedTitle size="38px" color={inkFg} style={{ marginTop: 10 }}>Escucha lo hecho en casa</MixedTitle>
          </div>
          <a href="#" onClick={(e) => { e.preventDefault(); onOpen(); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: inkFg, textDecoration: "none", whiteSpace: "nowrap" }}>Ver todo el portafolio <Icon name="arrow-up-right" size={15} /></a>
        </div>
        <div style={{ display: "flex", gap: 34, alignItems: "center" }}>
          {(dark || cinta) ? vinyl : null}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: stickers ? 12 : 0, minWidth: 0 }}>
            {tracks.map(row)}
            {volumeRow(stickers ? "6px 4px 0" : "14px 4px 0")}
          </div>
        </div>
      </div>
    </section>
  );
}

function FreebiesTeaser({ onOpen }) {
  return (
    <section style={{ background: "var(--paper)", padding: "0 40px 64px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
          <div>
            <Eyebrow>Freebies</Eyebrow>
            <MixedTitle size="38px" style={{ marginTop: 10 }}>Regalos para tu proyecto</MixedTitle>
          </div>
          <SectionLink label="Ver todos los freebies" onClick={onOpen} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <Card variant="sticker" pad="lg" style={{ background: "var(--amarillo-500)", display: "flex", flexDirection: "column", gap: 10 }}>
            <div><Badge tone="ink" sticker>Concurso mensual</Badge></div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, lineHeight: 1.15 }}>Mezcla + mastering gratis cada mes</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.5, color: "var(--negro-700)", margin: 0, flex: 1 }}>Cada mes sorteamos un servicio completo entre los proyectos que se postulan.</p>
            <div><Button variant="secondary" sticker onClick={onOpen}>Participar</Button></div>
          </Card>
          <Card variant="sticker" pad="lg" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div><Badge tone="red" sticker>Descarga gratis</Badge></div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, lineHeight: 1.15 }}>Una plantilla de contrato, gratis</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.5, color: "var(--ink-muted)", margin: 0, flex: 1 }}>Lista para firmar. Solo necesitas una cuenta.</p>
            <div><Button variant="primary" sticker onClick={onOpen}>Reclámalo aquí</Button></div>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ---- FOOTER --------------------------------------------------- */
function Footer({ brand }) {
  return (
    <footer style={{ background: "var(--negro-500)", color: "var(--blanco-600)", padding: "48px 40px 36px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr", gap: 32 }}>
        <div>
          <Lockup brand="paper" sublabel="" size={40} />
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, marginTop: 14, maxWidth: 240 }}>
            Hacemos el arte accesible para quienes sueñan con crear.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            {["youtube", "instagram", "facebook", "tiktok"].map((n) => (
              <span key={n} style={{ width: 34, height: 34, borderRadius: "50%", border: "1.5px solid var(--negro-600)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blanco-600)" }}>
                {n === "tiktok" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="TikTok"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                ) : (
                  <Icon name={n} size={16} />
                )}
              </span>
            ))}
          </div>
        </div>
        {[
          ["Mandioca", ["Records", "Design"]],
          ["Recursos", ["Plantillas", "Soporte"]],
        ].map(([h, links]) => (
          <div key={h}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--blanco-700)", marginBottom: 12 }}>{h}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {links.map((l) => <a key={l} href="#" style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--blanco-500)", textDecoration: "none" }}>{l}</a>)}
            </div>
          </div>
        ))}
        <div data-brand={brand}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--blanco-700)", marginBottom: 12 }}>Newsletter</div>
          <Input placeholder="tu@correo.com" style={{ marginBottom: 10 }} />
          <Button variant="primary" full>Suscribirme</Button>
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: "28px auto 0", paddingTop: 18, borderTop: "1px solid var(--negro-700)", fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--blanco-700)" }}>
        © Mandioca {brand === "records" ? "Records" : brand === "academy" ? "Academy" : "Design"}, 2026 · Hecho a mano en Latinoamérica
      </div>
    </footer>
  );
}

/* ---- PRICING (Academy only) ----------------------------------- */
const ACADEMY_PLANS = [
  {
    key: "free", tag: "Gratis", tone: "green", price: "$0", sub: "para siempre",
    t: "Cursos y tutoriales gratis",
    d: "Clases abiertas y acceso a la comunidad. Empieza a aprender sin ningún costo.",
    points: ["Clases abiertas en YouTube", "Comunidad y retos mensuales", "Material descargable básico"],
    cta: "Empezar gratis",
  },
  {
    key: "pack", tag: "Construye tu propio camino", tone: "yellow", price: "−20%", sub: "en cada curso extra",
    t: "Arma tu pack",
    d: "Pagas completo el curso de mayor valor y sumas todos los que quieras con 20% de descuento. ",
    points: ["Pagas el curso más caro a precio lleno", "20% off en cada curso adicional", "Sin límite de cursos en el pack"],
    cta: "Armar mi pack",
  },
  {
    key: "full", tag: "Acceso total", tone: "purple", price: "3 años", sub: "renueva por la mitad",
    t: "Acceso a toda la academia",
    d: "Solo apto para esas almas verdaderamente curiosas y creativas.",
    points: ["3 años de acceso por curso", "Renovación al 50% del precio vigente", "Actualizaciones incluidas en el periodo"],
    cta: "Comprar acceso",
  },
];

const PACK_LINK_BTN = {
  border: "none", background: "transparent", cursor: "pointer", padding: 0,
  display: "inline-flex", alignItems: "center", gap: 6,
  fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: "var(--ink)",
};

function Pricing({ onOpen }) {
  return (
    <section data-brand="academy" style={{ background: "var(--verde-900)", color: "var(--blanco-50)", padding: "64px 40px", borderTop: "2px solid var(--ink)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <Eyebrow style={{ color: "var(--verde-300)" }}>Precios</Eyebrow>
            <MixedTitle size="38px" color="var(--blanco-50)" style={{ marginTop: 10 }}>Tres formas de aprender</MixedTitle>
          </div>
          <Button variant="primary" size="lg" sticker onClick={onOpen}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>Ver opciones de compra <Icon name="arrow-right" size={16} /></span>
          </Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {ACADEMY_PLANS.map((p) => (
            <Card key={p.key} variant="sticker" pad="md" style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 196 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <Badge tone={p.tone} sticker>{p.tag}</Badge>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--ink)" }}>{p.key === "full" ? "" : p.price}</div>
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, lineHeight: 1.1, color: "var(--ink)", marginTop: 2 }}>{p.t}</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.45, margin: 0, flex: 1 }}>{p.d}</p>
              <button onClick={onOpen} style={PACK_LINK_BTN}>Elegir <Icon name="arrow-up-right" size={15} /></button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const PACK_COURSES = [
  { n: "Producción de audio", p: 180 },
  { n: "Mezcla & Master", p: 150 },
  { n: "Instrumentos", p: 120 },
  { n: "Negocio musical", p: 100 },
];

function PackBuilder() {
  const [sel, setSel] = useState([0, 1]);
  const toggle = (i) => setSel((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i]);
  const chosen = sel.map((i) => PACK_COURSES[i].p).sort((a, b) => b - a);
  const subtotal = chosen.reduce((a, b) => a + b, 0);
  const total = chosen.length ? chosen[0] + chosen.slice(1).reduce((a, b) => a + b * 0.8, 0) : 0;
  const save = subtotal - total;
  return (
    <Card variant="sticker" pad="lg" style={{ display: "grid", gridTemplateColumns: "1.3fr 0.9fr", gap: 28 }}>
      <div>
        <Badge tone="yellow" sticker>Arma tu pack</Badge>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, color: "var(--ink)", margin: "12px 0 4px" }}>Calcula tu pack</div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.45, margin: "0 0 16px" }}>
          El curso de mayor valor va a precio lleno; cada curso extra entra con 20% de descuento.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PACK_COURSES.map((c, i) => {
            const on = sel.includes(i);
            return (
              <button key={i} onClick={() => toggle(i)} style={{
                display: "flex", alignItems: "center", gap: 12, textAlign: "left", cursor: "pointer",
                padding: "12px 14px", borderRadius: "var(--radius-md)",
                border: on ? "2px solid var(--ink)" : "2px solid var(--hairline)",
                background: on ? "var(--verde-100)" : "var(--blanco-50)",
              }}>
                <span style={{
                  width: 22, height: 22, flexShrink: 0, borderRadius: 6, border: "2px solid var(--ink)",
                  background: on ? "var(--verde-500)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
                }}>{on ? <Icon name="check" size={14} color="#fff" /> : null}</span>
                <span style={{ flex: 1, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{c.n}</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>${c.p}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ background: "var(--negro-500)", color: "var(--blanco-50)", borderRadius: "var(--radius-md)", border: "2px solid var(--ink)", padding: 20, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--blanco-600)" }}>Tu pack</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "14px 0", flex: 1 }}>
          <Row k={`Subtotal (${chosen.length} ${chosen.length === 1 ? "curso" : "cursos"})`} v={`$${subtotal}`} muted />
          <Row k="Descuento pack" v={save ? `−$${Math.round(save)}` : "$0"} accent />
        </div>
        <div style={{ borderTop: "1px solid var(--negro-600)", paddingTop: 14, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--blanco-600)" }}>Total</span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 34, color: "var(--blanco-50)" }}>${Math.round(total)}</span>
        </div>
        <div data-brand="academy" style={{ marginTop: 16 }}>
          <Button variant="primary" full disabled={!chosen.length}>Agregar al carrito</Button>
        </div>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 11.5, color: "var(--blanco-700)", marginTop: 10, lineHeight: 1.4 }}>
          Cada curso incluye 3 años de acceso. Renovación al 50% del precio vigente.
        </div>
      </div>
    </Card>
  );
}

function Row({ k, v, muted, accent }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: 13.5, color: muted ? "var(--blanco-600)" : "var(--blanco-50)" }}>{k}</span>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: accent ? "var(--verde-300)" : "var(--blanco-50)" }}>{v}</span>
    </div>
  );
}

function PricingPage({ onBack }) {
  return (
    <div data-brand="academy">
      <section style={{ background: "var(--verde-900)", color: "var(--blanco-50)", padding: "26px 40px 56px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <button onClick={onBack} style={{
            border: "none", background: "transparent", cursor: "pointer", padding: 0,
            display: "inline-flex", alignItems: "center", gap: 7,
            fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)",
          }}><Icon name="arrow-left" size={16} /> Volver</button>
          <Eyebrow style={{ color: "var(--verde-300)", marginTop: 20 }}>Opciones de compra</Eyebrow>
          <MixedTitle size="clamp(34px, 5vw, 56px)" color="var(--blanco-50)" style={{ margin: "14px 0 12px" }}>
            Elige cómo quieres aprender
          </MixedTitle>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55, color: "var(--blanco-600)", maxWidth: 600, margin: 0 }}>
            Empieza gratis, arma un pack a tu medida o accede a toda la academia. Cada curso comprado incluye 3 años de acceso.
          </p>
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "56px 40px 64px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {ACADEMY_PLANS.map((p) => (
            <Card key={p.key} variant={p.key === "pack" ? "sticker" : "plain"} pad="lg" style={{ display: "flex", flexDirection: "column", gap: 14, minHeight: 380 }}>
              <Badge tone={p.tone} sticker>{p.tag}</Badge>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 40, color: "var(--ink)" }}>{p.price}</div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--ink-muted)" }}>{p.sub}</div>
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, lineHeight: 1.12, color: "var(--ink)" }}>{p.t}</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "var(--ink-muted)", lineHeight: 1.5, margin: 0 }}>{p.d}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 2 }}>
                {p.points.map((pt, i) => (
                  <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", fontFamily: "var(--font-ui)", fontSize: 13.5, color: "var(--ink)" }}>
                    <Icon name="check" size={16} color="var(--verde-600)" style={{ flexShrink: 0, marginTop: 1 }} />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1 }}></div>
              <Button variant={p.key === "pack" ? "primary" : "outline"} full>{p.cta}</Button>
            </Card>
          ))}
        </div>
        <div style={{ maxWidth: 1180, margin: "32px auto 0" }}>
          <PackBuilder />
        </div>
      </section>
    </div>
  );
}

/* ---- COURSES CATALOG (Academy only) --------------------------- */
const COURSE_ROUTES = [
  "Producción de audio", "Ingeniería de sonido", "Mezcla & Mastering",
  "Guitarra", "Bajo", "Batería", "Teclado", "Voz", "Negocio musical",
];

const ROUTE_META = {
  "Producción de audio": { tone: "green", icon: "sliders-horizontal" },
  "Ingeniería de sonido": { tone: "blue", icon: "audio-lines" },
  "Mezcla & Mastering": { tone: "purple", icon: "audio-waveform" },
  "Guitarra": { tone: "yellow", icon: "guitar" },
  "Bajo": { tone: "red", icon: "guitar" },
  "Batería": { tone: "ink", icon: "drum" },
  "Teclado": { tone: "blue", icon: "piano" },
  "Voz": { tone: "purple", icon: "mic-vocal" },
  "Negocio musical": { tone: "yellow", icon: "briefcase" },
};

const COURSES = [
  { t: "Producción de audio desde cero", r: "Producción de audio", lvl: "Principiante", n: 42, by: "Lucía Fierro" },
  { t: "Beatmaking latino en tu DAW", r: "Producción de audio", lvl: "Intermedio", n: 28, by: "Tato Méndez" },
  { t: "Acústica y captura de señal", r: "Ingeniería de sonido", lvl: "Intermedio", n: 24, by: "Germán Ruiz" },
  { t: "Microfoneo para home studio", r: "Ingeniería de sonido", lvl: "Principiante", n: 18, by: "Sol Aguirre" },
  { t: "Mezcla que respira", r: "Mezcla & Mastering", lvl: "Intermedio", n: 33, by: "Caro Pinto" },
  { t: "Mastering para streaming y vinilo", r: "Mezcla & Mastering", lvl: "Avanzado", n: 20, by: "Caro Pinto" },
  { t: "Guitarra latina: ritmo y armonía", r: "Guitarra", lvl: "Principiante", n: 36, by: "Beto Salas" },
  { t: "Solos y fraseo en la guitarra", r: "Guitarra", lvl: "Avanzado", n: 22, by: "Beto Salas" },
  { t: "Bajo con groove", r: "Bajo", lvl: "Intermedio", n: 26, by: "Nina Costa" },
  { t: "Slap y técnicas modernas", r: "Bajo", lvl: "Avanzado", n: 18, by: "Lucho Vera" },
  { t: "Líneas de bajo para cumbia y salsa", r: "Bajo", lvl: "Intermedio", n: 20, by: "Nina Costa" },
  { t: "Batería: pulso y dinámica", r: "Batería", lvl: "Principiante", n: 30, by: "Rafa Quiroga" },
  { t: "Ritmos latinos en la batería", r: "Batería", lvl: "Intermedio", n: 24, by: "Rafa Quiroga" },
  { t: "Independencia y coordinación", r: "Batería", lvl: "Avanzado", n: 16, by: "Emi Sosa" },
  { t: "Teclados y síntesis", r: "Teclado", lvl: "Intermedio", n: 27, by: "Mauro Lema" },
  { t: "Piano para acompañar", r: "Teclado", lvl: "Principiante", n: 22, by: "Ana Brid" },
  { t: "Armonía moderna al teclado", r: "Teclado", lvl: "Intermedio", n: 18, by: "Mauro Lema" },
  { t: "Técnica vocal sin lastimarte", r: "Voz", lvl: "Principiante", n: 24, by: "Vale Ortiz" },
  { t: "Interpretación y registro vocal", r: "Voz", lvl: "Intermedio", n: 19, by: "Vale Ortiz" },
  { t: "Vive de tu música", r: "Negocio musical", lvl: "Todos", n: 16, by: "Diego Funes" },
  { t: "Distribución y regalías", r: "Negocio musical", lvl: "Intermedio", n: 14, by: "Diego Funes" },
];

const onToneFg = (tone) => (tone === "yellow" || tone === "paper") ? "var(--negro-500)" : "#fff";
const TONE_LINE = {
  yellow: "var(--amarillo-700)", green: "var(--verde-600)", purple: "var(--morado-600)",
  red: "var(--rojo-600)", blue: "var(--azul-600)", ink: "var(--negro-500)",
};

function CourseCard({ c }) {
  const m = ROUTE_META[c.r] || { tone: "ink", icon: "music" };
  const initials = c.by.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <Card variant="plain" pad="none" style={{ overflow: "hidden", display: "flex", flexDirection: "column", borderRadius: "var(--radius-lg)" }}>
      <div style={{ height: 116, background: TONE_DOT[m.tone] || "var(--ink)", borderBottom: "2px solid var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <Icon name={m.icon} size={44} color={onToneFg(m.tone)} />
        <span style={{ position: "absolute", top: 10, right: 10 }}>
          <Badge tone="paper" sticker>{c.lvl}</Badge>
        </span>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <span style={{ alignSelf: "flex-start" }}><Badge tone={m.tone} sticker>{c.r}</Badge></span>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, lineHeight: 1.12, color: "var(--ink)" }}>{c.t}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto" }}>
          <span style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--negro-500)", color: "var(--blanco-50)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 700 }}>{initials}</span>
          <span style={{ flex: 1, fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--ink-muted)" }}>{c.by}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--ink-muted)" }}><Icon name="play-circle" size={14} /> {c.n}</span>
        </div>
        <Button variant="outline" full>Ver curso</Button>
      </div>
    </Card>
  );
}

function CoursesPage({ onBack, initialRoutes = [] }) {
  const [query, setQuery] = useState("");
  const [routes, setRoutes] = useState(initialRoutes);
  const toggle = (r) => setRoutes((s) => s.includes(r) ? s.filter((x) => x !== r) : [...s, r]);
  const q = query.trim().toLowerCase();
  const list = COURSES.filter((c) => {
    const okR = routes.length === 0 || routes.includes(c.r);
    const okQ = !q || (c.t + " " + c.by + " " + c.r).toLowerCase().includes(q);
    return okR && okQ;
  });
  return (
    <div data-brand="academy">
      <section style={{ background: "var(--verde-900)", color: "var(--blanco-50)", padding: "26px 40px 40px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <button onClick={onBack} style={{
            border: "none", background: "transparent", cursor: "pointer", padding: 0,
            display: "inline-flex", alignItems: "center", gap: 7,
            fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)",
          }}><Icon name="arrow-left" size={16} /> Volver</button>
          <Eyebrow style={{ color: "var(--verde-300)", marginTop: 20 }}>Catálogo</Eyebrow>
          <MixedTitle size="clamp(34px, 5vw, 56px)" color="var(--blanco-50)" style={{ margin: "14px 0 18px" }}>
            Encuentra tu próximo curso
          </MixedTitle>
          <div style={{ position: "relative", maxWidth: 560 }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--negro-500)", display: "flex", zIndex: 1 }}><Icon name="search" size={18} /></span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca por curso, ruta o profesor…"
              style={{
                width: "100%", boxSizing: "border-box", padding: "13px 16px 13px 42px",
                fontFamily: "var(--font-ui)", fontSize: 15, color: "var(--ink)",
                background: "var(--paper)", border: "2px solid var(--ink)",
                borderRadius: "var(--radius-pill)", outline: "none",
                boxShadow: "var(--shadow-sticker-sm)",
              }}
            />
          </div>
        </div>
      </section>

      <section style={{ background: "var(--paper)", padding: "28px 40px 64px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9, alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: "var(--ink-muted)", marginRight: 4 }}>Rutas de aprendizaje:</span>
            {COURSE_ROUTES.map((r) => {
              const on = routes.includes(r);
              const m = ROUTE_META[r];
              return (
                <button key={r} onClick={() => toggle(r)} style={{
                  cursor: "pointer", padding: "6px 13px", borderRadius: "var(--radius-pill)",
                  fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600,
                  border: "2px solid var(--ink)",
                  background: on ? (TONE_DOT[m.tone] || "var(--ink)") : "var(--blanco-50)",
                  color: on ? onToneFg(m.tone) : "var(--ink)",
                  boxShadow: on ? "var(--shadow-sticker-sm)" : "none",
                }}>{r}</button>
              );
            })}
            {routes.length > 0 && (
              <button onClick={() => setRoutes([])} style={{
                cursor: "pointer", padding: "6px 12px", borderRadius: "var(--radius-pill)",
                fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600,
                border: "none", background: "transparent", color: "var(--ink-muted)",
                display: "inline-flex", alignItems: "center", gap: 5,
              }}><Icon name="x" size={14} /> Limpiar</button>
            )}
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--ink-muted)", margin: "14px 0 18px" }}>
            {list.length} {list.length === 1 ? "curso" : "cursos"}
          </div>
          {list.length === 0 ? (
            <Card variant="outline" pad="lg" style={{ textAlign: "center", color: "var(--ink-muted)", fontFamily: "var(--font-body)" }}>
              No encontramos cursos con esos filtros. Prueba con otra ruta o término.
            </Card>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {list.map((c) => <CourseCard key={c.t} c={c} />)}
            </div>
          )}
        </div>
      </section>
      <Footer brand="academy" />
    </div>
  );
}

/* ---- ACADEMY LANDING (per route) ------------------------------ */
const ACADEMY_NAME = {
  "Producción de audio": "Academia de producción de audio",
  "Ingeniería de sonido": "Academia de ingeniería de sonido",
  "Mezcla & Mastering": "Academia de mezcla & mastering",
  "Guitarra": "Academia de guitarra",
  "Bajo": "Academia de bajo",
  "Batería": "Academia de batería",
  "Teclado": "Academia de teclado",
  "Voz": "Academia de voz",
  "Negocio musical": "Academia de negocios musicales",
};

const ACADEMY_INFO = {
  "Producción de audio": {
    tagline: "De la idea cruda al máster que suena como lo imaginaste.",
    intro: "Aprendés a producir de principio a fin: composición, arreglos, grabación y todo el flujo dentro de tu DAW. Una ruta pensada para que termines tus canciones, no para que queden a medias.",
    highlights: ["Flujo completo en tu DAW", "Beatmaking con identidad latina", "Proyectos reales terminados"],
  },
  "Ingeniería de sonido": {
    tagline: "La técnica detrás de un buen sonido, sin misterios.",
    intro: "Desde la acústica de tu cuarto hasta el microfoneo y la cadena de señal. Entendés cómo capturar audio limpio y tomar decisiones técnicas con criterio.",
    highlights: ["Acústica y tratamiento de sala", "Microfoneo y cadena de señal", "Captura limpia en home studio"],
  },
  "Mezcla & Mastering": {
    tagline: "Que tus canciones suenen listas para cualquier parlante.",
    intro: "Balance, profundidad y carácter. Aprendés a mezclar con intención y a dejar tus temas listos para streaming, vinilo y radio.",
    highlights: ["Mezcla con intención", "Máster para streaming y vinilo", "Referencias y loudness"],
  },
  "Guitarra": {
    tagline: "Ritmo, armonía y voz propia en la guitarra.",
    intro: "Desde los primeros acordes hasta solos y fraseo, con foco en el repertorio latino. Tocás de verdad, no te quedás solo en la teoría.",
    highlights: ["Ritmos y armonía latina", "Solos y fraseo", "Repertorio para tocar ya"],
  },
  "Bajo": {
    tagline: "El groove que sostiene a toda la banda.",
    intro: "Construís líneas de bajo con pulso y musicalidad, desde el groove básico hasta técnicas modernas para cumbia, salsa y más.",
    highlights: ["Groove y pulso", "Técnicas modernas", "Líneas para géneros latinos"],
  },
  "Batería": {
    tagline: "Pulso, dinámica y ritmos que mueven.",
    intro: "Coordinación, independencia y los ritmos latinos que le dan identidad a tu manera de tocar. Para empezar o para soltar la mano.",
    highlights: ["Pulso y dinámica", "Ritmos latinos", "Independencia y coordinación"],
  },
  "Teclado": {
    tagline: "Acompañar, armonizar y sintetizar.",
    intro: "Piano y teclados desde el acompañamiento hasta la síntesis y la armonía moderna. Una base que te sirve para cualquier proyecto.",
    highlights: ["Acompañamiento al piano", "Armonía moderna", "Síntesis y sonido"],
  },
  "Voz": {
    tagline: "Tu voz, sana y con intención.",
    intro: "Técnica para cantar sin lastimarte, afinación e interpretación. Trabajás tu registro y tu manera de contar una canción.",
    highlights: ["Técnica sin lastimarte", "Afinación y registro", "Interpretación"],
  },
  "Negocio musical": {
    tagline: "Vivir de tu música sin perder el alma.",
    intro: "Lo que nadie te enseña: distribución, regalías, contratos y cómo construir una carrera sostenible alrededor de tu arte.",
    highlights: ["Distribución y regalías", "Contratos y derechos", "Carrera sostenible"],
  },
};

const PROFESSORS = {
  "Producción de audio": [{ n: "Lucía Fierro", role: "Productora · 12 años" }, { n: "Tato Méndez", role: "Beatmaker & sound designer" }, { n: "Sol Aguirre", role: "Técnica de grabación" }],
  "Ingeniería de sonido": [{ n: "Germán Ruiz", role: "Ingeniero de sala (FOH)" }, { n: "Sol Aguirre", role: "Técnica de grabación" }],
  "Mezcla & Mastering": [{ n: "Caro Pinto", role: "Mix & master engineer" }, { n: "Germán Ruiz", role: "Ingeniero de sonido" }],
  "Guitarra": [{ n: "Beto Salas", role: "Guitarrista sesionista" }, { n: "Mara León", role: "Docente de armonía" }],
  "Bajo": [{ n: "Nina Costa", role: "Bajista" }, { n: "Lucho Vera", role: "Bajista de sesión" }],
  "Batería": [{ n: "Rafa Quiroga", role: "Baterista" }, { n: "Emi Sosa", role: "Percusionista" }],
  "Teclado": [{ n: "Mauro Lema", role: "Tecladista & productor" }, { n: "Ana Brid", role: "Pianista y docente" }],
  "Voz": [{ n: "Vale Ortiz", role: "Coach vocal" }, { n: "Dani Cruz", role: "Cantante e intérprete" }],
  "Negocio musical": [{ n: "Diego Funes", role: "Manager & A&R" }, { n: "Clara Ferri", role: "Abogada musical" }],
};

const SAMPLE_CLASSES = {
  "Producción de audio": [{ t: "Tu primer proyecto en el DAW", d: "14 min", free: true }, { t: "Grabar voces en casa", d: "18 min" }, { t: "Cuantizar sin perder el groove", d: "11 min" }],
  "Ingeniería de sonido": [{ t: "Tratá tu cuarto con poco presupuesto", d: "12 min", free: true }, { t: "Elegí el micrófono correcto", d: "16 min" }, { t: "Ganancia y headroom", d: "10 min" }],
  "Mezcla & Mastering": [{ t: "Ordená tu sesión antes de mezclar", d: "13 min", free: true }, { t: "EQ: quitar antes de sumar", d: "17 min" }, { t: "Loudness para streaming", d: "12 min" }],
  "Guitarra": [{ t: "Tus primeros acordes", d: "15 min", free: true }, { t: "Ritmos latinos esenciales", d: "19 min" }, { t: "Escalas para improvisar", d: "14 min" }],
  "Bajo": [{ t: "Anatomía del groove", d: "12 min", free: true }, { t: "Tumbao y síncopa", d: "15 min" }, { t: "Slap desde cero", d: "13 min" }],
  "Batería": [{ t: "Postura y agarre", d: "10 min", free: true }, { t: "El ritmo de cumbia", d: "16 min" }, { t: "Independencia de extremidades", d: "14 min" }],
  "Teclado": [{ t: "Acordes para acompañar", d: "13 min", free: true }, { t: "Progresiones latinas", d: "15 min" }, { t: "Tu primer sintetizador", d: "12 min" }],
  "Voz": [{ t: "Respiración y apoyo", d: "11 min", free: true }, { t: "Calentamiento vocal", d: "9 min" }, { t: "Afinar el oído", d: "14 min" }],
  "Negocio musical": [{ t: "Subí tu música a las plataformas", d: "12 min", free: true }, { t: "Cómo funcionan las regalías", d: "16 min" }, { t: "Tu primer contrato", d: "15 min" }],
};

const PROF_TONES = ["green", "purple", "yellow", "blue", "red"];

function ProfessorCard({ p, tone, onProfile }) {
  const initials = p.n.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <Card variant="sticker" pad="md" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10 }}>
      <span style={{ width: 60, height: 60, borderRadius: "50%", border: "2px solid var(--ink)", background: TONE_DOT[tone] || "var(--ink)", color: onToneFg(tone), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, boxShadow: "var(--shadow-sticker-sm)" }}>{initials}</span>
      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, color: "var(--ink)" }}>{p.n}</div>
      <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--ink-muted)", flex: 1 }}>{p.role}</div>
      <Button variant="outline" full onClick={() => onProfile(p.n)}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Conoce a tu profesor <Icon name="arrow-right" size={15} /></span>
      </Button>
    </Card>
  );
}

function AcademyPage({ route, onBack, onAllCourses, onProfile }) {
  const m = ROUTE_META[route] || { tone: "ink", icon: "music" };
  const info = ACADEMY_INFO[route] || { tagline: "", intro: "", highlights: [] };
  const profs = PROFESSORS[route] || [];
  const classes = SAMPLE_CLASSES[route] || [];
  const courses = COURSES.filter((c) => c.r === route);
  const line = TONE_LINE[m.tone] || "var(--ink)";
  return (
    <div data-brand="academy">
      {/* HERO */}
      <section style={{ background: "var(--verde-900)", color: "var(--blanco-50)", padding: "26px 40px 56px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button>
          <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 40, alignItems: "center", marginTop: 22 }}>
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "6px 13px", borderRadius: "var(--radius-pill)", background: "var(--verde-800)", border: "2px solid var(--verde-700)" }}>
                <Icon name={m.icon} size={16} color="var(--verde-300)" />
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--verde-200)" }}>Academia</span>
              </span>
              <MixedTitle size="clamp(34px, 5vw, 58px)" color="var(--blanco-50)" style={{ margin: "16px 0 14px" }}>{ACADEMY_NAME[route] || route}</MixedTitle>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 20, lineHeight: 1.35, color: "var(--verde-100)", margin: "0 0 14px" }}>{info.tagline}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16.5, lineHeight: 1.6, color: "var(--blanco-600)", maxWidth: 560, margin: "0 0 24px" }}>{info.intro}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {info.highlights.map((h) => (
                  <span key={h} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: "var(--radius-pill)", background: "var(--verde-800)", border: "1.5px solid var(--verde-700)", fontFamily: "var(--font-ui)", fontSize: 13.5, fontWeight: 600, color: "var(--blanco-50)" }}>
                    <Icon name="check" size={15} color="var(--verde-300)" /> {h}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: "var(--radius-lg)", border: "3px solid var(--ink)", background: TONE_DOT[m.tone] || "var(--verde-500)", aspectRatio: "1 / 1", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "8px 8px 0 var(--ink)" }}>
              <Icon name={m.icon} size={120} color={onToneFg(m.tone)} />
            </div>
          </div>
        </div>
      </section>

      {/* PROFESORES */}
      <section style={{ background: "var(--paper)", padding: "56px 40px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Eyebrow style={{ color: line }}>Quién enseña</Eyebrow>
          <MixedTitle size="34px" style={{ margin: "10px 0 26px" }}>Profesores de la academia</MixedTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 18 }}>
            {profs.map((p, i) => <ProfessorCard key={p.n} p={p} tone={PROF_TONES[i % PROF_TONES.length]} onProfile={onProfile} />)}
          </div>
        </div>
      </section>

      {/* CURSOS */}
      <section style={{ background: "var(--blanco-200)", padding: "56px 40px", borderTop: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 26 }}>
            <div>
              <Eyebrow style={{ color: line }}>Qué vas a cursar</Eyebrow>
              <MixedTitle size="34px" style={{ marginTop: 10 }}>Cursos de la academia</MixedTitle>
            </div>
            <Button variant="ghost" onClick={onAllCourses}><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Ver todo el catálogo <Icon name="arrow-right" size={16} /></span></Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {courses.map((c) => <CourseCard key={c.t} c={c} />)}
          </div>
        </div>
      </section>

      {/* CLASES PARA PROBAR */}
      <section style={{ background: "var(--paper)", padding: "56px 40px 64px", borderTop: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <Eyebrow style={{ color: line }}>Probá antes de entrar</Eyebrow>
          <MixedTitle size="34px" style={{ margin: "10px 0 22px" }}>Algunas clases</MixedTitle>
          <Card variant="outline" pad="none" style={{ overflow: "hidden" }}>
            {classes.map((cl, i) => (
              <div key={cl.t} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 18px", borderTop: i ? "1.5px solid var(--hairline)" : "none" }}>
                <span style={{ width: 40, height: 40, flexShrink: 0, borderRadius: "50%", background: TONE_DOT[m.tone] || "var(--ink)", color: onToneFg(m.tone), display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--ink)" }}><Icon name="play" size={16} color={onToneFg(m.tone)} /></span>
                <span style={{ flex: 1, fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 17, color: "var(--ink)" }}>{cl.t}</span>
                {cl.free ? <Badge tone="green" sticker>Gratis</Badge> : null}
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--ink-muted)", minWidth: 52, textAlign: "right" }}>{cl.d}</span>
              </div>
            ))}
          </Card>
        </div>
      </section>

      <Footer brand="academy" />
    </div>
  );
}

/* ---- PROFESORES (Academy only) -------------------------------- */
function buildFaculty() {
  const map = new Map();
  COURSE_ROUTES.forEach((route) => {
    (PROFESSORS[route] || []).forEach((p) => {
      const existing = map.get(p.n);
      if (existing) {
        if (!existing.routes.includes(route)) existing.routes.push(route);
      } else {
        map.set(p.n, { n: p.n, role: p.role, routes: [route] });
      }
    });
  });
  return [...map.values()];
}
const FACULTY = buildFaculty();

function FacultyCard({ p, tone, onRoute, onProfile }) {
  const initials = p.n.split(" ").map((w) => w[0]).slice(0, 2).join("");
  const courseCount = COURSES.filter((c) => c.by === p.n).length;
  return (
    <Card variant="sticker" pad="md" style={{ display: "flex", flexDirection: "column", gap: 12, minHeight: 230 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
        <span style={{ width: 56, height: 56, flexShrink: 0, borderRadius: "50%", border: "2px solid var(--ink)", background: TONE_DOT[tone] || "var(--ink)", color: onToneFg(tone), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, boxShadow: "var(--shadow-sticker-sm)" }}>{initials}</span>
        <div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, lineHeight: 1.1, color: "var(--ink)" }}>{p.n}</div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--ink-muted)", marginTop: 2 }}>{p.role}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, flex: 1, alignContent: "flex-start" }}>
        {p.routes.map((r) => {
          const rm = ROUTE_META[r] || { tone: "ink", icon: "music" };
          return (
            <button key={r} onClick={() => onRoute(r)} title={`Ver ${r}`} style={{
              cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 11px", borderRadius: "var(--radius-pill)", border: "2px solid var(--ink)",
              background: "var(--blanco-50)", fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: "var(--ink)",
            }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: TONE_DOT[rm.tone] || "var(--ink)", border: "1.5px solid var(--ink)" }}></span>
              {r}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--ink-muted)", borderTop: "1.5px solid var(--hairline)", paddingTop: 11 }}>
        <Icon name="play-circle" size={15} /> {courseCount} {courseCount === 1 ? "curso" : "cursos"} en la academia
      </div>
      <Button variant="outline" full onClick={() => onProfile(p)}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Conoce a tu profesor <Icon name="arrow-right" size={15} /></span>
      </Button>
    </Card>
  );
}

/* ---- PROFESOR PROFILE ----------------------------------------- */
const PROF_STAT = (name) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 100000;
  return {
    years: 6 + (h % 14),
    students: 1 + (h % 9) + ((h >> 3) % 10) / 10,
    rating: (4.6 + (h % 4) / 10).toFixed(1),
  };
};

function ProfesorPage({ prof, tone, onBack, onRoute }) {
  const initials = prof.n.split(" ").map((w) => w[0]).slice(0, 2).join("");
  const courses = COURSES.filter((c) => c.by === prof.n);
  const st = PROF_STAT(prof.n);
  const stats = [
    { k: "Experiencia", v: `${st.years} años` },
    { k: "Estudiantes", v: `${st.students.toFixed(1)}k` },
    { k: "Valoración", v: `${st.rating} ★` },
    { k: "Cursos", v: courses.length },
  ];
  return (
    <div data-brand="academy">
      <section style={{ background: "var(--verde-900)", color: "var(--blanco-50)", padding: "26px 40px 56px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver a profesores</button>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "center", marginTop: 22 }}>
            <span style={{ width: 132, height: 132, flexShrink: 0, borderRadius: "50%", border: "3px solid var(--ink)", background: TONE_DOT[tone] || "var(--ink)", color: onToneFg(tone), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 48, boxShadow: "8px 8px 0 var(--ink)" }}>{initials}</span>
            <div>
              <Eyebrow style={{ color: "var(--verde-300)" }}>Profesor · Mandioca Academy</Eyebrow>
              <MixedTitle size="clamp(34px, 5vw, 56px)" color="var(--blanco-50)" style={{ margin: "10px 0 8px" }}>{prof.n}</MixedTitle>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 19, color: "var(--verde-100)", margin: "0 0 16px" }}>{prof.role}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {prof.routes.map((r) => {
                  const rm = ROUTE_META[r] || { tone: "ink", icon: "music" };
                  return (
                    <button key={r} onClick={() => onRoute(r)} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 13px", borderRadius: "var(--radius-pill)", background: "var(--verde-800)", border: "1.5px solid var(--verde-700)", fontFamily: "var(--font-ui)", fontSize: 13.5, fontWeight: 600, color: "var(--blanco-50)" }}>
                      <Icon name={rm.icon} size={15} color="var(--verde-300)" /> {r}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--paper)", padding: "40px 40px 16px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {stats.map((s) => (
            <Card key={s.k} variant="sticker" pad="md" style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, color: "var(--ink)" }}>{s.v}</div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 12.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-muted)", marginTop: 4 }}>{s.k}</div>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--paper)", padding: "32px 40px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Eyebrow>Sobre {prof.n.split(" ")[0]}</Eyebrow>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.65, color: "var(--ink)", margin: "12px 0 0" }}>
            {prof.n} es {prof.role.toLowerCase()} con {st.years} años de trayectoria en la escena latinoamericana. Enseña en {prof.routes.length === 1 ? "la ruta de " + prof.routes[0] : "las rutas de " + prof.routes.slice(0, -1).join(", ") + " y " + prof.routes[prof.routes.length - 1]}, con un método práctico basado en proyectos reales para que termines lo que empiezas.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--blanco-200)", padding: "48px 40px 64px", borderTop: "2px solid var(--ink)", marginTop: 24 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <MixedTitle size="32px" style={{ marginBottom: 22 }}>Cursos de {prof.n.split(" ")[0]}</MixedTitle>
          {courses.length === 0 ? (
            <Card variant="outline" pad="lg" style={{ textAlign: "center", color: "var(--ink-muted)", fontFamily: "var(--font-body)" }}>Pronto sumará cursos al catálogo.</Card>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {courses.map((c) => <CourseCard key={c.t} c={c} />)}
            </div>
          )}
        </div>
      </section>
      <Footer brand="academy" />
    </div>
  );
}

function ProfesoresPage({ onBack, onRoute, onProfile }) {
  const [route, setRoute] = useState(null);
  const list = route ? FACULTY.filter((p) => p.routes.includes(route)) : FACULTY;
  return (
    <div data-brand="academy">
      <section style={{ background: "var(--verde-900)", color: "var(--blanco-50)", padding: "26px 40px 48px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button>
          <Eyebrow style={{ color: "var(--verde-300)", marginTop: 20 }}>Quién enseña</Eyebrow>
          <MixedTitle size="clamp(34px, 5vw, 56px)" color="var(--blanco-50)" style={{ margin: "14px 0 14px" }}>
            Nuestros profesores
          </MixedTitle>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55, color: "var(--blanco-600)", maxWidth: 600, margin: 0 }}>
            Artistas, productores e ingenieros en activo. Cada uno te acompaña en su ruta con proyectos reales y foco latinoamericano.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--paper)", padding: "28px 40px 64px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9, alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: "var(--ink-muted)", marginRight: 4 }}>Filtrar por ruta:</span>
            {COURSE_ROUTES.map((r) => {
              const on = route === r;
              const m = ROUTE_META[r];
              return (
                <button key={r} onClick={() => setRoute(on ? null : r)} style={{
                  cursor: "pointer", padding: "6px 13px", borderRadius: "var(--radius-pill)",
                  fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, border: "2px solid var(--ink)",
                  background: on ? (TONE_DOT[m.tone] || "var(--ink)") : "var(--blanco-50)",
                  color: on ? onToneFg(m.tone) : "var(--ink)",
                  boxShadow: on ? "var(--shadow-sticker-sm)" : "none",
                }}>{r}</button>
              );
            })}
            {route && (
              <button onClick={() => setRoute(null)} style={{
                cursor: "pointer", padding: "6px 12px", borderRadius: "var(--radius-pill)",
                fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, border: "none",
                background: "transparent", color: "var(--ink-muted)", display: "inline-flex", alignItems: "center", gap: 5,
              }}><Icon name="x" size={14} /> Limpiar</button>
            )}
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--ink-muted)", margin: "14px 0 18px" }}>
            {list.length} {list.length === 1 ? "profesor" : "profesores"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 18 }}>
            {list.map((p, i) => <FacultyCard key={p.n} p={p} tone={PROF_TONES[i % PROF_TONES.length]} onRoute={onRoute} onProfile={onProfile} />)}
          </div>
        </div>
      </section>
      <Footer brand="academy" />
    </div>
  );
}

/* ---- TWEAKS: expressive system reshapers ---------------------- */
const TWEAK_DEFAULTS = {
  // Cartelería — how loud the sticker/poster treatment is (shadows + outlines)
  poster: "firme",
  // Esquinas — corner language, from cut poster to bubbly
  corners: "suave",
  // Acento Records — recolors the whole Records sub-brand [500,600,700]
  accent: ["#fdc90f", "#e6b70e", "#b48f0b"],
  // Estación de escucha — tratamiento del reproductor del landing
  jukebox: "vitrola",
};

const POSTER_VARS = {
  sobrio:     { "--shadow-sticker": "2px 2px 0 var(--negro-500)", "--shadow-sticker-sm": "1px 1px 0 var(--negro-500)", "--border-bold": "1.5px", "--border-chunky": "2px" },
  firme:      { "--shadow-sticker": "4px 4px 0 var(--negro-500)", "--shadow-sticker-sm": "2px 2px 0 var(--negro-500)", "--border-bold": "2px", "--border-chunky": "3px" },
  stickerazo: { "--shadow-sticker": "8px 8px 0 var(--negro-500)", "--shadow-sticker-sm": "4px 4px 0 var(--negro-500)", "--border-bold": "2.5px", "--border-chunky": "4.5px" },
};
const CORNER_VARS = {
  recto: { "--radius-xs": "0px", "--radius-sm": "1px", "--radius-md": "2px", "--radius-lg": "3px", "--radius-xl": "5px" },
  suave: { "--radius-xs": "4px", "--radius-sm": "8px", "--radius-md": "12px", "--radius-lg": "16px", "--radius-xl": "24px" },
  globo: { "--radius-xs": "10px", "--radius-sm": "16px", "--radius-md": "24px", "--radius-lg": "32px", "--radius-xl": "44px" },
};
function tweakVars(t) {
  const [a5, a6, a7] = t.accent;
  return {
    ...POSTER_VARS[t.poster],
    ...CORNER_VARS[t.corners],
    "--amarillo-500": a5, "--amarillo-600": a6, "--amarillo-700": a7,
  };
}

/* ---- COMUNIDAD (Academy only) --------------------------------- */
const COMMUNITY_NEWS = [
  { cat: "Anuncio", tone: "green", date: "12 jun 2026", t: "Abrimos la Academia de negocios musicales", d: "Distribución, regalías y contratos: la ruta que más nos pedían ya está en vivo, con Diego Funes y Clara Ferri al frente.", icon: "megaphone" },
  { cat: "Evento", tone: "purple", date: "05 jun 2026", t: "Sesión en vivo: mezcla que respira", d: "Caro Pinto abre su sesión y mezcla un tema de la comunidad en tiempo real. Trae tus preguntas y tus stems.", icon: "radio" },
  { cat: "Lanzamiento", tone: "blue", date: "28 may 2026", t: "Nuevo curso: líneas de bajo para cumbia y salsa", d: "Nina Costa suma 20 clases sobre groove latino, tumbao y síncopa para que tu bajo cuente la historia.", icon: "disc-3" },
  { cat: "Comunidad", tone: "yellow", date: "20 may 2026", t: "Mandioca llega a 10k estudiantes", d: "Gracias por construir esta casa del artista independiente. Lo celebramos liberando tres clases nuevas gratis.", icon: "party-popper" },
];

const COMMUNITY_CHALLENGES = [
  { tone: "green", t: "Termina una canción en 7 días", d: "De la idea cruda al máster. Sube tu track terminado y recibe feedback de un profesor de producción.", level: "Todos", people: 218, prize: "Mentoría 1:1", icon: "timer" },
  { tone: "purple", t: "Reto de mezcla a ciegas", d: "Te damos los mismos stems a todos. Mézclalos a tu manera y comparemos enfoques en la sesión en vivo.", level: "Intermedio", people: 142, prize: "Curso gratis", icon: "audio-waveform" },
  { tone: "yellow", t: "Cover latino reinventado", d: "Toma un clásico latinoamericano y dale tu vuelta: género, instrumentación o tempo. Vale todo menos lo obvio.", level: "Todos", people: 305, prize: "Destacado en portada", icon: "guitar" },
  { tone: "blue", t: "Beat de la semana", d: "Un sample, 48 horas, tu mejor beat. Publica en la comunidad y vota por tus favoritos.", level: "Principiante", people: 471, prize: "Pack de samples", icon: "drum" },
];

function ComunidadPage({ onBack }) {
  return (
    <div data-brand="academy">
      <section style={{ background: "var(--verde-900)", color: "var(--blanco-50)", padding: "26px 40px 48px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <button onClick={onBack} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 600, color: "var(--blanco-600)" }}><Icon name="arrow-left" size={16} /> Volver</button>
          <Eyebrow style={{ color: "var(--verde-300)", marginTop: 20 }}>La casa del artista</Eyebrow>
          <MixedTitle size="clamp(34px, 5vw, 56px)" color="var(--blanco-50)" style={{ margin: "14px 0 14px", lineHeight: 1.18 }}>
            Comunidad Mandioca
          </MixedTitle>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55, color: "var(--blanco-600)", maxWidth: 600, margin: 0 }}>
            Lo que pasa en la academia y lo que construimos juntos. Entérate de las novedades y súmate a los retos que mueven a toda la comunidad.
          </p>
        </div>
      </section>

      {/* NOTICIAS */}
      <section style={{ background: "var(--paper)", padding: "56px 40px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 26 }}>
            <div>
              <Eyebrow style={{ color: "var(--verde-600)" }}>Noticias</Eyebrow>
              <MixedTitle size="34px" style={{ marginTop: 10 }}>Qué hay de nuevo</MixedTitle>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
            {COMMUNITY_NEWS.map((n) => (
              <Card key={n.t} variant="plain" pad="none" style={{ overflow: "hidden", display: "flex", borderRadius: "var(--radius-lg)" }}>
                <div style={{ width: 92, flexShrink: 0, background: TONE_DOT[n.tone] || "var(--ink)", borderRight: "2px solid var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={n.icon} size={34} color={onToneFg(n.tone)} />
                </div>
                <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Badge tone={n.tone} sticker>{n.cat}</Badge>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: 12.5, color: "var(--ink-muted)" }}>{n.date}</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, lineHeight: 1.15, color: "var(--ink)" }}>{n.t}</div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.45, margin: 0, flex: 1 }}>{n.d}</p>
                  <a href="#" onClick={(e) => e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>Leer más <Icon name="arrow-up-right" size={15} /></a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* RETOS */}
      <section style={{ background: "var(--verde-500)", padding: "56px 40px", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 26 }}>
            <div>
              <Eyebrow style={{ color: "var(--negro-500)" }}>Retos de la comunidad</Eyebrow>
              <MixedTitle size="34px" color="var(--negro-500)" style={{ marginTop: 10 }}>Ponte a prueba</MixedTitle>
            </div>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 13.5, fontWeight: 600, color: "var(--negro-500)", display: "inline-flex", alignItems: "center", gap: 7 }}>
              <Icon name="users" size={16} /> Un reto nuevo cada mes
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
            {COMMUNITY_CHALLENGES.map((ch) => (
              <Card key={ch.t} variant="sticker" pad="md" style={{ display: "flex", flexDirection: "column", gap: 12, minHeight: 210 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 46, height: 46, flexShrink: 0, borderRadius: "var(--radius-md)", border: "2px solid var(--ink)", background: TONE_DOT[ch.tone] || "var(--ink)", color: onToneFg(ch.tone), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-sticker-sm)" }}><Icon name={ch.icon} size={22} color={onToneFg(ch.tone)} /></span>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, lineHeight: 1.12, color: "var(--ink)" }}>{ch.t}</div>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.45, margin: 0, flex: 1 }}>{ch.d}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--ink-muted)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Icon name="signal" size={14} /> {ch.level}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Icon name="users" size={14} /> {ch.people}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Icon name="award" size={14} /> {ch.prize}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1.5px solid var(--hairline)", paddingTop: 12 }}>
                  <Button variant="primary" size="sm" sticker>Participar</Button>
                  <a href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: "var(--ink)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5 }}>Ver bases <Icon name="arrow-up-right" size={14} /></a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer brand="academy" />
    </div>
  );
}

function MandiocaSite({ enabledBrands = ["records", "academy", "design"] } = {}) {
  const [t, setTweak] = useTw(TWEAK_DEFAULTS);
  const [brand, setBrand] = useState(enabledBrands[0]);
  const [view, setView] = useState("home");
  const [courseFilter, setCourseFilter] = useState([]);
  const [academyRoute, setAcademyRoute] = useState(null);
  const changeBrand = (b) => { setBrand(b); setView("home"); };
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const showPricing = view === "pricing" && brand === "academy";
  const showCourses = view === "courses" && brand === "academy";
  const showAcademy = view === "academy" && brand === "academy";
  const showProfesores = view === "profesores" && brand === "academy";
  const showProfesor = view === "profesor" && brand === "academy";
  const showComunidad = view === "comunidad" && brand === "academy";
  const showPortafolio = view === "portafolio" && brand === "records";
  const showFreebies = view === "freebies" && brand === "records";
  const showCharla = view === "charla";
  const showPostula = view === "postula" && brand === "records";
  const showAuth = view === "auth";
  const [logged, setLogged] = useState(false);
  const showCuenta = view === "cuenta" && logged;
  const showEquipo = view === "equipo" && logged;
  const showAdmin = view === "admin" && logged;
  const showServicio = view === "servicio" && brand === "records";
  const showSolicitud = view === "solicitud" && brand === "records";
  const showAgenda = view === "agenda" && brand === "records";
  const showDesignSvc = view === "design-servicios";
  const [selectedService, setSelectedService] = useState(null);
  const openService = (name) => { setSelectedService(name); setView("servicio"); };
  const [selectedProf, setSelectedProf] = useState(null);
  const openProfile = (p) => {
    const prof = typeof p === "string" ? FACULTY.find((f) => f.n === p) : p;
    if (prof) { setSelectedProf(prof); setView("profesor"); }
  };
  const goCourses = (filter) => {
    const f = Array.isArray(filter) ? filter : [];
    if (f.length === 1) { setAcademyRoute(f[0]); setView("academy"); }
    else { setCourseFilter(f); setView("courses"); }
  };
  const goAllCourses = () => { setCourseFilter([]); setView("courses"); };
  return (
    <div style={{ background: "var(--paper)", ...tweakVars(t) }}>
      <Nav brand={brand} setBrand={changeBrand} onCourses={goCourses} onProfesores={() => setView("profesores")} onHome={() => setView("home")} onComunidad={() => setView("comunidad")} onPortafolio={() => setView("portafolio")} onFreebies={() => setView("freebies")} onCharla={() => setView("charla")} onAuth={() => setView("auth")} onAccount={() => setView("cuenta")} onTeam={() => setView("equipo")} onAdmin={() => setView("admin")} loggedIn={logged} onLogout={() => { setLogged(false); setView("home"); }} onService={openService} onDesignServices={() => setView("design-servicios")} enabledBrands={enabledBrands} />
      {showAuth ? (
        <AuthPage brand={brand} onBack={() => setView("home")} onLogin={() => { setLogged(true); setView("cuenta"); }} />
      ) : showCuenta ? (
        <CuentaPage onBack={() => setView("home")} onService={openService} />
      ) : showEquipo ? (
        <TeamPage onBack={() => setView("home")} />
      ) : showAdmin ? (
        <AdminPage onBack={() => setView("home")} />
      ) : showCharla ? (
        <CharlaPage onBack={() => setView("home")} />
      ) : showPostula ? (
        <PostulaPage onBack={() => setView("home")} />
      ) : showFreebies ? (
        <FreebiesPage onBack={() => setView("home")} onAuth={() => setView("auth")} />
      ) : showServicio && selectedService ? (
        <ServicePage name={selectedService} onBack={() => setView("home")} onContact={() => setView("charla")} onRequest={() => setView("solicitud")} onSchedule={() => setView("agenda")} />
      ) : showAgenda ? (
        <SchedulePage onBack={() => setView("servicio")} onHome={() => setView("home")} />
      ) : showSolicitud && selectedService ? (        <RequestPage name={selectedService} onBack={() => setView("servicio")} onHome={() => setView("home")} />
      ) : showDesignSvc ? (
        <DesignServicesPage onBack={() => setView("home")} onContact={() => setView("charla")} />
      ) : showPortafolio ? (
        <PortfolioPage onBack={() => setView("home")} />
      ) : showComunidad ? (
        <ComunidadPage onBack={() => setView("home")} />
      ) : showProfesor && selectedProf ? (
        <ProfesorPage prof={selectedProf} tone={PROF_TONES[FACULTY.findIndex((f) => f.n === selectedProf.n) % PROF_TONES.length]} onBack={() => setView("profesores")} onRoute={(r) => { setAcademyRoute(r); setView("academy"); }} />
      ) : showProfesores ? (
        <ProfesoresPage onBack={() => setView("home")} onRoute={(r) => { setAcademyRoute(r); setView("academy"); }} onProfile={openProfile} />
      ) : showAcademy ? (
        <AcademyPage key={academyRoute} route={academyRoute} onBack={() => setView("home")} onAllCourses={goAllCourses} onProfile={openProfile} />
      ) : showCourses ? (
        <CoursesPage key={courseFilter.join(",") || "all"} initialRoutes={courseFilter} onBack={() => setView("home")} />
      ) : showPricing ? (
        <PricingPage onBack={() => setView("home")} />
      ) : (
        <React.Fragment>
          <Hero brand={brand} onCourses={goCourses} onPostula={() => setView("postula")} />
          <Services brand={brand} onCourses={goCourses} onService={openService} onDesignServices={() => setView("design-servicios")} />
          {brand === "records" && enabledBrands.includes("academy") && <Roster brand={brand} />}
          {brand === "records" && <PortfolioTeaser variant={t.jukebox} onOpen={() => setView("portafolio")} />}
          {brand === "records" && <FreebiesTeaser onOpen={() => setView("freebies")} />}
          {brand === "design" && <Roster brand={brand} />}
          {brand === "academy" && <Pricing onOpen={() => setView("pricing")} />}
          <Footer brand={brand} />
        </React.Fragment>
      )}
      <TwPanel>
        <TwSection label="Cartelería" />
        <TwRadio label="Intensidad sticker" value={t.poster}
          options={["sobrio", "firme", "stickerazo"]}
          onChange={(v) => setTweak("poster", v)} />
        <TwSection label="Esquinas" />
        <TwRadio label="Lenguaje de bordes" value={t.corners}
          options={["recto", "suave", "globo"]}
          onChange={(v) => setTweak("corners", v)} />
        <TwSection label="Estación de escucha" />
        <TwRadio label="Tratamiento" value={t.jukebox}
          options={["vitrola", "stickers", "cinta"]}
          onChange={(v) => setTweak("jukebox", v)} />
        <TwSection label="Acento Records" />
        <TwColor label="Color de marca" value={t.accent}
          options={[
            ["#fdc90f", "#e6b70e", "#b48f0b"],
            ["#d3403b", "#b5332f", "#8e2825"],
            ["#7e4895", "#6b3c7e", "#552f64"],
            ["#494898", "#42428a", "#34336c"],
            ["#2d9f71", "#28865f", "#20694b"],
          ]}
          onChange={(v) => setTweak("accent", v)} />
      </TwPanel>
    </div>
  );
}

Object.assign(window, { MandiocaSite });
