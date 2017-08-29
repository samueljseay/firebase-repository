const firebase = require('firebase')
const config = require('./config')
const Model = require('../src/model')
const Repository = require('../src/repository')

firebase.initializeApp(config)

const Fish = new Model({
  paths: {
    all: 'fish',
    byID: 'fish/{id}'
  },
  softDelete: true,
  schema: {
    name: {
      defaultValue: 'unknown'
    },
    length: {
      defaultValue: 'unknown'
    },
    color: {
      defaultValue: 'unknown'
    }
  }
})

const ExampleRepo = new Repository(firebase.database())

ExampleRepo.onChildAdded(Fish.all(), (fish) => {
  console.log(fish)
})

ExampleRepo.onValue(Fish.byID({ id: '-KsIerpk2pBVdsGgkXWq' }), (fish) => {
  console.log('*** fish by id ***')
  console.log(fish)
})
