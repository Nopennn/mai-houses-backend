const express = require('express'),
    router = express.Router(),
    { ObjectId } = require('mongodb')

//const { Connection } = require("../ext/connection")

//const collection = "users"
//Connection.connectToMongo()

const Ad = require('../models/Ad')
const User = require('../models/User')
const Auth_token = require('../models/Auth_token')
const check_token = require('../check_token')
const {secret} = require('../config')
const {ad_creation_validator} = require('../validators/ad_creation_validator')
const {ad_upd_validator} = require('../validators/ad_upd_validator')

router.route('/update/:id').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    let token = req.body.token
    let user_id = check_token(token)
    if (ad_upd_validator(req.body)) {
        res.status(403).json({"message" : "Validation error"})
    } else if (!user_id) {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    } else {
        const id = req.params.id
        const ad = await Ad.findOne({ "_id": id})
        if (ad.user_id == user_id) {
        result = await ad.updateOne({
            "price": req.body.price,
            "photo_links": req.body.photo_links,
            "adress": req.body.adress,
            "tags": req.body.tags,
            "about": req.body.about,
            "publish_mode": "in_moderation"
            })
        }
        result ? res.json({"message": "success"}) : res.json({"message": "fail"})
    }
})

router.route('/delete/:id').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    let token = req.body.token
    let user_id = check_token(token)
    if (user_id) {

        const id = req.params.id
        const ad = await Ad.findOne({ "_id": id})

        if (ad.user_id == user_id) {
            const doc = await Ad.deleteOne({ "_id": id})
        }

        doc ? res.json({"message": "success"}) : res.json({"message": "fail"})
        
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }

})



router.route('/create').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    let token = req.body.token
    let user_id = check_token(token)
    if (ad_creation_validator(req.body)) {
        res.status(403).json({"message" : "Validation error"})
    } else if (!user_id) {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Not authoraized"})
    } else {
        let content = []
        let doc = await User.findOne({"_id": user_id}).exec()
        if (doc) {
            try {
                content = await Ad.create({
                    "user_id": user_id,
                    "email": doc.email,
                    "price": req.body.price,
                    "phone": doc.phone,
                    "adress": req.body.adress,
                    "type": req.body.type,
                    "publish_mode": "in_moderation",
                    "comment_from_moderator": "none",
                    "tags": req.body.tags,
                    "about": req.body.about,
                    "gender": doc.gender,
                    "age": doc.age,
                    "surname": doc.surname,
                    "name": doc.name,
                    "photo_links": req.body.photo_links
                })
                console.log(content)
                res.json(content)
            }
            catch (err) {
                throw err
            }
        }
    }
})

router.route('/').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
// {min peice, max_price,genders, min_age, max_age, types}
    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {
        let min_price = req.body.min_price ? req.body.min_price : 0
        let max_price = req.body.max_price ? req.body.max_price : 1000000000000
        let genders = req.body.genders ? req.body.genders : ["m","f"]
        let tags = req.body.tags ? req.body.tags : []
        let types = req.body.types ? req.body.types : ["housing", "person"]
        let min_age = req.body.min_age ? req.body.min_age : 0
        let max_age = req.body.max_age ? req.body.max_age : 1000000000000
        let ads = []
        try {
            ads = await Ad.find({
                "publish_mode": "published",
                "price": {
                    $gte: min_price,
                    $lte: max_price
                },
                "gender": { $in: genders },
                "type": { $in: types },
                "age": { 
                    $gte: min_age,
                    $lte: max_age }
            }).exec()
            console.log(ads)
        }
        catch (err) {
            throw err
        }
    
        res.json(ads)
        
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Not authoraized"})
    }
})

router.route('/by_tags').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //tags: ["", ""]
    // {min peice, max_price,genders, min_age, max_age, types}

    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {
        let min_price = req.body.min_price ? req.body.min_price : 0
        let max_price = req.body.max_price ? req.body.max_price : 1000000000000
        let genders = req.body.genders ? req.body.genders : ["m","f"]
        let tags = req.body.tags ? req.body.tags : []
        let types = req.body.types ? req.body.types : ["housing", "person"]
        let min_age = req.body.min_age ? req.body.min_age : 0
        let max_age = req.body.max_age ? req.body.max_age : 1000000000000
        let ads = []
        try {
            ads = await Ad.find({
            "publish_mode": "published",
            "tags": { $in: tags }, 
            "price": {
                $gte: min_price,
                $lte: max_price
            },
            "gender": { $in: genders },
            "type": { $in: types },
            "age": { 
                $gte: min_age,
                $lte: max_age }
        }).exec()
            console.log(ads)
        }
        catch (err) {
            throw err
        }
    
        res.json(ads)
        
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Not authoraized"})
    }
})

router.route('/moderation_success/:id').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    let token = req.body.token
    let user_id = check_token(token)
    let user = await User.findOne({"_id": user_id, "role": "admin"}).exec()
    if (user) {
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
        res.status(403).json({"message" : "Not authoraized"})
    }

})

router.route('/moderation_reject/:id').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    let token = req.body.token
    let user_id = check_token(token)
    let user = await User.findOne({"_id": user_id, "role": "admin"}).exec()
    if (user) {

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
        res.status(403).json({"message" : "Not authoraized"})
    }

})

router.route('/in_moderation').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //.../ads/in_moderation

    let token = req.body.token
    let user_id = check_token(token)
    let user = await User.findOne({"_id": user_id, "role": "admin"}).exec()

    if (user) {
       
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
        res.status(403).json({"message" : "Not admin"})
    }
})

router.route('/:id').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

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
        res.status(403).json({"message" : "Not authoraized"})
    }

   
})
router.route('/by_user_id/:user_id').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    let token = req.body.token
    let user_id = check_token(token)
    if (user_id) {

        const user_id = req.params.user_id

        let ad = []
        try {
            ad = await Ad.find({"user_id" : user_id, "publish_mode": "published"}).exec()
            console.log(ad)
        }
        catch (err) {
            throw err
        }
    
        res.json(ad)
        
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Not authoraized"})
    }
})

router.route('/all_user_ads/').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    let token = req.body.token
    let user_id = check_token(token)
    if (user_id) {
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
        res.status(403).json({"message" : "Not authoraized"})
    }
})



module.exports = router
