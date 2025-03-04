import audio from './features/scripts/audio'
import footer from './features/scripts/footer'
import hero from './features/scripts/hero'
import mainCollection from './features/scripts/main_collection'
import nav from './features/scripts/nav'
import handleLiuba from './features/shaders/handleLiuba'
// import stripes from './features/shaders/stripes'

import './styles/style.css'

const body = document.body

function runHomeFunctions() {
  console.log('Welcome to Liuba Nosova')
  hero()
  handleLiuba()
  // stripes()
  mainCollection()
}

function runCollectionFunctions() {
  console.log('Welcome to Collection')
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
}

runGeneralFunctions()
if (body.classList.contains('body__home')) runHomeFunctions()
if (body.classList.contains('body__collection')) runCollectionFunctions()
if (body.classList.contains('body__courses')) runCoursesFunctions()
if (body.classList.contains('body__spaces')) runSpacesFunctions()
if (body.classList.contains('body__contact')) runContactFunctions()
if (body.classList.contains('body__misc')) runMiscFunctions()
