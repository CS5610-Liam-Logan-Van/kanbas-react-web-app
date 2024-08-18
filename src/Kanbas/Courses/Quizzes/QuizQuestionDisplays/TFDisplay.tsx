import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

export default function TFDisplay() {
    return (
        <div className="mb-2">
            <br/>
            <div className="row border-gray bg-light mx-3 p-2 align-items-center">
                <div className="col">Question Title Placeholder</div>
                <div className="col-1 float-end">Points</div>

            </div>
            <div className="border-gray row bg-light mx-3 p-2">
                <div className="row p-3 mx-3">This is question content filler</div>
                <div className="row px-4 pt-3 mx-3 align-items-center">
                    <div>Answer:</div>
                </div>
                <div className="row p-3 ms-5">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault"
                               id="flexRadioDefault1"/>
                        <label className="form-check-label">
                            True
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault"
                               id="flexRadioDefault2"/>
                        <label className="form-check-label">
                             False
                        </label>
                    </div>
                </div>

            </div>

        </div>
    )
}
