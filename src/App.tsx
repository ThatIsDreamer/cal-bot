import './App.css'
import { mockTelegramEnv, emitEvent} from '@telegram-apps/bridge';
//import { useRawInitData } from '@telegram-apps/sdk-react';
import myAnimation from './assets/wave.gif';
import maleAnimation from './assets/male.gif';
import femaleAnimation from './assets/female.gif';
import nameAnimation from './assets/name.gif'
import heightAnimation from './assets/height.gif'
import weightAnimation from './assets/weight.gif'
import huhAnimation from './assets/huh.gif'
import ColorButton from './components/ColorButton';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/tabs';
import { AnimatePresence, motion } from "motion/react"
import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react'
import ProgressBar from './components/ProgressBar';
import { swipeBehavior } from '@telegram-apps/sdk';
import type { WheelPickerOption } from "@/components/wheel-picker";
import { WheelPicker, WheelPickerWrapper } from "@/components/wheel-picker";


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


// Новый тип для пола
type Gender = 'male' | 'female' | 'secret';

function App() {  
  //const initDataRaw = useRawInitData()
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [height, setHeight] = useState<number>(170) // Default height to 170cm
  const [weight, setWeight] = useState<number>(70) // Default weight to 70kg


  // Теперь используем gender вместо isMale
  const [gender, setGender] = useState<Gender>('male')
  const totalSteps = 5; // Total number of onboarding steps

  
  if (swipeBehavior.disableVertical.isAvailable()) {
    swipeBehavior.disableVertical();
    swipeBehavior.isVerticalEnabled(); // false
  }

  const createArray = (length: number, add = 0, postfix = ""): WheelPickerOption[] =>
    Array.from({ length }, (_, i) => {
      const value = i + add;
      return {
        label: value.toString().padStart(2, "0") + " " + postfix,
        value: value.toString(),
      };
    });
  
  const weightOptions = createArray(150, 0, "кг")
  const heightOptions = createArray(300, 0, "см")
  return (
    <div className="app-fullscreen bg-white">
      <ProgressBar className='mt-5' currentStep={step} totalSteps={totalSteps} />
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.2} }}
            className='steps'
            >
            <img width={180} height={180} src={myAnimation} alt="A looping animation" />
            <h1>Привет!</h1>
            <p>
              CalBot - это твой путь к здоровью!
            </p>
            <ColorButton color="#5288c1" onClick={() => setStep(1)}>
              Начать <ArrowRight/>
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
            className='steps'
          >
            <img width={180} height={180} src={nameAnimation}/>
            <h1>
              Как тебя зовут?
            </h1>
            <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
            <br>
            </br>
            <ColorButton color="#5288c1" onClick={() => setStep(2)}>
              Далее <ArrowRight/>
            </ColorButton>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.2} }}
            className='steps'
          >
            <AnimatePresence mode="wait">
              {gender === 'male' ? (
                <motion.img
                  key="male-img"
                  width={180}
                  height={180}
                  src={maleAnimation}
                  alt="dancing male"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
                />
              ) : gender === 'female' ? (
                <motion.img
                  key="female-img"
                  width={180}
                  height={180}
                  src={femaleAnimation}
                  alt="dancing female"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
                />
              ) : (
                <motion.img
                  key="secret-img"
                  width={180}
                  height={180}
                  src={huhAnimation}
                  alt="секретный пол"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
                />
              )}
            </AnimatePresence>
            
            <h1>
              Твой пол
            </h1>

            <Tabs
              style={{ transform: "scale(1.1)" }}
              value={gender === 'male' ? "tab1" : gender === 'female' ? "tab2" : "tab3"}
              onValueChange={(val) => {
                if (val === "tab1") setGender('male');
                else if (val === "tab2") setGender('female');
                else setGender('secret');
              }}
            >
              <TabsList>
                <TabsTrigger value="tab1" className="gender-tab-trigger">
                  Мужской
                </TabsTrigger>
                <TabsTrigger value="tab2" className="gender-tab-trigger">
                  Женский
                </TabsTrigger>
                <TabsTrigger value="tab3" className="gender-tab-trigger">
                  Секрет
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="button-group">
              <ColorButton color="#5288c1" onClick={() => setStep(step - 1)}>
                <ArrowLeft/>
              </ColorButton>
              <ColorButton color="#5288c1" onClick={() => setStep(3)}>
                Далее <ArrowRight/>
              </ColorButton>

            </div>

          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.2} }}
            className='steps'
          >
           <img width={180} height={180} src={heightAnimation}/>
            <h1>
              
              Твой рост
            </h1>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div className='w-20'>
                <WheelPickerWrapper className='border-0'>
                  <WheelPicker
                    options={heightOptions}
                    value={height.toString()}
                    defaultValue="170"
                    visibleCount={8}
                    onValueChange={(e: string) => setHeight(parseInt(e))}
                    classNames={{
                      optionItem: "text-12-important",
                      highlightItem: "text-13-important"
                    }}
                  />
                </WheelPickerWrapper>
              </div>
            </div>
            <div className="button-group">
              <ColorButton color="#5288c1" onClick={() => setStep(step - 1)}>
                    <ArrowLeft/>
              </ColorButton>
              <ColorButton color="#5288c1" onClick={() => setStep(4)}>
                Далее <ArrowRight/>
              </ColorButton>
            </div>

          </motion.div>
            )}
             {step === 4 && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.2} }}
            className='steps'
          >
            <img width={180} height={180} src={weightAnimation}/>
            <h1>Твой вес</h1>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>   
              
              <div className="w-20">
              <WheelPickerWrapper className='border-0'>
                    <WheelPicker
                      options={weightOptions}
                      value={weight.toString()}
                      defaultValue="60"
                      visibleCount={8}
                      onValueChange={(e: string) => setWeight(parseInt(e))}
                      classNames={{
                        optionItem: "text-12-important",
                        highlightItem: "text-13-important"
                      }}
                    />
                </WheelPickerWrapper>
              </div>       
            </div>
            <div className="button-group">
              <ColorButton color="#5288c1" onClick={() => setStep(step - 1)}>
                  <ArrowLeft/>
              </ColorButton>
              <ColorButton color="#5288c1" onClick={() => setStep(5)}>
                Далее <ArrowRight/>
              </ColorButton>
            </div>

          </motion.div>
            )}
      </AnimatePresence>
    </div>
  )
}



export default App
