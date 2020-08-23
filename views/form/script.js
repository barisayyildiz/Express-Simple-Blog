document.getElementById("submit").addEventListener("click", event => {

	let data = {};
	data.title = document.getElementById("title").value;
	data.text = document.getElementById("text").value;

	// Make a POST request
	fetch("/submit", {

		method: "POST",
		headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
	});

})
