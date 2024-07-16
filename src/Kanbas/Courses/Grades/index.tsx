import {FaFileImport, FaFileExport} from "react-icons/fa";
import {FaGear, FaMagnifyingGlass} from "react-icons/fa6";
import {MdArrowDropDown} from "react-icons/md";
import {CiFilter} from "react-icons/ci";


import GreenCheckmark from "../Modules/GreenCheckmark";
import {MdDoNotDisturbAlt} from "react-icons/md";

export default function Grades() {
    return (
        <div>
            <div className="row">
                <div className="col">
                    <button id="wd-collapse-all" className="btn btn-lg btn-secondary me-1 float-end">
                        <FaGear/>
                    </button>
                    <div className="dropdown d-inline me-1 float-end">
                        <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
                                type="button" data-bs-toggle="dropdown">
                            <FaFileExport className="mx-2"/>
                            Export
                        </button>
                    </div>
                    <button id="wd-collapse-all" className="btn btn-lg btn-secondary me-1 float-end">
                        <FaFileImport className="mx-2"/>
                        Import
                    </button>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <h5><b>Student Names</b></h5>
                    <div className="input-group">
                        <span className="input-group-text"><FaMagnifyingGlass/></span>
                        <input type="text" className="form-control"/>
                        <span className="input-group-text"><MdArrowDropDown/></span>
                    </div>
                </div>
                <div className="col">
                    <h5><b>Assignment Names</b></h5>
                    <div className="input-group">
                        <span className="input-group-text"><FaMagnifyingGlass/></span>
                        <input type="text" className="form-control"/>
                        <span className="input-group-text"><MdArrowDropDown/></span>
                    </div>
                </div>
            </div>
            <div>
                <button id="wd-collapse-all" className="btn btn-lg btn-secondary mt-3">
                    <CiFilter/>
                    Apply Filters
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered mt-3">


                    <tbody>
                    <tr>
                        <td><b>Student Name</b></td>
                        <td>A1 Setup Out of 100</td>
                        <td>A2 HTML</td>
                        <td>A3 CSS</td>
                        <td>A4 Bootstrap</td>

                    </tr>
                    <tr>
                        <td className="text-danger">Jane Adams</td>
                        <td>100%</td>
                        <td>96.67%</td>
                        <td>92.18%</td>
                        <td>66.22%</td>
                    </tr>
                    <tr>
                        <td className="text-danger">Christina Allen</td>
                        <td>100%</td>
                        <td><input className="form-control"
                                   id="input1" value="90%"/></td>
                        <td>100%</td>
                        <td>100%</td>
                    </tr>
                    <tr>
                        <td className="text-danger">Joe Shmoe</td>
                        <td>100%</td>
                        <td>100%</td>
                        <td>100%</td>
                        <td>100%</td>
                    </tr>
                    <tr>
                        <td className="text-danger">Shmoseph Joseph</td>
                        <td>100%</td>
                        <td>100%</td>
                        <td>100%</td>
                        <td>100%</td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
}