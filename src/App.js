import React, { useState } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  const consultarClima = async ({ ciudad, pais }) => {
    setError(false);
    const appid = "your_appid";
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`
    );
    const data = await response.json();

    if (data.cod === "404") {
      setError(true);
      return;
    }

    setResultado(data);
  };

  const componente = error ? (
    <Error message="No se encontraron datos" />
  ) : (
    <Clima resultado={resultado} />
  );

  return (
    <div className="App">
      <Header title="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario consultarClima={consultarClima} />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
