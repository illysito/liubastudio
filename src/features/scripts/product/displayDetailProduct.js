import gsap from 'gsap'
import SplitType from 'split-type'

function displayDetailProduct(product) {
  function queryDomElements() {
    return {
      backButton: document.querySelector('.back-text-wrapper'),
      detailImageWrapper: document.querySelector('.detail-img-wrapper'),
      addButton: document.querySelector('.add-button-detail'),
    }
  }
  const domElements = queryDomElements()
  const buttonWrapper = domElements.addButton.firstElementChild
  const buttonText = buttonWrapper.firstElementChild
  const buttonTextHidden = buttonWrapper.lastElementChild

  // Back to collection
  function backToCollection() {
    const ease = 'power1.out'
    const staggerTime = 0.02
    const header = domElements.backButton.firstElementChild
    const headerHidden = domElements.backButton.lastElementChild
    const splitHeader = new SplitType(header, {
      types: 'chars',
      tagName: 'span',
    })
    const splitHiddenHeader = new SplitType(headerHidden, {
      types: 'chars',
      tagName: 'span',
    })

    function backButtonHoverIn() {
      gsap.to(splitHeader.chars, {
        yPercent: -100,
        // color: '#fffffe',
        duration: 0.6,
        ease: ease,
        stagger: staggerTime,
      })
      gsap.to(splitHiddenHeader.chars, {
        yPercent: -100,
        // color: '#fffffe',
        duration: 0.6,
        ease: ease,
        stagger: staggerTime,
      })
    }
    function backButtonHoverOut() {
      gsap.to(splitHeader.chars, {
        yPercent: 0,
        // color: '#3111d5',
        duration: 0.6,
        ease: ease,
        stagger: staggerTime,
      })
      gsap.to(splitHiddenHeader.chars, {
        yPercent: 0,
        // color: '#3111d5',
        duration: 0.6,
        ease: ease,
        stagger: staggerTime,
      })
    }

    domElements.backButton.addEventListener('mouseover', backButtonHoverIn)
    domElements.backButton.addEventListener('mouseleave', backButtonHoverOut)
  }
  backToCollection()

  // Display detail product data
  console.log(product)

  // Inventory check
  const inventory = Number(product.metadata.Inventory)
  if (inventory <= 0) {
    domElements.addButton.classList.add('out-of-stock')
    buttonText.textContent = 'Off the shelf'
    buttonTextHidden.textContent = 'Off the shelf'
  }

  // create image
  const productImage = document.createElement('img')
  productImage.classList.add('detail-img')
  productImage.src = product.image
  productImage.alt = product.name
  domElements.detailImageWrapper.appendChild(productImage)

  // create text
  const productName = document.querySelector('.detail-product-title')
  productName.textContent = product.name

  const productPrice = document.querySelector('.detail-product-price')
  const euros = (product.price / 100).toFixed(2)
  productPrice.textContent = `${euros} €`

  const productTexts = document.querySelectorAll('.detail-product-text')
  productTexts[0].textContent = product.description // description is first

  if (product.metadata.Dimensions) {
    productTexts[1].textContent = product.metadata.Dimensions // dimnesions are second
  }

  if (product.metadata.Materials) {
    productTexts[2].textContent = product.metadata.Materials // metarials are third
  }

  if (product.metadata.Inspiration) {
    productTexts[3].textContent = product.metadata.Inspiration // inspiration is last
  }

  // attach stuff
}

export default displayDetailProduct
