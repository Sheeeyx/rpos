import { useMutation } from 'react-query';
import {request} from '../../../../api/api';


const usePrivacyCreate = () =>
  useMutation((data) =>
    request.private.post('terms/privacy_policy/', data).then((res) => res.data)
  );

export default usePrivacyCreate;
  