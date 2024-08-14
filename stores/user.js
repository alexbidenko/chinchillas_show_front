import {defineStore} from "pinia";
import {$request} from "~/utils/request.js";

export const useUserStore = defineStore('user', () => {
  const tokenStore = useTokenStore();

  const user = ref(null);
  const country = ref(null);

  const checkUser = async () => {
    const data = await $request('user/details')
    user.value = data.user;
  };

  const logout = () => {
    user.value = null;
    tokenStore.value = null;
  }

  return {
    user,
    country,

    checkUser,
    logout,
  };
});
