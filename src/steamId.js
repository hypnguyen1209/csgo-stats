const axios = require('axios')
const validate = require('./validate')
const levelSteam = require('./level')

module.exports = async (path) => {
    path = validate(path)
    if (path) {
        let result = await axios.get(`https://steamcommunity.com${path}`)
        let { data } = await result
        if (!data.includes('The specified profile could not be found')) {
            let id = data.match(/\"steamid\":\"(.+?)\"/m)[1]
            let level = levelSteam(data)
            return await { id, level }
        } else {
            return null
        }
    } else {
        return null
    }
}