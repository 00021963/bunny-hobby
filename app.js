const express = require('express');
const app = express();

const hobbiesRouter = require('./routes/hobbies');

// Configuration
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Success message middleware
app.use((req, res, next) => {
    res.locals.success = req.query.success;
    next();
  });


// Routes
app.use('/hobbies', hobbiesRouter);

// Homepage redirects to hobbies list
app.get('/', (req, res) => {
  res.redirect('/hobbies');
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
