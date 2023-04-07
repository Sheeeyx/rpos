import { useMutation } from 'react-query';
import {request} from '../../../../../api/api';

interface TagsTypes {
    name: string;
}

const useCreateTags = () =>
  useMutation((data) =>
    request.private.post<TagsTypes>('food_dining/food_type/', data).then((res) => res.data)
  );

export default useCreateTags;
