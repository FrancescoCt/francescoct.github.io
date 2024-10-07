class Counter {
    constructor(initialValue = 0) {

        this.value = initialValue;
        this.peekabooValue = 5;

        this.createCounterDiv();

        this.counterLabel = document.getElementById('counter');
        this.monkey1 = document.getElementById('monkey1');
        this.monkey2 = document.getElementById('monkey2');

        //Assegnazione eventListeners
        document.getElementById('increment').addEventListener('click', () => {
            this.increment();
            this.counterLabel.textContent = this.getValue();
            this.updateEmoticons();
        });
        
        document.getElementById('decrement').addEventListener('click', () => {
            this.decrement();
            this.counterLabel.textContent = counter.getValue();
            this.updateEmoticons();
        });
        
        // Inizializzazione visibilità
        this.updateEmoticons();
        
    }

    increment() {
        this.value++;
    }

    decrement() {
        if(this.value > 0){
           this.value--; 
        }
    }

    getValue() {
        return this.value;
    }

    updateEmoticons() {
        if (this.getValue() > this.peekabooValue) {
            this.monkey1.classList.remove('visible');
            this.monkey2.classList.add('visible');
        } else {
            this.monkey1.classList.add('visible');
            this.monkey2.classList.remove('visible');
        }
    }

    createCounterDiv(){
        // Creazione dinamica contatore
        var emoticonDiv = document.createElement("div");
        emoticonDiv.classList.add("container")
        emoticonDiv.classList.add("text-center")
        emoticonDiv.classList.add("my-5")

        emoticonDiv.innerHTML = '<!-- Emoticon JS-->'
        +    '<div class="row">'
        +        '<div class="col">'
        +            '<div id="monkey1" class="emoticon">🙈</div>'
        +            '<div id="monkey2" class="emoticon">🙉</div>'
        +        '</div>'
        +    '</div>'
        +    '<div class="row"></div>'
        +        '<div class="col">'
        +            '<p>Fai aprire gli occhi alla scimmia!</p>'
        +        '</div>'
        +    '</div>'
        +'<!-- Contatore JS -->'
        +'<div class="container text-center mt-2 mb-5">'
        +    '<div class="row">'
        +        '<div class="col">'
        +            '<button id="decrement" type="button" class="btn bg-white btn-outline-danger">'
        +                '<img src="assets/svg/minus.svg" type="image/x-icon" alt="Subtract number">'
        +            '</button>'
        +            '<label id="counter" class="counter">0</label>'
        +            '<button id="increment" type="button" class="btn bg-white btn-outline-success">'
        +                '<img class="icon" src="assets/svg/add.svg" type="image/x-icon" alt="Add number">'
        +            '</button>'
        +        '</div>'
        +    '</div>'
        +'</div>';

        // Inserimento dell'elemento nel body
        document.getElementById('titolo').insertAdjacentElement('afterend', emoticonDiv);
    }


}

class ThemeToggle{
    constructor(){
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme');
        });
    }
}

class PageCreator{
    constructor(){        
        // Aggiunta di contenuto all'elemento
        document.body.innerHTML = "<!-- Navbar -->"
        +'<nav class="navbar navbar-expand-lg navbar-dark bg-info">'
        +'<a class="navbar-brand" href="https://francescoct.github.io/">Francesco Catania</a>'
        +'<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">'
        +'<span class="navbar-toggler-icon"></span>'    
        +'</button>'
        +'<div class="collapse navbar-collapse" id="navbarNav">'
        +    '<ul class="navbar-nav">'
        +        '<li class="nav-item active">'
        +            '<a class="nav-link" href="#">Counter JS <span class="sr-only">(current)</span></a>'
        +        '</li>'
        +        '<li class="nav-item">'
        +            '<a class="nav-link" href="https://francescoct.github.io/portfolio/">Portfolio</a>'
        +        '</li>'
        +    '</ul>'
        +    '<button id="theme-toggle" class="btn btn-warning ml-auto">Change Theme</button>'
        +'</div>'
    +'</nav>'
    +'<!-- Emoticon -->'
    +'<div class="container text-center mt-5">'
    +    '<div class="row">'
    +        '<div class="col">'
    +            '<h1>Counter JS</h1>'
    +        '</div>'
    +    '</div>'
    +'</div>'
    +'<!-- Emoticon -->'
    +'<div class="container text-center my-5">'
    +    '<div class="row">'
    +        '<div class="col">'
    +            '<div id="monkey1" class="emoticon">🙈</div>'
    +            '<div id="monkey2" class="emoticon">🙉</div>'
    +        '</div>'
    +    '</div>'
    +    '<div class="row"></div>'
    +        '<div class="col">'
    +            '<p>Fai aprire gli occhi alla scimmia!</p>'
    +        '</div>'
    +    '</div>'
    +'</div>'
    +'<!-- Contatore -->'
    +'<div class="container text-center mt-2 mb-5">'
    +    '<div class="row">'
    +        '<div class="col">'
    +            '<button id="decrement" type="button" class="btn bg-white btn-outline-danger">'
    +                '<img src="assets/svg/minus.svg" type="image/x-icon" alt="Subtract number">'
    +            '</button>'
    +            '<label id="counter" class="counter">0</label>'
    +            '<button id="increment" type="button" class="btn bg-white btn-outline-success">'
    +                '<img class="icon" src="assets/svg/add.svg" type="image/x-icon" alt="Add number">'
    +            '</button>'
    +        '</div>'
    +    '</div>'
    +'</div>'
    +'<!-- Contatore -->'
    +'<div class="container text-center mt-2 mb-5">'
    +    '<div class="row">'
    +        '<div class="col">'
    +            '<a href="https://github.com/FrancescoCt/CounterJS" target="_blank" class="btn btn-info">View Readme</a>'
    +        '</div>'
    +    '</div>'
    +'</div>'
    +'<!-- Footer -->'
    +'<footer class="bg-info text-center text-lg-start mt-auto">'
    +    '<div class="container p-4">'
    +        '<p class="text-center text-white">© 2024 Counter JS</p>'
    +    '</div>'
    +'</footer>';
    }
}
const counter = new Counter();
const themeToggle = new ThemeToggle();

