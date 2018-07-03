export function map_to_string(map) {
  let str = '';
  for (const [key, value] of map.entries()) {
    str += `${key} => ${value}`;
  }
  return str;
}
