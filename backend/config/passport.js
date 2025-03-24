require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("../config/db"); // Ensure correct database connection

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const name = profile.username;
        const photoUrl = profile.photos[0].value;

        let user = await pool.query("SELECT * FROM users WHERE google_id = $1", [googleId]);

        if (user.rows.length === 0) {
          user = await pool.query(
            "INSERT INTO users (username, email, google_id, photo_url) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, googleId, photoUrl]
          );
        }

        return done(null, user.rows[0]);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    done(null, user.rows[0]);
  } catch (err) {
    done(err, null);
  }
});


module.exports = passport;
