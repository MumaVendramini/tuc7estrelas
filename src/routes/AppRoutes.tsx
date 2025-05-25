import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth/AuthContext';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/Dashboard';
import Calendar from '../pages/Calendar';
import Entities from '../pages/Entities';
import Studies from '../pages/Studies';
import Photos from '../pages/Photos';
import Songs from '../pages/Songs';
import Birthdays from '../pages/Birthdays';
import Financial from '../pages/Financial';
import Profile from '../pages/Profile';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';

// Componente para rotas protegidas
const PrivateRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles?: string[];
}> = ({ children, allowedRoles = [] }) => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  // Se não estiver autenticado, redirecionar para login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Se houver restrição de perfil e o utilizador não tiver permissão
  if (
    allowedRoles.length > 0 && 
    userRole && 
    !allowedRoles.includes(userRole) && 
    userRole !== 'Super_user'
  ) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/calendario" 
          element={
            <PrivateRoute>
              <Calendar />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/entidades" 
          element={
            <PrivateRoute>
              <Entities />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/estudos" 
          element={
            <PrivateRoute>
              <Studies />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/fotos" 
          element={
            <PrivateRoute>
              <Photos />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/pontos" 
          element={
            <PrivateRoute>
              <Songs />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/aniversarios" 
          element={
            <PrivateRoute>
              <Birthdays />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/financeiro" 
          element={
            <PrivateRoute>
              <Financial />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/perfil" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/admin" 
          element={
            <PrivateRoute allowedRoles={['Super_user', 'Adm']}>
              <Admin />
            </PrivateRoute>
          } 
        />

        {/* Rota para página não encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
