'use strict';

module.exports = function indexer(options) {
    return function(files, metalsmith, done) {
        // The original build process generates a search index here. The documentation
        // build can continue even if the indexer is unavailable, so this placeholder
        // simply continues without altering the file set.
        done();
    };
};
