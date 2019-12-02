Npm image for Wijmo CommonJS modules (minified)
===============================================

This folder represents an npm image containing Wijmo core and Angular 2 interop 
modules in CommonJS module format, and corresponding TypeScript definition (.d.ts) files.
The folder also includes metadata files for Angular 2 AoT compiler (.metadata.json).

<b>NOTE:</b> despite the ".min" suffix is not present in .js file names, these files are MINIFIED. 
The ".min" suffix is omitted in order to simplify modules usage in conjunction with 
various application bundlers and loaders, where mapping of ambient module names used in 
applications (like "wijmo/wijmo.grid") to minified file names having ".min.js" extension 
requires either an additional setup or even not possible in some tools.

Because the folder content is formed as an npm image, you can easily install it in your 
application using "npm install <path_to_folder>" command in NodeJS command prompt, like this:
npm install ../wijmo_download/NpmImages/wijmo-commonjs-min
This command will add the folder content to the node_modules/wijmo folder of your application.

Alternatively, you can add the following record to the package.json file of your application:
"dependencies": {
   "wijmo": "../wijmo_download/NpmImages/wijmo-commonjs-min",
   … other libraries
}
After that, each time you execute "npm install" command in your application root folder, 
Wijmo modules will be installed under the "node_modules" folder along with other libraries 
enumerated in package.json.
