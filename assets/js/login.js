$(function(){
	//跳转到注册页面
	$("#new_uesr").on("click",function() {
		$(".reg-box").fadeIn();
		$(".login-box").hide();
	})
	//跳转回登录页面
	$("#back_login").on("click",function() {
		$(".reg-box").hide();
		$(".login-box").fadeIn();
	})
	//密码确认
	$("#pasword_2").on("blur",function() {
		if($("#pasword_1").val()!= $("#pasword_2").val()){
			alert("密码输入不正确");
			$("#pasword_2").val("");
		}
	})
	//监听注册表单的提交事件
	$("#form_reg").on("submit",function(e){
		e.preventDefault();
		var data = $(this).serialize();//获取表单的所有值
		$.post("/api/reguser",data,
			function(res){
				console.log(res);
				layer.msg(res.message);
				if(res.status === 0){
					$("#back_login").click();
				}
			})
		
	})
	//注册用户可以和监听注册表单的提交事件作对比
	// $("#btn_create").on("click",function() {
	// 	$.post("http://api-breakingnews-web.itheima.net/api/reguser",{
	// 		username : $("#new_username").val(),
	// 		password : $("#pasword_2").val()},
	// 		function(res){
	// 			console.log(res);
	// 			if(res.status === 0){
	// 				alert(res.message);
	// 				$("#back_login").click();
	// 			}
	// 		})
	// })
	//监听登录表单的提交事件
	$("#form_login").on("submit",function(e){
		e.preventDefault();
		var data = $(this).serialize();//获取表单的所有值
		$.post("/api/login",data,
			function(res){
				console.log(res);
				if(res.status !== 0){
				return layer.msg(res.message);	
			}
			msg(res.message);
			location.href = '/index.html';
		})
		
	})
})