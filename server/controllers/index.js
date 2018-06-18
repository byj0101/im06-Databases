var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(err, rows) {
        console.log(rows);
        res.send(rows);           
      });
    
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var { username, text, roomname} = req.body;
      console.log(req.body);
      var created = new Date();
      var param = [username, text, roomname, created];
      var queryStr = 'INSERT INTO messages(username, text, roomname, created) VALUES (?,?,?,?)';
      models.messages.post(queryStr, param, function(err, rows) {
        console.log(11);
        if (err) { throw err; } else { res.end(); }
      });
    } 
  }, // a function which handles posting a message to the databas

  users: {
    // Ditto as above
    get: function (req, res) {

    },
    post: function (req, res) {

    }
  }
};

