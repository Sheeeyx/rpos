import React, { RefObject, useRef } from "react";
import { Input, Row, Button, Form } from "antd";
import { useParams, NavLink } from "react-router-dom";
import { BakeryDetail } from "./components/Bakery-Detail/Bakery-detail";
import { useGetDetailsBakery } from "../../../../services/queries/food-and-dining/bakery/get/use-detail-bakery";
import { BakeryMedia } from "./components/Bakery-Media/BakeryMedia";
import { BakeryItHas } from "./components/Bakery-It-Has/BakeryItHas";
import { BakeryFoodType } from "./components/Bakery-Food/BakeryFoodTypes";
import { BakeryServiceOption } from "./components/Bakery-Service/BakeryService";
import { BakeryOrderSite } from "./components/Bakery-Order-Sites/BakeryOrderSites";
import { BakeryReserveSite } from "./components/Bakery-Reserve-Site/BakeryReserveSite";
import { SpinLoader } from "../../../../components/Spin/spin";


export const BakeryUpdate: React.FC = () => {

    const params = useParams();

    const details = useGetDetailsBakery(params.id as string);
    console.log(details);
    

    return (
        <>
            {
                !details.isLoading ?
                (<>
                    <Button
                        style={{
                            position: "absolute",
                            top: "29px",
                            right: "32px",
                        }}
                        type="default"
                        size="large"
                    >
                        <NavLink to="/food-and-dining/bakery/list">Go Back</NavLink>
                    </Button>
                    <div className="bakery">
                        <BakeryDetail data = {details.data} />
                        <div className="line"></div>
                        <BakeryMedia media = {details.data?.files} />
                        <div className="line"></div>
                        <BakeryItHas dataItHas = {details.data.it_has} />
                        <div className="line"></div>
                        <BakeryFoodType food = {details.data.food_types} />
                        <div className="line"></div>
                        <BakeryServiceOption dataService = {details.data.service_options} />
                    </div>
                </>) : <SpinLoader />
            }
        </>
    );
};
