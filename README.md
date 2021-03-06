[![Build Status](https://api.travis-ci.org/meilke/nudossi.png)](https://travis-ci.org/meilke/nudossi)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![NPM version](https://badge.fury.io/js/nudossi.svg)](http://badge.fury.io/js/nudossi)  
[![Code Climate](https://codeclimate.com/github/meilke/nudossi/badges/gpa.svg)](https://codeclimate.com/github/meilke/nudossi)
[![Test Coverage](https://codeclimate.com/github/meilke/nudossi/badges/coverage.svg)](https://codeclimate.com/github/meilke/nudossi)  
[![Dependency Status](https://david-dm.org/meilke/nudossi.svg)](https://david-dm.org/meilke/nudossi)
[![devDependency Status](https://david-dm.org/meilke/nudossi/dev-status.svg)](https://david-dm.org/meilke/nudossi#info=devDependencies)  
[![forthebadge](http://forthebadge.com/images/badges/uses-badges.svg)](http://forthebadge.com)

# nudossi

This will bump versions for NuGet dependencies in *.csproj and packages.config files.

## Getting started

Do this to run it

```bash
$ npm install
$ grunt nudossi --packageName="My.Message" --newVersion="2.7.0" --path=test/data/destination/
```

If you want to use it in your Grunt pipeline:

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