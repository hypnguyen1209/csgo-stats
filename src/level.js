module.exports = (profileData) => {
    return profileData.match(/class=\"friendPlayerLevelNum\">(.+?)<\/span>/m)[1]
}