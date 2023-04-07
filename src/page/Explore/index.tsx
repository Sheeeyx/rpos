import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Page } from "../../components/PageContent/Page";
import CreateExplore from "./CreateExplore/CreateExplore";
import ExploreList from "./ExploreList/ExploreList";
import ExploreTag from "./ExploreTag/ExploreTag";
import ExploreUpdate from "./UpdateExplore/ExploreUpdate";

const MainExplore = () => {
    const [page, setPage] = useState(1);   
    return (
        <Page>
            <Routes>
                <Route path="create-explore" element={<CreateExplore />} />
                <Route path="explore-tags" element={<ExploreTag />} />
                <Route path="explore-update/:id" element={<ExploreUpdate />} />
                <Route path="explore-list" element={<ExploreList page = {page} setPage = {setPage} />} />
            </Routes>
        </Page>
    );
};


export default MainExplore;
