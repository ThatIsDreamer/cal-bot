import './App.css'
import { mockTelegramEnv, emitEvent} from '@telegram-apps/bridge';
//import { useRawInitData } from '@telegram-apps/sdk-react';
import myAnimation from './assets/wave.gif';
import ColorButton from './components/ColorButton';
import { AnimatePresence, motion } from "motion/react"
import { useState } from 'react';


const themeParams = {
  accent_text_color: '#6ab2f2',
  bg_color: '#17212b',
  button_color: '#5288c1',
  button_text_color: '#ffffff',
  destructive_text_color: '#ec3942',
  header_bg_color: '#17212b',
  hint_color: '#708499',
  link_color: '#6ab3f3',
  secondary_bg_color: '#232e3c',
  section_bg_color: '#17212b',
  section_header_text_color: '#6ab3f3',
  subtitle_text_color: '#708499',
  text_color: '#f5f5f5',
} as const;

mockTelegramEnv({
  launchParams: {
    tgWebAppThemeParams: themeParams,
    tgWebAppData: new URLSearchParams([
      ['user', JSON.stringify({
        id: 99281932,
        first_name: 'Andrew',
        last_name: 'Rogue',
        username: 'rogue',
        language_code: 'en',
        is_premium: true,
        allows_write_to_pm: true,
      })],
      ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
      ['auth_date', '1716922846'],
      ['start_param', 'debug'],
      ['signature', 'abc'],
      ['chat_type', 'sender'],
      ['chat_instance', '8428209589180549439'],
    ]),
    tgWebAppStartParam: 'debug',
    tgWebAppVersion: '8',
    tgWebAppPlatform: 'tdesktop',
  },
  onEvent(e) {
    // Можно эмулировать события, если нужно
    if (e[0] === 'web_app_request_theme') {
      return emitEvent('theme_changed', { theme_params: themeParams });
    }
  },
});



function App() {  
  //const initDataRaw = useRawInitData()
  const [step, setStep] = useState(0)
  return (
    <AnimatePresence mode="wait">
      {step === 0 && (
        <motion.div
          key="step-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
          exit={{ opacity: 0, x: -100, transition: { duration: 0.2} }}
          >
          <img width={200} height={200} src={myAnimation} alt="A looping animation" />
          <h1>Привет!</h1>
          <p>
            CalBot - это твой путь к здоровью!
          </p>
          <ColorButton color="#5288c1" onClick={() => setStep(1)}>
            Начать
          </ColorButton>
        </motion.div>
      )}
      {step === 1 && (
        <motion.div
          key="step-1"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
          exit={{ opacity: 0, x: -100, transition: { duration: 0.2} }}
        >
          <h1>
            Как зовут тебя?
          </h1>
          <input type="text" placeholder="Имя" />
          <ColorButton color="#5288c1" onClick={() => setStep(2)}>
            Далее
          </ColorButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
