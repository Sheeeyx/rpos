import React from "react";
import { Button } from "antd";
import { useParams, NavLink } from "react-router-dom";
import { useGetDetailsSuperMarket } from "../../../../services/queries/food-and-dining/supermarket/get/use-get-supermarket";
import { SupermarketDetail } from "./components/Supermarkets-Detail/Supermarket-detail";
import { SupermarketMedia } from "./components/Supermarket-Media/SupermarketMedia";
import { SupermarketItHas } from "./components/Supermarket-It-Has/SupermarketItHas";
import { SupermarketFoodType } from "./components/Supermarkets-Food/SupermarketFoodTypes";
import { SupermarketServiceOption } from "./components/Supermarket-Service/SupermarketService";
import { SpinLoader } from "../../../../components/Spin/spin";


export const SuperMarketUpdate: React.FC = () => {

    const params = useParams();

    const detail = useGetDetailsSuperMarket(params.id as string)


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
                        <NavLink to="/food-and-dining/supermarkets/list">Go Back</NavLink>
                    </Button>
                    <div className="supermarket">
                        <SupermarketDetail data = {detail.data} />
                        <div className="line"></div>
                        <SupermarketMedia media = {detail.data.files} />
                        <div className="line"></div>
                        <SupermarketItHas dataItHas = {detail.data.it_has} />
                        <div className="line"></div>
                        <SupermarketFoodType food = {detail.data.food_types} />
                        <div className="line"></div>
                        <SupermarketServiceOption dataService = {detail.data.service_options} />
                    </div>
                </>) : <SpinLoader />
            }
        </>
    );
};
