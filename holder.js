.then(async (response) => await list_making(response.installation_prompt,"installation",response))
        .then(async (response) => await clear_list(response))
        .then(async (response) => await list_making(response.installation_prompt,"testing",response))
        .then(async (response) => {console.log(response)});
        
    const list_making  = (call,variable,response) => {
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
            console.log(response, "Recording in Progress")
            if (variable === "installation") {
                if (list == null) {
                    list.push("N/A");
                    console.log("No Instructions");
                };
                console.log(list);
                console.log(typeof response)
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
    };  

    async function clear_list(response) {
        list = [];
        return response
    }

    let list = [];  
};

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




    async function init () {   
        {inquirer.prompt([
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
            .then(async (response) => { 
                await list_making(response.installation_prompt,"installation",response)
                return response
            })
            .then(async (response) => {console.log('Recording Complete', response)});    
        };
    
    