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
// Ana sayfa
app.get("/", (req, res) => {

	database.find({}, (err, docs) => {

		docs = sortByDateTime(docs);

		console.log(docs);

		res.render('index', {blogs : docs});
		//res.json({blogs : docs});
	})

})


// Get the blog post and save it to the database
app.post("/submit", (req, res) => {
	
	console.log("request taken...");

	//get the current date
	let date = new Date();
	let string = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

	database.insert({title : req.body.title, text : req.body.text, date : string, dateMil : Date.now()});

	res.redirect();
	//console.log("12323");

	/*
	database.find({}, (err, docs) => {

		//database içerisindeki tüm veriyi client-side'a yolla
		//console.log(docs);
		res.json(docs);
		res.end();
	})
	*/


});

function sortByDateTime(database)
{
	let temp;
	for(let i=0; i<database.length; i++)
	{
		for(let j=i+1; j<database.length; j++)
		{
			if(database[i].dateMil < database[j].dateMil)
			{
				temp = database[i];
				database[i] = database[j];
				database[j] = temp;
			}
		}
	}

	return database;
}
