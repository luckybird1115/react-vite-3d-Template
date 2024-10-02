
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Leva } from 'leva'


// eslint-disable-next-line react-refresh/only-export-components
function Container(props) {
  return <div style={{ position: 'absolute', inset: 0 }} {...props} />
}

createRoot(document.getElementById('root')).render(
  <Container>
    <Leva hideCopyButton={true} titleBar={{ drag: false, filter: false }} />
    <App />
  </Container>,
)
