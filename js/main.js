//create category、category_item 
var defaultCategory,
	currentCategory,
	currentCategory_item,
	currentTaskName;
//currentCategory = defaultCategory;

//add className——————————————————————————————
//nav—————————————
//////div
$.delegate($('category'), 'p', 'click', function (event) {
	var that = this;
	if($.event.getTarget(event).innerHTML == "分类列表") {
		currentCategory = '';
	}
	if (hasClass(that,'active')) {
		removeClass(that,'active');
		currentCategory = '';
		console.log(currentCategory);
		console.log(currentCategory_item);
	} else {
		removeAllClass('p', 'active');
		if (that.className == '') {return false}
		addClass(that, 'active');
		currentCategory = that.parentNode;
		console.log(currentCategory);
		console.log(currentCategory_item);
	}
});
////item
$.delegate($('category'), 'li', 'click', function () {
	var that = this;
	if (hasClass(that,'active')) {
		removeClass(that,'active');
		currentCategory_item = '';
		console.log(currentCategory);
		console.log(currentCategory_item);
	} else {
		removeAllClass('li', 'active');
		addClass(that, 'active');
		currentCategory_item = that;
		console.log(currentCategory);
		console.log(currentCategory_item);
	}
});
//subnav——————
$.delegate($('task'), 'dd', 'click', function () {
	var that = this;
	if (hasClass(that,'active')) {
		removeClass(that,'active');
	} else {
		removeAllClass('dd', 'active');
		addClass(that, 'active');
	}
});

//delete element——————————————————————————————————————————
//nav——————————————
$.delegate($('category'), 'a', 'click', function () {
	var that = this,
		par = that.parentNode;
		dbpar = par.parentNode;
		if (par.nodeName == 'p'.toUpperCase()) {
			$('category').removeChild(dbpar);
		} else {
			dbpar.removeChild(par);
		}
		
});
//subnav————————
$.delegate($('task'), 'a', 'click', function () {
	var that = this,
		dd,
		ddpar = that.parentNode,
		dlpar = ddpar.parentNode,
		divpar = dlpar.parentNode;
	dd = dlpar.getElementsByTagName('dd');
	dlpar.removeChild(ddpar);
	if (!dd.length) {
		$('task').removeChild(divpar);
	}
});

// add item and task
// categoryName and categoryitem
$.addEvent($('newCategory'), 'click', function () {
	$.newContent.newCategoryItem();
});

$.addEvent($('newTask'),'click',function () {
	$.newContent.newTask();
});


//dbclick modify
var subtitle = $('subtitle');
$.addEvent($('save'), 'dblclick', function () {
	alert(11);
	subtitle.readonly = false;
});

$.addEvent($('edit'), 'click', function () {
	edit();
});

$.addEvent($('save'), 'click', function () {
	save();
});

$.data.loadDefaultData();