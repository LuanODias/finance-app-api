import { useState, useEffect, useRef } from 'react'
import './styles.css'

export function TransactionList({ transactions, onEdit, onDelete }) {
    const [openMenuId, setOpenMenuId] = useState(null)
    const menuRef = useRef(null)

    const toggleMenu = (id, event) => {
        event.stopPropagation()
        setOpenMenuId(openMenuId === id ? null : id)
    }

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    if (transactions.length === 0) {
        return (
            <div className="list-container empty">
                <div className="empty-state">
                    <p>Nenhuma transação cadastrada.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="list-container">
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>NOME</th>
                        <th>VALOR</th>
                        <th>TIPO</th>
                        <th>DATA</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td className="col-name">{transaction.name}</td>
                            <td
                                className={`col-amount ${
                                    transaction.type === 'EXPENSE'
                                        ? 'expense'
                                        : transaction.type === 'EARNING'
                                          ? 'earning'
                                          : 'investment'
                                }`}
                            >
                                {transaction.type === 'EXPENSE' ? '- ' : '+ '}
                                {Number(transaction.amount).toLocaleString(
                                    'pt-BR',
                                    {
                                        style: 'currency',
                                        currency: 'BRL',
                                    },
                                )}
                            </td>
                            <td>
                                <span
                                    className={`badge ${transaction.type.toLowerCase()}`}
                                >
                                    {transaction.type === 'EXPENSE'
                                        ? 'Despesa'
                                        : transaction.type === 'EARNING'
                                          ? 'Receita'
                                          : 'Investimento'}
                                </span>
                            </td>
                            <td className="col-date">
                                {new Date(transaction.date).toLocaleDateString(
                                    'pt-BR',
                                )}
                            </td>
                            <td
                                className="col-actions"
                                style={{ position: 'relative' }}
                            >
                                <button
                                    className="btn-icon"
                                    onClick={(e) =>
                                        toggleMenu(transaction.id, e)
                                    }
                                    title="Ações"
                                >
                                    ⋮
                                </button>
                                {openMenuId === transaction.id && (
                                    <div className="action-menu" ref={menuRef}>
                                        <button
                                            className="menu-item"
                                            onClick={() => {
                                                onEdit(transaction)
                                                setOpenMenuId(null)
                                            }}
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button
                                            className="menu-item delete"
                                            onClick={() => {
                                                onDelete(transaction.id)
                                                setOpenMenuId(null)
                                            }}
                                        >
                                            🗑️ Excluir
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
