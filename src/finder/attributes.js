import chalk from 'chalk';

const severity = {
	HIGH : { value: 3, name: "HIGH", format: () => chalk.red("HIGH") },
	MEDIUM : { value: 2, name: "MEDIUM", format: () => chalk.keyword('orange')("MEDIUM") },
	LOW: { value: 1, name: "LOW", format: () => chalk.yellow("LOW") },
	INFORMATIONAL : { value: 0, name: "INFORMATIONAL", format:() => chalk.white("INFORMATIONAL") }
};

const confidence = {
	CERTAIN : { value: 2, name: "CERTAIN", format: () => chalk.green("CERTAIN") },
	FIRM : { value: 1, name: "FIRM", format: () => chalk.yellow("FIRM") },
	TENTATIVE: { value: 0, name: "TENTATIVE", format: () => chalk.white("TENTATIVE") }
};

module.exports.severity = severity;
module.exports.confidence = confidence;
