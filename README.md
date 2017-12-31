# `stratic-decorate-files`

[Gulp][1] plugin to decorate Stratic files with standard useful information

## Installation

    npm install stratic-decorate-files

## Usage

To use this module, just pipe a stream of parsed Stratic posts into it. It's probably a bad idea to do this after you've added extra files into the stream, like e.g. templates.

**Note:** it's actually very important to use the values produced by this module. It's very easy to do, for example:

```js
var date = new Date(post.data.time.epoch * 1000);
var month = date.getMonth();
// Etc.
```

but this is _wrong_ because it doesn't take the UTC offset into account. If you rebuild your site in a different timezone, you may find that some posts - particularly those authored near the boundaries between days, months, or years - will now display a different timestamp.

This module will take care of handling the offset for you, so you don't have to worry about any of that. Plus, some of the values it provides (particularly `monthName`) are awkward to get with regular `Date` objects, so now you don't have to worry about that either.

See "Properties" below for the full list of properties this module provides.

## Example

Minimal example:

```js
var gulp = require('gulp');
var frontMatter = require('gulp-gray-matter');
var straticDecorateFiles = require('stratic-decorate-files');

gulp.task('post-index', function() {
	return gulp.src('*.md')
	           .pipe(frontMatter())
	           .pipe(straticDecorateFiles());
});
```

Full example:

```js
var gulp = require('gulp');
var remark = require('gulp-remark');
var remarkHtml = require('remark-html');
var frontMatter = require('gulp-gray-matter');
var straticDecorateFiles = require('stratic-decorate-files');
var straticPostsToIndex = require('stratic-posts-to-index');
var addsrc = require('gulp-add-src');
var jade = require('gulp-jade');
var straticDateInPath = require('stratic-date-in-path');
var rename = require('gulp-rename');

gulp.task('post-index', function() {
	return gulp.src('*.md')
	           .pipe(frontMatter())
	           .pipe(remark().use(remarkHtml))
	           .pipe(straticDateInPath())
	           .pipe(straticDecorateFiles())
	           .pipe(addsrc('index.jade'))
	           .pipe(straticPostsToIndex('index.jade'))
	           .pipe(jade({basedir: __dirname}))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist'));
});
```

## Properties

Each of these properties is attached to `file.data.time`; e.g. `file.data.time.year` for `year`. If `file.data.edited` is present, it also gets these properties attached.

`moment` (`Object`) - a [MomentJS][] moment, preconfigured to handle the offset. Use this if what you need isn't already exposed.

`year` (`Number`) - the year the post was authored, as you would get from `Date#getFullYear()`

`yearStr` (`String`) - the year the post was authored, typecast to a string

`month` (`Number`) - the month the post was authored, as you would get from `Date#getMonth()` (i.e. zero-indexed)

`monthName` (`String`) - the name of the month the post was authored in; e.g. `January`

`monthStr` (`String`) - the month the post was authored in, made human-readable (i.e. `1` for January) and typecast to a string

`monthUrlStr` (`String`) - `monthStr` but with a `0` prepended if necessary to make the month two characters

`dayOfMonth` (`Number`) - the day of the month the post was authored, as you would get from `Date#getDate()`

`dayOfMonthStr` (`String`) - the day of the month the post was authored, typecast to a string

## Code of Conduct

Please note that StraticJS is developed under the [Contributor Covenant][3] Code of Conduct. Project contributors are expected to respect these terms.

For the full Code of Conduct, see [CODE_OF_CONDUCT.md][4]. Violations may be reported to <alex@strugee.net>.

## License

LGPL 3.0+

## Author

AJ Jordan <alex@strugee.net>

 [1]: http://gulpjs.com/
 [2]: https://github.com/strugee/generator-stratic
 [3]: http://contributor-covenant.org/
 [4]: https://github.com/straticjs/stratic-decorate-files/blob/master/CODE_OF_CONDUCT.md
 [MomentJS]: https://momentjs.com/
