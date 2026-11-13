// ===== 3. Estado del pedido y utilidades =====
const pedido = []; // cada ítem: { nombre, precio, cantidad }
const lista = document.getElementById('lista-pedido');
const totalTexto = document.getElementById('total');
const mensajeVacio = document.getElementById('pedido-vacio');
const aviso = document.getElementById('aviso');
const tituloPedido = document.getElementById('titulo-pedido');
const btnVaciar = document.getElementById('btn-vaciar');
const btnSugerencia = document.getElementById('btn-sugerencia');
function soles(monto) {
return 'S/ ' + monto.toFixed(2);
}
function calcularTotal() {
return pedido.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
}
function anunciar(mensaje) {
aviso.textContent = mensaje;
}
// ===== 4. Dibujar la lista con el DOM =====
function render() {
lista.replaceChildren(); // borra los <li> anteriores
for (const item of pedido) {
const li = document.createElement('li');
const texto = document.createElement('span');
const subtotal = soles(item.precio * item.cantidad);
texto.textContent = `${item.cantidad} × ${item.nombre} · ${subtotal}`;
const quitarBtn = document.createElement('button');
quitarBtn.type = 'button';
quitarBtn.className = 'btn-quitar';
quitarBtn.dataset.nombre = item.nombre;
quitarBtn.textContent = 'Quitar';
quitarBtn.setAttribute('aria-label', `Quitar ${item.nombre}`);
const menosBtn = document.createElement('button');
menosBtn.type = 'button';
menosBtn.className = 'btn-quitaruno'; 
menosBtn.dataset.nombre = item.nombre;
menosBtn.textContent = '−';
menosBtn.setAttribute('aria-label', `Restar un ${item.nombre}`)
const masBtn = document.createElement('button');
masBtn.type = 'button';
masBtn.className = 'btn-anadiruno';
masBtn.dataset.nombre = item.nombre;
masBtn.textContent = '+';
masBtn.setAttribute('aria-label', `Añadir un ${item.nombre}`)
li.append(texto,masBtn,menosBtn,quitarBtn);
lista.append(li);
}
totalTexto.textContent = soles(calcularTotal());
mensajeVacio.hidden = pedido.length > 0;
btnVaciar.hidden = pedido.length === 0; 
// Mostrar el botón de sugerencia solo si hay pan y no hay mantequilla
const hayPan = pedido.some((item) => item.nombre.includes('Pan'));
const tieneMantequilla = pedido.some((item) => item.nombre === 'Mantequilla');
btnSugerencia.hidden = !(hayPan && !tieneMantequilla);}
// ===== 5. Añadir y quitar =====
function agregar(nombre, precio) {
const existente = pedido.find((item) => item.nombre === nombre);
if (existente) {
existente.cantidad++;
} else {
pedido.push({ nombre, precio, cantidad: 1 });
}
render();
anunciar(`Se añadió ${nombre}. Total: ${soles(calcularTotal())}.`);
}
btnSugerencia.addEventListener('click', () => {
  agregar('Mantequilla', 2.50);
});
function quitar(nombre) {
const posicion = pedido.findIndex((item) => item.nombre === nombre);
if (posicion === -1) return;
pedido.splice(posicion, 1);
render();
anunciar(`Se quitó ${nombre}. Total: ${soles(calcularTotal())}.`);
tituloPedido.focus(); // el foco no se pierde
}
function sumarUno(nombre) {
const existente = pedido.find((item) => item.nombre === nombre);
if (existente) {
existente.cantidad++;
render();
anunciar(`Se añadió un ${nombre}. Total: ${soles(calcularTotal())}.`);
}};
function quitarUno(nombre) {
const existente = pedido.find((item) => item.nombre === nombre);
if (!existente) return;
if (existente.cantidad > 1){
existente.cantidad--;
} else{
const posicion = pedido.findIndex((item) => item.nombre === nombre);
pedido.splice(posicion, 1);
}
render();
anunciar(`Se quitó una unidad de ${nombre}. Total: ${soles(calcularTotal())}.`);
tituloPedido.focus();
}
// Delegación: un solo oyente para todos los botones "Añadir"
document.querySelector('.catalogo').addEventListener('click', (evento) => {
const boton = evento.target.closest('.btn-anadir');
if (!boton) return;
const producto = boton.closest('.producto');
agregar(producto.dataset.nombre, Number(producto.dataset.precio));
});
lista.addEventListener('click', (evento) => {
const boton = evento.target.closest('.btn-quitar');
if (!boton) return;
quitar(boton.dataset.nombre);
});
lista.addEventListener('click', (evento) => {
const botonRestar = evento.target.closest('.btn-quitaruno');
if (botonRestar) {
quitarUno(botonRestar.dataset.nombre);
return;}
const botonSumar = evento.target.closest('.btn-anadiruno');
if (botonSumar) {
sumarUno(botonSumar.dataset.nombre);
return;}
});
btnVaciar.addEventListener('click', () => {
if (pedido.length === 0) return;
const confirmar = confirm('¿Quieres vaciar todo tu pedido?');
if (confirmar) {
pedido.length = 0;
render();          
anunciar('Se ha vaciado todo el pedido. Total: S/ 0.00.');
tituloPedido.focus();
}else{
anunciar('Se canceló la acción. Tu pedido sigue intacto.');
}});
render();