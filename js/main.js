//create category、category_item 
var defaultCategory,  
	currentCategory,
	currentCategory_item,
	currentTaskName,
	itemLength,
	taskLength,
	categoryLength;
	//flag
//currentCategory = defaultCategory;
// ————————————————————————————————————currentCategory_item.parentNode.parentNode =  currentCategory;
//add className——————————————————————————————
//nav—————————————
//////div
$.delegate($('category'), 'p', 'click', function (event) {
	var that = this;
	$('subtitle').value = '';
	$('taskname').value = '';
	$('con-text').value = '';
	$('task').innerHTML = '';
	if (hasClass(that, 'active')) {
		currentCategory = '';
		currentCategory_item = '';
		removeClass(that, 'active');
	} else {
		removeAllClass('p', 'active');
		removeAllClass('li', 'active');
		currentCategory = '';
		currentCategory_item = '';
		if (that.className == '') {return false}
		addClass(that, 'active');
		currentCategory = that.parentNode;
	}
	setCurrent(currentCategory.id);
});
////item
$.delegate($('category'), 'li', 'click', function () {
	var that = this;
	$('subtitle').value = '';
	$('taskname').value = '';
	$('con-text').value = '';
	if (hasClass(that, 'active')) {
		currentCategory = '';
		currentCategory_item = '';
		removeClass(that, 'active');
		removeAllClass('dd', 'active');
	} else {
		removeAllClass('li', 'active');
		currentCategory = '';
		currentCategory_item = '';
		addClass(that, 'active');
		currentCategory_item = that;
		currentCategory = currentCategory_item.parentNode.parentNode;
		// if ($.cookieUtil.get('flagShowTask')) {
		// 	return;
		// }
		//$.data.showTask();
		sortTasks(currentCategory_item);
	}
	//$.cookieUtil.set('flagShowTask', true);
	setCurrent(currentCategory.id, currentCategory_item.id);
});
//subnav——————
$.delegate($('task'), 'dd', 'click', function () {
	var that = this;
	//if (hasClass(that, 'active')) {
	//	removeClass(that, 'active');
	//	currentTaskName = '';
	//} else {
		removeAllClass('dd', 'active');
		addClass(that, 'active');
		currentTaskName = that;
		$.data.showContent();
	//}
	setCurrent(currentCategory.id, currentCategory_item.id, currentTaskName.id);
});

//delete element——————————————————————————————————————————
//nav——————————————
$.delegate($('category'), 'a', 'click', function () {
	var that = this,
		par = that.parentNode;
		dbpar = par.parentNode;
	if (par.nodeName == 'p'.toUpperCase()) {
		currentCategory = dbpar;
		deleteCategory(currentCategory);
		$('category').removeChild(dbpar);
		$('task').innerHTML = '';
		//currentCategory = '';
	} else {
		//currentCategory_item = par;
		currentCategory_item = par;
		//console.log(currentCategory_item);
		deleteItemData(currentCategory_item);
		findPValueonDelete(currentCategory_item);
		dbpar.removeChild(par);
	}
	
	findAllTask();	
	$('subtitle').value = '';
	$('taskname').value = '';
	$('con-text').value = '';
	currentTaskName = '';
	currentCategory_item = '';
	currentCategory = '';
		
});
//subnav————————
$.delegate($('task'), 'a', 'click', function () {
	var that = this,
		dd,
		ddpar = that.parentNode,
		dlpar = ddpar.parentNode,
		divpar = dlpar.parentNode;
	dd = dlpar.getElementsByTagName('dd');
	deleteTaskData(that, currentCategory,currentCategory_item);
	findSpan(currentCategory_item);
	findAllTask();	
	currentTaskName = '';
	dlpar.removeChild(ddpar);
	if (!dd.length) {
		$('task').removeChild(divpar);
		$('subtitle').value = '';
		$('taskname').value = '';
		$('con-text').value = '';
	}
});

// add item and task
// categoryName and categoryitem
$.addEvent($('newCategory'), 'click', function () {
	$.newContent.newCategoryItem();
});

$.addEvent($('newTask'), 'click', function () {
	$.newContent.newTask();
});


//dbclick modify
$.addEvent($('edit'), 'click', function () {
	edit();
});

$.addEvent($('save'), 'click', function () {
	if (!(currentCategory_item && currentTaskName)) {
		return;
	}
	save(false);
	sortTasks(currentCategory_item);
	removeAllClass('dd', 'active');
	addClass(currentTaskName, 'active');
});

$.addEvent($('finish'), 'click', function() {
	save(true);
	sortTasks(currentCategory_item);
})

// show task is finished
$.addEvent($('all'), 'click', function () {
	removeAllClass('button', 'btn-active');
	addClass(this, 'btn-active');
	if (!currentCategory_item) {
		return;
	}
	sortTasks(currentCategory_item);
});

$.addEvent($('unfinished'), 'click', function () {
	removeAllClass('button', 'btn-active');
	addClass(this, 'btn-active');
	if (!currentCategory_item) {
		return;
	}
	sortTasks(currentCategory_item, true, false);
});

$.addEvent($('finished'), 'click', function () {
	removeAllClass('button', 'btn-active');
	addClass(this, 'btn-active');
	if (!currentCategory_item) {
		return;
	}
	sortTasks(currentCategory_item, true, true);
});


if (!localStorage.getItem('flag')) {
	$.data.loadDefaultData();
} else {
	$.renderElement.renderCategory();
    //$.renderElement.renderClassName();
}
localStorage.setItem("flag","loadDone");
// $.cookieUtil.set("flag",true);
// console.log($.cookieUtil.get("flag"));
// console.log(document.cookie);
