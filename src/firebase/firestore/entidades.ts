import React from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { UserRole } from '../../firebase/auth';

// Interface para entidade espiritual
export interface Entidade {
  id: string;
  nome: string;
  tipo: string;
  descricao: string;
  mediumId: string;
  mediumNome: string;
}

// Função para buscar entidades
export const getEntidades = async (): Promise<Entidade[]> => {
  try {
    const entidadesRef = collection(db, 'entidades');
    const snapshot = await getDocs(entidadesRef);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Entidade));
  } catch (error) {
    console.error('Erro ao buscar entidades:', error);
    throw error;
  }
};

// Função para buscar entidades de um médium específico
export const getEntidadesByMedium = async (mediumId: string): Promise<Entidade[]> => {
  try {
    const entidadesRef = collection(db, 'entidades');
    const q = query(entidadesRef, where('mediumId', '==', mediumId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Entidade));
  } catch (error) {
    console.error('Erro ao buscar entidades do médium:', error);
    throw error;
  }
};

// Função para verificar se o usuário pode criar/editar entidades
export const canManageEntidades = (role: UserRole | null): boolean => {
  if (!role) return false;
  return ['Super_user', 'Adm'].includes(role);
};
