import {defineStore} from "pinia";
import {type UserType, UserTypeVariant} from "~/types/common";

export const useUserStore = defineStore('user', () => {
  const tokenStore = useTokenStore();

  const { value: token } = toRefs(tokenStore);

  const userId = useCookie('USER_ID', { path: '/' });

  const user = ref<UserType | null>(null);
  const country = ref<string | null>(null);

  const isAdmin = computed(() => [UserTypeVariant.admin].includes(user.value?.type as any))
  const isModerator = computed(() => [UserTypeVariant.admin, UserTypeVariant.moderator].includes(user.value?.type as any))

  const isRussian = computed(() => country.value === 'RU');
  const fullAccess = computed(() => isRussian.value || isModerator.value);

  const checkUser = async () => {
    const data = await $request<{ user: UserType }>('user/details')
    user.value = data.user;
  };

  const logout = () => {
    user.value = null;
    userId.value = null;
    tokenStore.value = null;
  };

  return {
    userId,
    user,
    country,
    token,

    isAdmin,
    isModerator,
    isRussian,
    fullAccess,

    checkUser,
    logout,
  };
});
