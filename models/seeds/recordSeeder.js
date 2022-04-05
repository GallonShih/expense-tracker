// use environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require relative js files
const Category = require('../category')
const User = require('../user')
const Record = require('..//record')
const db = require('../../config/mongoose')

// require relative data
const userList = require('./user.json').result
const recordList = require('./record.json').result

// put seed data into db
db.once('open', () => {
  const userPromises = []
  userList.forEach(function (seedUser) {
    userPromises.push(
      User.findOne({ email: seedUser.email })
        .then(user => {
          if (user) {
            console.log(`Seed User ${seedUser.email} already exists.`)
            return user
          } else {
            console.log(`Start creating seed user ${seedUser.email}.`)
            return User.create({
                name: seedUser.name,
                email: seedUser.email,
                password: seedUser.password
            })
          }
        })
        .then(user => {
          const recordListSub = recordList.filter(function (record) {
            return record.userName === user.name
          })
          const recordPromises = []
          recordListSub.forEach(function (record) {
            record.userId = user._id
            recordPromises.push(
              Category.findOne({ name: record.categoryName })
              .then(category => {
                if (category) {
                  record.categoryId = category._id
                  return Record.create(record)
                }
              })
            )
          })
          return Promise.all(recordPromises)
        })
    )
  })
  Promise.all(userPromises)
    .then(() => {
      console.log('recordSeeder done.')
      process.exit()
    })
})
