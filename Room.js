const User = require("./User");
const { v4: uuidv4 } = require('uuid');

class Room {
    constructor() {
        this.id = uuidv4();
        this.users = [];
    }

    getId() {
        return this.id;
    }

    addUser(user) {
        if (!(user instanceof User))
            return;
        this.users.push(user);
    }
}

module.exports = Room;