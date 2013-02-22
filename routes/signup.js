
/*
 * GET signup form.
 */

exports.form = function(req, res){
  res.render('signup', { title : 'Cadastro' });
};
