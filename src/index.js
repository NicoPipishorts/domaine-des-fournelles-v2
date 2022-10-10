import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/App';

import './styles/index.scss';
import './index.css';
import store from './store';

const rootReactElement = (
  <Provider store={store}>
    <BrowserRouter basename={"/"}>
      <App />
    </BrowserRouter>
  </Provider>
);

const target = document.getElementById('root');

ReactDom.render(rootReactElement, target);