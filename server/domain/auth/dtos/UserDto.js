class UserDto {
    constructor(model) {
        this.id = model.id;
        this.username = model.username;
        this.email = model.email;
        this.role = model.role;
        this.isActivated = model.isActivated;
    }
}

module.exports = UserDto;