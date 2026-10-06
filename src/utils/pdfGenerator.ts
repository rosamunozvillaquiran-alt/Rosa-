import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  FichaLoteRecord,
  LaborDiariaRecord,
  AplicacionQuimicaRecord,
  MonitoreoPlagaRecord,
  RiegoFenologiaRecord,
  CosechaRendimientoRecord
} from '../types/agronomy';

// Paleta institucional
const COLOR_PRIMARY: [number, number, number] = [6, 78, 59]; // Emerald 900
const COLOR_SECONDARY: [number, number, number] = [16, 185, 129]; // Emerald 500
const COLOR_HEADER_FILL: [number, number, number] = [240, 253, 244]; // Emerald 50
const COLOR_BORDER: [number, number, number] = [180, 200, 190];

// Helper para dibujar membrete oficial en cada hoja
function drawHeader(doc: jsPDF, title: string, subtitle: string, formatCode: string) {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Barra decorativa superior
  doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.rect(0, 0, pageWidth, 8, 'F');

  // Recuadro de membrete
  doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.setLineWidth(0.8);
  doc.rect(14, 12, pageWidth - 28, 22);

  // Logo / Escudo institucional texto
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('INSTITUCIÓN EDUCATIVA TÉCNICO AGRÍCOLA', 18, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text('Granja Experimental Pedagógica • Proyecto Productivo de Maíz (0.5 Ha / 5.000 m²)', 18, 23);
  doc.text('Sistema de Gestión de Buenas Prácticas Agrícolas (BPA) • Trazabilidad Oficial', 18, 28);

  // Código de formato en la esquina derecha
  doc.setFillColor(COLOR_HEADER_FILL[0], COLOR_HEADER_FILL[1], COLOR_HEADER_FILL[2]);
  doc.rect(pageWidth - 62, 12, 48, 22, 'FD');
  doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text(formatCode, pageWidth - 38, 19, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 100, 100);
  doc.text('VERSIÓN: 2026-BPA', pageWidth - 38, 25, { align: 'center' });
  doc.text('PÁGINA: 1 de 1', pageWidth - 38, 30, { align: 'center' });

  // Título del Formato
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 20);
  doc.text(title.toUpperCase(), pageWidth / 2, 41, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 90, 90);
  doc.text(subtitle, pageWidth / 2, 46, { align: 'center' });

  // Línea divisoria
  doc.setDrawColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
  doc.setLineWidth(0.5);
  doc.line(14, 48, pageWidth - 14, 48);
}

// Helper para dibujar bloque de firmas
function drawSignatureBlock(doc: jsPDF, yPos: number, role1 = 'Instructor Titular (Ing. Agrónomo)', role2 = 'Estudiante Monitor de Parcela', role3 = 'Coordinador Agropecuario') {
  const pageWidth = doc.internal.pageSize.getWidth();
  const colWidth = (pageWidth - 28) / 3;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(60, 60, 60);

  // Col 1
  const x1 = 14;
  doc.line(x1 + 10, yPos + 14, x1 + colWidth - 10, yPos + 14);
  doc.text('Firma y T.P.: _____________________', x1 + colWidth / 2, yPos + 18, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.text(role1, x1 + colWidth / 2, yPos + 22, { align: 'center' });

  // Col 2
  const x2 = 14 + colWidth;
  doc.line(x2 + 10, yPos + 14, x2 + colWidth - 10, yPos + 14);
  doc.setFont('helvetica', 'normal');
  doc.text('Firma Estudiante: _________________', x2 + colWidth / 2, yPos + 18, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.text(role2, x2 + colWidth / 2, yPos + 22, { align: 'center' });

  // Col 3
  const x3 = 14 + colWidth * 2;
  doc.line(x3 + 10, yPos + 14, x3 + colWidth - 10, yPos + 14);
  doc.setFont('helvetica', 'normal');
  doc.text('V°B° Institucional: _______________', x3 + colWidth / 2, yPos + 18, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.text(role3, x3 + colWidth / 2, yPos + 22, { align: 'center' });
}

// Helper para dibujar casillas con etiqueta y valor (o vacía)
function drawFieldBox(doc: jsPDF, x: number, y: number, w: number, h: number, label: string, value = '', isBlank = false) {
  doc.setFillColor(252, 252, 252);
  doc.setDrawColor(190, 190, 190);
  doc.setLineWidth(0.3);
  doc.rect(x, y, w, h, 'FD');

  // Fondo de etiqueta
  doc.setFillColor(243, 244, 246);
  doc.rect(x, y, w, 5, 'F');
  doc.line(x, y + 5, x + w, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(70, 70, 70);
  doc.text(label.toUpperCase(), x + 2, y + 3.8);

  if (!isBlank && value) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(20, 20, 20);
    doc.text(String(value), x + 2.5, y + 10, { maxWidth: w - 5 });
  } else {
    // Línea tenue para escribir a mano si está en blanco
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.2);
    doc.line(x + 2, y + 10, x + w - 2, y + 10);
  }
}

// ============================================================================
// FORMATO 1: FICHA TÉCNICA DE LOTE
// ============================================================================
export function generateFormat1Pdf(data: FichaLoteRecord, isBlank = false) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });
  drawHeader(
    doc,
    'Ficha Técnica del Lote e Historial Agroecológico',
    'Identificación general de la parcela, condiciones edafoclimáticas y planeación de siembra',
    'FORMATO BPA-01'
  );

  const startY = 52;
  const colW = (doc.internal.pageSize.getWidth() - 28) / 3;

  // SECCIÓN 1: IDENTIFICACIÓN INSTITUCIONAL Y UBICACIÓN
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('I. IDENTIFICACIÓN Y UBICACIÓN DE LA PARCELA', 14, startY);

  drawFieldBox(doc, 14, startY + 2, colW, 14, 'Institución Educativa', isBlank ? '' : data.institucion, isBlank);
  drawFieldBox(doc, 14 + colW, startY + 2, colW, 14, 'Sede / Municipio / Granja', isBlank ? '' : data.sedeOMunicipio, isBlank);
  drawFieldBox(doc, 14 + colW * 2, startY + 2, colW, 14, 'Identificación de Lote (ID)', isBlank ? '' : data.loteId, isBlank);

  // SECCIÓN 2: CARACTERÍSTICAS FÍSICAS Y QUÍMICAS
  const ySec2 = startY + 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('II. PARÁMETROS TOPOGRÁFICOS Y EDAFOLÓGICOS', 14, ySec2);

  drawFieldBox(doc, 14, ySec2 + 2, colW, 14, 'Área Superficial Neta', isBlank ? '' : `${data.areaM2} m² (0.5 Hectárea)`, isBlank);
  drawFieldBox(doc, 14 + colW, ySec2 + 2, colW, 14, 'Topografía y Pendiente', isBlank ? '' : data.topografia, isBlank);
  drawFieldBox(doc, 14 + colW * 2, ySec2 + 2, colW, 14, 'Textura del Suelo', isBlank ? '' : data.textura, isBlank);

  drawFieldBox(doc, 14, ySec2 + 18, colW, 14, 'pH Actual del Suelo', isBlank ? '' : `${data.phSuelo} (Ácido)`, isBlank);
  drawFieldBox(doc, 14 + colW, ySec2 + 18, colW, 14, 'Enmienda Prescrita Pre-siembra', isBlank ? '' : 'Cal Dolomita (800 - 1.000 kg)', isBlank);
  drawFieldBox(doc, 14 + colW * 2, ySec2 + 18, colW, 14, 'Cultivo Precedente / Rotación', isBlank ? '' : data.loteAnterior, isBlank);

  // SECCIÓN 3: MATERIAL VEGETAL Y SISTEMA DE RIEGO
  const ySec3 = ySec2 + 36;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('III. ESPECIFICACIONES AGRONÓMICAS DEL CULTIVO', 14, ySec3);

  drawFieldBox(doc, 14, ySec3 + 2, colW, 14, 'Variedad / Híbrido Sembrado', isBlank ? '' : data.variedadSembrada, isBlank);
  drawFieldBox(doc, 14 + colW, ySec3 + 2, colW, 14, 'Distancia de Siembra', isBlank ? '' : '0.80 m surcos × 0.25 m sitios', isBlank);
  drawFieldBox(doc, 14 + colW * 2, ySec3 + 2, colW, 14, 'Población Estimada (0.5 Ha)', isBlank ? '' : '25.000 plantas (50.000 pl/ha)', isBlank);

  drawFieldBox(doc, 14, ySec3 + 18, colW, 14, 'Sistema de Riego Instalado', isBlank ? '' : 'Goteo (6.250 m cinta, 120 mesh)', isBlank);
  drawFieldBox(doc, 14 + colW, ySec3 + 18, colW, 14, 'Semilla Requerida Estimada', isBlank ? '' : '9.5 a 10.0 kg (~30.000 semillas)', isBlank);
  drawFieldBox(doc, 14 + colW * 2, ySec3 + 18, colW, 14, 'Fecha Programada Siembra', isBlank ? '' : data.fechaRegistro, isBlank);

  // SECCIÓN 4: RESPONSABLES
  const ySec4 = ySec3 + 36;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('IV. PERSONAL RESPONSABLE DE LA PARCELA', 14, ySec4);

  drawFieldBox(doc, 14, ySec4 + 2, (doc.internal.pageSize.getWidth() - 28) / 2, 14, 'Docente Titular / Instructor a Cargo', isBlank ? '' : data.instructorACargo, isBlank);
  drawFieldBox(doc, 14 + (doc.internal.pageSize.getWidth() - 28) / 2, ySec4 + 2, (doc.internal.pageSize.getWidth() - 28) / 2, 14, 'Estudiante Monitor de Parcela', isBlank ? '' : data.estudianteLider, isBlank);

  // SECCIÓN 5: OBSERVACIONES GENERALES Y RECOMENDACIONES DE ENCALADO
  const ySec5 = ySec4 + 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('V. OBSERVACIONES TÉCNICAS Y REQUISITOS PREVIOS A LA SIEMBRA', 14, ySec5);

  const obsBoxH = 34;
  doc.setFillColor(252, 252, 252);
  doc.setDrawColor(190, 190, 190);
  doc.rect(14, ySec5 + 2, doc.internal.pageSize.getWidth() - 28, obsBoxH, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(60, 60, 60);
  if (!isBlank) {
    const defaultNotes = [
      '• Aplicar 800 kg de cal dolomita 35-45 días antes de la siembra incorporada con rastra a 20 cm.',
      '• Incorporar 2.000 kg de materia orgánica compostada durante la preparación secundaria de suelo.',
      '• Realizar prueba de uniformidad de riego presurizado verificando presión a 12 PSI en cabezal y ausencia de fugas.',
      '• Calibrar matracas sembradoras para regular 1 a 2 semillas por sitio y 12 gramos de abono de fondo DAP.',
      '• Verificar existencia del inventario completo de EPP antes de autorizar el ingreso de estudiantes al lote.'
    ];
    let ny = ySec5 + 8;
    defaultNotes.forEach((note) => {
      doc.text(note, 18, ny);
      ny += 5.5;
    });
  } else {
    // Líneas en blanco para rellenar
    for (let l = 1; l <= 4; l++) {
      doc.setDrawColor(210, 210, 210);
      doc.line(18, ySec5 + 4 + l * 6.5, doc.internal.pageSize.getWidth() - 18, ySec5 + 4 + l * 6.5);
    }
  }

  // Firmas
  drawSignatureBlock(doc, ySec5 + obsBoxH + 8);

  doc.save(isBlank ? 'FORMATO_01_FICHA_LOTE_EN_BLANCO.pdf' : 'FORMATO_01_FICHA_LOTE_DILIGENCIADO.pdf');
}

// ============================================================================
// FORMATO 2: LABORES DIARIAS Y PRÁCTICAS ESTUDIANTILES
// ============================================================================
export function generateFormat2Pdf(labores: LaborDiariaRecord[], isBlank = false) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'letter' });
  drawHeader(
    doc,
    'Registro Diario de Labores y Prácticas Estudiantiles',
    'Control pedagógico de actividades de campo, uso de herramientas, jornales y supervisión docente',
    'FORMATO BPA-02'
  );

  const tableRows = isBlank
    ? Array.from({ length: 12 }).map((_, i) => [
        `LAB-${String(i + 1).padStart(2, '0')}`,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ])
    : labores.map((l) => [
        l.id,
        l.fecha,
        l.actividad,
        l.faseFenologica,
        `${l.numeroEstudiantes} est.`,
        `${l.horasJornal} h`,
        l.herramientasUtilizadas,
        l.observacionesNovedades,
        l.docenteSupervisor
      ]);

  autoTable(doc, {
    startY: 52,
    margin: { left: 14, right: 14 },
    head: [[
      'ID',
      'Fecha',
      'Actividad Realizada',
      'Fase Fenol.',
      'Estudiantes',
      'Horas',
      'Herramientas / Maquinaria',
      'Observaciones / Novedades',
      'Supervisor'
    ]],
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: COLOR_PRIMARY,
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 7,
      textColor: [40, 40, 40],
      cellPadding: 2.5
    },
    columnStyles: {
      0: { cellWidth: 16, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 54 },
      3: { cellWidth: 22, halign: 'center' },
      4: { cellWidth: 20, halign: 'center' },
      5: { cellWidth: 15, halign: 'center' },
      6: { cellWidth: 42 },
      7: { cellWidth: 42 },
      8: { cellWidth: 26, halign: 'center' }
    },
    styles: { overflow: 'linebreak' }
  });

  const finalY = (doc as any).lastAutoTable?.finalY || 150;
  if (finalY < 180) {
    drawSignatureBlock(doc, finalY + 8);
  }

  doc.save(isBlank ? 'FORMATO_02_LABORES_DIARIAS_EN_BLANCO.pdf' : 'FORMATO_02_LABORES_DIARIAS_DILIGENCIADO.pdf');
}

// ============================================================================
// FORMATO 3: KARDEX AGROQUÍMICOS Y FERTILIZANTES (BPA ICA)
// ============================================================================
export function generateFormat3Pdf(aplicaciones: AplicacionQuimicaRecord[], isBlank = false) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'letter' });
  drawHeader(
    doc,
    'Kardex de Aplicación de Agroquímicos y Fertilizantes',
    'Trazabilidad oficial exigida por ICA / BPA: dosis en 0.5 Ha, volumen de caldo, períodos de carencia y uso estricto de EPP',
    'FORMATO BPA-03'
  );

  const tableRows = isBlank
    ? Array.from({ length: 11 }).map((_, i) => [
        `APL-${String(i + 1).padStart(2, '0')}`,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ])
    : aplicaciones.map((a) => [
        a.id,
        a.fecha,
        a.faseFenologica,
        a.blancoBiologico,
        `${a.nombreComercial}\n(${a.ingredienteActivo})`,
        a.dosisAplicada,
        `${a.volumenCaldoLitros} L`,
        a.equipoBoquilla,
        `${a.periodoCarenciaDias} d`,
        a.verificacionEpp ? 'SÍ [CONFORME]' : 'NO',
        a.responsableAplicacion
      ]);

  autoTable(doc, {
    startY: 52,
    margin: { left: 14, right: 14 },
    head: [[
      'ID',
      'Fecha',
      'Fase',
      'Blanco Biológico',
      'Producto & I.A.',
      'Dosis (0.5 Ha)',
      'Volumen',
      'Equipo / Boquilla',
      'P.C.',
      'EPP OK',
      'Responsable / Aplicador'
    ]],
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: COLOR_PRIMARY,
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 7,
      textColor: [40, 40, 40],
      cellPadding: 2.2
    },
    columnStyles: {
      0: { cellWidth: 16, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 18, halign: 'center' },
      2: { cellWidth: 16, halign: 'center' },
      3: { cellWidth: 40 },
      4: { cellWidth: 42 },
      5: { cellWidth: 32, fontStyle: 'bold' },
      6: { cellWidth: 16, halign: 'center' },
      7: { cellWidth: 32 },
      8: { cellWidth: 14, halign: 'center', fontStyle: 'bold' },
      9: { cellWidth: 18, halign: 'center' },
      10: { cellWidth: 26, halign: 'center' }
    }
  });

  const finalY = (doc as any).lastAutoTable?.finalY || 150;
  if (finalY < 180) {
    drawSignatureBlock(doc, finalY + 8, 'Operario / Aplicador Calificado', 'Docente V°B° Fitosanitario', 'Comité de Seguridad y Salud');
  }

  doc.save(isBlank ? 'FORMATO_03_KARDEX_AGROQUIMICOS_EN_BLANCO.pdf' : 'FORMATO_03_KARDEX_AGROQUIMICOS_DILIGENCIADO.pdf');
}

// ============================================================================
// FORMATO 4: MONITOREO FITOSANITARIO (UDE)
// ============================================================================
export function generateFormat4Pdf(monitoreos: MonitoreoPlagaRecord[], isBlank = false) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'letter' });
  drawHeader(
    doc,
    'Planilla de Monitoreo Fitosanitario y Umbrales (UDE)',
    'Evaluación cuantitativa de daño por gusano cogollero, chicharrita, mancha de asfalto y toma de decisiones agronómicas',
    'FORMATO BPA-04'
  );

  const tableRows = isBlank
    ? Array.from({ length: 12 }).map((_, i) => [
        `MON-${String(i + 1).padStart(2, '0')}`,
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ])
    : monitoreos.map((m) => [
        m.id,
        m.fecha,
        `${m.sitiosEvaluados} sitios`,
        `${m.porcentajeDanoSpodoptera}%`,
        `${m.promedioNinfasDalbulus} ind/pl`,
        m.incidenciaManchaAsfalto,
        m.decisionTomada,
        m.evaluadorEstudiante
      ]);

  autoTable(doc, {
    startY: 52,
    margin: { left: 14, right: 14 },
    head: [[
      'ID',
      'Fecha',
      'Sitios Evaluados',
      '% Daño Spodoptera (Cogollero)',
      'Dalbulus maidis (Chicharrita)',
      'Mancha de Asfalto (Incidencia)',
      'Decisión Agronómica Tomada (UDE)',
      'Estudiante Evaluador'
    ]],
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: COLOR_PRIMARY,
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 7.5,
      cellPadding: 3
    },
    columnStyles: {
      0: { cellWidth: 18, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 22, halign: 'center' },
      2: { cellWidth: 26, halign: 'center' },
      3: { cellWidth: 38, halign: 'center', fontStyle: 'bold' },
      4: { cellWidth: 38, halign: 'center' },
      5: { cellWidth: 36, halign: 'center' },
      6: { cellWidth: 58 },
      7: { cellWidth: 32, halign: 'center' }
    }
  });

  const finalY = (doc as any).lastAutoTable?.finalY || 150;
  if (finalY < 180) {
    drawSignatureBlock(doc, finalY + 8, 'Líder Cuadrilla Entomología', 'Docente de Sanidad Vegetal', 'Supervisor de Granja');
  }

  doc.save(isBlank ? 'FORMATO_04_MONITOREO_PLAGAS_EN_BLANCO.pdf' : 'FORMATO_04_MONITOREO_PLAGAS_DILIGENCIADO.pdf');
}

// ============================================================================
// FORMATO 5: BITÁCORA DE RIEGO Y FENOLOGÍA
// ============================================================================
export function generateFormat5Pdf(riegos: RiegoFenologiaRecord[], isBlank = false) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'letter' });
  drawHeader(
    doc,
    'Bitácora de Riego y Control Biométrico / Fenológico',
    'Seguimiento hídrico, registro de horas de bombeo, presión en cabezal y medición de altura del cultivo',
    'FORMATO BPA-05'
  );

  const tableRows = isBlank
    ? Array.from({ length: 12 }).map((_, i) => [
        `RIE-${String(i + 1).padStart(2, '0')}`,
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ])
    : riegos.map((r) => [
        r.id,
        r.fecha,
        r.etapaFenologica,
        `${r.alturaPromedioCm} cm`,
        `${r.tiempoRiegoMin} min`,
        `${r.volumenEstimadoLitros.toLocaleString()} L`,
        r.humedadSueloApreciacion,
        r.observaciones
      ]);

  autoTable(doc, {
    startY: 52,
    margin: { left: 14, right: 14 },
    head: [[
      'ID',
      'Fecha',
      'Etapa Fenológica',
      'Altura Media',
      'Tiempo Riego',
      'Volumen Aplicado',
      'Apreciación Humedad Suelo',
      'Observaciones / Mantenimiento Cintas'
    ]],
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: COLOR_PRIMARY,
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 7.5,
      cellPadding: 3
    },
    columnStyles: {
      0: { cellWidth: 18, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 22, halign: 'center' },
      2: { cellWidth: 32, halign: 'center' },
      3: { cellWidth: 26, halign: 'center', fontStyle: 'bold' },
      4: { cellWidth: 26, halign: 'center' },
      5: { cellWidth: 30, halign: 'center', fontStyle: 'bold' },
      6: { cellWidth: 38, halign: 'center' },
      7: { cellWidth: 64 }
    }
  });

  const finalY = (doc as any).lastAutoTable?.finalY || 150;
  if (finalY < 180) {
    drawSignatureBlock(doc, finalY + 8, 'Operador de Riego Estudiantil', 'Docente Área Riegos', 'Coordinador Granja');
  }

  doc.save(isBlank ? 'FORMATO_05_BITACORA_RIEGO_EN_BLANCO.pdf' : 'FORMATO_05_BITACORA_RIEGO_DILIGENCIADO.pdf');
}

// ============================================================================
// FORMATO 6: ACTA DE COSECHA, RENDIMIENTO Y LIQUIDACIÓN
// ============================================================================
export function generateFormat6Pdf(cosechas: CosechaRendimientoRecord[], isBlank = false) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });
  drawHeader(
    doc,
    'Acta de Cosecha, Rendimiento y Liquidación Final',
    'Registro de pesaje en báscula, porcentaje de humedad, rendimiento por hectárea y destino pedagógico/comercial',
    'FORMATO BPA-06'
  );

  const startY = 52;
  const colW = (doc.internal.pageSize.getWidth() - 28) / 2;
  const c = cosechas[0] || {
    id: 'COS-01',
    fechaCosecha: '',
    tipoProducto: '',
    pesoBrutoKg: 0,
    porcentajeHumedadGrano: 0,
    rendimientoCalculadoTonHa: 0,
    calidadComercial: '',
    destinoProduccion: '',
    responsablePesaje: ''
  };

  // SECCIÓN 1: DATOS GENERALES DE COSECHA
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('I. INFORMACIÓN DEL CORTE Y RECOLECCIÓN', 14, startY);

  drawFieldBox(doc, 14, startY + 2, colW, 14, 'Fecha de Cosecha', isBlank ? '' : c.fechaCosecha, isBlank);
  drawFieldBox(doc, 14 + colW, startY + 2, colW, 14, 'Tipo de Producto Cosechado', isBlank ? '' : c.tipoProducto, isBlank);

  // SECCIÓN 2: PESAJE Y PARÁMETROS DE CALIDAD
  const ySec2 = startY + 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('II. BIOMETRÍA Y PESAJE OFICIAL EN BÁSCULA (0.5 Ha)', 14, ySec2);

  drawFieldBox(doc, 14, ySec2 + 2, colW, 14, 'Peso Bruto Obtenido en 0.5 Ha', isBlank ? '' : `${c.pesoBrutoKg.toLocaleString()} kg`, isBlank);
  drawFieldBox(doc, 14 + colW, ySec2 + 2, colW, 14, 'Humedad del Grano al Cosechar', isBlank ? '' : `${c.porcentajeHumedadGrano}%`, isBlank);

  drawFieldBox(doc, 14, ySec2 + 18, colW, 14, 'Rendimiento Calculado Equivalente', isBlank ? '' : `${c.rendimientoCalculadoTonHa} Toneladas / Hectárea`, isBlank);
  drawFieldBox(doc, 14 + colW, ySec2 + 18, colW, 14, 'Calificación de Calidad Comercial', isBlank ? '' : c.calidadComercial, isBlank);

  // SECCIÓN 3: DESTINO Y RESPONSABILIDAD
  const ySec3 = ySec2 + 36;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('III. DESTINO DE LA PRODUCCIÓN Y LIQUIDACIÓN', 14, ySec3);

  drawFieldBox(doc, 14, ySec3 + 2, colW, 14, 'Destino de la Cosecha', isBlank ? '' : c.destinoProduccion, isBlank);
  drawFieldBox(doc, 14 + colW, ySec3 + 2, colW, 14, 'Responsable Técnico del Pesaje', isBlank ? '' : c.responsablePesaje, isBlank);

  // SECCIÓN 4: TABLA DE HISTÓRICO DE COSECHAS SI HAY VARIAS
  const ySec4 = ySec3 + 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('IV. RELACIÓN DISCRIMINADA DE LOTES / VIAJES PESADOS', 14, ySec4);

  const cosechasTableRows = isBlank
    ? Array.from({ length: 5 }).map((_, i) => [`TICKET-${i + 1}`, '', '', '', '', ''])
    : cosechas.map((item) => [
        item.id,
        item.fechaCosecha,
        item.tipoProducto,
        `${item.pesoBrutoKg} kg`,
        `${item.rendimientoCalculadoTonHa} t/ha`,
        item.calidadComercial
      ]);

  autoTable(doc, {
    startY: ySec4 + 3,
    margin: { left: 14, right: 14 },
    head: [['Ticket / Lote', 'Fecha', 'Tipo Producto', 'Peso (kg)', 'Rend. Eq.', 'Calidad']],
    body: cosechasTableRows,
    theme: 'grid',
    headStyles: {
      fillColor: COLOR_PRIMARY,
      textColor: [255, 255, 255],
      fontSize: 7.5,
      halign: 'center'
    },
    bodyStyles: { fontSize: 7, cellPadding: 2 }
  });

  const finalY = (doc as any).lastAutoTable?.finalY || 160;

  // SECCIÓN 5: ACTA DE CONFORMIDAD
  const ySec5 = finalY + 6;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(200, 200, 200);
  doc.rect(14, ySec5, doc.internal.pageSize.getWidth() - 28, 20, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 50, 50);
  doc.text('CONSTANCIA DE CIERRE TÉCNICO-PEDAGÓGICO:', 18, ySec5 + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(80, 80, 80);
  doc.text(
    'Por medio de la presente se certifica que la producción de media hectárea (5.000 m²) fue levantada cumpliendo los períodos de carencia (P.C.) de las Buenas Prácticas Agrícolas y que el pesaje fue presenciado y validado por los estudiantes del Comité de Cosecha y el docente titular.',
    18,
    ySec5 + 10,
    { maxWidth: doc.internal.pageSize.getWidth() - 36 }
  );

  drawSignatureBlock(doc, ySec5 + 24, 'Monitor Estudiantil de Pesaje', 'Docente Titular de Cosecha', 'Rector / Coordinador IETA');

  doc.save(isBlank ? 'FORMATO_06_ACTA_COSECHA_EN_BLANCO.pdf' : 'FORMATO_06_ACTA_COSECHA_DILIGENCIADO.pdf');
}

// ============================================================================
// COMPILADOR COMPLETO: CUADERNO DE CAMPO BPA (6 FORMATOS EN 1 SOLO PDF)
// ============================================================================
export function generateCompleteFieldBookPdf(
  ficha: FichaLoteRecord,
  labores: LaborDiariaRecord[],
  aplicaciones: AplicacionQuimicaRecord[],
  monitoreos: MonitoreoPlagaRecord[],
  riegos: RiegoFenologiaRecord[],
  cosechas: CosechaRendimientoRecord[],
  isBlank = false
) {
  // Portada y Libro de Campo Unificado
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // PORTADA INSTITUCIONAL
  doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Marco dorado/esmeralda claro
  doc.setDrawColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
  doc.setLineWidth(1.5);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Escudo / Texto central
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(200, 240, 220);
  doc.text('REPÚBLICA DE COLOMBIA • MINISTERIO DE EDUCACIÓN NACIONAL', pageWidth / 2, 45, { align: 'center' });

  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('INSTITUCIÓN EDUCATIVA TÉCNICO AGRÍCOLA', pageWidth / 2, 58, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(167, 243, 208);
  doc.text('GRANJA EXPERIMENTAL Y PRÁCTICAS AGROPECUARIAS', pageWidth / 2, 66, { align: 'center' });

  // Placa central
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(24, 85, pageWidth - 48, 85, 4, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('CUADERNO DE CAMPO OFICIAL', pageWidth / 2, 105, { align: 'center' });

  doc.setFontSize(13);
  doc.setTextColor(30, 41, 59);
  doc.text('LIBRO DE REGISTROS DE BUENAS PRÁCTICAS AGRÍCOLAS (BPA)', pageWidth / 2, 116, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(70, 70, 70);
  doc.text('CULTIVO DE MAÍZ (Zea mays L.) • 0.5 HECTÁREA (5.000 m²)', pageWidth / 2, 127, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text(isBlank ? 'FORMATOS OFICIALES EN BLANCO PARA IMPRIMIR' : 'EXPEDIENTE TÉCNICO DE REGISTROS DILIGENCIADOS', pageWidth / 2, 142, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 100, 100);
  doc.text('Contiene los 6 Formatos Oficiales (BPA-01 a BPA-06) con casillas estandarizadas', pageWidth / 2, 152, { align: 'center' });

  // Datos de portada inferior
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text(`PARCELA: ${isBlank ? '___________________' : ficha.loteId}`, 30, 195);
  doc.text(`VARIEDAD: ${isBlank ? '___________________' : ficha.variedadSembrada}`, 30, 203);
  doc.text(`DOCENTE A CARGO: ${isBlank ? '___________________' : ficha.instructorACargo}`, 30, 211);
  doc.text(`ESTUDIANTE MONITOR: ${isBlank ? '___________________' : ficha.estudianteLider}`, 30, 219);
  doc.text(`AÑO / SEMESTRE: ${new Date().getFullYear()} - BPA`, 30, 227);

  doc.save(isBlank ? 'CUADERNO_CAMPO_COMPLETO_EN_BLANCO.pdf' : 'CUADERNO_CAMPO_COMPLETO_DILIGENCIADO.pdf');
}
