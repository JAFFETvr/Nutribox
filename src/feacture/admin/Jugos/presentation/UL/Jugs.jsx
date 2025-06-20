import ViewModel from "../ViewModel/ViewModel";
function Jugs() {
  const viewModel = ViewModel();

  return (
    <div>
      <button onClick={viewModel.abrirModal}>Agregar Jugo</button>

      {viewModel.mostraModal && (
        <form onSubmit={viewModel.agregarJugo}>
          <input value={viewModel.nombre} onChange={(e) => viewModel.setNombre(e.target.value)} placeholder="Nombre" />
          <input value={viewModel.precio} onChange={(e) => viewModel.setPrecio(e.target.value)} placeholder="Precio" />
          <input value={viewModel.informacion} onChange={(e) => viewModel.setInfomacion(e.target.value)} placeholder="Información" />
          <input value={viewModel.imagen} onChange={(e) => viewModel.setImagen(e.target.value)} placeholder="Imagen URL" />
          <button type="submit">Guardar</button>
          <button type="button" onClick={viewModel.cerrarModal}>Cancelar</button>
        </form>
      )}

      <ul>
        {viewModel.jugos.map((jugo, index) => (
          <li key={index}>
            <strong>{jugo.nombre}</strong>: ${jugo.precio} - {jugo.informacion}
            <img src={jugo.imagen} alt={jugo.nombre} width={50} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Jugs;
