import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { findQuizById } from "./client";
import FillInBlankDisplay from "./QuizQuestionDisplays/FillInBlankDisplay";
import MultipleChoiceDisplay from "./QuizQuestionDisplays/MultipleChoiceDisplay";
import TFDisplay from "./QuizQuestionDisplays/TFDisplay";
import { Quiz, Question } from "./QuizQuestionDisplays/types";

export default function QuizPreview() {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const { quizId, cid } = useParams<{ quizId: string; cid: string }>();

    useEffect(() => {
        const loadQuiz = async () => {
            if (quizId) {
                const quizData = await findQuizById(quizId);
                setQuiz(quizData);
            }
        };
        loadQuiz();
    }, [quizId]);

    if (!quiz) return <div>Loading...</div>;

    return (
        <div>
            <h1>{quiz.title}</h1>
            {quiz.questions && quiz.questions.length > 0 ? (
                quiz.questions.map((question: Question) => {
                    switch (question.type) {
                        case "Fill in the Blank":
                            return <FillInBlankDisplay key={question.id} question={question} />;
                        case "Multiple Choice":
                            return <MultipleChoiceDisplay key={question.id} question={question} />;
                        case "True/False":
                            return <TFDisplay key={question.id} question={question} />;
                        default:
                            return null;
                    }
                })
            ) : (
                <div className="alert alert-info">
                    This quiz does not have any questions.
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/QuizDetailsEditor/${quiz._id}`} className="alert-link ms-2">
                        Click here to add questions.
                    </Link>
                </div>
            )}
        </div>
    );
}
