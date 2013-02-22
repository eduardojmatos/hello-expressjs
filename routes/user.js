
/*
 * Users Module
 */

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: true });
db = new Db('testdb', server, { safe: true } );

db.open(function(err, db) {

  if (!err) {

    console.log("Connected to 'testdb' database");

    db.collection('users', { safe: true }, function (err, collection) {
      if (err) {
        console.log("The 'textdb' collection doesn't exist. Creating it with sample data...");
      }
      //populateDB();
    });

  }

});

// LIST ALL
exports.list = function(req, res) {

  db.collection('users', function(err, collection) {
    collection.find().toArray(function (err, result) {
      console.log(result);
      res.render('users', { title: "Usuários", users: result });
    });
  });

};

// GET
exports.get = function(req, res) {
  var id = req.params.id;

  console.log('Listing user by id: ' + id);

  db.collection('users', function (err, collection) {
    collection.findOne({ '_id': new BSON.ObjectID(id) }, function (err, item) {
      if (item) {
        console.log('finded!');
        res.send(item);
      } else {
        console.log('not found');
        res.end();
      }
    });
  });
};

// POST
exports.add = function(req, res) {
  var user = req.body;
  console.log('Adding user: ' + JSON.stringify(user));

  db.collection('users', function(err, collection) {
    collection.insert(user, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        if ( result.length ) {
          res.redirect('/users');
        } else {
          res.end();
        }
      }
    });
  });
}

// DELETE
exports.delete = function (req, res) {
  var id = req.params.id;
  console.log('Deleting user: ' + id);

  db.collection('users', function (err, collection) {
    collection.remove({ '_id' : new BSON.ObjectID(id) }, { safe: true }, function (err, result ) {
      if (err) {
        res.end();
      } else {
        console.log(''+ result +' deletado');
        res.redirect('/users');
      }
    });
  });
}






/*
 * Populate with fake data
 * (for initial tests)
 */
var populateDB = function() {

  var users = [
  {
    _id: 1,
    name: "Eduardo Matos",
    country: "Brasil",
    email: "eduardoj.matos@gmail.com"
  },
  {
    _id: 2,
    name: "Derp",
    country: "Brasil",
    email: "derp@gmail.com"
  }];

  db.collection('users', function(err, collection) {
    collection.insert(users, { safe: true }, function (err, result) {
      console.log('Populating fake data');
      console.log(result);
    });
  });

};
