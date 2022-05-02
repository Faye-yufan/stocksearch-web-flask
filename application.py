from flask import Flask, jsonify, request, render_template
import requests
from datetime import *
from dateutil.relativedelta import *

application = Flask(__name__)
token = 'c88k44aad3ia349repeg'
API_URL = "https://finnhub.io/api/v1"


@application.route("/hello")
def hello_world():
    return "<p>Hello, World!</p>"


@application.route('/')
def index():
    return render_template('index.html')


@application.route('/search', methods=['POST'])
def search():
    tiker = request.form["stockTiker"]
    url_company = "https://finnhub.io/api/v1/stock/profile2?symbol=" + \
        tiker + "&token=" + token
    r = requests.get(url_company)
    res = r.json()
    if len(res) > 0:
        return res
    return jsonify({'error': 'Error: No record has been found, please enter a valid symbol'})


@application.route('/summary', methods=['POST'])
def summary():
    ticker = request.form["stockTiker"]
    url_summary = "https://finnhub.io/api/v1/quote?symbol=" + ticker.upper() + \
                                                                           "&token=" + token
    url_recommend = "https://finnhub.io/api/v1/stock/recommendation?symbol=" + \
        ticker + "&token=" + token

    r_summary = requests.get(url_summary)
    r_recommend = requests.get(url_recommend)

    res_summary = r_summary.json()
    res_recommend = r_recommend.json()[0]

    res = {**res_summary, **res_recommend}

    if len(res) > 0:
        return res
    return jsonify({'error': 'Error: No record has been found, please enter a valid symbol'})


@application.route('/charts/', methods=['GET'])
def charts():
    ticker = request.args.get('ticker')
    TODAY = datetime.today()
    SIXMBEFORE = str(
        int((TODAY+relativedelta(months=-6, days=-1)).timestamp()))
    TODAY = str(int(TODAY.timestamp()))

    url_candles = "https://finnhub.io/api/v1/stock/candle?symbol=" + ticker + \
        "&resolution=D&from=" + SIXMBEFORE + "&to=" + TODAY + "&token=" + token
    r = requests.get(url_candles)
    res = r.json()
    if len(res) > 0:
        return res
    return jsonify({'error': 'Error: No record has been found, please enter a valid symbol'})


@application.route('/news/', methods=['GET'])
def news():
    ticker = request.args.get('ticker')
    TODAY = datetime.today()
    THIRTYDBEFORE = str((TODAY+relativedelta(days=-30)))[:10]
    TODAY = str(TODAY)[:10]

    url_news = "https://finnhub.io/api/v1/company-news?symbol=" + ticker + \
    "&from=" + THIRTYDBEFORE + "&to=" + TODAY + "&token=" + token
    r = requests.get(url_news)
    res = r.json()
    if len(res) > 0:
        return jsonify(res)
    return jsonify({'error': 'Error: No record has been found, please enter a valid symbol'})


if __name__ == '__main__':
    application.debug = True
    application.run()
