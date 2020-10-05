const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const fs = require("fs");
const note = require("./note.json");
const basicAuth = require("express-basic-auth");
const methodOverride = require("method-override");

app.use(
  basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    authorizeAsync: true,
    realm: "My Application",
  })
);

app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({ defaultLayout: "index" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/files", require("./routers/files"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

function myAuthorizer(username, password, callback) {
  // CODE HERE
  let user = fs.readFileSync("user.json", { encoding: "utf-8" });

  let userData = JSON.parse(user);

  let login = userData.users.filter((user) => user.username == username);
  if (login[0].username === username && login[0].password === password) {
    return callback(null, true);
  } else {
    return callback(null, false);
  }
}

app.get("/", function (req, res) {
  res.render("body", {
    note,
  });
});

app.listen(8000, function () {
  console.log("fixx you");
});
