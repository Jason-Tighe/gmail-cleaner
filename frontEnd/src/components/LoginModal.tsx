import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../hooks/Auth'

interface GoogleUser {
  name: string
  email: string
}

export default function GoogleSignInButton() {
  const { setUser } = useAuth()

  function handleLoginSuccess(credentialResponse: CredentialResponse) {
    if (credentialResponse.credential) {
      const decoded = jwtDecode<GoogleUser>(credentialResponse.credential)
      setUser({
        name: decoded.name,
        email: decoded.email
      })
    }
  }

  function handleLoginError() {
    console.error('Google Login Failed')
  }

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={handleLoginError}
    />
  )
}