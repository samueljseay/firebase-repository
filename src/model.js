class Model {
  constructor (config) {
    this.config = config
    this.schema = config.schema
    this._paths = config.paths || []
    this._path = config.path || config.paths[config.defaultPath] || ''

    this.generatePaths()
  }

  generatePaths () {
    Object.keys(this._paths).forEach((path) => {
      this[path] = (params) => {
        return this.path(this._paths[path], params)
      }
    })
  }

  path (path, params) {
    let generatedPath

    if (params) {
      const pathKeys = Object.keys(params)
      generatedPath = pathKeys.reduce((acc, key) => {
        return acc.replace(`{${key}}`, params[key])
      }, path)
    } else {
      generatedPath = path
    }

    return new Model(Object.assign({}, this.config, { path: generatedPath }))
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
    if (data.val() !== null) {
      // filter deleted records here as well as in repository
      if (this.config.softDelete && data.val().deleted) {
        return null
      }
      const key = data.key ? { key: data.key } : {}
      const dataValue = data.val ? this.valueSchema(data.val()) : this.valueSchema(data)
      return Object.assign({}, dataValue, key, this.softDeleteKey())
    } else {
      return null
    }
  }
}

module.exports = Model
