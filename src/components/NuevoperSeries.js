import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';

export default class NuevoperSeries extends Component {
    state = {
        nombrePersonaje: '',
        imagenPersonaje: '',
        idSerie: '',
        series: [],
    };

    componentDidMount() {
        this.loadSeries();
    }

    loadSeries = () => {
        const url = `${Global.url}/api/Series`;
        
        axios.get(url)
            .then(response => {
                this.setState({ series: response.data });
            })
            .catch(error => {
                console.error("Error al cargar las series:", error);
            });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { nombrePersonaje, imagenPersonaje, idSerie } = this.state;

        if (!nombrePersonaje || !imagenPersonaje || !idSerie) {
            alert("Por favor, completa todos los campos.");
            return; 
        }

        const nuevoPersonaje = {
            idPersonaje: 0,
            nombre: nombrePersonaje,
            imagen: imagenPersonaje,
            idSerie: parseInt(idSerie),
        };

        const apiNewper = `${Global.url}/api/Personajes`;

        axios.post(apiNewper, nuevoPersonaje)
            .then(() => {
                alert("Personaje insertado con éxito");
                this.setState({ nombrePersonaje: '', imagenPersonaje: '', idSerie: '' });
            })
            .catch(error => {
                console.error("Error al insertar el personaje:", error);
                alert("Error al insertar el personaje: " + error.response.data);
            });
    };

    render() {
        const { nombrePersonaje, imagenPersonaje, idSerie, series } = this.state;

        return (
            <div className="container mt-4">
                <h3>Insertar Nuevo Personaje</h3>
                <form id="nuevoPersonajeForm" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombrePersonaje">Nombre del personaje</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombrePersonaje"
                            name="nombrePersonaje"
                            value={nombrePersonaje}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imagenPersonaje">URL de la imagen del personaje</label>
                        <input
                            type="text"
                            className="form-control"
                            id="imagenPersonaje"
                            name="imagenPersonaje"
                            value={imagenPersonaje}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="idSerie">Serie</label>
                        <select
                            id="idSerie"
                            className="form-control"
                            name="idSerie"
                            value={idSerie}
                            onChange={this.handleChange}
                            required
                        >
                            <option value="">Selecciona una serie</option>
                            {series.map(serie => (
                                <option key={serie.idSerie} value={serie.idSerie}>
                                    {serie.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Insertar Personaje</button>
                </form>
            </div>
        );
    }
}