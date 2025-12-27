export function printMap(map: any[][]): void {
  console.log(map.map((fields) => fields.join("")).join("\r\n"));
}
