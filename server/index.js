const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())

app.use(cors())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // or "*" for any origin
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
  

const db = require("./models")

// routers
const userRouter = require('./routes/users')
app.use("/users", userRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server started on port 3001")
    })

})
