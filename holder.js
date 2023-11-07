/* Run the following Code At the start of the application to install inquierer
npm init -y
npm i inquirer@8.2.4
*/

const fs = require('fs');
const inquirer = require('inquirer');
const inst_list = [];
const test_list = [];

const list_making = async (call,variable) => {
    if (call === "Yes") {
        console.log("Input Required");
        //console.log(response, "testing-first");
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
                inst_list.push(inst_response.instruction)}
            else if (variable === "testing") {
                test_list.push(inst_response.instruction)};
            list_making(inst_response.instruction_continue,variable);
        });
    } else if (call === "No") {
        console.log("Recording in Progress")
        if (variable === "installation") {
            if (inst_list == null) {
                inst_list.push("N/A");
                console.log("No Instructions");
            };
            console.log('Recoring approaching Destination');
        } else if (variable === "testing") {
            if (test_list == null) {
                test_list.push("N/A");
                console.log("No Instructions");
            };
        };
    };
};

function readme () {
    return inquirer.prompt([
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
            message: 'What is your projects Usage Information? How are people supposed to use your project?',
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
            name: 'testing_prompt',
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
    ]);
};

async function show_me (call) {console.log (call)};

async function init () {
    readme().then(async (new_readme) => {
        const new_inst = await list_making(new_readme.installation_prompt,"installation");
        const new_test = await list_making(new_readme.testing_prompt,"testing");
    });

};

init();
/*fs.write('README.md', `${process.argv[2]}\n`, (err) =>
  // TODO: Describe how this ternary operator works
  err ? console.error(err) : console.log('Commit logged!')
);*/