import Soundtrack from '../../public/assets/soundtrack'
import required from './required'
import essential from './essential'

export default function extras() {
  let array = []
  Soundtrack.forEach(soundtrack => array.push({
    name: `Song_${soundtrack.name}`,
    url: `assets/soundtrack/${soundtrack.name}.mp3`
  }))

  array = array.filter(item => !required().some(item2 => item.name === item2.name))

  return array.filter(item => !essential.some(item2 => item.name === item2.name))
}
