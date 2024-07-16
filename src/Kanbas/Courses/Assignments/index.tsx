import {FaMagnifyingGlass} from "react-icons/fa6";
import {BsGripVertical} from "react-icons/bs";
import {FaPlus} from "react-icons/fa";
import {IoEllipsisVertical} from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import {BsFillJournalBookmarkFill} from "react-icons/bs";

export default function Assignments() {
    return (
        <div id="wd-assignments">
            <div className="row align-items-center mb-5">
                <div className="col">
                    <div className="input-group">
                        <span className="input-group-text"><FaMagnifyingGlass/></span>
                        <input type="text" className="form-control"/>
                    </div>
                </div>
                <div className="col">
                    <button id="wd-add-assignment" className="float-end btn btn-lg btn-danger"><FaPlus/>   Assignment
                    </button>
                    <button id="wd-add-assignment-group" className="float-end btn btn-lg btn-secondary me-1"><FaPlus/>   Group
                    </button>
                </div>
            </div>
            <div className="wd-title p-4 ps-2 bg-secondary border-gray">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <BsGripVertical className="me-2 fs-3"/>
                    </div>
                    <div className="col">
                        <h3 className="m-0">ASSIGNMENTS</h3>
                    </div>
                    <div className="col-auto">
                        <div className="border border-secondary rounded-5 px-2 py-1">
                            40% of Total
                        </div>
                    </div>
                    <div className="col-auto">
                        <FaPlus/>
                    </div>
                    <div className="col-auto">
                        <IoEllipsisVertical className="fs-4"/>
                    </div>
                </div>

            </div>
            <ul id="wd-assignment-list" className="list-group list-group-mine rounded-0">
                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <BsGripVertical className="me-2 fs-3"/>
                        </div>
                        <div className="col-auto">
                            <BsFillJournalBookmarkFill className="me-2 fs-3 text-success"/>
                        </div>
                        <div className="col">
                            <a className="wd-assignment-link"
                               href="#/Kanbas/Courses/1234/Assignments/123">
                                A1 - ENV + HTML
                            </a>
                            <br/>
                            <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 13 at
                            12:00am | <b>Due</b> May 20 at 11:59pm |
                            100pts
                        </div>
                        <div className="col-auto">
                            <GreenCheckmark/>
                        </div>
                        <div className="col-auto">
                            <IoEllipsisVertical className="fs-4"/>
                        </div>
                    </div>
                </li>
                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <BsGripVertical className="me-2 fs-3"/>
                        </div>
                        <div className="col-auto">
                            <BsFillJournalBookmarkFill className="me-2 fs-3 text-success"/>
                        </div>
                        <div className="col">
                            <a className="wd-assignment-link"
                               href="#/Kanbas/Courses/1234/Assignments/123">
                                A1 - CSS + BOOTSTRAP
                            </a>
                            <br/>
                            <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at
                            12:00am | <b>Due</b> May 13 at
                            11:59pm |
                            100pts
                        </div>
                        <div className="col-auto">
                            <GreenCheckmark/>
                        </div>
                        <div className="col-auto">
                            <IoEllipsisVertical className="fs-4"/>
                        </div>
                    </div>
                </li>
                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <BsGripVertical className="me-2 fs-3"/>
                        </div>
                        <div className="col-auto">
                            <BsFillJournalBookmarkFill className="me-2 fs-3 text-success"/>
                        </div>
                        <div className="col">
                            <a className="wd-assignment-link"
                               href="#/Kanbas/Courses/1234/Assignments/123">
                                A1 - JAVASCRIPT + REACT
                            </a>
                            <br/>
                            <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm |
                    100pts
                        </div>
                        <div className="col-auto">
                            <GreenCheckmark/>
                        </div>
                        <div className="col-auto">
                            <IoEllipsisVertical className="fs-4"/>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
