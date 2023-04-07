import { Provider } from "react-redux";
import {AppContainer} from './configs/containers/AppContainer';
import 'antd/dist/antd.css';
import './assets/sass/global.sass';
import {persistor, store} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';


function App() {
  return (

      <div className="App">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <AppContainer/>
          </PersistGate>
        </Provider>
      </div> 
  );
}

export default App;
