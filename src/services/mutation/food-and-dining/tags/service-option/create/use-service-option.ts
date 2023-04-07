import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useServicesOption = () =>
  useMutation((data) =>
    request.private.post('food_dining/service_option/', data).then((res) => res.data),
    {
      onMutate: () => {
          const tags = queryClient.getQueryData("service-option");

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          queryClient.setQueryData("service-option", (prev: any) => {
              if (!prev) return tags;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useServicesOption;
