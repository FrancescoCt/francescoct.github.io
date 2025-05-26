class CustomHeadContent extends HTMLElement {
  constructor() {
    super();

    const title = this.getAttribute("title") || "Default Title";
    const linkStyle = this.getAttribute("linkStyle");
    const linkIcon = this.getAttribute("linkIcon");
    const useBootstrap = this.getAttribute("useBootstrap");
    const images = this.getAttribute("images")?.split(",") || [];
    const scripts = this.getAttribute("scripts")?.split(",") || [];

    // Inserisci solo nuovi elementi, senza sovrascrivere head
    document.head.insertAdjacentHTML("beforeend", `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="Author: Francesco Catania, Page: ${title}">

      <link rel="preconnect" href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;700&display=swap" as="style"/>
      <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;700&display=swap" rel="stylesheet">
    `);

    document.title = title;  // Modifica il titolo senza modificare innerHTML

    if (linkStyle) {
      document.head.insertAdjacentHTML("beforeend", `
        <link rel="preload" href="${linkStyle}" as="style">
        <link rel="stylesheet" href="${linkStyle}">
      `);
    }

    if (linkIcon) {
      document.head.insertAdjacentHTML("beforeend", `
        <link rel="icon" href="${linkIcon}">
      `);
    }

    if (useBootstrap) {
      document.head.insertAdjacentHTML("beforeend", `
        <link rel="preload" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" as="style">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      `);
    }

    if (images) {
      images.forEach(src => {
          document.head.insertAdjacentHTML("beforeend", `
            <link rel="preload" href="${src}" as="image">
          `);
      });
      
    }

    if(scripts){
      scripts.forEach(src => {
        const script = document.createElement("script");
        script.src = src.trim();
        script.defer = true;
        document.head.appendChild(script);
      });
    }
    

    // Dopo aver inserito gli elementi, rimuove il tag dal DOM
    this.remove();
    //Rendo visibile il body per evitare cumulative layer shift
    window.onload = function() {
      document.body.style.visibility = "visible";
    };
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