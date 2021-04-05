# Example code to aid the implementation of an axe-core result summary on the Sauce Labs dashboard

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project setup
1. Clone it from GitHub
1. In the project directory, run `npm install` to get the dependencies
1. To start it `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\

## Remaining Work
1. In the file `src\App.js` find the line `import wdioLog from './wdio_test_log.json';`
1. Change the filename to `./wdio_test_log_no_axe.json` and save to see what the UI looks like if no axe-results are available in the `wdio_test_log.json` file.
1. When  you integrate this with your Sauce Dashboard code, one of the things you will need to do is to replace the import with a call to some function that returns the log file in the same form.  If the function fails, it should return a null.  In that case the App will render the no-results UI.
