import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

const globals = {
  '@angular/core': 'ng.core',
  '@angular/forms': 'ng.forms',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@oshanrube/origami': 'oshanrube.origami',
  'rxjs': 'Rx'
};

const plugins = [
  resolve()
];

process.argv.some(arg => {
  if (arg.indexOf('.min') > -1) {
    plugins.push(uglify());
    return true;
  }
});

export default {
  globals,
  plugins,
  exports: 'named',
  external: Object.keys(globals),
  moduleName: 'oshanrube.origami.collections'
};
