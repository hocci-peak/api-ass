$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: 'https://api.covid19api.com/summary',
        // dataType: "text",
        dataType: "json",
        contentType: 'application/json; charset=UTF-8',
        success: function (result, status, xhr) {
            const newData = result.Countries.filter((data) => {
                return data.Country.includes("Thailand") ||
                    data.Country.includes("Japan") ||
                    data.Country.includes("Korea (South)") ||
                    data.Country.includes("China")
                    //  ||
                    // data.Country.includes("United Kingdom") ||
                    // data.Country.includes("Taiwan, Republic of China")
            })
            // console.log(newData);
            // NewConfirmed
            var newConfirmed = document.getElementById('newConfirmed').getContext('2d');
            var myChart = new Chart(newConfirmed, {
                type: 'bar',
                data: {
                    labels: [newData[0].Country,
                    newData[1].Country,
                    newData[2].Country,
                    newData[3].Country
                    // newData[4].Country,
                    // newData[5].Country
                ],
                    datasets: [{
                        label: '# of Votes',
                        data: [
                            newData[0].TotalConfirmed,
                            newData[1].TotalConfirmed,
                            newData[2].TotalConfirmed,
                            newData[3].TotalConfirmed
                            // newData[4].TotalConfirmed,
                            // newData[5].TotalConfirmed
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                            // 'rgba(153, 102, 255, 0.2)',
                            // 'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                            // 'rgba(153, 102, 255, 1)',
                            // 'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
            //  new death         
            var newDeaths = document.getElementById('newDeaths').getContext('2d');
            var myChart = new Chart(newDeaths, {
                type: 'polarArea',
                data: {
                    labels: [newData[0].Country,
                    newData[1].Country,
                    newData[2].Country,
                    newData[3].Country,
                    // newData[4].Country,
                    // newData[5].Country
                ],
                    datasets: [{
                        label: '# of Votes',
                        data: [
                            newData[0].TotalDeaths,
                            newData[1].TotalDeaths,
                            newData[2].TotalDeaths,
                            newData[3].TotalDeaths,
                            // newData[4].TotalDeaths,
                            // newData[5].TotalDeaths
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            // 'rgba(153, 102, 255, 0.2)',
                            // 'rgba(255, 159, 64, 0.2)'
                        ],                        
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: true
                        }
                    }
                }
            });
            //  Total Recovered         
            var totalRecovered = document.getElementById('totalRecovered').getContext('2d');
            var myChart = new Chart(totalRecovered, {
                type: 'line',
                data: {
                    labels: [newData[0].Country,
                    newData[1].Country,
                    newData[2].Country,
                    newData[3].Country,
                    // newData[4].Country,
                    // newData[5].Country
                ],
                    datasets: [{
                        label: '# of Votes',
                        data: [
                            newData[0].TotalRecovered,
                            newData[1].TotalRecovered,
                            newData[2].TotalRecovered,
                            newData[3].TotalRecovered,
                            // newData[4].TotalRecovered,
                            // newData[5].TotalRecovered
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            // 'rgba(153, 102, 255, 0.2)',
                            // 'rgba(255, 159, 64, 0.2)'
                        ],                        
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    elements: {
                        line: {
                          borderWidth: 3
                        }
                      }
                }
            });
        }
    })


})

