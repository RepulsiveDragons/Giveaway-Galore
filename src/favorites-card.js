const template = document.createElement("template");

template.innerHTML = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
#image-main{
    border:1px solid black;
    background-color:white;
    padding:7px;
    box-shadow: 1px 1px 2px #333;
    margin:.1rem;
    width:300px;
}
#title::first-letter {
    text-transform:capitalize;
}
.card{
    height:500px;
    overflow: auto;
}
</style>
<div class="card">
    <div class="card-header-title is-size-6">
        <span id="title">???</span>
    </div>

    <!-- Card image and text -->
    <div class="card-content">
        <div class="card-image">
            <figure class="image">
                <img id="image-main" src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
        </div>
        <div class="content pt-2">
            <span id="platforms">platform</span><br>
            <span id="type">type:</span><br>
            <span id="end-date">2022</span><br>
            <span id="url">link</span>
        </div>
    </div>

    <!-- Unfavorite Button -->
    <div class="control has-text-centered">
        <button
            id="btn-unfavorite"
            class="button is-danger is-small"
            title="Unfavorite this giveaway"
        >
            Remove
        </button>
    </div>
</div>

`;

class FavoriteResultsCard extends HTMLElement {
    static defaultImage = "https://via.placeholder.com/300x300";

    constructor(){
        super();
        this.attachShadow({mode : "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){
        this.shadowRoot.querySelector("#title").innerHTML = this.dataset.title;
        this.shadowRoot.querySelector("#image-main").src = this.dataset.src || DogfinderResultsCard.defaultImage;
        this.shadowRoot.querySelector("#platforms").innerHTML = `<b>Platforms:</b> ${this.dataset.platforms}`;
        this.shadowRoot.querySelector("#type").innerHTML = `<b>Type:</b> ${this.dataset.type}`;
        this.shadowRoot.querySelector("#end-date").innerHTML = `<b>End Date:</b> ${this.dataset.endDate}`;
        this.shadowRoot.querySelector("#url").innerHTML = `<a href="${this.dataset.url}">Go To Giveaway</a>`;

        this.btnUnfavorite = this.shadowRoot.querySelector("#btn-unfavorite");
        this.btnUnfavorite.innerHTML = this.dataset.favorite || "Favorite Me!";
        this.callback = this.callback || ((obj) => console.log(`${obj.title}, ${obj.src}`));
        this.btnUnfavorite.onclick = (evt) => {
            const dataObj = {
                "title": this.dataset.title
            }
            this.callback(dataObj);
        };
    }

    disconnectedCallback(){
        this.btnUnfavorite.onclick = null;
    }
}

customElements.define("favorites-card", FavoriteResultsCard);

