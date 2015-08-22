// gloable variable
var aStr = "<a href='#'>删除</a>";
//return ID
function $ (id) {
	return document.getElementById(id);
}

// return element
function createElement (element) {
	return document.createElement(element);
}

// append element
function appendChild (elementP,elementC) {
	return elementP.appendChild(elementC);
}

//handle CLass—————————————————————————————————————————
function hasClass (element,className) {
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
function addClass (element,className) {
	if (!hasClass(element,className)) {
		element.className = element.className ? [element.className,className].join(' ') : className;
	}
}
// removeClassName
function removeClass (element,className) {
	if (className && hasClass(element,className)) {
		var classNames = element.className.split(/\s+/);
		for (var i = 0; i < classNames.length; i++) {
			if (classNames[i] == className) {
				classNames.splice(i,1);
				break;
			}
		};
	}
	element.className = classNames.join(' ');
}
// removeAll className="active"
function removeAllClass (tag,className) {
	if (tag != 'dd') {
		var classNames = $('nav').getElementsByClassName(className);
		for (var i = 0; i < classNames.length; i++) {
			removeClass(classNames[i],className);
		}
	} else {
		var classNames = $('subnav').getElementsByClassName(className);
		for (var i = 0; i < classNames.length; i++) {
			if (removeClass(classNames[i],className)) {
				return true;
			}
		}
		return false;
	}
}

// judge p is have 'active'
function isPhasActive () {
	var ps = $('category').getElementsByTagName('p');
	for (var i = 1; i < ps.length; i++) {
		if (hasClass(ps[i],'active')) {
			return true;
		}
	}
	return false;
}

//find dt element ——————————————————————————————————
function getDt () {
	var dts = $('task').getElementsByTagName('dt');
	var dtsStr;
	var timeStr = parseFloat($.date.dateDate());
	for (var i = 0; i < dts.length; i++) {
		dtsStr = dts[i].innerHTML.split('-');
		if (dtsStr[dtsStr.length - 1] == timeStr) {
			return dts[i];
		}
	};
}

// handle event ——————————————————————————————————
$.event = {
	addEvent: function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + tyep, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	getEvent: function (event) {
		return event || window.event;
	},
	getTarget: function (event) {
		return event.target ||  event.srcElement;
	},
	delegateEvent: function (element,tag,eventtype,handler) {
		$.event.addEvent(element,eventtype,function(e) {
			var event = $.event.getEvent(e);
			var target = $.event.getTarget(e);
			if (target && target.tagName === tag.toUpperCase()) {
				handler.call(target,event);
			}
		});
	}

};

$.addEvent = function (element, type, handler) {
	return $.event.addEvent(element,type,handler);
}
$.delegate = function (element, tag, event, listener) {
    return $.event.delegateEvent(element, tag, event, listener);
};

//get tiem & year+month+date+hours+minutes+seconds———————————————————————
$.date = {
	dateNow:function () {
		return new Date();
	},
	dateDate: function () {
		return $.date.dateNow().getDate();
	},
	dateFormat: function () {
		var year = $.date.dateNow().getFullYear().toString(),
			month = ($.date.dateNow().getMonth() + 1).toString(),
			date = $.date.dateNow().getDate().toString(),
			hour = $.date.dateNow().getHours().toString(),
			minute = $.date.dateNow().getMinutes().toString(),
			second = $.date.dateNow().getSeconds().toString();
		return year + month + date + hour + minute + second;
	},
	dateYMD: function () {
		var year = $.date.dateNow().getFullYear(),
			month = '0' + ($.date.dateNow().getMonth() + 1),
			date = $.date.dateNow().getDate();
		return year + '-' + month + '-' + date;
	},
	dateCompare: function () {
		var dts = $('task').getElementsByTagName('dt');
		var dtsStr;
		var timeStr = parseFloat($.date.dateDate());
		for (var i = 0; i < dts.length; i++) {
			dtsStr = dts[i].innerHTML;
			var dateStr = dtsStr.split('-');
			if (dateStr[dateStr.length-1] == timeStr) {
				return false;
			}
		};
		return true;
	}
};

//add  ———————— item and task———————————————————————————————————————— 
//subitem——————————————
$.newContent = {
	newCategoryItem: function () {
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

		if (!currentCategory_item ) {
			if (!isPhasActive() && currentCategory) {
				var value = $.newContent.getCategoryName();
				var div = createElement('div');
				var p = createElement('p');
				var ul = createElement('ul');
				var time = $.date.dateFormat();
				addClass(div,"category-list");
				div.id = "category-item-" + time;
				addClass(p,'category-p');
				p.innerHTML = value + "<span>(10)</span>" + aStr;
				div.appendChild(p);
				div.appendChild(ul);
				$('category').appendChild(div);
			} else { 
				var value = $.newContent.getCategoryItem();
				console.log(currentCategory);
				var curCate_id = currentCategory.id;
				var uls = $(curCate_id).getElementsByTagName('ul');
				var li = createElement('li');
				li.id = $.date.dateFormat();
				li.innerHTML = value + "<span>(5)</span>" + aStr;
				uls[0].appendChild(li);
			}
		} else if (currentCategory == currentCategory_item.parentNode.parentNode) {
			var value = $.newContent.getCategoryItem();
			console.log(currentCategory);
			var curCate_id = currentCategory.id;
			var uls = $(curCate_id).getElementsByTagName('ul');
			var li = createElement('li');
			li.id = $.date.dateFormat();
			li.innerHTML = value + "<span>(5)</span>" + aStr;
			uls[0].appendChild(li);
		}
	},
	newTask: function () {
		if (!$.date.dateCompare()) {
			//build li element on old element
			var value = $.newContent.getTaskItem();
			var dl = getDt().parentNode;
			var dd = createElement('dd');
			dd.innerHTML = value + aStr;
			dl.appendChild(dd);
		} else {
			var value = $.newContent.getTaskItem();
			createTask(value);
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
			// $('task').appendChild(div);
		}
	},
	getCategoryName: function () {
		return prompt("请输入分类名称：");
	},
	getCategoryItem: function () {
		return prompt("请输入子类名称：");
	},
	getTaskItem: function () {
		return prompt("请输入任务名称：");
	}
};

//change input、textarea  disabled 
function edit () {
	if ($('subtitle').value == '') {
		return;
	}
	//$('dateFormate').style.display = "inline-block";
	// $('subtitle').disabled = false;
	// $('taskname').disabled = false;
	// $('con-text').disabled = false;
	 changeDisabled();
}

function save () {
	if ($('subtitle').value == '') {
		return;
	}
	//$('dateFormate').style.display = "none";
	// $('subtitle').disabled = true;
	// $('taskname').disabled = true;
	// $('con-text').disabled = true;
	changeDisabled();
	$.data.saveData();
}

//packge input/textarea disabled attr
function changeDisabled () {
	if ($('subtitle').disabled) {
		$('dateFormate').style.display = "inline-block";
		$('subtitle').disabled = false;
		$('taskname').disabled = false;
		$('con-text').disabled = false;
	} else {
		$('dateFormate').style.display = "none";
		$('subtitle').disabled = true;
		$('taskname').disabled = true;
		$('con-text').disabled = true;
	}
}

//save localStorage————————————————————————————
/* data default sace way
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
var userData = {
	defaultCategory: {
		name: "默认分类",
		subCategories: [
			{
				name: "默认task",
				tasks: [
					{
						name: "默认todo",
						createtime: $.date.dateFormat(),
						updatetime: null,
						contents: "以完成默认加载",
						isFinished: true
					}
				]
			}
		]
	},
	categories: [

	]
};


// userData operation
$.data = {
	// save data use storage JSON format
	setDefaultStorage: function () {
		localStorage.setItem("userData",JSON.stringify(userData));
	},
	// return data userData Object
	getDefaultStorage: function () {
		return JSON.parse(localStorage.getItem('userData'));
	},
	// init page   load data
	loadDefaultData: function () {
		$.data.setDefaultStorage();
		var userData = $.data.getDefaultStorage();
		//nav zone
		var defaultCategoryP = userData.defaultCategory.name;
		var div = createElement('div');
		var p = createElement('p');
		var ul = createElement('ul');
		addClass(div,'category-list');
		div.id = "category-default";
		defaultCategory = div;
		currentCategory = defaultCategory;
		addClass(p,'category-p active')
		p.innerHTML = defaultCategoryP + "<span>(10)</span>"
		appendChild(div,p);
		appendChild(div,ul);
		appendChild($('category'),div);
		// // subnav zone 
		var categoryItemName = userData.defaultCategory.subCategories[0].name;
		var curCate_id = currentCategory.id;
		var uls = $(curCate_id).getElementsByTagName('ul');
		var li = createElement('li');
		li.id = $.date.dateFormat();
		li.innerHTML = categoryItemName + "<span>(5)</span>" + aStr;
		uls[0].appendChild(li);
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
	showTask: function () {
		itemLength = getItemPos(currentCategory_item);
		var itemTasks = userData.defaultCategory.subCategories[itemLength].tasks;
		traverseArray(itemTasks);
	},
	// click tasks show content
	showContent: function () {
		taskLength = getContentPos(currentTaskName);
		var tasks = userData.defaultCategory.subCategories[itemLength].tasks[taskLength];
		$('subtitle').value = tasks.name;
		$('taskname').value = showYYYYMMDD(tasks.createtime);
		$('con-text').value = tasks.contents;
	},
	saveData: function () {
		if (currentCategory == defaultCategory) {
			var userdata = userData.defaultCategory.subCategories[itemLength].tasks[taskLength];


		}

	}
};  

// 
function createTask (taskname) {
	var div = createElement('div');
	var dl = createElement('dl');
	var dt = createElement('dt');
	var dd = createElement('dd');
	var time = $.date.dateFormat();
	dt.innerHTML = $.date.dateYMD();
	dd.innerHTML = taskname + aStr;
	dd.id = $.date.dateFormat();
	dl.appendChild(dt);
	dl.appendChild(dd);
	div.appendChild(dl);
	addClass(div,'task-item');
	div.id = "task-item-" + time;
	$('task').appendChild(div);
}


function getItemPos (element) {
	if (element.parentNode.parentNode == defaultCategory) {
		var lis = $('category-default').getElementsByTagName('li');
		for (var i = 0; i < lis.length; i++) {
				if (element.id == lis[i].id) {
					return i;
				}
		}
	}
	return false;
}

function getContentPos (element) {
	var elementPar = element.parentNode.parentNode;
	var dds = $(elementPar.id).getElementsByTagName('dd');
	for (var i = 0; i < dds.length; i++) {
			if (element.id == currentTaskName.id ) {
				return i;
			}
	};
}

function traverseArray (array) {
	var length = array.length;
	for (var i = 0; i < length; i++) {
		createTask(array[i].name);
	};
}

function showYYYYMMDD (str) {
	var str = str.substring(0,7);
	var date = str.substring(5);
	if (str.substring(4,5) != '0') {
		var month = '0' + str.substring(4,5)
	} else {
		var month = str.substring(4,6);
	}
	var year = str.substring(0,4);
	return year + '-' + month + '-' + date;
}