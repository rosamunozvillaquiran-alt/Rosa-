export interface VarietyRecommendation {
  nombre: string;
  tipo: 'Híbrido Comercial' | 'Variedad Mejorada (VPA)' | 'Línea Criolla Mejorada';
  pisoTermico: string;
  cicloDias: string;
  rendimientoEsperadoTonHa: string;
  rendimiento05Ha: string;
  caracteristicas: string[];
  justificacionPedagogica: string;
}

export interface SoilAmendmentPlan {
  tipo: string;
  composicionQuimica: string;
  dosisHectarea: string;
  dosis05Ha: string;
  momentoAplicacion: string;
  metodoAplicacion: string;
  objetivoAgronomico: string;
}

export interface IrrigationDesign {
  sistema: string;
  especificacionesTecnicas: {
    longitudSurcos: string;
    numeroSurcos: string;
    espaciamientoGoteros: string;
    caudalGotero: string;
    metrosCintaTotal: string;
    presionOperacion: string;
    filtradoRequerido: string;
  };
  requerimientoHidrico: {
    fase: string;
    kc: number;
    laminaDiariaMm: string;
    tiempoRiegoMin: string;
    frecuencia: string;
  }[];
  alternativaGravedad: string;
}

export interface FertilizationDose {
  etapa: string;
  diasDDS: string;
  fuenteComercial: string;
  gradoNpk: string;
  cantidad05HaKg: number;
  bultos50Kg: string;
  aporteNutricional: string;
  metodoAplicacion: string;
}

export interface PhytosanitaryProblem {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  tipo: 'Plaga' | 'Enfermedad';
  sintomasDano: string;
  umbralDanoEconomico: string;
  controlCulturalBiologico: string;
  ingredienteActivoQuimico: string;
  productoComercialReferencia: string;
  dosisPorHectarea: string;
  dosisPara05Ha: string;
  volumenAguaRecomendado: string;
  periodoCarenciaDias: number;
  periodoReingresoHoras: number;
  categoriaToxicologica: 'I (Rojo)' | 'II (Amarillo)' | 'III (Azul)' | 'IV (Verde)';
  boquillaRecomendada: string;
}

export interface WeedControlActivity {
  etapaCultivo: string;
  diasDDS: string;
  tipoControl: 'Químico Pre-emergente' | 'Químico Post-emergente' | 'Mecánico / Manual' | 'Cultural (Dosel)';
  herbicidaOpcion: string;
  ingredienteActivo: string;
  dosis05Ha: string;
  malezasObjetivo: string;
  observacionesBpa: string;
}

export interface PhenologicalStage {
  codigo: string;
  nombre: string;
  diasAproximados: string;
  descripcionVisual: string;
  laboresClave: string[];
  nivelRiesgoEstres: 'Bajo' | 'Medio' | 'Crítico';
}

export interface EquipmentToolItem {
  nombre: string;
  categoria: 'Maquinaria' | 'Implemento' | 'Herramienta Menor' | 'Equipo de Aplicación' | 'Medición y Control';
  cantidadPara05Ha: string;
  especificacionTecnica: string;
  laborPrincipal: string;
  protocoloMantenimientoCalibracion: string;
}

export interface PpeItem {
  nombre: string;
  laborDestino: 'Aplicación Fitosanitaria (Químico)' | 'Preparación y Siembra (Mecánico)' | 'Desyerbe y Cosecha (Ergonómico/Solar)';
  normaReferencia: string;
  descripcionYMaterial: string;
  riesgoMitigado: string;
  obligatoriedad: 'Estricta Obligatoria' | 'Recomendada';
}

// Modelos para los Registros de Campo BPA
export interface FichaLoteRecord {
  id: string;
  fechaRegistro: string;
  institucion: string;
  sedeOMunicipio: string;
  loteId: string;
  areaM2: number;
  topografia: string;
  phSuelo: number;
  textura: string;
  variedadSembrada: string;
  loteAnterior: string;
  instructorACargo: string;
  estudianteLider: string;
}

export interface LaborDiariaRecord {
  id: string;
  fecha: string;
  actividad: string;
  faseFenologica: string;
  numeroEstudiantes: number;
  horasJornal: number;
  herramientasUtilizadas: string;
  observacionesNovedades: string;
  docenteSupervisor: string;
}

export interface AplicacionQuimicaRecord {
  id: string;
  fecha: string;
  faseFenologica: string;
  blancoBiologico: string;
  nombreComercial: string;
  ingredienteActivo: string;
  dosisAplicada: string;
  volumenCaldoLitros: number;
  equipoBoquilla: string;
  periodoCarenciaDias: number;
  responsableAplicacion: string;
  verificacionEpp: boolean;
}

export interface MonitoreoPlagaRecord {
  id: string;
  fecha: string;
  sitiosEvaluados: number;
  porcentajeDanoSpodoptera: number;
  promedioNinfasDalbulus: number;
  incidenciaManchaAsfalto: string;
  decisionTomada: string;
  evaluadorEstudiante: string;
}

export interface RiegoFenologiaRecord {
  id: string;
  fecha: string;
  etapaFenologica: string;
  alturaPromedioCm: number;
  tiempoRiegoMin: number;
  volumenEstimadoLitros: number;
  humedadSueloApreciacion: 'Baja / Estrés' | 'Capacidad de Campo' | 'Saturado';
  observaciones: string;
}

export interface CosechaRendimientoRecord {
  id: string;
  fechaCosecha: string;
  tipoProducto: 'Maíz Choclo / Elote' | 'Grano Seco Comercial' | 'Ensilaje Forrajero' | string;
  pesoBrutoKg: number;
  porcentajeHumedadGrano: number;
  rendimientoCalculadoTonHa: number;
  calidadComercial: 'Primera (Selecta)' | 'Segunda' | 'Descarte' | string;
  destinoProduccion: 'Comedor Escolar' | 'Venta Comunitaria' | 'Pasantía Pedagógica' | string;
  responsablePesaje: string;
}
