// FETCHES PRODUCTS JSON FROM STRIPE

async function fetchStoreData() {
  try {
    const res = await fetch(
      'https://liuba-stripe-backend.vercel.app/api/products'
    )
    if (!res.ok) throw new Error('Network response was not ok')

    const products = await res.json()
    return products
  } catch (error) {
    console.error('Failed to load products:', error)
  }
}

export default fetchStoreData
