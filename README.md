# Electronegativity

## What's Electronegativity?

**Electronegativity** is a tool to identify misconfigurations and security anti-patterns in [Electron](https://electronjs.org/)-based applications.

It leverages AST and DOM parsing to look for security-relevant configurations, as described in the ["Electron Security Checklist - A Guide for Developers and Auditors"](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf) whitepaper.

Software developers and security auditors can use this tool to detect and mitigate potential weaknesses and implementation bugs when developing applications using Electron. A good understanding of Electron (in)security is still required when using Electronegativity, as some of the potential issues detected by the tool require manual investigation.

If you're interested in Electron Security, have a look at our *BlackHat 2017* research [Electronegativity - A Study of Electron Security](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security.pdf) and keep an eye on the [Doyensec's blog](http://blog.doyensec.com).

## Installation

Major releases are pushed to NPM and can be simply installed using:

```
$ npm install @doyensec/electronegativity -g
```

## Usage

```
$ electronegativity -h
```

|    Option    |                 Description                       |
|:------------:|:-------------------------------------------------:|
| -V           | output the version number                         |
| -i, --input  | input (directory, .js, .html, .asar)               |
| -o, --output | save the results to a file in csv or sarif format |
| -c, --checks | only run the specified checks, passed in csv format |
| -h, --help   | output usage information                          |


Using electronegativity to look for issues in a directory containing an Electron app:
```
$ electronegativity -i /path/to/electron/app
```

Using electronegativity to look for issues in an `asar` archive and saving the results in a csv file:
```
$ electronegativity -i /path/to/asar/archive -o result.csv
```

Note: if you're running into the Fatal Error "JavaScript heap out of memory", you can run node using ```node --max-old-space-size=4096 electronegativity -i /path/to/asar/archive -o result.csv```

## Contributing

If you're thinking about contributing to this project, please take a look at our [CONTRIBUTING.md](https://github.com/doyensec/electronegativity/blob/master/CONTRIBUTING.md).

## Credits

Electronegativity was made possible thanks to the work of [Claudio Merloni](https://github.com/p4p3r), [Ibram Marzouk](https://github.com/0xibram), [Jaroslav Lobačevski](https://github.com/JarLob) and many other [contributors](https://github.com/doyensec/electronegativity/graphs/contributors).

This work has been sponsored by [Doyensec LLC](https://www.doyensec.com).

![alt text](https://doyensec.com/images/logo.svg "Doyensec Logo")

