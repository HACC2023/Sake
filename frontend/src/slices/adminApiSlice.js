import { apiSlice } from "./apiSlice";
const BASE_URL = "/api/users";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    adminLogin: builder.mutation({
      query: data => ({
        url: `${BASE_URL}/auth-admin`,
        method: "POST",
        body: data,
      }),
    }),
    adminRegister: builder.mutation({
      query: data => ({
        url: `${BASE_URL}/register-admin`,
        method: "POST",
        body: data,
      }),
    }),
    adminRegisterVendor: builder.mutation({
      query: data => ({
        url: `${BASE_URL}/register-vendor`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/logout-admin`,
        method: "POST",
      }),
    }),
    adminGetVendors: builder.query({
      query: () => ({
        url: `${BASE_URL}/admin/vendors`,
      }),
    }),
    adminGetUsers: builder.query({
      query: () => ({
        url: `${BASE_URL}/admin/users`,
      }),
    }),
    adminGetContainers: builder.query({
      query: () => ({
        url: `${BASE_URL}/containers`,
      }),
    }),
    adminGetVendorByName: builder.query({
      query: name => ({
        url: `${BASE_URL}/admin/vendors/${name}`,
      }),
    }),
    adminRemoveVendor: builder.mutation({
      query: name => ({
        url: `${BASE_URL}/admin/remove-vendor/${name}`,
        method: "DELETE",
      }),
    }),
    adminUpdateVendorInventory: builder.mutation({
      query: ({ data, name }) => ({
        url: `${BASE_URL}/admin/vendors/${name}`,
        method: "PATCH",
        body: data,
      }),
    }),
    adminRemoveVendorInventory: builder.mutation({
      query: ({ data, name }) => ({
        url: `${BASE_URL}/admin/remove/vendors/${name}`,
        method: "PATCH",
        body: data,
      }),
    }),
    vendorLogin: builder.mutation({
      query: data => ({
        url: `${BASE_URL}/auth-vendor`,
        method: "POST",
        body: data,
      }),
    }),
    vendorLogout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/logout-vendor`,
        method: "POST",
      }),
    }),
    vendorProfile: builder.query({
      query: () => ({
        url: `${BASE_URL}/vendor`,
      }),
    }),
    vendorGetUsers: builder.query({
      query: () => ({
        url: `${BASE_URL}/vendor/list-users`,
      }),
    }),
    vendorGetVendors: builder.query({
      query: () => ({
        url: `${BASE_URL}/list-vendors`,
      }),
    }),
    vendorGetUserByPhone: builder.query({
      query: phone => ({
        url: `${BASE_URL}/vendor/user/${phone}`,
      }),
    }),
    vendorCheckoutUser: builder.mutation({
      query: ({ data, phone }) => ({
        url: `${BASE_URL}/vendor/checkout-user/${phone}`,
        method: "PATCH",
        body: data,
      }),
    }),
    vendorUserReturn: builder.mutation({
      query: ({ data, phone }) => ({
        url: `${BASE_URL}/vendor/user-return/${phone}`,
        method: "PATCH",
        body: data,
      }),
    }),
    vendorUpdateLocation: builder.mutation({
      query: data => ({
        url: `${BASE_URL}/vendor/location`,
        method: "POST",
        body: data,
      }),
    }),
    userLogin: builder.mutation({
      query: data => ({
        url: `${BASE_URL}/auth-user`,
        method: "POST",
        body: data,
      }),
    }),
    userRegister: builder.mutation({
      query: data => ({
        url: `${BASE_URL}/register-user`,
        method: "POST",
        body: data,
      }),
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/logout-user`,
        method: "POST",
      }),
    }),
    userProfile: builder.query({
      query: () => ({
        url: `${BASE_URL}/user/profile`,
      }),
    }),
    userAddPayment: builder.mutation({
      query: data => ({
        url: `${BASE_URL}/user/profile/payment`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminRegisterMutation,
  useAdminRegisterVendorMutation,
  useAdminLogoutMutation,
  useAdminGetVendorsQuery,
  useAdminGetVendorByNameQuery,
  useAdminUpdateVendorInventoryMutation,
  useAdminRemoveVendorInventoryMutation,
  useAdminGetContainersQuery,
  useVendorLoginMutation,
  useVendorLogoutMutation,
  useVendorProfileQuery,
  useVendorGetUsersQuery,
  useVendorGetVendorsQuery,
  useVendorGetUserByPhoneQuery,
  useVendorCheckoutUserMutation,
  useVendorUserReturnMutation,
  useVendorUpdateLocationMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
  useUserRegisterMutation,
  useUserProfileQuery,
  useUserAddPaymentMutation,
  useAdminRemoveVendorMutation,
  useAdminGetUsersQuery,
} = adminApiSlice;
