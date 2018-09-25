import { mysql } from 'mysql'
import { dbConfig } from '../index'

class DatabaseConnection {
  constructor () {
    this.connection
    this.config = dbConfig
  }
  
  getConnection () {
    let connection = mysql.createConnection(this.config)
    // Add events on this connection
    connection.on('error', function (err) {
      console.log('DATABASE_CONNECTION_LOST: The server closed the connection ', err.code ? err : err.stack)
    })

    return connection
  }

  connect () {
    return new Promise((resolve, reject) => {
      if (!this.connection || this.connection.state === 'disconnected') {
        this.connection = this.getConnection()
        log.need('Connecting to database...')
        this.connection.connect((err) => {
          if (err) {
            reject({
              code: 'ISSUE_DB',
              label: 'Unable to make connection with database',
              stack: err.code ? err : err.stack
            })
          }
          resolve(this.connection)
        })
      } else {
        // If we already have a connected instance, send it
        resolve(this.connection)
      }
    })
  }

  // Share current instance
  getInstance () {
    return this.connection
  }
}

module.exports = DatabaseConnection
