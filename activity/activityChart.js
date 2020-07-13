let activities = [];
let times = [];

let titleColor, textColor;

var ctx = document.getElementById('myChart').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');

changeDesign();
drawChart(false);

function refreshChart() {
    activities = localStorage.getItem("activity_Keys").split(",");
    times = localStorage.getItem("activity_Values").split(",");

    drawChart(true);
}

function drawChart(destroy) {
    if (destroy == true) {
        myChart.destroy();
        myChart2.destroy();
    }

    if (activities[0] != "") {
        myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: activities,
                datasets: [{
                    label: 'Productivity',
                    backgroundColor: 'rgba(2, 255, 255, 255)',
                    fill: 'true',
                    data: times,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 255, 175, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(105, 100, 105, 0.6)',
                        'rgba(77, 60, 46, 0.6)',                        
                        'rgba(184, 104, 187, 0.6)',
                        'rgba(82, 209, 241, 0.6)',
                        'rgba(18, 236, 145, 0.6)',
                        'rgba(140, 14, 14, 0.6)'
                    ],
                    borderColor: titleColor,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    labels: {
                        fontColor: textColor,
                        fontSize: 12.5
                    }
                }
            }
        });
    }
    else {
        myChart = new Chart(ctx2, {
            type: 'bar'
        });
    }

    myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: activities,
            datasets: [{
                label: 'Productivity',
                backgroundColor: 'rgba(2, 255, 255, 255)',
                fill: 'true',
                data: times,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 255, 175, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(105, 100, 105, 0.2)',
                    'rgba(77, 60, 46, 0.2)',                        
                    'rgba(184, 104, 187, 0.2)',
                    'rgba(82, 209, 241, 0.2)',
                    'rgba(18, 236, 145, 0.2)',
                    'rgba(140, 14, 14, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(105, 100, 105, 1)',
                    'rgba(77, 60, 46, 1)',                        
                    'rgba(184, 104, 187, 1)',
                    'rgba(82, 209, 241, 1)',
                    'rgba(18, 236, 145, 1)',
                    'rgba(140, 14, 14, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: textColor,
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 10,
                        fontColor: textColor,
                    }
                }],
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "What You Did On Your Computer",
                fontColor: titleColor,
                fontSize: 14
            }
        }
    });
}

function changeDesign() {
    if (localStorage.getItem("design") == "darkMode") {
        textColor = "rgba(245, 241, 237, 1)";
        titleColor = "rgba(245, 241, 237, 1)";
    }
    else {
        textColor = "rgba(0, 0, 0, 1)";
        titleColor = "rgba(0, 0, 0, 1)";
    }
}