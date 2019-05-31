import 'subworkers'
import Dexie from 'dexie'
import Generator from '../generator/generator.worker'
import textureLoader from './texture'

const db = new Dexie('CosmosHR')
db.version(1).stores({
  cosmos: '++id,date,description,cosmos'
})

const cosmosLoader = async () => {
  const cosmos = await db.cosmos.toArray()
  postMessage(cosmos)
}
const cosmosUpdater = async cosmos => {
  db.cosmos.update(cosmos.whichCosmos + 1, cosmos.newCosmos).then(updated => {
    if (updated) db.cosmos.update(cosmos.whichCosmos + 1, { updated: Date.now() }).then(_updated => {
        if (_updated) cosmosLoader()
        else postMessage('', 'Err in CosmosUpdater')
      })
    else postMessage('', 'Err in CosmosUpdater')
  })
}

const settingsLoader = () => {
  postMessage(['No settings right now'])
}

const load = message => {
  switch (message.item) {
    case 'Settings':
      settingsLoader()
      break
    case 'Cosmos':
      cosmosLoader()
      break
    case 'Texture':
      postMessage(textureLoader())
      break
    default:
      postMessage('', `No valid loader for ${message.item}`)
      break
  }
}

const update = message => {
  switch (message.item) {
    case 'Cosmos':
      cosmosUpdater(message.data)
      break
    default:
      postMessage('', `No valid updater for ${message.item}`)
      break
  }
}
const add = async (description, cosmos) => {
  await db.cosmos.add({
    description,
    cosmos,
    date: Date.now()
  })
  cosmosLoader()
}

const generate = message => {
  const generator = new Generator()
  generator.postMessage(message)
  generator.onmessage = newCosmos => { add(message.description, newCosmos.data) }
}

onmessage = message => {
  switch (message.data.action) {
    case 'Load':
      load(message.data.data)
      break
    case 'Update':
      update(message.data.data)
      break
    case 'Generate':
      generate(message.data.data)
      break
    default:
      postMessage('', 'No valid operation')
  }
}
