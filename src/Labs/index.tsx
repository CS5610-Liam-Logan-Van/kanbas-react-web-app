import Lab1 from "./Lab1";
import {Route, Routes, Navigate} from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import Lab5 from "./Lab5";
import store from "./store";
import {Provider} from "react-redux";

export default function Labs() {
    return (
        <Provider store={store}>
            <div id="wd-labs">
                <h1>Logan Willans, Evangeline Kim, Liam O'Connor</h1>
                <h4>CS5610 61065 Web Development SEC 01 Summer 2 2024 [VTL-2-OL]</h4>
                <TOC/>
                <Routes>
                    <Route path="/" element={<Navigate to="Lab1"/>}/>

                </Routes>
            </div>
        </Provider>
    );
}