const { askQuestions } = require('./ask');
const connection = {};

let connectionQuestion = [
    'Name to database to encrypt. ',
    'Username ? ',
    'password ',
    'port number '
];

askQuestions(connectionQuestion)
    .then(answers => {
        // Do whatever you like with the array of answers
        connection.db = answers[0];
        connection.user = answers[1];
        connection.password = answers[2];
        connection.port = answers[3];
        console.log(connection);
    });