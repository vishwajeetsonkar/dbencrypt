<<<<<<< HEAD
import Readline from './service/readline'
import DB from './service/dbConnection'
const crypto = require('crypto')

let dbQuestion = new Readline()
let Database = new DB()
const secret = 'abcdefg'

let dbQuestions = [
  'Host :- ',
  'User :- ',
  'Password :- ',
  'Database :- ',
  'Port :- ',
  'Table Name :- ',
  'Column Name :- '
]

let dbConfig = []
let Tables = []
async function ask (questions) {
  for (const question of questions) {
    let ans = await dbQuestion.askQuestion(question)
    dbConfig.push(ans)
  }
  dbQuestion.close()
  return dbConfig
}

function makeConfigObject (dbConfig) {
  let obj = Database.makeConnectionObject(dbConfig)
  return obj
}

async function makeConnection (conObj) {
  return Database.getConnection(conObj)
}

// async function getAllTables (connection) {
//   return new Promise ((resolve, reject) => {
//     connection.query('SHOW TABLES', (err, rows) => {
//       if (err) {
//         reject(err)
//       }
//       resolve(rows)
//     })
//   })
// }

// async function getColumnData(connection, inputData) {
//   return new Promise((resolve, reject) => {
//     connection.query(`SELECT ${inputData[6]} FROM ${inputData[5]}`, (err, rows) => {
//       if (err) {
//         reject(err)
//       }
//       resolve(rows)
//     })
//   })
// }

let streamListener = (connection, options) => {
  let promisArray = []
  return new Promise((resolve, reject) => {
    connection.query(`SELECT ${options[6]} FROM ${options[5]}`)
      .on('error', (err) => {
        reject(err)
      })
      .on('result', function (row) {
        promisArray.push(processRow(row))
      })
      .on('end', () => {
        Promise.all(promisArray)
          .then(res => {
            resolve(res)
          })
      })
  })
}

function processRow (row) {
  const cipher = crypto.createCipher('aes-256-ctr', secret)
  let encrypted = cipher.update(row.password, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

async function main () {
  let dbConfig = await ask(dbQuestions)
  let conObj = makeConfigObject(dbConfig)
  let connection = await makeConnection(conObj)
  // let tables = await getAllTables(connection)
  let test = await streamListener(connection, dbConfig)
  console.log(test)
}

main()
=======
import DB from './service/readline'

let dbQuestion = new DB()
let dbQuestions = [
  'Database Name :- ',
  'User :- ',
  'Password :- ',
  'Port :- '
]

let dbConfig = []

async function ask(questions) {
  for (const question of questions) {
    let ans = await dbQuestion.askQuestion(question)
    dbConfig.push(ans);
  }
  dbQuestion.close();
}

ask(dbQuestions)

module.exports = dbConfig
>>>>>>> 8b735d3abf579c716a3e7d81ae15bd94d1f96f4b
