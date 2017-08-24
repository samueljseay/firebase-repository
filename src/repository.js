
class Repository {
  constructor (database) {
    if (!database) {
      throw new Error('You must pass a database')
    }
    this.database = database
  }

  onChildAdded (model, callback, errorCallback) {
    const ref = this.database.ref(model.path)
    let queryRef = ref

    if (model.config.softDelete) {
      queryRef = queryRef.orderByChild('deleted').equalTo(false)
    }

    queryRef.on('child_added', (child) => {
      callback(model.generateValue(child))
    }, (error) => {
      errorCallback(error)
    })

    return ref
  }

  push (model, data) {
    const ref = this.database.ref(model.path)
    return ref.push(model.generateValue(data))
  }
}

module.exports = Repository
