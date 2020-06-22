import LinearLoader from './LinearLoader/LinearLoader'
import TextInput from './TextInput/TextInput'
import ActionButton from './ActionButton'
import Slider from './Slider/Slider'
import Button from './Button/Button'

export default function () {
  customElements.define('custom-text-input', TextInput)
  customElements.define('linear-loader', LinearLoader)
  customElements.define('action-button', ActionButton)
  customElements.define('custom-button', Button)
  customElements.define('custom-slider', Slider)
}
