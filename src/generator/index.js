import Generator from './generator.worker'
import { DB } from '../lib'

const db = new DB()

export default function generateCosmos(description) {
  return new Promise(resolve => {
    const generator = new Generator()
    generator.postMessage({ size: 'auto', description })
    generator.onmessage = async newCosmos => {
      const id = await db.cosmos.add({
        cosmos: newCosmos.data
      })
      const cosmosList = JSON.parse(window.localStorage.getItem('cosmosList')) || []
      cosmosList.push({
        description, id, dateCreated: Date.now(), lastModified: Date.now()
      })
      localStorage.setItem('cosmosList', JSON.stringify(cosmosList))
      resolve(id)
    }
  })
}
