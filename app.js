const express = require("express");
const app = express();
const expbs = require("express-handlebars");

const DataStore = require("nedb");

let database = new DataStore({filename : "database.db"});
database.loadDatabase();

//database.insert({deneme : "baris_ayyildiz"}, () => console.log("database insert..."))


app.listen(3000, () => console.log("listening port number 3000..."));

//console.log(database);

app.use(express.static('./views/'));
app.use(express.json({limit : "1mb"}));


app.engine('handlebars', expbs());
app.set('view engine', 'handlebars');

// Dynamic page that shows all the blog posts

app.get("/", async (req, res) => {

	let obj = {name : "baris", surname : "ayyildiz"};

	database.find({}, (err, docs) => {
		obj.blogs = docs;
	})
	
	res.render('index', obj);

	console.log(obj);


	//console.log(array);	

	//console.log(getDataBase(database));


	//res.send(database.find({}, (err, docs) => JSON.stringify(docs));

})

async function getDataBase(database)
{
	let array = [];

	database.find({}, (err ,docs) => {
		docs.forEach(element => array.push(element));
		return array;
	});


}


// Get the blog post and save it to the database
app.post("/submit", (req, res) => {
	
	console.log("request taken...");

	//console.log(req.body);
	database.insert({title : req.body.title, text : req.body.text});

	database.find({}, (err, docs) => {

		//database içerisindeki tüm veriyi client-side'a yolla
		//console.log(docs);
		res.json(docs);
		res.end();
	})


});

