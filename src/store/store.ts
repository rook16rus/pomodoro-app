import { applyMiddleware, compose, createStore } from "redux";
import ReduxThunk from 'redux-thunk'
import reducer from "../reducer/reducer";

const store = createStore(
    reducer,
    compose(
        applyMiddleware(ReduxThunk),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )

);

export default store