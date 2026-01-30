import { useState } from 'react'
import { createTransaction, updateTransaction } from '../../services/api'
import { formatDateForInput, formatDateForAPI } from '../../utils/date-helper'
import './styles.css'

export function TransactionForm({
    onSuccess,
    userId,
    transactionToEdit,
    onCancelEdit,
}) {
    const [formData, setFormData] = useState(() => {
        if (transactionToEdit) {
            return {
                name: transactionToEdit.name,
                amount: transactionToEdit.amount,
                type: transactionToEdit.type,
                date: formatDateForInput(transactionToEdit.date),
            }
        }
        return {
            name: '',
            amount: '',
            type: 'EXPENSE',
            date: formatDateForInput(new Date().toISOString()),
        }
    })
    const [status, setStatus] = useState({ type: '', message: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ type: '', message: '' })

        try {
            const payload = {
                ...formData,
                amount: Number(formData.amount),
                date: formatDateForAPI(formData.date),
                user_id: userId,
            }

            if (transactionToEdit) {
                await updateTransaction(transactionToEdit.id, payload)
                setStatus({
                    type: 'success',
                    message: 'Transação atualizada com sucesso!',
                })
            } else {
                await createTransaction(payload)
                setStatus({
                    type: 'success',
                    message: 'Transação criada com sucesso!',
                })
            }

            if (!transactionToEdit) {
                setFormData({
                    name: '',
                    amount: '',
                    type: 'EXPENSE',
                    date: formatDateForInput(new Date().toISOString()),
                })
            }

            if (onSuccess) onSuccess()

            if (transactionToEdit && onCancelEdit) {
                setTimeout(() => onCancelEdit(), 2000)
            } else {
                setTimeout(() => setStatus({ type: '', message: '' }), 3000)
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Erro: ' + error.message })
        }
    }

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <h3>
                    {transactionToEdit ? 'Editar Transação' : 'Nova Transação'}
                </h3>

                <div className="form-group">
                    <label>Nome da Transação</label>
                    <input
                        name="name"
                        placeholder="Ex: Mercado"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>Valor (R$)</label>
                    <input
                        name="amount"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>Tipo</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="input-field"
                    >
                        <option value="EXPENSE">💸 Despesa</option>
                        <option value="EARNING">💰 Receita</option>
                        <option value="INVESTMENT">📈 Investimento</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Data</label>
                    <input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>

                <button type="submit" className="btn-submit">
                    {transactionToEdit
                        ? 'Salvar Alterações'
                        : 'Adicionar Transação'}
                </button>

                {transactionToEdit && (
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={onCancelEdit}
                    >
                        Cancelar Edição
                    </button>
                )}
            </form>

            {status.message && (
                <div className={`message ${status.type}`}>{status.message}</div>
            )}
        </div>
    )
}
