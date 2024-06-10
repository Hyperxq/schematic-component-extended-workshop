'use strict';

var inquirer = require('inquirer');

async function askConfirmation(message, defaultResponse) {
    const question = {
        type: 'confirm',
        name: 'confirmation',
        prefix: '',
        message,
        default: defaultResponse
    };
    const { prompt } = inquirer;
    const answers = await prompt([
        question
    ]);
    return answers['confirmation'];
}
async function askQuestion(message, choices, defaultResponseIndex) {
    const question = {
        type: 'list',
        name: 'answer',
        prefix: '',
        message,
        choices,
        default: defaultResponseIndex
    };
    const { prompt } = inquirer;
    const answers = await prompt([
        question
    ]);
    return answers['answer'];
}
async function askChoices(message, choices, defaultValue) {
    const question = {
        type: 'checkbox',
        name: 'answer',
        prefix: '',
        message,
        choices,
        default: defaultValue
    };
    const { prompt } = inquirer;
    const answers = await prompt([
        question
    ]);
    return answers['answer'];
}

exports.askChoices = askChoices;
exports.askConfirmation = askConfirmation;
exports.askQuestion = askQuestion;
