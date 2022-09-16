const express = require('express');
const ejs = require('ejs');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');

router.get("/register", (req, res) => {
  res.render('register.ejs');

});

router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    console.log('no field')
    errors.push({ msg: 'Please fill in all fields' });
  }
  if (password !== password2) {
    console.log('password mismatch')
    errors.push({ msg: 'Passwords do not match' });
  }
  if (name.length > 24 || name.length < 3) {
    errors.push({ msg: 'Username must be between 3 and 24 characters' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password must be 6 or more characters' });
  }

  if (errors.length > 0) {
    res.render('register.ejs', {
      name, email, password, password2, errors
    });
  } else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          //user exists
          errors.push({ msg: 'Email already in use' })
          res.render('register.ejs', {
            name, email, password, password2, errors
          });
          console.log(errors);
        } else {
          const newUser = new User({
            name: name,
            email: email,
            password: password
          })
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  res.redirect('/users/login')
                })
                .catch(err => console.log(err));
            })
          })
        }
      })
  }
  // try {
  //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //   db.collection('users').insertOne(
  //     {
  //       name: req.body.name,
  //       email: req.body.email,
  //       password: hashedPassword
  //     })
  //   res.redirect('/login')
  // } catch {
  //   res.redirect('/register')
  // }
  // console.log(users);
})

router.get("/login", (req, res) => {
  res.render('login.ejs');
});

router.post('/login', (req, res) => {

})

router.post('/logout', (req, res) => {

})


module.exports = router;