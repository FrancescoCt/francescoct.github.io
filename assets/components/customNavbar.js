class CustomHorizontalNavbar extends HTMLElement {
  constructor() {
    super();

    // Recupera le coppie titolo-link dall'attributo "items"
    const urlHome = this.getAttribute("urlHome") || "#";
    const items = this.getAttribute("items")?.split(";") || [];

    // Creazione della struttura del menu
    if (items) {
      document.body.insertAdjacentHTML("beforeend", `
        <nav>
            <div class="logo"><a href="${urlHome}">Francesco Catania</a></div>
            <input type="checkbox" id="menu-toggle">
            <label for="menu-toggle" class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </label>
            <ul class="menu">
                ${
                  items.map(item => {
                    const [title, link] = item.split(",");
                    return `<li class="nav-item"><a href="${link.trim()}">${title.trim()}</a></li>`;
                  }).join("")
                }
            </ul>
        </nav>
      `);
    }
    // Dopo aver inserito gli elementi, rimuove il tag dal DOM
    this.remove();
  }
}

// Registra il Custom Element
customElements.define("custom-horizontal_navbar", CustomHorizontalNavbar);

