const postController = require(`./post.controller`);

const registerPost = (req, res) => {
    const userId = req.user.id
    const data = req.body

    if(!data){
        return res.status.json({message: "Missing Data"})
    } else if ( !data.title || !data.content || !data.header_image ){
        return res.status(400).json({
            message: `All fields must be completed`,
            fields: {
                title:`String`,
                conten: `String`,
                header_image: `url`,
            }
        })
    }else{
        const response = postController.createPost(userId, data)
        return res.status(201).json({ 
            message: `User created succesfully with id: ${response.id}`,
            user: response
        })
    }
}

const getAll = (req, res) => {
    const data =  postController.getAllPost()
    return res.status(200).json({items: data.length, users: data})
}

const getAllPotsById = (req, res) => {
    const id = req.params.id
    const data =  postController.getPostById(id)

    if(data){
        return res.status(200).json({items: data.length, users: data})
    }else {
        return res.status(400).json({items: data.length, users: data})
    }    

    
}

const getAllMyPost = (req, res) => {
    const userId = req.user.id
    const data = postController.getMyAllPost(userId)
    res.status(200).json({items: data.length, users: data})

}

const getPostByUserById = (req, res) => {
    const userId = req.user.id
    const id = req.params.id
    const data = postController.getMyPostById(userId, id)

    if(data){
        res.status(200).json(data)
    }else{
        res.status(404).json({message: "Post does not exist"})        
    }

}


const removePostByUserId = (req, res) => {
    const id = req.params.id 
    const userId = req.user.id
    const data = postController.deletePost(userId, id)

    if(data){
        res.status(204).json({message: `Post deleted`})
    }else{
        res.status(400).json({message: "Invalid ID"})
    }
}

const editPostByUserId = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const userId = req.user.id;

    if(!Object.keys(data).length){
        res.status(400).json({message: "Missing data"})
    } else if (!data.title || !data.content || !data.header_image ){
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                title:`String`,
                conten: `String`,
                header_image: `url`,
            }
        })
    } else {
        const response = postController.editPost(userId, id, data)
        return res.status(200).json(
            {
                message: "User edited succesfully :)",
                user: response
            })

    }

}

module.exports = {
    registerPost,
    getAll,
    getAllPotsById,
    getPostByUserById,
    getAllMyPost,
    removePostByUserId,
    editPostByUserId
}