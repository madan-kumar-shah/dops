var PWRequest = {
  "PWHeader": {
    "clientid": "",
    "deviceid": "",
    "platform": "WEB",
    "authorization": "",
    "requesttype": "",
    "txnkey": "",
    "requestid": "",
    "servicename": "",
    "hash": "",
  },
  "PWBody": {
    "interfaces": {
      "APPLICATION_VERSION": "",
      "DEVICE_TIMESTAMP": "",
      "PW_CLIENT_VERSION": "",
      "fingerprint": "",
      "DEVICE_MAKE": "",
      "DEVICE_MODEL": "",
      "PW_VERSION": "",
      "DEVICE_LATITUDE": "",
      "DEVICE_LONGITUDE": "",
    },
    "services": {}
  }
}

var globalHeaders = {
  orgId: "",
  appId: ""
};
var PWSecureKey = "";
var apiType = '';

var getUrl = function (type) {
  var url = '';
  switch (type) {
    case 'auth':
      url = '/register';
      break;
    case 'logout':
      url = '/logout';
      break;

    default:
      url = '/gateway';
      break;
  }
  return url;
}

var getErrors = function (type) {
  let error = {
    code: "",
    response: {
      message: "",
      status: ""
    },
  };
  switch (type) {
    case 'network':
      error = {
        code: "PW-0001",
        response: {
          "status": "Internet Connection appears to be offline, Please check your Internet connection."
        }
      };
      break;
    case 'bodyParam':
      error = {
        code: "PW-0001",
        response: {
          "message": "Request parameters(Body) are not valid",
          "status": ""
        },
      };
      break;
    case 'headerParam':
      error = {
        code: "PW-0001",
        response: {
          "message": "Request parameters(Headers) are not valid",
          "status": ""
        },
      };
      break;
    case 'guid':
      error = {
        code: "PW-0002",
        response: {
          "message": "Your session has been killed",
          "status": ""
        },
      };
      break;
    case 'requestInvalid':
      error = {
        code: "PW-0001",
        response: {
          "message": "Request parameters are not valid",
          "status": "Request Failure"
        },
      };
      break;

    case 'serviceInvalid':
      error = {
        code: "PW-0001",
        response: {
          "message": "We can process maximum of five services at once!",
          "status": ""
        },
      };
      break;

    case 'decryption':
      error = {
        code: "PW-0005",
        response: {
          "message": "Unable to decript data! Hint. Some data has been modified.",
          "status": ""
        },
      };
      break;

    case 'parsingResponse':
      error = {
        code: "PW-0005",
        response: {
          "message": "Unable to parse response data",
          "status": ""
        },
      };
      break;

    case 'serverConnecting':
      error = {
        code: "PW-0003",
        response: {
          "message": "Connection Error! We are unable to reach to the server",
          "status": ""
        },
      };
      break;

    case 'registrationFailed':
      error = {
        code: "PW-0004",
        response: {
          "message": "Handshake fail! Please connect to the server team.",
          "status": ""
        },
      };
      break;

    case 'loggedIn':
      error = {
        code: "PW-0005",
        response: {
          "message": "It seems like you are already logged in some other device. Kill you existing session and login again.",
          "status": ""
        },
      };
      break;


    default:
      error = {
        code: "PW-0003",
        response: {
          "message": "Some technical error occured! Please check you log and come back to us.",
          "status": ""
        },
      };
      break;
  }
  return error;
}

var setPWRequest = function () {
  this.PWRequest = {
    "PWHeader": {
      "clientid": "",
      "deviceid": "",
      "platform": "WEB",
      "authorization": "",
      "requesttype": "",
      "txnkey": "",
      "requestid": "",
      "servicename": "",
      "hash": "",
    },
    "PWBody": {
      "interfaces": {
        "APPLICATION_VERSION": "",
        "DEVICE_TIMESTAMP": "",
        "PW_CLIENT_VERSION": "",
        "fingerprint": "",
        "DEVICE_MAKE": "",
        "DEVICE_MODEL": "",
        "PW_VERSION": "",
        "DEVICE_LATITUDE": "",
        "DEVICE_LONGITUDE": "",
      },
      "services": {}
    }
  };
}

var setGlobalHeaders = function (o) {
  globalHeaders.orgId = o.orgId;
  globalHeaders.appId = o.appId;
}

var getGlobalHeaders = function (o) {
  return globalHeaders;
}

var setSecureKey = function (o) {
  PWSecureKey = o.secureKey;
}

var getSecureKey = function () {
  return PWSecureKey;
}

var setApiType = function (v) {
  apiType = v;
}

var getApiType = function () {
  return apiType;
}

var Props = {
  PWRequest: PWRequest,
  SetPWRequest: setPWRequest,
  setGlobalHeaders: setGlobalHeaders,
  getGlobalHeaders: getGlobalHeaders,
  setSecureKey: setSecureKey,
  getSecureKey: getSecureKey,
  setApiType: setApiType,
  getApiType: getApiType,
  getUrl: getUrl,
  getErrors: getErrors
}
