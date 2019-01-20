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
      // A name by itself is given a true boolean value
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
    // webPreferences - A name by itself is given a true boolean value. A preference can be set to another value by including an =, followed by the value. Special values yes and 1 are interpreted as true, while no and 0 are interpreted as false.
    value = (value === 'yes' || value === '1' || value === 'true') ? true : (value === 'no' || value === '0' || value === 'false') ? false : value;

    // emit the parsed pair
    emit(key, value);
  });
}