export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr/>
            <h2 id="wd-dashboard-published">Published Courses (12)</h2>
            <hr/>
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    <div className="wd-dashboard-course col" style={{width: "280px"}}>
                        <div className="card">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                   href="#/Kanbas/Courses/1234/Home">
                                    <img src="/images/reactjs.png" width="100%" height="180px"/>
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            CS1234 React JS
                                        </h5>
                                        <p className="card-text">
                                            Full Stack Software Developer
                                        </p>
                                        <button className="btn btn-primary">Go</button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{width: "280px"}}>
                        <div className="card">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                   href="#/Kanbas/Courses/COGS100/Home">
                                    <img src="/images/brain.jpg" width="100%" height="180px"/>
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            COGS100
                                        </h5>
                                        <p className="card-text">
                                            Intro to Cognitive Science
                                        </p>
                                        <button className="btn btn-primary">Go</button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{width: "280px"}}>
                        <div className="card">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                   href="#/Kanbas/Courses/COGS211/Home">
                                    <img src="/images/brain.jpg" width="100%" height="180px"/>
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            COGS211
                                        </h5>
                                        <p className="card-text">
                                            Perception and Action
                                        </p>
                                        <button className="btn btn-primary">Go</button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{width: "280px"}}>
                        <div className="card">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                   href="#/Kanbas/Courses/COGS213/Home">
                                    <img src="/images/brain.jpg" width="100%" height="180px"/>
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            COGS213
                                        </h5>
                                        <p className="card-text">
                                            Language
                                        </p>
                                        <button className="btn btn-primary">Go</button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{width: "280px"}}>
                        <div className="card">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                   href="#/Kanbas/Courses/COGS215/Home">
                                    <img src="/images/brain.jpg" width="100%" height="180px"/>
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            COGS215
                                        </h5>
                                        <p className="card-text">
                                            Knowledge and Cognition
                                        </p>
                                        <button className="btn btn-primary">Go</button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{width: "280px"}}>
                        <div className="card">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                   href="#/Kanbas/Courses/COGS219/Home">
                                    <img src="/images/brain.jpg" width="100%" height="180px"/>
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            COGS219
                                        </h5>
                                        <p className="card-text">
                                            Research Methods
                                        </p>
                                        <button className="btn btn-primary">Go</button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{width: "280px"}}>
                        <div className="card">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                   href="#/Kanbas/Courses/COGS311/Home">
                                    <img src="/images/brain.jpg" width="100%" height="180px"/>
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            COGS311
                                        </h5>
                                        <p className="card-text">
                                            Seminar in Cognitive Science
                                        </p>
                                        <button className="btn btn-primary">Go</button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{width: "280px"}}>
                        <div className="card">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                   href="#/Kanbas/Courses/COGS319/Home">
                                    <img src="/images/brain.jpg" width="100%" height="180px"/>
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            COGS314
                                        </h5>
                                        <p className="card-text">
                                            Modeling Minds, Brains, and Behavior
                                        </p>
                                        <button className="btn btn-primary">Go</button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
