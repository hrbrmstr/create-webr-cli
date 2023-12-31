// ES6 version of node_modules/webrtools/src/load.js • v0.0.3 • Copyright (c) 2023 Colin Fay

export async function loadFolder(webR, dirPath, outputdir = "/usr/lib/R/library") {
  throw new Error("Deprecated, please use webR.FS.mount instead.");
}

export async function loadPackages(webR, dirPath, libName = "webr_packages") {
  // Create a custom lib so that we don't have to worry about
  // overwriting any packages that are already installed.
  await webR.FS.mkdir(`/usr/lib/R/${libName}`)
  // Mount the custom lib
  await webR.FS.mount("NODEFS", { root: dirPath }, `/usr/lib/R/${libName}`);
  // Add the custom lib to the R search path
  await webR.evalR(`.libPaths(c('/usr/lib/R/${libName}', .libPaths()))`);
}