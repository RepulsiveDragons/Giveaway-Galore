const template = document.createElement("template");

template.innerHTML = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
#image-main{
    border:1px solid black;
    background-color:white;
    box-shadow: 1px 1px 2px #333;
    width:300px;
}
#title::first-letter {
    text-transform:capitalize;
}
.card{
    height:700px;
    overflow: auto;
    border:1px solid black;
    box-shadow: 3px 3px 5px #000000;
}
</style>
<div class="card">
    <div class="card-header-title is-size-6 ml-2 py-1">
        <span id="title">???</span>
    </div>

    <!-- Card image and text -->
    <div class="card-content">
        <div class="card-image">
            <figure class="image">
                <img id="image-main" src="https://bulma.io/images/placeholders/1280x960.png" alt="thumbnail">
            </figure>
        </div>
        <div class="content pt-2">
            <span id="description">description</span><br>
            <span id="platforms">platform</span><br>
            <span id="type">type:</span><br>
            <span id="users">users:xxx</span><br>
            <span id="worth">worth:$xxx</span><br>
            <span id="status">actve</span><br>
            <span id="end-date">2022</span><br>
            <span id="url">link</span>
        </div>
    </div>

    <!-- Favorite Button -->
    <div class="control has-text-centered mb-1">
        <button
            id="btn-favorite"
            class="button is-primary is-small"
            title="Favorite this giveaway"
        >
            ???
        </button>
    </div>
</div>

`;

class GiveawayResultsCard extends HTMLElement {
    static defaultImage = "https://via.placeholder.com/300x300";

    constructor(){
        super();
        this.attachShadow({mode : "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){
        //set attributes for this card
        this.shadowRoot.querySelector("#title").innerHTML = this.dataset.title;
        this.shadowRoot.querySelector("#image-main").src = this.dataset.src || DogfinderResultsCard.defaultImage;
        this.shadowRoot.querySelector("#description").innerHTML = `<b>Description:</b> ${this.dataset.description}`;
        this.shadowRoot.querySelector("#platforms").innerHTML = `<b>Platforms:</b> ${this.dataset.platforms}`;
        this.shadowRoot.querySelector("#type").innerHTML = `<b>Type:</b> ${this.dataset.type}`;
        this.shadowRoot.querySelector("#users").innerHTML = `<b>Users:</b> ${this.dataset.users}`;
        this.shadowRoot.querySelector("#worth").innerHTML = `<b>Worth:</b> ${this.dataset.worth}`;
        this.shadowRoot.querySelector("#status").innerHTML = `<b>Status:</b> ${this.dataset.status}`;
        this.shadowRoot.querySelector("#end-date").innerHTML = `<b>End Date:</b> ${this.dataset.endDate}`;
        this.shadowRoot.querySelector("#url").innerHTML = `<a href="${this.dataset.url}">Go To Giveaway</a>`


        this.btnFavorite = this.shadowRoot.querySelector("#btn-favorite");
        this.btnFavorite.innerHTML = this.dataset.favorite || "Favorite";
        this.callback = this.callback || ((obj) => console.log(`${obj.title}, ${obj.src}`));
        

        this.btnFavorite.onclick = (evt) => {
            //build a new object to pass to the callback function
            const dataObj = {
                "title": this.dataset.title,
                "src": this.dataset.src,
                "platform": this.dataset.platforms,
                "type": this.dataset.type,
                "endDate": this.dataset.endDate,
                "url": this.dataset.url,
                "id": this.dataset.id
            };
            this.callback(dataObj);
            this.disableFavoriteButton();
        };

        if(this.dataset.isDisabled === "true")
        {
            this.disableFavoriteButton();
        }
    }

    disconnectedCallback(){
        this.btnFavorite.onclick = null;
    }

    //disable the button when the favorite button is clicked
    disableFavoriteButton = () => {
        this.btnFavorite.innerHTML = "Favorited";
        this.btnFavorite.disabled = true;
        this.btnFavorite.classList.remove("is-primary");
        this.btnFavorite.classList.add("is-warning");
    }
}

customElements.define("app-resultcard", GiveawayResultsCard);

