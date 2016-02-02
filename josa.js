;String.prototype.josa = (function() {

	var table = [
		{ reg: /^이?([면다지네고])/, map : [ '이$1', '$1' ] },
		{ reg: /^으?로/, map : [ '으로', '로' ], callback : function(jongSeong) {
			return jongSeong === 0 || jongSeong === 8 ? 1 : 0;
		} },
		{ reg: /^이|가/, map : [ '이', '가' ] },
		{ reg: /^과|와/, map : [ '과', '와' ] },
		{ reg: /^을|를/, map : [ '을', '를' ] },
		{ reg: /^은|는/, map : [ '은', '는' ] }
	];

	function escapeRegExp(string){
		return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}

	return function (str) {

		if (arguments.length === 0 || arguments.length === 2) {
			var open = escapeRegExp(arguments[0] || '{');
			var close = escapeRegExp(arguments[1] || '}');
			var regExp = new RegExp('(.)' + open + '(.*?)' + close, 'g');
			return this.replace(regExp, function(_, str, josa) {
				var after = str.josa(josa);
				if (str + josa !== after) {
					return after;
				}
				return _;
			});
		}

		var code = this.charCodeAt(this.length - 1);
		if (code < 0xAC00 || 0xD743 < code) { return this + str; }

		var jongSeong = (code - 0xAC00) % 28;

		for (var i = 0, item; !!(item = table[i]); i++) {
			if (!item.reg.test(str)) { continue; }
			return this + str.replace(
				item.reg,
				item.map[ typeof item.callback === 'function' ? item.callback(jongSeong) : (jongSeong ? 0 : 1) ]
			);
		}

		return this + str;

	};

})();