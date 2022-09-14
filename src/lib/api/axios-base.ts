import {RootState} from '../store';
import {removeToken, setToken} from '../store/auth.slice';
import {AuthRefreshTokenDto} from './go-wild.api';
import {BaseQueryApi, QueryReturnValue} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {RetryOptions} from '@reduxjs/toolkit/dist/query/retry';
import type {BaseQueryFn, FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {retry} from '@reduxjs/toolkit/query';
import {FetchArgs} from '@reduxjs/toolkit/src/query/fetchBaseQuery';
import {Mutex} from 'async-mutex';
import type {AxiosError} from 'axios';
import axios from 'axios';

type ApiBaseError = {
    status: number;
    data: unknown;
};

type AxiosBaseParams = { baseUrl: string };

export const axiosBaseQuery =
    ({baseUrl}: AxiosBaseParams = {baseUrl: ''}) =>
        async <R = unknown>(
            {url, method, body, params}: FetchArgs,
            api: BaseQueryApi
        ): Promise<QueryReturnValue<R, ApiBaseError>> => {
            const state = api.getState() as RootState;
            const headers = state.auth.token?.accessToken
                ? {
                    Authorization: 'Bearer ' + state.auth.token?.accessToken
                }
                : undefined;
            try {
                const result = await axios({url: baseUrl + url, method, data: body, params, headers});
                return {data: result.data as R};
            } catch (axiosError) {
                const err = axiosError as AxiosError;
                return {
                    error: {
                        status: err.response?.status ?? 500,
                        data: err.response?.data || err.message
                    }
                };
            }
        };

const mutex = new Mutex();
export const baseQueryWithReAuth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (
    args: FetchArgs,
    api,
    extraOptions
) => {
    const baseQuery = axiosBaseQuery({baseUrl: process.env.REACT_APP_BACKEND_URL || '/'});

    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api);
    if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const state = api.getState() as RootState;
                const refreshToken = state.auth.token?.refreshToken;

                if (refreshToken) {
                    const body: AuthRefreshTokenDto = {refreshToken};
                    const refreshResult = await baseQuery<any>(
                        {
                            url: `/api/v1/auth/refresh-token`,
                            method: 'POST',
                            credentials: 'same-origin',
                            body
                        },
                        api
                    );
                    if (refreshResult.data) {
                        api.dispatch(setToken(refreshResult.data));
                        // retry the initial query
                        result = await baseQuery(args, api);
                    } else {
                        api.dispatch(removeToken());
                    }
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api);
        }
    }
    return result;
};

export const retryBaseQuery: BaseQueryFn<FetchArgs,
    unknown,
    FetchBaseQueryError,
    RetryOptions,
    {}> = retry(
    async (args: FetchArgs, api, extraOptions) => {
        const result = await baseQueryWithReAuth(args, api, extraOptions);

        // bail out of re-tries immediately if unauthorized,
        // because we know successive re-retries would be redundant
        if (result.error?.status === 401) {
            retry.fail(result.error);
        }

        return result;
    },
    {
        maxRetries: 3
    }
);
