
function getLocation(data, callback) {
  data.envProps.environment.envProps['lat'] = '';
  data.envProps.environment.envProps['lon'] = '';

  var geo_options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 5000
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      try {
        data.envProps.environment.envProps['lat'] = position.coords.latitude;
        data.envProps.environment.envProps['lon'] = position.coords.longitude;
      } catch (e) {} finally {
        callAPI(data, callback);
      }
    }, function (error) {
      callAPI(data, callback);
    }, geo_options);
  } else {
    callAPI(data, callback);
  }
}

/**
 * [callAPI description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function callAPI(data, callback) {

  if (!Core.checkRegisCall()) {
    Core.clearCreds();
    pwService.callReg(data, callback);
  } else {
    // if (Core.checkPropCall()) {
    //   // service api call
    //   pwService.reqToService(data, callback);
    // } else {
    //   // property master api call
    //   pwService.reqToPM(data, callback);
    // }
    pwService.reqToService(data, callback);
  }
}

executeApi = function () {
  if (arguments.length < 3 || arguments.length > 4) {
    alert('ExecuteApi method expect three or four arguments');
  } else if (arguments.length === 3) {
    execute.call(arguments, false);
  } else if (arguments.length === 4) {
    execute.call(arguments, true);
  }
};

function execute(wH) {
  Props.setGlobalHeaders(this[0].environment.envProps);
  Props.setSecureKey(this[0].environment.envProps);
  Props.setApiType('');

  if (!navigator.onLine) {
    var fo = Props.getErrors('network').response;
    wH ? this[3](pwService.apiRes(false, Props.getErrors('network').code, (fo))) :
      this[2](pwService.apiRes(false, Props.getErrors('network').code, (fo)));
    return;
  }

  if (!(wH ? typeof this[3] === 'function' : typeof this[2] === 'function') || !(wH ? this[3].length === 1 : this[2].length === 1)) {
    alert('Callback method should be function and accepts only one argument');
    return;
  }

  if (!Core.bodyValid(this[1])) {
    var fo = Props.getErrors('bodyParam').response;
    wH ? this[3](pwService.apiRes(false, Props.getErrors('bodyParam').code, (fo))) :
      this[2](pwService.apiRes(false, Props.getErrors('bodyParam').code, (fo)));
    return;
  }

  if (!Core.headerValid(wH ? this[2] : {})) {
    var fo = Props.getErrors('headerParam').response;
    wH ? this[3](pwService.apiRes(false, Props.getErrors('headerParam').code, (fo))) :
      this[2](pwService.apiRes(false, Props.getErrors('headerParam').code, (fo)));
    return;
  }
  if (Core.prepareKey('Publickey') in localStorage && Core.prepareKey('jwtToken') in localStorage) {
    if ("GUID" in localStorage) {
      var keyDec = Core.AESDec(localStorage.getItem("GUID"), Props.getSecureKey());
      if (keyDec === '') {
        var fo = Props.getErrors('guid').response;
        wH ? this[3](pwService.apiRes(false, Props.getErrors('guid').code, (fo))) :
          this[2](pwService.apiRes(false, Props.getErrors('guid').code, (fo)));
        Core.clearCredsAll();
        return;
      }
    }
  } else {
    Core.setGuid(Props.getSecureKey());
  }

  var prepareData = {
    envProps: this[0],
    header: wH ? this[2] : {},
    reqData: {
      "interfaces": {},
      "services": {}
    }
  };

  var body = this[1];
  for (var i in body) {
    prepareData.reqData.services[i] = body[i];
  }

  function setUrl(body) {
    for (var service in body) {
      if (service === 'LOGOUT') {
        prepareData.url = Props.getUrl('logout');
        return prepareData;
      } else if (service === 'AUTH_VAHANA' || service === 'AUTH' || service === 'AUTHDOPS') {
        prepareData.url = Props.getUrl('auth');
        Props.setApiType(service);
        return prepareData;
      } else {
        prepareData.url = Props.getUrl('');
        return prepareData;
      }
    }
  }

  function setAuthUrl(body) {
    for (var service in body) {
      prepareData.url = Props.getUrl('auth');
      Props.setApiType(service);
      return prepareData;
    }
  }
  if (prepareData.envProps['environment'].hasOwnProperty('isAuth') && prepareData.envProps['environment'].isAuth) {
    setAuthUrl(body);
  } else {
    setUrl(body);
  }

  var data = prepareData;
  /**
   * Prepare Request Data validate.
   *
   * @return {Object} The response object.
   *
   */
  if (!Core.reqValid(data)) {
    var fo = Props.getErrors('requestInvalid').response;
    wH ? this[3](pwService.apiRes(false, Props.getErrors('requestInvalid').code, (fo))) : this[2](pwService.apiRes(false, Props.getErrors('requestInvalid').code, (fo)));
    return;
  }

  try {
    var as = Object.keys(data.reqData.services);
    if (as.length > 5) {
      {
        var fo = Props.getErrors('serviceInvalid').response;
        wH ? this[3](pwService.apiRes(false, Props.getErrors('serviceInvalid').code, (fo))) : this[2](pwService.apiRes(false, Props.getErrors('serviceInvalid').code, (fo)));
        return;
      }
    }
  } catch (e) {
    var fo = Props.getErrors('serviceInvalid').response;
    wH ? this[3](pwService.apiRes(false, Props.getErrors('serviceInvalid').code, (fo))) : this[2](pwService.apiRes(false, Props.getErrors('serviceInvalid').code, (fo)));
    return;
  }

  // reset default props
  Props.SetPWRequest();

  if (wH) {
    getLocation(data, this[3]);
  } else {
    getLocation(data, this[2]);
  }
}
