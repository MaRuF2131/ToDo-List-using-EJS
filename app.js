const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const port = process.env.PORT || 3000;
var item="";
var day="";
var today = new Date(); 
  const customOptions = { weekday: "long", month: "short", day: "2-digit", year: "numeric" };
  day=today.toLocaleDateString("en-US", customOptions);  // Example: "Friday, Feb 07, 2025"
let items = [];
let workItems = [];

const stringCleaner = (req,res,next) => {  //this special middleware is to clean the string from extra spaces
  if (req.body.todo) {
      if (typeof req.body.todo === 'string') {
        req.body.todo = req.body.todo.replace(/\s+/g, ' ').trim();
      }
    }
  next();
};

// this is all route Middleware to remove extra spaces from request body strings
/* app.use((req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        // Remove leading, trailing, and multiple spaces
        req.body[key] = req.body[key].replace(/\s+/g, ' ').trim();
      }
    }
  }
  next();
}); */

app.get('/', (req, res) => {
    res.render("list.ejs", {title:day , newListItem:items});
});

app.get('/work', (req, res) => {
  res.render("list.ejs",{title:"Work List", newListItem:workItems});
});



app.post('/', stringCleaner, (req, res) => {
/*   if(!(items.some((element) => element === req.body.todo))){ //this is to avoid adding duplicate items when
       is use this res.render("list.ejs", {kindOfDay:day , newListItem:items}); instead of res.redirect("/");
     items.push(req.body.todo);
  } */
 if(req.body.list==='Work List'){
      if(req.body.todo!=='') workItems.push(req.body.todo);
      res.redirect("/work");
  }else{
      if(req.body.todo!=='') workItems.push(req.body.todo);
       res.redirect("/");
       /*   res.render("list.ejs", {kindOfDay:day , newListItem:items}); */
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});