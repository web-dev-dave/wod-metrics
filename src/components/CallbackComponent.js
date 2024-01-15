import React, { useEffect } from 'react';
import whoopAuth from '../auth/whoopAuth';

const CallbackComponent = () => {
  useEffect(() => {
    // Step 2: User is redirected back to your redirect URI with the authorization code
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
      // Step 3: Exchange authorization code for access token
      whoopAuth.exchangeCodeForToken(authorizationCode)
        .then((accessToken) => {
          // Step 4: Use the access token as needed
          console.log('Access Token:', accessToken);

          // In a real-world scenario, you might want to store the access token in a state or context
          // and use it for authorized requests to the WHOOP API.
        })
        .catch((error) => {
          console.error('Error exchanging authorization code for access token:', error.message);
        });
    }
  }, []);

  return (
    <div>
      <p>This is the callback component.</p>
    </div>
  );
};

export default CallbackComponent;
