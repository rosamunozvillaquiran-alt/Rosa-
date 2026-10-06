import React, { useState, useEffect, useRef } from 'react';
import {
  INITIAL_FICHA_LOTE,
  INITIAL_LABORES_DIARIAS,
  INITIAL_APLICACIONES_QUIMICAS,
  INITIAL_MONITOREO_PLAGAS,
  INITIAL_RIEGO_FENOLOGIA,
  INITIAL_COSECHA_RENDIMIENTO
} from '../data/agronomyData';
import {
  FichaLoteRecord,
  LaborDiariaRecord,
  AplicacionQuimicaRecord,
  MonitoreoPlagaRecord,
  RiegoFenologiaRecord,
  CosechaRendimientoRecord
} from '../types/agronomy';
import {
  generateFormat1Pdf,
  generateFormat2Pdf,
  generateFormat3Pdf,
  generateFormat4Pdf,
  generateFormat5Pdf,
  generateFormat6Pdf,
  generateCompleteFieldBookPdf
} from '../utils/pdfGenerator';
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  Download,
  Upload,
  Printer,
  CheckCircle,
  FileText,
  Calendar,
  Users,
  FlaskConical,
  Bug,
  Droplets,
  Package,
  RotateCcw,
  Sparkles,
  Edit3,
  FileDown,
  BookOpen,
  Save,
  Check
} from 'lucide-react';

export const BpaRecordForms: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saveAlert, setSaveAlert] = useState<string | null>(null);

  // Estados locales respaldados en LocalStorage
  const [fichaLote, setFichaLote] = useState<FichaLoteRecord>(() => {
    const saved = localStorage.getItem('ieta_ficha_lote');
    return saved ? JSON.parse(saved) : INITIAL_FICHA_LOTE;
  });

  const [labores, setLabores] = useState<LaborDiariaRecord[]>(() => {
    const saved = localStorage.getItem('ieta_labores');
    return saved ? JSON.parse(saved) : INITIAL_LABORES_DIARIAS;
  });

  const [aplicaciones, setAplicaciones] = useState<AplicacionQuimicaRecord[]>(() => {
    const saved = localStorage.getItem('ieta_aplicaciones');
    return saved ? JSON.parse(saved) : INITIAL_APLICACIONES_QUIMICAS;
  });

  const [monitoreos, setMonitoreos] = useState<MonitoreoPlagaRecord[]>(() => {
    const saved = localStorage.getItem('ieta_monitoreos');
    return saved ? JSON.parse(saved) : INITIAL_MONITOREO_PLAGAS;
  });

  const [riegos, setRiegos] = useState<RiegoFenologiaRecord[]>(() => {
    const saved = localStorage.getItem('ieta_riegos');
    return saved ? JSON.parse(saved) : INITIAL_RIEGO_FENOLOGIA;
  });

  const [cosechas, setCosechas] = useState<CosechaRendimientoRecord[]>(() => {
    const saved = localStorage.getItem('ieta_cosechas');
    return saved ? JSON.parse(saved) : INITIAL_COSECHA_RENDIMIENTO;
  });

  // Guardar en LocalStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('ieta_ficha_lote', JSON.stringify(fichaLote));
  }, [fichaLote]);

  useEffect(() => {
    localStorage.setItem('ieta_labores', JSON.stringify(labores));
  }, [labores]);

  useEffect(() => {
    localStorage.setItem('ieta_aplicaciones', JSON.stringify(aplicaciones));
  }, [aplicaciones]);

  useEffect(() => {
    localStorage.setItem('ieta_monitoreos', JSON.stringify(monitoreos));
  }, [monitoreos]);

  useEffect(() => {
    localStorage.setItem('ieta_riegos', JSON.stringify(riegos));
  }, [riegos]);

  useEffect(() => {
    localStorage.setItem('ieta_cosechas', JSON.stringify(cosechas));
  }, [cosechas]);

  // Mensaje temporal de guardado
  const notifySave = (msg: string) => {
    setSaveAlert(msg);
    setTimeout(() => setSaveAlert(null), 3000);
  };

  // Modal para agregar nuevo registro
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Estados temporales para los formularios de nuevo registro
  const [newLabor, setNewLabor] = useState<Partial<LaborDiariaRecord>>({
    fecha: new Date().toISOString().split('T')[0],
    actividad: '',
    faseFenologica: 'V4 - V6',
    numeroEstudiantes: 15,
    horasJornal: 4,
    herramientasUtilizadas: 'Azadones N° 2, palas, bomba 20 L',
    observacionesNovedades: 'Práctica realizada en normalidad con EPP completo.',
    docenteSupervisor: 'Ing. Agrónomo Titular'
  });

  const [newAplicacion, setNewAplicacion] = useState<Partial<AplicacionQuimicaRecord>>({
    fecha: new Date().toISOString().split('T')[0],
    faseFenologica: 'V4',
    blancoBiologico: 'Gusano Cogollero (Spodoptera frugiperda)',
    nombreComercial: 'Coragen 20 SC',
    ingredienteActivo: 'Clorantraniliprole 200 g/L',
    dosisAplicada: '55 ml en 100 L agua',
    volumenCaldoLitros: 100,
    equipoBoquilla: 'Bomba de espalda 20 L / Cono sólido al cogollo',
    periodoCarenciaDias: 14,
    responsableAplicacion: 'Operario Técnico + Monitor Estudiantil',
    verificacionEpp: true
  });

  const [newMonitoreo, setNewMonitoreo] = useState<Partial<MonitoreoPlagaRecord>>({
    fecha: new Date().toISOString().split('T')[0],
    sitiosEvaluados: 100,
    porcentajeDanoSpodoptera: 5.0,
    promedioNinfasDalbulus: 0.1,
    incidenciaManchaAsfalto: '0% (Ausente)',
    decisionTomada: 'Dentro del umbral económico. Mantener monitoreo semanal.',
    evaluadorEstudiante: 'Mariana Duarte (Grado 11)'
  });

  const [newRiego, setNewRiego] = useState<Partial<RiegoFenologiaRecord>>({
    fecha: new Date().toISOString().split('T')[0],
    etapaFenologica: 'VT (Espigamiento)',
    alturaPromedioCm: 185,
    tiempoRiegoMin: 120,
    volumenEstimadoLitros: 24000,
    humedadSueloApreciacion: 'Capacidad de Campo',
    observaciones: 'Riego regular de soporte floral. Presión 12 PSI.'
  });

  const [newCosecha, setNewCosecha] = useState<Partial<CosechaRendimientoRecord>>({
    fechaCosecha: new Date().toISOString().split('T')[0],
    tipoProducto: 'Grano Seco Comercial',
    pesoBrutoKg: 3200,
    porcentajeHumedadGrano: 14.0,
    rendimientoCalculadoTonHa: 6.4,
    calidadComercial: 'Primera (Selecta)',
    destinoProduccion: 'Venta Comunitaria y Restaurante Escolar',
    responsablePesaje: 'Comité Estudiantil de Cosecha & Ing. Titular'
  });

  // Funciones de inserción
  const handleAddLabor = () => {
    if (!newLabor.actividad) return;
    const entry: LaborDiariaRecord = {
      id: `LAB-${String(labores.length + 1).padStart(2, '0')}`,
      fecha: newLabor.fecha || '',
      actividad: newLabor.actividad,
      faseFenologica: newLabor.faseFenologica || 'Vegetativo',
      numeroEstudiantes: Number(newLabor.numeroEstudiantes) || 0,
      horasJornal: Number(newLabor.horasJornal) || 0,
      herramientasUtilizadas: newLabor.herramientasUtilizadas || '',
      observacionesNovedades: newLabor.observacionesNovedades || '',
      docenteSupervisor: newLabor.docenteSupervisor || ''
    };
    setLabores([entry, ...labores]);
    setShowAddModal(false);
    notifySave('Labor agregada al libro de campo exitosamente.');
  };

  const handleAddAplicacion = () => {
    if (!newAplicacion.nombreComercial) return;
    const entry: AplicacionQuimicaRecord = {
      id: `APL-${String(aplicaciones.length + 1).padStart(2, '0')}`,
      fecha: newAplicacion.fecha || '',
      faseFenologica: newAplicacion.faseFenologica || '',
      blancoBiologico: newAplicacion.blancoBiologico || '',
      nombreComercial: newAplicacion.nombreComercial,
      ingredienteActivo: newAplicacion.ingredienteActivo || '',
      dosisAplicada: newAplicacion.dosisAplicada || '',
      volumenCaldoLitros: Number(newAplicacion.volumenCaldoLitros) || 0,
      equipoBoquilla: newAplicacion.equipoBoquilla || '',
      periodoCarenciaDias: Number(newAplicacion.periodoCarenciaDias) || 0,
      responsableAplicacion: newAplicacion.responsableAplicacion || '',
      verificacionEpp: Boolean(newAplicacion.verificacionEpp)
    };
    setAplicaciones([entry, ...aplicaciones]);
    setShowAddModal(false);
    notifySave('Aplicación fitosanitaria registrada en el Kardex BPA.');
  };

  const handleAddMonitoreo = () => {
    const entry: MonitoreoPlagaRecord = {
      id: `MON-${String(monitoreos.length + 1).padStart(2, '0')}`,
      fecha: newMonitoreo.fecha || '',
      sitiosEvaluados: Number(newMonitoreo.sitiosEvaluados) || 100,
      porcentajeDanoSpodoptera: Number(newMonitoreo.porcentajeDanoSpodoptera) || 0,
      promedioNinfasDalbulus: Number(newMonitoreo.promedioNinfasDalbulus) || 0,
      incidenciaManchaAsfalto: newMonitoreo.incidenciaManchaAsfalto || '0%',
      decisionTomada: newMonitoreo.decisionTomada || '',
      evaluadorEstudiante: newMonitoreo.evaluadorEstudiante || ''
    };
    setMonitoreos([entry, ...monitoreos]);
    setShowAddModal(false);
    notifySave('Monitoreo registrado en la planilla.');
  };

  const handleAddRiego = () => {
    const entry: RiegoFenologiaRecord = {
      id: `RIE-${String(riegos.length + 1).padStart(2, '0')}`,
      fecha: newRiego.fecha || '',
      etapaFenologica: newRiego.etapaFenologica || '',
      alturaPromedioCm: Number(newRiego.alturaPromedioCm) || 0,
      tiempoRiegoMin: Number(newRiego.tiempoRiegoMin) || 0,
      volumenEstimadoLitros: Number(newRiego.volumenEstimadoLitros) || 0,
      humedadSueloApreciacion: (newRiego.humedadSueloApreciacion as any) || 'Capacidad de Campo',
      observaciones: newRiego.observaciones || ''
    };
    setRiegos([entry, ...riegos]);
    setShowAddModal(false);
    notifySave('Riego registrado en la bitácora.');
  };

  const handleAddCosecha = () => {
    const peso = Number(newCosecha.pesoBrutoKg) || 0;
    const rendCalculado = Number(((peso * 2) / 1000).toFixed(2));
    const entry: CosechaRendimientoRecord = {
      id: `COS-${String(cosechas.length + 1).padStart(2, '0')}`,
      fechaCosecha: newCosecha.fechaCosecha || '',
      tipoProducto: (newCosecha.tipoProducto as any) || 'Grano Seco Comercial',
      pesoBrutoKg: peso,
      porcentajeHumedadGrano: Number(newCosecha.porcentajeHumedadGrano) || 14.0,
      rendimientoCalculadoTonHa: rendCalculado,
      calidadComercial: (newCosecha.calidadComercial as any) || 'Primera (Selecta)',
      destinoProduccion: (newCosecha.destinoProduccion as any) || 'Venta Comunitaria',
      responsablePesaje: newCosecha.responsablePesaje || ''
    };
    setCosechas([entry, ...cosechas]);
    setShowAddModal(false);
    notifySave('Acta de cosecha registrada.');
  };

  // Restablecer registros pedagógicos iniciales
  const handleResetRecords = () => {
    if (window.confirm('¿Desea restablecer todos los registros con los datos técnicos recomendados del cultivo?')) {
      setFichaLote(INITIAL_FICHA_LOTE);
      setLabores(INITIAL_LABORES_DIARIAS);
      setAplicaciones(INITIAL_APLICACIONES_QUIMICAS);
      setMonitoreos(INITIAL_MONITOREO_PLAGAS);
      setRiegos(INITIAL_RIEGO_FENOLOGIA);
      setCosechas(INITIAL_COSECHA_RENDIMIENTO);
      notifySave('Datos técnicos restablecidos a los valores oficiales.');
    }
  };

  // CARGAR DATOS DESDE ARCHIVO JSON
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed.fichaLote) setFichaLote(parsed.fichaLote);
        if (parsed.labores) setLabores(parsed.labores);
        if (parsed.aplicaciones) setAplicaciones(parsed.aplicaciones);
        if (parsed.monitoreos) setMonitoreos(parsed.monitoreos);
        if (parsed.riegos) setRiegos(parsed.riegos);
        if (parsed.cosechas) setCosechas(parsed.cosechas);
        notifySave('¡Datos del cuaderno de campo cargados con éxito desde archivo!');
      } catch (err) {
        alert('Error al leer el archivo. Asegúrese de que sea un archivo JSON válido exportado desde este sistema.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // EXPORTAR TODOS LOS DATOS A JSON (Para guardar / respaldar)
  const handleExportJson = () => {
    const fullBackup = {
      institucion: 'I.E. Técnico Agrícola',
      areaHectareas: 0.5,
      cultivo: 'Maíz (Zea mays L.)',
      fechaExportacion: new Date().toISOString(),
      fichaLote,
      labores,
      aplicaciones,
      monitoreos,
      riegos,
      cosechas
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'cuaderno_campo_maiz_05ha_datos.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // DESCARGAS DE PDF INDIVIDUALES Y EN BLANCO
  const handleDownloadPdf = (isBlank: boolean) => {
    if (selectedFormat === 1) {
      generateFormat1Pdf(fichaLote, isBlank);
    } else if (selectedFormat === 2) {
      generateFormat2Pdf(labores, isBlank);
    } else if (selectedFormat === 3) {
      generateFormat3Pdf(aplicaciones, isBlank);
    } else if (selectedFormat === 4) {
      generateFormat4Pdf(monitoreos, isBlank);
    } else if (selectedFormat === 5) {
      generateFormat5Pdf(riegos, isBlank);
    } else if (selectedFormat === 6) {
      generateFormat6Pdf(cosechas, isBlank);
    }
  };

  // DESCARGA DEL CUADERNO COMPLETO
  const handleDownloadFullBook = (isBlank: boolean) => {
    generateCompleteFieldBookPdf(fichaLote, labores, aplicaciones, monitoreos, riegos, cosechas, isBlank);
  };

  const formatsList = [
    { id: 1, name: 'Formato 1: Ficha Técnica de Lote', code: 'BPA-01', icon: FileText, count: 1 },
    { id: 2, name: 'Formato 2: Labores Diarias & Prácticas', code: 'BPA-02', icon: Users, count: labores.length },
    { id: 3, name: 'Formato 3: Kardex Fitosanitario (ICA)', code: 'BPA-03', icon: FlaskConical, count: aplicaciones.length },
    { id: 4, name: 'Formato 4: Monitoreo Fitosanitario (UDE)', code: 'BPA-04', icon: Bug, count: monitoreos.length },
    { id: 5, name: 'Formato 5: Bitácora de Riego & Fenología', code: 'BPA-05', icon: Droplets, count: riegos.length },
    { id: 6, name: 'Formato 6: Cosecha, Rendimiento & Cierre', code: 'BPA-06', icon: Package, count: cosechas.length },
  ];

  return (
    <div className="space-y-6">
      {/* Alerta de guardado */}
      {saveAlert && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs border border-emerald-500 font-semibold animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{saveAlert}</span>
        </div>
      )}

      {/* Input oculto para carga de archivos */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json"
        className="hidden"
      />

      {/* ENCABEZADO PRINCIPAL DE GESTIÓN DE FORMATOS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded">
                  Sistema de Trazabilidad BPA
                </span>
                <span className="text-xs text-slate-500 font-mono">Formatos Oficiales en PDF</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Formatos Oficiales de Registro y Libro de Campo para Imprimir
              </h2>
              <p className="text-xs text-slate-500">
                Permite diligenciar en pantalla, cargar datos desde archivo y descargar en PDF para imprimir (en blanco o diligenciado)
              </p>
            </div>
          </div>

          {/* BOTONES GLOBALES DE CARGA Y DESCARGA */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Cargar datos */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors cursor-pointer"
              title="Cargar archivo JSON con registros previos"
            >
              <Upload className="w-3.5 h-3.5 text-slate-700" />
              <span>Cargar Datos (JSON)</span>
            </button>

            {/* Exportar datos a JSON */}
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-300 transition-colors cursor-pointer"
              title="Guardar copia de seguridad en JSON"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Guardar JSON</span>
            </button>

            {/* Restablecer valores recomendados */}
            <button
              onClick={handleResetRecords}
              className="flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors cursor-pointer"
              title="Restablecer datos agronómicos oficiales de muestra"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>

            {/* Descargar Cuaderno Completo (6 formatos) */}
            <div className="flex items-center bg-emerald-900 text-white rounded-lg p-0.5 shadow-sm">
              <button
                onClick={() => handleDownloadFullBook(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold hover:bg-emerald-800 rounded-md transition-colors cursor-pointer"
                title="Descargar los 6 formatos completos en 1 solo PDF con los datos actuales"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>Cuaderno Completo PDF</span>
              </button>
              <button
                onClick={() => handleDownloadFullBook(true)}
                className="px-2 py-1.5 text-[11px] font-medium text-emerald-200 hover:bg-emerald-800 rounded-md border-l border-emerald-800 transition-colors cursor-pointer"
                title="Descargar Cuaderno Completo con formatos en blanco listos para imprimir"
              >
                (En Blanco)
              </button>
            </div>
          </div>
        </div>

        {/* SELECTOR DE LOS 6 FORMATOS OFICIALES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-slate-100">
          {formatsList.map((f) => {
            const Icon = f.icon;
            const isSelected = selectedFormat === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFormat(f.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {f.code}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-emerald-700'}`} />
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-2">{f.name}</span>
                <span className={`text-[10px] mt-1 ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                  {f.id === 1 ? '1 parcela' : `${f.count} registros`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BARRA DE ACCIÓN ESPECÍFICA DEL FORMATO ACTIVO */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-emerald-300 font-mono uppercase font-bold block">
            Formato Seleccionado: BPA-0{selectedFormat}
          </span>
          <h3 className="text-base font-bold text-white">
            {formatsList.find((f) => f.id === selectedFormat)?.name}
          </h3>
          <p className="text-xs text-emerald-200/80">
            Diligencie las casillas en pantalla o imprima el formato en PDF para registro físico en campo.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Botón Descargar PDF Diligenciado */}
          <button
            onClick={() => handleDownloadPdf(false)}
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-2 rounded-xl font-bold text-xs shadow transition-colors cursor-pointer"
            title="Descargar este formato en PDF con la información cargada actualmente"
          >
            <FileDown className="w-4 h-4 text-slate-950" />
            <span>Descargar PDF Diligenciado</span>
          </button>

          {/* Botón Descargar PDF en Blanco */}
          <button
            onClick={() => handleDownloadPdf(true)}
            className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 px-3.5 py-2 rounded-xl font-bold text-xs shadow-inner transition-colors cursor-pointer"
            title="Descargar plantilla en blanco con casillas y renglones vacíos para diligenciar a mano en campo"
          >
            <Printer className="w-4 h-4 text-emerald-300" />
            <span>Descargar PDF en Blanco</span>
          </button>

          {/* Botón Agregar Registro (para formatos tabulares 2 a 6) */}
          {selectedFormat !== 1 && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-2 rounded-xl font-black text-xs shadow transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Registro</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          VISTA DEL FORMATO 1: FICHA TÉCNICA DE LOTE (CASILLAS EDITABLES EN VIVO)
         ========================================================================= */}
      {selectedFormat === 1 && (
        <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-md p-6 sm:p-8 space-y-6">
          {/* Encabezado visual de documento */}
          <div className="border-b-2 border-emerald-900 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 inline-block">
                FORMATO OFICIAL BPA-01 • CASILLAS DE INFORMACIÓN
              </span>
              <h3 className="text-xl font-black text-slate-950 mt-1">
                Ficha Técnica del Lote e Historial Agroecológico
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Modifique las casillas y presione:</span>
              <button
                onClick={() => notifySave('Ficha técnica del lote actualizada y guardada.')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>

          {/* CUADRICULA DE CASILLAS EDITABLES */}
          <div className="space-y-6 text-xs">
            {/* SECCIÓN I */}
            <div>
              <span className="font-bold text-slate-900 uppercase text-xs tracking-wider block mb-2 border-b pb-1 text-emerald-950">
                I. Identificación General y Ubicación de la Parcela
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="border border-slate-300 rounded-lg p-2.5 bg-slate-50/50 focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-500">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Institución Educativa:</label>
                  <input
                    type="text"
                    value={fichaLote.institucion}
                    onChange={(e) => setFichaLote({ ...fichaLote, institucion: e.target.value })}
                    className="w-full bg-white px-2 py-1.5 border border-slate-200 rounded font-semibold text-slate-900"
                  />
                </div>
                <div className="border border-slate-300 rounded-lg p-2.5 bg-slate-50/50 focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-500">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Sede / Municipio / Granja:</label>
                  <input
                    type="text"
                    value={fichaLote.sedeOMunicipio}
                    onChange={(e) => setFichaLote({ ...fichaLote, sedeOMunicipio: e.target.value })}
                    className="w-full bg-white px-2 py-1.5 border border-slate-200 rounded font-semibold text-slate-900"
                  />
                </div>
                <div className="border border-slate-300 rounded-lg p-2.5 bg-slate-50/50 focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-500">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Identificador del Lote (ID):</label>
                  <input
                    type="text"
                    value={fichaLote.loteId}
                    onChange={(e) => setFichaLote({ ...fichaLote, loteId: e.target.value })}
                    className="w-full bg-white px-2 py-1.5 border border-slate-200 rounded font-semibold text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN II */}
            <div>
              <span className="font-bold text-slate-900 uppercase text-xs tracking-wider block mb-2 border-b pb-1 text-emerald-950">
                II. Parámetros Físico-Químicos y Suelo
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="border border-slate-300 rounded-lg p-2.5 bg-slate-50/50">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Área Superficial Neta (m²):</label>
                  <input
                    type="number"
                    value={fichaLote.areaM2}
                    onChange={(e) => setFichaLote({ ...fichaLote, areaM2: Number(e.target.value) })}
                    className="w-full bg-white px-2 py-1.5 border border-slate-200 rounded font-mono font-bold text-slate-900"
                  />
                </div>
                <div className="border border-slate-300 rounded-lg p-2.5 bg-slate-50/50">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Topografía y Pendiente:</label>
                  <input
                    type="text"
                    value={fichaLote.topografia}
                    onChange={(e) => setFichaLote({ ...fichaLote, topografia: e.target.value })}
                    className="w-full bg-white px-2 py-1.5 border border-slate-200 rounded text-slate-900"
                  />
                </div>
                <div className="border border-slate-300 rounded-lg p-2.5 bg-slate-50/50">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Textura del Suelo:</label>
                  <input
                    type="text"
                    value={fichaLote.textura}
                    onChange={(e) => setFichaLote({ ...fichaLote, textura: e.target.value })}
                    className="w-full bg-white px-2 py-1.5 border border-slate-200 rounded text-slate-900"
                  />
                </div>

                <div className="border border-slate-300 rounded-lg p-2.5 bg-slate-50/50">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">pH Actual de Suelo:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={fichaLote.phSuelo}
                    onChange={(e) => setFichaLote({ ...fichaLote, phSuelo: Number(e.target.value) })}
                    className="w-full bg-white px-2 py-1.5 border border-slate-200 rounded font-mono font-bold text-slate-900"
                  />
                </div>
                <div className="border border-slate-300 rounded-lg p-2.5 bg-slate-50/50">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Cultivo Precedente (Rotación):</label>
                  <input
                    type="text"
                    value={fichaLote.loteAnterior}
                    onChange={(e) => setFichaLote({ ...fichaLote, loteAnterior: e.target.value })}
                    className="w-full bg-white px-2 py-1.5 border border-slate-200 rounded text-slate-900"
                  />
                </div>
                <div className="border border-slate-300 rounded-lg p-2.5 bg-slate-50/50">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Fecha de Siembra Programada:</label>
                  <input
                    type="date"
                    value={fichaLote.fechaRegistro}
                    onChange={(e) => setFichaLote({ ...fichaLote, fechaRegistro: e.target.value })}
                    className="w-full bg-white px-2 py-1.5 border border-slate-200 rounded text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN III */}
            <div>
              <span className="font-bold text-slate-900 uppercase text-xs tracking-wider block mb-2 border-b pb-1 text-emerald-950">
                III. Material Genético y Personal a Cargo
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="border border-slate-300 rounded-lg p-2.5 bg-slate-50/50">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Variedad / Híbrido Sembrado:</label>
                  <input
                    type="text"
                    value={fichaLote.variedadSembrada}
                    onChange={(e) => setFichaLote({ ...fichaLote, variedadSembrada: e.target.value })}
                    className="w-full bg-white px-2 py-1.5 border border-slate-200 rounded font-bold text-emerald-900"
                  />
                </div>
                <div className="border border-slate-300 rounded-lg p-2.5 bg-slate-50/50">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Docente / Instructor Titular:</label>
                  <input
                    type="text"
                    value={fichaLote.instructorACargo}
                    onChange={(e) => setFichaLote({ ...fichaLote, instructorACargo: e.target.value })}
                    className="w-full bg-white px-2 py-1.5 border border-slate-200 rounded text-slate-900"
                  />
                </div>
                <div className="border border-slate-300 rounded-lg p-2.5 bg-slate-50/50">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Estudiante Monitor de Parcela:</label>
                  <input
                    type="text"
                    value={fichaLote.estudianteLider}
                    onChange={(e) => setFichaLote({ ...fichaLote, estudianteLider: e.target.value })}
                    className="w-full bg-white px-2 py-1.5 border border-slate-200 rounded text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vista previa de bloque de firmas */}
          <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
            <div className="border-t border-slate-400 pt-2">
              <span className="font-bold text-slate-900 block">{fichaLote.instructorACargo}</span>
              <span className="text-slate-500 text-[11px]">Instructor Titular (Ing. Agrónomo)</span>
            </div>
            <div className="border-t border-slate-400 pt-2">
              <span className="font-bold text-slate-900 block">{fichaLote.estudianteLider}</span>
              <span className="text-slate-500 text-[11px]">Estudiante Monitor de Parcela</span>
            </div>
            <div className="border-t border-slate-400 pt-2">
              <span className="font-bold text-slate-900 block">Coordinación Agropecuaria</span>
              <span className="text-slate-500 text-[11px]">V°B° Institucional IETA</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VISTA DEL FORMATO 2: LABORES DIARIAS Y PRÁCTICAS ESTUDIANTILES
         ========================================================================= */}
      {selectedFormat === 2 && (
        <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-md overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                FORMATO OFICIAL BPA-02 • REGISTRO DIARIO DE LABORES
              </span>
              <h3 className="text-lg font-black text-slate-900">
                Planilla de Jornales, Labores y Prácticas Estudiantiles
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded">
              {labores.length} labores registradas
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-950 text-white font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">ID / Fecha</th>
                  <th className="p-3">Actividad Realizada</th>
                  <th className="p-3">Fase Fenol.</th>
                  <th className="p-3">Estudiantes</th>
                  <th className="p-3">Horas</th>
                  <th className="p-3">Herramientas / Maquinaria</th>
                  <th className="p-3">Observaciones</th>
                  <th className="p-3">Supervisor</th>
                  <th className="p-3 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {labores.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-emerald-950 whitespace-nowrap">
                      <div>{l.id}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{l.fecha}</div>
                    </td>
                    <td className="p-3 font-semibold text-slate-900 max-w-xs">{l.actividad}</td>
                    <td className="p-3 text-slate-700 font-medium whitespace-nowrap">{l.faseFenologica}</td>
                    <td className="p-3 font-mono text-slate-800 text-center whitespace-nowrap">{l.numeroEstudiantes} est.</td>
                    <td className="p-3 font-mono text-slate-800 text-center whitespace-nowrap">{l.horasJornal} h</td>
                    <td className="p-3 text-slate-600">{l.herramientasUtilizadas}</td>
                    <td className="p-3 text-slate-600">{l.observacionesNovedades}</td>
                    <td className="p-3 text-slate-700 font-medium whitespace-nowrap">{l.docenteSupervisor}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          setLabores(labores.filter((item) => item.id !== l.id));
                          notifySave('Registro eliminado.');
                        }}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          VISTA DEL FORMATO 3: KARDEX AGROQUÍMICOS Y FERTILIZANTES (BPA ICA)
         ========================================================================= */}
      {selectedFormat === 3 && (
        <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-md overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                FORMATO OFICIAL BPA-03 • KARDEX FITOSANITARIO Y FERTILIZACIÓN (ICA)
              </span>
              <h3 className="text-lg font-black text-slate-900">
                Trazabilidad de Plaguicidas, Dosis y Períodos de Carencia
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-purple-900 bg-purple-100 px-3 py-1 rounded">
              {aplicaciones.length} aplicaciones
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-950 text-white font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">ID / Fecha</th>
                  <th className="p-3">Fase</th>
                  <th className="p-3">Blanco Biológico</th>
                  <th className="p-3">Producto & I.A.</th>
                  <th className="p-3">Dosis (0.5 Ha)</th>
                  <th className="p-3">Caldo (L)</th>
                  <th className="p-3">Boquilla</th>
                  <th className="p-3">P.C. (Días)</th>
                  <th className="p-3">EPP</th>
                  <th className="p-3">Responsable</th>
                  <th className="p-3 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {aplicaciones.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      <div>{a.id}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{a.fecha}</div>
                    </td>
                    <td className="p-3 text-slate-700 font-medium whitespace-nowrap">{a.faseFenologica}</td>
                    <td className="p-3 font-semibold text-slate-900 max-w-xs">{a.blancoBiologico}</td>
                    <td className="p-3">
                      <div className="font-bold text-emerald-950">{a.nombreComercial}</div>
                      <div className="text-[10px] text-slate-500">{a.ingredienteActivo}</div>
                    </td>
                    <td className="p-3 font-mono font-bold text-purple-900">{a.dosisAplicada}</td>
                    <td className="p-3 font-mono text-slate-800 text-center">{a.volumenCaldoLitros} L</td>
                    <td className="p-3 text-slate-600">{a.equipoBoquilla}</td>
                    <td className="p-3 font-mono font-bold text-amber-900 text-center">{a.periodoCarenciaDias} d</td>
                    <td className="p-3 text-center">
                      {a.verificacionEpp ? (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                          OK EPP
                        </span>
                      ) : (
                        <span className="text-rose-700 font-bold">Sin EPP</span>
                      )}
                    </td>
                    <td className="p-3 text-slate-700 text-[11px]">{a.responsableAplicacion}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          setAplicaciones(aplicaciones.filter((item) => item.id !== a.id));
                          notifySave('Registro eliminado.');
                        }}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          VISTA DEL FORMATO 4: MONITOREO FITOSANITARIO (UDE)
         ========================================================================= */}
      {selectedFormat === 4 && (
        <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-md overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                FORMATO OFICIAL BPA-04 • MONITOREO ENTOMOLÓGICO Y UDE
              </span>
              <h3 className="text-lg font-black text-slate-900">
                Planilla de Evaluación de Incidencia de Plagas y Enfermedades
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-rose-900 bg-rose-100 px-3 py-1 rounded">
              {monitoreos.length} muestreos
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-950 text-white font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">ID / Fecha</th>
                  <th className="p-3">Sitios Muestreados</th>
                  <th className="p-3">% Daño Spodoptera</th>
                  <th className="p-3">Dalbulus (Ninfas/Planta)</th>
                  <th className="p-3">Mancha de Asfalto</th>
                  <th className="p-3">Decisión Técnica Tomada (UDE)</th>
                  <th className="p-3">Estudiante Monitor</th>
                  <th className="p-3 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {monitoreos.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      <div>{m.id}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{m.fecha}</div>
                    </td>
                    <td className="p-3 font-mono text-slate-800">{m.sitiosEvaluados} sitios</td>
                    <td className="p-3 font-mono font-bold text-rose-900">
                      {m.porcentajeDanoSpodoptera}%
                      {m.porcentajeDanoSpodoptera >= 15 && (
                        <span className="ml-1 text-[10px] bg-red-100 text-red-800 px-1 py-0.5 rounded font-bold">
                          ¡Alerta UDE!
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-slate-800">{m.promedioNinfasDalbulus} ind/pl</td>
                    <td className="p-3 text-slate-700">{m.incidenciaManchaAsfalto}</td>
                    <td className="p-3 font-medium text-slate-900 max-w-xs">{m.decisionTomada}</td>
                    <td className="p-3 text-slate-600 whitespace-nowrap">{m.evaluadorEstudiante}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          setMonitoreos(monitoreos.filter((item) => item.id !== m.id));
                          notifySave('Registro eliminado.');
                        }}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          VISTA DEL FORMATO 5: BITÁCORA DE RIEGO Y FENOLOGÍA
         ========================================================================= */}
      {selectedFormat === 5 && (
        <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-md overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                FORMATO OFICIAL BPA-05 • CONTROL HÍDRICO Y BIOMETRÍA
              </span>
              <h3 className="text-lg font-black text-slate-900">
                Bitácora de Riego Tecnificado y Altura del Maíz
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded">
              {riegos.length} riegos registrados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-950 text-white font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">ID / Fecha</th>
                  <th className="p-3">Etapa Fenológica</th>
                  <th className="p-3">Altura Media (cm)</th>
                  <th className="p-3">Tiempo Riego</th>
                  <th className="p-3">Volumen Aplicado</th>
                  <th className="p-3">Apreciación Humedad Suelo</th>
                  <th className="p-3">Observaciones / Mantenimiento Cintas</th>
                  <th className="p-3 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {riegos.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      <div>{r.id}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{r.fecha}</div>
                    </td>
                    <td className="p-3 font-semibold text-slate-900 whitespace-nowrap">{r.etapaFenologica}</td>
                    <td className="p-3 font-mono font-bold text-emerald-900">{r.alturaPromedioCm} cm</td>
                    <td className="p-3 font-mono text-slate-800">{r.tiempoRiegoMin} min</td>
                    <td className="p-3 font-mono text-blue-900 font-bold">{r.volumenEstimadoLitros.toLocaleString()} L</td>
                    <td className="p-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-[11px]">
                        {r.humedadSueloApreciacion}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 max-w-xs">{r.observaciones}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          setRiegos(riegos.filter((item) => item.id !== r.id));
                          notifySave('Registro eliminado.');
                        }}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          VISTA DEL FORMATO 6: COSECHA, RENDIMIENTO Y LIQUIDACIÓN
         ========================================================================= */}
      {selectedFormat === 6 && (
        <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-md p-6 sm:p-8 space-y-6">
          <div className="border-b-2 border-emerald-900 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 inline-block">
                FORMATO OFICIAL BPA-06 • CIERRE PRODUCTIVO Y LIQUIDACIÓN
              </span>
              <h3 className="text-xl font-black text-slate-950 mt-1">
                Acta de Cosecha, Rendimiento y Balance Económico
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded">
              0.5 Hectárea (5.000 m²)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-950 text-white font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Ticket / Fecha</th>
                  <th className="p-3">Destino / Tipo Producto</th>
                  <th className="p-3">Peso Bruto 0.5 Ha</th>
                  <th className="p-3">Humedad Grano (%)</th>
                  <th className="p-3">Rendimiento Equiv.</th>
                  <th className="p-3">Calidad Comercial</th>
                  <th className="p-3">Responsable Pesaje</th>
                  <th className="p-3 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {cosechas.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      <div>{c.id}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{c.fechaCosecha}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{c.tipoProducto}</div>
                      <div className="text-[11px] text-slate-500">{c.destinoProduccion}</div>
                    </td>
                    <td className="p-3 font-mono font-black text-emerald-950 text-sm">
                      {c.pesoBrutoKg.toLocaleString()} kg
                    </td>
                    <td className="p-3 font-mono text-slate-800 text-center font-bold">{c.porcentajeHumedadGrano}%</td>
                    <td className="p-3 font-mono font-black text-purple-900 text-sm text-center">
                      {c.rendimientoCalculadoTonHa} t/ha
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                        {c.calidadComercial}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">{c.responsablePesaje}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          setCosechas(cosechas.filter((item) => item.id !== c.id));
                          notifySave('Registro eliminado.');
                        }}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL PARA DILIGENCIAR NUEVO REGISTRO EN FORMATOS 2 A 6
         ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto border border-slate-300">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-800">Casillas de Diligenciamiento</span>
                <h3 className="text-base font-black text-slate-900">
                  Nuevo Registro • Formato BPA-0{selectedFormat}
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* FORMULARIO SEGÚN FORMATO ACTIVO */}
            {selectedFormat === 2 && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Fecha de la Práctica:</label>
                    <input
                      type="date"
                      value={newLabor.fecha}
                      onChange={(e) => setNewLabor({ ...newLabor, fecha: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Fase Fenológica:</label>
                    <input
                      type="text"
                      value={newLabor.faseFenologica}
                      onChange={(e) => setNewLabor({ ...newLabor, faseFenologica: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Actividad Realizada:</label>
                  <input
                    type="text"
                    placeholder="Ej: Aporque con azadón y aplicación de Urea al hilo"
                    value={newLabor.actividad}
                    onChange={(e) => setNewLabor({ ...newLabor, actividad: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded font-semibold text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Número de Estudiantes:</label>
                    <input
                      type="number"
                      value={newLabor.numeroEstudiantes}
                      onChange={(e) => setNewLabor({ ...newLabor, numeroEstudiantes: Number(e.target.value) })}
                      className="w-full p-2 border border-slate-300 rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Horas de Jornal:</label>
                    <input
                      type="number"
                      value={newLabor.horasJornal}
                      onChange={(e) => setNewLabor({ ...newLabor, horasJornal: Number(e.target.value) })}
                      className="w-full p-2 border border-slate-300 rounded font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Herramientas / Maquinaria Empleada:</label>
                  <input
                    type="text"
                    value={newLabor.herramientasUtilizadas}
                    onChange={(e) => setNewLabor({ ...newLabor, herramientasUtilizadas: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Observaciones / Novedades de Campo:</label>
                  <textarea
                    rows={2}
                    value={newLabor.observacionesNovedades}
                    onChange={(e) => setNewLabor({ ...newLabor, observacionesNovedades: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                </div>

                <button
                  onClick={handleAddLabor}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Guardar en Libro de Campo
                </button>
              </div>
            )}

            {selectedFormat === 3 && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Fecha de Aplicación:</label>
                    <input
                      type="date"
                      value={newAplicacion.fecha}
                      onChange={(e) => setNewAplicacion({ ...newAplicacion, fecha: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Fase Fenológica:</label>
                    <input
                      type="text"
                      value={newAplicacion.faseFenologica}
                      onChange={(e) => setNewAplicacion({ ...newAplicacion, faseFenologica: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Blanco Biológico (Plaga/Enfermedad):</label>
                  <input
                    type="text"
                    value={newAplicacion.blancoBiologico}
                    onChange={(e) => setNewAplicacion({ ...newAplicacion, blancoBiologico: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded font-semibold text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Nombre Comercial:</label>
                    <input
                      type="text"
                      value={newAplicacion.nombreComercial}
                      onChange={(e) => setNewAplicacion({ ...newAplicacion, nombreComercial: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Ingrediente Activo:</label>
                    <input
                      type="text"
                      value={newAplicacion.ingredienteActivo}
                      onChange={(e) => setNewAplicacion({ ...newAplicacion, ingredienteActivo: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Dosis (0.5 Ha):</label>
                    <input
                      type="text"
                      value={newAplicacion.dosisAplicada}
                      onChange={(e) => setNewAplicacion({ ...newAplicacion, dosisAplicada: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded font-mono font-bold text-purple-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Volumen Caldo (L):</label>
                    <input
                      type="number"
                      value={newAplicacion.volumenCaldoLitros}
                      onChange={(e) => setNewAplicacion({ ...newAplicacion, volumenCaldoLitros: Number(e.target.value) })}
                      className="w-full p-2 border border-slate-300 rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">P.C. (Días):</label>
                    <input
                      type="number"
                      value={newAplicacion.periodoCarenciaDias}
                      onChange={(e) => setNewAplicacion({ ...newAplicacion, periodoCarenciaDias: Number(e.target.value) })}
                      className="w-full p-2 border border-slate-300 rounded font-mono text-amber-900 font-bold"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddAplicacion}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Guardar en Kardex Fitosanitario BPA
                </button>
              </div>
            )}

            {selectedFormat === 4 && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Fecha de Monitoreo:</label>
                    <input
                      type="date"
                      value={newMonitoreo.fecha}
                      onChange={(e) => setNewMonitoreo({ ...newMonitoreo, fecha: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Sitios Evaluados:</label>
                    <input
                      type="number"
                      value={newMonitoreo.sitiosEvaluados}
                      onChange={(e) => setNewMonitoreo({ ...newMonitoreo, sitiosEvaluados: Number(e.target.value) })}
                      className="w-full p-2 border border-slate-300 rounded font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">% Daño Spodoptera (Cogollero):</label>
                    <input
                      type="number"
                      step="0.5"
                      value={newMonitoreo.porcentajeDanoSpodoptera}
                      onChange={(e) => setNewMonitoreo({ ...newMonitoreo, porcentajeDanoSpodoptera: Number(e.target.value) })}
                      className="w-full p-2 border border-slate-300 rounded font-mono text-rose-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Ninfas Dalbulus / Planta:</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newMonitoreo.promedioNinfasDalbulus}
                      onChange={(e) => setNewMonitoreo({ ...newMonitoreo, promedioNinfasDalbulus: Number(e.target.value) })}
                      className="w-full p-2 border border-slate-300 rounded font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Decisión Agronómica Tomada (UDE):</label>
                  <input
                    type="text"
                    value={newMonitoreo.decisionTomada}
                    onChange={(e) => setNewMonitoreo({ ...newMonitoreo, decisionTomada: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded font-semibold"
                  />
                </div>

                <button
                  onClick={handleAddMonitoreo}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Guardar Evaluación de Plagas
                </button>
              </div>
            )}

            {selectedFormat === 5 && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Fecha de Riego:</label>
                    <input
                      type="date"
                      value={newRiego.fecha}
                      onChange={(e) => setNewRiego({ ...newRiego, fecha: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Etapa Fenológica:</label>
                    <input
                      type="text"
                      value={newRiego.etapaFenologica}
                      onChange={(e) => setNewRiego({ ...newRiego, etapaFenologica: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Altura Planta (cm):</label>
                    <input
                      type="number"
                      value={newRiego.alturaPromedioCm}
                      onChange={(e) => setNewRiego({ ...newRiego, alturaPromedioCm: Number(e.target.value) })}
                      className="w-full p-2 border border-slate-300 rounded font-mono font-bold text-emerald-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Tiempo (min):</label>
                    <input
                      type="number"
                      value={newRiego.tiempoRiegoMin}
                      onChange={(e) => setNewRiego({ ...newRiego, tiempoRiegoMin: Number(e.target.value) })}
                      className="w-full p-2 border border-slate-300 rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Volumen Agua (L):</label>
                    <input
                      type="number"
                      value={newRiego.volumenEstimadoLitros}
                      onChange={(e) => setNewRiego({ ...newRiego, volumenEstimadoLitros: Number(e.target.value) })}
                      className="w-full p-2 border border-slate-300 rounded font-mono font-bold text-blue-900"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddRiego}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Guardar en Bitácora de Riego
                </button>
              </div>
            )}

            {selectedFormat === 6 && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Fecha de Cosecha:</label>
                    <input
                      type="date"
                      value={newCosecha.fechaCosecha}
                      onChange={(e) => setNewCosecha({ ...newCosecha, fechaCosecha: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Peso Bruto 0.5 Ha (kg):</label>
                    <input
                      type="number"
                      value={newCosecha.pesoBrutoKg}
                      onChange={(e) => setNewCosecha({ ...newCosecha, pesoBrutoKg: Number(e.target.value) })}
                      className="w-full p-2 border border-slate-300 rounded font-mono font-bold text-emerald-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">% Humedad en Grano:</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newCosecha.porcentajeHumedadGrano}
                      onChange={(e) => setNewCosecha({ ...newCosecha, porcentajeHumedadGrano: Number(e.target.value) })}
                      className="w-full p-2 border border-slate-300 rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Responsable del Pesaje:</label>
                    <input
                      type="text"
                      value={newCosecha.responsablePesaje}
                      onChange={(e) => setNewCosecha({ ...newCosecha, responsablePesaje: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddCosecha}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Guardar Cierre de Cosecha
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
