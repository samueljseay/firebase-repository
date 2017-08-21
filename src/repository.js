
class Repository {
  constructor (database) {
    if (!database) {
      throw new Error('You must pass a database')
    }
    this.database = database
  }

  onChildAdded (model, callback, errorCallback) {
    // TODO the model can be responsible for creating refs
    const ref = this.database.ref(model.path)
    let queryRef = ref

    if (model.config.softDelete) {
      queryRef = queryRef.orderByChild('deleted').equalTo(false)
    }

    queryRef.on('child_added', (child) => {
      const val = Object.assign({}, child.val(), {key: child.key})
      callback(val)
    }, (error) => {
      errorCallback(error)
    })

    return ref
  }
}

module.exports = Repository
