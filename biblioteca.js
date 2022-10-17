let edit_data_row = false;
let edit_index_val = null;
let label_text = false;

function MarcarTodos() {
  let obTbl = document.getElementById("tbl");
  let valor = obTbl.rows[0].cells[3].childNodes[0].checked;
  let filas = obTbl.rows.length;
  for (let i = 1; i < filas; i++) {
    obTbl.rows[i].cells[3].childNodes[0].checked = valor;
  }
}

function Iniciar() {
  let divForm = document.getElementById("captura");
  divForm.hidden = true;

  let divTbl = document.getElementById("tabla");
  let obTbl = document.createElement("table");
  obTbl.id = "tbl";
  let fila = obTbl.insertRow(0);
  fila.id = "cabecera";

  let c1 = fila.insertCell(0);
  let c2 = fila.insertCell(1);
  let c3 = fila.insertCell(2);
  let c4 = fila.insertCell(3);
  let ctrlCheck = document.createElement("input");
  ctrlCheck.type = "checkbox";
  ctrlCheck.onclick = function () {
    MarcarTodos();
  };

  c1.textContent = "Código";
  c2.textContent = "Nombre";
  c3.textContent = "Apellido";
  c4.appendChild(ctrlCheck);

  obTbl.appendChild(fila);
  divTbl.appendChild(obTbl);
}

function Agregar() {
  let divForm = document.getElementById("captura");
  divForm.hidden = false;
  const actionButton = document.getElementById("actionButton");

  if (label_text) {
    actionButton.value = "Editar";
  } else {
    actionButton.value = "Guardar";
  }
  divForm.style.zIndex = "1";
  divForm.style.filter = "alpha(opacity=99)";
  divForm.style.position = "absolute";
  divForm.style.top = "10px";
  divForm.style.left = screen.width / 2 - 400 + "px";

  let divP = document.getElementById("principal");
  divP.style.opacity = "0.1";
}
function AceptarForm() {
  //Recuperar los datos del formulario
  let v1 = document.frmCaptura.id.value;
  let v2 = document.frmCaptura.nom.value;
  let v3 = document.frmCaptura.ape.value;

  document.frmCaptura.id.value = "";
  document.frmCaptura.nom.value = "";
  document.frmCaptura.ape.value = "";

  let tbl = document.getElementById("tbl");
  if (!edit_data_row) {
    let numFilas = tbl.rows.length;
    tbl.insertRow(numFilas);
    tbl.rows[numFilas].insertCell(0);
    tbl.rows[numFilas].cells[0].textContent = v1;
    tbl.rows[numFilas].insertCell(1);
    tbl.rows[numFilas].cells[1].textContent = v2;
    tbl.rows[numFilas].insertCell(2);
    tbl.rows[numFilas].cells[2].textContent = v3;

    tbl.rows[numFilas].insertCell(3);
    var ctrlCheck = document.createElement("input");
    ctrlCheck.type = "checkbox";
    tbl.rows[numFilas].cells[3].appendChild(ctrlCheck);

    tbl.rows[numFilas].insertCell(4);
    var Modificar = document.createElement("button");
  } else {
    let tbl = document.getElementById("tbl");
    tbl.rows[edit_index_val].cells[0].innerHTML = v1;
    tbl.rows[edit_index_val].cells[1].innerHTML = v2;
    tbl.rows[edit_index_val].cells[2].innerHTML = v3;
  }

  CancelarForm();
}

function CancelarForm() {
  let divForm = document.getElementById("captura");
  divForm.hidden = true;

  let divP = document.getElementById("principal");
  divP.style.opacity = "1";
  edit_data_row = false;
  edit_index_val = null;
  label_text = false;
  document.frmCaptura.id.value = "";
  document.frmCaptura.nom.value = "";
  document.frmCaptura.ape.value = "";
}

function Eliminar() {
  let tbl = document.getElementById("tbl");
  let numFilas = tbl.rows.length;
  let lstEliminar = [];
  for (let i = 1; i < numFilas; i++) {
    if (tbl.rows[i].cells[3].childNodes[0].checked) {
      lstEliminar.push(i);
    }
  }
  if (lstEliminar.length == 0) alert("No hay datos a eliminar");
  else {
    for (let i = lstEliminar.length - 1; i >= 0; i--) {
      tbl.deleteRow(lstEliminar[i]);
    }
    tbl.rows[0].cells[3].childNodes[0].checked = false;
  }
}

function Modificar() {
  let tbl = document.getElementById("tbl");
  let numFilas = tbl.rows.length;
  let lstEliminar = [];
  for (let i = 1; i < numFilas; i++) {
    if (tbl.rows[i].cells[3].childNodes[0].checked) {
      lstEliminar.push(i);
    }
  }
  if (lstEliminar.length == 0) {
    alert("No a seleccionado un registro para editar");
    return;
  }

  edit_index_val = lstEliminar;
  edit_data_row = true;
  label_text = true;
  //Recuperar los datos del formulario
  document.frmCaptura.id.value = tbl.rows[edit_index_val].cells[0].textContent;
  document.frmCaptura.nom.value = tbl.rows[edit_index_val].cells[1].textContent;
  document.frmCaptura.ape.value = tbl.rows[edit_index_val].cells[2].textContent;
  Agregar();
}
