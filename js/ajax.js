function sendAjax(url, Ajax_obj) {
	_defalut = {
		type: 'GET',
		params: null,
	}
	for (var i in Ajax_obj) {
		_defalut[i] = Ajax_obj[i]
	}

	var f;
	url.indexOf('?') > -1 ? f = '&' : f = '?';
	url += f + '_=' + Date.now();
	
	if (_defalut.type.toLowerCase() === 'get') {
		for (var i in _defalut.params) {
			url += '&' + i + '=' + _defalut.params[i]
		}	
		_defalut.params = null
	}

	if (_defalut.type.toLowerCase() === 'post') {
		_defalut.params = JSON.stringify(_defalut.params)
	}

	var Ajax = new XMLHttpRequest();
	Ajax.open(_defalut.type, url, true);

	Ajax.send(_defalut.params);
	Ajax.onreadystatechange = function () {
		if (Ajax.readyState == 4 && Ajax.status == 200) {
			if (typeof _defalut.success == "function") {
				_defalut.success(JSON.parse(Ajax.responseText))
			}
		}
	}
}