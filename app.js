var myGlobalRefresh_variable = true;
("use strict");
// Declare app level module which depends on views, and components
var appModule = angular.module("myApp", [
  "ngRoute",
  "RouteData",
  "myApp.version",
  "dmCommonApiModule",
  "myApp.login",
  "myApp.login1",
  "commonServiceModule",
  "myApp.home",
  "myApp.leadScutiny",
  "myApp.queues",
  "myApp.queueData",
  "myApp.ScrutinyForm",
  "myApp.CompanyForm",
  "myApp.IndividualForm",
  "myApp.PhyScrutinyForm",
  "myApp.PhyCompanyForm",
  "myApp.PhyLLPForm",
  "myApp.PhyIndividualForm",
  "myApp.PartnershipForm",
  "myApp.PhyHUFIndividualForm",
  "myApp.PhyHUFScrutinyForm",
  "myApp.PhyTASCForm",
  "Images",
  "myApp.cardView",
  "ui.bootstrap",
  "ngSanitize",
  "ngCsv",
  "pikaday",
]);
appModule.config([
  "$locationProvider",
  "$routeProvider",
  "RouteDataProvider",
  "pikadayConfigProvider",
  function ($locationProvider, $routeProvider, RouteDataProvider, pikaday) {
    $locationProvider.hashPrefix('');
    pikaday.setConfig({
      format: "YYYY-MM-DD",
    });

    RouteDataProvider.applyConfig({
      bodyStyle: {
        "background-color": "white",
      },
      loaderColor: {
        color: "#005192",
      },
    });

    var windowHeight = window.innerHeight;
    // windowHeight = windowHeight - ((1 / 100) * windowHeight);
    RouteDataProvider.hookToRootScope(true);
    $routeProvider
      .when("/login", {
        RouteData: {
          bodyStyle: {
            background: "#ffffff", // '#FF0000',
            width: "100%",
            height: "100%",
            //height: windowHeight + 'px'
            // 'auto'
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - Login",
        templateUrl: "login/login.html",
        //controller: 'loginCtrl'
      })
      .when("/leadScrutiny", {
        RouteData: {
          bodyStyle: {
            background: "#f4f4f4", // '#FF0000',
            //'height': windowHeight + 'px', // 'auto'
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - Lead Scrutiny",
        templateUrl: "leadScrutiny/leadScrutiny.html",
        controller: "leadCtrl",
      })
      .when("/home", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            height: "auto",
            minHeight: "100%",
            width: "100%",
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - Home",
        templateUrl: "home/homeNew.html",
        //controller: 'loginCtrl'
      })
      .when("/images", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            height: "100%",
            width: "100%",
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - Images",
        templateUrl: "CompanyForm/documentsImages.html",
        //controller: 'loginCtrl'
      })
      .when("/queueData", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            height: "100%",
            width: "100%",
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - Home",
        templateUrl: "queueData/queueData.html",
        //controller: 'loginCtrl'
      })
      .when("/queues", {
        RouteData: {
          bodyStyle: {
            background: "#ffffff", // '#FF0000',
            height: windowHeight + "px", // 'auto'
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - Queues",
        templateUrl: "queues/queues.html",
        //controller: 'loginCtrl'
      })
      .when("/ScrutinyForm", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            height: "100%",
            width: "100%",
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - ScrutinyForm",
        templateUrl: "ScrutinyForm/ScrutinyForm.html",
        //controller: 'loginCtrl'
      })
      .when("/IndividualForm", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            height: "100%",
            width: "100%",
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - IndividualForm",
        templateUrl: "IndividualForm/IndividualForm.html",
        //controller: 'loginCtrl'
      })
      .when("/CompanyForm", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            height: "100%",
            width: "100%",
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - CompanyForm",
        templateUrl: "CompanyForm/CompanyForm.html",
        //controller: 'loginCtrl'
      })
      .when("/PartnershipForm", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            height: "100%",
            width: "100%",
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - PartnershipForm",
        templateUrl: "PartnershipForm/PartnershipForm.html",
        //controller: 'loginCtrl'
      })
      .when("/PhyScrutinyForm", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            height: "100%",
            width: "100%",
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - PhyScrutinyForm",
        templateUrl: "PhyScrutinyForm/PhyScrutinyForm.html",
        //controller: 'loginCtrl'
      })
      .when("/PhyIndividualForm", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            height: "100%",
            width: "100%",
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - PhyIndividualForm",
        templateUrl: "PhyIndividualForm/PhyIndividualForm.html",
        //controller: 'loginCtrl'
      })
      .when("/PhyCompanyForm", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            height: "100%",
            width: "100%",
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - PhyCompanyForm",
        templateUrl: "PhyCompanyForm/PhyCompanyForm.html",
        //controller: 'loginCtrl'
      })
      .when("/PhyLLPForm", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            height: "100%",
            width: "100%",
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - PhyLLPForm",
        templateUrl: "PhyLLPForm/PhyLLPForm.html",
        //controller: 'loginCtrl'
      })
      .when("/PhyHUFIndividualForm", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            height: "100%",
            width: "100%",
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - PhyHUFIndividualForm",
        templateUrl: "PhyHUFIndividualForm/PhyHUFIndividualForm.html",
        //controller: 'loginCtrl'
      })
      .when("/PhyHUFScrutinyForm", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            height: "100%",
            width: "100%",
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - PhyHUFScrutinyForm",
        templateUrl: "PhyHUFScrutinyForm/PhyHUFScrutinyForm.html",
        //controller: 'loginCtrl'
      })
      .when("/PhyTASCForm", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            height: "100%",
            width: "100%",
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - PhyTASCForm",
        templateUrl: "PhyTASCForm/PhyTASCForm.html",
        //controller: 'loginCtrl'
      })
      .when("/cardView", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            //'height': windowHeight + 'px', // 'auto'
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - cardView",
        templateUrl: "cardView/cardView.html",
        //controller: 'loginCtrl'
      })
      .when("/login1", {
        RouteData: {
          bodyStyle: {
            background: "#f6f6f6", // '#FF0000',
            //'height': windowHeight + 'px', // 'auto'
          },
          loaderColor: {
            color: "#005192",
          },
        },
        title: "dOps - Login",
        templateUrl: "login1/login1.html",
        //controller: 'loginCtrl'
      });
    $routeProvider.otherwise({ redirectTo: "/login" });
  },
]);
// appModule.directive('onFinishRender',function(){
//     return{
//         restrict: 'A',
//         link: function (scope) {
//             if (scope.$last === true){
//                 $scope.hideLoader();
//               }
//               else{
//                 $scope.showLoader("Getting Leads");
//             }
//           }
//     }
// });
var newKey ="c3830ff2-b747-40b1-9c8b-712e806821b9"
appModule.run([
  "$rootScope",
  "$route",
  "$location",
  "$http",
  "dmDialogueBox",
  function ($rootScope, $route, $location, $http, dmDialogueBox) {
    var lastDigestRun = new Date().getTime();
    $rootScope.keys = Object.keys;

    $rootScope.$watch(function () {
      var now = new Date().getTime();
      //milliseconds
      if (now - lastDigestRun > 1000 * 60 * 15) {
        if ($location.path() !== "/login") {
          //console.log('session error')
          //alert("Session expired");
          dmDialogueBox
            .alertBox({
              title: "Session Error!",
              message: "Session expired",
              actionlabel: ["OK"],
            })
            .then(function (res) {
              // $scope.logout();
              $location.path("/login");
            });
        }
        // return;
        //$location.path("/login");
        // logout here, like delete cookie, navigate to login ...
      }
      lastDigestRun = now;
    });
    $rootScope.$on("$routeChangeSuccess", function (newVal, oldVal) {
      //console.log(newVal)
      if (oldVal !== newVal) {
        document.title = $route.current.title;
      }
      //console.log($http.pendingRequests);
    });
    //        $rootScope.$on('$routeChangeStart', function (newVal, oldVal) {
    //            if (oldVal !== newVal) {
    //                //console.log($http.pendingRequests);
    //            }
    //
    //        });
    String.prototype.hexEncode = function () {
      var hex, i;
      var result = "";
      for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
      }
      return result;
    };
    String.prototype.hexDecode = function () {
      var j;
      var hexes = this.match(/.{1,4}/g) || [];
      var back = "";
      for (j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
      }
      return back;
    };
  },
]);
appModule.service("holdersDataPrvdr", [
  function () {
    var holderService = this;
    holderService.holdersData = [];
    holderService.currentHolder = null;
    holderService.setCurrentHolder = function (currentHolder) {
      holderService.currentHolder = currentHolder;
    };
    holderService.getCurrentHolder = function () {
      return holderService.currentHolder;
    };
    holderService.setHoldersData = function (data) {
      holderService.holdersData = data;
    };
    holderService.getHoldersData = function () {
      return holderService.holdersData;
    };
    holderService.resetService = function () {
      holderService.holdersData = [];
      holderService.currentHolder = null;
    };
  },
]);
appModule.service("productsDataPrvdr", [
  function () {
    var productService = this;
    productService.productsData = [];
    productService.currentProduct = null;
    productService.setCurrentProduct = function (currentProduct) {
      productService.currentProduct = currentProduct;
    };
    productService.getCurrentProduct = function () {
      return productService.currentProduct;
    };
    productService.setProductsData = function (data) {
      productService.productsData = data;
    };
    productService.getProductsData = function () {
      return productService.productsData;
    };
  },
]);
appModule.service("processGroupPrvdr", [
  function () {
    var processGrpService = this;
    processGrpService.processGroup = [];
    processGrpService.setProcessGrp = function (data) {
      processGrpService.processGroup = data;
    };
    processGrpService.getProcessGrp = function () {
      return JSON.parse(JSON.stringify(processGrpService.processGroup));
    };
    processGrpService.reset = function () {
      processGrpService.processGroup = [];
    };
  },
]);
appModule.service("soleAccount", [
  function () {
    var soleAccountLead = "";
    return {
      getsoleUserLead: function () {
        return soleAccountLead;
      },
      setsoleUserLead: function (value) {
        soleAccountLead = value;
      },
    };
  },
]);
appModule.service("leadDataPrvdr", [
  "$filter",
  "$q",
  "platwareRequest",
  "parsePlatwareResponse",
  "dmDialogueBox",
  "queueInfoPrvdr",
  function (
    $filter,
    $q,
    platwareRequest,
    parsePlatwareResponse,
    dmDialogueBox,
    queueInfoPrvdr
  ) {
    var leadDataService = this;

    leadDataService.currentAOFId = "";
    leadDataService.currentMemberId = "";
    leadDataService.currentAccessType = "";
    leadDataService.currentAOFActions = [];
    leadDataService.AOFFormData = [];
    leadDataService.leadAOFFormData = [];
    leadDataService.leadProductsFormData = [];
    leadDataService.leadHoldersFormData = [];
    leadDataService.formData = {};

    leadDataService.fetchLeadAOFDTLData = function (aofId, role, queueId) {
      var currentQueue = queueInfoPrvdr.getCurrentQueue();

      var leadAOFDTLReq = [
        {
          processName: "SPGETEXCEPTIONQUEUELIST",
          data: [
            {
              X_AOF_ID: aofId,
              SYSTEMROLE: role,
              CARD_ID: "",
              QUEUE_ID: queueId,
              X_MEMBER_ID: "",
            },
          ],
        },
      ];
      // $scope.showLoader("Getting Data");
      return platwareRequest.callPlatware(leadAOFDTLReq);
    };

    leadDataService.fetchLeadAOFProductDTL = function () {
      //alert(leadDataService.currentAOFId)
      var leadAOFProductDTLReq = [
        {
          processName: "SPPRGETPRODUCTDTLTXN",
          data: [
            {
              X_ACCOUNT_NO: "",
              X_AOF_ID: leadDataService.currentAOFId, //"A40317160306081708",//"AOFM27006161108153305",
              X_CRN_NO: "",
              X_MEMBER_ID: "",
              X_LEAD_ID: "",
            },
          ],
        },
      ];
      return platwareRequest.callPlatware(leadAOFProductDTLReq);
    };

    leadDataService.fetchLeadAOFMemberDTL = function (memberId, aofId) {
      var leadAOFMemberDTLReq = [
        {
          processName: "SPPRGETMEMBERDETAILTXN",
          data: [
            {
              X_ACCOUNT_NO: "",
              X_AOF_ID: leadDataService.currentAOFId, //"A40317160306081708",//"AOFM27006161108153305",
              X_CRN_NO: "",
              X_MEMBER_ID: leadDataService.getCurrentMemberId(),
              X_LEAD_ID: "",
            },
          ],
        },
      ];
      return platwareRequest.callPlatware(leadAOFMemberDTLReq);
    };
    leadDataService.fetchLeadAOFData = function (aofId) {
      var deferred = $q.defer();
      var fetchAOFDTL = function () {
        leadDataService
          .fetchLeadAOFDTLData(aofId)
          .success(function (response) {
            var parsedData = parsePlatwareResponse.parse(response);
            $scope.hideLoader();
            var errorMessage = "";
            for (var i = 0; i < parsedData.length; i++) {
              if (parsedData[i].isError === "N") {
                if (!parsedData[i].data[0]["message"]) {
                  var AOFdata = $filter("byProp")(
                    parsedData[i].data,
                    "control_id",
                    "0"
                  );
                  var leadFormData = $filter("excludeByProp")(
                    parsedData[i].data,
                    "control_id",
                    "0"
                  );
                  var aofId = "";
                  var aofAccess = "";
                  if (AOFdata.length > 0) {
                    var AOFAccess =
                      $filter("byProp")(
                        AOFdata,
                        "json_name",
                        "X_ACCESS_TYPE"
                      )[0] || {};
                    var AOFId =
                      $filter("byProp")(AOFdata, "json_name", "x_aof_id")[0] ||
                      {};
                    var memberId =
                      $filter("byProp")(
                        AOFdata,
                        "json_name",
                        "x_member_id"
                      )[0] || {};
                    var AOFActions =
                      $filter("byProp")(
                        AOFdata,
                        "json_name",
                        "X_ACTION_STRING"
                      )[0] || {};
                    var AOFDebitStatus =
                      $filter("byProp")(
                        AOFdata,
                        "json_name",
                        "X_DBFZ_STATUS"
                      )[0] || {};
                    var AOFAccountStatus =
                      $filter("byProp")(
                        AOFdata,
                        "json_name",
                        "X_ACCL_STATUS"
                      )[0] || {};
                    if (AOFId && AOFId["datavalue"]) {
                      AOFId = AOFId["datavalue"];
                      AOFAccess = AOFAccess["datavalue"];
                      AOFActions = AOFActions["datavalue"];
                      if (AOFId.trim().length > 0) {
                        isLeadAOFData.aofData = true;
                        leadDataService.setCurrentAccessType(AOFAccess);
                        leadDataService.setCurrentAOFId(AOFId);
                        leadDataService.setCurrentMemberId(
                          memberId["datavalue"]
                        );
                        leadDataService.setAOFFormData(AOFdata);
                        leadDataService.setCurrentAOFActions(AOFActions);
                        leadDataService.setCurrentAOFDebitSatus(AOFDebitStatus);
                        leadDataService.setCurrentAOFAccountSatus(
                          AOFAccountStatus
                        );
                        leadDataService.setLeadAOFFormData(leadFormData);
                        //  soleAccount.setsoleUserLead(leadFormData);
                        fetchAOFProductsDTL();
                        return;
                      } else {
                        errorMessage = "No AOF ID found";
                      }
                    } else {
                      errorMessage = "No AOF ID found";
                    }
                  } else {
                    errorMessage = "No AOF Data";
                  }
                } else {
                  errorMessage = parsedData[i].data[0]["message"];
                }
              } else {
                errorMessage = "Error in getting AOF Data";
              }
            }
            deferred.reject(errorMessage);
            //$scope.hideLoader();
            //                    dmDialogueBox.alertBox({
            //                        title: 'AOF Data Error',
            //                        message: errorMessage
            //                    });
          })
          .error(function (e) {
            deferred.reject("Server Not Responding..");
          });
      };
      var fetchAOFProductsDTL = function () {
        leadDataService
          .fetchLeadAOFProductDTL()
          .success(function (response) {
            var parsedData = parsePlatwareResponse.parse(response);
            var errorMessage = "";
            for (var i = 0; i < parsedData.length; i++) {
              if (parsedData[i].isError == "N") {
                if (!parsedData[i].data[0]["message"]) {
                  isLeadAOFData.productsDtlData = true;
                  leadDataService.setLeadProductsFormData(parsedData[i].data);
                  deferred.resolve();
                  //$location.path('/ScrutinyForm');
                  return;
                } else {
                  errorMessage = parsedData[i].data[0]["message"];
                }
              } else {
                errorMessage = "Error in getting AOF Data";
              }
            }
            deferred.reject(errorMessage);
            //                    dmDialogueBox.alertBox({
            //                        title: 'AOF Data Error',
            //                        message: errorMessage
            //                    });
          })
          .error(function (e) {
            deferred.reject("Server Not Responding..");
            //$scope.hideLoader();
          });
      };
      //$scope.showLoader('Fetching AOF Data...');
      var isLeadAOFData = {
        aofData: false,
        productsDtlData: false,
        holdersDtlData: false,
      };
      fetchAOFDTL();
      return deferred.promise;
    };
    //        leadDataService.fetchLeadAOFData = function () {
    //            var leadAOFReq = [
    //                {
    //                    processName: 'SPPRGETAOFDETAILTXN',
    //                    data: [{
    //                            "X_ACCOUNT_NO": "",
    //                            "X_AOF_ID": "AOFM27006161108153305",
    //                            "X_CRN_NO": "",
    //                            "X_MEMBER_ID": "",
    //                            "X_LEAD_ID": ""
    //                        }],
    //                },
    //                {
    //                    processName: 'SPPRGETPRODUCTDTLTXN',
    //                    data: [{
    //                            "X_ACCOUNT_NO": "",
    //                            "X_AOF_ID": "AOFM27006161108153305",
    //                            "X_CRN_NO": "",
    //                            "X_MEMBER_ID": "",
    //                            "X_LEAD_ID": ""
    //                        }]
    //                },
    //                {
    //                    processName: 'SPPRGETMEMBERDETAILTXN',
    //                    data: [{
    //                            "X_ACCOUNT_NO": "",
    //                            "X_AOF_ID": "AOFM27006161108153305",
    //                            "X_CRN_NO": "",
    //                            "X_MEMBER_ID": "",
    //                            "X_LEAD_ID": ""
    //                        }]
    //                }
    //            ];
    //            return platwareRequest.callPlatware(leadAOFReq);
    //        };
    //        leadDataService.fetchLeadAOFData = function () {
    //            var leadAOFData_Req = [{
    //                    processName: 'SPPRGETAOFDETAILTXN',
    //                    data: [{
    //                            "X_ACCOUNT_NO": "",
    //                            "X_AOF_ID": "AOFM55215161108151558",
    //                            "X_CRN_NO": "",
    //                            "X_MEMBER_ID": "",
    //                            "X_LEAD_ID": ""
    //                        }]
    //                }];
    //            return platwareRequest.callPlatware(leadAOFData_Req);
    //        };
    //        leadDataService.fetchLeadProd_MemData = function () {
    //            var leadProd_MemData_Req = [{
    //                    processName: 'SPPRGETPRODUCTDTLTXN',
    //                    data: [{
    //                            "X_ACCOUNT_NO": "",
    //                            "X_AOF_ID": "AOFM55215161108151558",
    //                            "X_CRN_NO": "",
    //                            "X_MEMBER_ID": "",
    //                            "X_LEAD_ID": ""
    //                        }]
    //                },
    //                {
    //                    processName: 'SPPRGETMEMBERDETAILTXN',
    //                    data: [{
    //                            "X_ACCOUNT_NO": "",
    //                            "X_AOF_ID": "AOFM55215161108151558",
    //                            "X_CRN_NO": "",
    //                            "X_MEMBER_ID": "",
    //                            "X_LEAD_ID": ""
    //                        }]
    //                }];
    //            return platwareRequest.callPlatware(leadProd_MemData_Req);
    //        };
    leadDataService.setAOFFormData = function (data) {
      leadDataService.AOFFormData = leadDataService.prepareFormModalData(data);
      //leadDataService.AOFFormData = data
    };
    leadDataService.getAOFFormData = function () {
      return leadDataService.AOFFormData;
      //            return JSON.parse(JSON.stringify(leadDataService.AOFFormData));
    };
    leadDataService.setLeadAOFFormData = function (data) {
      leadDataService.leadAOFFormData = data;
      //leadDataService.leadAOFFormData = data;
    };
    leadDataService.getLeadAOFFormData = function () {
      return leadDataService.leadAOFFormData;
      //            return JSON.parse(JSON.stringify(leadDataService.leadAOFFormData));
    };
    leadDataService.setLeadProductsFormData = function (data) {
      leadDataService.leadProductsFormData =
        leadDataService.prepareFormModalData(data);
      //            leadDataService.leadProductsFormData = data;
    };
    leadDataService.getLeadProductsFormData = function () {
      return leadDataService.leadProductsFormData;
      //            return JSON.parse(JSON.stringify(leadDataService.leadProductsFormData));
    };
    leadDataService.setLeadHoldersFormData = function (data) {
      leadDataService.leadHoldersFormData =
        leadDataService.prepareFormModalData(data);
    };
    leadDataService.getLeadHoldersFormData = function () {
      return leadDataService.leadHoldersFormData;
      //            return JSON.parse(JSON.stringify(leadDataService.leadHoldersFormData));
    };
    leadDataService.setCurrentAOFId = function (value) {
      leadDataService.currentAOFId = value;
    };
    leadDataService.getCurrentAOFId = function () {
      return leadDataService.currentAOFId;
    };
    leadDataService.setCurrentMemberId = function (value) {
      leadDataService.currentMemberId = value;
    };
    leadDataService.getCurrentMemberId = function (value) {
      return leadDataService.currentMemberId;
    };
    leadDataService.setCurrentAccessType = function (accessType) {
      leadDataService.currentAccessType = accessType;
    };
    leadDataService.getCurrentAccessType = function () {
      return leadDataService.currentAccessType.toUpperCase();
    };
    leadDataService.setCurrentAOFActions = function (actionString) {
      actionString = actionString || "";
      leadDataService.currentAOFActions =
        actionString.trim().length > 0 ? actionString.split("=") : [];
    };
    leadDataService.setCurrentAOFDebitSatus = function (debitSatus) {
      leadDataService.currentDebitStatus = debitSatus;
    };
    leadDataService.setCurrentAOFAccountSatus = function (accountSatus) {
      leadDataService.currentAccountStatus = accountSatus;
    };
    leadDataService.getCurrentAOFAccountSatus = function (accessType) {
      return leadDataService.currentAccountStatus;
    };
    leadDataService.getCurrentAOFDebitSatus = function (accessType) {
      return leadDataService.currentDebitStatus;
    };

    leadDataService.getCurrentAOFActions = function () {
      return leadDataService.currentAOFActions;
    };
    leadDataService.prepareFormModalData = function (data) {
      var returnObj = {};
      angular.forEach(data, function (obj) {
        returnObj[obj["control_id"]] = returnObj[obj["control_id"]] || {};
        returnObj[obj["control_id"]][obj["json_name"].toUpperCase()] =
          obj["datavalue"]; //.toUpperCase();
      });
      //console.log(returnObj);
      return returnObj;
    };
    //var lead_aof_data = soleAccount.getsoleUserLead();
    //console.log(lead_aof_data);
    leadDataService.getFormData = function () {
      var data = {
        AOF: leadDataService.getLeadAOFFormData(),
        PRODUCT: leadDataService.getLeadProductsFormData(),
        MEMBER: leadDataService.getLeadHoldersFormData(),
      };
      angular.forEach(data, function (obj) {
        angular.forEach(obj, function (value, key) {
          leadDataService.formData[key] = leadDataService.formData[key] || {};
          leadDataService.formData[key] = value;
        });
      });
      //console.log(leadDataService.formData);
      return leadDataService.formData;
    };
    leadDataService.fetchAOFDeviationsTxn = function () {
      var deviationData_req = [
        {
          processName: "SPPRGETLEADDEVTNTXN", //spprgetmitcdetails x_search_code
          data: [
            {
              X_ACCOUNT_NO: "",
              X_AOF_ID: leadDataService.currentAOFId,
              X_CRN_NO: "",
              X_MEMBER_ID: "",
              X_LEAD_ID: "",
            },
          ],
        },
      ];
      return platwareRequest.callPlatware(deviationData_req);
    };
    leadDataService.fetchHoldersAndProducts = function () {
      var holderProductsReqData = [
        {
          processName: "SPPRGETPRODUCTTXN",
          data: [
            {
              X_ACCOUNT_NO: "",
              X_AOF_ID: leadDataService.currentAOFId, //'AOFM27006161108153305', //,
              X_CRN_NO: "",
              X_MEMBER_ID: "",
              X_LEAD_ID: "",
            },
          ],
        },
        {
          processName: "SPPRGETMEMBERDETAILS",
          data: [
            {
              X_ACCOUNT_NO: "",
              X_AOF_ID: leadDataService.currentAOFId, //'AO55215161108151558', //$scope.aofObj.currentAOFId,
              X_CRN_NO: "",
              X_MEMBER_ID: "",
              X_LEAD_ID: "",
            },
          ],
        },
      ];
      return platwareRequest.callPlatware(holderProductsReqData);
    };
    leadDataService.fetchDocumentsList = function () {
      var docDetailReq = [
        {
          processName: "SPPRGETLEADDOCTXNDTL",
          data: [
            {
              X_AOF_ID: leadDataService.currentAOFId, //'AOFM27006161108153305', //$scope.aofObj.currentAOFId,
            },
          ],
        },
      ];
      return platwareRequest.callPlatware(docDetailReq);
    };
    leadDataService.fetchDocDeclarationMaster = function () {
      var reqData = [
        {
          processName: "SPPRGETDOCPURPOSEMST",
          data: [],
        },
        {
          processName: "SPPRGETDOCMST",
          data: [],
        },
        {
          processName: "SPPRGETDECLARATIONMST",
          data: [],
        },
      ];
      return platwareRequest.callPlatware(reqData);
    };
    leadDataService.fetchLeadDeclarations = function () {
      var reqData = [
        {
          processName: "SPPRGETLEADDECRTNTXN",
          data: [
            {
              X_ACCOUNT_NO: "",
              X_AOF_ID: leadDataService.currentAOFId, //'AOFM55215161108151558', //$scope.aofObj.currentAOFId,
              X_CRN_NO: "",
              X_MEMBER_ID: "",
              X_LEAD_ID: "",
            },
          ],
        },
      ];
      return platwareRequest.callPlatware(reqData);
    };
    leadDataService.reset = function () {
      leadDataService.currentAOFId = "";
      leadDataService.currentAccessType = "";
      leadDataService.AOFFormData = [];
      leadDataService.leadAOFFormData = [];
      leadDataService.leadProductsFormData = [];
      leadDataService.leadHoldersFormData = [];
      leadDataService.formData = {};
    };
  },
]); /*
appModule.service('customQueueConfiguration', ['platwareRequest', function (platwareRequest) {
var custom_queue=this;
custom_queue.custom_queue_configuration={};
custom_queue.set_custom_queue=function(data){
        if (Object.keys(data).length > 0) {
            custom_queue.custom_queue_configuration = data;
            localStorage.setItem('custom_queue', JSON.stringify(custom_queue.custom_queue_configuration));
        }
    }
    custom_queue.get_custom_queue=function(){
        if (Object.keys(custom_queue.custom_queue_configuration).length > 0) {
            return JSON.parse(JSON.stringify(custom_queue.custom_queue_configuration));
        } else if (localStorage.getItem('custom_queue')) {
            return JSON.parse(localStorage.getItem('custom_queue'));
        }
        return custom_queue.custom_queue_configuration;
    }

   
}]);
appModule.service('customGridConfiguration', ['platwareRequest', function (platwareRequest) {
    var custom_grid=this;
    custom_grid.custom_queue_configuration={};
    custom_grid.set_custom_queue=function(data){
            if (Object.keys(data).length > 0) {
                custom_grid.custom_queue_configuration = data;
                localStorage.setItem('custom_grid', JSON.stringify(custom_grid.custom_queue_configuration));
            }
        }
        custom_grid.get_custom_queue=function(){
            if (Object.keys(custom_grid.custom_queue_configuration).length > 0) {
                return JSON.parse(JSON.stringify(custom_grid.custom_queue_configuration));
            } else if (localStorage.getItem('custom_grid')) {
                return JSON.parse(localStorage.getItem('custom_grid'));
            }
            return custom_grid.custom_queue_configuration;
        }
    
       
    }]);

    appModule.service('customglobalConfiguration', ['platwareRequest', function (platwareRequest) {
        var custom_global=this;
        custom_global.custom_queue_configuration={};
        custom_global.set_custom_queue=function(data){
                if (Object.keys(data).length > 0) {
                    custom_global.custom_queue_configuration = data;
                    localStorage.setItem('custom_global', JSON.stringify(custom_global.custom_queue_configuration));
                }
            }
            custom_global.get_custom_queue=function(){
                if (Object.keys(custom_global.custom_queue_configuration).length > 0) {
                    return JSON.parse(JSON.stringify(custom_global.custom_queue_configuration));
                } else if (localStorage.getItem('custom_global')) {
                    return JSON.parse(localStorage.getItem('custom_global'));
                }
                return custom_global.custom_queue_configuration;
            }
        
           
        }]);
        appModule.service('customBomConfiguration', ['platwareRequest', function (platwareRequest) {
            var custom_bom=this;
            custom_bom.custom_queue_configuration={};
            custom_bom.set_custom_queue=function(data){
                    if (Object.keys(data).length > 0) {
                        custom_bom.custom_queue_configuration = data;
                        localStorage.setItem('custom_bom', JSON.stringify(custom_bom.custom_queue_configuration));
                    }
                }
                custom_bom.get_custom_queue=function(){
                    if (Object.keys(custom_bom.custom_queue_configuration).length > 0) {
                        return JSON.parse(JSON.stringify(custom_bom.custom_queue_configuration));
                    } else if (localStorage.getItem('custom_bom')) {
                        return JSON.parse(localStorage.getItem('custom_bom'));
                    }
                    return custom_bom.custom_queue_configuration;
                }      
            }]);*/
appModule.service("lovMasterPrvdr", [
  "platwareRequest",
  function (platwareRequest) {
    var lovMstService = this;
    lovMstService.lovMasterData = {};
    lovMstService.fetchLovMaster = function () {
      var reqData = [
        {
          processName: "SPPRGETLOVMST",
          data: [],
        },
      ];
      return platwareRequest.callPlatware(reqData);
    };
    lovMstService.setLovMasterData = function (data) {
      if (Object.keys(data).length > 0) {
        lovMstService.lovMasterData = data;
        localStorage.setItem(
          "lovMasterData",
          JSON.stringify(lovMstService.lovMasterData)
        );
      }
    };
    lovMstService.getLovMasterData = function () {
      if (Object.keys(lovMstService.lovMasterData).length > 0) {
        return JSON.parse(JSON.stringify(lovMstService.lovMasterData));
      } else if (localStorage.getItem("lovMasterData")) {
        return JSON.parse(localStorage.getItem("lovMasterData"));
      }
      return lovMstService.lovMasterData;
    };
    lovMstService.isLovMasterData = function () {
      if (Object.keys(lovMstService.getLovMasterData()).length > 0) {
        return true;
      }
      return false;
    };
    lovMstService.isReloadLovMaster = function () {
      var isReload = false;
      if (!lovMstService.isLovMasterData()) {
        isReload = true;
        return isReload;
      }
      if (!localStorage.getItem("lovReloadDate")) {
        isReload = true;
        return isReload;
      }
      var reloadDate = new Date(localStorage.getItem("lovReloadDate"));
      var newDate = new Date();
      newDate.setHours(0, 0, 0, 0);
      if (newDate.getTime() > reloadDate.getTime()) {
        isReload = true;
        return isReload;
      }
      return isReload;
    };
    lovMstService.setReloadDate = function () {
      var newRelaodDate = new Date();
      newRelaodDate.setHours(0, 0, 0, 0);
      localStorage.setItem("lovReloadDate", newRelaodDate);
    };
  },
]);
appModule.service("queueInfoPrvdr", [
  function () {
    var queueInfoService = this;
    queueInfoService.currentQueue = {};
    queueInfoService.setCurrentQueue = function (obj) {
      queueInfoService.currentQueue = obj;
      localStorage.setItem("KotakCurrentQueue", JSON.stringify(obj));
    };
    queueInfoService.setCurrentLeadType = function (type) {
      type = JSON.stringify(type);
      queueInfoService.currentLeadType = type;
      sessionStorage.setItem("KotakCurrentLeadType", type);
    };
    queueInfoService.getCurrentLeadType = function () {
      queueInfoService.currentLeadType = sessionStorage.getItem(
        "KotakCurrentLeadType"
      );
      return queueInfoService.currentLeadType;
    };
    queueInfoService.getCurrentQueue = function (obj) {
      if (!queueInfoService.currentQueue) {
        queueInfoService.currentQueue = JSON.parse(
          localStorage.getItem("KotakCurrentQueue")
        );
      }
      return queueInfoService.currentQueue;
    };
    queueInfoService.clearCurrentQueue = function () {
      localStorage.removeItem("KotakCurrentQueue");
      queueInfoService.currentQueue = null;
    };
    queueInfoService.resetService = function () {
      queueInfoService.clearCurrentQueue();
    };
  },
]);
appModule.service("formConfigPrvdr", [
  function () {
    var formMasterData = [];
    var paramMasterData = [];
    var actionMasterData = [];
    var createLeadFormData = [];
    return {
      setFormMasterData: function (data) {
        formMasterData = data;
        if (data.length > 0) {
          localStorage.setItem("webOnFormMasterData", JSON.stringify(data));
        }
      },
      getFormMasterData: function () {
        if (formMasterData.length > 0) {
          return formMasterData;
        } else {
          return JSON.parse(localStorage.getItem("webOnFormMasterData"));
        }
      },
      setParamMasterData: function (data) {
        // console.log(data);
        angular.forEach(data, function (dataObj) {
          angular.forEach(dataObj, function (value, key) {
            if (key == "json_name") {
              dataObj[key] = value.toUpperCase();
            }
            if (key == "fixed_value") {
              dataObj[key] = value; //.toUpperCase();
            }
          });
        });
        paramMasterData = data;
        if (data.length > 0) {
          localStorage.setItem("webOnParamMasterData", JSON.stringify(data));
        }
      },
      getParamMasterData: function () {
        if (paramMasterData.length > 0) {
          return paramMasterData;
        } else {
          return JSON.parse(localStorage.getItem("webOnParamMasterData"));
        }
      },
      setActionMasterData: function (data) {
        actionMasterData = data;
        if (data.length > 0) {
          localStorage.setItem("webOnActionMasterData", JSON.stringify(data));
        }
      },
      getActionMasterData: function () {
        if (actionMasterData.length > 0) {
          return actionMasterData;
        } else {
          return JSON.parse(localStorage.getItem("webOnActionMasterData"));
        }
      },
      setCreateLeadFormdata: function (data) {
        createLeadFormData = data;
        if (data.length > 0) {
          localStorage.setItem("createLeadWebOnConfig", JSON.stringify(data));
        }
      },
      getCreateLeadFormdata: function () {
        // return createLeadFormData;
        if (createLeadFormData.length > 0) {
          return createLeadFormData;
        } else {
          return JSON.parse(localStorage.getItem("createLeadWebOnConfig"));
        }
      },
      isFormDataAvailable: function () {
        var returnValue = false;
        if (
          (formMasterData.length > 0 ||
            (localStorage.getItem("webOnFormMasterData") &&
              localStorage.getItem("webOnFormMasterData") !== "")) &&
          (paramMasterData.length > 0 ||
            (localStorage.getItem("webOnParamMasterData") &&
              localStorage.getItem("webOnParamMasterData") !== "")) &&
          (actionMasterData.length > 0 ||
            (localStorage.getItem("webOnActionMasterData") &&
              localStorage.getItem("webOnActionMasterData") !== ""))
        ) {
          returnValue = true;
        }
        return returnValue;
      },
      isCreateLeadFormDataAvailable: function () {
        var returnValue = false;
        if (
          createLeadFormData.length > 0 ||
          (localStorage.getItem("createLeadWebOnConfig") &&
            localStorage.getItem("createLeadWebOnConfig") !== "")
        ) {
          returnValue = true;
        }
        return returnValue;
      },
      resetService: function () {
        formMasterData = [];
        paramMasterData = [];
        actionMasterData = [];
        createLeadFormData = [];
      },
    };
  },
]);
///////////////////////LOGINCREDS SERVICE/////////////////////////////////
/*
 * @controller: initial controller for the App
 * This is the main controller (Parent of all controller)
 */
appModule.controller("headerCtrl", [
  "$scope",
  "$location",
  "QueueService",
  "dmDialogueBox",
  "LoginCreds",
  "platwareRequest",
  "parsePlatwareResponse",
  "soleAccount",
  "jointAccountIndex",
  "$rootScope",
  "companyAccountIndex",
  function (
    $scope,
    $location,
    QueueService,
    dmDialogueBox,
    LoginCreds,
    platwareRequest,
    parsePlatwareResponse,
    soleAccount,
    jointAccountIndex,
    $rootScope,
    companyAccountIndex
  ) {
    $scope.currentQueue = QueueService.getQueueCardData();
    $scope.gridData = JSON.parse(sessionStorage.getItem("GridData"));
    //$scope.Email_verify_leads=JSON.parse(QueueService.getCardView());
    $scope.getQueueName = JSON.parse(sessionStorage.getItem("selectedQ"));
    $scope.user_data = JSON.parse(sessionStorage.getItem("usersession"));
    $scope.userName = sessionStorage.getItem("userName");
    //$scope.newjson=leadDataPrvdr.getLeadAOFFormData();
    $scope.data_sole_lead = soleAccount.getsoleUserLead();
    console.log(
      "$scope.data_sole_lead " + JSON.stringify($scope.data_sole_lead)
    );
    $scope.joint_older = false;
    $scope.defaultholder = false;
    $scope.nonearrive = 0;
    $scope.nonecount = 0;

    $scope.goToRequiredPath = function (pathName) {
      if ($scope.getQueueName.queue_id == "12" && pathName == "/queueData") {
        $location.path("/cardView");
      } else if ($scope.getQueueName.queue_id == "12" && pathName == "/home") {
        $location.path("/home");
      } else if (
        ($scope.getQueueName.queue_id == "6" ||
          $scope.getQueueName.queue_id == "5" ||
          $scope.getQueueName.queue_id == "7" ||
          $scope.getQueueName.queue_id == "8") &&
        window.location.hash == "#/ScrutinyForm" &&
        $scope.gridData
      ) {
        $scope.leave_session_of(pathName);
      } else {
        $location.path(pathName);
      }
    };

    $scope.leave_session_of = function (pathName) {
      var body = {
        spexitlead: [
          {
            x_lead_id: $scope.gridData.x_lead_id || "",
            x_prc_grp: $scope.user_data[0].x_prc_grp,
            x_login_id: $scope.userName,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spexitlead */**", res);
            if (res.data.spexitlead[0].error) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: res.data.spexitlead[0].error.message,
                actionLabel: ["Ok"],
              });
            } else {
              if (
                res.data.spexitlead[0].data[0] == "n" ||
                res.data.spexitlead[0].data[0] == "y"
              ) {
                if (pathName == "gotoprevious") {
                  history.back();
                } else {
                  $location.path(pathName);
                }
              }
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
          } else {
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };

    //$scope.somethingHere;
    $scope.companyfullname = [];
    $scope.dataanalyse = [];
    $scope.currentAccountCompany;
    $scope.currentcompanyholder = false;
    console.log($scope.data_sole_lead);
    if ($scope.data_sole_lead != "") {
      if (
        $scope.data_sole_lead.AOF.DATA.WORKFLOW_STATUS.SOURCE == "COMPANYCA" ||
        $scope.data_sole_lead.AOF.DATA.WORKFLOW_STATUS.SOURCE == "PTNR"
      ) {
        $scope.currentAccountCompany =
          $scope.data_sole_lead.AOF.DATA.WORKFLOW_STATUS.SOURCE;

        for (
          var i = 0;
          i < $scope.data_sole_lead.AOF.DATA["HOLDERS"].length;
          i++
        ) {
          let indexs = {
            original: "",
            duplicate: "",
          };
          //$scope.companyfullname.push($scope.data_sole_lead.AOF.DATA['HOLDERS'][i].FIRST_NAME);
          if (
            $scope.data_sole_lead.AOF.DATA["HOLDERS"][i].RLTN_WITH_ACCT !=
            undefined &&
            $scope.data_sole_lead.AOF.DATA["HOLDERS"][i].RLTN_WITH_ACCT !=
            "NONE"
          ) {
            /* if( $scope.nonearrive == 1){
                        var x=i+1-$scope.nonecount;
                        $scope.nonearrive=0;
                    }else{
                        var x=i+1;
                       
                    }*/
            var x = i + 1 - $scope.nonecount;
            if (
              $scope.data_sole_lead.AOF.DATA["HOLDERS"][i].RLTN_WITH_ACCT ===
              "VAL"
            ) {
              $scope.holderkeyword =
                "Applicant " + [x] + " " + "(" + "Net Banking User" + ")";
              $scope.companyfullname.push($scope.holderkeyword);
            } else {
              $scope.holderkeyword =
                "Applicant " +
                [x] +
                " " +
                "(" +
                $scope.data_sole_lead.AOF.DATA["HOLDERS"][i].RLTN_WITH_ACCT +
                ")";
              $scope.companyfullname.push($scope.holderkeyword);
            }
            indexs.original = i;
            indexs.duplicate = x;
            $scope.dataanalyse.push(indexs);
          } else {
            // $scope.nonearrive = 1;
            $scope.nonecount++;
          }
        }
        console.log($scope.companyfullname);
        $scope.currentcompanyholder = true;
        for (var j = 0; j < $scope.companyfullname.length; j++) {
          var a = $scope.companyfullname[j].split(/([0-9]+)/);
          if (a[2].trim().includes("AUS")) {
            for (var i = 0; i < $scope.dataanalyse.length; i++) {
              if ($scope.dataanalyse[i].duplicate == a[1]) {
                $scope.defaultvals = $scope.dataanalyse[i].original;
                $scope.defaultval = j;
                companyAccountIndex.setcompanyindex($scope.defaultvals);
                $rootScope.$broadcast("MyEvent2", $scope.defaultvals);
                break;
              }
            }
            break;
          }
        }
      } else {
        $scope.currentcompanyholder = false;
      }
    }
    if ($scope.data_sole_lead != "") {
      if ($scope.data_sole_lead.AOF.DATA.WORKFLOW_STATUS.SOURCE == "JTSBNTB") {
        if ($scope.data_sole_lead.AOF.DATA["HOLDERS"].length > 1) {
          $scope.joint_older = true;
          $scope.duplicatejson = JSON.parse(
            JSON.stringify($scope.data_sole_lead.AOF.DATA["HOLDERS"])
          );
          $scope.multi_holder_desc = $scope.duplicatejson;
          console.log($scope.data_sole_lead.AOF.DATA["HOLDERS"]);
          for (
            var i = 0;
            i < $scope.data_sole_lead.AOF.DATA["HOLDERS"].length;
            i++
          ) {
            if ($scope.data_sole_lead.AOF.DATA["HOLDERS"][i]["AADHAAR"]) {
              $scope.holderAadharimage = $scope.data_sole_lead.AOF.DATA[
                "HOLDERS"
              ][i]["AADHAAR"]["PHOTOGRAPH"]
                ? $scope.data_sole_lead.AOF.DATA["HOLDERS"][i]["AADHAAR"][
                "PHOTOGRAPH"
                ]
                : "";
              $scope.holderaadhar_firstName = $scope.data_sole_lead.AOF.DATA[
                "HOLDERS"
              ][i].FULL_NAME
                ? $scope.data_sole_lead.AOF.DATA["HOLDERS"][i].FULL_NAME
                : "";
              console.log($scope.holderaadhar_firstName);
              $scope.splitedValue = $scope.holderaadhar_firstName.substr(
                0,
                $scope.holderaadhar_firstName.indexOf(" ")
              );
              console.log($scope.splitedValue);
            } else {
              $scope.Aadharimage = "";
            }
            if ($scope.holderAadharimage == "") {
              $scope.noAadhar = "No Image Available";
              console.log($scope.noAadhar);
            }
          }
        } else {
          $scope.joint_older = false;
          if ($scope.data_sole_lead.AOF.DATA["HOLDERS"]["0"]["AADHAAR"]) {
            $scope.Aadharimage = $scope.data_sole_lead.AOF.DATA["HOLDERS"]["0"][
              "AADHAAR"
            ]["PHOTOGRAPH"]
              ? $scope.data_sole_lead.AOF.DATA["HOLDERS"]["0"]["AADHAAR"][
              "PHOTOGRAPH"
              ]
              : "";
          } else {
            $scope.Aadharimage = "";
          }
          $scope.aadhar_firstName = $scope.data_sole_lead.AOF.DATA["HOLDERS"][
            "0"
          ].FULL_NAME
            ? $scope.data_sole_lead.AOF.DATA["HOLDERS"]["0"].FULL_NAME
            : "";
          console.log($scope.aadhar_firstName);
          $scope.splitedValue = $scope.aadhar_firstName.substr(
            0,
            $scope.aadhar_firstName.indexOf(" ")
          );
          console.log($scope.splitedValue);
          if ($scope.Aadharimage == "") {
            $scope.noAadhar = "No Image Available";
            console.log($scope.noAadhar);
          }
        }
      }
    }
    $scope.companyidbroadcast = function (data) {
      var a = data;
      var b = a.split(/([0-9]+)/);
      var c = parseInt(b[1]);
      var d;
      for (var i = 0; i < $scope.dataanalyse.length; i++) {
        if ($scope.dataanalyse[i].duplicate == c) {
          d = $scope.dataanalyse[i].original;
        }
      }
      console.log(b);
      companyAccountIndex.setcompanyindex(d);
      $rootScope.$broadcast("MyEvent1", d);
    };
    $scope.diffcompanyholder = function ($event, user) {
      $scope.somethingHere = user;
    };
    $scope.$on("SendUp", $scope.diffcompanyholder);
    $scope.holder_seq = function (val) {
      $scope.holder_unique_id = val;
      var a = $scope.data_sole_lead.AOF.DATA["HOLDERS"];
      console.log(a);
      var holderIndex = Object.keys(a);
      for (var i = 0; i < holderIndex.length; i++) {
        if (a[i].MEMBER_ID == $scope.holder_unique_id) {
          console.log(i);
          jointAccountIndex.setjointindex(i);
          $rootScope.$broadcast("MyEvent", i);
        }
      }
    };
    $scope.currentPath = $location.path();
    $scope.system_role = JSON.parse(sessionStorage.getItem("usersession"))[0][
      "system_role"
    ];
    $scope.queueDataName = JSON.parse(sessionStorage.getItem("usersession"))[0][
      "user_name"
    ];
    $scope.goToHome = function (pathName) {
      if ($scope.gridData && window.location.hash == "#/ScrutinyForm") {
        if (
          window.location.hash == "#/ScrutinyForm" &&
          ($scope.getQueueName.queue_id == "1" ||
            $scope.getQueueName.queue_id == "11" ||
            $scope.getQueueName.queue_id == "2" ||
            $scope.getQueueName.queue_id == "3" ||
            $scope.getQueueName.queue_id == "4" ||
            $scope.getQueueName.queue_id == "10" ||
            $scope.getQueueName.queue_id == "12")
        ) {
          $location.path(pathName);
        } else {
          $scope.leave_session_of(pathName);
        }
      } else $location.path(pathName);
    };

    $scope.goToPreviousPath = function (obj) {
      if (
        $scope.gridData &&
        ($scope.getQueueName.queue_id == "1" ||
          $scope.getQueueName.queue_id == "11" ||
          $scope.getQueueName.queue_id == "2" ||
          $scope.getQueueName.queue_id == "3" ||
          $scope.getQueueName.queue_id == "4" ||
          $scope.getQueueName.queue_id == "10" ||
          $scope.getQueueName.queue_id == "12")
      )
        history.back();
      else $scope.leave_session_of(obj);
    };

    $scope.logout = function () {
      var body = {
        LOGOUT: [{}],
      };
      $scope.showLoader("Loading...");
      executeApi(newplatwareHeader, body, function (response) {
        console.log(response);
        $scope.$apply(function () {
          $scope.hideLoader();
          if (response.status == true) {
            sessionStorage.clear();
            localStorage.clear();
            //   breadcrumb.removeAll();
            $location.path("/");
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
          } else {
            dmDialogueBox
              .alertBox({
                title: "Logout Fail",
                message: "Error in logging out",
                actionlabel: ["Ok"],
              })
              .then(function (res) { });
          }
        });
      });
    };

    $scope.session_out_lead = function () {
      dmDialogueBox
        .confirmBox({
          title: "Logout Warning",
          message: "Do you want to logout?",
          actionlabel: ["No", "Yes"],
        })
        .then(function (res) {
          if (res == true) {
            var body = {
              splogoutdops: [
                {
                  x_prc_grp: $scope.user_data[0].x_prc_grp,
                  x_login_id: $scope.userName,
                },
              ],
            };
            console.log(body);
            $scope.showLoader("Loading.....");
            executeApi(newplatwareHeader, body, function (res) {
              $scope.$apply(function () {
                $scope.hideLoader();
                if (res.status == true) {
                  console.log("**/* splogoutdops */**", res);
                  if (res.data.splogoutdops[0].error) {
                    dmDialogueBox.alertBox({
                      title: "Alert",
                      message: res.data.splogoutdops[0].error.message,
                      actionLabel: ["Ok"],
                    });
                  } else {
                    if (res.data.splogoutdops[0].data[0] == "n") {
                      if ($scope.user_data[0].system_role == "BS") {
                        $scope.logout();
                      } else {
                        dmDialogueBox.alertBox({
                          title: "Server Error",
                          message: "Unable to logout, Please contact support.",
                          actionLabel: ["Ok"],
                        });
                      }
                    } else if (res.data.splogoutdops[0].data[0] == "y") {
                      $scope.logout();
                    }
                  }
                } else if (
                  res.status == false &&
                  res.errorCode == "PW-0002" &&
                  res.serverCode == "528"
                ) {
                  sessionStorage.clear();
                  $location.path("/");
                } else {
                  dmDialogueBox.alertBox({
                    title: "Server Error",
                    message: "Error Connecting to server..",
                    actionLabel: ["Ok"],
                  });
                }
              });
            });
          }
        });
    };
  },
]);

appModule.controller("initApp", [
  "$scope",
  "$location",
  "$rootScope",
  "$filter",
  "LoginCreds",
  function ($scope, $location, $rootScope, $filter, LoginCreds) {

    $scope.somethingHere = { val: "" };
    $scope.showLoader = function (msg) {
      $scope.isLoading = true;
      $scope.loading_message = msg; //"testmessage";
    };
    $scope.hideLoader = function () {
      $scope.isLoading = false;
      //console.log("loader hidden")
    };
    $scope.controlLoader = function (event, data) {
      if (data) {
        $scope.showLoader(data);
      } else {
        $scope.hideLoader();
      }
    };
    $rootScope.$on("loader_control", $scope.controlLoader);
    $scope.clearUserConfigData = function () {
      /* selectedQuery.resetService();
             queueInfoPrvdr.resetService();*/
    };
    $scope.listjointuserinfo = function ($event, id) {
      $scope.listValue = id;
      $rootScope.$broadcast("broadid", $scope.listValue);
    };
    $scope.$on("listid", $scope.listjointuserinfo);
    $scope.diffcompanyholder = function ($event, user) {
      $scope.somethingHere.val = user;
    };
    $scope.$on("SendUp", $scope.diffcompanyholder);
  },
]);
