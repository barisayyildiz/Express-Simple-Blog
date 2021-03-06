const express = require("express");
const app = express();
const expbs = require("express-handlebars");
const mongoose = require("mongoose");
const methodOverride = require('method-override')

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/blog");

const schema = mongoose.Schema(
{
	title : String,
	text : String,
	date : String,
	dateMil : Number
});


const posts = mongoose.model('posts', schema, 'posts');

let portNumber = process.env.PORT || 3000;
app.listen(portNumber, () => console.log(`Listening the port number ${portNumber}`));

// Serves static files
app.use(express.static('./views/'));

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
	res.render('index', {blogs : docs});

})


// Get the blog post and save it to the database
app.post("/submit", (req, res) => {

	// Get the current date
	let date = new Date();

	// Generates DD/MM/YYYY format
	let string = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

	posts.create(
	{
		title : req.body.title,
		text : req.body.text,
		date : string,
		dateMil : Date.now()
	})

});

// Displaying posts
app.get("/posts/:id", async (req, res) => {

	let post = await posts.findById(req.params.id).lean();
	res.render("singlePost", {
		layout : 'posts.handlebars',
		post : post
	});

})



app.delete("/delete/:id", (req, res) => {

	posts.deleteOne({_id : req.params.id}, (err ,docs) => {
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
