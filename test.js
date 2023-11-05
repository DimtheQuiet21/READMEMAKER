
const list = [];
const questionaire = response; // store the response as an object
console.log(questionaire);


const list_making = (call,variable) => {
    if (call === "Yes") {
        console.log("Instructions Required")
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
            list.push(inst_response.instruction);
            list_making(inst_response.instruction_continue,variable);
        });
} else if (call === "No") {
    if (list == null) {
        list.push("N/A");
        console.log("No Instructions");
    } else {
        if (variable === "installation") {
            console.log(list);
            response.install_inst = list;
        } else if (variable === "testing") {
            response.testing_inst = list;
        };
    };
}};

const clearlist = (list) => {
    list = []; // Resets the list so we can append the next set of instructions
};

await list_making(response.installation_prompt,"installation");
await clearlist(list);
await list_making(response.installation_prompt,"testing");





const list_making = (call,variable,response) => {
    if (call === "Yes") {
        console.log("Instructions Required")
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
            list.push(inst_response.instruction);
            list_making(inst_response.instruction_continue,variable);
        });
    } else if (call === "No") {
        if (variable === "installation") {
            if (list == null) {
                list.push("N/A");
                console.log("No Instructions");
            };
            console.log(list);
            console.log(response);
            console.log(typeof response);
            response.install_inst = list;
            return response;
        } else if (variable === "testing") {
            if (list == null) {
                list.push("N/A");
                console.log("No Instructions");
            };
            response.testing_inst = list;
            return response;
        };
    };
};  
let list = [];  

list_making(readme.installation_prompt,"installation",target);

.then ((response) => { 
    list = [];
    console.log("step 2 achieved")
    return response
})
.then((response) => {
    console.log('adding testing');
    list_making(response.installation_prompt,"testing",response).then(() => {return response});   
})



async function init () {   
    const fs = require('fs');
    const inquirer = require('inquirer');

   inquirer.prompt([
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
        ])
        .then((response) => { 
            await list_making(response.installation_prompt,"installation",response);
            console.log("instructions clear");
            return response
        })
        .then(async(response)=> {
            console.log(response)
            console.log("promising");
        });
        
    async function list_making (call,variable,response) {
        return new Promise(resolve => {
            if (call === "Yes") {
                console.log("Instructions Required");
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
                    list.push(inst_response.instruction);
                    list_making(inst_response.instruction_continue,variable,response);
                });
            } else if (call === "No") {
                //console.log(response, "testing second")
                if (variable === "installation") {
                    if (list == null) {
                        list.push("N/A");
                        console.log("No Instructions");
                    };
                    console.log(list);
                    //console.log(typeof response)
                    response.install_inst = list;
                    //console.log(response);
                    return response;
                } else if (variable === "testing") {
                    if (list == null) {
                        list.push("N/A");
                        console.log("No Instructions");
                    };
                    response.testing_inst = list;
                    return response;
                };
            };
        Promise.resolve();
        });
    };  


    let list = [];  
};
    
init();