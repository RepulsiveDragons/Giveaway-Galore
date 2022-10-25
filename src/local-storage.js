//store all the data into one object
const defaultData = {
    "favorites": [], //list of stored favorites
    "results": [], //list of stored results from the search
    "controls": ["all","all","date"] //the parameters for the search fields
},
  storeName = "js9452-p1-settings";
  
  //read the data from the object
  const readLocalStorage = () => {
    let allValues = null;
  
    try{
      allValues = JSON.parse(localStorage.getItem(storeName)) || defaultData;
    }catch(err){
      console.log(`Problem with JSON.parse() and ${storeName} !`);
      throw err;
    }
  
    return allValues;
  };
  
  //write data to the object
  const writeLocalStorage = (allValues) => {
    localStorage.setItem(storeName, JSON.stringify(allValues));
  };
  
  //clears local storage
  export const clearLocalStorage = () => writeLocalStorage(defaultData);

  //add data into the results property
  export const addToLocalStorage = (array) => {
    const allValues = readLocalStorage();
  
    allValues.results = array;
    writeLocalStorage(allValues);
  }

  export const getLocalStorage = () => readLocalStorage().results;

  //save the search fields parameters into the controls property
  export const setControls = (index, value) => {
    const allValues = readLocalStorage();
    allValues.controls[index] = value;
    writeLocalStorage(allValues); 
  }

  export const getControls = () => readLocalStorage().controls;

  //clear the results property
  export const clearResults = () => {
    const allValues = readLocalStorage();
  
    allValues.results = [];
    writeLocalStorage(allValues);
  };
  
  //add the data into the favorites property
  export const addFavorite = (str) => {
    const allValues = readLocalStorage();
  
    allValues.favorites.push(str);
    writeLocalStorage(allValues);
  };
  
  export const getFavorites = () => readLocalStorage().favorites;

  //remove the specific giveaway from the favorites
  export const removeFavorite = (obj) => {
    const allValues = readLocalStorage();
    const newValues = allValues.favorites.filter(favorite => favorite.title !== obj.title);
    allValues.favorites = newValues;
    writeLocalStorage(allValues);
  }
  
  //clear the favorites property
  export const clearFavorites = () => {
    const allValues = readLocalStorage();
  
    allValues.favorites = [];
    writeLocalStorage(allValues);
  };