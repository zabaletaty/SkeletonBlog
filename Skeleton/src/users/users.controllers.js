const uuid = require("uuid");
const {comparePassword, hansPassword} = require("../utils/crypt")



const userDB = [
    {
        "id": "26c9719f-d7d6-4d3e-8408-871a848cd154",
        "first_name": "Carlos",
        "last_name": "string",
        "email": "carlos@examle.com",
        "password": "$2b$10$Cxl9OCvemMqpRfpZGlBJEu1INRegj6KCMasxhz./p.tGcwefG0xXK",
        "phone": "+52123456789",
        "birthday_date": "DD/MM/YYYY",
        "rol": "admin",
        "profile_img": "URL.png",
        "country": "string",
        "is_active": true,
        "verified": false
    },
    {
        "id": "9ae9c73e-12b9-4549-90e2-7a57b8d2cfb8",
        "first_name": "Juan",
        "last_name": "string",
        "email": "juan@examle.com",
        "password": "$2b$10$W.BLHYio09rCPKX3kaDRAelxRQXE6NTeqBtCBAO90C2HLCFFoMtCG",
        "phone": "+52123456789",
        "birthday_date": "DD/MM/YYYY",
        "rol": "normal",
        "profile_img": "URL.png",
        "country": "string",
        "is_active": true,
        "verified": false
      }

];

const getAllusers = () => {
    return userDB
    // SQL
    // select * from users;
}


const getUserById = (id) =>{
    const data = userDB.filter(x => x.id === id)
    return data.length ? data[0] : false

    //SQL
    //select * from users where id = ${id};
}


const createUser = (data) =>{
    const newUser = {
        id: uuid.v4(), //not null unique
        first_name: data.first_name, //not null
        last_name: data.last_name, //not null
        email: data.email, //not null unique
        password: hansPassword(data.password), //not null
        phone: data.phone ? data.phone : "", //default
        birthday_date: data.birthday_date, //not null
        rol:"normal", //not null default: "normal"
        profile_img: data.profile_img ? data.profile_img : "",
        country: data.country, // not null
        is_active: true, //not null default: true
        verified: false //not null default: false
    }
    userDB.push(newUser)
    return newUser
}

const editUser = (id, data) =>{

    const index = userDB.findIndex(e=>e.id == id)
    if(index !== -1){
        userDB[index] = {
            id:id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email, 
            password: userDB[index].password,
            phone: data.phone,
            birthday_date: data.birthday_date,
            rol: data.rol, 
            profile_img: data.profile_img ,
            country: data.country, 
            is_active: data.is_active, 
            verified: false 
        }
    }else{
        createUser(data)
    }

}

const deleteUser = (id) =>{
    const index = userDB.findIndex(e=>e.id == id)
    if(index !== -1 ){
        userDB.splice(index, 1)
        return true
    }else{
        return false
    }
}

const getUserByEmail = (email) => {
    const data = userDB.filter(e=>e.email == email)
    return data.length ? data[0] : false

    //SQL
    //select * from users where email = ${email};
}


module.exports = {
    getAllusers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
    getUserByEmail
}