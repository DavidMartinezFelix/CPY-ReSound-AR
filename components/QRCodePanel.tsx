import React from 'react';

interface QRCodePanelProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
  isLocalFile?: boolean;
}

const QRCodePanel: React.FC<QRCodePanelProps> = ({ url, isOpen, onClose, isLocalFile }) => {
  if (!isOpen) return null;

  // Use a third-party API for QR generation for simplicity in this environment
  // In production, use a library like 'qrcode.react'
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

  return (
    <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-scale-in relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Escanea para AR</h3>
          
          {isLocalFile ? (
             <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs text-left p-3 rounded-lg mb-4">
               <strong>⚠️ Aviso Importante:</strong><br/>
               Has subido el modelo manualmente desde este dispositivo. El código QR abrirá la app en tu celular, pero <strong>tendrás que seleccionar el archivo nuevamente</strong> en tu móvil para verlo.
               <br/><br/>
               Para que sea automático, debes subir el archivo a GitHub.
             </div>
          ) : (
             <p className="text-sm text-gray-500 mb-6">Apunta con la cámara de tu celular a este código para ver el producto en tu habitación.</p>
          )}
          
          <div className="flex justify-center mb-6">
            <div className="p-2 border-2 border-red-100 rounded-lg bg-white">
                <img 
                    src={qrUrl} 
                    alt="AR QR Code" 
                    className="w-48 h-48 mix-blend-multiply"
                />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            <span>Compatible con iOS y Android</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePanel;