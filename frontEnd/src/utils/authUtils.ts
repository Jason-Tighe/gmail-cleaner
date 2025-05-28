
export const refreshAccessToken = async (refreshToken: string) => {
    try {
      interface TokenResponse {
        access_token: string;
        expires_in: number;
      }

      const response = await axios.post<TokenResponse>('https://oauth2.googleapis.com/token', {
        client_id: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
        client_secret: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      });
  
      return {
        accessToken: response.data.access_token,
        expiresAt: Date.now() + (response.data.expires_in * 1000)
      };
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      throw error;
    }
  };