$(function() {
	getList()
})


//获取数据渲染页面
function getList() {
	$.ajax({
		method: 'get',
		url: '/my/article/list',
		data: {
			pagenum: 1,
			pagesize: 2,
			cate_id: '',
			state: ''
		},
		success: function(res) {
			console.log(res)
			if (res.status !== 0) {
				return layui.layer.msg("删除失败")
			}
			layui.layer.msg("获取文章成功")
		}
	})
}