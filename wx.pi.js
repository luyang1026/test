var wxPlugIn = {
	/*
		ele:jq元素集合,
		[subList:子菜单class],
		[callback:点击后回调函数]
	 */
	expandableList:function(ele,subList,callback){
		if(typeof ele !== 'object')return;
		for (var i = 0,callback; i < arguments.length; i++) {
			if(typeof arguments[i] == 'function'){
				callback = arguments[i];
			}
		}
		var subList = subList||'ul';
		if(arguments.length == 2){
			subList = 'ul';
		}
		ele.click(function(ev){
			callback&&callback.call(this);
			var currentLi = $(this).parents('li').eq(0);
			if(this.tagName=='LI'){
				currentLi = $(this);
			}
			currentLi.find(subList).eq(0).slideToggle(function(){//这里只找一层
				var descendants = $(this).find(subList);
				if(descendants.length){
					descendants.hide();
				}
			});
			ev.stopPropagation();
		})
	}

}