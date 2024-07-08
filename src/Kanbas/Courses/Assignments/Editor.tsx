export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <br/><br/>
            <input id="wd-name" value="A1 - ENV + HTML"/><br/><br/>
            <textarea id="wd-description">
                The assignment is available online Submit a link to the landing page of
            </textarea>
            <br/>
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100}/>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option value="assignments">ASSIGNMENTS</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option value="assignments">Percentage</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option value="online">Online</option>
                        </select>
                        <br/>
                        Online Entry Options
                        <br/>
                        <input type="checkbox" name="check-text-entry" id="wd-text-entry"/>
                        <label htmlFor="wd-text-entry">Text Entry</label><br/>

                        <input type="checkbox" name="check-website-url" id="wd-website-url"/>
                        <label htmlFor="wd-website-url">Website URL</label><br/>

                        <input type="checkbox" name="check-media-recordings" id="wd-media-recordings"/>
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

                        <input type="checkbox" name="check-student-annotation" id="wd-student-annotation"/>
                        <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

                        <input type="checkbox" name="check-file-upload" id="wd-file-upload"/>
                        <label htmlFor="wd-file-upload">File Uploads</label><br/>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-assign-to">Assign</label>
                    </td>
                    <td>
                        Assign To
                        <br/>
                        <input id="wd-assign-to" value={"Everyone"}/><br/>
                        <br/>
                        Due
                        <br/>
                        <input type="date"
                               id="wd-due-date"
                               value="2024-05-13"/><br/>
                        <br/>
                        <table>
                            <tr>
                                <td>
                                    Available From
                                </td>
                                <td>
                                    Until
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="date"
                                           id="wd-available-from"
                                           value="2024-05-06"/><br/>
                                </td>
                                <td>
                                    <input type="date"
                                           id="wd-available-until"
                                           value="2024-05-20"/><br/>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <hr/>
            <button id="wd-cancel" style={{float: 'right'}}>Cancel</button>
            <button id="wd-save" style={{float: 'right'}}>Save</button>
        </div>
    );
}
