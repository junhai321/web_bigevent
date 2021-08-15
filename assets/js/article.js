$(function() {
	getDate();
	insertData();
	delDate();
	reData();
})

//获取数据渲染到页面中
function getDate() {
	$.ajax({
		method: 'get',
		url: '/my/article/cates',
		success: function(res) {
			var tr = template("lj", res)
			$("tbody").html(tr)
		}
	})
}
//添加分类
function insertData() {
	$("#insertBtn").on("click", function() {
		layer.open({
			type: 1,
			area: ['500px', '250px'],
			title: '添加文章分类',
			content: $('#dialog-add').html()
		})
		$("#form-add").on("submit", function(e) {
			e.preventDefault();
			console.log($(this).serialize())
			$.ajax({
				method: 'post',
				url: '/my/article/addcates',
				data: $(this).serialize(),
				success: function(res) {
					if (res.status !== 0) {
						return layer.msg("添加失败")
					}
					layer.msg("添加成功")
					getDate();

				}
			})
		})
	})
}
//删除文章分类
function delDate() {
	$("tbody").on("click", ".de", function() {
		var id = $(this).attr('data-id')
		$.ajax({
			method: 'get',
			url: '/my/article/deletecate/' + id,
			data: {
				id: $(this).attr('data-id')
			},
			success: function(res) {
				if (res.status !== 0) {
					return layer.msg("删除失败")
				}
				layer.msg("删除成功")
				getDate();

			}
		})
	})
}
//修改数据
function reData() {
	$("tbody").on("click", ".re", function() {
		var id = $(this).attr('data-id')
		// 发起请求获取对应分类的数据
		$.ajax({
			method: 'GET',
			url: '/my/article/cates/' + id,
			success: function(res) {
				var da = template("dialog-edit", res.data)
				layer.open({
					type: 1,
					area: ['500px', '250px'],
					title: '修改文章分类',
					//这里是重点，content必须得获取script的对象，然后吧整个表单传进来
					content: da
				})
				//填写新的数据后发送请求
				$("#form-edit").on("submit", function(e) {
					e.preventDefault();
					console.log($(this).serialize())
					$.ajax({
						method: 'post',
						url: '/my/article/updatecate',
						data: $(this).serialize(),
						success: function(res) {
							console.log(res)
							if (res.status !== 0) {
								return layer.msg("更新数据失败")
							}
							layer.msg("更新数据成功")
							getDate();
						}
					})
				})
			}
		})
	})
}
