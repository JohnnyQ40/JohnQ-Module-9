const fs = require('fs');
const inquirer = require('inquirer');

//license options
const licenseChoice = [
    'MIT',
    'Apache 2.0',
    'GPL 3.0',
    'BSD 3-Clause',
    'None'
];
const getBadge = (license) => {
    const badgeLink = {
        'MIT': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
        'Apache 2.0': '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
        'GPL 3.0': '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
        'BSD 3-Clause': '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
        'None': ''
    };
    return badgeLink[license] || '';
};
//questions called via inquirer.prompts
const questions = [
    {
        type: 'list',
        name: 'choices',
        message: 'Which section of the README would you like to update?',
        choices: [
            'githubUsername',
            'email',
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
        name: 'githubUsername',
        message: 'What is your Github username',
        when: (answers) => answers.choices === 'githubUsername'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
        when: (answers) => answers.choices === 'email'
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
        type: 'list',
        name: 'license',
        message: 'What is the license of your project?',
        choices: licenseChoice,
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
        case 'githubUsername':
            data.githubUsername = answers.githubUsername;
            break;
        case 'email':
            data.email = answers.email;
            break;
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
            data.licenseBadge = getBadge(answers.license);
            break;
        }
    }
}

    const readmeData = [
        `${data.licenseBadge}`,
        '',
        `# ${data.title || ''}`,
        '',
        `## Description`,
        '',
        `${data.description || ''}`,
        '',
        `## Table of Contents`,
        '',
        `1. [Installation](#installation)`,
        `2. [Usage](#usage)`,
        `3. [License](#license)`,
        `4. [Contributing](#contributing)`,
        `5. [Tests](#tests)`,
        `6. [Questions](#questions)`,
        `## Installation`,
        '',
        `${data.installation || ''}`,
        '',
        `## Usage`,
        `${data.usage || ''}`,
        '',
        `## License`,
        `${data.license || ''}`,
        '',
        `## Contributing`,
        `${data.contributing || ''}`,
        '',
        `## Tests`,
        `${data.tests || ''}`,
        '',
        `## Questions`,
        '',
        `If you have questions you can contact me at:`,
        `- GitHub: [${data.githubUsername}](https://github.com/${data.githubUsername})`,
        `- Email: ${data.email}`,
        '',
    ].join('\n');

    fs.writeFileSync('README.md', readmeData);
};
    //optional TODO: function to execute git push to github
promptUser();