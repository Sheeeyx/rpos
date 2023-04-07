import { useMutation } from "react-query";
import queryClient from "../../../../../../configs/react-query.config";
import { request } from "../../../../../api/api";

const useFoodServiceDeleteMenu = (id:number) =>
    useMutation(
        (id: number) =>
            request.private
                .delete(`food_dining/food_service/menu/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
         
                const menu = queryClient.getQueryData(`menu-food_service-${id}`);
              
                queryClient.setQueryData(`menu-food_service-${id}`, (prev: any) => {
                    if (!prev) return menu;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useFoodServiceDeleteMenu;
