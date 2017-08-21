# Firebase Repository Experiment

## Description

The aim of this experiment is to explore how I'd create a set of API's for a reusable set of Firebase models across projects, and also support features like soft-delete, simple relationship look ups and integrate
the features of things like Querybase to allow more complicated queries.

An API like that of Elixir's Ecto is attractive as it deals with some of the issues and coupling that Active Record suffers from.

## Method

Using Node.js for the initial experiment because it makes experimentation faster and easier, but the goal is to support Web and Node.js

## API

```javascript
import firebase from 'my-firebase-setup'
import { Repository, Model } from 'firebase-repo'

const MyRepository = new Repository(firebase)

const Video = new Model({
  path: 'videos',
  softDelete: true
})

MyRepository.onChildAdded(Video, (video) => { /*do stuff*/ })
```

(See `example/index.js`)

## TODO

1. Define an API for custom querying of models (how could we support query base?)
2. Define an API for database paths that have dynamic params
3. What do schemas do? provide ways to support more rich data types? How does validation look?
