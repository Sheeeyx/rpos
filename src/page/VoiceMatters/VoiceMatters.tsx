import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Page } from "../../components/PageContent/Page";
import { Comments } from "./Comments/Comments";
import { Ideas } from "./Ideas/Ideas";
import { Reviews } from "./Review/Reviews";


const VoiceMatters = ()=>{
    return(
        <Page>
            <Routes>
                <Route path="ideas/*" element={<Ideas/>}></Route>
                <Route path="reviews/*" element={<Reviews/>}></Route>
                <Route path="comments/*" element={<Comments/>}></Route>
            </Routes>
        </Page>
    );

}

export default VoiceMatters;