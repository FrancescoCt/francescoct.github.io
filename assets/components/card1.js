class CustomCards extends HTMLElement {
  constructor() {
    super();

    // Recupera le coppie titolo-link dall'attributo "items"
    const dataJson = this.getAttribute("dataJson"); //path del file dataJson con le info
    
    if(dataJson){
        let data = [];
        if(dataJson == "projects"){data = projects;}
        if(dataJson == "start2impactProjects"){data = start2impactProjects;}
        if(dataJson == "personalProjects"){data = personalProjects;}
        
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
    "Title" : "Progetti Start2Impact",
    "Thumbnail": "../assets/img/progetto.webp",
    "Description": "<p>Raccolta di progetti sviluppati durante il Master in Back End Development.</p>",
    "Url": "../projects/start2impact/"
    },
    {
    "Id" : 2,
    "Title" : "Progetti Personali",
    "Thumbnail": "../assets/img/programmazione.webp",
    "Description": "<p>Raccolta dei migliori progetti sviluppati durante il mio percorso di formazione universitario e personale.</p>",
    "Url": "../projects/personal/"
    },
];
const start2impactProjects = [

    {
    "Id" : 1,
    "Title" : "Introduzione allo sviluppo",
    "Thumbnail": "introduzioneSviluppo/assets/img/ricercatore1.webp",
    "Description": "<p>Landing page statica per sito di divulgazione scientifica</p>\n<h4>Linguaggi: HTML, CSS</h4>",
    "Url": "introduzioneSviluppo/"
    },
    {
    "Id" : 2,
    "Title" : "Counter JS",
    "Thumbnail": "counterjs/assets/img/CounterJSLightTheme.webp",
    "Description": "<p>Contatore javascript</p>\n<h4>Linguaggi: HTML, CSS, JS</h4>",
    "Url": "counterjs/"
    },
    {
    "Id" : 3,
    "Title" : "Hacker News",
    "Thumbnail": "../../assets/img/lavagna.webp",
    "Description": "<p>Chiamate API con Javascript, uso di Webpack, fetch e Axios</p>\n<h4>Linguaggi: HTML, CSS, JS</h4>",
    "Url": "hackerNews/dist/"
    }
];

const personalProjects = [
    {
    "Id" : 4,
    "Title" : "CSV to JSON Converter",
    "Thumbnail": "../../assets/img/progetto.webp",
    "Description": "<p>Convertitore istantaneo da csv a json</p>\n<h4>Linguaggi: HTML, CSS, JS</h4>",
    "Url": "csvToJsonConverter/"
    },
    {
    "Id" : 5,
    "Title" : "Graph Plotter",
    "Thumbnail": "../../assets/img/programmazione.webp",
    "Description": "<p>Analisi di trend veloce a partire da punti ed etichette prese in input </p>\n<h4>Linguaggi: HTML, CSS, JS</h4>",
    "Url": "graphPlotter/"
    },

];



// Registra il Custom Element
customElements.define("custom-cards", CustomCards);