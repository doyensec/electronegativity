# Electronegativity

## What's Electronegativity?

**Electronegativity** is a tool to identify misconfigurations and security anti-patterns in [Electron](https://electronjs.org/)-based applications.
<p align="center">
	<img src="https://github.com/doyensec/electronegativity/raw/master/docs/resources/img/electronegalogo.png">
</p>

It leverages AST and DOM parsing to look for security-relevant configurations, as described in the ["Electron Security Checklist - A Guide for Developers and Auditors"](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf) whitepaper.

Software developers and security auditors can use this tool to detect and mitigate potential weaknesses and implementation bugs when developing applications using Electron. A good understanding of Electron (in)security is still required when using Electronegativity, as some of the potential issues detected by the tool require manual investigation.

If you're interested in Electron Security, have a look at our *BlackHat 2017* research [Electronegativity - A Study of Electron Security](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security.pdf) and keep an eye on the [Doyensec's blog](http://blog.doyensec.com).

![Electronegativity Demo](https://github.com/doyensec/electronegativity/raw/master/docs/resources/img/electrodemo.gif "Electronegativity Demo")

## Installation

Major releases are pushed to NPM and can be simply installed using:

```
$ npm install @doyensec/electronegativity -g
```

## Usage

### CLI

```
$ electronegativity -h
```

|    Option    |                 Description                       |
|:------------:|:-------------------------------------------------:|
| -V           | output the version number                         |
| -i, --input  | input (directory, .js, .html, .asar)               |
| -l, --checks | only run the specified checks, passed in csv format |
| -s, --severity | only return findings with the specified level of severity or above |
| -c, --confidence | only return findings with the specified level of confidence or above |
| -o, --output <filename[.csv or .sarif]> | save the results to a file in csv or sarif format |
| -r, --relative | show relative path for files |
| -v, --verbose | show the description for the findings |
| -u, --upgrade <current version..target version> | run Electron upgrade checks, eg -u 7..8 to check upgrade from Electron 7 to 8 |
| -e, --electron-version <version> | assume the set Electron version, overriding the detected one, eg -e 7.0.0 |
| -h, --help   | output usage information                          |


Using electronegativity to look for issues in a directory containing an Electron app:
```
$ electronegativity -i /path/to/electron/app
```

Using electronegativity to look for issues in an `asar` archive and saving the results in a csv file:
```
$ electronegativity -i /path/to/asar/archive -o result.csv
```

Using electronegativity when upgrading from one version of Electron to another to find breaking changes:
```
$ electronegativity -i /path/to/electron/app -v -u 7..8
```

Note: if you're running into the Fatal Error "JavaScript heap out of memory", you can run node using ```node --max-old-space-size=4096 electronegativity -i /path/to/asar/archive -o result.csv```

### Programmatically

You can also use electronegativity programmatically, using similar options as for the CLI:

```js
const run = require('@doyensec/electronegativity')
// or: import run from '@doyensec/electronegativity';

run({
  // input (directory, .js, .html, .asar)
  input: '/path/to/electron/app',
  // save the results to a file in csv or sarif format (optional)
  output: '/path/for/output/file',
  // true to save output as sarif, false to save as csv (optional)
  isSarif: false,
  // only run the specified checks
  customScan: ['dangerousfunctionsjscheck', 'remotemodulejscheck'],
  // only return findings with the specified level of severity or above (optional)
  severitySet: 'high',
  // only return findings with the specified level of confidence or above (optional)
  confidenceSet: 'certain',
  // show relative path for files (optional)
  isRelative: false,
  // run Electron upgrade checks, eg -u 7..8 to check upgrade from Electron 7 to 8 (optional)
  electronUpgrade: '7..8',
  // assume the set Electron version, overriding the detected one
  electronVersion: '5.0.0'
})
    .then(result => console.log(result))
    .catch(err => console.error(err));
```

The result contains the number of global and atomic checks, any errors encountered while parsing and an array of the issues found, like this:

```js
{
  globalChecks: 6,
  atomicChecks: 36,
  errors: [
    {
      file: 'ts/main/main.ts',
      sample: 'shell.openExternal(url);',
      location: { line: 328, column: 4 },
      id: 'OPEN_EXTERNAL_JS_CHECK',
      description: 'Review the use of openExternal',
      properties: undefined,
      severity: { value: 2, name: 'MEDIUM', format: [Function: format] },
      confidence: { value: 0, name: 'TENTATIVE', format: [Function: format] },
      manualReview: true,
      shortenedURL: 'https://git.io/JeuMC'
    },
    {
      file: 'ts/main/main.ts',
      sample: 'const popup = new BrowserWindow(options);',
      location: { line: 340, column: 18 },
      id: 'CONTEXT_ISOLATION_JS_CHECK',
      description: 'Review the use of the contextIsolation option',
      properties: undefined,
      severity: { value: 3, name: 'HIGH', format: [Function: format] },
      confidence: { value: 1, name: 'FIRM', format: [Function: format] },
      manualReview: false,
      shortenedURL: 'https://git.io/Jeu1p'
    }
  ]
}
```

## Contributing

If you're thinking about contributing to this project, please take a look at our [CONTRIBUTING.md](https://github.com/doyensec/electronegativity/blob/master/CONTRIBUTING.md).

## Credits

Electronegativity was made possible thanks to the work of many [contributors](https://github.com/doyensec/electronegativity/graphs/contributors).

This project has been sponsored by [Doyensec LLC](https://www.doyensec.com). 

![alt text](https://doyensec.com/images/logo.svg "Doyensec Logo")

[Engage us to break](https://doyensec.com/auditing.html) your Electron.js application!
