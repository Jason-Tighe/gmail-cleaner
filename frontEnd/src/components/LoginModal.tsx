import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/Auth'; 


type UserInfo = {
  name: string;
  email: string;
};

export default function GoogleSignInButton() {
    const { setUser } = useAuth();
    const navigate = useNavigate();
  
    const login = useGoogleLogin({
      scope: 'https://www.googleapis.com/auth/gmail.readonly',
      onSuccess: async (tokenResponse) => {
        try {
          const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          });     
          const accessToken = tokenResponse.access_token;
          const userInfo = res.data as UserInfo;
  
          setUser({
            name: userInfo.name,
            email: userInfo.email,
            accessToken
          });
  
          localStorage.setItem('user', JSON.stringify({
            name: userInfo.name,
            email: userInfo.email,
            accessToken
          }));
  
          navigate('/inbox');
        } catch (err) {
          console.error('Login failed:', err);
        }
      },
      onError: (err) => console.error('Google Login Error:', err),
    });
    return (
      <button 
      onClick={() => login()}
      className="w-full max-w-xs bg-slate-100 text-slate-900 px-8 py-6 rounded-2xl shadow-md hover:bg-slate-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out text-lg font-medium flex items-center justify-center space-x-3"
    >
      <i className="fab fa-google text-xl text-red-600"></i>
      <span>Sign in with Google</span>
    </button>
    );
  }