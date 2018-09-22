import readline from 'readline';

const AskQuestion = (r1, question) => {
    return new Promise(resolve => {
        r1.question(question, (answer) => {
            resolve(answer);
        });
    });
}

const Ask = (questions) => {
    return new Promise(async resolve => {
        let r1 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let results = [];

        for (let i = 0; i < questions.length; i++) {
            const result = await AskQuestion(r1, questions[i]);
            results.push(result);
        }
        r1.close();
        resolve(results);
    })
}

module.exports = {
    askQuestions: Ask
}