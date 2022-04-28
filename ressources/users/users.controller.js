const express = require('express');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./users.model');
const validatePayloadIncoming = require('../../middlewares/validatePayloadIncoming');
const validateToken = require('../../middlewares/validateToken');

const router = express.Router();

router.post('/signup', validatePayloadIncoming, async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user)
    return res
      .status(400)
      .send({ error: true, message: 'User already registered - Check again' });

  const salt = await bcrypt.genSalt(10);

  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = await User.create(req.body); // new User()

  const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY);

  res.send(token);
});

router.get('/me', validateToken, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });

  res.status(200).send(user);
});

router.post('/auth', (req, res) => {
  // valider le body entrant
  // aller chercher le user into the DB
  // bcrypt.compare : comparer le password entrant avec le password
  // renvoyer un token généré
});

module.exports = router;
