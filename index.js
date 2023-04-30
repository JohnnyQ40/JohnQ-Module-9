const fs = require('fs');
const inquirer = require('inquirer');

const questions = [
    {
        type: 'list',
        name: 'choices',
        message: 'Which section of the README would you like to update?',
        choices: [
            'Title',
            'Description',
            'Installation',
            'Usage',
            'Contributing',
            'Tests',
            'License',
            'I am done updating the README'
        ]
    },

    {
        type: 'input',
        name: 'title',
        message: 'What is title of your project?',
        when: (answers) => answers.choices === 'Title'

    },

    {
        type: 'input',
        name: 'description',
        message: 'What is the description of your project?',
        when: (answers) => answers.choices === 'Description'

    },

    {
        type: 'input',
        name: 'installation',
        message: 'What is installation of your project?',
        when: (answers) => answers.choices === 'Installation'

    },


    {
        type: 'input',
        name: 'usage',
        message: 'What is the usage of your project?',
        when: (answers) => answers.choices === 'Usage'

    },

    {
        type: 'input',
        name: 'contributing',
        message: 'What is the contributing of your project?',
        when: (answers) => answers.choices === 'Contributing'

    },
    {
        type: 'input',
        name: 'tests',
        message: 'What is the tests of your project?',
        when: (answers) => answers.choices === 'Tests'

    },
    {
        type: 'input',
        name: 'license',
        message: 'What is the license of your project?',
        when: (answers) => answers.choices === 'License'

    },
]
//TODO: Find way to loop prompt in order to go back and change multiple sections
inquirer.prompt(questions).then(answers => {
    if (answers.choices === 'I am done updating the README') {
        return;
    }
    const data = [
        'Title:', '',
        'Description:', '',
        'Installation:', '',
        'Usage:', '',
        'Contributing:', '',
        'Tests:', '',
        'License:', ''
    ];

    switch (answers.choices) {
        case 'Title':
            data[1] = answers.title + '\n';
            break;
        case 'Description':
            data[3] = answers.description + '\n';
            break;
        case 'Installation':
            data[5] = answers.installation + '\n';
            break;
        case 'Usage':
            data[7] = answers.usage + '\n';
            break;
        case 'Contributing':
            data[9] = answers.contributing + '\n';
            break;
        case 'Tests':
            data[11] = answers.tests + '\n';
            break;
        case 'License':
            data[13] = answers.license+ '\n';
            break;
    }
    fs.writeFileSync('README.md', data.join('\n'));
    //TODO: function to execute git push to github
});