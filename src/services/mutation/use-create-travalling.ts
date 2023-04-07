import { useMutation } from 'react-query';
import {request} from '../api/api';


const useCreateTravalling = () =>
  useMutation((data) =>
    request.private.post('advert/travelling/', data).then((res) => res.data)
  );

export default useCreateTravalling;
