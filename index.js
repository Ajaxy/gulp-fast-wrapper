var through2 = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError;

module.exports = fastWrapperPlugin;

function fastWrapperPlugin (opt) {
    if (typeof opt != 'object') {
        opt = {};
    }

    return through2.obj(function (file, encoding, cb) {
        if (file.isNull()) {
            cb(null, file);

            return;
        }

        if (file.isStream()) {
            cb(new PluginError('gulp-fast-wrapper', 'Streaming not supported'));
            return;
        }

        var parts = [];

        if (opt.header) {
            parts.push(new Buffer(opt.header));
        }

        parts.push(file.contents);

        if (opt.footer) {
            parts.push(new Buffer(opt.footer));
        }

        file.contents = Buffer.concat(parts);

        cb(null, file);
    });
}

