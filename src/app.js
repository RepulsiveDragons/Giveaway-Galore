import {loadJsonFetch} from "./ajax.js";
import { pushLikedGiveawayToCloud } from "./firebase.js";
import * as storage from "./local-storage.js";


let baseUrl = "https://gamerpower.p.rapidapi.com/api/giveaways";
let platformUrl = "";
let typeURL = "";
let endURL = "";
let sortURL = "&sort-by=date";
let allGiveaways = [];
let localStorage = storage.getLocalStorage();
let setControls = storage.getControls();


let btnSearch = document.querySelector("#btn-search");
let btnClear = document.querySelector("#btn-clear-all");
let elementStatus = document.querySelector("#element-status");
let elementCardHolder = document.querySelector("#element-card-holder");
let fieldPlatform = document.querySelector("#field-platform");
let fieldType = document.querySelector("#field-type");
let fieldSort = document.querySelector("#field-sort");


//formulate the correct url to fetch
function buildURL(){

    endURL = baseUrl + platformUrl + typeURL + sortURL;
    if(endURL.includes('&'))
    {
        let newURL = endURL.replace('&','?');   
        endURL = newURL;   
    }

}

//Each of these changes the url to the correct paramater when 
//the user changes the search field and also save it 
//in local storage
fieldPlatform.onchange = e => {
    if(e.target.value === "all")
    {
        platformUrl = "";
    }
    else
    {
        platformUrl = "&platform=" + e.target.value;
    }
    storage.setControls("0",e.target.value);
}

fieldType.onchange = e => {
    if(e.target.value === "all")
    {
        typeURL = "";
    }
    else
    {
        typeURL = "&type=" + e.target.value;
    }
    storage.setControls("1",e.target.value);
}

fieldSort.onchange = e => {
    sortURL = "&sort-by=" + e.target.value;
    storage.setControls(2,e.target.value);
}

btnSearch.onclick = (e) => {
    buildURL();
    //fetch the api
    loadJsonFetch(endURL, showResults);
    e.target.classList.add("is-loading");
}

btnClear.onclick = (e) => {
    elementCardHolder.innerHTML = "";
    elementStatus.innerHTML = "Click the <b>Search</b> button to view giveaways";
    storage.clearResults();
    //storage.clearLocalStorage();
}

//start creating the card elements if the api returns 
//good json
const showResults = (json) => {
    btnSearch.classList.remove("is-loading");
    //json will have a status of 0 when the search parameter 
    //comes back with no results
    if(json.status === 0)
    {
        elementStatus.innerHTML = json.status_message;
        elementCardHolder.innerHTML = "";
        return;
    }
    createResultsCards(json);
}

//Add the giveaway objects to local storage
const addToFavorites = (obj) => {
    storage.addFavorite(obj);
    pushLikedGiveawayToCloud(obj); //push to firebase
};

//Add all the results to local storage
const addToLocalStorage = (results) => {
    if(allGiveaways !== 0)
    {
        storage.addToLocalStorage(results);
    }
}

//Create a card component for each result
const createResultsCards = (array) => {

    allGiveaways.length = 0;
    elementCardHolder.innerHTML = "";
    elementStatus.innerHTML = `${array.length} giveaways were found!`;

    for(let obj of array){
        const title = obj.title;
        const image = obj.thumbnail;
        const description = obj.description;
        const platforms = obj.platforms;
        const type = obj.type;
        const users = obj.users;
        const worth = obj.worth;
        const status = obj.status;
        const endDate = obj.end_date;
        const url = obj.open_giveaway;
        const id = obj.id;
        const newCard = document.createElement("app-resultcard");
        newCard.dataset.title = title;
        newCard.dataset.src = image;
        newCard.dataset.description = description;
        newCard.dataset.platforms = platforms;
        newCard.dataset.type = type;
        newCard.dataset.users = users;
        newCard.dataset.worth = worth;
        newCard.dataset.status = status;
        newCard.dataset.endDate = endDate;
        newCard.dataset.url = url;
        newCard.dataset.id = id;
        newCard.callback = addToFavorites;
        //check to see if the giveaway exists in favorites
        //keep the favorte button disabled if it does exist
        for(const favorite of storage.getFavorites())
        {              
            if(id == favorite.id)
            {
                newCard.dataset.isDisabled = "true";
            }
        }

        elementCardHolder.appendChild(newCard);

        allGiveaways.push(obj);
    }
    addToLocalStorage(allGiveaways);
}

//Called everytime the page loads
//Show the previous ui state
const showLocalStorage = () => {
    if(localStorage !== [])
    {
        createResultsCards(localStorage);
        elementStatus.innerHTML = `Showing ${localStorage.length} results from the previous search`;
    }
    fieldPlatform.querySelector(`option[value='${setControls[0]}']`).selected = true;
    fieldType.querySelector(`option[value='${setControls[1]}']`).selected = true;
    fieldSort.querySelector(`option[value='${setControls[2]}']`).selected = true;
}

showLocalStorage();
