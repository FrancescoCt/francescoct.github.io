class CustomPager extends HTMLElement {
    constructor() {
        super();

        this.name = this.getAttribute("name") || "";
        this.rowsPerPage = parseInt(this.getAttribute("rows") || "5");
        this.currentPage = 1;
        this.dataJson = this.getAttribute("dataJson");
        this.columnHeaders = this.getAttribute("columnHeaders") 
            ? this.getAttribute("columnHeaders").split(";").map(header => header.trim()) 
            : null;
        this.data = [];
        this.filteredData = [];
        this.totalPages = 0;

        this.loadData();
    }

    async loadData() {
        if (["output", "spreaProprieta"].includes(this.dataJson)) {
            try {
                const response = await fetch(`${this.dataJson}.json`);
                if (!response.ok) throw new Error(`Errore nel caricamento del file JSON: ${response.status}`);
                this.data = await response.json();
            } catch (error) {
                console.error("Errore durante la fetch:", error);
                return;
            }
        } else {
            this.data = this.dataJson === "skills" ? skillsTable : [];
        }

        this.filteredData = [...this.data];
        this.totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);
        this.render();
    }

    render() {
        if (this.data.length === 0) return;

        const container = document.querySelector("custom-pager");
        container.insertAdjacentHTML("beforebegin", `
            <div class="table-container">
                <div class="profile-description">
                    <h2>${this.name.toUpperCase()}</h2>
                </div>
                <input id="${this.name}-search-box" type="text" placeholder="Cerca..." style="margin: auto;" />
                <table>
                    <thead>
                        <tr id="${this.name}-table-header"></tr>
                    </thead>
                    <tbody id="${this.name}-table-body"></tbody>
                </table>
                <div class="pagination">
                    <button id="${this.name}-prev-page"> <- Precedente</button>
                    <span id="${this.name}-page-info">${this.currentPage} di ${this.totalPages}</span>
                    <button id="${this.name}-next-page"> -> Successiva</button>
                </div>
            </div>
        `);

        this.displayTable();

        document.getElementById(`${this.name}-prev-page`).addEventListener("click", () => this.prevPage());
        document.getElementById(`${this.name}-next-page`).addEventListener("click", () => this.nextPage());
        document.getElementById(`${this.name}-search-box`).addEventListener("input", (e) => this.applyFilter(e.target.value));

        this.remove();
    }

    displayTable() {
        const headerRow = document.getElementById(`${this.name}-table-header`);
        const body = document.getElementById(`${this.name}-table-body`);
        headerRow.innerHTML = "";
        body.innerHTML = "";

        if (this.filteredData.length === 0) return;

        const headers = this.columnHeaders || Object.keys(this.filteredData[0]);

        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });

        const startIndex = (this.currentPage - 1) * this.rowsPerPage;
        const endIndex = Math.min(startIndex + this.rowsPerPage, this.filteredData.length);

        for (let i = startIndex; i < endIndex; i++) {
            const tr = document.createElement("tr");
            headers.forEach(key => {
                const td = document.createElement("td");
                const cellValue = this.filteredData[i][key];

                if (typeof cellValue === "object" && cellValue !== null) {
                    td.textContent = Object.values(cellValue).join(", ");
                } else {
                    td.textContent = cellValue || "";
                }

                tr.appendChild(td);
            });
            body.appendChild(tr);
        }

        document.getElementById(`${this.name}-page-info`).textContent = `${this.currentPage} di ${this.totalPages}`;
    }

    applyFilter(query) {
        this.currentPage = 1;
        const lowered = query.toLowerCase();

        // this.filteredData = this.data.filter(row =>
        //     Object.values(row).some(value =>
        //         String(value).toLowerCase().includes(lowered)
        //     )
        // );
        this.filteredData = this.data.filter(row =>
            Object.values(row).some(value =>
                (function extract(val) {
                    if (val === null || val === undefined) return false;
                    if (typeof val === 'object') {
                        return Object.values(val).some(nested => extract(nested));
                    }
                    return String(val).toLowerCase().includes(lowered);
                })(value)
            )
        );


        this.totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);
        this.displayTable();
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
