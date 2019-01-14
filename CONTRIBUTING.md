**Thank you for considering contributing to our project!**

Feel free to participate to this project, as much as you can. Even supporting other users or improving the documentation can make a big difference!

## Build & Run

Clone [electronegativity](git@github.com:doyensec/electronegativity.git) and proceed with the following:

```
$ npm install
$ npm run build
$ node dist/index.js -h
```

## Creating new checks

Electronegativity is build in such a way to easily allow the development of new security checks: 

1. Create a new file in `/src/finder/checks`
2. Create a new class with a `match(data, ast)` function, which should contain the logic of your custom check
3. Add a constructor that specifies the check details such as name, description, etc. 

For example:

```js
import { sourceTypes } from '../../parser/types';

export default class MyCheck {
    constructor() {
        this.id = 'MY_CUSTOM_CHECK';
        this.description = `this is a custom check`;
        this.type = sourceTypes.JAVASCRIPT;
    }

    match(data, ast) {
        //do magic
        //either return an object with row and col, or null meaning no issues were identified
    }
}

```

Take a look at some of the checks in `/src/finder/checks` to get an idea on how things work.


## Testing checks with Mocha

Test cases for unit testing are placed in `test/checks/`.

Filenames should have the following format: ```<CHECK_NAME_IDENTIFIER>_<test number #>_<number of issues>.<js|htm|html>```

For instance, the ```NODE_INTEGRATION_JS_CHECK_1_0.js ``` will be analyzed using the ```NODE_INTEGRATION_JS_CHECK``` check and the test is expected to find ```0``` issues.
