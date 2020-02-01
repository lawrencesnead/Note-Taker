// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var notesDB = require("../db/db.json");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
      res.json(notesDB);
  });
  

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {

      notesDB.push(req.body);
      res.json(notesDB);
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
  app.delete("/api/notes:id", function(req, res) {
      let id = req.body;

      res.json(waitListData);
  });
};
