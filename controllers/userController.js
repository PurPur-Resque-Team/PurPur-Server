const resUtil = require('../module/responseUtil');
const resMsg = require('../module/resMsg');
const statCode = require('../module/statusCode');
const jwt = require('../module/jwt');
const models = require('../models');

module.exports = {
    signup: async (req, res) => {
        const { userName } = req.body;
        //const missParameters = await Object.entries({userId, userPw}).filter(it=>it[1]==undefined).map(it=>it[0]).join(',');
        try {
            if (!userName) {
                res.status(statCode.BAD_REQUEST).send(resUtil.successFalse(statCode.BAD_REQUEST, resMsg.NULL_VALUE));
                throw "NULL VALUE"
            }
            await models.users.create({ userName});
            res.status(statCode.OK).send(resUtil.successTrue(statCode.OK, resMsg.SIGN_UP_SUCCESS, { userName }))
        } catch (exception) {
            console.log(exception);
            return;
        }
    },
    
}