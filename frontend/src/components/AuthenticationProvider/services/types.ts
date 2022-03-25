export type ContextValue = {
    isAuthenticated: boolean;
    login: (arg: { username: string; password: string }) => Promise<void>;
    logout: () => void;
};

export type LocationState = {
    referrer: string;
};
