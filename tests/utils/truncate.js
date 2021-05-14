const { sequelize } = require('../../src/app/models')

module.exports = () => {
  return Promise.all(
    Object.keys(sequelize.models).map(modelKey => {
      return sequelize.models[modelKey].destroy({ truncate: true, force: true })
    })
  )
}
