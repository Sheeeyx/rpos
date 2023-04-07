import { useMutation } from 'react-query';
import { request } from '../../../api/api';



const useCreatePartner = () =>
  useMutation((data) =>
    request.private.post('advert/partner/', data).then((res) => res.data)
  );

export default useCreatePartner;


