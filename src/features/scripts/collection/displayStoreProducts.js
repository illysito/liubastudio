function displayStoreProducts(products) {
  function domElementsQuery() {
    return {
      storeWrapper: document.querySelector('.store-wrapper'),
    }
  }
  const domElements = domElementsQuery()

  const product_IDs = []

  products.forEach((p) => {
    const category = p.metadata.Category
    const inventory = Number(p.metadata.Inventory)

    // Create container
    const productEl = document.createElement('div')
    productEl.classList.add('product-card') // Style this in your CSS
    productEl.classList.add(`${category}`)
    productEl.dataset.product_ID = p.id // ATTACH heavily ID to the container

    // Create image
    const imgWrapper = document.createElement('div')
    const img = document.createElement('img')
    img.classList.add('product-img')
    imgWrapper.classList.add('product-img-wrapper')
    img.src = p.image
    img.alt = p.name

    // Create title
    const title = document.createElement('h2')
    title.classList.add('product-title')
    title.textContent = p.name

    // Create price
    const price = document.createElement('h3')
    price.classList.add('product-price')
    const euros = (p.price / 100).toFixed(2)
    price.textContent = `${euros} €`

    // Create button
    const addButton = document.createElement('div')
    addButton.classList.add('add-button')
    const addButtonWrapper = document.createElement('div')
    addButtonWrapper.classList.add('add-button-wrapper')
    const addButtonTxt = document.createElement('p')
    addButtonTxt.classList.add('add-button-txt')
    const addButtonHiddenTxt = document.createElement('p')
    addButtonHiddenTxt.classList.add('add-button-txt')
    addButtonHiddenTxt.classList.add('is--hidden')
    if (inventory <= 0) {
      addButton.classList.add('out-of-stock')
      addButtonTxt.textContent = 'Off the shelf'
      addButtonHiddenTxt.textContent = 'Off the shelf'
    } else {
      addButtonTxt.textContent = 'Add to cart'
      addButtonHiddenTxt.textContent = 'Add to cart'
    }
    addButton.appendChild(addButtonWrapper)
    addButtonWrapper.appendChild(addButtonTxt)
    addButtonWrapper.appendChild(addButtonHiddenTxt)

    // Append all to product card
    productEl.appendChild(imgWrapper)
    imgWrapper.appendChild(img)
    productEl.appendChild(title)
    productEl.appendChild(price)
    productEl.appendChild(addButton)

    // Append product card to wrapper
    domElements.storeWrapper.appendChild(productEl)
  })

  console.log(product_IDs)
}

export default displayStoreProducts
