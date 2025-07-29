// import gsap from 'gsap'

function filterStore() {
  function queryDomElements() {
    return {
      filterButtons: document.querySelectorAll('.filter-button'),
      productCards: document.querySelectorAll('.product-card'),
    }
  }
  const domElements = queryDomElements()

  // array with filter flags, in order: ceramics, jewelry, engraving, painting
  const filterStates = [false, false, false, false]
  const allFilters = [
    'tag-ceramics',
    'tag-jewelry',
    'tag-engraving',
    'tag-painting',
  ]

  // update filter array based on user choice
  function updateFilterArray(index) {
    if (index == 0) {
      for (let i = 0; i < filterStates.length; i++) {
        filterStates[i] = true
      }
    } else {
      filterStates[0] = false
      filterStates[index - 1] = !filterStates[index - 1]
    }
    console.log(filterStates)
    filterProductsByType()
  }

  // filter by type
  function filterProductsByType() {
    if (
      filterStates.every((value) => !value) ||
      filterStates.every((value) => value)
    ) {
      domElements.productCards.forEach((p) => {
        p.style.display = 'flex'
      })
    } else {
      // based on my filterStates, i create a new array called activeTags
      const activeTags = allFilters.filter((_, i) => filterStates[i])
      domElements.productCards.forEach((p) => {
        const matches = activeTags.some((tag) => p.classList.contains(tag))
        p.style.display = matches ? 'flex' : 'none'
      })
    }
  }

  // event listeners
  domElements.filterButtons.forEach((b, index) => {
    b.addEventListener('click', () => updateFilterArray(index))
  })
}

export default filterStore
