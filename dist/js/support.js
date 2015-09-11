function $(e){return document.getElementById(e)}function createElement(e){return document.createElement(e)}function appendChild(e,t){return e.appendChild(t)}function hasClass(e,t){var a=e.className;if(!a)return!1;a=a.split(/\s+/);for(var r=0;r<a.length;r++)if(a[r]==t)return!0;return!1}function addClass(e,t){hasClass(e,t)||(e.className=e.className?[e.className,t].join(" "):t)}function removeClass(e,t){if(t&&hasClass(e,t))for(var a=e.className.split(/\s+/),r=0;r<a.length;r++)if(a[r]==t){a.splice(r,1);break}e.className=a.join(" ")}function removeAllClass(e,t){if("li"==e)for(var a=$("nav").getElementsByClassName(t),r=0;r<a.length;r++)removeClass(a[r],t);else for(var a=$("subnav").getElementsByClassName(t),r=0;r<a.length;r++)removeClass(a[r],t)}function isPhasActive(){for(var e=$("category").getElementsByTagName("p"),t=1;t<e.length;t++)if(hasClass(e[t],"active"))return!0;return!1}function isHasDiv(){var e=$("task").getElementsByTagName("div").length;return 0!=e?!0:!1}function getDt(e){for(var t=$("task").getElementsByTagName("dt"),a=0;a<t.length;a++)if(t[a].innerHTML==e)return t[a]}function findPValueonDelete(e){var t=$.data.getDefaultStorage(),a=[],r=e.parentNode.parentNode;categoryLength=getCategoryPos(r);var n=r.getElementsByTagName("span")[0];if(r==defaultCategory)var s=t.defaultCategory.subCategories;else var s=t.categories[categoryLength].subCategories;for(var o=0;o<s.length;o++)a.push(s[o].tasks.length);if(0==a.length)return n.innerHTML="( 0 )";var g=a.reduce(function(e,t,a,r){return e+t});n.innerHTML="( "+g+" )"}function findSpan(e){var t=e.parentNode.parentNode,a=e.getElementsByTagName("span")[0],r=t.getElementsByTagName("span")[0];itemLength=getItemPos(e),categoryLength=getCategoryPos(t);var n=$.data.getDefaultStorage(),s=[];if(t==defaultCategory)var o=n.defaultCategory.subCategories,g=n.defaultCategory.subCategories[itemLength].tasks;else var o=n.categories[categoryLength].subCategories,g=n.categories[categoryLength].subCategories[itemLength].tasks;a.innerHTML="( "+g.length+" )";for(var i=0;i<o.length;i++)s.push(o[i].tasks.length);var l=s.reduce(function(e,t,a,r){return e+t});r.innerHTML="( "+l+" )"}function findAllTask(){for(var e=$("category").getElementsByTagName("p"),t=$("allTask"),a=0,r=/\d+/,n=1;n<e.length;n++){var s=e[n].getElementsByTagName("span")[0].innerHTML;a+=parseInt(r.exec(s)[0])}t.innerHTML="( "+a+" )"}function saveNewCategory(e){var t=$.data.getDefaultStorage(),a=t.categories;a[a.length]={},a[a.length-1].name=e,a[a.length-1].subCategories=[],$.data.setDefaultStorage(t)}function saveItemValue(e,t,a){itemLength=getItemPos(e);var r=$.data.getDefaultStorage();if(e.parentNode.parentNode==defaultCategory)var n=r.defaultCategory.subCategories;else{categoryLength=getCategoryPos(e.parentNode.parentNode);var n=r.categories[categoryLength].subCategories}n[n.length]={},n[n.length-1].name=t,n[n.length-1].tasks=[],n[n.length-1].id=a,$.data.setDefaultStorage(r)}function saveTaskValue(e,t){itemLength=getItemPos(e);var a=$.data.getDefaultStorage();if(e.parentNode.parentNode==defaultCategory){var r=a.defaultCategory.subCategories[itemLength].tasks;r[r.length]={},r[r.length-1].name=t,r[r.length-1].createtime=$.date.dateFormat(),r[r.length-1].updatetime=showYYYYMMDD(r[r.length-1].createtime,!1),r[r.length-1].contents="",r[r.length-1].isFinished=!1}else{categoryLength=getCategoryPos(currentCategory);var r=a.categories[categoryLength].subCategories[itemLength].tasks;r[r.length]={},r[r.length-1].name=t,r[r.length-1].createtime=$.date.dateFormat(),r[r.length-1].updatetime=showYYYYMMDD(r[r.length-1].createtime,!1),r[r.length-1].contents="",r[r.length-1].isFinished=!1}localStorage.setItem("cuurentTaskID",JSON.stringify(r[r.length-1].createtime)),$.data.setDefaultStorage(a)}function deleteCategory(e){categoryLength=getCategoryPos(e);var t=$.data.getDefaultStorage();t.categories[categoryLength]=null,spliceArray(t.categories),$.data.setDefaultStorage(t)}function deleteItemData(e){var t=$.data.getDefaultStorage();itemLength=getItemPos(e);var a=e.parentNode.parentNode;if(a==defaultCategory){var r=t.defaultCategory.subCategories;r[itemLength]=void 0,spliceArray(r)}else{var r=t.categories[categoryLength].subCategories;r[itemLength]=void 0,spliceArray(r)}$.data.setDefaultStorage(t)}function deleteTaskData(e,t,a){var r=$.data.getDefaultStorage();itemLength=getItemPos(a),categoryLength=getCategoryPos(t),taskLength=getTaskPos(e.parentNode),t==defaultCategory?(r.defaultCategory.subCategories[itemLength].tasks[taskLength]=void 0,spliceArray(r.defaultCategory.subCategories[itemLength].tasks),$.data.setDefaultStorage(r)):(r.categories[categoryLength].subCategories[itemLength].tasks[taskLength]=void 0,spliceArray(r.categories[categoryLength].subCategories[itemLength].tasks),$.data.setDefaultStorage(r))}function spliceArray(e){for(var t=0;t<e.length;t++)if(null==e[t])return e.splice(t,1),e}function idValue(e){return $(e).value}function edit(){""!=$("subtitle").value&&DisabledFalse()}function save(e){""!=$("subtitle").value&&(Disabled(),$.data.saveData(e))}function Disabled(){$("dateFormate").style.display="none",$("subtitle").disabled=!0,$("taskname").disabled=!0,$("con-text").disabled=!0}function DisabledFalse(){$("dateFormate").style.display="inline-block",$("subtitle").disabled=!1,$("taskname").disabled=!1,$("con-text").disabled=!1}function getTaskPos(e){itemLength=getItemPos(currentCategory_item),categoryLength=getCategoryPos(currentCategory_item.parentNode.parentNode);var t=$.data.getDefaultStorage();if(currentCategory_item.parentNode.parentNode==defaultCategory)var a=t.defaultCategory.subCategories[itemLength].tasks;else var a=t.categories[categoryLength].subCategories[itemLength].tasks;for(var r=0;r<a.length;r++)if(a[r].createtime==e.id)return r}function sortTasks(e,t,a){itemLength=getItemPos(e),categoryLength=getCategoryPos(e.parentNode.parentNode),currentCategory=e.parentNode.parentNode;var r=$.data.getDefaultStorage();if(currentCategory==defaultCategory)var n=r.defaultCategory.subCategories[itemLength].tasks;else var n=r.categories[categoryLength].subCategories[itemLength].tasks;if(t)if(a)var n=findIsFinish(e,a);else var n=findIsFinish(e,a);for(var s=[],o=0;o<n.length;o++)s.push(n[o].updatetime);s.sort(),s=uniqArray(s),$("task").innerHTML="",s.forEach(function(e,t,a){var r=createElement("div"),n=createElement("dl"),s=createElement("dt");s.innerHTML=showYYYYMMDD(e,!0),n.appendChild(s),r.appendChild(n),addClass(r,"task-item"),$("task").appendChild(r)});for(var o=0;o<n.length;o++)insertData(n[o].updatetime,n[o].name,n[o].createtime);findSpan(e),findAllTask()}function insertData(e,t,a){var r=showYYYYMMDD(e,!0),n=getDt(r).parentNode,s=createElement("dd");s.innerHTML=t+aStr,s.id=a,n.appendChild(s)}function uniqArray(e){for(var t={},a=0,r=e.length;r>a;a++)t[e[a]]=!0;return Object.keys(t)}function changeYYYYMMDD(){var e=$("taskname").value,t=e.split("-"),a=t.join("");return a}function createTask(e,t){var a=createElement("div"),r=createElement("dl"),n=createElement("dt"),s=createElement("dd");n.innerHTML=showYYYYMMDD(e,!0),s.innerHTML=t+aStr,s.id=$.date.dateFormat(),r.appendChild(n),r.appendChild(s),a.appendChild(r),addClass(a,"task-item"),$("task").appendChild(a),removeAllClass("dd","active"),addClass(s,"active"),currentTaskName=s}function getCategoryPos(e){for(var t=$("category").getElementsByTagName("div"),a=0;a<t.length;a++)if(t[a].id==e.id)return a-1}function getItemPos(e){if(e.parentNode.parentNode==defaultCategory){for(var t=$("category-default").getElementsByTagName("li"),a=0;a<t.length;a++)if(e.id==t[a].id)return a}else for(var r=e.parentNode.parentNode,t=r.getElementsByTagName("li"),a=0;a<t.length;a++)if(e.id==t[a].id)return a}function getContentPos(e){for(var t=(e.parentNode.parentNode,$("task").getElementsByTagName("dd")),a=0;a<t.length;a++)if(e.id==t[a].id)return a}function traverseArray(e){for(var t=e.length,a=0;t>a;a++)createTask(e[a].name)}function showYYYYMMDD(e,t){if("0"!=e.substring(4,5))var e=e.substring(0,7),a="0"+e.substring(4,5),r=e.substring(5);else var e=e.substring(0,8),a=e.substring(4,6),r=e.substring(6);var n=e.substring(0,4);return t?n+"-"+a+"-"+r:n+a+r}function changeDt(e){var t=e.parentNode,a=t.getElementsByTagName("dt")[0];return a}function findIsFinish(e,t){itemLength=getItemPos(e),categoryLength=getCategoryPos(e.parentNode.parentNode),currentCategory=e.parentNode.parentNode;var a=$.data.getDefaultStorage();if(e.parentNode.parentNode==defaultCategory)var r=a.defaultCategory.subCategories[itemLength].tasks;else var r=a.categories[categoryLength].subCategories[itemLength].tasks;for(var n=[],s=0;s<r.length;s++)r[s].isFinished==t&&n.push(r[s]);return n}function setDivLocalStorage(e){categoryIddArr.push(e),localStorage.setItem("CatrgoryId",JSON.stringify(categoryIddArr))}function setCurrent(e,t,a){if(document.querySelectorAll(".active").length){var r=[[],[],[]],n=document.querySelectorAll(".active");console.log(n);for(var s=0;s<n.length;s++)switch(n[s].tagName){case"P":r[0].push(n[s].parentNode.id);break;case"LI":r[1].push(n[s].id);break;case"DD":r[2].push(n[s].id)}localStorage.setItem("currentActive",JSON.stringify(r))}}var aStr="<a href='#'>删除</a>",spanStr="<span>( 0 )</span>";$.event={addEvent:function(e,t,a){e.addEventListener?e.addEventListener(t,a,!1):e.attachEvent?e.attachEvent("on"+tyep,a):e["on"+t]=a},getEvent:function(e){return e||window.event},getTarget:function(e){return e.target||e.srcElement},delegateEvent:function(e,t,a,r){$.event.addEvent(e,a,function(e){var a=$.event.getEvent(e),n=$.event.getTarget(e);n&&n.tagName===t.toUpperCase()&&r.call(n,a)})}},$.addEvent=function(e,t,a){return $.event.addEvent(e,t,a)},$.delegate=function(e,t,a,r){return $.event.delegateEvent(e,t,a,r)},$.date={dateNow:function(){return new Date},dateDate:function(){return $.date.dateNow().getDate()},dateFormat:function(){var e=$.date.dateNow().getFullYear().toString(),t=($.date.dateNow().getMonth()+1).toString(),a=$.date.dateNow().getDate().toString(),r=$.date.dateNow().getHours().toString(),n=$.date.dateNow().getMinutes().toString(),s=$.date.dateNow().getSeconds().toString();return-1===a.indexOf("0")&&(a="0"+a),e+t+a+r+n+s},dateYMD:function(){var e=$.date.dateNow().getFullYear(),t="0"+($.date.dateNow().getMonth()+1),a=$.date.dateNow().getDate().toString();return-1===a.indexOf("0")&&(a="0"+a),e+"-"+t+"-"+a}},$.newContent={newCategoryItem:function(){if(currentCategory||currentCategory_item)if(currentCategory!=defaultCategory){currentCategory_item&&removeClass(currentCategory_item,"active");var e=$.newContent.getCategoryItem();if(!e)return;$("task").innerHTML="",$("subtitle").value="",$("taskname").value="",$("con-text").value="";var t=currentCategory.id,a=$(t).getElementsByTagName("ul"),r=createElement("li");r.id=$.date.dateFormat(),r.innerHTML=e+spanStr+aStr,a[0].appendChild(r),currentCategory_item=r,hasClass(r.parentNode.previousSibling,"active")&&removeClass(r.parentNode.previousSibling,"active"),addClass(r,"active"),saveItemValue(currentCategory_item,e,r.id),$("task").innerHTML=""}else{currentCategory_item&&removeClass(currentCategory_item,"active");var e=$.newContent.getCategoryItem();if(!e)return;$("task").innerHTML="",$("subtitle").value="",$("taskname").value="",$("con-text").value="";var a=$("category-default").getElementsByTagName("ul"),r=createElement("li");r.id=$.date.dateFormat(),r.innerHTML=e+spanStr+aStr,a[0].appendChild(r),currentCategory_item=r,saveItemValue(currentCategory_item,e,r.id),hasClass(r.parentNode.previousSibling,"active")&&removeClass(r.parentNode.previousSibling,"active"),addClass(r,"active")}else{var e=$.newContent.getCategoryName();if(!e)return;$("task").innerHTML="",$("subtitle").value="",$("taskname").value="",$("con-text").value="";var n=createElement("div"),s=createElement("p"),o=createElement("ul"),g=$.date.dateFormat();addClass(n,"category-list"),n.id="category-item-"+g,setDivLocalStorage(n.id),addClass(s,"category-p"),s.innerHTML=e+spanStr+aStr,n.appendChild(s),n.appendChild(o),currentCategory=n,saveNewCategory(e),$("category").appendChild(n),addClass(s,"active")}setCurrent(currentCategory.id,currentCategory_item.id),findAllTask()},newTask:function(){var e=$.newContent.getTaskItem();e&&(saveTaskValue(currentCategory_item,e),sortTasks(currentCategory_item),addClass($(JSON.parse(localStorage.getItem("cuurentTaskID"))),"active"),setCurrent(currentCategory.id,currentCategory_item.id,JSON.parse(localStorage.getItem("cuurentTaskID"))),$("subtitle").value=e,$("taskname").value=$.date.dateYMD(),$("con-text").value="")},getCategoryName:function(){return prompt("请输入分类名称：")},getCategoryItem:function(){return prompt("请输入子类名称：")},getTaskItem:function(){return prompt("请输入任务名称：")}};var userDATA={defaultCategory:{name:"默认分类",subCategories:[]},categories:[]};$.data={setDefaultStorage:function(e){localStorage.setItem("userData",JSON.stringify(e))},getDefaultStorage:function(){return JSON.parse(localStorage.getItem("userData"))},loadDefaultData:function(){$.data.setDefaultStorage(userDATA);var e=$.data.getDefaultStorage(),t=e.defaultCategory.name,a=createElement("div"),r=createElement("p"),n=createElement("ul");addClass(a,"category-list"),a.id="category-default",defaultCategory=a,addClass(r,"category-p"),r.innerHTML=t+spanStr,appendChild(a,r),appendChild(a,n),appendChild($("category"),a)},showTask:function(){itemLength=getItemPos(currentCategory_item);var e=$.data.getDefaultStorage();e.defaultCategory.subCategories[itemLength].tasks;removeAllClass("dd","active")},showContent:function(){itemLength=getItemPos(currentCategory_item),categoryLength=getCategoryPos(currentCategory_item.parentNode.parentNode),taskLength=getTaskPos(currentTaskName);var e=$.data.getDefaultStorage();if(currentCategory_item.parentNode.parentNode==defaultCategory)var t=e.defaultCategory.subCategories[itemLength].tasks[taskLength];else var t=e.categories[categoryLength].subCategories[itemLength].tasks[taskLength];$("subtitle").value=t.name,$("taskname").value=showYYYYMMDD(t.updatetime,!0),$("con-text").value=t.contents},saveData:function(e){var t=$.data.getDefaultStorage();if(itemLength=getItemPos(currentCategory_item),taskLength=getTaskPos(currentTaskName),currentCategory==defaultCategory)var a=t.defaultCategory.subCategories[itemLength].tasks[taskLength];else{categoryLength=getCategoryPos(currentCategory_item.parentNode.parentNode);var a=t.categories[categoryLength].subCategories[itemLength].tasks[taskLength]}a.name=$("subtitle").value,a.updatetime=changeYYYYMMDD(),changeDt(currentTaskName).innerHTML=$("taskname").value,a.contents=$("con-text").value,a.isFinished=e,$.data.setDefaultStorage(t)}},$.renderElement={renderCategory:function(){var e=$.data.getDefaultStorage(),t=JSON.parse(localStorage.getItem("CatrgoryId")),a=e.defaultCategory.name,r=createElement("div"),n=createElement("p"),s=createElement("ul");if(addClass(r,"category-list"),r.id="category-default",addClass(n,"category-p"),n.innerHTML=a+"<span>( 0 )</span>",appendChild(r,n),appendChild(r,s),appendChild($("category"),r),defaultCategory=$("category-default"),n.innerHTML=a+"<span>( "+$.renderElement.renderPNum($("category-default"))+" )</span>",e.defaultCategory.subCategories.length)for(var o=e.defaultCategory.subCategories,g=0;g<o.length;g++){var i=$("category-default").getElementsByTagName("ul"),l=createElement("li");l.id=o[g].id;var d="<span>( "+o[g].tasks.length+"  ) </span>";l.innerHTML=o[g].name+d+aStr,i[0].appendChild(l),$.renderElement.renderitemNum($(l.id))}if(e.categories.length)for(var o=e.categories,u=t,c=0;c<o.length;c++){var r=createElement("div"),n=createElement("p"),s=createElement("ul");if(addClass(r,"category-list"),r.id=u[c],addClass(n,"category-p"),n.innerHTML=o[c].name+d+aStr,r.appendChild(n),r.appendChild(s),$("category").appendChild(r),n.innerHTML=o[c].name+"<span>( "+$.renderElement.renderPNum($(r.id))+" )</span>"+aStr,o[c].subCategories.length){var m=o[c].subCategories;console.log(11111);for(var f=0;f<m.length;f++){var C=u[c],i=$(C).getElementsByTagName("ul"),l=createElement("li");l.id=m[f].id,l.innerHTML=m[f].name+d+aStr,i[0].appendChild(l),l.innerHTML=m[f].name+"<span>( "+$.renderElement.renderitemNum($(l.id))+" )</span>"+aStr}}}findAllTask(),currentCategory="",currentCategory_item="",currentTaskName=""},renderActive:function(){var e=JSON.parse(localStorage.getItem("currentActive"));if(e[0].length){var t=$(e[0][0]).getElementsByTagName("p");addClass(t[0],"active")}e[1].length&&(currentCategory_item=$(e[1][0]),addClass(currentCategory_item,"active"),sortTasks(currentCategory_item),e[2].length&&(currentTaskName=$(e[2][0]),addClass(currentTaskName,"active"),$.data.showContent())),findAllTask()},renderitemNum:function(e){itemLength=getItemPos(e),categoryLength=getCategoryPos(e.parentNode.parentNode),currentCategory=e.parentNode.parentNode;var t=$.data.getDefaultStorage();if(currentCategory==defaultCategory)var a=t.defaultCategory.subCategories[itemLength].tasks;else var a=t.categories[categoryLength].subCategories[itemLength].tasks;return a.length},renderPNum:function(e){categoryLength=getCategoryPos(e);var t=$.data.getDefaultStorage(),a=0;if(e==defaultCategory)var r=t.defaultCategory.subCategories;else var r=t.categories[categoryLength].subCategories;if(r.length){for(var n=0;n<r.length;n++)a+=r[n].tasks.length;return a}return 0}};var categoryIddArr=[];