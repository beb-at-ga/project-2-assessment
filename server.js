const express = require('express');
const methodOverride = require('method-override');
let db = require('./models');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////



app.delete('/:id', (req, res) => {
  db.widget.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/');
  })
})

app.post('/', (req, res) => {
  console.log(req.body);
  // res.json(req.body);
  db.widget.findOrCreate({
      where: {
        description: req.body.description
      },
      defaults: {
        description: req.body.description,
        quantity: req.body.quantity
      }
    })
    .then((post) => {
      res.redirect('/');
    })
})


app.get('/', (req, res) => {

  db.widget.findAll({})
    .then((widgets) => {
      console.log(`Found ${widgets.length} widgets.`)

      res.render('index', {
        widgets
      });
    })
    .catch((err) => {
      console.log(err);
    })
})



// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);