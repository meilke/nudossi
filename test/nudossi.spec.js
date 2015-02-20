var expect = require('expect.js'),
    nudossi = require('../tasks/nudossi.js'),
    ncp = require('ncp').ncp,
    fs = require('fs'),
    _ = require('lodash'),
    grunt = require('grunt'),
    options,
    originalFolder = 'test/data/original/',
    testFolder = 'test/data/destination/';

function emptyCallback () {
  return 0;
}

describe('nudossi', function () {

  beforeEach(function () {
    if (grunt.file.exists(testFolder)) {
      grunt.file.delete(testFolder);
    }
    options = { packageName: 'My.Message', newVersion: '2.7.0', path: testFolder };
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

  it('adds the updated lines correctly to csproj files', function (done) {
    ncp(originalFolder, testFolder, function (err) {
      nudossi.bump(options, function () {
        fs.readFile('test/data/destination/test.csproj', 'utf8', function (err, data) {
          expect(_.includes(data, '<HintPath>..\\packages\\My.Message.2.7.0\\lib\\My.Message.dll</HintPath>')).to.be(true);
          expect(_.includes(data, '<Reference Include="My.Message, Version=2.7.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35, processorArchitecture=MSIL">')).to.be(true);
          expect(_.includes(data, '<HintPath>..\\packages\\My.Message.2.7.0\\lib\\40\\My.Message.dll</HintPath>')).to.be(true);
          expect(_.includes(data, '<Reference Include="My.Message, Culture=neutral, PublicKeyToken=31bf3856ad364e35, processorArchitecture=MSIL, Version=2.7.0">')).to.be(true);
          expect(_.includes(data, '<Reference Include="My.Message, Culture=neutral, PublicKeyToken=31bf3856ad364e35, processorArchitecture=MSIL, Version=2.7.0">')).to.be(true);
          expect(_.includes(data, '<HintPath>..\\packages\\My.Message.2.7.0\\lib\\40\\My.Message.dll</HintPath>')).to.be(true);
          expect(_.includes(data, '<Reference Include="My.Message, Culture=neutral, PublicKeyToken=31bf3856ad364e35, processorArchitecture=MSIL">')).to.be(true);
          done();
        });
      });
    });
  });

it('has no remainders of the old version on csproj files', function (done) {
    ncp(originalFolder, testFolder, function (err) {
      nudossi.bump(options, function () {
        fs.readFile('test/data/destination/test.csproj', 'utf8', function (err, data) {
          expect(_.includes(data, '<HintPath>..\\packages\\My.Message.2.6.3\\lib\\My.Message.dll</HintPath>')).to.be(false);
          expect(_.includes(data, '<Reference Include="My.Message, Version=2.2.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35, processorArchitecture=MSIL">')).to.be(false);
          expect(_.includes(data, '<HintPath>..\\packages\\My.Message.2.2\\lib\\40\\My.Message.dll</HintPath>')).to.be(false);
          expect(_.includes(data, '<Reference Include="My.Message, Culture=neutral, PublicKeyToken=31bf3856ad364e35, processorArchitecture=MSIL, Version=2.2.0.0">')).to.be(false);
          expect(_.includes(data, '<Reference Include="My.Message, Culture=neutral, PublicKeyToken=31bf3856ad364e35, processorArchitecture=MSIL, Version=2.2.0.0-test">')).to.be(false);
          expect(_.includes(data, '<HintPath>..\\packages\\My.Message.2.2-test\\lib\\40\\My.Message.dll</HintPath>')).to.be(false);
          done();
        });
      });
    });
  });

  it('adds the updated lines on packages.config files', function (done) {
    ncp(originalFolder, testFolder, function (err) {
      nudossi.bump(options, function () {
        fs.readFile('test/data/destination/sub/packages.config', 'utf8', function (err, data) {
          expect(_.includes(data, '<package id="My.Message" version="2.7.0" targetFramework="net451"')).to.be(true);
          done();
        });
      });
    });
  });

  it('has no remainders of the old version on packages.config files', function (done) {
    ncp(originalFolder, testFolder, function (err) {
      nudossi.bump(options, function () {
        fs.readFile('test/data/destination/sub/packages.config', 'utf8', function (err, data) {
          expect(_.includes(data, '<package id="My.Message" version="2.2.2" targetFramework="net451"')).to.be(false);
          expect(_.includes(data, '<package id="My.Message" version="2.2.2-test" targetFramework="net451"')).to.be(false);
          done();
        });
      });
    });
  });

});