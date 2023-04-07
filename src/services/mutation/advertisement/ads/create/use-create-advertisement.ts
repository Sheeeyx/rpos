import { useMutation } from 'react-query';
import {request} from '../../../../api/api';

interface advertisementTypes {
    title: string,
    algorithm: string,
    url: string,
    file: string,
    start_date: string,
    end_date: string
}
const useCreateAdvertisement = () =>
  useMutation((data) =>
    request.private.post<advertisementTypes>('/advert/advertisement/', data).then((res) => res.data)
  );

export default useCreateAdvertisement;



