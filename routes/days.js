const express = require('express');
const dailyLinks = require('../dailyLinks');

const router = express.Router();

router.get('/unlockTimes', function(req, res, next) {
    const response = {}
    Object.keys(dailyLinks).forEach((dayNumber) => {
        const { unlockMoment } = dailyLinks[dayNumber];
        Object.assign(response, { [dayNumber]: unlockMoment });
    });
    res.status(200).json(response);
});

router.get('/:dayNumber', function (req, res, next) {
    try {
        const { dayNumber } = req.params;
        const { link } = dailyLinks[dayNumber];
        if (link) {
            res.status(200).send(link);
        } else {
            throw new Error();
        }
    } catch(err) {
        res.status(401).send("Invalid request.");
    }
});

module.exports = router;