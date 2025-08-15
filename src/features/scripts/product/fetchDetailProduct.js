async function fetchDetailProduct() {
  // Product display
  const urlParams = new URLSearchParams(window.location.search) // take parameters from URL
  const productId = urlParams.get('id') // From the parameters, take the one named ID

  try {
    const res = await fetch(
      `https://liuba-stripe-backend.vercel.app/api/products?id=${productId}`
    )
    if (!res.ok) throw new Error('Network response was not ok')

    const product = await res.json()
    return product
  } catch (error) {
    console.error('Failed to load products:', error)
  }
}

export default fetchDetailProduct
