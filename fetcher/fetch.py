import urllib.request

url = 'https://github.com/pcm-dpc/COVID-19/blob/master/aree/geojson/dpc-covid-19-aree-nuove-g-json.zip?raw=true'
local = './'
urllib.request.urlretrieve(url, local)
