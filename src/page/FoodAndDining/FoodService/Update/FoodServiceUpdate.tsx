import React from "react";
import { Button } from "antd";
import { useParams, NavLink } from "react-router-dom";
import { useGetDetailsFoodService } from "../../../../services/queries/food-and-dining/food-service/get/use-get-food-service";
import { FoodServiceDetail } from "./components/Food-Service-Detail/FoodService-detail";
import { FoodServiceMedia } from "./components/Food-Service-Media/FoodServiceMedia";
import { FoodServiceItHas } from "./components/Food-Service-It-Has/FoodServiceItHas";
import { FoodServiceFoodType } from "./components/Food-Service-Food-Type/FoodServiceFoodTypes";
import { FoodServiceServiceOption } from "./components/Food-Service-Service/FoodServiceOption";
import { SpinLoader } from "../../../../components/Spin/spin";


export const FoodServiceUpdate: React.FC = () => {

    const params = useParams();

    const detail = useGetDetailsFoodService(params.id as string)

    

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
                        <NavLink to="/food-and-dining/food-service/list">Go Back</NavLink>
                    </Button>
                    <div className="supermarket">
                        <FoodServiceDetail data = {detail.data} />
                        <div className="line"></div>
                        <FoodServiceMedia media = {detail.data.files} />
                        <div className="line"></div>
                        <FoodServiceItHas dataItHas = {detail.data.it_has} />
                        <div className="line"></div>
                        <FoodServiceFoodType food = {detail.data.food_types} />
                        <div className="line"></div>
                        <FoodServiceServiceOption dataService = {detail.data.service_options} />
                    </div>
                </>) : <SpinLoader />
            }
        </>
    );
};
