/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

var through2 = require('through2');
var handleOffset = require('stratic-handle-offset');

function decorateProperty(prop) {
	var moment = prop.moment = handleOffset(prop);

	prop.year = moment.year();
	prop.yearStr = moment.format('YYYY');

	prop.month = moment.month();
	prop.monthName = moment.format('MMMM');
	prop.monthStr = moment.format('M');
	prop.monthUrlStr = moment.format('MM');

	prop.dayOfMonth = moment.date();
	prop.dayOfMonthStr = moment.format('D');
}

module.exports = function() {
	return through2.obj(function(file, enc, callback) {

		decorateProperty(file.data.time);
		if (file.data.edited) decorateProperty(file.data.edited);

		this.push(file);
		callback();
	});
};
