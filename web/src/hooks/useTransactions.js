import { useState, useCallback } from 'react'
import {
    getTransactions,
    getUserBalance,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from '../services/api'

export function useTransactions(userId) {
    const [transactions, setTransactions] = useState([])
    const [balance, setBalance] = useState({
        balance: 0,
        earnings: 0,
        expenses: 0,
        investments: 0,
    })

    const loadTransactions = useCallback(async () => {
        if (!userId) return

        try {
            const [transactionsData, balanceData] = await Promise.all([
                getTransactions(userId),
                getUserBalance(userId),
            ])

            setTransactions(transactionsData)
            setBalance(balanceData)
        } catch (error) {
            console.error('Erro ao buscar dados:', error)
            alert('Não foi possível carregar os dados. Tente novamente.')
        }
    }, [userId])

    const addTransaction = async (transactionData) => {
        await createTransaction(transactionData)
        await loadTransactions()
    }

    const editTransactionData = async (id, transactionData) => {
        await updateTransaction(id, transactionData)
        await loadTransactions()
    }

    const removeTransaction = async (id) => {
        if (confirm('Tem certeza que deseja excluir esta transação?')) {
            await deleteTransaction(id)
            await loadTransactions()
        }
    }

    return {
        transactions,
        balance,
        loadTransactions,
        addTransaction,
        editTransactionData,
        removeTransaction,
    }
}
