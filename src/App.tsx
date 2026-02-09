import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/login/Login';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Products from './pages/product/Product';


const MainLayout = () => (
  <>
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Outlet />
    </main>
  </>
);

const Dashboard = () => (
  <div>
    <h1 className="text-2xl font-bold text-slate-800">Production Dashboard</h1>
    <p className="text-slate-600 mt-2">Welcome back! Here is your production overview.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />


        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/materials" element={<Materials />} /> */}
            <Route path="/products" element={<Products />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;