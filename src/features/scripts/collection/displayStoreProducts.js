function displayStoreProducts(products) {
  console.log(products)

  function domElementsQuery() {
    return {
      storeWrapper: document.querySelector('.store-wrapper'),
    }
  }
  const domElements = domElementsQuery()

  products.forEach((p) => {
    const category = p.metadata.Category
    // Create container
    const productEl = document.createElement('div')
    productEl.classList.add('product-card') // Style this in your CSS
    productEl.classList.add(`${category}`)

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
    const addButtonTxt = document.createElement('p')
    addButtonTxt.classList.add('add-button-txt')
    addButtonTxt.textContent = 'Add to cart'
    addButton.appendChild(addButtonTxt)

    // Append all to product card
    productEl.appendChild(imgWrapper)
    imgWrapper.appendChild(img)
    productEl.appendChild(title)
    productEl.appendChild(price)
    productEl.appendChild(addButton)

    // Append product card to wrapper
    domElements.storeWrapper.appendChild(productEl)
  })
}

export default displayStoreProducts
