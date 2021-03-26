const { getListRoom, removeRoom, addRoom, updateRoom } = require('../ultils/google-calendar');
const { sendResponse } = require('../ultils/data-response');
class RoomController {
  async listRoom (req, res) {
    try {
      const room = await getListRoom(req.headers.authorization, req.query.page);
      if (room != null) {
        sendResponse(res, {
          status: 200,
          msg: 'Get list room success',
          data: {
            room: room
          }
        });
      } else {
        sendResponse(res, {
          status: 400,
          msg: 'Error get list room',
          data: {
            room: room
          }
        });
      }
    } catch (err) {
      res.status(500).send('Google api error.');
    }
  }

  async deteleRoom (req, res) {
    try {
      const room = await removeRoom(req.headers.authorization, req.params.id);
      if (room != null) {
        sendResponse(res, {
          status: 200,
          msg: 'Delete room success'
        });
      } else {
        sendResponse(res, {
          status: 400,
          msg: 'Error',
          data: {
            room: room
          }
        });
      }
    } catch (err) {
      res.status(500).send('Google api error.');
    }
  }

  async addRoom (req, res) {
    try {
      const content = {
        summary: req.body.summary,
        description: req.body.description
      };
      const newRoom = await addRoom(req.headers.authorization, content);
      if (newRoom != null) {
        sendResponse(res, {
          status: 200,
          msg: 'Add room success',
          data: {
            room: newRoom
          }
        });
      } else {
        sendResponse(res, {
          status: 400,
          msg: 'Error',
          data: {
            room: newRoom
          }
        });
      }
    } catch (err) {
      res.status(500).send('Google api error.');
    }
  }

  async editRoom (req, res) {
    try {
      const content = {
        summary: req.body.summary,
        description: req.body.description
      };
      const room = await updateRoom(req.headers.authorization, req.params.id, content);
      console.log('editroom', room);
      if (room != null) {
        sendResponse(res, {
          status: 200,
          msg: 'Edit room success',
          data: {
            room: room
          }
        });
      } else {
        sendResponse(res, {
          status: 400,
          msg: 'Error',
          data: {
            room: room
          }
        });
      }
    } catch (err) {
      res.status(500).send('Google api error.');
    }
  }
}
module.exports.RoomController = RoomController;
