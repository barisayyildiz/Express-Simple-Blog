const express = require("express");
const app = express();

const DataStore = require("nedb");

let database = new DataStore({filename : "database.db"});
database.loadDatabase();

//database.insert({deneme : "baris_ayyildiz"}, () => console.log("database insert..."))


app.listen(3000, () => console.log("listening port number 3000..."));

//console.log(database);

app.use(express.static('./public/'));
app.use(express.json({limit : "1mb"}));


app.post("/submit", (req, res) => {
	
	console.log("request taken...");

	console.log(req.body);
	database.insert({title : req.body.title, text : req.body.text});

	database.find({}, (err, docs) => {

		//database içerisindeki tüm veriyi client-side'a yolla
		console.log(docs);
		res.json(docs);
		res.end();
	})


});

