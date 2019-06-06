import LinearLoader from './LinearLoader/LinearLoader'
import Button from './Button/Button'
import TextInput from './TextInput/TextInput'
import Slider from './Slider/Slider'

export default function initComponents() {
  customElements.define('linear-loader', LinearLoader)
  customElements.define('custom-button', Button)
  customElements.define('custom-text-input', TextInput)
  customElements.define('custom-slider', Slider)
}
