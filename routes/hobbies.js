const express = require('express');
const router = express.Router();

//Temporary data storage
let hobbies = [];

//Route 1 - Show NEW HOBBY FORM
router.get('/new', (req, res) => {
  res.render('hobbies/new');
});

//Route 2 - Handle form submission
router.post('/', (req, res) => {
  hobbies.push({
    id: hobbies.length + 1,
    title: req.body.title,
    rating: req.body.rating || 3
  });
  res.redirect('/hobbies');
});

//Route 3 - Show ALL hobbies
router.get('/', (req, res) => {
  res.render('hobbies/index', { hobbies });
});

module.exports = router;