import React from 'react';
import { FiArrowLeft, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { useLoginViewModel } from '../ViewModel/ViewModel';

const LoginView = () => {
    const {
        phone,
        password,
        error,
        loading,
        showPassword,
        onChange,
        handleLogin,
        toggleShowPassword,
        navigate,
    } = useLoginViewModel();

    return (
        <div className="flex items-center justify-center h-screen w-full bg-[#f9a84d] p-4">
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 flex items-center gap-2 text-white font-semibold hover:underline"
            >
                <FiArrowLeft />
                Volver
            </button>

            <div className="flex w-full max-w-4xl bg-[#fef9e7] rounded-2xl shadow-lg overflow-hidden">
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <h1 className="text-4xl font-bold text-[#386641]">Welcome !</h1>
                    <p className="mt-2 text-gray-600">
                        Bienvenido de nuevo, inicia sesión para continuar.
                    </p>

                    <form onSubmit={handleLogin} className="mt-8 space-y-6">
                        <div>
                            <label className="text-lg font-semibold text-[#386641]">Usuario</label>
                            <input
                                type="tel"
                                name="phone"
                                value={phone}
                                onChange={(e) => onChange('phone', e.target.value)}
                                placeholder="Ingresa tu numero telefónico"
                                className="mt-2 w-full px-4 py-3 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="text-lg font-semibold text-[#386641]">Contraseña</label>
                            <div className="relative mt-2">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={password}
                                    onChange={(e) => onChange('password', e.target.value)}
                                    placeholder="Ingresa tu contraseña"
                                    className="w-full px-4 py-3 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
                                >
                                    {showPassword ? <FiEye /> : <FiEyeOff />}
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md hover:bg-gray-100 disabled:opacity-50 transition"
                            >
                                {loading ? 'Ingresando...' : 'Ingresar'}
                                {!loading && <FiArrowRight />}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="hidden md:flex md:w-1/2 items-center justify-center p-6">
                    <img
                        src="/Smoothies-Pica.png"
                        alt="Smoothies"
                        className="w-full max-w-sm h-auto object-contain rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginView;