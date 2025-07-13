import React, { useRef, useState, useEffect } from 'react';
import './Demos.css'
import { motion } from 'motion/react';

const Demos: React.FC = () => {
  const [current] = useState(50);
  const [count, setCount] = useState(20); // количество элементов
  const constraintsRef = useRef<HTMLDivElement>(null);
  const innerDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (innerDivRef.current) {
      console.log('Ширина внутреннего div:', innerDivRef.current.offsetWidth);
      // Можно сохранить это значение в стейт, если нужно
    }
  }, [count]); // срабатывает при изменении количества элементов

  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='flex flex-col'>
            <p>
                {current}
            </p>
            <motion.div ref={constraintsRef} className='flex flex-row border-2 border-gray-200 h-30 w-50 overflow-hidden' >
                <motion.div 
                    ref={innerDivRef}
                    drag="x" // Разрешаем только горизонтальное перетаскивание
                    dragConstraints={constraintsRef}
                >
                    {Array.from({ length: count }).map((_, i) => (
                        <div
                            key={i}
                            style={{
                                width: 2,
                                height: 60,
                                background: '#888',
                                marginLeft: i === 0 ? 0 : 6,
                                marginRight: 0,
                                display: 'inline-block'
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
            <button onClick={() => setCount(count + 1)}>Добавить элемент</button>
        </div>
    </div>
  );
};

export default Demos;
