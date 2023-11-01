import { InfluxDB, Point } from "@influxdata/influxdb-client";
const token =
  "r0UXmdgLXt1m-WwtRB4vM7VdPStiGGaJIDX6S6uZRZVp-uD9nD2zPc4grxdXf3HutQqqgfR0ZXB1zja2i5YdiA==";
const url = "https://timeseries.idtolu.net";

const client = new InfluxDB({ url, token });
console.log("corriendo");
let org = `TEST`;
let bucket = `test_entiot`;
const listPoints = {
  point1: new Point("device_frmpayload_data_AUTOMODE").floatField("value", 1),
  point2: new Point("device_frmpayload_data_DIMMING").floatField("value", 250),
  point3: new Point("device_frmpayload_data_E1").floatField("value", 6),
  point4: new Point("device_frmpayload_data_F1").floatField(
    "value",
    getRandomIntInclusive(58, 60)
  ),
  point5: new Point("device_frmpayload_data_I1").floatField(
    "value",
    getRandomIntInclusive(540, 570)
  ),
  point6: new Point("device_frmpayload_data_LAT").floatField(
    "value",
    getRandomIntInclusive(0, 1)
  ),
  point7: new Point("device_frmpayload_data_LON").floatField(
    "value",
    getRandomIntInclusive(0, 1)
  ),
  point8: new Point("device_frmpayload_data_MANUALMODE").floatField("value", 0),
  point9: new Point("device_frmpayload_data_P1").floatField(
    "value",
    getRandomIntInclusive(126, 127)
  ),
  point10: new Point("device_frmpayload_data_PF1").floatField("value", 1),
  point11: new Point("device_frmpayload_data_STA").floatField(
    "value",
    getRandomIntInclusive(0, 1)
  ),
  point12: new Point("device_frmpayload_data_TEMPERATURA_INTERNA").floatField(
    "value",
    getRandomIntInclusive(24, 25)
  ),
  point13: new Point("device_frmpayload_data_VL1").floatField(
    "value",
    getRandomIntInclusive(230, 237)
  ),
  // point14: new Point('device_status_margin').floatField('value', getRandomIntInclusive(0,1)),
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function escribirDatos() {
  const writeApi = client.getWriteApi(org, bucket);
  writeApi.useDefaultTags({ device_name: "ILE-SLJ-FMF-000016" });

  Object.values(listPoints).forEach((point) => {
    writeApi.writePoint(point);
  });

  await writeApi
    .close()
    .then(() => {
      console.log("Datos escritos con éxito");
    })
    .catch((e) => {
      console.error("Error al escribir los datos", e);
      console.log("\\nFinished ERROR");
    });
}

setInterval(() => {
  escribirDatos();
}, 60000);
