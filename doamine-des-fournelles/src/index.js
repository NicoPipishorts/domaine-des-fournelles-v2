import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

import './styles/index.scss';

const rootReactElement = (
    <BrowserRouter basename={"/"}>
      <App />
    </BrowserRouter>
);

const target = document.getElementById('root');

ReactDom.render(rootReactElement, target);