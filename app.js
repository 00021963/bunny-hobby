const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

//middleware
app.use(express.urlencoded({ extended: true })); // For forms
app.use(express.static(path.join(__dirname, 'public')));

//set up pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Bunny Hobbies' });
  });

app.listen(port, () => {
    console.log(`Server is hopping on http://localhost:${port}`);
});