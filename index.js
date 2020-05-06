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
        message: 'Add urls for badges (seperate using commas):',
       
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