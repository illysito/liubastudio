import { $$ } from '../../utils/getElement.js'

// REMOVE A SELECTED ITEM FROM CHECKOUT THROUGH ITS ID

function removeCheckOutItem(id) {
  function queryDomElements() {
    return {
      itemWrappers: $$('.cart-item-wrapper'),
    }
  }
  const DOM = queryDomElements()

  DOM.itemWrappers.forEach((w) => {
    if (w.dataset.product_ID === id) {
      if (w.nextElementSibling) {
        w.nextElementSibling.remove()
      }
      w.remove()
    }
  })
}

export default removeCheckOutItem
