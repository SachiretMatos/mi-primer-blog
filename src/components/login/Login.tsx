// src/components/login/Login.tsx
import React, { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { animate } from 'animejs'; 

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 💡 Hook useEffect: Maneja animaciones al montar el componente y el fondo
    useEffect(() => {
        // Animación de entrada para el formulario (se ejecuta solo una vez)
        animate({
            targets: '.login-form', 
            translateY: [-50, 0], 
            opacity: [0, 1], 
            duration: 1000,
            delay: 300,
            easing: 'easeOutExpo'
        }, [] as any); // El 'as any' resuelve el error de TypeScript

        // -----------------------------------------------------------------
        // ANIMACIÓN DE FONDO CON GRADIENTES (Usando Anime.js)
        // Animamos las propiedades de CSS de un elemento para crear un efecto dinámico.
        // -----------------------------------------------------------------
        const gradientElement = document.querySelector('.animated-background') as HTMLElement;
        if (gradientElement) {
            animate({
                targets: gradientElement,
                // Animamos las propiedades background-position para mover el gradiente
                backgroundPosition: [
                    { value: '0% 50%', duration: 0 }, // Estado inicial
                    { value: '100% 50%', duration: 4000 }, // Hacia la derecha
                    { value: '0% 50%', duration: 4000 } // De vuelta a la izquierda
                ],
                // backgroundSize: ['200% 200%', '100% 100%'], // Si quieres que también cambie el tamaño del gradiente
                loop: true, // Repite la animación infinitamente
                direction: 'alternate', // Alterna la dirección en cada loop
                easing: 'easeInOutQuad'
            }, [] as any);
        }

        // Animación para la tarjeta de bienvenida cuando el usuario inicia sesión
        if (isLoggedIn) {
            animate({
                targets: '.logged-in-card',
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutBack'
            }, [] as any);
        }

    }, [isLoggedIn]); // Este efecto se re-ejecuta cuando `isLoggedIn` cambia

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault(); 
        if (username === 'admin' && password === '123') {
            setIsLoggedIn(true);
            setError('');
        } else {
            setIsLoggedIn(false);
            setError('Credenciales incorrectas. Intenta de nuevo. (admin/123)');
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = event.target;
        if (id === 'username') {
            setUsername(value);
        } else if (id === 'password') {
            setPassword(value);
        }
    };

    if (isLoggedIn) {
        return (
            // Agregamos la clase del fondo animado aquí también
            <div className="min-h-screen flex flex-col items-center justify-center animated-background">
                <div className="logged-in-card p-8 bg-green-50 rounded-lg shadow-xl text-center">
                    <h2 className="text-3xl font-bold text-green-700">¡Bienvenido, {username}! 🎉</h2>
                    <p className="mt-2 text-gray-600">Has iniciado sesión correctamente.</p>
                    <button 
                        onClick={() => setIsLoggedIn(false)}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        );
    }

    return (
        // Contenedor principal: Usamos `animated-background` para el fondo dinámico
        <div className="min-h-screen flex items-center justify-center animated-background">
            
            <form 
                onSubmit={handleSubmit} 
                className="login-form p-8 bg-white rounded-xl shadow-2xl w-full max-w-md"
            >
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">🔐 Acceso</h2>
                
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={handleInputChange}
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                
                {error && (
                    <p className="text-sm text-red-600 mb-4 text-center p-2 bg-red-50 rounded-lg border border-red-300">
                        {error}
                    </p>
                )}
                
                <button 
                    type="submit" 
                    className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;