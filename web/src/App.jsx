import { useState, useEffect } from 'react'
import { UserForm } from './components/user-form'
import { TransactionForm } from './components/transaction-form'
import { TransactionList } from './components/transaction-list'
import { BalanceDisplay } from './components/balance-display'
import { useTransactions } from './hooks/useTransactions'
import './App.css'

function App() {
    const [userId, setUserId] = useState(null)
    const [transactionToEdit, setTransactionToEdit] = useState(null)

    const { transactions, balance, loadTransactions, removeTransaction } =
        useTransactions(userId)
    useEffect(() => {
        if (userId) {
            loadTransactions()
        }
    }, [userId, loadTransactions])

    const handleLoginSuccess = (id) => {
        setUserId(id)
    }

    const handleEditTransaction = (transaction) => {
        setTransactionToEdit(transaction)
    }

    const handleCancelEdit = () => {
        setTransactionToEdit(null)
    }

    const handleSuccess = async () => {
        await loadTransactions()
        handleCancelEdit()
    }

    if (!userId) {
        return (
            <div className="login-wrapper">
                <UserForm onUserCreated={handleLoginSuccess} />
            </div>
        )
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-content">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}
                    >
                        <h1>Finance.App 💰</h1>
                        <span
                            style={{
                                fontSize: '0.8rem',
                                color: '#e2e8f0',
                                opacity: 0.8,
                            }}
                            title="User ID"
                        >
                            ID: {userId}
                        </span>
                    </div>
                    <button
                        className="btn-logout"
                        onClick={() => setUserId(null)}
                    >
                        Sair ➡
                    </button>
                </div>
            </header>

            <main className="dashboard-content">
                <section className="balance-section">
                    <BalanceDisplay balanceData={balance} />
                </section>

                <section className="dashboard-grid">
                    <div className="list-area card">
                        <h3>Histórico de Transações</h3>
                        <TransactionList
                            transactions={transactions}
                            onEdit={handleEditTransaction}
                            onDelete={removeTransaction}
                        />
                    </div>
                    <div className="form-area">
                        <TransactionForm
                            key={
                                transactionToEdit ? transactionToEdit.id : 'new'
                            }
                            userId={userId}
                            onSuccess={handleSuccess}
                            transactionToEdit={transactionToEdit}
                            onCancelEdit={handleCancelEdit}
                        />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default App
