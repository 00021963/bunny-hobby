const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 1. Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 2. Template engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 3. Import routes
const hobbiesRouter = require('./routes/hobbies');

// 4. Connect routes
app.use('/hobbies', hobbiesRouter);

// 5. Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Bunny Hobbies' });
});

// 6. Start server
app.listen(port, () => {
  console.log(`Working! Access at: http://localhost:${port}/hobbies/new`);
});