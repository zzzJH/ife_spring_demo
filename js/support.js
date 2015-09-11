// gloable variable
var aStr = "<a href='#'>删除</a>";
var spanStr = "<span>( 0 )</span>";
//return ID
function $(id) {
	return document.getElementById(id);
}

// return element
function createElement(element) {
	return document.createElement(element);
}

// append element
function appendChild(elementP, elementC) {
	return elementP.appendChild(elementC);
}

//handle CLass—————————————————————————————————————————
function hasClass(element, className) {
	var classNames = element.className;
	if (!classNames) {
		return false;
	}
	classNames = classNames.split(/\s+/);
	for (var i = 0; i < classNames.length; i++) {
		if (classNames[i] == className) {
			return true;
		}
	}
	return false;
}

// addClassName
function addClass(element, className) {
	if (!hasClass(element, className)) {
		element.className = element.className ? [element.className, className].join(' ') : className;
	}
}
// removeClassName
function removeClass(element, className) {
	if (className && hasClass(element, className)) {
		var classNames = element.className.split(/\s+/);
		for (var i = 0; i < classNames.length; i++) {
			if (classNames[i] == className) {
				classNames.splice(i, 1);
				break;
			}
		};
	}
	element.className = classNames.join(' ');
}
// removeAll className="active"
function removeAllClass(tag, className) {
	if (tag == 'li') {
		var classNames = $('nav').getElementsByClassName(className);
		for (var i = 0; i < classNames.length; i++) {
			removeClass(classNames[i], className);
		}
	} else {
		var classNames = $('subnav').getElementsByClassName(className);
		for (var i = 0; i < classNames.length; i++) {
			removeClass(classNames[i], className);
		}
	}
}

// judge p is have 'active'
function isPhasActive() {
	var ps = $('category').getElementsByTagName('p');
	for (var i = 1; i < ps.length; i++) {
		if (hasClass(ps[i], 'active')) {
			return true;
		}
	}
	return false;
}

// judge id'task' have div?
function isHasDiv() {
	var divs = $('task').getElementsByTagName('div').length;
	if ( divs != 0) {
		return true;
	} else {
		return false;
	}
}

//find dt element ——————————————————————————————————
function getDt(dtValue) {
	var dts = $('task').getElementsByTagName('dt');
	for (var i = 0; i < dts.length; i++) {
		if (dts[i].innerHTML == dtValue) {
			return dts[i];
		}
	};
}

//find p value on delete
function findPValueonDelete(currentCategory_item) {
	var userData = $.data.getDefaultStorage();
	var pLength = [];
	var currentCategory = currentCategory_item.parentNode.parentNode;
	categoryLength = getCategoryPos(currentCategory);
	var pSpan = currentCategory.getElementsByTagName('span')[0];
	if (currentCategory == defaultCategory) {
		var pSpanValue = userData.defaultCategory.subCategories;
	} else {
		var pSpanValue = userData.categories[categoryLength].subCategories;
	}
	for (var i = 0; i < pSpanValue.length; i++) {
	 	pLength.push(pSpanValue[i].tasks.length);
	 }
	 if (pLength.length == 0) {
	 	return pSpan.innerHTML = "( 0 )";
	 }
	 var sum = pLength.reduce(function(prev, cur, index, array){
		return prev + cur;
	});
	 // console.log(pLength);
	 pSpan.innerHTML = '( ' + sum + ' )';
}

// find span element
function findSpan(currentCategory_item) {
	var currentCategory = currentCategory_item.parentNode.parentNode;
	var itemSpan = currentCategory_item.getElementsByTagName('span')[0];
	var pSpan = currentCategory.getElementsByTagName('span')[0];
	itemLength = getItemPos(currentCategory_item);
	categoryLength = getCategoryPos(currentCategory);
	var userData = $.data.getDefaultStorage();
	var pLength = [];
	if (currentCategory == defaultCategory) {
		var pSpanValue = userData.defaultCategory.subCategories;
		var tasks = userData.defaultCategory.subCategories[itemLength].tasks;
	} else {
		var pSpanValue = userData.categories[categoryLength].subCategories;
		var tasks = userData.categories[categoryLength].subCategories[itemLength].tasks;
	}
	itemSpan.innerHTML = '( ' + tasks.length + ' )';
	for (var i = 0; i < pSpanValue.length; i++) {
	 	pLength.push(pSpanValue[i].tasks.length);
	 }
	var sum = pLength.reduce(function(prev, cur, index, array){
		return prev + cur;
	});
	 // console.log(pLength);
	 pSpan.innerHTML = '( ' + sum + ' )';
}

// fing all task num
function findAllTask() {
	var ps = $('category').getElementsByTagName('p');
	var allNum = $('allTask');
	var num = 0;
	var re = /\d+/;
	for (var i = 1; i < ps.length; i++) {
		//console.log(ps[i]);
		var spans = ps[i].getElementsByTagName('span')[0].innerHTML;
		//console.log(spans);
		//console.log(parseInt(re.exec(spans)[0]));
		num = num + parseInt(re.exec(spans)[0]);
	}
	allNum.innerHTML = '( ' + num + ' )';
} 

// handle event ——————————————————————————————————
$.event = {
	addEvent: function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + tyep, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	getEvent: function(event) {
		return event || window.event;
	},
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	delegateEvent: function(element, tag, eventtype, handler) {
		$.event.addEvent(element, eventtype, function(e) {
			var event = $.event.getEvent(e);
			var target = $.event.getTarget(e);
			if (target && target.tagName === tag.toUpperCase()) {
				handler.call(target, event);
			}
		});
	}

};

$.addEvent = function(element, type, handler) {
	return $.event.addEvent(element, type, handler);
}
$.delegate = function(element, tag, event, listener) {
	return $.event.delegateEvent(element, tag, event, listener);
};

//get tiem & year+month+date+hours+minutes+seconds———————————————————————
$.date = {
	dateNow: function() {
		return new Date();
	},
	dateDate: function() {
		return $.date.dateNow().getDate();
	},
	dateFormat: function() {
		var year = $.date.dateNow().getFullYear().toString(),
			month = ($.date.dateNow().getMonth() + 1).toString(),
			date = $.date.dateNow().getDate().toString(),
			hour = $.date.dateNow().getHours().toString(),
			minute = $.date.dateNow().getMinutes().toString(),
			second = $.date.dateNow().getSeconds().toString();
		if (date.indexOf('0') === -1) {
			date =  '0' + date;
		}
		return year + month + date + hour + minute + second;
	},
	dateYMD: function() {
		var year = $.date.dateNow().getFullYear(),
			month = '0' + ($.date.dateNow().getMonth() + 1),
			date = $.date.dateNow().getDate().toString();
		if (date.indexOf('0') === -1) {
			date =  '0' + date;
		}
		return year + '-' + month + '-' + date;
	}
	// dateCompare: function() {
	// 	var dts = $('task').getElementsByTagName('dt');
	// 	var dtsStr;
	// 	var timeStr = parseFloat($.date.dateDate());
	// 	for (var i = 0; i < dts.length; i++) {
	// 		dtsStr = dts[i].innerHTML;
	// 		var dateStr = dtsStr.split('-');
	// 		if (dateStr[dateStr.length - 1] == timeStr) {
	// 			return false;
	// 		}
	// 	};
	// 	return true;
	// }
};

//add  ———————— item and task———————————————————————————————————————— 
//subitem——————————————
$.newContent = {
	newCategoryItem: function() {
		// if (currentCategory == currentCategory_item.parentNode.parentNode) {
		// 	var value = $.newContent.getCategoryItem();
		// 	console.log(currentCategory);
		// 	var curCate_id = currentCategory.id;
		// 	var uls = $(curCate_id).getElementsByTagName('ul');
		// 	var li = createElement('li');
		// 	li.id = $.date.dateFormat();
		// 	li.innerHTML = value + "<span>(5)</span>" + aStr;
		// 	uls[0].appendChild(li);
		// } else 
		// if (!isPhasActive()) {
		// 	var value = $.newContent.getCategoryName();
		// 	var div = createElement('div');
		// 	var p = createElement('p');
		// 	var ul = createElement('ul');
		// 	var time = $.date.dateFormat();
		// 	addClass(div,"category-list");
		// 	div.id = "category-item-" + time;
		// 	addClass(p,'category-p');
		// 	p.innerHTML = value + "<span>(10)</span>" + aStr;
		// 	div.appendChild(p);
		// 	div.appendChild(ul);
		// 	$('category').appendChild(div);
		// } else { 
		// 	var value = $.newContent.getCategoryItem();
		// 	console.log(currentCategory);
		// 	var curCate_id = currentCategory.id;
		// 	var uls = $(curCate_id).getElementsByTagName('ul');
		// 	var li = createElement('li');
		// 	li.id = $.date.dateFormat();
		// 	li.innerHTML = value + "<span>(5)</span>" + aStr;
		// 	uls[0].appendChild(li);
		// }
		//————————————————————————————————————————————————————————
		// if (!currentCategory_item) {
		// 	if (!isPhasActive() && currentCategory) {
		// 		//if (!$.newContent.getCategoryName()) {
		// 			var value = $.newContent.getCategoryName();
		// 		//}
		// 		var div = createElement('div');
		// 		var p = createElement('p');
		// 		var ul = createElement('ul');
		// 		var time = $.date.dateFormat();
		// 		addClass(div, "category-list");
		// 		div.id = "category-item-" + time;
		// 		addClass(p, 'category-p');
		// 		p.innerHTML = value + "<span>(10)</span>" + aStr;
		// 		div.appendChild(p);
		// 		div.appendChild(ul);
		// 		$('category').appendChild(div);
		// 	} else {
		// 		//if (!$.newContent.getCategoryName()) {
		// 			var value = $.newContent.getCategoryName();
		// 		//}
		// 		var curCate_id = currentCategory.id;
		// 		var uls = $(curCate_id).getElementsByTagName('ul');
		// 		var li = createElement('li');
		// 		li.id = $.date.dateFormat();
		// 		li.innerHTML = value + "<span>(5)</span>" + aStr;
		// 		uls[0].appendChild(li);
		// 	}
		// } else if (currentCategory == currentCategory_item.parentNode.parentNode) {
		// 	var value = $.newContent.getCategoryItem();
		// 	console.log(currentCategory);
		// 	var curCate_id = currentCategory.id;
		// 	var uls = $(curCate_id).getElementsByTagName('ul');
		// 	var li = createElement('li');
		// 	li.id = $.date.dateFormat();
		// 	li.innerHTML = value + "<span>(5)</span>" + aStr;
		// 	uls[0].appendChild(li);
		// }
		// 
		if (!currentCategory && ! currentCategory_item) {
			// create new div  Category
			var value = $.newContent.getCategoryName();
			if (!value) {
				return;
			}
			$('task').innerHTML = '';
			$('subtitle').value = '';
			$('taskname').value = '';
			$('con-text').value = '';
			var div = createElement('div');
			var p = createElement('p');
			var ul = createElement('ul');
			var time = $.date.dateFormat();
			addClass(div, "category-list");
			div.id = "category-item-" + time;
			setDivLocalStorage(div.id);
			addClass(p, 'category-p');
			p.innerHTML = value + spanStr + aStr;
			div.appendChild(p);
			div.appendChild(ul);
			currentCategory = div;
			saveNewCategory(value);
			$('category').appendChild(div);
			addClass(p, 'active')
		} else if (currentCategory != defaultCategory) {
			// create li in new div 
			if (currentCategory_item) {
				removeClass(currentCategory_item, 'active');
			}
			var value = $.newContent.getCategoryItem();
			if (!value) {
				return;
			}
			$('task').innerHTML = '';
			$('subtitle').value = '';
			$('taskname').value = '';
			$('con-text').value = '';
			var curCate_id = currentCategory.id;
			var uls = $(curCate_id).getElementsByTagName('ul');
			var li = createElement('li');
			li.id = $.date.dateFormat();
			//setnotDefaultLiLocalStorage(li.id);
			li.innerHTML = value + spanStr + aStr;
			uls[0].appendChild(li);
			currentCategory_item = li;
			//console.log(currentCategory_item);
			if (hasClass(li.parentNode.previousSibling, 'active')) {
				removeClass(li.parentNode.previousSibling, 'active');
			}
			addClass(li, 'active')
			saveItemValue(currentCategory_item, value, li.id);
			$('task').innerHTML = '';
		} else {
			if (currentCategory_item) {
				removeClass(currentCategory_item, 'active');
			}
			// create li in defaultCatrogry
			var value = $.newContent.getCategoryItem();
			if (!value) {
				return;
			}
			$('task').innerHTML = '';
			$('subtitle').value = '';
			$('taskname').value = '';
			$('con-text').value = '';
			var uls = $('category-default').getElementsByTagName('ul');
			var li = createElement('li');
			li.id = $.date.dateFormat();
			//setLiLocalStorage(li.id);
			li.innerHTML = value + spanStr + aStr;
			uls[0].appendChild(li);
			currentCategory_item = li;
			saveItemValue(currentCategory_item, value ,li.id);
			// $('task').innerHTML = '';
			if (hasClass(li.parentNode.previousSibling, 'active')) {
				removeClass(li.parentNode.previousSibling, 'active');
			}
			addClass(li, 'active')
		}
		//console.log(currentCategory_item);
		setCurrent(currentCategory.id, currentCategory_item.id);
		//findSpan(currentCategory_item);
		findAllTask();
	},
	newTask: function() {
		// if (/*!$.date.dateCompare()*/!true) {   // notuse
		// 	console.log(1111);
		// 	//build li element on old element
		// 	var value = $.newContent.getTaskItem();
		// 	var dl = getDt().parentNode;
		// 	var dd = createElement('dd');
		// 	dd.innerHTML = value + aStr;
		// 	dd.id = $.date.dateFormat();
		// 	dl.appendChild(dd);
		// 	removeAllClass('dd', 'active');
		// 	addClass(dd, 'active');
		// 	currentTaskName = dd;
		// 	// DisabledFalse();
		// 	//save data
		// 	saveDefaultTask(currentCategory_item, currentTaskName, value);
		// 	$.data.showContent();
		// } else {
		// 	console.log(22222);
		var value = $.newContent.getTaskItem();
		if (!value) {
			return;
		}
		saveTaskValue(currentCategory_item, value);
		sortTasks(currentCategory_item);
        addClass($(JSON.parse(localStorage.getItem("cuurentTaskID"))), "active");
        setCurrent(currentCategory.id, currentCategory_item.id, JSON.parse(localStorage.getItem("cuurentTaskID")));
		$('subtitle').value = value;
        $('taskname').value = $.date.dateYMD();
        $('con-text').value = '';
			// var div = createElement('div');
			// var dl = createElement('dl');
			// var dt = createElement('dt');
			// var dd = createElement('dd');
			// var time = $.date.dateFormat();
			// dt.innerHTML = $.date.dateYMD();
			// dd.innerHTML = value + aStr;
			// dl.appendChild(dt);
			// dl.appendChild(dd);
			// div.appendChild(dl);
			// addClass(div,'task-item');
			// div.id = "task-item-" + time;
			// $('task').appendChild(div);655
	},
	getCategoryName: function() {
		return prompt("请输入分类名称：");
	},
	getCategoryItem: function() {
		return prompt("请输入子类名称：");
	},
	getTaskItem: function() {
		return prompt("请输入任务名称：");
	}
};

//save new category value to localStorage
function saveNewCategory(value) {
	var userData = $.data.getDefaultStorage();
	var category = userData.categories;
	category[category.length] = {};
	category[category.length - 1].name = value;
	category[category.length - 1].subCategories = [];
	$.data.setDefaultStorage(userData);
}

// save Item value to localSrorage
function saveItemValue(currentCategory_item, value, id) {
	itemLength = getItemPos(currentCategory_item);
	var userData = $.data.getDefaultStorage();
	if (currentCategory_item.parentNode.parentNode == defaultCategory) {
		var subItem = userData.defaultCategory.subCategories;
		// subItem[subItem.length] = {};
		// subItem[subItem.length - 1].name = value;
		// subItem[subItem.length - 1].tasks = [];
		// subItem[subItem.length - 1].id = id;
	} else {
		categoryLength = getCategoryPos(currentCategory_item.parentNode.parentNode);
		var subItem = userData.categories[categoryLength].subCategories;
		// subItem[subItem.length] = {};
		// subItem[subItem.length - 1].name = value;
		// subItem[subItem.length - 1].tasks = [];
		// subItem[subItem.length - 1].id = id;
	}
	subItem[subItem.length] = {};
	subItem[subItem.length - 1].name = value;
	subItem[subItem.length - 1].tasks = [];
	subItem[subItem.length - 1].id = id;
	$.data.setDefaultStorage(userData);
}

// save taskname value to localStorage
function saveTaskValue(currentCategory_item, value) {
	itemLength = getItemPos(currentCategory_item);
	var userData = $.data.getDefaultStorage();
	if (currentCategory_item.parentNode.parentNode == defaultCategory) {
		var itemTasks = userData.defaultCategory.subCategories[itemLength].tasks;
		//console.log(itemTasks);
		itemTasks[itemTasks.length] = {};
		itemTasks[itemTasks.length - 1].name = value;
		itemTasks[itemTasks.length - 1].createtime = $.date.dateFormat();
		itemTasks[itemTasks.length - 1].updatetime = showYYYYMMDD(itemTasks[itemTasks.length - 1].createtime, false);
		itemTasks[itemTasks.length - 1].contents = '';
		itemTasks[itemTasks.length - 1].isFinished = false;
	} else {
		categoryLength = getCategoryPos(currentCategory);
		var itemTasks = userData.categories[categoryLength].subCategories[itemLength].tasks;
		//console.log(itemTasks);
		itemTasks[itemTasks.length] = {};
		itemTasks[itemTasks.length - 1].name = value;
		itemTasks[itemTasks.length - 1].createtime = $.date.dateFormat();
		itemTasks[itemTasks.length - 1].updatetime = showYYYYMMDD(itemTasks[itemTasks.length - 1].createtime, false);
		itemTasks[itemTasks.length - 1].contents = '';
		itemTasks[itemTasks.length - 1].isFinished = false;
	}
    localStorage.setItem("cuurentTaskID",JSON.stringify(itemTasks[itemTasks.length - 1].createtime));
	$.data.setDefaultStorage(userData);
}

// save defaultCategory task
// function saveDefaultTask(elementItem, elementTask, name, time, content) {
// 	itemLength = getItemPos(elementItem);
// 	taskLength =getContentPos(elementTask);
// 	console.log(taskLength);
// 	var userData = $.data.getDefaultStorage();
// 	var itemTasks = userData.defaultCategory.subCategories[itemLength].tasks;
// 	itemTasks[taskLength] = {};
// 	itemTasks[taskLength].name = name;
// 	itemTasks[taskLength].createtime = $.date.dateFormat();
// 	itemTasks[taskLength].updatetime = showYYYYMMDD(itemTasks[taskLength].createtime,false);
// 	if (time) {
// 		console.log(time);
// 		itemTasks[taskLength].updatetime = changeYYYYMMDD();
// 	}
// 	itemTasks[taskLength].contents = '';
// 	if (content) {
// 		itemTasks[taskLength].contents = content;
// 	}
// 	itemTasks[taskLength].isFinished = false;
// 	//$('taskname').value = $.date.dateYMD();
// 	$.data.setDefaultStorage(userData);	
// }

// // updata contnes to localStorage 
// function updateContents() {
// 	saveDefaultTask(currentCategory_item, currentTaskName, idValue('subtitle'), idValue('taskname'), idValue('con-text'));
// }

//delete category
function deleteCategory(currentCategory) {
	categoryLength = getCategoryPos(currentCategory);
	var userData = $.data.getDefaultStorage();
	userData.categories[categoryLength] = null;
	spliceArray(userData.categories);
	$.data.setDefaultStorage(userData);
}

// deleta item data
function deleteItemData(currentCategory_item) {
	var userData = $.data.getDefaultStorage();
	itemLength = getItemPos(currentCategory_item);
	var currentCategory = currentCategory_item.parentNode.parentNode;
	if (currentCategory == defaultCategory) {
		var user_Data = userData.defaultCategory.subCategories;
		user_Data[itemLength] = undefined;
		spliceArray(user_Data);
	} else {
		var user_Data = userData.categories[categoryLength].subCategories;
		user_Data[itemLength] = undefined;
		spliceArray(user_Data);
	}
	$.data.setDefaultStorage(userData);
	// for (var i = 0; i < user_Data.length; i++) {
	// 	if (user_Data[i].name == ) {};
	// }
	
}

// delete Task data 
function deleteTaskData(that, currentCategory, currentCategory_item) {
	// console.log(that);
	// console.log(currentCategory);
	// console.log(currentCategory_item);
	// console.log(that.parentNode);
	var userData = $.data.getDefaultStorage();
	itemLength = getItemPos(currentCategory_item);
	categoryLength = getCategoryPos(currentCategory);
	taskLength =getTaskPos(that.parentNode);
	// console.log(currentCategory);
	// console.log(itemLength);
	// console.log(taskLength);
	if (currentCategory == defaultCategory) {
		//console.log(userData.defaultCategory.subCategories[itemLength].tasks[taskLength]);
		userData.defaultCategory.subCategories[itemLength].tasks[taskLength] = undefined;
		spliceArray(userData.defaultCategory.subCategories[itemLength].tasks)
		$.data.setDefaultStorage(userData);
	} else {
		userData.categories[categoryLength].subCategories[itemLength].tasks[taskLength] = undefined;
		spliceArray(userData.categories[categoryLength].subCategories[itemLength].tasks)
		$.data.setDefaultStorage(userData);
	}

}

//base array splice element
function spliceArray(array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] == null) {
			array.splice(i, 1);
			return array;
		}
	}
}

// base id return value
function idValue(id) {
	return $(id).value
}

//change input、textarea  disabled 
function edit() {
	if ($('subtitle').value == '') {
		return;
	}
	//$('dateFormate').style.display = "inline-block";
	// $('subtitle').disabled = false;
	// $('taskname').disabled = false;
	// $('con-text').disabled = false;
	DisabledFalse();
}

function save(flag) {
	if ($('subtitle').value == '') {
		return;
	}
	//$('dateFormate').style.display = "none";
	// $('subtitle').disabled = true;
	// $('taskname').disabled = true;
	// $('con-text').disabled = true;
	Disabled();
	//updateContents();
	$.data.saveData(flag);
}

//packge input/textarea disabled attr
function Disabled() {
	$('dateFormate').style.display = "none";
	$('subtitle').disabled = true;
	$('taskname').disabled = true;
	$('con-text').disabled = true;
}

function DisabledFalse() {
	$('dateFormate').style.display = "inline-block";
	$('subtitle').disabled = false;
	$('taskname').disabled = false;
	$('con-text').disabled = false;
}

//Cookie
// $.cookieUtil = {
// 	get: function(name) {
// 		var cookieName = encodeURIComponent(name) + "=",
// 			cookieStart = document.cookie.indexOf(cookieName),
// 			cookieValue = null;
// 		if (cookieStart > -1) {
// 			var cookieEnd = document.cookie.indexOf(";", cookieStart);
// 			if (cookieEnd == -1) {
// 				cookieEnd = document.cookie.length;
// 			}
// 			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
// 		}
// 		return cookieValue;
// 	},
// 	set: function(name, value) {
// 		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
// 		document.cookie = cookieText;
// 	},
// 	unset: function(name) {
// 		this.set(name, "");
// 	},
// };

//save localStorage————————————————————————————
/* data default save way
var userData = {
	defaultCategory: {
		name: "默认分类",
		subCategories: [
			{
				name: "task1",
				tasks: [
					{
						name: "to-do-1",
						createtime: "2015-08-21",
						updatetime: "2015-08-21",
						contents: "完成编码",
						isFinished: false
					},
					{
						name: "to-do-2",
						createtime: "2015-08-21",
						updatetime: "2015-08-21",
						contents: "完成编码",
						isFinished: false
					}
				]
			}	
		]
	},
	categories: [
		{
			name: "百度IFe",
			subCategories: [
				{
					name: "task2222",
					task: [
						{
							name: "to-do-2222",
							createtime: "2015-08-22",
							updatetime: "2015-08-22",
							contents: "百度IFe文本域",
							isFinished: false
						},
						{
							name: "to-do-4444",
							createtime: "2015-08-22",
							updatetime: "2015-08-22",
							contents: "百度IFe文本域",
							isFinished: false
						}
					]
				}
			]
		}
	]
};*/
//userData object 
var userDATA = {
	defaultCategory: {
		name: "默认分类",
		subCategories: [
			//name: "默认task",
			//id: "",
			// tasks: [{
			// 	name: "默认todo",
			// 	createtime: $.date.dateFormat(),
			// 	updatetime: showYYYYMMDD($.date.dateFormat(), false),
			// 	contents: "以完成默认加载",
			// 	isFinished: false
			// }]
		]
	},
	categories: [

	]
};

// userData operation
$.data = {
	// save data use storage JSON format
	setDefaultStorage: function(DATA) {
		localStorage.setItem("userData", JSON.stringify(DATA));
	},
	// return data userData Object
	getDefaultStorage: function() {
		return JSON.parse(localStorage.getItem("userData"));
	},
	// init page   load data
	loadDefaultData: function() {
		//if (!localStorage.getItem('flag')) {
		$.data.setDefaultStorage(userDATA);
			// $('subtitle').value = '';
			// $('taskname').value = '';
			// $('con-text').value = '';
			//$.cookieUtil.unset("flag");
		// } else {
		// 	return false;
		// }
		// localStorage.setItem("flag","loadDone");
		// $.cookieUtil.set('flag', true);
		// set value == null
		var userData = $.data.getDefaultStorage();
		//nav zone
		var defaultCategoryP = userData.defaultCategory.name;
		var div = createElement('div');
		var p = createElement('p');
		var ul = createElement('ul');
		addClass(div, 'category-list');
		div.id = "category-default";
		defaultCategory = div;
		//currentCategory = defaultCategory;
		addClass(p, 'category-p')
		p.innerHTML = defaultCategoryP + spanStr;
		appendChild(div, p);
		appendChild(div, ul);
		appendChild($('category'), div);
		// // subnav zone 
		// var categoryItemName = userData.defaultCategory.subCategories[0].name;
		// var curCate_id = currentCategory.id;
		// var uls = $(curCate_id).getElementsByTagName('ul');
		// var li = createElement('li');
		// li.id = $.date.dateFormat();
		// li.innerHTML = categoryItemName + "<span>(0)</span>" + aStr;
		// uls[0].appendChild(li);
		// // middel task  zone
		// with(userData.defaultCategory.subCategories[0].tasks[0]) {
		// 	var taskName = name;
		// 	var taskTiem = createtime;
		// 	var taskContent = contents;
		// }
		// var div = createElement('div');
		// var dl = createElement('dl');
		// var dt = createElement('dt');
		// var dd = createElement('dd');
		// var time = $.date.dateFormat();
		// dt.innerHTML = $.date.dateYMD();
		// dd.innerHTML = taskName + aStr;
		// dl.appendChild(dt);
		// dl.appendChild(dd);
		// div.appendChild(dl);
		// addClass(div,'task-item');
		// div.id = "task-item-" + time;
		// $('task').appendChild(div);
		// // main zone
		// $('subtitle').value = taskName;
		// $('taskname').value = $.date.dateYMD();
		// $('con-text').value = taskContent;
	},
	// click item  show tasks
	showTask: function() {
		itemLength = getItemPos(currentCategory_item);
		var userData = $.data.getDefaultStorage();
		var itemTasks = userData.defaultCategory.subCategories[itemLength].tasks;
		//traverseArray(itemTasks);
		removeAllClass('dd', 'active');
	},
	// click tasks show content
	showContent: function() {
		itemLength = getItemPos(currentCategory_item);
		categoryLength = getCategoryPos(currentCategory_item.parentNode.parentNode);
		taskLength = getTaskPos(currentTaskName);
		var userData = $.data.getDefaultStorage();
		if (currentCategory_item.parentNode.parentNode == defaultCategory) {
			var tasks = userData.defaultCategory.subCategories[itemLength].tasks[taskLength];
		} else {
			var tasks = userData.categories[categoryLength].subCategories[itemLength].tasks[taskLength];
		}
		//console.log(tasks);
		$('subtitle').value = tasks.name;
		$('taskname').value = showYYYYMMDD(tasks.updatetime, true);
		$('con-text').value = tasks.contents;
	},
	saveData: function(flag) {
		//console.log(categoryLength + '1');
		var user_Data = $.data.getDefaultStorage();
		itemLength = getItemPos(currentCategory_item);
		taskLength = getTaskPos(currentTaskName);
		if (currentCategory == defaultCategory) {
			var user__Data = user_Data.defaultCategory.subCategories[itemLength].tasks[taskLength];
			// user__Data.name = $('subtitle').value;
			// user__Data.updatetime = changeYYYYMMDD();
   //          //console.log(user__Data.updatetime);
			// changeDt(currentTaskName).innerHTML = $('taskname').value;
			// user__Data.contents = $('con-text').value;
			// user__Data.isFinished = flag;
		} else {
			categoryLength = getCategoryPos(currentCategory_item.parentNode.parentNode);
			var user__Data = user_Data.categories[categoryLength].subCategories[itemLength].tasks[taskLength];
		}
		user__Data.name = $('subtitle').value;
		user__Data.updatetime = changeYYYYMMDD();
        //console.log(user__Data.updatetime);
		changeDt(currentTaskName).innerHTML = $('taskname').value;
		user__Data.contents = $('con-text').value;
		user__Data.isFinished = flag;
		$.data.setDefaultStorage(user_Data);
	}
};

// accord dt.innerHTML/updatime to find in tasks index
function getTaskPos(currentTaskName) {
	itemLength = getItemPos(currentCategory_item);
	categoryLength = getCategoryPos(currentCategory_item.parentNode.parentNode);
	var userData = $.data.getDefaultStorage();
	if (currentCategory_item.parentNode.parentNode == defaultCategory) {
		var tasks = userData.defaultCategory.subCategories[itemLength].tasks;
	} else {
		var tasks = userData.categories[categoryLength].subCategories[itemLength].tasks;
	}	
	//console.log(tasks);
	for (var i = 0; i < tasks.length; i++) {
		//console.log(tasks[i].createtime);
		if (tasks[i].createtime == currentTaskName.id) {
			return i;
		}
	}
}



// sort tasks in localstorage 
function sortTasks(currentCategory_item, finish, flag) {
	itemLength = getItemPos(currentCategory_item);
	categoryLength = getCategoryPos(currentCategory_item.parentNode.parentNode);
	currentCategory = currentCategory_item.parentNode.parentNode;
	var user_Data = $.data.getDefaultStorage();
	if (currentCategory == defaultCategory) {
		var user__Data = user_Data.defaultCategory.subCategories[itemLength].tasks;
	} else {
		var user__Data = user_Data.categories[categoryLength].subCategories[itemLength].tasks;
	}
	//console.log(user__Data);
	if (finish) {
		if (flag) {
			var user__Data = findIsFinish(currentCategory_item, flag);
		} else {
			var user__Data = findIsFinish(currentCategory_item, flag);
		}
	}
	//console.log(user__Data);
	var updatetimeArr = [];
	for (var i = 0; i < user__Data.length; i++) {
		updatetimeArr.push(user__Data[i].updatetime);
	};
	updatetimeArr.sort();
	updatetimeArr = uniqArray(updatetimeArr);
	//console.log(updatetimeArr);
	$('task').innerHTML = '';
	updatetimeArr.forEach(function (item, index, array) {
		//create div Element sort by updatetime
		var div = createElement('div');
		var dl = createElement('dl');
		var dt = createElement('dt');
		dt.innerHTML = showYYYYMMDD(item,true);
		dl.appendChild(dt);
		div.appendChild(dl);
		addClass(div, 'task-item');
		$('task').appendChild(div);
	});
	// insert data to div
	for (var i = 0; i < user__Data.length; i++) {
		insertData(user__Data[i].updatetime, user__Data[i].name, user__Data[i].createtime);
	}
	findSpan(currentCategory_item);
	findAllTask();
}

// packge insert data to div
function insertData(updatetime, taskname, id) {
	var updatetimeYYYYMMDD = showYYYYMMDD(updatetime, true);
	var dl = getDt(updatetimeYYYYMMDD).parentNode;
	var dd = createElement('dd');
	dd.innerHTML = taskname + aStr;
	dd.id = id;
	dl.appendChild(dd);
	// removeAllClass('dd', 'active');
	// addClass(dd, 'active');
}

//uniq array
function uniqArray(arr) {
    var obj = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        obj[arr[i]] = true;
    }
    return Object.keys(obj);
}

//compare array order
// function compareArray(value1, value2) {
// 	if (value1 < value2) {
// 		return -1;
// 	} else if (value1 > value2) {
// 		return 1;
// 	} else {
// 		return 0;
// 	}
// }

// change YYYY-MM-DD to YYYYMMDD
function changeYYYYMMDD() {
    var value = $('taskname').value;
    var arr = value.split('-');
    var arrStr = arr.join('');
    return arrStr;
}

//packge task method 
function createTask(dtvalue, taskname) {  // porblem
	var div = createElement('div');
	var dl = createElement('dl');
	var dt = createElement('dt');
	var dd = createElement('dd');
	//if (true) {};
	//var time = $.date.dateFormat();
	dt.innerHTML = showYYYYMMDD(dtvalue,true);
	dd.innerHTML = taskname + aStr;
	dd.id = $.date.dateFormat();
	dl.appendChild(dt);
	dl.appendChild(dd);
	div.appendChild(dl);
	addClass(div, 'task-item');
	//div.id = "task-item-" + time;
	$('task').appendChild(div);
	removeAllClass('dd', 'active');
	addClass(dd, 'active');
	currentTaskName = dd;
	// console.log(currentCategory_item);
	// console.log(currentTaskName);
	// console.log(taskname);
	// saveDefaultTask(currentCategory_item, currentTaskName, taskname);
	// $.data.showContent();
}

//get category position
function getCategoryPos(currentCategory) {
	var divs = $('category').getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].id == currentCategory.id) {
			return	i - 1;
		}
	}
}

// find itme position
function getItemPos(element) {
	if (element.parentNode.parentNode == defaultCategory) {
		var lis = $('category-default').getElementsByTagName('li');
		for (var i = 0; i < lis.length; i++) {
			if (element.id == lis[i].id) {
				return i;
			}
		}
	} else {
		var category = element.parentNode.parentNode;
		var lis = category.getElementsByTagName('li');
		for (var i = 0; i < lis.length; i++) {
			if (element.id == lis[i].id) {
				return i;
			}
		}
	}
}
// find task position
function getContentPos(element) {
	var elementPar = element.parentNode.parentNode;
	var dds = $('task').getElementsByTagName('dd');
	for (var i = 0; i < dds.length; i++) {
		if (element.id == dds[i].id) {
			return i;
		}
	};
}

// click item  traverse array create task
function traverseArray(array) {
	var length = array.length;
	for (var i = 0; i < length; i++) {
		createTask(array[i].name);
	};
}

// form YYYYMMDDHHMMSS to  YYYY-MM-DD
function showYYYYMMDD(str, isGan) {
	if (str.substring(4, 5) != '0') {
        var str = str.substring(0, 7);
		var month = '0' + str.substring(4, 5);
        var date = str.substring(5);
	} else {
        var str = str.substring(0, 8);
		var month = str.substring(4, 6);
        var date = str.substring(6);
	}
	var year = str.substring(0, 4);
    if (isGan) {
        return year + '-' + month + '-' + date;
    } else {
        return year + month + date;
    }

}

// accord currentTask  chagne dt.value
function changeDt(element) {
	var dl = element.parentNode;
	var dt = dl.getElementsByTagName('dt')[0];
	return dt;
}

function findIsFinish(currentCategory_item, flag) {
	itemLength = getItemPos(currentCategory_item);
	categoryLength = getCategoryPos(currentCategory_item.parentNode.parentNode);
	currentCategory = currentCategory_item.parentNode.parentNode;
	var user_Data = $.data.getDefaultStorage()
	if (currentCategory_item.parentNode.parentNode == defaultCategory) {
		var user__Data = user_Data.defaultCategory.subCategories[itemLength].tasks;
	} else {
		var user__Data = user_Data.categories[categoryLength].subCategories[itemLength].tasks;
	}
	var isFinish = [];
	for (var i = 0; i < user__Data.length; i++) {
		if (user__Data[i].isFinished == flag) {
			isFinish.push(user__Data[i]);
		}
	}
	return isFinish;
}

// page refresh keep status
$.renderElement = {
	renderCategory: function () {
		var userData = $.data.getDefaultStorage();
		var idLocalStorage = JSON.parse(localStorage.getItem("CatrgoryId"));
		// defaultCategory
		var defaultCategoryP = userData.defaultCategory.name;
		var div = createElement('div');
		var p = createElement('p');
		var ul = createElement('ul');
		addClass(div, 'category-list');
		div.id = "category-default";
		addClass(p, 'category-p');
		//var spanStr = "<span>( " + userData.defaultCategory.subCategories.length + " )</span>";
		p.innerHTML = defaultCategoryP + "<span>( 0 )</span>";
		appendChild(div, p);
		appendChild(div, ul);
		appendChild($('category'), div);
		defaultCategory = $('category-default');
		//console.log(div.id);
		p.innerHTML = defaultCategoryP + "<span>(" + " " + $.renderElement.renderPNum($("category-default")) + " " + ")</span>";
		//console.log($.renderElement.renderPNum($("category-default")));
		// console.log(1111111);
		// console.log(p);
        // item 
		if (userData.defaultCategory.subCategories.length) {
			var user_Data = userData.defaultCategory.subCategories;
			//var categoryliid = idLocalStorage[0];
			for (var j = 0; j < user_Data.length; j++) {
				var uls = $('category-default').getElementsByTagName('ul');
				var li = createElement('li');                
				li.id = user_Data[j].id;
				var spanStr = "<span>(" + " " + user_Data[j].tasks.length + " " + " ) </span>";
				li.innerHTML = user_Data[j].name + spanStr + aStr;
                //console.log(user_Data[j].tasks.length);
				uls[0].appendChild(li);
				$.renderElement.renderitemNum($(li.id));
				//findSpan($(li.id));
			}
		}
		// not defaultCategory
		if (userData.categories.length) {
			var user_Data = userData.categories;
			var divID = idLocalStorage;
			for (var i = 0; i < user_Data.length; i++) {
				var div = createElement('div');
				var p = createElement('p');
				var ul = createElement('ul');
				//var time = $.date.dateFormat();
				addClass(div, "category-list");
				div.id = divID[i];
				addClass(p, 'category-p');
				//var spanStr = "<span>( " + user_Data[i].subCategories.length + " )</span>";
				p.innerHTML = user_Data[i].name + spanStr + aStr;
				div.appendChild(p);
				div.appendChild(ul);
				$('category').appendChild(div);
				p.innerHTML = user_Data[i].name + "<span>(" + " " + $.renderElement.renderPNum($(div.id)) + " " + ")</span>" + aStr;

				// not defaultCategory 
				//item 
				if (user_Data[i].subCategories.length) {
					var user__Data = user_Data[i].subCategories;
					//var divliId = idLocalStorage[2];
					console.log(11111);
					for (var k = 0; k < user__Data.length; k++) {
						var curCate_id = divID[i];
						var uls = $(curCate_id).getElementsByTagName('ul');
						var li = createElement('li');
						li.id = user__Data[k].id;
						li.innerHTML = user__Data[k].name + spanStr + aStr;
						uls[0].appendChild(li);
						//console.info(1111111);
						//console.log($(li.id));
						li.innerHTML = user__Data[k].name + "<span>(" + " " + $.renderElement.renderitemNum($(li.id)) + " " + ")</span>" + aStr;
						
                        //findSpan($(li.id));
						//console.log(currentCategory_item);
						// if (hasClass(li.parentNode.previousSibling, 'active')) {
						// 	removeClass(li.parentNode.previousSibling, 'active');
						// }
						// addClass(li, 'active')
						// saveItemValue(currentCategory_item, value);
						// $('task').innerHTML = '';
					}
				}
			}
		}
		findAllTask();
		currentCategory = '';
		currentCategory_item = '';
		currentTaskName = '';
		//var current = JSON.parse(localStorage.getItem("current"));
		//console.log($(current[0]))
		//sortTasks($(current[1]));
		//		switch (current.length) {
		//			case '1':
		//
		//				break;
		//			case '2':
		//				addClass($(current[1]), 'active');
		//                currentCategory_item = $(current[1]);
		//		}
	},
	renderActive: function () {
        var currentActive = JSON.parse(localStorage.getItem('currentActive'));
        if (currentActive[0].length) {
            var p = $(currentActive[0][0]).getElementsByTagName('p');
            addClass(p[0], 'active')
        }
        if (currentActive[1].length) {
            currentCategory_item = $(currentActive[1][0]);
            //console.log(currentCategory_item);
            addClass(currentCategory_item, 'active');
			sortTasks(currentCategory_item);
            //findSpan(currentCategory_item);
			if (currentActive[2].length) {
				currentTaskName = $(currentActive[2][0]);
				addClass(currentTaskName, 'active');
				$.data.showContent();
			}
        }
		findAllTask();
	},
    renderitemNum: function (itemElement) {
        itemLength = getItemPos(itemElement);
		categoryLength = getCategoryPos(itemElement.parentNode.parentNode);
		currentCategory = itemElement.parentNode.parentNode;
		var user_Data = $.data.getDefaultStorage();
		if (currentCategory == defaultCategory) {
			var user__Data = user_Data.defaultCategory.subCategories[itemLength].tasks;
		} else {
			var user__Data = user_Data.categories[categoryLength].subCategories[itemLength].tasks;
		}
		return user__Data.length;
    },
	renderPNum: function (pElement) {
		categoryLength = getCategoryPos(pElement);
		var userData = $.data.getDefaultStorage();
		var count = 0;
		//console.info(pElement);
		if (pElement == defaultCategory) {
			var user_Data = userData.defaultCategory.subCategories;
			// if (user_Data.length) {
			// 	for (var i = 0; i <  user_Data.length; i++) {
			// 		count = count + user_Data[i].tasks.length;
			// 		//console.info(count);
			// 	}
			// 	return count;
			// } else {
			// 	return 0;
			// }
		} else {
			 var user_Data = userData.categories[categoryLength].subCategories;
			// if (user_Data.length) {
			// 	for (var i = 0; i <  user_Data.length; i++) {
			// 		count = count + user_Data[i].tasks.length;
			// 		//console.info(count);
			// 	}
			// 	return count;
			// } else {
			// 	return 0;
			// }
		}
		//console.log(user_Data.length);
		if (user_Data.length) {
			for (var i = 0; i <  user_Data.length; i++) {
				count = count + user_Data[i].tasks.length;
				//console.info(count);
			}
			return count;
		} else {
			return 0;
		}
	}
};

// save category id to localStorage
var categoryIddArr = [];
//function setLiLocalStorage(id) {
//	categoryIddArr[0].push(id);
//	localStorage.setItem("CatrgoryId",JSON.stringify(categoryIddArr));
//}

function setDivLocalStorage(id) {
	categoryIddArr.push(id);
	localStorage.setItem("CatrgoryId",JSON.stringify(categoryIddArr));
}

//function setnotDefaultLiLocalStorage(id) {
//	categoryIddArr[2].push(id);
//	localStorage.setItem("CatrgoryId",JSON.stringify(categoryIddArr));
//}

// save current status
// ------------------------------not done 
function setCurrent(currentCategory, currentCategory_item, currentTaskName) {
	// var a = currentCategory,
	// 	b = currentCategory_item,
	// 	c = currentTaskName;
	// var arr = [a, b, c];
    if (document.querySelectorAll('.active').length) {
        var activesArr = [[], [], []];
        var actives = document.querySelectorAll('.active');
       	console.log(actives);
        for (var i = 0; i < actives.length; i++) {
            //console.log(actives[i]);
//            if (actives[i].tagName === "P") {
//                activesArr[0].push(actives[i].parentNode.id);
//            }
//            if (actives[i].tagName)
//            activesArr[1].push(actives[i].id);
            switch (actives[i].tagName) {
				case "P":
                    activesArr[0].push(actives[i].parentNode.id);
                    break;
				case "LI":
                    activesArr[1].push(actives[i].id);
                    break;
				case "DD":
                    activesArr[2].push(actives[i].id);
                    break;
            }
        }
//        console.log(actives);
        localStorage.setItem("currentActive", JSON.stringify(activesArr));
    }
	//localStorage.setItem("current", JSON.stringify(arr));
}