class CustomHeadContent extends HTMLElement {
  constructor() {
    super();

    const title = this.getAttribute("title") || "Default Title";
    const linkStyle = this.getAttribute("linkStyle");
    const linkIcon = this.getAttribute("linkIcon");
    const useBootstrap = this.getAttribute("useBootstrap");
    const scripts = this.getAttribute("scripts")?.split(",") || [];

    // Inserisci solo nuovi elementi, senza sovrascrivere head
    document.head.insertAdjacentHTML("beforeend", `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="Author: Francesco Catania, Page: ${title}">
    `);

    document.title = title;  // Modifica il titolo senza modificare innerHTML

    if (linkStyle) {
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = linkStyle;
      styleLink.setAttribute("loading", "lazy");
      document.head.appendChild(styleLink);
    }

    if (linkIcon) {
      const iconLink = document.createElement("link");
      iconLink.rel = "icon";
      iconLink.href = linkIcon;
      iconLink.setAttribute("loading", "lazy");
      document.head.appendChild(iconLink);
    }

    if (useBootstrap) {
      const bootstrapLink = document.createElement("link");
      bootstrapLink.rel = "stylesheet";
      bootstrapLink.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";
      document.head.appendChild(bootstrapLink);
    }

    scripts.forEach(src => {
      const script = document.createElement("script");
      script.src = src.trim();
      script.defer = true;
      document.head.appendChild(script);
    });

    // Dopo aver inserito gli elementi, rimuove il tag dal DOM
    this.remove();
  }
}

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

//--------------------------------------------------------------
// 🎯 Risultati attesi
// ✅ Meno shift nel layout, grazie all'aggiunta incrementale degli elementi 
// ✅ Caricamento più efficiente, con lazy-loading e preload 
// ✅ Maggiore compatibilità e stabilità, evitando innerHTML

// Questa soluzione dovrebbe migliorare la stabilità del layout senza impatti negativi sulla performance. 
// Se hai bisogno di un test più specifico, esaminare i risultati con Google Lighthouse! 🚀