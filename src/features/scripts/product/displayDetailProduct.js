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

  // Drive to direct link
  function driveToDirectLink(url) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (!match) return url // not a drive link
    const id = match[1]
    return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`
  }

  // Back to collection ONLY DESKTOP
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
  // console.log(product)

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

  // create gallery
  const galleryWrapper = document.querySelector('.detail-slider-wrapper')
  const URLS = []
  if (product.metadata.IMG_1) {
    const directLink_1 = driveToDirectLink(product.metadata.IMG_1)
    URLS.push(directLink_1)
  }
  if (product.metadata.IMG_2) {
    const directLink_2 = driveToDirectLink(product.metadata.IMG_2)
    URLS.push(directLink_2)
  }
  if (product.metadata.IMG_3) {
    const directLink_3 = driveToDirectLink(product.metadata.IMG_3)
    URLS.push(directLink_3)
  }
  if (product.metadata.IMG_4) {
    const directLink_4 = driveToDirectLink(product.metadata.IMG_4)
    URLS.push(directLink_4)
  }
  for (let i = 0; i < URLS.length; i++) {
    const galleryImagesWrapper = document.createElement('div')
    galleryImagesWrapper.classList.add('detail-slider-img-wrapper')
    galleryWrapper.appendChild(galleryImagesWrapper)

    const galleryImage = document.createElement('img')
    galleryImage.classList.add('detail-img')
    galleryImage.src = URLS[i]
    // productImage.alt = product.name
    galleryImagesWrapper.appendChild(galleryImage)
  }
  const galleryImagesWrappers = document.querySelectorAll(
    '.detail-slider-img-wrapper'
  )

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

  // picture selection
  galleryImagesWrappers.forEach((w, index) => {
    const img = w.firstElementChild
    w.addEventListener('mouseover', () => {
      gsap.to(img, {
        opacity: 0.6,
        scale: 0.98,
        duration: 0.2,
        ease: 'none',
      })
    })
    w.addEventListener('mouseleave', () => {
      gsap.to(img, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: 'none',
      })
    })
    w.addEventListener('click', () => {
      productImage.src = URLS[index]
    })
  })
}

export default displayDetailProduct
