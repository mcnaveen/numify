# :1234: Numify :capital_abcd:

![Test](https://github.com/mcnaveen/numify/workflows/Test/badge.svg)
![Downloads this Week](https://img.shields.io/npm/dw/numify)
![Bundle Size](https://img.shields.io/bundlephobia/min/numify)
![Version](https://img.shields.io/npm/v/numify)

![Numify](./image/cover.png)

:unicorn: Simple utility to convert long numbers to human readable format.

(:loudspeaker: Pronunced as "**Num-e-fy**")

| :x: Without Numify      | :white_check_mark: With Numify |
| ----------------------- | ------------------------------ |
| 1000 Views              | 1k Views                       |
| 25000 Likes             | 25k Likes                      |
| 30000 Retweets          | 30k Retweets                   |
| 1000000 Followers       | 1M Followers                   |
| 1000000000 Followers    | 1B Followers                   |
| 1000000000000 Followers | 1T Followers                   |

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


// With options
const number = numify(23878437, {
  formatType: "in", // "en", "de", "fr", "es", "it", "se"
  precise: true,
});

console.log(number);
```

### :ballot_box_with_check: Example Output

```
1K (English)
23.9 Cr (Indian)
```

---

#### :green_heart: Message

I hope you find this useful. If you have any questions, please create an issue.
