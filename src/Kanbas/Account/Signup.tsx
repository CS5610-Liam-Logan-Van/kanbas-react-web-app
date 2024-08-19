import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "./reducer";
import * as client from "./client";
import {useUser} from "./UserContext";

export default function Signup() {
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [user, setUser] = useState<any>({
        username: "",
        password: "",
        role: "STUDENT"
    });
    const navigate = useNavigate();
    const { refetchUser } = useUser()

    const signup = async () => {
        try {
            const currentUser = await client.signup(user, refetchUser);
            dispatch(setCurrentUser(currentUser));
            navigate("/Kanbas/Account/Profile");
        } catch (err: any) {
            setError(err.response.data.message || "Sign-up failed");
        }
    };

    return (
        <div className="wd-signup-screen">
            <h1>Sign up</h1>
            {error && <div className="wd-error alert alert-danger">{error}</div>}
            <input
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                className="wd-username form-control mb-2"
                placeholder="username"
            />
            <input
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                type="password"
                className="wd-password form-control mb-2"
                placeholder="password"
            />
            <select
                className="wd-select form-select mb-2"
                value={user.role}
                onChange={(e) => setUser({...user, role: e.target.value})}
            >
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
            </select>
            <button id="wd-signup-btn" onClick={signup} className="btn btn-primary w-100"> Sign up</button>
            <br/>
            <Link to="/Kanbas/Account/Signin" className="wd-signin-link">Sign in</Link>
        </div>
    );
}
