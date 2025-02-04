import React, { useRef, useEffect, useMemo } from 'react';
import useHomeStore from '../../../stores/useHomeStore';
import useGeneralStore from '../../../stores/useGeneralStore';
import { shallow } from 'zustand/shallow';
import { motion } from 'framer-motion';

const HomeHero = () => {
  const {
    mousePos,
    setMousePos,
    openFilterBox,
    setProviderQuestionRendered,
    setProviderAnimation,
  } = useHomeStore(
    (state) => ({
      mousePos: state.mousePos,
      setMousePos: state.setMousePos,
      openFilterBox: state.openFilterBox,
      setProviderQuestionRendered: state.setProviderQuestionRendered,
      setProviderAnimation: state.setProviderAnimation,
    }),
    shallow
  );
  const { activateModalAnimation } = useGeneralStore(
    (state) => ({
      activateModalAnimation: state.activateModalAnimation,
    }),
    shallow
  );

  const titleAnimate = useMemo(() => ({
    offscreen: { y: 100, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  }));

  const descAnimate = useMemo(() => ({
    offscreen: { y: 100, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  }));

  const buttonAnimate = useMemo(() => ({
    offscreen: { y: 100, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  }));

  const topBoxRef = useRef();
  const bottomBoxRef = useRef();

  const handleFilterBoxOpening = () => {
    openFilterBox();
    activateModalAnimation();
    setProviderQuestionRendered();
    setProviderAnimation();
  };

  useEffect(() => {
    if (window.innerWidth >= 1200) {
      function handleMouseMove(e) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [setMousePos]);

  useEffect(() => {
    function handleContentMove() {
      const positionY = (window.innerHeight + mousePos.y * 2) / 90;
      const positionXContent = (window.innerWidth + mousePos.x) / 90;

      topBoxRef.current.style.transform = `translateY(${positionY}px) translateX(${
        positionXContent - 60
      }px)`;
      bottomBoxRef.current.style.transform = `translateY(${positionY}px) translateX(${
        positionXContent - 60
      }px)`;
    }

    handleContentMove();
  }, [mousePos]);

  return (
    <div className='wrapper'>
      <div className='hero-wrapper'>
        <motion.div
          transition={{ staggerChildren: 0.4 }}
          initial='offscreen'
          whileInView='onscreen'
          viewport={{ once: true, amount: 1 }}
          className='hero-info'
        >
          <motion.h1 variants={titleAnimate} className='hero-title'>
            Economize Tempo e Dinheiro
          </motion.h1>
          <motion.span variants={descAnimate} className='hero-desc'>
            Encontre os melhores planos da sua cidade com ótimos preços e facilidade.
          </motion.span>
          <motion.button
            variants={buttonAnimate}
            type='button'
            onClick={handleFilterBoxOpening}
            className='hero-cta'
          >
            Encontre seu plano
          </motion.button>
        </motion.div>
        <div className='hero-image'>
          <div className='image-box'>
            <img src='/assets/images/phone.svg' alt='Telefone' className='image-phone' />
            <img
              ref={topBoxRef}
              src='/assets/images/top-phone-box.svg'
              alt='Dica 1'
              className='image-top-box'
            />
            <img
              ref={bottomBoxRef}
              src='/assets/images/bottom-phone-box.svg'
              alt='Dica 2'
              className='image-bottom-box'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
