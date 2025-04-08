import React, {
  createContext, useState, ReactNode, useContext,
} from 'react';
import { TOAST_TIMER } from '../utils/constants';

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setMessage(msg);
    const id = setTimeout(() => setMessage(null), TOAST_TIMER);
    setTimeoutId(id);
  };
  window.showToastGlobal = showToast;

  const closeToast = () => {
    setMessage(null);
    if (timeoutId) clearTimeout(timeoutId);
  };

  return (
    // eslint-disable-next-line
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div
          className="z-50 top-1 fixed left-1/2 transform -translate-x-1/2 p-4 bg-red-400 text-white rounded-lg shadow-md"
        >
          <div className="flex justify-between items-center">
            <span>{message}</span>
            <button type="button" onClick={closeToast} className="ml-4 text-white cursor-pointer">X</button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export const showToast = (msg: string) => window.showToastGlobal?.(msg);
