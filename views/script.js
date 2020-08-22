
document.querySelector("#btn").addEventListener("click", (event) => {

	fetch("/submit", {
		method : "POST"
	})
	.then(response => response.json())
	.then(console.log(response));

})

function addItem()
{
	let list = document.getElementById("list");

	let newItem = document.createElement("li");

	newItem.innerText = "lorem ipsum";

	list.appendChild(newItem);
}
