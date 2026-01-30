import { useState } from 'react'
import { createUser } from '../../services/api'
import './style.css'

export function UserForm({ onUserCreated }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })
    const [status, setStatus] = useState({ type: '', message: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ type: 'loading', message: 'Criando usuário...' })

        try {
            const newUser = await createUser(formData)
            setStatus({
                type: 'success',
                message: `Bem-vindo, ${newUser.first_name}!`,
            })
            setTimeout(() => onUserCreated(newUser.id), 1500)
        } catch (error) {
            setStatus({ type: 'error', message: error.message })
        }
    }

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    return (
        <div className="form-container">
            <h2>Gestão Financeira</h2>
            <h2>Crie sua conta</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="first_name"
                    placeholder="Nome"
                    onChange={handleChange}
                    required
                />
                <input
                    name="last_name"
                    placeholder="Sobrenome"
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Senha (mínimo de 6 caracteres)"
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={status.type === 'loading'}>
                    {status.type === 'loading' ? 'Carregando...' : 'Entrar'}
                </button>
            </form>
            {status.message && (
                <p className={`message ${status.type}`}>{status.message}</p>
            )}
        </div>
    )
}
