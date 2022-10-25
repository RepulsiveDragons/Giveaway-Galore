const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '54e2909cd7msh3549a891b84eaedp1d6e68jsn6fbafa30e90f',
		'X-RapidAPI-Host': 'gamerpower.p.rapidapi.com'
	}
};
	//use fetch to get a promise from the api
	export const loadJsonFetch = (url, callback) => {
	fetch(url, options)
	.then(response => response.json())
	.then(response => { callback(response)
	})
	.catch(err => {
		console.error(err);
		document.querySelector("#element-status").innerHTML = "Something has gone wrong! Please try again later.";
		document.querySelector("#btn-search").classList.remove("is-loading");
	});
	}