class CustomFooter extends HTMLElement {
  constructor() {
    super();

    // Recupera le coppie titolo-link dall'attributo "items"
    const imageLogo = this.getAttribute("imageLogo");
    const imageGit = this.getAttribute("imageGit");
    const imageInsta = this.getAttribute("imageInsta");
    const imageLinkedin = this.getAttribute("imageLinkedin");

    // Creazione della struttura del menu
    const prefooter = document.querySelector("#pre-footer");
    prefooter.insertAdjacentHTML("afterend", `
        <footer class="text-white pt-4 mt-auto bg-dark-custom">
            
              <div class="row">
                <!-- Contatti -->
                <div class="col-md-4">
                  <h3>Contatti</h3>
                  <ul class="list-unstyled">
                    <li>Telefono: +39 123 456 7890</li>
                    <li>Email: info@hotelazienda.com</li>
                    <li>Indirizzo: Via Roma 123, Palermo, Italia</li>
                  </ul>
                </div>
                <!-- Social Media -->
                <div class="col-md-4">
                  <h3>Seguici</h3>
                  <ul class="list-unstyled">
                    <li><a href="#" class="text-white"><img class="svg m-2" src="${imageInsta}" alt="insta logo">Instagram</a></li>
                    <li><a href="#" class="text-white"><img class="svg m-2" src="${imageGit}" alt="git logo">Github</a></li>
                    <li><a href="#" class="text-white"><img class="svg m-2" src="${imageLinkedin}" alt="ln logo">LinkedIn</a></li>
                  </ul>
                </div>
                <!-- Informazioni -->
                <div class="col-md-4">
                  <h3>Informazioni</h3>
                  <ul class="list-unstyled">
                    <li><a href="#" class="text-white">Chi siamo</a></li>
                    <li><a href="#" class="text-white">Servizi</a></li>
                    <li><a href="#" class="text-white">Privacy Policy</a></li>
                    <li><a href="#" class="text-white">Termini e Condizioni</a></li>
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