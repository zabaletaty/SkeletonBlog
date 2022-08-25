const bcrypt = require("bcrypt");

const hansPassword = (plainPassword) =>{
    return bcrypt.hashSync(plainPassword, 10)
}

const comparePassword = (plainPassword, hansPassword) =>{
    return bcrypt.compareSync(plainPassword, hansPassword)
}

module.exports = {
    hansPassword,
    comparePassword
}