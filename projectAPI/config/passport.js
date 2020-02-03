const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = "secret"
const mongoose = require("mongoose")
const User = mongoose.model("users")

module.exports = passport => {
  // 捕获jwt;
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      await User.findById(jwt_payload.id, (err, user) => {
        if (err) {
          return done(err, false)
        }
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
          // or you could create a new account
        }
      })
    })
  )
}
