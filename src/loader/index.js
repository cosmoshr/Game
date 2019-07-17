import essential from './essential'
import required from './required'
import extras from './extras'

const loaderArray = {
  0: [...essential, ...required(), ...extras()], 1: essential, 2: required(), 3: extras()
}

/**
 *   PixiLoader.shared.add(loader().filter(item => !loader(true).some(item2 => item.name === item2.name)))
 *
 * @export
 * @param {number} [level=0] 0 For all; 1 For essential; 2 For Required; 3 For extras
 */
export default function (level = 0) {
  return loaderArray[level]
}
