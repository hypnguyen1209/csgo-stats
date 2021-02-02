const express = require('express')
const router = express.Router()
const axios = require('axios')

const steamId = require('../steamId')

const onGetData = async (path) => {
    let result = await steamId(path)
    if (result) {
        let { id } = await result
        result = await axios.get(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=75A6C6C98CB4C53E929FD3C437B15CA3&steamid=${id}`)
        let { data } = await result
        let stats = await data.playerstats.stats.map(item => {
            let { name, value } = item
            return {
                [name]: value
            }
        })
        let statsCall = {}
        for(let i = 0; i < stats.length; i++) {
            statsCall[Object.keys(stats[i])] = Object.values(stats[i])[0]
        }
        await console.log(statsCall)
        return await {status: true, data: {
            steamUid: id,
            kda: statsCall.total_kills/statsCall.total_deaths,
            total_headeshot: statsCall.total_kills_headshot,
            total_planted_bombs: statsCall.total_planted_bombs,
            total_defused_bombs: statsCall.total_defused_bombs,
            total_wins: statsCall.total_wins,
            total_mvps: statsCall.total_mvps,
            rateHeadshot: statsCall.total_kills_headshot/statsCall.total_kills
        }}
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
    await res.json(result)
})

module.exports = router