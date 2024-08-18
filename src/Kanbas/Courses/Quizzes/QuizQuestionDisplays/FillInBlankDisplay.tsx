import React from "react";
import { Question } from "./types";

interface FillInBlankDisplayProps {
    question: Question;
}

export default function FillInBlankDisplay({ question }: FillInBlankDisplayProps) {
    return (
        <div>
            <br/>
            <div className="row border-gray bg-light mx-3 p-2 align-items-center">
                <div className="col">{question.title}</div>
                <div className="col-1 float-end">{question.points} Points</div>
            </div>
            <div className="border-gray row bg-light mx-3 p-2">
                <div className="row p-3 mx-3">{question.question}</div>
                <div className="row px-4 py-3 mx-3 align-items-center">
                    <div className="col-1">Answer:</div>
                    <div className="col-5">
                        <input className="form-control"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
