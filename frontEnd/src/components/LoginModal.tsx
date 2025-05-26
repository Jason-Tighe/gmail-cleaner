import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/Auth'; 

export default function GoogleSignInButton() {
    const { setUser } = useAuth();
    const navigate = useNavigate();
  
    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        try {
          const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          });
  
          const userInfo = res.data;
  
          // Set the user in context
          setUser({
            name: userInfo.name,
            email: userInfo.email,
          });
  
          // Optional: save to localStorage too if you want persistence
          localStorage.setItem('user', JSON.stringify({
            name: userInfo.name,
            email: userInfo.email,
          }));
  
          // Redirect to inbox
          navigate('/inbox');
        } catch (err) {
          console.error('Login failed:', err);
        }
      },
      onError: (err) => console.error('Google Login Error:', err),
    });
  
    return (
      <button onClick={() => login()} className="bg-white text-black px-4 py-2 rounded">
        Sign in with Google
      </button>
    );
  }