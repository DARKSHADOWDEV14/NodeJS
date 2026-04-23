import DBlocal from "db-local";

const user = Schema('User', {
    _id: {tpe: String, required:true},
    username: {type: String, required: true},
    password: {type: String, required: true},
})

export class userRepository {
    static createUser(username, password) {}
    static loginUser(username, password) {}
}