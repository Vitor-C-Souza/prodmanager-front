import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/login/Login';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Products from './pages/product/Product';
import RawMaterials from './pages/rawMaterial/RawMaterials';
import ProductionDashboard from './pages/ProductionDashboard/ProductionDashboard';


const MainLayout = () => (
  <>
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Outlet />
    </main>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />


        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<ProductionDashboard />} />
            <Route path="/raw-materials" element={<RawMaterials />} />
            <Route path="/products" element={<Products />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;