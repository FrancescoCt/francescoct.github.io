class CustomFooter extends HTMLElement {
  constructor() {
    super();

    // Recupera le coppie titolo-link dall'attributo "items"
    const imageLogo = this.getAttribute("imageLogo");
    const imageGit = this.getAttribute("imageGit");
    const imageInsta = this.getAttribute("imageInsta");
    const imageLinkedin = this.getAttribute("imageLinkedin");

    // Creazione della struttura del menu
    
    document.body.insertAdjacentHTML("beforeend", `
        <footer>
            <address class="contact">
                <a href="https://start2impact.it"><img type="image/x-icon" src="${imageLogo}" alt="Logo Start 2 Impact" class="logo"></a>
                <p>Indirizzo: Via Fittizia 123, 00100 Roma</p>
                <p>Telefono: +39 06 12345678</p>
                <p>Email: info@azienda.it</p>
            </address>
            <ul>
                <li><a href="https://francescoct.github.io/"><img src="${imageGit}" alt="GitHub"></a></li>
                <li><a href="https://instagram.com"><img src="${imageInsta}" alt="Instagram"></a></li>
                <li><a href="https://linkedin.com"><img src="${imageLinkedin}" alt="Linkedin"></a></li>
            </ul>
        </footer>
    `);
    // Dopo aver inserito gli elementi, rimuove il tag dal DOM
    this.remove();
  }
}

// Registra il Custom Element
customElements.define("custom-footer", CustomFooter);