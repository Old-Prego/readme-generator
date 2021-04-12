const inquirer = require('inquirer');
const fs = require('fs');

var readmeData;
var readmeTitle;
var licenseTag;
var githubLink;

function questions(){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'user',
                message: 'What is your Github username?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email address?',
            },
            {
                type: 'input',
                name: 'title',
                message: 'What would you like the project title to be?',
            },
            {
                type: 'input',
                name: 'description',
                message: 'Type out a brief description of your project.',
            },
            {
                type: 'input',
                name: 'install',
                message: 'Give a description of the steps needed to install your project.',
            },
            {
                type: 'input',
                name: 'usage',
                message: 'What will this project be used for?',
            },
            {
                type: 'list',
                name: 'license',
                message: 'What license would you like for your project?',
                choices: ['BSD', 'MIT', 'GPL'],
            },
            {
                type: 'input',
                name: 'contribute',
                message: 'What is required to contribute to your project?',
            },
            {
                type: 'input',
                name: 'test',
                message: 'What is a good way to test your project?',
            },
        ])
        .then((data) => {

            switch(data.license){
                case "BSD":
                    licenseTag = "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
                    break;
                case "MIT":
                    licenseTag = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
                    break;
                case "GPL":
                    licenseTag = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
                    break;
            }

            githubLink = "[" + data.user + "](https://github.com/" + data.user + ")";

            readmeTitle = data.title;

            readmeData = `
                # ${data.title}

                ${licenseTag}
                
                ## Table of Contents   
                - [${data.title}](#datatitle)
                - [Table of Contents](#table-of-contents)
                - [Description](#description)
                - [Installation](#installation)
                - [Usage](#usage)
                - [License](#license)
                - [Contribution](#contribution)
                - [Testing](#testing)
                - [Questions](#questions)
                - [Github](#github)
                
                ## Description  
                ${data.description}  
                
                ## Installation
                ${data.install}
                
                ## Usage
                ${data.usage}
                
                ## License
                This project is covered by a ${data.license} license.
                
                ## Contribution
                ${data.contribute}
                
                ## Testing
                ${data.test}
                
                ## Questions
                If you have any further questions, please reach out to me at ${data.email}
                
                ## Github
                ${githubLink}
            `;

            writeFile(readmeTitle,readmeData);
        });
}

function writeFile(readmeTitle,readmeData){

    var title = readmeTitle + ".md";

    fs.writeFile(title,readmeData, (err) =>
    err ? console.log(err) : console.log('New README file exported!')
    );
}