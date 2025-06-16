class CustomPager extends HTMLElement {
    constructor() {
        super();
        
        this.rowsPerPage = parseInt(this.getAttribute("rows") || "5");
        this.maxColumns = 4;
        this.currentPage = 1;
        this.dataJson = this.getAttribute("dataJson");
        this.data = this.retrieveData();
        this.render();
    }

    generateData(rows, columns) {
        const generatedData = [];
        for (let i = 0; i < rows; i++) {
            const row = {};
            for (let j = 0; j < columns; j++) {
                row[`Colonna ${j + 1}`] = `Dato ${i + 1}-${j + 1}`;
            }
            generatedData.push(row);
        }
        return generatedData;
    }

    retrieveData() {
        if(this.dataJson == "skills"){
            return skillsTable;
        }
        else{
            return this.generateData(50, this.maxColumns);
        }
        ;
    }

    render() {
        const container = document.querySelector("custom-pager");
        container.insertAdjacentHTML("beforebegin", `
            <div class="table-container">
                <table>
                    <thead>
                        <tr id="table-header"></tr>
                    </thead>
                    <tbody id="table-body"></tbody>
                </table>
            
            <div class="pagination">
                <button id="prev-page"> <- Precedente</button>
                <span id="page-info">Pagina ${this.currentPage}</span>
                <button id="next-page"> -> Successiva</button>
            </div>
            
            </div>
        `);

        this.displayTable();

        // Aggiunta degli eventi ai bottoni
        document.getElementById("prev-page").addEventListener("click", () => this.prevPage());
        document.getElementById("next-page").addEventListener("click", () => this.nextPage());

        // Rimuove il tag dal DOM dopo la creazione della tabella
        this.remove();
    }

    displayTable() {
        const headerRow = document.getElementById("table-header");
        const body = document.getElementById("table-body");
        headerRow.innerHTML = "";
        body.innerHTML = "";

        //Imposta header
        Object.keys(this.data[0]).forEach(key => {
            const th = document.createElement("th");
            th.textContent = key;
            headerRow.appendChild(th);
        });

        const startIndex = (this.currentPage - 1) * this.rowsPerPage;
        const endIndex = Math.min(startIndex + this.rowsPerPage, this.data.length);

        //Imposta finestra dei record
        for (let i = startIndex; i < endIndex; i++) {
            const tr = document.createElement("tr");
            Object.values(this.data[i]).forEach(value => {
                const td = document.createElement("td");
                td.textContent = value;
                tr.appendChild(td);
            });
            body.appendChild(tr);
        }

        document.getElementById("page-info").textContent = `Pagina ${this.currentPage}`;
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.displayTable();
        }
    }

    nextPage() {
        if ((this.currentPage * this.rowsPerPage) < this.data.length) {
            this.currentPage++;
            this.displayTable();
        }
    }
}

//Definizione dei dati che possono essere usati nelle cards

const skillsTable =[
    {"Linguaggi" : "Python", "Frameworks": "Wordpress", "Altro": "VsCode"},
    {"Linguaggi" : "Ruby",   "Frameworks": "Xampp",     "Altro": "Visual Studio"},
    {"Linguaggi" : "C",      "Frameworks": ".NET",      "Altro": "Eclipse"},
    {"Linguaggi" : "Java",   "Frameworks": "NodeJS",    "Altro": "ThreeJS"},
    {"Linguaggi" : "PHP",    "Frameworks": "",          "Altro": "Express"},
    {"Linguaggi" : "TypeScript", "Frameworks": "",      "Altro": "Mocha Test"},
    {"Linguaggi" : "HTML",   "Frameworks": "",          "Altro": "SQLServerManager"},
    {"Linguaggi" : "CSS",    "Frameworks": "",          "Altro": "OracleVM"},
    {"Linguaggi" : "JS",     "Frameworks": "",          "Altro": "Windows Subsystem Linux (WSL)"},
    {"Linguaggi" : "C#",     "Frameworks": "",          "Altro": ""},
    {"Linguaggi" : "Mysql",  "Frameworks": "",          "Altro": ""},
]
// Registra il Custom Element
customElements.define("custom-pager", CustomPager);

