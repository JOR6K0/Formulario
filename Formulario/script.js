document.getElementById("guardar").addEventListener("click", guardar);

function guardar() {
    const alumno = {
        numeroControl: document.getElementById("numeroControl").value.trim(),
        nombre: document.getElementById("nombre").value.trim(),
        apellidoPaterno: document.getElementById("apellidoPaterno").value.trim(),
        apellidoMaterno: document.getElementById("apellidoMaterno").value.trim(),
        edad: parseInt(document.getElementById("edad").value),
        sexo: document.getElementById("sexo").value,
        direccion: document.getElementById("direccion").value.trim(),
        correo: document.getElementById("correo").value.trim()
    };

    // Validación de los datos
    if (!alumno.numeroControl || !alumno.nombre || !alumno.apellidoPaterno || !alumno.apellidoMaterno || !alumno.edad || !alumno.sexo || !alumno.direccion || !alumno.correo) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Enviar los datos al backend
    fetch('http://localhost:3000/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alumno)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje);
        document.getElementById("formAlumno").reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al guardar el alumno.');
    });
}



