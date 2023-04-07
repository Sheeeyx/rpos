import { useMutation } from 'react-query';
import {request} from '../../../../api/api';



const useCreateBanner = () =>
  useMutation((data) =>
    request.private.post('advert/banner/', data).then((res) => res.data)
  );

export default useCreateBanner;



