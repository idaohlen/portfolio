import { createGlobalStyle } from 'styled-components'
import 'twin.macro'

const GlobalStyles = createGlobalStyle`
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
`

export default GlobalStyles