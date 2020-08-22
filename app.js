const express = require("express");
const app = express();
const expbs = require("express-handlebars");

const DataStore = require("nedb");

let database = new DataStore({filename : "database.db"});
database.loadDatabase();

//database.insert({deneme : "baris_ayyildiz"}, () => console.log("database insert..."))

let db = [

{title : "Deneme metni", text : "asdqwdasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwasdqwdqwdawdqwqwdawdqw"},
{"title":"Başlık","text":"Deneme"}

];


app.listen(3000, () => console.log("listening port number 3000..."));

//console.log(database);

app.use(express.static('./views/'));
app.use(express.json({limit : "1mb"}));


app.engine('handlebars', expbs());
app.set('view engine', 'handlebars');

// Dynamic page that shows all the blog posts

app.get("/", (req, res) => {

	let obj = {name : "baris", surname : "ayyildiz", blogs : db};

	console.log(db[0].title);
	
	res.render('index', obj);

	console.log(obj);


	//console.log(array);	

	//console.log(getDataBase(database));


	//res.send(database.find({}, (err, docs) => JSON.stringify(docs));

})


// Get the blog post and save it to the database
app.post("/submit", (req, res) => {
	
	console.log("request taken...");

	/*
	//console.log(req.body);
	database.insert({title : req.body.title, text : req.body.text});

	database.find({}, (err, docs) => {

		//database içerisindeki tüm veriyi client-side'a yolla
		//console.log(docs);
		res.json(docs);
		res.end();
	})

	*/

	db.push({title : req.body.title, text : req.body.text});
	req.json(db);
	res.end();


});

