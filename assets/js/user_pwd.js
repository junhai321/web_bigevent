$(function() {
	//验证输入的密码符合规矩不
	$("#new_pwd1").on("blur",function() {
		var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
		if(!reg.test($(this).val())){
			$(this).val("")
			layer.msg('密码不符合规定')
		}
		
	})
	
	
	
	$("#re_pwd").on("submit",function(e) {
		e.preventDefault()
		if($("#new_pwd1").val() !== $("#new_pwd2").val()) {
			$("#new_pwd1").val('')
			$("#new_pwd2").val('')
			return layer.msg('密码两次密码不一样')
		}
		
		//ajax请求
		$.ajax({
			method: 'post',
			url: '/my/updatepwd',
			data: $(this).serialize(),
			success: function(res) {
				console.log(res)
				if(res.status !== 0) {
					return layer.msg('请求失败')
				}
				layer.msg('更新密码成功,3s后重新登录')
				setTimeout(function(){
					window.parent.location.href = "login.html"
					localStorage.removeItem('token')
				},3000)
			}
		})
	})
})