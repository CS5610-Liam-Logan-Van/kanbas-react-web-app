import { createContext, useContext, useState, useEffect } from "react";
import * as client from "../Account/client";

interface User {
    _id: string;
    username: string;
    role: "FACULTY" | "STUDENT";
}

interface UserContextType {
    user: User | null;
    loading: boolean;
    refetchUser: () => void; // refetch user for state updates
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const profileData = await client.profile();
            setUser(profileData);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setUser(null); // Reset user on error (like signed out)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile(); // user profile is fetched when the provider mounts
    }, []);

    const refetchUser = () => {
        fetchProfile();
    };

    return (
        <UserContext.Provider value={{ user, loading, refetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

