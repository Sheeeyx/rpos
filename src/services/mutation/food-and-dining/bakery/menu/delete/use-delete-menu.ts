import { useMutation } from "react-query";
import queryClient from "../../../../../../configs/react-query.config";
import { request } from "../../../../../api/api";

const useBakeryDeleteMenu = (id:number) =>
    useMutation(
        (id: number) =>
            request.private
                .delete(`/food_dining/bakery_menu/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
         
                const menu = queryClient.getQueryData(`menu-bakery-${id}`);
              
                queryClient.setQueryData(`menu-bakery-${id}`, (prev: any) => {
                    if (!prev) return menu;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useBakeryDeleteMenu;
