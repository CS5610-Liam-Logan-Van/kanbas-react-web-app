import React from "react";
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import {HashRouter, Route, Routes, Navigate} from "react-router-dom";
import {UserProvider} from "./Kanbas/Account/UserContext";

function App() {
    return (
        <UserProvider>
            <HashRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<Navigate to="Labs"/>}/>
                        <Route path="/Labs/*" element={<Labs/>}/>
                        <Route path="/Kanbas/*" element={<Kanbas/>}/>
                    </Routes>
                </div>
            </HashRouter>
        </UserProvider>
    );
}

export default App;
