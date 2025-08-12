(function() {
    'use strict';
    
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
                    <div class="auth-header">
                        <img src="/logo/logo-light.svg" alt="Mage Logo" class="auth-logo">
                        <h2>Access Required</h2>
                        <p>Please enter the password to access the documentation</p>
                    </div>
                    <form id="auth-form" class="auth-form">
                        <div class="auth-input-group">
                            <input 
                                type="password" 
                                id="auth-password" 
                                placeholder="Enter password"
                                autocomplete="current-password"
                                required
                            >
                        </div>
                        <button type="submit" class="auth-submit">Access Documentation</button>
                        <div id="auth-error" class="auth-error"></div>
                    </form>
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
                errorDiv.textContent = 'Invalid password. Please try again.';
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
        style.textContent = `
            body {
                overflow: hidden !important;
            }
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
    }

    function init() {
        if (!isAuthenticated()) {
            hideContent();
            
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', createLoginModal);
            } else {
                createLoginModal();
            }
        }
    }

    window.addEventListener('beforeunload', function() {
        if (!isAuthenticated()) {
            localStorage.removeItem(AUTH_CONFIG.sessionKey);
        }
    });

    init();
})();