// 1. Declaración de variables de distintos tipos de datos
const texto = "Hola, mundo!";               // String
const numero = 42;                          // Number
const esEstudiante = true;                  // Boolean
const indefinido = undefined;               // Undefined
const nulo = null;                          // Null (object por comportamiento histórico de JS)
const granEntero = 9007199254740991n;       // BigInt
const simbolo = Symbol("id");               // Symbol
const frutas = ["manzana", "plátano"];      // Array (Object)
const persona = { nombre: "Ana", edad: 25 };// Object

// 2. Muestras en consola usando console.log
console.log("=== Mensajes estándar (console.log) ===");
console.log("String:", texto, "| Tipo:", typeof texto);
console.log("Number:", numero, "| Tipo:", typeof numero);
console.log("Boolean:", esEstudiante, "| Tipo:", typeof esEstudiante);

// 3. Muestras en consola usando console.info
console.info("=== Información general (console.info) ===");
console.info("Undefined:", indefinido, "| Tipo:", typeof indefinido);
console.info("Null:", nulo, "| Tipo:", typeof nulo);
console.info("BigInt:", granEntero, "| Tipo:", typeof granEntero);

// 4. Muestras en consola usando console.debug
console.debug("=== Datos de depuración (console.debug) ===");
console.debug("Symbol:", simbolo.toString(), "| Tipo:", typeof simbolo);
console.debug("Array:", frutas, "| Tipo:", typeof frutas);

// 5. Muestras en consola usando console.error
console.error("=== Datos complejos / Errores simulados (console.error) ===");
console.error("Objeto persona:", persona, "| Tipo:", typeof persona);