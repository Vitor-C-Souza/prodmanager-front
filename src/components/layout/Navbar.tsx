import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import {
    Factory,
    TrendingUp,
    Package,
    Box,
    LogOut
} from 'lucide-react';

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { label: 'Production', path: '/dashboard', icon: <TrendingUp size={18} /> },
        { label: 'Materials', path: '/raw-materials', icon: <Box size={18} /> },
        { label: 'Products', path: '/products', icon: <Package size={18} /> },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
                            <Factory className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold text-slate-800 tracking-tight">
                            Production Manager
                        </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive(item.path)
                                        ? 'bg-blue-50 text-blue-600 shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {item.icon}
                                {/* O texto some em telas muito pequenas (xs) e volta no small (sm) */}
                                <span className="hidden sm:inline">{item.label}</span>
                            </Link>
                        ))}

                        <div className="h-6 w-px bg-gray-200 mx-1 sm:mx-2" />

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut size={18} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;