const axios = require('axios')

const searchNickname = async (uid) => {
    let result = await axios.get(`https://api.faceit.com/search/v1/?limit=3&query=${uid}`)
    let { data } = await result
    return await data.payload.players.results[0].nickname
}

const getStats = async (nickname) => {
    let result = await axios.get(`https://api.faceit.com/core/v1/nicknames/${nickname}`)
    let { data } = await result
    return await data

}

const faceit = async (path) => {
    if (!path.includes('steamcommunity.com')) {
        let result = await searchNickname(path)
        result = await getStats(result)
        return await result
    } else if (path.includes('steamcommunity.com')) {
        if (path.includes('/profiles/')) {
            let result = await searchNickname(path.match(/(\d)+/)[0])
            result = await getStats(result)
            return await result
        } else {
            let result = await axios.get(path)
            let { data } = await result
            if (!data.includes('The specified profile could not be found')) {
                let id = data.match(/\"steamid\":\"(.+?)\"/m)[1]
                result = await searchNickname(id)
                result = await getStats(result)
                return await result
            } else {
                return await null
            }
        }
    }
}

module.exports = faceit