import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUseCase } from '../../domian/UsesCases/Post'; 
import { LoginRepository } from '../../data/Repository/Repository';
import { LoginDataSource } from '../../data/DataSource/DataSource';

export const useLoginViewModel = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        phone: '', 
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const dataSource = new LoginDataSource();
    const repository = new LoginRepository(dataSource);
    const loginUseCase = new LoginUseCase(repository);

    const onChange = (property, value) => {
        setValues({ ...values, [property]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loading) return;

        setError('');
        setLoading(true);
        try {
            const user = await loginUseCase.execute(values.phone, values.password);
            console.log('Login exitoso, usuario:', user);
            navigate('/dashboard');
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return {
        phone: values.phone, 
        password: values.password,
        error,
        loading,
        showPassword,
        onChange,
        handleLogin,
        toggleShowPassword,
        navigate,
    };
};