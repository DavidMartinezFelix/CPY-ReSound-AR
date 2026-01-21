import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import Viewer3D from './components/Viewer3D';
import ProductChat from './components/ProductChat';
import QRCodePanel from './components/QRCodePanel';
import { AppState } from './types';

// ¡IMPORTANTE! PARA QUE ESTO FUNCIONE EN VERCEL:
// 1. Coloca tu archivo .glb dentro de la carpeta 'public' en la raíz de tu proyecto.
// 2. Llama al archivo 'modelo.glb'.
// Vercel sirve automáticamente todo lo que hay en 'public' en la raíz del dominio.
const DEFAULT_PRODUCT_URL = '/modelo.glb'; 

const App: React.FC = () => {
  // Estados de la aplicación
  const [appState, setAppState] = useState<AppState>(AppState.UPLOAD);
  const [modelSrc, setModelSrc] = useState<string>('');
  const [isQRPanelOpen, setIsQRPanelOpen] = useState(false);
  
  // Estados de carga automática
  const [isCheckingAutoLoad, setIsCheckingAutoLoad] = useState(true);
  const [autoLoadError, setAutoLoadError] = useState(false);

  const checkDefaultModel = async () => {
    setIsCheckingAutoLoad(true);
    setAutoLoadError(false);
    try {
      // Usamos un timestamp para evitar que el navegador use una versión caché antigua si acabas de subir el archivo
      const cacheBuster = `?t=${new Date().getTime()}`;
      const response = await fetch(DEFAULT_PRODUCT_URL + cacheBuster, { method: 'HEAD' });
      
      if (response.ok) {
        console.log("Modelo encontrado automáticamente.");
        setModelSrc(DEFAULT_PRODUCT_URL);
        setAppState(AppState.VIEWER);
      } else {
        console.log("No se encontró modelo en /modelo.glb");
        setAutoLoadError(true);
        setAppState(AppState.UPLOAD);
      }
    } catch (error) {
      console.log("Error de red verificando modelo:", error);
      setAutoLoadError(true);
      setAppState(AppState.UPLOAD);
    } finally {
      setIsCheckingAutoLoad(false);
    }
  };

  // Intentamos detectar el archivo al iniciar
  useEffect(() => {
    checkDefaultModel();
  }, []);

  const handleFileLoaded = (url: string) => {
    setModelSrc(url);
    setAppState(AppState.VIEWER);
  };

  const handleBack = () => {
    setAppState(AppState.UPLOAD);
    setModelSrc('');
    // Si volvemos atrás manualmente, reseteamos el error para no molestar
    setAutoLoadError(false);
  };

  // Obtenemos la URL actual para el código QR
  const shareUrl = window.location.href;
  
  // Detectamos si es un archivo local (blob:) o uno alojado
  const isLocalFile = modelSrc.startsWith('blob:');

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-50 font-sans">
      <Header 
        currentState={appState} 
        onBack={handleBack} 
      />

      <main className="flex-1 mt-16 relative">
        {isCheckingAutoLoad ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Buscando modelo en el servidor...</p>
          </div>
        ) : appState === AppState.UPLOAD ? (
          <FileUpload 
            onFileLoaded={handleFileLoaded} 
            autoLoadError={autoLoadError}
            onRetryAutoLoad={checkDefaultModel}
          />
        ) : (
          <>
            <Viewer3D 
              src={modelSrc} 
              onShowQR={() => setIsQRPanelOpen(true)}
            />
            <ProductChat />
          </>
        )}
      </main>

      <QRCodePanel 
        isOpen={isQRPanelOpen} 
        onClose={() => setIsQRPanelOpen(false)} 
        url={shareUrl}
        isLocalFile={isLocalFile}
      />
    </div>
  );
};

export default App;