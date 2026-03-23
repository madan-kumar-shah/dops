var makePostCall = function (url, headers, body, aync, timeout, onSuccess, onFailure) {

  if (!typeof url === 'string' || !typeof aync === 'boolean') {
    onFailure('fail', 11, 'Please send url as string and async in type booleas');
  }

  if (!typeof headers === 'object' || !typeof body === 'object') {
    onFailure('fail', 11, 'Please send headers and body as type object');
  }

  var http = xhrRef();
  setTimeout(http, timeout);

  http.open('POST', url, aync);

  setHeaders(http, headers);
  http.send(JSON.stringify(body));
  /**
   * [description]
   * @param  {[type]} error [description]
   * @return {[type]}       [description]
   */
  http.onerror = function (error) {
    onFailure(http.readyState, Props.getErrors('serverConnecting').code, JSON.stringify(Props.getErrors('serverConnecting').response));
  }
  /**
   * [description]
   * @return {[type]} [description]
   */
  http.ontimeout = function () {
    onFailure(http.readyState, Props.getErrors('serverConnecting').code, JSON.stringify(Props.getErrors('serverConnecting').response));
    console.log("ontimeout", http.status);
  }
  http.onreadystatechange = function (e) {
    if (http.readyState === 4) {
      try {
        var res = JSON.parse(e.target.response);
        var authService = Props.getApiType();
        if (headers.servicename === 'LOGOUT' && res.status === '625') {
          Core.clearCreds();
          onFailure('LOGOUT', res.status, e.target.response);
        }
        else if (res.status === '401' || res.status === '627' || res.status === '537') {
          onFailure('REGISTERAPP', res.status, e.target.response)
        }
        else if (headers.servicename === authService && res.status === '621') {
          onFailure(authService, res.status, e.target.response)
        }
        else if (res.status === '402' ||
          res.status === '622' || res.status === '628' || res.status === '528') {
          Core.clearCreds();
          onFailure(authService, res.status, e.target.response);
        }
        else if (http.status === 200) {
          var auth = http.getResponseHeader('Authorization');
          onSuccess({
            auth: auth
          }, http.readyState, http.status, e);
        }
        else {
          onFailure(http.readyState, 'PW-0003', e.target.response)
        }
      } catch (e) {
        if (status != 0) {
          onFailure(http.readyState, Props.getErrors('parsingResponse').code, JSON.stringify(Props.getErrors('parsingResponse').response));
        }
      }
    }
  }
  // }
  /**
   * [timeout description]
   * @type {[type]}
   */
  function xhrRef() {
    return new XMLHttpRequest();
  }
  /**
   * [setTimeout description]
   * @param {[type]} h [description]
   * @param {[type]} t [description]
   */
  function setTimeout(h, t) {
    h.timeout = t;
  }

  /**
   * [setHeaders description]
   * @param {[type]} http    [description]
   * @param {[type]} headers [description]
   */
  function setHeaders(http, headers) {
    http.setRequestHeader('Content-Type', 'application/json');
    if (Object.keys(headers).length > 0) {
      for (var k in headers) {
        if (headers.hasOwnProperty(k)) {
          http.setRequestHeader(k, headers[k]);
        }
      }
    }
  }
}
  var Request = {
    post: makePostCall
  }

