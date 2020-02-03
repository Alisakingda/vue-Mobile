const Router = require("koa-router")
const router = new Router()
const Models = require("../../models")

// middleware
const utility = require("utility") // 密码加密
const gravatar = require("gravatar") // 全球公认头像
const jwt = require("jsonwebtoken") // token

/**
 * @post /api/user/register
 * @description register
 * @access public
 */
router.post("/api/user/register", async ctx => {
  const findResult = await Models.userModel.find({
    email: ctx.request.body.email
  })
  if (findResult.length > 0) {
    ctx.status = 200
    ctx.body = {
      msg: "邮箱已经被占用",
      data: { email: ctx.request.body.email },
      code: 0
    }
    return false
  } else {
    // md5 加密;
    let password = utility.md5(ctx.request.body.password)
    let avatar = gravatar.url(ctx.request.body.email, {
      s: "200",
      r: "pg",
      d: "mm"
    })

    let data = {
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password,
      avatar
    }

    // 写入数据,mongoose to mongodb
    const newUser = new Models.userModel({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password,
      avatar
    })

    await newUser
      .save()
      .then(res => {
        ctx.status = 200
        ctx.body = {
          msg: "注册成功",
          data: res,
          code: 1
        }
      })
      .catch(err => {
        console.info(err)
      })
  }
})

/**
 * @post /api/user/login
 * @description login
 * @access public
 */
router.post("/api/user/login", async ctx => {
  const findResult = await Models.userModel.find({
    email: ctx.request.body.email
  })
  if (findResult.length == 0) {
    ctx.status = 200
    ctx.body = {
      msg: "用户不存在",
      data: {},
      code: 0
    }
  } else {
    let password = ctx.request.body.password
    if (utility.md5(password) === findResult[0].password) {
      //login succeed;
      let user = findResult[0]
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        avater: user.avater
      }
      const token = jwt.sign(payload, "secret", { expiresIn: 3600 })

      ctx.status = 200
      ctx.body = {
        msg: "登录成功",
        data: {},
        code: 1,
        token: `Bearer ${token}`
      }
    } else {
      ctx.status = 200
      ctx.body = {
        msg: "用户密码错误",
        data: {},
        code: 0
      }
    }
  }
})

/**
 * @description test
 */
router.get("/api/user/test", async ctx => {
  ctx.status = 200
  ctx.body = {
    msg: "test"
  }
})

module.exports = router.routes() // exports;
