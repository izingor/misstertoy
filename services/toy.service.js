const fs = require('fs');


// CRUDL : CREATE, READ, UPDATE, DELETE, LIST

const toys = require('../data/toys.json');
const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"];

// const PAGE_SIZE = 3

function query() {

    return Promise.resolve(toys);
}

function getById(toyId) {
    const toy = toys.find(toy => toy._id === toyId);
    return Promise.resolve(toy);
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId);
    // if (toys[idx].creator._id !== theUser._id) {
    //     return Promise.reject('wrong user');
    // }
    toys.splice(idx, 1);
    return _savetoysToFile();
}

function save(toyToSave) {
    console.log('toy to save', toyToSave._id);
    // const toyToSave = {
    //     _id,
    //     name,
    //     price,
    //     type,
    //     inStock,
    //     createdAt ,
    //     label
    // };
    if (toyToSave._id) {
        const idx = toys.findIndex(toy => toy._id === toyToSave._id);
        toys[idx] = toyToSave;
    } else {
        toyToSave._id = _makeId();
        toyToSave.createdAt = new Date();
        toyToSave.label = addLabel();
        toys.unshift(toyToSave);
    }
    return _savetoysToFile().then(() => toyToSave);
}


function _savetoysToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/toys.json', JSON.stringify(toys, null, 2), (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

function _makeId(length = 7) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function addLabel() {
        const randomLabel = labels[getRandomIntInclusive(0, labels.length - 1)];
        return randomLabel
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
    query,
    getById,
    remove,
    save
};