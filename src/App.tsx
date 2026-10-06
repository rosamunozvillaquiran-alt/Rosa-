/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TechnicalDossier } from './components/TechnicalDossier';
import { AgronomicCalculator } from './components/AgronomicCalculator';
import { PestAndWeedMatrix } from './components/PestAndWeedMatrix';
import { BpaRecordForms } from './components/BpaRecordForms';
import { EquipmentAndPpe } from './components/EquipmentAndPpe';
import { OfficialTechnicalReport } from './components/OfficialTechnicalReport';
import {
  Compass,
  Sprout,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dossier');

  const handlePrint = () => {
    setActiveTab('informe');
    setTimeout(() => {
      window.print();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Barra de Navegación Principal */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrint={handlePrint}
      />

      {/* Contenedor Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dossier' && <TechnicalDossier />}
        {activeTab === 'calculadora' && <AgronomicCalculator />}
        {activeTab === 'sanidad' && <PestAndWeedMatrix />}
        {activeTab === 'registros' && <BpaRecordForms />}
        {activeTab === 'equipos' && <EquipmentAndPpe />}
        {activeTab === 'informe' && <OfficialTechnicalReport onPrint={handlePrint} />}
      </main>

      {/* Pie de Página Institucional */}
      <footer className="bg-emerald-950 text-emerald-300 border-t border-emerald-900 text-xs py-6 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">Institución Educativa Técnico Agrícola</span>
            <span className="text-emerald-500">•</span>
            <span>Granja Experimental & Proyecto Pedagógico Productivo</span>
          </div>

          <div className="flex items-center gap-4 text-emerald-400">
            <span className="flex items-center gap-1">
              <Sprout className="w-3.5 h-3.5" /> Media Hectárea (5.000 m²)
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> BPA Certificadas
            </span>
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" /> Educación Agropecuaria
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

