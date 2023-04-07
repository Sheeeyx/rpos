import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import PartnerCreate from "./Create/PartnerCreate";
import PartnerList from "./List/PartnerList";
import PartnerUpdate from "./Update/PartnerUpdate";


const Partner = ()=>{
    const [page, setPage] = useState(1);   
    return(
        <>
        <div className="wrapper">
            
        </div>
        <Routes>
            <Route path="create" element={<PartnerCreate/>} />
            <Route path="list" element={<PartnerList page = {page} setPage = {setPage}/>} />
            <Route path="update/:id" element={<PartnerUpdate/>} />
        </Routes>
    </>
    );


}

export default Partner;