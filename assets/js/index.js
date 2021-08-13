$(function() {
	//获取头像
	getUserInfo();
	//退出点击
	$("#out").on("click", function() {
		layer.confirm('确定退出登录?', {
				icon: 3,
				title: '提示'
			},
			function(index) {
				window.location.href = 'login.html';
				localStorage.removeItem('token');
			})

	})
	
})

//获取头像方法
function getUserInfo() {
	$.ajax({
		method: 'get',
		url: '/my/userinfo',
		// headers : {
		// 	Authorization : localStorage.getItem('token') || ''
		// },
		success: function(res) {
			console.log(res);
			if (res.status !== 0) {
				return layer.msg("获取用户信息失败")
			}
			//调用renderAVatar 渲染用户头像
			renderAVatar(res.data);
			//资本资料的填充

		}
	})
}

//渲染用户头像方法
function renderAVatar(res) {
	var name = res.nickname || res.username;
	$("#get_username").html(name);
	if (res.user_pic !== null) {
		$("#img").attr("src", res.user_pic).show();
		$(".text-avatar").hide();
	} else {
		$("#img").hide();
		$(".text-avatar").html(name[0].toUpperCase()).show();
	}
}
