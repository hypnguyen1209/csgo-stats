const express = require('express')
const axios = require('axios')
const router = express.Router()

const steamId = require('../steamId')

const onGetData = async (path) => {
    let result = await steamId(path)
    if (result) {
        let { id, level } = await result
        result = await Promise.all([
            axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=75A6C6C98CB4C53E929FD3C437B15CA3&steamids=${id}`),
            axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v1/?key=75A6C6C98CB4C53E929FD3C437B15CA3&steamids=${id}`)
        ])
        let [banPlayer, infoPlayer] = await result
        banPlayer = await banPlayer.data.players[0]
        infoPlayer = await infoPlayer.data.response.players.player[0]
        infoPlayer.level = level
        return await {
            status: true,
            banPlayer,
            infoPlayer,
        }
    } else {
        return await {
            status: false,
            message: 'Khum tìm thấy profile'
        }
    }
}
router.get('/:path', async (req, res) => {
    let { path } = req.params
    let result = await onGetData(path)
    if (result.status) {
        let { status, banPlayer, infoPlayer } = await result
        res.json({
            status, data: {
                banPlayer,
                infoPlayer
            }
        })
    } else {
        let { status, message } = await result
        res.json({
            status, message
        })
    }

})

module.exports = router