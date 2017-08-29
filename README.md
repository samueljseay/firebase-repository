# Firebase Repository Experiment

## Description

The aim of this experiment is to explore how I'd create a set of API's for a reusable set of Firebase models across projects, and also support features like soft-delete, simple relationship look ups and integrate
the features of things like Querybase to allow more complicated queries.

An API like that of Elixir's Ecto is attractive as it deals with some of the issues and coupling that Active Record suffers from.

## API

```javascript
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

// Red Cod will be created with a default value of 'unknown' for the length property
ExampleRepo.push(Fish, { name: 'Red Cod', color: 'red' }).then(() => {
  console.log('done')
})
```

## TODO

1. Define an API for custom querying of models (could/should we support Querybase?)
3. What else do schemas do? provide ways to support more rich data types? How does validation look?
