const express = require('express');
const router = express.Router();

const {body, validationResult} = require('express-validator');

//Temporary data
let hobbies = [
    { id: 1, title: "Gardening", description: "Growing organic tomatos and cucumbers", rating: 5 },
    { id: 2, title: "Cooking", description: "I tried baking cookies the other day, and they actually turned out fun! Plus, the house smells amazing after.", rating: 3 },
    { id: 3, title: "Painting", description: " I’m not great at it, but it’s really relaxing and lets me express how I feel.", rating: 2 },
    { id: 4, title: "Puzzle solving", description: "Lately, I’ve gotten into doing jigsaw puzzles, and honestly, it’s way more fun than I expected. At first, it was just something I tried to pass time, but now I actually look forward to it. There’s something really calming about it—just sitting down, turning over all the pieces, and slowly putting things together. It kind of feels like giving your brain a break while still keeping it focused, if that makes sense.", rating: 4 }
  ];

//CRUD

//LIST ALL HOBBIES - read
router.get('/', (req, res) => {
    let filteredHobbies = hobbies;
    if (req.query.rating) {
      filteredHobbies = hobbies.filter(h => h.rating == req.query.rating);
    }
    res.render('hobbies/index', { hobbies: filteredHobbies });
  });

//SHOW ADD FORM - create
router.get('/new', (req, res) => {
  res.render('hobbies/new', {errors: [], hobby: { title: '', description: '', rating: '' }}); 
}); //pass errors array always

//HANDLE FORM SUBMISSION
router.post(
    '/',
    [
        body('title')
        .trim()
        .custom(value => {
          if (!value) return Promise.reject('Hobby name is required');
          if (/^\s+$/.test(value)) return Promise.reject('Hobby name cannot be just spaces');
          if (value.length > 30) return Promise.reject('Title must be less than 30 characters');
          return true;
        })
    ],
    (req, res) => {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.render('hobbies/new', {
          errors: errors.array(),
          hobby: req.body
        });
      }
  
      const newHobby = {
        id: hobbies.length + 1,
        title: req.body.title.trim(), //Trim whitespace
        description: (req.body.description || '').trim(), //Handle optional field
        rating: req.body.rating
      };
      
      hobbies.push(newHobby);
      res.redirect('/hobbies?success=true');
    }
  );

//EDIT FORM - update
router.get('/:id/edit', (req, res) => {
    const hobby = hobbies.find(h => h.id === parseInt(req.params.id));
//for non-existent hobbies
    if (!hobby) {
        return res.status(404).send('Hobby not found');
      }

    res.render('hobbies/edit', { 
      hobby,
      errors: []
    });
  });

//HANDLE EDIT 
router.post('/:id', 
    [
        body('title')
       .trim()
       .custom(value => {
       if (!value) return Promise.reject('Hobby name is required');
       if (/^\s+$/.test(value)) return Promise.reject('Hobby name cannot be just spaces');
       if (value.length > 30) return Promise.reject('Title must be less than 30 characters');
       return true;
  })
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render('hobbies/edit', {
          errors: errors.array(),
          hobby: req.body
        });
      }
      
      const hobby = hobbies.find(h => h.id === parseInt(req.params.id));

      if (!hobby) {
        return res.status(404).send('Hobby not found');
      }
      
      hobby.title = req.body.title.trim();
      hobby.description = (req.body.description || '').trim();
      hobby.rating = req.body.rating;
      res.redirect('/hobbies?success=true');
    }
  );

//DELETE HOBBY
router.post('/:id/delete', (req, res) => {
    hobbies = hobbies.filter(h => h.id !== parseInt(req.params.id));
    res.redirect('/hobbies');
  });


module.exports = router;