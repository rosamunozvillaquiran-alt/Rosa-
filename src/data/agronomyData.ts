import {
  VarietyRecommendation,
  SoilAmendmentPlan,
  IrrigationDesign,
  FertilizationDose,
  PhytosanitaryProblem,
  WeedControlActivity,
  PhenologicalStage,
  EquipmentToolItem,
  PpeItem,
  FichaLoteRecord,
  LaborDiariaRecord,
  AplicacionQuimicaRecord,
  MonitoreoPlagaRecord,
  RiegoFenologiaRecord,
  CosechaRendimientoRecord
} from '../types/agronomy';

export const VARIEDADES_RECOMENDADAS: VarietyRecommendation[] = [
  {
    nombre: 'ICA V-305 (Variedad Mejorada de Polinización Abierta)',
    tipo: 'Variedad Mejorada (VPA)',
    pisoTermico: 'Cálido y Medio (0 a 1.200 msnm, Temp: 24 - 32°C)',
    cicloDias: '115 - 125 días (Choclo: 75-80 d; Grano seco: 120 d)',
    rendimientoEsperadoTonHa: '5.5 - 6.5 t/ha',
    rendimiento05Ha: '2.75 - 3.25 toneladas / 0.5 ha',
    caracteristicas: [
      'Grano amarillo semicristalino de excelente aceptación en mercados locales y consumo animal/humano',
      'Alta rusticidad y tolerancia a estrés hídrico moderado',
      'Menor costo de adquisición de semilla certificada respecto a híbridos comerciales importados',
      'Pedagógicamente ideal: permite enseñar selección masal y conservación de semillas a los estudiantes'
    ],
    justificacionPedagogica:
      'Recomendada como primera opción formativa en colegios agropecuarios por su relación costo-beneficio, fácil manejo agronómico y capacidad de adaptación sin requerir fertilizaciones hiper-intensivas.'
  },
  {
    nombre: 'Híbrido Dekalb DK-7088 / Pioneer P30F35',
    tipo: 'Híbrido Comercial',
    pisoTermico: 'Cálido y Valle Interandino (0 a 1.000 msnm, Temp: 25 - 34°C)',
    cicloDias: '120 - 130 días a cosecha de grano',
    rendimientoEsperadoTonHa: '8.5 - 11.0 t/ha',
    rendimiento05Ha: '4.25 - 5.50 toneladas / 0.5 ha',
    caracteristicas: [
      'Potencial de rendimiento superior con arquitectura de hojas erectas (alta eficiencia fotosintética)',
      'Excelente sanidad de tusa y tolerancia a complejo de mancha de asfalto (Phyllachora maydis)',
      'Tallo grueso y fuerte sistema radicular resistente al acame por vientos fuertes',
      'Exige fertilización rigurosa balanceada y riego oportuno para expresar su potencial genético'
    ],
    justificacionPedagogica:
      'Ideal para proyectos productivos pedagógicos con enfoque comercial de alta rentabilidad y enseñanza de paquetes tecnológicos de agricultura tecnificada.'
  },
  {
    nombre: 'ICA V-109 / Híbrido Regional Andino Blanco',
    tipo: 'Variedad Mejorada (VPA)',
    pisoTermico: 'Templado a Frío Moderado (1.200 a 1.900 msnm, Temp: 18 - 23°C)',
    cicloDias: '145 - 160 días (ciclo más largo por menor acumulación térmica)',
    rendimientoEsperadoTonHa: '5.0 - 6.0 t/ha',
    rendimiento05Ha: '2.50 - 3.00 toneladas / 0.5 ha',
    caracteristicas: [
      'Grano blanco harinoso o semidentado con alto valor gastronómico (arepas, masato, choclo tierno)',
      'Buena tolerancia a tizón foliar (Exserohilum turcicum) frecuente en ambientes húmedos de ladera',
      'Excelente biomasa forrajera residual para proyectos pecuarios de la institución (bovinos/ovinos)'
    ],
    justificacionPedagogica:
      'Recomendada si la institución educativa está ubicada en zonas de vertiente o cordillera por encima de 1.200 msnm.'
  }
];

export const ENMIENDAS_SUELO: SoilAmendmentPlan[] = [
  {
    tipo: 'Cal Dolomita Agrícola (CaCO₃ 55% + MgCO₃ 35%)',
    composicionQuimica: 'Calcio (CaO: ~32%), Magnesio (MgO: ~18%), PRNT 80-85%',
    dosisHectarea: '1.500 a 2.000 kg / ha',
    dosis05Ha: '750 a 1.000 kg (15 a 20 bultos de 50 kg) para 0.5 ha',
    momentoAplicacion: '30 a 45 días antes de la siembra (pre-arado)',
    metodoAplicacion: 'Al voleo uniforme sobre el terreno seco, e incorporación inmediata con rastra o azadón a 15-20 cm.',
    objetivoAgronomico:
      'Neutralizar la acidez intercambiable (Al³⁺ y H⁺), elevar pH de 5.0 a 6.0-6.2, desbloquear la asimilación del fósforo y aportar calcio y magnesio indispensables para la pared celular del maíz.'
  },
  {
    tipo: 'Materia Orgánica Compostada (Compost maduro o Lombriabono)',
    composicionQuimica: 'Materia Orgánica > 40%, C/N 12-16, N-P-K orgánico residual, flora microbiana benéfica',
    dosisHectarea: '3.000 a 5.000 kg / ha',
    dosis05Ha: '1.500 a 2.500 kg (30 a 50 bultos de 50 kg) para 0.5 ha',
    momentoAplicacion: '15 a 20 días antes de la siembra, durante la preparación secundaria',
    metodoAplicacion: 'Esparcido en el lote o localizado en el fondo del surco de siembra.',
    objetivoAgronomico:
      'Mejorar la estructura física del suelo (aireación y retención de humedad), incrementar la Capacidad de Intercambio Catiónico (CIC) y potenciar la actividad biológica de micorrizas nativas.'
  },
  {
    tipo: 'Yeso Agrícola (Sulfato de Calcio CaSO₄·2H₂O) - Condicional',
    composicionQuimica: 'Calcio (CaO: ~28%), Azufre (S: ~18%)',
    dosisHectarea: '400 a 600 kg / ha (si se detecta compactación subsuperficial o déficit de azufre sin acidez extrema)',
    dosis05Ha: '200 a 300 kg (4 a 6 bultos de 50 kg) para 0.5 ha',
    momentoAplicacion: 'Junto con la cal dolomita (30 días pre-siembra)',
    metodoAplicacion: 'Al voleo e incorporado superficialmente.',
    objetivoAgronomico:
      'Aporte de azufre asimilable sin alterar bruscamente el pH y descompactación de capas endurecidas gracias a la floculación de arcillas.'
  }
];

export const DISENO_RIEGO: IrrigationDesign = {
  sistema: 'Riego por Goteo Superficial de Alta Eficiencia (92 - 95%)',
  especificacionesTecnicas: {
    longitudSurcos: '100 metros lineales (asumiendo parcela rectangular de 50 m de frente x 100 m de fondo = 5.000 m²)',
    numeroSurcos: '62 a 63 surcos espaciados a 0.80 m',
    espaciamientoGoteros: '0.20 m (20 cm) o 0.30 m entre emisores integrados',
    caudalGotero: '1.20 a 1.60 Litros / hora a 1.0 bar (14.5 PSI)',
    metrosCintaTotal: '6.250 a 6.300 metros lineales de cinta calibre 6 u 8 mil',
    presionOperacion: '10 a 15 PSI (0.7 a 1.0 bar) regulada en cabezal',
    filtradoRequerido: 'Filtro de anillas o malla de 120 mesh (130 micras) de 2 pulgadas para evitar obturación por sedimentos'
  },
  requerimientoHidrico: [
    {
      fase: 'Siembra a Emergencia (V0 - VE / 0 - 8 DDS)',
      kc: 0.35,
      laminaDiariaMm: '1.8 - 2.2 mm / día (9 - 11 m³ en 0.5 ha)',
      tiempoRiegoMin: '45 - 60 minutos',
      frecuencia: 'Diario hasta emergencia plena, luego cada 2 días'
    },
    {
      fase: 'Desarrollo Vegetativo Rápido (V4 - V8 / 20 - 45 DDS)',
      kc: 0.75,
      laminaDiariaMm: '3.5 - 4.2 mm / día (17.5 - 21 m³ en 0.5 ha)',
      tiempoRiegoMin: '90 - 120 minutos',
      frecuencia: 'Cada 2 a 3 días según humedad de suelo'
    },
    {
      fase: 'Floración y Llenado Inicial (VT - R2 / 50 - 80 DDS) [CRÍTICO]',
      kc: 1.20,
      laminaDiariaMm: '5.5 - 6.5 mm / día (27.5 - 32.5 m³ en 0.5 ha)',
      tiempoRiegoMin: '150 - 180 minutos (o 2 pulsos diarios de 90 min)',
      frecuencia: 'Cada 2 días estrictamente (el estrés hídrico en VT causa aborto floral)'
    },
    {
      fase: 'Maduración y Secado (R4 - R6 / 90 - 125 DDS)',
      kc: 0.60,
      laminaDiariaMm: '2.5 - 3.0 mm / día (12.5 - 15 m³ en 0.5 ha)',
      tiempoRiegoMin: '60 - 75 minutos',
      frecuencia: 'Cada 4 a 5 días; suspender 15 días antes de cosecha de grano seco'
    }
  ],
  alternativaGravedad:
    'Riego por Gravedad en Surcos con Pendiente (0.2 - 0.5%): Si la institución no cuenta con sistema presurizado, trazar surcos rectos en contorno o a nivel, con longitud máxima de 50-60 metros para evitar erosión hídrica, alimentados por acequia principal impermeabilizada o tubería de compuertas móviles, aplicando sifones de manguera de 1 pulgada para regular el caudal por surco.'
};

export const PLAN_FERTILIZACION: FertilizationDose[] = [
  {
    etapa: 'Siembra (Arranque / Fondo)',
    diasDDS: '0 DDS (Al momento de sembrar)',
    fuenteComercial: 'DAP (18-46-0) + KCl (0-0-60) + K-Mag (Sulfato doble de K y Mg 0-0-22-18MgO-22S) + Sulfato de Zinc',
    gradoNpk: 'Fórmula compuesta dirigida',
    cantidad05HaKg: 135,
    bultos50Kg: 'DAP: 75 kg (1.5 bultos) | KCl: 30 kg (0.6 bultos) | K-Mag: 25 kg (0.5 bultos) | ZnSO₄: 5 kg',
    aporteNutricional: 'N: 13.5 kg | P₂O₅: 34.5 kg | K₂O: 23.5 kg | MgO: 4.5 kg | S: 6.5 kg | Zn: 1.8 kg',
    metodoAplicacion:
      'Localizado en banda lateral a 5-7 cm al lado y 5 cm por debajo de la semilla (NUNCA en contacto directo con la semilla para evitar quemado por salinidad del fertilizante).'
  },
  {
    etapa: 'Primer Aporque / V4 - V6 (Crecimiento Vegetativo)',
    diasDDS: '25 - 30 DDS (Planta con 4 a 6 hojas expandidas)',
    fuenteComercial: 'Urea Perlada (46-0-0) + KCl (0-0-60)',
    gradoNpk: 'Nitrógeno + Potasio de recarga',
    cantidad05HaKg: 95,
    bultos50Kg: 'Urea: 65 kg (1.3 bultos) | KCl: 30 kg (0.6 bultos)',
    aporteNutricional: 'N: 30 kg | K₂O: 18 kg',
    metodoAplicacion:
      'Edáfico en banda sobre el lomo del surco antes de la labor de aporque, con suelo a capacidad de campo (humedecido). Tapar inmediatamente con tierra para minimizar pérdidas por volatilización amoniacal.'
  },
  {
    etapa: 'Segundo Abonado / V8 - V10 (Diferenciación de Mazorca)',
    diasDDS: '42 - 48 DDS (Planta con 8 a 10 hojas, entrenudos elongando)',
    fuenteComercial: 'Urea Perlada (46-0-0) o Nitrato de Amonio Cálcico (CAN 27%) + Foliar Boro/Zinc',
    gradoNpk: 'Nitrógeno terminal + Micronutrientes',
    cantidad05HaKg: 65,
    bultos50Kg: 'Urea: 60 kg (1.2 bultos) | Foliar Boro-Zinc: 1 Litro comercial en 200 L de caldo',
    aporteNutricional: 'N: 27.6 kg | Boro foliar: 150 g | Zinc foliar: 200 g',
    metodoAplicacion:
      'Urea edáfica aplicada al hilo del surco e incorporada con riego. La aspersión foliar de Boro y Zinc se realiza a primera hora de la mañana para asegurar la viabilidad del polen en floración.'
  }
];

export const PROBLEMAS_FITOSANITARIOS: PhytosanitaryProblem[] = [
  {
    id: 'spodoptera',
    nombreComun: 'Gusano Cogollero del Maíz',
    nombreCientifico: 'Spodoptera frugiperda (Lepidoptera: Noctuidae)',
    tipo: 'Plaga',
    sintomasDano:
      'Raspado inicial en ventanas foliares (V1-V2); perforaciones irregulares en hojas jóvenes y cogollo masticado con abundante aserrín/excremento húmedo característico (V3-V8), que destruye el meristemo apical si no se controla.',
    umbralDanoEconomico:
      '20% de plantas con daño fresco (escala Davis 1-3) en V1-V3; 10% de plantas infestadas activas en V4-V6.',
    controlCulturalBiologico:
      'Liberación de parasitoides Trichogramma pretiosum (50 pulgadas/ha -> 25 pulgadas en 0.5 ha); aspersión de Bacillus thuringiensis var. kurstaki (Bt) a 250 g en 0.5 ha; uso de trampas de feromona sexual (2 trampas en 0.5 ha).',
    ingredienteActivoQuimico: 'Emamectina Benzoato 5% SG o Clorantraniliprole 20% SC',
    productoComercialReferencia: 'Proclaim 5 SG o Coragen 20 SC',
    dosisPorHectarea: 'Emamectina: 150-200 g/ha | Clorantraniliprole: 100-120 ml/ha',
    dosisPara05Ha: 'Emamectina: 75 a 100 g en 0.5 ha | Clorantraniliprole: 50 a 60 ml en 0.5 ha',
    volumenAguaRecomendado: '100 a 120 litros de agua (5 a 6 canecas/bombas de 20 L) con boquilla dirigida al cogollo.',
    periodoCarenciaDias: 14,
    periodoReingresoHoras: 12,
    categoriaToxicologica: 'III (Azul)',
    boquillaRecomendada: 'Cono sólido o cono hueco dirigida perpendicularmente al verticilo (cogollo).'
  },
  {
    id: 'dalbulus',
    nombreComun: 'Chicharrita del Maíz (Vector de Achaparramiento)',
    nombreCientifico: 'Dalbulus maidis (Hemiptera: Cicadellidae)',
    tipo: 'Plaga',
    sintomasDano:
      'Succión de savia y transmisión de Spiroplasma kunkelii, fitoplasma del maíz y virus del rayado fino. Ocasiona enrojecimiento foliar, acortamiento de entrenudos, esterilidad de espigas y multiespigamiento estéril.',
    umbralDanoEconomico:
      'Presencia de 1 a 2 adultos por cogollo entre V1 y V6 (etapa más susceptible a infección sistémica).',
    controlCulturalBiologico:
      'Eliminación de maíz guacho/voluntario; siembras concentradas en la misma época; hongos entomopatógenos como Beauveria bassiana (1.0 kg/ha -> 500 g en 0.5 ha); trampas cromáticas amarillas perimetrales.',
    ingredienteActivoQuimico: 'Tiametoxam 35% FS (tratamiento de semilla) + Acetamiprid 20% SP (aspersión)',
    productoComercialReferencia: 'Cruiser 350 FS (semilla) / Epik 20 SP (foliar)',
    dosisPorHectarea: 'Acetamiprid: 150-200 g/ha foliar',
    dosisPara05Ha: 'Acetamiprid: 75 a 100 g en 0.5 ha (disuelto en 100 L de agua)',
    volumenAguaRecomendado: '100 litros de caldo',
    periodoCarenciaDias: 14,
    periodoReingresoHoras: 24,
    categoriaToxicologica: 'III (Azul)',
    boquillaRecomendada: 'Cono hueco TX-VK para máxima cobertura de follaje tierno.'
  },
  {
    id: 'agrotis',
    nombreComun: 'Gusano Trozador o Tierrero',
    nombreCientifico: 'Agrotis ipsilon / Feltia subterranea',
    tipo: 'Plaga',
    sintomasDano:
      'Corta las plántulas a ras del suelo durante las noches en fases VE a V2. Durante el día se oculta en los primeros 3 cm del suelo cerca de las plántulas derribadas.',
    umbralDanoEconomico: '3 a 5% de plántulas cortadas o 1 larva por cada 20 metros lineales de surco.',
    controlCulturalBiologico:
      'Buena preparación del suelo para exponer pupas a la radiación y pájaros; cebos tóxicos con afrecho de maíz + melaza + Bt o Clorpirifos formulado.',
    ingredienteActivoQuimico: 'Cipermetrina 20% EC o Clorpirifos 48% EC en cebo/drench',
    productoComercialReferencia: 'Arrivo 200 EC / Lorsban 4 EC',
    dosisPorHectarea: 'Cipermetrina: 250 - 300 ml/ha al cuello de planta',
    dosisPara05Ha: 'Cipermetrina: 125 a 150 ml en 0.5 ha',
    volumenAguaRecomendado: '120 litros dirigidos a la base del tallo en horas del atardecer (hábito nocturno)',
    periodoCarenciaDias: 21,
    periodoReingresoHoras: 24,
    categoriaToxicologica: 'II (Amarillo)',
    boquillaRecomendada: 'Abanico plano orientada al cuello de la plántula.'
  },
  {
    id: 'helicoverpa',
    nombreComun: 'Gusano de la Mazorca / Elotero',
    nombreCientifico: 'Helicoverpa zea (Lepidoptera: Noctuidae)',
    tipo: 'Plaga',
    sintomasDano:
      'Penetra por los estigmas (barbas) en R1; consume los granos en desarrollo en la punta de la mazorca y genera galerías con excremento que facilitan la entrada de hongos como Fusarium.',
    umbralDanoEconomico: 'Presencia de huevos o larvas recién eclosionadas en el 5-8% de los estigmas frescos.',
    controlCulturalBiologico:
      'Variedades con tusa bien cerrada y envolvente; aplicaciones dirigidas de Bacillus thuringiensis en emergencia de barbas.',
    ingredienteActivoQuimico: 'Clorantraniliprole 20% SC o Espinetoram 12% SC',
    productoComercialReferencia: 'Coragen / Delegate',
    dosisPorHectarea: 'Clorantraniliprole: 100 ml/ha | Espinetoram: 100 ml/ha',
    dosisPara05Ha: '50 ml en 0.5 ha aplicado directamente a las mazorcas',
    volumenAguaRecomendado: '120 litros de agua en fase R1',
    periodoCarenciaDias: 7,
    periodoReingresoHoras: 12,
    categoriaToxicologica: 'IV (Verde)',
    boquillaRecomendada: 'Cono hueco fino orientada a la zona de fructificación.'
  },
  {
    id: 'mancha_asfalto',
    nombreComun: 'Complejo Mancha de Asfalto',
    nombreCientifico: 'Phyllachora maydis + Monographella maydis + Coniothyrium phyllachorae',
    tipo: 'Enfermedad',
    sintomasDano:
      'Pústulas o estromas negros elevados y brillantes (parecen gotas de alquitrán o asfalto) rodeados posteriormente de halos necróticos (ojo de pescado). Causa senescencia foliar acelerada, secado prematuro y pérdida de hasta el 80% del grano.',
    umbralDanoEconomico:
      'Presencia de las primeras pústulas en las hojas inferiores o en la hoja de la mazorca en pre-floración (V10 a VT) con clima lluvioso (alta humedad relativa > 85% y temperaturas de 18-24°C).',
    controlCulturalBiologico:
      'Uso de híbridos con tolerancia genética; densidad de siembra moderada que facilite aireación; desinfección de residuos de cosecha con Trichoderma harzianum.',
    ingredienteActivoQuimico: 'Azoxystrobin (20%) + Difenoconazole (12.5%) o Pyraclostrobin + Epoxiconazole',
    productoComercialReferencia: 'Amistar Top 325 SC o Opera 18.3 SE',
    dosisPorHectarea: 'Amistar Top: 300 - 400 ml/ha',
    dosisPara05Ha: 'Amistar Top: 150 a 200 ml en 0.5 ha',
    volumenAguaRecomendado: '120 a 150 litros de agua (6 a 7 bombas de 20 L)',
    periodoCarenciaDias: 21,
    periodoReingresoHoras: 24,
    categoriaToxicologica: 'III (Azul)',
    boquillaRecomendada: 'Doble abanico plano o cono hueco de gota media a fina para penetración en dosel.'
  },
  {
    id: 'tizon_foliar',
    nombreComun: 'Tizón Foliar del Maíz',
    nombreCientifico: 'Exserohilum turcicum (Bipolaris maydis)',
    tipo: 'Enfermedad',
    sintomasDano:
      'Lesiones alargadas elípticas de color verde grisáceo a pardo pajizo (aspecto de quemadura de cigarro), de 2 a 15 cm de largo paralelas a las nervaduras.',
    umbralDanoEconomico: 'Aparición de lesiones activas en hojas intermedias antes de la emisión de la espiga (V8-V10).',
    controlCulturalBiologico: 'Rotación con leguminosas (fríjol, caupí), eliminación de rastrojos infestados.',
    ingredienteActivoQuimico: 'Mancozeb 80% WP (preventivo) o Difenoconazole 25% EC (curativo)',
    productoComercialReferencia: 'Dithane M-45 / Score 250 EC',
    dosisPorHectarea: 'Mancozeb: 1.5 - 2.0 kg/ha | Difenoconazole: 300 ml/ha',
    dosisPara05Ha: 'Mancozeb: 750 g a 1.0 kg en 0.5 ha | Difenoconazole: 150 ml en 0.5 ha',
    volumenAguaRecomendado: '120 litros de agua',
    periodoCarenciaDias: 14,
    periodoReingresoHoras: 24,
    categoriaToxicologica: 'III (Azul)',
    boquillaRecomendada: 'Cono hueco.'
  },
  {
    id: 'pudricion_tallo_mazorca',
    nombreComun: 'Pudrición de Tallo y Mazorca por Fusarium',
    nombreCientifico: 'Fusarium moniliforme / Fusarium graminearum',
    tipo: 'Enfermedad',
    sintomasDano:
      'Pudrición blanda o seca en la base de entrenudos con médula desintegrada de color rosado o salmón; mazorcas con micelio algodonoso rosado/blanquecino sobre los granos; riesgo de producción de micotoxinas (fumonisinas).',
    umbralDanoEconomico: 'Preventivo. Se combate evitando daño de barrenadores e insectos plaga.',
    controlCulturalBiologico:
      'Tratamiento curativo preventivo de semilla con cepas nativas de Trichoderma viride o harzianum (5 g/kg de semilla); evitar desbalances por exceso de nitrógeno y déficit de potasio.',
    ingredienteActivoQuimico: 'Fludioxonil + Metalaxyl-M (curado de semilla)',
    productoComercialReferencia: 'Maxim XL',
    dosisPorHectarea: '100 ml por cada 100 kg de semilla',
    dosisPara05Ha: '10 a 12 ml para los 10 kg de semilla requeridos en 0.5 ha',
    volumenAguaRecomendado: 'Slurry de 50 ml de agua para adherir a la semilla en trompo o bolsa sellada.',
    periodoCarenciaDias: 0,
    periodoReingresoHoras: 0,
    categoriaToxicologica: 'IV (Verde)',
    boquillaRecomendada: 'Tratamiento cerrado mecánico de semilla previo a siembra.'
  }
];

export const MANEJO_ARVENSES: WeedControlActivity[] = [
  {
    etapaCultivo: 'Pre-siembra / Barbecho limpio',
    diasDDS: '10 a 15 días antes de siembra',
    tipoControl: 'Mecánico / Manual',
    herbicidaOpcion: 'Control cultural o químico no residual si hay colchón denso',
    ingredienteActivo: 'Desbroce con guadañadora o Glifosato si amerita lote degradado',
    dosis05Ha: 'Mecánico con guadaña o Glifosato 480: 1.0 L en 0.5 ha (solo en caso extremo)',
    malezasObjetivo: 'Pasto guinea (Panicum maximum), gramalote, malezas leñosas',
    observacionesBpa:
      'Dejar el material vegetal cortado como mulch para proteger el suelo de erosión e incorporar nutrientes.'
  },
  {
    etapaCultivo: 'Pre-emergencia del cultivo y malezas',
    diasDDS: '0 a 2 DDS (Inmediatamente después de la siembra con suelo húmedo)',
    tipoControl: 'Químico Pre-emergente',
    herbicidaOpcion: 'Atrazina 500 SC + S-Metolacloro 960 EC o Pendimetalina',
    ingredienteActivo: 'Atrazina (500 g/L) + S-Metolacloro (960 g/L) [Mezcla sinérgica de amplio espectro]',
    dosis05Ha: 'Atrazina: 1.0 a 1.25 L + S-Metolacloro: 0.6 a 0.75 L en 100-120 L de agua para 0.5 ha',
    malezasObjetivo:
      'Gramíneas anuales (Echinochloa, Digitaria, Eleusine indica) y malezas de hoja ancha (Amaranthus, Portulaca, Bidens pilosa).',
    observacionesBpa:
      '¡Condición estricta BPA!: El suelo debe estar húmedo a capacidad de campo tras riego o lluvia para activar la película herbicida en los primeros 3 cm. Boquilla de abanico plano tipo TeeJet 8003 o 11003.'
  },
  {
    etapaCultivo: 'Post-emergencia Temprana (V3 - V4 / Período Crítico)',
    diasDDS: '18 a 22 DDS (Malezas con 2 a 4 hojas verdaderas)',
    tipoControl: 'Químico Post-emergente',
    herbicidaOpcion: 'Nicosulfuron 40 SC o Halosulfuron-metil 75 WG (específico si hay coquito)',
    ingredienteActivo: 'Nicosulfuron (40 g/L) selectivo al maíz',
    dosis05Ha: '350 a 450 ml en 0.5 ha (mezclado con surfactante no iónico 100 ml en 100 L de caldo)',
    malezasObjetivo: 'Gramíneas escapadas (Rottboellia cochinchinensis, Sorghum halepense) y ciperáceas tiernas.',
    observacionesBpa:
      'No aplicar si se utilizó insecticida organofosforado en la siembra (antagonismo fitotóxico). Aplicar con sol radiante y maleza en activo crecimiento.'
  },
  {
    etapaCultivo: 'Post-emergencia Media / Aporque (V6 - V8)',
    diasDDS: '30 a 35 DDS',
    tipoControl: 'Mecánico / Manual',
    herbicidaOpcion: 'Limpia manual con azadón y aporque con tierra al cuello de la planta',
    ingredienteActivo: 'Labor física manual / tracción animal con cultivadora',
    dosis05Ha: '4 a 5 jornales pedagógicos de estudiantes y operario',
    malezasObjetivo: 'Todo tipo de rebrote en las calles del cultivo.',
    observacionesBpa:
      'El aporque cubre y asfixia las malezas que nacen en la línea de goteo, genera raíces adventicias de sostén y evita encharcamientos. A partir de aquí el follaje del maíz cierra el dosel e impide la luz solar a nuevas malezas.'
  },
  {
    etapaCultivo: 'Cierre de Dosel hasta Cosecha (V10 a R6)',
    diasDDS: '45 DDS en adelante',
    tipoControl: 'Cultural (Dosel)',
    herbicidaOpcion: 'Sombreado natural por densidad poblacional óptima (50.000 a 62.500 plantas/ha)',
    ingredienteActivo: 'Interceptación del 90-95% de la radiación fotosintéticamente activa (PAR)',
    dosis05Ha: 'Cero químicos necesarios',
    malezasObjetivo: 'Inhibición biológica del banco de semillas del suelo.',
    observacionesBpa:
      'Si aparecen malezas trepadoras como Ipomoea spp. (batatilla), realizar desyerbe puntual a mano antes de que enreden las espigas y mazorcas.'
  }
];

export const FASES_FENOLOGICAS: PhenologicalStage[] = [
  {
    codigo: 'VE',
    nombre: 'Emergencia del Coleóptilo',
    diasAproximados: '4 a 7 DDS',
    descripcionVisual: 'El coleóptilo rompe la superficie del suelo y la primera hoja redondeada se despliega.',
    laboresClave: [
      'Conteo de germinación en 5 estaciones de 10 metros lineales para calcular % de emergencia',
      'Monitoreo inmediato de gusano trozador (Agrotis) y pájaros',
      'Resiembra manual de sitios fallidos (no superar el día 8 DDS para mantener uniformidad)'
    ],
    nivelRiesgoEstres: 'Medio'
  },
  {
    codigo: 'V1 - V3',
    nombre: 'Primeras Hojas Expandidas / Collar Visible',
    diasAproximados: '10 a 16 DDS',
    descripcionVisual: '1 a 3 hojas con cuello/collar visible. El sistema radicular seminal da paso a las raíces nodales.',
    laboresClave: [
      'Raleo o desahije manual a 1 sola plántula vigorosa por sitio a los 12-14 DDS',
      'Monitoreo inicial de raspado de hojas por Spodoptera frugiperda',
      'Aplicación de herbicida post-emergente si no se usó pre-emergente'
    ],
    nivelRiesgoEstres: 'Medio'
  },
  {
    codigo: 'V4 - V6',
    nombre: 'Iniciación Floral Subterránea y Raíces Nodales',
    diasAproximados: '20 a 30 DDS',
    descripcionVisual: 'Punto de crecimiento se eleva sobre el suelo. Se define el número potencial de hileras de granos en la mazorca.',
    laboresClave: [
      'Primera fertilización nitrogenada (Urea) + Potasio (KCl) al fondo del surco',
      'Monitoreo estricto de chicharrita (Dalbulus maidis) y cogollero',
      'Riego frecuente sin permitir déficit de agua'
    ],
    nivelRiesgoEstres: 'Crítico'
  },
  {
    codigo: 'V7 - V9',
    nombre: 'Elongación Rápida de Entrenudos y Aporque',
    diasAproximados: '32 a 42 DDS',
    descripcionVisual: 'Tallo se engruesa notablemente. Raíces de anclaje (adventicias) emergen de los primeros nudos aéreos.',
    laboresClave: [
      'Labor de aporque con azadón o cultivadora para tapar raíces adventicias y anclar la planta',
      'Segundo abonado nitrogenado y aplicación foliar de Boro y Zinc',
      'Eliminación manual de malezas trepadoras (Ipomoea)'
    ],
    nivelRiesgoEstres: 'Medio'
  },
  {
    codigo: 'V10 - V14',
    nombre: 'Desarrollo del Verticilo y Mazorca Incipiente',
    diasAproximados: '44 a 52 DDS',
    descripcionVisual: 'Tasa de absorción de agua y nutrientes máxima (2-3 kg N/ha/día). Espiga masculina en desarrollo interno.',
    laboresClave: [
      'Monitoreo preventivo del complejo mancha de asfalto (Phyllachora) en hojas bajeras',
      'Revisión y mantenimiento de cintas de goteo para evitar goteros tapados',
      'Garantizar riego con lámina de reposición completa'
    ],
    nivelRiesgoEstres: 'Crítico'
  },
  {
    codigo: 'VT / R1',
    nombre: 'Espigamiento (VT) y Emisión de Estigmas / Floración (R1)',
    diasAproximados: '55 a 68 DDS',
    descripcionVisual: 'Última rama de la espiga visible. Liberación masiva de polen y emisión de barbas (estigmas húmedos y receptivos).',
    laboresClave: [
      '¡ETAPA MÁS SENSIBLE A ESTRÉS HÍDRICO!: 1 día de sequía reduce 5-7% el rendimiento final',
      'Monitoreo de gusano elotero (Helicoverpa zea) en barbas tiernas',
      'Inspección sanitaria foliar; fungicida preventivo-curativo si hay presión de hongos'
    ],
    nivelRiesgoEstres: 'Crítico'
  },
  {
    codigo: 'R2 - R3',
    nombre: 'Grano en Ampolla (R2) y Grano Lechoso / Choclo (R3)',
    diasAproximados: '70 a 85 DDS',
    descripcionVisual: 'Granos blancos acuosos que pasan a acumular almidón líquido dulce lechoso al presionarlos. Barbas se vuelven pardas.',
    laboresClave: [
      'Punto óptimo para cosecha de MAÍZ CHOCLO / ELOTE (si el destino comercial es mazorca tierna)',
      'Protección contra pájaros y roedores con espantapájaros pedagógicos o cintas reflectivas',
      'Riego constante para llenado uniforme de grano'
    ],
    nivelRiesgoEstres: 'Medio'
  },
  {
    codigo: 'R4 - R5',
    nombre: 'Grano Masoso (R4) y Grano Dentado (R5)',
    diasAproximados: '88 a 105 DDS',
    descripcionVisual: 'El contenido del grano se vuelve pastoso/duro. Aparece la "línea de leche" que avanza desde la corona hacia la base del grano.',
    laboresClave: [
      'Monitoreo del avance de la línea de leche para proyectar fecha de madurez',
      'Reducción progresiva de la lámina de riego',
      'Inspección de sanidad de tallo para prevenir vuelco prematuro'
    ],
    nivelRiesgoEstres: 'Bajo'
  },
  {
    codigo: 'R6',
    nombre: 'Madurez Fisiológica (Capa Negra)',
    diasAproximados: '115 a 130 DDS',
    descripcionVisual: 'Formación de la capa negra celular (black layer) en la base de inserción del grano con el marlo/tusa. Máximo peso seco acumulado.',
    laboresClave: [
      'Suspensión total del riego',
      'Dobla o quebrado de la mazorca (práctica tradicional de secado en campo para evitar entrada de lluvia si no hay secadora)',
      'Monitoreo de humedad de grano (cosechar mecánicamente o manual entre 18% y 22% de humedad, o 14% para almacenamiento seguro)'
    ],
    nivelRiesgoEstres: 'Bajo'
  }
];

export const MAQUINARIA_Y_HERRAMIENTAS: EquipmentToolItem[] = [
  {
    nombre: 'Tractor Agrícola (65 - 80 HP) con Arado de Cincel y Rastra',
    categoria: 'Maquinaria',
    cantidadPara05Ha: '1 unidad (Servicio mecanizado por 2.5 a 3.0 horas para 0.5 ha)',
    especificacionTecnica: 'Tracción 4x4 o 4x2, toma de fuerza (TDP) estándar, enganche tripuntal categoría II.',
    laborPrincipal: 'Descompactación profunda con cincel a 30-35 cm y 2 pases de rastra pulidora niveladora.',
    protocoloMantenimientoCalibracion:
      'Revisión de niveles de aceite de motor, hidráulico, refrigerante, presión de neumáticos y engrase de chumaceras de la rastra.'
  },
  {
    nombre: 'Motocultor de 10 a 14 HP con Rotocultivador (Alternativa Pedagógica)',
    categoria: 'Maquinaria',
    cantidadPara05Ha: '1 unidad institucional',
    especificacionTecnica: 'Motor diésel/gasolina 4 tiempos, rototiller de 80 cm de ancho de labor.',
    laborPrincipal: 'Preparación de suelo a pequeña escala y apertura de surcos a 80 cm en colegios sin tractor.',
    protocoloMantenimientoCalibracion:
      'Limpieza de cuchillas del rotocultivador, tensión de correas de transmisión, cambio de filtro de aire bañado en aceite.'
  },
  {
    nombre: 'Matraca Sembradora - Abonadora Manual Tecnificada (Espeque con dosificador)',
    categoria: 'Implemento',
    cantidadPara05Ha: '4 a 6 unidades para trabajo grupal estudiantil',
    especificacionTecnica: 'Doble boquilla metálica puntiaguda con dosificador regulable de 1-2 semillas y 10-15 g de abono.',
    laborPrincipal: 'Siembra de precisión manual enterrando semilla a 3-4 cm y fertilizante separado.',
    protocoloMantenimientoCalibracion:
      'Calibración previa en saco o piso: accionar 20 veces para verificar que entregue exactamente 1 a 2 semillas por golpe sin partir el grano.'
  },
  {
    nombre: 'Bomba de Espalda Manual de Palanca (20 Litros)',
    categoria: 'Equipo de Aplicación',
    cantidadPara05Ha: '2 unidades dedicadas (1 exclusiva para herbicidas y 1 para insecticidas/abonos foliares)',
    especificacionTecnica: 'Tanque de polietileno de alta densidad con filtro de boca, cámara de presión de pistón, lanza de latón con manómetro.',
    laborPrincipal: 'Aplicación de herbicidas pre y post-emergentes, insecticidas al cogollo y fertilización foliar.',
    protocoloMantenimientoCalibracion:
      'Calibración agronómica obligatoria: llenar con 20 L de agua limpia, pulverizar 100 m² a paso constante (1 m/s), medir volumen gastado y multiplicar por 50 para determinar gasto exacto para 0.5 ha.'
  },
  {
    nombre: 'Kit de Boquillas Técnicas Pulverizadoras (TeeJet / Albuz)',
    categoria: 'Equipo de Aplicación',
    cantidadPara05Ha: 'Juego de 4 boquillas de abanico plano (8002/11002) y 4 de cono hueco/lleno',
    especificacionTecnica: 'Material poliacetal o cerámica resistente a la abrasión química con filtro de boquilla de 50 mallas.',
    laborPrincipal: 'Abanico plano para herbicidas; cono hueco para insecticidas y fungicidas foliares.',
    protocoloMantenimientoCalibracion:
      'Limpieza exclusiva con cepillo de cerdas suaves de nylon o aire comprimido (PROHIBIDO usar alambres o agujas que deforman el orificio).'
  },
  {
    nombre: 'Herramientas Menores de Campo (Azadones, Machetes, Palas, Carretillas)',
    categoria: 'Herramienta Menor',
    cantidadPara05Ha: '10 azadones número 2, 8 machetes 18", 4 palas redondas, 2 carretillas bugui de 80 L',
    especificacionTecnica: 'Acero forjado con cabo de madera pulida ergonómica sin astillas.',
    laborPrincipal: 'Deshierba localizada, aporque manual, adecuación de zanjas y transporte de cosechas e insumos.',
    protocoloMantenimientoCalibracion:
      'Afilado con lima triangular de 6" con protección, lavado con agua y secado tras cada práctica, aceitado mineral para evitar oxidación.'
  },
  {
    nombre: 'Medidores de Campo (Higrómetro de Granos, Balanza Gramera, Probeta Graduada, Cinta Métrica)',
    categoria: 'Medición y Control',
    cantidadPara05Ha: '1 probeta de 500 ml, 1 probeta de 100 ml, 1 balanza digital 0.1 g - 5 kg, 1 cinta métrica de 50 m, 1 higrómetro portátil',
    especificacionTecnica: 'Instrumentos certificados para dosificación de agroquímicos y registro de humedad de granos.',
    laborPrincipal: 'Cálculo de densidad de siembra, dosificación exacta de productos fitosanitarios y control de cosecha.',
    protocoloMantenimientoCalibracion:
      'Calibración con peso patrón de 1 kg; verificación de punto cero en balanzas y lectura en higrómetro con muestra conocida.'
  }
];

export const MATRIZ_EPP: PpeItem[] = [
  {
    nombre: 'Traje Tyvek Impermeable / Overol Hidrorrepelente de 2 Piezas',
    laborDestino: 'Aplicación Fitosanitaria (Químico)',
    normaReferencia: 'ISO 27065 Nivel 2 o 3 / OSHA 1910.132',
    descripcionYMaterial: 'Tela no tejida laminada impermeable o algodón dril tratado con fluorocarbono hidrorrepelente. Chaqueta sobre pantalón.',
    riesgoMitigado: 'Contacto dérmico directo y salpicaduras de plaguicidas concentrados o diluidos.',
    obligatoriedad: 'Estricta Obligatoria'
  },
  {
    nombre: 'Respirador de Media Cara con Filtros de Carbón Activado y Partículas',
    laborDestino: 'Aplicación Fitosanitaria (Químico)',
    normaReferencia: 'NIOSH TC-23C / EN 14387 Filtro A1P2 o A2P3',
    descripcionYMaterial: 'Pieza facial elastomérica de silicona con doble cartucho cambiable para vapores orgánicos y neblinas químicas.',
    riesgoMitigado: 'Inhalación de vapores tóxicos, aerosoles y partículas de insecticidas/fungicidas.',
    obligatoriedad: 'Estricta Obligatoria'
  },
  {
    nombre: 'Guantes Químicos de Nitrilo o Neopreno de Caña Larga (30 cm)',
    laborDestino: 'Aplicación Fitosanitaria (Químico)',
    normaReferencia: 'EN 374-1 / ASTM F739',
    descripcionYMaterial: 'Nitrilo verde sin soporte textil interior, espesor mínimo 15 mil. Las mangas del overol van POR FUERA del guante.',
    riesgoMitigado: 'Absorción cutánea a través de las manos y antebrazos durante mezcla, carga y lavado de equipos.',
    obligatoriedad: 'Estricta Obligatoria'
  },
  {
    nombre: 'Monogafas / Antiparras de Seguridad Herméticas con Ventilación Indirecta',
    laborDestino: 'Aplicación Fitosanitaria (Químico)',
    normaReferencia: 'ANSI Z87.1 / EN 166',
    descripcionYMaterial: 'Policarbonato antiempañante con marco flexible que sella completamente el contorno ocular.',
    riesgoMitigado: 'Salpicaduras a los ojos, conjuntivitis química y daño ocular irreversible.',
    obligatoriedad: 'Estricta Obligatoria'
  },
  {
    nombre: 'Botas de Caucho / PVC Caña Alta Sin Forro Textil Interno',
    laborDestino: 'Aplicación Fitosanitaria (Químico)',
    normaReferencia: 'ASTM F2413 / EN ISO 20345',
    descripcionYMaterial: 'Cloruro de polivinilo resistente a agroquímicos. La bota va POR DENTRO de la bota del pantalón impermeable.',
    riesgoMitigado: 'Filtración de químicos por escurrimiento gravitacional hacia los pies.',
    obligatoriedad: 'Estricta Obligatoria'
  },
  {
    nombre: 'Sombrero de Ala Ancha Tipo Pava con Cubre-Nuca',
    laborDestino: 'Desyerbe y Cosecha (Ergonómico/Solar)',
    normaReferencia: 'Protección Radiación UV UPF 50+',
    descripcionYMaterial: 'Tela dril o lona transpirable con faldón protector cervical para sombra completa de rostro y nuca.',
    riesgoMitigado: 'Insolación, golpe de calor y dermatitis fotoinducida por exposición prolongada al sol.',
    obligatoriedad: 'Estricta Obligatoria'
  },
  {
    nombre: 'Guantes de Carnaza o Vaqueta Gruesa',
    laborDestino: 'Preparación y Siembra (Mecánico)',
    normaReferencia: 'EN 388 (Riesgos mecánicos)',
    descripcionYMaterial: 'Cuero curtido flexible con costuras reforzadas.',
    riesgoMitigado: 'Ampollas, callosidades, cortes por espinas o filos de herramientas menores.',
    obligatoriedad: 'Estricta Obligatoria'
  },
  {
    nombre: 'Canilleras / Polainas de Protección de Seguridad',
    laborDestino: 'Desyerbe y Cosecha (Ergonómico/Solar)',
    normaReferencia: 'Seguridad Agroforestal',
    descripcionYMaterial: 'Lámina plástica de alto impacto forrada en lona impermeable ajustada con reatas a la pantorrilla.',
    riesgoMitigado: 'Impacto accidental con machete o azadón, y mordeduras de ofidios en maleza densa.',
    obligatoriedad: 'Recomendada'
  }
];

// Registros de demostración pedagógica listos en los formatos BPA
export const INITIAL_FICHA_LOTE: FichaLoteRecord = {
  id: 'FL-2026-001',
  fechaRegistro: '2026-10-06',
  institucion: 'I.E. Técnico Agrícola San Isidro Labrador',
  sedeOMunicipio: 'Granja Experimental La Esperanza',
  loteId: 'Parcela Pedagógica N° 3',
  areaM2: 5000,
  topografia: 'Plana a ligeramente ondulada (pendiente 1.5%)',
  phSuelo: 5.6,
  textura: 'Franco-arenosa (FA) con buen drenaje interno',
  variedadSembrada: 'ICA V-305 (Certificada)',
  loteAnterior: 'Frijol Caupí (Rotación de leguminosa)',
  instructorACargo: 'Ing. Agr. Carlos Mendoza (15 años exp.)',
  estudianteLider: 'Mariana Duarte - Grado 11 Agropecuario'
};

export const INITIAL_LABORES_DIARIAS: LaborDiariaRecord[] = [
  {
    id: 'LAB-01',
    fecha: '2026-10-08',
    actividad: 'Preparación de terreno con cincel y rastra pulidora + Aplicación de cal dolomita',
    faseFenologica: 'Pre-siembra (-35 días)',
    numeroEstudiantes: 12,
    horasJornal: 4,
    herramientasUtilizadas: 'Tractor 75 HP, rastra de 18 discos, azadones para bordes',
    observacionesNovedades: 'Se incorporaron 800 kg de cal dolomita a 20 cm de profundidad sin novedad mecánica.',
    docenteSupervisor: 'Ing. Carlos Mendoza'
  },
  {
    id: 'LAB-02',
    fecha: '2026-10-22',
    actividad: 'Instalación de cabezal de filtrado y tendido de cintas de goteo en 62 surcos',
    faseFenologica: 'Pre-siembra (-5 días)',
    numeroEstudiantes: 16,
    horasJornal: 5,
    herramientasUtilizadas: 'Cinta de goteo 6.250 m, conectores iniciales con válvula, perforador de tubería matriz',
    observacionesNovedades: 'Se probó presión a 12 PSI. Se repararon 2 fugas menores en terminales.',
    docenteSupervisor: 'Ing. Carlos Mendoza'
  },
  {
    id: 'LAB-03',
    fecha: '2026-10-28',
    actividad: 'Siembra manual tecnificada con matracas (0.80 m x 0.25 m) y fertilización de fondo',
    faseFenologica: 'V0 (Siembra)',
    numeroEstudiantes: 18,
    horasJornal: 6,
    herramientasUtilizadas: '6 matracas sembradoras reguladas a 2 semillas/sitio, recipientes plásticos, balanza gramera',
    observacionesNovedades: 'Se aplicó DAP + KCl + K-Mag a 6 cm de la semilla. Riego de asiento de 60 min inmediato.',
    docenteSupervisor: 'Ing. Carlos Mendoza'
  }
];

export const INITIAL_APLICACIONES_QUIMICAS: AplicacionQuimicaRecord[] = [
  {
    id: 'APL-01',
    fecha: '2026-10-29',
    faseFenologica: 'VE (Pre-emergencia con suelo húmedo)',
    blancoBiologico: 'Malezas gramíneas y hoja ancha anuales',
    nombreComercial: 'Gesaprim 500 SC + Dual Gold 960 EC',
    ingredienteActivo: 'Atrazina 500 g/L + S-Metolacloro 960 g/L',
    dosisAplicada: '1.25 L Atrazina + 0.70 L S-Metolacloro en 120 L agua',
    volumenCaldoLitros: 120,
    equipoBoquilla: 'Bomba de espalda 20 L con boquilla TeeJet 11003 abanico plano',
    periodoCarenciaDias: 60,
    responsableAplicacion: 'Operario Técnico Jorge Gómez + Observación Estudiantes',
    verificacionEpp: true
  },
  {
    id: 'APL-02',
    fecha: '2026-11-15',
    faseFenologica: 'V4 (4 hojas expandidas)',
    blancoBiologico: 'Gusano Cogollero (Spodoptera frugiperda) en 16% de plantas',
    nombreComercial: 'Coragen 20 SC',
    ingredienteActivo: 'Clorantraniliprole 200 g/L',
    dosisAplicada: '55 ml disueltos en 100 L de agua para la media hectárea',
    volumenCaldoLitros: 100,
    equipoBoquilla: 'Bomba manual calibrada con boquilla de cono sólido dirigida al cogollo',
    periodoCarenciaDias: 14,
    responsableAplicacion: 'Operario Técnico Jorge Gómez',
    verificacionEpp: true
  }
];

export const INITIAL_MONITOREO_PLAGAS: MonitoreoPlagaRecord[] = [
  {
    id: 'MON-01',
    fecha: '2026-11-12',
    sitiosEvaluados: 100,
    porcentajeDanoSpodoptera: 8.0,
    promedioNinfasDalbulus: 0.2,
    incidenciaManchaAsfalto: '0% (Ausente)',
    decisionTomada: 'Monitoreo preventivo. No se supera el UDE (15%). No se aplica químico.',
    evaluadorEstudiante: 'Andrés Felipe Castro (Eq. Entomología)'
  },
  {
    id: 'MON-02',
    fecha: '2026-11-15',
    sitiosEvaluados: 100,
    porcentajeDanoSpodoptera: 16.0,
    promedioNinfasDalbulus: 0.3,
    incidenciaManchaAsfalto: '0% (Ausente)',
    decisionTomada: 'Se superó el UDE en V4. Se ordenó aplicación focalizada de Clorantraniliprole.',
    evaluadorEstudiante: 'Mariana Duarte (Eq. Entomología)'
  }
];

export const INITIAL_RIEGO_FENOLOGIA: RiegoFenologiaRecord[] = [
  {
    id: 'RIE-01',
    fecha: '2026-11-04',
    etapaFenologica: 'VE - V1 (Emergencia)',
    alturaPromedioCm: 8.5,
    tiempoRiegoMin: 50,
    volumenEstimadoLitros: 10200,
    humedadSueloApreciacion: 'Capacidad de Campo',
    observaciones: 'Emergencia homogénea del 92% de los sitios evaluados en 6 surcos testigo.'
  },
  {
    id: 'RIE-02',
    fecha: '2026-11-16',
    etapaFenologica: 'V4 (4 hojas desplegadas)',
    alturaPromedioCm: 32.0,
    tiempoRiegoMin: 90,
    volumenEstimadoLitros: 18400,
    humedadSueloApreciacion: 'Capacidad de Campo',
    observaciones: 'Riego matutino previo a la fertilización nitrogenada de aporque.'
  }
];

export const INITIAL_COSECHA_RENDIMIENTO: CosechaRendimientoRecord[] = [
  {
    id: 'COS-01',
    fechaCosecha: '2027-02-15',
    tipoProducto: 'Grano Seco Comercial',
    pesoBrutoKg: 3120,
    porcentajeHumedadGrano: 14.2,
    rendimientoCalculadoTonHa: 6.24,
    calidadComercial: 'Primera (Selecta)',
    destinoProduccion: 'Venta Comunitaria y Banco de Semilla Pedagógico',
    responsablePesaje: 'Comité Estudiantil de Cosecha & Ing. Carlos Mendoza'
  }
];
