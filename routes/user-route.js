const express = require('express');
const router = express.Router();
const { AuthController } = require('../controllers/auth-controller');
const authCtrl = new AuthController();

/* GET users listing. */
router.get('/google_url', authCtrl.getUrl);
router.post('/token', authCtrl.token);
router.get('/get_email', authCtrl.save);
module.exports = router;
