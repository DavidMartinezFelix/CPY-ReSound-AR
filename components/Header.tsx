import React from 'react';
import { AppState } from '../types';

interface HeaderProps {
  onBack: () => void;
  currentState: AppState;
}

const Header: React.FC<HeaderProps> = ({ onBack, currentState }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
          R
        </div>
        <h1 className="font-bold text-xl tracking-tight text-gray-900">ReSound<span className="font-light">AR</span></h1>
      </div>
      
      {currentState === AppState.VIEWER && (
        <button 
          onClick={onBack}
          className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
        >
          Cambiar Modelo
        </button>
      )}
    </header>
  );
};

export default Header;