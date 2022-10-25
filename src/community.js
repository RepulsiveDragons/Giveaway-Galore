import * as cloud from "./firebase.js";

cloud.onValue(cloud.favoritesRef,cloud.favoritesChanged);


