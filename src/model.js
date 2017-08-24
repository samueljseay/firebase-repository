
class Model {
  constructor (config) {
    this.config = config
    this.schema = config.schema
    this.path = config.path
  }

  softDeleteKey () {
    return this.config.softDelete ? { deleted: false } : { }
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
    const key = data.key ? { key: data.key } : {}
    const dataValue = data.val ? this.valueSchema(data.val()) : this.valueSchema(data)
    return Object.assign({}, dataValue, key, this.softDeleteKey())
  }
}

module.exports = Model
