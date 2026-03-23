var fingerprint = function () {
  const id = localStorage.getItem("GUID");
  return Core.AESDec(id, Props.getSecureKey());
};

/**
 * [reqCallToPM description]
 * @param  {[type]} serviceData [description]
 * @param  {[type]} callfn      [description]
 * @return {[type]}             [description]
 */
function reqCallToPM(serviceData, callfn) {
  var obj1 = Object.assign({}, serviceData);
  var req = reqData(obj1);
  try {
    pwRequest.finalReq(req, fingerprint());
  } catch (error) {
    var fo = Props.getErrors("decryption").response;
    callfn(apiResponse(false, Props.getErrors("decryption").code, fo));
    return;
  }
  var body = Props.PWRequest.temp
    ? Props.PWRequest.temp
    : Props.PWRequest.PWBody;
  var txn = Props.PWRequest.txnkey;

  Request.post(
    req.envProps.environment.envProps.baseUrl + req.url,
    Props.PWRequest.PWHeader,
    body,
    true,
    300000,
    function (headers, state, status, response) {
      try {
        var processReponse = response.target;
        var bodyData = processReponse.response
          ? JSON.parse(processReponse.response)
          : processReponse.response;
        if (bodyData && bodyData.response) {
          var decryRes = Core.AESDec(bodyData.response, txn.toString());
          bodyData = JSON.parse(decryRes);
        }

        for (var serviceName in bodyData ? bodyData.services : {}) {
          if (serviceName === "PROPERTYMASTER") {
            var fl = bodyData.services.PROPERTYMASTER.records[0];
            if (fl.data) {
              for (var i = 0; i < fl.data.length; i++) {
                if (fl.data[i].propertyName === "IS_FORCE_LOGIN") {
                  Core.setpm();
                  window.localStorage.setItem(
                    Core.prepareKey("forceLogin"),
                    fl.data[i].propertyValue
                  );
                  break;
                }
              }
            }
          }
        }

        if (typeof callfn === "function") {
          reqCallToService(serviceData, callfn);
        }
      } catch (e) {
        throw "Some error occurred in property master";
      }
    },
    function (state, status, response) {
      if (window.localStorage.getItem(Core.prepareKey("pmlc"))) {
        if (typeof callfn === "function") {
          reqCallToService(serviceData, callfn);
        }
      } else if (!window.localStorage.getItem(Core.prepareKey("pmlc"))) {
        window.localStorage.setItem(Core.prepareKey("forceLogin"), "N");
        reqCallToService(serviceData, callfn);
        return;
      } else {
        throw "Some error occurred in property master";
      }
    }
  );
}

/**
 * [reqCallToService description]
 * @param  {[type]} data   [description]
 * @param  {[type]} callfn [description]
 * @return {[type]}        [description]
 */
function reqCallToService(data, callfn) {
  var apiData = data;
  try {
    pwRequest.finalReq(data, fingerprint());
  } catch (error) {
    var fo = Props.getErrors("decryption").response;
    callfn(apiResponse(false, Props.getErrors("decryption").code, fo));
    return;
  }
  var body = Props.PWRequest.temp
    ? Props.PWRequest.temp
    : Props.PWRequest.PWBody;
  var txn = Props.PWRequest.txnkey;
  Request.post(
    data.envProps.environment.envProps.baseUrl + data.url,
    Props.PWRequest.PWHeader,
    body,
    true,
    300000,
    function (headers, state, status, response) {
      try {
        var processReponse = response.target;
        var bodyData = processReponse.response
          ? JSON.parse(processReponse.response)
          : processReponse.response;
        if (bodyData && bodyData.response) {
          var decryRes = Core.AESDec(bodyData.response, txn.toString());
          bodyData = JSON.parse(decryRes);
        }
        const authApi = Props.getApiType();
        for (var serviceName in bodyData ? bodyData.services : {}) {
          if (serviceName === authApi) {
            var authKey = headers.auth.toString();
            Core.userCreds(
              Props.PWRequest.loginId,
              authKey,
              data.envProps.environment.envProps.secureKey
            );
            callfn(
              apiResponse(
                true,
                status,
                bodyData.services[authApi].records[0].data[0].auth
              )
            );
            return;
          }
        }
        //debugger
        console.log(
          "Req body -> ",
          data.reqData.services,
          "bodyData",
          bodyData
        );

        var fO = {};
        for (var k in bodyData.services) {
          if (k === "REGISTERUSER") {
            fO["REGISTERUSER"] = bodyData.services[k].records;
            break;
          } else {
            fO[k] = bodyData.services[k].records;
          }
        }
        if (typeof callfn === "function") {
          callfn(apiResponse(true, status, fO));
        }
      } catch (e) {
        var fo = Props.getErrors("parsingResponse").response;
        callfn(apiResponse(false, Props.getErrors("parsingResponse").code, fo));
      }
    },
    function (state, status, response) {
      var rf = window.localStorage.getItem(Core.prepareKey("regisFail"))
        ? window.localStorage.getItem(Core.prepareKey("regisFail"))
        : false;
      if (state === "LOGOUT" && status === "625") {
        try {
          Core.clearCreds();
          callfn(apiResponse(true, "PW-0002", JSON.parse(response)));
        } catch (e) {
          var fo = Props.getErrors("parsingResponse").response;
          callfn(
            apiResponse(false, Props.getErrors("parsingResponse").code, fo)
          );
        }
      } else if (
        (state === "REGISTERAPP" && status === "401") ||
        status === "627" ||
        status === "537"
      ) {
        if (!rf) {
          Core.clearCredsAll();
          window.localStorage.setItem(Core.prepareKey("regisFail"), true);
          reqCallRegistration(apiData, callfn);
        } else {
          Core.clearCredsAll();
          // window.localStorage.clear();
          var fo = Props.getErrors("registrationFailed").response;
          callfn(
            apiResponse(false, Props.getErrors("registrationFailed").code, fo)
          );
        }
      } else if (state === Props.getApiType() && status === "621") {
        var r = confirm(
          "You are already logged in. Do you want to kill existing session?"
        );
        if (r) {
          var headerKey = apiData.hasOwnProperty("header") ? true : false;
          if (headerKey) {
            apiData.header["isforcelogin"] = "Y";
          } else {
            apiData["header"] = {};
            apiData.header["isforcelogin"] = "Y";
          }
          reqCallToService(apiData, callfn);
        } else {
          var fo = Props.getErrors("loggedIn").response;
          callfn(apiResponse(false, Props.getErrors("loggedIn").code, fo));
        }
      } else if (
        status === "402" ||
        status === "622" ||
        status === "628" ||
        status === "528"
      ) {
        Core.clearCreds();
        try {
          callfn(apiResponse(false, "PW-0002", JSON.parse(response)));
        } catch (e) {
          var fo = Props.getErrors("parsingResponse").response;
          callfn(
            apiResponse(false, Props.getErrors("parsingResponse").code, fo)
          );
        }
      } else if (status != 0) {
        try {
          callfn(apiResponse(false, status, JSON.parse(response)));
        } catch (e) {
          var fo = Props.getErrors("parsingResponse").response;
          callfn(
            apiResponse(false, Props.getErrors("parsingResponse").code, fo)
          );
        }
      } else {
        try {
          callfn(apiResponse(false, status, JSON.parse(response)));
        } catch (error) {
          var fo = Props.getErrors("").response;
          callfn(apiResponse(false, Props.getErrors("").code, fo));
        }
      }
    }
  );
}

/**
 * [reqData description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function reqData(data) {
  return {
    url: "/gateway",
    envProps: data.envProps,
    reqData: {
      interfaces: {},
      services: {
        PROPERTYMASTER: [{}],
      },
    },
  };
}

/**
 * [reqReqData description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function reqReqData(data) {
  return {
    url: "/register",
    envProps: data.envProps,
    reqData: {
      interfaces: {},
      services: {
        REGISTERAPP: [{}],
      },
    },
  };
}

function reqCallRegistration(data, callfn) {
  var apiReq = data;
  var req = reqReqData(data);
  pwRequest.finalReq(req, fingerprint());
  var body = Props.PWRequest.temp
    ? Props.PWRequest.temp
    : Props.PWRequest.PWBody;
  var txn = Props.PWRequest.txnkey;

  Request.post(
    req.envProps.environment.envProps.baseUrl + req.url,
    Props.PWRequest.PWHeader,
    body,
    true,
    300000,
    function (headers, state, status, response) {
      try {
        var processReponse = response.target;
        var bodyData = processReponse.response
          ? JSON.parse(processReponse.response)
          : processReponse.response;
        if (bodyData && bodyData.response) {
          var decryRes = Core.AESDec(bodyData.response, txn.toString());
          bodyData = JSON.parse(decryRes);
        }
        for (var serviceName in bodyData ? bodyData.services : {}) {
          if (serviceName === "REGISTERAPP") {
            var authKey = headers.auth.toString();
            var jwtToken = Core.AESEnc(
              authKey,
              data.envProps.environment.envProps.secureKey
            );
            var rsaData = bodyData.services.REGISTERAPP.records[0].data[0].rsa;
            var rsaJSON = JSON.parse(rsaData);
            Core.authCreds(
              rsaJSON,
              data.envProps.environment.envProps.secureKey,
              jwtToken
            );
            // if (!Core.checkPropCall()) {
            //   // var req = reqData(apiReq);
            //   reqCallToPM(apiReq, callfn);
            // } else {
            //   reqCallToService(apiReq, callfn);
            // }
            reqCallToService(apiReq, callfn);
          }
        }
      } catch (e) {
        var fo = Props.getErrors("parsingResponse").response;
        callfn(apiResponse(false, Props.getErrors("parsingResponse").code, fo));
      }
    },
    function (state, status, response) {
      var rf = window.localStorage.getItem(Core.prepareKey("regisFail"))
        ? window.localStorage.getItem(Core.prepareKey("regisFail"))
        : false;
      if (
        (state === "REGISTERAPP" && status === "401") ||
        status === "627" ||
        status === "537"
      ) {
        if (!rf) {
          Core.clearCredsAll();
          window.localStorage.setItem(Core.prepareKey("regisFail"), true);
          reqCallRegistration(apiData, callfn);
        } else {
          Core.clearCredsAll();
          var fo = Props.getErrors("registrationFailed").response;
          callfn(
            apiResponse(false, Props.getErrors("registrationFailed").code, fo)
          );
          window.localStorage.removeItem(Core.prepareKey("regisFail")); // for registration
        }
      } else if (status != 0) {
        try {
          callfn(apiResponse(false, "PW-0003", JSON.parse(response)));
        } catch (e) {
          var fo = Props.getErrors("parsingResponse").response;
          callfn(
            apiResponse(false, Props.getErrors("parsingResponse").code, fo)
          );
        }
      } else {
        var fo = ps.getErrors("").response;
        callfn(apiResponse(false, ps.getErrors("parsingResponse").code, fo));
      }
    }
  );
}

/**
 * [description]
 * @param  {[type]} v   [description]
 * @param  {[type]} sc  [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
var apiResponse = function (v, sc, res) {
  var response = {};
  if (v) {
    var response = {
      status: v,
      data: res,
    };
  } else {
    var response = {
      status: v,
      serverCode: res.status,
      errorCode: sc,
      erroMessage: res.message,
    };
  }

  return response;
};

var pwService = {
  reqToPM: reqCallToPM,
  reqToService: reqCallToService,
  apiRes: apiResponse,
  callReg: reqCallRegistration,
};
