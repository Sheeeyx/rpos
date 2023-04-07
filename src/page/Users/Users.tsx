import React, { useState } from "react";
import { Typography } from "antd";
import { Route, Routes} from "react-router-dom";
import UsersList from "./List/UsersList";
import { Page } from "../../components/PageContent/Page";
import UserCreate from "./Create/UserCreate";
import UserUpdate from "./Update/UserUpdate";

 export const Users = () => {
    const [page, setPage] = useState(1);
    return (
        <Page>
              <Routes>
                <Route path="list" element={<UsersList/>}></Route>
                <Route path="create" element={<UserCreate/>}></Route>
                <Route path="update/:id" element={<UserUpdate/>} />
            </Routes>
        </Page>
    );
};


