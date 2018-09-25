import readline from 'readline'

class DatabaseConfig {
  constructor () {
    this.r1 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  askQuestion (question) {
    return new Promise((resolve, reject) => {
      this.r1.question(question, (asnwer, err) => {
        if (err) {
          reject(err)
        }
        resolve(asnwer)
      })
    })
  }

  close () {
    this.r1.close()
  }
}

module.exports = DatabaseConfig
