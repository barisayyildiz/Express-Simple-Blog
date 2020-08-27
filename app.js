const express = require("express");
const app = express();
const expbs = require("express-handlebars");
const mongoose = require("mongoose");
var methodOverride = require('method-override')

mongoose.connect("mongodb://localhost/blog");

const schema = mongoose.Schema(
{
	title : String,
	text : String,
	date : String,
	dateMil : Number
});


const posts = mongoose.model('posts', schema);


app.listen(3000, () => console.log("listening port number 3000..."));

// Serves static files
app.use(express.static('./views/'));
app.use(express.json({limit : "1mb"}));

// Method override
app.use(methodOverride('_method'));

//Body Parsing

app.use(express.urlencoded({
    extended : false
}));
app.use(express.json());


// Setting the view engine, express-handlebars
app.engine('handlebars', expbs());
app.set('view engine', 'handlebars');

// Dynamic page that shows all the blog posts
app.get("/", async (req, res) => {

	let docs = await posts.find({}).lean();
	docs = sortByDateTime(docs);
	console.log(docs);
	res.render('index', {blogs : docs});


	/*
	database.find({}, (err, docs) => {

		// Sorts the blog entries by the time
		docs = sortByDateTime(docs);

		res.render('index', {blogs : docs});
	})
	*/

})


// Get the blog post and save it to the database
app.post("/submit", (req, res) => {

	// Get the current date
	let date = new Date();

	// Generates DD/MM/YYYY format
	let string = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

	//database.insert({title : req.body.title, text : req.body.text, date : string, dateMil : Date.now()});


	posts.create(
	{
		title : req.body.title,
		text : req.body.text,
		date : string,
		dateMil : Date.now()
	})

});

app.use((req, res, next) => 
{
	console.log(req.params);
	next();
})

app.delete("/delete/:id", (req, res) => {

	console.log("asd");

	posts.remove({_id : req.params.id}, (err ,docs) => {
		res.redirect("/");
	})

	return;
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
