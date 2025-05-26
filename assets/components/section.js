class CustomSection extends HTMLElement {
  constructor() {
    super();

    // Recupera le coppie titolo-link dall'attributo "items"
    const id = this.getAttribute("id");
    const image = this.getAttribute("image");
    const title = this.getAttribute("title");
    const description = this.getAttribute("description");
    const table = this.getAttribute("table"); //Prenderà come parametro l'id di un elemento json dove definisco dati da inserire in tabella

    // Creazione della struttura del menu
    
    const section = document.querySelector(`#${id}`);
    section.insertAdjacentHTML("beforebegin", `
        <section id="${id}" class="about">
            <div class="profile-card">
                <div class="profile-image">
                    <img src="${image}" alt="Img_${title}">
                </div>
                <div class="profile-description">
                    <h2>${title}</h2>
                    <p>${description}</p>
                </div>
            </div>
        </section>
    `);
    // Dopo aver inserito gli elementi, rimuove il tag dal DOM
    this.remove();
  }
}

// Registra il Custom Element
customElements.define("custom-section", CustomSection);