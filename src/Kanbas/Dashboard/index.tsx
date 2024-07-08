export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
        <div id="wd-dashboard-courses">
            <div className="wd-dashboard-course">
                <img src="/images/reactjs.jpg" width={200}/>
                <div>
                    <a className="wd-dashboard-course-link"
                       href="#/Kanbas/Courses/1234/Home">
                        CS1234 React JS
                    </a>
                    <p className="wd-dashboard-course-title">
                        Full Stack software developer
                    </p>
                    <a href="#/Kanbas/Courses/1234/Home"> Go </a>
                </div>
            </div>
            <div className="wd-dashboard-course">
                <img src="/images/brain.jpg" width={200}/>
                <div>
                    <a className="wd-dashboard-course-link"
                       href="#/Kanbas/Courses/COGS100/Home">
                        COGS100
                    </a>
                    <p className="wd-dashboard-course-title">
                        Introduction to Cognitive Science
                    </p>
                    <a href="#/Kanbas/Courses/COGS100/Home"> Go </a>
                </div>
            </div>
            <div className="wd-dashboard-course">
                <img src="/images/brain.jpg" width={200}/>
                <div>
                    <a className="wd-dashboard-course-link"
                       href="#/Kanbas/Courses/COGS211/Home">
                        COGS211
                    </a>
                    <p className="wd-dashboard-course-title">
                        Perception and Action
                    </p>
                    <a href="#/Kanbas/Courses/COGS211/Home"> Go </a>
                </div>
            </div>
            <div className="wd-dashboard-course">
                <img src="/images/brain.jpg" width={200}/>
                <div>
                    <a className="wd-dashboard-course-link"
                       href="#/Kanbas/Courses/COGS213/Home">
                        COGS213
                    </a>
                    <p className="wd-dashboard-course-title">
                        Language
                    </p>
                    <a href="#/Kanbas/Courses/COGS213/Home"> Go </a>
                </div>
            </div>
            <div className="wd-dashboard-course">
                <img src="/images/brain.jpg" width={200}/>
                <div>
                    <a className="wd-dashboard-course-link"
                       href="#/Kanbas/Courses/COGS215/Home">
                        COGS215
                    </a>
                    <p className="wd-dashboard-course-title">
                        Knowledge and Cognition
                    </p>
                    <a href="#/Kanbas/Courses/COGS215/Home"> Go </a>
                </div>
            </div>
            <div className="wd-dashboard-course">
                <img src="/images/brain.jpg" width={200}/>
                <div>
                    <a className="wd-dashboard-course-link"
                       href="#/Kanbas/Courses/COGS219/Home">
                        COGS219
                    </a>
                    <p className="wd-dashboard-course-title">
                        Research Methods in Cognitive Science
                    </p>
                    <a href="#/Kanbas/Courses/COGS219/Home"> Go </a>
                </div>
            </div>
            <div className="wd-dashboard-course">
                <img src="/images/brain.jpg" width={200}/>
                <div>
                    <a className="wd-dashboard-course-link"
                       href="#/Kanbas/Courses/COGS311/Home">
                        COGS311
                    </a>
                    <p className="wd-dashboard-course-title">
                        Seminar in Cognitive Science
                    </p>
                    <a href="#/Kanbas/Courses/COGS311/Home"> Go </a>
                </div>
            </div>
            <div className="wd-dashboard-course">
                <img src="/images/brain.jpg" width={200}/>
                <div>
                    <a className="wd-dashboard-course-link"
                       href="#/Kanbas/Courses/COGS319/Home">
                        COGS319
                    </a>
                    <p className="wd-dashboard-course-title">
                        Modeling Minds, Brains, and Behaviors
                    </p>
                    <a href="#/Kanbas/Courses/COGS319/Home"> Go </a>
                </div>
            </div>

        </div>
    </div>
  );
}
