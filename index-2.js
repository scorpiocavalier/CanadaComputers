// ==UserScript==
// @name         Stock Level Check(Arturo)
// @namespace    None
// @version      0.2
// @description  Stock Level Check for Canada Computers Website
// @author       Arturo
// @match        https://www.canadacomputers.com/index.php?cPath=*
// @include      https://www.canadacomputers.com/search/results_details.php?*
// @grant        none
// ==/UserScript==

(function () {
  const stores = [
    "Brossard",
    "Laval",
    "Montréal Downtown",
    "West Island"
  ]

  const getProducts = () => document.querySelector('#product-list')
  const getProductsArray = () => document.querySelectorAll('.productTemplate')
  const getSource = products => products.querySelectorAll('.stocklevel-pop')
  const getDestination = products => products.querySelectorAll('.stock-popup')

  const createContainer = () => document.createElement('div')
  const createSpan = () => document.createElement('span')

  const styleDestination = dest => {
    dest.style.display = 'flex'
    dest.style.flexDirection = 'column'
    dest.style.justifyContent = 'center'
    dest.style.alignItems = 'center'
    dest.style.border = '2px solid #00498e'
    dest.style.padding = '5px 10px'
    dest.style.height = '108px'
  }

  const getStockLevel = (store, source, index) => {
    const productText = source[ index ].innerText
    const storeIndex = productText.indexOf(store)
    const productTextSlice = productText.slice(storeIndex)
    const stockLevel = productTextSlice.match(/(-|\d\D|\d)/i)[ 0 ]

    return stockLevel
  }

  const getStoreNickname = store => {
    switch (store) {
      case 'Montréal Downtown': return 'MTL'
      case 'West Island': return 'WI'
      default: return store
    }
  }

  const displayStockLevel = () => {

    // list of all products displayed
    const products = getProducts()
    // array of products
    const productsArr = getProductsArray(products)
    // get inventory info source
    const source = getSource(products)
    // get container to put info in
    const destination = getDestination(products)

    /*
      1. loop through every product
      2. get inventory levels from source
      3. show stock levels in destination
    */
    destination.forEach((dest, index) => {
      const container = createContainer()

      styleDestination(dest)

      stores.forEach(store => {
        const stockLevel = getStockLevel(store, source, index)

        if (stockLevel == '5+' | stockLevel > 0) {
          const storeSpan = createSpan()
          store = getStoreNickname(store)
          storeSpan.innerText = `${ store }: ${ stockLevel }`
          container.appendChild(storeSpan)
          dest.innerHTML = container.innerHTML

          // [Optional] Border on in stock items
          productsArr[ index ].style.border = '2px solid #00498e'
          productsArr[ index ].style.borderRadius = '15px'
        }
      })

      if (container.childElementCount == 0) {
        // set product visibility: [0 = not visible ~ 1 = visible]
        productsArr[ index ].style.opacity = '0.2'

        // empty description of stock level
        dest.innerHTML = ''
      }
    })
  }

  // [Optional] Display items as list by default
  // window.addEventListener("load", toggleToList())

  window.addEventListener("load", displayStockLevel)
  window.addEventListener("scroll", displayStockLevel)
})()