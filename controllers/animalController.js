const resUtil = require('../module/responseUtil');
const resMsg = require('../module/resMsg');
const statCode = require('../module/statusCode');
const jwt = require('../module/jwt');
const models = require('../models');
const Sequelize = require('sequelize');
const moment = require('moment-timezone');


module.exports = {
    getAnimalInfo: async (req, res) => {
        try {
            let { animalIdx } = req.query;
            if (!animalIdx) {
                res.status(statCode.BAD_REQUEST).send(resUtil.successFalse(statCode.BAD_REQUEST, resMsg.NULL_VALUE));
                throw "NULL VALUE"
            }
            let animalInfo = await models.animals.findOne({
                where: { animalIdx }
            })
            let missions = await models.missions.findAll({ where: { fk_animalIdx: animalIdx } });
            missions = missions.map((curr) => {
                return curr.dataValues;
            })
            let returnJson = {
                animalInfo, missions
            }
            res.status(statCode.OK).send(resUtil.successTrue(statCode.OK, resMsg.GET_ANIMAL_INFO_SUCCESS, returnJson));
        } catch (e) {
            console.log(e);
            res.status(statCode.FAIL).send(resUtil.successFalse(statCode.FAIL, resMsg.GET_ANIMAL_INFO_FAIL + ", " + e));
            return;
        }
    },
    clearMission: async (req, res) => {
        try {
            let { animalIdx } = req.query;
            let { missionIdx } = req.body;
            if (!animalIdx || !missionIdx) {
                res.status(statCode.BAD_REQUEST).send(resUtil.successFalse(statCode.BAD_REQUEST, resMsg.NULL_VALUE));
                throw "NULL VALUE"
            }
            let updateAnimalProgress = await models.animals.update({
                animalStatus: Sequelize.literal('animalStatus + 1'),
                animalProgress: Sequelize.literal('animalProgress + 34'),
                lastMissionClear: moment().format('YYYY-MM-DD HH:mm:ss'),

            }, { where: { animalIdx } })
            let updateMissionStatus = await models.missions.update({
                isCleared: 1
            }, { where: { missionIdx } })
            let afterAnimalInfo = await models.animals.findOne({
                attributes: ["animalStatus", "animalProgress"]
            })
            res.status(statCode.OK).send(resUtil.successTrue(statCode.OK, resMsg.CLEAR_MISSION_SUCCESS, {
                clearedMissionIdx: missionIdx,
                afterAnimalInfo

            }));
        } catch (e) {
            console.log(e);
            res.status(statCode.FAIL).send(resUtil.successFalse(statCode.FAIL, resMsg.CLEAR_MISSION_FAIL + ", " + e));
            return;
        }
    },
    resetAnimalTest: async (req, res) => {
        let update = await models.animals.update({
            animalStatus: 0,
            animalProgress: 0
        }, {
            where: {
                lastMissionClear : {
                    $lte : moment().subtract(3, 'days')
                }
            }
        })
        let get = await models.animals.findAll({
            where: {
                lastMissionClear : {
                    $lte : moment().subtract(3, 'days').toDate()
                }
            }
        })
        console.log(update)
        console.log(get)
    }
}