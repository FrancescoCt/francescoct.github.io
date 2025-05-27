class CustomRoadmap extends HTMLElement {
  constructor() {
    super();

    // Recupera le coppie titolo-link dall'attributo "items"
    const id = this.getAttribute("id");
    // Creazione della struttura del menu
    if(id == "experience"){
        const data = experience;
        const roadmap = document.querySelector(`#${id}`);
        roadmap.insertAdjacentHTML("beforebegin", `
            <div class="timeline" id="timeline_${id}"></div>
        `);

        //Contenuto del container in cards
        const timeline = document.querySelector(`#timeline_${id}`);
        data.forEach(record => {
            timeline.insertAdjacentHTML("beforeend", `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3><em>${record.Role}</em></h3>
                        <p>${record.Description}</p>
                        <span class="date">${record.DateStart} - ${record.DateEnd}</span>
                    </div>
                </div>  
            `);
        })
    }
    
    // Dopo aver inserito gli elementi, rimuove il tag dal DOM
    this.remove();
  }
}

const experience = [

    {
    "Role" : "Studente - Master",
    "Description": "Certificazione Master in <em>Back-End Development</em> presso Start2Impact.",
    "DateStart": "2024",
    "DateEnd": "2025"
    },
    {
    "Role" : "Software Developer - Junior",
    "Description": "Sviluppatore <em>Full-Stack</em> presso Dedagroup.",
    "DateStart": "2022",
    "DateEnd": "Presente"
    },
    {
    "Role" : "Studente - Laurea Triennale",
    "Description": "Studente di <em>Ingegneria Informatica</em> presso l'Università degli Studi di Catania.",
    "DateStart": "2018",
    "DateEnd": "2022"
    },
    {
    "Role" : "Studente - Diploma classico",
    "Description": "Studente presso il Liceo Classico Mario Cutelli di Catania",
    "DateStart": "2014",
    "DateEnd": "2018"
    },
]

// Registra il Custom Element
customElements.define("custom-roadmap", CustomRoadmap);