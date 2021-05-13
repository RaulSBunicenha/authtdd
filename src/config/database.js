const resolve = require('path').resolve

module.exports = {
  storage: resolve(__dirname, '../../', 'sqlite/database.sqlite'),
  dialect: 'sqlite',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
