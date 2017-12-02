[![NPM Package](https://badge.fury.io/js/%40oshanrube%2Forigami.svg)](https://www.npmjs.com/package/@oshanrube/origami)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[![Build Status](https://saucelabs.com/browser-matrix/oshanrube-origami.svg)](https://saucelabs.com/open_sauce/user/oshanrube-origami)

# Origami

_Origami is the art of folding paper with sharp angles to form beautiful creations._

Angular + Polymer

## Intro

Origami bridges gaps between the Angular platform and Polymer web components. It works with Angular 2 and Polymer 2.

For first-time users, go through the [installation](#installation) process to understand how to set up Origami for your project.

Installed and need a reference on how to do something? [Check out the Quick Start](#quick-start) for a quick overview of the main Origami features.

### Features

There's a lot to talk about with Angular and Polymer. These are all the gaps Origami helps to bridge between the two. Click on a feature to go to an in-depth tutorial.

- [Two-Way `[( )]` Databinding ✅](docs/data-binding.md)
- [Angular Template/Reactive Form Support ✅](docs/forms.md)
- [Polymer Templates (`<iron-list>`) ✅](docs/polymer-templates.md)
- Angular Components in Polymer Templates ❌
- [New Polymer elements defined in-project ✅](docs/new-elements.md)
- [OnPush Change Detection ✅](docs/change-detection.md)
- [Object/Array mutation detection ✅](docs/object-array-mutation.md)
- [CSS custom property/mixin support](docs/custom-style.md) ✅
- Ahead-of-Time Compliant ✅
- [Bundled production-ready builds ✅](docs/production-build.md)

## Support

### Libraries

- Angular 4.0.0 +
- Polymer 2.0 +

Origami does not support Polymer 1.x or the v0 Custom Element spec. Check out [angular-polymer](https://github.com/platosha/angular-polymer) for Angular 2.x and Polymer 1.x love.

### Browsers

Polymer is built off of WebComponents, which is comprised of

- [Custom Elements](http://caniuse.com/#feat=custom-elementsv1)
- [Templates](http://caniuse.com/#feat=template)
- [HTML imports](http://caniuse.com/#feat=imports)
- [Shadow DOM](http://caniuse.com/#feat=shadowdomv1)

[Polyfills are available](https://www.webcomponents.org/polyfills) and Origami supports the latest 2 versions of the following browsers:

- Chrome
- Firefox
- Safari
- Microsoft Edge
- Internet Explorer (11 only)

Origami may work on older versions or different browsers (such as Opera), but they are not officially supported.

## Installation

```
$ npm install --save @oshanrube/origami
```

### Bower

Polymer and most custom elements are installed with [`bower`](https://bower.io/). Install `bower` globally and initialize the project. This will create a `bower.json` (similar to `package.json`).

```
$ npm install -g bower
$ bower init
```

Make sure bower components are installed to a directory that is included in the project's final build. For example, an Angular CLI-generated project includes `src/assets/`. Create a `.bowerrc` file to redirect bower installations to the correct folder.

```json
{
  "directory": "src/assets/bower_components"
}
```

Next install Polymer and any other custom elements.

```
$ bower install --save Polymer/polymer
```

Projects should add the `bower_components/` directory to their `.gitignore` file.

### Polyfills

When targeting browsers that do not natively support WebComponents, polyfills are required. The app must wait for the polyfills before bootstrapping.

Origami recommends using the `webcomponents-loader.js` polyfill. This script will check for native browser support before loading the required polyfills.

index.html
```html
<html>
<head>
  <title>Paper Crane</title>

  <script src="assets/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
</head>
<body>
  <app-root>Loading...</app-root>
</body>
</html>
```

main.ts
```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { webcomponentsReady } from '@oshanrube/origami';

webcomponentsReady().then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule, {
    enableLegacyTemplate: false
  });
}).catch(error => {
  // No WebComponent support and webcomponentsjs is not loaded
  console.error(error);
});
```

### Templates

Angular 4 consumes all `<template>` elements instead of letting Polymer use them. The app should set `enableLegacyTemplate` to false when bootstrapping to prevent this. Don't forget that for Ahead-of-Time compilation Angular compiler options must be specified in the `tsconfig.json` file being used for AoT compiling.

Angular 5+ will default this value to false.

main.ts

```ts
platformBrowserDynamic().bootstrapModule(AppModule, {
  enableLegacyTemplate: false
});
```

tsconfig-aot.json
```json
{
  "compilerOptions": {
    ...
  },
  "angularCompilerOptions": {
    "enableLegacyTemplate": false
  }
}
```

Always use `<ng-template>` for Angular templates, and `<template>` for Polymer templates.

### Host Events

When using a Polymer `<template>`, you can bind events to the host Angular element using the `[polymer]` directive.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-poly',
  template: `
    <iron-list [items]="items" as="item">
      <template [polymer]="this" ngNonBindable>
        <my-item item="[[item]]" color="[[getColor(item)]]"></my-item>
      </template>
    </iron-list>
  `
})
export class PolyComponent {
  items = [
    'one',
    'two',
    'three'
  ];

  getColor(item: string) {
    return item === 'one' ? 'blue' : 'red';
  }
}
```

Currently Origami only supports event binding, not data binding. Make sure to add `[ngNonBindable]` to Polymer templates that you use in Angular with binding syntax so that Angular does not try to parse the bindings!

## Quick Start

### Bower

Origami bridges the gap between Angular and Polymer. It does not download elements for you. First you need to install them with bower.

```
$ bower install --save Polymer/polymer
$ bower install --save PolymerElements/paper-input
$ bower install --save PolymerElements/paper-button
...
```

Next, import elements and polyfills in `index.html`. Elements cannot be imported from within an Angular template.

index.html
```html
<html>
<head>
  <title>Paper Crane</title>

  <script src="assets/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
  <link href="assets/bower_components/paper-input/paper-input.html" rel="import">
  <link href="assets/bower_components/paper-button/paper-button.html" rel="import">
</head>
<body>
  <app-root>Loading...</app-root>
</body>
</html>
```

### Bootstrap

Our app should wait for polyfills to be ready before bootstrapping the main module. Additionally, we must instruct Angular not to consume `<template>` elements.

main.ts
```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { webcomponentsReady } from '@oshanrube/origami';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

webcomponentsReady().then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule, {
    enableLegacyTemplate: false
  });
});
```

If compiling for Ahead-of-Time, add `enableLegacyTemplate` to the `tsconfig.json` being used for AoT compilation.

tsconfig-aot.json
```json
{
  "compilerOptions": {
    ...
  },
  "angularCompilerOptions": {
    "enableLegacyTemplate": false
  }
}
```

### Import

Import `PolymerModule.forRoot()` from Origami into the app's main module. You may import `PolymerModule` in additional separate modules, but it is not necessary. Make sure you only import `PolymerModule.forRoot()` once and at the highest module level!

Next, we need to tell Angular not to worry about these custom elements and properties it doesn't know about. We do that by adding `schema: [CUSTOM_ELEMENTS_SCHEMA]` to our modules.

Optionally, the app can import selectors from Origami for Polymer's collections. This is highly recommended (+10 to sanity), but is not required.

> Collections are extremely light and slim modules. All they do is automatically apply [emitChanges] and [ironControl] to known Polymer elements.

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PolymerModule } from '@oshanrube/origami';
import { IronElementsModule, PaperElementsModule } from '@oshanrube/origami/lib/collections'; // Optional
// There are many collections to import, such as iron, paper, and gold elements

@NgModule({
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    FormsModule, // Required to connect elements to Angular forms
    PolymerModule.forRoot(), // Only import .forRoot() once and at the highest level

    // Optional modules to help reduce markup complexity
    IronElementsModule,
    PaperElementsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

For non-Polymer collection elements, the app will need to use the `[emitChanges]` and `[ironControl]` attributes.

### Markup

Add the `[emitChanges]` directive to all custom elements using two-way data binding. Add `[ironControl]` to control elements that should work in Angular forms.

```html
<my-custom-checkbox [(checked)]="isChecked" emitChanges></my-custom-checkbox>

<form #ngForm="ngForm">
  <paper-input label="Name" name="name" emitChanges ironControl required [(ngModel)]="name"></paper-input>

  <!-- No two-way binding, [emitChanges] is not needed -->
  <paper-button [disabled]="!ngForm.form.valid" (click)="onSubmit()">Submit</paper-button>
</form>
```

#### Collection Modules

If the app imported collection modules, such as `PaperElementsModule`, `[emitChanges]` and `[ironControl]` *must not be added* to elements that the collection provides selectors for. They are still required for elements that do not have a collections module.

```html
<my-custom-checkbox [(checked)]="isChecked" emitChanges></my-custom-checkbox>

<form #ngForm="ngForm">
  <paper-input label="Name" name="name" required [(ngModel)]="name"></paper-input>

  <paper-button [disabled]="!ngForm.form.valid" (click)="onSubmit()">Submit</paper-button>
</form>
```
