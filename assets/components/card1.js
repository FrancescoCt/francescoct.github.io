class CustomFooter extends HTMLElement {
  constructor() {
    super();

    // Recupera le coppie titolo-link dall'attributo "items"
    const dataJson = this.getAttribute("dataJson") || [];

    if(dataJson != []){
        // Creazione della struttura del menu
        const prefooter = document.querySelector("#pre-footer");
        prefooter.insertAdjacentHTML("afterend", `
            <div class="content">
                <div class="cards">
                    <div class="card">
                        <img src="../projects/introduzioneSviluppo/assets/img/ricercatore1.jpg" alt="Thumbnail progetto 1">
                        <h3>Introduzione allo Sviluppo</h3>
                        <p>Landing page statica per sito di divulgazione scientifica</p>
                        <h4>Linguaggi: </h4>
                        <div class="linguaggi">
                            <img src="../assets/favicons/html.png" alt="Icona html">
                            <img src="../assets/favicons/css.png" alt="Icona css">
                        </div>
                        <a href="../projects/introduzioneSviluppo/" target="_blank">Scopri di più</a>
                    </div>
                    <div class="card">
                        <img src="../projects/counterjs/assets/img/CounterJSLightTheme.png" alt="Thumbnail progetto 2">
                        <h3>Counter JS</h3>
                        <p>Contatore javascript</p>
                        <h4>Linguaggi: </h4>
                        <div class="linguaggi">
                            <img src="../assets/favicons/html.png" alt="Icona html">
                            <img src="../assets/favicons/css.png" alt="Icona css">
                            <img src="../assets/favicons/javascript.png" alt="Icona js">
                        </div>
                        <a href="../projects/counterjs/">Scopri di più</a>
                    </div>
                    <div class="card">
                        <img src="../assets/img/lavagna.webp" alt="Thumbnail progetto 3">
                        <h3>Hacker News</h3>
                        <p>Chiamate API con Javascript, uso di Webpack, fetch e Axios</p>
                        <h4>Linguaggi: </h4>
                        <div class="linguaggi">
                            <img src="../assets/favicons/html.png" alt="Icona html">
                            <img src="../assets/favicons/css.png" alt="Icona css">
                            <img src="../assets/favicons/javascript.png" alt="Icona js">
                        </div>
                        <a href="../projects/hackerNews/dist/">Scopri di più</a>
                    </div>
                </div>
        </div>
        `);
    }

   
    // Dopo aver inserito gli elementi, rimuove il tag dal DOM
    this.remove();
  }
}

// Registra il Custom Element
customElements.define("custom-footer", CustomFooter);