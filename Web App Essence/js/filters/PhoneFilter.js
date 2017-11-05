'use strict'

/*
*
* filters phones list. If stringToSearch is present in model, make or name then phone is displayed
*/
app.filter('PhoneFilter',function(){
	return function(items,stringToSearch) { 
		var filtered = [];
		for (var i = 0; i < items.length; i++) {
			var item =items[i];
            if(item.model.toLowerCase().indexOf(stringToSearch.toLowerCase())!=-1|| 
			item.make.toLowerCase().indexOf(stringToSearch.toLowerCase())!=-1|| 
			item.name.toLowerCase().indexOf(stringToSearch.toLowerCase())!=-1){
					filtered.push(item);
				}
			}
		return filtered;
	}
});