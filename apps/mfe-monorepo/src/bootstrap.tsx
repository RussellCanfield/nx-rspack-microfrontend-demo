import { createRoot } from 'react-dom/client';
import App from './app/App';
import './index.css';

const appElement = document.getElementById('app');

const root = createRoot(appElement!);
root.render(<App />);
