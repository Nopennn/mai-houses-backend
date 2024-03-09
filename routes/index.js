//npm run dev

const express = require('express'),
    router = express.Router()

router.get('/', (req, res) => {
    console.log(req.query);
    res.send('search: ' + req.query.search)
})

module.exports = router