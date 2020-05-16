# 09 Good README Generator

Create a command-line application that dynamically generates a README.md from a user's input. The application will be invoked with the following command:

```sh
node index.js
```

The user will be prompted for their GitHub username, which will be used to make a call to the GitHub API to retrieve their email and profile image. They will then be prompted with questions about their project.

## Completed
* The generated README includes the following sections: 
  * Title
  * Description
  * Table of Contents
  * Installation
  * Usage
  * License
  * Contributing
  * Tests
  * Questions

* The generated README includes 1 badge that's specific to the repository.

## User Story
```
AS A developer

I WANT a README generator

SO THAT I can easily put together a good README for a new project
```


## Acceptance Criteria
```
GIVEN the developer has a GitHub profile and a repository

WHEN prompted for the developer's GitHub username and repo specific information

THEN a README for the repo is generated
```
- - -

## Animated Gif
![ReadMe](readmeGif.gif)

- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
