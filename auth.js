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

    function getTheme() {
        // First check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            console.log('System prefers light theme');
            return 'light';
        }
        
        // Check for Mintlify/documentation specific selectors
        const documentationSelectors = [
            '[data-theme]',
            '.nextra-nav-container',
            '.sidebar',
            '.navbar',
            'nav[class*="nav"]',
            'main[class*="content"]',
            '.documentation',
            '.docs-container'
        ];
        
        for (const selector of documentationSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                const computedStyle = window.getComputedStyle(element);
                const backgroundColor = computedStyle.backgroundColor;
                
                if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
                    const rgb = backgroundColor.match(/\d+/g);
                    if (rgb && rgb.length >= 3) {
                        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
                        console.log(`Found ${selector} with brightness:`, brightness);
                        return brightness > 128 ? 'light' : 'dark';
                    }
                }
            }
        }
        
        // Check body text color as indicator
        if (document.body) {
            const bodyStyle = window.getComputedStyle(document.body);
            const textColor = bodyStyle.color;
            
            if (textColor && textColor !== 'rgba(0, 0, 0, 0)') {
                const rgb = textColor.match(/\d+/g);
                if (rgb && rgb.length >= 3) {
                    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
                    console.log('Body text brightness:', brightness);
                    // Light text = dark theme, dark text = light theme
                    return brightness > 128 ? 'dark' : 'light';
                }
            }
        }
        
        // Check common CSS variables
        const rootStyle = window.getComputedStyle(document.documentElement);
        const themeVars = [
            '--background-primary',
            '--background',
            '--bg-primary',
            '--color-bg-primary',
            '--gray-50',
            '--white',
            '--black'
        ];
        
        for (const varName of themeVars) {
            const varValue = rootStyle.getPropertyValue(varName).trim();
            if (varValue) {
                console.log(`Found CSS var ${varName}:`, varValue);
                if (varValue.includes('255') || varValue.includes('#fff') || varValue.includes('white')) {
                    return 'light';
                }
                if (varValue.includes('#000') || varValue.includes('black') || varValue.includes('rgb(0')) {
                    return 'dark';
                }
            }
        }
        
        // Default to system preference or light
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function createLoginModal() {
        const modal = document.createElement('div');
        modal.id = 'auth-modal';
        const theme = getTheme();
        modal.setAttribute('data-theme', theme);
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
                            <button type="button" class="auth-theme-toggle" data-theme="dark" title="Toggle theme">
                                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 18C8.69 18 6 15.31 6 12S8.69 6 12 6 18 8.69 18 12 15.31 18 12 18M20 8.69V4H15.31L12 0.69 8.69 4H4V8.69L0.69 12 4 15.31V20H8.69L12 23.31 15.31 20H20V15.31L23.31 12 20 8.69Z"/>
                                </svg>
                            </button>
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
        
        // Debug: Log initial theme detection
        const initialTheme = getTheme();
        console.log('Initial theme detected:', initialTheme);
        console.log('HTML classes:', document.documentElement.className);
        console.log('Body classes:', document.body ? document.body.className : 'No body element');
        console.log('HTML data-theme:', document.documentElement.getAttribute('data-theme'));
        console.log('Body data-theme:', document.body ? document.body.getAttribute('data-theme') : 'No body element');
        
        // Test function to manually toggle theme (for debugging)
        window.toggleAuthModalTheme = function(theme) {
            modal.setAttribute('data-theme', theme);
            console.log('Manually set theme to:', theme);
        };
        
        // Set initial theme and stick with it to prevent flickering
        const finalTheme = initialTheme;
        modal.setAttribute('data-theme', finalTheme);
        console.log('Theme set to:', finalTheme, '(preventing automatic changes)');
        
        // Only watch for explicit theme toggle clicks, not automatic changes
        const cleanupObserver = () => {
            // No observer to disconnect since we removed automatic theme detection
        };
        
        const form = document.getElementById('auth-form');
        const passwordInput = document.getElementById('auth-password');
        const errorDiv = document.getElementById('auth-error');
        const themeToggle = modal.querySelector('.auth-theme-toggle');
        
        // Set initial theme toggle state
        themeToggle.dataset.theme = initialTheme;
        
        // Add click handler for theme toggle
        themeToggle.addEventListener('click', function() {
            const currentTheme = modal.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            modal.setAttribute('data-theme', newTheme);
            themeToggle.dataset.theme = newTheme;
            console.log('Theme toggled to:', newTheme);
        });
        
        passwordInput.focus();
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = passwordInput.value;
            
            if (authenticate(password)) {
                cleanupObserver();
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