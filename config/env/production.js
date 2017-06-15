'use strict';

/**
 * Expose
 */

module.exports = {
  db: process.env.MONGODB_URI,
  github: {
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://copaviejogasometro.herokuapp.com/auth/github/callback'
  }
};