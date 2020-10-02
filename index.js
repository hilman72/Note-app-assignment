const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const note = require("./note.json");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({ defaultLayout: "index" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/files", require("./routers/files"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.get("/", function (req, res) {
  res.render("body", {
    note,
  });
});

app.get("/edit/:id", function (req, res) {
  const realId = req.params.id;

  let EditItem = note.filter((EditItem) => {
    return EditItem.id == realId;
  })[0];

  const index = note.indexOf(EditItem);

  let detail = note[index];

  res.render("edit", {
    detail,
  });
});

app.listen(8000, function () {
  console.log("fixx you");
});