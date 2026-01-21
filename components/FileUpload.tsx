import React, { useCallback } from 'react';

interface FileUploadProps {
  onFileLoaded: (url: string) => void;
  autoLoadError?: boolean;
  onRetryAutoLoad?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileLoaded, autoLoadError, onRetryAutoLoad }) => {
  
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      onFileLoaded(objectUrl);
    }
  }, [onFileLoaded]);

  const useDemoModel = () => {
    onFileLoaded('https://modelviewer.dev/shared-assets/models/Astronaut.glb');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 animate-fade-in overflow-y-auto">
      
      {/* Mensaje de Error si no encuentra el archivo en GitHub */}
      {autoLoadError && (
        <div className="max-w-md w-full bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl mb-6 flex flex-col gap-2">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <p className="font-bold text-sm">No encontramos 'modelo.glb'</p>
              <p className="text-xs mt-1">Sube el archivo a la carpeta <code>public</code> en GitHub y espera unos minutos.</p>
            </div>
          </div>
          {onRetryAutoLoad && (
            <button 
              onClick={onRetryAutoLoad}
              className="self-end text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-md font-medium transition-colors"
            >
              🔄 Verificar de nuevo
            </button>
          )}
        </div>
      )}

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center my-4">
        <div className="mb-6 flex justify-center">
          <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Subir Modelo Manualmente</h2>
        <p className="text-gray-500 mb-8">Si no quieres esperar a GitHub, sube el archivo aquí para probarlo ahora.</p>

        <label className="block w-full cursor-pointer group">
          <input 
            type="file" 
            accept=".glb,.gltf" 
            className="hidden" 
            onChange={handleFileChange}
          />
          <div className="w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-red-700 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
            <span>Seleccionar Archivo .GLB</span>
          </div>
        </label>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-gray-400 text-sm">O</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <button 
          onClick={useDemoModel}
          className="mt-6 text-sm text-gray-500 hover:text-red-600 underline"
        >
          Usar modelo de demostración (Astronauta)
        </button>
      </div>

      {/* Instrucciones de Ayuda */}
      <div className="max-w-md w-full bg-blue-50 border border-blue-100 rounded-xl p-4 text-left text-sm text-blue-800 space-y-3">
        
        {/* Nueva sección específica para el error 404 */}
        <div className="bg-red-50 border border-red-100 p-3 rounded-lg">
           <div className="flex items-center gap-2 font-bold mb-1 text-red-800 text-xs uppercase tracking-wide">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
             ¿Vercel dice que existe, pero GitHub da 404?
           </div>
           <p className="text-xs text-red-900 leading-relaxed">
             Esto ocurre porque no tienes permisos para ver ese repositorio con tu cuenta actual de GitHub.
           </p>
           <ul className="list-disc list-inside mt-2 text-xs text-red-800 space-y-1">
               <li>El repositorio pertenece a una Organización (ej: <code>dmartinezgnhearing-lab</code>).</li>
               <li>Es un repositorio <strong>Privado</strong>.</li>
               <li>Debes iniciar sesión en GitHub con la cuenta correcta.</li>
           </ul>
        </div>

        <div className="h-px bg-blue-200 opacity-50"></div>

        <div>
            <div className="flex items-center gap-2 font-bold mb-1 text-blue-900">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ¿Cómo encontrar el repositorio?
            </div>
            <p className="opacity-90 text-xs">
            1. En Vercel, ve a <strong>Settings</strong> -> <strong>Git</strong>.
            <br/>
            2. Mira el nombre bajo "Connected Git Repository".
            <br/>
            3. Si dice <code>dmartinezgnhearing-lab/ReSound-AR</code>, ese es el dueño y nombre.
            </p>
        </div>
        
        <div>
            <div className="flex items-center gap-2 font-bold mb-2 text-blue-900">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            Dónde poner el archivo
            </div>
            <div className="bg-white p-2 rounded border border-blue-200 font-mono text-xs text-gray-600">
            public/modelo.glb
            </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;