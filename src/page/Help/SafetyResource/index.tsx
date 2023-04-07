import React from "react";
import { Typography} from "antd";
import {Route, Routes } from "react-router-dom";
import { SafetyResourceCreate } from "./Create/SafetyResourceCreate";
import { SafetyResourceList } from "./List/SafetyResourceList";
import { SafetyResourcesUpdate } from "./Update";

const SafetyResource = () => {
   
  
    return (
        <>
            <Typography style={{ marginBottom: "40px", fontSize: "30px" }}>
                Safety Resource
            </Typography>
            <Routes>
                <Route path="update/:id" element={<SafetyResourcesUpdate />} />
                <Route path="list" element={<SafetyResourceList />} />
                <Route path="create" element={<SafetyResourceCreate />} />
            </Routes>

        </>
    );
};

export default SafetyResource;