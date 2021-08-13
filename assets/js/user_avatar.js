$(function() {
	// 1.1 获取裁剪区域的 DOM 元素
	var image = $('#image')
	// 1.2 配置选项
	var options = {
		// 纵横比
		aspectRatio: 1,
		// 指定预览区域
		preview: '.img-preview'
	}

	// 1.3 创建裁剪区域
	image.cropper(options)

	//选择图片
	$("#btn_choose").on("click", function() {
		$("#file").click()
	})
	$("#file").on("change", function(e) {
		var i = e.target.files
		if (i.length === 0) {
			return alert("sb选择头像啊！!!!!!!!!!")
		}
		// 1. 拿到用户选择的文件
		var file = e.target.files[0]
		// 2. 将文件，转化为路径
		var imgURL = URL.createObjectURL(file)
		// 3. 重新初始化裁剪区域
		image
			.cropper('destroy') // 销毁旧的裁剪区域
			.attr('src', imgURL) // 重新设置图片路径
			.cropper(options) // 重新初始化裁剪区域
	})
	$("#btn").on("click",function() {
		var dataURL = image
			.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
				width: 100,
				height: 100
			})
			.toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
		 $.ajax({
			 method: 'post',
			 url: '/my/update/avatar',
			 data: {
				 avatar: dataURL
			 },
			 success: function(res){
				 console.log(res)
				 window.parent.getUserInfo();
				 alert('更换头像成功')
			 }
		 })
	})

})
