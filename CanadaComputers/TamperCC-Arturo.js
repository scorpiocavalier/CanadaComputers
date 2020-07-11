// ==UserScript==
// @name         Stock Level Check(Arturo)
// @namespace    None
// @version      0.1
// @description  Stock Level Check for Canada Computers Website
// @author       Yunpeng
// @match        https://www.canadacomputers.com/index.php?cPath=*
// @include      https://www.canadacomputers.com/search/results_details.php?*
// @grant        none
// ==/UserScript==

(function () {

	const available_color = "green"
	const unavailable_color = "#CCCCCC"

	const stores = [
		"Greenfield Park",
		"Laval",
		"Montréal Downtown",
		"West Island"
	]

	const displayStockLevel = () => {

		let product_list_container = document.querySelector("#product-list")
		let product_list = product_list_container.querySelectorAll(".stocklevel-pop")
		let stockPopup = product_list_container.querySelectorAll(".stock-popup")

		for (let index = 0; index < stockPopup.length; index++) {
			let container = document.createElement('div')
			for (let storeName of stores) {

				let currentStockPopup = stockPopup[index]
				currentStockPopup.style.display = 'flex'
				currentStockPopup.style.flexDirection = 'column'
				currentStockPopup.style.border = '1px solid'
				currentStockPopup.style.padding = '5px 10px'

				let store = document.createElement('span')
				let productText = product_list[index].innerText
				let indexStore = productText.indexOf(storeName)
				let productTextSlice = productText.slice(indexStore)
				let amountInStock = productTextSlice.match(/(-|\d\D|\d)/i)[0]

				store.style.color = amountInStock > 0 ? available_color : unavailable_color
				store.innerText = `${storeName}: ${amountInStock}`
				container.appendChild(store)
				currentStockPopup.innerHTML = container.innerHTML
			}
		}
	}

	window.addEventListener("load", displayStockLevel)
	window.addEventListener("scroll", displayStockLevel)
})()