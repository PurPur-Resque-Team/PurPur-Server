const resUtil = require('../module/responseUtil');
const resMsg = require('../module/resMsg');
const statCode = require('../module/statusCode');
const jwt = require('../module/jwt');
const models = require('../models');
const ISLANDS_COUNT = 4;
const ISLANDS_NAME_ARRAY = ["푸르르섬", "꽁꽁섬", "풍덩섬","빽빽섬"]
const PURR_ISLAND_ANIMALS_NAME_ARRAY = ["토리", "고미", "폭시", "두두", "더기", "푸푸리"];
const ANIMAL_MISSION_COUNT = 5;
const MISSIONS = ["부모님과 함께 분리수거 하기","집 나갈 때 불끄기","양치할 때 물끄기","음식 남기지 않기","길에 쓰레기 버리지 않기"];
/**
 * 1. 토끼 -> 토리 (tori)
2. 곰 -> 고미 (gomi)
3. 여우 -> 폭시 (foxy)
4. 두더지 -> 두두 (dudu)
5. 오리 -> 더기 (ducky)
6. 풀 -> 푸푸리 (pupuri)
 */

module.exports = {
    signup: async (req, res) => {
        const { userName } = req.body;
        
        try {
            if (!userName) {
                res.status(statCode.BAD_REQUEST).send(resUtil.successFalse(statCode.BAD_REQUEST, resMsg.NULL_VALUE));
                throw "NULL VALUE"
            }
            let addUser =( await models.users.create({ userName})).dataValues;
            let {userIdx} = addUser;
            let {token} = await jwt.sign(addUser);
            console.log(`userIdx : ${userIdx}`);
            for(var i = 0 ; i < ISLANDS_COUNT; i++) {
                let isOpened = i == 0 ? 1 : 0;
                let addIsland = (await models.islands.create({islandName : ISLANDS_NAME_ARRAY[i], islandProgress : 0, islandStatus : 0,isOpened})).dataValues;
                let {islandIdx} = addIsland;
                await models.users_islands.create({fk_userIdx : userIdx, fk_islandIdx : islandIdx});
                if(i == 0) {
                    for(var j = 0 ; j < PURR_ISLAND_ANIMALS_NAME_ARRAY.length; j++) {
                        let addAnimals = (await models.animals.create({animalName : PURR_ISLAND_ANIMALS_NAME_ARRAY[j], animalMissionCount : ANIMAL_MISSION_COUNT, animalProgress : 0, animalStatus : 0})).dataValues;
                        let {animalIdx} = addAnimals;
                        await models.islands_animals.create({fk_animalIdx : animalIdx, fk_islandIdx : islandIdx});
                        for(var k = 0 ; k < MISSIONS.length; k++) {
                            let addMissions = (await models.missions.create({fk_animalIdx : animalIdx, isCleared : 0, missionContent : MISSIONS[k]}));
                        }
                        
                    }
                }
            }
            res.status(statCode.OK).send(resUtil.successTrue(statCode.OK, resMsg.SIGN_UP_SUCCESS, { userName, token}))
        } catch (exception) {
            console.log(exception);
            return;
        }
    },
    setUserName: async (req, res) => {
        const userIdx = req.decoded.idx;
        const { userName } = req.body;
        try {
            if (!userName) {
                res.status(statCode.BAD_REQUEST).send(resUtil.successFalse(statCode.BAD_REQUEST, resMsg.NULL_VALUE));
                throw "NULL VALUE"
            }
            await models.users.update({ userName }, { where: { userIdx } })
            res.status(statCode.OK).send(resUtil.successTrue(statCode.OK, resMsg.SET_NAME_SUCCESS, { userIdx }));
        } catch (exception) {
            console.log('exception : ' + exception);
            return;
        }
    },
    
}