let ProdTools = {}

//let prods = {} //未来从localstorage中获取   {id:sum}
let prods = JSON.parse(localStorage.getItem('prods') || '{}')

//增加
ProdTools.addOrUpdate = function(p) {
	if(prods[p.prodid]) {
		prods[p.prodid] += p.num;
	} else {
		prods[p.prodid] = p.num;
	}
	this.saveProds(prods);
}

//删除
ProdTools.delete = function(prodid) {
	delete prods[prodid];
	this.saveProds(prods);
}

//获取
ProdTools.getProds = function() {
	return JSON.parse(localStorage.getItem('prods') || '{}');
}


//获取总数
ProdTools.getTotalCount = function() {
	let sum = 0
	for(let _id in prods) {
		sum += prods[prodid];
	}
	return sum;
}

//清空购物车
ProdTools.clear = function() {
	prods={};
	this.saveProds(prods);
}

//存储
ProdTools.saveProds = function(prods) {
	localStorage.setItem('prods', JSON.stringify(prods));
}

export default ProdTools;