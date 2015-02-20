var expect = require('expect.js'),
    nudossi = require('../tasks/nudossi.js'),
    ncp = require('ncp').ncp,
    fs = require('fs'),
    _ = require('lodash'),
    grunt = require('grunt');

function emptyCallback () {
  return 0;
}

describe('nudossi', function () {

  beforeEach(function () {
    if (grunt.file.exists('test/data/destination/')) {
      grunt.file.delete('test/data/destination/');
    }
  });

  it('fails with no options', function () {
    expect(function () { nudossi.bump(undefined, emptyCallback); }).throwError();
  });

  it('fails with no package name and version and path', function () {
    expect(function () { nudossi.bump({}, emptyCallback); }).throwError();
  });

  it('fails with empty package name', function () {
    expect(function () { nudossi.bump({ newVersion: '0.5.2', packageName: '', path: '/some/path' }); }, emptyCallback).throwError();
  });

  it('fails with empty version', function () {
    expect(function () { nudossi.bump({ packageName: 'My.Message', newVersion: '', path: '/some/path' }, emptyCallback); }).throwError();
  });

  it('fails with empty path', function () {
    expect(function () { nudossi.bump({ packageName: 'My.Message', newVersion: '0.5.2', path: '' }, emptyCallback); }).throwError();
  });

  it('works correctly on csproj files', function (done) {
    var options = { packageName: 'My.Message', newVersion: '2.7.0', path: 'test/data/destination/' };
    ncp('test/data/original/', 'test/data/destination/', function (err) {
      nudossi.bump(options, function () {
        fs.readFile('test/data/destination/test.csproj', 'utf8', function (err, data) {
          expect(_.includes(data, 'My.Message.2.7.0')).to.be(true);
          expect(_.includes(data, 'My.Message, Version=2.7.0')).to.be(true);
          expect(_.includes(data, 'My.Message.2.6.3')).to.be(false);
          expect(_.includes(data, 'My.Message, Version=2.2.0.0')).to.be(false);
          expect(_.includes(data, 'My.Message.2.2')).to.be(false);
          done();
        });
      });
    });
  });

  it('works correctly on package.config files', function (done) {
    var options = { packageName: 'My.Message', newVersion: '2.7.0', path: 'test/data/destination/' };
    ncp('test/data/original/', 'test/data/destination/', function (err) {
      nudossi.bump(options, function () {
        fs.readFile('test/data/destination/sub/package.config', 'utf8', function (err, data) {
          expect(_.includes(data, 'id="My.Message" version="2.7.0"')).to.be(true);
          expect(_.includes(data, 'id="My.Message" version="2.2.2"')).to.be(false);
          done();
        });
      });
    });
  });

});