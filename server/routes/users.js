const express = require('express');
const ejs = require('ejs');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.ejs')
})

router.get("/register", (req, res) => {
  res.render('register.ejs');

});

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    db.collection('users').insertOne(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
  console.log(users);

})

router.get("/login", (req, res) => {
  res.render('login.ejs');
});

router.post('/login', (req, res) => {

})

module.exports = router;