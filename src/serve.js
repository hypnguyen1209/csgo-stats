const express = require('express')
const steamRouter = require('./router/steam.router')
const csgoRouter = require('./router/csgo.router')
const faceitRouter = require('./router/faceit.router')
const app = express()
app.use('/steam', steamRouter)
app.use('/csgo', csgoRouter)
app.use('/faceit', faceitRouter)

app.listen(3400, () => {
    console.log('Running....')
})