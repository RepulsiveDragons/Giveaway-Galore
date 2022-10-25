import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, push, onValue, increment } from  "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
//import { createResultsCards, getArrayOfGiveaways } from "./community.js";

//my firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAucnfFJWgYNag8vGnLGmpeQVaI5HLCRGg",
    authDomain: "giveaway-finder.firebaseapp.com",
    projectId: "giveaway-finder",
    storageBucket: "giveaway-finder.appspot.com",
    messagingSenderId: "38438276357",
    appId: "1:38438276357:web:cfe4d65418f77a9d1f7b6c"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const favoritesRef = ref(db, 'favorites/');

const arrayOfGiveaways = [];
const likedGiveawaysPath = "favorites/";
const elementCardHolder = document.querySelector("#element-card-holder-community");

//sets new data into the database
//if the data already exists on the database 
//then increment its like counter by one instead
const pushLikedGiveawayToCloud = obj => {
  obj.likes = increment(1);
  const db = getDatabase();
  const favRef = ref(db, `${likedGiveawaysPath}${obj.id}`);
  set(favRef, obj); 
};

//Called from onValue everytime the data has changed in the database
//gets the key and values from the database and send it to community.js
//to display it on the community page
const favoritesChanged = (snapshot) => {
    snapshot.forEach(fav => {
      const childKey = fav.key;
      const childData = fav.val();
      if(!arrayOfGiveaways.includes(childData))
      {
        arrayOfGiveaways.push(childData);
      }

    });
    createResultsCards(arrayOfGiveaways)
};

//create a card componenet for each giveaway on from firebase
const createResultsCards = (arrayOfGiveaways) => {


  elementCardHolder.innerHTML = "";
  for(let obj of arrayOfGiveaways){
      const title = obj.title;
      const image = obj.src;
      const url = obj.url;
      const likes = obj.likes;
      const newCard = document.createElement("community-card");
      newCard.dataset.title = title;
      newCard.dataset.src = image;
      newCard.dataset.likes = likes;
      newCard.dataset.url = url;

      elementCardHolder.appendChild(newCard);
  }
}


export {likedGiveawaysPath,db,ref,set,push,initializeApp,getDatabase,pushLikedGiveawayToCloud,onValue,favoritesChanged,favoritesRef};
//export {db,likedGiveawaysPath,ref,set,push,pushLikedGiveawayToCloud,onValue, createResultsCards};