import React, { useState } from 'react';
import {
  PROBLEMAS_FITOSANITARIOS,
  MANEJO_ARVENSES
} from '../data/agronomyData';
import {
  Bug,
  ShieldAlert,
  Clock,
  Sparkles,
  Droplet,
  Search,
  CheckCircle2,
  AlertTriangle,
  Beaker,
  ShieldCheck
} from 'lucide-react';

export const PestAndWeedMatrix: React.FC = () => {
  const [filterType, setFilterType] = useState<'todos' | 'Plaga' | 'Enfermedad' | 'Arvenses'>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Calculadora rápida de tanque de 20 Litros para estudiantes
  const [backpackCapacityL, setBackpackCapacityL] = useState<number>(20);
  const [totalWaterVolumeL, setTotalWaterVolumeL] = useState<number>(100); // 100 L para 0.5 ha
  const [productDose05Ha, setProductDose05Ha] = useState<number>(60); // ej 60 ml de Coragen

  const numBackpacks = Math.ceil(totalWaterVolumeL / (backpackCapacityL || 1));
  const dosePerBackpack = Number((productDose05Ha / (numBackpacks || 1)).toFixed(1));

  const filteredProblems = PROBLEMAS_FITOSANITARIOS.filter((item) => {
    const matchesFilter = filterType === 'todos' || item.tipo === filterType;
    const matchesSearch =
      item.nombreComun.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nombreCientifico.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredienteActivoQuimico.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-100 text-rose-800 rounded-xl">
            <Bug className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Matriz Fitosanitaria & Manejo Integrado de Arvenses (MIP / MIA)
            </h2>
            <p className="text-xs text-slate-500">
              Catálogo de problemas sanitarios del maíz, umbrales de daño económico, control biológico y dosis exactas para 0.5 Ha
            </p>
          </div>
        </div>

        {/* Barra de Filtros */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Buscar plaga, hongo o I.A..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 w-48 sm:w-60"
            />
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setFilterType('todos')}
              className={`px-2.5 py-1 rounded cursor-pointer ${
                filterType === 'todos' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('Plaga')}
              className={`px-2.5 py-1 rounded cursor-pointer ${
                filterType === 'Plaga' ? 'bg-white text-rose-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Plagas
            </button>
            <button
              onClick={() => setFilterType('Enfermedad')}
              className={`px-2.5 py-1 rounded cursor-pointer ${
                filterType === 'Enfermedad' ? 'bg-white text-amber-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Enfermedades
            </button>
            <button
              onClick={() => setFilterType('Arvenses')}
              className={`px-2.5 py-1 rounded cursor-pointer ${
                filterType === 'Arvenses' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Arvenses (MIA)
            </button>
          </div>
        </div>
      </div>

      {/* CALCULADORA DE DOSIFICACIÓN POR BOMBA DE ESPALDA */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-2xl p-5 shadow-sm border border-emerald-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Beaker className="w-4 h-4" />
              <span>Herramienta Pedagógica de Campo: Dosificación por Bomba de Espalda</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Cálculo de Dosis por Tanque de Mochila (20 Litros) para 0.5 Hectárea
            </h3>
            <p className="text-xs text-slate-300">
              Evite sobre-dosificaciones o sub-dosificaciones accidentales por parte de los estudiantes durante la práctica.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 p-3 rounded-xl border border-white/15 text-xs">
            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Dosis para 0.5 Ha (ml o g):</label>
              <input
                type="number"
                value={productDose05Ha}
                onChange={(e) => setProductDose05Ha(Number(e.target.value))}
                className="w-full px-2 py-1 bg-white text-slate-900 rounded font-mono font-bold"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Volumen Total Caldo (L):</label>
              <input
                type="number"
                value={totalWaterVolumeL}
                onChange={(e) => setTotalWaterVolumeL(Number(e.target.value))}
                className="w-full px-2 py-1 bg-white text-slate-900 rounded font-mono font-bold"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Capacidad Bomba (L):</label>
              <input
                type="number"
                value={backpackCapacityL}
                onChange={(e) => setBackpackCapacityL(Number(e.target.value))}
                className="w-full px-2 py-1 bg-white text-slate-900 rounded font-mono font-bold"
              />
            </div>
            <div className="bg-emerald-500 text-slate-950 p-2 rounded text-center flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase">Dosis por Bomba:</span>
              <span className="text-base font-black font-mono">{dosePerBackpack} ml/g</span>
              <span className="text-[9px] font-semibold">({numBackpacks} bombas de 20L)</span>
            </div>
          </div>
        </div>
      </div>

      {/* LISTADO DE PLAGAS Y ENFERMEDADES */}
      {filterType !== 'Arvenses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProblems.map((p) => {
            const isSelected = selectedItem === p.id;
            const toxColor =
              p.categoriaToxicologica.includes('Rojo')
                ? 'bg-red-100 text-red-900 border-red-300'
                : p.categoriaToxicologica.includes('Amarillo')
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : p.categoriaToxicologica.includes('Azul')
                ? 'bg-blue-100 text-blue-900 border-blue-300'
                : 'bg-emerald-100 text-emerald-900 border-emerald-300';

            return (
              <div
                key={p.id}
                className={`bg-white rounded-2xl border transition-all p-5 space-y-4 shadow-sm ${
                  isSelected ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          p.tipo === 'Plaga' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {p.tipo}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${toxColor}`}>
                        Tox: {p.categoriaToxicologica}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{p.nombreComun}</h3>
                    <span className="text-xs text-slate-500 italic block">{p.nombreCientifico}</span>
                  </div>

                  <button
                    onClick={() => setSelectedItem(isSelected ? null : p.id)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                  >
                    {isSelected ? 'Ver menos' : 'Ver detalle'}
                  </button>
                </div>

                {/* Síntomas y Daño */}
                <div className="text-xs text-slate-600 space-y-1">
                  <span className="font-bold text-slate-800 block">Sintomatología y Daño Económico:</span>
                  <p className="leading-relaxed">{p.sintomasDano}</p>
                </div>

                {/* Umbral de Daño Económico (UDE) */}
                <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                    Umbral de Daño Económico (UDE) para Decidir Aplicación:
                  </span>
                  <p className="leading-relaxed">{p.umbralDanoEconomico}</p>
                </div>

                {/* Cuadro de Tratamiento Químico */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 font-semibold block">Ingrediente Activo:</span>
                      <span className="font-bold text-slate-900">{p.ingredienteActivoQuimico}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">Ref. Comercial:</span>
                      <span className="font-medium text-slate-800">{p.productoComercialReferencia}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                    <div>
                      <span className="text-slate-500 font-semibold block">Dosis para 0.5 Ha:</span>
                      <span className="font-black text-emerald-800 font-mono text-sm">{p.dosisPara05Ha}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">Dosis / Hectárea:</span>
                      <span className="text-slate-700 font-mono">{p.dosisPorHectarea}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Período Carencia:</span>
                      <span className="font-bold text-rose-900">{p.periodoCarenciaDias} días</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Reingreso (P.R.):</span>
                      <span className="font-bold text-slate-900">{p.periodoReingresoHoras} horas</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Boquilla:</span>
                      <span className="font-medium text-slate-800">{p.boquillaRecomendada}</span>
                    </div>
                  </div>
                </div>

                {/* Alternativa Biológica y Cultural */}
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    Manejo Agroecológico & Control Biológico Pedagógico:
                  </span>
                  <p className="leading-relaxed text-slate-700">{p.controlCulturalBiologico}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SECCIÓN DE ARVENSES */}
      {(filterType === 'todos' || filterType === 'Arvenses') && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Programa de Manejo Integrado de Arvenses (MIA) para 0.5 Hectárea
              </h3>
              <p className="text-xs text-slate-500">
                Control escalonado pre-emergente, post-emergente y mecánico durante el Período Crítico de Competencia (15 a 45 DDS)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {MANEJO_ARVENSES.map((arvense, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-800 text-white font-mono font-bold px-2 py-0.5 rounded text-[11px]">
                      {arvense.diasDDS}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{arvense.tipoControl}</h4>
                  </div>
                  <span className="font-mono font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded">
                    Dosis 0.5 Ha: {arvense.dosis05Ha}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 font-semibold block">Herbicida / Técnica:</span>
                    <span className="text-slate-800 font-medium">{arvense.herbicidaOpcion}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Espectro de Malezas:</span>
                    <span className="text-slate-800">{arvense.malezasObjetivo}</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700">
                  <strong className="text-emerald-900">Protocolo Técnico y Seguridad BPA:</strong> {arvense.observacionesBpa}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
