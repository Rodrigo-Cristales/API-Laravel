import React, { useEffect, useState } from 'react'
import axios from 'axios'

const EstadisticasUsers = () => {
    const [stats, setStats] = useState({
        day: null,
        week: null,
        month: null,
    });
    const [loading, setLoading] = useState(true);

    // Configuración de axios
    const axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:8000/api",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });

    const fetchStats = async () => {
        setLoading(true);
        try {
            const responseDay = await axiosInstance.get('users/stats/days');
            const responseWeek = await axiosInstance.get('users/stats/week');
            const responseMonth = await axiosInstance.get('users/stats/month');

            if (responseDay.data && responseWeek.data && responseMonth.data) {
                setStats({
                    day: responseDay.data.users_today,
                    week: responseWeek.data.users_this_week,
                    month: responseMonth.data.users_this_month,
                });
            } else {
                console.error("Datos no válidos recibidos de la API");
            }
        } catch (error) {
            console.error("Error al mostrar los datos", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>Estadísticas de usuarios creados</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Periodo</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Usuarios Registrados</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Hoy</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stats.day}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Esta Semana</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stats.week}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Este Mes</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stats.month}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default EstadisticasUsers;
