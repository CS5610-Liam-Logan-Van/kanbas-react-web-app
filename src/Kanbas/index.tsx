import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import {Routes, Route, Navigate} from "react-router";
import Courses from "./Courses";
import Account from "./Account";
import * as client from "./Courses/client";
import {useEffect, useState} from "react";
import "./styles.css";
import store from "./store";
import {Provider} from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const fetchCourses = async () => {
        const courses = await client.fetchAllCourses();
        setCourses(courses);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    const addNewCourse = async () => {
        const newCourse = await client.createCourse(course);
        setCourses([...courses, newCourse]);
    };

    const deleteCourse = async (courseId: string) => {
        await client.deleteCourse(courseId);
        setCourses(courses.filter(
            (c) => c._id !== courseId));
    };

    const updateCourse = async () => {
        await client.updateCourse(course);
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
    };


    return (
        <Provider store={store}>
            <div id="wd-kanbas">
                <KanbasNavigation/>
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/Account/*" element={<Account />}/>
                        <Route path="/" element={<Navigate to="Dashboard"/>}/>
                        <Route path="Dashboard" element={<ProtectedRoute><Dashboard
                            courses={courses}
                            course={course}
                            setCourse={setCourse}
                            addNewCourse={addNewCourse}
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse}
                            /></ProtectedRoute>}/>
                        <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses}/></ProtectedRoute>}/>
                    </Routes>
                </div>
            </div>
        </Provider>
    );
}
