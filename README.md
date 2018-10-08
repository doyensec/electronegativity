# Electronegativity

## What's Electronegativity?

**Electronegativity** is a tool to identify misconfigurations and security anti-patterns in [Electron](https://electron.atom.io/) applications.

It leverages AST parsing to look for security-relevant configurations, as described in the ["Electron Security Checklist - A Guide for Developers and Auditors"](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf) whitepaper. 

Software developers and security auditors can use this tool to mitigate potential weaknesses and implementation bugs when developing applications using Electron.

If you're interested in Electron Security, have a look at our research - [Electronegativity - A Study of Electron Security](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security.pdf).

## Installation

```
$ npm install @doyensec/electronegativity -g
```

## Usage
|    Option    |                 Description                       |
|:------------:|:-------------------------------------------------:|
| -V           | output the version number                         |
| -i, --input  | input (directory, .js, .htm, .asar)               |
| -o, --output | save the results to a file in csv or sarif format |
| -h, --help   | output usage information                          |

## Examples
Using electronegativity to look for issues in a directory containing an Electron app:
```
$ electronegativity -i /path/to/electron/app
```

Using electronegativity to look for issues in an `asar` archive and saving the results in a csv file:
```
$ electronegativity -i /path/to/asar/archive -o result.csv
```

## Creating new checks
Electronegativity is build in such a way to allow any developer/hacker to add their own checks to the tool. All you need to do is create a new file in `/src/finder/checks` and creating a new class with one method, `match(data)`, and a constructor that specifies the check details such as the name, the description, etc. For example:
```js
import { sourceTypes } from '../../parser/types';

export default class MyCheck {
    constructor() {
        this.id = 'MY_CUSTOM_CHECK';
        this.description = `this is a custom check`;
        this.type = sourceTypes.JAVASCRIPT;
    }

    match(data) {
        //do magic
        //either return an object with row and col, or null meaning no issues were identified
    }
}

```

Feel free to take a look at some of the already implemented checks to get an idea on how things work. 

## Credits

Electronegativity was made possible thanks to the work of [Claudio Merloni](https://github.com/p4p3r) and [Ibram Marzouk](https://github.com/0xibram)

This tool is based on a [Doyensec](https://www.doyensec.com) sponsored research published at [Black Hat USA 2017](https://www.blackhat.com/us-17/briefings.html#electronegativity-a-study-of-electron-security).
