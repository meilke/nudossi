[![Build Status](https://api.travis-ci.org/meilke/nudossi.png)](https://travis-ci.org/meilke/nudossi)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

# nudossi

This will bump versions for NuGet dependencies in *.csproj and package.config files.

## Getting started

```bash
$ npm install nudossi --save-dev
```

Next add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('nudossi');
```

## Configuration

Add this to your Grunt configuration:

```js
nudossi: {
  options: {
    packageName: 'My.Message',
    newVersion: '2.7.0',
    path: 'test/data/destination/'
  },
  do: {}
}
```