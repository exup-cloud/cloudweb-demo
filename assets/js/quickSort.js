export function quickSort(arr, key) {
  if (arr.length <= 1) { return arr }
  let left = []
  let right = []
  let _index = Math.floor(arr.length / 2)
  let _m = arr.splice(_index, 1)[0]
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i][key] > _m[key]) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left, key).concat([_m], quickSort(right, key))
}

export function quickSortTime(arr, key, type) {
  //按时间快速排序
  if (arr.length <= 1) {
    return arr;
  }
  let left = [];
  let right = [];
  let _index = Math.floor(arr.length / 2);

  // arr.forEach(item => {
  //   item[key] = getTimeStamp(item[key]);
  // });

  let _m = arr.splice(_index, 1)[0];

  if (type === 2) {
    //降序
    for (var i = 0, len = arr.length; i < len; i++) {
      if (Number(arr[i][key]) > Number(_m[key])) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return quickSortTime(left, key, 2).concat(
      [_m],
      quickSortTime(right, key, 2)
    );
  } else {
    //升序
    for (var i = 0, len = arr.length; i < len; i++) {
      if (Number(arr[i][key]) < Number(_m[key])) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return quickSortTime(left, key).concat([_m], quickSortTime(right, key));
  }
}
