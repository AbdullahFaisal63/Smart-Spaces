const express = require('express')
const app = express()
app.use(express.json())

const db = require("./models")

// routers
const userRouter = require('./routes/users')
app.use("/users", userRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server started on port 3001")
    })

})
