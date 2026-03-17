/* Changes by Abhinav */
let tempArr = [
  [
    "Customer ID",
    "Account Number",
    "Customer Name",
    "Email Id",
    "Mobile Number",
    "Pre-Approved Limit (N)",
    "Pre-Approved Limit Amount (0)",
    "Batch Id",
    "Status",
    "Error Comments",
  ],
];
// tempArr[0].pop();
// console.log(tempArr[0]);
/* Changes by Abhinav */

var homeModule = angular.module("myApp.home", []);

homeModule.directive("limitTo", ['$timeout', function ($timeout) {
  // Declaration of custom directive
  return {
    restrict: "A",
    link: function (scope, elem, attrs) {
      var limit = parseInt(attrs.limitTo);
      elem.on("keypress", function (e) {
        $timeout(function () {
          if (limit === 6) {
            if (parseInt(e.target.value.toString().length) > limit) {
              // Handle change here
              document.getElementsByName('pincode')[0].value = scope.lastPincode;
              scope.$apply();
              e.preventDefault();
            }
          }
          if (limit === 10) {
            if (parseInt(e.target.value.toString().length) > limit) {
              // Handle change here
              document.getElementsByName('mobile')[0].value = scope.lastMobile;
              scope.$apply();
              e.preventDefault();
            }
          }
          if (limit === 11) {
            if (parseInt(e.target.value.toString().length) > 10) {
              // Handle change here
              if (document.getElementsByName('id_number')) {
                document.getElementsByName('id_number')[0].value = scope.lastPAN;
              }
              if (document.getElementsByName('cin')) {
                document.getElementsByName('cin')[0].value = scope.lastPAN;
              }
              scope.$apply();
              e.preventDefault();
            }
          }
        });
      });
    }
  }
}]);

homeModule.controller("homeCtrl", [
  "$scope",
  "$http",
  "$location",
  "$filter",
  "dmDialogueBox",
  "$rootScope",
  "QueueService",
  "formValidityPrvdr",
  "prepareDwnldData",
  function (
    $scope,
    $http,
    $location,
    $filter,
    dmDialogueBox,
    $rootScope,
    QueueService,
    formValidityPrvdr,
    prepareDwnldData,
   
  ) {
    //----------------------------------------------------------------------------------------------------------------------
    myGlobalRefresh_variable = false;
    $scope.loginServiceData = JSON.parse(sessionStorage.getItem("usersession"));
    $scope.username = sessionStorage.getItem("userName");
    /* Variables by Abhinav */
    $scope.myButton = true;
    $scope.test1 = false;
    $scope.test = new Date("2021", "01", "01").toDateString();
    $scope.canSendSms = true;
    $scope.correct = 0;
    $scope.incorrect = 0;
    $scope.canSendSms = true;
    $scope.count = 0;
    $scope.batchId = 0;
    $scope.advancefadinOverlay = false;
    $scope.disableExcelUpload = true;
    $scope.showGridContainer = false;
    $scope.leadSource = ["SOLECANTB", "COMPANY", "DLOD", "INDIVIDUAL-ASSISTED", "DIY-SOLEPROP", "DIY-INDIVIDUAL" ,"PHY_PARTNERSHIP"];
    $scope.Iscan_fields = [];
    var apiGateway = new APIGateway();
  
    $scope.getConfiguration = function () {
      return {
        // storage: 'localStorage',
        storage: 'sessionStorage',
        networkDriver: 'FETCH'
      };
    }

    apiGateway.config($scope.getConfiguration());

    console.log('apigateway',apiGateway);
    /* Variables by Abhinav */
    $scope.showTAble = true;
    // $http.get("https://api6.ipify.org?format=json").then(function (response) 
    // {
    //   console.log('IP6:',response);
    //   localStorage.setItem("IPv6",response.data.ip);
    // });
    
    // $http.get("https://api.ipify.org?format=json").then(function (response) 
    // {
    //   console.log('IP:',response);
    //   localStorage.setItem("IPv4",response.data.ip);
    // });
    $http.get("https://api.seeip.org/jsonip").then(function (response) 
    {
      console.log('IP6:',response);
      localStorage.setItem("IPv6",response.data.ip);
    });
    
    $http.get("https://api.seeip.org/jsonip").then(function (response) 
    {
      console.log('IP4:',response);
      localStorage.setItem("IPv4",response.data.ip);
    });
    $scope.init = function () {
      $scope.showLoader("Loading.....");
      // $scope.loginServiceData[0]["system_role"] == "ACC"
      //   ? $scope.getReport_list()
      //   : "";

      dashboardQueue();
      $scope.getLOVmaster();
      $scope.user = {};
      $scope.report = {
        radioSelection: "REPORT",
      };
      $scope.dmColumnActions = [
        {
          column_name: "Action",
          action_function: "goToScrutiny",
        },
      ];
      $scope.JSONData = {};
      $scope.lastMobile = "";
      $scope.lastPincode = "";
      $scope.lastPAN = "";
      $scope.reportRoles = [
        "BS",
        "ACC",
        "CLUSTERROLE",
        "REGIONROLE",
        "ZONALROLE",
        "CENTRALROLE",
        "ADMINROLE",
        "DVUM",
        "DVUC",
        "SIGN",
      ];
      // $scope.getMFAtestFile();
      // $scope.testDialogueBox();
      // $scope.sentReqRes();
      // $scope.sentReqRes2();
      $scope.reportConstitutionalType = "SELECT";
      sessionStorage.removeItem('LastDVUMAction');
      $scope.dynamicmsg();
      
      // $scope.downloadCustomerPDF();
      // $scope.getREJ_tabs_fields();
        $scope.spuserlogin();   
    };

    // $scope.sentReqRes = function () {
    //   let key = 'spgetreviewdate';
    //   var body = {
    //     [key]: [
    //       {
    //         x_aof_id: 'AFO1020221130122604'
    //       }
    //     ],
    //   };
    //   $scope.showLoader("Loading.....");
    //   executeApi(newplatwareHeader, body, function (res) {
    //     $scope.$apply(function () {
    //       $scope.hideLoader();
    //       if (res.status == true) {
    //         console.log(
    //           "Req body: ",
    //           body,
    //           "**/* ", key, " */**",
    //           res
    //         );

    //         // let response = res.data['spvkycimagedata'][0].data;
    //         // let newArr = [];
    //         // if (Array.isArray(response) && response.length > 0) {
    //         //   response.forEach(item => {
    //         //     newArr.push('data:image/jpeg;base64,' + item.image)
    //         //   })
    //         // }
    //         // console.log('VKYC image array', newArr);
    //       } else if (
    //         res.status == false &&
    //         res.errorCode == "PW-0002" &&
    //         res.serverCode == "528"
    //       ) {
    //         sessionStorage.clear();
    //         $location.path("/");
    //       } else {
    //         $scope.hideLoader();
    //         dmDialogueBox.alertBox({
    //           title: "Server Error",
    //           message: "Error Connecting to server..",
    //           actionLabel: ["Ok"],
    //         });
    //       }
    //     });
    //   });
    // };

    $scope.cron_Schema = [
      {
        title: "SOLECANTB",
        edit: false,
        api: "NGO_ADDDOC_CRON",
        submitted: false
      },
      {
        title: "COMPANY",
        edit: false,
        api: "NGO_MISSING_CASE_COMPANY",
        submitted: false
      }
    ];

    $scope.edit_cron_api = function (obj) {
      obj.edit = !obj.edit;
    };

    $scope.prod_url = "https://yesaimca.yes.bank.in/router/engine/v1";

    $scope.cron_run = function (obj) {
      var body = {
        [obj.api]: [
          {

          },
        ],
      };

      if (newplatwareHeader && newplatwareHeader.environment &&
        newplatwareHeader.environment.envProps && newplatwareHeader.environment.envProps.baseUrl) {
        newplatwareHeader.environment.envProps.baseUrl = $scope.prod_url;
      }
      // console.log("cron request", body, "header", newplatwareHeader);
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log(
              "Req body: ",
              body,
              "**/* ", obj.api, " */**",
              res
            );
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    // $scope.getREJ_tabs_fields = function () {
    //   var body = {
    //     spdiygetrejtabfields: [
    //       {
    //         x_lead_id: "AFO1020220708122812"
    //       },
    //     ],
    //   };
    //   $scope.showLoader("Loading.....");
    //   executeApi(newplatwareHeader, body, function (res) {
    //     $scope.$apply(function () {
    //       $scope.hideLoader();
    //       if (res.status == true) {
    //         console.log("**/* spdiygetrejtabfields */**", res);
    //         if (res.data["spdiygetrejtabfields"][0].hasOwnProperty("error")) {
    //           $scope.hideLoader();
    //           dmDialogueBox.alertBox({
    //             title: "Alert",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         } else if (res.data["spdiygetrejtabfields"][0].hasOwnProperty("data")) {
    //           console.log('SP rejected', res.data["spdiygetrejtabfields"][0].data[0]);
    //         } else {
    //           $scope.hideLoader();
    //           dmDialogueBox.alertBox({
    //             title: "Message",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         }
    //       } else if (
    //         res.status == false &&
    //         res.errorCode == "PW-0002" &&
    //         res.serverCode == "528"
    //       ) {
    //         sessionStorage.clear();
    //         $location.path("/");
    //       } else {
    //         $scope.hideLoader();
    //         console.log('Error from ', 'spdiygetrejtabfields');
    //         dmDialogueBox.alertBox({
    //           title: "Server Error",
    //           message: "Error Connecting to server..",
    //           actionLabel: ["Ok"],
    //         });
    //       }
    //     });
    //   });
    // };

    // $scope.downloadCustomerPDF = function () {
    //   var body = {
    //     INDIVIDUAL_PDF_DOPS: [
    //       {
    //         // leadId: "AFO1220220707105023", // soleprop
    //         // leadId: "AFO1220220706170026", // company
    //         leadId: "AFO1020220722114625", // Ind asst.
    //         // type: "STAKE",
    //         // flag: "07122491"
    //       },
    //     ],
    //   };
    //   $scope.showLoader("Loading.....");
    //   executeApi(newplatwareHeader, body, function (res) {
    //     $scope.$apply(function () {
    //       $scope.hideLoader();
    //       if (res.status == true) {
    //         console.log("Req body: ", body, "**/* INDIVIDUAL_PDF_DOPS */**", res);
    //         if (res.data["INDIVIDUAL_PDF_DOPS"][0].hasOwnProperty("error")) {
    //           dmDialogueBox.alertBox({
    //             title: "Alert",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         } else if (res.data["INDIVIDUAL_PDF_DOPS"][0].hasOwnProperty("data")) {
    //           $scope.decodeBase64ToPdf(res.data["INDIVIDUAL_PDF_DOPS"][0].data[0].response);
    //         } else {
    //           $scope.hideLoader();
    //           dmDialogueBox.alertBox({
    //             title: "Message",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         }
    //       } else if (
    //         res.status == false &&
    //         res.errorCode == "PW-0002" &&
    //         res.serverCode == "528"
    //       ) {
    //         sessionStorage.clear();
    //         $location.path("/");
    //       } else {
    //         $scope.hideLoader();
    //         dmDialogueBox.alertBox({
    //           title: "Server Error",
    //           message: "Error Connecting to server..",
    //           actionLabel: ["Ok"],
    //         });
    //       }
    //     });
    //   });
    // };

    // $scope.sentReqRes2 = function () {
    //   var body = {
    //     NGO_MISSING_CASE_COMPANY: [
    //       {

    //       },
    //     ],
    //   };
    //   $scope.showLoader("Loading.....");
    //   executeApi(newplatwareHeader, body, function (res) {
    //     $scope.$apply(function () {
    //       $scope.hideLoader();
    //       if (res.status == true) {
    //         console.log(
    //           "Req body: ",
    //           body,
    //           "**/* NGO_MISSING_CASE_COMPANY */**",
    //           res
    //         );
    //       } else if (
    //         res.status == false &&
    //         res.errorCode == "PW-0002" &&
    //         res.serverCode == "528"
    //       ) {
    //         sessionStorage.clear();
    //         $location.path("/");
    //       } else {
    //         $scope.hideLoader();
    //         dmDialogueBox.alertBox({
    //           title: "Server Error",
    //           message: "Error Connecting to server..",
    //           actionLabel: ["Ok"],
    //         });
    //       }
    //     });
    //   });
    // };

    $scope.decodeBase64ToPdf = function (base64) {
      var link = document.createElement("a");
      link.href = "data:application/pdf;base64," + base64;
      link.download = "mfa_test";
      link.click();
    };

    $scope.getReportRoleFlag = function () {
      return $scope.reportRoles.includes(
        $scope.loginServiceData[0].system_role
      );
    };
 //K-Scope file upload at ACC only
 $scope.chooseFile =function() { 
  var file= document.getElementById('ExcelDoc').files[0]?document.getElementById('ExcelDoc').files[0]:'';
  if (file?.name?.endsWith('.xlsx') || file?.name?.endsWith('.xls')) {  
  if(file){
  var fileSize = file.size; // File size in bytes
            var maxSize = 100*1024 * 1024; // Maximum size in bytes (100MB)
            if (fileSize > maxSize) {
                this.value = ''; // Clear the file input
                  dmDialogueBox.alertBox({
                    title: "Message",
                    message: "File Size should be less than 100MB",
                    actionLabel: ["Ok"],
                  });
            } else {
              $scope.showLoader("File Uploading is in progress...");
              $scope.fileToBase64(file)
              .then(function(base64String) {
                $scope.hideLoader();
               // Call getcall function when the uploadFile function resolves successfully
                $scope.getcall(base64String);  
             })
             .catch(function(error) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oops Something went wrong",
                actionLabel: ["Ok"],
              });
             });
            }  
          }else{
            $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Please choose excel file",
                  actionLabel: ["Ok"],
                 });
          } 
        }else{
          $scope.hideLoader();
              dmDialogueBox.alertBox({
                  title: "Message",
                  message: "File Should be Excel only",
                  actionLabel: ["Ok"],
              });
        }
}
 // Function to convert file to base64
$scope.fileToBase64=function(file) {
return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        const base64String = reader.result.split(',')[1]; // Extract base64 data
        resolve(base64String);
        console.log("fileToBase64",base64String);
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file); // Read file as data URL
});
}
$scope.getcall =function(base64String){
  //Instant MSME API Call Here
  var body = {
    MSMEEXCEL: [
      {
        excelbase64: base64String,
        x_login_id: $scope.username,

      }
    ],
  };
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* MSMEEXCEL */**", res);
            if (res.data["MSMEEXCEL"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["MSMEEXCEL"][0].hasOwnProperty("data")) {
              // console.log(res);
              if (res.data["MSMEEXCEL"][0].data[0].response == 'Y') {
                let msg = getGefuMessageById("201"); // Proceed with signature updation
                $scope.hideLoader();
                dmDialogueBox.confirmBox({
                  title: "Alert",
                  message: msg.msg_desc,
                  actionlabel: ["Cancel","Proceed"],
                }).then(function (res) {
                  if(res===true){
                     $scope.ACCBULKAUTOGEFU();
                  }
                   else{
                    location.reload();
                   }
                });
              } else {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Cannot proceed with Upload File",
                  actionLabel: ["Ok"],
                });
              }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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

    $scope.current_popup_name = "";
    $scope.ct_type = "SELECT";
    $scope.fields_model = {};
    $scope.stateCode_iscan = "";
    $scope.credit_iscan_summary = "";

    // SOLEPROP FIELDS

    $scope.soleProp_ISCAN = {
      id_type: "",
      id_number: "",
      mobile: "",
      applicant_1: "",
      applicant_2: "",
      applicant_3: "",
      dob: "",
      gender: "",
      address_1: "",
      address_2: "",
      address_3: "",
      pincode: "",
      city: "",
      address_type: "",
      residence_type: "",
      entity_name: "",
      nature_of_industry: ""
    };

    $scope.soleprop_fields = [
      {
        id: '1',
        label: "ID Type",
        type: "select",
        key: "id_type",
        options: [
          {
            label: "PAN Card",
            value: "01"
          }
        ]
      },
      {
        id: '2',
        label: "ID Number",
        type: "text",
        key: "id_number",
        pattern: "^[a-zA-Z0-9]{10}$"
      },
      {
        id: '3',
        label: "Mobile Number",
        type: "number",
        key: "mobile"
      },
      {
        id: '4',
        label: "Applicant First Name",
        type: "text",
        key: "applicant_1",
        pattern: "^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$"
      },
      {
        id: '5',
        label: "Applicant Middle Name",
        type: "text",
        key: "applicant_2",
        pattern: "^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$"
      },
      {
        id: '6',
        label: "Applicant Last Name",
        type: "text",
        key: "applicant_3",
        pattern: "^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$"
      },
      {
        id: '7',
        label: "DOB",
        type: "date",
        key: "dob"
      },
      {
        id: '8',
        label: "Gender",
        type: "select",
        key: "gender",
        options: [
          {
            label: "Male",
            value: "1"
          },
          {
            label: "Female",
            value: "2"
          }
        ]
      },
      {
        id: '9',
        label: "Address Line 1",
        type: "text",
        key: "address_1",
        pattern: ""
      },
      {
        id: '10',
        label: "Address Line 2",
        type: "text",
        key: "address_2",
        pattern: ""
      },
      {
        id: '11',
        label: "Address Line 3",
        type: "text",
        key: "address_3",
        pattern: ""
      },
      {
        id: '12',
        label: "Pincode",
        type: "number",
        key: "pincode"
      },
      {
        id: '13',
        label: "City",
        type: "text",
        key: "city",
        pattern: "^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$"
      },
      {
        id: '14',
        label: "Address Type",
        type: "select",
        key: "address_type",
        options: [
          {
            label: "Permanent address",
            value: "01"
          },
          {
            label: "Residence address",
            value: "02"
          },
          {
            label: "Office address",
            value: "03"
          },
          {
            label: "Not categorized",
            value: "04"
          }
        ]
      },
      {
        id: '15',
        label: "Residence Type",
        type: "select",
        key: "residence_type",
        options: [
          {
            label: "Owned",
            value: "01"
          },
          {
            label: "Rented",
            value: "02"
          }
        ]
      },
      {
        id: '16',
        label: "Entity Name",
        type: "text",
        key: "entity_name",
        pattern: "^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$"
      }
    ];

    // SOLEPROP FIELDS

    // COMPANY FIELDS

    $scope.company_ISCAN = {
      cin: "",
      c_entity_name: "",
      company_address: "",
      pincode: "",
      state: "",
      city: ""
    };

    $scope.company_fields = [
      {
        id: '1',
        label: "CIN", // 21/8 chars required, dash included all caps
        type: "text",
        key: "cin",
        pattern: "^[a-zA-Z0-9]{21}$"
      },
      {
        id: '2',
        label: "Entity Name", // all caps, max length - 75char
        type: "text",
        key: "c_entity_name",
        pattern: "^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$"
      },
      {
        id: '3',
        label: "Company Address",
        type: "text",
        key: "company_address",
        pattern: ""
      },
      {
        id: '4',
        label: "Pincode", // 6 digit
        type: "number",
        key: "pincode"
      },
      {
        id: '5',
        label: "State",
        type: "text",
        key: "state",
        pattern: "^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$"
      },
      {
        id: '6',
        label: "City",
        type: "text",
        key: "city",
        pattern: "^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$"
      }
    ];

    // COMPANY FIELDS

    $scope.checkPAN_number = function (key, value) {
      if (value) {
        if ((key === 'id_number' || key === 'cin') && value.toString().length === 10) {
          $scope.lastPAN = value;
        }
      }
    };

    $scope.checkMobile = function (key, value) {
      if (value) {
        if (key === 'mobile' && value.toString().length === 10) {
          $scope.lastMobile = value;
        }
      }
    };
    function getGefuMessageById(id) {
      let arr = JSON.parse(sessionStorage.getItem('GEFU_msg')) || [];
      return arr.find(m => m.msg_id === id);
    }
    $scope.ACCBULKAUTOGEFU=function(){
      var body = {
        UPLOAD_BULK_KSCOP_API: [{
          leads:[],
        },
      ],
      };
      $scope.showLoader("loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* UPLOAD_BULK_KSCOP_API */**", res);
            if (res.data["UPLOAD_BULK_KSCOP_API"][0].hasOwnProperty("data")) {
              $scope.NEWGENKSCOPESERVICE();
            } else {
              $scope.hideLoader();
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
          } else {
            $scope.hideLoader();
          }
        });
      });
    }
    $scope.NEWGENKSCOPESERVICE=function(){
      var body = {
        NEWGEN_KSCOPE_SERVICE: [{
          leads:[],
        },
      ],
      };
      $scope.showLoader("loading.....");
      apiGateway.doPost(newplatwareHeaderV2, body, {}).then(res=>{
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.NEWGEN_KSCOPE_SERVICE.status == 'success') {
            console.log("**/* NEWGEN_KSCOPE_SERVICE */**", res);
              $location.path("/home");          
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
          } else {
            $scope.hideLoader();
            $location.path("/home");          
          }
        });
      });
    }
    $scope.spuserlogin=function(){
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
      } else if (
        res.data["SPUSERLOGIN"][0].hasOwnProperty("data")
      ) {
        if (
          res.data["SPUSERLOGIN"][0].data[0].status == "Y"
        ) {
          $scope.hideLoader();
        }else{
          $scope.hideLoader();
        }
      } else {
        $scope.hideLoader();
      }
    } else {
      $scope.hideLoader();
    }
  });
});
// SPUSERLOGIN integration
    }
    $scope.getCity_Pincode = function (key, value) {
      console.log(key, value);
      if (value) {
        if (key === 'pincode' && value.toString().length === 6) {
          $scope.lastPincode = value;
          var body = {
            spcitystate: [
              {
                x_pin_code: value
              }
            ],
          };
          $scope.showLoader("loading.....");
          executeApi(newplatwareHeader, body, function (res) {
            $scope.$apply(function () {
              $scope.hideLoader();
              if (res.status == true) {
                console.log("**/* spcitystate */**", res);
                if (res.data["spcitystate"][0].hasOwnProperty("error")) {
                  $scope.hideLoader();
                  dmDialogueBox.alertBox({
                    title: "Alert",
                    message: "Oop's Something went wrong",
                    actionLabel: ["Ok"],
                  });
                } else if (res.data["spcitystate"][0].hasOwnProperty("data")) {
                  if (res.data["spcitystate"][0].data[0].hasOwnProperty('response_message')) {
                    $scope.hideLoader();
                    dmDialogueBox.alertBox({
                      title: "Message",
                      message: JSON.parse(res.data["spcitystate"][0].data[0].response_message).RESPONSE_MESSAGE,
                      actionLabel: ["Ok"],
                    });
                    document.getElementsByName('pincode')[0].value = '';
                    document.getElementsByName('city')[0].value = '';
                    document.getElementsByName('city')[0].readOnly = false;
                  } else {
                    $scope.stateCode_iscan = res.data["spcitystate"][0].data[0].state_code;
                    if (document.getElementsByName('city').length > 0) {
                      document.getElementsByName('city')[0].value = res.data["spcitystate"][0].data[0].city_name;
                      $scope.fields_model.city = res.data["spcitystate"][0].data[0].city_name;
                      document.getElementsByName('city')[0].readOnly = true;
                    }
                    if (document.getElementsByName('state').length > 0) {
                      document.getElementsByName('state')[0].value = res.data["spcitystate"][0].data[0].state_name;
                      $scope.fields_model.state = res.data["spcitystate"][0].data[0].state_name;
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
              } else if (
                res.status == false &&
                res.errorCode == "PW-0002" &&
                res.serverCode == "528"
              ) {
                sessionStorage.clear();
                $location.path("/");
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
      }
    };
    $scope.dynamicmsg=function() {
      var body = {
        SPGETMESSAGES: [
          {
            x_msg_id: ['201','202'],
            x_project: 'DOPs',
            x_constitution: '',
          },
        ],
      };
        $scope.showLoader("Loading.....");
        executeApi(newplatwareHeader, body, function (res) {
          $scope.$apply(function () {
            $scope.hideLoader();
            if (res.status == true) {
              console.log("**/* SPGETMESSAGES */**", res);
              if (res.data["SPGETMESSAGES"][0].hasOwnProperty("error")) {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (
                res.data["SPGETMESSAGES"][0].hasOwnProperty("data")
              ) {
                $scope.GEFUMessages = res.data.SPGETMESSAGES[0].data;
            if (
              $scope.GEFUMessages.some((obj) =>
                obj.hasOwnProperty('v_string_grid')
              )
            ) {
              $scope.ParseGEFUMessages = JSON.parse(
                $scope.GEFUMessages[0].v_string_grid
              );
              sessionStorage.setItem(
                'GEFU_msg',
                JSON.stringify($scope.ParseGEFUMessages)
              );
            } else {
              sessionStorage.setItem('GEFU_msg', '');
            }
              } else {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              }
            } else if (
              res.status == false &&
              res.errorCode == "PW-0002" &&
              res.serverCode == "528"
            ) {
              sessionStorage.clear();
              $location.path("/");
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
    };  
    $scope.changeIScan_fields = function (value) {
      if (value == 'SOLECANTB') {
        $scope.soleprop_fields = angular.copy($scope.soleprop_fields);
        $scope.Iscan_fields = $scope.soleprop_fields;
        $scope.fields_model = $scope.soleProp_ISCAN;
        $scope.resetForm();
      } else if (value == 'INDIVIDUAL') {
        $scope.soleprop_fields = angular.copy($scope.soleprop_fields);
        let individual_fields = [];
        let index = 0;
        if ($scope.soleprop_fields.length > 0) {
          index = $scope.soleprop_fields.findIndex(x => x.id === '16');
          individual_fields = [...$scope.soleprop_fields];
          individual_fields.splice(index, 1);
          $scope.Iscan_fields = individual_fields;
        }
        $scope.fields_model = $scope.soleProp_ISCAN;
        $scope.resetForm();
      }
      else if (value == 'COMPANY' || value == 'OTHER') {
        $scope.company_fields = angular.copy($scope.company_fields);
        $scope.Iscan_fields = $scope.company_fields;
        $scope.fields_model = $scope.company_ISCAN;
        $scope.resetForm();
      } else {
        $scope.Iscan_fields = [];
        $scope.fields_model = {};
        $scope.resetForm();
      }
    };

    $scope.resetForm = function () {
      $scope.credit_iscan_summary = "";
      $scope.fields_model = angular.copy($scope.fields_model);
    };

    $scope.getRequired_fields = function (value) {
      var req_array = ['id_type', 'id_number',
        'mobile', 'applicant_1', 'dob', 'gender', 'address_1', 'pincode', 'city', 'address_type', 'residence_type',
        'c_entity_name', 'nature_of_industry', 'cin', 'company_address', 'state'];
      return req_array.includes(value);
    };

    $scope.checkBefore_IScan = function (value) {
      if (value == 'SOLECANTB' || value == 'INDIVIDUAL') {
        var body = {
          spcheck1monthiscan: [
            {
              x_cin_no: $scope.fields_model['id_number']
            }
          ],
        };
      } else if (value == 'COMPANY' || value == 'OTHER') {
        var body = {
          spcheck1monthiscan: [
            {
              x_cin_no: $scope.fields_model['cin']
            }
          ],
        };
      }
      $scope.showLoader("loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spcheck1monthiscan */**", res);
            if (res.data["spcheck1monthiscan"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spcheck1monthiscan"][0].hasOwnProperty("data")) {
              // console.log(res);
              if (res.data["spcheck1monthiscan"][0].data[0].Status == 'Y') {
                $scope.getCreditFacility_Summary2(value);
              } else {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Cannot proceed to check IScan",
                  actionLabel: ["Ok"],
                });
              }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    $scope.getCreditFacility_Summary = function (value) {
      // console.log($scope.fields_model);
      if (value !== 'SELECT') {
        $scope.checkBefore_IScan(value);
      }
    };

    $scope.getCreditFacility_Summary2 = function (value) {
      if (value == 'SOLECANTB' || value == 'INDIVIDUAL') {
        let new_dob = $scope.fields_model['dob'];
        new_dob.setDate($scope.fields_model['dob'].getDate() + 1);
        new_dob = new Date(new_dob).toISOString().replace(/T.*/, '').split('-').reverse().join('');
        var body = {
          CONSUMER_BUREAU: [
            {
              applicantFirstName: $scope.fields_model['applicant_1'].toUpperCase(),
              applicantMiddleName: $scope.fields_model['applicant_2'].toUpperCase(),
              applicantLastName: $scope.fields_model['applicant_3'].toUpperCase(),
              applicantType: "Main", // hardcoded
              dateOfBirth: new_dob,
              gender: $scope.fields_model['gender'],
              companyName: $scope.fields_model['entity_name'].toUpperCase(),
              idNumber: $scope.fields_model['id_number'].toUpperCase(),
              idType: $scope.fields_model['id_type'],
              addressLine1: $scope.fields_model['address_1'].toUpperCase(),
              addressLine2: $scope.fields_model['address_2'].toUpperCase(),
              addressLine3: $scope.fields_model['address_3'].toUpperCase(),
              city: $scope.fields_model['city'].toUpperCase(),
              pinCode: $scope.fields_model['pincode'].toString(),
              addressType: $scope.fields_model['address_type'],
              residenceType: $scope.fields_model['residence_type'],
              stateCode: $scope.stateCode_iscan,
              gstStateCode: 27, // hardcoded
              telephoneExtension: $scope.fields_model['mobile'].toString(), // mobile number 
              telephoneNumber: $scope.fields_model['mobile'].toString(), // mobile number
              telephoneType: "01", // hardcoded,
              emailAddress: ""
            }
          ],
        };
        $scope.showLoader("Loading.....");
        executeApi(newplatwareHeader, body, function (res) {
          $scope.$apply(function () {
            $scope.hideLoader();
            if (res.status == true) {
              console.log("**/* CONSUMER_BUREAU */**", res);
              if (res.data["CONSUMER_BUREAU"][0].hasOwnProperty("error")) {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (res.data["CONSUMER_BUREAU"][0].hasOwnProperty("data")) {
                if (res.data["CONSUMER_BUREAU"][0].data[0].hasOwnProperty("response")) {
                  if (res.data["CONSUMER_BUREAU"][0].data[0].response[0].hasOwnProperty('status')) {
                    if (res.data["CONSUMER_BUREAU"][0].data[0].response[0].status == 'SUCCESS') {
                      if (res.data["CONSUMER_BUREAU"][0].data[0].response[0].response &&
                        res.data["CONSUMER_BUREAU"][0].data[0].response[0].response.Status === 'Success') {
                        $scope.credit_iscan_summary = res.data["CONSUMER_BUREAU"][0].data[0].response[0].response.BRE.attributeBasedDecision;
                        $scope.insertDetails_IScanDB(value, res.data["CONSUMER_BUREAU"][0].data[0].response[0].response);
                      } else {
                        $scope.hideLoader();
                        dmDialogueBox.alertBox({
                          title: "Message",
                          message: res.data["CONSUMER_BUREAU"][0].data[0].response[0].errorResponse[0],
                          actionLabel: ["Ok"],
                        });
                      }
                    } else {
                      $scope.hideLoader();
                      dmDialogueBox.alertBox({
                        title: "Message",
                        message: res.data["CONSUMER_BUREAU"][0].data[0].response[0].message,
                        actionLabel: ["Ok"],
                      });
                    }
                  } else {
                    $scope.hideLoader();
                    dmDialogueBox.alertBox({
                      title: "Message",
                      message: "Something went wrong, please try again",
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
            } else if (
              res.status == false &&
              res.errorCode == "PW-0002" &&
              res.serverCode == "528"
            ) {
              sessionStorage.clear();
              $location.path("/");
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
      } else if (value == 'COMPANY' || value == 'OTHER') {
        var body = {
          ISCAN_COMMERCIAL_BUREAU_IGW: [
            {
              type_of_entity: "Not Classified",
              class_of_activity: "Manufacture of non-structural non-refractory ceramic ware",
              name: $scope.fields_model['c_entity_name'].toUpperCase(),
              addressLine1: $scope.fields_model['company_address'].toUpperCase(),
              city: $scope.fields_model['city'].toUpperCase(),
              state: $scope.fields_model['state'].toUpperCase(),
              pinCode: $scope.fields_model['pincode'].toString(),
              addressType: "registered office",
              pan: $scope.fields_model['cin'].toUpperCase()
            },
          ],
        };
        $scope.showLoader("loading.....");
        executeApi(newplatwareHeader, body, function (res) {
          $scope.$apply(function () {
            $scope.hideLoader();
            if (res.status == true) {
              console.log("**/* ISCAN_COMMERCIAL_BUREAU_IGW */**", res);
              if (res.data["ISCAN_COMMERCIAL_BUREAU_IGW"][0].hasOwnProperty("error")) {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (res.data["ISCAN_COMMERCIAL_BUREAU_IGW"][0].hasOwnProperty("data")) {
                if (res.data["ISCAN_COMMERCIAL_BUREAU_IGW"][0].data[0].hasOwnProperty("response")) {
                  if (res.data["ISCAN_COMMERCIAL_BUREAU_IGW"][0].data[0].response[0].hasOwnProperty("response")) {
                    if (res.data["ISCAN_COMMERCIAL_BUREAU_IGW"][0].data[0].response[0].response &&
                      res.data["ISCAN_COMMERCIAL_BUREAU_IGW"][0].data[0].response[0].status === 'SUCCESS') {
                      $scope.credit_iscan_summary = res.data["ISCAN_COMMERCIAL_BUREAU_IGW"][0].data[0].response[0].response.productSec.summaryAttributes.attributeBasedDecision;
                      $scope.insertDetails_IScanDB(value, res.data["ISCAN_COMMERCIAL_BUREAU_IGW"][0].data[0].response[0].response);
                    } else {
                      $scope.hideLoader();
                      dmDialogueBox.alertBox({
                        title: "Message",
                        message: res.data["ISCAN_COMMERCIAL_BUREAU_IGW"][0].data[0].response[0].errorResponse[0].description,
                        actionLabel: ["Ok"],
                      });
                    }
                  } else {
                    $scope.hideLoader();
                    dmDialogueBox.alertBox({
                      title: "Message",
                      message: res.data["ISCAN_COMMERCIAL_BUREAU_IGW"][0].data[0].response[0].message,
                      actionLabel: ["Ok"],
                    });
                  }
                } else {
                  $scope.hideLoader();
                  dmDialogueBox.alertBox({
                    title: "Message",
                    message: "Something went wrong, please try again",
                    actionLabel: ["Ok"],
                  });
                }
              } else {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              }
            } else if (
              res.status == false &&
              res.errorCode == "PW-0002" &&
              res.serverCode == "528"
            ) {
              sessionStorage.clear();
              $location.path("/");
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
    };

    $scope.insertDetails_IScanDB = function (value, response) {
      let key = '';
      if (value == 'SOLECANTB' || value == 'INDIVIDUAL') {
        let new_dob = $scope.fields_model['dob'];
        new_dob.setDate($scope.fields_model['dob'].getDate() + 1);
        new_dob = new Date(new_dob).toISOString().replace(/T.*/, '').split('-').reverse().join('');
        if (value == 'SOLECANTB') {
          key = 'spinsertiscandetailsoleprop';
        }
        if (value == 'INDIVIDUAL') {
          key = 'spinsertiscandetailsindividual';
        }
        var body = {
          spinsertiscandetailssoleprop: [
            {
              x_id_type: $scope.fields_model['id_type'],
              x_id_number: $scope.fields_model['id_number'].toUpperCase(),
              x_telephone_extension: $scope.fields_model['mobile'].toString(),
              x_unique_id: "",
              x_pan_cin_number: "",
              x_entity_name: $scope.fields_model['entity_name'].toUpperCase(),
              x_applicant_firstname: ($scope.fields_model['applicant_1'] + ' ' + $scope.fields_model['applicant_2'] + ' ' + $scope.fields_model['applicant_3']).toUpperCase(),
              x_date_of_birth: new_dob,
              x_gender: $scope.fields_model['gender'],
              x_address_line1: ($scope.fields_model['address_1'] + ' ' + $scope.fields_model['address_2'] + ' ' + $scope.fields_model['address_3']).toUpperCase(),
              x_pincode: $scope.fields_model['pincode'].toString(),
              x_city: $scope.fields_model['city'].toUpperCase(),
              x_address_type: $scope.fields_model['address_type'],
              x_residence_type: $scope.fields_model['residence_type'],
              x_class_of_activity: "",
              x_state_code: $scope.stateCode_iscan,
              x_gst_state_code: '27',
              x_applicant_type: value,
              x_telephone_type: "01",
              x_type_of_entity: "Not Classified",
              x_score_type: "08",
              x_enquiry_amount: "1", // hardcoded,
              x_enquiry_purpose: "CA Opening",
              x_enquiry_type: "CA Opening",
              x_cmr_flag: "0",
              x_response_received: response,
              x_yes_aim_case_id: "",
              x_requestor_id: "",
              x_report_id: response.BRE.report.fileKey,
              x_created_by: "",
              x_eligibility_status: "Eligible",
              x_bre_string: response.BRE.attributeBasedDecision,
              x_mobile1_dops2_status: "2", // confirm from abhinav
            }
          ],
        };
        body = { [key]: body.spinsertiscandetailssoleprop }
      } else if (value == 'COMPANY' || value == 'OTHER') {
        if (value == 'COMPANY') {
          key = 'spinsertiscandetailscompany';
        }
        if (value == 'OTHER') {
          key = 'spinsertiscandetailsothers';
        }
        var body = {
          spinsertiscandetailscompany: [
            {
              x_unique_id: "",
              x_pan_cin_number: $scope.fields_model['cin'].toUpperCase(),
              x_entity_name: $scope.fields_model['c_entity_name'].toUpperCase(),
              x_address_line1: $scope.fields_model['company_address'].toUpperCase(),
              x_city: $scope.fields_model['city'].toUpperCase(),
              x_state: $scope.fields_model['state'].toUpperCase(),
              x_pincode: $scope.fields_model['pincode'].toString(),
              x_class_of_activity: "",
              x_type_of_entity: "Not Classified",
              x_address_type: "Registered Office",
              x_enquiry_amount: "1",
              x_enquiry_purpose: "CA Opening",
              x_enquiry_type: "No",
              x_cmr_flag: "0",
              x_response_received: response,
              x_yes_aim_case_id: "",
              x_requestor_id: "",
              x_report_id: response.report['fileKey'],
              x_created_by: "",
              x_eligibility_status: "Eligible",
              x_bre_string: response.productSec.summaryAttributes.attributeBasedDecision,
              x_mobile1_dops2_status: "2"
            }
          ],
        };
        body = { [key]: body.spinsertiscandetailscompany }
      }
      $scope.showLoader("loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* ", key, " */**", res);
            if (res.data[key][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data[key][0].hasOwnProperty("data")) {
              console.log('data block :', res.data[key][0].data[0]); //Status: 'Y'
              if (res.data[key][0].data[0].hasOwnProperty('Status')) {
                if (res.data[key][0].data[0].Status == 'Y') {
                  // $scope.IScan_status_close();
                  $scope.hideLoader();
                  dmDialogueBox.alertBox({
                    title: "Message",
                    message: "Lead created successfully",
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
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
          } else {
            $scope.hideLoader();
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        }, 0);
      });
    };

    $scope.IScan_status_fun = function () {
      $scope.current_popup_name = "Iscan_check_popup";
      $scope.leadSource = ["SOLECANTB", "COMPANY", "PARTNERSHIP", "INDIVIDUAL", "OTHERS"];
      $scope.Iscan_check_popup = true;
    };

    $scope.IScan_status_close = function () {
      $scope.ct_type = "SELECT";
      $scope.Iscan_fields = [];
      $scope.current_popup_name = "";
      $scope.Iscan_check_popup = false;
      $scope.credit_iscan_summary = "";
    };
    $scope.ExcelFileUpload_open=function(){
      $scope.current_popup_name = "ExcelFileUploadPopup";
      $scope.ExcelFileUploadPopup=true;
    }
    $scope.ExcelFileUpload_close=function(){
      $scope.current_popup_name = "";
      $scope.ExcelFileUploadPopup=false;
    }

    $scope.download_reports_fun = function () {
      $scope.current_popup_name = "download_reports_popup";
      $scope.leadSource = ["SOLECANTB", "COMPANY", "DLOD", "INDIVIDUAL-ASSISTED", "DIY-SOLEPROP", "DIY-INDIVIDUAL" ,"PHY_PARTNERSHIP"];
      $scope.download_reports_popup = true;
      $scope.report.radioSelection == "REPORT";
      if (document.getElementsByClassName("select_report").length > 0) {
        $scope.resetReportFields();
      }
    };

    $scope.resetReportFields = function () {
      document.getElementsByClassName("select_report")[0].value = "SELECT"; // clear dropdown
      var input = angular.element(document.getElementsByClassName("select_report")[0]); // get angular elem
      var model = input.controller('ngModel'); //get ng-model of report dropdown
      model.$setViewValue('SELECT'); // set ng-model value
      $scope.report_list = [];
      $scope.report.report_name = "";
      $scope.test1 = false;
      $scope.test2 = false;
    };

    $scope.close_download_reports = function () {
      $scope.current_popup_name = "";
      $scope.download_reports_popup = false;
      $scope.report = {
        radioSelection: "REPORT",
      };
    };

    $scope.get_constitutional_type = function (input) {
      $scope.reportConstitutionalType = input;
      console.log("**ng-model** ", $scope.reportConstitutionalType);
      if ($scope.reportConstitutionalType != "SELECT") {
        $scope.getNewReport_list($scope.reportConstitutionalType);
      }
    };

    $scope.download_disable = function () {
      if (
        $scope.report.report_name &&
        $scope.report.end_date &&
        $scope.report.Start_date
      )
        return false;
      else return true;
    };

    $scope.change = function () {
      $scope.test1 = false;
      $scope.report.end_date = "";
    };

    $scope.parseDate = function (input) {
      var parts = input.match(/(\d+)/g);
      // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
      return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
    };

    $scope.startDateLimit = new Date();
    $scope.new_today = new Date();
    $scope.startScope = new Date();
    $scope.startScope.setFullYear(1900);
    $scope.startScope = $scope.startScope.toDateString();
    $scope.new_today = $scope.new_today.toDateString();

    $scope.setDateRange = function (obj) {
      console.log(obj);
      let todayDate = new Date();
      let date = new Date(obj);
      $scope.startDateLimit = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      $scope.startDateLimit = $scope.startDateLimit.toDateString();
      console.log('start limit:', $scope.startDateLimit);
      let month = date.getMonth();
      if ($scope.reportName == "MDM" || $scope.reportName == "Data Dump") {
        month = date.getMonth() + 1;
      }

      let day = date.getDate() + $scope.endDateLimit;
      let year = date.getFullYear();

      if (day < 10) {
        day = "0" + day;
      }

      if (month < 10) {
        month = "0" + month;
      }

      let temp = new Date(year, month, day);
      if (temp.getTime() >= todayDate.getTime()) {
        $scope.test = new Date().toDateString();
      } else {
        $scope.test = temp.toDateString();
      }
      $scope.test1 = true;
      console.log("day:" + day + "" + "month:" + month + "" + "year:" + year);

      $scope.endDatepicker = new Pikaday({
        field: document.getElementById('datepicker2')
      });
      // $scope.endDatepicker.setMaxDate(new Date());
      // $scope.endDatepicker.setMinDate(new Date());
      console.log('end limit:',
        $scope.endDatepicker, "min", $scope.startDateLimit, "type", typeof $scope.startDateLimit, "max", $scope.test, "type", typeof $scope.test);
    };

    $scope.endDateLimit = 90;

    $scope.showStartdate = function (ev) {
      console.log('rep name:', ev);
      $scope.test1 = false;
      $scope.reportName = ev.split(",")[2].trim();
      let temp$ = $scope.report_list.find(x => x.report_desc === $scope.reportName);
      if (temp$ && typeof temp$ == 'object') {
        $scope.endDateLimit = temp$['days'];
      }
      console.log('temp$', temp$, 'date limit', $scope.endDateLimit);
      if ($scope.reportName == "MDM" || $scope.reportName == "Data Dump") {
        $scope.test2 = true;
      } else {
        $scope.test2 = true;
      }
    };

    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      download("data:text/plain," + bstr, filename, "text/plain");
      // return new File([u8arr], filename, {type:mime});
    }

    $scope.download_GEFU = function () {
      var body = {
        GEFUFILEDOWNLOAD: [
          {
            leadId: $scope.report.lead_id,
          },
        ],
      };
      $scope.showLoader("Downloading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* GEFUFILEDOWNLOAD */**", res);
            if (res.data["GEFUFILEDOWNLOAD"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["GEFUFILEDOWNLOAD"][0].hasOwnProperty("data")) {
              if (res.data.GEFUFILEDOWNLOAD[0].data[0].response_type == "I") {
                var file = dataURLtoFile(
                  "data:text/plain;base64," +
                  res.data.GEFUFILEDOWNLOAD[0].data[0].response,
                  "GEFU file.txt"
                );
              }
              if (res.data.GEFUFILEDOWNLOAD[0].data[0].response_type == "E") {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message:
                    res.data.GEFUFILEDOWNLOAD[0].data[0].response_message,
                  actionLabel: ["Ok"],
                });
              }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    // $scope.download_All = function () {
    //   var body = {
    //     BULK_GEFU: [{}],
    //   };
    //   $scope.showLoader("Downloading.....");
    //   executeApi(newplatwareHeader, body, function (res) {
    //     $scope.$apply(function () {
    //       $scope.hideLoader();
    //       if (res.status == true) {
    //         console.log("**/* BULK_GEFU */**", res);
    //         if (res.data["BULK_GEFU"][0].hasOwnProperty("error")) {
    //           $scope.hideLoader();
    //           dmDialogueBox.alertBox({
    //             title: "Alert",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         } else if (res.data["BULK_GEFU"][0].hasOwnProperty("data")) {
    //           if (res.data.BULK_GEFU[0].data[0].response_type == "I") {
    //             var file = dataURLtoFile(
    //               "data:text/plain;base64," +
    //               res.data.BULK_GEFU[0].data[0].response,
    //               "GEFU file.txt"
    //             );
    //             $scope.download_reports_popup = false;
    //           }
    //           if (res.data.BULK_GEFU[0].data[0].response_type == "E") {
    //             dmDialogueBox.alertBox({
    //               title: "Alert",
    //               message: res.data.BULK_GEFU[0].data[0].response_message,
    //               actionLabel: ["Ok"],
    //             });
    //           }
    //         } else {
    //           $scope.hideLoader();
    //           dmDialogueBox.alertBox({
    //             title: "Message",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         }
    //       } else if (
    //         res.status == false &&
    //         res.errorCode == "PW-0002" &&
    //         res.serverCode == "528"
    //       ) {
    //         sessionStorage.clear();
    //         $location.path("/");
    //       } else {
    //         $scope.hideLoader();
    //         dmDialogueBox.alertBox({
    //           title: "Server Error",
    //           message: "Error Connecting to server..",
    //           actionLabel: ["Ok"],
    //         });
    //       }
    //     });
    //   });
    // };
    
    $scope.download_All = function (flag) {
      var body = {
        GEFU_DOWNLOAD_API: [{status:flag}],
      };
      $scope.showLoader("Downloading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* GEFU_DOWNLOAD_API */**", res);
            if (res.data["GEFU_DOWNLOAD_API"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["GEFU_DOWNLOAD_API"][0].hasOwnProperty("data")) {
              if (res.data.GEFU_DOWNLOAD_API[0].data[0].response_type == "I") {
                if( res.data.GEFU_DOWNLOAD_API[0].data[0].response && res.data.GEFU_DOWNLOAD_API[0].data[0].response.trim() !== "" ){
                  var file = dataURLtoFile(
                    "data:text/plain;base64," +
                    res.data.GEFU_DOWNLOAD_API[0].data[0].response,
                    "GEFU file.txt"
                  );
                  $scope.download_reports_popup = false;
                }else{
                  dmDialogueBox.alertBox({
                    title: "Alert",
                    message: res.data.GEFU_DOWNLOAD_API[0].data[0].response_message,
                    actionLabel: ["Ok"],
                  });
                }              
               
              }
              if (res.data.GEFU_DOWNLOAD_API[0].data[0].response_type == "E") {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: res.data.GEFU_DOWNLOAD_API[0].data[0].response_message,
                  actionLabel: ["Ok"],
                });
              }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };
    $scope.downloadSignAsZIPFail = function (imageData) {
      var zip = new JSZip();
      var img = zip.folder("Images");
      for (j = 0; j < imageData.length; j++) {
        var imagename =imageData[j].accNo + 'SIGN' + (j + 1)+"." +
        'webp';
        img.file(imagename, imageData[j].fcrText, { base64: true });
      }
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, 'FAILBULKSIGNATURE' + ".zip");
      });
    };

    $scope.download_All_Fail_Sign = function () {
      var body = {
        SPDOWNLOADBULKSIGNATUREFAILURE: [{}],
      };
      $scope.showLoader("Downloading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* SPDOWNLOADBULKSIGNATUREFAILURE */**", res);
            if (res.data["SPDOWNLOADBULKSIGNATUREFAILURE"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["SPDOWNLOADBULKSIGNATUREFAILURE"][0].hasOwnProperty("data")) {
                  $scope.signImageData = [];
                  // Step 1: Access the string value
                  const rawJsonString = res.data.SPDOWNLOADBULKSIGNATUREFAILURE[0].data[0];
                  if(rawJsonString !='N'){
                  // Step 2: Parse it into a real array
                  const parsedData = JSON.parse(rawJsonString);
                  for (i = 0;i <parsedData.length;i++) {
                    $scope.signImageData.push(parsedData[i]);
                  }   
                  if (
                    $scope.signImageData.length == parsedData.length
                  ) {
                    $scope.hideLoader();
                    $scope.downloadSignAsZIPFail($scope.signImageData); 
                  }
                  }else{
                    $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "No Data found...",
                actionLabel: ["Ok"],
              });
                  }
                        
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };
    $scope.downloadSignAsZIP = function (imageData) {
      var zip = new JSZip();
      var img = zip.folder("Images");
      for (j = 0; j < imageData.length; j++) {
        var imagename =imageData[j].accNo + 'SIGN' + (j + 1)+"." +
        'webp';
        img.file(imagename, imageData[j].fcrText, { base64: true });
      }
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, 'BULKSIGNATURE' + ".zip");
      });
    };
    $scope.download_All_Sign = function () {
      var body = {
        SPDOWNLOADBULKSIGNATURE: [{}],
      };
      $scope.showLoader("Downloading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* SPDOWNLOADBULKSIGNATURE */**", res);
            if (res.data["SPDOWNLOADBULKSIGNATURE"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["SPDOWNLOADBULKSIGNATURE"][0].hasOwnProperty("data")) {
                  $scope.signImageData = [];
                  // Step 1: Access the string value
                  const rawJsonString = res.data.SPDOWNLOADBULKSIGNATURE[0].data[0];
                  // Step 2: Parse it into a real array
                  const parsedData = JSON.parse(rawJsonString);
                  for (i = 0;i <parsedData.length;i++) {
                    $scope.signImageData.push(parsedData[i]);
                  }   
                  if (
                    $scope.signImageData.length == parsedData.length
                  ) {
                    $scope.hideLoader();
                    $scope.downloadSignAsZIP($scope.signImageData); 
                  }                        
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };
    // $scope.download_All = function (flag) {
    //   var body = {
    //     GEFU_DOWNLOAD_API: [{status:flag}],
    //   };
    //   $scope.showLoader("Downloading.....");
    //   executeApi(newplatwareHeader, body, function (res) {
    //     $scope.$apply(function () {
    //       $scope.hideLoader();
    //       if (res.status == true) {
    //         console.log("**/* GEFU_DOWNLOAD_API */**", res);
    //         if (res.data["GEFU_DOWNLOAD_API"][0].hasOwnProperty("error")) {
    //           $scope.hideLoader();
    //           dmDialogueBox.alertBox({
    //             title: "Alert",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         } else if (res.data["GEFU_DOWNLOAD_API"][0].hasOwnProperty("data")) {
    //           if (res.data.GEFU_DOWNLOAD_API[0].data[0].response_type == "I") {
    //             if( res.data.GEFU_DOWNLOAD_API[0].data[0].response && res.data.GEFU_DOWNLOAD_API[0].data[0].response.trim() !== "" ){
    //               var file = dataURLtoFile(
    //                 "data:text/plain;base64," +
    //                 res.data.GEFU_DOWNLOAD_API[0].data[0].response,
    //                 "GEFU file.txt"
    //               );
    //               $scope.download_reports_popup = false;
    //             }else{
    //               dmDialogueBox.alertBox({
    //                 title: "Alert",
    //                 message: res.data.GEFU_DOWNLOAD_API[0].data[0].response_message,
    //                 actionLabel: ["Ok"],
    //               });
    //             }              
               
    //           }
    //           if (res.data.GEFU_DOWNLOAD_API[0].data[0].response_type == "E") {
    //             dmDialogueBox.alertBox({
    //               title: "Alert",
    //               message: res.data.GEFU_DOWNLOAD_API[0].data[0].response_message,
    //               actionLabel: ["Ok"],
    //             });
    //           }
    //         } else {
    //           $scope.hideLoader();
    //           dmDialogueBox.alertBox({
    //             title: "Message",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         }
    //       } else if (
    //         res.status == false &&
    //         res.errorCode == "PW-0002" &&
    //         res.serverCode == "528"
    //       ) {
    //         sessionStorage.clear();
    //         $location.path("/");
    //       } else {
    //         $scope.hideLoader();
    //         dmDialogueBox.alertBox({
    //           title: "Server Error",
    //           message: "Error Connecting to server..",
    //           actionLabel: ["Ok"],
    //         });
    //       }
    //     });
    //   });
    // };
    // $scope.download_All_Sign = function (flag) {
    //   var body = {
    //     SIGN_DOWNLOAD_API: [{status:flag}],
    //   };
    //   $scope.showLoader("Downloading.....");
    //   executeApi(newplatwareHeader, body, function (res) {
    //     $scope.$apply(function () {
    //       $scope.hideLoader();
    //       if (res.status == true) {
    //         console.log("**/* SIGN_DOWNLOAD_API */**", res);
    //         if (res.data["SIGN_DOWNLOAD_API"][0].hasOwnProperty("error")) {
    //           $scope.hideLoader();
    //           dmDialogueBox.alertBox({
    //             title: "Alert",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         } else if (res.data["SIGN_DOWNLOAD_API"][0].hasOwnProperty("data")) {
    //           if (res.data.SIGN_DOWNLOAD_API[0].data[0].response_type == "I") {
    //             if( res.data.SIGN_DOWNLOAD_API[0].data[0].response && res.data.SIGN_DOWNLOAD_API[0].data[0].response.trim() !== "" ){
    //               var file = dataURLtoFile(
    //                 "data:text/plain;base64," +
    //                 res.data.SIGN_DOWNLOAD_API[0].data[0].response,
    //                 "GEFU file.txt"
    //               );
    //               $scope.download_reports_popup = false;
    //             }else{
    //               dmDialogueBox.alertBox({
    //                 title: "Alert",
    //                 message: res.data.SIGN_DOWNLOAD_API[0].data[0].response_message,
    //                 actionLabel: ["Ok"],
    //               });
    //             }              
               
    //           }
    //           if (res.data.SIGN_DOWNLOAD_API[0].data[0].response_type == "E") {
    //             dmDialogueBox.alertBox({
    //               title: "Alert",
    //               message: res.data.SIGN_DOWNLOAD_API[0].data[0].response_message,
    //               actionLabel: ["Ok"],
    //             });
    //           }
    //         } else {
    //           $scope.hideLoader();
    //           dmDialogueBox.alertBox({
    //             title: "Message",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         }
    //       } else if (
    //         res.status == false &&
    //         res.errorCode == "PW-0002" &&
    //         res.serverCode == "528"
    //       ) {
    //         sessionStorage.clear();
    //         $location.path("/");
    //       } else {
    //         $scope.hideLoader();
    //         dmDialogueBox.alertBox({
    //           title: "Server Error",
    //           message: "Error Connecting to server..",
    //           actionLabel: ["Ok"],
    //         });
    //       }
    //     });
    //   });
    // };
    $scope.download_All_SA_Individual = function () {
$scope.download_Individual_GEFU();
$scope.download_SA_GEFU();
    }
    $scope.download_Individual_GEFU = function () {
      var body = {
        BULK_GEFU_IND: [{}],
      };
      $scope.showLoader("Downloading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* BULK_GEFU_IND */**", res);
            if (res.data["BULK_GEFU_IND"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["BULK_GEFU_IND"][0].hasOwnProperty("data")) {
              if (res.data.BULK_GEFU_IND[0].data[0].response_type == "I") {
                var file = dataURLtoFile(
                  "data:text/plain;base64," +
                  res.data.BULK_GEFU_IND[0].data[0].response,
                  "GEFU_INDIVIDUAL file.txt"
                );
                $scope.download_reports_popup = false;
              }
              if (res.data.BULK_GEFU_IND[0].data[0].response_type == "E") {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: res.data.BULK_GEFU_IND[0].data[0].response_message,
                  actionLabel: ["Ok"],
                });
              }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };
    $scope.download_SA_GEFU = function () {
      var body = {
        BULK_GEFU_SA: [{}],
      };
      $scope.showLoader("Downloading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* BULK_GEFU_SA */**", res);
            if (res.data["BULK_GEFU_SA"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["BULK_GEFU_SA"][0].hasOwnProperty("data")) {
              if (res.data.BULK_GEFU_SA[0].data[0].response_type == "I") {
                var file = dataURLtoFile(
                  "data:text/plain;base64," +
                  res.data.BULK_GEFU_SA[0].data[0].response,
                  "GEFU_SAVING_AC file.txt"
                );
                $scope.download_reports_popup = false;
              }
              if (res.data.BULK_GEFU_SA[0].data[0].response_type == "E") {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: res.data.BULK_GEFU_SA[0].data[0].response_message,
                  actionLabel: ["Ok"],
                });
              }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
      
    $scope.download_GEFU_SA = function () {
      var body = {
        GEFUFILEDOWNLOADSA: [
          {
            leadId: $scope.report.lead_id,
          },
        ],
      };
      $scope.showLoader("Downloading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* GEFUFILEDOWNLOADSA */**", res);
            if (res.data["GEFUFILEDOWNLOADSA"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["GEFUFILEDOWNLOADSA"][0].hasOwnProperty("data")) {
              if (res.data.GEFUFILEDOWNLOADSA[0].data[0].response_type == "I") {
                var file = dataURLtoFile(
                  "data:text/plain;base64," +
                  res.data.GEFUFILEDOWNLOADSA[0].data[0].response,
                  "GEFU_SA file.txt"
                );
              }
              if (res.data.GEFUFILEDOWNLOADSA[0].data[0].response_type == "E") {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message:
                    res.data.GEFUFILEDOWNLOADSA[0].data[0].response_message,
                  actionLabel: ["Ok"],
                });
              }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    // $scope.testforUser = function (){
    //   $scope.user = {};
    //   console.log("user"+JSON.stringify($scope.user));
    // }
    $scope.disbledButton = function (obj) {
      var arr = Object.keys($scope.user);
      if (obj == "RESET") {
        if (arr.length <= 0) {
          return true;
        } else if (arr.length > 0) {
          for (var key in $scope.user) {
            if (!$scope.user[key]) {
              delete $scope.user[key];
              return;
            } else {
              document.getElementById("resetButton").style.backgroundColor =
                "#616161";
              return false;
            }
          }
        } else {
          document.getElementById("resetButton").style.backgroundColor =
            "#616161";
          return false;
        }
      } else {
        if (arr.length <= 0) {
          return true;
        } else if (arr.length > 0) {
          for (var key in $scope.user) {
            if (!$scope.user[key]) {
              delete $scope.user[key];
              return;
            } else {
              document.getElementById("searchbutton").style.backgroundColor =
                "#005192";
              return false;
            }
          }
        } else {
          document.getElementById("searchbutton").style.backgroundColor =
            "#005192";
          return false;
        }
      }
      // else{
      //   document.getElementById('button').style.backgroundColor='#005192 !important';
      //   return false;
      // }
    };

    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }

    $scope.download_sheets = function () {
      console.log("download");
      switch ($scope.report.report_name.split(",")[1]) {
        case ".xlsx":
          var string = prepareDwnldData.excelDatafor_Reports(
            $scope.report_column,
            $scope.reportColomn_Data
          );
          var wscols = [
            { width: 18 },
            { width: 18 },
            { width: 18 },
            { width: 18 },
            { width: 18 },
            { width: 18 },
            { width: 18 },
            { width: 18 },
            { width: 18 },
            { width: 18 },
            { width: 18 },
          ];
          var obj = {};
          obj.width = 18;
          wscols[51] = obj;
          wscols[52] = obj;
          wscols[16] = obj;
          wscols[147] = obj;
          wscols[30] = obj;
          wscols[34] = obj;
          wscols[33] = obj;
          wscols[15] = obj;
          wscols[30] = obj;
          wscols[29] = obj;
          wscols[31] = obj;
          wscols[142] = obj;
          wscols[159] = obj;
          wscols[118] = obj;

          var container = document.getElementById("example");
          container.innerHTML = string;
          var wb = XLSX.utils.table_to_book(
            document.getElementById("tableForExc"),
            { sheet: "Sheet JS", raw: true }
          );
          wb.Sheets["Sheet JS"]["!cols"] = wscols;
          var wbout = XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "binary",
          });
          saveAs(
            new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
            $scope.report.report_name.split(",")[2] + ".xlsx"
          );
          $scope.showTAble = false;
          $scope.download_reports_popup = false;
          $scope.report = {
            radioSelection: "REPORT",
          };
          break;
        case ".csv":
          var string = prepareDwnldData.csvData(
            $scope.report_column,
            $scope.reportColomn_Data
          );
          var anchor = document.createElement("a");
          anchor.style = "visibility:hidden";
          var hrefvalue =
            prepareDwnldData.uri.csv + prepareDwnldData.base64(string);
          anchor.download = $scope.report.report_name.split(",")[2] + ".csv";
          anchor.href = hrefvalue;
          anchor.click();
          $scope.download_reports_popup = false;
          $scope.report = {
            radioSelection: "REPORT",
          };
          break;
        case ".txt":
          var string = prepareDwnldData.textData(
            $scope.report_column,
            $scope.reportColomn_Data
          );
          var anchor = document.createElement("a");
          anchor.style = "visibility:hidden";
          var hrefvalue =
            prepareDwnldData.uri.csv + prepareDwnldData.base64(string);
          anchor.download = $scope.report.report_name.split(",")[2] + ".txt";
          anchor.href = hrefvalue;
          anchor.click();
          $scope.download_reports_popup = false;
          $scope.report = {
            radioSelection: "REPORT",
          };
          break;
      }
    };

    $scope.changeDate = function (dates) {
      var date = new Date(dates);
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var year = date.getFullYear();
      if (day < 10) {
        day = "0" + day;
      }

      if (month < 10) {
        month = "0" + month;
      }
      return year + "-" + month + "-" + day;
    };

    $scope.report_data = function () {
      var body = {
        spreportdatageneration: [
          {
            x_report_id: $scope.report.report_name.split(",")[0],
            x_start_date: $scope.changeDate($scope.report.Start_date),
            x_end_date: $scope.changeDate($scope.report.end_date),
            x_user_id: $scope.username,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* spreportdatageneration */**", res);
            if (res.data["spreportdatageneration"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spreportdatageneration"][0].hasOwnProperty("data")
            ) {
              if (res.data.spreportdatageneration[0].data.length == 0) {
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "No data found on the selected date range.",
                  actionLabel: ["Ok"],
                });
              } else {
                $scope.reportColomn_Data =
                  res.data.spreportdatageneration[0].data;
                $scope.download_sheets();
              }
            } else {
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };
    $scope.report_data1 = function () {
      var body = {
        SP_REPORT_DATA_GENERATION_PHYGITAL: [
          {
            x_report_id: $scope.report.report_name.split(",")[0],
            x_start_date: $scope.changeDate($scope.report.Start_date),
            x_end_date: $scope.changeDate($scope.report.end_date),
            x_user_id: $scope.username,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* SP_REPORT_DATA_GENERATION_PHYGITAL */**", res);
            if (res.data["SP_REPORT_DATA_GENERATION_PHYGITAL"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["SP_REPORT_DATA_GENERATION_PHYGITAL"][0].hasOwnProperty("data")
            ) {
              if (res.data.SP_REPORT_DATA_GENERATION_PHYGITAL[0].data.length == 0) {
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "No data found on the selected date range.",
                  actionLabel: ["Ok"],
                });
              } else {
                $scope.reportColomn_Data =
                  res.data.SP_REPORT_DATA_GENERATION_PHYGITAL[0].data;
                $scope.download_sheets();
              }
            } else {
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };
    $scope.resetAdvance = function () {
      $scope.user = {};
    };

    $scope.closeAdvanceBox = function () {
      $scope.user = {};
    };

    $scope.getReport_Column = function () {
      console.log("1---?");
      var body = {
        spreportcolumn: [
          {
            x_report_id: $scope.report.report_name.split(",")[0],
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* spreportcolumn */**", res);
            if (res.data["spreportcolumn"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spreportcolumn"][0].hasOwnProperty("data")) {
              $scope.report_column = res.data.spreportcolumn[0].data;
              if ($scope.reportConstitutionalType === "PHY_PARTNERSHIP") {
                $scope.report_data1();
              }
              else{
               $scope.report_data();
              }
              $scope.download_reports_popup = false;
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong.",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    $scope.getReport_list = function () {
      var body = {
        spreportlist: [
          {
            x_login_id: $scope.username,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* spreportlist */**", res);
            if (res.data["spreportlist"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spreportlist"][0].hasOwnProperty("data")) {
              $scope.report_list = res.data.spreportlist[0].data;
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Server Error",
                message: "Oop's Something went wrong.",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    $scope.getNewReport_list = function (type) {
      console.log("sending", type, $scope.username);
      var body = {
        spreportlistnew: [
          {
            x_login_id: $scope.username,
            x_lead_type: type,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            if (res.data["spreportlistnew"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spreportlistnew"][0].hasOwnProperty("data")) {
              $scope.report_list = res.data.spreportlistnew[0].data;
              console.log(
                "New Report list ->",
                res.data.spreportlistnew[0].data
              );
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Server Error",
                message: "Oop's Something went wrong.",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    $scope.goToScrutiny = function (data) {
      sessionStorage.setItem("GridData", JSON.stringify(data));
      var body = {
        spformresultcomp: [
          {
            x_queue_id: 11,
            x_source: data.x_lead_source,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* spformresultcomp */**", res);
            if (res.data["spformresultcomp"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spformresultcomp"][0].hasOwnProperty("data")) {
              $scope.webOnCardResponse = JSON.parse(
                res.data.spformresultcomp[0].data[0]
              );
              // console.log(
              //   "table heading" + JSON.stringify($scope.webOnCardResponse)
              // );
              QueueService.setQueueCarddata($scope.webOnCardResponse);
              $scope.getJsonDataForOV(data);
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    // $scope.closeGlobalsearch = function () {
    //   $scope.user = {};
    //    $scope.advancefadinOverlay = false;
    // };

    $scope.closeDataContainerDm = function () {
      $scope.user = {};
      $scope.showGridContainer = false;
    };

    $scope.backDataContainerDm = function () {
      $scope.user = {};
      $scope.advancefadinOverlay = true;
      $scope.showGridContainer = false;
    };

    // SERVICES CALL--------------------------------------------------------------

    // $scope.getHolderProductMap=function(data){
    //   var body = {
    //    "SPHOLDERSPRODUCTMAP" :[{
    //     x_queue_id: 11

    //      }]
    //      }
    //      //  $scope.showLoader('loading.....');
    //        executeApi(newplatwareHeader, body, function(res) {
    //            $scope.$apply(function() {
    //               // $scope.hideLoader();
    //                if(res.status==true){
    //                console.log('**/* SPHOLDERSPRODUCTMAP */**',res);
    //                if(res.data.SPHOLDERSPRODUCTMAP[0].error){
    //                 dmDialogueBox.alertBox({
    //                   title: 'Alert',
    //                   message: res.data.SPHOLDERSPRODUCTMAP[0].error.message,
    //                   actionLabel: ['Ok']
    //                  });
    //                }else{
    //                $location.path('/ScrutinyForm');
    //               }
    //               }
    //               else{
    //                 dmDialogueBox.alertBox({
    //                   title: 'Server Error',
    //                   message: 'Error Connecting to server..',
    //                   actionLabel: ['Ok']
    //                  });
    //               }
    //             })
    //     })
    // }

    // $scope.getRemarkHistory=function(data){
    //   var body = {
    //      "SPREMARKSHIST" :[{
    //          x_aof_id: data.x_lead_id,
    //          x_exception_id: "",
    //          x_member_id: ""

    //        }]
    //        }
    //          //$scope.showLoader('loading.....');
    //          executeApi(newplatwareHeader, body, function(res) {
    //              $scope.$apply(function() {
    //                 // $scope.hideLoader();
    //                  if(res.status==true){
    //                  console.log('**/* SPREMARKSHIST */**',res);
    //                  if(res.data.SPREMARKSHIST[0].error){
    //                   dmDialogueBox.alertBox({
    //                     title: 'Alert',
    //                     message: res.data.SPREMARKSHIST[0].error.message,
    //                     actionLabel: ['Ok']
    //                    });
    //                  }else{
    //                   QueueService.setRemarkHistory(res.data.SPREMARKSHIST[0].data[0].v_string_tab);
    //                   $scope.getHolderProductMap(data);
    //                  }
    //                 }
    //                 else{
    //                   dmDialogueBox.alertBox({
    //                     title: 'Server Error',
    //                     message: 'Error Connecting to server..',
    //                     actionLabel: ['Ok']
    //                    });
    //                 }
    //               })
    //       })
    //  }

    $scope.getJsonDataForOV = function (data) {
      var body = {
        SPGETEXCEPTIONQUEUELIST: [
          {
            x_aof_id: data.x_lead_id,
            x_queue_id: 11,
            x_login_id: $scope.username,
            x_system_role: $scope.loginServiceData[0].system_role,
            x_member_id: "",
            x_card_id: "",
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* SPGETEXCEPTIONQUEUELIST */**", res);
            if (
              res.data["SPGETEXCEPTIONQUEUELIST"][0].hasOwnProperty("error")
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["SPGETEXCEPTIONQUEUELIST"][0].hasOwnProperty("data")
            ) {
              QueueService.setRejectionQueue(
                res.data.SPGETEXCEPTIONQUEUELIST[0].data
              );
              QueueService.setQueueJSONData(
                res.data.SPGETEXCEPTIONQUEUELIST[0].data[0].OBJECT_DATA
              );
              $scope.JSONData = JSON.parse(
                res.data.SPGETEXCEPTIONQUEUELIST[0].data[0].OBJECT_DATA
              );
              console.log($scope.JSONData);
             //4july25 - change in functionality to open forms  
              if ($scope.JSONData.AOF_CP &&
                $scope.JSONData.AOF_CP.WORKFLOW_STATUS &&
                $scope.JSONData.AOF_CP.WORKFLOW_STATUS.SOURCE === 'PHY_PARTNERSHIP') {
              $location.path("/PartnershipForm");
            }else if($scope.JSONData.AOF_CP &&
              $scope.JSONData.AOF_CP.WORKFLOW_STATUS &&
              $scope.JSONData.AOF_CP.WORKFLOW_STATUS.SOURCE === 'COMPANY') {
            $location.path("/CompanyForm");
          }else if($scope.JSONData.AOF_INDI &&
            $scope.JSONData.AOF_INDI.WORKFLOW_STATUS &&
            $scope.JSONData.AOF_INDI.WORKFLOW_STATUS.SOURCE === 'INDIVIDUAL') {
          $location.path("/IndividualForm");
        }else if($scope.JSONData.AOF_SP &&
          $scope.JSONData.AOF_SP.WORKFLOW_STATUS &&
          $scope.JSONData.AOF_SP.WORKFLOW_STATUS.SOURCE === 'SOLECANTB') {
        $location.path("/ScrutinyForm");
      }
              // if ($scope.JSONData.hasOwnProperty("AOF_CP")) {
              //   $location.path("/CompanyForm");
              // } else if ($scope.JSONData.hasOwnProperty("AOF_SP")) {
              //   $location.path("/ScrutinyForm");
              // } else if ($scope.JSONData.hasOwnProperty("AOF_INDI")) {
              //   $location.path("/IndividualForm");
              // } 
              // else if ($scope.JSONData.hasOwnProperty("AOF_INDI")) {
                //   $location.path("/IndividualForm");
                // }
                // else if ($scope.JSONData.hasOwnProperty("AOF_INDI")) {
                //   $location.path("/IndividualForm");
                // }
              // else if ($scope.JSONData.hasOwnProperty("AOF_INDI")) {
                //   $location.path("/IndividualForm");
                // }
                // else if ($scope.JSONData.hasOwnProperty("AOF_INDI")) {
                //   $location.path("/PhyHUFIndividualForm");
                // }
                // else if ($scope.JSONData.hasOwnProperty("AOF_INDI")) {
                //   $location.path("/PhyHUFIndividualForm");
                // }
                // else if ($scope.JSONData.hasOwnProperty("AOF_INDI")) {
                //   $location.path("/PhyHUFIndividualForm");
                // }
                // else if ($scope.JSONData.hasOwnProperty("AOF_INDI")) {
                //   $location.path("/PhyHUFIndividualForm");
                // }
                // else if ($scope.JSONData.hasOwnProperty("AOF_INDI")) {
                //   $location.path("/PhyHUFIndividualForm");
                // }
                // else if ($scope.JSONData.hasOwnProperty("AOF_INDI")) {
                //   $location.path("/PhyHUFIndividualForm");
                // }
                // else if ($scope.JSONData.hasOwnProperty("AOF_INDI")) {
                //   $location.path("/PartnershipForm");
                // }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    $scope.submitAdvance = function () {
      sessionStorage.setItem("selectedQ", JSON.stringify({ queue_id: 11 }));
        // Object.keys($scope.user).forEach(item => {
        //   $scope.user[item] = $scope.user[item].toUpperCase()
        // })
        // console.log('model data:', $scope.user);
      var body = {
        SPSEARCHAOF: [
          {
            x_adv_scr_json: JSON.stringify($scope.user),
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* SPSEARCHAOF */**", res);
            if (res.data["SPSEARCHAOF"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["SPSEARCHAOF"][0].hasOwnProperty("data")) {
              $scope.advancefadinOverlay = false;
              $scope.showGridContainer = true;
              $scope.user = {};
              $scope.t_GridData = JSON.parse(
                res.data.SPSEARCHAOF[0].data[0].p_string_final
              );
              if ($scope.t_GridData.X_SEARCH_AOF[0].MESSAGE) {
                console.log($scope.t_GridData.X_SEARCH_AOF[0].MESSAGE);
                $scope.tabChildGridData = "";
              } else {
                $scope.tabChildGridData = $scope.t_GridData.X_SEARCH_AOF;
              }
              var tableHeading = "";
              if ($scope.queueD["OV_GRID"]) {
                var tableHeaderArr =
                  $scope.queueD["OV_GRID"][0]["GRID_ELEMENT_DFN"];
                for (var i = 0; i < tableHeaderArr.length; i++) {
                  if (tableHeading.length > 0) {
                    tableHeading =
                      tableHeading + "~" + tableHeaderArr[i]["column_label"];
                  } else {
                    tableHeading =
                      tableHeading + tableHeaderArr[i]["column_label"];
                  }
                }
              }
              //  QueueService.setQueueCarddata($scope.webOnCardResponse);
              //  QueueService.setQueueTableHeading($scope.webOnCardResponse['OV_GRID'][0]['GRID_ELEMENT']);
              $scope.tableConfig =
                $scope.queueD["OV_GRID"][0]["GRID_ELEMENT_DFN"];
                  var selectedGrid = JSON.parse(sessionStorage.getItem('GridData'));
var parsedjson =JSON.parse(res.data["SPSEARCHAOF"][0]['data'][0].p_string_final)
if(parsedjson['X_SEARCH_AOF'][0].X_LEAD_ID!==''|| parsedjson['X_SEARCH_AOF'][0].X_LEAD_ID!==null){
  //ETB 
  var body = {
    SPCHECKUCICNUMBER: [
        {
          x_aof_id: parsedjson['X_SEARCH_AOF'][0].X_LEAD_ID2,
        },
      ],
    };
    $scope.showLoader("Loading.....");
    executeApi(newplatwareHeader, body, function (res) {
      $scope.$apply(function () {
        if (res.status == true) {
          $scope.hideLoader();
          console.log("**/* SPCHECKUCICNUMBER */**", res);
          if (res.data["SPCHECKUCICNUMBER"][0].hasOwnProperty("error")) {
            dmDialogueBox.alertBox({
              title: "Alert",
              message: "Oop's Something went wrong",
              actionLabel: ["Ok"],
            });
          } else if (res.data["SPCHECKUCICNUMBER"][0].hasOwnProperty("data")) {
              // implement logic here to call spgetjson api
              if(res.data.SPCHECKUCICNUMBER[0].data[0].STATUS =='Y'){
                var body = {
                  "spgetjson": [{
                    x_aof_id:parsedjson['X_SEARCH_AOF'][0].X_LEAD_ID
                  }]
                }
                $scope.showLoader('Loading.....');
                executeApi(newplatwareHeader, body, function (res) {
                  $scope.$apply(async function () {
                    $scope.hideLoader();
                    if (res.status == true) {
                      console.log('**/* spgetjson */**', res);
                      if (res.data['spgetjson'][0].hasOwnProperty('error')) {
                        dmDialogueBox.alertBox({
                          title: 'Alert',
                          message: "Oop's Something went wrong",
                          actionLabel: ['Ok']
                        });
                      } else if (res.data['spgetjson'][0].hasOwnProperty('data')) {
                        QueueService.setQueueJSONData(res.data.spgetjson[0].data[0].OBJECT_DATA);
                        QueueService.setVKYCagent(res.data.spgetjson[0].data[0].AGENT_ID);
                        QueueService.setVKYCFinalstatus(res.data.spgetjson[0].data[0].VKYC_STATUS);
                        QueueService.setVKYCIP(res.data.spgetjson[0].data[0].IPV4?res.data.spgetjson[0].data[0].IPV4:'');
                        QueueService.setVKYCAGENTNAME(res.data.spgetjson[0].data[0].AGENT_ID);
                        QueueService.setVKYCAGENTID(res.data.spgetjson[0].data[0].AGENT_ID);
                        
                        QueueService.setVKYCGeotagging(res.data.spgetjson[0].data[0].GEO_LOCATION);
                        QueueService.setVKYCauditor(res.data.spgetjson[0].data[0].AUDITOR_ID);
                        // $scope.getFormConfiguration();
                      } else {
                        $scope.hideLoader();
                        dmDialogueBox.alertBox({
                          title: 'Message',
                          message: "Oop's Something went wrong",
                          actionLabel: ['Ok']
                        });
                      }
                    }
                    else if (res.status == false && res.errorCode == "PW-0002" && res.serverCode == "528") {
                      sessionStorage.clear();
                      $location.path('/');
                    } else {
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
           
          } else {
            $scope.hideLoader();
            dmDialogueBox.alertBox({
              title: "Message",
              message: "Oop's Something went wrong",
              actionLabel: ["Ok"],
            });
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
                
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    $scope.getLOVmaster = function () {
      var body = {
        SPGETLOVLIST: [{}],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* SPGETLOVLIST */**", res);
            if (res.data["SPGETLOVLIST"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["SPGETLOVLIST"][0].hasOwnProperty("data")) {
              sessionStorage.setItem(
                "LOVMaster",
                JSON.stringify(res.data.SPGETLOVLIST[0].data)
              );
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    $scope.goToCardView = function (queue) {
      var body = {
        spleadsummary2: [
          {
            x_queue_id: queue.queue_id,
            x_login_id: $scope.username,
            x_system_role: $scope.loginServiceData[0].system_role,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* spleadsummary2 */**", res);
            if (res.data["spleadsummary2"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spleadsummary2"][0].hasOwnProperty("data")) {
              $scope.queueLeadResponse = JSON.parse(
                res.data.spleadsummary2[0].data[0].v_string.value
              );
              $scope.data_cards = JSON.stringify(
                $scope.queueLeadResponse.X_LEAD_SUMMARY
              );
              QueueService.setCardView($scope.data_cards);
              //sessionStorage.setItem('Email_verify_leads',$scope.data_cards);
              $scope.getconfig_labels(queue);
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    $scope.getconfig_labels = function (queue) {
      var body = {
        spgridresultcomp: [
          {
            //  x_system_role : $scope.loginServiceData[0]['system_role'],
            x_queue_id: queue.queue_id,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* spgridresultcomp */**", res);
            if (res.data["spgridresultcomp"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spgridresultcomp"][0].hasOwnProperty("data")) {
              $scope.webOnCardResponse = JSON.parse(
                res.data.spgridresultcomp[0].data[0]
              );
              console.log("---------->>", $scope.webOnCardResponse);
              var tableHeading = "";
              if ($scope.webOnCardResponse["GRID_ELEMENT"]) {
                var tableHeaderArr = $scope.webOnCardResponse["GRID_ELEMENT"];
                for (var i = 0; i < tableHeaderArr.length; i++) {
                  if (tableHeading.length > 0) {
                    tableHeading =
                      tableHeading + "~" + tableHeaderArr[i]["COLUMN_LABEL"];
                  } else {
                    tableHeading =
                      tableHeading + tableHeaderArr[i]["COLUMN_LABEL"];
                  }
                }
              }
              QueueService.setQueueCarddata($scope.webOnCardResponse);
              QueueService.setQueueTableHeading(
                $scope.webOnCardResponse["GRID_ELEMENT"]
              );
              if (queue.queue_id == "12" || queue.queue_id == "15" || queue.queue_id == "16") {
                QueueService.setcardLabel($scope.webOnCardResponse["GRID_ELEMENT"]);
                $location.path("/cardView");
              } else {
                var t1 = performance.now();
                console.log(
                  "for bucket to grid data time taken" +
                  (t1 - $scope.t0) +
                  " milliseconds."
                );
                $location.path("/queueData");
              }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    //********************Queue Data ******************************* */
    $scope.selectQueue = function (queue) {
      sessionStorage.setItem("selectedQ", JSON.stringify(queue));
      $scope.t0 = performance.now();
      if (queue.queue_id == "12" || queue.queue_id == "15" || queue.queue_id == "16") {
        $scope.goToCardView(queue);
      } else if (queue.queue_id == "14") {
        $scope.getconfig_labels(queue);
      } else {
        $scope.getconfig_labels(queue);
      }
    };

    // *******************Queue Count Details************************
    // $scope.getQueueCount=function(){
    //   var body = {
    //     "userCountProcess": [{
    //         p_login_id :$scope.username
    //     }]
    //       }
    //        $scope.showLoader('Loading.....');
    //         executeApi(newplatwareHeader, body, function(res) {
    //           $scope.$apply(function() {
    //                 if(res.status==true){
    //                 $scope.hideLoader();
    //                   console.log('**/* userCountProcess */**',res);
    //                   if(res.data['userCountProcess'][0].hasOwnProperty('error')){
    //                     dmDialogueBox.alertBox({
    //                       title: 'Alert',
    //                       message: "Oop's Something went wrong",
    //                       actionLabel: ['Ok']
    //                      });
    //                    }else if(res.data['userCountProcess'][0].hasOwnProperty('data')){
    //                   $scope.queuesCount=JSON.parse(res.data.userCountProcess[0].data[0].json_data);
    //                 console.log("---------->>",$scope.queuesCount);
    //                   if($scope.queuesCount.hasOwnProperty('QUEUE_COUNT')){
    //                       $scope.queueCount=$scope.queuesCount['QUEUE_COUNT'];
    //                   }
    //               }
    //                 else{
    //                   $scope.hideLoader();
    //                   dmDialogueBox.alertBox({
    //                    title: 'Message',
    //                    message: "Oop's Something went wrong",
    //                    actionLabel: ['Ok']
    //                   });
    //                 }
    //             }else if(res.status==false && res.errorCode=="PW-0002" && res.serverCode=="528"){
    //               sessionStorage.clear();
    //               $location.path('/');
    //             }
    //               else {
    //                 $scope.hideLoader();
    //                 dmDialogueBox.alertBox({
    //                   title: 'Server Error',
    //                   message: 'Error Connecting to server..',
    //                   actionLabel: ['Ok']
    //                  });
    //                }
    //              })
    //      })
    //     }
    // *************************************************************************

    // *******************Queue Details*******************************************
    function dashboardQueue() {
      return new Promise((resolve) => {
        var body = {
          spgetuserqueuecomp: [
            {
              x_user_id: $scope.username,
            },
          ],
        };
        $scope.showLoader("Loading.....");
        executeApi(newplatwareHeader, body, function (res) {
          $scope.$apply(function () {
            if (res.status == true) {
              console.log("**/* spgetuserqueuecomp */**", res);
              if (res.data["spgetuserqueuecomp"][0].hasOwnProperty("error")) {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (
                res.data["spgetuserqueuecomp"][0].hasOwnProperty("data")
              ) {
                $scope.hideLoader();
                $scope.queueD = JSON.parse(
                  res.data.spgetuserqueuecomp[0].data[0].p_string
                );
                QueueService.setcardLabel($scope.queueD["EMAIL_GRID"]);
                console.log("---------->>", $scope.queueD);
                if ($scope.queueD.hasOwnProperty("USER_QUEUE")) {
                  $scope.queues = $scope.queueD["USER_QUEUE"];

                  $scope.QueueCount = [];
                  if (Array.isArray($scope.queues)) {
                    for (i = 0; i < $scope.queues.length; i++) {
                      var body = {
                        SPGETLEADCOUNT: [
                          {
                            p_login_id: $scope.username,
                            x_queue_id: $scope.queues[i].queue_id,
                          },
                        ],
                      };
                      $scope.showLoader("Loading....");
                      executeApi(newplatwareHeader, body, function (res) {
                        $scope.$apply(function () {
                          if (res.status == true) {
                            if (
                              res.data["SPGETLEADCOUNT"][0].hasOwnProperty(
                                "error"
                              )
                            ) {
                              $scope.hideLoader();
                              dmDialogueBox.alertBox({
                                title: "Alert",
                                message: "Oop's Something went wrong",
                                actionLabel: ["Ok"],
                              });
                            } else if (
                              res.data["SPGETLEADCOUNT"][0].hasOwnProperty(
                                "data"
                              )
                            ) {
                              $scope.QueueCount.push(
                                JSON.parse(
                                  res.data.SPGETLEADCOUNT[0].data[0].json_data
                                )
                              );
                              if (
                                $scope.QueueCount.length == $scope.queues.length
                              ) {
                                console.log($scope.QueueCount);
                                resolve($scope.QueueCount);
                                $scope.hideLoader();
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
                    }
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
            } else if (
              res.status == false &&
              res.errorCode == "PW-0002" &&
              res.serverCode == "528"
            ) {
              sessionStorage.clear();
              $location.path("/");
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
      });
    }
    // *************************************************************************

    // SERVICES CALL END------------------------------------------------------------------

    $scope.checkForActionDisable = function () {
      var isDisable = false;
      /* if ($scope.aofObj.currentAOFAccess !== 'w') {
      isDisable = true;
      return isDisable;
  }*/
      $scope.validateData = formValidityPrvdr.chkForFormValid(
        $scope.forms[$scope.currentForm.tab]
      );
      //console.log($scope.validateData);
      return $scope.validateData["isInvalid"];
    };

    // if(document.readyState === 'complete'){
    //   $scope.container = document.getElementById('example');
    // $scope.root = $scope.container.attachShadow({ mode: 'closed' });

    // }

    // document.ready(function(){
    //   $scope.container = document.getElementById('example');
    // $scope.root = $scope.container.attachShadow({ mode: 'closed' });
    // });

    $scope.returnString = function (arr) {
      let mastString = "";
      for (let letters of arr) {
        for (let letter of letters) {
          mastString += letter.toString().trim();
          // mastString += ",";
          if (letter !== letters[letters.length]) {
            mastString += ",";
          }
        }
        if (letters !== arr[arr.length - 1]) {
          mastString += "~";
        }
      }
      let str = mastString.substr(0, mastString.length - 1);
      let replaceStr = str.replace(/,~/g, "~");
      // console.log(replaceStr);
      $scope.sendExcelData(replaceStr);
      //TODO: add service call
    };

    $scope.Upload = function () {
      //Reference the FileUpload element.
      var fileUpload = document.getElementById("fileUpload");

      //Validate whether File is valid Excel file.
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
      if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof FileReader != "undefined") {
          var reader = new FileReader();

          //For Browsers other than IE.
          if (reader.readAsBinaryString) {
            reader.onload = function (e) {
              $scope.ProcessExcel(e.target.result);
            };
            reader.readAsBinaryString(fileUpload.files[0]);
          } else {
            //For IE Browser.
            reader.onload = function (e) {
              var data = "";
              var bytes = new Uint8Array(e.target.result);
              for (var i = 0; i < bytes.byteLength; i++) {
                data += String.fromCharCode(bytes[i]);
              }
              $scope.ProcessExcel(data);
            };
            reader.readAsArrayBuffer(fileUpload.files[0]);
          }
        } else {
          alert("This browser does not support HTML5.");
        }
      } else {
        alert("Please upload a valid Excel file.");
      }
    };

    $scope.ProcessExcel = function (data) {
      let mastArray = [];
      //Read the Excel File data. var
      workbook = XLSX.read(data, {
        type: "binary",
      }); //Fetch the name of First Sheet. var
      firstSheet = workbook.SheetNames[0]; //Read all rows from First Sheet into an JSON array. var
      excelRows = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[firstSheet]
      );
      for (const row of excelRows) $scope.getValues(row, mastArray);
      $scope.returnString(mastArray);
    };

    $scope.getValues = function (obj, mastArray) {
      var json = JSON.stringify(obj);
      var obj = JSON.parse(json);
      var values = Object.keys(obj).map(function (key) {
        return obj[key];
      });
      mastArray.push(values);
    };

    $scope.myCtrl = function ($scope) {
      $scope.exportData = function () {
        /* Changes by Abhinav */
        const data = [
          [
            "Customer ID",
            "Account Number",
            "Customer Name",
            "Email Id",
            "Mobile Number",
            "Pre-Approved Limit Amount (0)",
            "Pre-Approved Limit (N)",
            "Branch Name",
            "Branch Code",
            "Constitution",
            // "PAN Number",
          ],
        ];
        downloadAsExcel(
          data,
          `Sample Template-${new Date().toLocaleTimeString()}.xlsx`,
          "Sample Template"
        );
      };
    };

    $scope.sendExcelData = function (stringToBePassed) {
      var body = {
        spmdminsertintostagingnew: [
          {
            x_entityid: 1,
            x_orgid: "null",
            x_attributeid: "null",
            x_is_truncate: "null",
            x_valuestring: stringToBePassed,
            x_loginid: $scope.username,
          },
        ],
      };
      console.log(body);
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spmdminsertintostagingnew */**", res);
            if (
              res.data["spmdminsertintostagingnew"][0].hasOwnProperty("error")
            ) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spmdminsertintostagingnew"][0].hasOwnProperty("data")
            ) {
              console.log(res);
              let jsonObject = res.data.spmdminsertintostagingnew[0].data[0];
              $scope.myButton = false;
              let jsonParsed = JSON.parse(jsonObject);
              $scope.batchId = jsonParsed.batchNumber;
              let fail = jsonParsed.fail;
              let success = jsonParsed.success;
              console.log($scope.batchId, fail, success);
              $scope.correct = success;
              $scope.incorrect = fail;
              if (res.data["spmdminsertintostagingnew"][0].data[0] == "Y") {
                // $scope.user.comment = "";
                // $scope.showcomment = false;
                // $scope.comment_details();
              }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    $scope.downloadExcelData = function () {
      $scope.count++;
      var body = {
        stagelevelexceldata: [
          //TODO:Change name here and pass parameters
          {
            x_batch_id: "null",
          },
        ],
      };
      console.log(body);
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* stagelevelexceldata */**", res);
            if (res.data["stagelevelexceldata"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["stagelevelexceldata"][0].hasOwnProperty("data")
            ) {
              console.log(res);
              tempArr = [
                [
                  "Customer ID",
                  "Account Number",
                  "Customer Name",
                  "Email Id",
                  "Mobile Number",
                  "Pre-Approved Limit (N)",
                  "Pre-Approved Limit Amount (0)",
                  "Batch Id",
                  "Branch Name",
                  "Branch Code",
                  "Status",
                  "Error Comments",
                ],
              ];
              let obj = res.data.stagelevelexceldata[0].data;
              console.log(obj);
              // tempArr.push(extractKeys(obj[0]));
              if (obj.length === 0) {
                // alert("No Data present in staging, please upload Excel");
                $scope.myButton = true; //Disabled
                return;
              } else if (obj.length > 0) {
                // debugger;
                /* let result = confirm(
                  "There is data present is staging would you like to download the excel"
                ); */
                $scope.myButton = false; //Not disabled
                $scope.canSendSms = false;
                if ($scope.count === 1)
                  // console.log(result);
                  return;
                /* if (result) {
                  
                } else {
                  $scope.myButton = false; //Not disabled
                  $scope.canSendSms = false;
                  return;
                } */
              }
              tempArr.push(extractValues(obj));
              tempArr = tempArr.pop();
              console.log(tempArr);
              downloadAsExcel(
                tempArr,
                `Staging_Data${new Date().toLocaleTimeString()}.xlsx`,
                "Staging Data"
              );
              if (res.data["stagelevelexceldata"][0].data[0] == "Y") {
                // $scope.user.comment = "";
                // $scope.showcomment = false;
                // $scope.comment_details();
              }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    $scope.pushToMaster = function () {
      var body = {
        spinsertstgtomaster: [
          //TODO:Change name here and pass parameters
          {
            x_batch_id: "none",
          },
        ],
      };
      console.log(body);
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spinsertstgtomaster */**", res);
            if (res.data["spinsertstgtomaster"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spinsertstgtomaster"][0].hasOwnProperty("data")
            ) {
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Data moved to master...No Data present in staging",
                actionLabel: ["Ok"],
              });
              // alert();
              $scope.incorrect = 0;
              $scope.correct = 0;

              $scope.myButton = true; //Disabled
              $scope.canSendSms = false;
              //TODO: Write logic here
              if (res.data["spinsertstgtomaster"][0].data[0] == "Y") {
                // $scope.user.comment = "";
                // $scope.showcomment = false;
                // $scope.comment_details();
              }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    $scope.sendSms = function () {
      var body = {
        DLOD_SEND_SMS2: [
          //TODO:Change name here and pass parameters
          {},
        ],
      };
      console.log(body);
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* DLOD_SEND_SMS2 */**", res);
            if (res.data["DLOD_SEND_SMS2"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["DLOD_SEND_SMS2"][0].hasOwnProperty("data")) {
              console.log(res);
              dmDialogueBox.alertBox({
                title: "Message",
                message: "SMS sent succesfully!",
                actionLabel: ["Ok"],
              });
              // alert();
              //TODO: Write logic here
              if (res.data["DLOD_SEND_SMS2"][0].data[0] == "Y") {
                // $scope.user.comment = "";
                // $scope.showcomment = false;
                // $scope.comment_details();
              }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            sessionStorage.clear();
            $location.path("/");
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
    };

    angular.element(document).ready(function () {
      if (sessionStorage.getItem("userName") === "EXCEL1") {
        $scope.downloadExcelData();
      }
      // $scope.sendSms();
    });

    if (sessionStorage.getItem("userName") !== "EXCEL1") {
      //Not excel user

      $scope.init();
      console.log($scope.username);
      // debugger;
    } else {
      // debugger;
      //TODO:check whether this is  correct.
      console.log("Excel user");
      console.log(sessionStorage.getItem("userName"));
    }
  },
]);
// On finishing excel upload, we have to enable two buttons that are push to master and push to push to staging, after
// that we need to enable send sms

function downloadAsExcel(data, name, sheetName) {
  console.log(data);
  var wb = XLSX.utils.book_new();
  wb.Props = {
    Title: "Yes Bank",
    Subject: "Download Excel",
    Author: "Abhinav",
    CreatedDate: new Date(),
  };
  wb.SheetNames.push(sheetName);
  var ws = XLSX.utils.aoa_to_sheet(data);
  wb.Sheets[sheetName] = ws;
  var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), name);
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
  var view = new Uint8Array(buf); //create uint8array as viewer
  for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
  return buf;
}

function extractKeys(obj) {
  return Object.keys(obj);
}

function extractValues(arr) {
  for (let i = 0; i < arr.length; i++) {
    delete arr[i]["created_date"];
    delete arr[i]["loginid"];
    console.log(arr[i]);
    if (arr[i]["status"] === 2) {
      // delete
      arr[i]["status"] = "Invalid";
    } else if (arr[i]["status"] === 1) {
      arr[i]["status"] = "Valid";
    }
    tempArr.push(Object.values(arr[i]));
  }
  return tempArr;
}
