/**
 * Diccionario de palabras españolas de 5 letras.
 *
 * • SOLUCIONES — pool de palabras que pueden ser la solución del día.
 *   Todas comunes, reconocibles, sin tildes (se normalizan al validar).
 *
 * • VALIDAS — set ampliado de palabras aceptadas como intento.
 */

export const SOLUCIONES: string[] = [
  // ─── A ───
  "ABRIR","ACERO","ACTOR","AGUAS","AIRES","AJENO","ALBUM","ALDEA","ALETA",
  "ALGAS","ALTAR","AMIGO","ANCLA","ANDAR","ANGEL","ANIMO","ANUAL","APOYO",
  "ARADO","ARBOL","ARENA","ARMAS","ARROZ","ASILO","ATLAS","ATRAS","AVION",
  "AYUDA","AZOTE",
  // ─── B ───
  "BAHIA","BAILE","BAJAR","BALDE","BALSA","BANCA","BANDA","BARCO","BARON",
  "BARRO","BASES","BEBER","BELLO","BICHO","BOLSA","BOMBA","BORDE","BRAVO",
  "BREVE","BRISA","BROTE","BUENO","BURRO","BUSCA",
  // ─── C ───
  "CABLE","CABRA","CAJON","CALMA","CALOR","CALVO","CAMPO","CANAL","CANTO",
  "CARGO","CARNE","CARTA","CASCO","CAUCE","CAUSA","CELDA","CENAR","CERDO",
  "CESTA","CHICA","CHICO","CHILE","CHINO","CIVIL","CLASE","CLARO","CLAVE",
  "CLIMA","COBRO","COCHE","COFRE","COGER","COLOR","COMER","COMUN","CONDE",
  "CORAL","CORTE","COSTA","CREMA","CRUEL","CRUDO","CUERO","CUEVA","CULPA",
  "CURSO",
  // ─── D ───
  "DANZA","DATOS","DEBER","DECIR","DELTA","DIETA","DISCO","DOLOR","DORSO",
  "DROGA","DULCE","DUQUE","DURAR",
  // ─── E ───
  "ELITE","ENVIO","EPOCA","ERROR","ESTAR","EXITO",
  // ─── F ───
  "FALLO","FALSO","FAUNA","FAVOR","FICHA","FINAL","FIRMA","FLORA","FONDO",
  "FORMA","FRASE","FRENO","FRUTA","FUEGO","FUMAR",
  // ─── G ───
  "GANAR","GASTO","GENTE","GLOBO","GOLPE","GORRA","GRADO","GRANO","GRAVE",
  "GRIPE","GRITO","GRUPO","GUAPO","GUION","GUSTO",
  // ─── H ───
  "HABLA","HACER","HIELO","HIENA","HIJOS","HIMNO","HOGAR","HONOR","HUECO",
  "HUESO","HUEVO","HUMOR",
  // ─── I ───
  "IDEAL","ILESO","INDIO",
  // ─── J ───
  "JAULA","JEFES","JOVEN","JUEGO","JUGAR",
  // ─── L ───
  "LABOR","LARGO","LASER","LATIR","LECHE","LENTO","LETRA","LIBRE","LIMON",
  "LINEA","LITRO","LLAMA","LLANO","LLAVE","LLENO","LOGRO","LUCHA","LUGAR",
  "LUNAR","LUNES",
  // ─── M ───
  "MACRO","MADRE","MANGO","MANOS","MANTO","MARCA","MARCO","MEDIA","MEJOR",
  "METRO","MILLA","MINAS","MITOS","MOLAR","MOLDE","MONTE","MORAL","MOTOR",
  "MUNDO","MURAL",
  // ─── N ───
  "NACER","NARIZ","NAVAL","NEGRO","NIVEL","NOBLE","NOCHE","NORMA","NORTE",
  "NOTAS","NOVIO","NUEVA",
  // ─── O ───
  "OBRAR","OMEGA","ONDAS","OPACO","OPERA","ORDEN","OREJA","OSADO",
  // ─── P ───
  "PADRE","PAGAR","PALMA","PARED","PARTE","PASAR","PASTA","PATIO","PAUSA",
  "PECHO","PELEA","PERRO","PILAR","PISTA","PLANO","PLATA","PLAZA","PODER",
  "POETA","POLAR","POLVO","PONER","POSTE","PRIMA","PRISA","PULSO","PUNTO",
  // ─── Q ───
  "QUESO","QUIEN",
  // ─── R ───
  "RADIO","RAZON","REINA","RELOJ","RENTA","RESTA","RIVAL","ROBLE","ROBOT",
  "RONCO","RUBIO","RUEDA","RUIDO","RUMBO","RURAL",
  // ─── S ───
  "SABOR","SACAR","SALIR","SALSA","SALTO","SALUD","SANTO","SAVIA","SELLO",
  "SELVA","SERIA","SIGLO","SITIO","SOBRE","SOLAR","SOPLA","SORDO","SUAVE",
  "SUBIR","SUELO","SUTIL",
  // ─── T ───
  "TALON","TANTO","TAPAS","TAREA","TECHO","TENIS","TEXTO","TIGRE","TINTA",
  "TOMAR","TORNO","TORRE","TOTAL","TRAER","TRAJE","TRAMO","TRIGO","TROZO",
  "TURNO",
  // ─── U ───
  "ULTRA","UNICO","UNIDO",
  // ─── V ───
  "VALER","VALLE","VAPOR","VARON","VECES","VENDA","VERDE","VIDEO","VIGOR",
  "VINOS","VIOLA","VIRUS","VITAL","VIVIR","VOCAL","VOLAR","VUELO",
  // ─── Z ───
  "ZARPA","ZONAS",
];

/** Palabras adicionales aceptadas como intento (no serán solución). */
const EXTRA_VALIDAS: string[] = [
  "PLAYA","GATOS","PERLA","RATON","PIANO","FILAS","MAGIA","REYES","PATOS",
  "LOBOS","RENOS","MESAS","SILLA","VELAS","COPAS","PISOS","ROSAS","COLAS",
  "SOPAS","TAZAS","NUBES","PINOS","DUNAS","LATAS","ROCAS","OLLAS","CENAS",
  "DOSIS","NAIPE","DAMAS","MASAS","CASAS","SALAS","PALAS","VASOS","LAGOS",
  "BOLAS","SONAR","TEMER","LUCIR","PULIR","MORIR","PEDIR","HERIR","BATIR",
  "FLUIR","HUIDA","REZAR","GIRAR","MIRAR","PISAR","OPTAR","SECAR","TOCAR",
  "VOTAR","DUDAR","FIJAR","MOJAR","PARAR","UNTAR","AULAS","NAVES","QUEJA",
  "BOMBO","BURLA","FIBRA","MECHA","PRADO","VALLA","ALAMO","ABEJA","ATAJO",
  "AVENA","BARBA","BRUJA","CIELO","CLAVO","DIOSA","ELFOS","FERIA","GENIO",
  "HORNO","JUSTO","LEJOS","LLORO","MONJA","NUERA","OLIVO","PLOMO","RASGO",
  "SIGNO","TABLA","TRONO","TUMBA","USTED","VACAS","ZORRO","ZANJA","ZURDO",
];

/** Set combinado de todas las palabras aceptadas como intento. */
export const PALABRAS_VALIDAS: Set<string> = new Set([
  ...SOLUCIONES,
  ...EXTRA_VALIDAS,
]);
