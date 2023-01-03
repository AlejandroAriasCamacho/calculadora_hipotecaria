const persona = {
    id: 0,
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    ciudad: '',
    pais: ''
}

function processContactForm(e) {
    persona.nombres = document.forms["fcontact"]["fnames"].value;
    persona.apellidos = document.forms["fcontact"]["fsurname"].value;
    persona.telefono = document.forms["fcontact"]["fphone"].value;
    persona.email = document.forms["fcontact"]["femail"].value;
    persona.ciudad = document.forms["fcontact"]["fcity"].value;
    persona.pais = document.forms["fcontact"]["fcountry"].value;
    
    if(persona.id >= 0){
        persona.id = new Date().valueOf();
    }

    let personajson = JSON.stringify(persona);
    localStorage.setItem(persona.id,personajson);

    e.preventDefault();
    alert("Datos guardados con éxito");
    listarContactos();
    resetform();
}

function resetform(){
    document.forms["fcontact"].reset();
    persona.id = 0;
}

function listarContactos() {
    let dinamicTable = "";
    // Cabecera de la tabla
    dinamicTable += "<table class='table'>";
    dinamicTable += "<tr>";
    dinamicTable += "<th>ID</th>";
    dinamicTable += "<th>Nombres</th>";
    dinamicTable += "<th>Apellidos</th>";
    dinamicTable += "<th>Telefono</th>";
    dinamicTable += "<th>Email</th>";
    dinamicTable += "<th>Acción</th>";
    dinamicTable += "</tr>";
// Filas con la información
let personasGuardadas = [];
personasGuardadas = allstorage();
for(let i = 0; i < personasGuardadas.length; i++){
    dinamicTable += "<tr>";
    let personaobjeto = JSON.parse(personasGuardadas[i]);
    dinamicTable += "<td>";
    dinamicTable += personaobjeto.id;
    dinamicTable += "</td>";
    dinamicTable += "<td>";
    dinamicTable += personaobjeto.nombres;
    dinamicTable += "</td>";
    dinamicTable += "<td>";
    dinamicTable += personaobjeto.apellidos;
    dinamicTable += "</td>";
    dinamicTable += "<td>";
    dinamicTable += personaobjeto.telefono;
    dinamicTable += "</td>";
    dinamicTable += "<td>";
    dinamicTable += personaobjeto.email;
    dinamicTable += "</td>";
    dinamicTable += "<td>";
    dinamicTable += '<a href="./detalles.html?id=' + personaobjeto.id + '">Ver</a>';
    dinamicTable += "</td>";
    dinamicTable += "<td>";
    dinamicTable += '<a href="javascript:editarContacto('+ personaobjeto.id+');">Editar</a>';
    dinamicTable += "</td>";
    dinamicTable += "<td>";
    dinamicTable += '<a href="javascript:eliminarContacto('+ personaobjeto.id+');">Eliminar</a>';
    dinamicTable += "</td>";
    dinamicTable += "</tr>";
}
    dinamicTable += "</table>";
    document.getElementById("tableContact").innerHTML = dinamicTable;
}

function allstorage(){
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }
    return values;
}

function verDetalles(){
    let contactoId = obtenerParametroUrl();
    let contacto = localStorage.getItem(contactoId);
    if(contacto.length > 0){
        let personaobjeto = JSON.parse(contacto);
        document.getElementById("onames").innerText = personaobjeto.nombres;
        document.getElementById("osurnames").innerText = personaobjeto.apellidos;
        document.getElementById("ophone").innerText = personaobjeto.telefono;
        document.getElementById("oemail").innerText = personaobjeto.email;
        document.getElementById("ocity").innerText = personaobjeto.ciudad;
        document.getElementById("ocountry").innerText = personaobjeto.pais;
    }
}

function editarContacto(id){
    let contacto = localStorage.getItem(id);
    if(contacto.length > 0){
        let personaobjeto = JSON.parse(contacto);
        document.getElementById("fnames").value = personaobjeto.nombres;
        document.getElementById("fsurname").value = personaobjeto.apellidos;
        document.getElementById("fphone").value = personaobjeto.telefono;
        document.getElementById("femail").value = personaobjeto.email;
        document.getElementById("fcity").value = personaobjeto.ciudad;
        document.getElementById("fcountry").value = personaobjeto.pais;
        persona.id = id;
    }
    listarContactos();
}

function eliminarContacto(id){
    let contacto = localStorage.getItem(id);
    if(contacto.length > 0){
        localStorage.removeItem(id);
        alert("contacto eliminado con éxito")
    }
    listarContactos();
}

function obtenerParametroUrl(){
    
    let url = window.location.href;
    let paramString = url.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    let parameterID = 0;

    for (let pair of queryString.entries()){
        console.log("Key is: " + pair[0]);
        console.log("Value is: " + pair[1]);
        parameterID = Number(pair[1]);
    }
    return parameterID;
}