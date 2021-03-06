import { connect } from 'react-redux';
import TransactionIndex from './transaction_index';
import { 
    fetchAllTransactions, 
    fetchFilteredTransactions,
    logTransaction, 
    receiveTransactionErrors, 
    deleteTransaction,
    updateTransaction,
    receiveUpdatedTransactionErrors
} from '../../actions/transactions_actions'
import { fetchCurrentUser } from '../../actions/users_actions';

const mapStateToProps = (state) => {
    return {
        transactions: state.entities.transactions,
        errors: Object.values(state.errors.transaction),
        updateErrors: Object.values(state.errors.updatedTransaction),
        currentUser: state.entities.currentUser.data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTransactions: () => dispatch(fetchAllTransactions()),
        fetchFilteredTransactions: (category) => dispatch(fetchFilteredTransactions(category)),
        createTransaction: (transaction) => dispatch(logTransaction(transaction)),
        deleteTransaction: (transaction) => dispatch(deleteTransaction(transaction)),
        editTransaction: (transaction) => dispatch(updateTransaction(transaction)),
        clearTransactionErrors: () => dispatch(receiveTransactionErrors([])),
        clearUpdatedTransactionErrors: () => dispatch(receiveUpdatedTransactionErrors([])),
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TransactionIndex);