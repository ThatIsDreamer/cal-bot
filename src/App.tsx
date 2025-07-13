import './App.css'
import { mockTelegramEnv, emitEvent} from '@telegram-apps/bridge';
//import { useRawInitData } from '@telegram-apps/sdk-react';
import { useLaunchParams, hapticFeedbackImpactOccurred, init, backButton, mountBackButton, isBackButtonMounted, miniApp,  mountMiniAppSync , swipeBehavior, isMiniAppMounted } from '@telegram-apps/sdk-react';
import myAnimation from './assets/wave.gif';
import maleAnimation from './assets/male.gif';
import femaleAnimation from './assets/female.gif';
import nameAnimation from './assets/name.gif'
import heightAnimation from './assets/height.gif'
import weightAnimation from './assets/weight.gif'
import huhAnimation from './assets/huh.gif'
import normalAnimation from './assets/normal.gif'
import rocketAnimation from './assets/rocket.gif'
import slowAnimation from './assets/slow.gif'
import ColorButton from './components/ColorButton';
import goalAnimation from './assets/goal.gif'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/tabs';
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react'
import ProgressBar from './components/ProgressBar';
import type { WheelPickerOption } from "@/components/wheel-picker";
import { WheelPicker, WheelPickerWrapper } from "@/components/wheel-picker";
import eruda from 'eruda';



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
  eruda.init();
  init();
   //const initDataRaw = useRawInitData()
  const launchParams = useLaunchParams()
  
  useEffect(() => {
    console.log(launchParams)
  },  [launchParams]) 

  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [height, setHeight] = useState<number>(170) // Default height to 170cm
  const [weight, setWeight] = useState<number>(70) // Default weight to 70kg
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain'); // новое состояние для цели
  const [desiredWeight, setDesiredWeight] = useState<number>(weight); // желаемый вес
  // Добавляем useEffect для автоматического обновления цели
  useEffect(() => {
    if (desiredWeight < weight) setGoal('lose');
    else if (desiredWeight > weight) setGoal('gain');
    else setGoal('maintain');
  }, [desiredWeight, weight]);

  useEffect(() => {
    const gifs = [
      myAnimation,
      maleAnimation,
      femaleAnimation,
      nameAnimation,
      heightAnimation,
      weightAnimation,
      huhAnimation,
      normalAnimation,
      rocketAnimation,
      slowAnimation,
      goalAnimation,
    ];
    gifs.forEach(src => {
      const img = new window.Image();
      img.src = src;
    });
    if (mountMiniAppSync.isAvailable()) {
      mountMiniAppSync();
      console.log("Mounting mini app")
      console.log(isMiniAppMounted())
    }
  }, []);


  if (mountBackButton.isAvailable()) {
    mountBackButton();
    isBackButtonMounted(); // true
  }
  

  useEffect(() => {
    console.log(launchParams)
    console.log(launchParams.tgWebAppData?.user?.first_name)
    setName(launchParams.tgWebAppData?.user?.first_name ?? "")
    backButton.show.ifAvailable();
  },  [launchParams]) 

  // Теперь используем gender вместо isMale
  const [gender, setGender] = useState<Gender>('male')
  const [program, setProgram] = useState<'comfortable' | 'fast' | 'slow'>('comfortable'); // новое состояние
  const totalSteps = 8; // увеличено на 1
  const [editingFromSummary, setEditingFromSummary] = useState<number | null>(null); // если не null, значит редактируем из финального шага

  
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
            <ColorButton color="#5288c1" onClick={() => editingFromSummary === 1 ? (setStep(7), setEditingFromSummary(null)) : setStep(2)}>
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
              <ColorButton color="#5288c1" onClick={() => editingFromSummary === 2 ? (setStep(7), setEditingFromSummary(null)) : setStep(3)}>
                <ArrowLeft/>
              </ColorButton>
              <ColorButton color="#5288c1" onClick={() => editingFromSummary === 2 ? (setStep(7), setEditingFromSummary(null)) : setStep(3)}>
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
              <div className='w-70'>
                <WheelPickerWrapper className='border-0'>
                  <WheelPicker
                    options={heightOptions}
                    value={height.toString()}
                    defaultValue="170"
                    visibleCount={12}
                    onValueChange={(e: string) => {
                      setHeight(parseInt(e)); 
                      if (hapticFeedbackImpactOccurred.isAvailable()) {
                        hapticFeedbackImpactOccurred('medium');
                      } 
                  }}
                    classNames={{
                      optionItem: "text-12-important",
                      highlightItem: "text-13-important"
                    }}
                  />
                </WheelPickerWrapper>
              </div>
            </div>
            <div className="button-group">
              <ColorButton color="#5288c1" onClick={() => editingFromSummary === 3 ? (setStep(7), setEditingFromSummary(null)) : setStep(4)}>
                    <ArrowLeft/>
              </ColorButton>
              <ColorButton color="#5288c1" onClick={() => editingFromSummary === 3 ? (setStep(7), setEditingFromSummary(null)) : setStep(4)}>
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
              <div className="w-70">
              <WheelPickerWrapper className='border-0'>
                    <WheelPicker
                      options={weightOptions}
                      value={weight.toString()}
                      defaultValue="70"
                      visibleCount={12}
                      onValueChange={(e: string) => {
                        setWeight(parseInt(e));
                        setDesiredWeight(parseInt(e));  
                        if (hapticFeedbackImpactOccurred.isAvailable()) {
                          hapticFeedbackImpactOccurred('medium');
                        }
                    }}
                      classNames={{
                        optionItem: "text-12-important",
                        highlightItem: "text-13-important"
                      }}
                    />
                </WheelPickerWrapper>
              </div>       
            </div>
            <div className="button-group">
              <ColorButton color="#5288c1" onClick={() => editingFromSummary === 4 ? (setStep(7), setEditingFromSummary(null)) : setStep(5)}>
                  <ArrowLeft/>
              </ColorButton>
              <ColorButton color="#5288c1" onClick={() => editingFromSummary === 4 ? (setStep(7), setEditingFromSummary(null)) : setStep(5)}>
                Далее <ArrowRight/>
              </ColorButton>
            </div>
          </motion.div>
        )}
        {step === 5 && (
          <motion.div
            key="step-5"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.2} }}
            className='steps'
          >
            {/* Goal selector step */}
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <span style={{ color: 'black', fontSize: 30, fontWeight: 600 }}>
                {goal === 'lose' ? 'Снижение веса' : goal === 'gain' ? 'Набор веса' : 'Поддержание веса'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
              {/* Разница веса */}
              {(() => {
                const diff = desiredWeight - weight;
                let color = '#708499';
                let sign = '';
                if (diff > 0) {
                  color = '#2ecc40';
                  sign = '+';
                } else if (diff < 0) {
                  color = '#ec3942';
                  sign = '';
                }
                return (
                  <span style={{ fontSize: 20, fontWeight: 600, color, marginBottom: 4 }}>
                    {diff === 0 ? '0' : `${sign}${diff}`} кг
                  </span>
                );
              })()}
              <div className='w-70'>
                <WheelPickerWrapper className='border-0'>
                  <WheelPicker
                    options={weightOptions}
                    value={desiredWeight.toString()}
                    visibleCount={12}
                    onValueChange={(e: string) => {
                      setDesiredWeight(parseInt(e));
                      if (hapticFeedbackImpactOccurred.isAvailable()) {
                        hapticFeedbackImpactOccurred('medium');
                      }
                    }}
                    classNames={{
                      optionItem: "text-12-important",
                      highlightItem: "text-13-important"
                    }}
                  />
                </WheelPickerWrapper>
              </div>
            </div>
            <div className="button-group">
              <ColorButton color="#5288c1" onClick={() => editingFromSummary === 5 ? (setStep(7), setEditingFromSummary(null)) : setStep(6)}>
                <ArrowLeft/>
              </ColorButton>
              <ColorButton color="#5288c1" onClick={() => editingFromSummary === 5 ? (setStep(7), setEditingFromSummary(null)) : setStep(6)}>
                Далее <ArrowRight/>
              </ColorButton>
            </div>
          </motion.div>
        )}
        {step === 6 && (
          <motion.div
            key="step-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.2} }}
            className='steps'
          >
            <h1>Выбери программу</h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              {program === 'comfortable' && (
                <img src={normalAnimation} alt="Комфортная" width={120} height={120} />
              )}
              {program === 'fast' && (
                <img src={rocketAnimation} alt="Быстрая" width={120} height={120} />
              )}
              {program === 'slow' && (
                <img src={slowAnimation} alt="Медленная" width={120} height={120} />
              )}
            </div>
            <Tabs
              style={{ transform: "scale(1.1)", margin: '24px 0' }}
              value={program}
              onValueChange={(val) => setProgram(val as 'comfortable' | 'fast' | 'slow')}
            >
              <TabsList>
              <TabsTrigger value="slow" className="gender-tab-trigger">
                  Медленная
                </TabsTrigger>
                <TabsTrigger value="comfortable" className="gender-tab-trigger">
                  Комфортная
                </TabsTrigger>
                <TabsTrigger value="fast" className="gender-tab-trigger">
                  Быстрая
                </TabsTrigger>
              </TabsList>
            </Tabs>
            {/* Описание с цветом и знаком */}
            <div style={{ minHeight: 40, marginBottom: 24, marginTop: 8, textAlign: 'center', fontSize: 16 }}>
              {(() => {
                let color = 'black';
                let text = '';
                if (program === 'comfortable') {
                  color = 'black';
                  text = 'Комфортная: 0.5 кг в неделю';
                } else if (program === 'fast') {
                  color = 'black';
                    text = 'Быстрая: примерно 1 кг в неделю';
                  } else if (program === 'slow') {
                  color = 'black';
                  text = 'Медленная: примерно 0.25 кг в неделю';
                }
                return (
                  <span style={{ color }}>
                     {text}
                  </span>
                );
              })()}
            </div>
            <div className="button-group">
              <ColorButton color="#5288c1" onClick={() => editingFromSummary === 6 ? (setStep(7), setEditingFromSummary(null)) : setStep(7)}>
                <ArrowLeft/>
              </ColorButton>
              <ColorButton color="#5288c1" onClick={() => editingFromSummary === 6 ? (setStep(7), setEditingFromSummary(null)) : setStep(7)}>
                Готово
              </ColorButton>
            </div>
          </motion.div>
        )}
        {step === 7 && (
          <motion.div
            key="step-7"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.2} }}
            className='steps mb-0'
          >
            <h1>Проверь свои данные</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, margin: '24px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => { setEditingFromSummary(1); setStep(1); }}>
                <img src={nameAnimation} alt="Имя" width={48} height={48} />
                <span style={{ fontSize: 18 }}>Имя: <b>{name}</b></span>
                <ArrowRight size={20} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => { setEditingFromSummary(2); setStep(2); }}>
                <img src={gender === 'male' ? maleAnimation : gender === 'female' ? femaleAnimation : huhAnimation} alt="Пол" width={48} height={48} />
                <span style={{ fontSize: 18 }}>Пол: <b>{gender === 'male' ? 'Мужской' : gender === 'female' ? 'Женский' : 'Секрет'}</b></span>
                <ArrowRight size={20} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => { setEditingFromSummary(3); setStep(3); }}>
                <img src={heightAnimation} alt="Рост" width={48} height={48} />
                <span style={{ fontSize: 18 }}>Рост: <b>{height} см</b></span>
                <ArrowRight size={20} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => { setEditingFromSummary(4); setStep(4); }}>
                <img src={weightAnimation} alt="Текущий вес" width={48} height={48} />
                <span style={{ fontSize: 18 }}>Текущий вес: <b>{weight} кг</b></span>
                <ArrowRight size={20} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => { setEditingFromSummary(5); setStep(5); }}>
                <img src={goalAnimation} alt="Желаемый вес" width={48} height={48} />
                <span style={{ fontSize: 18 }}>Желаемый вес: <b>{desiredWeight} кг</b></span>
                <ArrowRight size={20} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => { setEditingFromSummary(6); setStep(6); }}>
                <img src={program === 'comfortable' ? normalAnimation : program === 'fast' ? rocketAnimation : slowAnimation} alt="Программа" width={48} height={48} />
                <span style={{ fontSize: 18 }}>Программа: <b>{program === 'comfortable' ? 'Комфортная' : program === 'fast' ? 'Быстрая' : 'Медленная'}</b></span>
                <ArrowRight size={20} />
              </div>
            </div>
            <div className="button-group mt-1">
              <ColorButton color="#5288c1" onClick={() => {
                miniApp.close();
                console.log("Closing mini app")
              }}>
                Завершить
              </ColorButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}



export default App
