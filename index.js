const api = require('./utils/api');
const generateMarkdown = require('./utils/generateMarkdown');
const util = require('util');
const fs = require('fs');
const inquirer = require('inquirer');

const writeFileAsync = util.promisify(fs.writeFile);


const questions = [
    {
        type: 'input',
        name: 'fullName',
        message: 'Enter your full name:'
    },
    {
        type: 'input',
        name:'username',
        message: 'Enter your Github username:'
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is your project title?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'What is your project description?'
    },
    {
        type: 'checkbox',
        name:'contents',
        message: 'What would you want in your Table of Contents?',
        choices: [
            "* [Installation](#installation)",
            "* [Usage](#usage)",
            "* [Credits](#credits)",
            "* [License](#license)",
            "* [Badges](#badges)",
            "* [Tests](#tests)",
            "* [Questions](#questions)"
        ]
    },
    {
        type: 'input',
        name: 'installation',
        message:'How is your project installed (seperate using commas):'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How is your project used?'
    },
    {
        type:'input',
        name: 'credits',
        message: 'Where their any collaborators (seperate using commas):'
    },
    {
        type: 'input',
        name: 'license',
        message: 'How is the project licensed?'    
    },
    {
        type: 'input',
        name: 'badge',
        message: 'Would you like to add a badge',
        choices: [
            'https://camo.githubusercontent.com/2b5c48821f22738887c98a07f95852b610fb555b/68747470733a2f2f696d672e736869656c64732e696f2f61706d2f6c2f61746f6d69632d64657369676e2d75692e7376673f',
            'https://camo.githubusercontent.com/13c4e50d88df7178ae1882a203ed57b641674f94/68747470733a2f2f63646e2e7261776769742e636f6d2f73696e647265736f726875732f617765736f6d652f643733303566333864323966656437386661383536353265336136336531353464643865383832392f6d656469612f62616467652e737667',
        ]
       
    },
    {
        type: 'input',
        name: 'test',
        message: 'How is the project tested?'
    },
];


function promptUser() {
    return inquirer.prompt(questions);
}

promptUser() 
  .then(function(answers) {
        let github = "";
      return api.getUser(answers.username)
      .then(function(githubData){
          console.log(githubData);
        github = githubData;
        return renderBadges(answers.badge);
      })
      .then(function(newbadges){
          const md = generateMarkdown(answers, newbadges, github);
        return writeFileAsync('README.md',md);
      })
  }).then(function(){
      console.log("readme file generated");
  })
  .catch(function (err){
      console.log(err);
  })

// //function for rendering badges
function renderBadges(badge) {
    const badgeArr = badge.split(',');
    let badgeTemplate = '';
    for (let i = 0; i < badgeArr.length; i++) {
        badgeTemplate += '![Badge]('+ badgeArr[i] +')';
    }
    return badgeTemplate
}