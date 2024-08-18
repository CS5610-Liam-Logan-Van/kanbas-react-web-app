import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxRocket } from "react-icons/rx";
import { GoTriangleDown } from "react-icons/go";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdCheckBox } from "react-icons/md";
import { CiNoWaitingSign } from "react-icons/ci";
import * as client from "../Quizzes/client";
import { deleteQuiz, findAllQuizzes } from "./client";
import { removeQuiz, setQuizzes } from "./reducer";
import { FaPencil } from "react-icons/fa6";

export default function QuizList() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes = await findAllQuizzes(cid as string);
      dispatch(setQuizzes(quizzes));
    };
    fetchQuizzes();
  }, [cid, dispatch]);

  const handleDelete = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    dispatch(removeQuiz(quizId));
  };

  // const handleTogglePublish = async (quizId: string, currentStatus: string) => {
  //   const newStatus = currentStatus === "published" ? "draft" : "published";
  //   await client.updateQuiz(quizId, { status: newStatus });
  //   const quizzes = await findAllQuizzes(cid as string);
  //   dispatch(setQuizzes(quizzes));
  // };
  const handleTogglePublish = async (quizId: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    await client.updateQuiz({ _id: quizId, status: newStatus }); // pass only the quiz object
    const quizzes = await findAllQuizzes(cid as string);
    dispatch(setQuizzes(quizzes));
  };

const renderQuizItem = (quiz: any) => (
  <li className="list-group-item p-0 border-0" key={quiz._id}>
    <div
      className="wd-quizzes form-control list-group-item p-3 ps-1 d-flex align-items-center"
      style={{
        borderLeft: "5px solid #198754",
      }}
    >
      <div>
        <Link to={`QuizDetails/${quiz._id}`} className="text-dark fw-bold fs-5">
          <RxRocket className="me-2 green" />
          <strong>{quiz.title}</strong>
        </Link>
        <p className="fs-6 mb-0">
          <b>{quiz.status === "published" ? "Available" : "Closed"}</b> |
          <b> Due </b> | {quiz.points} pts | {quiz.questions.length} questions
        </p>
      </div>
      <div className="ms-auto">
        <div className="wd-right-icons d-inline-flex align-items-center">
          <button
            id="wd-quiz-toggle-btn"
            type="button"
            className="btn btn-link p-0"
            onClick={() => handleTogglePublish(quiz._id, quiz.status)}
          >
            {quiz.status === "published" ? (
              <MdCheckBox className="text-success me-2 fs-4" />
            ) : (
              <CiNoWaitingSign className="text-danger me-2 fs-4" />
            )}
          </button>
          <div id="wd-quiz-toggle">
            <button
              id="wd-quiz-toggle-btn"
              type="button"
              data-bs-toggle="dropdown"
            >
              <IoEllipsisVertical className="fs-4" />
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link
                  to={`QuizDetailsEditor/${quiz._id}`}
                  className="dropdown-item d-flex align-items-center"
                >
                  <FaPencil className="text-primary me-2 mb-1" />
                  Edit
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => handleDelete(quiz._id)}
                >
                  <FaTrash className="text-danger me-2 mb-1" />
                  Delete
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => handleTogglePublish(quiz._id, quiz.status)}
                >
                  {quiz.status === "published" ? (
                    <>
                      Unpublish
                      <CiNoWaitingSign className="text-danger ms-2" />
                    </>
                  ) : (
                    <>
                      Publish
                      <MdCheckBox className="text-success ms-2" />
                    </>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </li>
);

  return (
    <ul className="list-group rounded-0 border-gray">
      <div className="wd-quiz-list-title p-3 ps-2 bg-secondary">
        <GoTriangleDown className="me-2 fs-5" />
        <strong className="fs-5">Assignment Quizzes</strong>
        <BsThreeDotsVertical className="fs-4 mb-1 mx-2" />
      </div>
      {quizzes.map((quiz: any) => renderQuizItem(quiz))}
    </ul>
  );
}
