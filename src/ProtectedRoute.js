import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        !isAuthenticated && navigate("/signin");
    }, [isAuthenticated]);

    return isAuthenticated && props.children;
};

export default ProtectedRoute;
