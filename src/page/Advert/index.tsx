import React from "react";
import Title from "antd/lib/typography/Title";
import { Route, Routes } from "react-router-dom";
import { Page } from "../../components/PageContent/Page";
import Advertisement from "./Advertisement";
import Banner from "./Banner";
import Travelling from "./Travelling";
import Partner from "./Parther";



const Advert = ()=>{

    return(
        <>
        <Page>
            <Routes>
                <Route path="advertisement/*" element={<Advertisement/>}/>
                <Route path="banner/*" element={<Banner/>}/>
                <Route path="travelling/*" element={<Travelling/>}/>
                <Route path="partner/*" element={<Partner/>}/>
            </Routes>
        </Page>
    </>
    );


}

export default Advert;