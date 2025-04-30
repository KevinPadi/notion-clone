// config/passportGoogle.js
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/user_model.js'
import dotenv from 'dotenv'

dotenv.config()

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Buscar si existe un usuario con el mismo googleId
    let user = await User.findOne({ googleId: profile.id })

    // Si no existe, buscar si ya existe un usuario con el mismo email
    if (!user) {
      user = await User.findOne({ email: profile.emails[0]?.value })

      if (user) {
        // Si existe, vincula la cuenta de Google con el usuario existente
        user.googleId = profile.id
        user.name = profile.displayName
        user.avatar = profile.photos[0]?.value
        await user.save()
      } else {
        // Si no existe, crea un nuevo usuario
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0]?.value,
          avatar: profile.photos[0]?.value,
        })
        await user.save()
      }
    }

    return done(null, user)
  } catch (err) {
    return done(err, null)
  }
}))
