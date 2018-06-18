var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      var queryStr = 'SELECT * from messages';
      db.query(queryStr, function(err, rows) {
        // console.log(rows);
        cb(err, rows);
      });
    }, // a function which produces all the messages

    post: function (queryStr, param, cb) {
      db.query(queryStr, param, function(err, rows) {
        cb(err, rows);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {

    },
    post: function () {

    }
  }
};

