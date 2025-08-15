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

  // set first tears SHOWN
  gsap.set([domElements.tears[0], domElements.tears[1]], {
    opacity: 1,
  })
  domElements.tears[0].classList.add('is--shown')
  domElements.tears[1].classList.add('is--shown')

  // array with filter flags, in order: ceramics, jewelry, engraving, painting
  const filterStates = {
    types: [],
  }

  // update filter array based on user choice
  function updateFilterState(buttonText) {
    const selectedType = buttonText.textContent.toLowerCase()
    const selectedTag = 'tag-' + selectedType

    if (selectedType === 'all') {
      filterStates.types = [] // "all" clears the filters
    } else {
      const index = filterStates.types.indexOf(selectedTag)
      if (index > -1) {
        filterStates.types.splice(index, 1) // remove if already active
      } else {
        filterStates.types.push(selectedTag) // add if not active
      }
    }
    filterProductsByType()
  }

  // filter by type
  function filterProductsByType() {
    domElements.productCards.forEach((card) => {
      if (
        filterStates.types.length === 0 || // no filters → show all
        filterStates.types.some((type) => card.classList.contains(type))
      ) {
        card.style.display = 'flex'
      } else {
        card.style.display = 'none'
      }
    })
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
      domElements.tears.forEach((t) => {
        t.classList.remove('is--shown')
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
    const tear1 = b.firstElementChild
    // const tear2 = b.lastElementChild
    const buttonText = tear1.nextElementSibling
    b.addEventListener('click', () => {
      updateFilterState(buttonText)
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
