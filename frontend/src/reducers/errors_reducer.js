import { combineReducers } from "redux";
import SessionErrorsReducer from "./session_errors_reducer";
import TransactionErrorsReducer from "./transaction_errors_reducer";
import UpdateTransactionErrorsReducer from "./update_transaction_errors_reducer";

export default combineReducers({
  session: SessionErrorsReducer,
  transaction: TransactionErrorsReducer,
  updatedTransaction: UpdateTransactionErrorsReducer
});
