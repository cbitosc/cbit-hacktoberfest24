import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RegistrationPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 glassomorphism bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative w-full max-w-md p-6 bg-darkgrey rounded-lg shadow-lg"
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-white hover:text-pink"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold text-green mb-4">Heads Up! Important Information</h2>
            <ul className="text-white space-y-2 mb-6">
              <li>Every team will consist of 3 to 5 members and individual or paired participants will be pooled together.</li>
              <li>Keeping alive the spirit of open source, there will be <strong>no registration fee.</strong></li>
              <li><strong>Problem Statements</strong> will be released on the day of the Hackathon.</li>
              <li><strong>The hackathon is inclusive and welcomes students from all academic disciplines, all highschoolers, undergraduates from any school, college or university.</strong></li>
            </ul>
            <button
              onClick={handleClose}
              className="w-full bg-deeppink text-white px-4 py-2 rounded-md hover:bg-pink transition-colors duration-200"
            >
              Understood!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationPopup;