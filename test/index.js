const { numify } = require("../dist/index.js");

console.log("English", numify(300000000, {
  formatType: "en",
  precise: false,
}));

console.log("Indian", numify(23878437, {
  formatType: "in",
  precise: true,
}));

console.log("German", numify(9742387.54, {
  formatType: "de",
  precise: false,
}));

console.log("French", numify(989387.54, {
  formatType: "fr",
  precise: false,
}));

console.log("Spanish", numify(239847.54, {
  formatType: "es",
  precise: false,
}));

console.log("Italian", numify(239847.54, {
  formatType: "it",
  precise: false,
}));

console.log("Swedish", numify(239847.54, {
  formatType: "se",
  precise: false,
}));

console.log("Indian", numify(2398088942047.54, {
  formatType: "in",
  precise: false,
  style: "long",
}));

