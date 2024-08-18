import React from "react";
import { Question, MultipleChoiceQuestion, Choice } from "./types";

interface MultipleChoiceDisplayProps {
    question: Question;
}

export default function MultipleChoiceDisplay({ question }: MultipleChoiceDisplayProps) {
    // Type guard to check if the question is a MultipleChoiceQuestion
    const isMultipleChoice = (q: Question): q is MultipleChoiceQuestion => {
        return q.type === "Multiple Choice";
    };

    // If it's not a multiple choice question, don't render anything
    if (!isMultipleChoice(question)) {
        return null;
    }

    return (
        <div className="mb-2">
            <br/>
            <div className="row border-gray bg-light mx-3 p-2 align-items-center">
                <div className="col">{question.title}</div>
                <div className="col-1 float-end">{question.points} Points</div>
            </div>
            <div className="border-gray row bg-light mx-3 p-2">
                <div className="row p-3 mx-3">{question.question}</div>
                <div className="row px-4 pt-3 mx-3 align-items-center">
                    <div>Answer:</div>
                </div>
                <div className="row p-3 ms-5">
                    {question.choices.map((choice: Choice) => (
                        <div key={choice.id} className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name={`question-${question.id}`}
                                id={`question-${question.id}-${choice.id}`}
                            />
                            <label className="form-check-label">
                                {choice.option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
