const resUtil = require('../module/responseUtil');
const resMsg = require('../module/resMsg');
const statCode = require('../module/statusCode');
const jwt = require('../module/jwt');
const models = require('../models');
const Sequelize = require('sequelize');
const PURR_ISLAND_ANIMALS_NAME_ARRAY = ["토리", "고미", "폭시", "두두", "더기", "푸푸리"];

const moment = require('moment-timezone');


module.exports = {
    getAnimalInfo: async (req, res) => {
        try {
            let { animalIdx } = req.query;
            if (!animalIdx) {
                res.status(statCode.BAD_REQUEST).send(resUtil.successFalse(statCode.BAD_REQUEST, resMsg.NULL_VALUE));
                throw "NULL VALUE"
            }
            let animalInfo = (await models.animals.findOne({
                where: { animalIdx }
            })).dataValues
            let animalVerify = PURR_ISLAND_ANIMALS_NAME_ARRAY.indexOf(animalInfo.animalName);
            animalInfo.animalVerify = animalVerify;
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
            console.log(animalIdx)
            let islandIdx = (await models.islands_animals.findOne({
                where: { fk_animalIdx: animalIdx }
            })).dataValues.fk_islandIdx;
            if (!animalIdx || !missionIdx) {
                res.status(statCode.BAD_REQUEST).send(resUtil.successFalse(statCode.BAD_REQUEST, resMsg.NULL_VALUE));
                throw "NULL VALUE"
            }


            let missionInfo = await models.missions.findOne({
                attributes: ["isCleared"],
                where: { missionIdx }
            })
            let animalInfo = await models.animals.findOne({
                attributes: ["animalName", "animalStatus", "animalProgress"],
                where: { animalIdx }
            })
            let islandInfo = await models.islands.findOne({
                attributes: ["islandName", "islandProgress", "isLastProgressEven", "islandStatus"],
                where: { islandIdx }
            })
            let { islandProgress, isLastProgressEven, islandStatus } = islandInfo.dataValues;
            let { animalStatus } = animalInfo.dataValues;
            let { isCleared } = missionInfo.dataValues;
            if (animalStatus == 3 && isCleared == 0) {
                await models.animals.update({
                    lastMissionClear: moment().format('YYYY-MM-DD HH:mm:ss'),
                }, { where: { animalIdx } })
            }

            if (animalStatus < 3 && islandStatus < 2 && isCleared == 0) {
                await models.animals.update({
                    animalStatus: Sequelize.literal('animalStatus + 1'),
                    animalProgress: Sequelize.literal('animalProgress + 34'),
                    lastMissionClear: moment().format('YYYY-MM-DD HH:mm:ss'),
                }, { where: { animalIdx } })

                await models.missions.update({
                    isCleared: 1
                }, { where: { missionIdx } })
                if (isLastProgressEven == 0) {
                    await models.islands.update({
                        islandProgress: Sequelize.literal('islandProgress + 6'),
                        isLastProgressEven: 1
                    }, { where: { islandIdx } })
                }
                else {
                    await models.islands.update({
                        islandProgress: Sequelize.literal('islandProgress + 5'),
                        isLastProgressEven: 0
                    }, { where: { islandIdx } })
                }
                if (islandProgress == 28) {
                    await models.islands.update({
                        islandStatus: Sequelize.literal('islandStatus + 1')
                    }, { where: { islandIdx } })
                }
                if (islandProgress == 61) {
                    await models.islands.update({
                        islandStatus: Sequelize.literal('islandStatus + 1')
                    }, { where: { islandIdx } })
                }
            }
            let afterAnimalInfo = await models.animals.findOne({
                attributes: ["animalName", "animalStatus", "animalProgress"],
                where: { animalIdx }
            })
            let afterIslandInfo = await models.islands.findOne({
                attributes: ["islandName", "islandProgress", "islandStatus"],
                where: { islandIdx }
            })
            res.status(statCode.OK).send(resUtil.successTrue(statCode.OK, resMsg.CLEAR_MISSION_SUCCESS, {
                clearedMissionIdx: missionIdx,
                afterAnimalInfo,
                afterIslandInfo
            }));
        } catch (e) {
            console.log(e);
            res.status(statCode.FAIL).send(resUtil.successFalse(statCode.FAIL, resMsg.CLEAR_MISSION_FAIL + ", " + e));
            return;
        }
    }
}