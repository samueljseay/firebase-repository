const firebase = require('firebase')
const config = require('./config')
const Model = require('../src/model')
const Repository = require('../src/repository')

firebase.initializeApp(config)

const Fish = new Model({
  path: 'fish',
  softDelete: true,
  schema: {
    name: {
      defaultValue: null
    },
    length: {
      defaultValue: 'unknown'
    },
    color: {
      defaultValue: ''
    }
  }
})

const ExampleRepo = new Repository(firebase.database())

ExampleRepo.push(Fish, { name: 'Red Cod', color: 'red' }).then(() => {
  ExampleRepo.onChildAdded(Fish, (fish) => {
    console.log(fish)
  }, (error) => {
    console.log(error)
  })
})
