import { Route, Routes } from "react-router-dom";
import { Page } from "../../components/PageContent/Page";
import { Chabad } from "./Chabad/Chabad";
import { ChabadCreate } from "./Chabad/ChabadCreate/ChabadCreate";
import ChabadList from "./Chabad/ChabadList/ChabadList";
import ChabadUpdate from "./Chabad/ChabadUpdate/ChabadUpdate";
// import { Bakery } from "./Bakery/Bakery";
// import { BakeryCreate } from "./Bakery/BakeryCreate/BakeryCreate";
// import BakeryList from "./Bakery/BakeryList/BakeryList";
// import { Restaurant } from "./Restaurant";
// import { RestaurantCreate } from "./Restaurant/RestaurantCreate/RestaurantCreate";
// import RestaurantList from "./Restaurant/RestaurantList/RestaurantList";

// import Tags from "./Tags/Tags";

const JewishResources = ()=>{

    return(
        <Page>
            <Routes>
                <Route path="chabad/*" element={<Chabad/>}></Route>
                <Route path="chabad/create" element={<ChabadCreate/>} />
                <Route path="chabad/chabad-update/:id" element={<ChabadUpdate />} />
            </Routes>
        </Page>
    );

}

export default JewishResources;