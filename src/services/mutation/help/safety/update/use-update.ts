import { useMutation } from "react-query";
import { request } from "../../../../api/api";

interface SafetyResourcesTypes {
    id: string;
    title: string;
    description: string;
}

const useUpdateSafetyResources = () =>
    useMutation((data: any) =>
        request.private
            .put<SafetyResourcesTypes>(`terms/safety_resource_centre/${data.id}/`, data.data)
            .then((res) => res.data)
    );

export default useUpdateSafetyResources;
