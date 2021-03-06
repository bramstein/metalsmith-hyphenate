/*eslint-env mocha */
'use strict';

var equal = require('assert-dir-equal');
var metalsmith = require('metalsmith');

var metalsmithHyphenate = require('..');

function check(name, settings, done) {
  var path = 'test/fixtures/' + name;

  metalsmith(path)
    .use(settings)
    .build(function(err) {
      if (err) {
        return done(err);
      }

      equal(path + '/expected', path + '/build');
      done();
    });
}

describe('metalsmith-hyphenate', function() {
  it('should hyphenate', function(done) {
    check('default-settings', metalsmithHyphenate(), done);
  });

  it('should hyphenate with custom settings', function(done) {
    check('custom-settings', metalsmithHyphenate({
      elements: ['blockquote'],
      langModule: 'hyphenation.de'
    }), done);
  });

  it('should ignore files matching a pattern', function(done) {
    check('ignore-one-folder', metalsmithHyphenate({
      ignore: 'notes/*'
    }), done);
  });

  it('should ignore files matching an array of patterns', function(done) {
    check('ignore-two-folders', metalsmithHyphenate({
      ignore: [
        'notes/*',
        'blog/*'
      ]
    }), done);
  });
});
