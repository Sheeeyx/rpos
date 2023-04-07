import { Route, Routes } from "react-router-dom";
import { Page } from "../../components/PageContent/Page";
import { Bakery } from "./Bakery/Bakery";
import { BakeryCreate } from "./Bakery/BakeryCreate/BakeryCreate";
import BakeryList from "./Bakery/BakeryList/BakeryList";
import { FoodService } from "./FoodService";
import { FoodServiceCreate } from "./FoodService/Create/FoodServiceCreate";
import { Restaurant } from "./Restaurant";
import RestaurantList from "./Restaurant/RestaurantList/RestaurantList";
import { Supermarkets } from "./Supermarkets";
import { SupermarketsCreate } from "./Supermarkets/Create/SupermarketCreate";

import Tags from "./Tags/Tags";
import { Takeout } from "./Takeout";
import { TakeoutCreate } from "./Takeout/Create/TakeoutCreate";
import RestaurantCreate from "./Restaurant/RestaurantCreate/RestaurantCreate";
import './style.sass';

const FoodAndDining = ()=>{


    return(
        <Page>
            <Routes>
                <Route path="restaurant/*" element={<Restaurant />}>
                    <Route path="create" element={<RestaurantList />} />
                </Route>
                <Route path="bakery/*" element={<Bakery />}>
                    <Route path="create" element={<BakeryList />} />
                </Route>
                <Route path="supermarkets/*" element={<Supermarkets />}/>
                <Route path="takeout/*" element={<Takeout />}/>
                <Route path="takeout/create" element={<TakeoutCreate />}/>
                <Route path="food-service/*" element={<FoodService />}/>
                <Route path="restaurant/create" element={<RestaurantCreate />} />
                <Route path="supermarkets/create" element={<SupermarketsCreate/>} />
                <Route path="food-service/create" element={<FoodServiceCreate/>} />
                <Route path="tags" element={<Tags/>} />
                <Route path="bakery/create" element={<BakeryCreate/>} />
            </Routes>
        </Page>
    );

}

export default FoodAndDining;