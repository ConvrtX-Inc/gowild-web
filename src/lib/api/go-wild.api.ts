import { emptySplitApi as api } from './empty.api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    smsControllerSend: build.mutation<SmsControllerSendApiResponse, SmsControllerSendApiArg>({
      query: (queryArg) => ({ url: `/api/v1/sms/send`, method: 'POST', body: queryArg.smsDto })
    }),
    deleteOneBaseUsersControllerUser: build.mutation<
      DeleteOneBaseUsersControllerUserApiResponse,
      DeleteOneBaseUsersControllerUserApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/users/${queryArg.id}`, method: 'DELETE' })
    }),
    getOneBaseUsersControllerUser: build.query<
      GetOneBaseUsersControllerUserApiResponse,
      GetOneBaseUsersControllerUserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/users/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseUsersControllerUser: build.mutation<
      UpdateOneBaseUsersControllerUserApiResponse,
      UpdateOneBaseUsersControllerUserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/users/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.user
      })
    }),
    usersControllerApproveUser: build.mutation<
      UsersControllerApproveUserApiResponse,
      UsersControllerApproveUserApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/users/${queryArg.id}/approve`, method: 'POST' })
    }),
    usersControllerRejectUser: build.mutation<
      UsersControllerRejectUserApiResponse,
      UsersControllerRejectUserApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/users/${queryArg.id}/reject`, method: 'POST' })
    }),
    usersControllerUpdateAvatar: build.mutation<
      UsersControllerUpdateAvatarApiResponse,
      UsersControllerUpdateAvatarApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/users/${queryArg.id}/update-avatar`,
        method: 'POST',
        body: queryArg.pictureUpdateDto
      })
    }),
    getManyBaseUsersControllerUser: build.query<
      GetManyBaseUsersControllerUserApiResponse,
      GetManyBaseUsersControllerUserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/users`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseUsersControllerUser: build.mutation<
      CreateOneBaseUsersControllerUserApiResponse,
      CreateOneBaseUsersControllerUserApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/users`, method: 'POST', body: queryArg.user })
    }),
    getOneBaseStatusControllerStatus: build.query<
      GetOneBaseStatusControllerStatusApiResponse,
      GetOneBaseStatusControllerStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/statuses/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseStatusControllerStatus: build.mutation<
      UpdateOneBaseStatusControllerStatusApiResponse,
      UpdateOneBaseStatusControllerStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/statuses/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.status
      })
    }),
    deleteOneBaseStatusControllerStatus: build.mutation<
      DeleteOneBaseStatusControllerStatusApiResponse,
      DeleteOneBaseStatusControllerStatusApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/statuses/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseStatusControllerStatus: build.query<
      GetManyBaseStatusControllerStatusApiResponse,
      GetManyBaseStatusControllerStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/statuses`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseStatusControllerStatus: build.mutation<
      CreateOneBaseStatusControllerStatusApiResponse,
      CreateOneBaseStatusControllerStatusApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/statuses`, method: 'POST', body: queryArg.status })
    }),
    filesControllerUploadFile: build.mutation<
      FilesControllerUploadFileApiResponse,
      FilesControllerUploadFileApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/files/upload`, method: 'POST', body: queryArg.body })
    }),
    filesControllerDownload: build.query<
      FilesControllerDownloadApiResponse,
      FilesControllerDownloadApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/files/${queryArg.path}` })
    }),
    getOneBaseNotificationControllerNotification: build.query<
      GetOneBaseNotificationControllerNotificationApiResponse,
      GetOneBaseNotificationControllerNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/notifications/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseNotificationControllerNotification: build.mutation<
      UpdateOneBaseNotificationControllerNotificationApiResponse,
      UpdateOneBaseNotificationControllerNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/notifications/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.notification
      })
    }),
    deleteOneBaseNotificationControllerNotification: build.mutation<
      DeleteOneBaseNotificationControllerNotificationApiResponse,
      DeleteOneBaseNotificationControllerNotificationApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/notifications/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseNotificationControllerNotification: build.query<
      GetManyBaseNotificationControllerNotificationApiResponse,
      GetManyBaseNotificationControllerNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/notifications`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseNotificationControllerNotification: build.mutation<
      CreateOneBaseNotificationControllerNotificationApiResponse,
      CreateOneBaseNotificationControllerNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/notifications`,
        method: 'POST',
        body: queryArg.notification
      })
    }),
    authControllerLogin: build.mutation<AuthControllerLoginApiResponse, AuthControllerLoginApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/auth/login`,
        method: 'POST',
        body: queryArg.authEmailLoginDto
      })
    }),
    authControllerRegister: build.mutation<
      AuthControllerRegisterApiResponse,
      AuthControllerRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/register`,
        method: 'POST',
        body: queryArg.authRegisterLoginDto
      })
    }),
    authControllerForgotPassword: build.mutation<
      AuthControllerForgotPasswordApiResponse,
      AuthControllerForgotPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/forgot/password`,
        method: 'POST',
        body: queryArg.authForgotPasswordDto
      })
    }),
    authControllerResetPassword: build.mutation<
      AuthControllerResetPasswordApiResponse,
      AuthControllerResetPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/reset/password`,
        method: 'POST',
        body: queryArg.authResetPasswordDto
      })
    }),
    authControllerGenerateAdmin: build.query<
      AuthControllerGenerateAdminApiResponse,
      AuthControllerGenerateAdminApiArg
    >({
      query: () => ({ url: `/api/v1/auth/generate-admin` })
    }),
    authControllerResetAdminPassword: build.mutation<
      AuthControllerResetAdminPasswordApiResponse,
      AuthControllerResetAdminPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/reset-admin-password`,
        method: 'POST',
        body: queryArg.authResetPasswordAdminDto
      })
    }),
    authControllerMe: build.query<AuthControllerMeApiResponse, AuthControllerMeApiArg>({
      query: () => ({ url: `/api/v1/auth/me` })
    }),
    authControllerLogout: build.query<AuthControllerLogoutApiResponse, AuthControllerLogoutApiArg>({
      query: () => ({ url: `/api/v1/auth/logout` })
    }),
    authControllerRefreshToken: build.mutation<
      AuthControllerRefreshTokenApiResponse,
      AuthControllerRefreshTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/refresh-token`,
        method: 'POST',
        body: queryArg.authRefreshTokenDto
      })
    }),
    authFacebookControllerLogin: build.mutation<
      AuthFacebookControllerLoginApiResponse,
      AuthFacebookControllerLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/facebook/login`,
        method: 'POST',
        body: queryArg.authFacebookLoginDto
      })
    }),
    authGoogleControllerLogin: build.mutation<
      AuthGoogleControllerLoginApiResponse,
      AuthGoogleControllerLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/google/login`,
        method: 'POST',
        body: queryArg.authGoogleLoginDto
      })
    }),
    homeControllerAppInfo: build.query<
      HomeControllerAppInfoApiResponse,
      HomeControllerAppInfoApiArg
    >({
      query: () => ({ url: `/api/v1/dashboard` })
    }),
    getOneBaseCurrencyControllerCurrency: build.query<
      GetOneBaseCurrencyControllerCurrencyApiResponse,
      GetOneBaseCurrencyControllerCurrencyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/currencies/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    getManyBaseCurrencyControllerCurrency: build.query<
      GetManyBaseCurrencyControllerCurrencyApiResponse,
      GetManyBaseCurrencyControllerCurrencyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/currencies`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    verifyControllerSendPhoneVerificationToken: build.mutation<
      VerifyControllerSendPhoneVerificationTokenApiResponse,
      VerifyControllerSendPhoneVerificationTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/verify/mobile/send`,
        method: 'POST',
        body: queryArg.sendVerificationTokenDto
      })
    }),
    verifyControllerCheckMobileVerificationToken: build.mutation<
      VerifyControllerCheckMobileVerificationTokenApiResponse,
      VerifyControllerCheckMobileVerificationTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/verify/mobile/check`,
        method: 'POST',
        body: queryArg.checkVerificationTokenDto
      })
    }),
    getOneBaseRoomControllerRoom: build.query<
      GetOneBaseRoomControllerRoomApiResponse,
      GetOneBaseRoomControllerRoomApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/room/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseRoomControllerRoom: build.mutation<
      UpdateOneBaseRoomControllerRoomApiResponse,
      UpdateOneBaseRoomControllerRoomApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/room/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.room
      })
    }),
    deleteOneBaseRoomControllerRoom: build.mutation<
      DeleteOneBaseRoomControllerRoomApiResponse,
      DeleteOneBaseRoomControllerRoomApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/room/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseRoomControllerRoom: build.query<
      GetManyBaseRoomControllerRoomApiResponse,
      GetManyBaseRoomControllerRoomApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/room`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseRoomControllerRoom: build.mutation<
      CreateOneBaseRoomControllerRoomApiResponse,
      CreateOneBaseRoomControllerRoomApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/room`, method: 'POST', body: queryArg.room })
    }),
    getOneBaseParticipantControllerParticipant: build.query<
      GetOneBaseParticipantControllerParticipantApiResponse,
      GetOneBaseParticipantControllerParticipantApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/participants/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseParticipantControllerParticipant: build.mutation<
      UpdateOneBaseParticipantControllerParticipantApiResponse,
      UpdateOneBaseParticipantControllerParticipantApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/participants/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.participant
      })
    }),
    deleteOneBaseParticipantControllerParticipant: build.mutation<
      DeleteOneBaseParticipantControllerParticipantApiResponse,
      DeleteOneBaseParticipantControllerParticipantApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/participants/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseParticipantControllerParticipant: build.query<
      GetManyBaseParticipantControllerParticipantApiResponse,
      GetManyBaseParticipantControllerParticipantApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/participants`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseParticipantControllerParticipant: build.mutation<
      CreateOneBaseParticipantControllerParticipantApiResponse,
      CreateOneBaseParticipantControllerParticipantApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/participants`,
        method: 'POST',
        body: queryArg.participant
      })
    }),
    friendsControllerGetSuggestedFriends: build.query<
      FriendsControllerGetSuggestedFriendsApiResponse,
      FriendsControllerGetSuggestedFriendsApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/friends/suggested-friends/${queryArg.userId}` })
    }),
    getOneBaseFriendsControllerFriends: build.query<
      GetOneBaseFriendsControllerFriendsApiResponse,
      GetOneBaseFriendsControllerFriendsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/friends/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseFriendsControllerFriends: build.mutation<
      UpdateOneBaseFriendsControllerFriendsApiResponse,
      UpdateOneBaseFriendsControllerFriendsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/friends/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.friends
      })
    }),
    deleteOneBaseFriendsControllerFriends: build.mutation<
      DeleteOneBaseFriendsControllerFriendsApiResponse,
      DeleteOneBaseFriendsControllerFriendsApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/friends/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseFriendsControllerFriends: build.query<
      GetManyBaseFriendsControllerFriendsApiResponse,
      GetManyBaseFriendsControllerFriendsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/friends`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseFriendsControllerFriends: build.mutation<
      CreateOneBaseFriendsControllerFriendsApiResponse,
      CreateOneBaseFriendsControllerFriendsApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/friends`, method: 'POST', body: queryArg.friends })
    }),
    getOneBaseRouteControllerRoute: build.query<
      GetOneBaseRouteControllerRouteApiResponse,
      GetOneBaseRouteControllerRouteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseRouteControllerRoute: build.mutation<
      UpdateOneBaseRouteControllerRouteApiResponse,
      UpdateOneBaseRouteControllerRouteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.route
      })
    }),
    deleteOneBaseRouteControllerRoute: build.mutation<
      DeleteOneBaseRouteControllerRouteApiResponse,
      DeleteOneBaseRouteControllerRouteApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/route/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseRouteControllerRoute: build.query<
      GetManyBaseRouteControllerRouteApiResponse,
      GetManyBaseRouteControllerRouteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseRouteControllerRoute: build.mutation<
      CreateOneBaseRouteControllerRouteApiResponse,
      CreateOneBaseRouteControllerRouteApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/route`, method: 'POST', body: queryArg.route })
    }),
    routeCluesControllerGetAllClues: build.query<
      RouteCluesControllerGetAllCluesApiResponse,
      RouteCluesControllerGetAllCluesApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/route-clues/all-clues/${queryArg.routeId}` })
    }),
    getOneBaseRouteCluesControllerRouteClue: build.query<
      GetOneBaseRouteCluesControllerRouteClueApiResponse,
      GetOneBaseRouteCluesControllerRouteClueApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route-clues/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseRouteCluesControllerRouteClue: build.mutation<
      UpdateOneBaseRouteCluesControllerRouteClueApiResponse,
      UpdateOneBaseRouteCluesControllerRouteClueApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route-clues/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.routeClue
      })
    }),
    deleteOneBaseRouteCluesControllerRouteClue: build.mutation<
      DeleteOneBaseRouteCluesControllerRouteClueApiResponse,
      DeleteOneBaseRouteCluesControllerRouteClueApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/route-clues/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseRouteCluesControllerRouteClue: build.query<
      GetManyBaseRouteCluesControllerRouteClueApiResponse,
      GetManyBaseRouteCluesControllerRouteClueApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route-clues`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseRouteCluesControllerRouteClue: build.mutation<
      CreateOneBaseRouteCluesControllerRouteClueApiResponse,
      CreateOneBaseRouteCluesControllerRouteClueApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route-clues`,
        method: 'POST',
        body: queryArg.routeClue
      })
    }),
    postFeedControllerGetFriendsPost: build.query<
      PostFeedControllerGetFriendsPostApiResponse,
      PostFeedControllerGetFriendsPostApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/post-feed/friends-post/${queryArg.userId}` })
    }),
    postFeedControllerGetPostsFromOtherUsers: build.query<
      PostFeedControllerGetPostsFromOtherUsersApiResponse,
      PostFeedControllerGetPostsFromOtherUsersApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/post-feed/other-users-posts/${queryArg.userId}` })
    }),
    getOneBasePostFeedControllerPostFeed: build.query<
      GetOneBasePostFeedControllerPostFeedApiResponse,
      GetOneBasePostFeedControllerPostFeedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/post-feed/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBasePostFeedControllerPostFeed: build.mutation<
      UpdateOneBasePostFeedControllerPostFeedApiResponse,
      UpdateOneBasePostFeedControllerPostFeedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/post-feed/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.postFeed
      })
    }),
    deleteOneBasePostFeedControllerPostFeed: build.mutation<
      DeleteOneBasePostFeedControllerPostFeedApiResponse,
      DeleteOneBasePostFeedControllerPostFeedApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/post-feed/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBasePostFeedControllerPostFeed: build.query<
      GetManyBasePostFeedControllerPostFeedApiResponse,
      GetManyBasePostFeedControllerPostFeedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/post-feed`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBasePostFeedControllerPostFeed: build.mutation<
      CreateOneBasePostFeedControllerPostFeedApiResponse,
      CreateOneBasePostFeedControllerPostFeedApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/post-feed`, method: 'POST', body: queryArg.postFeed })
    }),
    getOneBaseLikeControllerLike: build.query<
      GetOneBaseLikeControllerLikeApiResponse,
      GetOneBaseLikeControllerLikeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/like/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseLikeControllerLike: build.mutation<
      UpdateOneBaseLikeControllerLikeApiResponse,
      UpdateOneBaseLikeControllerLikeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/like/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.like
      })
    }),
    deleteOneBaseLikeControllerLike: build.mutation<
      DeleteOneBaseLikeControllerLikeApiResponse,
      DeleteOneBaseLikeControllerLikeApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/like/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseLikeControllerLike: build.query<
      GetManyBaseLikeControllerLikeApiResponse,
      GetManyBaseLikeControllerLikeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/like`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseLikeControllerLike: build.mutation<
      CreateOneBaseLikeControllerLikeApiResponse,
      CreateOneBaseLikeControllerLikeApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/like`, method: 'POST', body: queryArg.like })
    }),
    getOneBaseShareControllerShare: build.query<
      GetOneBaseShareControllerShareApiResponse,
      GetOneBaseShareControllerShareApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/share/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseShareControllerShare: build.mutation<
      UpdateOneBaseShareControllerShareApiResponse,
      UpdateOneBaseShareControllerShareApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/share/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.share
      })
    }),
    deleteOneBaseShareControllerShare: build.mutation<
      DeleteOneBaseShareControllerShareApiResponse,
      DeleteOneBaseShareControllerShareApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/share/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseShareControllerShare: build.query<
      GetManyBaseShareControllerShareApiResponse,
      GetManyBaseShareControllerShareApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/share`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseShareControllerShare: build.mutation<
      CreateOneBaseShareControllerShareApiResponse,
      CreateOneBaseShareControllerShareApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/share`, method: 'POST', body: queryArg.share })
    }),
    getOneBaseCommentControllerComment: build.query<
      GetOneBaseCommentControllerCommentApiResponse,
      GetOneBaseCommentControllerCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/comment/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseCommentControllerComment: build.mutation<
      UpdateOneBaseCommentControllerCommentApiResponse,
      UpdateOneBaseCommentControllerCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/comment/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.comment
      })
    }),
    deleteOneBaseCommentControllerComment: build.mutation<
      DeleteOneBaseCommentControllerCommentApiResponse,
      DeleteOneBaseCommentControllerCommentApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/comment/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseCommentControllerComment: build.query<
      GetManyBaseCommentControllerCommentApiResponse,
      GetManyBaseCommentControllerCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/comment`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseCommentControllerComment: build.mutation<
      CreateOneBaseCommentControllerCommentApiResponse,
      CreateOneBaseCommentControllerCommentApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/comment`, method: 'POST', body: queryArg.comment })
    }),
    getOneBaseTreasureChestControllerTreasureChest: build.query<
      GetOneBaseTreasureChestControllerTreasureChestApiResponse,
      GetOneBaseTreasureChestControllerTreasureChestApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/treasure-chest/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseTreasureChestControllerTreasureChest: build.mutation<
      UpdateOneBaseTreasureChestControllerTreasureChestApiResponse,
      UpdateOneBaseTreasureChestControllerTreasureChestApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/treasure-chest/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.treasureChest
      })
    }),
    deleteOneBaseTreasureChestControllerTreasureChest: build.mutation<
      DeleteOneBaseTreasureChestControllerTreasureChestApiResponse,
      DeleteOneBaseTreasureChestControllerTreasureChestApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/treasure-chest/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseTreasureChestControllerTreasureChest: build.query<
      GetManyBaseTreasureChestControllerTreasureChestApiResponse,
      GetManyBaseTreasureChestControllerTreasureChestApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/treasure-chest`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseTreasureChestControllerTreasureChest: build.mutation<
      CreateOneBaseTreasureChestControllerTreasureChestApiResponse,
      CreateOneBaseTreasureChestControllerTreasureChestApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/treasure-chest`,
        method: 'POST',
        body: queryArg.treasureChest
      })
    }),
    getOneBaseSponsorControllerSponsor: build.query<
      GetOneBaseSponsorControllerSponsorApiResponse,
      GetOneBaseSponsorControllerSponsorApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/sponsor/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseSponsorControllerSponsor: build.mutation<
      UpdateOneBaseSponsorControllerSponsorApiResponse,
      UpdateOneBaseSponsorControllerSponsorApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/sponsor/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.sponsor
      })
    }),
    deleteOneBaseSponsorControllerSponsor: build.mutation<
      DeleteOneBaseSponsorControllerSponsorApiResponse,
      DeleteOneBaseSponsorControllerSponsorApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/sponsor/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseSponsorControllerSponsor: build.query<
      GetManyBaseSponsorControllerSponsorApiResponse,
      GetManyBaseSponsorControllerSponsorApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/sponsor`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseSponsorControllerSponsor: build.mutation<
      CreateOneBaseSponsorControllerSponsorApiResponse,
      CreateOneBaseSponsorControllerSponsorApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/sponsor`, method: 'POST', body: queryArg.sponsor })
    }),
    createOneBaseGuidelinesControllerGuideline: build.mutation<
      CreateOneBaseGuidelinesControllerGuidelineApiResponse,
      CreateOneBaseGuidelinesControllerGuidelineApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/guidelines`, method: 'POST', body: queryArg.guideline })
    }),
    getManyBaseGuidelinesControllerGuideline: build.query<
      GetManyBaseGuidelinesControllerGuidelineApiResponse,
      GetManyBaseGuidelinesControllerGuidelineApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/guidelines`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    updateOneBaseGuidelinesControllerGuideline: build.mutation<
      UpdateOneBaseGuidelinesControllerGuidelineApiResponse,
      UpdateOneBaseGuidelinesControllerGuidelineApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/guidelines/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.guideline
      })
    }),
    getOneBaseGuidelinesControllerGuideline: build.query<
      GetOneBaseGuidelinesControllerGuidelineApiResponse,
      GetOneBaseGuidelinesControllerGuidelineApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/guidelines/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    deleteOneBaseGuidelinesControllerGuideline: build.mutation<
      DeleteOneBaseGuidelinesControllerGuidelineApiResponse,
      DeleteOneBaseGuidelinesControllerGuidelineApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/guidelines/${queryArg.id}`, method: 'DELETE' })
    }),
    guidelinesControllerGetTermsByType: build.query<
      GuidelinesControllerGetTermsByTypeApiResponse,
      GuidelinesControllerGetTermsByTypeApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/guidelines/${queryArg['type']}` })
    }),
    getOneBaseGuidelineLogsControllerGuidelineLog: build.query<
      GetOneBaseGuidelineLogsControllerGuidelineLogApiResponse,
      GetOneBaseGuidelineLogsControllerGuidelineLogApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/guideline-logs/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseGuidelineLogsControllerGuidelineLog: build.mutation<
      UpdateOneBaseGuidelineLogsControllerGuidelineLogApiResponse,
      UpdateOneBaseGuidelineLogsControllerGuidelineLogApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/guideline-logs/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.guidelineLog
      })
    }),
    deleteOneBaseGuidelineLogsControllerGuidelineLog: build.mutation<
      DeleteOneBaseGuidelineLogsControllerGuidelineLogApiResponse,
      DeleteOneBaseGuidelineLogsControllerGuidelineLogApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/guideline-logs/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseGuidelineLogsControllerGuidelineLog: build.query<
      GetManyBaseGuidelineLogsControllerGuidelineLogApiResponse,
      GetManyBaseGuidelineLogsControllerGuidelineLogApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/guideline-logs`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseGuidelineLogsControllerGuidelineLog: build.mutation<
      CreateOneBaseGuidelineLogsControllerGuidelineLogApiResponse,
      CreateOneBaseGuidelineLogsControllerGuidelineLogApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/guideline-logs`,
        method: 'POST',
        body: queryArg.guidelineLog
      })
    }),
    getOneBaseRouteHistoricalEventsControllerRouteHistoricalEvent: build.query<
      GetOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiResponse,
      GetOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route-historical-events/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseRouteHistoricalEventsControllerRouteHistoricalEvent: build.mutation<
      UpdateOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiResponse,
      UpdateOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route-historical-events/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.routeHistoricalEvent
      })
    }),
    deleteOneBaseRouteHistoricalEventsControllerRouteHistoricalEvent: build.mutation<
      DeleteOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiResponse,
      DeleteOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route-historical-events/${queryArg.id}`,
        method: 'DELETE'
      })
    }),
    getManyBaseRouteHistoricalEventsControllerRouteHistoricalEvent: build.query<
      GetManyBaseRouteHistoricalEventsControllerRouteHistoricalEventApiResponse,
      GetManyBaseRouteHistoricalEventsControllerRouteHistoricalEventApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route-historical-events`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseRouteHistoricalEventsControllerRouteHistoricalEvent: build.mutation<
      CreateOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiResponse,
      CreateOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route-historical-events`,
        method: 'POST',
        body: queryArg.routeHistoricalEvent
      })
    }),
    getOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhoto: build.query<
      GetOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiResponse,
      GetOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route-historical-event-photo/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhoto: build.mutation<
      UpdateOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiResponse,
      UpdateOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route-historical-event-photo/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.routeHistoricalEventPhoto
      })
    }),
    deleteOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhoto: build.mutation<
      DeleteOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiResponse,
      DeleteOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route-historical-event-photo/${queryArg.id}`,
        method: 'DELETE'
      })
    }),
    getManyBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhoto: build.query<
      GetManyBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiResponse,
      GetManyBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route-historical-event-photo`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhoto: build.mutation<
      CreateOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiResponse,
      CreateOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/route-historical-event-photo`,
        method: 'POST',
        body: queryArg.routeHistoricalEventPhoto
      })
    }),
    getOneBaseTicketControllerTicket: build.query<
      GetOneBaseTicketControllerTicketApiResponse,
      GetOneBaseTicketControllerTicketApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/ticket/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseTicketControllerTicket: build.mutation<
      UpdateOneBaseTicketControllerTicketApiResponse,
      UpdateOneBaseTicketControllerTicketApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/ticket/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.ticket
      })
    }),
    deleteOneBaseTicketControllerTicket: build.mutation<
      DeleteOneBaseTicketControllerTicketApiResponse,
      DeleteOneBaseTicketControllerTicketApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/ticket/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseTicketControllerTicket: build.query<
      GetManyBaseTicketControllerTicketApiResponse,
      GetManyBaseTicketControllerTicketApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/ticket`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseTicketControllerTicket: build.mutation<
      CreateOneBaseTicketControllerTicketApiResponse,
      CreateOneBaseTicketControllerTicketApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/ticket`, method: 'POST', body: queryArg.ticket })
    }),
    getOneBaseTicketMessagesControllerTicketMessage: build.query<
      GetOneBaseTicketMessagesControllerTicketMessageApiResponse,
      GetOneBaseTicketMessagesControllerTicketMessageApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/ticket-messages/${queryArg.id}`,
        params: { fields: queryArg.fields, join: queryArg.join, cache: queryArg.cache }
      })
    }),
    updateOneBaseTicketMessagesControllerTicketMessage: build.mutation<
      UpdateOneBaseTicketMessagesControllerTicketMessageApiResponse,
      UpdateOneBaseTicketMessagesControllerTicketMessageApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/ticket-messages/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.ticketMessage
      })
    }),
    deleteOneBaseTicketMessagesControllerTicketMessage: build.mutation<
      DeleteOneBaseTicketMessagesControllerTicketMessageApiResponse,
      DeleteOneBaseTicketMessagesControllerTicketMessageApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/ticket-messages/${queryArg.id}`, method: 'DELETE' })
    }),
    getManyBaseTicketMessagesControllerTicketMessage: build.query<
      GetManyBaseTicketMessagesControllerTicketMessageApiResponse,
      GetManyBaseTicketMessagesControllerTicketMessageApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/ticket-messages`,
        params: {
          fields: queryArg.fields,
          s: queryArg.s,
          filter: queryArg.filter,
          or: queryArg.or,
          sort: queryArg.sort,
          join: queryArg.join,
          limit: queryArg.limit,
          offset: queryArg.offset,
          page: queryArg.page,
          cache: queryArg.cache
        }
      })
    }),
    createOneBaseTicketMessagesControllerTicketMessage: build.mutation<
      CreateOneBaseTicketMessagesControllerTicketMessageApiResponse,
      CreateOneBaseTicketMessagesControllerTicketMessageApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/ticket-messages`,
        method: 'POST',
        body: queryArg.ticketMessage
      })
    }),
    healthControllerCheck: build.query<
      HealthControllerCheckApiResponse,
      HealthControllerCheckApiArg
    >({
      query: () => ({ url: `/api/health` })
    })
  }),
  overrideExisting: false
});
export { injectedRtkApi as goWildApi };
export type SmsControllerSendApiResponse = unknown;
export type SmsControllerSendApiArg = {
  smsDto: SmsDto;
};
export type DeleteOneBaseUsersControllerUserApiResponse = unknown;
export type DeleteOneBaseUsersControllerUserApiArg = {
  id: string;
};
export type GetOneBaseUsersControllerUserApiResponse = /** status 200 Get one base response */ User;
export type GetOneBaseUsersControllerUserApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseUsersControllerUserApiResponse = /** status 200 Response */ User;
export type UpdateOneBaseUsersControllerUserApiArg = {
  id: string;
  user: User;
};
export type UsersControllerApproveUserApiResponse = unknown;
export type UsersControllerApproveUserApiArg = {
  id: string;
};
export type UsersControllerRejectUserApiResponse = unknown;
export type UsersControllerRejectUserApiArg = {
  id: string;
};
export type UsersControllerUpdateAvatarApiResponse = unknown;
export type UsersControllerUpdateAvatarApiArg = {
  id: string;
  pictureUpdateDto: PictureUpdateDto;
};
export type GetManyBaseUsersControllerUserApiResponse =
  /** status 200 Get paginated response */ GetManyUserResponseDto;
export type GetManyBaseUsersControllerUserApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseUsersControllerUserApiResponse =
  /** status 201 Get create one base response */ User;
export type CreateOneBaseUsersControllerUserApiArg = {
  user: User;
};
export type GetOneBaseStatusControllerStatusApiResponse =
  /** status 200 Get one base response */ Status;
export type GetOneBaseStatusControllerStatusApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseStatusControllerStatusApiResponse = /** status 200 Response */ Status;
export type UpdateOneBaseStatusControllerStatusApiArg = {
  id: string;
  status: Status;
};
export type DeleteOneBaseStatusControllerStatusApiResponse = unknown;
export type DeleteOneBaseStatusControllerStatusApiArg = {
  id: string;
};
export type GetManyBaseStatusControllerStatusApiResponse =
  /** status 200 Get paginated response */ GetManyStatusResponseDto;
export type GetManyBaseStatusControllerStatusApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseStatusControllerStatusApiResponse =
  /** status 201 Get create one base response */ Status;
export type CreateOneBaseStatusControllerStatusApiArg = {
  status: Status;
};
export type FilesControllerUploadFileApiResponse = unknown;
export type FilesControllerUploadFileApiArg = {
  body: {
    file?: Blob;
  };
};
export type FilesControllerDownloadApiResponse = unknown;
export type FilesControllerDownloadApiArg = {
  path: string;
};
export type GetOneBaseNotificationControllerNotificationApiResponse =
  /** status 200 Get one base response */ Notification;
export type GetOneBaseNotificationControllerNotificationApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseNotificationControllerNotificationApiResponse =
  /** status 200 Response */ Notification;
export type UpdateOneBaseNotificationControllerNotificationApiArg = {
  id: string;
  notification: Notification;
};
export type DeleteOneBaseNotificationControllerNotificationApiResponse = unknown;
export type DeleteOneBaseNotificationControllerNotificationApiArg = {
  id: string;
};
export type GetManyBaseNotificationControllerNotificationApiResponse =
  /** status 200 Get paginated response */ GetManyNotificationResponseDto;
export type GetManyBaseNotificationControllerNotificationApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseNotificationControllerNotificationApiResponse =
  /** status 201 Get create one base response */ Notification;
export type CreateOneBaseNotificationControllerNotificationApiArg = {
  notification: Notification;
};
export type AuthControllerLoginApiResponse = unknown;
export type AuthControllerLoginApiArg = {
  authEmailLoginDto: AuthEmailLoginDto;
};
export type AuthControllerRegisterApiResponse = unknown;
export type AuthControllerRegisterApiArg = {
  authRegisterLoginDto: AuthRegisterLoginDto;
};
export type AuthControllerForgotPasswordApiResponse = unknown;
export type AuthControllerForgotPasswordApiArg = {
  authForgotPasswordDto: AuthForgotPasswordDto;
};
export type AuthControllerResetPasswordApiResponse = unknown;
export type AuthControllerResetPasswordApiArg = {
  authResetPasswordDto: AuthResetPasswordDto;
};
export type AuthControllerGenerateAdminApiResponse = unknown;
export type AuthControllerGenerateAdminApiArg = void;
export type AuthControllerResetAdminPasswordApiResponse = unknown;
export type AuthControllerResetAdminPasswordApiArg = {
  authResetPasswordAdminDto: AuthResetPasswordAdminDto;
};
export type AuthControllerMeApiResponse = unknown;
export type AuthControllerMeApiArg = void;
export type AuthControllerLogoutApiResponse = unknown;
export type AuthControllerLogoutApiArg = void;
export type AuthControllerRefreshTokenApiResponse = unknown;
export type AuthControllerRefreshTokenApiArg = {
  authRefreshTokenDto: AuthRefreshTokenDto;
};
export type AuthFacebookControllerLoginApiResponse = unknown;
export type AuthFacebookControllerLoginApiArg = {
  authFacebookLoginDto: AuthFacebookLoginDto;
};
export type AuthGoogleControllerLoginApiResponse = unknown;
export type AuthGoogleControllerLoginApiArg = {
  authGoogleLoginDto: AuthGoogleLoginDto;
};
export type HomeControllerAppInfoApiResponse = unknown;
export type HomeControllerAppInfoApiArg = void;
export type GetOneBaseCurrencyControllerCurrencyApiResponse =
  /** status 200 Get one base response */ Currency;
export type GetOneBaseCurrencyControllerCurrencyApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type GetManyBaseCurrencyControllerCurrencyApiResponse =
  /** status 200 Get paginated response */ GetManyCurrencyResponseDto;
export type GetManyBaseCurrencyControllerCurrencyApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type VerifyControllerSendPhoneVerificationTokenApiResponse = unknown;
export type VerifyControllerSendPhoneVerificationTokenApiArg = {
  sendVerificationTokenDto: SendVerificationTokenDto;
};
export type VerifyControllerCheckMobileVerificationTokenApiResponse = unknown;
export type VerifyControllerCheckMobileVerificationTokenApiArg = {
  checkVerificationTokenDto: CheckVerificationTokenDto;
};
export type GetOneBaseRoomControllerRoomApiResponse = /** status 200 Get one base response */ Room;
export type GetOneBaseRoomControllerRoomApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseRoomControllerRoomApiResponse = /** status 200 Response */ Room;
export type UpdateOneBaseRoomControllerRoomApiArg = {
  id: string;
  room: Room;
};
export type DeleteOneBaseRoomControllerRoomApiResponse = unknown;
export type DeleteOneBaseRoomControllerRoomApiArg = {
  id: string;
};
export type GetManyBaseRoomControllerRoomApiResponse =
  /** status 200 Get paginated response */ GetManyRoomResponseDto;
export type GetManyBaseRoomControllerRoomApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseRoomControllerRoomApiResponse =
  /** status 201 Get create one base response */ Room;
export type CreateOneBaseRoomControllerRoomApiArg = {
  room: Room;
};
export type GetOneBaseParticipantControllerParticipantApiResponse =
  /** status 200 Get one base response */ Participant;
export type GetOneBaseParticipantControllerParticipantApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseParticipantControllerParticipantApiResponse =
  /** status 200 Response */ Participant;
export type UpdateOneBaseParticipantControllerParticipantApiArg = {
  id: string;
  participant: Participant;
};
export type DeleteOneBaseParticipantControllerParticipantApiResponse = unknown;
export type DeleteOneBaseParticipantControllerParticipantApiArg = {
  id: string;
};
export type GetManyBaseParticipantControllerParticipantApiResponse =
  /** status 200 Get paginated response */ GetManyParticipantResponseDto;
export type GetManyBaseParticipantControllerParticipantApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseParticipantControllerParticipantApiResponse =
  /** status 201 Get create one base response */ Participant;
export type CreateOneBaseParticipantControllerParticipantApiArg = {
  participant: Participant;
};
export type FriendsControllerGetSuggestedFriendsApiResponse = unknown;
export type FriendsControllerGetSuggestedFriendsApiArg = {
  userId: string;
};
export type GetOneBaseFriendsControllerFriendsApiResponse =
  /** status 200 Get one base response */ Friends;
export type GetOneBaseFriendsControllerFriendsApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseFriendsControllerFriendsApiResponse = /** status 200 Response */ Friends;
export type UpdateOneBaseFriendsControllerFriendsApiArg = {
  id: string;
  friends: Friends;
};
export type DeleteOneBaseFriendsControllerFriendsApiResponse = unknown;
export type DeleteOneBaseFriendsControllerFriendsApiArg = {
  id: string;
};
export type GetManyBaseFriendsControllerFriendsApiResponse =
  /** status 200 Get paginated response */ GetManyFriendsResponseDto;
export type GetManyBaseFriendsControllerFriendsApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseFriendsControllerFriendsApiResponse =
  /** status 201 Get create one base response */ Friends;
export type CreateOneBaseFriendsControllerFriendsApiArg = {
  friends: Friends;
};
export type GetOneBaseRouteControllerRouteApiResponse =
  /** status 200 Get one base response */ Route;
export type GetOneBaseRouteControllerRouteApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseRouteControllerRouteApiResponse = /** status 200 Response */ Route;
export type UpdateOneBaseRouteControllerRouteApiArg = {
  id: string;
  route: Route;
};
export type DeleteOneBaseRouteControllerRouteApiResponse = unknown;
export type DeleteOneBaseRouteControllerRouteApiArg = {
  id: string;
};
export type GetManyBaseRouteControllerRouteApiResponse =
  /** status 200 Get paginated response */ GetManyRouteResponseDto;
export type GetManyBaseRouteControllerRouteApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseRouteControllerRouteApiResponse =
  /** status 201 Get create one base response */ Route;
export type CreateOneBaseRouteControllerRouteApiArg = {
  route: Route;
};
export type RouteCluesControllerGetAllCluesApiResponse = unknown;
export type RouteCluesControllerGetAllCluesApiArg = {
  routeId: string;
};
export type GetOneBaseRouteCluesControllerRouteClueApiResponse =
  /** status 200 Get one base response */ RouteClue;
export type GetOneBaseRouteCluesControllerRouteClueApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseRouteCluesControllerRouteClueApiResponse =
  /** status 200 Response */ RouteClue;
export type UpdateOneBaseRouteCluesControllerRouteClueApiArg = {
  id: string;
  routeClue: RouteClue;
};
export type DeleteOneBaseRouteCluesControllerRouteClueApiResponse = unknown;
export type DeleteOneBaseRouteCluesControllerRouteClueApiArg = {
  id: string;
};
export type GetManyBaseRouteCluesControllerRouteClueApiResponse =
  /** status 200 Get paginated response */ GetManyRouteClueResponseDto;
export type GetManyBaseRouteCluesControllerRouteClueApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseRouteCluesControllerRouteClueApiResponse =
  /** status 201 Get create one base response */ RouteClue;
export type CreateOneBaseRouteCluesControllerRouteClueApiArg = {
  routeClue: RouteClue;
};
export type PostFeedControllerGetFriendsPostApiResponse = unknown;
export type PostFeedControllerGetFriendsPostApiArg = {
  userId: string;
};
export type PostFeedControllerGetPostsFromOtherUsersApiResponse = unknown;
export type PostFeedControllerGetPostsFromOtherUsersApiArg = {
  userId: string;
};
export type GetOneBasePostFeedControllerPostFeedApiResponse =
  /** status 200 Get one base response */ PostFeed;
export type GetOneBasePostFeedControllerPostFeedApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBasePostFeedControllerPostFeedApiResponse =
  /** status 200 Response */ PostFeed;
export type UpdateOneBasePostFeedControllerPostFeedApiArg = {
  id: string;
  postFeed: PostFeed;
};
export type DeleteOneBasePostFeedControllerPostFeedApiResponse = unknown;
export type DeleteOneBasePostFeedControllerPostFeedApiArg = {
  id: string;
};
export type GetManyBasePostFeedControllerPostFeedApiResponse =
  /** status 200 Get paginated response */ GetManyPostFeedResponseDto;
export type GetManyBasePostFeedControllerPostFeedApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBasePostFeedControllerPostFeedApiResponse =
  /** status 201 Get create one base response */ PostFeed;
export type CreateOneBasePostFeedControllerPostFeedApiArg = {
  postFeed: PostFeed;
};
export type GetOneBaseLikeControllerLikeApiResponse = /** status 200 Get one base response */ Like;
export type GetOneBaseLikeControllerLikeApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseLikeControllerLikeApiResponse = /** status 200 Response */ Like;
export type UpdateOneBaseLikeControllerLikeApiArg = {
  id: string;
  like: Like;
};
export type DeleteOneBaseLikeControllerLikeApiResponse = unknown;
export type DeleteOneBaseLikeControllerLikeApiArg = {
  id: string;
};
export type GetManyBaseLikeControllerLikeApiResponse =
  /** status 200 Get paginated response */ GetManyLikeResponseDto;
export type GetManyBaseLikeControllerLikeApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseLikeControllerLikeApiResponse =
  /** status 201 Get create one base response */ Like;
export type CreateOneBaseLikeControllerLikeApiArg = {
  like: Like;
};
export type GetOneBaseShareControllerShareApiResponse =
  /** status 200 Get one base response */ Share;
export type GetOneBaseShareControllerShareApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseShareControllerShareApiResponse = /** status 200 Response */ Share;
export type UpdateOneBaseShareControllerShareApiArg = {
  id: string;
  share: Share;
};
export type DeleteOneBaseShareControllerShareApiResponse = unknown;
export type DeleteOneBaseShareControllerShareApiArg = {
  id: string;
};
export type GetManyBaseShareControllerShareApiResponse =
  /** status 200 Get paginated response */ GetManyShareResponseDto;
export type GetManyBaseShareControllerShareApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseShareControllerShareApiResponse =
  /** status 201 Get create one base response */ Share;
export type CreateOneBaseShareControllerShareApiArg = {
  share: Share;
};
export type GetOneBaseCommentControllerCommentApiResponse =
  /** status 200 Get one base response */ Comment;
export type GetOneBaseCommentControllerCommentApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseCommentControllerCommentApiResponse = /** status 200 Response */ Comment;
export type UpdateOneBaseCommentControllerCommentApiArg = {
  id: string;
  comment: Comment;
};
export type DeleteOneBaseCommentControllerCommentApiResponse = unknown;
export type DeleteOneBaseCommentControllerCommentApiArg = {
  id: string;
};
export type GetManyBaseCommentControllerCommentApiResponse =
  /** status 200 Get paginated response */ GetManyCommentResponseDto;
export type GetManyBaseCommentControllerCommentApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseCommentControllerCommentApiResponse =
  /** status 201 Get create one base response */ Comment;
export type CreateOneBaseCommentControllerCommentApiArg = {
  comment: Comment;
};
export type GetOneBaseTreasureChestControllerTreasureChestApiResponse =
  /** status 200 Get one base response */ TreasureChest;
export type GetOneBaseTreasureChestControllerTreasureChestApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseTreasureChestControllerTreasureChestApiResponse =
  /** status 200 Response */ TreasureChest;
export type UpdateOneBaseTreasureChestControllerTreasureChestApiArg = {
  id: string;
  treasureChest: TreasureChest;
};
export type DeleteOneBaseTreasureChestControllerTreasureChestApiResponse = unknown;
export type DeleteOneBaseTreasureChestControllerTreasureChestApiArg = {
  id: string;
};
export type GetManyBaseTreasureChestControllerTreasureChestApiResponse =
  /** status 200 Get paginated response */ GetManyTreasureChestResponseDto;
export type GetManyBaseTreasureChestControllerTreasureChestApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseTreasureChestControllerTreasureChestApiResponse =
  /** status 201 Get create one base response */ TreasureChest;
export type CreateOneBaseTreasureChestControllerTreasureChestApiArg = {
  treasureChest: TreasureChest;
};
export type GetOneBaseSponsorControllerSponsorApiResponse =
  /** status 200 Get one base response */ Sponsor;
export type GetOneBaseSponsorControllerSponsorApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseSponsorControllerSponsorApiResponse = /** status 200 Response */ Sponsor;
export type UpdateOneBaseSponsorControllerSponsorApiArg = {
  id: string;
  sponsor: Sponsor;
};
export type DeleteOneBaseSponsorControllerSponsorApiResponse = unknown;
export type DeleteOneBaseSponsorControllerSponsorApiArg = {
  id: string;
};
export type GetManyBaseSponsorControllerSponsorApiResponse =
  /** status 200 Get paginated response */ GetManySponsorResponseDto;
export type GetManyBaseSponsorControllerSponsorApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseSponsorControllerSponsorApiResponse =
  /** status 201 Get create one base response */ Sponsor;
export type CreateOneBaseSponsorControllerSponsorApiArg = {
  sponsor: Sponsor;
};
export type CreateOneBaseGuidelinesControllerGuidelineApiResponse =
  /** status 201 Get create one base response */ Guideline;
export type CreateOneBaseGuidelinesControllerGuidelineApiArg = {
  guideline: Guideline;
};
export type GetManyBaseGuidelinesControllerGuidelineApiResponse =
  /** status 200 Get paginated response */ GetManyGuidelineResponseDto;
export type GetManyBaseGuidelinesControllerGuidelineApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseGuidelinesControllerGuidelineApiResponse =
  /** status 200 Response */ Guideline;
export type UpdateOneBaseGuidelinesControllerGuidelineApiArg = {
  id: string;
  guideline: Guideline;
};
export type GetOneBaseGuidelinesControllerGuidelineApiResponse =
  /** status 200 Get one base response */ Guideline;
export type GetOneBaseGuidelinesControllerGuidelineApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type DeleteOneBaseGuidelinesControllerGuidelineApiResponse = unknown;
export type DeleteOneBaseGuidelinesControllerGuidelineApiArg = {
  id: string;
};
export type GuidelinesControllerGetTermsByTypeApiResponse = unknown;
export type GuidelinesControllerGetTermsByTypeApiArg = {
  type: string;
};
export type GetOneBaseGuidelineLogsControllerGuidelineLogApiResponse =
  /** status 200 Get one base response */ GuidelineLog;
export type GetOneBaseGuidelineLogsControllerGuidelineLogApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseGuidelineLogsControllerGuidelineLogApiResponse =
  /** status 200 Response */ GuidelineLog;
export type UpdateOneBaseGuidelineLogsControllerGuidelineLogApiArg = {
  id: string;
  guidelineLog: GuidelineLog;
};
export type DeleteOneBaseGuidelineLogsControllerGuidelineLogApiResponse = unknown;
export type DeleteOneBaseGuidelineLogsControllerGuidelineLogApiArg = {
  id: string;
};
export type GetManyBaseGuidelineLogsControllerGuidelineLogApiResponse =
  /** status 200 Get paginated response */ GetManyGuidelineLogResponseDto;
export type GetManyBaseGuidelineLogsControllerGuidelineLogApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseGuidelineLogsControllerGuidelineLogApiResponse =
  /** status 201 Get create one base response */ GuidelineLog;
export type CreateOneBaseGuidelineLogsControllerGuidelineLogApiArg = {
  guidelineLog: GuidelineLog;
};
export type GetOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiResponse =
  /** status 200 Get one base response */ RouteHistoricalEvent;
export type GetOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiResponse =
  /** status 200 Response */ RouteHistoricalEvent;
export type UpdateOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiArg = {
  id: string;
  routeHistoricalEvent: RouteHistoricalEvent;
};
export type DeleteOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiResponse = unknown;
export type DeleteOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiArg = {
  id: string;
};
export type GetManyBaseRouteHistoricalEventsControllerRouteHistoricalEventApiResponse =
  /** status 200 Get paginated response */ GetManyRouteHistoricalEventResponseDto;
export type GetManyBaseRouteHistoricalEventsControllerRouteHistoricalEventApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiResponse =
  /** status 201 Get create one base response */ RouteHistoricalEvent;
export type CreateOneBaseRouteHistoricalEventsControllerRouteHistoricalEventApiArg = {
  routeHistoricalEvent: RouteHistoricalEvent;
};
export type GetOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiResponse =
  /** status 200 Get one base response */ RouteHistoricalEventPhoto;
export type GetOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiResponse =
  /** status 200 Response */ RouteHistoricalEventPhoto;
export type UpdateOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiArg = {
  id: string;
  routeHistoricalEventPhoto: RouteHistoricalEventPhoto;
};
export type DeleteOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiResponse =
  unknown;
export type DeleteOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiArg = {
  id: string;
};
export type GetManyBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiResponse =
  /** status 200 Get paginated response */ GetManyRouteHistoricalEventPhotoResponseDto;
export type GetManyBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiResponse =
  /** status 201 Get create one base response */ RouteHistoricalEventPhoto;
export type CreateOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoApiArg = {
  routeHistoricalEventPhoto: RouteHistoricalEventPhoto;
};
export type GetOneBaseTicketControllerTicketApiResponse =
  /** status 200 Get one base response */ Ticket;
export type GetOneBaseTicketControllerTicketApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseTicketControllerTicketApiResponse = /** status 200 Response */ Ticket;
export type UpdateOneBaseTicketControllerTicketApiArg = {
  id: string;
  ticket: Ticket;
};
export type DeleteOneBaseTicketControllerTicketApiResponse = unknown;
export type DeleteOneBaseTicketControllerTicketApiArg = {
  id: string;
};
export type GetManyBaseTicketControllerTicketApiResponse =
  /** status 200 Get paginated response */ GetManyTicketResponseDto;
export type GetManyBaseTicketControllerTicketApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseTicketControllerTicketApiResponse =
  /** status 201 Get create one base response */ Ticket;
export type CreateOneBaseTicketControllerTicketApiArg = {
  ticket: Ticket;
};
export type GetOneBaseTicketMessagesControllerTicketMessageApiResponse =
  /** status 200 Get one base response */ TicketMessage;
export type GetOneBaseTicketMessagesControllerTicketMessageApiArg = {
  id: string;
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type UpdateOneBaseTicketMessagesControllerTicketMessageApiResponse =
  /** status 200 Response */ TicketMessage;
export type UpdateOneBaseTicketMessagesControllerTicketMessageApiArg = {
  id: string;
  ticketMessage: TicketMessage;
};
export type DeleteOneBaseTicketMessagesControllerTicketMessageApiResponse = unknown;
export type DeleteOneBaseTicketMessagesControllerTicketMessageApiArg = {
  id: string;
};
export type GetManyBaseTicketMessagesControllerTicketMessageApiResponse =
  /** status 200 Get paginated response */ GetManyTicketMessageResponseDto;
export type GetManyBaseTicketMessagesControllerTicketMessageApiArg = {
  /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
  fields?: string[];
  /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
  s?: string;
  /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
  filter?: string[];
  /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
  or?: string[];
  /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
  sort?: string[];
  /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
  join?: string[];
  /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
  limit?: number;
  /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
  offset?: number;
  /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
  page?: number;
  /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
  cache?: number;
};
export type CreateOneBaseTicketMessagesControllerTicketMessageApiResponse =
  /** status 201 Get create one base response */ TicketMessage;
export type CreateOneBaseTicketMessagesControllerTicketMessageApiArg = {
  ticketMessage: TicketMessage;
};
export type HealthControllerCheckApiResponse = /** status 200 The Health Check is successful */ {
  status?: string;
  info?: {
    [key: string]: {
      status?: string;
      [key: string]: string;
    };
  } | null;
  error?: {
    [key: string]: {
      status?: string;
      [key: string]: string;
    };
  } | null;
  details?: {
    [key: string]: {
      status?: string;
      [key: string]: string;
    };
  };
};
export type HealthControllerCheckApiArg = void;
export type SmsDto = {
  phone_number: string;
  message: string;
};
export type GenderEnum = 'male' | 'female' | 'other';
export type FileMetaData = {
  encoding: string | null;
};
export type FileEntity = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  path: string;
  size: number;
  mimetype: string;
  fileName: string | null;
  metaData: FileMetaData | null;
};
export type Status = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  statusName:
    | 'cancelled'
    | 'active'
    | 'disabled'
    | 'approved'
    | 'refunded'
    | 'rejected'
    | 'completed'
    | 'pending'
    | 'inactive';
  isActive: boolean;
};
export type User = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  firstName: string | null;
  lastName: string | null;
  birthDate: string;
  gender: GenderEnum | null;
  username: string;
  email: string;
  phoneNo: string | null;
  picture: FileEntity | null;
  status: Status | null;
};
export type PictureUpdateDto = {
  fileId: string;
};
export type GetManyUserResponseDto = {
  data: User[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type GetManyStatusResponseDto = {
  data: Status[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type Notification = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  user_id: string;
  notification_msg: string;
};
export type GetManyNotificationResponseDto = {
  data: Notification[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};
export type AuthEmailLoginDto = {
  email: string;
  password: string;
};
export type AuthRegisterLoginDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: GenderEnum | null;
  phoneNo: string | null;
};
export type AuthForgotPasswordDto = {
  email: string | null;
  phone: string | null;
};
export type AuthResetPasswordDto = {
  password: string;
  hash: string;
};
export type AuthResetPasswordAdminDto = {
  password: string;
};
export type AuthRefreshTokenDto = {
  refreshToken: string;
};
export type UserAuthResponse = {
  token: TokenResponse;
  user: User;
};
export type AuthFacebookLoginDto = {
  access_token: string;
};
export type AuthGoogleLoginDto = {
  id_token: string;
};
export type Currency = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  code: string;
  name: string;
  namePlural: string;
  symbol: string;
};
export type GetManyCurrencyResponseDto = {
  data: Currency[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type SendVerificationTokenDto = {
  phone_number: string;
};
export type CheckVerificationTokenDto = {
  phone_number: string;
  verify_code: string;
};
export type Room = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  name: string;
  type: string;
};
export type GetManyRoomResponseDto = {
  data: Room[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type Participant = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  user_id: string;
  room_id: string;
};
export type GetManyParticipantResponseDto = {
  data: Participant[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type Friends = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  user_id: string;
  friend_id: string;
  is_approved: boolean;
};
export type GetManyFriendsResponseDto = {
  data: Friends[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type Route = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  user_id: string;
  route_name: string;
  route_photo: object;
  start_point_long: number;
  start_point_lat: number;
  stop_point_long: number;
  stop_point_lat: number;
  img_url: string;
  description: string;
};
export type GetManyRouteResponseDto = {
  data: Route[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type RouteClue = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  route_id: string;
  location_point_long: number;
  location_point_lat: number;
  clue_point_long: number;
  clue_point_lat: number;
  clue_title: string;
  description: string;
  clue_img: object;
  video_url: string;
  ar_clue: string;
};
export type GetManyRouteClueResponseDto = {
  data: RouteClue[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type PostFeed = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  user_id: string;
  title: string;
  description: string;
  img: object;
  is_published: boolean;
  views: number;
};
export type GetManyPostFeedResponseDto = {
  data: PostFeed[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type Like = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  user_id: string;
  postfeed_id: string;
};
export type GetManyLikeResponseDto = {
  data: Like[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type Share = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  user_id: string;
  postfeed_id: string;
  url: string;
};
export type GetManyShareResponseDto = {
  data: Share[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type Comment = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  user_id: string;
  postfeed_id: string;
  message: string;
};
export type GetManyCommentResponseDto = {
  data: Comment[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type TreasureChest = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  title: string;
  description: string;
  location_long: number;
  location_lat: number;
  eventDate: string;
  event_time: string;
  no_of_participants: number;
  img_url: string;
  thumbnail_img: object;
  a_r: string;
};
export type GetManyTreasureChestResponseDto = {
  data: TreasureChest[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type Sponsor = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  treasure_chest_id: string;
  img_url: string;
  img: object;
  link: string;
};
export type GetManySponsorResponseDto = {
  data: Sponsor[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type Guideline = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  type: string;
  description: string;
  last_updated_user: string;
};
export type GetManyGuidelineResponseDto = {
  data: Guideline[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type GuidelineLog = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  userId: string;
  guideline_type: string;
};
export type GetManyGuidelineLogResponseDto = {
  data: GuidelineLog[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type RouteHistoricalEvent = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  route_id: string;
  closure_uid: string;
  event_long: number;
  event_lat: number;
  event_title: string;
  event_subtitle: string;
  description: string;
};
export type GetManyRouteHistoricalEventResponseDto = {
  data: RouteHistoricalEvent[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type RouteHistoricalEventPhoto = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  route_historical_event_id: string;
  event_photo_url: string;
};
export type GetManyRouteHistoricalEventPhotoResponseDto = {
  data: RouteHistoricalEventPhoto[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type Ticket = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  user_id: string;
  subject: string;
  message: string;
  img_url: string;
  status: number;
};
export type GetManyTicketResponseDto = {
  data: Ticket[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export type TicketMessage = {
  id: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  ticket_id: string;
  user_id: string;
  message: string;
};
export type GetManyTicketMessageResponseDto = {
  data: TicketMessage[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
export const {
  useSmsControllerSendMutation,
  useDeleteOneBaseUsersControllerUserMutation,
  useGetOneBaseUsersControllerUserQuery,
  useUpdateOneBaseUsersControllerUserMutation,
  useUsersControllerApproveUserMutation,
  useUsersControllerRejectUserMutation,
  useUsersControllerUpdateAvatarMutation,
  useGetManyBaseUsersControllerUserQuery,
  useCreateOneBaseUsersControllerUserMutation,
  useGetOneBaseStatusControllerStatusQuery,
  useUpdateOneBaseStatusControllerStatusMutation,
  useDeleteOneBaseStatusControllerStatusMutation,
  useGetManyBaseStatusControllerStatusQuery,
  useCreateOneBaseStatusControllerStatusMutation,
  useFilesControllerUploadFileMutation,
  useFilesControllerDownloadQuery,
  useGetOneBaseNotificationControllerNotificationQuery,
  useUpdateOneBaseNotificationControllerNotificationMutation,
  useDeleteOneBaseNotificationControllerNotificationMutation,
  useGetManyBaseNotificationControllerNotificationQuery,
  useCreateOneBaseNotificationControllerNotificationMutation,
  useAuthControllerLoginMutation,
  useAuthControllerRegisterMutation,
  useAuthControllerForgotPasswordMutation,
  useAuthControllerResetPasswordMutation,
  useAuthControllerGenerateAdminQuery,
  useAuthControllerResetAdminPasswordMutation,
  useAuthControllerMeQuery,
  useAuthControllerLogoutQuery,
  useAuthControllerRefreshTokenMutation,
  useAuthFacebookControllerLoginMutation,
  useAuthGoogleControllerLoginMutation,
  useHomeControllerAppInfoQuery,
  useGetOneBaseCurrencyControllerCurrencyQuery,
  useGetManyBaseCurrencyControllerCurrencyQuery,
  useVerifyControllerSendPhoneVerificationTokenMutation,
  useVerifyControllerCheckMobileVerificationTokenMutation,
  useGetOneBaseRoomControllerRoomQuery,
  useUpdateOneBaseRoomControllerRoomMutation,
  useDeleteOneBaseRoomControllerRoomMutation,
  useGetManyBaseRoomControllerRoomQuery,
  useCreateOneBaseRoomControllerRoomMutation,
  useGetOneBaseParticipantControllerParticipantQuery,
  useUpdateOneBaseParticipantControllerParticipantMutation,
  useDeleteOneBaseParticipantControllerParticipantMutation,
  useGetManyBaseParticipantControllerParticipantQuery,
  useCreateOneBaseParticipantControllerParticipantMutation,
  useFriendsControllerGetSuggestedFriendsQuery,
  useGetOneBaseFriendsControllerFriendsQuery,
  useUpdateOneBaseFriendsControllerFriendsMutation,
  useDeleteOneBaseFriendsControllerFriendsMutation,
  useGetManyBaseFriendsControllerFriendsQuery,
  useCreateOneBaseFriendsControllerFriendsMutation,
  useGetOneBaseRouteControllerRouteQuery,
  useUpdateOneBaseRouteControllerRouteMutation,
  useDeleteOneBaseRouteControllerRouteMutation,
  useGetManyBaseRouteControllerRouteQuery,
  useCreateOneBaseRouteControllerRouteMutation,
  useRouteCluesControllerGetAllCluesQuery,
  useGetOneBaseRouteCluesControllerRouteClueQuery,
  useUpdateOneBaseRouteCluesControllerRouteClueMutation,
  useDeleteOneBaseRouteCluesControllerRouteClueMutation,
  useGetManyBaseRouteCluesControllerRouteClueQuery,
  useCreateOneBaseRouteCluesControllerRouteClueMutation,
  usePostFeedControllerGetFriendsPostQuery,
  usePostFeedControllerGetPostsFromOtherUsersQuery,
  useGetOneBasePostFeedControllerPostFeedQuery,
  useUpdateOneBasePostFeedControllerPostFeedMutation,
  useDeleteOneBasePostFeedControllerPostFeedMutation,
  useGetManyBasePostFeedControllerPostFeedQuery,
  useCreateOneBasePostFeedControllerPostFeedMutation,
  useGetOneBaseLikeControllerLikeQuery,
  useUpdateOneBaseLikeControllerLikeMutation,
  useDeleteOneBaseLikeControllerLikeMutation,
  useGetManyBaseLikeControllerLikeQuery,
  useCreateOneBaseLikeControllerLikeMutation,
  useGetOneBaseShareControllerShareQuery,
  useUpdateOneBaseShareControllerShareMutation,
  useDeleteOneBaseShareControllerShareMutation,
  useGetManyBaseShareControllerShareQuery,
  useCreateOneBaseShareControllerShareMutation,
  useGetOneBaseCommentControllerCommentQuery,
  useUpdateOneBaseCommentControllerCommentMutation,
  useDeleteOneBaseCommentControllerCommentMutation,
  useGetManyBaseCommentControllerCommentQuery,
  useCreateOneBaseCommentControllerCommentMutation,
  useGetOneBaseTreasureChestControllerTreasureChestQuery,
  useUpdateOneBaseTreasureChestControllerTreasureChestMutation,
  useDeleteOneBaseTreasureChestControllerTreasureChestMutation,
  useGetManyBaseTreasureChestControllerTreasureChestQuery,
  useCreateOneBaseTreasureChestControllerTreasureChestMutation,
  useGetOneBaseSponsorControllerSponsorQuery,
  useUpdateOneBaseSponsorControllerSponsorMutation,
  useDeleteOneBaseSponsorControllerSponsorMutation,
  useGetManyBaseSponsorControllerSponsorQuery,
  useCreateOneBaseSponsorControllerSponsorMutation,
  useCreateOneBaseGuidelinesControllerGuidelineMutation,
  useGetManyBaseGuidelinesControllerGuidelineQuery,
  useUpdateOneBaseGuidelinesControllerGuidelineMutation,
  useGetOneBaseGuidelinesControllerGuidelineQuery,
  useDeleteOneBaseGuidelinesControllerGuidelineMutation,
  useGuidelinesControllerGetTermsByTypeQuery,
  useGetOneBaseGuidelineLogsControllerGuidelineLogQuery,
  useUpdateOneBaseGuidelineLogsControllerGuidelineLogMutation,
  useDeleteOneBaseGuidelineLogsControllerGuidelineLogMutation,
  useGetManyBaseGuidelineLogsControllerGuidelineLogQuery,
  useCreateOneBaseGuidelineLogsControllerGuidelineLogMutation,
  useGetOneBaseRouteHistoricalEventsControllerRouteHistoricalEventQuery,
  useUpdateOneBaseRouteHistoricalEventsControllerRouteHistoricalEventMutation,
  useDeleteOneBaseRouteHistoricalEventsControllerRouteHistoricalEventMutation,
  useGetManyBaseRouteHistoricalEventsControllerRouteHistoricalEventQuery,
  useCreateOneBaseRouteHistoricalEventsControllerRouteHistoricalEventMutation,
  useGetOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoQuery,
  useUpdateOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoMutation,
  useDeleteOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoMutation,
  useGetManyBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoQuery,
  useCreateOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoMutation,
  useGetOneBaseTicketControllerTicketQuery,
  useUpdateOneBaseTicketControllerTicketMutation,
  useDeleteOneBaseTicketControllerTicketMutation,
  useGetManyBaseTicketControllerTicketQuery,
  useCreateOneBaseTicketControllerTicketMutation,
  useGetOneBaseTicketMessagesControllerTicketMessageQuery,
  useUpdateOneBaseTicketMessagesControllerTicketMessageMutation,
  useDeleteOneBaseTicketMessagesControllerTicketMessageMutation,
  useGetManyBaseTicketMessagesControllerTicketMessageQuery,
  useCreateOneBaseTicketMessagesControllerTicketMessageMutation,
  useHealthControllerCheckQuery
} = injectedRtkApi;
