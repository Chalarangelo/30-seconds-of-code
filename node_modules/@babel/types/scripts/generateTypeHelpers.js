"use strict";
const path = require("path");
const chalk = require("chalk");
const generateBuilders = require("./generators/generateBuilders");
const generateValidators = require("./generators/generateValidators");
const generateAsserts = require("./generators/generateAsserts");
const generateConstants = require("./generators/generateConstants");
const format = require("../../../scripts/utils/formatCode");
const writeFile = require("../../../scripts/utils/writeFileAndMkDir");

const baseDir = path.join(__dirname, "../src");

console.log("Generating @babel/types dynamic functions");

const buildersFile = path.join(baseDir, "builders/generated/index.js");
writeFile(buildersFile, format(generateBuilders(), buildersFile));
console.log(`  ${chalk.green("✔")} Generated builders`);

const validatorsFile = path.join(baseDir, "validators/generated/index.js");
writeFile(validatorsFile, format(generateValidators(), validatorsFile));
console.log(`  ${chalk.green("✔")} Generated validators`);

const assertsFile = path.join(baseDir, "asserts/generated/index.js");
writeFile(assertsFile, format(generateAsserts(), assertsFile));
console.log(`  ${chalk.green("✔")} Generated asserts`);

const constantsFile = path.join(baseDir, "constants/generated/index.js");
writeFile(constantsFile, format(generateConstants(), constantsFile));
console.log(`  ${chalk.green("✔")} Generated constants`);
