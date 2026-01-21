import React from 'react';

// Define the custom element props locally to avoid global JSX pollution
interface ModelViewerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  src?: string;
  alt?: string;
  ar?: boolean;
  'ar-modes'?: string;
  'camera-controls'?: boolean;
  'auto-rotate'?: boolean;
  'shadow-intensity'?: string;
  poster?: string;
  reveal?: string;
  loading?: string;
  ref?: React.MutableRefObject<any>;
  scale?: string;
  'ar-scale'?: string;
}

// Cast the tag name to a component type to satisfy TypeScript
const ModelViewer = 'model-viewer' as unknown as React.FC<ModelViewerProps>;

interface Viewer3DProps {
  src: string;
  onShowQR: () => void;
}

const Viewer3D: React.FC<Viewer3DProps> = ({ src, onShowQR }) => {
  return (
    <div className="relative w-full h-[calc(100vh-64px)] bg-neutral-100">
      <ModelViewer
        src={src}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        alt="Modelo 3D del Producto"
        style={{ width: '100%', height: '100%' }}
      >
        <button 
          slot="ar-button" 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2 1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
          Ver en tu espacio
        </button>
      </ModelViewer>

      {/* Desktop Overlay Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button 
          onClick={onShowQR}
          className="bg-white/90 backdrop-blur text-gray-800 hover:text-red-600 p-3 rounded-xl shadow-md transition-all hover:shadow-lg"
          title="Ver código QR"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4h2v-4zM6 6h6v6H6V6zm1.5 1.5v3h3v-3h-3zm6.5 4.5h3m-3 0v3m0 0h3m-3 0v-3s0 0 0 0zm0 3v3m0 0h3m-3 0v-3m0 0h-3m3 0v3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Viewer3D;