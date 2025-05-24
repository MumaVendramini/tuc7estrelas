import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  UserCredential,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

// Exportar explicitamente a instância auth para uso em outros componentes
export { auth };

// Tipos de perfil de utilizador
export type UserRole = 'Super_user' | 'Adm' | 'Tesoureiro' | 'Medium';

// Interface para o perfil de utilizador
export interface UserProfile {
  email: string;
  nome: string;
  role: UserRole;
  createdAt: Date;
  lastLogin?: Date;
}

// Função para criar um novo utilizador
export const createUser = async (
  email: string, 
  password: string, 
  nome: string, 
  role: UserRole
): Promise<UserCredential> => {
  try {
    // Criar utilizador na autenticação do Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Criar perfil do utilizador no Firestore
    await setDoc(doc(db, 'usuario', userCredential.user.uid), {
      email,
      nome,
      role,
      createdAt: new Date(),
    });
    
    return userCredential;
  } catch (error) {
    console.error('Erro ao criar utilizador:', error);
    throw error;
  }
};

// Função para fazer login
export const loginUser = async (
  email: string, 
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Atualizar último login
    const userRef = doc(db, 'usuario', userCredential.user.uid);
    await setDoc(userRef, { lastLogin: new Date() }, { merge: true });
    
    return userCredential;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// Função para fazer logout
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
};

// Função para obter o perfil do utilizador
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'usuario', userId));
    
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao obter perfil do utilizador:', error);
    throw error;
  }
};

// Função para verificar se o utilizador tem permissão para uma determinada ação
export const hasPermission = async (user: User | null, requiredRole: UserRole[]): Promise<boolean> => {
  if (!user) return false;
  
  try {
    const profile = await getUserProfile(user.uid);
    
    if (!profile) return false;
    
    // Super_user tem acesso a tudo
    if (profile.role === 'Super_user') return true;
    
    // Verificar se o perfil do utilizador está na lista de perfis permitidos
    return requiredRole.includes(profile.role);
  } catch (error) {
    console.error('Erro ao verificar permissões:', error);
    return false;
  }
};
