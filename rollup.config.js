import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
import visualizer from 'rollup-plugin-visualizer';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import babel from 'rollup-plugin-babel';

const isWatch = process.env.ROLLUP_WATCH;
const production = !isWatch
console.log('is watching?', isWatch ? isWatch: false)   // rollup -c -w, -w is watch, if watch, means we are in dev mode
console.log('is production?', production)

const BUNDLE_DIR_NAME = 'dist'

export default {
  input: 'src/index.ts',
  output: {
    dir: BUNDLE_DIR_NAME,
    format: 'iife',
    sourcemap: true,
    //file: 'bundle.js',
    name:'familiarD3Scenario'
  },
  plugins: [
    resolve(), // tells Rollup how to dependencies in node_modules

    typescript({
      // Make sure we are using our version of TypeScript.
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true
        }
      },
      // We need to set this so we can use async functions in our
      // plugin code. :shrug:
      // https://github.com/ezolenko/rollup-plugin-typescript2/issues/105
      clean: true
    }),
    // 不使用專案底下的.babelrc 設定，因為corejs 3出了以後，@babel/polyfll 被deprecated了，改在這邊寫適合rollup的polyfill，並且是使用coreJS 3的
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-env',
        '@babel/transform-runtime', 
        { 
          useBuiltIns: 'entry',
          corejs: 3,
          modules: false 
        }
      ],
    }),
    // dev的時候 生出html 以讓rollup devServer去載入 以方便`肉眼 手動`測試...
    // 因為有html, output那邊就不會只是一個file
    isWatch && htmlTemplate({
      template: './index.html',
      target: `./${BUNDLE_DIR_NAME}/index.html`,
    }),
    isWatch && serve('dist'),   // if rollup -c -w ,start the dev-servers, this rollup-dev-server  default listen 10001
    production && terser(),    // minify, but only in production
    production && visualizer({  // show the bundle analyzer report, only in production
      open: true,  //make it open in OS default browser directly
    })
  ]
}