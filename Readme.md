# To Do App

Here is a mini practice project of a To Do App.

### Technologies:
- HTML
- CSS
- Tailwind
- JS, ES6, TS

### Prerequisites:
- Node installed
- To use Tailwind: ``` npx tailwindcss -i ./style.css -o ./dist/output.css --watch ```

### Environment:
- VS Code 1.91.1
- Node v20.15.1
- npm 10.7.0
- ESLint 9.7.0
    - To set up ESLint:
        - Install ESLint v3.0.10 by Microsoft
        - npm install eslint -g OR npm install eslint
        - eslint --init OR npx eslint --init
        - You might want to include the following in your eslint.config.mjs:
        ``` export default [
            {
                files: ["**/*.js"],
                languageOptions: {sourceType: "commonjs"},
                rules: {
                    'quotes': ['error', 'single'], // Enforce single quotes
                    'semi': ['error', 'always'] // Require semicolons
                }
            },
            {languageOptions: { globals: globals.browser }},
            pluginJs.configs.recommended,
        ]; 
        ```
- Tailwind
    - Follow https://tailwindcss.com/docs/installation for installation


### Demo
![Demo of the project](img/demo.gif)
