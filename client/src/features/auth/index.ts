export { FormInput } from '@/features/auth/components/FormInput';
export { RegisterForm } from '@/features/auth/components/RegisterForm';
export { VisibilityToggle } from '@/features/auth/components/VisibilityToggle';

export { registerSchema } from '@/features/auth/schemas/registerSchema';

export { useRegisterForm } from '@/features/auth/hooks/useRegisterForm';

export type { TRegisterSchema } from '@/features/auth/schemas/registerSchema';
export type { ILoginRequest, ILoginResponse } from '@/features/auth/types/Login';
export type { IRefreshResponse } from '@/features/auth/types/Refresh';
export type { IRegisterRequest } from '@/features/auth/types/Register';

export { login } from '@/features/auth/api/login';
export { register } from '@/features/auth/api/register';
export { refresh } from '@/features/auth/api/refresh';

export { useAuthStore } from '@/features/auth/store/auth.store';

export { registerUser } from '@/features/auth/services/registerUser';
