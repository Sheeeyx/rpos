import { useMutation } from "react-query";
import queryClient from "../../../../../../configs/react-query.config";
import { request } from "../../../../../api/api";


const useSuperMarketDeleteMenu = (id:number) =>
    useMutation(
        (id: number) =>
            request.private
                .delete(`/food_dining/supermarket_menu/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
         
                const menu = queryClient.getQueryData(`menu-supermarket-${id}`);
              
                queryClient.setQueryData(`menu-supermarket-${id}`, (prev: any) => {
                    if (!prev) return menu;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useSuperMarketDeleteMenu;
