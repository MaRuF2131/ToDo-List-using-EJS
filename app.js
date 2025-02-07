const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
var item="";
var day="";
app.get('/', (req, res) => {
  var today = new Date(); 
  const customOptions = { weekday: "long", month: "short", day: "2-digit", year: "numeric" };
  day=today.toLocaleDateString("en-US", customOptions);  // Example: "Friday, Feb 07, 2025"
  res.render("list.ejs", {kindOfDay:day , newListItem:item});
});

app.post('/', (req, res) => {
  item=req.body.todo;
  res.render("list.ejs", {kindOfDay:day , newListItem:item});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});