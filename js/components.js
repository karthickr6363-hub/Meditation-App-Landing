/**
 * Meditation App - Shared Components Engine
 * Handles dynamic injection of Header and Footer, Navigation logic, and Theme toggling.
 */

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const isAuthPage = currentPath.includes('login.html') || currentPath.includes('signup.html');
    const isDashboard = currentPath.includes('dashboard.html');

    // Theme initialization
    initTheme();

    // Inject components if not on excluded pages
    if (!isAuthPage) {
        injectHeader();
        if (!isDashboard) {
            injectFooter();
        }
        injectScrollTop();
    }

    // Set active link
    highlightActiveLink();
});

function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(theme);
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
}

function injectHeader() {
    const headerHTML = `
    <header class="fixed-nav w-full bg-white dark:bg-slate-900 shadow-sm transition-colors duration-200" style="height: var(--nav-height-desktop)">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            <!-- Logo -->
            <a href="index.html" class="flex items-center gap-2 group">
                <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">M</div>
                <span class="brand-name brand-font text-green-800 dark:text-green-400">ZenMind</span>
            </a>

            <!-- Desktop Nav Links -->
            <div class="hidden lg:flex items-center gap-8">
                <a href="index.html" class="nav-link font-medium text-slate-700 dark:text-slate-200 hover:text-green-600 transition-colors">Home</a>
                <a href="home2.html" class="nav-link font-medium text-slate-700 dark:text-slate-200 hover:text-green-600 transition-colors">Home 2</a>
                <a href="features.html" class="nav-link font-medium text-slate-700 dark:text-slate-200 hover:text-green-600 transition-colors">Features</a>
                <a href="programs.html" class="nav-link font-medium text-slate-700 dark:text-slate-200 hover:text-green-600 transition-colors">Programs</a>
                <a href="pricing.html" class="nav-link font-medium text-slate-700 dark:text-slate-200 hover:text-green-600 transition-colors">Pricing</a>
                <a href="resources.html" class="nav-link font-medium text-slate-700 dark:text-slate-200 hover:text-green-600 transition-colors">Resources</a>
                <a href="download.html" class="nav-link font-medium text-slate-700 dark:text-slate-200 hover:text-green-600 transition-colors">Download</a>
                <a href="contact.html" class="nav-link font-medium text-slate-700 dark:text-slate-200 hover:text-green-600 transition-colors">Support</a>
            </div>

            <!-- Actions -->
            <div class="hidden lg:flex items-center gap-4">
                <button onclick="toggleTheme()" class="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                    <svg class="w-5 h-5 dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                    <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.242 16.242l.707.707M7.657 7.657l.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </button>
                <a href="login.html" class="font-medium text-slate-700 dark:text-slate-200 hover:text-green-600 transition-colors">Sign In</a>
                <a href="signup.html" class="btn-consistent bg-green-600 text-white hover:bg-green-700 hover-lift hover-glow">Get Started</a>
            </div>

            <!-- Mobile Menu Button -->
            <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
        </nav>

        <!-- Mobile Drawer -->
        <div id="mobile-drawer" class="fixed inset-0 z-[60] transform -translate-x-full transition-transform duration-300 ease-in-out lg:hidden">
            <div class="absolute inset-0 bg-black bg-opacity-50" id="drawer-overlay"></div>
            <div class="absolute top-0 left-0 bottom-0 w-64 bg-white dark:bg-slate-900 shadow-xl p-6 overflow-y-auto">
                <div class="flex items-center justify-between mb-8">
                     <a href="index.html" class="flex items-center gap-2 group">
                        <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">M</div>
                        <span class="brand-name brand-font text-green-800 dark:text-green-400">ZenMind</span>
                    </a>
                    <button id="close-drawer" class="p-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                </div>
                <div class="flex flex-col gap-4">
                    <a href="index.html" class="nav-link-mobile">Home</a>
                    <a href="home2.html" class="nav-link-mobile">Home 2</a>
                    <a href="features.html" class="nav-link-mobile">Features</a>
                    <a href="programs.html" class="nav-link-mobile">Programs</a>
                    <a href="pricing.html" class="nav-link-mobile">Pricing</a>
                    <a href="resources.html" class="nav-link-mobile">Resources</a>
                    <a href="download.html" class="nav-link-mobile">Download</a>
                    <a href="contact.html" class="nav-link-mobile">Support</a>
                    
                    <!-- Dark Mode Toggle Mobile -->
                    <button onclick="toggleTheme()" class="flex items-center gap-3 nav-link-mobile text-left w-full">
                        <span class="dark:hidden">Dark Mode</span>
                        <span class="hidden dark:block">Light Mode</span>
                        <svg class="w-5 h-5 dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                        <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.242 16.242l.707.707M7.657 7.657l.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </button>

                    <hr class="my-2 border-gray-100 dark:border-slate-800">
                    <a href="login.html" class="nav-link-mobile">Sign In</a>
                    <a href="signup.html" class="btn-consistent bg-green-600 text-white w-full">Sign Up</a>
                </div>
            </div>
        </div>
    </header>
    <div style="height: var(--nav-height-desktop)"></div> <!-- Spacer -->
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // Mobile menu logic
    const drawer = document.getElementById('mobile-drawer');
    const openBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-drawer');
    const overlay = document.getElementById('drawer-overlay');

    const toggleDrawer = () => drawer.classList.toggle('-translate-x-full');

    openBtn.addEventListener('click', toggleDrawer);
    closeBtn.addEventListener('click', toggleDrawer);
    overlay.addEventListener('click', toggleDrawer);
}

function injectFooter() {
    const footerHTML = `
    <footer class="bg-slate-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 mt-05">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <!-- Brand -->
            <div class="space-y-4">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold">M</div>
                    <span class="brand-name brand-font text-white" style="font-size: 1.5rem">ZenMind</span>
                </div>
                <p class="text-sm">Finding inner peace through guided meditation and mindfulness. Bloom where you are planted.</p>
                <div class="flex gap-4">
                    <a href="#" class="footer-social hover:text-green-500 transition-all transform hover:scale-110">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="#" class="footer-social hover:text-green-400 transition-all transform hover:scale-110">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                </div>
            </div>

            <!-- Links -->
            <div>
                <h4 class="text-white font-bold mb-4">Quick Links</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="index.html" class="footer-link">Home</a></li>
                    <li><a href="features.html" class="footer-link">Features</a></li>
                    <li><a href="programs.html" class="footer-link">Programs</a></li>
                    <li><a href="pricing.html" class="footer-link">Pricing</a></li>
                </ul>
            </div>

            <!-- Resources -->
            <div>
                <h4 class="text-white font-bold mb-4">Resources</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="resources.html" class="footer-link">Blog & Tips</a></li>
                    <li><a href="download.html" class="footer-link">Download App</a></li>
                    <li><a href="contact.html" class="footer-link">Support Center</a></li>
                    <li><a href="privacy.html" class="footer-link">Privacy Policy</a></li>
                </ul>
            </div>

            <!-- Newsletter -->
            <div>
                <h4 class="text-white font-bold mb-4">Stay Mindful</h4>
                <p class="text-sm mb-4">Join our newsletter for weekly mindfulness tips.</p>
                <form class="flex border border-slate-700 rounded-lg overflow-hidden">
                    <input type="email" placeholder="Email address" class="bg-transparent px-4 py-2 w-full focus:outline-none text-sm">
                    <button type="submit" class="bg-green-600 px-4 py-2 hover:bg-green-700 transition-colors">Join</button>
                </form>
            </div>
        </div>
        <div class="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-xs">
            <p>&copy; 2026 ZenMind Meditation App. All rights reserved.</p>
        </div>
    </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('text-green-600', 'font-bold');
        }
    });
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('text-green-600', 'font-bold', 'bg-green-50', 'dark:bg-slate-800', 'px-3', 'py-2', 'rounded-lg');
        }
    });
}

function injectScrollTop() {
    const scrollBtnHTML = `
    <button id="scroll-top-btn" class="fixed bottom-8 right-8 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg opacity-0 translate-y-10 transition-all duration-300 hover:bg-green-700 hover:scale-110 focus:outline-none hidden" title="Scroll to Top">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    </button>
    `;
    document.body.insertAdjacentHTML('beforeend', scrollBtnHTML);

    const scrollBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.remove('hidden');
            setTimeout(() => {
                scrollBtn.classList.remove('opacity-0', 'translate-y-10');
            }, 10);
        } else {
            scrollBtn.classList.add('opacity-0', 'translate-y-10');
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    scrollBtn.classList.add('hidden');
                }
            }, 300);
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
