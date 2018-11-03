export function map_to_string(map) {
  let str = '';
  for (const [key, value] of map.entries()) {
    str += `${key} => ${value}`;
  }
  return str;
}

export function parseWebPreferencesFeaturesString(features) {
  let webPreferences = {};

  parseFeaturesString(features, function (key, value) {
    if (value === undefined) {
      // no value was specified, default it to true
      value = true;
    }
    webPreferences[key] = value;
  });

  return webPreferences;
}

function parseFeaturesString(features, emit) {
  features = `${features}`;
  // split the string by ','
  features.split(/,\s*/).forEach((feature) => {
    // expected form is either a key by itself or a key/value pair in the form of
    // 'key=value'
    let [key, value] = feature.split(/\s*=/);
    if (!key) return;

    // interpret the value as a boolean, if possible
    value = (value === 'yes' || value === '1') ? true : (value === 'no' || value === '0') ? false : value;

    // emit the parsed pair
    emit(key, value);
  });
}