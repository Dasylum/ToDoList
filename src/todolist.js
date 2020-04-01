var todoList = function(title) {
	var title = title;
	var id = Date.now();
	const check = false;

	return {title, id, check};
}

export default todoList;