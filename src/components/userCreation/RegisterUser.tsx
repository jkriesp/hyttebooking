import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  sub: string;
}

function RegisterUser() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const registerUserInBackend = async () => {
      if (!isAuthenticated || !user) return;

      const accessToken = await getAccessTokenSilently();
      const userData: User = {
        firstName: user.given_name || '',  // Adjust according to the Auth0 user profile structure
        lastName: user.family_name || '',  // Adjust according to the Auth0 user profile structure
        email: user.email ?? '',
        sub: user.sub ?? '' // Fix: Handle the possibility of user.sub being undefined by providing a default value of an empty string
      };

      try {
        const response = await fetch('http://localhost:8080/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`  // If your endpoint requires authentication
          },
          body: JSON.stringify(userData)
        });

        if (!response.ok) {
          // Handle error
          throw new Error('Failed to register user in backend');
        }

        const data = await response.json();
        console.log('User registered in backend:', data);
      } catch (error) {
        console.error('Error registering user in backend:', error);
      }
    };

    registerUserInBackend();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    <div>
      {isAuthenticated ? (
        <p>User is authenticated and being registered in the backend.</p>
      ) : (
        <p>Please log in to register.</p>
      )}
    </div>
  );
}

export default RegisterUser;
