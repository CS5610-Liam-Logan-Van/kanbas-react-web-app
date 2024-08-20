import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Account/UserContext";
import * as client from "../Account/client";

export default function Dashboard({
                                      courses,
                                      course,
                                      setCourse,
                                      addNewCourse,
                                      deleteCourse,
                                      updateCourse,
                                  }: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
}) {
    const { user, loading, refetchUser } = useUser();
    const [selectedCourseId, setSelectedCourseId] = useState<string>("");

    if (loading || !user) return <div>Loading still...</div>;

    const isFaculty = user.role === "FACULTY";
    const user_courses = user.enrolledCourses ?? [];

    const handleEnroll = async () => {
        if (selectedCourseId) {
            try {
                const updatedUser = {
                    ...user,
                    enrolledCourses: Array.isArray(user.enrolledCourses)
                        ? [...user.enrolledCourses, selectedCourseId]
                        : [selectedCourseId],
                };

                await client.updateUser(updatedUser, refetchUser);
                alert("Enrolled successfully!");
            } catch (error) {
                console.error("Failed to enroll in course:", error);
            }
        }
    };

    const handleCreateCourse = async () => {
        try {
            addNewCourse(); // Create the course
            refetchUser(); // Fetch the updated user data
        } catch (error) {
            console.error("Failed to create a new course:", error);
        }
    };

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            {isFaculty ? (
                <div>
                    <h5>
                        New Course
                        <button
                            className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={handleCreateCourse} // Updated to handle course creation
                        >
                            Add
                        </button>
                        <button
                            className="btn btn-warning float-end me-2"
                            onClick={updateCourse}
                            id="wd-update-course-click"
                        >
                            Update
                        </button>
                    </h5>
                    <br />
                    <input
                        value={course.name}
                        className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                    />
                    <textarea
                        value={course.description}
                        className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    />
                </div>
            ) : (
                <div>
                    <div className="mb-3">
                        <label htmlFor="quiz_type" className="form-label">
                            <h3>Enroll:</h3>
                        </label>
                        <select
                            className="form-select"
                            id="available_courses"
                            name="available_courses"
                            value={selectedCourseId}
                            onChange={(e) => setSelectedCourseId(e.target.value)}
                        >
                            {courses.map((course: any) => (
                                <option key={course._id} value={course._id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleEnroll} className="btn btn-primary mt-2">
                            Enroll in Selected Course
                        </button>
                    </div>
                </div>
            )}

            <hr />
            <h2 id="wd-dashboard-published">Courses ({user_courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses
                        .filter((course) => user_courses.includes(course._id))
                        .map((course) => (
                            <div
                                className="wd-dashboard-course col"
                                style={{ width: "300px" }}
                                key={course._id}
                            >
                                <Link
                                    to={`/Kanbas/Courses/${course._id}/Home`}
                                    className="text-decoration-none"
                                >
                                    <div className="card rounded-3 overflow-hidden">
                                        <img
                                            src={`/images/${course.img}`}
                                            height="{160}"
                                            alt="course"
                                        />
                                        <div className="card-body">
                                            <span
                                                className="wd-dashboard-course-link"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "navy",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {course.name}
                                            </span>
                                            <p
                                                className="wd-dashboard-course-title card-text"
                                                style={{
                                                    maxHeight: 53,
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {course.description}
                                            </p>
                                            <Link
                                                to={`/Kanbas/Courses/${course._id}/Home`}
                                                className="btn btn-primary"
                                            >
                                                Go
                                            </Link>

                                            {isFaculty && (
                                                <>
                                                    <button
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            deleteCourse(course._id);
                                                        }}
                                                        className="btn btn-danger float-end"
                                                        id="wd-delete-course-click"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        id="wd-edit-course-click"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            setCourse(course);
                                                        }}
                                                        className="btn btn-warning me-2 float-end"
                                                    >
                                                        Edit
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
