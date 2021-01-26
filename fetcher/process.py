import json
import pprint

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
    'emilia-romagna': {'url_name': 'piemonte'},
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


def execute():
    with open('fetcher/dpc-covid-19-aree-nuove-g.json', 'r') as input_file:
        file_data = input_file.read()
        output = extract_data(file_data)

    with open('data/dataset.json', 'w') as output_file:
        output_data = json.dumps(output, indent=4)
        output_file.write(output_data)
