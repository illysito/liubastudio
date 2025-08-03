import gsap from 'gsap'

function filterStore() {
  function queryDomElements() {
    return {
      filterButtons: document.querySelectorAll('.filter-button'),
      productCards: document.querySelectorAll('.product-card'),
      tears: document.querySelectorAll('.filter-active-img'),
    }
  }
  const domElements = queryDomElements()

  // array with filter flags, in order: ceramics, jewelry, engraving, painting
  const filterStates = [true, false, false, false, false]
  const allFilters = [
    'tag-all',
    'tag-ceramics',
    'tag-jewelry',
    'tag-engraving',
    'tag-painting',
  ]

  // update filter array based on user choice
  function updateFilterArray(index) {
    // if ALL is clicked
    if (index == 0) {
      filterStates[0] = true
      for (let i = 1; i < filterStates.length; i++) {
        filterStates[i] = false
      }
      // if ANYTHING ELSE is clicked
    } else {
      filterStates[0] = false
      filterStates[index] = !filterStates[index]
    }
    console.log(filterStates)
    filterProductsByType()
  }

  // filter by type
  function filterProductsByType() {
    if (filterStates.every((value) => !value)) {
      for (let i = 0; i < filterStates.length; i++) {
        filterStates[i] = true
      }
    }
    if (filterStates.every((value) => value) || filterStates[0]) {
      domElements.productCards.forEach((p) => {
        p.style.display = 'flex'
      })
      for (let i = 0; i < filterStates.length; i++) {
        filterStates[i] = true
      }
    } else {
      // based on my filterStates, i create a new array called activeTags
      const activeTags = allFilters.filter((_, i) => filterStates[i])
      domElements.productCards.forEach((p) => {
        const matches = activeTags.some((tag) => p.classList.contains(tag))
        p.style.display = matches ? 'flex' : 'none'
      })
    }
  }

  // display filtered options
  function displayFilteredTitles(index) {
    const tear1 = domElements.filterButtons[index].firstElementChild
    const tear2 = domElements.filterButtons[index].lastElementChild

    // if ALL is clicked
    if (index == 0) {
      gsap.to(domElements.tears, {
        opacity: 0,
        duration: 0.2,
      })
      gsap.to([domElements.tears[0], domElements.tears[1]], {
        opacity: 1,
        duration: 0.2,
      })
    } else {
      gsap.to([domElements.tears[0], domElements.tears[1]], {
        opacity: 0,
        duration: 0.2,
      })

      if (
        !tear1.classList.contains('is--shown') &&
        !tear2.classList.contains('is--shown')
      ) {
        gsap.to([tear1, tear2], {
          opacity: 1,
          duration: 0.2,
        })
        tear1.classList.add('is--shown')
        tear2.classList.add('is--shown')
      } else {
        gsap.to([tear1, tear2], {
          opacity: 0,
          duration: 0.2,
        })
        tear1.classList.remove('is--shown')
        tear2.classList.remove('is--shown')
      }
    }
  }

  // event listeners
  domElements.filterButtons.forEach((b, index) => {
    b.addEventListener('click', () => {
      updateFilterArray(index)
      displayFilteredTitles(index)
    })
  })
  domElements.filterButtons.forEach((b) => {
    b.addEventListener('mouseenter', (e) => {
      const button = e.currentTarget
      const tear = button.firstElementChild
      const buttonTxt = tear.nextElementSibling
      gsap.to(buttonTxt, {
        opacity: 0.4,
        duration: 0.2,
      })
    })
  })
  domElements.filterButtons.forEach((b) => {
    b.addEventListener('mouseleave', (e) => {
      const button = e.currentTarget
      const tear = button.firstElementChild
      const buttonTxt = tear.nextElementSibling
      gsap.to(buttonTxt, {
        opacity: 1,
        duration: 0.2,
      })
    })
  })
}

export default filterStore
