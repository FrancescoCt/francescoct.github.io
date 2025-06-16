class CustomAuthenticator extends HTMLElement {
    constructor() {
        super();
        
        this.hashedPassword = "DDF1E433921632AAC7AAD2F47957DEAD598FFC3EC2C96709592B97985E790474"
        this.isAuthenticated = false;

        this.render();
    }

    render() {
        const container = document.querySelector("custom-authenticator");
        container.insertAdjacentHTML("beforebegin", `
            <div id="auth-container">
                <h2>Inserisci la password per accedere</h2>
                <input type="password" id="passwordInput" placeholder="Password">
                <button id="loginButton">Accedi</button>
            </div>
        `);

        // <div id="protectedContent" style="display: none;">
        //         <h1>Benvenuto!</h1>
        //         <p>Ora puoi vedere il contenuto protetto.</p>
        //     </div>

        document.getElementById("loginButton").addEventListener("click", () => this.checkPassword());
    }

    async hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
    }

    async checkPassword() {
        const inputPassword = document.getElementById("passwordInput").value;
        const inputHash = (await this.hashString(inputPassword)).toUpperCase(); // Assicurati di usare await
        
        if (inputHash === this.hashedPassword) {
            this.isAuthenticated = true;

            document.getElementById("protectedContent").style.display = "block";
            document.getElementById("auth-container").style.display = "none";

            // Assicurati che il Pager possa caricare i dati dopo l'autenticazione
            document.dispatchEvent(new CustomEvent("authentication-success"));
        } else {
            alert("Password errata! Riprova.");
        }
    }

}

customElements.define("custom-authenticator", CustomAuthenticator);
