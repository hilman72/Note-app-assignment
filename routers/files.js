const express = require("express");
const router = express.Router();
const note = require("../note.json");
const fs = require("fs");

//get
router.get("/", (req, res) => res.json(note));

//post
router.post("/post", (req, res) => {
  let x = note.length;

  let noteData = {
    id: `${x + 1}`,
    title: req.body.title,
    message: req.body.message,
  };

  note.push(noteData);

  fs.writeFileSync("note.json", JSON.stringify(note));

  res.redirect("back");
});

//put
router.post("/put/:id", async (req, res) => {
  const realId = await req.params.id;
  console.log(realId);

  let editItem = note.filter((editItem) => {
    return editItem.id == realId;
  })[0];

  const index = note.indexOf(editItem);

  note[index].title = req.body.title;
  note[index].message = req.body.message;

  fs.writeFileSync("note.json", JSON.stringify(note));

  res.redirect("/");
});

//delete
router.post("/delete/:id", async (req, res) => {
  const realId = await req.params.id;
  console.log(realId);

  let deleteItem = note.filter((deleteItem) => {
    return deleteItem.id == realId;
  })[0];

  const index = note.indexOf(deleteItem);

  note.splice(index, 1);

  let count = 0;
  let newNoteArr = [];
  let newNote = {};
  for (let i = 0; i < note.length; i++) {
    newNote = {
      id: count + 1,
      title: note[i].title,
      message: note[i].message,
    };
    count++;
    newNoteArr.push(newNote);
  }

  fs.writeFile("note.json", JSON.stringify(newNoteArr), "utf-8", function (
    err
  ) {
    if (err) throw err;
  });

  res.redirect("back");
});

module.exports = router;
