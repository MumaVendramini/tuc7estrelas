import React from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { UserRole } from '../../firebase/auth';

// Interface para transação financeira
export interface FinancialTransaction {
  id: string;
  userId: string;
  userName: string;
  tipo: 'entrada' | 'saida';
  valor: number;
  descricao: string;
  data: Date;
  aprovadoPor?: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
}

// Função para buscar transações financeiras de um utilizador
export const getUserTransactions = async (userId: string): Promise<FinancialTransaction[]> => {
  try {
    const transactionsRef = collection(db, 'financeiro');
    const q = query(transactionsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        data: data.data.toDate()
      } as FinancialTransaction;
    });
  } catch (error) {
    console.error('Erro ao buscar transações do utilizador:', error);
    throw error;
  }
};

// Função para buscar todas as transações (apenas para Tesoureiro e Super_user)
export const getAllTransactions = async (): Promise<FinancialTransaction[]> => {
  try {
    const transactionsRef = collection(db, 'financeiro');
    const snapshot = await getDocs(transactionsRef);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        data: data.data.toDate()
      } as FinancialTransaction;
    });
  } catch (error) {
    console.error('Erro ao buscar todas as transações:', error);
    throw error;
  }
};

// Função para verificar se o utilizador pode gerir finanças
export const canManageFinances = (role: UserRole | null): boolean => {
  if (!role) return false;
  return ['Super_user', 'Tesoureiro'].includes(role);
};

// Função para verificar se o utilizador pode ver todas as finanças
export const canViewAllFinances = (role: UserRole | null): boolean => {
  if (!role) return false;
  return ['Super_user', 'Tesoureiro'].includes(role);
};
