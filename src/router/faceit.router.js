const express = require('express')
const router = express.Router()
const axios = require('axios')
const faceit = require('../faceit')

const onGetData = async (path) => {
    let result = await faceit(path)
    if (result) {
        if (result.result == 'ok') {
            let { nickname, country, csgo_name, games, created_at, avatar } = await result.payload
            return await {
                status: true,
                data: {
                    nickname,
                    country,
                    avatar,
                    created_at,
                    csgo_name,
                    skill_level: games.csgo.skill_level,
                    elo: games.csgo.faceit_elo,
                    region: games.csgo.region,
                    game_id: games.csgo.game_id
                }
            }
        } else {
            return await { status: false, message: result.message }
        }
    } else {
        return await { status: false, message: 'Khum tìm thấy profile' }
    }
}
router.get('/:path', async (req, res) => {
    let { path } = req.params
    let result = await onGetData(path)
    res.json(result)
})

module.exports = router