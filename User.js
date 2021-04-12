const { v4: uuidv4 } = require('uuid');

class User {
    constructor(username) {
        this.username = username;
        this.id = uuidv4();
        this.shownId = uuidv4();
    }

    getUsername() {
        return this.username;
    }

    getId() {
        return this.id;
    }

    getShownId() {
        return this.shownId;
    }
}

module.exports = User;