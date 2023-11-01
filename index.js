import { InfluxDB, Point } from "@influxdata/influxdb-client";
const token = 'r_5TcCnWIQJiWZ6x1_MHaL2K90VwUDPPfbyJQJVMUWlOuVLF7lVTqEYeVZSSRPC65rBaGhXDLy8ANDlE_Rx30A==';
const url = "https://timeseries.idtolu.net";

const client = new InfluxDB({ url, token });
console.log("corriendo");
let org = `TEST`
let bucket = `test_ilesa`

let writeClient = client.getWriteApi(org, bucket, 'ns')

for (let i = 0; i < 5; i++) {
  let point = new Point('device_name')
    .tag('tagname1', 'tagvalue1')
    .intField('field1', i)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, i * 1000) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}
