interface IBody {
  name?: string
  prenom?: string
  adresse?: string
  telephone?: string
  email: string
  password: string
}

interface IData {
  isAuth: boolean
  token: string
}

export const fetchAuth = async (type: string, url: string, body: IBody): Promise<IData | undefined> => {
  const { isAuth, setIsAuth } = useAuth()
  const { name, prenom, telephone, email, password } = body

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        prenom,
        telephone,
        email,
        password
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: IData = await response.json()

    if (data && type === 'register') {
      navigateTo('/login')
    } else if (data && type === 'login') {
      document.cookie = data.token ? `token=${data.token}` : ''
      setIsAuth(data.isAuth || false)
      navigateTo('/dashboard')
    }

    return data
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error)
  }
}

export default () => {
  return fetchAuth
}
