import React, {createContext, useContext, useState, useEffect, useCallback} from "react";
import * as client from "../Account/client";

interface User {
    _id: string;
    username: string;
    role: "FACULTY" | "STUDENT";
    enrolledCourses: string[];
}

interface UserContextType {
    user: User | null;
    loading: boolean;
    refetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UserProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = useCallback(async () => {
        setLoading(true);
        try {
            const profileData = await client.profile();
            setUser({...profileData}); // Ensure a new object reference
        } catch (error) {
            console.error("Error fetching user profile:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const refetchUser = useCallback(() => {
        fetchProfile();
    }, [fetchProfile]);

    useEffect(() => {
        fetchProfile(); // Initial profile fetch
    }, [fetchProfile]);

    return (
        <UserContext.Provider value={{user, loading, refetchUser}}>
            {children}
        </UserContext.Provider>
    );
};
