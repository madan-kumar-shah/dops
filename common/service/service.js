var commonService = angular.module("commonServiceModule", []);
var newplatwareHeader = {
  environment: {
    envProps: { 
      //  orgId: 'DECIMAL-7VX69IO0DL',
      orgId: "YESBANK-2E5VMRBA9P",
      appId: "YES_POC-ZSAC0EYBVS",
      secureKey:newKey,
      appVersion: "1.0",
      /********** PROD **********************/
      // baseUrl: "https://yesaimca.yes.bank.in/router/engine/v1",

      /********** UAT ****************/
      // baseUrl: "https://yesaimca.yesuat.bank.in/router/engine/v1",

      /********** DEV ****************/
      // baseUrl: "http://52.172.11.173/router/engine/v1",
      baseUrl: "https://yesaimca.yesuat.bank.in/dev/router/engine/v1",
    },
  },
};

var newplatwareHeaderV2 = {
  environment: {
    envProps: { 
      //  orgId: 'DECIMAL-7VX69IO0DL',
      orgId: 'YES_AIM_CA_PHYGITAL-PDD6LKCDHG',
        appId: 'YES_AIM_CA-MERS3ZZY2M',
      secureKey:'2de833d0-c8bc-4a35-8132-fd2b00fcd203',
      appVersion: "1.0",
      platform: 'WEB',
      securityVersion: '2',
      /********** PROD **********************/
      // baseUrl: "https://yesaimca.yes.bank.in/router/engine/v1",

      /********** UAT ****************/
      // baseUrl: "https://yesaimca.yesuat.bank.in/router/engine/v1",

      /********** DEV ****************/
      // baseUrl: "http://52.172.11.173/router/engine/v1",
      baseUrl: "https://yesaimca.yesuat.bank.in/dev/router/engine/v1",
    },
  },
};
commonService.service("QueueService", function () {
  var queueData;
  var queueCardData;
  var tableHeading = "";
  var allQueues;
  var leadId;
  var JSONqueueData;
  var currentDoc = [];
  var VKYCstatus;
  var VKYCagentdetails;
  var VKYCauditordetails;
  var VKYClatlong;
  var VKYCIPdetails;
  var VKYCAGENTNAMEdetails;
  return {
    setRemarkHistory: function (history) {
      remarkhis = history;
    },
    getremarksHistory: function () {
      return remarkhis;
    },
    setRejectionQueue: function (queues) {
      rejectionData = queues;
    },
    getRejectionQueue: function () {
      return rejectionData;
    },

    setAllQueues: function (queues) {
      allQueues = queues;
    },
    getAllQueues: function () {
      return allQueues;
    },
    setSelectedQueue: function (queue) {
      queueData = queue;
      sessionStorage.setItem("currentQueue", JSON.stringify(queue));
    },
    setCurrentAOFId: function (id) {
      leadId = id;
    },
    getCurrentAOFId: function () {
      return leadId;
    },
    getSelectedQueue: function () {
      if (queueData) {
      } else {
        queueData = JSON.parse(sessionStorage.getItem("currentQueue"));
      }
      return queueData;
    },
    setQueueCarddata: function (cardData) {
      sessionStorage.setItem("currentCard", JSON.stringify(cardData));
      queueCardData = cardData;
    },
    setQueueTableHeading: function (data) {
      sessionStorage.setItem("tableHeading", data);
      tableHeading = data;
    },
    getQueueTableHeading: function () {
      return tableHeading;
    },
    getQueueCardData: function () {
      if (queueCardData) {
      } else {
        queueCardData = JSON.parse(sessionStorage.getItem("currentCard"));
        console.log(queueCardData);
      }
      return queueCardData;
    },
    setCurrentDocument: function (document) {
      currentDoc = document;
    },
    getCurrentDocument: function () {
      return currentDoc;
    },
    setPreviousTab: function (obj) {
      PreviousTab = obj;
    },
    getPreviousTab: function () {
      return PreviousTab;
    },
    setQueueJSONData: function (obj) {
      JSONqueueData = obj;
    },
    getQueueJSONData: function () {
      return JSONqueueData;
    },
    setVKYCagent:function(obj){
      VKYCagentdetails = obj;
    },
    getVKYCagent: function(){
return VKYCagentdetails;
    },
    setVKYCauditor:function(obj){
      VKYCauditordetails = obj;
          },
          getVKYCauditor: function(){
      return VKYCauditordetails;
          },
          setVKYCFinalstatus:function(obj){
            VKYCstatus = obj;
                },
                getVKYCFinalstatus: function(){
            return VKYCstatus;
                },
                setVKYCGeotagging:function(obj){
                  VKYClatlong = obj;
                      },
                      getVKYCGeotagging: function(){
                  return VKYClatlong;
                      },
                      setVKYCIP:function(obj){
                        VKYCIPdetails = obj;
                            },
                            getVKYCIP: function(){
                        return VKYCIPdetails;
                            },
                            setVKYCAGENTNAME:function(obj){
                              VKYAGENTNAMEdetails = obj;
                                  },
                                  getVKYAGENTNAME: function(){
                              return VKYAGENTNAMEdetails;
                                  },
                                  setVKYCAGENTID:function(obj){
                                    VKYAGENTIDdetails = obj;
                                        },
                                        getVKYAGENTID: function(){
                                    return VKYAGENTIDdetails;
                                        },
    setcardLabel: function (obj) {
      cardLabelData = obj;
    },
    getcardLabel: function () {
      return cardLabelData;
    },
    setCardView: function (obj) {
      cardViewData = obj;
    },
    getCardView: function () {
      return cardViewData;
    },
  };
});
commonService.service("LoginCreds", [
  "$location",
  function ($location) {
    var storagekey = "storagesecretkey";
    var loginCredsService = this;
    var credentialsObj = {
      loginId: "",
      username: "",
      userrole: "",
      lastLoginTS: "",
      password: "",
      userdeptt: "",
      MDM_Access: "",
      module_access: {},
    };
    return {
      setPassword: function (value) {
        pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.PASSWORD =
          value;
        credentialsObj.password = value;
        if (value != "") {
          cryptor.encrypt(value, storagekey, function (password_enc) {
            sessionStorage.setItem("kotakPassword", password_enc);
          });
        }
      },
      setLastLoginTS: function (value) {
        credentialsObj["lastLoginTS"] = value;
        sessionStorage.setItem("kotakLastLogin", value);
      },
      getLastLoginTS: function () {
        var returnValue = credentialsObj.lastLoginTS;
        if (!returnValue) {
          returnValue = sessionStorage.getItem("kotakLastLogin");
        }
        return returnValue;
      },
      setLoginId: function (value) {
        //alert(value)
        value = value.toUpperCase();
        pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.LOGIN_ID =
          value;
        credentialsObj["loginId"] = value;
        if (value != "") {
          cryptor.encrypt(value, storagekey, function (loginId_enc) {
            //console.log(loginId_enc);
            sessionStorage.setItem("kotakLoginId", loginId_enc);
          });
        }
      },
      setUsername: function (value) {
        credentialsObj["username"] = value;
        sessionStorage.setItem("kotakUserName", value);
      },
      getUsername: function () {
        var returnValue = credentialsObj.username;
        if (!returnValue) {
          returnValue = sessionStorage.getItem("kotakUserName");
        }
        return returnValue;
      },
      setUserrole: function (value) {
        credentialsObj["userrole"] = value;
        sessionStorage.setItem("kotakUserrole", value);
        var deptt = "";
        switch (value.toLowerCase()) {
          case "dvu":
          case "dvu supervisor":
            deptt = "DVU";
            break;
          case "bxm":
          case "bxm supervisor":
            deptt = "BXM";
            break;
          case "aam":
          case "aam supervisor":
            deptt = "AAM";
            break;
          case "rcu":
          case "rcu supervisor":
            deptt = "RCU";
            break;
          case "telecaller":
            deptt = "TELECALLER";
            break;
        }
        credentialsObj.userdeptt = deptt;
        sessionStorage.setItem("kotakUserDeptt", deptt);
      },
      getUserrole: function () {
        var returnValue = credentialsObj.userrole;
        if (!returnValue) {
          returnValue = sessionStorage.getItem("kotakUserrole");
        }
        return returnValue;
      },
      getUserDeptt: function () {
        var returnValue = credentialsObj.userdeptt;
        if (!returnValue) {
          returnValue = sessionStorage.getItem("kotakUserDeptt");
        }
        return returnValue;
      },
      getCreds: function () {
        credentialsObj.username = this.getUsername();
        credentialsObj.loginId = this.getSessionLoginId();
        credentialsObj.userrole = this.getUserrole();
        credentialsObj.userdeptt = this.getUserDeptt();
        credentialsObj.lastLoginTS = this.getLastLoginTS();
        credentialsObj.password = this.getSessionPassword();
        credentialsObj.module_access = this.getModuleAccess();
        return credentialsObj;
      },
      getSessionLoginId: function () {
        var isDecrypted = false;
        var decryptedLoginId = null;
        cryptor.decrypt(
          sessionStorage.kotakLoginId,
          storagekey,
          function (loginId_dec) {
            decryptedLoginId = loginId_dec;
          }
        );
        while (!isDecrypted) {
          if (decryptedLoginId == null) {
          } else {
            isDecrypted = true;
          }
        }
        return decryptedLoginId;
      },
      getSessionPassword: function () {
        var isDecrypted = false;
        var decryptedPassword = null;
        cryptor.decrypt(
          sessionStorage.kotakPassword,
          storagekey,
          function (password_dec) {
            decryptedPassword = password_dec;
          }
        );
        while (!isDecrypted) {
          if (decryptedPassword === null) {
          } else {
            isDecrypted = true;
          }
        }
        return decryptedPassword;
      },
      setModulesAccess: function (obj) {
        credentialsObj.module_access = obj;
        sessionStorage.setItem("kotakModulesAccess", JSON.stringify(obj));
      },
      getModuleAccess: function () {
        if (
          credentialsObj.module_access &&
          Object.keys(credentialsObj.module_access).length > 0
        ) {
          return credentialsObj.module_access;
        } else {
          return JSON.parse(sessionStorage.getItem("kotakModulesAccess"));
        }
      },
      setMDM_Access: function (value) {
        credentialsObj.MDM_Access = value;

        sessionStorage.setItem("kotakMDMaccess", credentialsObj.MDM_Access);
      },
      clearCreds: function () {
        this.setLastLoginTS("");
        this.setLoginId("");
        this.setPassword("");
        this.setUsername("");
        this.setUserrole("");
        pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.LOGIN_ID =
          "";
        pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.PASSWORD =
          "";
        pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.USER_SESSION_ID =
          "";
      },
      logout: function () {
        //   this.clearCreds();

        $location.path("/login");
        sessionStorage.clear();
        //localStorage.clear();
      },
    };
  },
]);
///////////////////////////////////////////////////////////////
/////////////////////PLATWARE REQUEST///////////////////////////
commonService.factory("platwareRequest", [
  "$http",
  "LoginCreds",
  "sessionIdService",
  "dmDialogueBox",
  "soleAccount",
  function ($http, LoginCreds, sessionIdService, dmDialogueBox, soleAccount) {
    return {
      /*callPlatware: function (data) {
         if (pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.LOGIN_ID === "") {
         if (sessionStorage.kotakLoginId) {
         LoginCreds.setLoginId(sessionStorage.kotakLoginId);
         }
         }
         if (pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.PASSWORD === "") {
         if (sessionStorage.kotakPassword) {
         LoginCreds.setPassword(sessionStorage.kotakPassword);
         }
         }
         pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.PW_SESSION_ID = PWCutilities.createPWsessionId();
         var reqData = PWCutilities.createDataJSON(data);
         var req = {
         method: 'POST',
         url: pwcProperties.URL,
         // responseType: "blob",
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         data: reqData,
         timeout: 90000
         };
         return $http(req).success(function (response) {
         //
         }).error(function (error) {
         return error;
         });//$http.get("formMaster.json");
         }*/

      callPlatware: function (data) {
        var fp = new Fingerprint();
        var keyPW = null;
        var urlConcat = null;
        var userSessionId = sessionIdService.getUserSessionId();
        pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.IMEI_NO =
          fp.get() + ""; //$scope.systemFingerPrint;
        var userSession = sessionIdService.getUserSessionId() || "";

        function randomString(length) {
          var chars =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          var result = "";
          for (var i = length; i > 0; --i)
            result += chars[Math.round(Math.random() * (chars.length - 1))];
          return result;
        }
        var randomKey = randomString(16);
        //console.log("random:" + randomKey)
        var reqData = null;
        if (
          pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER
            .LOGIN_ID === ""
        ) {
          if (sessionStorage.kotakLoginId) {
            var decryptedLoginId = LoginCreds.getSessionLoginId();
            LoginCreds.setLoginId(decryptedLoginId);
          } else {
            //alert("invalid user session, Login again!");
            dmDialogueBox
              .alertBox({
                title: "Session Error!",
                message: "invalid user session, Login again!",
                actionlabel: ["OK"],
              })
              .then(function (res) {
                //console.log(res)
              });
            LoginCreds.logout();
            return;
          }
        }
        if (
          pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER
            .PASSWORD === ""
        ) {
          if (sessionStorage.kotakPassword) {
            var decryptedPassword = LoginCreds.getSessionPassword();
            LoginCreds.setPassword(decryptedPassword);
          } else {
            //alert("invalid user session, Login again!");
            dmDialogueBox
              .alertBox({
                title: "Session Error!",
                message: "invalid user session, Login again!",
                actionlabel: ["OK"],
              })
              .then(function (res) {
                //console.log(res)
              });
            LoginCreds.logout();
          }
        }

        //   console.log(pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.USER_SESSION_ID);
        var isEncryptionCompleted = false;
        var loginData = LoginCreds.getCreds();

        cryptor.encrypt(loginData.loginId, randomKey, function (loginId_enc) {
          pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.LOGIN_ID =
            loginId_enc;
          cryptor.encrypt(
            loginData.password,
            randomKey,
            function (password_enc) {
              if (
                data[0].processName == "AUTH" ||
                data[0].processName == "AUTHDOPS"
              ) {
                pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.PASSWORD =
                  password_enc;
              } else {
                pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.PASSWORD =
                  "";
              }

              cryptor.encrypt(
                loginData.loginId,
                randomKey,
                function (userId_enc) {
                  pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.USER_ID =
                    userId_enc;
                  //console.log(userSessionId)
                  cryptor.encrypt(
                    userSessionId,
                    randomKey,
                    function (uSessionId_enc) {
                      if (
                        data[0].processName == "AUTH" ||
                        data[0].processName == "AUTHDOPS"
                      ) {
                        pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.USER_SESSION_ID =
                          "";
                      } else {
                        pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.USER_SESSION_ID =
                          uSessionId_enc;
                      }
                      cryptor.encrypt(
                        randomKey,
                        "decimalsecretkey",
                        function (pwSessionId_enc) {
                          pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.PW_SESSION_ID =
                            pwSessionId_enc;
                          var reqDataDec = PWCutilities.createDataJSON(data);
                          console.log(reqDataDec);
                          cryptor.encrypt(
                            reqDataDec,
                            randomKey,
                            function (reqDataEnc) {
                              keyPW = pwSessionId_enc;
                              //cryptor.hex();
                              // console.log(pwSessionId_enc)
                              pwSessionId_enc = pwSessionId_enc.hexEncode();
                              //console.log(pwSessionId_enc);
                              urlConcat = "&ID=" + pwSessionId_enc;

                              //                                            cryptor.decryptHex('754EA04D628F783887ADEB415233D09C', 'decimalsecretkey', function (datadecphn) {
                              //                                                console.log(datadecphn)
                              //                                            });
                              reqData = reqDataEnc;
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        });

        while (!isEncryptionCompleted) {
          //    console.log(isEncryptionCompleted)
          if (reqData == null) {
          } else {
            //      console.log(isEncryptionCompleted)
            //                        cryptor.decrypt(keyPW,'decimalsecretkey',function(decKey){
            //                            cryptor.decrypt(reqData,decKey,function(decData){
            //                                console.log(JSON.stringify(decData))
            //                            })
            //                        });

            // var finalUrl;
            // if (data[0].processName === "AUTH" || data[0].processName === "SPPRGETQUEUECOUNT" || data[0].processName === "SPPRGETPANINFODETAILS") {
            //     //                        if (data[0].processName === "AUTH") {
            //     finalUrl = environmentVars.encryptRRURL + urlConcat; //pwcProperties.encURL + urlConcat;
            //     //finalUrl = pwcProperties.URL + urlConcat;
            // } else {
            //     finalUrl = environmentVars.encryptURL + urlConcat; //pwcProperties.URL + urlConcat;
            // }
            // Internet connection check Starts here
            if (!navigator.onLine) {
              dmDialogueBox
                .alertBox({
                  title: "Internet connection!!",
                  message: "Your Internet connectivity has been lost",
                  actionlabel: ["OK"],
                })
                .then(function (res) {
                  // console.log(res);
                  // $scope.hideLoader()
                });
              // hideLoader();
            }
            // Internet connection check Ends here

            var req = {
              method: "POST",
              url: finalUrl,
              // responseType: "blob",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded" /*,
                            'X-CSRF-Token':'randomString()'*/,
              },
              data: reqData,
              withCredentials: false,
              timeout: 300000,
            };
            /*  function randomString(length = 15) {
                        return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
                    }*/
            isEncryptionCompleted = true;

            return $http(req)
              .success(function (response) {
                //alert(JSON.stringify(response));
              })
              .error(function (error) {
                return error;
              });
          }
        }
      },
    };
  },
]);
/*platware parse response*/
commonService.factory("parsePlatwareResponse", [
  "sessionIdService",
  "$location",
  "dmDialogueBox",
  "soleAccount",
  function (sessionIdService, $location, dmDialogueBox, soleAccount) {
    function gotoLogin() {
      $location.path("/login");
      return;
    }
    return {
      parse: function (response) {
        var data = response.PWSESSIONRS;
        var dataArr = [];

        for (var i = 0, max = data.length; i < max; i++) {
          var userSession = sessionIdService.getUserSessionId();
          sessionIdService.setUserSessionId(userSession);
          var processId = data[i].PWPROCESSRS.PWHEADER.IN_PROCESS_ID;
          var dataObj = {
            data: "",
            isError: "",
            processName: "",
            errorCode: "",
          };
          if (data[i].PWPROCESSRS.PWERROR === "") {
            dataObj.isError = "N";
            try {
              dataObj.data = data[i].PWPROCESSRS.PWDATA[processId]["Row"];
              dataObj.processName = processId.toUpperCase();
            } catch (arr) {
              /* dmDialogueBox.alertBox({
                            title: 'Error',
                            message: "Unable to login! please contact support team.",
                            actionlabel: ['Ok']
                        }).then(function (res) {
                            //console.log(res)
                        });*/
            }
          } else {
            dataObj.isError = "Y";
            dataObj.processName = processId.toUpperCase();
            try {
              var errorCode =
                data[i].PWPROCESSRS.PWERROR[processId]["Row"][
                  "MsgID"
                ].toUpperCase();
              dataObj.errorCode = errorCode;
              var errorMessage =
                data[i].PWPROCESSRS.PWERROR[processId]["Row"]["Message"];
              if (errorCode === "MSESSION" || errorCode === "MAXSESSION") {
                dataObj.errorCode = errorCode;
                if (
                  dataObj.processName !== "AUTH" ||
                  dataObj.processName !== "AUTHDOPS"
                ) {
                  dmDialogueBox
                    .alertBox({
                      title: "Session Error!",
                      message: errorMessage,
                      actionlabel: ["OK"],
                    })
                    .then(function (res) {
                      //console.log(res)
                    });
                  i = max;
                  gotoLogin();
                  break;
                }
              } else if (
                errorCode === "ESESSION" ||
                errorCode === "SESSIONID"
              ) {
                //alert(errorMessage);
                dmDialogueBox
                  .alertBox({
                    title: "Session Error!",
                    message: errorMessage,
                    actionlabel: ["OK"],
                  })
                  .then(function (res) { })
                  .then(function (res) {
                    //console.log(res)
                  });
                i = max;
                gotoLogin();
                break;
              }
            } catch (e) { }
            //dataObj.data=data[i].PWPROCESSRS.PWDATA;
          }
          dataArr.push(dataObj);
        }
        return dataArr;
      },
    };
  },
]);

///////////////////////////////////////////////////////////////
commonService.service("sessionIdService", function () {
  var userSessionId = "";
  return {
    getUserSessionId: function () {
      if (userSessionId.length <= 0) {
        if (sessionStorage.kotakUserSessionID) {
          this.setUserSessionId(sessionStorage.kotakUserSessionID);
        } else {
          userSessionId = "";
        }
      }
      return userSessionId;
    },
    setUserSessionId: function (value) {
      //sessionStorage.userSessionId=value;
      sessionStorage.setItem("kotakUserSessionID", value);
      userSessionId = value;
      //pwcProperties.platwareRequest.PWSESSIONRS.PWPROCESSRS.PWHEADER.USER_SESSION_ID = value;
    },
  };
}); ////////////////////////////
commonService.service("preImageName", function () {
  var imageName = "";
  return {
    getImageName: function () {
      return imageName;
    },
    setImageName: function (value) {
      imageName = value;
    },
  };
});
commonService.service("imageCaption", function () {
  var imageName = "";
  return {
    getImageName: function () {
      return imageName;
    },
    setImageName: function (value) {
      imageName = value;
    },
  };
});
commonService.service("jointAccountIndex", function () {
  var index = "";
  return {
    getjointindex: function () {
      return index;
    },
    setjointindex: function (value) {
      index = value;
    },
  };
});
commonService.service("companyAccountIndex", function () {
  var index = "";
  return {
    getcompanyindex: function () {
      return index;
    },
    setcompanyindex: function (value) {
      index = value;
    },
  };
});
