import React from 'react';
import {
  Sprout,
  Calculator,
  Bug,
  FileSpreadsheet,
  Wrench,
  FileText,
  Printer,
  Compass
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onPrint }) => {
  const tabs = [
    { id: 'dossier', label: 'Plan Técnico Maestro', icon: Sprout, desc: 'Directiva agronómica 0.5 Ha' },
    { id: 'calculadora', label: 'Calculadora de Insumos', icon: Calculator, desc: 'Semillas, fertilizantes y riego' },
    { id: 'sanidad', label: 'Matriz Fitosanitaria & Arvenses', icon: Bug, desc: 'Plagas, enfermedades y dosis' },
    { id: 'registros', label: 'Libro de Campo & Registros BPA', icon: FileSpreadsheet, desc: '6 formatos oficiales' },
    { id: 'equipos', label: 'Maquinaria, Herramientas & EPP', icon: Wrench, desc: 'Calibración y seguridad' },
    { id: 'informe', label: 'Informe Oficial Imprimible', icon: FileText, desc: 'Dictamen técnico para firma' },
  ];

  return (
    <header className="bg-emerald-950 text-white border-b border-emerald-800 shadow-md sticky top-0 z-40">
      {/* Top Bar Institucional */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 text-emerald-950 p-2.5 rounded-xl font-bold flex items-center justify-center shadow-inner">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider bg-emerald-800/80 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-700">
                I.E. Técnico Agrícola
              </span>
              <span className="text-xs text-emerald-300 font-mono">Arreglo Productivo Oficial</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Plan Agronómico de Maíz (0.5 Hectárea / 5.000 m²)
            </h1>
          </div>
        </div>

        {/* Badges y Acción de Imprimir */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <div className="hidden md:flex items-center gap-3 text-xs bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-700/60 font-mono">
            <div>
              <span className="text-emerald-400">Área:</span> <span className="font-semibold text-white">5.000 m² (0.5 Ha)</span>
            </div>
            <div className="text-emerald-600">|</div>
            <div>
              <span className="text-emerald-400">Densidad:</span> <span className="font-semibold text-white">50.000 - 62.500 pl/ha</span>
            </div>
            <div className="text-emerald-600">|</div>
            <div>
              <span className="text-emerald-400">Riego:</span> <span className="font-semibold text-white">Goteo 6.250 m</span>
            </div>
          </div>

          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors shadow-sm"
            title="Imprimir documento técnico o exportar a PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* Navegación por Pestañas */}
      <div className="bg-emerald-900/60 border-t border-emerald-800/80 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-2 py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-emerald-950 font-bold shadow-md'
                    : 'text-emerald-100 hover:bg-emerald-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-950' : 'text-emerald-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
