export { FormInput } from '@/features/auth/components/FormInput';
export { LoginForm } from '@/features/auth/components/LoginForm';
export { RegisterForm } from '@/features/auth/components/RegisterForm';
export { VisibilityToggle } from '@/features/auth/components/VisibilityToggle';

export { registerSchema } from '@/features/auth/schemas/registerSchema';
export { loginSchema } from '@/features/auth/schemas/loginSchema';

export { useRegisterForm } from '@/features/auth/hooks/useRegisterForm';
export { useLoginForm } from '@/features/auth/hooks/useLoginForm';

export type { TRegisterSchema } from '@/features/auth/schemas/registerSchema';
export type { TLoginSchema } from '@/features/auth/schemas/loginSchema';
export type { ILoginRequest, ILoginResponse } from '@/features/auth/types/Login';
export type { IRefreshResponse } from '@/features/auth/types/Refresh';
export type { IRegisterRequest } from '@/features/auth/types/Register';
export type { IUser } from '@/features/auth/types/User';

export { login } from '@/features/auth/api/login';
export { refresh } from '@/features/auth/api/refresh';
export { register } from '@/features/auth/api/register';
export { logout } from '@/features/auth/api/logout';
export { getCurrentUser } from '@/features/auth/api/getCurrentUser';

export { useAuthStore } from '@/features/auth/store/auth.store';

export { registerUser } from '@/features/auth/services/registerUser';
