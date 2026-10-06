import React from 'react';
import {
  Printer,
  Compass,
  CheckCircle2,
  FileCheck,
  Scale,
  FileDown,
  BookOpen
} from 'lucide-react';
import {
  generateCompleteFieldBookPdf
} from '../utils/pdfGenerator';
import {
  INITIAL_FICHA_LOTE,
  INITIAL_LABORES_DIARIAS,
  INITIAL_APLICACIONES_QUIMICAS,
  INITIAL_MONITOREO_PLAGAS,
  INITIAL_RIEGO_FENOLOGIA,
  INITIAL_COSECHA_RENDIMIENTO
} from '../data/agronomyData';

interface OfficialTechnicalReportProps {
  onPrint: () => void;
}

export const OfficialTechnicalReport: React.FC<OfficialTechnicalReportProps> = ({ onPrint }) => {
  const handleDownloadFullPdf = (isBlank: boolean) => {
    // Leer de localStorage si está disponible, o usar data inicial
    const ficha = localStorage.getItem('ieta_ficha_lote') ? JSON.parse(localStorage.getItem('ieta_ficha_lote')!) : INITIAL_FICHA_LOTE;
    const labores = localStorage.getItem('ieta_labores') ? JSON.parse(localStorage.getItem('ieta_labores')!) : INITIAL_LABORES_DIARIAS;
    const aplicaciones = localStorage.getItem('ieta_aplicaciones') ? JSON.parse(localStorage.getItem('ieta_aplicaciones')!) : INITIAL_APLICACIONES_QUIMICAS;
    const monitoreos = localStorage.getItem('ieta_monitoreos') ? JSON.parse(localStorage.getItem('ieta_monitoreos')!) : INITIAL_MONITOREO_PLAGAS;
    const riegos = localStorage.getItem('ieta_riegos') ? JSON.parse(localStorage.getItem('ieta_riegos')!) : INITIAL_RIEGO_FENOLOGIA;
    const cosechas = localStorage.getItem('ieta_cosechas') ? JSON.parse(localStorage.getItem('ieta_cosechas')!) : INITIAL_COSECHA_RENDIMIENTO;

    generateCompleteFieldBookPdf(ficha, labores, aplicaciones, monitoreos, riegos, cosechas, isBlank);
  };

  return (
    <div className="space-y-6">
      {/* Botón de Impresión Flotante Superior */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-base font-bold text-slate-900">Documento Técnico Oficial Imprimible</h2>
          <p className="text-xs text-slate-500">
            Informe técnico formateado con rigor metodológico listo para emitir a la coordinación académica o archivar en el expediente de la granja escolar
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleDownloadFullPdf(false)}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-2 rounded-xl font-bold text-xs shadow transition-colors cursor-pointer"
            title="Descargar Cuaderno de Campo completo con todos los 6 formatos diligenciados en PDF"
          >
            <BookOpen className="w-4 h-4" />
            <span>Descargar Cuaderno PDF</span>
          </button>
          <button
            onClick={() => handleDownloadFullPdf(true)}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-3 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer"
            title="Descargar Cuaderno completo con casillas en blanco para imprimir y escribir a mano"
          >
            <FileDown className="w-4 h-4 text-slate-600" />
            <span>Cuaderno en Blanco PDF</span>
          </button>
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Vista Actual</span>
          </button>
        </div>
      </div>

      {/* DOCUMENTO TÉCNICO FORMAL (Apto para Impresión Limpia) */}
      <div className="bg-white rounded-2xl border border-slate-300 p-8 sm:p-12 shadow-md text-slate-800 space-y-8 font-serif print:border-none print:shadow-none print:p-0">
        {/* Encabezado Institucional */}
        <div className="border-b-2 border-slate-900 pb-6 text-center space-y-2">
          <div className="inline-flex items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Compass className="w-3.5 h-3.5" />
            <span>Institución Educativa Técnico Agrícola • Granja Experimental</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
            Plan Maestro de Manejo Agronómico del Cultivo de Maíz (Zea mays L.)
          </h1>
          <h2 className="text-base font-semibold text-slate-700">
            Arreglo Productivo y Pedagógico para Media Hectárea (5.000 m²)
          </h2>
          <div className="font-sans text-xs text-slate-500 flex justify-center gap-4 pt-1">
            <span><strong>Ubicación:</strong> Lote N° 3 Granja Agropecuaria</span>
            <span>•</span>
            <span><strong>Ciclo Productivo:</strong> Semestre Académico</span>
            <span>•</span>
            <span><strong>Régimen:</strong> Buenas Prácticas Agrícolas (BPA)</span>
          </div>
        </div>

        {/* 1. Resumen Ejecutivo de Parámetros */}
        <section className="space-y-3 font-sans">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-950 border-b border-emerald-800 pb-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-700 rounded-full" />
            1. Ficha Resumen de Parámetros Clave de Siembra (0.5 Ha)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Área Superficial:</span>
              <strong className="text-slate-900 text-sm">5.000 m² (0.5 Ha)</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Variedad Base:</span>
              <strong className="text-slate-900 text-sm">ICA V-305 / Híbrido</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Arreglo Espacial:</span>
              <strong className="text-slate-900 text-sm">0.80 m × 0.25 m</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Densidad Final:</span>
              <strong className="text-slate-900 text-sm">25.000 pl / 0.5 Ha</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Semillas por Sitio:</span>
              <strong className="text-slate-900 text-sm">2 sem. (Raleo a 1)</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Masa de Semilla:</span>
              <strong className="text-slate-900 text-sm">9.5 a 10.0 kg</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Sistema de Riego:</span>
              <strong className="text-slate-900 text-sm">Goteo (6.250 m cinta)</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Enmienda Cal Dolomita:</span>
              <strong className="text-slate-900 text-sm">800 a 1.000 kg (16 bultos)</strong>
            </div>
          </div>
        </section>

        {/* 2. Variedad y Justificación */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-800">
          <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-emerald-950 border-b border-emerald-800 pb-1">
            2. Selección de la Variedad a Sembrar y Pertinencia Pedagógica
          </h3>
          <p>
            Para los fines formativos y productivos de la <strong>Institución Educativa Técnico Agrícola</strong>, se establece como material principal
            la variedad mejorada de polinización abierta <strong>ICA V-305</strong> (para pisos térmicos de 0 a 1.200 msnm) o en su defecto un híbrido de alta expresión
            como <strong>DK-7088 / Pioneer P30F35</strong>.
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-slate-700">
            <li><strong>Rusticidad y plasticidad ambiental:</strong> Excelente desarrollo radicular que tolera fluctuaciones moderadas de humedad edáfica.</li>
            <li><strong>Vigor inicial y porte de planta:</strong> Tallo robusto de altura media (2.10 - 2.30 m) con inserción de mazorca a 1.10 m, facilitando la cosecha manual por los estudiantes sin riesgo de acame.</li>
            <li><strong>Sanidad foliar:</strong> Resistencia natural al complejo mancha de asfalto (*Phyllachora maydis*) y buena cobertura de tusa contra pudrición de mazorca por *Fusarium*.</li>
            <li><strong>Valor didáctico:</strong> Permite enseñar a los alumnos técnicas de selección masal estratificada para autoproducción y conservación de semilla.</li>
          </ul>
        </section>

        {/* 3. Marco de Siembra y Cálculo de Semilla */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-800">
          <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-emerald-950 border-b border-emerald-800 pb-1">
            3. Marco de Siembra, Densidad Poblacional y Cálculo Matemático de Insumo
          </h3>
          <p>
            El arreglo espacial se determina a <strong>0.80 metros entre surcos</strong> y <strong>0.25 metros entre golpes (sitios)</strong>:
          </p>
          <div className="bg-slate-100 p-4 rounded-xl font-mono text-xs text-slate-900 space-y-1">
            <div>• Área por sitio = 0.80 m × 0.25 m = 0.20 m²</div>
            <div>• Número de sitios en 0.5 Ha = 5.000 m² ÷ 0.20 m² = <strong>25.000 sitios de siembra</strong></div>
            <div>• Densidad de población final = <strong>25.000 plantas/media ha (50.000 plantas/ha equivalente)</strong></div>
          </div>
          <p>
            <strong>Protocolo de Siembra y Raleo:</strong> Se depositan <strong>2 semillas por sitio</strong> a una profundidad de 3 a 4 cm empleando matracas manuales tecnificadas.
            A los <strong>12 a 15 días después de la emergencia (fase V2-V3)</strong>, se ejecuta de manera obligatoria el raleo o desahije manual,
            eliminando la plántula más débil y dejando exactamente <strong>1 sola plántula vigorosa por sitio</strong>.
          </p>
          <p>
            <strong>Cálculo de Semilla:</strong> Considerando un Peso de Mil Semillas (PMS) de 310 gramos, un poder germinativo mínimo del 92% y un margen del 12% para resiembra y descarte,
            se requieren <strong>30.000 semillas certificadas</strong>, lo que representa una compra neta de <strong>9.5 a 10.0 kilogramos de semilla</strong>.
          </p>
        </section>

        {/* 4. Enmiendas de Suelo Previas a la Siembra */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-800">
          <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-emerald-950 border-b border-emerald-800 pb-1">
            4. Enmiendas de Suelo a Aplicar Antes de la Siembra
          </h3>
          <p>
            De acuerdo con los análisis de suelos típicos de la región (pH promedio entre 5.2 y 5.6 con presencia de aluminio intercambiable),
            se formulan las siguientes aplicaciones con anterioridad al establecimiento del cultivo:
          </p>
          <div className="font-sans overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-300">
              <thead className="bg-slate-100 font-bold uppercase text-[11px] border-b">
                <tr>
                  <th className="p-2.5 border-r">Enmienda</th>
                  <th className="p-2.5 border-r">Dosis (0.5 Ha)</th>
                  <th className="p-2.5 border-r">Momento de Aplicación</th>
                  <th className="p-2.5">Objetivo Agronómico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2.5 font-bold border-r">Cal Dolomita Agrícola (CaCO₃ + MgCO₃)</td>
                  <td className="p-2.5 font-mono font-bold border-r">800 a 1.000 kg (16 a 20 bultos de 50 kg)</td>
                  <td className="p-2.5 border-r">35 a 45 días antes de siembra</td>
                  <td className="p-2.5">Neutralizar acidez activa (Al³⁺), elevar pH a 6.0 y aportar Calcio y Magnesio.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold border-r">Materia Orgánica Compostada (Compost / Humus)</td>
                  <td className="p-2.5 font-mono font-bold border-r">2.000 kg (40 bultos de 50 kg)</td>
                  <td className="p-2.5 border-r">15 a 20 días antes de siembra</td>
                  <td className="p-2.5">Incrementar capacidad de retención de agua, CIC y reactivar microbiología benéfica.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Sistema de Riego */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-800">
          <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-emerald-950 border-b border-emerald-800 pb-1">
            5. Sistema de Riego Tecnificado y Calendario de Reposición Hídrica
          </h3>
          <p>
            Se implementa un <strong>sistema de riego por goteo superficial presurizado</strong> con eficiencia de aplicación del 92-95%:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-slate-700">
            <li><strong>Tendido de cintas:</strong> 62 surcos de 100 m de longitud a 0.80 m de separación = <strong>6.250 metros lineales de cinta calibre 8 mil</strong>.</li>
            <li><strong>Emisores:</strong> Goteros integrados cada 0.20 - 0.25 m con caudal unitario de 1.2 a 1.4 L/h operando a presión de cabezal de 12 PSI (0.8 bar).</li>
            <li><strong>Cabezal de filtrado:</strong> Filtro de anillas de 120 mallas (130 micras) de 2 pulgadas más inyector tipo Venturi para fertirriego pedagógico.</li>
            <li><strong>Etapa crítica de riego:</strong> Floración y emisión de estigmas (VT-R1, días 55 a 70 DDS con Kc = 1.20). El estrés hídrico en esta fase reduce hasta un 40% el cuaje de granos.</li>
          </ul>
        </section>

        {/* 6. Plan de Fertilización */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-800">
          <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-emerald-950 border-b border-emerald-800 pb-1">
            6. Plan de Fertilización Fraccionada para 0.5 Hectárea
          </h3>
          <p>
            Ajustado a la curva de absorción de nutrientes para una meta productiva de 3.5 a 4.5 toneladas de grano seco en la media hectárea:
          </p>
          <div className="font-sans overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-300">
              <thead className="bg-slate-100 font-bold uppercase text-[11px] border-b">
                <tr>
                  <th className="p-2 border-r">Fase / Días</th>
                  <th className="p-2 border-r">Fertilizantes Comerciales (0.5 Ha)</th>
                  <th className="p-2 border-r">Aporte Puro (N-P-K-Mg)</th>
                  <th className="p-2">Forma de Aplicación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2 font-bold border-r">Siembra (0 DDS)</td>
                  <td className="p-2 font-mono border-r">
                    DAP: 75 kg (1.5 bultos)<br />
                    KCl: 30 kg (0.6 bultos)<br />
                    K-Mag: 25 kg (0.5 bultos)<br />
                    ZnSO₄: 5 kg
                  </td>
                  <td className="p-2 border-r">13.5 kg N | 34.5 kg P₂O₅ | 23.5 kg K₂O | 4.5 kg MgO</td>
                  <td className="p-2">En banda lateral a 6 cm al lado y 5 cm debajo de la semilla.</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold border-r">V4 - V6 (25-30 DDS)</td>
                  <td className="p-2 font-mono border-r">
                    Urea (46%): 65 kg (1.3 bultos)<br />
                    KCl (60%): 30 kg (0.6 bultos)
                  </td>
                  <td className="p-2 border-r">30.0 kg N | 18.0 kg K₂O</td>
                  <td className="p-2">Edáfico en banda antes del aporque; tapado con suelo húmedo.</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold border-r">V8 - V10 (42-48 DDS)</td>
                  <td className="p-2 font-mono border-r">
                    Urea (46%): 60 kg (1.2 bultos)<br />
                    Foliar Boro+Zinc: 1.0 Litro
                  </td>
                  <td className="p-2 border-r">27.6 kg N | Microelementos foliares</td>
                  <td className="p-2">Edáfico incorporado con riego. Foliar temprano en la mañana.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Manejo Fitosanitario y Arvenses */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-800">
          <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-emerald-950 border-b border-emerald-800 pb-1">
            7. Manejo Integrado Fitosanitario (MIP) y de Arvenses (MIA)
          </h3>
          <div className="font-sans overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-300">
              <thead className="bg-slate-100 font-bold uppercase text-[11px] border-b">
                <tr>
                  <th className="p-2 border-r">Blanco Fitosanitario</th>
                  <th className="p-2 border-r">Umbral Económico (UDE)</th>
                  <th className="p-2 border-r">Tratamiento Químico / Biológico</th>
                  <th className="p-2 border-r">Dosis para 0.5 Ha</th>
                  <th className="p-2">P.C. / P.R.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2 font-bold border-r">Gusano Cogollero (*Spodoptera frugiperda*)</td>
                  <td className="p-2 border-r">15% plantas con daño fresco en cogollo</td>
                  <td className="p-2 border-r">Clorantraniliprole 20 SC o *Bacillus thuringiensis*</td>
                  <td className="p-2 font-mono font-bold border-r">55 ml (o 250 g Bt) en 100 L agua</td>
                  <td className="p-2">14 d / 12 h</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold border-r">Chicharrita (*Dalbulus maidis*)</td>
                  <td className="p-2 border-r">1 adulto/planta en V1-V6</td>
                  <td className="p-2 border-r">Curado semilla con Tiametoxam + Acetamiprid foliar</td>
                  <td className="p-2 font-mono font-bold border-r">75 g en 100 L agua</td>
                  <td className="p-2">14 d / 24 h</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold border-r">Mancha de Asfalto (*Phyllachora maydis*)</td>
                  <td className="p-2 border-r">Primeras pústulas en hoja de mazorca</td>
                  <td className="p-2 border-r">Azoxystrobin + Difenoconazole (Amistar Top)</td>
                  <td className="p-2 font-mono font-bold border-r">150 a 180 ml en 120 L agua</td>
                  <td className="p-2">21 d / 24 h</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold border-r">Arvenses Pre-emergentes (Gramíneas + Hoja ancha)</td>
                  <td className="p-2 border-r">Preventivo (0-2 DDS) con suelo húmedo</td>
                  <td className="p-2 border-r">Atrazina 500 SC + S-Metolacloro 960 EC</td>
                  <td className="p-2 font-mono font-bold border-r">1.25 L Atrazina + 0.7 L Metolacloro</td>
                  <td className="p-2">60 d / 24 h</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. Maquinaria y Seguridad Ocupacional */}
        <section className="space-y-3 text-sm leading-relaxed text-slate-800">
          <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-emerald-950 border-b border-emerald-800 pb-1">
            8. Equipamiento Técnico y Normas de Protección Personal (EPP)
          </h3>
          <p>
            <strong>Equipamiento mínimo obligatorio:</strong> 1 tractor de 75 HP con arado de cincel y rastra (o motocultor con rotocultivador),
            6 matracas sembradoras manuales graduadas, 2 bombas de espalda manuales de 20 L calibradas, kit de boquillas (abanico plano TeeJet 11003 y cono sólido),
            10 azadones número 2, balanza gramera digital y cinta métrica de 50 m.
          </p>
          <p>
            <strong>Protocolo de Bioseguridad y EPP:</strong> Durante la manipulación y aplicación de productos fitosanitarios es estricta obligación el uso de:
            overol hidrorrepelente Tyvek, respirador de silicona de media cara con filtros mixtos de carbón activado (vapores orgánicos/neblinas),
            monogafas herméticas de policarbonato con ventilación indirecta, guantes de nitrilo de 30 cm de caña sin forro y botas de caucho de PVC sin forro interior.
          </p>
        </section>

        {/* 9. Bloque de Firmas Formales */}
        <div className="pt-12 border-t-2 border-slate-900 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center font-sans text-xs">
          <div className="space-y-2">
            <div className="border-b border-slate-400 w-48 mx-auto pb-8" />
            <span className="font-bold text-slate-900 block">Ing. Agrónomo Consultor</span>
            <span className="text-slate-500 block">Instructor Titular de Cultivos</span>
            <span className="text-[10px] text-slate-400 font-mono">T.P. 148920-AGRO</span>
          </div>

          <div className="space-y-2">
            <div className="border-b border-slate-400 w-48 mx-auto pb-8" />
            <span className="font-bold text-slate-900 block">Coordinador de Prácticas Agropecuarias</span>
            <span className="text-slate-500 block">I.E. Técnico Agrícola</span>
            <span className="text-[10px] text-slate-400 font-mono">Comité Técnico Institucional</span>
          </div>

          <div className="space-y-2">
            <div className="border-b border-slate-400 w-48 mx-auto pb-8" />
            <span className="font-bold text-slate-900 block">Estudiante Líder de Parcela</span>
            <span className="text-slate-500 block">Grado 11 Técnico Agropecuario</span>
            <span className="text-[10px] text-slate-400 font-mono">Representante Estudiantil BPA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
