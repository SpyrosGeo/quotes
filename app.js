var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
mongoose.connect("mongodb://localhost/quotes", {
  useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.set('useFindAndModify', false);

var quoteSchema = new mongoose.Schema({
  title: String,
  body: String,
});

var Quote = mongoose.model("quote", quoteSchema);
// Quote.create({
//   title:"first Entry",
//   body: "stupid quote"
// });

app.get("/",function(req, res){
  res.redirect("/quotes");
});
app.get("/quotes",function(req, res) {
Quote.find({},function(err,quotes){
  if (err) {
    console.log('err', err);
  } else {
    res.render("index",{quotes: quotes});
        }
  });
});
//NEW
app.get("/new",function(req,res) {
  res.render("new");
});
//CREATE
app.post("/quotes",function(req, res){
  Quote.create(req.body.quote,function(err,newQuote) {
      if (err) {
        console.log('err', err);
      } else {
        res.redirect("/quotes");

      }
  });
});


app.listen(8080, function() {
  console.log("server is up");
});
