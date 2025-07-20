import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Demos from './Demos.tsx'
import { mountViewport } from '@telegram-apps/sdk-react'
import { mountBackButton, restoreInitData, miniApp, bindThemeParamsCssVars, bindViewportCssVars, init as initTelegram } from '@telegram-apps/sdk-react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/demos',
    element: <Demos/>
  }
])


if (import.meta.env.DEV) {
  import('./mockEnv');
}
    //setDebug(import.meta.env.DEV);
    initTelegram();
    mountBackButton.ifAvailable();
    restoreInitData();
    if (miniApp.mountSync.isAvailable()) {
      miniApp.mountSync();
      if (!import.meta.env.DEV) {
        bindThemeParamsCssVars();
      }
    }
    if (mountViewport.isAvailable()) {
      mountViewport().then(() => {
        if (!import.meta.env.DEV) {
          bindViewportCssVars();
        }
      });
    }
    

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
