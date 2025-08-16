// general
import audio from './features/scripts/general/audio'
import footer from './features/scripts/general/footer'
// import mousetrail from './features/scripts/general/mousetrail'
import nav from './features/scripts/general/nav'

import './styles/style.css'

const body = document.body

let products
let detailProduct

async function runHomeFunctions() {
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

  hero()
  motto()
  mainCollection()
  landingMisc()

  // shaders
  handleLiuba()
  // handleLiubaAbout()
  collectionShaders()
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

  products = await fetchStoreData()
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
  const { default: finishLoading } = await import(
    './features/scripts/product/finishLoading'
  )
  const { default: handleCheckOutModal } = await import(
    './features/scripts/product/handleCheckoutModal'
  )

  detailProduct = await fetchDetailProduct()
  finishLoading()
  displayDetailProduct(detailProduct)
  clickDetailProduct()
  handleCheckOutModal(detailProduct)
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

function runMiscFunctions() {
  console.log('Welcome to Liuba Nosova General Info')
}

function runGeneralFunctions() {
  nav()
  footer()
  audio()
  // mousetrail()
}

runGeneralFunctions()
if (body.classList.contains('body__home')) runHomeFunctions()
if (body.classList.contains('body__collection')) runCollectionFunctions()
if (body.classList.contains('body__product')) runProductFunctions()
if (body.classList.contains('body__courses')) runCoursesFunctions()
if (body.classList.contains('body__spaces')) runSpacesFunctions()
if (body.classList.contains('body__contact')) runContactFunctions()
if (body.classList.contains('body__misc')) runMiscFunctions()
