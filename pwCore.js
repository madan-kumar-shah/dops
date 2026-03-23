
/**
 * AESEncryption core methods.
 */
var AESEncryption = {};

AESEncryption.AesUtil = function (keySize, iterationCount) {
  this.keySize = keySize / 32;
  this.iterationCount = iterationCount;
};

AESEncryption.AesUtil.prototype.generateKey = function (salt, passPhrase) {
  var key = CryptoJS.PBKDF2(
    passPhrase,
    CryptoJS.enc.Hex.parse(salt), {
      keySize: this.keySize,
      iterations: this.iterationCount
    });
  return key;
}

AESEncryption.AesUtil.prototype.encrypt = function (salt, iv, passPhrase, plainText) {
  var key = this.generateKey(salt, passPhrase);
  var encrypted = CryptoJS.AES.encrypt(
    plainText,
    key, {
      iv: CryptoJS.enc.Hex.parse(iv)
    });
  try {
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  } catch (error) {
    throw error;
  }
}

AESEncryption.AesUtil.prototype.decrypt = function (salt, iv, passPhrase, cipherText) {
  var key = this.generateKey(salt, passPhrase);
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  var decrypted = CryptoJS.AES.decrypt(
    cipherParams,
    key, {
      iv: CryptoJS.enc.Hex.parse(iv)
    });
  try {
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    throw error;
  }
}


AESEncryption.cryptor = {
  encryptText: function (plainMsg, keyStr, callback) {
    var iv = "00000000000000000000000000000000";
    var salt = "00000000000000000000000000000000";
    var keySize = 256;
    var iterationCount = 100;
    var passPhrase = keyStr; 
    var aesUtil = new AESEncryption.AesUtil(keySize, iterationCount);
    var encrypt = aesUtil.encrypt(salt, iv, passPhrase, plainMsg);
    return encrypt;
  },
  decryptText: function (cipherMsg, keyStr, callback) {
    var iv = "00000000000000000000000000000000";
    var salt = "00000000000000000000000000000000";
    var keySize = 256;
    var iterationCount = 100;
    var passPhrase = keyStr; 
    var aesUtil = new AESEncryption.AesUtil(keySize, iterationCount);
    var decrypt = aesUtil.decrypt(salt, iv, passPhrase, cipherMsg);
    return decrypt;
  },
  hex: function (strin) {
    // var string = 'kunwar';
    var string = '39563JSHUSJNS18';
    var hexStr = CryptoJS.enc.Hex.parse(string);
    return hexStr;
  }

}


/**
 * core methods.
 */

var prepareKey = function (key) {
  return Props.getGlobalHeaders().orgId + '-' + Props.getGlobalHeaders().appId + '-' + key;
}

/**
 * [Check wheather to call property master or not]
 * @return {[type]} []
 */
var checkPropCall = function () {
  var r = window.localStorage.getItem(prepareKey('pmlc'));
  var t = datePars.finalDate('propMas', new Date());
  return r === t;
};

var setPmlcValue = function () {
  window.localStorage.setItem(prepareKey('pmlc'), datePars.finalDate('propMas', new Date()));
};

var checkRegisCall = function () {
  window.localStorage.removeItem(prepareKey("regisFail"));
  var p = window.localStorage.getItem(prepareKey('Publickey'));
  var j = window.localStorage.getItem(prepareKey('jwtToken'));
  return p != null && j != null;
};

var userCredentials = function (id, value, key) {
  window.localStorage.setItem(prepareKey("loginId"), id);
  window.localStorage.setItem(prepareKey("authJwtToken"), getEncryption(value, key));
};

var clearCreds = function () {
  window.localStorage.removeItem(prepareKey("authJwtToken"));
  window.localStorage.removeItem(prepareKey("loginId"));
};


var clearCredsAll = function () {
  window.localStorage.removeItem(prepareKey("authJwtToken"));
  window.localStorage.removeItem(prepareKey("loginId"));
  window.localStorage.removeItem(prepareKey("regisFail"));
  window.localStorage.removeItem(prepareKey("Publickey"));
  window.localStorage.removeItem(prepareKey("jwtToken"));
  window.localStorage.removeItem(prepareKey("pmlc"));
};

var randomString = function (length) {
  /**
   *  Random number generator
   *
   * @return {string} Random string.
   *
   */
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
};


var base64ToHex = function (str) {
  /**
   * Converts a Base64 string to a hex.
   *
   * @return {object} The hex object.
   *
   */
  try {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
      var tmp = bin.charCodeAt(i).toString(16);
      if (tmp.length === 1) tmp = "0" + tmp;
      hex[hex.length] = tmp;
    }
    //The hex string.
    return hex.join("");
  } catch (error) {
    return;
  }

};


var authCredentials = function (data, key, token) {
  var obj = {};
  for (var keyValue in data) {
    if (keyValue === 'public-pem') {
      obj["key"] = AESEncryption.cryptor.encryptText(data[keyValue].toString(), key);
    }
  }
  window.localStorage.setItem(prepareKey("Publickey"), obj['key']);
  window.localStorage.setItem(prepareKey("jwtToken"), token);
};

var getHexString = function (value) {
  /**
   * Creates a byte array filled with random bytes.
   *
   * @param {number} value The number of random bytes to generate.
   *
   * @return {ByteArray} The random word array.
   *
   */
  var byteArray = [];
  for (var i = 0; i < value.length; i++) {
    byteArray.push(value.charCodeAt(i));
  }
  /**
   * @return {string} The hex string.
   */
  var value = toHexString(byteArray);
  return value;
};

var toHexString = function (byteArray) {
  /**
   * Converts a byte array to a hex string.
   *
   * @param {ByteArray} byteArray The byte array.
   *
   * @return {string} The hex string.
   *
   */
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
};

var getEncryption = function (plaintext, key) {
  /**
   * Encrypts a text using a key.
   *
   * @param {WordArray|string} plaintext The plaintext to encrypt.
   * @param {string} key The key.
   *
   * @return The encrypt string.
   *
   */
  var a = AESEncryption.cryptor.encryptText(plaintext, key);
  // Encrypt
  return a;
};

var getDecryption = function (text, key) {
  /**
   * Decrypts a text using a key.
   *
   * @param {WordArray|string} text The text to decrypt.
   * @param {string} key The key.
   *
   * @return The decrypt string.
   *
   */
  var b = AESEncryption.cryptor.decryptText(text, key);
  // Decrypt
  return b != undefined ? b : "";
};

var getHashvalue = function (plaintext, key) {
  /**
   * The HMAC's object interface.
   *
   * @param {WordArray|string} plaintext The plaintext to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The hash.
   *
   */
  var hash = CryptoJS.HmacSHA512(plaintext, key).toString();
  // hash
  return hash;
};

var RSAEncrypt = function (plaintext, key) {

  /**
   * Encrypts a text using public key.
   *
   * @param {WordArray|string} text The text to encrypt.
   * @param {string} key The private key.
   *
   * @return The encrypt string.
   *
   */
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(key);
  var encrypted = encrypt.encrypt(plaintext);
  // Encrypt
  return encrypted;
};

var RSADecrypt = function (text, randomKey) {
  /**
   * Decrypts a text using private key.
   *
   * @param {WordArray|string} text The text to decrypt.
   * @param {string} key The private key.
   *
   * @return The decrypt string.
   *
   */
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey(randomKey);
  var uncrypted = decrypt.decrypt(text);
  // Decrypt
  return uncrypted;
};


var getClientid = function (env) {
  /**
   *
   * @return Client id .
   *
   */
  return env.orgId + "~" + env.appId;
};


var getRequestid = function (id, fingerprint, date, env) {
  /**
   *
   * @return Request id .
   *
   */
  return env.orgId + env.appId + fingerprint + id + datePars.finalDate('requestid', date);
};

var generateTxnKey = function (date, env) {
  /**
   *
   * @return txn key and hex string .
   *
   */
  var txn = randomString(32 - datePars.finalDate('txnDate', date).length);
  txn = datePars.finalDate('txnDate', date) + txn;
  var encryKey = window.localStorage.getItem(prepareKey('Publickey'));
  var decKey = getDecryption(encryKey, env.secureKey);
  var b64txn = RSAEncrypt(txn, decKey);
  b64txn = base64ToHex(b64txn);

  return {
    t: txn,
    b: b64txn
  };
};


var validateEnv = function (req) {
  if (req.hasOwnProperty('envProps') && typeof (req.envProps) === 'object' &&
    !Array.isArray(req.envProps)) {
    return true;
  } else {
    return false;
  }
};
var validateHeader = function (req) {
  if (Object.keys(req) != 0) {
    for (var h in req) {
      if (typeof (req[h]) === 'string') {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true;
  }
};

var validateReq = function (req, type) {
  if (req.reqData && req.reqData.hasOwnProperty(type)) {
    if (typeof (req.reqData[type]) === 'object' && !Array.isArray(req.reqData[type])) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};


var validateUrl = function (req) {
  var url = req.url.trim();
  if (req.hasOwnProperty('url') && url != '' && typeof (url) === 'string') {
    return true;
  } else {
    return false;
  }
};

var validateEnvKey = function (req) {
  if (req.envProps &&
    req.envProps.hasOwnProperty('environment') &&
    req.envProps.environment.hasOwnProperty('envProps') &&
    req.envProps.environment.envProps.hasOwnProperty('orgId') &&
    req.envProps.environment.envProps.hasOwnProperty('appId') &&
    req.envProps.environment.envProps.hasOwnProperty('secureKey') &&
    req.envProps.environment.envProps.hasOwnProperty('appVersion')) {
    if (typeof (req.envProps.environment.envProps.orgId) === 'string' &&
      typeof (req.envProps.environment.envProps.appId) === 'string' &&
      typeof (req.envProps.environment.envProps.appVersion) === 'string') {
      if (req.envProps.environment.envProps.orgId &&
        req.envProps.environment.envProps.appId &&
        req.envProps.environment.envProps.appVersion) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};


var reqValidate = function (req) {
  if (typeof (req) === 'object' && !Array.isArray(req)) {
    var url = validateUrl(req);
    var env = validateEnv(req);
    var serv = validateReq(req, 'services');
    var envKey = validateEnvKey(req);

    if (url && env && serv && envKey) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
var validateBody = function (req) {
  for (var s in req) {
    if (Array.isArray(req[s])) {
      for (var a in req[s]) {
        if (typeof (req[s][a]) === 'object') {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }
};

var setGuid = function (key) {
  var d = new Date().getTime();
  var guid = 'xxxxxxxx-xxxx-3xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  localStorage.setItem("GUID", getEncryption(guid, key));
}


var Core = {
  checkPropCall: checkPropCall,
  setpm: setPmlcValue,
  randomKey: randomString,
  b64toHex: base64ToHex,
  HexStr: getHexString,
  AESEnc: getEncryption,
  AESDec: getDecryption,
  Hmac: getHashvalue,
  RSAEnc: RSAEncrypt,
  RSADec: RSADecrypt,
  checkRegisCall: checkRegisCall,
  userCreds: userCredentials,
  authCreds: authCredentials,
  clearCreds: clearCreds,
  clientid: getClientid,
  requestid: getRequestid,
  txnKey: generateTxnKey,
  reqValid: reqValidate,
  bodyValid: validateBody,
  headerValid: validateHeader,
  clearCredsAll: clearCredsAll,
  prepareKey: prepareKey,
  setGuid: setGuid
}
