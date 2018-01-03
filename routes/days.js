const express = require('express');
const dailyLinks = require('../dailyLinks');

const router = express.Router();

/* GET home page. */
router.get('/:dayNumber', function (req, res, next) {
    const { dayNumber } = req.params;
    const link = dailyLinks[dayNumber];
    if (link) {
        res.status(200).send(link);
    } else {
        res.status(401).send("Invalid request.")
    }
});

module.exports = router;