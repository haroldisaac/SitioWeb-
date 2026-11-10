// ===== 1. Conexión =====
console.log('app.js conectado');
// Precios para calcular el total. 
const PRECIOS = {
  'Pan francés': 0.30,
  'Pan de yema': 0.50,
  'Chancay': 0.60,
  'Torta de chocolate': 45.00
};
// ===== 2. Funciones de validación =====
// Cada función recibe el valor del campo y devuelve
// un mensaje de error, o '' (texto vacío) si todo está bien.
function validarNombre(nombre) {
const limpio = nombre.trim();
if (limpio === '') return 'Escribe tu nombre.';
if (limpio.length < 2) return 'Tu nombre debe tener al menos 2 letras.';
return '';
}
function validarCelular(celular) {
const limpio = celular.replace(/\s/g, '');
if (limpio === '') return 'Escribe tu número de celular.';
if (!/^9\d{8}$/.test(limpio)) {
return 'Escriba un número de 9 dígitos que empiece con 9. Por ejemplo: 987 654 321. (No escriba guiones ni paréntesis)';
}
return '';
}
function validarProducto(producto) {
return producto === '' ? 'Elige un producto.' : '';
}
function validarCantidad(valor) {
const cantidad = Number(valor);
if (valor === '' || !Number.isInteger(cantidad) || cantidad < 1) {
return 'La cantidad debe ser un número entero mayor que 0.';
}
if (cantidad > 100) return 'Para más de 100 unidades, llámanos por teléfono.';
return '';
}
function validarFecha(fecha) {
return fecha === '' ? 'Elige la fecha de recojo.' : '';
}
// Función para validar que la fecha no sea anterior a la fecha actual
function validarFecha(fecha) {
  if (fecha === '') return 'Elige la fecha de recojo.';
  const fechaSeleccionada = new Date(fecha);
  const fechaActual = new Date();
  fechaActual.setHours(0, 0, 0, 0);
  if (fechaSeleccionada < fechaActual) {
    return 'La fecha de recojo no puede ser anterior a la fecha actual.';
  }
  return '';
}
// ===== 4. Mostrar u ocultar un error =====
function mostrarError(id, mensaje) {
const campo = document.getElementById(id);
const error = document.getElementById('error-' + id);
error.textContent = mensaje;
if (mensaje) {
campo.setAttribute('aria-invalid', 'true');
} else {
campo.removeAttribute('aria-invalid');
}
}
// ===== 5. Escuchar el envío del formulario =====
const formulario = document.querySelector('form');
const estado = document.getElementById('estado');
const reglas = [
['nombre', validarNombre],
['celular', validarCelular],
['producto', validarProducto],
['cantidad', validarCantidad],
['fecha', validarFecha],
];
formulario.addEventListener('submit', function (evento) {
evento.preventDefault();
let primerError = null;
for (const [id, validar] of reglas) {
const mensaje = validar(document.getElementById(id).value);
mostrarError(id, mensaje);
if (mensaje && primerError === null) primerError = id;
}
const acepta = document.getElementById('consentimiento').checked;
const avisoConsentimiento = 'Necesitamos tu autorización para atender el pedido.';
mostrarError('consentimiento', acepta ? '' : avisoConsentimiento);
if (!acepta && primerError === null) primerError = 'consentimiento';
if (primerError !== null) {
estado.textContent = 'Revisa los campos marcados para continuar.';
document.getElementById(primerError).focus();
return;
}
const nombre = document.getElementById('nombre').value.trim();
const producto = document.getElementById('producto').value;
const cantidad = document.getElementById('cantidad').value;
const fecha = document.getElementById('fecha').value;
//Calculo de total estimado
const precioUnitario = PRECIOS[producto] || 0;
const totalCalculado = (precioUnitario * cantidad).toFixed(2);
//Mensaje de éxito ahora con el total calculado
estado.textContent = `Gracias, ${nombre}. Recibimos tu pedido de ${cantidad} × ${producto} 
para el ${fecha}. Total estimado: S/ ${totalCalculado}. Te confirmaremos por WhatsApp.`;

formulario.reset();
  document.getElementById('contador-notas').textContent = 'Te quedan 200 caracteres';
});
//Contador de caracteres para el campo de notas
const notasArea = document.getElementById('notas');
const contadorTexto = document.getElementById('contador-notas');

if (notasArea && contadorTexto) {
  notasArea.addEventListener('input', function () {
    const restantes = 200 - notasArea.value.length;
    contadorTexto.textContent = `Te quedan ${restantes} caracteres`;
  });
}


