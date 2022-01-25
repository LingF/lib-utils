import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import eslint from '@rollup/plugin-eslint'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import json from '@rollup/plugin-json'
import { name, version, author } from '../package.json'

const pkgName = 'lib-utils'
const banner =
  '/*!\n' +
  ` * ${name} v${version}\n` +
  ` * (c) 2021-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */'

export default {
  input: 'src/index.js',
  output: [
    {
      file: `dist/${pkgName}.umd.js`,
      format: 'umd',
      name: pkgName,
      banner
    },
    {
      file: `dist/${pkgName}.umd.min.js`,
      format: 'umd',
      name: pkgName,
      banner,
      plugins: [terser()]
    },
    {
      file: `dist/${pkgName}.cjs.js`,
      format: 'cjs',
      name: pkgName,
      banner
    },
    {
      file: `dist/${pkgName}.esm.js`,
      format: 'es',
      banner
    }
  ],
  // 注意 plugin 的使用顺序
  plugins: [
    json(),
    clear({
      targets: ['dist']
    }),
    alias(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true
    }),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    eslint({
      throwOnError: true, // 抛出异常并阻止打包
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    babel({ babelHelpers: 'bundled' })
  ]
}