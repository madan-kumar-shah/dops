var loginModule = angular.module("myApp.login", ["ngRoute", "RouteData"]);
loginModule.controller("loginCtrl", [
  "$scope",
  "$location",
  "dmDialogueBox",
  "$window",
  "$timeout",
  function ($scope, $location, dmDialogueBox, $window, $timeout) {
    //----------------------------------------------------------------------------------------
    $scope.loginAzure = true;
    $scope.p = {};
    $scope.hideLoader();
    $scope.ChangeLogin = function (obj) {
      // $scope.test();
      if (obj == "azure") $scope.loginAzure = true;
      else $scope.loginAzure = false;
    };

    // $scope.test = function () {
    //   var body = {
    //     spupdatejson: [{}],
    //   };
    //   console.log(body);
    //   executeApi(newplatwareHeader, body, function (res) {
    //     console.log("res" + JSON.stringify(res));
    //   });
    // };

    $scope.login = function () {
      if (!$scope.loginAzure) {
        if (!$scope.p.username && !$scope.p.password) {
          $scope.showErrorUser = true;
          $scope.showErrorPassword = true;
        } else if (!$scope.p.username) {
          $scope.showErrorUser = true;
        } else if (!$scope.p.password) {
          $scope.showErrorPassword = true;
        } else {
          var body = {
            AUTHDOPS: [
              {
                x_org_id: "",
                x_login_id: $scope.p.username.toUpperCase(),
                id: $scope.p.username.toUpperCase(),
                x_process_id: "",
                x_password: "",
                x_app_id: "",
                x_auth_type: "",
              },
            ],
          };
          $scope.showLoader("Loading.....");
          executeApi(newplatwareHeader, body, function (res) {
            $scope.$apply(function () {
              if (res.status == true) {
                $scope.showErrorUser = false;
                $scope.showErrorPassword = false;
                document.getElementById("loginButton").style.boxShadow =
                  "1px 4px 11px gray";
                var body = {
                  spuserpasswordauth: [
                    {
                      x_user_id: $scope.p.username.toUpperCase(),
                      x_password: $scope.p.password,
                    },
                  ],
                };
                $scope.showLoader("Loading...");
                executeApi(newplatwareHeader, body, function (res) {
                  $scope.$apply(function () {
                    if (res.status == true) {
                      $scope.hideLoader();
                      if (
                        res.data["spuserpasswordauth"][0].hasOwnProperty("data")
                      ) {
                        if (res.data.spuserpasswordauth[0].data[0] == "Y") {
                          var body = {
                            getusersessionobject: [
                              {
                                p_login_id: $scope.p.username.toUpperCase(),
                              },
                            ],
                          };
                          $scope.showLoader("Loading...");
                          executeApi(newplatwareHeader, body, function (res) {
                            $scope.$apply(function () {
                              if (res.status == true) {
                                $scope.hideLoader();
                                if (
                                  res.data[
                                    "getusersessionobject"
                                  ][0].hasOwnProperty("error")
                                ) {
                                  dmDialogueBox.alertBox({
                                    title: "Alert",
                                    message: "Oop's Something went wrong",
                                    actionLabel: ["Ok"],
                                  });
                                } else if (
                                  res.data[
                                    "getusersessionobject"
                                  ][0].hasOwnProperty("data")
                                ) {
                                  if (
                                    res.data.getusersessionobject[0].data[0]
                                      .status == "true"
                                  ) {
                                    $scope.login_details =
                                      res.data.getusersessionobject[0].data[0];
                                    if (
                                      $scope.login_details.system_role ==
                                      "BS" ||
                                      $scope.login_details.system_role ==
                                      "DVUM" ||
                                      $scope.login_details.system_role ==
                                      "DVUC" ||
                                      $scope.login_details.system_role ==
                                      "SIGN" ||
                                      $scope.login_details.system_role ==
                                      "ACC" ||
                                      $scope.login_details.system_role ==
                                      "EXCEL" ||
                                      $scope.login_details.system_role ==
                                      "RECON" ||
                                      $scope.login_details.system_role ==
                                      "SWEEP" ||
                                      $scope.login_details.system_role ==
                                      "CLUSTERROLE" ||
                                      $scope.login_details.system_role ==
                                      "VIEWROLE" ||
                                      $scope.login_details.system_role ==
                                      "REGIONROLE" ||
                                      $scope.login_details.system_role ==
                                      "ZONALROLE" ||
                                      $scope.login_details.system_role ==
                                      "CENTRALROLE" ||
                                      $scope.login_details.system_role ==
                                      "ADMINROLE" ||
                                      $scope.login_details.system_role ==
                                      "CURINGROLE"
                                    ) {
                                      // SPUSERLOGIN integration
var body = {
  SPUSERLOGIN: [
    {
      p_user_id: $scope.p.username.toUpperCase(),
    },
  ],
};
$scope.showLoader("Loading...");
executeApi(newplatwareHeader, body, function (res) {
  $scope.$apply(function () {
    if (res.status == true) {
      $scope.hideLoader();
      console.log(
        "**/* SPUSERLOGIN */**",
        res
      );
      if (
        res.data["SPUSERLOGIN"][0].hasOwnProperty("error")
      ) {
        $scope.hideLoader();
        $location.path("/home");
      } else if (
        res.data["SPUSERLOGIN"][0].hasOwnProperty("data")
      ) {
        if (
          res.data["SPUSERLOGIN"][0].data[0].status == "Y"
        ) {
          $location.path("/home");
        }else{
          $location.path('/home');
        }
      } else {
        $scope.hideLoader();
        $location.path("/home");
      }
    } else {
      $scope.hideLoader();
    }
  });
});
// SPUSERLOGIN integration
                                      console.log(
                                        "**/* getusersessionobject */**",
                                        res
                                      );
                                      sessionStorage.setItem(
                                        "usersession",
                                        JSON.stringify(
                                          res.data.getusersessionobject[0].data
                                        )
                                      );
                                      sessionStorage.setItem(
                                        "userName",
                                        $scope.p.username.toUpperCase()
                                      );
                                      // $location.path("/home");
                                    } else {
                                      $scope.hideLoader();
                                      dmDialogueBox.alertBox({
                                        title: "Alert",
                                        message: "Invalid Credentials",
                                        actionLabel: ["Ok"],
                                      });
                                    }
                                  }
                                } else {
                                  $scope.hideLoader();
                                  dmDialogueBox.alertBox({
                                    title: "Message",
                                    message: "Oop's Something went wrong",
                                    actionLabel: ["Ok"],
                                  });
                                }
                              } else {
                                $scope.hideLoader();
                                dmDialogueBox.alertBox({
                                  title: "Server Error",
                                  message: "Error Connecting to server..",
                                  actionLabel: ["Ok"],
                                });
                              }
                            });
                          });
                        } else {
                          $scope.hideLoader();
                          dmDialogueBox.alertBox({
                            title: "Error Message",
                            message:
                              "Please enter valid user name and password.",
                            actionLabel: ["Ok"],
                          });
                        }
                      } else {
                        $scope.hideLoader();
                        dmDialogueBox.alertBox({
                          title: "Message",
                          message: "Oop's Something went wrong.",
                          actionLabel: ["Ok"],
                        });
                      }
                    } else {
                      $scope.hideLoader();
                      dmDialogueBox.alertBox({
                        title: "Server Error",
                        message: res.erroMessage,
                        actionLabel: ["Ok"],
                      });
                    }
                  });
                });
              } else if (res.status == false && res.errorCode == "PW-0005") {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Error",
                  message: res.erroMessage,
                  actionLabel: ["Ok"],
                });
              } else {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Server Error",
                  message: "Error Connecting to server..",
                  actionLabel: ["Ok"],
                });
              }
            });
          });
        }
      } else if ($scope.loginAzure) {
        $window.open(
          "https://yesaimca.yes.bank.in/azure/msal4jsample/secure/aad",
          "_self"
        );      //this has to be uncommented for DEV/PROD build or for normal Development and below one should be commented
        
        // $window.open(
        //   'https://yesaimca.yesuat.bank.in/azure/msal4jsample/secure/aad',
        //   '_self'
        // );    //this has to be uncommented for UAT build and above one should be commented
      }
    };

    //----------------------------------------------------------------------------------------
    // $scope.validate=function(inputData){
    //   if(inputData.$touched && inputData.$invalid){
    //     return true;
    //   }else return false;
    // }
  },
]);