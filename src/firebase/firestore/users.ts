import React from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { UserRole } from '../../firebase/auth';

// Interface para utilizador
export interface User {
  id: string;
  email: string;
  nome: string;
  role: UserRole;
  createdAt: Date;
  lastLogin?: Date;
}

// Função para buscar todos os utilizadores (apenas para Admin e Super_user)
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const usersRef = collection(db, 'usuario');
    const snapshot = await getDocs(usersRef);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        lastLogin: data.lastLogin ? data.lastLogin.toDate() : undefined
      } as User;
    });
  } catch (error) {
    console.error('Erro ao buscar utilizadores:', error);
    throw error;
  }
};

// Função para buscar utilizadores por perfil
export const getUsersByRole = async (role: UserRole): Promise<User[]> => {
  try {
    const usersRef = collection(db, 'usuario');
    const q = query(usersRef, where('role', '==', role));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        lastLogin: data.lastLogin ? data.lastLogin.toDate() : undefined
      } as User;
    });
  } catch (error) {
    console.error('Erro ao buscar utilizadores por perfil:', error);
    throw error;
  }
};

// Função para verificar se o utilizador pode gerir outros utilizadores
export const canManageUsers = (role: UserRole | null): boolean => {
  if (!role) return false;
  return ['Super_user', 'Adm'].includes(role);
};

// Função para verificar se o utilizador pode gerir tesoureiros
export const canManageTreasurers = (role: UserRole | null): boolean => {
  if (!role) return false;
  return role === 'Super_user';
};
