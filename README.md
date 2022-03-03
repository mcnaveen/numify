# :1234: Numify :capital_abcd:

![Build](https://github.com/mcnaveen/numify/workflows/Build/badge.svg) 
![Downloads this Week](https://img.shields.io/npm/dw/numify) 
![Bundle Size](https://img.shields.io/bundlephobia/min/numify)
![Version](https://img.shields.io/npm/v/numify)

![Numify](./image/cover.png)

:unicorn: Simple utility to convert long numbers to human readable format.

:loudspeaker: Pronunced as "**Num-e-fy**"


### :package: Requirements
Node.js 12.x LTS or 14.x LTS

### :sparkles: Installation

Install the NPM Package with the below command:
```
npm install numify --save
``` 

 (or)

Install with Yarn:
```
yarn add numify
```

### :pen: Usage

Import the module in your project:

```javascript
// Commonjs Import
var { numify } = require("numify");

// or ES6 import
import { numify } from "numify";
```

### :bulb: Example

Pass the Number to the function

```javascript
import { numify } from "numify";

const number = numify(1000);
console.log(number);
```

### :ballot_box_with_check: Example Output
```
1K
```
---


#### :green_heart: Message

I hope you find this useful. If you have any questions, please create an issue.
