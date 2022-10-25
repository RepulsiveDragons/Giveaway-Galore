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
    height:350px;
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
        <div class="content pt-2 has-text-centered">
            <span id="likes">???</span>
        </div>
    </div>

    <!-- Button -->
    <div class="control has-text-centered">
        <a
            id="link"
            class="button is-primary is-small"
            href="./community.html"
        >
        Go to giveaway
        </a>
    </div>
</div>

`;

class CommunityResultsCard extends HTMLElement {
    static defaultImage = "https://via.placeholder.com/300x300";

    constructor(){
        super();
        this.attachShadow({mode : "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){
        this.shadowRoot.querySelector("#title").innerHTML = this.dataset.title;
        this.shadowRoot.querySelector("#image-main").src = this.dataset.src || DogfinderResultsCard.defaultImage;
        this.shadowRoot.querySelector("#likes").innerHTML = `<b>Likes:</b> ${this.dataset.likes}`;
        this.shadowRoot.querySelector("#link").href = this.dataset.url
    }
}

customElements.define("community-card", CommunityResultsCard);

