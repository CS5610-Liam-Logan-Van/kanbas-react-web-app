import {BsX} from "react-icons/bs";
import {FaRegCalendarAlt} from "react-icons/fa";
import {FaPlus} from "react-icons/fa6";
import {useParams} from "react-router";
import * as db from "../../Database";

export default function AssignmentEditor() {

    const {cid} = useParams();
    const assignments = db.assignments;

    return (
        <div>
            {Object.values(assignments)
                .filter((assignment: any) => assignment._id === cid)
                .map((assignment: any) => (
                    <div id="wd-assignments-editor">
                        <div className="mb-3">
                            <label htmlFor="input1" className="form-label">
                                {assignment.title}</label>
                            <input className="form-control"
                                   id="input1" value="A1"/>
                        </div>
                        <div className="mb-3">
                <textarea className="form-control" id="textarea1"
                          rows={3}
                          value="The assignment is available online Submit a link to the landing page of"></textarea>
                        </div>
                        <div className="row pb-3">
                            <div className="col-3 text-end">
                                Points
                            </div>
                            <div className="col-9">
                                <input className="form-control"
                                       id="input1" value="A1"/>
                            </div>
                        </div>
                        <div className="row pb-3">
                            <div className="col-3 text-end">
                                Assignments
                            </div>
                            <div className="col-9">
                                <select className="form-select">
                                    <option selected>ASSIGNMENTS</option>
                                </select>
                            </div>
                        </div>
                        <div className="row pb-3">
                            <div className="col-3 text-end">
                                Display Grade as
                            </div>
                            <div className="col-9">
                                <select className="form-select">
                                    <option selected>Percentage</option>
                                </select>
                            </div>
                        </div>
                        <div className="row pb-3">
                            <div className="col-3 text-end">
                                Submission Type
                            </div>
                            <div className="col-9">
                                <div className="border p-3 rounded-2">
                                    <select className="form-select mb-3">
                                        <option selected>Online</option>
                                    </select>
                                    <h6><b>Online Entry Options</b></h6>
                                    <div className="form-check pb-2 pt-1">
                                        <input className="form-check-input" type="checkbox"
                                               id="switch1"/>
                                        <label className="form-check-label mx-3" htmlFor="switch1">
                                            Text Entry
                                        </label>
                                    </div>
                                    <div className="form-check pb-2">
                                        <input className="form-check-input" type="checkbox" checked
                                               id="switch2"/>
                                        <label className="form-check-label mx-3" htmlFor="switch2">
                                            Website URL
                                        </label>
                                    </div>
                                    <div className="form-check pb-2">
                                        <input className="form-check-input" type="checkbox"
                                               id="switch3"/>
                                        <label className="form-check-label mx-3" htmlFor="switch3">
                                            Media Recordings
                                        </label>
                                    </div>
                                    <div className="form-check pb-2">
                                        <input className="form-check-input" type="checkbox"
                                               id="switch4"/>
                                        <label className="form-check-label mx-3" htmlFor="switch4">
                                            Student Annotation
                                        </label>
                                    </div>
                                    <div className="form-check pb-2">
                                        <input className="form-check-input" type="checkbox"
                                               id="switch5"/>
                                        <label className="form-check-label mx-3" htmlFor="switch5">
                                            File Uploads
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row pb-3">
                            <div className="col-3 text-end">
                                Assign
                            </div>
                            <div className="col-9">
                                <div className="border p-3 rounded-2">
                                    <h6><b>Assign to</b></h6>
                                    <div className="border p-3 rounded-2 mb-3">
                                    </div>
                                    <h6><b>Due</b></h6>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" value="May 13, 2024, 11:59PM"/>
                                        <span className="input-group-text"><FaRegCalendarAlt/></span>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6><b>Available From</b></h6>
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control"
                                                       value="May 6, 2024, 12:00AM"/>
                                                <span className="input-group-text"><FaRegCalendarAlt/></span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <h6><b>Until</b></h6>
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control"/>
                                                <span className="input-group-text"><FaRegCalendarAlt/></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <a href={`#/Kanbas/Courses/${assignment.course}/Assignments/`} className="btn btn-lg btn-danger me-1 float-end" role="button">Save</a>
                        <a href={`#/Kanbas/Courses/${assignment.course}/Assignments/`} className="btn btn-lg btn-secondary me-1 float-end" role="button">Cancel</a>
                    </div>))}
        </div>
    );
}
