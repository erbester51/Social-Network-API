const router = require('express').Router();
const apiRouter = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    return res.send('Wrong route.');
});

module.exports = router;