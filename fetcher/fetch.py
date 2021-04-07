import os
import zipfile
import urllib.request

zip_names = ['parte1.zip', 'parte2.z01']

archive_name = 'file.zip'
file_name = 'dpc-covid-19-ita-aree-nuove-g.json'


def run(dir_name):
    zip_path = dir_name + archive_name

    for zip in zip_names:
        url = 'https://github.com/pcm-dpc/COVID-19/blob/master/aree/geojson/dpc-covid-19-aree-nuove-g-json-' + zip + '?raw=true'
        urllib.request.urlretrieve(url, zip_path)

    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(dir_name)
        os.remove(zip_path)
