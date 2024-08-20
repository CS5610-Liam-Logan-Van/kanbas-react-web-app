import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useUser } from "../Account/UserContext";

export default function Profile() {
    const dispatch = useDispatch();
    const { user, refetchUser } = useUser();
    const [profile, setProfile] = useState<any>(user || {}); // Initially set to user or an empty object
    const [isSaving, setIsSaving] = useState(false); // Prevent rapid save clicks
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Refetch user data when navigating to /Account/Profile
        if (location.pathname === "/Kanbas/Account/Profile") {
            refetchUser();
        }
    }, [location, refetchUser]);

    useEffect(() => {
        // Update the local state whenever the user context changes
        if (user) {
            setProfile({ ...user });
        }
    }, [user]);

    const updateProfile = async () => {
        try {
            setIsSaving(true); // Prevent multiple save clicks
            await client.editUser(profile); // Update the profile in the backend
            await refetchUser(); // Refetch the updated profile data
            setIsSaving(false); // Allow saving again
        } catch (err: any) {
            setIsSaving(false);
            console.error("Failed to update profile", err);
        }
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kanbas/Account/Signin");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile((prevProfile: any) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    return (
        <div className="wd-profile-screen">
            <h1>Profile</h1>
            {profile && (
                <div>
                    Username:
                    <input
                        name="username"
                        className="wd-username form-control mb-2"
                        value={profile.username || ""}
                        onChange={handleChange}
                    />
                    Password:
                    <input
                        name="password"
                        className="wd-password form-control mb-2"
                        type="password"
                        value={profile.password || ""}
                        onChange={handleChange}
                    />
                    First Name:
                    <input
                        name="firstName"
                        className="wd-firstname form-control mb-2"
                        value={profile.firstName || ""}
                        onChange={handleChange}
                    />
                    Last Name:
                    <input
                        name="lastName"
                        className="wd-lastname form-control mb-2"
                        value={profile.lastName || ""}
                        onChange={handleChange}
                    />
                    DOB:
                    <input
                        name="dob"
                        className="wd-dob form-control mb-2"
                        value={profile.dob || ""}
                        onChange={handleChange}
                        type="date"
                    />
                    Email:
                    <input
                        name="email"
                        className="wd-email form-control mb-2"
                        value={profile.email || ""}
                        onChange={handleChange}
                    />
                    Role:
                    <select
                        name="role"
                        className="wd-role form-control mb-2"
                        value={profile.role || ""}
                        onChange={handleChange}
                    >
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <button
                        className="wd-saveprofile-btn btn btn-primary w-100 mb-2"
                        onClick={updateProfile}
                        disabled={isSaving} // Disable the button while saving
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        onClick={signout}
                        className="wd-signout-btn btn btn-danger w-100"
                    >
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}
