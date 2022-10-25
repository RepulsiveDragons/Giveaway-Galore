import * as storage from "./local-storage.js";


const btnClear = document.querySelector("#btn-clearFavorites");
let allFavorites = storage.getFavorites();
const elementCardHolder = document.querySelector("#element-card-holder-favorites");
const status = document.querySelector("#element-status-favorites");

//Clears all the favorites from the page and the local storage
btnClear.onclick = () => {
    storage.clearFavorites();
    elementCardHolder.innerHTML ="";
    status.innerHTML = "You have <b>0</b> favorites"
}

//Remove the current favorite from the page
const removeFavorite = (obj) =>{
    storage.removeFavorite(obj);
    allFavorites = storage.getFavorites();
    createResultsCards(allFavorites);
};

const createResultsCards = (array) => {

    elementCardHolder.innerHTML = "";
    status.innerHTML = `You have <b>${array.length}</b> favorites`

    for(let obj of array){
        const title = obj.title;
        const image = obj.src;
        const platforms = obj.platform;
        const type = obj.type;
        const endDate = obj.endDate;
        const url = obj.url;
        const newFavorite = document.createElement("favorites-card");
        newFavorite.dataset.title = title;
        newFavorite.dataset.src = image;
        newFavorite.dataset.platforms = platforms;
        newFavorite.dataset.type = type;
        newFavorite.dataset.endDate = endDate;
        newFavorite.dataset.url = url;
        newFavorite.dataset.favorite = "Unfavorite";
        newFavorite.callback = removeFavorite;

        elementCardHolder.appendChild(newFavorite);
    }
}

createResultsCards(allFavorites);


