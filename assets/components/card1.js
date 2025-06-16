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
    },
    {
    "Id" : 4,
    "Title" : "Education Typescript",
    "Thumbnail": "../../assets/img/lavagna.webp",
    "Description": "<p>Gestione di Corsi erogati da Aziende per Partecipanti con determinati requisiti, utilizzo di tipi ed eccezioni da gestire. Progetto visionabile sul link CodePen situato nel Readme della Repo.</p>\n<h4>Linguaggi: Typescript, JS</h4>",
    "Url": "https://github.com/FrancescoCt/EducationTypescript"
    },
    {
    "Id" : 5,
    "Title" : "Travel Api",
    "Thumbnail": "../../assets/img/lavagna.webp",
    "Description": "<p>Servizio API in PHP per la gestione di un'agenzia di viaggi. Usare Xampp per il testing in locale dell'applicazione.</p>\n<h4>Linguaggi: HTML, CSS, PHP, JS, MySQL</h4>",
    "Url": "https://github.com/FrancescoCt/TravelAPI"
    },
    {
    "Id" : 6,
    "Title" : "NodeJs Travel Api",
    "Thumbnail": "../../assets/img/lavagna.webp",
    "Description": "<p>Riscrittura del progetto Travel API riadattato in NodeJs. Usare Xampp per il testing in locale dell'applicazione.</p>\n<h4>Linguaggi: HTML, CSS, JS, MySQL, NodeJS</h4>\n<h4>Framework: NodeJS</h4>",
    "Url": "https://github.com/FrancescoCt/NodejsTravelApi"
    },
    {
    "Id" : 7,
    "Title" : "WordPress Custom Theme",
    "Thumbnail": "../../assets/img/lavagna.webp",
    "Description": "<p>Tema custom in Wordpress, testabile in locale anche con Xampp, ma applicabile anche online.</p>\n<h4>Linguaggi: HTML, CSS, PHP, JS, MySQL</h4>\n<h4>Framework: WordPress</h4>",
    "Url": "https://github.com/FrancescoCt/wordpressCustomTheme"
    },
    {
    "Id" : 8,
    "Title" : "Node JWT API",
    "Thumbnail": "../../assets/img/lavagna.webp",
    "Description": "<p>Progetto finale del corso: accesso ad area di login e uso credenziali per servizi API usate e migliorate del progetto NodeJsTravelApi</p>\n<h4>Linguaggi: HTML, CSS, JS, MySQL</h4>\n<h4>Framework: NodeJS</h4>",
    "Url": "https://github.com/FrancescoCt/wordpressCustomTheme"
    },
    {
    "Id" : 9,
    "Title" : "Portfolio",
    "Thumbnail": "../../assets/img/lavagna.webp",
    "Description": "<p>Il nono progetto menzionato nella certificazione del master è proprio questo Portfolio, buona visione :)</p>\n<h4>Linguaggi: HTML, CSS, JS</h4>",
    "Url": "https://francescoct.github.io/"
    },
];

const personalProjects = [
    {
    "Id" : 1,
    "Title" : "CSV to JSON Converter",
    "Thumbnail": "../../assets/img/progetto.webp",
    "Description": "<p>Convertitore istantaneo da csv a json</p>\n<h4>Linguaggi: HTML, CSS, JS</h4>",
    "Url": "csvToJsonConverter/"
    },
    {
    "Id" : 2,
    "Title" : "Graph Plotter",
    "Thumbnail": "../../assets/img/programmazione.webp",
    "Description": "<p>Analisi di trend veloce a partire da punti ed etichette prese in input </p>\n<h4>Linguaggi: HTML, CSS, JS</h4>",
    "Url": "graphPlotter/"
    },
    {
    "Id" : 3,
    "Title" : "Progetto GIS",
    "Thumbnail": "../../assets/img/programmazione.webp",
    "Description": "<p>Semplice programma GIS che calcola la rotta da un punto A ad un punto B qualsiasi sulla mappa. Usa Javascript e leaflet per il suo funzionamento </p>\n<h4>Linguaggi: HTML, CSS, JS</h4>",
    "Url": "gis/"
    },
    {
    "Id" : 4,
    "Title" : "Piante",
    "Thumbnail": "../../assets/img/programmazione.webp",
    "Description": "<p>Programma con autenticazione per vedere dati da API personalizzata </p>\n<h4>Linguaggi: HTML, CSS, JS</h4>",
    "Url": "piante/"
    },

];



// Registra il Custom Element
customElements.define("custom-cards", CustomCards);