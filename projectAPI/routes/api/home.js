const Router = require("koa-router")
const router = new Router()

// middleware
const passport = require("koa-passport")
const jwtValidator = passport.authenticate("jwt", { session: false })

/**
 * @get
 * @description home
 * @access privide
 */
router.get("/api/user/test", async ctx => {
  ctx.status = 200
  ctx.body = {
    msg: "test"
  }
})

router.get(
  "/api/home",
  // 私有接口产出
  jwtValidator,
  async ctx => {
    ctx.status = 200
    ctx.body = {
      msg: "home",
      data: {
        id: ctx.state.user.id,
        name: ctx.state.user.name,
        email: ctx.state.user.email,
        avatar: ctx.state.user.avatar
      },
      code: 1
    }
  }
)

module.exports = router.routes() // exports;
