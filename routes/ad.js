const express = require('express'),
    router = express.Router(),
    { ObjectId } = require('mongodb')

//const { Connection } = require("../ext/connection")

//const collection = "users"
//Connection.connectToMongo()

const Ad = require('../models/Ad')
const Auth_token = require('../models/Auth_token')
const check_token = require('../check_token')
const {secret} = require('../config')

router.route('/update/:id').post(async (req, res) => {


    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {

        const id = req.params.id
        const ad = await Ad.findOne({ "_id": id })
        result = await ad.updateOne({
            "email": req.body.email,
            "price": req.body.price,
            "phone": req.body.phone,
            "adress": req.body.adress,
            "tags": req.body.tags,
            "about": req.body.about,
            "wanted": req.body.wanted,
            })
        result ? res.json({"message": "success"}) : res.json({"message": "fail"})

    } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }

    

})

router.route('/delete/:id').post(async (req, res) => {

    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {

        const id = req.params.id
        const ad = await Ad.deleteOne({ "_id": id })
        ad ? res.json({"message": "success"}) : res.json({"message": "fail"})
        
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }

})



router.route('/create').post(async (req, res) => {

    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {
        let content = []
        user_id = req.body.user_id
        try {

        content = await Ad.create({
                "user_id": req.body.user_id,
                "email": req.body.email,
                "price": req.body.price,
                "phone": req.body.phone,
                "adress": req.body.adress,
                "type": req.body.type,
                "publish_mode": "in_moderation",
                "comment_from_moderator": "none",
                "tags": req.body.tags,
                "about": req.body.about,
                "wanted": req.body.wanted,
                })

            console.log(content)
            res.json(content)
        }
        catch (err) {
            throw err
        }
        
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }

})

router.route('/').post(async (req, res) => {

    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {
        let tags = req.body.tags ? req.body.tags : []
        console.log(tags)
        let ads = []
        try {
            ads = await Ad.find({}).exec()
            console.log(ads)
        }
        catch (err) {
            throw err
        }
    
        res.json(ads)
        
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }
})

router.route('/by_tags').post(async (req, res) => {

    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {
        let tags = req.body.tags ? req.body.tags : []
        console.log(tags)
        let ads = []
        try {
            ads = await Ad.find({"tags": { $in: tags } }).exec()
            console.log(ads)
        }
        catch (err) {
            throw err
        }
    
        res.json(ads)
        
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }
})

router.route('/moderation_success/:id').post(async (req, res) => {

    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {
        try {
            ad = await Ad.findOne({"_id":req.params.id})
            await ad.updateOne({
                "comment_from_moderator": "none",
                "publish_mode": "published",
                })
            console.log(ad)
        }
        catch (err) {
            throw err
        }
    
        res.json(ad)
        
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }

})

router.route('/moderation_reject/:id').post(async (req, res) => {

    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {

        try {
            ad = await Ad.findOne({"_id":req.params.id})
            await ad.updateOne({
                "comment_from_moderator": req.body.comment_from_moderator,
                "publish_mode": "rejected",
                })
            console.log(ad)
        }
        catch (err) {
            throw err
        }
    
        res.json(ad)
        
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }

})

router.route('/in_moderation').post(async (req, res) => {

    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {
       
    let ads = []
    try {
        ads = await Ad.find({"publish_mode": "in_moderation"}).exec()
        console.log(ads)
    }
    catch (err) {
        throw err
    }

	res.json(ads)
        
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }
})

router.route('/:id').post(async (req, res) => {

    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {

        const id = req.params.id

        let ad = []
        try {
            ad = await Ad.findOne({"_id" : id}).exec()
            console.log(ad)
        }
        catch (err) {
            throw err
        }
    
        res.json(ad)
        
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }

   
})
router.route('/by_user_id/:user_id').post(async (req, res) => {

    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {

        const user_id = req.params.user_id

        let ad = []
        try {
            ad = await Ad.find({"user_id" : user_id}).exec()
            console.log(ad)
        }
        catch (err) {
            throw err
        }
    
        res.json(ad)
        
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }
})



module.exports = router