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
