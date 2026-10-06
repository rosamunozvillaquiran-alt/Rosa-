import React, { useState } from 'react';
import {
  Calculator,
  RefreshCw,
  Sprout,
  Droplets,
  Layers,
  FlaskConical,
  Scale,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const AgronomicCalculator: React.FC = () => {
  // Parámetros de entrada con valores agronómicos estándar para 0.5 Ha
  const [areaM2, setAreaM2] = useState<number>(5000);
  const [distSurcosM, setDistSurcosM] = useState<number>(0.80);
  const [distPlantasM, setDistPlantasM] = useState<number>(0.25);
  const [semillasPorSitio, setSemillasPorSitio] = useState<number>(2);
  const [pmsGramas, setPmsGramas] = useState<number>(310); // Peso de 1000 semillas
  const [pgPorcentaje, setPgPorcentaje] = useState<number>(92); // Poder germinativo
  const [margenSeguridad, setMargenSeguridad] = useState<number>(12); // % resiembra

  // Parámetros de fertilización (kg elemento/ha)
  const [metaN, setMetaN] = useState<number>(150); // kg N / ha
  const [metaP, setMetaP] = useState<number>(70); // kg P2O5 / ha
  const [metaK, setMetaK] = useState<number>(100); // kg K2O / ha

  // Enmienda (t/ha cal dolomita)
  const [dosisCalTonHa, setDosisCalTonHa] = useState<number>(1.8);

  // Parámetros de riego
  const [goteroEspacioM, setGoteroEspacioM] = useState<number>(0.25);
  const [goteroCaudalLh, setGoteroCaudalLh] = useState<number>(1.4);
  const [faseKc, setFaseKc] = useState<number>(1.2); // Pico en floración VT

  // Reset a valores recomendados oficiales
  const handleReset = () => {
    setAreaM2(5000);
    setDistSurcosM(0.80);
    setDistPlantasM(0.25);
    setSemillasPorSitio(2);
    setPmsGramas(310);
    setPgPorcentaje(92);
    setMargenSeguridad(12);
    setMetaN(150);
    setMetaP(70);
    setMetaK(100);
    setDosisCalTonHa(1.8);
    setGoteroEspacioM(0.25);
    setGoteroCaudalLh(1.4);
    setFaseKc(1.2);
  };

  // Cálculos Agronómicos
  const factorHectarea = areaM2 / 10000; // Ej: 0.5 ha
  const areaPorSitio = distSurcosM * distPlantasM; // 0.20 m²
  const numeroSitios = Math.round(areaM2 / (areaPorSitio || 0.01));
  const plantasEfectivasRaleo = numeroSitios; // 1 planta por sitio tras raleo
  const plantasPorHectarea = Math.round(plantasEfectivasRaleo / (factorHectarea || 0.001));

  // Semillas teóricas y reales
  const semillasTotalesTeoricas = numeroSitios * semillasPorSitio;
  const semillasAjustadas = Math.round(
    (semillasTotalesTeoricas / (pgPorcentaje / 100)) * (1 + margenSeguridad / 100)
  );
  const kgSemillaRequerida = Number(((semillasAjustadas * pmsGramas) / 1000000).toFixed(2));

  // Encalado
  const calTotalKg = Math.round(dosisCalTonHa * 1000 * factorHectarea);
  const bultosCal50Kg = Number((calTotalKg / 50).toFixed(1));

  // Fertilizantes comerciales para el área
  // DAP (18-46-0) cubre el Fósforo
  const reqP2O5Area = metaP * factorHectarea;
  const kgDap = Math.round(reqP2O5Area / 0.46);
  const aporteNDap = kgDap * 0.18;

  // Urea (46-0-0) cubre el Nitrógeno restante
  const reqNArea = metaN * factorHectarea;
  const nRestante = Math.max(0, reqNArea - aporteNDap);
  const kgUrea = Math.round(nRestante / 0.46);

  // KCl (0-0-60) cubre el Potasio
  const reqK2OArea = metaK * factorHectarea;
  const kgKcl = Math.round(reqK2OArea / 0.60);

  // Riego
  const metrosCintaLineal = Math.round(areaM2 / (distSurcosM || 0.1));
  const numeroGoteros = Math.round(metrosCintaLineal / (goteroEspacioM || 0.1));
  const caudalTotalSistemaLh = Math.round(numeroGoteros * goteroCaudalLh);
  // Lámina diaria mm = ETo (aprox 4.5 mm) * Kc
  const laminaMm = Number((4.5 * faseKc).toFixed(1));
  const volumenAguaDiarioM3 = Number(((laminaMm * areaM2) / 1000).toFixed(1));
  const tiempoRiegoMinutos = Math.round((volumenAguaDiarioM3 * 1000) / (caudalTotalSistemaLh / 60 || 1));

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Calculadora Dinámica de Insumos & Arreglo Espacial
            </h2>
            <p className="text-xs text-slate-500">
              Herramienta interactiva para estudiantes y docentes: recalcula al instante para cualquier variación de lote
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Restablecer Parámetros Oficiales (0.5 Ha)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PANEL IZQUIERDO: FORMULARIO DE VARIABLES */}
        <div className="space-y-6">
          {/* Dimensiones y Marco */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 border-b pb-2">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>1. Dimensiones y Marco de Siembra</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Área del Lote (m²):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={areaM2}
                    onChange={(e) => setAreaM2(Number(e.target.value))}
                    step="100"
                    min="100"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                  />
                  <span className="text-slate-500 font-mono whitespace-nowrap">
                    ({(areaM2 / 10000).toFixed(2)} Ha)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Dist. Surcos (m):
                  </label>
                  <input
                    type="number"
                    value={distSurcosM}
                    onChange={(e) => setDistSurcosM(Number(e.target.value))}
                    step="0.05"
                    min="0.4"
                    max="1.2"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Dist. Golpes (m):
                  </label>
                  <input
                    type="number"
                    value={distPlantasM}
                    onChange={(e) => setDistPlantasM(Number(e.target.value))}
                    step="0.05"
                    min="0.1"
                    max="0.6"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Semillas Depositadas por Sitio:
                </label>
                <select
                  value={semillasPorSitio}
                  onChange={(e) => setSemillasPorSitio(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-xs"
                >
                  <option value={1}>1 semilla (Siembra directa monograno)</option>
                  <option value={2}>2 semillas (Recomendado con raleo)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    P.M.S. (g/1000 sem):
                  </label>
                  <input
                    type="number"
                    value={pmsGramas}
                    onChange={(e) => setPmsGramas(Number(e.target.value))}
                    step="5"
                    min="200"
                    max="450"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Germinación (%):
                  </label>
                  <input
                    type="number"
                    value={pgPorcentaje}
                    onChange={(e) => setPgPorcentaje(Number(e.target.value))}
                    step="1"
                    min="70"
                    max="100"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Variables de Fertilización y Suelo */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 border-b pb-2">
              <FlaskConical className="w-4 h-4 text-purple-600" />
              <span>2. Requerimiento Nutricional & Cal</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">N (kg/ha):</label>
                  <input
                    type="number"
                    value={metaN}
                    onChange={(e) => setMetaN(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">P₂O₅ (kg/ha):</label>
                  <input
                    type="number"
                    value={metaP}
                    onChange={(e) => setMetaP(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">K₂O (kg/ha):</label>
                  <input
                    type="number"
                    value={metaK}
                    onChange={(e) => setMetaK(Number(e.target.value))}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Cal Dolomita Recomendada (t/ha):
                </label>
                <input
                  type="number"
                  value={dosisCalTonHa}
                  onChange={(e) => setDosisCalTonHa(Number(e.target.value))}
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Riego Variables */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 border-b pb-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <span>3. Hidráulica de Riego</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Espacio Goteros (m):</label>
                  <input
                    type="number"
                    value={goteroEspacioM}
                    onChange={(e) => setGoteroEspacioM(Number(e.target.value))}
                    step="0.05"
                    className="w-full px-2 py-1.5 border border-slate-300 rounded font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Gasto Gotero (L/h):</label>
                  <input
                    type="number"
                    value={goteroCaudalLh}
                    onChange={(e) => setGoteroCaudalLh(Number(e.target.value))}
                    step="0.1"
                    className="w-full px-2 py-1.5 border border-slate-300 rounded font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Fase Fenológica (Kc):</label>
                <select
                  value={faseKc}
                  onChange={(e) => setFaseKc(Number(e.target.value))}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
                >
                  <option value={0.35}>Emergencia V0-VE (Kc = 0.35)</option>
                  <option value={0.75}>Vegetativo V4-V8 (Kc = 0.75)</option>
                  <option value={1.20}>Floración VT-R1 (Kc = 1.20 - Crítico)</option>
                  <option value={0.60}>Maduración R4-R6 (Kc = 0.60)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL CENTRAL Y DERECHO: RESULTADOS Y CUADRO DE MANDO */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tarjeta de Densidad y Semilla */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Scale className="w-5 h-5 text-emerald-600" />
                <span>Resultados de Población y Semilla para {areaM2} m²</span>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full font-mono">
                {factorHectarea} Hectáreas
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
                <span className="text-[11px] text-emerald-800 font-bold block mb-1">Sitios Totales</span>
                <span className="text-2xl font-black text-emerald-950">{numeroSitios.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-700 block">golpes en el lote</span>
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
                <span className="text-[11px] text-emerald-800 font-bold block mb-1">Plantas Finales</span>
                <span className="text-2xl font-black text-emerald-950">{plantasEfectivasRaleo.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-700 block">tras raleo</span>
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
                <span className="text-[11px] text-emerald-800 font-bold block mb-1">Densidad/Ha</span>
                <span className="text-2xl font-black text-emerald-950">{plantasPorHectarea.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-700 block">plantas/ha equiv.</span>
              </div>

              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200">
                <span className="text-[11px] text-amber-900 font-bold block mb-1">Semilla a Comprar</span>
                <span className="text-2xl font-black text-amber-950">{kgSemillaRequerida} kg</span>
                <span className="text-[10px] text-amber-800 block">~{semillasAjustadas.toLocaleString()} sem.</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Desglose Matemático para Práctica Estudiantil:
              </span>
              <p>
                Con un poder germinativo de {pgPorcentaje}% y un margen de resiembra del {margenSeguridad}%, cada sitio requiere sembrar {semillasPorSitio} semillas.
                Para sembrar {numeroSitios} sitios se requiere una masa neta de <strong>{kgSemillaRequerida} kilogramos de semilla certificada</strong>.
              </p>
            </div>
          </div>

          {/* Tarjeta de Fertilizantes y Enmienda */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Layers className="w-5 h-5 text-purple-600" />
                <span>Requerimiento Comercial de Fertilizantes y Enmienda</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold block">Cal Dolomita</span>
                <div className="text-lg font-black text-slate-900 font-mono mt-1">{calTotalKg} kg</div>
                <span className="text-slate-600 text-[11px] font-bold block">
                  ~{bultosCal50Kg} bultos de 50 kg
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">30-45 d antes</span>
              </div>

              <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-200">
                <span className="text-purple-800 font-semibold block">DAP (18-46-0)</span>
                <div className="text-lg font-black text-purple-950 font-mono mt-1">{kgDap} kg</div>
                <span className="text-purple-900 text-[11px] font-bold block">
                  ~{(kgDap / 50).toFixed(1)} bultos
                </span>
                <span className="text-[10px] text-purple-700 mt-1 block">A la siembra</span>
              </div>

              <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-200">
                <span className="text-purple-800 font-semibold block">Urea (46-0-0)</span>
                <div className="text-lg font-black text-purple-950 font-mono mt-1">{kgUrea} kg</div>
                <span className="text-purple-900 text-[11px] font-bold block">
                  ~{(kgUrea / 50).toFixed(1)} bultos
                </span>
                <span className="text-[10px] text-purple-700 mt-1 block">V4 y V8 fraccionado</span>
              </div>

              <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-200">
                <span className="text-purple-800 font-semibold block">KCl (0-0-60)</span>
                <div className="text-lg font-black text-purple-950 font-mono mt-1">{kgKcl} kg</div>
                <span className="text-purple-900 text-[11px] font-bold block">
                  ~{(kgKcl / 50).toFixed(1)} bultos
                </span>
                <span className="text-[10px] text-purple-700 mt-1 block">Siembra y aporque</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Riego y Demanda Hídrica */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Droplets className="w-5 h-5 text-blue-600" />
                <span>Dimensionamiento Hidráulico y Volumen de Agua</span>
              </div>
              <span className="text-xs text-blue-800 font-mono font-semibold">
                Kc seleccionado: {faseKc}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                <span className="text-blue-700 font-bold block">Cinta Total</span>
                <span className="text-lg font-black text-blue-950 font-mono">{metrosCintaLineal} m</span>
                <span className="text-[10px] text-blue-600 block">metros lineales</span>
              </div>

              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                <span className="text-blue-700 font-bold block">Goteros Totales</span>
                <span className="text-lg font-black text-blue-950 font-mono">{numeroGoteros.toLocaleString()}</span>
                <span className="text-[10px] text-blue-600 block">emisores</span>
              </div>

              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                <span className="text-blue-700 font-bold block">Volumen Diario</span>
                <span className="text-lg font-black text-blue-950 font-mono">{volumenAguaDiarioM3} m³</span>
                <span className="text-[10px] text-blue-600 block">({(volumenAguaDiarioM3 * 1000).toLocaleString()} L)</span>
              </div>

              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                <span className="text-blue-700 font-bold block">Tiempo Riego</span>
                <span className="text-lg font-black text-blue-950 font-mono">{tiempoRiegoMinutos} min</span>
                <span className="text-[10px] text-blue-600 block">bombeo por jornada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
