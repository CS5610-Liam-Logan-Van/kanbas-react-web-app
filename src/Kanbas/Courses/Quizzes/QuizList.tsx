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
import { useUser } from '../../Account/UserContext';
import { divide } from "../../../Labs/Lab3/Math";

export default function QuizList() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  const { user, loading } = useUser();
  const isFaculty = "FACULTY" === user?.role;

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

  const handleTogglePublish = async (
    quizId: string,
    currentStatus: boolean
  ) => {
    const newStatus = !currentStatus;
    await client.updateQuiz({ _id: quizId, published: newStatus }); //update the new status
    const quizzes = await findAllQuizzes(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const getAvailability = (quiz: any) => {
    const current_date = new Date();
    const available_date = new Date(quiz.available_date);
    const until_date = new Date(quiz.until_date);

    if (current_date < available_date) {
      return `Not available until ${available_date.toLocaleDateString()}`;
    } else if (current_date > until_date) {
      return "Closed";
    } else {
      return "Available";
    }
  };

const renderQuizzes = (quiz: any) => (
  <li className="list-group-item p-0 border-0" key={quiz._id}>
    <div
      className="wd-quizzes form-control list-group-item p-3 ps-1 d-flex align-items-center"
      style={{
        borderLeft: "5px solid #198754",
      }}
    >
      <RxRocket className="text-success me-2 fs-4" />
      <div>
        <Link to={`QuizDetails/${quiz._id}`} className="text-dark fw-bold fs-5">
          <strong>{quiz.title}</strong>
        </Link>
        <p className="fs-6 mb-0">
          <b>{getAvailability(quiz)}</b> |<b> Due </b>
          {new Date(quiz.due_date).toLocaleDateString()} | {quiz.points} pts |{" "}
          {quiz.questions.length} questions
        </p>
      </div>
      <div className="ms-auto">
        {isFaculty ? (
          <div className="wd-right-icons d-inline-flex align-items-center">
            <button
              id="wd-quiz-toggle-btn"
              type="button"
              className="btn btn-link p-0"
              onClick={() => handleTogglePublish(quiz._id, quiz.published)}
            >
              {quiz.published ? (
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
                className="btn"
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
                    onClick={() =>
                      handleTogglePublish(quiz._id, quiz.published)
                    }
                  >
                    {quiz.published ? (
                      <>
                        <CiNoWaitingSign className="text-danger me-2" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <MdCheckBox className="text-success me-2" />
                        Publish
                      </>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div></div>
        )}
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
      {quizzes.map((quiz: any) => renderQuizzes(quiz))}
    </ul>
  );
}
