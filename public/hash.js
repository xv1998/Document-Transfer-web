self.importScripts('/spark-md5.min.js')

self.onmessage = e => {
  const { fileChunkList } = e.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  const reader = new FileReader();
  let chunks = [];
  fileChunkList.forEach(({chunk},index) => {
    if(index === fileChunkList.length - 1){
      chunks.push(chunk);
    }
    else {
      let mid = Math.ceil(chunk.size / 2);
      chunks.push(chunk.slice(0, 2), chunk.slice(mid, 2), chunk.slice(-2));
    }
  })
  reader.readAsArrayBuffer(new Blob(chunks));
  reader.onload = e =>{
    spark.append(e.target.result);
    self.postMessage({
      percentage: 100,
      hash: spark.end()
    })
    self.close();
    };
  // let percentage = 0;
  // let count = 0;
  // const loadNext = index => {
  //   const reader = new FileReader();

  //   reader.readAsArrayBuffer(fileChunkList[index].chunk); // 读取切片的ArrayBuffer
  //   reader.onload = e => {
  //     count++;
  //     spark.append(e.target.result);
  //     if(count == fileChunkList.length) { // 当最后一个切片都传输完
  //       self.postMessage({
  //         percentage: 100,
  //         hash: spark.end()
  //       })
  //       self.close();
  //     }else {
  //       percentage += 100 / fileChunkList.length;
  //       self.postMessage({
  //         percentage
  //       })
  //       loadNext(count);
  //     }
  //   }
  // }
  // loadNext(0);
}
