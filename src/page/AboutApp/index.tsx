import React, { useState } from "react";
import { Typography } from "antd";
import { Route, Routes} from "react-router-dom";
import { Page } from "../../components/PageContent/Page";
import AboutAppList from "./List/AboutAppList";
const { Title } = Typography;

 export const AboutApp = () => {
    return (
        <Page>
            <AboutAppList />
        </Page>
    );
};

