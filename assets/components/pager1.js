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
        this.filteredData = [];
        this.totalPages = 0;

        this.loadData();
    }

    async loadData() {
        if (this.dataJson === "output") {
            try {
                const response = await fetch("output.json");
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
                <input id="search-box" type="text" placeholder="Cerca..." style="margin: auto;" />
                <table>
                    <thead>
                        <tr id="table-header"></tr>
                    </thead>
                    <tbody id="table-body"></tbody>
                </table>
                <div class="pagination">
                    <button id="prev-page"> <- Precedente</button>
                    <span id="page-info">${this.currentPage} di ${this.totalPages}</span>
                    <button id="next-page"> -> Successiva</button>
                </div>
            </div>
        `);

        this.displayTable();

        document.getElementById("prev-page").addEventListener("click", () => this.prevPage());
        document.getElementById("next-page").addEventListener("click", () => this.nextPage());
        document.getElementById("search-box").addEventListener("input", (e) => this.applyFilter(e.target.value));

        this.remove();
    }

    displayTable() {
        const headerRow = document.getElementById("table-header");
        const body = document.getElementById("table-body");
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

        document.getElementById("page-info").textContent = `${this.currentPage} di ${this.totalPages}`;
    }

    applyFilter(query) {
        this.currentPage = 1;
        const lowered = query.toLowerCase();

        this.filteredData = this.data.filter(row =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(lowered)
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
