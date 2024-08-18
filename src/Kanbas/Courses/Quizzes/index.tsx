import { useNavigate, useParams } from "react-router";
import QuizList from "./QuizList";
import { useState } from "react";
import { FaEllipsisV, FaPlus, FaSearch } from "react-icons/fa";
import * as client from "../Quizzes/client";
import { useDispatch } from "react-redux";
import { addQuiz } from "./reducer";

export default function Quizzes() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quiz = {
    _id: "",
    course_id: courseId as string,
    title: "New Quiz",
    description: "-description here-",
    published: false,
    available: new Date(),
    available_until: new Date(),
    due: new Date(),
    quiz_type: "Graded Quiz",
    points: 0,
    assignment_group: "Quizzes",
    shuffle_answers: false,
    time_limit: 20,
    multiple_attempts: false,
    show_correct_answers: "After Submitted",
    access_code: "",
    one_question_at_a_time: true,
    webcam_required: false,
    lock_questions_after_answering: false,
    questions: [],
  };

  const handleCreateQuiz = async () => {
    try {
      const newQuiz = await client.createQuiz(quiz);
      dispatch(addQuiz(newQuiz)); // updates redux store
      navigate(`/Quizzes/QuizDetails/${newQuiz._id}`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div id="wd-quizzes">
      <div className="input-group">
        <span className="input-group-text bg-white border-end-0">
          <FaSearch />
        </span>
        <input
          className="form-control form-control-lg border-start-0"
          type="text"
          id="wd-search-quiz"
          placeholder="Search for Quiz"
        />
      </div>
      <button className="btn btn-lg btn-secondary">
        <FaEllipsisV />
      </button>
      <button
        id="wd-add-quiz"
        className="btn btn-lg btn-danger me-1 float-end"
        onClick={handleCreateQuiz}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Quiz
      </button>
      <QuizList />
    </div>
  );
}
