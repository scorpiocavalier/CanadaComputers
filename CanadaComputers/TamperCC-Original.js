// ==UserScript==
// @name         Stock Level Check(Yungpeng)
// @namespace    None
// @version      0.1
// @description  Stock Level Check for Canada Computers Website
// @author       Yunpeng
// @match        https://www.canadacomputers.com/index.php?cPath=*
// @include      https://www.canadacomputers.com/search/results_details.php?*
// @grant        none
// ==/UserScript==

(function () {
  // Define Store
  let storeName = "Greenfield Park"
	
	String.prototype.GetNum = function () {
		let regEx = /[^\d]/g
		return this.replace(regEx, "")
	}

	function getStockLevel() {
		let str = ""
		let product_list = document.getElementById("product-list")
		let product_stock = product_list.getElementsByClassName("stocklevel-pop")
		for (let i = 0; i <= product_stock.length; i++) {
			let stock = product_stock[i].innerText
			let index = stock.indexOf(storeName)

			let GaStock = stock.substr(index)
            let num = GaStock.match(/\s\s(-|\d)/)[1]
            num = num!='-' ? num:"0"
			if (num != 0) {
				str =
					'<span style="background-color:#CCCCCC">'+ storeName + ': ' +
					num +
					"</span>"
			} else {
				str =
					'<span style="background-color:#FF0000">'+ storeName + ': ' +
					0 +
					"</span>"
			}

			let insertDiv = document.querySelectorAll(
				"a[data-stocklevel-pop-id]"
			)
			if (insertDiv[i].innerHTML.indexOf("span") == -1) {
				insertDiv[i].innerHTML = str + insertDiv[i].innerHTML
			}
		}
  }
  
  window.addEventListener("load", getStockLevel)
	window.addEventListener("scroll", getStockLevel)
})()