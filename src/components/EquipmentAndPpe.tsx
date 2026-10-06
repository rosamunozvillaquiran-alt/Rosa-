import React, { useState } from 'react';
import {
  MAQUINARIA_Y_HERRAMIENTAS,
  MATRIZ_EPP
} from '../data/agronomyData';
import {
  Wrench,
  ShieldCheck,
  CheckSquare,
  Square,
  AlertTriangle,
  Beaker,
  CheckCircle2,
  HardHat,
  Glasses,
  Footprints,
  Info
} from 'lucide-react';

export const EquipmentAndPpe: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'equipos' | 'epp' | 'calibracion' | 'checklist'>('equipos');

  // Checklist interactivo de seguridad previo a la salida de campo
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    item1: true,
    item2: true,
    item3: false,
    item4: true,
    item5: false,
    item6: true,
    item7: false,
    item8: true
  });

  const toggleCheck = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalCheckItems = Object.keys(checklist).length;
  const progressPercent = Math.round((completedCount / totalCheckItems) * 100);

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 text-amber-900 rounded-xl">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Maquinaria, Herramientas & Equipos de Protección Personal (EPP)
            </h2>
            <p className="text-xs text-slate-500">
              Inventario técnico de aperos, calibración agronómica y matriz de seguridad ocupacional y BPA para 0.5 Ha
            </p>
          </div>
        </div>

        {/* Pestañas de la sección */}
        <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveSection('equipos')}
            className={`px-3 py-1.5 rounded cursor-pointer ${
              activeSection === 'equipos' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Maquinaria & Herramientas
          </button>
          <button
            onClick={() => setActiveSection('epp')}
            className={`px-3 py-1.5 rounded cursor-pointer ${
              activeSection === 'epp' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Matriz de EPP
          </button>
          <button
            onClick={() => setActiveSection('calibracion')}
            className={`px-3 py-1.5 rounded cursor-pointer ${
              activeSection === 'calibracion' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Calibración de Equipos
          </button>
          <button
            onClick={() => setActiveSection('checklist')}
            className={`px-3 py-1.5 rounded cursor-pointer ${
              activeSection === 'checklist' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Checklist Estudiantil
          </button>
        </div>
      </div>

      {/* SECCIÓN 1: MAQUINARIA Y HERRAMIENTAS */}
      {activeSection === 'equipos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MAQUINARIA_Y_HERRAMIENTAS.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm text-xs">
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                    {item.categoria}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">{item.nombre}</h3>
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                  {item.cantidadPara05Ha}
                </span>
              </div>

              <div className="space-y-1.5">
                <div>
                  <span className="font-semibold text-slate-500">Labor Principal:</span>
                  <p className="text-slate-800 font-medium">{item.laborPrincipal}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-500">Especificación Técnica:</span>
                  <p className="text-slate-600">{item.especificacionTecnica}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-700 space-y-0.5">
                <span className="font-bold text-emerald-950 block flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Protocolo de Mantenimiento / Calibración:
                </span>
                <p className="text-[11px] leading-relaxed">{item.protocoloMantenimientoCalibracion}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECCIÓN 2: MATRIZ DE EPP */}
      {activeSection === 'epp' && (
        <div className="space-y-6">
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-xs text-rose-950 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Norma de Seguridad y Salud en el Trabajo Agropecuario (SST / BPA):</strong>
              Queda estrictamente prohibido que estudiantes u operarios manipulen agroquímicos o ejecuten labores mecanizadas
              sin el Equipo de Protección Personal completo correspondiente al nivel de riesgo de la actividad.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MATRIZ_EPP.map((epp, idx) => {
              const esQuimico = epp.laborDestino.includes('Químico');
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border p-5 space-y-3 shadow-sm text-xs ${
                    esQuimico ? 'border-purple-200 bg-purple-50/20' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                    <div>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          esQuimico ? 'bg-purple-100 text-purple-900' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {epp.laborDestino}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">{epp.nombre}</h3>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        epp.obligatoriedad === 'Estricta Obligatoria'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {epp.obligatoriedad}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-semibold text-slate-500">Material y Descripción Técnica:</span>
                    <p className="text-slate-800 leading-relaxed">{epp.descripcionYMaterial}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Norma de Certificación:</span>
                      <span className="font-mono font-bold text-slate-700">{epp.normaReferencia}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Riesgo que Mitiga:</span>
                      <span className="font-medium text-slate-700">{epp.riesgoMitigado}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECCIÓN 3: CALIBRACIÓN AGRONÓMICA */}
      {activeSection === 'calibracion' && (
        <div className="space-y-6">
          {/* Calibración de Bomba de Espalda */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b pb-3">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                <Beaker className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Protocolo Pedagógico: Calibración de Bomba de Espalda (20 Litros)
                </h3>
                <p className="text-xs text-slate-500">
                  Método del volumen gastado en 100 m² para determinar el gasto exacto en 0.5 Hectárea (5.000 m²)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-900 text-sm block">Paso 1: Delimitación</span>
                <p className="text-slate-600">
                  Medir con cinta métrica un área representativa de 100 m² (ej. 1 surco de 100 m de largo a 1.0 m de ancho, o 2 surcos de 50 m a 0.80 m).
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-900 text-sm block">Paso 2: Carga Inicial</span>
                <p className="text-slate-600">
                  Llenar la bomba con exactamente 10 Litros de agua limpia (sin agroquímico). Ajustar correas a la espalda del estudiante y presurizar a ritmo constante (30-35 bombazos/minuto).
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-900 text-sm block">Paso 3: Pulverización</span>
                <p className="text-slate-600">
                  Caminar a paso normal y constante (1 metro por segundo = 3.6 km/h) aplicando con la boquilla seleccionada a 40-50 cm del objetivo sin balancear la lanza.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-900 text-sm block">Paso 4: Cálculo Matemático</span>
                <p className="text-slate-600">
                  Medir el agua sobrante con probeta. Restar de los 10 L. Si se gastaron <strong>2.0 Litros en 100 m²</strong>:
                  <br />
                  <span className="font-mono font-bold text-emerald-900">2.0 L × 50 = 100 Litros para 0.5 Ha</span>
                </p>
              </div>
            </div>

            <div className="bg-emerald-900 text-emerald-100 p-4 rounded-xl text-xs space-y-1">
              <span className="font-bold text-white block">Regla de Oro en la Institución Educativa:</span>
              <p>
                Si se gastan 100 Litros para la media hectárea, se requerirán exactamente <strong>5 recargas completas de bomba de 20 Litros</strong>.
                Por lo tanto, la dosis total recomendada del producto (ej. 60 ml de Coragen) se divide en 5 partes: <strong>12 ml por cada bomba</strong>.
              </p>
            </div>
          </div>

          {/* Calibración de Matraca Sembradora */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b pb-3">
              <div className="p-2 bg-amber-100 text-amber-900 rounded-lg">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Protocolo de Calibración de la Matraca Sembradora - Abonadora Manual
                </h3>
                <p className="text-xs text-slate-500">
                  Garantizar el depósito de 1 a 2 semillas y 12 a 15 gramos de abono de arranque por golpe sin partir el grano
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-700 space-y-2">
              <p>
                1. <strong>Regulación de Placa Dosificadora:</strong> Abrir la recámara de semilla y colocar el disco ranurado correspondiente al calibre de la semilla (tamaño mediano plano o redondo).
              </p>
              <p>
                2. <strong>Prueba en Blanco:</strong> Accionar la matraca 25 veces consecutivas sobre una lona plástica limpia. Contar las semillas caídas en cada golpe. Debe arrojar exactamente 1 a 2 semillas en al menos 23 de los 25 intentos (precisión {'>'} 90%).
              </p>
              <p>
                3. <strong>Regulación del Dosificador de Fertilizante:</strong> Graduar la corredera del depósito de abono para entregar 12 gramos de DAP por golpe. Pesar en balanza gramera digital el producto de 10 descargas (debe registrar entre 110 y 130 gramos en total).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 4: CHECKLIST ESTUDIANTIL PRE-SALIDA A CAMPO */}
      {activeSection === 'checklist' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Lista de Verificación (Checklist) Previo a la Salida a Parcela
              </h3>
              <p className="text-xs text-slate-500">
                Verificación obligatoria de seguridad que debe firmar el estudiante monitor y el docente antes de entrar al cultivo
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 font-semibold">Cumplimiento:</span>
              <div className="w-32 bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-900">{progressPercent}%</span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { id: 'item1', label: 'Todos los estudiantes portan calzado cerrado con suela antideslizante (botas de caucho o cuero de seguridad).' },
              { id: 'item2', label: 'Uso de sombrero de ala ancha tipo pava con cubre-nuca y camisa de manga larga para protección solar UV.' },
              { id: 'item3', label: 'Disponibilidad de botiquín de primeros auxilios y punto de hidratación con agua potable en el lote.' },
              { id: 'item4', label: 'Las herramientas menores (azadones, machetes) cuentan con mangos firmes sin astillas ni fisuras.' },
              { id: 'item5', label: 'Si hay aplicación fitosanitaria: el equipo de aplicación cuenta con traje impermeable, respirador con carbón activado, gafas y guantes de nitrilo.' },
              { id: 'item6', label: 'Se verificó la calibración y ausencia de fugas o goteos en las bombas de espalda y mangueras.' },
              { id: 'item7', label: 'Se revisó el pronóstico del tiempo (no aplicar plaguicidas con vientos > 10 km/h o lluvia inminente).' },
              { id: 'item8', label: 'Se explicó claramente el objetivo pedagógico de la jornada y se asignaron roles a cada cuadrilla de estudiantes.' }
            ].map((check) => {
              const isChecked = checklist[check.id];
              return (
                <div
                  key={check.id}
                  onClick={() => toggleCheck(check.id)}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-700 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <span className="text-xs leading-relaxed">{check.label}</span>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex items-center justify-between flex-wrap gap-2">
            <span className="text-slate-600">
              Estado de la auditoría: {completedCount === totalCheckItems ? (
                <span className="text-emerald-700 font-bold">¡Lote Aprobado para Entrada a Práctica!</span>
              ) : (
                <span className="text-amber-700 font-bold">Pendiente completar {totalCheckItems - completedCount} requisitos de seguridad</span>
              )}
            </span>

            <button
              onClick={() => {
                const allDone: { [key: string]: boolean } = {};
                Object.keys(checklist).forEach((k) => (allDone[k] = true));
                setChecklist(allDone);
              }}
              className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
            >
              Marcar todos como verificados
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
