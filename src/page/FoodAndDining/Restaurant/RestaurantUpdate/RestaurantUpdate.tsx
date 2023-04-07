import React from "react";
import { Button } from "antd";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useGetDetailsRestaurant } from "../../../../services/queries/use-detail-restaurant";
import { RestaurantDetail } from "./components/Restaurant-Detail/Restaurant-detail";
import './RestaurantUpdate.style.sass';
import { RestaurantGoodFor } from "./components/Restaurant-good-for/Restaurant-good-for";
import { RestaurantFoodType } from "./components/Restaurant-food-type/Restaurant-food-type";
import { RestaurantServiceOption } from "./components/Restaurant-Service-Option/Restaurant-service-option";
import { RestaurantMedia } from "./components/Restaurant-media/Restaurant-media";
import { SpinLoader } from "../../../../components/Spin/spin";
import { RestaurantItHas } from "./components/Restaurant-It-has/Restaurant-it-has";


export const RestaurantUpdate: React.FC = () => {

    const navigate = useNavigate();

    const params = useParams();

    const detail = useGetDetailsRestaurant(params.id as string) as any;

    return (
        <>
            {
            !detail.isLoading ? (
                <>
                    <Button
                        style={{
                            position: "absolute",
                            top: "29px",
                            right: "32px",
                        }}
                        type="default"
                        size="large"
                    >
                        <NavLink to="/food-and-dining/restaurant/list">Go Back</NavLink>
                    </Button>
                    <div className="restaurant">
                        <RestaurantDetail data = {detail.data} />
                        <div className="line"></div>
                        <RestaurantMedia media = {detail.data?.files} />
                        <div className="line"></div>
                        <RestaurantItHas dataItHas = {detail.data.it_has} />
                        <div className="line"></div>
                        <RestaurantGoodFor dataGoodFor = {detail.data.good_for} />
                        <div className="line"></div>
                        <RestaurantFoodType food = {detail.data.food_types} />
                        <div className="line"></div>
                        <RestaurantServiceOption dataService = {detail.data.service_options} />
                    </div>
                </>
            ) : <SpinLoader />
        }
        </>
    );
};
