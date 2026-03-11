export class TransactionNotFoundError extends Error {
    constructor(transactionId){
        super(`TransactionId ${transactionId} not found.`)
        this.name =  'TransactionNotFoundError'
    }
}