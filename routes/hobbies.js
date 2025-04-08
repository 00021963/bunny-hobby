const express = require('express');
const router = express.Router();

// Temporary data
let hobbies = [
  { id: 1, title: "Gardening", rating: 3 },
  { id: 2, title: "Sleeping", rating: 5 }
];

//CRUD

//LIST ALL HOBBIES (READ)
router.get('/', (req, res) => {
  res.render('hobbies/index', { hobbies });
});

//SHOW ADD FORM (CREATE)
router.get('/new', (req, res) => {
  res.render('hobbies/new');
});

//HANDLE FORM SUBMISSION (CREATE)
router.post('/', (req, res) => {
  const newHobby = {
    id: hobbies.length + 1,
    title: req.body.title,
    rating: req.body.rating
  };
  hobbies.push(newHobby);
  res.redirect('/hobbies?success=true');
});

//EDIT FORM (UPDATE)
router.get('/:id/edit', (req, res) => {
  const hobby = hobbies.find(h => h.id === parseInt(req.params.id));
  res.render('hobbies/edit', { hobby });
});

//HANDLE EDIT (UPDATE)
router.post('/:id', (req, res) => {
  const hobby = hobbies.find(h => h.id === parseInt(req.params.id));
  hobby.title = req.body.title;
  hobby.rating = req.body.rating;
  res.redirect('/hobbies?success=true');
});

//DELETE HOBBY
router.post('/:id/delete', (req, res) => {
  hobbies = hobbies.filter(h => h.id !== parseInt(req.params.id));
  res.redirect('/hobbies');
});

module.exports = router;