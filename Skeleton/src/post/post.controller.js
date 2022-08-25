const uuid = require("uuid");

const postDB = [
    {
        "id": "3kl;k3",
        "title": "messi",
        "content":"string",
        "header_image": "url_to_img",
        "user_id": "uuid",//Aqui hara referencia al usuario de tu userDB
        "published": true
    },
    {
        "id": "2222222",
        "title": "leo",
        "content":"hohoho hohohoho hoho",
        "header_image": "url_to_img",
        "user_id": "uuiddd",//Aqui hara referencia al usuario de tu userDB
        "published": true
    },
    {
        "id": "31614e36-5d7c-4b20-9b70-c1589af9b151",
        "title": "Comuuuuu",
        "content": "como si fueraaaaaa",
        "header_image": "url de gatos",
        "user_id": "26c9719f-d7d6-4d3e-8408-871a848cd154",
        "published": true
    },
    {
        "id": "24e6d87b-46d8-4ac7-ab06-2692ebae8cd6",
        "title": "nuevo",
        "content": "NuevUUUUUU",
        "header_image": "url de perros",
        "user_id": "26c9719f-d7d6-4d3e-8408-871a848cd154",
        "published": true
      }
]

const createPost = (userId, data) => {
    const newPost = {
        "id": uuid.v4(),
        "title": data.title,
        "content": data.content,
        "header_image": data.header_image,
        "user_id": userId,//Aqui hara referencia al usuario de tu userDB
        "published": true
    }
    postDB.push(newPost)
    return newPost      
}

const getAllPost = () =>{
    return postDB
}

const getPostById = (id) =>{
    const data = postDB.filter(x => x.id === id)
    return data.length ? data[0] : false
}

const getMyAllPost = (userId) => {
    const data = postDB.filter(e => e.user_id == userId)
    return data
}

const getMyPostById = (userId, id) => {
    const data = postDB.filter(x => x.id === id)
    if(data[0]?.user_id == userId){
        return  data[0]  
    }else{
        return false
    }
}

const editPost = (userId, id, data) => {
    const index = postDB.findIndex(e=>e.id == id);
    if(index !== -1){
        if(postDB[index].user_id == userId){
            postDB[index] = {
                "id": id,
                "title": data.title,
                "content": data.content,
                "header_image": data.header_image,
                "user_id": userId,//Aqui hara referencia al usuario de tu userDB
                "published": true
            }
            return postDB[index]
        }
    }else{
        createPost(data)
    }
}

const deletePost = (userId, id) => {
    const index = postDB.findIndex(e=>e.id == id);
    if(index !== -1 ){
        if(postDB[index]?.user_id == userId){
            postDB.splice(index, 1)
            return true
        }
    }else{
        return false
    }

}


module.exports = {
    createPost,
    getAllPost,
    getPostById,
    getMyAllPost,
    getMyPostById,
    deletePost,
    editPost
}