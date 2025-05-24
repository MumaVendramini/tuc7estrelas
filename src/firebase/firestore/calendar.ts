import React from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { UserRole } from '../../firebase/auth';

// Interface para evento do calendário
export interface CalendarEvent {
  id: string;
  data: Date;
  linha: string;
  traje: string;
  observacao: string;
  imagemUrl?: string;
  criadoPor: string;
  dataCriacao: Date;
}

// Função para buscar eventos do calendário
export const getCalendarEvents = async (): Promise<CalendarEvent[]> => {
  try {
    const eventsRef = collection(db, 'eventos');
    const snapshot = await getDocs(eventsRef);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        data: data.data.toDate(),
        dataCriacao: data.dataCriacao.toDate()
      } as CalendarEvent;
    });
  } catch (error) {
    console.error('Erro ao buscar eventos do calendário:', error);
    throw error;
  }
};

// Função para buscar eventos por mês
export const getEventsByMonth = async (month: number, year: number): Promise<CalendarEvent[]> => {
  try {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    
    const eventsRef = collection(db, 'eventos');
    const q = query(
      eventsRef, 
      where('data', '>=', startDate),
      where('data', '<=', endDate)
    );
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        data: data.data.toDate(),
        dataCriacao: data.dataCriacao.toDate()
      } as CalendarEvent;
    });
  } catch (error) {
    console.error('Erro ao buscar eventos por mês:', error);
    throw error;
  }
};

// Função para verificar se o usuário pode criar/editar eventos
export const canManageEvents = (role: UserRole | null): boolean => {
  if (!role) return false;
  return ['Super_user', 'Adm'].includes(role);
};
