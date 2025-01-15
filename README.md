# Basic Template 1.0.0.0

This is the basic template to start with any Java and Angular development within the P2 group.

## :pushpin: Versioning

- **Basic Template 1.0.0.0 (15-01-2025)**

## Authors

- **Misael Sifuentes** - _Continue with new requirements_ - Sanmina Developer

## Table of Contents

- [Getting Started](#getting_started)
- [Dependecies](#dependecies)
- [Recommended extensions for VSCODE](#recommended_extensions)


## Dependecies <a name = "dependecies"></a>
It is recommended to use these versions to work with Angular CLI and dependencies free of vulnerabilities
- [Nodejs v20](https://nodejs.org/en)
- [Angular CLI v19](https://angular.io/cli)
- [Typescript](https://www.typescriptlang.org/)


## :package: Getting Started <a name = "getting_started"></a>

To start working with the project, you should start by cloning the repository to your local folder.
> Make sure you have installed [git](https://git-scm.com/)


```
git clone http://143.116.96.208:2000/P2/Java/Angular/AngularBasicTemplate
```


Access the previously cloned project folder:
```
cd AngularBasicTemplate
```


Install the project dependencies:
```
npm install
```

##### Configure project
Inside the project we will look for the **constats.ts** file to be able to change the project name for the new project to start using the template or you can enter the following path to search for the file manually.

- `src/app/shared/constants.ts`

> If you are using VSCODE you can use the command **`ctrl + p`** to open the command prompt and look for the file constats.ts

We will identify the following lines to replace `BasicTemplate` with the name of the new project, for example `TicketApp`.

Before:
```typescript
export class Constants {
  public static application: String = "BasicTemplate"; // original
  public static applicationName: String = "BasicTemplate"; // original
```

After:
```typescript
export class Constants {
  public static application: String = "TicketApp"; // TicketApp
  public static applicationName: String = "TicketApp"; // TicketApp
```


##### Build configuration and more
###### package.json
We will modify the `package.json` to rename `my-app` by the name of our project, following the same nomenclature separating each word by a `-` and in lowercase letters. For example, suppose our project is called `TicketApp`, then would remain as `ticket-app`.


Before:
```json
{
  "name": "my-app", // original
  "version": "0.0.0",
  
  // ...
```

After:
```json
{
  "name": "ticket-app", // new app name
  "version": "0.0.0",
  
  // ...
```

###### angular.json
Now we will configure our angular **json** file in the root of our project in the same way.

> You can be guided in making changes to the file by following the comments of **// original** and **// new app name**

Before:
```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "my-app": { // original
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
  
  // ...
```

After:
```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "ticket-app": { // new app pane
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
  
  // ...
```

###### Configuring build directory
In the **angular.json** file located in the root of our new project we will look for the following lines and replace them with the name of our new project.

Before:
```json
// ...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
    "options": {
      "outputPath": "dist/my-app", // original
      "index": "src/index.html",
      "main": "src/main.ts",
      "polyfills": "src/polyfills.ts",
      "tsConfig": "src/tsconfig.app.json",
      "assets": [
        "src/favicon.ico",
        "src/assets"
      ],
  
  // ...
```

After:
```json
// ...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
    "options": {
      "outputPath": "dist/ticket-app", // new app pane
      "index": "src/index.html",
      "main": "src/main.ts",
      "polyfills": "src/polyfills.ts",
      "tsConfig": "src/tsconfig.app.json",
      "assets": [
        "src/favicon.ico",
        "src/assets"
      ],
  
  // ...
```
###### Environment configuration (dev & prod)

Before:
```json
// ...
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "configurations": {
    "production": {
        "buildTarget": "my-app:build:production"
    },
    "development": {
        "buildTarget": "my-app:build:development"
    }
  },
},
  // ...
```

After:
```json
// ...
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "configurations": {
    "production": {
        "buildTarget": "ticket-app:build:production"
    },
    "development": {
        "buildTarget": "ticket-app:build:development"
    }
  },
},
  // ...
```


## :shield: Recommended extensions for VSCODE <a name = "recommended_extensions"></a>
- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
- [Angular Snippets (Version 16)](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)
- [Angular 10 Snippets - TypeScript, Html, Angular Material](https://marketplace.visualstudio.com/items?itemName=Mikael.Angular-BeastCode)
- [Angular Schematics](https://marketplace.visualstudio.com/items?itemName=cyrilletuzi.angular-schematics)

