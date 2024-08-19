import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as client from "../client";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TFEditor";
import FillInBlankEditor from "./FillInBlankEditor";
import {
  Question,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  FillInBlankQuestion,
} from "../QuizQuestionDisplays/types";

interface QuizQuestionsEditorProps {
  quizId: string | undefined;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

export default function QuizQuestionsEditor({
  quizId,
  questions,
  setQuestions,
}: QuizQuestionsEditorProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (quizId) {
        const fetchedQuestions = await client.fetchQuizQuestions(quizId);
        console.log(fetchedQuestions);
        setQuestions(fetchedQuestions);
      }
    };
    fetchQuestions();
  }, [quizId, setQuestions]);

  const addQuestion = (type: Question["type"]) => {
    let newQuestion: Question;
    switch (type) {
      case "Multiple Choice":
        newQuestion = {
          id: Date.now().toString(),
          type,
          title: "",
          points: 1,
          question: "",
          choices: [],
          correct_choice: "",
        } as MultipleChoiceQuestion;
        break;
      case "True/False":
        newQuestion = {
          id: Date.now().toString(),
          type,
          title: "",
          points: 1,
          question: "",
          correct_choice: false,
        } as TrueFalseQuestion;
        break;
      case "Fill in the Blank":
        newQuestion = {
          id: Date.now().toString(),
          type,
          title: "",
          points: 1,
          question: "",
          correct_answers: [],
        } as FillInBlankQuestion;
        break;
    }
    setQuestions([...questions, newQuestion]);
    setCurrentQuestion(newQuestion);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
    setCurrentQuestion(null);
  };

  const deleteLastQuestion = () => {
    if (questions.length > 0) {
      const updatedQuestions = questions.slice(0, questions.length - 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleCancel = () => {
    setCurrentQuestion(null);
  };

    return (
      <div>
        <h1>Questions Editor</h1>
        <div className="mb-3">
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              + New Question
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    addQuestion("Multiple Choice");
                  }}
                >
                  + New Multiple Choice Question
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    addQuestion("True/False");
                  }}
                >
                  + New True/False Question
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    addQuestion("Fill in the Blank");
                  }}
                >
                  + New Fill in the Blank Question
                </a>
              </li>
            </ul>
          </div>
        </div>
        <ul className="mt-4 list-group">
          {questions.map((q) => (
            <li
              key={q.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {q.title || "Untitled Question"} ({q.type})
              </span>
              <div>
                <button
                  onClick={() => setCurrentQuestion(q)}
                  className="btn btn-secondary me-2"
                >
                  Edit
                </button>
                <button onClick={deleteLastQuestion} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {currentQuestion && (
          <div className="mt-4">
            {currentQuestion.type === "Multiple Choice" && (
              <MultipleChoiceEditor
                question={currentQuestion as MultipleChoiceQuestion}
                onSave={updateQuestion}
                onCancel={handleCancel}
              />
            )}
            {currentQuestion.type === "True/False" && (
              <TrueFalseEditor
                question={currentQuestion as TrueFalseQuestion}
                onSave={updateQuestion}
                onCancel={handleCancel}
              />
            )}
            {currentQuestion.type === "Fill in the Blank" && (
              <FillInBlankEditor
                question={currentQuestion as FillInBlankQuestion}
                onSave={updateQuestion}
                onCancel={handleCancel}
              />
            )}
          </div>
        )}
      </div>
    );
}
