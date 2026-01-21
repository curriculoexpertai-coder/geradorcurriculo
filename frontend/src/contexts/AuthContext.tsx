"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { syncUserToBackend } from "@/services/api";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    loginAsAdmin: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    loginAsAdmin: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const loginAsAdmin = () => {
        const mockUser = {
            uid: "admin-offline-test-123",
            email: "admin@teste.com",
            displayName: "Admin Local",
            getIdToken: async () => "mock-token",
        } as unknown as User;

        setUser(mockUser);
        // Sincroniza o admin local com o banco de dados para permitir salvar currículos
        syncUserToBackend(mockUser).catch(err => console.error("Falha na sincronização do admin:", err));
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
            if (fbUser) {
                console.log("Usuário detectado. Sincronizando em background...");
                setUser(fbUser);
                // Sincroniza em background, sem dar await no loading do app
                syncUserToBackend(fbUser).catch(err => console.error("Falha na sincronização:", err));
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, loginAsAdmin }}>
            {loading ? (
                <div className="flex h-screen w-screen items-center justify-center bg-zinc-950">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
