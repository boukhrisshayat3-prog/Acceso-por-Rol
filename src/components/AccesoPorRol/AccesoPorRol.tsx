import type React from "react";
import { Navigate } from "react-router-dom";
interface User {
    id: number;
    name: string;
    role: 'admin' | 'user';
}

interface Props {
    user: User | null;
    children: React.ReactNode; // representa contenido que queremos proteger
    requiredRole?: 'admin' | 'user';
    
}

const ProtectedRoute = ({ user, children, requiredRole}: Props) => {
    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/access-denied" replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;