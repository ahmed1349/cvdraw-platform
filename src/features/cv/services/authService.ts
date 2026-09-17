export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthService {
  getCurrentUser(): Promise<AuthUser | null>;
  signInWithEmail(email: string, password: string): Promise<AuthUser>;
  signOut(): Promise<void>;
}

class GuestAuthService implements AuthService {
  async getCurrentUser() {
    return null;
  }

  async signInWithEmail(): Promise<AuthUser> {
    throw new Error("Email sign-in is not available yet.");
  }

  async signOut() {
    return;
  }
}

export const authService: AuthService = new GuestAuthService();
