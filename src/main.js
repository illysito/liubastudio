// import universe from './features/3d/world/universe'
import audio from './features/scripts/audio'
import footer from './features/scripts/footer'
import hero from './features/scripts/hero'
import mainCollection from './features/scripts/main_collection'
import handleLiuba from './features/shaders/handleLiuba'
import stripes from './features/shaders/stripes'

import './styles/style.css'

console.log('Welcome to Liuba Studio!')

// const container = document.querySelector('.moving-bg')

// universe(container)
hero()
handleLiuba()
stripes()
audio()
mainCollection()
footer()
