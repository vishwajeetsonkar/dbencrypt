import  mysql  from 'mysql'

class DatabaseConnection {
  constructor () {
    this.connection
  }
  makeConnectionObject(config) {
    return {
      'host': config[0],
      'user': config[1],
      'password': config[2],
      'database': config[3],
      'port': config[4]
    }
  }

  getConnection (obj) {
    let connection = mysql.createConnection(obj)
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
