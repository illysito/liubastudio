async function fetchDetailProduct() {
  // FETCH PRODUCTS DATA FROM Stripe

  const urlParams = new URLSearchParams(window.location.search) // take parameters from URL
  const productId = urlParams.get('id') // From the parameters, take the one named ID

  try {
    const res = await fetch(
      `https://liuba-stripe-backend.vercel.app/api/products?id=${productId}`
    )
    if (!res.ok) throw new Error('Network response was not ok')

    const product = await res.json()

    // // change URL
    // const productNameSlug = product.name.toLowerCase().replace(/\s+/g, '-') // e.g., "Red Vase" -> "red-vase"
    // window.history.replaceState(null, '', `/product/${productNameSlug}`)

    return product
  } catch (error) {
    console.error('Failed to load products:', error)
  }
}

export default fetchDetailProduct
