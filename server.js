const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const toyService = require('./services/toy.service');
const app = express();




app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
const port = process.env.PORT || 3030;



app.use(express.static('public'));


app.get('/api/toy', (req, res) => {
    console.log('Backend getting your toys');

    toyService.query()
        .then(toys => {
            res.send(toys);
        }).catch(err => { 
            res.send('problem getting toys' , err)
        })
});

app.put('/api/toy/', (req, res) => {

    const { _id, name, price, type, inStock, createdAt, label } = req.body;

    const toy = {
        _id,
        name,
        price,
        type,
        inStock,
        createdAt,
        label
    };

    toyService.save(toy)
        .then((savedtoy) => {
            res.send(savedtoy);
        })
        .catch(err => {
            res.send('Problem with updating toy', err)
        });
});

app.post('/api/toy', (req, res) => {
    const { _id, name, price, type, inStock, } = req.body;

    const toy = {
        _id,
        name,
        price,
        type,
        inStock,
    };

    toyService.save(toy)
        .then((savedtoy) => {
            res.send(savedtoy);
        }).catch(err => {
            res.send('Problem with saving toy', err)
        })
});



app.get('/api/toy/:toyId', (req, res) => {
    console.log('Backend getting your toy:', req.params.toyId);
    toyService.getById(req.params.toyId)
        .then(toy => {
            res.send(toy);
        });
});

app.delete('/api/toy/:toyId', (req, res) => {
    console.log('Backend removing toy:', req.params.toyId);
    toyService.remove(req.params.toyId)
        .then(() => {
            res.send({ msg: 'Removed' });
        })
        .catch(err => {
            res.send('problem with removing...', err);
        });
});



app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});