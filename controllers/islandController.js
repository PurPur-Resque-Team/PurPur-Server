const resUtil = require('../module/responseUtil');
const resMsg = require('../module/resMsg');
const statCode = require('../module/statusCode');
const jwt = require('../module/jwt');
const models = require('../models');

module.exports = {
    getIslands: async (req, res) => {

        let { islandIdx } = req.query;
        if (islandIdx == undefined) {
            let userIdx = req.decoded.idx;
            let getIslands = (await models.islands.findAll({
                attributes: [
                    "islandIdx", "islandName", "islandProgress", "isOpened", "islandStatus"
                ],
                include: {
                    model: models.users,
                    where: { userIdx },
                    through : {attributes : []}
                }
            }))
            let islands = getIslands.map((curr) => {
                delete curr.dataValues["users"];
                return curr.dataValues
            });
            res.status(statCode.OK).send(resUtil.successTrue(statCode.OK, resMsg.GET_ISLANDS_LIST_SUCCESS, islands));
            return;
        }
        console.log(islandIdx)
        let islandInfo = (await models.islands.findOne({
            where: { islandIdx },
            attributes: [
                "islandIdx", "islandName", "islandProgress", "isOpened", "islandStatus"
            ],
            include: {
                model: models.animals,
                through : {attributes : []}
            }
        }));
        
        islandInfo.animals = islandInfo.animals.map((curr,index)=>{
            curr.dataValues["animalVerify"]= index;
            return curr;
        })
        res.status(statCode.OK).send(resUtil.successTrue(statCode.OK, resMsg.GET_ISLAND_SUCCESS, islandInfo));
    },

}