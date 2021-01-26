import os
import zipfile
import urllib.request

main_dir = './fetcher/'
url = 'https://github.com/pcm-dpc/COVID-19/blob/master/aree/geojson/dpc-covid-19-aree-nuove-g-json.zip?raw=true'
file_name = 'file.zip'

local_path = main_dir + file_name


def execute():
    urllib.request.urlretrieve(url, local_path)

    with zipfile.ZipFile(local_path, 'r') as zip_ref:
        zip_ref.extractall(main_dir)
        os.remove(local_path)
