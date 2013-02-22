
/*
 * User Module
 */

exports.list = function(req, res) {
  res.send( [{ name: 'user1' }, { name: 'user2' }, { name: 'user3' }] );
};

exports.get = function(req, res) {
  res.send({ id: req.params.id, name: "The Name", description: "description" });
};

