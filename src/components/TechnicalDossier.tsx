import React, { useState } from 'react';
import {
  VARIEDADES_RECOMENDADAS,
  ENMIENDAS_SUELO,
  DISENO_RIEGO,
  PLAN_FERTILIZACION,
  FASES_FENOLOGICAS,
  PROBLEMAS_FITOSANITARIOS,
  MANEJO_ARVENSES
} from '../data/agronomyData';
import {
  Sprout,
  Droplets,
  Layers,
  FlaskConical,
  Clock,
  Bug,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';

export const TechnicalDossier: React.FC = () => {
  const [selectedVarietyIdx, setSelectedVarietyIdx] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<string>('variedad');

  const subTabs = [
    { id: 'variedad', label: '1. Variedad & Densidad' },
    { id: 'enmiendas', label: '2. Enmiendas Pre-siembra' },
    { id: 'riego', label: '3. Sistema de Riego' },
    { id: 'fertilizacion', label: '4. Plan de Fertilización' },
    { id: 'fenologia', label: '5. Fenología & Labores' },
    { id: 'sanidad', label: '6. Sanidad & Malezas' },
  ];

  return (
    <div className="space-y-6">
      {/* Banner de Introducción Técnico-Institucional */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-xl border border-emerald-700/60 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-700/80 text-emerald-200 border border-emerald-600/60">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Memoria Técnica de Cultivo • Formato Oficial Agropecuario</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Arreglo Productivo de Maíz (Zea mays L.) — 0.5 Hectárea
            </h2>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Diseño agronómico de alta precisión desarrollado con rigor metodológico para la Institución Educativa Técnico Agrícola.
              Integra el arreglo espacial, balance hídrico-nutricional, manejo integrado fitosanitario (MIP/MIA), Buenas Prácticas Agrícolas (BPA)
              y pertinencia curricular pedagógica para docentes y estudiantes de grado técnico.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 min-w-[280px]">
            <div className="bg-emerald-950/70 p-3 rounded-xl border border-emerald-700/60 text-center">
              <span className="text-xs text-emerald-300 block">Área de Siembra</span>
              <span className="text-xl font-bold text-white">5.000 m²</span>
              <span className="text-[11px] text-emerald-400 block font-mono">0.5 Hectárea</span>
            </div>
            <div className="bg-emerald-950/70 p-3 rounded-xl border border-emerald-700/60 text-center">
              <span className="text-xs text-emerald-300 block">Sitios Estimados</span>
              <span className="text-xl font-bold text-amber-300">25.000</span>
              <span className="text-[11px] text-emerald-400 block font-mono">a 0.80m × 0.25m</span>
            </div>
            <div className="bg-emerald-950/70 p-3 rounded-xl border border-emerald-700/60 text-center">
              <span className="text-xs text-emerald-300 block">Semilla Requerida</span>
              <span className="text-xl font-bold text-white">9.5 - 10 kg</span>
              <span className="text-[11px] text-emerald-400 block font-mono">~30.000 semillas</span>
            </div>
            <div className="bg-emerald-950/70 p-3 rounded-xl border border-emerald-700/60 text-center">
              <span className="text-xs text-emerald-300 block">Rendimiento Meta</span>
              <span className="text-xl font-bold text-emerald-300">3.0 - 4.5 t</span>
              <span className="text-[11px] text-emerald-400 block font-mono">6 - 9 t/ha equiv.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-navegador de secciones técnicas */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-2 pb-1">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === tab.id
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-emerald-800 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECCIÓN 1: VARIEDAD, DISTANCIAS Y CÁLCULO DE SEMILLA */}
      {activeSubTab === 'variedad' && (
        <div className="space-y-6">
          {/* Tarjeta de Variedades Seleccionables */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Variedad de Maíz Recomendada para la I.E. Técnico Agrícola</h3>
                  <p className="text-xs text-slate-500">Seleccione la opción agronómica según el piso térmico y enfoque educativo de la granja</p>
                </div>
              </div>
              <div className="flex gap-2">
                {VARIEDADES_RECOMENDADAS.map((varItem, idx) => (
                  <button
                    key={varItem.nombre}
                    onClick={() => setSelectedVarietyIdx(idx)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      selectedVarietyIdx === idx
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Opción {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Detalle de la variedad activa */}
            {(() => {
              const activeVar = VARIEDADES_RECOMENDADAS[selectedVarietyIdx];
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/70 p-5 rounded-xl border border-slate-200">
                  <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded bg-emerald-200 text-emerald-900">
                        {activeVar.tipo}
                      </span>
                      <span className="text-xs font-medium text-slate-500">Ciclo biológico: {activeVar.cicloDias}</span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">{activeVar.nombre}</h4>
                    <p className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 inline-block">
                      Piso Térmico: {activeVar.pisoTermico}
                    </p>
                    <div className="space-y-1.5 pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Características Agronómicas:</span>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {activeVar.caracteristicas.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4 bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Rendimiento Proyectado</span>
                      <div className="text-2xl font-black text-emerald-900">{activeVar.rendimiento05Ha}</div>
                      <span className="text-xs text-slate-500">Equivalente a {activeVar.rendimientoEsperadoTonHa}</span>
                    </div>
                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-800 block mb-1">Criterio Pedagógico IETA:</span>
                      <p className="text-xs text-slate-600 italic bg-amber-50/80 p-2.5 rounded-lg border border-amber-200">
                        "{activeVar.justificacionPedagogica}"
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Marco de Siembra y Densidad Poblacional */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Arreglo Espacial y Densidad de Población para 0.5 Hectárea (5.000 m²)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                  <span className="text-xs text-emerald-800 font-bold block mb-1">Distancia Entre Surcos (Calles)</span>
                  <div className="text-2xl font-black text-emerald-950">0.80 m <span className="text-sm font-normal text-slate-600">(80 cm)</span></div>
                  <p className="text-xs text-slate-600 mt-1">
                    Permite el tránsito ergonómico de estudiantes, aporque manual o tracción liviana y colocación de cinta de goteo.
                  </p>
                </div>

                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                  <span className="text-xs text-emerald-800 font-bold block mb-1">Distancia Entre Plantas (Golpes)</span>
                  <div className="text-2xl font-black text-emerald-950">0.25 m <span className="text-sm font-normal text-slate-600">(25 cm)</span></div>
                  <p className="text-xs text-slate-600 mt-1">
                    Espaciamiento ideal para evitar competencia por luz y nutrientes entre plantas individuales en la hilera.
                  </p>
                </div>

                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                  <span className="text-xs text-emerald-800 font-bold block mb-1">Población Efectiva en 0.5 Ha</span>
                  <div className="text-2xl font-black text-emerald-950">25.000 plantas</div>
                  <p className="text-xs text-slate-600 mt-1">
                    Equivalente a <strong>50.000 plantas/ha</strong> (óptimo para variedades VPA) o hasta 62.500 pl/ha (0.80m × 0.20m) para híbridos.
                  </p>
                </div>
              </div>

              {/* Justificación del Raleo y Cálculo de Semillas */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                  <Info className="w-4 h-4 text-emerald-600" />
                  <span>Protocolo de Semillas por Sitio, Raleo y Cálculo Matemático Exacto</span>
                </div>
                <div className="text-xs text-slate-700 leading-relaxed space-y-2">
                  <p>
                    <strong>¿Cuántas semillas sembrar por sitio?:</strong> Se deben depositar <strong>2 semillas por golpe (sitio)</strong> a una profundidad constante de 3 a 4 cm.
                    Nunca sembrar a más de 5 cm (asfixia o demora en emergencia) ni a menos de 2 cm (desecación o consumo por pájaros).
                  </p>
                  <p>
                    <strong>Labor de Raleo o Desahije (Obligatoria):</strong> A los <strong>12 a 15 días después de la emergencia (DDE en etapa V2-V3)</strong>,
                    los estudiantes deben recorrer los surcos y retirar con cuidado la plántula menos vigorosa o dañada por trozadores,
                    dejando <strong>exactamente 1 planta sana por sitio</strong>. Esto garantiza la densidad final de 25.000 plantas homogéneas sin competencia intraespecífica.
                  </p>
                </div>

                {/* Caja de cálculo matemático */}
                <div className="bg-white p-4 rounded-lg border border-slate-300 font-mono text-xs text-slate-800 space-y-2">
                  <div className="font-bold text-emerald-900 uppercase">Cálculo de Insumo de Semilla para 0.5 Hectárea:</div>
                  <div className="bg-slate-100 p-2.5 rounded border border-slate-200">
                    <div>1. Área del lote = 5.000 m²</div>
                    <div>2. Área por sitio = 0.80 m × 0.25 m = 0.20 m² / sitio</div>
                    <div>3. Número de sitios = 5.000 m² ÷ 0.20 m² = 25.000 sitios de siembra</div>
                    <div>4. Semillas a 2 por sitio = 25.000 × 2 = 50.000 semillas teóricas</div>
                    <div>5. Con sembradora manual tecnificada (matraca regulada 1 a 2) + 12% factor de seguridad:</div>
                    <div className="pl-4 text-emerald-800 font-bold">
                      → Se requieren aproximadamente <strong>28.000 a 30.000 semillas</strong>.
                    </div>
                    <div>6. Considerando Peso de Mil Semillas (PMS) promedio = 310 g y Poder Germinativo (PG) = 92%:</div>
                    <div className="pl-4 text-emerald-800 font-bold">
                      → <strong>Kilos de semilla certificada a comprar = 9.5 a 10.0 kg</strong> (o 1 bolsa comercial estándar de 60.000 semillas rinde para dos ciclos pedagógicos de 0.5 ha).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 2: ENMIENDAS DE SUELO */}
      {activeSubTab === 'enmiendas' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-lg">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Enmiendas a Aplicar Antes de la Siembra</h3>
              <p className="text-xs text-slate-500">Plan de acondicionamiento físico, químico y biológico del suelo para 0.5 Ha (5.000 m²)</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 text-xs text-blue-900 leading-relaxed">
              <strong>Premisa Técnica del Agrónomo:</strong> En suelos agrícolas típicos con historial de cultivo continuo, el pH suele situarse entre 5.0 y 5.6,
              generando fijación de fósforo (P) e inicio de toxicidad por Aluminio intercambiable (Al³⁺).
              La corrección debe realizarse con anticipación mínima de <strong>30 a 45 días antes de la siembra</strong> para permitir la disolución y reacción química con la humedad del suelo.
            </div>

            <div className="grid grid-cols-1 gap-4">
              {ENMIENDAS_SUELO.map((enmienda, idx) => (
                <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      {enmienda.tipo}
                    </h4>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded">
                      Dosis 0.5 Ha: {enmienda.dosis05Ha}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold block">Composición Química:</span>
                      <span className="text-slate-800 font-medium">{enmienda.composicionQuimica}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">Momento de Aplicación:</span>
                      <span className="text-amber-900 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                        {enmienda.momentoAplicacion}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">Método de Incorporación:</span>
                      <span className="text-slate-800">{enmienda.metodoAplicacion}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-700">
                    <strong className="text-emerald-900">Objetivo Agronómico:</strong> {enmienda.objetivoAgronomico}
                  </div>
                </div>
              ))}
            </div>

            {/* Protocolo Pedagógico de Encalado */}
            <div className="bg-emerald-900 text-emerald-100 p-5 rounded-xl text-xs space-y-2">
              <h5 className="font-bold text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Guía Práctica para la Práctica de Campo con Estudiantes:
              </h5>
              <ol className="list-decimal list-inside space-y-1 pl-1">
                <li>Dividir la media hectárea (5.000 m²) en 4 cuadrantes pedagógicos de 1.250 m² cada uno con estacas.</li>
                <li>Asignar a cada cuadrante 4 bultos de cal dolomita (200 kg por cuadrante = 800 kg total).</li>
                <li>Hacer que los estudiantes distribuyan los bultos en montículos uniformes cada 10 metros para garantizar cobertura homogénea al voleo.</li>
                <li>Incorporar de inmediato con rastra o pase de rotocultivador a profundidad de 15 a 20 cm.</li>
                <li>Regar o esperar lluvia: la cal dolomita requiere agua para disociarse químicamente en Ca²⁺, Mg²⁺ y aniones carbonato (CO₃²⁻).</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 3: SISTEMA DE RIEGO */}
      {activeSubTab === 'riego' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Sistema de Riego Tecnificado para 0.5 Hectárea</h3>
              <p className="text-xs text-slate-500">Diseño hidráulico, láminas de reposición y coeficientes de cultivo (Kc)</p>
            </div>
          </div>

          {/* Especificaciones del Sistema de Goteo */}
          <div className="space-y-4">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">{DISENO_RIEGO.sistema}</h4>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-100 text-blue-900">
                  Eficiencia 92 - 95%
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Metros de Cinta Total</span>
                  <span className="font-bold text-slate-900 text-sm">{DISENO_RIEGO.especificacionesTecnicas.metrosCintaTotal}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Número de Surcos</span>
                  <span className="font-bold text-slate-900 text-sm">{DISENO_RIEGO.especificacionesTecnicas.numeroSurcos}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Espacio entre Goteros</span>
                  <span className="font-bold text-slate-900 text-sm">{DISENO_RIEGO.especificacionesTecnicas.espaciamientoGoteros}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Caudal del Gotero</span>
                  <span className="font-bold text-slate-900 text-sm">{DISENO_RIEGO.especificacionesTecnicas.caudalGotero}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Presión Operativa</span>
                  <span className="font-bold text-slate-900 text-sm">{DISENO_RIEGO.especificacionesTecnicas.presionOperacion}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 sm:col-span-2 lg:col-span-3">
                  <span className="text-slate-500 block">Filtrado Requerido en Cabezal</span>
                  <span className="font-bold text-slate-900 text-sm">{DISENO_RIEGO.especificacionesTecnicas.filtradoRequerido}</span>
                </div>
              </div>
            </div>

            {/* Tabla de Requerimiento Hídrico por Fase */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Calendario y Programación de Riego según Coeficiente de Cultivo (Kc)
              </span>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">Fase Fenológica</th>
                      <th className="p-3">Kc</th>
                      <th className="p-3">Lámina Diaria (0.5 Ha)</th>
                      <th className="p-3">Tiempo de Bombeo</th>
                      <th className="p-3">Frecuencia Recomendada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {DISENO_RIEGO.requerimientoHidrico.map((fase, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">{fase.fase}</td>
                        <td className="p-3 font-mono font-bold text-blue-700">{fase.kc}</td>
                        <td className="p-3 font-mono text-slate-800">{fase.laminaDiariaMm}</td>
                        <td className="p-3 font-bold text-emerald-800">{fase.tiempoRiegoMin}</td>
                        <td className="p-3 text-slate-600">{fase.frecuencia}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Alternativa de Riego por Gravedad */}
            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
              <span className="font-bold uppercase tracking-wider text-amber-900 block flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-700" />
                Alternativa de Riego por Gravedad en Surcos (Si la IETA no tiene presión hidráulica):
              </span>
              <p className="leading-relaxed">{DISENO_RIEGO.alternativaGravedad}</p>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 4: PLAN DE FERTILIZACIÓN */}
      {activeSubTab === 'fertilizacion' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-800 rounded-lg">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Plan de Fertilización Fraccionada para 0.5 Hectárea</h3>
                <p className="text-xs text-slate-500">Balance nutricional ajustado a la curva de extracción del maíz (N-P-K-Mg-S-Zn-B)</p>
              </div>
            </div>
            <div className="text-xs font-mono bg-purple-50 text-purple-900 border border-purple-200 px-3 py-1 rounded-lg">
              Meta Extracción: N 75 kg | P₂O₅ 35 kg | K₂O 50 kg
            </div>
          </div>

          <div className="space-y-4">
            {PLAN_FERTILIZACION.map((dosis, idx) => (
              <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div>
                    <span className="text-xs font-bold uppercase text-purple-800 block">Etapa {idx + 1}: {dosis.diasDDS}</span>
                    <h4 className="text-base font-extrabold text-slate-900">{dosis.etapa}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Peso Total Insumos 0.5 Ha</span>
                    <span className="text-sm font-black text-purple-950 font-mono">{dosis.cantidad05HaKg} kg</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-500 font-semibold block">Fuentes Comerciales Requeridas:</span>
                      <span className="text-slate-900 font-bold">{dosis.fuenteComercial}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                      <span className="text-slate-600 font-semibold block mb-0.5">Desglose de Bultos / Empaques (0.5 Ha):</span>
                      <span className="text-purple-900 font-bold font-mono">{dosis.bultos50Kg}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-500 font-semibold block">Aporte Nutricional Elementos Puros:</span>
                      <span className="text-emerald-800 font-mono font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block">
                        {dosis.aporteNutricional}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">Método y Criterio de Aplicación:</span>
                      <span className="text-slate-700">{dosis.metodoAplicacion}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Resumen Total de Bultos de Fertilizante para Comprar */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-5 rounded-xl space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-purple-200">
                Resumen Consolidado de Fertilizantes a Adquirir para 0.5 Hectárea:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs text-center font-mono">
                <div className="bg-white/10 p-2.5 rounded-lg border border-white/15">
                  <span className="text-purple-300 block text-[11px]">DAP (18-46-0)</span>
                  <span className="text-base font-bold text-white">75 kg</span>
                  <span className="text-[10px] text-purple-200 block">(1.5 bultos)</span>
                </div>
                <div className="bg-white/10 p-2.5 rounded-lg border border-white/15">
                  <span className="text-purple-300 block text-[11px]">Urea (46-0-0)</span>
                  <span className="text-base font-bold text-white">125 kg</span>
                  <span className="text-[10px] text-purple-200 block">(2.5 bultos)</span>
                </div>
                <div className="bg-white/10 p-2.5 rounded-lg border border-white/15">
                  <span className="text-purple-300 block text-[11px]">KCl (0-0-60)</span>
                  <span className="text-base font-bold text-white">60 kg</span>
                  <span className="text-[10px] text-purple-200 block">(1.2 bultos)</span>
                </div>
                <div className="bg-white/10 p-2.5 rounded-lg border border-white/15">
                  <span className="text-purple-300 block text-[11px]">K-Mag / MgSO₄</span>
                  <span className="text-base font-bold text-white">25 kg</span>
                  <span className="text-[10px] text-purple-200 block">(0.5 bultos)</span>
                </div>
                <div className="bg-white/10 p-2.5 rounded-lg border border-white/15 col-span-2 sm:col-span-1">
                  <span className="text-purple-300 block text-[11px]">Foliar Boro+Zinc</span>
                  <span className="text-base font-bold text-white">1 Litro</span>
                  <span className="text-[10px] text-purple-200 block">(1 frasco)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 5: FENOLOGÍA Y LABORES DE SOSTENIMIENTO */}
      {activeSubTab === 'fenologia' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Cronograma Fenológico y Actividades de Sostenimiento</h3>
              <p className="text-xs text-slate-500">Secuencia técnica de labores desde la siembra hasta la madurez de cosecha (Escala Ritchie / Iowa State)</p>
            </div>
          </div>

          <div className="space-y-4">
            {FASES_FENOLOGICAS.map((fase) => {
              const riesgoColor =
                fase.nivelRiesgoEstres === 'Crítico'
                  ? 'bg-red-100 text-red-900 border-red-300'
                  : fase.nivelRiesgoEstres === 'Medio'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300';

              return (
                <div key={fase.codigo} className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-black font-mono bg-emerald-800 text-white px-2.5 py-0.5 rounded">
                        {fase.codigo}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{fase.nombre}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {fase.diasAproximados}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${riesgoColor}`}>
                        Estrés: {fase.nivelRiesgoEstres}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic">{fase.descripcionVisual}</p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Labores de Sostenimiento Exigidas:
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {fase.laboresClave.map((labor, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{labor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECCIÓN 6: SANIDAD VEGETAL Y CONTROL DE ARVENSES */}
      {activeSubTab === 'sanidad' && (
        <div className="space-y-6">
          {/* Matriz Rápida de Plagas y Enfermedades */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-100 text-rose-800 rounded-lg">
                  <Bug className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Manejo Integrado de Plagas y Enfermedades (MIP)</h3>
                  <p className="text-xs text-slate-500">Productos químicos y biológicos, dosis calculadas para 0.5 Ha y períodos de carencia</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROBLEMAS_FITOSANITARIOS.slice(0, 4).map((p) => (
                <div key={p.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                        {p.tipo}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{p.nombreComun}</h4>
                      <span className="text-[11px] text-slate-500 italic block">{p.nombreCientifico}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                      Tox: {p.categoriaToxicologica}
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 space-y-1">
                    <div>
                      <span className="font-semibold text-slate-500">I.A. Químico:</span>{' '}
                      <span className="font-bold text-slate-900">{p.ingredienteActivoQuimico}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">Dosis 0.5 Ha:</span>{' '}
                      <span className="font-bold text-emerald-800">{p.dosisPara05Ha}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">Carencia (P.C.):</span>{' '}
                      <span className="font-bold text-amber-900">{p.periodoCarenciaDias} días</span> | Reingreso:{' '}
                      <span className="font-bold">{p.periodoReingresoHoras} h</span>
                    </div>
                  </div>

                  <div className="text-slate-600">
                    <strong className="text-slate-800">Umbral (UDE):</strong> {p.umbralDanoEconomico}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Manejo de Arvenses */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Manejo Integrado de Arvenses (MIA) por Épocas</h3>
                <p className="text-xs text-slate-500">Período Crítico de Competencia (PCC: 15 a 45 DDS) y control escalonado</p>
              </div>
            </div>

            <div className="space-y-3">
              {MANEJO_ARVENSES.map((arvense, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-emerald-800 block">{arvense.etapaCultivo} ({arvense.diasDDS})</span>
                      <h4 className="text-sm font-bold text-slate-900">{arvense.tipoControl}</h4>
                    </div>
                    <span className="font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      Dosis 0.5 Ha: {arvense.dosis05Ha}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 font-semibold block">Herbicida / Método:</span>
                      <span className="text-slate-800 font-medium">{arvense.herbicidaOpcion}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block">Malezas Objetivo:</span>
                      <span className="text-slate-800">{arvense.malezasObjetivo}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 bg-white p-2.5 rounded border border-slate-200 italic">
                    <strong>BPA:</strong> {arvense.observacionesBpa}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
