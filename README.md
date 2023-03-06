# scoped

[![Version Badge][version-image]][project-url]
[![License][license-image]][license-url]
[![Build Status][build-image]][build-url]

> Scoped CSS for DOM trees

## Install

Download the [CJS](https://github.com/ryanmorr/scoped/raw/master/dist/cjs/scoped.js), [ESM](https://github.com/ryanmorr/scoped/raw/master/dist/esm/scoped.js), [UMD](https://github.com/ryanmorr/scoped/raw/master/dist/umd/scoped.js) versions or install via NPM:

```sh
npm install @ryanmorr/scoped
```

## Usage

Import the library:

```javascript
import scoped from '@ryanmorr/scoped';
```

Create a scoped stylesheet by providing the CSS as a string. The selectors of the CSS will be automatically converted to include a unique attribute. The styles can only take affect when an element also possesses that unique attribute. It returns a function that will apply the unique attribute to all elements of a DOM tree:

```javascript
const applyStyles = scoped(`
    .foo {
        width: 100px;
        height: 100px;
    }

    .bar {
        width: 200px;
        height: 200px;
    }
`);

applyStyles(element);
```

You can provide the unique attribute yourself via an optional second argument:

```javascript
const applyStyles = scoped(`
    div {
        color: red;
    }
`, 'scoped');

applyStyles(element);
element.hasAttribute('scoped'); //=> true
```

It supports all CSS selectors, properties, and at-rules, including keyframes and media queries:

```javascript
const applyStyles = scoped(`
    .foo {
        background-color: red;
        animation-name: slide-in 1s ease-in;
    }

    @keyframes slide-in {
        from {
            transform: translateX(0%);
        }
        to {
            transform: translateX(100%);
        }
    }

    @media screen and (max-width: 600px) {
        .foo {
            background-color: blue;
        }
    }
`);
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/scoped
[version-image]: https://img.shields.io/github/package-json/v/ryanmorr/scoped?color=blue&style=flat-square
[build-url]: https://github.com/ryanmorr/scoped/actions
[build-image]: https://img.shields.io/github/actions/workflow/status/ryanmorr/scoped/node.js.yml?style=flat-square
[license-image]: https://img.shields.io/github/license/ryanmorr/scoped?color=blue&style=flat-square
[license-url]: UNLICENSE