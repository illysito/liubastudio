import audio from './features/scripts/audio'
import footer from './features/scripts/footer'
import hero from './features/scripts/hero'
import landingMisc from './features/scripts/landing_misc'
// import heroOpacity from './features/scripts/hero_opacity'
import mainCollection from './features/scripts/main_collection'
import map from './features/scripts/map'
import motto from './features/scripts/motto'
import nav from './features/scripts/nav'
import handleLiuba from './features/shaders/handleLiuba'
import handleLiubaAbout from './features/shaders/handleLiubaAbout'
// import stripes from './features/shaders/stripes'

import './styles/style.css'

const body = document.body

function runHomeFunctions() {
  console.log('Welcome to Liuba Nosova')
  hero()
  motto()
  mainCollection()
  // shaders
  handleLiuba()
  handleLiubaAbout()
  landingMisc()
}

function runCollectionFunctions() {
  console.log('Welcome to Collection')
}

function runCoursesFunctions() {
  console.log('Welcome to Courses')
}

function runSpacesFunctions() {
  console.log('Welcome to Spaces')
  map()
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
