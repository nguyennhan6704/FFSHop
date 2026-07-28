export default class User {
    constructor(userData) {
        this.email = userData.email;
        this.password = userData.password;
        this.avatar = userData.avatar;
        this.username = userData.username;
        this.address = userData.address;
        this.phoneNo = userData.phoneNo;
        this.createdAt = userData.createdAt;
        this.gender = userData.gender;
    }
}