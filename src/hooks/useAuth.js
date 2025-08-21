import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded);
                setUser({
                    id: decoded.id,
                    role: decoded.role || decoded.user?.role,
                    name: decoded.name,
                    email: decoded.email
                });
            } catch (err) {
                console.error("Invalid token", err);
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    return { user, isAuthenticated: !!user, loading };
};

export default useAuth;
