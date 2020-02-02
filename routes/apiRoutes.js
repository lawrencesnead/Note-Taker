// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var fs = require("fs-extra");
var path = require("path"); 

var notesDB = fs.readFileSync(path.join(__dirname, "../db/db.json"), 'utf8');


function convertData() {
  // This code parses the data into useable form
  let data = JSON.parse(notesDB);
  let newNotes = '';
  data.forEach(note => {
    newNotes += `{"title":"${note.title}","text":"${note.text}","id":"${note.id}"},`;
  });
  console.log(newNotes);
  return newNotes;
};

function checkID(id, id2) {
  return id !== id2;
};


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    //notesDB = fs.readJSONSync(path.join(__dirname, "../db/db.json"), 'utf8');
    res.json(JSON.parse(notesDB));
  });
  

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    let data = JSON.parse(notesDB);
    // This code takes the req and creates a new json obj and adds it to the array
    let newNote = `{"title":"${req.body.title}","text":"${req.body.text}","id":"${data.length}"}]`;
    let tempData = '['+convertData();
    tempData += newNote;
   
    console.log(tempData);
    
    // This code write the new data file over the old one
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), tempData);
    notesDB = fs.readFileSync(path.join(__dirname, "../db/db.json"), 'utf8');
    res.json(tempData);
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    notesDB.length = 0;
    res.json({ ok: true });
  });
  // API DELETE Requests
  // Below code handles when a user submits a note id they want deleted.
  // It will then be parsed out of the notesDB.json file and removed.  
  app.delete("/api/notes/:id", function(req, res) {
    let temp = JSON.parse(notesDB);
    let temp2 = temp.filter(data => data.id !== req.params.id);
    // temp = "["+temp+
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(temp2));
    notesDB = fs.readFileSync(path.join(__dirname, "../db/db.json"), 'utf8');
    console.log(temp2)
    res.json(temp2);
  });


};
