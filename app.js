const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
var item="";
var day="";
var today = new Date(); 
  const customOptions = { weekday: "long", month: "short", day: "2-digit", year: "numeric" };
  day=today.toLocaleDateString("en-US", customOptions);  // Example: "Friday, Feb 07, 2025"
let items = ["Buy Food", "Cook Food", "Eat Food"];

app.get('/', (req, res) => {
  res.render("list.ejs", {kindOfDay:day , newListItem:items});
});

app.post('/', (req, res) => {
  if(!(items.some((element) => element === req.body.todo))){
     items.push(req.body.todo);
  }
  res.render("list.ejs", {kindOfDay:day , newListItem:items});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});