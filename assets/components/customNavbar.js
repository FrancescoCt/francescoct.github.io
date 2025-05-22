class CustomHorizontalNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Recupera le coppie titolo-link dall'attributo "items"
    const items = this.getAttribute("items")?.split(";") || [];

    // Creazione della struttura del menu
    const menu = document.createElement("nav");
    menu.innerHTML = `<ul style="list-style:none; padding:0;">${
      items.map(item => {
        const [title, link] = item.split(",");
        return `<li><a href="${link.trim()}">${title.trim()}</a></li>`;
      }).join("")
    }</ul>`;

    this.shadowRoot.appendChild(menu);
  }
}

// Registra il Custom Element
customElements.define("custom-horizontal_navbar", CustomHorizontalNavbar);
