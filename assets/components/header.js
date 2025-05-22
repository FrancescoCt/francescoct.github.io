class CustomHeader extends HTMLElement {
  constructor() {
    super();

    // Recupera le coppie titolo-link dall'attributo "items"
    const title = this.getAttribute("title") || "Default title";
    const motto = this.getAttribute("motto") || "Default motto";

    // Creazione della struttura del menu
    
    document.body.insertAdjacentHTML("beforeend", `
        <header class="hero">
            <div class="container">
                <h1>${title}</h1>
                <p><em>${motto}</em></p>
            </div>
        </header>
    `);
    // Dopo aver inserito gli elementi, rimuove il tag dal DOM
    this.remove();
  }
}

// Registra il Custom Element
customElements.define("custom-header", CustomHeader);