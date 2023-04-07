import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./servicesWorker";
import "./assets/sass/global.sass";
import { store } from "./redux/store";
import queryClient from "./configs/react-query.config";



ReactDOM.render(
  
  <QueryClientProvider client={queryClient}>
    <Router>
       <App />
    </Router>
  </QueryClientProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
