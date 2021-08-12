
$(function() {
	getUser();
	//修改用户昵称和邮件
	$("#sb").on("submit",function(e){
		e.preventDefault();
		console.log($(this).serialize())
		var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		if (!reg.test($("#user_email").val())) {
			$("#user_email").val("")
			return layer.msg("邮箱格式不正确");
		}
		$.ajax({
			method: 'post',
			url: '/my/userinfo',
			// headers : {
			// 	Authorization : localStorage.getItem('token') || ''
			// },
			data: $(this).serialize(),
			success: function(res) {
				console.log(res);
				if (res.status !== 0) {
					return layer.msg("获取用户信息失败")
				}
				// 调用父页面中的方法，重新渲染用户的头像和用户的信息
				 window.parent.getUserInfo();
			}
		})
	})
})

//获取用户基本信息
function getUser() {
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
			//填充数据
			layui.form.val("sb",res.data);
		}
	})
}