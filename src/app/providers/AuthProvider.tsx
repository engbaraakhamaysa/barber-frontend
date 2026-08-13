import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Handles authentication API and storage.
import { authService } from "../../features/auth/auth.service";

import type { LoginRequest, User } from "../../features/auth/auth.types";

// Defines the authentication context.
interface AuthContextType {
  user: User | null;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

// Creates the authentication context.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Stores the currently authenticated user.
  const [user, setUser] = useState<User | null>(null);

  // Tracks the initial authentication check.
  const [loading, setLoading] = useState(true);

  // Restores the current user when the app starts.
  useEffect(() => {
    const currentUser = authService.getCurrentUser();

    setUser(currentUser);
    setLoading(false);
  }, []);

  // Logs in the user and updates the authentication state.
  const login = async (data: LoginRequest) => {
    const response = await authService.login(data);

    setUser(response.user);
  };

  // Logs out the user and clears the authentication state.
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    // Provides authentication state and actions to the app.
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Provides access to the authentication context.
export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}
