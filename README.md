# How to run

1. Download and install the latest version of node 16 for your operating system
   - https://nodejs.org/download/release/v16.19.0/
2. Install git:
   - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
3. Authenticate your Github account with Git:
   - https://docs.github.com/en/get-started/getting-started-with-git/caching-your-github-credentials-in-git
4. Clone this repo using your command line
   - `git https://github.com/worddangler/backend.git`
5. Setup env variables
   - navigate to the project directory you cloned
   - in the root of the project, create a plain text file called `.env`
   - in the `.env` file you just created, paste the env variables in the the Discord's credentials channel
6. Build and run:
   - in your command line, run `npm install` to install all of the project dependencies
   - run with `npm run start`

# How to contribute

- When you start working on the repo don't contribute to the main branch directly. Instead create a fork, work on your own fork, and open a Pull Requests when you are ready to contribute code.
- All Pull Requests require approval from another person in the dev team. You have been added to the dev team if you already joined the org
- All Pull Requests have been set to automatically run continuous integration / continuous development workflows. So when you create a Pull Requests, your code will automatically be tested for linting issues and logic issues that have implemented tests.

Here is an example of a run: https://github.com/worddangler/backend/actions/runs/4476550524

# Tools used

- We are using Jest for tests: https://jestjs.io/
- We are using eslint for linting: https://eslint.org/
- We are using prettier for formatting: https://prettier.io/
- We are uisng ExpressJS server: https://expressjs.com/
- We are using MongoDB as the database (with the node driver): https://www.mongodb.com/

# Setting up your development environment

- You can use any editor / ide.
- Install the prettier plugin for your editor and set it up to auto-fix your code on save. Note that prettier formatting is enforced, so if your code is not formatted to follow prettier rules, you will get linting errors when you make a Pull Request.
- Download and install insomnia for API testing: https://insomnia.rest/
