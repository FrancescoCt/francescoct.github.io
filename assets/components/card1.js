class CustomCards extends HTMLElement {
  constructor() {
    super();

    // Recupera le coppie titolo-link dall'attributo "items"
    const dataJson = this.getAttribute("dataJson"); //path del file dataJson con le info

    if(dataJson == "projects"){
        const data = projects;
        // Creazione del container
        const cards_container = document.querySelector("#cards-container");
        cards_container.insertAdjacentHTML("beforebegin", `
            <div class="content">
                <div id="cards" class="cards"></div>
            </div>       
        `);
        //Contenuto del container in cards
        const cards = document.querySelector("#cards");
        data.forEach(record => {
            cards.insertAdjacentHTML("beforeend", `
                    <div class="card">
                        <img src="${record.Thumbnail}" alt="${record.Title}">
                        <h3>${record.Title}</h3>
                        ${record.Description}
                        <a href="${record.Url}" target="_blank">Scopri di più</a>
                    </div>
            `);
        })
    }
    // Dopo aver inserito gli elementi, rimuove il tag dal DOM
    this.remove();
  }
}
//Definizione dei dati che possono essere usati nelle cards
const projects = [

    {
    "Id" : 1,
    "Title" : "Introduzione allo sviluppo",
    "Thumbnail": "../projects/introduzioneSviluppo/assets/img/ricercatore1.jpg",
    "Description": "<p>Landing page statica per sito di divulgazione scientifica</p>\n<h4>Linguaggi: HTML, CSS</h4>",
    "Url": "../projects/introduzioneSviluppo/"
    },
    {
    "Id" : 2,
    "Title" : "Counter JS",
    "Thumbnail": "../projects/counterjs/assets/img/CounterJSLightTheme.png",
    "Description": "<p>Contatore javascript</p>\n<h4>Linguaggi: HTML, CSS, JS</h4>",
    "Url": "../projects/counterjs/"
    },
    {
    "Id" : 3,
    "Title" : "Hacker News",
    "Thumbnail": "../assets/img/lavagna.webp",
    "Description": "<p>Chiamate API con Javascript, uso di Webpack, fetch e Axios</p>\n<h4>Linguaggi: HTML, CSS, JS</h4>",
    "Url": "../projects/hackerNews/dist/"
    },

]

// Registra il Custom Element
customElements.define("custom-cards", CustomCards);