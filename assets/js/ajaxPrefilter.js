$.ajaxPrefilter(function(options) {
	// 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
	options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
	if (options.url.indexOf('/my/' !== -1)) {
		options.headers = {
			Authorization: localStorage.getItem('token') || ''
		};
	};
	options.complete = function(res) {
		console.log('执行了 complete 回调：')
		console.log(res);
		// 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
		if(res.responseJSON.status ===1) {
			window.location.href = 'login.html';
			localStorage.removeItem('token');
		}
	}
})
