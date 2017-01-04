'use strict';

require('babel-polyfill');

/**
 * @param {String} value
 * @return {Promise}
 */
function asyncProcess(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value) {
        resolve(`入力値： ${value}`);
      } else {
        reject('入力値は空です。');
      }
    }, 500);
  });
}

Promise.all([
  asyncProcess('菊次郎'),
  asyncProcess('さき'),
  asyncProcess('たけし'),
])
.then(
  (response) => {
    console.log(response);
  }
)
.catch(
  (error) => {
    console.error(`エラー： ${error}`);
  }
);
