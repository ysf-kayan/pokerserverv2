const User = require('./User.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Room = require("./Room");

const app = express();
const port = 1111;
app.use(cors());
app.use(bodyParser.json());

let rooms = {
    arr: []
};

let users = {
    arr: []
}

app.get('/createNewGame', (req, res) => {
    let newRoom = new Room();
    rooms.arr.push(newRoom);
    rooms[newRoom.getId()] = newRoom;

    let response = JSON.stringify({
        roomCreated: true,
        roomId: newRoom.getId()
    });

    return res.end(response);
});

app.post('/validateRoom', (req, res) => {
    let result = {
        roomIsValid: false
    };
    if (typeof req.body.roomId !== 'undefined') {
        if (typeof rooms[req.body.roomId] !== 'undefined') {
            result.roomIsValid = true;
        }
    }
    res.end(JSON.stringify(result));
});

app.post('/validateUser', (req, res) => {
    let result = {
        userIsValid: false
    };
    if (typeof req.body.userId !== 'undefined') {
        if (typeof users[req.body.userId] !== 'undefined') {
            result.userIsValid = true;
        }
    }
    res.end(JSON.stringify(result));
});

app.post('/createUser', (req, res) => {
    let result = {
        userCreated: false,
    };
    if (typeof req.body.username === 'undefined' || req.body.username.length < 1) {
        result.error = "Invalid username.";
        res.end(JSON.stringify(result));
    }
    if (!roomExists(req.body.roomId)) {
        result.error = "Invalid room.";
        res.end(JSON.stringify(result));
    }

    let newUser = new User(req.body.username);
    rooms[req.body.roomId].addUser(newUser);
    result.userCreated = true;
    result.user = newUser;
    res.end(JSON.stringify(result));
});

function roomExists(roomId) {
    if (typeof roomId === 'undefined')
        return false;
    if (typeof rooms[roomId] === 'undefined')
        return false;
    return true;
}

app.listen(port, () => {
    console.log(`Poker server listening at http://localhost:${port}`)
});


