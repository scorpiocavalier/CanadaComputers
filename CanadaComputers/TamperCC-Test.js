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
  const storeName = "Greenfield Park"
  const available_color = "#CCCCCC"
	const unavailable_color = "#FF0000"
	const stores = {
		"Gatineau": 0,
		"Greenfield Park": 0,
		"Laval": 0,
		"Montréal Downtown": 0,
		"West Island": 0
  }

  let product_list = document.querySelector("#product-list")
  let productTemplate = product_list.querySelectorAll(".productTemplate")
  let stockPopup = product_list.querySelectorAll(".stock-popup")
  let product_stock = product_list.querySelectorAll(".stocklevel-pop")

	String.prototype.GetNum = function () {
		let regEx = /[^\d]/g
		return this.replace(regEx, "")
	}

	function getStockLevel() {
    let str = ""

		for (let i = 0; i <= product_stock.length; i++) {
			let stock = product_stock[i].innerText
			let index = stock.indexOf(storeName)
			let GaStock = stock.substr(index)
      let num = GaStock.match(/\s\s(-|\d)/)[1]
      num = num!='-' ? num:"0"

			if (num != 0) {
				str = `<span style="background-color:${available_color}">${storeName}: ${num}</span>`
			} else {
				str = `<span style="background-color:${unavailable_color}">${storeName}: ${num}</span>`
			}

			let insertDiv = document.querySelectorAll("a[data-stocklevel-pop-id]")
			if (insertDiv[i].innerHTML.indexOf("span") == -1) {
				insertDiv[i].innerHTML = str + insertDiv[i].innerHTML
			}
    }

  }

  const displayStockLevel = () => {
    stockPopup.forEach(stockLevelElement => {
      for(let storeName in stores) {
        let store = document.createElement('span')
        store.innerText = `${storeName}: ${stores[storeName]}\n`
        stockLevelElement.appendChild(store)
      }
    })
  }

  displayStockLevel()

   //window.addEventListener("load", getStockLevel)
	// window.addEventListener("scroll", getStockLevel)
})()