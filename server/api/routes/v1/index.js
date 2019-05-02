const express = require('express');
const userRoutes = require('./user.route');
const listeningRoutes = require('./listening.route');
const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
//router.use('/docs', express.static('docs'));

//router.use('/courses', courseRoutes);
router.use('/users', userRoutes);
router.use('/listenings', listeningRoutes);
//router.use('/auth', authRoutes);

module.exports = router;
