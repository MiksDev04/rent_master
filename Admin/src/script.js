
// DOM 
const sidebar = document.getElementById('sidebar');
const main_content = document.querySelector('.main-content');
const toggleBtn = document.getElementById('toggleSidebar');
const closeSidebar = document.getElementById('closeSidebar');

// Toggle Sidebar
toggleBtn.addEventListener('click', (event) => {
    sidebar.style.left = '0';
    event.stopPropagation(); // Prevents the click from propagating to the document
});

// Close Sidebar when clicking outside
document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target) && window.innerWidth <= 992) {
        sidebar.style.left = '-230px';
    }
});

// Close Sidebar when clicking the close button
closeSidebar.addEventListener('click', () => {
    sidebar.style.left = '-230px';
});

// Auto-hide Sidebar on Resize (Small Screens)
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        sidebar.style.left = '0';
    } else {
        sidebar.style.left = '-230px';
    }
});



// Chart loading
function initChart() {
    const ctx = document.getElementById('myChart');
    if (!ctx) return;

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['October', 'November', 'December', 'January', 'February', 'March'],
            datasets: [{
                label: '# of Tenants',
                data: [15, 19, 18, 15, 14, 19],
                backgroundColor: ['rgba(255, 99, 133, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)', 'rgba(75, 192, 192, 0.7)', 'rgba(153, 102, 255, 0.7)', 'rgba(255, 159, 64, 0.7)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Allow dynamic resizing
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
//  Load the page inside the main content
function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            main_content.innerHTML = html;

            // Reinitialize Chart.js only when loading the dashboard
            if (url.includes('dashboard.html')) {
                initChart();
            }
        })
        .catch(error => console.error('Error loading content:', error));
}


sidebar.addEventListener('click', (event) => {
    if (event.target.matches('.sidebar  a')) {
        pageMap = {
            'Dashboard': './Admin/src/dashboard.html',
            'Properties': './Admin/src/properties.html',
            'Tenants': './Admin/src/tenants.html',
            'Payments': './Admin/src/payments.html',
            'Reports': './Admin/src/reports.html',
            'Settings': './Admin/src/settings.html'
            
        };
        const page = pageMap[event.target.textContent.trim()];
        if (page) loadPage(page);
        ChangeNavigationFocus(event.target.textContent);
    }
});


// Ensure the chart is initialized when the page loads
window.addEventListener('load', () => {
    loadPage('./Admin/src/reports.html');
});

function ChangeNavigationFocus(btnClick) {
    const navbar_btns = document.querySelectorAll('.sidebar > a');
    navbar_btns.forEach( btn => {
        btn.classList.remove('sidebar-btn-focus');
        if (btn.textContent.trim() === btnClick.trim()) {
            btn.classList.add('sidebar-btn-focus');
        }
    })
}

function ShowProperties() {
    loadPage("./Admin/src/properties.html"); // Adjust the URL as needed
    ChangeNavigationFocus("Properties");
}
function ShowTenants() {
    loadPage("./Admin/src/tenants.html"); // Adjust the URL as needed
    ChangeNavigationFocus("Tenants");
}
function ShowPayments() {
    loadPage("./Admin/src/payments.html"); // Adjust the URL as needed
    ChangeNavigationFocus("Payments");
}