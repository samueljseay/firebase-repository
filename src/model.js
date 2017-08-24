
class Model {
  constructor (config) {
    this.config = config
    this.schema = config.schema
    this.path = config.path
  }

  valueSchema (data) {
    if (this.schema) {
      return Object.keys(this.schema).reduce((valSchema, key) => {
        const schemaConfig = this.schema[key]
        const defaultValue = schemaConfig && schemaConfig.defaultValue !== undefined ? schemaConfig.defaultValue : null
        valSchema[key] = data[key] || defaultValue
        return valSchema
      }, {})
    } else {
      return data
    }
  }

  generateValue (data) {
    return Object.assign({}, this.valueSchema(data.val()), { key: data.key })
  }
}

module.exports = Model
