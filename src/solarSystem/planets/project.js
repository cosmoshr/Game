import Settler from '../../entities/Settler'

export const projects = [
  'settler'
]

export const projectActions = {
  settler: {
    name: 'Create a Settler',
    icon: 'assets/textures/entities/settler.svg',
    time: 5,
    summonEntity: Settler
  }
}
