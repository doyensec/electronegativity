# electronegativity

## Build & Run

```
npm install
npm run build
node dist/index.js --input < .asar | .js | .html | .htm >
```

## Testing check with mocha

Data for unit testing of checks goes in test/checks.
File names should have the following format: ```<CHECK_ID>_<test number #>_<number of issues>.<js|htm|html>```

For instance the ```NODE_INTEGRATION_JS_CHECK_1_0.js ``` will be analyzed using the ```NODE_INTEGRATION_JS_CHECK``` check and the test is expected to find ```0``` issues.
