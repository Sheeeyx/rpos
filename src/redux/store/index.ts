import { createStore } from "redux";
import rootReducer from "../reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "GridReduxPersist",
    storage,
  };


const persistedReducer = persistReducer(persistConfig, rootReducer);

  
export const store = createStore(
    persistedReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export const persistor = persistStore(store);



