// Variables para presupuesto y gastos
let presupuesto = 0;
let gastos = [];

// Variables para elementos del DOM
const presupuestoElement = document.getElementById('presupuesto');
const gastosTotalElement = document.getElementById('gastos-total');
const saldoElement = document.getElementById('saldo');
const gastoTablaElement = document.getElementById('gasto-tabla');
const presupuestoInput = document.getElementById('presupuesto-input');
const gastoNombreInput = document.getElementById('gasto-nombre-input');
const gastoCantidadInput = document.getElementById('gasto-cantidad-input');
const calcularBtn = document.getElementById('calcular-btn');
const agregarGastoBtn = document.getElementById('agregar-gasto-btn');


function actualizarElementos() {
  presupuestoElement.textContent = `$${presupuesto}`;
  gastosTotalElement.textContent = `$${calcularTotalGastos()}`;
  saldoElement.textContent = `$${presupuesto - calcularTotalGastos()}`;
  actualizarTablaGastos();
}

agregarGastoBtn.addEventListener('click', agregarGasto);

function agregarGasto(event) {
  event.preventDefault();
  const nombre = gastoNombreInput.value;
  const monto = parseInt(gastoCantidadInput.value);
  const nuevoGasto = { nombre, monto };
  gastos.push(nuevoGasto);
  actualizarElementos();
  gastoNombreInput.value = '';
  gastoCantidadInput.value = '';
}

function calcularTotalGastos() {
  let total = 0;
  for (let i = 0; i < gastos.length; i++) {
    total += gastos[i].monto;
  }
  return total;
}

function actualizarTablaGastos() {
  gastoTablaElement.innerHTML = '';
  for (let i = 0; i < gastos.length; i++) {
    const fila = document.createElement('tr');
    const nombre = document.createElement('td');
    const monto = document.createElement('td');
    const eliminar = document.createElement('td');
    const eliminarIcon = document.createElement('i');

    nombre.textContent = gastos[i].nombre;
    monto.textContent = `$${gastos[i].monto}`;
    eliminarIcon.classList.add('fa', 'fa-trash-alt');
    eliminarIcon.addEventListener('click', function() {
      eliminarGasto(i);
    });

    eliminar.appendChild(eliminarIcon);
    fila.appendChild(nombre);
    fila.appendChild(monto);
    fila.appendChild(eliminar);
    gastoTablaElement.appendChild(fila);
  }
}


function eliminarGasto(index) {
  gastos.splice(index, 1);
  actualizarElementos();
}

calcularBtn.addEventListener('click', function() {
  presupuesto = parseInt(presupuestoInput.value);
  actualizarElementos();
});

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const nombre = gastoNombreInput.value;
  const monto = parseInt(gastoCantidadInput.value);
  gastos.push({ nombre: nombre, monto: monto });
  gastoNombreInput.value = '';
  gastoCantidadInput.value = '';
  actualizarElementos();
});
