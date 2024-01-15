import React, { useEffect } from 'react';
import whoopAuth from '../auth/whoopAuth';

const AuthComponent = () => {
  useEffect(() => {
    // Step 1: Redirect user to WHOOP authorization endpoint
    const authorizationUrl = whoopAuth.getAuthorizationUrl();
    console.log(`Please go to ${authorizationUrl} and grant access.`);

    // In a real-world scenario, you might want to redirect the user to the authorization URL
    // You can use a library like `react-router-dom` for navigation or use window.location.href
    // to redirect the user programmatically.
    // For example:
    // window.location.href = authorizationUrl;

    // For the sake of this example, we'll just log the URL.
  }, []);

  return (
    <div>
      <p>This is the authentication component.</p>
    </div>
  );
};

export default AuthComponent;
