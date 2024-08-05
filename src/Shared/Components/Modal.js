import React from 'react';
import { Button } from '@mui/material';

const buttons = {
  'yes': 'SI',
  'no': 'NO',
  'info': 'MAS INFORMACIÓN',
  'ok': 'OK',
  'cancel': 'CANCELAR'
};

const Modal = ({ title, inner, onClose, actions = [{}] }) => {
  const renderActions = () => {
    let actionArray = actions;

    if (!Array.isArray(actionArray)) {
      actionArray = [actionArray];
    }

    return actionArray.map(({ text, handler }) => (
      <button
        key={text}
        onClick={handler}
        variant="contained"
        color={text === 'yes' ? 'primary' : (text === 'no' ? 'secondary' : 'default')}
        className="mx-1"
        backgroundColor="red"
      >
        {buttons[text] || (typeof text === 'string' ? text.charAt(0).toUpperCase() + text.slice(1) : '')}
      </button>
    ));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              {title}
            </h3>
            <button 
              type="button" 
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" 
              onClick={onClose}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            {inner}
          </div>
          <div className="flex items-end p-4 md:p-5 border-t border-gray-200 rounded-b">
            {renderActions()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
