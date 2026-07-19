
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Portfolio from "./components/pages/Portfolio/Portfolio.tsx";
import Markets from "./components/pages/Markets/Markets.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Routes>
              <Route path="/" element ={<App/>} />
              <Route path="/portfolio" element ={<Portfolio/>} />
              <Route path="/markets" element ={<Markets/>} />
          </Routes>
      </BrowserRouter>
  </QueryClientProvider>,
)
