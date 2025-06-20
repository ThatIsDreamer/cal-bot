import './App.css'

import { useRawInitData } from '@telegram-apps/sdk-react';

function App() {  
  const rawInitData = useRawInitData()

  return (
    <div>
      <h1>Hello World</h1>
      <p>This is a test</p>
      <p>Raw init data: {rawInitData}</p>
    </div>
  )
}

export default App
