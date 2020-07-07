import React, { useState } from "react";
import PropTypes from "prop-types";
import Error from "./Error";

const Formulario = ({ consultarClima }) => {
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });
  const [error, setError] = useState(false);

  const { ciudad, pais } = busqueda;

  const handleChange = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ciudad.trim() || !pais.trim()) {
      setError(true);
      return;
    }

    setError(false);
    consultarClima({ ciudad, pais });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Error message="Todos los campos son obligatorios" />}
      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={handleChange}
        />
        <label htmlFor="ciudad">Ciudad</label>
      </div>

      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={handleChange}>
          <option value="">Seleccione país</option>
          <option value="GT">Guatemala</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">País</label>
      </div>
      <div className="input-field col s12">
        <input
          type="submit"
          value="Buscar Clima"
          className="waves-effect waves-light btn-large btn-block yellow accent-4"
        />
      </div>
    </form>
  );
};

Formulario.propTypes = {
  consultarClima: PropTypes.func.isRequired,
};

export default Formulario;
