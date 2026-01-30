import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

api.interceptors.request.use((config) => {
    return config
})

export const createUser = async (userData) => {
    try {
        const response = await api.post('/users', userData)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Erro ao criar usuário',
        )
    }
}

export const createTransaction = async (transactionData) => {
    try {
        const response = await api.post('/transactions', transactionData)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Erro ao criar transação',
        )
    }
}

export const getTransactions = async (userId) => {
    try {
        const response = await api.get('/transactions', {
            params: { userId },
        })
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Erro ao buscar transações',
        )
    }
}

export const getUserBalance = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}/balance`)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao buscar saldo')
    }
}

export const updateTransaction = async (transactionId, transactionData) => {
    try {
        const response = await api.patch(
            `/transactions/${transactionId}`,
            transactionData,
        )
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Erro ao atualizar transação',
        )
    }
}

export const deleteTransaction = async (transactionId) => {
    try {
        const response = await api.delete(`/transactions/${transactionId}`)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Erro ao deletar transação',
        )
    }
}
