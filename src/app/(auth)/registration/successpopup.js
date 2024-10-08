import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessPopup = ({ teamLeaderName, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
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
            <h2 className="text-xl font-bold text-green mb-4">Registration Successful!</h2>
            <p className="text-white mb-4">
              Congrats {teamLeaderName}! You've successfully registered for CBIT Hacktoberfest Hackathon'24!
            </p>
            <p className="text-white mb-6">
              Join the WhatsApp group for important updates
            </p>
            <a
              href="https://chat.whatsapp.com/I13Gli1hhE43lx6qiehgSq" 
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green text-white px-4 py-2 rounded-md hover:bg-darkgreen transition-colors duration-200 text-center"
            >
              Join WhatsApp Group
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessPopup;