export default function headStyle(css: string): void {
  const style = document.createElement('style')
  document.head.appendChild(style)

  style.type = 'text/css'
  style.appendChild(document.createTextNode(css))
}