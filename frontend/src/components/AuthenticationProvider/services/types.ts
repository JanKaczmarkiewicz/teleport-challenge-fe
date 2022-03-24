export type ContextValue = {
    isAuthenticated: boolean;
    login: (arg: { username: string; password: string }) => Promise<void>;
    logout: () => void;
};
