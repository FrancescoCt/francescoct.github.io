class CustomHeadContent extends HTMLElement {
  constructor() {
    super();

    //Inserisci primi elementi dentro head
    document.head.innerHTML = `
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
    `;

    // Recupera gli attributi passati in <custom-head>
    const title = this.getAttribute("title") || "Default Title";
    const linkStyle = this.getAttribute("linkStyle");
    const linkIcon = this.getAttribute("linkIcon");
    const useBootstrap = this.getAttribute("useBootstrap");

    const scripts = this.getAttribute("scripts")?.split(",") || [];

    // Aggiorna il titolo della pagina
    document.title = title;

    // Se esiste un file CSS, aggiungilo alla <head>
    if (linkStyle) {
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = linkStyle;
      document.head.appendChild(styleLink);
    }

    // Se esiste un'icona, aggiungila alla <head>
    if (linkIcon) {
      const iconLink = document.createElement("link");
      iconLink.rel = "icon";
      iconLink.href = linkIcon;
      document.head.appendChild(iconLink);
    }

    // Se si vuole usare bootstrap, aggiungila alla <head>
    if (useBootstrap) {
      const bootstrapLink = document.createElement("link");
      bootstrapLink.rel = "stylesheet";
      bootstrapLink.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";
      document.head.appendChild(bootstrapLink);
    }

    //Se esistono scripts
    // Caricamento degli script specificati
    scripts.forEach(src => {
      const script = document.createElement("script");
      script.src = src.trim();  // Rimuove eventuali spazi
      script.defer = true;       // Evita blocchi di caricamento
      document.head.appendChild(script);
    });

  }
}

// Registra il Custom Element
customElements.define("custom-head_content", CustomHeadContent);

// ------------------------------------------------------------------
//Esempio funzionamento
// <!DOCTYPE html>
// <html lang="it">
// <head>
//   <custom-head title="Home Page" scripts="components/my-card.js, components/example.js" useBootstrap></custom-head>
// </head>
// <body>

//   <h1>Benvenuto nella Home Page</h1>
//   <my-card title="Titolo 1" content="Un componente riutilizzabile!" link="https://www.example.com"></my-card>

// </body>
// </html>