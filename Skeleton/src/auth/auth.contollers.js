const {getUserByEmail} = require("../users/users.controllers")
const { comparePassword } = require("../utils/crypt")


//* req.body.password

console.log("hi");

const loginUser = (email, password) => {

    const user = getUserByEmail(email)

    //? user.password --> Password encrypted
    //* Password --> Passwors plain text

    if(user){
        const verifyPassword = comparePassword(password, user.password)
        if(verifyPassword){
            return user
        }
    }
    return false

}

// console.log(loginUser("juan@examle.com","1234"));


module.exports = {
    loginUser
}