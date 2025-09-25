// general
import initCartCount from './features/scripts/cart/initCartCount'
import audio from './features/scripts/general/audio'
import footer from './features/scripts/general/footer'
// import mousetrail from './features/scripts/general/mousetrail'
import nav from './features/scripts/general/nav'

import './styles/style.css'

const body = document.body

let products
let detailProduct

async function runHomeFunctions() {
  const { default: preloader } = await import(
    './features/scripts/home/preloader'
  )
  const { default: hero } = await import('./features/scripts/home/hero')
  const { default: motto } = await import('./features/scripts/home/motto')
  const { default: landingMisc } = await import(
    './features/scripts/home/landing_misc'
  )
  const { default: mainCollection } = await import(
    './features/scripts/home/main_collection'
  )
  const { default: collectionShaders } = await import(
    './features/shaders/collectionShaders'
  )
  const { default: handleLiuba } = await import(
    './features/shaders/handleLiuba'
  )
  const { default: courses } = await import('./features/scripts/home/courses')

  preloader()
  hero()
  motto()
  mainCollection()
  landingMisc()

  // shaders
  handleLiuba()
  // handleLiubaAbout()
  collectionShaders()
  courses()
}

async function runCollectionFunctions() {
  const { default: fetchStoreData } = await import(
    './features/scripts/collection/fetchStoreData'
  )
  const { default: displayStoreProducts } = await import(
    './features/scripts/collection/displayStoreProducts'
  )
  const { default: filterStore } = await import(
    './features/scripts/collection/filterStore'
  )
  const { default: hoverStoreProducts } = await import(
    './features/scripts/collection/hoverStoreProducts'
  )
  const { default: clickStoreProducts } = await import(
    './features/scripts/collection/clickStoreProducts'
  )
  const { default: loadingStore } = await import(
    './features/scripts/collection/loadingStore'
  )
  const { default: finishLoading } = await import(
    './features/scripts/general/finishLoading'
  )

  loadingStore()
  products = await fetchStoreData()
  finishLoading()
  displayStoreProducts(products)
  filterStore()
  hoverStoreProducts()
  clickStoreProducts()
}

async function runProductFunctions() {
  const { default: fetchDetailProduct } = await import(
    './features/scripts/product/fetchDetailProduct'
  )
  const { default: displayDetailProduct } = await import(
    './features/scripts/product/displayDetailProduct'
  )
  const { default: clickDetailProduct } = await import(
    './features/scripts/product/clickDetailProduct'
  )
  const { default: loadingProduct } = await import(
    './features/scripts/product/loadingProduct'
  )
  const { default: finishLoading } = await import(
    './features/scripts/general/finishLoading'
  )
  const { default: hoverDetailProducts } = await import(
    './features/scripts/product/hoverDetailProduct'
  )

  loadingProduct()
  detailProduct = await fetchDetailProduct()
  finishLoading()
  displayDetailProduct(detailProduct)
  clickDetailProduct(detailProduct)
  hoverDetailProducts()
}

async function runCheckoutFunctions() {
  const { default: displayCheckoutItems } = await import(
    './features/scripts/checkout/displayCheckoutItems'
  )
  const { default: calculatePrices } = await import(
    './features/scripts/checkout/calculatePrices'
  )
  const { default: handleShippingUI } = await import(
    './features/scripts/checkout/handleShipping'
  )
  const { default: closeButtons } = await import(
    './features/scripts/checkout/closeButtons'
  )
  const { default: checkOutButton } = await import(
    './features/scripts/checkout/checkOutButton'
  )

  const cart = displayCheckoutItems()
  calculatePrices(cart)
  handleShippingUI(cart)
  closeButtons()
  // finish
  checkOutButton()
}

function runCoursesFunctions() {
  console.log('Welcome to Courses')
}

function runSpacesFunctions() {
  console.log('Welcome to Spaces')
}

function runContactFunctions() {
  console.log('Welcome to Contact')
}

async function runMiscFunctions() {
  const { default: afterpaymentButton } = await import(
    './features/scripts/misc/afterpaymentButton'
  )
  const { default: faq } = await import('./features/scripts/misc/faq')

  afterpaymentButton()
  faq()
}

function runGeneralFunctions() {
  initCartCount()
  nav()
  footer()
  audio()
  // mousetrail()
}

runGeneralFunctions()
if (body.classList.contains('body__home')) runHomeFunctions()
if (body.classList.contains('body__collection')) runCollectionFunctions()
if (body.classList.contains('body__product')) runProductFunctions()
if (body.classList.contains('body__checkout')) runCheckoutFunctions()
if (body.classList.contains('body__courses')) runCoursesFunctions()
if (body.classList.contains('body__spaces')) runSpacesFunctions()
if (body.classList.contains('body__contact')) runContactFunctions()
if (body.classList.contains('body__misc')) runMiscFunctions()
