import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import React, { Component } from 'react';
import MenuSeries from './MenuSeries';
import NuevoperSeries from './NuevoperSeries';
import Serie from './Serie';
import ModificarperSeries from './ModificarperSeries';

export default class Router extends Component {
    render() {
        function SerieElement() {
            let { id } = useParams();
            return <Serie id={id} />;
        }

        return (
            <BrowserRouter>
                <MenuSeries />
                <Routes>
                    <Route path='/' element={<NuevoperSeries />} />
                    <Route path="/nuevo" element={<NuevoperSeries />} />
                    <Route path="/modificar" element={<ModificarperSeries />} />
                    <Route path="/serie/:id" element={<SerieElement />} />
                </Routes>
            </BrowserRouter>
        );
    }
}
