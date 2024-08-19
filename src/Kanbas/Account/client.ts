import axios from "axios";
import {QUIZZES_API} from "../Courses/Quizzes/client";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const signin = async (credentials: any, refetchUser: () => void) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    refetchUser();
    return response.data;
};

export const profile = async (refetchUser?: () => void) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    if (refetchUser) refetchUser(); // call refetchUser if it’s provided
    return response.data;
};

export const signup = async (user: any, refetchUser: () => void) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    refetchUser();
    return response.data;
};

export const signout = async (refetchUser?: () => void) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    if (refetchUser) refetchUser(); // call refetchUser if it’s provided
    return response.data;
};

export const updateUser = async (user: any, refetchUser: () => void) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    refetchUser();
    return response.data;
};
