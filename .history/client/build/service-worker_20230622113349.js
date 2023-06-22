"use strict";

var precacheConfig = [
  ["/index.html", "df95b7a4af45de4661a3117596095f8e"],
  ["/static/css/main.6bc0ab3b.css", "3ec993c59166770fae1afc6dadb3b4f4"],
  ["/static/js/main.194ae395.js", "e21f64ebd1f98abce1058eb40712e0ce"]
];

var cacheName = "sw-precache-v3-sw-precache-webpack-plugin-" + (self.registration ? self.registration.scope : "");
var ignoreUrlParametersMatching = [/^utm_/];

var addDirectoryIndex = function (url, index) {
  var path = new URL(url);

  if (path.pathname.slice(-1) === "/") {
    path.pathname += index;
  }

  return path.toString();
};

var cleanResponse = function (response) {
  return response.redirected ? (
    "body" in response ? Promise.resolve(response.body) : response.blob()
  ).then(function (body) {
    return new Response(body, {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText
    });
  }) : Promise.resolve(response);
};

var createCacheKey = function (url, paramName, paramValue, dontCacheBustUrlsMatching) {
  var parsedUrl = new URL(url);

  if (dontCacheBustUrlsMatching && parsedUrl.pathname.match(dontCacheBustUrlsMatching)) {
    return parsedUrl.toString();
  }

  parsedUrl.search += (parsedUrl.search ? "&" : "") +
    encodeURIComponent(paramName) + "=" +
    encodeURIComponent(paramValue);

  return parsedUrl.toString();
};

var isPathWhitelisted = function (whitelist, url) {
  if (whitelist.length === 0) {
    return true;
  }

  var path = new URL(url).pathname;

  return whitelist.some(function (whitelistedPath) {
    return path.match(whitelistedPath);
  });
};

var stripIgnoredUrlParameters = function (url, ignoreParams) {
  var parsedUrl = new URL(url);

  parsedUrl.hash = "";
  parsedUrl.search = parsedUrl.search.slice(1).split("&").map(function (param) {
    return param.split("=");
  }).filter(function (param) {
    return ignoreParams.every(function (ignoreRegex) {
      return !ignoreRegex.test(param[0]);
    });
  }).map(function (param) {
    return param.join("=");
  }).join("&");

  return parsedUrl.toString();
};

var hashParamName = "_sw-precache";
var urlsToCacheKeys = new Map(precacheConfig.map(function (item) {
  var url = item[0];
  var cacheKey = item[1];
  var fullUrl = new URL(url, self.location);
  var cacheRequest = createCacheKey(fullUrl, hashParamName, cacheKey, /\.\w{8}\./);

  return [fullUrl.toString(), cacheRequest];
}));

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return setOfCachedUrls(cache).then(function (cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, { credentials: "same-origin" });
              return fetch(request).then(function (response) {
                if (!response.ok) {
                  throw new Error("Request for " + cacheKey + " returned a response with status " + response.status);
                }

                return cleanResponse(response).then(function (responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  var expectedCacheNames = new Set([cacheName]);

  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.keys().then(function (existingKeys) {
        return Promise.all(
          existingKeys.map(function (existingKey) {
            if (!expectedCacheNames.has(existingKey.url)) {
              return cache.delete(existingKey);
            }
          })
        );
      });
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method === "GET") {
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    var cacheKey = urlsToCacheKeys.has(url);
    var navigateFallback = "/index.html";

    if (!cacheKey && event.request.mode === "navigate" && isPathWhitelisted(["^(?!\\/__).*"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      cacheKey = urlsToCacheKeys.has(url);
    }

    if (cacheKey) {
      event.respondWith(
        caches.open(cacheName).then(function (cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
            if (response) {
              return response;
            }

            throw new Error("The cached response that was expected is missing.");
          });
        }).catch(function (error) {
          console.warn("Couldn't serve response for \"" + event.request.url + "\" from cache: " + error);
          return fetch(event.request);
        })
      );
    }
  }
});

function setOfCachedUrls(cache) {
  return cache.keys().then(function (requests) {
    return requests.map(function (request) {
      return request.url;
    });
  }).then(function (urls) {
    return new Set(urls);
  });
}
