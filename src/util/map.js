export function map_to_string(map) {
  let str = '';
  for (let [key, value] of map.entries()) {
    str += '' + key + ' => ' + value;
  }
  return str;
}
