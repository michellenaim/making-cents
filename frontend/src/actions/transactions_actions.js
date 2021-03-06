import * as TransactionApiUtil from "../util/transactions_api_util";

export const RECEIVE_All_TRANSACTIONS = "RECEIVE_All_TRANSACTIONS";
export const CREATE_TRANSACTION = "CREATE_TRANSACTION";
export const EDIT_TRANSACTION = "EDIT_TRANSACTION";
export const REMOVE_TRANSACTION = "REMOVE_TRANSACTION";
export const RECEIVE_TRANSACTION_ERRORS = "RECEIVE_TRANSACTION_ERRORS";
export const RECEIVE_UPDATED_TRANSACTION_ERRORS = "RECEIVE_UPDATED_TRANSACTION_ERRORS";
export const CLEAR_TRANSACTION_ERRORS = "CLEAR_TRANSACTION_ERRORS";
export const RECEIVE_FILTERED_TRANSACTIONS = "RECEIVE_FILTERED_TRANSACTIONS";

export const receiveAllTransactions = (transactions) => {
    return ({
        type: RECEIVE_All_TRANSACTIONS,
        transactions
    })
}

export const receiveFilteredTransactions = (transactions) => {
    return ({
        type: RECEIVE_FILTERED_TRANSACTIONS,
        transactions
    })
}

export const createTransaction = (transaction) => {
    return ({
        type: CREATE_TRANSACTION,
        transaction
    })
}

export const editTransaction = (transaction) => {
    return ({
        type: EDIT_TRANSACTION,
        transaction
    })
}

export const removeTransaction = (transaction) => {
    return ({
        type: REMOVE_TRANSACTION,
        transaction
    })
}

export const receiveTransactionErrors = (errors) => {
    return({
        type: RECEIVE_TRANSACTION_ERRORS,
        errors
    })
}

export const receiveUpdatedTransactionErrors = (errors) => {
    return ({
        type: RECEIVE_UPDATED_TRANSACTION_ERRORS,
        errors
    })
}

export const removeTransactionErrors = () => {
    return ({
        type: CLEAR_TRANSACTION_ERRORS
    })
}

export const fetchAllTransactions = () => dispatch => {
    return TransactionApiUtil.fetchAllTransactions()
        .then(transactions => dispatch(receiveAllTransactions(transactions)))
}

export const fetchFilteredTransactions = (category) => dispatch => {
    return TransactionApiUtil.fetchFilteredTransactions(category)
        .then(transactions => dispatch(receiveFilteredTransactions(transactions)))
}



export const logTransaction = (transaction) => dispatch => {
    return TransactionApiUtil.logTransaction(transaction)
        .then(
            transaction => dispatch(createTransaction(transaction)), 
            (err) => {
                dispatch(receiveTransactionErrors(err))
                return(Promise.reject())
            }
        )
}

export const updateTransaction = (transaction) => dispatch => {
    return TransactionApiUtil.updateTransaction(transaction)
        .then(
            transaction => dispatch(editTransaction(transaction)),
            (err) => {
                dispatch(receiveUpdatedTransactionErrors(err))
                return (Promise.reject())
            }       
        )
}

export const deleteTransaction = (transaction) => dispatch => {
    return TransactionApiUtil.deleteTransaction(transaction)
        .then(transaction => dispatch(removeTransaction(transaction)))
}



