const Router = require("koa-router")
const router = new Router()
const user = require("./user")
const home = require("./home")

router.use(user)
router.use(home)

module.exports = router.routes()
