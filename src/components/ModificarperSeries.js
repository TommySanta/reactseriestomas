// src/components/ModificarperSeries.js
import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';

export default class ModificarperSeries extends Component {
    state = {
        personajes: [],
        series: [],
        idPersonaje: '',
        nuevaSerie: '',
        personajesEnSerie: [],
    };

    componentDidMount() {
        this.loadSeries();
        this.loadPersonajes();
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

    loadPersonajes = () => {
        const url = `${Global.url}/api/Personajes`;

        axios.get(url)
            .then(response => {
                this.setState({ personajes: response.data });
            })
            .catch(error => {
                console.error("Error al cargar los personajes:", error);
            });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { idPersonaje, nuevaSerie } = this.state;

        const url = `${Global.url}/api/Personajes/${idPersonaje}/${nuevaSerie}`;

        axios.put(url)
            .then(() => {
                alert("Personaje cambiado de serie con éxito");
                this.mostrarPersonajesDeSerie(nuevaSerie);
                this.setState({ idPersonaje: '', nuevaSerie: '' });
            })
            .catch(error => {
                console.error("Error al cambiar el personaje de serie:", error);
            });
    };

    mostrarPersonajesDeSerie = (idSerie) => {
        const url = `${Global.url}/api/Series/PersonajesSerie/${idSerie}`;

        axios.get(url)
            .then(response => {
                this.setState({ personajesEnSerie: response.data });
            })
            .catch(error => {
                console.error("Error al cargar los personajes de la serie:", error);
            });
    };

    render() {
        const { personajes, series, idPersonaje, nuevaSerie, personajesEnSerie } = this.state;

        return (
            <div className="container mt-4">
                <h3>Modificar Personaje de Serie</h3>
                <form id="modificarPersonajeForm" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="idPersonaje">Seleccione un Personaje</label>
                        <select
                            id="idPersonaje"
                            className="form-control"
                            name="idPersonaje"
                            value={idPersonaje}
                            onChange={this.handleChange}
                            required
                        >
                            <option value="">Selecciona un personaje</option>
                            {personajes.map(personaje => (
                                <option key={personaje.idPersonaje} value={personaje.idPersonaje}>
                                    {personaje.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nuevaSerie">Nueva Serie</label>
                        <select
                            id="nuevaSerie"
                            className="form-control"
                            name="nuevaSerie"
                            value={nuevaSerie}
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
                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                </form>

                <div id="resultado" className="mt-4"></div>
                <div className="mt-4">
                    {personajesEnSerie.length > 0 && (
                        <>
                            <h4>Personajes de la serie seleccionada</h4>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Imagen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {personajesEnSerie.map(personaje => (
                                        <tr key={personaje.idPersonaje}>
                                            <td>{personaje.nombre}</td>
                                            <td>
                                                <img src={personaje.imagen} alt={personaje.nombre} style={{ width: '100px' }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        );
    }
}
