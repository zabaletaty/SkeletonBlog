const router = require("express").Router()
const passport = require(`passport`)
const { roleAdminMiddleWare } = require("../middleware/adminRole")

require(`../middleware/auth.middleware`)(passport)

const postServices = require(`../post/post.http`)

const userServices = require("./users.http")

router.route("/")
    .get(userServices.getAll)
    .post(userServices.register)

router.route(`/me`)
    .put(passport.authenticate(`jwt`, {session: false}) ,userServices.editMyUser)
    .get(passport.authenticate(`jwt`, {session: false}) ,userServices.getMyUser)
    .delete(passport.authenticate(`jwt`, {session: false}) ,userServices.delteteMyUser)

router.route(`/me/posts`)
    .get(passport.authenticate(`jwt`, {session: false}), postServices.getAllMyPost)

router.route(`/me/posts/:id`)
    .get(passport.authenticate(`jwt`, {session: false}), postServices.getPostByUserById)
    .put(passport.authenticate(`jwt`, {session: false}), postServices.editPostByUserId)
    .delete(passport.authenticate(`jwt`, {session: false}), postServices.removePostByUserId)

router.route("/:id")
    .get( userServices.getById)
    .delete(passport.authenticate(`jwt`, {session: false}), roleAdminMiddleWare, userServices.remove)
    .put(passport.authenticate(`jwt`, {session: false}), roleAdminMiddleWare, userServices.edit)



exports.router = router