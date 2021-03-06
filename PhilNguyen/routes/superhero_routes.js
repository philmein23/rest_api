'use strict';
const Router = require('express').Router;
const Superhero = require(__dirname + '/../models/superhero');
const bodyParser = require('body-parser').json();
const jwToken = require(__dirname + '/../lib/jwt_auth');

let superheroRouter = module.exports = Router();

superheroRouter.route('/superheroes')

.post(jwToken, bodyParser, (req, res) => {
  let newSuperhero = new Superhero(req.body);
  newSuperhero.save((err, data) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(data);
  });
})

.get(jwToken, (req, res) => {
  Superhero.find((err, superhero) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(superhero);
  });
});

superheroRouter.route('/superheroes/:superhero_id')

.get(jwToken, (req, res) => {
  Superhero.findById(req.params.superhero_id, (err, superhero) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(superhero);
  });
})
.put(jwToken, bodyParser, (req, res) => {
  Superhero.findByIdAndUpdate(req.params.superhero_id, req.body, (err, superhero) => {
    if (err) {
      res.send(err);
    }
    superhero.save((err) => {
      if (err) {
        res.send(err);
      }
      res.status(200).json({ message: 'Successfully updated!' });
    });
  });
})
.delete(jwToken, (req, res) => {
  Superhero.remove({
    _id: req.params.superhero_id

  }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Successfully deleted!' });
  });
});
