const LandingPage = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/azuread`;
    
  };

  return (
    <div>
      <h1>Welcome to My App</h1>
      <button onClick={handleLogin}>Login with Microsoft</button>
    </div>
  );
};

export default LandingPage;
