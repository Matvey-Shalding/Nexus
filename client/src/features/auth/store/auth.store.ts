import { create } from 'zustand';

interface AuthState {
	accessToken: string | null;
	setAccessToken: (accessToken: string) => void;
	clearAccessToken: () => void;
	isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
	accessToken: null,
	setAccessToken: accessToken => set({ accessToken }),
	clearAccessToken: () => set({ accessToken: null }),
	isAuthenticated: () => !!get().accessToken,
}));
