import {defineStore} from "pinia";
import {type UserType, UserTypeVariant} from "~/types/common";

const ADMIN_ACCESSES: (UserTypeVariant | undefined)[] = [UserTypeVariant.admin];
const MODERATOR_ACCESSES: (UserTypeVariant | undefined)[] = [UserTypeVariant.admin, UserTypeVariant.moderator];

export const useUserStore = defineStore('user', () => {
  const tokenStore = useTokenStore();

  const { value: token } = toRefs(tokenStore);

  const userId = useCookie<number | null>('USER_ID', { path: '/' });

  const user = ref<UserType | null>(null);
  const country = ref<string | null>(null);

  const authorized = computed(() => !!user.value);
  const isAdmin = computed(() => ADMIN_ACCESSES.includes(user.value?.type))
  const isModerator = computed(() => MODERATOR_ACCESSES.includes(user.value?.type))

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

    authorized,
    isAdmin,
    isModerator,
    isRussian,
    fullAccess,

    checkUser,
    logout,
  };
});
