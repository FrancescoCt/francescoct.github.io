class CustomPager extends HTMLElement {
    constructor() {
        super();
        
        this.rowsPerPage = parseInt(this.getAttribute("rows") || "5");
        this.currentPage = 1;
        this.dataJson = this.getAttribute("dataJson");
        this.columnHeaders = this.getAttribute("columnHeaders") 
            ? this.getAttribute("columnHeaders").split(";").map(header => header.trim()) 
            : null;
        this.data = [];
        this.totalPages = 0;

        this.loadData();
    }

    async loadData() {
        if (this.dataJson === "output") {
            try {
                const response = await fetch("output.json");
                if (!response.ok) {
                    throw new Error(`Errore nel caricamento del file JSON: ${response.status}`);
                }
                this.data = await response.json();
                this.totalPages = Math.ceil(this.data.length / this.rowsPerPage);
                this.render();
            } catch (error) {
                console.error("Errore durante la fetch:", error);
            }
        } else {
            this.data = this.dataJson === "skills" ? skillsTable : [];
            this.totalPages = Math.ceil(this.data.length / this.rowsPerPage);
            this.render();
        }
    }

    render() {
        if (this.data.length === 0) return;

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
                    <span id="page-info">Pagina ${this.currentPage} di ${this.totalPages}</span>
                    <button id="next-page"> -> Successiva</button>
                </div>
            </div>
        `);

        this.displayTable();

        document.getElementById("prev-page").addEventListener("click", () => this.prevPage());
        document.getElementById("next-page").addEventListener("click", () => this.nextPage());

        this.remove();
    }

    displayTable() {
        const headerRow = document.getElementById("table-header");
        const body = document.getElementById("table-body");
        headerRow.innerHTML = "";
        body.innerHTML = "";

        if (this.data.length === 0) return;

        const headers = this.columnHeaders || Object.keys(this.data[0]);

        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });

        const startIndex = (this.currentPage - 1) * this.rowsPerPage;
        const endIndex = Math.min(startIndex + this.rowsPerPage, this.data.length);

        for (let i = startIndex; i < endIndex; i++) {
            const tr = document.createElement("tr");
            headers.forEach(key => {
                const td = document.createElement("td");

                // Se il valore è un oggetto con più elementi, concatenalo
                if (typeof this.data[i][key] === "object") {
                    td.textContent = Object.values(this.data[i][key]).join(", ");
                } else {
                    td.textContent = this.data[i][key] || "";
                }

                tr.appendChild(td);
            });
            body.appendChild(tr);
        }

        document.getElementById("page-info").textContent = `Pagina ${this.currentPage} di ${this.totalPages}`;
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.displayTable();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.displayTable();
        }
    }
}

customElements.define("custom-pager", CustomPager);
