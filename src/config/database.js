require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const resolve = require('path').resolve

const config = {
  dialect: 'sqlite',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}

if (!process.env.DB_SQLITE_TYPE || process.env.DB_SQLITE_TYPE !== 'memory') {
  config.storage = resolve(
    __dirname,
    '../../',
    process.env.DB_STORAGE_FILE || 'sqlite/database.sqlite'
  )
}

module.exports = config
