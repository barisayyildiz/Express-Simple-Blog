document.getElementById("submit").addEventListener("click", event => {

	/*
	let data = document.getElementById("text").value;
	console.log(document.getElementById("text").value, document.getElementById("title").value);
	*/

	let data = {};
	data.title = document.getElementById("title").value;
	data.text = document.getElementById("text").value;

	console.log(data);

	//submit the post and return to the home page...

	fetch("/submit", {

		method: "POST",
		headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data)
	
	})
	.then(response => response.json())
	.then(data => {
		window.open("../", "_self");
	})

	/*
	.then(response => {

		window.open("../", "_self");
		console.log("asd");

	})*/


})

/*
	.then(response => response.json())
	.then(data => {

		//console.log(data);
		window.data = data;

		window.


	});


})


*/