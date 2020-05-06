function generateMarkdown(answers, badges, response) {
    return `
    # ${answers.title}

    ${badges}

    ## Description
    ${answers.descripton}

    ## Table of Contents
    ${answers.contents.join('\n')}

    ### Installation
    ${answers.installation}

    ### Usage
    ${answers.usage}

    ### Credits
    ${answers.credits}

    ### License
    ${answers.license}

    ### Tests
    ${answers.tests}

    ### Questions
    You may adress any questions to the author below:

    Name: __${response.data.name}__
    GitHub: [${response.data.login}](https://github.com/${response.data.login})  
    ![Image of Me](${response.data.avatar_url})

    `;
}

module.exports = generateMarkdown;