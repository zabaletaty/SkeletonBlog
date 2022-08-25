const jwt = require(`jsonwebtoken`)

const {loginUser} = require("../auth/auth.contollers")

const login = (req, res) => {
    const data = req.body

    if(!data.email || !data.password){
       return  res.status(200).json({message: "missing data"})
    }

    const response = loginUser(data.email, data.password)
    // const response = loginUser("juan@examle.com", "123 4")

    if(response){

        const token = jwt.sign({
            id: response.id,
            email: response.email,
            rol: response.rol

        }, "messi")

        return res.status(200).json({message: "Tus credenciales son correctas", token})
    }else{
        return res.status(401).json({messgae: "Invalid credentials"})
    }

}

module.exports = {
    login
}
