import { World } from './World'

function universe(container) {
  const universe = new World(container)
  universe.start()
}

export default universe
