// Social Authentication Handler

// Google OAuth Login
async function loginWithGoogle() {
    try {
        // Google OAuth Configuration
        const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with actual Google Client ID
        const redirectUri = window.location.origin + '/auth/google/callback';
        
        // For demo: Simulate Google login
        const mockGoogleUser = {
            name: 'Google User',
            email: 'user@gmail.com',
            picture: 'https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff&size=200',
            provider: 'google'
        };
        
        await handleSocialLogin(mockGoogleUser);
        
        // Production code (uncomment when you have Google Client ID):
        /*
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
        window.location.href = authUrl;
        */
    } catch (error) {
        alert('Google login failed. Please try again.');
    }
}

// Facebook OAuth Login
async function loginWithFacebook() {
    try {
        // Facebook OAuth Configuration
        const appId = 'YOUR_FACEBOOK_APP_ID'; // Replace with actual Facebook App ID
        
        // For demo: Simulate Facebook login
        const mockFacebookUser = {
            name: 'Facebook User',
            email: 'user@facebook.com',
            picture: 'https://ui-avatars.com/api/?name=Facebook+User&background=1877F2&color=fff&size=200',
            provider: 'facebook'
        };
        
        await handleSocialLogin(mockFacebookUser);
        
        // Production code (uncomment when you have Facebook App ID):
        /*
        FB.login(function(response) {
            if (response.authResponse) {
                FB.api('/me', {fields: 'name,email,picture'}, function(user) {
                    handleSocialLogin({
                        name: user.name,
                        email: user.email,
                        picture: user.picture.data.url,
                        provider: 'facebook'
                    });
                });
            }
        }, {scope: 'public_profile,email'});
        */
    } catch (error) {
        alert('Facebook login failed. Please try again.');
    }
}

// GitHub OAuth Login
async function loginWithGithub() {
    try {
        // GitHub OAuth Configuration
        const clientId = 'YOUR_GITHUB_CLIENT_ID'; // Replace with actual GitHub Client ID
        
        // For demo: Simulate GitHub login
        const mockGithubUser = {
            name: 'GitHub User',
            email: 'user@github.com',
            picture: 'https://ui-avatars.com/api/?name=GitHub+User&background=333&color=fff&size=200',
            provider: 'github'
        };
        
        await handleSocialLogin(mockGithubUser);
        
        // Production code (uncomment when you have GitHub Client ID):
        /*
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email`;
        window.location.href = authUrl;
        */
    } catch (error) {
        alert('GitHub login failed. Please try again.');
    }
}

// Handle Social Login
async function handleSocialLogin(userData) {
    try {
        // Store user data
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userPhoto', userData.picture);
        localStorage.setItem('loginProvider', userData.provider);
        localStorage.setItem('userRole', 'jobseeker');
        localStorage.setItem('joinDate', new Date().toISOString());
        
        // Show success message
        alert(`✅ Successfully logged in with ${userData.provider}!\n\nWelcome, ${userData.name}!`);
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
        
    } catch (error) {
        console.error('Social login error:', error);
        alert('Login failed. Please try again.');
    }
}

// Profile Photo Preview
document.addEventListener('DOMContentLoaded', function() {
    const photoInput = document.getElementById('profile-photo');
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const preview = document.getElementById('photo-preview');
                    const img = document.getElementById('preview-img');
                    img.src = event.target.result;
                    preview.style.display = 'block';
                    
                    // Store photo in localStorage for demo
                    localStorage.setItem('userPhoto', event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
