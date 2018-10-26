import Readline from './service/readline'
import DB from './service/dbConnection'

const crypto = require('crypto')

let dbQuestion = new Readline()
let Database = new DB()
const secret = 'crypto.randumbytes(32).crypto.ra';

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

let streamListener = (connection, options) => {
  let promisArray = []
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${options[5]}`)
      .on('error', (err) => {
        reject(err)
      })
      .on('result', function (row) {
        processRow(row.GscName).then(res => {
          connection.query(`UPDATE gscnames SET GscName = '${res}' Where GscID = ${row.GscID}`, function (err, result) {
            if (err) {
              console.log(err)
            }
          })
        })
      })
      .on('end', () => {
        Promise.all(promisArray)
          .then(res => {
            console.log('done')
          })
      })
  })
}

function processRow (row) {
  const IV = Buffer.from(crypto.randomBytes(16))
  const cipher = crypto.createCipheriv('aes-256-ctr', secret, IV)
  let encrypted = cipher.update(row, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  let encryptedTXT = IV.toString('hex') + '-' + encrypted
  return Promise.resolve(encryptedTXT)
}

async function main () {
  let dbConfig = await ask(dbQuestions)
  let conObj = makeConfigObject(dbConfig)
  let connection = await makeConnection(conObj)
  let test = await streamListener(connection, dbConfig)
  dbQuestion.close()
}

main()