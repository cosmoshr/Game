import LinearLoader from './LinearLoader/LinearLoader'
import Button from './Button/Button'
import TextInput from './TextInput/TextInput'
import Slider from './Slider/Slider'
import ActionButton from './ActionButton';

export default function () {
  customElements.define('linear-loader', LinearLoader)
  customElements.define('custom-button', Button)
  customElements.define('custom-text-input', TextInput)
  customElements.define('custom-slider', Slider)
  customElements.define('action-button', ActionButton)
}
