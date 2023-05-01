const fs = require('fs');
const inquirer = require('inquirer');

//questions called via inquirer.prompts
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
//async funciton which allows user to change multiple aspects of the readme before submitting
const promptUser = async () => {
    let finished = false;
    const data = {};

//while loop until "I am done" is selected
    while (!finished) {
const answers = await inquirer.prompt(questions);

    if (answers.choices === 'I am done updating the README') {
        finished = true;
    } else {
    switch (answers.choices) {
        case 'Title':
            data.title = answers.title;
            break;
        case 'Description':
            data.description = answers.description;
            break;
        case 'Installation':
            data.installation = answers.installation;
            break;
        case 'Usage':
            data.usage = answers.usage;
            break;
        case 'Contributing':
            data.contributing = answers.contributing;
            break;
        case 'Tests':
            data.tests = answers.tests;
            break;
        case 'License':
            data.license = answers.license;
            break;
        }
    }
}

    const readmeData = [
        `# ${data.title || ''}`,
        '',
        `## Description: ${data.description || ''}`,
        '','---','',
        `## Installation: ${data.installation || ''}`,
        '','---','',
        `## Usage: ${data.usage || ''}`,
        '','---','',
        `## Contributing: ${data.contributing || ''}`,
        '','---','',
        `## Tests: ${data.tests || ''}`,
        '','---','',
        `## License: ${data.license || ''}`,
        ''
    ].join('\n');

    fs.writeFileSync('README.md', readmeData);
};
    //TODO: function to execute git push to github
promptUser();