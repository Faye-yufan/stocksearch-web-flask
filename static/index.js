function buildProfileTable(data) {
    var table = document.getElementById('info-table')
    var row = `<tr>
    <td class="align-right">Company Name</td>
    <td class="align-left">${data.name}</td>
    </tr>
    <tr>
    <td class="align-right">Stock Ticker Symbol</td>
    <td class="align-left">${data.ticker}</td>
    </tr>
    <tr>
    <td class="align-right">Stock Exchange Code</td>
    <td class="align-left">${data.exchange}</td>
    </tr>
    <tr>
    <td class="align-right">Company Start Date</td>
    <td class="align-left">${data.ipo}</td>
    </tr>
    <tr>
    <td class="align-right bottom-border">Category</td>
    <td class="align-left bottom-border">${data.finnhubIndustry}</td>
    </tr>
    `
    table.innerHTML = row
}

function buildSummaryTable(data, ticker) {
    var table = document.getElementById
    ('summary-table')

    function upOrDown(d_dp){
        var d_dp = Number(d_dp)
        if (d_dp>0){
            return "../static/img/GreenArrowUp.png"
        } else {
            return "../static/img/RedArrowDown.png"
        }
        
    }

    var row = `<tr>
    <td class="align-right">Stock Ticker Symbol</td>
    <td class="align-left">${ticker.toUpperCase()}</td>
    </tr>
    <tr>
    <td class="align-right">Trading Day</td>
    <td class="align-left">${data.t}</td>
    </tr>
    <tr>
    <td class="align-right">Previous Closing Price</td>
    <td class="align-left">${data.pc}</td>
    </tr>
    <tr>
    <td class="align-right">Opening Price</td>
    <td class="align-left">${data.o}</td>
    </tr>
    <tr>
    <td class="align-right">High Price</td>
    <td class="align-left">${data.h}</td>
    </tr>
    <tr>
    <td class="align-right">Low Price</td>
    <td class="align-left">${data.l}</td>
    </tr>
    <tr>
    <td class="align-right">Change</td>
    <td class="align-left">${data.d}
    <img src="${upOrDown(data.d)}" alt="" height='15' width='15'>
    </td>
    </tr>
    <tr>
    <td class="align-right bottom-border">Change Percent</td>
    <td class="align-left bottom-border">${data.dp}
    <img src="${upOrDown(data.dp)}" alt="" height='15' width='15'>
    </td>
    </tr>
    `
    table.innerHTML = row
}

function buildRecTrends(data) {
    var strongSell = document.getElementById('strongSell')
    var mediumSell = document.getElementById('mediumSell')
    var hold = document.getElementById('hold')
    var mediumBuy = document.getElementById('mediumBuy')
    var strongBuy = document.getElementById('strongBuy')

    strongSell.innerHTML = `${data.strongSell}`
    mediumSell.innerHTML = `${data.sell}`
    hold.innerHTML = `${data.hold}`
    mediumBuy.innerHTML = `${data.buy}`
    strongBuy.innerHTML = `${data.strongBuy}`

}

function buildHighcharts(price, volume) {
    console.log(volume);
    console.log(price);

    Highcharts.stockChart('chart-container', {

        rangeSelector: {
            enabled: true,
            inputEnabled: true,
            buttons: [{
                type: 'day',
                count: 7,
                text: '7d'
            }, {
                type: 'day',
                count: 15,
                text: '15d'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 3,
                text: '3m'
            }, {
                type: 'month',
                count: 6,
                text: '6m'
            }],
            selected: 1
        },

        title: {
            text: $('#stockTiker').val().toUpperCase() + ' Stock Price'
        },

        subtitle: {
            text: 'Finnhub API'
        },

        yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Volume'
            },
            height: '100%',
            lineWidth: 2
        }, {
            opposite: false,
            labels: {
                align: 'left',
                x: 0
            },
            title: {
                text: 'Stock Price'
            },
            height: '100%',
            offset: 0,
            lineWidth: 2
        }],

        series: [{
            name: 'Stock Price',
            data: price,
            dataGrouping: {
                enable: false
            },
            type: 'area',
            yAxis: 1,
            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            }
        }
            , {
            type: 'column',
            name: 'Volume',
            data: volume,
            pointWidth: 2
        }
        ]
    });
}

function buildNewsTab(data) {
    var news_1 = document.getElementById('news-1');
    var news_2 = document.getElementById('news-2');
    var news_3 = document.getElementById('news-3');
    var news_4 = document.getElementById('news-4');
    var news_5 = document.getElementById('news-5');

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    for(let i=0; i<=5; i++) {
        let a = new Date(data[i].datetime * 1000);
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        data[i].datetime = date + ' ' + month + ' ' + year
    }
    

    news_1.innerHTML = `<img src="${data[0].image}" alt="Image" class="news-left-pic">
    <span class="news-header">${data[0].headline}</span><br>
    <span>${data[0].datetime}</span><br>
    <a href="${data[0].url}" id="post-hyper"> See Original Post</a>`;
    news_2.innerHTML = `<img src="${data[1].image}" alt="Image" class="news-left-pic">
    <span class="news-header">${data[1].headline}</span><br>
    <span>${data[1].datetime}</span><br>
    <a href="${data[1].url}" id="post-hyper"> See Original Post</a>`;
    news_3.innerHTML = `<img src="${data[2].image}" alt="Image" class="news-left-pic">
    <span class="news-header">${data[2].headline}</span><br>
    <span>${data[2].datetime}</span><br>
    <a href="${data[2].url}" id="post-hyper"> See Original Post</a>`;
    news_4.innerHTML = `<img src="${data[3].image}" alt="Image" class="news-left-pic">
    <span class="news-header">${data[3].headline}</span><br>
    <span>${data[3].datetime}</span><br>
    <a href="${data[3].url}" id="post-hyper"> See Original Post</a>`;
    news_5.innerHTML = `<img src="${data[4].image}" alt="Image" class="news-left-pic">
    <span class="news-header">${data[4].headline}</span><br>
    <span>${data[4].datetime}</span><br>
    <a href="${data[4].url}" id="post-hyper"> See Original Post</a>`;
}

$(document).ready(function () {

    $('form').on('submit', function (event) {

        $.ajax({
            data: {
                stockTiker: $('#stockTiker').val()
            },
            type: 'POST',
            url: '/search'
        })
            .done(function (data) {

                if (data.error) {
                    $('#errorAlert').text(data.error).show();
                    $('#success').hide();
                }
                else {
                    // show divs
                    $('#success').show();
                    $('#NavBar').show();
                    $('#logoDiv').show();

                    //Responsive data
                    document.getElementById('logoDiv')
                        .innerHTML = '<img src="' + data.logo + '" />';
                    
                    buildProfileTable(data)
                    // hide divs
                    $('#errorAlert').hide();
                    $('#chart-container').hide();
                    $('#news-container').hide();
                }

            });

        event.preventDefault();

    });

    $('a#company').on('click', function () {

        $.ajax({
            data: {
                stockTiker: $('#stockTiker').val()
            },
            type: 'POST',
            url: '/search'
        })
            .done(function (data) {
                // show divs
                $('#success').show();
                $('#NavBar').show();
                $('#logoDiv').show();
                $('#info-table').show();

                //Responsive data
                document.getElementById('logoDiv')
                    .innerHTML = '<img src="' + data.logo + '" />';
                
                buildProfileTable(data)
                
                // hide divs
                $('#summary-table').hide();
                $('#errorAlert').hide();
                $('#rec-trend-tb').hide();
                $('#chart-container').hide();
                $('#news-container').hide();

            });

    });

    $("#clear").click(function () {
        $("#stockTiker").val("");
        $("#success").hide();
        $("#errorAlert").hide();
    });


    $('a#stockSummary').on('click', function () {

        $.ajax({
            data: {
                stockTiker: $('#stockTiker').val()
            },
            type: 'POST',
            url: '/summary'
        })
            .done(function (data) {
                // show divs
                $('#NavBar').show();
                $('#summary-table').show();
                $('#rec-trend-tb').show();

                // Responsive data
                buildSummaryTable(data, $('#stockTiker').val())
                buildRecTrends(data)

                // hide divs
                $('#logoDiv').hide();
                $('#info-table').hide();
                $('#chart-container').hide();
                $('#news-container').hide();
            });


    });


    $('a#charts').on('click', function () {

        $.ajax({
            type: 'GET',
            url: `/charts?ticker=${$('#stockTiker').val()}`
        })
            .done(function (data) {

                $('#NavBar').show();
                $('#chart-container').show();

                // Transpose data into 2D metrix
                let jsondata = data;
                let data_price_2d = [];
                let data_vol_2d = [];
                let size = jsondata.c.length;

                let i = 0;
                while (i < size) {
                    data_price_2d.push([jsondata.t[i] * 1000, jsondata.c[i]]);
                    data_vol_2d.push([jsondata.t[i] * 1000, jsondata.v[i]]);
                    i++;
                }

                // Create the chart
                buildHighcharts(data_price_2d, data_vol_2d)

                $('#info-table').hide();
                $('#summary-table').hide();
                $('#logoDiv').hide();
                $('#rec-trend-tb').hide();
                $('#news-container').hide();

            });
    });

    $('a#latestNews').on('click', function () {

        $.ajax({
            type: 'GET',
            url: `/news?ticker=${$('#stockTiker').val()}`
        })
            .done(function (data) {

                $('#NavBar').show();
                $('#news-container').show();

                buildNewsTab(data);

                $('#info-table').hide();
                $('#logoDiv').hide();
                $('#summary-table').hide();
                $('#rec-trend-tb').hide();
                $('#chart-container').hide();

            });
    });

});

