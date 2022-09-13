import {
    GetManyBaseUsersControllerUserEntityApiArg,
    useGetManyBaseUsersControllerUserEntityQuery,
    UserEntity
} from "../../lib/api/go-wild.api";
import {PaginationProps} from "../../types/finder";

export function UserList({params}: PaginationProps<GetManyBaseUsersControllerUserEntityApiArg>) {
    const {data} = useGetManyBaseUsersControllerUserEntityQuery(params);
    const users: UserEntity[] = data?.data ?? [];

    return (
        <>
            Render user-list {users.length}
        </>
    );
}
