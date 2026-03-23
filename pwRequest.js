var platwareRequest = function (data, fingerprints) {
  /**
   * [Initializes a newly default props]
   */
  clearAllFields();
  /**
   * [Working varialbes]
   */
  var fp = fingerprints;
  var winNav = window.navigator;
  var serviceName = Object.keys(data.reqData.services).join("~").toString();
  var currentDate = new Date();
  var currentNounce = currentDate.getTime();
  var getNounce = Core.HexStr(currentDate.getTime().toString());
  var envProp = data.envProps.environment.envProps;
  /**
   * [Generate interfaces values ]
   */
  var interfacesKeys = data.reqData.interfaces;
  for (var x in interfacesKeys) {
    Props.PWRequest.PWBody.interfaces[x] = interfacesKeys[x];
  }

  /**
   * [Generate header values]
   */
  var headerKeys = data.header;
  for (var x in headerKeys) {
    Props.PWRequest.PWHeader[x] = headerKeys[x];
  }

  /**
   * [request parsing description]
   */
  if (serviceName === 'REGISTERAPP') {
    setRegisterHeaders(currentDate, currentNounce, fp, serviceName, getNounce, envProp);
    setRegisterBody(winNav, currentDate, fp, data, envProp);
  } else if (serviceName === Props.getApiType()) {
    setAuthHeaders(getNounce, data, serviceName, fp, currentNounce, currentDate, envProp);
    setAuthBody(fp, winNav, data, currentDate, envProp);
  } else if (data.url === '/gateway' || data.url === '/logout') {
    setServiceHeaders(currentDate, fp, serviceName, envProp);
    setServiceBody(currentDate, winNav, data, fp, envProp);
  }
};

/**
 * [clearAllFields description]
 * @return {[type]} [description]
 */
function clearAllFields() {
  Props.SetPWRequest();
}

/**
 * [setAuthHeaders description]
 * @param {[type]} getNounce     [description]
 * @param {[type]} data          [description]
 * @param {[type]} serviceName   [description]
 * @param {[type]} fp            [description]
 * @param {[type]} currentNounce [description]
 * @param {[type]} currentDate   [description]
 * @param {[type]} envProp       [description]
 */
function setAuthHeaders(getNounce, data, serviceName, fp, currentNounce, currentDate, envProp) {
  /**
   * [Working varialbes]
   */
  var authApi = Props.getApiType();
  var loginId = data.reqData.services[authApi][0].id ? data.reqData.services[authApi][0].id : "--";
  var secureKey = currentNounce.toString() + envProp.secureKey;
  var subString = secureKey.substring(0, 32);

  var authCrypto = envProp.orgId + "~" + envProp.appId + "~" +
    loginId + "~" + fp + ":user:" + currentNounce;

  var authEncryptKey = Core.AESEnc(authCrypto, subString);

  Props.PWRequest.PWHeader.requestid = Core.requestid(loginId, fp, currentDate, envProp);
  Props.PWRequest.PWHeader.authorization = "Basic " + authEncryptKey;
  Props.PWRequest.PWHeader["nounce"] = getNounce;

  setHeaderKeys(serviceName, fp, envProp, "ER_ER");

  var fLogin = window.localStorage.getItem(Core.prepareKey('forceLogin')) ? window.localStorage.getItem(Core.prepareKey('forceLogin')) : "";
  if (fLogin === 'Y') {
    Props.PWRequest.PWHeader["isforcelogin"] = fLogin;
  }
  // Save loginId
  Props.PWRequest['loginId'] = loginId;

}


function setAuthBody(fp, winNav, data, currentDate, envProp) {
  /**
   * [request parsing interface description]
   */
  setInterface(currentDate, winNav, fp, envProp);

  Props.PWRequest.PWBody.services = data.reqData.services;
  /**
   * [Working varialbes]
   */

  // get txnKey
  var getKey = Core.txnKey(currentDate, envProp);
  Props.PWRequest.PWHeader.txnkey = getKey.b;

  var body = Core.AESEnc(JSON.stringify(Props.PWRequest.PWBody), getKey.t);
  var updateBody = {
    request: body
  };
  /**
   * [request body parsing description]
   */
  Props.PWRequest["temp"] = updateBody;
  Props.PWRequest.PWHeader.hash = (Core.Hmac(JSON.stringify(updateBody).toString(),
    getKey.t)).toUpperCase();

  // Save txnKey
  Props.PWRequest["txnkey"] = getKey.t.toString();

}

function setRegisterHeaders(currentDate, currentNounce, fp, serviceName, getNounce, envProp) {
  /**
   * [Working varialbes]
   */
  var secureKey = currentNounce.toString() + envProp.secureKey;
  var subString = secureKey.substring(0, 32);
  var authCrypto = envProp.orgId + "~" + envProp.appId + "~" +
    fp + ":app:" + currentNounce;
  var authEncryptKey = Core.AESEnc(authCrypto, subString);
  Props.PWRequest.PWHeader.txnkey = '',

    Props.PWRequest.PWHeader.authorization = "Basic " + authEncryptKey;
  var hashKey = Core.Hmac("Basic " + authEncryptKey, envProp.secureKey);

  /**
   * [request header parsing description]
   */
  Props.PWRequest.PWHeader.hash = hashKey;
  Props.PWRequest.PWHeader.requestid = Core.requestid('--', fp, currentDate, envProp);
  Props.PWRequest.PWHeader["nounce"] = getNounce;
  setHeaderKeys(serviceName, fp, envProp, "PR_PR");
}

function setRegisterBody(winNav, currentDate, fp, data, envProp) {
  /**
   * [request parsing interface description]
   */
  setInterface(currentDate, winNav, fp, envProp);
  Props.PWRequest.PWBody.services = data.reqData.services;
}

function setServiceHeaders(currentDate, fp, serviceName, envProp) {
  /**
   * [Get JWT token]
   */
  var jwtToken = '';
  if (window.localStorage.getItem(Core.prepareKey('authJwtToken'))) {

    try {
      jwtToken = Core.AESDec(window.localStorage.getItem(Core.prepareKey('authJwtToken')), envProp.secureKey);
    } catch (error) {
      throw error
    }
  } else if (window.localStorage.getItem(Core.prepareKey('jwtToken'))) {
    try {
      jwtToken = Core.AESDec(window.localStorage.getItem(Core.prepareKey('jwtToken')), envProp.secureKey);
    } catch (error) {
      throw error
    }
  }

  Props.PWRequest.PWHeader.authorization = jwtToken;

  var loginID = window.localStorage.getItem(Core.prepareKey('loginId')) ? window.localStorage.getItem(Core.prepareKey('loginId')) : "--";
  Props.PWRequest.PWHeader.requestid = Core.requestid(loginID, fp, currentDate, envProp);

  setHeaderKeys(serviceName, fp, envProp, "ER_ER");
}

function setServiceBody(currentDate, winNav, data, fp, envProp) {
  /**
   * [request parsing interface description]
   */
  setInterface(currentDate, winNav, fp, envProp);

  /**
   * [request body parsing description]
   */
  Props.PWRequest.PWBody.services = data.reqData.services;

  /**
   * [Working varialbes]
   */

  // get txnKey
  var getKey = Core.txnKey(currentDate, envProp);
  Props.PWRequest.PWHeader.txnkey = getKey.b;

  var body = Core.AESEnc(JSON.stringify(Props.PWRequest.PWBody), getKey.t);
  var updateBody = {
    request: body
  };
  Props.PWRequest["temp"] = updateBody;
  Props.PWRequest.PWHeader.hash = (Core.Hmac(JSON.stringify(updateBody),
    getKey.t)).toUpperCase();

  // Save txnKey
  Props.PWRequest["txnkey"] = getKey.t.toString();
}

function setHeaderKeys(serviceName, fp, envProp, requesttype) {
  Props.PWRequest.PWHeader["clientid"] = Core.clientid(envProp);
  Props.PWRequest.PWHeader.servicename = serviceName;
  Props.PWRequest.PWHeader.deviceid = fp;
  Props.PWRequest.PWHeader["security-version"] = '2';
  Props.PWRequest.PWHeader.requesttype = requesttype;
}

function setInterface(currentDate, winNav, fp, envProp) {
  Props.PWRequest.PWBody.interfaces.DEVICE_TIMESTAMP = datePars.finalDate('device', currentDate);
  Props.PWRequest.PWBody.interfaces.fingerprint = fp;
  Props.PWRequest.PWBody.interfaces.APPLICATION_VERSION = envProp.appVersion;
  Props.PWRequest.PWBody.interfaces.PW_CLIENT_VERSION = "2.5.6";
  Props.PWRequest.PWBody.interfaces.DEVICE_MAKE = winNav.platform;
  Props.PWRequest.PWBody.interfaces.DEVICE_MODEL = winNav.vendor ? winNav.vendor : winNav.appCodeName;
  Props.PWRequest.PWBody.interfaces.DEVICE_LATITUDE = envProp.lat;
  Props.PWRequest.PWBody.interfaces.DEVICE_LONGITUDE = envProp.lon;
  Props.PWRequest.PWBody.interfaces.PW_VERSION = "";
}

var pwRequest = {
  finalReq: platwareRequest
}