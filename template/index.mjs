#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path'
import { WebR } from 'webr'
import { loadPackages } from './src/webrtools.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nSamples = (process.argv[2]) ? +process.argv[2] : 10

const webR = new WebR();
await webR.init();

globalThis.webR = webR; // webrtools needs this

await loadPackages(webR, path.join(__dirname, 'webr_packages'))

// await webR.evalR("suppressPackageStartupMessages(library(tidyverse))");

const result1 = await webR.evalRString(`paste0(unclass(getRversion())[[1]][1:2], collapse=".")`);
const sample = await webR.evalR(`sample`);
const result2 = (await sample(nSamples)).values

try {
  process.stdout.write(`R version ${result1}\n`)
  process.stdout.write(result2.join(", ") + "\n")
} finally {
  webR.destroy(result1);
  webR.destroy(result2);
}

process.exit(0);

