const koa = require("koa")
const Router = require("koa-router")
const mongoose = require("mongoose")
const db = require("./config/key").mongoURI
const api = require("./routes/api")
// middleware
const bodyParser = require("koa-bodyparser")
const cors = require("koa2-cors") // 跨域
const passport = require("koa-passport")

const app = new koa()
const router = new Router()
const port = process.env.PORT || 9090

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("connected")
  })
  .catch(err => {
    console.log(`err: ${err}`)
  })
// router
router.use(api)

require("./config/passport")(passport)

app
  .use(
    cors({
      origin: function(ctx) {
        return "*"
      },
      exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
      maxAge: 5,
      credentials: true,
      allowMethods: ["GET", "POST", "DELETE"],
      allowHeaders: ["Content-Type", "Authorization", "Accept"]
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, () => {
    console.log(`listent in ${port}`)
  })
