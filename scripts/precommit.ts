#!/usr/bin/env bun

import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const requiredPdfNames = [
	"illinois-one-pager.pdf",
	"illinois-draft-bill.pdf",
	"methodology.pdf",
];

function runStep(stepLabel: string, stepCommand: string, stepArgs: string[]) {
	console.log(`→ ${stepLabel}`);

	const result = spawnSync(stepCommand, stepArgs, {
		cwd: process.cwd(),
		stdio: "inherit",
	});

	if (result.status !== 0) {
		throw new Error(`${stepLabel} failed with exit code ${result.status ?? 1}`);
	}
}

function assertRequiredArtifactsExist() {
	const missingArtifacts = requiredPdfNames.filter((fileName) => {
		const filePath = path.join(process.cwd(), "pdf", fileName);
		return !existsSync(filePath);
	});

	if (missingArtifacts.length > 0) {
		throw new Error(
			`Missing required PDF artifacts: ${missingArtifacts.join(", ")}`,
		);
	}
}

function run() {
	try {
		runStep("Validate content", "bun", ["run", "validate:content"]);
		runStep("Compile content graph", "bun", ["run", "compile:content"]);
		runStep("Build packet PDFs", "bun", ["run", "build:pdf"]);
		assertRequiredArtifactsExist();
		console.log("Pre-commit checks passed.");
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown pre-commit error";
		console.error(`Pre-commit failed: ${message}`);
		process.exitCode = 1;
	}
}

run();
