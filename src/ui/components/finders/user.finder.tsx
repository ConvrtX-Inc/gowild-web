import {
  UserEntity,
  useGetOneBaseUsersControllerUserEntityQuery
} from '../../../lib/api/go-wild.api';
import { FinderProps } from '../../../types/finder';
import { Loader } from '../loader';

export function UserFinder({ id, OnFound, OnError, OnLoading }: FinderProps<UserEntity>) {
  const { data, error, isError, isLoading } = useGetOneBaseUsersControllerUserEntityQuery({
    id,
    join: ['picture']
  });

  if (isLoading) return OnLoading ? <OnLoading /> : <Loader />;

  if (isError) return <OnError error={error} />;

  return <OnFound item={data!} />;
}
