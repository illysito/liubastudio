// import gsap from 'gsap'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

function map() {
  // DOM queries for MAP
  const map_wrapper = document.querySelector('.map-wrapper')

  const map = new maplibregl.Map({
    container: 'map',
    style: `https://api.maptiler.com/maps/0195cd22-dfb7-7804-bfa1-d8f778b4673a/style.json?key=pi7gd08eA6zDQmBULH4j`,
    center: [-15, 32],
    zoom: 1.2,
    attributionControl: false,
  })
  const markers = []
  const prague = {
    name: 'Prague',
    lat: 80,
    long: 50,
  }
  const lasPalmas = {
    name: 'Las Palmas',
    lat: 20,
    long: 12,
  }
  const cities = [prague, lasPalmas]

  function loadMarkers() {
    cities.forEach((city, i) => {
      let latitude = cities[i].lat
      let longitude = cities[i].long
      const marker = new maplibregl.Marker({
        element: createCustomImageMarker(),
        anchor: 'bottom',
      })
        .setLngLat([longitude, latitude])
        .setPopup(
          new maplibregl.Popup({ className: 'popup', offset: [0, -80] }) // Add custom class
            .setHTML(`<div class="popup-content">${cities[i].name}</div>`)
        )
        .addTo(map)
      markers.push(marker)

      map.on('zoom', () => {
        const zoom = map.getZoom()
        markers.forEach((marker) => {
          const popup = marker.getPopup()
          if (popup && popup.isOpen()) {
            const popupEl = popup.getElement()
            if (popupEl) {
              popupEl.style.opacity = zoom < 12 ? '0' : '1'
            }
          }
        })
        document.querySelectorAll('.custom-marker').forEach((marker) => {
          const size = Math.max(10, zoom * 1.6) // Adjust scaling formula
          marker.style.width = `${size * 1.1}px`
          marker.style.height = `${size * 2.5}px` // Keep proportions
        })
      })
      // Function to create an image marker
      function createCustomImageMarker() {
        const marker = document.createElement('div')
        marker.className = 'custom-marker'
        //prettier-ignore
        marker.style.backgroundImage = 'url(https://raw.githubusercontent.com/illysito/padmi/85951f28c6a93b36ae3d6a20a083dd7519412f92/location-icon-3.png)'
        marker.style.width = '11px'
        marker.style.height = '25px'
        marker.style.backgroundSize = 'cover'
        // marker.style.width = '0.8em'
        // marker.style.height = '0.8em'
        // marker.style.borderRadius = '0.8em'
        // marker.style.backgroundColor = '#ceff05'

        marker.addEventListener('click', () => {
          // Animate the map zooming out to the marker's coordinates
          map.flyTo({
            center: [longitude, latitude], // Set the center to the marker's location
            zoom: 17,
            speed: 3,
            curve: 1,
            easing: (t) => {
              return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
            },
          })
        })
        return marker
      }
    })
  }

  loadMarkers()

  map_wrapper.addEventListener('mouseenter', () => {
    document.body.classList.add('stop-scrolling')
  })
  map_wrapper.addEventListener('mouseleave', () => {
    document.body.classList.remove('stop-scrolling')
  })
}

export default map
