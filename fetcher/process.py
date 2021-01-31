import os
import json
import pprint
import requests

GITHUB_API = "https://api.github.com"
GIST_ID = "8b06345c17c0625adc2e758ff9f28a19"
API_TOKEN = os.environ['API_TOKEN']

print(API_TOKEN)

output = {}

all_regions = {
    'piemonte': {'url_name': 'piemonte'},
    'valle d\'aosta': {'url_name': 'valle-aosta'},
    'lombardia': {'url_name': 'lombardia'},
    'calabria': {'url_name': 'calabria'},
    'puglia': {'url_name': 'puglia'},
    'sicilia': {'url_name': 'sicilia'},
    'veneto': {'url_name': 'veneto'},
    'friuli venezia giulia': {'url_name': 'friuli'},
    'liguria': {'url_name': 'liguria'},
    'emilia-romagna': {'url_name': 'emilia-romagna'},
    'toscana': {'url_name': 'toscana'},
    'umbria': {'url_name': 'umbria'},
    'marche': {'url_name': 'marche'},
    'lazio': {'url_name': 'lazio'},
    'abruzzo': {'url_name': 'abruzzo'},
    'molise': {'url_name': 'molise'},
    'campania': {'url_name': 'campania'},
    'basilicata': {'url_name': 'basilicata'},
    'sardegna': {'url_name': 'sardegna'},
    'provincia autonoma bolzano': {'url_name': 'bolzano'},
    'provincia autonoma trento': {'url_name': 'trento'}
}


def extract_data(dataset):
    obj = json.loads(dataset)

    regions = []
    buffer = {}

    features = obj['features']

    for feature in features:
        f = feature['properties']
        region_source_name = f['nomeTesto'].lower()

        if region_source_name.lower() == 'intero territorio nazionale':
            continue
        else:
            region_name = all_regions[region_source_name]['url_name']
            if region_name not in regions:
                buffer[region_name] = {}
                buffer[region_name]['data'] = []
                regions.append(region_name)

    for feature in features:
        f = feature['properties']
        region_source_name = f['nomeTesto'].lower()
        code = int(f['legSpecRif'].replace('art.', ''))
        date_start = f['datasetIni']
        date_end = f['datasetFin']
        link = f['legLink']

        region_data = {
            'code': code,
            'date_start': date_start,
            'date_end': date_end,
            'link': link,
            'priority': 0,
        }

        if region_source_name.lower() == 'intero territorio nazionale':
            for region in regions:
                region_data['priority'] = 1
                buffer[region]['data'].append(region_data)
        else:
            region_name = all_regions[region_source_name]['url_name']
            buffer[region_name]['data'].append(region_data)

    return buffer


def execute(dir_name):
    file_name = 'dpc-covid-19-aree-nuove-g.json'
    file_path = dir_name + file_name
    # dataset_path = dir_name + file_name

    with open(file_path, 'r') as input_file:
        file_data = input_file.read()
        output = extract_data(file_data)

    with open('data/dataset.json', 'w'):
        output_data = json.dumps(output, indent=4)

        # form a request URL
        url = GITHUB_API+"/gists/"+GIST_ID
        print("Request URL: %s" % url)

        # print headers,parameters,payload
        headers = {'Authorization': 'token %s' % API_TOKEN}
        params = {'scope': 'gist'}
        payload = {"public": True, "files": {
            "CheColo.re Data": {"content": output_data}}}

        # make a requests
        req = requests.post(url, headers=headers, params=params,
                      data=json.dumps(payload))

        print(req.content)

        # # No need to write file anymore
        # output_file.write(output_data)
        # os.remove(dataset_path)
