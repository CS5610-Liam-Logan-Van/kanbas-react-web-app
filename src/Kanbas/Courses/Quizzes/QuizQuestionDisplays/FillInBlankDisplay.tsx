import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

export default function FillInBlankDisplay() {
    return (
        <div>
            <br/>
            <div className="row border-gray bg-light mx-3 p-2 align-items-center">
                <div className="col">Question Title Placeholder</div>
                <div className="col-1 float-end">Points</div>

            </div>
            <div className="border-gray row bg-light mx-3 p-2">
                <div className="row p-3 mx-3">This is question content filler</div>

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
