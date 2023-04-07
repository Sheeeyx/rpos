import React from "react";
import { Button } from "antd";
import { useParams, NavLink } from "react-router-dom";
import { TakeOutDetail } from "./components/Takeout-Detail/Takeout-detail";
import { useGetDetailsTakeOut } from "../../../../services/queries/food-and-dining/take-out/get/use-get-takeout";
import { TakeOutMedia } from "./components/Takeout-Media/TakeOutMedia";
import { TakeOutItHas } from "./components/Takeout-It-Has/TakeoutItHas";
import { TakeoutServiceOption } from "./components/Takeout-Service/TakeoutService";
import { TakeOutFoodType } from "./components/Takeout-Food/TakeoutFoodTypes";
import { SpinLoader } from "../../../../components/Spin/spin";

export const TakeOutUpdate: React.FC = () => {

    const params = useParams();

    const detail = useGetDetailsTakeOut(params.id as string);

    return (
        <>
            {
                !detail.isLoading ?
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
                        <NavLink to="/food-and-dining/takeout/list">Go Back</NavLink>
                    </Button>
                    <div className="supermarket">
                        <TakeOutDetail data = {detail.data} />
                        <div className="line"></div>
                        <TakeOutMedia media = {detail.data.files} />
                        <div className="line"></div>
                        <TakeOutItHas dataItHas = {detail.data.it_has} />
                        <div className="line"></div>
                        <TakeOutFoodType food = {detail.data.food_types} />
                        <div className="line"></div>
                        <TakeoutServiceOption dataService = {detail.data.service_options} />
                    </div>
                </>) : <SpinLoader />
            }
        </>
    );
};
