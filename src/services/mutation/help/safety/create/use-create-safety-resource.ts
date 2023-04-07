import { useMutation } from 'react-query';
import {request} from '../../../../api/api';

interface SafetyTypes {
    title: string
    description: string;
}

const useCreateSafety = () =>
  useMutation((data) =>
    request.private.post<SafetyTypes>('terms/safety_resource_centre/', data).then((res) => res.data)
  );

export default useCreateSafety;
