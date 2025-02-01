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
                    week: responseWeek.data.week,
                    month: responseMonth.data.month,
                    currentDay: responseDay.data.current_day,
                    currentDate: responseDay.data.current_date,
                    currentMonth: responseMonth.data.current_month,
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
            <h1 className="text-2xl font-bold text-center my-4">Estadísticas de usuarios creados</h1>
                <p className="text-gray-300 mb-6">
                    Hoy es {stats.currentDate}
                </p>
            <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Periodo</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Usuarios Registrados</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-gray-700">Hoy</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{stats.day}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-gray-700">Esta Semana</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{stats.week}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-gray-700">Este Mes</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{stats.month}</td>
                </tr>
                <tr className='hover:bg-gray-100'>
                    <td className="px-6 py-4 text-gray-700">Mes Actual</td>
                    <td className="px- py-4 font-semibold text-gray-900">{stats.currentMonth}</td>
                        </tr>
                </tbody>
            </table>
</div>

        </>
    );
};

export default EstadisticasUsers;
