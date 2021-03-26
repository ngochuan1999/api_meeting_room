const express = require('express');
const router = express.Router();
const { RoomController } = require('../controllers/room-controller');
const roomCtrl = new RoomController();

/* GET users listing. */
router.get('/list_room', roomCtrl.listRoom);
router.delete('/delete_room/:id', roomCtrl.deteleRoom);
router.post('/add_room', roomCtrl.addRoom);
router.put('/edit_room/:id', roomCtrl.editRoom);
module.exports = router;
