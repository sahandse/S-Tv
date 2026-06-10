import { HashRouter, Routes, Route } from 'react-router-dom';
import { IPTVProvider, useIPTV } from './context/IPTVContext';
import Header from './components/Header';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Loading from './pages/Loading';
import ErrorPage from './pages/ErrorPage';

function AppRoutes() {
  const { loading, error } = useIPTV();

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error} />;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Browse mode="all-countries" />} />
          <Route path="/genres" element={<Browse mode="all-genres" />} />
          <Route path="/country/:code" element={<Browse mode="country" />} />
          <Route path="/genre/:id" element={<Browse mode="category" />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <IPTVProvider>
        <AppRoutes />
      </IPTVProvider>
    </HashRouter>
  );
}
