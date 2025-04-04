
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SplashScreen from './components/SplashScreen.tsx'

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <>
    <SplashScreen />
    <App />
    <div className="cloud-bg"></div>
  </>
);
