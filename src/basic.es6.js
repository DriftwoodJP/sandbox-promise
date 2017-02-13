'use strict';

require('babel-polyfill');

let el = document.getElementById('btn');
el.addEventListener('click', function() {
  main();
});

/**
 * Main & console error.
 */
function main() {
  getUserInfo('driftwoodjp')
    .catch((error) => {
      console.error(`エラーが発生しました (${error})`);
    });
}

/**
 * Get User information from Github.
 * @param {String} userId
 * @return {Promise}
 */
function getUserInfo(userId) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', `https://api.github.com/users/${userId}`);
    request.addEventListener('load', (event) => {
      if (event.target.status !== 200) {
        reject(new Error(`${event.target.status}: ${event.target.statusText}`));
      }

      const userInfo = JSON.parse(event.target.responseText);

      const view = createView(userInfo);
      displayView(view);
      resolve();
    });
    request.addEventListener('error', () => {
      reject(new Error('Network Error'));
    });
    request.send();
  });
}

/**
 * Create a view at HTML tags.
 * @param {Object} userInfo
 * @return {String}
 */
function createView(userInfo) {
  /* eslint-disable no-unused-vars */
  return escapeHTML`
  <h4>${userInfo.name} (@${userInfo.login})</h4>
  <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
  <dl>
    <dt>Location</dt>
    <dd>${userInfo.location}</dd>
    <dt>Repositries</dt>
    <dd>${userInfo.public_repos}</dd>
  </dl>
  `;
}

/**
 * Display a view to #result in HTML.
 * @param {String} view
 */
function displayView(view) {
  const result = document.getElementById('result');
  result.innerHTML = view;
}

/**
 * Escape HTML special characters.
 * @param {String} str
 * @return {String}
 */
function escapeSpecialChars(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Escape HTML tags from strings.
 * @param {Strings} strings
 * @return {String}
 */
function escapeHTML(strings, ...values) {
  return strings.map((part, i) => {
    const value = values[i];
    if (value) {
      if (typeof value === 'string') {
        return part + escapeSpecialChars(value);
      } else {
        return part + String(value);
      }
    } else {
      return part;
    }
  }).join('');
}
