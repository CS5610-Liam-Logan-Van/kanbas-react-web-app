import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "./client";
import RichTextEditor, { ContentEditableEvent } from "react-simple-wysiwyg";
import QuizQuestionsEditor from "./QuizQuestionsEditors/QuizQuestionsEditor";
import { Question, Quiz } from "./QuizQuestionDisplays/types";
import { removeQuiz } from "./reducer";
import { useDispatch, UseDispatch } from "react-redux";

export default function QuizDetailsEditor() {
  const { quizId, cid } = useParams<{ quizId: string; cid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<Quiz>({
    title: "Unnamed Quiz",
    description: "",
    quiz_type: "Graded Quiz",
    points: 0,
    assignment_group: "Quizzes",
    shuffle_answers: true,
    time_limit: 20,
    multiple_attempts: false,
    attempts_allowed: 1,
    show_correct_answers: "After Submission",
    access_code: "",
    one_question_at_a_time: true,
    webcam_required: false,
    lock_questions_after_answering: false,
    due_date: new Date().toISOString().split("T")[0],
    available_date: new Date().toISOString().split("T")[0],
    until_date: new Date().toISOString().split("T")[0],
    questions: [],
    published: false,
  });
  const [activeTab, setActiveTab] = useState("details");
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (quizId && quizId !== "new") {
        try {
          const fetchedQuiz = await client.findQuizById(quizId);
          setQuiz(fetchedQuiz);
          setQuestions(fetchedQuiz.questions || []);
        } catch (err) {
          console.error("Failed to fetch quiz:", err);
        }
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setQuiz((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleRichTextChange = (e: ContentEditableEvent) => {
    setQuiz((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleSave = async (publish: boolean) => {
    try {
      if (quizId === "new") {
        const newQuiz = await client.createQuiz({
          ...quiz,
          courseId: cid,
          questions,
          published: publish,
        });
        if (publish) {
          navigate(`/Kanbas/Courses/${cid}/Quizzes`);
        } else {
          navigate(`/Kanbas/Courses/${cid}/Quizzes`);
        }
      } else if (quizId) {
        const my_quiz = {
          ...quiz,
          questions,
          published: publish,
        }
        const point_total = await client.calculateTotalPoints(my_quiz)
        await client.updateQuiz({...my_quiz, points: point_total});




        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
      }
    } catch (err) {
      console.error("Failed to save quiz:", err);
    }
  };

  const handleDeleteNewQuiz = async () => {
      await client.deleteQuiz(quizId);
      dispatch(removeQuiz(quizId));
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };


  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div>
      <h2>{quiz.title}</h2>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <span>{quiz.points} Point(s)</span>
          {quiz.published ? (
            <span className="ms-3">Published</span>
          ) : (
            <span className="ms-3">Not Published</span>
          )}
        </div>
        <button className="btn btn-secondary">...</button>
      </div>
      <ul className="nav nav-tabs mt-3">
        <li className="nav-item">
          <button
            onClick={() => setActiveTab("details")}
            className={`nav-link ${activeTab === "details" ? "active" : ""}`}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={() => setActiveTab("questions")}
            className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
          >
            Questions
          </button>
        </li>
      </ul>
      {activeTab === "details" && (
        <div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Quiz Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={quiz.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Quiz Instructions
            </label>
            <RichTextEditor
              value={quiz.description}
              onChange={handleRichTextChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quiz_type" className="form-label">
              Quiz Type
            </label>
            <select
              className="form-select"
              id="quiz_type"
              name="quiz_type"
              value={quiz.quiz_type}
              onChange={handleChange}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Options</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="shuffle_answers"
                name="shuffle_answers"
                checked={quiz.shuffle_answers}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="shuffle_answers">
                Shuffle Answers
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="time_limit_enabled"
                name="time_limit_enabled"
                checked={quiz.time_limit > 0}
                onChange={(e) =>
                  setQuiz((prev) => ({
                    ...prev,
                    time_limit: e.target.checked ? 20 : 0,
                  }))
                }
              />
              <label className="form-check-label" htmlFor="time_limit_enabled">
                Time Limit
              </label>
              {quiz.time_limit > 0 && (
                <input
                  type="number"
                  className="form-control mt-2"
                  name="time_limit"
                  value={quiz.time_limit}
                  onChange={handleChange}
                />
              )}
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="multiple_attempts"
                name="multiple_attempts"
                checked={quiz.multiple_attempts}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="multiple_attempts">
                Allow Multiple Attempts
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="access" className="form-label">
                Access Code
              </label>
              <input
                type="text"
                className="form-control"
                id="access"
                name="access"
                value={quiz.access_code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="one_question"
                name="one_question_at_a_time"
                checked={quiz.one_question_at_a_time}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="multiple_attempts">
                One Question At A Time
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="webcam"
                name="webcam_"
                checked={quiz.webcam_required}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="multiple_attempts">
                Webcam
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="lock"
                name="lock_"
                checked={quiz.lock_questions_after_answering}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="multiple_attempts">
                Lock Questions After Answering
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Assign</label>
            <div className="border p-3">
              <div className="mb-3">
                <label htmlFor="assign_to" className="form-label">
                  Assign to
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="assign_to"
                  value="Everyone"
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="due_date" className="form-label">
                  Due
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="due_date"
                  name="due_date"
                  value={quiz.due_date}
                  onChange={handleChange}
                />
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="available_date" className="form-label">
                    Available from
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="available_date"
                    name="available_date"
                    value={quiz.available_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="until_date" className="form-label">
                    Until
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="until_date"
                    name="until_date"
                    value={quiz.until_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "questions" && quizId && (
        <QuizQuestionsEditor
          quizId={quizId}
          questions={questions}
          setQuestions={setQuestions}
        />
      )}
      <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={() => handleSave(false)}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-warning me-2"
            onClick={() => handleSave(true)}
          >
            Save and Publish
          </button>
          <button
            type="button"
            className="btn btn-danger me-2"
            onClick={handleDeleteNewQuiz}
          >
            Delete Quiz
          </button>
      </div>
    </div>
  );
}
