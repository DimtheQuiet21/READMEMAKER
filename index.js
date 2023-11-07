/* Run the following Code At the start of the application to install inquierer
npm init -y
npm i inquirer@8.2.4
*/

const fs = require('fs');
const inquirer = require('inquirer'); 
const inst_list = [];
const test_list = [];
const list_making = (call,variable,readme) => {
    if (call === "Yes") {
        console.log("Input Required");
        inquirer.prompt([
            {
            type: 'input',
            message: `What is the ${variable} instruction to use your application?`,
            name: 'instruction',
            },
            {
            type: 'list',
            message: 'Are there further instructions?',
            choices: ['Yes','No'],
            name: 'instruction_continue',
            },
        ]).then((inst_response) => {
            if (variable === "installation") {
                inst_list.push('\n'+inst_response.instruction)} 
            else if (variable === "testing") {
                test_list.push('\n'+inst_response.instruction)}
            else {
                console.log ("Instruction Input Error - 1")
            };
            list_making(inst_response.instruction_continue,variable,readme)
        });
    } else if (call === "No") {
        console.log("Recording in Progress")
        if (variable === "installation") {
            if (inst_list == null) {
                inst_list.push("N/A");
                //console.log("No Instructions");
            } else {
                console.log(inst_list)
            };
            //console.log('Recoring approaching Destination');
            inst_list.join(" ")
            return new Promise(() => {list_making(readme.testing_prompt,"testing",readme)});

        } else if (variable === "testing") {
            if (test_list == null) {
                test_list.push("N/A");
                //console.log("No Instructions"); 
            } else {
                console.log(test_list)
            };
            test_list.join(" ")
            return new Promise(() => {create_readme(readme,inst_list,test_list)}); 
        } else {
            console.log("Recoding failure - 3")
        };
    } else {
        console.log("Instruction Terminated")
    };
};  

function readme () {
    return inquirer.prompt([
    { 
        type: 'input',
        message: 'What is your name?',
        name: 'user_name',
    },
    { 
        type: 'input',
        message: 'What is the name of your project?',
        name: 'project_name',
    },
    {
        type: 'input',
        message: 'Please describe your project in 150 words or less!',
        name: 'project_description',
    },
    {
        type: 'list',
        message: 'Does your project require installation?',
        choices: ["Yes", "No"],
        name: 'installation_prompt',
    },
    {
        type: 'input',
        message: 'What is your project'+"'"+'s Usage Information? How are people supposed to use your project?',
        name: 'usage_info',
    },
    {
        type: 'input',
        message: 'What are the Contribution Guidelines? How are people supposed to contribute to the project?',
        name: 'contribution_info',
    },
    {
        type: 'list',
        message: 'Does your project have testing instructions?',
        choices: ["Yes", "No"],
        name: 'testing_prompt',
    },
    {
        type: 'list',
        message: 'What is this project'+"'"+'s license?',
        choices: ["MIT", "GPLv2","GPLv3","Apache","BSD 2-clause","BSD 3-clause","LGPLv3","AGPLv3","Unlicense"],
        name: 'license_prompt',
    },
    { 
        type: 'input',
        message: 'What is the URL to the directory of this project?',
        name: 'URL_name',
    },
    { 
        type: 'input',
        message: 'What is your GitHub Usname?',
        name: 'github_name',
    },
    { 
        type: 'input',
        message: 'What is your public email?',
        name: 'email_name',
    },
    ])
};

function get_license (prompt) {
    if (prompt === "MIT") {   
        return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
    }
    else if (prompt === "GPLv2"){ 
        return `[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)`
    }
    else if (prompt === "GPLv3") {
        return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`
    }
    else if (prompt === "Apache") {
        return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
    }
    else if (prompt === "BSD 2-clause") {
        return `[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`
    }
    else if (prompt === "BSD 3-clause") {
        return `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`
    }
    else if (prompt === "LGPLv3") {
        return `[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)`
    }
    else if (prompt === "AGPLv3") {
        return `[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)` 
    }
    else if (prompt === "Unlicense") {
        return `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`
    }   
    else {console.log("license_error")};
};

function create_readme (readme) {
    
    const chosen_license = get_license(readme.license_prompt);
    const final_readme =
    
`# ${readme.project_name} by ${readme.user_name}

${chosen_license}

## Table of Contents

[Description](#description)

[Installation](#installation)

[Usage Information](#usage-information)

[Testing Instructions](#testing-instructions)

[Deployed Website](#deployed-website)

[Questions?](#questions?)

[Contributing](#contributing)

[License](#license)

## Description 
${readme.project_description}

## Installation
${inst_list}

## Usage Information
${(readme.usage_info)}

## Testing Instructions
${test_list}

## Deployed Website 
Link to ${readme.user_name}'s ${readme.project_name}: ${readme.URL_name}

## Questions?
Link to ${readme.user_name}'s GitHub Repository: ${readme.URL_name}
Please Contact ${readme.user_name} at ${readme.email_name} if you have additional questions.

## Contributing 
${readme.contribution_info}

## License 
The ${readme.license_prompt} was used for the creation and the publication of this Repository and Webpage.
${chosen_license}`
/////////////////////////  
    fs.writeFile('YOUR_README.md', final_readme, (err) =>
    err ? console.error(err) : console.log('Success!')
 );
}; 

function init () {
    readme()
        .then((new_readme) => list_making(new_readme.installation_prompt,"installation",new_readme))
};

init();

