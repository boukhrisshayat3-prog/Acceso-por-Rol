import type React from "react";
import { Navigate } from "react-router-dom";

interface Props {
    isAllowed: boolean;
    children: React.ReactNode; // representa contenido que queremos proteger
    requiredRole?: 'admin' | 'user';
    userRole?: 'admin' | 'user';
}

const ProtectedRoute = ({ isAllowed, children, requiredRole, userRole }: Props) => {
    if (!isAllowed) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/access-denied" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;