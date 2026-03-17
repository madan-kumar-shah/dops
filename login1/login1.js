var loginModule = angular.module('myApp.login1', ['ngRoute', 'RouteData']);
loginModule.controller('login1Ctrl', ['$scope','$location','dmDialogueBox','$window','$timeout',"$rootScope",
  function($scope, $location, dmDialogueBox, $window, $timeout,$rootScope) {
//----------------------------------------------------------------------------------------                 

  
$scope.init=function(){
  
  $scope.showLoader('Loading.....');
  // $rootScope.copy_Url= new URL(window.location.href);
  let urlString = window.location.href;
  let paramString = urlString.split('?')[1];
  let params_arr = paramString.split('&');
  ssoToken="";
  loginID="";
    for(let i = 0; i < params_arr.length; i++) {
        let pair = params_arr[i].split('=');
        // console.log(pair[0]+ "="+ pair[1])
       if(pair[0].includes('sso_token')){
           ssoToken=pair[1];
          //  console.log('SSO_token',ssoToken);
        }
        if(pair[0].includes('username')){
          userName= pair[1];
          //  console.log('NAME',userName);
         }
         if(pair[0].includes('loginId')){
          loginID=pair[1];
         }
     }        
  $scope.login();
}
        $scope.login=function(){
            $scope.sso_token = ssoToken;
            $scope.usernameUrl = userName;
            $scope.userLoginID = loginID?loginID:'';
          let auth_scheme=$scope.sso_token?'sso':'';
          $scope.username=$scope.usernameUrl;
          let headersSso={auth_scheme}
          if(($scope.sso_token!=='')&&($scope.username !=='')){
            var body = {
              "AUTHDOPS": [{
                x_org_id:'',
                x_login_id:'',
                loginId:$scope.userLoginID,
                id:$scope.username,
                ssoToken:$scope.sso_token,
                x_process_id:'',
                x_password:'',
                x_app_id:'',
                x_auth_type:''
                                }]
                };
          }else if(($scope.sso_token=='')&&($scope.username !=='')){
            var body = {
              "AUTHDOPS": [{
                x_org_id:'',
                x_login_id:'',
                id:$scope.username,
                x_process_id:'',
                x_password:'',
                x_app_id:'',
                x_auth_type:''
                                }]
                };
          }         
      executeApi(newplatwareHeader, body,headersSso, function(res) {
                $scope.showLoader('Loading.....')
              $scope.$apply(function(){
                    if(res.status==true){
                    var body = {
                    "getusersessionobject": [{
                      p_login_id :$scope.username, 
                         }]
                       }
                    executeApi(newplatwareHeader, body, function(res) {
                    $scope.$apply(function() {
                    if(res.status==true){
                      $scope.hideLoader();
                      if(res.data['getusersessionobject'][0].hasOwnProperty('error')){
                        dmDialogueBox.alertBox({
                          title: 'Alert',
                          message: "Oop's Something went wrong",
                          actionLabel: ['Ok']
                         });
                       }
                     else if(res.data['getusersessionobject'][0].hasOwnProperty('data')){
                     if(res.data.getusersessionobject[0].data[0].status=='true'){
                      console.log('**/* getusersessionobject */**',res);      
                      sessionStorage.setItem('usersession',JSON.stringify(res.data.getusersessionobject[0].data));
                      sessionStorage.setItem('userName', $scope.username);
                                                            // SPUSERLOGIN integration
var body = {
  SPUSERLOGIN: [
    {
      p_user_id: $scope.username,
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
        $location.path('/home');
          $location.url($location.path());
      } else if (
        res.data["SPUSERLOGIN"][0].hasOwnProperty("data")
      ) {
        if (
          res.data["SPUSERLOGIN"][0].data[0].status == "Y"
        ) {
          $location.path('/home');
          $location.url($location.path());
        }else{
          $location.path('/home');
          $location.url($location.path());
        }
      } else {
        $scope.hideLoader();
        $location.path('/home');
          $location.url($location.path());
      }
    } else {
      $scope.hideLoader();
    }
  });
});
// SPUSERLOGIN integration
                      // $location.path('/home');
                      // $location.url($location.path());
                             } 
                    if(res.data.getusersessionobject[0].data[0].status=='false'){
                      dmDialogueBox.alertBox({
                        title: 'Message',
                        message: 'User is not authorized, Please contact Administrator',
                        actionLabel: ['Ok']
                       }).then(function(res) {
                        switch (res) {
                          case true:
                            $location.path('/');
                            $location.replace();
                  }
            }); 
                    }
                  }else{
                    $scope.hideLoader();
                    dmDialogueBox.alertBox({
                    title: 'Message',
                    message: "Oop's Something went wrong",
                    actionLabel: ['Ok']
                    });
                  }
                            }
                            else{
                              $scope.hideLoader();
                               dmDialogueBox.alertBox({
                                title: 'Server Error',
                                message: 'Error Connecting to server..',
                                actionLabel: ['Ok']
                               });
                               }
                            })
                             })
                             }
                    else if(res.status==false && res.errorCode=="PW-0002" && res.serverCode=="528"){
                      $scope.hideLoader();
                      dmDialogueBox.alertBox({
                        title: 'Error',
                        message: res.erroMessage,
                        actionLabel: ['Ok']
                       });
                      }
                       else if(res.status==false){
                        $scope.hideLoader();
                        dmDialogueBox.alertBox({
                          title: 'Error',
                          message: res.erroMessage,
                          actionLabel: ['Ok']
                         });
                        }else{
                              $scope.hideLoader();
                              dmDialogueBox.alertBox({
                                title: 'Error Message',
                                message: 'Error Connecting to server..',
                                actionLabel: ['Ok']
                               });
                          }
                        });
                        })
                      }
    
  //----------------------------------------------------------------------------------------                 
  // $scope.validate=function(inputData){
  //   if(inputData.$touched && inputData.$invalid){
  //     return true;
  //   }else return false;
  // }   

$scope.init();
}

]);