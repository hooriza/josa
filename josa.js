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

	return function(str) {

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