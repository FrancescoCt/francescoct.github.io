class CustomTable extends HTMLElement {
  constructor() {
    super();
    // Recupera le coppie titolo-link dall'attributo "items"
    const id = this.getAttribute("id"); //path del file dataJson con le info
    const dataJson = this.getAttribute("dataJson"); //path del file dataJson con le info

    if(dataJson == "skills"){
        const data = skillsTable;

        // Creazione del container
        const table = document.querySelector(`#${id}`);
        table.insertAdjacentHTML("beforebegin", `
            <table id="table_${id}">
                <thead>
                    <tr id="thead_tr_${id}"></tr>
                </thead>
                <tbody id="tbody_${id}"></tbody>
            </table>
        `);

        const thead = document.querySelector(`#thead_tr_${id}`);
        const tbody = document.querySelector(`#tbody_${id}`);

        // Popolamento di <thead>
        data.Fields.forEach(field => {
            thead.insertAdjacentHTML("beforeend", `<th>${field}</th>`);
        });

        // Trova il massimo numero di elementi nelle categorie
        const maxRows = Math.max(...data.Fields.map(field => data[field].length));

        // Popolamento di <tbody>
        for (let i = 0; i < maxRows; i++) {
            let rowHTML = "<tr>";
            data.Fields.forEach(field => {
                rowHTML += `<td>${data[field][i] || ""}</td>`;
            });
            rowHTML += "</tr>";
            tbody.insertAdjacentHTML("beforeend", rowHTML);
        }
    }
    // Dopo aver inserito gli elementi, rimuove il tag dal DOM
    this.remove();
  }
}
//Definizione dei dati che possono essere usati nelle cards
const skillsTable =
    {
    "Id" : 1,
    "Fields": ["Linguaggi", "Frameworks", "Altro"],
    "Linguaggi" : ["Python", "Ruby", "Java", "C", "PHP", "TypeScript", "HTML", "CSS", "JS", "C#", "Mysql"],
    "Frameworks" : ["Wordpress", "Xampp", ".NET", "NodeJS"],
    "Altro" : [ "VsCode", "Visual Studio", "Eclipse", "ThreeJS", "Express", "Mocha Test", "SQLServerManager", "OracleVM", "Windows Subsystem Linux (WSL)"],
    }

// Registra il Custom Element
customElements.define("custom-table", CustomTable);