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
  path: 'fish',
  softDelete: true,
  // At the moment the schema is mainly just to ensure all
  // records have the same properties, you can also set default
  // values for properties that haven't been set. if you don't
  // provide a defaultValue the property will be set to null
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

// Red Cod will be created with a default value of 'unknown' for the length property
ExampleRepo.push(Fish, { name: 'Red Cod', color: 'red' }).then(() => {
  ExampleRepo.onChildAdded(Fish, (fish) => {
    // If a record comes back from the db that does not have a prop from the
    // schema it will also be populated with default values, this allows your
    // data to become more consistent over time by updating records with default
    // values. However this may be the kind of thing that leads to unusual behaviour
    // you may not have considered in your app. null may most often be the right
    // defaultValue for a field. If your field in the schema does not have a defaultValue
    // set, we use null anyway.
    console.log(fish)
  }, (error) => {
    console.log(error)
  })
})
```

## TODO

1. Define an API for custom querying of models (could/should we support Querybase)
2. Define an API for database paths that have dynamic params
3. What else do schemas do? provide ways to support more rich data types? How does validation look?
