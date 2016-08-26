var obj = {
	val:100,
	get getval(){
		return this.val;
	},
	set setval(v){
		this.val = v;
	},
	fn(){
		return 11;
	}
}
console.log(Object.getOwnPropertySymbols(obj));