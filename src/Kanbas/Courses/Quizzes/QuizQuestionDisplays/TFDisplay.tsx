import React from "react";
import { Question } from "./types";

interface TFDisplayProps {
    question: Question;
}

export default function TFDisplay({ question }: TFDisplayProps) {
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
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name={`question-${question.id}`}
                            id={`question-${question.id}-true`}
                        />
                        <label className="form-check-label">
                            True
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name={`question-${question.id}`}
                            id={`question-${question.id}-false`}
                        />
                        <label className="form-check-label">
                            False
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
