const express = require('express');
const ejs = require('ejs');
const { ErrorSharp } = require('@mui/icons-material');
const router = express.Router();


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

  if (password.length < 6) {
    console.log('length')
    errors.push({ msg: 'Password must be 6 or more characters' });
  }

  if (errors.length > 0) {
    res.render('register.ejs', {
      name, email, password, password2, errors
    });
  } else {
    res.sendStatus(200)
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