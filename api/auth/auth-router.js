const router = require('express').Router();
const bcryptjs = require("bcryptjs");
const Auth = require("./auth-model");

const { hash, makeToken, isValid } = require("../helpers/auth-helpers")



router.post('/register', (req, res) => {
  // res.end('implement register, please!');

  const credentials = req.body;

  if (isValid(credentials)) {
    credentials.password = hash;

    Auth.insert(credentials)
      .then(user => {
        res.stautus(201).json({ data: user });
      })
      .catch(err => {
        res.status(500).json({ message: "username taken" });
      });
  } else {
    res.status(400).json({ message: "username and password required"})
  }
});

router.post('/login', (req, res) => {
  res.end('implement login, please!');

  const { username, password } = req.body;

  if (isValid(req.body)) {
    Auth.findBy({ username: username})
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeToken(user)
          res.status(200).json({ message: `Welcome, ${user.username}`, token});
        } else {
          res.status(401).json({ message: "invalid credentials" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({ message: "username and password required" });
  }
  
 
});

module.exports = router;
/*

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
       */


