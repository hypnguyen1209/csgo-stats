module.exports = (path) => {
    if (!path.includes('steamcommunity.com')) {
        if (path.match(/^(\d)+$/)) {
            return `/profiles/${path}`
        } else {
            return `/id/${path}`
        }
    } else if (path.includes('steamcommunity.com')) {
        if (path.includes('/profiles/')) {
            return `/profiles/${path.match(/(\d)+/)[0]}`
        } else {
            return `/id/${path.split('steamcommunity.com/id/').reverse()[0]}`
        }
    } else {
        return null
    }
}