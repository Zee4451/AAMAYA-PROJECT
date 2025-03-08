document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('industryChart').getContext('2d');
    
    const data = {
        labels: ['E-commerce & Retail', 'Fashion & Apparel', 'Food & Beverage', 'Electronics', 'Others'],
        datasets: [{
            data: [35, 25, 20, 12, 8],
            backgroundColor: [
                '#4CAF50',
                '#2196F3',
                '#FFC107',
                '#E91E63',
                '#9C27B0'
            ],
            borderWidth: 0,
            hoverOffset: 30
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: window.innerWidth < 768 ? 'bottom' : 'right',
                    labels: {
                        boxWidth: 15,
                        padding: 15,
                        font: {
                            size: window.innerWidth < 768 ? 12 : 14
                        }
                    }
                }
            },
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    };

    const myChart = new Chart(ctx, config);

    // Handle window resize
    window.addEventListener('resize', function() {
        if (myChart.options.plugins.legend) {
            myChart.options.plugins.legend.position = window.innerWidth < 768 ? 'bottom' : 'right';
            myChart.options.plugins.legend.labels.font.size = window.innerWidth < 768 ? 12 : 14;
        }
        myChart.update();
    });

    // Add hover interactions
    document.querySelectorAll('.industries-list li').forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            const index = parseInt(this.getAttribute('data-industry'));
            myChart.setActiveElements([{datasetIndex: 0, index: index}]);
            myChart.update();
        });

        item.addEventListener('mouseleave', function() {
            myChart.setActiveElements([]);
            myChart.update();
        });
    });
});
