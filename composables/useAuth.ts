export const useAuthStore = () => {
  const isAuth = ref(false)
  const token = ref('')

  const setIsAuth = (value: boolean) => {
    isAuth.value = value
  }

  const setToken = (value: string) => {
    token.value = value
  }

  return {
    isAuth,
    setIsAuth,
    token,
    setToken
  }
}

export default useAuthStore
