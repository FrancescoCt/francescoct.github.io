class CustomFooter extends HTMLElement {
  constructor() {
    super();

    // Recupera le coppie titolo-link dall'attributo "items"
    const imageLogo = this.getAttribute("imageLogo");
    const imageGit = this.getAttribute("imageGit");
    const imageInsta = this.getAttribute("imageInsta");
    const imageLinkedin = this.getAttribute("imageLinkedin");

    // Creazione della struttura del menu
    const footer = document.querySelector("#footer");
    footer.insertAdjacentHTML("beforebegin", `
        <footer class="text-white pt-4 mt-auto bg-dark-custom">
            
              <div class="row">
                <!-- Contatti -->
                <div class="col-md-4">
                  <h1>Contatti</h1>
                  <ul class="list-unstyled">
                    <li>Telefono: +39 123 456 7890</li>
                    <li>Email: info@hotelazienda.com</li>
                    <li>Indirizzo: Via Roma 123, Palermo, Italia</li>
                  </ul>
                </div>
                <!-- Social Media -->
                <div class="col-md-4">
                  <h1>Seguici</h1>
                  <ul class="list-unstyled">
                    <li><a href="#"><img class="svg m-2" src="${imageInsta}" alt="insta logo">Instagram</a></li>
                    <li><a href="#"><img class="svg m-2" src="${imageGit}" alt="git logo">Github</a></li>
                    <li><a href="#"><img class="svg m-2" src="${imageLinkedin}" alt="ln logo">LinkedIn</a></li>
                  </ul>
                </div>
                <!-- Informazioni -->
                <div class="col-md-4">
                  <h1>Informazioni</h1>
                  <ul class="list-unstyled">
                    <li><a href="#">Chi siamo</a></li>
                    <li><a href="#">Servizi</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Termini e Condizioni</a></li>
                  </ul>
                </div>
              </div>
            <div class="text-center text-white py-3">
              &copy; Frank
            </div>
        </footer>
    `);
    // Dopo aver inserito gli elementi, rimuove il tag dal DOM
    this.remove();
  }
}

// Registra il Custom Element
customElements.define("custom-footer", CustomFooter);