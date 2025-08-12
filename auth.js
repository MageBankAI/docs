(function() {
    'use strict';
    
    // Add authenticated class if user is authenticated
    if (localStorage.getItem('mage_docs_authenticated')) {
        try {
            const authData = JSON.parse(localStorage.getItem('mage_docs_authenticated'));
            const isExpired = Date.now() - authData.timestamp > 24 * 60 * 60 * 1000;
            if (!isExpired) {
                document.documentElement.classList.add('auth-authenticated');
                document.body.classList.add('auth-authenticated');
            }
        } catch (e) {}
    }
    
    const AUTH_CONFIG = {
        password: 'MAGE2025',
        sessionKey: 'mage_docs_authenticated',
        sessionDuration: 24 * 60 * 60 * 1000
    };

    function isAuthenticated() {
        const authData = localStorage.getItem(AUTH_CONFIG.sessionKey);
        if (!authData) return false;
        
        try {
            const { timestamp } = JSON.parse(authData);
            const isExpired = Date.now() - timestamp > AUTH_CONFIG.sessionDuration;
            
            if (isExpired) {
                localStorage.removeItem(AUTH_CONFIG.sessionKey);
                return false;
            }
            return true;
        } catch (e) {
            localStorage.removeItem(AUTH_CONFIG.sessionKey);
            return false;
        }
    }

    function authenticate(password) {
        if (password === AUTH_CONFIG.password) {
            const authData = {
                timestamp: Date.now(),
                authenticated: true
            };
            localStorage.setItem(AUTH_CONFIG.sessionKey, JSON.stringify(authData));
            return true;
        }
        return false;
    }

    function createLoginModal() {
        const modal = document.createElement('div');
        modal.id = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-overlay">
                <div class="auth-modal">
                    <!-- Header - Fixed -->
                    <div class="auth-header">
                        <div class="auth-header-content">
                            <div class="auth-icon-container">
                                <svg class="auth-logo" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                </svg>
                            </div>
                            <div class="auth-header-text">
                                <h2>Access Required</h2>
                                <p>Please enter the password to access the documentation</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Scrollable Content -->
                    <div class="auth-content">
                        <form id="auth-form" class="auth-form">
                            <div class="auth-input-group">
                                <label class="auth-input-label">
                                    <svg class="auth-label-icon" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 17a2 2 0 0 0 2-2c0-1.11-.89-2-2-2a2 2 0 0 0-2 2 2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5 5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3Z"/>
                                    </svg>
                                    Password *
                                </label>
                                <input 
                                    type="password" 
                                    id="auth-password" 
                                    placeholder="Enter password"
                                    autocomplete="current-password"
                                    required
                                >
                            </div>
                            <div id="auth-error" class="auth-error" style="display: none;">
                                <svg class="auth-error-icon" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"/>
                                </svg>
                                <span class="auth-error-text"></span>
                            </div>
                        </form>
                    </div>
                    
                    <!-- Footer Buttons - Fixed -->
                    <div class="auth-footer">
                        <button type="submit" form="auth-form" class="auth-submit">
                            <svg class="auth-submit-icon" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z"/>
                            </svg>
                            Access Documentation
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const form = document.getElementById('auth-form');
        const passwordInput = document.getElementById('auth-password');
        const errorDiv = document.getElementById('auth-error');
        
        passwordInput.focus();
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = passwordInput.value;
            
            if (authenticate(password)) {
                document.body.removeChild(modal);
                showContent();
            } else {
                const errorText = errorDiv.querySelector('.auth-error-text');
                errorText.textContent = 'Invalid password. Please try again.';
                errorDiv.style.display = 'flex';
                passwordInput.value = '';
                passwordInput.focus();
                passwordInput.classList.add('error');
                setTimeout(() => passwordInput.classList.remove('error'), 300);
            }
        });
    }

    function hideContent() {
        const style = document.createElement('style');
        style.id = 'auth-hide-content';
        document.documentElement.classList.add('auth-active');
        document.body.classList.add('auth-active');
        
        style.textContent = `
            body > *:not(#auth-modal) {
                filter: blur(15px) !important;
                pointer-events: none !important;
                user-select: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    function showContent() {
        const hideStyle = document.getElementById('auth-hide-content');
        if (hideStyle) {
            hideStyle.remove();
        }
        document.documentElement.classList.remove('auth-active');
        document.body.classList.remove('auth-active');
        document.documentElement.classList.add('auth-authenticated');
        document.body.classList.add('auth-authenticated');
    }

    function init() {
        if (!isAuthenticated()) {
            createLoginModal();
        }
    }

    // Hide content immediately if not authenticated
    if (!isAuthenticated()) {
        hideContent();
    }

    window.addEventListener('beforeunload', function() {
        if (!isAuthenticated()) {
            localStorage.removeItem(AUTH_CONFIG.sessionKey);
        }
    });

    init();
})();