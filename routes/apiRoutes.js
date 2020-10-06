var db = require("../db/db.json");
var fs = require("fs");
const shortid = require('shortid');
var path = require("path");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(db);
  });

  app.post("/api/notes", function (req, res) {
    var newNote = {
        title: req.body.title,
        text: req.body.text,
        id: shortid.generate()
    };
    db.push(newNote);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(db))
    res.json(db);
  });

  app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    db = db.filter((note) => {
        return note.id !== id
    });
    console.log(db);

    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(db), function(err) {
        if (err) throw err;
        console.log(res);
        return res.sendStatus(200);
    });
    
  });
};
