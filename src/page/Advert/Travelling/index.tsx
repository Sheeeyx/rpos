import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import TravellingList from "./List/TravellingList";
import TravalingCreate from "./Create/TravellingCreate";
import TravellingUpdate from "./Update/TravellingUpdate";

const Travelling = ()=>{
    const [page, setPage] = useState(1);
    return(
        <>
        <div className="wrapper">
            
        </div>
        <Routes>
            <Route path="create" element={<TravalingCreate/>} />
            <Route path="list" element={<TravellingList page={page} setPage = {setPage}/>} />
            <Route path="update/:id" element={<TravellingUpdate/>} />
        </Routes>
    </>
    );


}

export default Travelling;