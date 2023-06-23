import React from 'react';
import ReactLoading from 'react-loading';
import { motion } from 'framer-motion';

const Loading = ({ type, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      className='loading-container'
    >
      <ReactLoading type={type} color={color} height={100} width={100} />
    </motion.div>
  );
};

export default Loading;
