const axios = require('axios');

function generateJoke(){
    return "I dont trust stairs. Theyre always up to something."
}

class Loader{

    constructor(){
        console.log("Questa è una variabile di ambiente!\n"+process.env.DB_HOST);
        this.loadMoreBtnElement = document.getElementById('loadMore');
        this.previousBtnElement = document.getElementById('loadPrevious');
        this.resultsContainerElement = document.getElementById('results');

        this.arrayNewsIds = [];
        this.arrayNews = [];
        
        this.endWindow = 10;
        this.startWindow = 0;


        this.loadMoreBtnElement.addEventListener('click', () => this.loadMore());
        this.previousBtnElement.addEventListener('click', () => this.loadPrevious());

        this.loadMore();
    }

    loadMore(){
        this.fetchResults();
        this.previousBtnElement.disabled = this.startWindow == 0 ? true : false;
        if(this.previousBtnElement.classList.contains('disabled')){
            this.previousBtnElement.classList.remove('disabled');
        }
    }
    loadPrevious(){
        if(this.endWindow > 10){
            this.fetchResults(false);
        }else{
            this.previousBtnElement.disabled = true;
            if(!this.previousBtnElement.classList.contains('disabled')){
                this.previousBtnElement.classList.add('disabled');
            }
        }
    }
    
    async fetchResults(forward = true) {
        //Recupero tutto l'array dal json
        const response = await fetch(process.env.URL_HACKER_NEWS_API+`newstories.json`);
        const data = await response.json();
        //Salvo solo i primi 10 elementi
        this.arrayNewsIds = data.slice(this.startWindow, this.endWindow);
        //Quando clicco sul loadmore vorrei vedere altri 10 elementi in più per cui traslo la finestra
        if(forward == true){
            this.endWindow += 10;
            this.startWindow += 10;
            
        }else if(forward == false){
            this.endWindow = this.endWindow > 10 ? this.endWindow - 10 : 0;
            this.startWindow = this.startWindow > 0 ? this.startWindow - 10 : 0;
        }
        
        //Per ogni id contenuto nell'array eseguo ulteriori fetch per avere la descrizione dettagliata
        const detailsPromises = this.arrayNewsIds.map(async id => {
            const details = await this.fetchDetails(id);
            const imageUrl = await this.fetchRandomImage();
            return { ...details, imageUrl };
        });
        const detailsArray = await Promise.all(detailsPromises);
        //Stampa a video dei risultati ottenuti
        this.displayAccordionResults(detailsArray);
    }

    async fetchDetails(id){
        //Recupero le info dal singolo id
        const response = await fetch(process.env.URL_HACKER_NEWS_API+`item/${id}.json`);
        const data = await response.json();
        this.arrayNews.push(data);
        return data;
    }

    async fetchRandomImage() {
        //Assegno una immagine randomica per ogni info
        const response = await axios.get(process.env.URL_PICSUM_API);
        return response.request.responseURL;
    }

    async displayResults(results) {
        this.resultsContainerElement.innerHTML = '';
        results.forEach(result => {
            const card = document.createElement('div');
            card.className = "col-md-4";
            card.innerHTML = `
                    <div class="card">
                        <img src="${result.imageUrl}" class="card-img-top" alt="Card Image">
                        <div class="card-body">
                            <h5 class="card-title">${result.title ?? 'N/A'}</h5>
                            <p class="card-text">Author: ${result.by ?? 'N/A'}</p>
                            <p class="card-text">Date: ${result.time ? new Date(result.time * 1000).toLocaleString() : 'N/A' }</p>
                            <p class="card-text">Score: ${result.score ??'N/A'}</p>
                            <p class="card-text">Id: ${result.id ?? 'N/A'}</p>
                            <a href="${result.url ?? '#'}" class="btn btn-primary" target="_blank">See more</a>
                        </div>
                    </div>
            `;
            this.resultsContainerElement.appendChild(card);
        });
    }

    async displayAccordionResults(results) {
        this.resultsContainerElement.innerHTML = '';
        const accordion = document.createElement('div');
        accordion.id = 'accordionExample';
        accordion.className = "col-md-12";

        this.resultsContainerElement.appendChild(accordion);
        results.forEach(result => {
            
            const card = document.createElement('div');
            card.className = "card";
            card.innerHTML = `
                    <div class="card-header" id="heading${result.id}">
                        <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${result.id}" aria-expanded="true" aria-controls="collapse${result.id}">
                            ${result.title ?? 'Senza titolo'}
                        </button>
                        </h2>
                    </div>
                    <div id="collapse${result.id}" class="collapse" aria-labelledby="heading${result.id}" data-parent="#accordionExample">
                        <div class="card-body">
                            <img src="${result.imageUrl}" alt="Immagine ${result.title}" class="img-fluid">
                            <h5 class="my-5 text-primary">${result.title ?? 'N/A'}</h5>
                            <p><strong class="text-primary">Author:</strong> ${result.by ?? 'N/A'}</p>
                            <p><strong class="text-primary">Date:</strong> ${result.time ? new Date(result.time * 1000).toLocaleString() : 'N/A' }</p>
                            <p><strong class="text-primary">Score:</strong> ${result.score ??'N/A'}</p>
                            <p><strong class="text-primary">Id:</strong> ${result.id ?? 'N/A'}</p>
                            <a href="${result.url ?? '#'}" class="btn btn-primary" target="_blank">See more</a>
                        </div>
                    </div>
                `;
            accordion.appendChild(card);
        });
    }

}
export {Loader, generateJoke};