const GoogleUrlGenerator = require('../ultils/google-url-generator')
const { getListRoom, removeRoom, addRoom } = require('../ultils/google-calendar')
const { sendResponse } = require('../ultils/data-response')

class AuthController {

    getUrl(req, res) {
        try{
             const generator = new GoogleUrlGenerator()
        const url = generator.authorizeUrl()
        if (url != null) {
            sendResponse(res, {
                status: 200,
                msg: "Successfully",
                data: {
                    url: url
                }
            })
        }
        else {
            sendResponse(res, {
                status: 200,
                msg: "Error",
                data: {
                    url: url
                }
            })
        }
        } catch (err){
            res.status(500).send('Google api error.')
        }
       

    }
    async token(req, res) {
        try{
            const code = req.body.code
        const generator = new GoogleUrlGenerator()
        const token = await generator.getAccessToken(code)
        if (token != null) {
            sendResponse(res, {
                status: 200,
                msg: "Successfully",
                data: {
                    AccessToken: token
                }
            })
        }
        else {
            sendResponse(res, {
                status: 400,
                msg: "Error",
                data: {
                    AccessToken: token
                }
            })
        }
        } catch (err){
            res.status(500).send('Google api error.')
        }
        
    }
    async save(req, res) {
        try {
            const generator = new GoogleUrlGenerator()
        const userEmail = await generator.saveInfo(req.headers.authorization)
        if (userEmail != null) {
            sendResponse(res, {
                status: 200,
                msg: "Successfully",
                data: {
                    user: userEmail
                }
            })
        }
        else {
            sendResponse(res, {
                status: 400,
                msg: "Error",
                data: {
                    user: userEmail
                }
            })
        }
        } catch (err){
            res.status(500).send('Google api error.')
        }
        
    }

    
}
module.exports.AuthController = AuthController