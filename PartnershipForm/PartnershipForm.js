var PartnershipFormModule = angular.module("myApp.PartnershipForm", []);						
						
PartnershipFormModule.controller("PartnershipFormCtrl", [						
  "$scope",
  "$rootScope",
  "$filter",
  "$http",
  "$timeout",
  "$location",
  "$q",
  "$window",
  "dmDialogueBox",
  "$sce",
  "QueueService",
  "formValidityPrvdr",
  function (
    $scope,
    $rootScope,
    $filter,
    $http,
    $timeout,
    $location,
    $q,
    $window,
    dmDialogueBox,
    $sce,
    QueueService
  ) {
    if (myGlobalRefresh_variable == true) {
      $location.path("/home");
    }

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

    $scope.init = function () {
      setTimeout(()=>{
        let element=document.getElementById('hamburgerClick')
        const menuItems = document.querySelectorAll("#menu a");
        menuItems.forEach(item => {
          item.addEventListener("click", function () {
            setTimeout(()=>{
              element.click();

            })
          });
        });
     },3000)
    //  $scope.callApiOnLoad(); 
      $scope.setTAB = false;
      $scope.setDATA = true;
      $scope.show_bo = true;
      $scope.excludedActionIdsOnMobile = ["GEFU","GEFU SA","Download",];
      $scope.show_bo_smo = true; 
      $scope.push_image = [{ AMLOCK: [], CRILC: [] }];
      $scope.count_for_image = 0;
      $scope["selectIt" + "1"] = true;
      $scope.leadFormData = {};
      $scope.user = {};
      $scope.reject = {};
      $scope.optionalField = {};
      $scope.gefuCheck = false;
      $scope.countForGefu = 0;
      $scope.stepFocus = 0;
      $scope.count = 0;
      $scope.IEC_Value_array=[];
      $scope.reassign_Popup = false;
      $scope.errorMSG = false;
      $scope.showAuditTrail = false;
      $scope.tabJSONObj = [];
      $scope.tabJSONObj.counter = 0;
      $scope.isReadonly = true;
      $scope.LOVradioCheckbox = JSON.parse(sessionStorage.getItem("LOVMaster"));
      $scope.ovCardData = QueueService.getQueueCardData();
      $scope.tableConfig = QueueService.getQueueTableHeading();
      $scope.selectedQ = JSON.parse(sessionStorage.getItem("selectedQ"));
      localStorage.setItem("selectedQ", JSON.stringify($scope.selectedQ));
      $scope.loginServiceData = JSON.parse(
        sessionStorage.getItem("usersession")
      );
      localStorage.setItem(
        "usersession",
        JSON.stringify($scope.loginServiceData)
      );
      $scope.username = sessionStorage.getItem("userName");
      localStorage.setItem("username", $scope.username);
      $scope.selectedGrid = JSON.parse(sessionStorage.getItem("GridData"));
      localStorage.setItem("gridData", JSON.stringify($scope.selectedGrid));
      $scope.GetJSONData = JSON.parse(QueueService.getQueueJSONData());
      $scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE.forEach((x, index) => {
        x.json_index = index;
      });
      // console.log("$scope.GetJSONData " + JSON.stringify($scope.GetJSONData));
      $scope.myFilter();
      // $scope.cinApi = $scope.GetJSONData.AOF_CP.ENTITY_DATA.BOARD_RESOL_DATE; // hiding CIN 19sept2025
      //$scope.radioButton = $scope.GetJSONData.AOF_CP.ENTITY_DATA.LIST_DIRECTUPDATED.VALUE
      if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.LIST_DIRECTUPDATED)
        $scope.someClass = [
          {
            name: "Yes",
            value: "Yes",
            checked:
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.LIST_DIRECTUPDATED.VALUE,
          },
          {
            name: "No",
            value: "No",
            checked:
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.LIST_DIRECTUPDATED.VALUE,
          },
        ];
      else
        $scope.someClass = [
          {
            name: "Yes",
            value: "Yes",
            checked:
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.LLP.LIST_DIRECTUPDATED
                .VALUE,
          },
          {
            name: "No",
            value: "No",
            checked:
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.LLP.LIST_DIRECTUPDATED
                .VALUE,
          },
        ];
      if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.ADD_BO_DETAIL)
        $scope.someClass1 = [
          {
            name: "Yes",
            value: "Yes",
            checked: $scope.GetJSONData.AOF_CP.ENTITY_DATA.ADD_BO_DETAIL.VALUE,
          },
          {
            name: "No",
            value: "No",
            checked: $scope.GetJSONData.AOF_CP.ENTITY_DATA.ADD_BO_DETAIL.VALUE,
          },
        ];
      else
        $scope.someClass1 = [
          { name: "Yes", value: "Yes", checked: "No" },
          { name: "No", value: "No", checked: "No" },
        ];
        if($scope.GetJSONData.AOF_CP.ENTITY_DATA.TAX_COMP_PUB_TRADE)
        $scope.someClass2 = [
          {
            name:"YES",
            value:"YES",
            checked: $scope.GetJSONData.AOF_CP.ENTITY_DATA.TAX_COMP_PUB_TRADE.VALUE
          },
          {
            name: "NO",
            value: "NO",
            checked: $scope.GetJSONData.AOF_CP.ENTITY_DATA.TAX_COMP_PUB_TRADE.VALUE,
          },
        ]
        else
        $scope.someClass2 = [
          { name: "YES", value: "YES", checked: "NO" },
          { name: "NO", value: "NO", checked: "NO" },
        ];
        if($scope.GetJSONData.AOF_CP.ENTITY_DATA.TAX_IS_CPTN_ENT_RELAT_PUB_TRAD_COM)
        $scope.someClass3 = [
          {
            name:"YES",
            value:"YES",
            checked: $scope.GetJSONData.AOF_CP.ENTITY_DATA.TAX_IS_CPTN_ENT_RELAT_PUB_TRAD_COM.VALUE
          },
          {
            name: "NO",
            value: "NO",
            checked: $scope.GetJSONData.AOF_CP.ENTITY_DATA.TAX_IS_CPTN_ENT_RELAT_PUB_TRAD_COM.VALUE,
          },
        ]
        else
        $scope.someClass3 = [
          { name: "YES", value: "YES", checked: "NO" },
          { name: "NO", value: "NO", checked: "NO" },
        ];
      $scope.list_OF_documents();
      $scope.openPopupcheckConfirm = false;
      var hash = window.location.href.split("#")[1];
      localStorage.setItem("HashUrl", hash);
       //CUSTOMER ID Field 
       if($scope.selectedQ["queue_id"] == 100 ){
        $scope.CustID_button_status_div =true;
        }else{
          $scope.CustID_button_status_div =false;
        }
      $scope.checklist = [
        { id: "list1", value: "(a) All Correct KYC documents are uploaded." },
        {
          id: "list2",
          value: "(b) Images uploaded are clear, readable and acceptable.",
        },
        {
          id: "list3",
          value: "(c) Product fitment & profile of the customer is acceptable.",
        },
        {
          id: "list4",
          value:
            "(d) Site verification of the customer has been correctly done.",
        },
        {
          id: "list5",
          value:
            "(e) Establishment image captured by the sourcing RM is acceptable.",
        },
      ];
      $scope.check = [];
      $scope.getFunctionChecked = function (val) {
        if ($scope.check.length > 0) {
          if ($scope.check.includes(val)) {
            $scope.check.splice($scope.check.indexOf(val), 1);
          } else {
            $scope.check.push(val);
          }
        } else {
          $scope.check.push(val);
        }
      };

      // $scope.RejectionQueueData=QueueService.getRejectionQueue();
      $scope.SUB_TABName = [
        { id: 50, name: "AMLOCK", openSection: true },
        { id: 51, name: "CRILC", openSection: false },
        { id: 3, name: "Credit Facility", openSection: false },
        { id: 4, name: "CIBIL Pdf", openSection: false },
      ];
      $scope.Credit_TABName = [
        { id: 1, name: "Credit facility", openSection: true },
        { id: 51, name: "Collection CA", openSection: false },
        { id: 3, name: "Eligible Account", openSection: false },
      ];
      $scope.SUB_BOTAB = [
        { id: 1, name: "BO Identification", openSection: true },
        // { id: 2, name: "Director list from CIN API ", openSection: false },
        {id:3, name: "Senior Managing Official ", openSection:false},
      ];
      $scope.SUB_TABStake = [
        { id: 1, name: "StakeHolders", openSection: false },
        { id: 2, name: "Field list", openSection: true },
      ];
      $scope.getDocumentsQueueList();
      $scope.FOs_list();
      $scope.getFormFieldPerTab({ form_id: "80" });
      $scope.currentFormSections = [];
      $scope.get_all_rejection_summary();
      $scope.image_upload_length();
      $scope.AMLOCK_CRILC = {};
      $scope.openPopup = false;
      $scope.cibil_pdf_url = "";
      $scope.cibil_pdf_status = false;
      $scope.cibil_pdf_filename = "";
      $scope.cibil_pdf_docname = "";
      $scope.cibil_pdf_array = [];
      $scope.statusSVR = false;
      $scope.kyc_review_date = new Date();
      $scope.setSVROptions();
      $scope.getDeclarationByLead();
      $scope.$watch(function ($scope) {
       let promoCodeChangeCount=0;
        if(promoCodeChangeCount < 1){   
          document.querySelectorAll('[id="Tracking Code (Promo Code I)"]').forEach(element=> 
            {         
        if(element){
          console.log('PRINT BLIND');
          promoCodeChangeCount++;
         let transection_limit_value = $scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.transaction_limit
           console.log("206",transection_limit_value)
          for(let front=0;front < parseInt($scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.promo_code1_front); front++){
            transection_limit_value= " " + transection_limit_value;
           console.log("209",transection_limit_value)
           element.value =transection_limit_value;
          }
          for(let end=0;end < parseInt($scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.promo_code1_end); end++){
            transection_limit_value=transection_limit_value + " ";
           console.log("214",transection_limit_value)
           element.value =transection_limit_value;
          }      
        }
      }
        );  
        document.querySelectorAll('[id="Billing Code (Promo Code II)"]').forEach(element=> 
          { 
      if(element){
          console.log('PRINT BLIND-2');
          promoCodeChangeCount++;
          let billing_code_value = $scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.BIILING_CODE
           console.log("223",billing_code_value)
          for(let front=0;front < parseInt($scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.promo_code2_front); front++){
            billing_code_value= " " + billing_code_value;
           console.log("226",billing_code_value)
           element.value =billing_code_value;
          }
          for(let end=0;end < parseInt($scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.promo_code2_end); end++){
            billing_code_value=billing_code_value + " ";
           console.log("231",billing_code_value)
           element.value =billing_code_value;
          }
        }
           });
      
      }
        if ($scope.form) {
          if ($scope.form[0].form_id == "88") {
            // console.log('watcher', document.getElementById($scope.declaration_content));
            document.querySelectorAll(`[id="${$scope.declaration_content}"]`).forEach(element=> 
              { 
                if (element) {
                  element.checked = true;
                  if ($scope.declaration_ID === '14') {
                    let bank_name = $scope.GetJSONData.AOF_CP.ENTITY_DATA.CREDIT_FACILITY.ESCROW_BANK_NAME;
                    $scope.declaration_content = $scope.declaration_content.replace('###', bank_name);
                    $scope.optionalField['LOVY_DOPS_DECL'][0].VALUE = $scope.declaration_content;
                  }
                  if ($scope.declaration_ID === '15') {
                    let account_no = $scope.GetJSONData.AOF_CP.ENTITY_DATA.CREDIT_FACILITY.ESCROW_ACCOUNT_NO;
                    let account_name = $scope.GetJSONData.AOF_CP.ENTITY_DATA.CREDIT_FACILITY.ESCROW_ACCOUNT_NAME;
                    $scope.declaration_content = $scope.declaration_content.replace('###', account_name);
                    $scope.declaration_content = $scope.declaration_content.replace('####', account_no);
                    $scope.optionalField['LOVY_DOPS_DECL'][0].VALUE = $scope.declaration_content;
                  }
                }
              });
         
            return true;
          } else if($scope.form[0].form_id == "82"){
            if($scope.GetJSONData.AOF_CP.ENTITY_DATA.BUSS_IMP_EXP.length >=1){
              $scope.IECvalue =$scope.GetJSONData.AOF_CP.ENTITY_DATA.BUSS_IMP_EXP;
              for(let i=0;i<$scope.IECvalue.length;i++){
                let valueIECdetails = null;

        // Check for .value or .VALUE and assign accordingly
        if ($scope.IECvalue[i].value && $scope.IECvalue[i].VALUE) {
            valueIECdetails = $scope.IECvalue[i].value; // Choose one if both are present
        } else if ($scope.IECvalue[i].value) {
            valueIECdetails = $scope.IECvalue[i].value;
        } else if ($scope.IECvalue[i].VALUE) {
            valueIECdetails = $scope.IECvalue[i].VALUE;
        }

              //  let valueIECdetails=$scope.IECvalue[i].VALUE;
               $scope.IEC_Value_array.push(valueIECdetails);
             
               let IEC_NAMES = $scope.IEC_Value_array.map( (item) => item);
               let unique = [...new Set(IEC_NAMES)];
               let numbersToString =unique.join(" , ");
               document.querySelectorAll('[id="Do you engage in imports or exports of any kind?"]').forEach(element=> 
                { 
                  if (element) {
                    element.value = numbersToString ;
                  }});
              }
            
          }
          return true;
          } 
//instant MSME phase 2 implementation
else if($scope.selectedQ["queue_id"]=='11'&&$scope.form[0].form_id=='85' && ($scope.loginServiceData[0].system_role=="DVUM" || $scope.loginServiceData[0].system_role=="DVUC")){
  $scope.shouldDisableCheckbox = function(optionValue) {
    return optionValue !== 'abc';
};
    return true;
}
else if($scope.form[0].form_id=='85' && ($scope.loginServiceData[0].system_role=="DVUM" || $scope.loginServiceData[0].system_role=="DVUC")){
  $scope.shouldDisableCheckbox = function(optionValue) {
    return optionValue !== 'Default Value';
};
  return true
}else if($scope.form[0].form_id!=='85'&&($scope.loginServiceData[0].system_role!=="DVUM" || $scope.loginServiceData[0].system_role!=="DVUC")){
  $scope.shouldDisableCheckbox = function(optionValue) {
    return optionValue !== 'Default Value';
};
    return true;
}
else if($scope.form[0].form_id=='85'&&($scope.loginServiceData[0].system_role!=="DVUM" || $scope.loginServiceData[0].system_role!=="DVUC")){
  $scope.shouldDisableCheckbox = function(optionValue) {
    return optionValue !== 'abc';
};
    return true;
}
  else{
    return false;
  } 

        }
      }, function ($scope) {
        console.log('declaration content', $scope);
      });

     
    };
 // Function to detect if the device is mobile
 $scope.isMobileDevice = function() {
  return /iPhone|iPad|iPod|Android/i.test($window.navigator.userAgent);
};
// Custom filter function to exclude actions based on device type
$scope.excludeActions = function(btn) {
  if ($scope.isMobileDevice()) {
    return !$scope.excludedActionIdsOnMobile.includes(btn.ACTION_NAME);
  }
  return true; // Include all actions when not on mobile
};
      // Instant MSME phase 2
      $scope.checkboxChanged = function(checked) {
        // Make the API call here
        if (checked) {
          // Checkbox is checked
          console.log('Checkbox is checked');
          

            var body={
              SPMSMEDEFAULTVALUEUPDATE: [
          {
            x_lead_id:$scope.selectedGrid.x_lead_id,
            x_defualt_value:"Y",
            x_constitution:"PHY_PARTNERSHIP" ,
            x_pan_no:$scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[$scope.stakeholder_INDEX].BO.PAN_NUMBER,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("Req body: ", body, "**/* SPMSMEDEFAULTVALUEUPDATE */**", res);
            if (res.data["SPMSMEDEFAULTVALUEUPDATE"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["SPMSMEDEFAULTVALUEUPDATE"][0].hasOwnProperty("data")) {
              console.log(res);
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
      } else {
          // Checkbox is unchecked
          console.log('Checkbox is unchecked');
      
       var body={
        SPMSMEDEFAULTVALUEUPDATE: [
          {
            x_lead_id:$scope.selectedGrid.x_lead_id,
            x_defualt_value:"N",
            x_constitution:"PHY_PARTNERSHIP" ,
            x_pan_no:$scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[$scope.stakeholder_INDEX].BO.PAN_NUMBER,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("Req body: ", body, "**/* SPMSMEDEFAULTVALUEUPDATE */**", res);
            if (res.data["SPMSMEDEFAULTVALUEUPDATE"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["SPMSMEDEFAULTVALUEUPDATE"][0].hasOwnProperty("data")) {
              console.log(res);
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

    $scope.callMSMEValue=function(){
      var body={
        SPGETMSMEDEFAULTVALUE: [
          {
            x_lead_id:$scope.selectedGrid.x_lead_id,
            x_constitution:"PHY_PARTNERSHIP" ,
            x_pan_no:$scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[$scope.stakeholder_INDEX].BO.PAN_NUMBER?$scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[$scope.stakeholder_INDEX].BO.PAN_NUMBER:'',
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("Req body: ", body, "**/* SPGETMSMEDEFAULTVALUE */**", res);
            if (res.data["SPGETMSMEDEFAULTVALUE"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["SPGETMSMEDEFAULTVALUE"][0].hasOwnProperty("data")) {
              console.log(res);
              $scope.UpdateMSMECheckbox=res.data["SPGETMSMEDEFAULTVALUE"][0].data[0].STATUS
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

    $scope.getCardParamValue = function (param, card) {
      console.log('|' + param + '|', 'card', card);
      let keyValue = {
        "Rejection Reason": "REJECTION_REASON",
        "Category": "CATEGORY",
        "Sub-Category": "SUBCATEGORY",
        "Rejection  ID": "REJECTION_ID",
        "Raised By": "RAISED_BY",
        "Raised On": "RAISED_ON",
        "Queue Desc": "QUEUE_DESC",
        "Rejection Status": "STATUS",
        "Rejection Remarks": "REJECTION_REMARKS",
        "Resolved By": "RESOLVED_BY",
        "Modified On": "MODIFIED_ON",
        "Approved by": "APPROVED_BY",
        "RM Remarks": "RM_REMARKS"
      }
      let key = keyValue[param];
      console.log('key', key);
      return card[key];
    };

    $scope.getReviewKYCDate = function () {
      var body = {
        spgetreviewdate: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("Req body: ", body, "**/* spgetreviewdate */**", res);
            if (res.data["spgetreviewdate"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spgetreviewdate"][0].hasOwnProperty("data")) {
              if (res.data.spgetreviewdate[0].data[0].hasOwnProperty('REVIEW_DATE')) {
                $scope.kyc_review_date = res.data.spgetreviewdate[0].data[0].REVIEW_DATE;
              } else {
                $scope.kyc_review_date = "";
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Review date is empty",
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
    $scope.checkForAmlockRejection = function () {
      var check = $scope.RejectionQueueData.map((x) => x.REJECTION_ID).filter(
        (x) => x == "RAJ281" || x == "RAJ282"
      );
      console.log("check: ", check);
      if (check.length > 0) {
        return true;
      } else {
        return false;
      }
    };

    // CIBIL PDF functions

    $scope.sendCIBIL_Pdf_onMail = function () {
      var body = {
        UPLOADPDFTOBLOB: [
          {
            userId: $scope.username,
            leadId: $scope.selectedGrid.x_lead_id2,
            docType: "pdf",
            base64String: "12345",
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("Req body: ", body, "**/* UPLOADPDFTOBLOB */**", res);
            if (res.data["UPLOADPDFTOBLOB"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["UPLOADPDFTOBLOB"][0].hasOwnProperty("data")) {
              console.log(res);
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
    omit_special_char=function(event) {
      var k;
      k = event.charCode; //         k = event.keyCode;  (Both can be used)
      return (
        (k > 64 && k < 91) ||
        (k > 96 && k < 123) ||
        k == 8 ||
        k == 32 ||
        (k >= 48 && k <= 57)
      );
    }
    $scope.uploadDocAndConvert = function () {
      document.querySelectorAll('[id="cibil_file"]').forEach(element=> 
        { 
          if (element) {
            var file = element.files[0];    
      console.log(file);
      if (file) {
        const originalFileName = file.name.split('.pdf')[0];
        if (file.type == "application/pdf") {
          var fileReader = new FileReader();
          var base64;
          // Onload of file read the file content
          fileReader.onload = function (fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            // Print data in console
            base64 = base64.split("base64,")[1];
            // console.log(base64);
            $scope.uploadCIBIL_PDF(base64, originalFileName);
          };
          // Convert data to base64
          fileReader.readAsDataURL(file);
        } else {
          $scope.hideLoader();
          dmDialogueBox.alertBox({
            title: "Message",
            message: "Only PDF document is allowed",
            actionLabel: ["Ok"],
          });
        }
      }
    }});
    };

    $scope.decodeBase64ToPdf = function (index) {
      console.log('index ', index);
      if (index == 0 || index == 1) {
        $scope.cibil_pdf_url = $scope.cibil_pdf_array[index].x_base64;
        $scope.cibil_pdf_docname = $scope.cibil_pdf_array[index].actual_file_name;
        var link = document.createElement("a");
        link.href = "data:application/pdf;base64," + $scope.cibil_pdf_url;
        link.download = $scope.cibil_pdf_docname.split(".")[0];
        link.click();
      }
    };

    $scope.getUpdateAMLOCK_CRILC = function (data, value) {
      if (data == "AMLOCK") {
        sessionStorage.setItem("AMLOCK", value);
      } else {
        sessionStorage.setItem("CRILC", value);
      }
    };

    

    $scope.uploadCIBIL_PDF = function (base64, originalFileName) {
      var body = {
        spuploadPdfAsBase64: [
          {
            x_userid: $scope.username,
            x_doctype: "pdf",
            x_leadid: $scope.selectedGrid.x_lead_id2,
            x_base64string: base64,
            x_actual_file_name: originalFileName
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            console.log(
              "Req body: ",
              body,
              "**/* spuploadPdfAsBase64 */**",
              res
            );
            if (res.data["spuploadPdfAsBase64"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spuploadPdfAsBase64"][0].hasOwnProperty("data")
            ) {
              document.querySelectorAll('[id="cibil_file"]').forEach(element=> 
                { 
                  if (element) {
                    element.value="";
                  }});
              // document.getElementById("cibil_file").value = "";
              console.log(res);
              if (res.data["spuploadPdfAsBase64"][0].data[0].Status == "Y") {
                $scope.getCIBIL_PDF_Status();
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Document uploaded successfully",
                  actionLabel: ["Ok"],
                });
              } else if (res.data["spuploadPdfAsBase64"][0].data[0].Status == "D") {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Duplicate document cannot be uploaded",
                  actionLabel: ["Ok"],
                });
              } else if (res.data["spuploadPdfAsBase64"][0].data[0].Status == "N") {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Please delete previously uploaded document",
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

    $scope.deleteCIBIL_PDF = function (index) {
      if (index == 0 || index == 1) {
        $scope.cibil_pdf_filename = $scope.cibil_pdf_array[index].fileName;
      }
      var body = {
        spsetblobimagestatus: [
          {
            x_file_name: $scope.cibil_pdf_filename,
            x_lead_id: $scope.selectedGrid.x_lead_id2,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log(
              "Req body: ",
              body,
              "**/* spsetblobimagestatus */**",
              res
            );
            if (res.data["spsetblobimagestatus"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spsetblobimagestatus"][0].hasOwnProperty("data")
            ) {
              console.log(res);
              if (
                res.data["spsetblobimagestatus"][0].data[0].STATUS == "Success"
              ) {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Document deleted successfully",
                  actionLabel: ["Ok"],
                });
              }
              $scope.getCIBIL_PDF_Status();
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

    $scope.getCIBIL_PDF_Status = function () {
      var body = {
        spgetblobimagestatus: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id2,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            if (res.data["spgetblobimagestatus"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spgetblobimagestatus"][0].hasOwnProperty("data")
            ) {
              console.log(res);
              if (
                res.data["spgetblobimagestatus"][0].data[0].hasOwnProperty('Object')
              ) {
                const cibilArray = JSON.parse(res.data["spgetblobimagestatus"][0].data[0].Object);
                $scope.cibil_pdf_array = cibilArray;
                if ($scope.cibil_pdf_array.length > 0) {
                  $scope.cibil_pdf_status = true;
                } else {
                  $scope.cibil_pdf_status = false;
                }
                // $scope.cibil_pdf_filename = res.data["spgetblobimagestatus"][0].data[0].fileName;
                // $scope.cibil_pdf_docname = res.data["spgetblobimagestatus"][0].data[0].actual_file_name + '.pdf';
                // $scope.cibil_pdf_url = res.data["spgetblobimagestatus"][0].data[0].x_base64;
              } else {
                $scope.cibil_pdf_status = false;
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

    // CIBIL PDF functions

    $scope.disableRejections = function (rejID) {
      // if ($scope.form[0].form_id == "81") {
      //   if (rejID == 'RAJ166') {
      //     if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.ENTITY_ADD_SELECT.CODE == "3" &&
      //       $scope.GetJSONData.AOF_CP.ENTITY_DATA.COMM_ADD_PROOF_DOC.hasOwnProperty('CODE') &&
      //       !["23", "24", "25", "26"].includes($scope.GetJSONData.AOF_CP.ENTITY_DATA.COMM_ADD_PROOF_DOC.CODE)) {
      //       return false;
      //     } else {
      //       return true;
      //     }
      //   }
      // }

      // if ($scope.form[0].form_id == "81" && $scope.statusSVR) {
      //   if (rejID == 'RAJ233') {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }

      // if ($scope.form[0].form_id == "88") {
      //   if (rejID == 'RAJ390') {
      //     if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.CREDIT_FACILITY.ACCOUNT_ELIGIBLE.VALUE == "Collection CA") {
      //       return false;
      //     } else {
      //       return true;
      //     }
      //   } else {
      //     return false;
      //   }
      // }
      if ($scope.form[0].form_id == "91") {
      // if ($scope.form[0].form_id == "91" && $scope.statusSVR) {
        // if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.SVR.hasOwnProperty('VISITING_CARD')) {
        //   if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.SVR.VISITING_CARD.VALUE == 'No'
        //   && rejID == 'RAJ287') {
        //     return true;
        //   }
        // }

        // if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.SVR.hasOwnProperty('BUSS_ACTIVITY')) {
        //   if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.SVR.BUSS_ACTIVITY.VALUE == 'No'
        //   && rejID == 'RAJ286') {
        //     return true;
        //   }
        // }

        // if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.SVR.hasOwnProperty('AUS_MET')) {
        //   if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.SVR.AUS_MET.VALUE == 'No'
        //   && rejID == 'RAJ285') {
        //     return true;
        //   }
        // }

        if ($scope.rejectionIds.includes(rejID)) {
          return true;
        }else{
          return false;
        }

      }

      // if ($scope.form[0].form_id == "91" && !$scope.statusSVR) {
      //   return true;
      // }
    };
//23Oct25 - same pan linked with aadhaar
    $scope.DOPSPANLINKAADHAARSTATUS = function (type) {
      if(type =='stake'){
             INDEX = $scope.stakeholder_INDEX
           }
     
     var body = {
       SPDOPSPANLINKAADHAARSTATUS: [
         {
           x_lead_id: $scope.selectedGrid.x_lead_id,
           x_constitution: 'PHY_PARTNERSHIP',
           x_din_number:$scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[INDEX]?.din
         },
       ],
     };
     $scope.showLoader("Loading.....");
     executeApi(newplatwareHeader, body, function (res) {
       $scope.$apply(function () {
         $scope.hideLoader();
         if (res.status == true) {
           console.log("Req body: ", body, "**/* SPDOPSPANLINKAADHAARSTATUS */**", res);
           if (res.data["SPDOPSPANLINKAADHAARSTATUS"][0].hasOwnProperty("error")) {
             dmDialogueBox.alertBox({
               title: "Alert",
               message: "Oop's Something went wrong",
               actionLabel: ["Ok"],
             });
           } else if (res.data["SPDOPSPANLINKAADHAARSTATUS"][0].hasOwnProperty("data")) {
             $scope.pan_linked_with_any_aadhaar = res.data?.["SPDOPSPANLINKAADHAARSTATUS"]?.[0]?.data?.[0]?.['PAN Linked with any Aadhaar'] ?? 'NA';
             $scope.same_pan_linked_with_aadhaar = res.data?.["SPDOPSPANLINKAADHAARSTATUS"]?.[0]?.data?.[0]?.['Same PAN Linked with Aadhaar'] ?? 'NA';
             $scope.PAN_vs_Aadhaar_Name_Percent = res.data?.["SPDOPSPANLINKAADHAARSTATUS"]?.[0]?.data?.[0]?.PAN_vs_Aadhaar_Name_Percent ?? 'NA';
             document.querySelectorAll('[id="PAN Linked with any Aadhaar"]').forEach(element=> 
               {
             if(element){
               element.value = $scope.pan_linked_with_any_aadhaar ;
             }})
             document.querySelectorAll('[id="Same PAN Linked with Aadhaar"]').forEach(element=> 
               {
             if(element){
               element.value = $scope.same_pan_linked_with_aadhaar ;
             }})
             document.querySelectorAll('[id="Percent (%) Match (PAN vs Aadhaar Name)"]').forEach(element=> 
               {
             if(element){
               element.value = $scope.PAN_vs_Aadhaar_Name_Percent ;
             }})
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
//23Oct25 Dynamic Rejection disable function
$scope.SPREJECTIONDISABLELISTETB = function () {
  var body = {
    SP_REJECTION_DISABLE_LIST_ETB_V1: [
      {
        x_lead_id: $scope.selectedGrid.x_lead_id,
        x_etb_non_etb:'NTB',
        x_constitution:'PHY_PARTNERSHIP',
        x_text_1:'',
        x_text_2:''
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        console.log("**/* SP_REJECTION_DISABLE_LIST_ETB_V1 */**", res);
        if (res.data["SP_REJECTION_DISABLE_LIST_ETB_V1"][0].hasOwnProperty("error")) {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          });
        } else if (
          res.data["SP_REJECTION_DISABLE_LIST_ETB_V1"][0].hasOwnProperty("data")
        ) {
          
          $scope.rejectionIds = res.data.SP_REJECTION_DISABLE_LIST_ETB_V1[0].data.map(item => item.rejection_id);
         console.log('$scope.rejectionIds',$scope.rejectionIds);
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
    $scope.setRadioButtonSVR = function () {
      if ($scope.statusSVR) {
        document.querySelectorAll('[id=Yes]').forEach(element=> 
          {element.checked=true;}
      );
      document.querySelectorAll('[id=No]').forEach(element=> 
        {element.checked=false;}
    );
      } else {
        document.querySelectorAll('[id=Yes]').forEach(element=> 
          {element.checked=false;}
      );
      document.querySelectorAll('[id=No]').forEach(element=> 
        {element.checked=true;}
    );
      }
    };
    $scope.setSVROptions = function () {
      if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.hasOwnProperty('SVR')) {
        if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.SVR.hasOwnProperty('SVR_COMPLETED_FLAG')) {
           var condition1 = ($scope.GetJSONData.AOF_CP.ENTITY_DATA.SVR.SVR_COMPLETED_FLAG.VALUE == 'Now');
           var condition2 = ($scope.GetJSONData.AOF_CP.ENTITY_DATA.SVR.SVR_COMPLETED_FLAG.VALUE == 'Later');
           var condition3 = ($scope.GetJSONData.AOF_CP.ENTITY_DATA.SVR.SVR_COMPLETED_FLAG.VALUE == 'Yes');

           console.log('c1', condition1, 'c2', condition2);

          if (condition1 || condition2 || condition3) {
            $scope.statusSVR = true;
          } else {
            $scope.statusSVR = false;
          }
        }
      }
    };
    // UCIC field functions

    $scope.ucic_button_status = true;
    // CUSTOMER ID Field 
    $scope.CustID_button_status = true;

    $scope.setEventonButton = function () {
      if (document.getElementById('edit-key')) {
        document.getElementById('edit-key').addEventListener("mouseover", $scope.fillSVG('edit', 'hover'));
        document.getElementById('edit-key').addEventListener("mouseout", $scope.fillSVG('edit', 'out'));
      }
      if (document.getElementById('save-key')) {
        document.getElementById('save-key').addEventListener("mouseover", $scope.fillSVG('save', 'hover'));
        document.getElementById('save-key').addEventListener("mouseout", $scope.fillSVG('save', 'out'));
      }
    };

    $scope.fillSVG = function (action, state) {
      if (action == 'edit') {
        if (state == 'hover') {
          document.getElementById('Layer_1').style.fill = 'white';
        } else {
          document.getElementById('Layer_1').style.fill = '#005192';
        }
      }
      if (action == 'save') {
        if (state == 'hover') {
          document.getElementById('Capa_1').style.fill = 'white';
        } else {
          document.getElementById('Capa_1').style.fill = '#005192';
        }
      }
    };

    $scope.enable_disable_input = function (action) {
      var inputElement = document.getElementsByName('UCIC Number')[0];
      if (inputElement) {
        if (action === 'edit') {
          inputElement.readOnly = false;
          // document.getElementsByName('UCIC Number')[0].readOnly = false;
          $scope.isReadonly = false;
          $scope.ucic_button_status = false;
        }
        if (action === 'save') {
          $scope.update_ucic_key(inputElement);
        }
      }

    };
    $scope.enable_disable_input_custID = function (action) {
      var inputElement = document.getElementsByName('AUS Customer ID')[0];
      if (inputElement) {
        if (action === 'edit') {
          inputElement.readOnly = false;
          $scope.isReadonly = false;
          $scope.CustID_button_status = false;
        }
        if (action === 'save') {
          if($scope.form[0].form_id == "85"){
            $scope.update_custID_key(inputElement);
          }
        }
      }
    };
    $scope.update_custID_key = function (inputElement) {
      var body = {
        SPSETCUSTID: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
            x_cust_id:[{cust_id:document.getElementsByName('AUS Customer ID')[0].value,din_number:$scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[INDEX]?.din}],
            x_constitution:'PARTNERSHIP'
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* SPSETCUSTID */**", res);
            if (res.data["SPSETCUSTID"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["SPSETCUSTID"][0].hasOwnProperty("data")
            ) {
              console.log(res);
              if (res.data["SPSETCUSTID"][0].data[0].Status == 'Y') {
                // document.getElementsByName('UCIC Number')[0].readOnly = true;
                inputElement.readOnly = true;
                 $scope.isReadonly = true;
                $scope.CustID_button_status = true;
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
  
    $scope.selectTab = function(tabs) {
      $scope.selectedTab = tabs;
    };
    $scope.update_ucic_key = function (inputElement) {
      var body = {
        spsetucicno: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
            x_ucic_no: document.getElementsByName('UCIC Number')[0].value,
            x_constitution: "PHY_PARTNERSHIP"
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spsetucicno */**", res);
            if (res.data["spsetucicno"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spsetucicno"][0].hasOwnProperty("data")
            ) {
              console.log(res);
              if (res.data["spsetucicno"][0].data[0].Status == 'Y') {
                // document.getElementsByName('UCIC Number')[0].readOnly = true;
                inputElement.readOnly = true;
                 $scope.isReadonly = true;
                $scope.ucic_button_status = true;
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



     $scope.downloadCustomerEKYCPDF = function (TYPE,INDEX) {
      INDEX = $scope.stakeholder_INDEX
       
       DMSID=$scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[INDEX].STAKEHOLDER_EKYC_PDF_DMS_ID_WITHOUT_PASSWORD;
      
      var idArray = Array.isArray(DMSID) ? DMSID : [DMSID];

        var url = '/VAHANA-DMS/document-manager/download/v1/getDocumentsUsingIds';
        var headers = {
          appid: 'YES_AIM_CA-MERS3ZZY2M',
          orgid: 'YES_AIM_CA_PHYGITAL-PDD6LKCDHG',
          storageid: 'base64',
          "Content-Type": "application/json"
        };
        headers = {
          ...headers,
          ['x-tenant-id']: 'YES_AIM_CA_PHYGITAL-PDD6LKCDHG:CA_ADMIN_PORTAL-KX90I00RBB:ADMIN_PORTAL_RW',
        }
        var body = {
          fileReturnType: newplatwareHeader.environment.envProps.baseUrl=== "https://yesaimca.yesuat.bank.in/dev/router/engine/v1" ? 'BASE64':'BASE64',
          idList: idArray, //replace actual path
          // idList:['56593fc6-09ef-4584-bbf8-bac3ab48f668'],
          expiryTime  : "60"
        };
        $scope.showLoader("Loading.....");
        apiGateway.doPostByUrl(newplatwareHeaderV2, body, headers, url).then(res=>{
          $scope.$apply(function () {
          $scope.hideLoader();
          if (res.data.status.toLowerCase() == 'success') {
            console.log("Req body: ", body, "**/* DMS_PDF_API */**", res);
            var filebase64 = res.data.response.response[0].data;
            $scope.decodeCustomerPdf(filebase64, $scope.selectedGrid.x_lead_id);

          }
          else{
            $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
          }
        });
      });
    };



    // UCIC field functions

    // Customer PDF Download

    $scope.stakeholder_INDEX = 0;

    $scope.set_Stakeholder_Index = function (index) {
      console.log('set_Stakeholder_Index ', index);
      $scope.stakeholder_INDEX = index;
    };

    // $scope.downloadCustomerPDF = function (TYPE, INDEX) {
    //   INDEX = $scope.stakeholder_INDEX;
    //   console.log('TYPE ', TYPE, INDEX);
    //   if (TYPE == 'STAKE') {
    //     var body = {
    //       COMPANY_PDF_DOPS: [
    //         {
    //           leadId: $scope.selectedGrid.x_lead_id,
    //           type: TYPE,
    //           flag: $scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[INDEX].SEQUENCE// replaced from $scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[INDEX].din
    //           // flag:'A1237789787'
    //         },
    //       ],
    //     };
    //   } else {
    //     var body = {
    //       COMPANY_PDF_DOPS: [
    //         {
    //           leadId: $scope.selectedGrid.x_lead_id,
    //           type: TYPE,
    //           flag: "x"
    //         },
    //       ],
    //     };
    //   }

    //   $scope.showLoader("Loading.....");
    //   executeApi(newplatwareHeader, body, function (res) {
    //     $scope.$apply(function () {
    //       $scope.hideLoader();
    //       if (res.status == true) {
    //         console.log("Req body: ", body, "**/* COMPANY_PDF_DOPS */**", res);
    //         if (res.data["COMPANY_PDF_DOPS"][0].hasOwnProperty("error")) {
    //           dmDialogueBox.alertBox({
    //             title: "Alert",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         } else if (res.data["COMPANY_PDF_DOPS"][0].hasOwnProperty("data")) {
    //           $scope.decodeCustomerPdf(res.data["COMPANY_PDF_DOPS"][0].data[0].response, $scope.selectedGrid.x_lead_id);
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


    $scope.downloadCustomerPDF = function (TYPE, INDEX) {
      INDEX = $scope.stakeholder_INDEX;
        console.log('TYPE ', TYPE, INDEX);
      if (TYPE == 'STAKE') {
       DMSID=$scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[INDEX].STAKEHOLDER_PDF_DMS_ID_WITHOUT_PASSWORD
;

      }
      else {
        DMSID=$scope.GetJSONData.AOF_CP.ENTITY_DATA.REVIEW_PDF_DMS_ID_WITHOUT_PASSWORD;
      }
      var idArray = Array.isArray(DMSID) ? DMSID : [DMSID];

        var url = '/VAHANA-DMS/document-manager/download/v1/getDocumentsUsingIds';
        var headers = {
          appid: 'YES_AIM_CA-MERS3ZZY2M',
          orgid: 'YES_AIM_CA_PHYGITAL-PDD6LKCDHG',
          storageid: 'base64',
          "Content-Type": "application/json"
        };
        headers = {
          ...headers,
          ['x-tenant-id']: 'YES_AIM_CA_PHYGITAL-PDD6LKCDHG:CA_ADMIN_PORTAL-KX90I00RBB:ADMIN_PORTAL_RW',
        }
        var body = {
          fileReturnType: newplatwareHeader.environment.envProps.baseUrl=== "https://yesaimca.yesuat.bank.in/dev/router/engine/v1" ? 'BASE64':'BASE64',
          idList: idArray, //replace actual path
          // idList:['56593fc6-09ef-4584-bbf8-bac3ab48f668'],
          expiryTime  : "60"
        };
        $scope.showLoader("Loading.....");
        apiGateway.doPostByUrl(newplatwareHeaderV2, body, headers, url).then(res=>{
          $scope.$apply(function () {
          $scope.hideLoader();
          if (res.data.status.toLowerCase() == 'success') {
            console.log("Req body: ", body, "**/* DMS_PDF_API */**", res);
            var filebase64 = res.data.response.response[0].data;
            $scope.decodeCustomerPdf(filebase64, $scope.selectedGrid.x_lead_id);

          }
          else{
            $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
          }
        });
      });
    };

    // $scope.decodeCustomerPdf = function (base64, leadID) {
    //   var link = document.createElement("a");
    //   link.href = "data:application/pdf;base64," + base64;
    //   link.download = leadID;
    //   link.click();
    // };
  //   $scope.decodeCustomerPdf = function (base64, leadID) {
  //     // Decode the base64 string to binary data
     
      
  //     // Decode the base64 string to binary data
  //     var byteCharacters = atob(base64);
  //     var byteNumbers = new Array(byteCharacters.length);
  
  //     for (var i = 0; i < byteCharacters.length; i++) {
  //         byteNumbers[i] = byteCharacters.charCodeAt(i);
  //     }
  
  //     var byteArray = new Uint8Array(byteNumbers);
  //     var blob = new Blob([byteArray], { type: 'application/pdf' });
  
  //     // Create a download link and click it programmatically
  //     var link = document.createElement("a");
  //     link.href = URL.createObjectURL(blob);
  //     link.download = leadID + ".pdf";
  //     document.body.appendChild(link);
  //     link.click();
  
  //     // Clean up by removing the link
  //     setTimeout(()=>{
  //       document.body.removeChild(link);
  //       URL.revokeObjectURL(link.href);
  //     },0)
  // };
    // Customer PDF Download
  //   $scope.decodeCustomerPdf = function (base64, leadID) {
  //     // Decode the base64 string into binary data
  //     const byteCharacters = atob(base64);
  //     const byteArray = new Uint8Array(byteCharacters.length);
  
  //     // Populate the Uint8Array directly
  //     for (let i = 0; i < byteCharacters.length; i++) {
  //         byteArray[i] = byteCharacters.charCodeAt(i);
  //     }
  
  //     // Create a Blob from the byteArray
  //     const blob = new Blob([byteArray], { type: 'application/pdf' });
  
  //     // Create a download link with the 'download' attribute
  //     const link = document.createElement('a');
  //     link.href = URL.createObjectURL(blob);
  //     link.download = leadID+".pdf";  // This forces the browser to download the file
  
  //     // Append to the document, trigger click, and remove the link
  //     document.body.appendChild(link);
  //     link.click();
  
  //     // Clean up
  //     setTimeout(() => {
  //         URL.revokeObjectURL(link.href);
  //         document.body.removeChild(link);
  //     }, 0);
  // };
  $scope.decodeCustomerPdf = function (base64, leadID) {
    // Decode the base64 string into binary data
    const byteCharacters = atob(base64);
    const byteArray = new Uint8Array(byteCharacters.length);

    // Populate the Uint8Array directly
    for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
    }

    // Create a Blob from the byteArray
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Create a download link with the 'download' attribute
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = leadID+".pdf";  // This forces the browser to download the file

    // Append to the document, trigger click, and remove the link
    document.body.appendChild(link);
    const isSafari = /^((?!chrome|crios|fxios|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /(iP(hone|od|ad)|Macintosh)/.test(navigator.userAgent);
    const isChromeOnIOS = /CriOS/.test(navigator.userAgent); // Detect Chrome on iOS
    const isFirefoxOnIOS = /FxiOS/.test(navigator.userAgent); // Detect Firefox on iOS
    
    if (isSafari) {
        if (isIOS && 'ontouchend' in document) {
            window.open(link, '_blank');
        } else {
            link.click();
        }
    } else if (isChromeOnIOS || isFirefoxOnIOS) {
        link.click();
    } else {
        // Your alternative logic for other browsers
        link.click();
    }

    // Clean up
    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
    }, 0);
};
    // Credit Facility

    $scope.declaration_content = "";
    $scope.declaration_ID = "";

    $scope.getDeclarationByLead = function () {
      var body = {
        spgetcreditfacilitydopsdecl: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
            x_constitution: "PHY_PARTNERSHIP"
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log(
              "Req body: ",
              body,
              "**/* spgetcreditfacilitydopsdecl */**",
              res
            );
            if (res.data["spgetcreditfacilitydopsdecl"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spgetcreditfacilitydopsdecl"][0].hasOwnProperty("data")) {
              $scope.declaration_ID = res.data["spgetcreditfacilitydopsdecl"][0].data[0].declaration_id;
              $scope.declaration_content = res.data["spgetcreditfacilitydopsdecl"][0].data[0].declaration_dops;
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

    // Credit Facility

    $scope.setformElementsParamGroup = function (obj) {
      var PARAM_GROUPS = $filter("unique")(
        $scope.formElements["FORM_CONTROL"],
        "PARAM_GROUP"
      );
      for (i = 0; i < PARAM_GROUPS.length; i++) {
        $scope.currentFormSections.push({
          PARAM_GROUP: PARAM_GROUPS[i].PARAM_GROUP,
          PARAM_GROUP_SEQ: i,
          FORM_ELEMEMTS: [],
        });
        $scope.currentFormSections[i].FORM_ELEMEMTS = $filter("byProp")(
          $scope.formElements["FORM_CONTROL"],
          "PARAM_GROUP",
          $scope.currentFormSections[i].PARAM_GROUP
        );
      }
      console.log("currentFormSections", $scope.currentFormSections);

      $scope.resetArray = [];
      let temp = '';
      for (let i = 0; i < $scope.currentFormSections.length; i++) {
        if (i == 0) {
          temp = $scope.currentFormSections[i].FORM_ELEMEMTS.length - 1;
        } else {
          temp = $scope.resetArray[i - 1] + $scope.currentFormSections[i].FORM_ELEMEMTS.length;
        }
        $scope.resetArray.push(temp);
      }
      // console.log('auto resetArray', $scope.resetArray);

      $scope.form = $filter("byProp")(
        $scope.ovCardData.OV_TABS,
        "form_id",
        obj.form_id
      );
      $scope.saveJSONForm($scope.form, $scope.currentFormSections);
      if ($scope.form[0].form_id == "101") {
        $scope.getAuditTrail();
      }
      if ($scope.form[0].form_id == "94") {
        $scope.showAuditTrail = false;
        $scope.getRemarkHistory();
      }
      if ($scope.form[0].form_id == "93") {
        $scope.get_all_rejection_summary();
      }

      if ($scope.form[0].form_id == "92") {
        $scope.getReviewKYCDate();
        $scope.comment_details();
      }
      if ($scope.form[0].form_id == "87") {
        $scope.show_Amlock = true;
        $scope.show_CRILIC = false;
        $scope.credit = false;
        $scope.cibil_PDF = false;
        for (i = 0; i < $scope.SUB_TABName.length; i++) {
          $scope.SUB_TABName[i].openSection = false;
          $scope.SUB_TABName[0].openSection = true;
        }
        $scope.show_Amlock = true;
        $scope.SET_VISIBILITY ? $scope.getImageStreams("50") : "";
        $scope.getAmlock_crilic_values();
        $scope.getCIBIL_PDF_Status();
      }

      if ($scope.form[0].form_name == "Credit facility") {
        $scope.show_Amlock = true;
        $scope.show_CRILIC = false;
        $scope.credit = false;
        $scope.cibil_PDF = false;
        for (i = 0; i < $scope.Credit_TABName.length; i++) {
          $scope.Credit_TABName[i].openSection = false;
          $scope.Credit_TABName[0].openSection = true;
        }
        $scope.show_Amlock = true;
        $scope.SET_VISIBILITY ? $scope.getImageStreams("50") : "";
        $scope.getAmlock_crilic_values();
        $scope.showCredit = true;
        $scope.showAuditTrail = true;
      }

      if ($scope.form[0].form_id != "85") {
        // console.log('*** obj ', obj);
        $scope.fetchDocumentDesc($scope.form[0]);
        $scope.getRejection_data($scope.form[0].form_id);
      }

      if ($scope.form[0].form_id == "85" && $scope.setRole === "") {
        $scope.getRejection_data($scope.form[0].form_id);
        // $scope.getDocumentpertab($scope.form[0]);
      }
      if ($scope.form[0].form_id == "84") {
        $scope.gotosub_tabSwitching(
          true,
          { id: 1, name: "BO Identification", openSection: true },
          0,
          "boTAB"
        );
        // $scope.SUB_BOTAB = [{ 'id': 1, 'name': "BO Identification", 'openSection': true }, { 'id': 2, 'name': "Director list from cin api ", 'openSection': false }];
      }
      // if($scope.form[0].form_id=='6'){
      //   if($scope.setTAB)
      //   $scope.setDATA=true;
      // }
    };

    $scope.getFormFieldPerTab = function (obj) {
      var body = {
        spformelementresultcomp: [
          {
            x_form_id: obj.form_id,
            x_source: $scope.selectedGrid.x_lead_source,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spformelementresultcomp */**", res);
            if (
              res.data["spformelementresultcomp"][0].hasOwnProperty("error")
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spformelementresultcomp"][0].hasOwnProperty("data")
            ) {
              $scope.formElements = JSON.parse(
                res.data["spformelementresultcomp"][0].data[0]
              );
              console.log($scope.formElements);
              $scope.setformElementsParamGroup(obj);
              if($scope.form[0].form_id == "91"){
                $scope.SPREJECTIONDISABLELISTETB();
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

    // --------------------------------------------------------------------------------------------
    //********************DOCUMENTS SECTION ************ */
    $scope.SetAmlock_crilic_array = function (btn, amlock_arr, Crilic_arr) {
      var body = {
        spamlockcrilicarrayinsert: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
            x_amlock_array: JSON.stringify(amlock_arr) || "",
            x_amlock_value:
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC.AMLOCK || "",
            x_crilic_array: JSON.stringify(Crilic_arr) || "",
            x_crilic_value:
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC.CRILC || "",
            x_login_id: $scope.username,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spamlockcrilicarrayinsert */**", res);
            if (
              res.data["spamlockcrilicarrayinsert"][0].hasOwnProperty("error")
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spamlockcrilicarrayinsert"][0].hasOwnProperty("data")
            ) {
              if (btn.ACTION_NAME == "REJECT") {
                $scope.getSetJSON(btn, "R");
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
    $scope.amlock_crilic_array = function (btn) {
      if (
        $scope.loginServiceData[0].system_role == "DVUM" ||
        $scope.loginServiceData[0].system_role == "DVUC"
      ) {
        $scope.LIST_AMLOCK_IMG = $filter("byProp")(
          $scope.documentsDesc,
          "doc_id",
          50
        );
        $scope.LIST_CRILIC_IMG = $filter("byProp")(
          $scope.documentsDesc,
          "doc_id",
          51
        );
        if ($scope.LIST_AMLOCK_IMG.length > 0) {
          $scope.AMLOCK_IMG = [];
          for (i = 0; i < $scope.LIST_AMLOCK_IMG.length; i++) {
            $scope.AMLOCK_IMG.push($scope.LIST_AMLOCK_IMG[i].image_name);
          }
        }
        if ($scope.LIST_CRILIC_IMG.length > 0) {
          $scope.CRILIC_IMG = [];
          if ($scope.LIST_CRILIC_IMG.length > 0) {
            for (i = 0; i < $scope.LIST_CRILIC_IMG.length; i++) {
              $scope.CRILIC_IMG.push($scope.LIST_CRILIC_IMG[i].image_name);
            }
          }
        }
        $scope.SetAmlock_crilic_array(
          btn,
          $scope.AMLOCK_IMG,
          $scope.CRILIC_IMG
        );
      }
    };

    $scope.set_workstep = function (btn) {
      if (
        ($scope.loginServiceData[0].system_role == "DVUM" ||
          $scope.loginServiceData[0].system_role == "DVUC") &&
        $scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC
      )
        $scope.amlock_crilic_array(btn);
      else $scope.getSetJSON(btn, "R");
    };

    $scope.call = function (obj) {
      $scope.test = obj;
      index = obj.indexOf("{");
      if (index == -1) {
        if (obj) {
          obj = [{ VALUE: obj }];
        } else {
          obj = [{ VALUE: "-" }];
        }
        $scope["value_1" + $scope.test] = obj;
      } else {
        obj = JSON.parse(obj);
        $scope["value_1" + $scope.test] = obj;
      }
    };
    $scope.getvalue = function (key) {
      return $scope[key];
    };

    $scope.showDiscrepancy = function () {
      if (
        $scope.selectedQ["queue_id"] == 2 ||
        $scope.selectedQ["queue_id"] == 3 ||
        $scope.selectedQ["queue_id"] == 4 ||
        $scope.selectedQ["queue_id"] == 10 ||
        $scope.selectedQ["queue_id"] == 12 ||
        $scope.selectedQ["queue_id"] == 11 ||
        $scope.selectedQ["queue_id"] == 13 ||
        $scope.loginServiceData[0].system_role == "SIGN"
      ) {
        // document.getElementById('hrline').style.marginTop="44%";
        return false;
      } else {
        if ($scope.expandDiv == true) {
          // document.getElementById('hrline').style.marginTop="2%";
        }
        return true;
      }
    };

    //**********Expand image */
    $scope.expandImage = function (img) {
      if (img) {
        $scope.expandDiv = true;
      }
    };

    $scope.moveToNewWindow = function (img) {
      if (img) {
        var host = window.location.href.split("#")[0];

        window.open(host + "#/images", "mywindow", "height:100;width:100;");
      }
    };

    $scope.NEXT_IMAGE = function () {
      $scope.LIST_OF_IMAGE = $filter("byProp")(
        $scope.Docs,
        "form_id",
        $scope.selected_IMAGE.form_id
      );
      (function () {
        for (i = 0; i < $scope.LIST_OF_IMAGE.length; i++) {
          $scope.LIST_OF_IMAGE[i]["seqence"] = i + 1;
        }
      })();
      if ($scope.selected_IMAGE.seqence == $scope.LIST_OF_IMAGE.length) {
        dmDialogueBox.toastBox({
          title: "Image",
          message: "No more image!",
          actionlabel: ["OK"],
          messageType: "error",
        });
      } else {
        $scope.image_next = $filter("byProp")(
          $scope.Docs,
          "seqence",
          $scope.selected_IMAGE.seqence + 1
        );
        $scope.selected_IMAGE = $scope.image_next[0];
        $scope.getImage_stream($scope.image_next[0], "PREVIOUS_NEXT");
      }
    };
    $scope.PREVIOUS_IMAGE = function () {
      console.log("function called");
      $scope.LIST_OF_IMAGE = $filter("byProp")(
        $scope.Docs,
        "form_id",
        $scope.selected_IMAGE.form_id
      );
      (function () {
        for (i = 0; i < $scope.LIST_OF_IMAGE.length; i++) {
          $scope.LIST_OF_IMAGE[i]["seqence"] = i + 1;
        }
      })();
      if ($scope.selected_IMAGE.seqence == 1) {
        dmDialogueBox.toastBox({
          title: "Image",
          message: "No Previous Image!",
          actionlabel: ["OK"],
          messageType: "error",
        });
      } else {
        $scope.image_next = $filter("byProp")(
          $scope.Docs,
          "seqence",
          $scope.selected_IMAGE.seqence - 1
        );
        $scope.selected_IMAGE = $scope.image_next[0];
        $scope.getImage_stream($scope.image_next[0], "PREVIOUS_NEXT");
      }
    };

    $scope.hideExpandImage = function () {
      $scope.expandDiv = false;
    };

    $scope.downloadAsZIP = function (imageData) {
      var zip = new JSZip();
      var img = zip.folder("Images");
      for (j = 0; j < imageData.length; j++) {
        var imagename =
          imageData[j].doc_des +
          imageData[j]["set_seq"] +
          imageData[j].created_timestmp +
          "." +
          imageData[j].image_name.split(".")[1];
        //var imagename=imageData[j].doc_des+imageData[j]['set_seq']+imageData[j].created_timestmp +'.webp';
        img.file(imagename, imageData[j].image_stream, { base64: true });
      }
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, $scope.selectedGrid.x_lead_id2 + ".zip");
      });
    };

    function downloadAllImages() {
      return new Promise((resolve) => {
        var body = {
          spgetdocumentqueuelistdocdownloadcomp: [
            {
              x_aof_id: $scope.selectedGrid.x_lead_id,
              x_doc_type: "",
              x_source: $scope.selectedGrid.x_lead_source,
            },
          ],
        };
        $scope.showLoader("Downloading.....");
        executeApi(newplatwareHeader, body, function (res) {
          $scope.$apply(function () {
            if (res.status == true) {
              console.log(
                "**/* spgetdocumentqueuelistdocdownloadcomp */**",
                res
              );
              if (
                res.data[
                  "spgetdocumentqueuelistdocdownloadcomp"
                ][0].hasOwnProperty("error")
              ) {
                title: "Alert",
                  dmDialogueBox.alertBox({
                    message: "Oop's Something went wrong",
                    actionLabel: ["OK"],
                  });
              } else if (
                res.data[
                  "spgetdocumentqueuelistdocdownloadcomp"
                ][0].hasOwnProperty("data")
              ) {
                $scope.getDocIDs =
                  res.data.spgetdocumentqueuelistdocdownloadcomp[0].data;
                $scope.getDocIDs_newlength = $filter("unique")(
                  $scope.getDocIDs,
                  "doc_id"
                );
                $scope.imageData = [];
                for (i = 0; i < $scope.getDocIDs_newlength.length; i++) {
                  var body = {
                    spgetdocumentqueuelistdownloadcomp: [
                      {
                        x_aof_id: $scope.selectedGrid.x_lead_id,
                        x_doc_type: "",
                        x_doc_id: $scope.getDocIDs_newlength[i].doc_id,
                        x_source: $scope.selectedGrid.x_lead_source,
                      },
                    ],
                  };
                  $scope.showLoader("Downloading.....");
                  executeApi(newplatwareHeader, body, function (res) {
                    $scope.$apply(function () {
                      if (res.status == true) {
                        console.log(
                          "**/* spgetdocumentqueuelistdownloadcomp */**",
                          res
                        );
                        if (
                          res.data[
                            "spgetdocumentqueuelistdownloadcomp"
                          ][0].hasOwnProperty("error")
                        ) {
                          dmDialogueBox.alertBox({
                            title: "Alert",
                            message: "Oop's Something went wrong",
                            actionLabel: ["Ok"],
                          });
                        } else {
                          for (
                            i = 0;
                            i <
                            res.data.spgetdocumentqueuelistdownloadcomp[0].data
                              .length;
                            i++
                          ) {
                            res.data.spgetdocumentqueuelistdownloadcomp[0].data[
                              i
                            ]["set_seq"] = i + 1 + "_";
                            $scope.imageData.push(
                              res.data.spgetdocumentqueuelistdownloadcomp[0]
                                .data[i]
                            );
                          }
                          console.log($scope.imageData);
                          if (
                            $scope.imageData.length == $scope.getDocIDs.length
                          ) {
                            $scope.hideLoader();
                            resolve($scope.imageData);
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
                        $scope.hideLoader();
                        dmDialogueBox.alertBox({
                          title: "Alert",
                          message:
                            "All documents are not downloaded. Please try again.",
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
                title: "Error Message",
                message: "Error Connecting to server..",
                actionLabel: ["Ok"],
              });
            }
          });
        });
      });
    }

    $scope.download = async function (x) {
      var msg = await downloadAllImages();
      $scope.downloadAsZIP(msg);
    };

    //********************DOCUMENTS SECTION END************ */
    // --------------------------------------------------------------------------------------------
    //*********FORM SECTION ***********************  */

    // $scope.fieldSenario=function(param){
    //   //  switch(param.PARENT_FORM_ACTION){
    //   //    case "SHOW":
    //   //     var initVal = $scope.getSetValue($scope.GetJSONData, param.PARENT_JSON_NAME);
    //   //        if(param.PARENT_PARAM_VAL==initVal) return true;
    //   //    //    else return false;
    //   //    break;
    //   //    default:
    //   //      return true;
    //   //  }
    // }

    //*********Data fetcing from json  */

    // $scope.getInitVal = function(json,index,param) {
    //   var initVal = $scope.getSetValue($scope.GetJSONData, json);
    //   $scope.leadFormData[json] = initVal;
    //   //return initVal;

    // }

    $scope.getInitVal = function (json, param) {
      if (json) {
        if (json.includes("OBJECT_TYPE") && json.includes("AADHAAR_VIEW")) {
          var object_index = json.split("OBJECT_TYPE[")[1].split("].BO")[0];
        }
        var jsonPath = json.split(",");
        for (i = 0; i < jsonPath.length; i++) {
          var initVal = $scope.getSetValue($scope.GetJSONData, jsonPath[i]);
          // debugger;
          if (param) {
            if(param.DATA_TYPE === "DATE" && initVal && param.PARAM_NAME.toLowerCase() === "final date of birth"){
              // // having initVal is in "dd-MM-yyyy" format
              // var [day, month, year] = initVal.split("-");
              // day = day.padStart(2, "0");
              // month = month.padStart(2, "0");
              // $scope.leadFormData[json] = `${day}-${month}-${year}`;
             
              
              // Normalize initVal if it contains "/" instead of "-"
              initVal = initVal.replace(/\//g, "-"); // Replace all "/" with "-"
              
              // Now initVal is guaranteed to be in "dd-MM-yyyy" format
              var [day, month, year] = initVal.split("-");
              day = day.padStart(2, "0");
              month = month.padStart(2, "0");
              $scope.leadFormData[json] = `${day}-${month}-${year}`;
            }
            else if (param.DATA_TYPE == "DATE" && initVal) {
              initVal = new Date(initVal);
              var month = initVal.getMonth() + 1;
              var day = initVal.getDate();
              var year = initVal.getFullYear();
              if (day < 10) {
                day = "0" + day;
              }

              if (month < 10) {
                month = "0" + month;
              }
              $scope.leadFormData[json] = day + "-" + month + "-" + year;
              console.log('param name',param.PARAM_NAME);
            }
            else if (param.DISPLAY_ATTRIBUTE == "Product Variant") {
              if (initVal) {
                var newVal = initVal.split("(");
                $scope.leadFormData[json] = "(" + newVal[1] + newVal[0];
                // console.log("leadFormData", $scope.leadFormData);
              }
            } else {
              if (
                json == "AOF_CP.ENTITY_DATA.MHOLDER[0].AADHAAR_VIEW.AADHAAR_ID"
              ) {
                if (
                  $scope.GetJSONData.AOF_CP.ENTITY_DATA.MHOLDER[0].KYC_TYPE
                    .VALUE == "QR Code"
                ) {
                  $scope.leadFormData[json] =
                    "XXXXXXXXX" + initVal.substr(initVal.length - 4);
                } else {
                  $scope.leadFormData[json] = initVal;
                }
                // console.log("leadFormData", $scope.leadFormData);
              } else if (
                json ==
                `AOF_CP.ENTITY_DATA.OBJECT_TYPE[${object_index}].BO.AADHAAR_VIEW.AADHAAR_ID` ||
                json ==
                `AOF_CP.ENTITY_DATA.OBJECT_TYPE[${object_index}].BO.AADHAAR_VIEW.AADHAAR_NUMBER`
              ) {
                if (
                  Object.prototype.hasOwnProperty.call(
                    $scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[
                      object_index
                    ].BO,
                    "KYC_BY"
                  )
                ) {
                  if (
                    $scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[
                      object_index
                    ].BO.KYC_BY.VALUE == "QR Code"
                  ) {
                    $scope.leadFormData[json] =
                      "XXXXXXXXX" + initVal.substr(initVal.length - 4);
                  } else {
                    $scope.leadFormData[json] = initVal;
                  }
                } else {
                  $scope.leadFormData[json] = initVal;
                }
              } else if (
                json ==
                `AOF_CP.ENTITY_DATA.OBJECT_TYPE[${object_index}].BO.ADD_AADHAAR_VIEW.AADHAAR_ID`
              ) {
                if (
                  Object.prototype.hasOwnProperty.call(
                    $scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[
                      object_index
                    ].BO,
                    "ADD_KYC_BY"
                  )
                ) {
                  if (
                    $scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[
                      object_index
                    ].BO.ADD_KYC_BY.VALUE == "QR Code"
                  ) {
                    $scope.leadFormData[json] =
                      "XXXXXXXXX" + initVal.substr(initVal.length - 4);
                  } else {
                    $scope.leadFormData[json] = initVal;
                  }
                } else {
                  $scope.leadFormData[json] = initVal;
                }
              } else if (json == "AOF_CP.ENTITY_DATA.SHOP_SUB_DATE") {
                if (initVal) {
                  var Subdate = initVal.split("/");
                  $scope.leadFormData[json] =
                    Subdate[0] + "-" + Subdate[1] + "-" + Subdate[2];
                }
              } else {
                $scope.leadFormData[json] = initVal;
                // console.log("leadFormData", $scope.leadFormData);
              }
            }
          } else {
            $scope.leadFormData[json] = initVal;
            // console.log("leadFormData", $scope.leadFormData);
          }
          if (initVal) return initVal;
        }
      }
    };

    $scope.checkBox_value = function (json, index, value, param) {
      var jsonPath = json.split(",");
      for (i = index; i <= index; i++) {
        $scope["initVal" + value + i] = $scope.getSetValue(
          $scope.GetJSONData,
          jsonPath[i]
        );
      }
    };

    $scope.getSetValue = function (obj, is, value, index, keyAsArr) {
      if (!is) {
        return;
      }
      if (typeof is == "string") {
        return $scope.getSetValue(obj, is.split("."), value, index);
      } else if (
        obj &&
        obj[is[0]] instanceof Array &&
        value instanceof Array &&
        is.length == 1
      ) {
        obj[is[0]] = value;
        return;
      } else if (
        obj &&
        obj[is[0]] instanceof Array &&
        value &&
        !(value instanceof Array) &&
        is.length == 1
      ) {
        obj[is[0]].push(value);
        return;
      } else if (obj instanceof Array) {
        if (value && is.length == 1) {
          var arrIndex = keyAsArr[1].split("]")[0];
          if (!arrIndex) {
            if (!index) {
              obj[$scope.newArrIndex][is[0]] = value;
            } else {
              obj[index][is[0]] = value;
            }
          } else {
            obj[keyAsArr[1].split("]")[0]][is[0]] = value;
          }
        }
        var arrIndex = keyAsArr[1].split("]")[0];
        if (!arrIndex) {
          if (!index) {
            if ($scope.newArrIndex < 0) {
              obj = "";
              return obj;
            }
            obj = obj[$scope.newArrIndex];
          } else {
            obj = obj[index];
          }
        } else if (arrIndex == "*") {
          var valuesArr = [];
          for (var k = 0; k < obj.length; k++) {
            valuesArr.push(
              $scope.getSetValue(obj[k], is, value, $scope.newArrIndex)
            );
          }
          return valuesArr;
        } else if (arrIndex == "*-C") {
          var valuesArr = [];
          for (var k = 0; k < obj.length; k++) {
            if (k != $scope.newArrIndex) {
              valuesArr.push(
                $scope.getSetValue(obj[k], is, value, $scope.newArrIndex)
              );
            }
          }
          return valuesArr;
        } else {
          obj = obj[keyAsArr[1].split("]")[0]];
        }
        return $scope.getSetValue(obj, is, value, index);
        // issue to be resolved
        // return $scope.getSetValue(obj[is[0]], is.slice(1), value, index);
      } else if (is.length == 1 && value !== undefined) {
        if (!obj[is[0]]) {
          if (is[0].indexOf("[") > -1) {
            var arrTag = is[0].split("[]")[0];
            if (!obj[arrTag]) {
              obj[arrTag] = [];
              $scope.newArrIndex = 0;
              obj[arrTag].push(value);
              return obj;
            } else {
              $scope.newArrIndex = obj[arrTag].length;

              obj[arrTag].push(value);
              return obj;
            }
          } else {
            obj[is[0]] = {};
          }
        }
        return (obj[is[0]] = value);
      } else if (is.length == 1 && value == undefined) return obj[is[0]];
      else if (is.length == 0) return obj;
      else if (is[0].indexOf("[") > -1) {
        var keyAsArr = is[0].split("[");
        return $scope.getSetValue(
          obj[keyAsArr[0]],
          is.slice(1),
          value,
          index,
          keyAsArr
        );
      }
      if (obj && !obj[is[0]] && is.length > 1) {
        obj[is[0]] = {};
      }
      if (obj && !obj[is[0]] && value) {
        if (is[0].indexOf("[") > -1) {
          var arrTag = is[0].split("[]")[0];
          if (!obj[arrTag]) {
            obj[arrTag] = [];
            obj[arrTag].push(value);
            return obj;
          }
        } else {
          obj[is[0]] = {};
        }
        return $scope.getSetValue(obj[is[0]], is.slice(1), value, index);
      } else {
        return $scope.getSetValue(obj[is[0]], is.slice(1), value, index);
      }
    };
    //****************************** */

    //***************Fecthing from parameters *********** */

    $scope.getAmlock_crilic_values = function () {
      var body = {
        spamlockgetarray: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
            // x_rej_array:'',
            // x_login_id:$scope.username
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spamlockgetarray */**", res);
            if (res.data["spamlockgetarray"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spamlockgetarray"][0].hasOwnProperty("data")) {
              if (res.data.spamlockgetarray[0].data.length == 0) {
                //    console.log();
                $scope.GetJSONData.AOF_CP.ENTITY_DATA["AMLOCK_CRILC"] = {};
                $scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC["AMLOCK"] =
                  null;
                $scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC["CRILC"] =
                  null;
              }
               else {
                // $scope.GetJSONData.AOF_CP.ENTITY_DATA["AMLOCK_CRILC"] = {};
                // $scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC["AMLOCK"] =
                //   res.data.spamlockgetarray[0].data[0].amlock_array_value || "";
                // $scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC["CRILC"] =
                //   res.data.spamlockgetarray[0].data[0].crilic_array_value || "";

                //fetching AMLOCK and CRILIC Value from SessionStorage
                $scope.GetJSONData.AOF_CP.ENTITY_DATA["AMLOCK_CRILC"] = {};
                  $scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC["AMLOCK"] =
                    sessionStorage.getItem("AMLOCK")
                      ? sessionStorage.getItem("AMLOCK")
                      : res.data.spamlockgetarray[0].data[0].amlock_array_value;
                  $scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC["CRILC"] =
                    sessionStorage.getItem("CRILC")
                      ? sessionStorage.getItem("CRILC")
                      : res.data.spamlockgetarray[0].data[0].crilic_array_value;               
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

    $scope.fetchDocumentDesc = function (obj) {
      var body = {
        spgetdocumentqueuelistcomp: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
            x_queue_id: $scope.selectedQ["queue_id"],
            x_card_id: obj.form_id,
            x_system_role: $scope.loginServiceData[0].system_role,
            x_login_id: $scope.username,
            x_source: $scope.selectedGrid.x_lead_source,
          },
        ],
      };
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            console.log("**/* spgetdocumentqueuelistcomp */**", res);
            if (
              res.data["spgetdocumentqueuelistcomp"][0].hasOwnProperty("error")
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spgetdocumentqueuelistcomp"][0].hasOwnProperty("data")
            ) {
              if ($scope.form[0].form_id == "91") {
                $scope.setRadioButtonSVR();
              }
              $scope.documentsDesc =
                res.data.spgetdocumentqueuelistcomp[0].data;
                $scope.documentsDesc.forEach((item,index) => {
                  item.doc_des =  item.STATUS =="Y"? 
                            item.doc_des + ' New':
                           item.doc_des+ ' Old';
         
                         })
              $scope.getDocumentpertab(obj);
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
    };

    $scope.getFormParam = function (selectedTab) {
      $scope.Docs = [];
      $scope.documentList = [];
      $scope.rejectionList = [];
      $scope.currentFormSections = [];
      $scope.setRole = "";
      $scope.setIndex = "";
      $scope.img = "";
      if ($scope.imageDetail) {
        $scope.imageDetail.LATITUDE = "";
        $scope.imageDetail.LONGITUDE = "";
      }
      $scope.show_bo = true;
      $scope.setTAB = false;
      $scope.setDATA = true;
      $scope.show_bo_smo = true;
      $scope.getFormFieldPerTab(selectedTab);
    };

    $scope.getLOVoption = function (option) {
      console.log('Arg..', option);
      $scope.optionalField[option] = [];
      $scope.LOVradioCheckbox.filter(function (item) {
        if (item.master_type == option) {
          $scope.optionalField[option] = JSON.parse(item.data_object);
          if ($scope.form[0].form_id == "88") {
            // if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.CREDIT_FACILITY.DECLARATION.VALUE) {
            //   let code = $scope.GetJSONData.AOF_CP.ENTITY_DATA.CREDIT_FACILITY.DECLARATION.VALUE;
            //   $scope.optionalField['LOVY_DOPS_DECL'][0].VALUE = code;
            // }
            $scope.optionalField['LOVY_DOPS_DECL'][0].VALUE = $scope.declaration_content;
          }
          //for nudges requierement handle the upi id check box
          if ($scope.form[0].form_id == "89") {
            // if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.CREDIT_FACILITY.DECLARATION.VALUE) {
            //   let code = $scope.GetJSONData.AOF_CP.ENTITY_DATA.CREDIT_FACILITY.DECLARATION.VALUE;
            //   $scope.optionalField['LOVY_DOPS_DECL'][0].VALUE = code;
            // }
            $scope.GetJSONData.AOF_CP.ENTITY_DATA.ERP_UPI_ID.CODE=$scope.optionalField['LOVY_DOPS_UPI_ID'][0].VALUE ;
            $scope.GetJSONData.AOF_CP.ENTITY_DATA.ERP_OD_LOAN.CODE=$scope.optionalField['LOVY_DOPS_ERP_OD_LOAN'][0].VALUE;
          }
        }
        return;
      });
      console.log('optional field', $scope.optionalField);
    };

    $scope.saveJSONForm = function (btn, obj) {
      QueueService.setPreviousTab(btn);
      for (i = 0; i < $scope.ovCardData.OV_TABS.length; i++) {
        if (btn[0].form_id == $scope.ovCardData.OV_TABS[i].form_id) {
          if (
            btn[0].form_id == "101" ||
            btn[0].form_id == "94" ||
            (btn[0].form_id == "92" &&
              $scope.loginServiceData[0].system_role == "BS")
          ) {
            $scope.tabJSONObj.push({
              Form_Name: btn[0].form_name,
              TAB_SEQ: btn[0].tab_seq,
              Form_ID: btn[0].form_id,
              viewed: false,
              AcceptStatus: "false",
              RejectStatus: "true",
              RejectionData: {
                rejID: "",
                rejReasn: "",
                category: "",
                subCategory: "",
                remark: "",
              },
            });
          } else {
            $scope.tabJSONObj.push({
              Form_Name: btn[0].form_name,
              TAB_SEQ: btn[0].tab_seq,
              Form_ID: btn[0].form_id,
              viewed: true,
              AcceptStatus: "true",
              RejectStatus: "true",
              RejectionData: {
                rejID: "",
                rejReasn: "",
                category: "",
                subCategory: "",
                remark: "",
              },
            });
          }
        }
      }
      $scope.tabJSONObj.sort(function (a, b) {
        return a.Form_ID - b.Form_ID;
      });

      // delete all duplicates from the array
      for (var i = 0; i < $scope.tabJSONObj.length - 1; i++) {
        if ($scope.tabJSONObj[i].Form_ID == $scope.tabJSONObj[i + 1].Form_ID) {
          delete $scope.tabJSONObj[i];
        }
      }
      // remove the "undefined entries"
      $scope.tabJSONObj = $scope.tabJSONObj.filter(function (el) {
        return typeof el !== "undefined";
      });
      $scope.rejectionForm = $filter("byProp")(
        $scope.tabJSONObj,
        "Form_ID",
        btn.FORM_ID
      );
      console.log($scope.tabJSONObj);
      for (i = 0; i < $scope.tabJSONObj.length; i++) {
        if ($scope.tabJSONObj[i].TAB_SEQ == btn[0].tab_seq) {
          $scope["selectIt" + $scope.tabJSONObj[i].TAB_SEQ] = true;
        } else $scope["selectIt" + $scope.tabJSONObj[i].TAB_SEQ] = false;
      }
    };

    //*********FORM SECTION END***********************  */

    //-------------------------------------------------------------------------------------------------------------------------
    //*********TAB SECTION ***********************  */

    $scope.viewedStatus = function (tabs) {
      for (i = 0; i < $scope.tabJSONObj.length; i++) {
        if ($scope.tabJSONObj[i].TAB_SEQ == tabs.tab_seq) {
          return $scope.tabJSONObj[i].viewed;
        }
      }
    };

    //*********TAB SECTION END ***********************  */
    //--------------------------------------------------------------------------------------------------------------------

    //**********FOOTER SECTION************************** */

    $scope.disabled_save_done = function (btn) {
      if (btn == "SAVE") {
        if ($scope.imageName_upload) return false;
        else return true;
      }
      if (btn == "done") {
        if ($scope.user.rejID && $scope.user.remark) {
          document.getElementById("doneButton").style.color = "#0560a6";
          document.getElementById("doneButton").style.border = "1px solid #0560a6";
          return false;
        }
      }
      if (btn == "submit") {
        if ($scope.user.comment) {
          document.getElementById("submit_comm").style.color = "#0560a6";
          return false;
        } else {
          document.getElementById("submit_comm").style.color = "#c3c3c3";
          return true;
        }
      }
      if (btn == "check") {
        if ($scope.check.length >= 5) {
          document.getElementById("save_check").style.backgroundColor =
            "#0560a6";
          document.getElementById("save_check").style.color = "#ffffff";
          return false;
        } else {
          document.getElementById("save_check").style.color = "#c3c3c3";
          return true;
        }
      }
      if (btn == "reassign") {
        if ($scope.user.fosname) return false;
      } else {
        // document.getElementById("doneButton").style.color = "#c3c3c3";
        document.getElementById("doneButton").style.color = "white";
        document.getElementById("doneButton").style.border = "none";
        return true;
      }
    };

    // $scope.disabled_Submit=function(){
    //   if($scope.user.comment)
    //   return "false";
    //   else return "true";
    // }

    $scope.REJECTION_ANALYSIS = function (card, index) {
      if (card.STATUS != "N") {
        var RAISED_BY = card.RAISED_BY.split("(")[1].split(")")[0];
        if ($scope.loginServiceData[0].system_role == "BS")
          if (
            RAISED_BY == "BS" ||
            RAISED_BY == "DVUM" ||
            RAISED_BY == "DVUC" ||
            RAISED_BY == "ACC"
          )
            return true;
          else return false;
        //if($scope.loginServiceData[0].system_role=='DVUM')if(RAISED_BY=='DVUM')return true; else return false;
        if ($scope.loginServiceData[0].system_role == "DVUC")
          if (RAISED_BY == "DVUM" || RAISED_BY == "DVUC" || RAISED_BY == "ACC")
            return true;
          else return false;
        else if (
          $scope.loginServiceData[0].system_role == "DVUM" ||
          $scope.loginServiceData[0].system_role == "SIGN" ||
          $scope.loginServiceData[0].system_role == "ACC"
        )
          return false;
      }
    };

    $scope.disabledButton_accept = function (btn) {
      if (btn.ACTION_NAME == "ACCEPT") {
        $scope.X_tabJSONObj = $filter("byProp")(
          $scope.tabJSONObj,
          "AcceptStatus",
          "true"
        );
        if (
          $scope.loginServiceData[0].system_role == "SIGN" ||
          $scope.loginServiceData[0].system_role == "RECON" ||
          $scope.loginServiceData[0].system_role == "SWEEP"||
          ($scope.loginServiceData[0].system_role == "ACC" && $scope.selectedQ["queue_id"]==100)
        ) {
          return true;
        } else if (
          ($scope.X_tabJSONObj.length == 13 &&
            $scope.selectedQ["queue_id"] == 1) ||
          $scope.X_tabJSONObj.length == 14
        ) {
          if (
            $scope.loginServiceData[0].system_role == "BS" &&
            $scope.RejectionQueueData
          ) {
            if ($scope.RejectionQueueData[0].STATUS == "N") {
              return true;
            } else {
              $scope.X_RejectionData_BS = $filter("byProp")(
                $scope.RejectionQueueData,
                "STATUS",
                "BS_APPROVE"
              );
              $scope.X_RejectionData_DVUC = $filter("byProp")(
                $scope.RejectionQueueData,
                "STATUS",
                "DVUC_APPROVE"
              );
              $scope.X_RejectionData_DVUM = $filter("byProp")(
                $scope.RejectionQueueData,
                "STATUS",
                "DVUM_APPROVE"
              );
              //$scope.X_RejectionData_ACC=$filter('byProp')($scope.RejectionQueueData ,'STATUS' , "ACC_APPROVE");
              if (
                $scope.X_RejectionData_BS.length +
                $scope.X_RejectionData_DVUM.length +
                $scope.X_RejectionData_DVUC.length ==
                $scope.RejectionQueueData.length
              )
                return true;
              else {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message:
                    "Kindly approve all rejections in the rejections raised tab to proceed further.",
                  actionLabel: ["Ok"],
                });
              }
            }
          } else if (
            $scope.loginServiceData[0].system_role == "DVUC" &&
            $scope.RejectionQueueData
          ) {
            if (
              !$scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC.CRILC.VALUE &&
              !$scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC.CRILC.VALUE
            ) {
              return true;
            } else if ($scope.RejectionQueueData[0].STATUS == "N") {
              return true;
            } else {
              $scope.X_RejectionData_DVU_NEW = [];
              //$scope.X_RejectionData_pending=[];
              $scope.X_RejectionData_BS = $filter("byProp")(
                $scope.RejectionQueueData,
                "STATUS",
                "BS_APPROVE"
              );
              $scope.X_RejectionData_DVUC = $filter("byProp")(
                $scope.RejectionQueueData,
                "STATUS",
                "DVUC_APPROVE"
              );
              for (i = 0; i < $scope.X_RejectionData_BS.length; i++) {
                var RAISED_BY =
                  $scope.X_RejectionData_BS[i].RAISED_BY.split("(")[1].split(
                    ")"
                  )[0];
                if (
                  RAISED_BY == "DVUC" ||
                  RAISED_BY == "DVUM" ||
                  RAISED_BY == "ACC"
                ) {
                  $scope.X_RejectionData_DVU_NEW.push(
                    $scope.X_RejectionData_BS[i]
                  );
                }
              }
              if ($scope.X_RejectionData_DVU_NEW.length > 0) {
                $scope.X_RejectionData_DVUC_NEW = $filter("byProp")(
                  $scope.X_RejectionData_DVU_NEW,
                  "STATUS",
                  "DVUC_APPROVE"
                );
                if (
                  $scope.X_RejectionData_DVUC_NEW.length ==
                  $scope.X_RejectionData_DVU_NEW.length
                )
                  return false;
                else return true;
              } else if (
                $scope.X_RejectionData_BS.length +
                $scope.X_RejectionData_DVUC.length ==
                $scope.RejectionQueueData.length
              )
                return true;
              else {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message:
                    "Kindly approve all rejections in the rejections raised tab to proceed further.",
                  actionLabel: ["Ok"],
                });
              }
            }
          } else if (
            $scope.loginServiceData[0].system_role == "DVUM" &&
            $scope.RejectionQueueData
          ) {
            if (
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.hasOwnProperty(
                "AMLOCK_CRILC"
              ) &&
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC.hasOwnProperty(
                "AMLOCK"
              ) &&
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC.hasOwnProperty(
                "CRILC"
              )
            ) {
              if (
                !$scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC.AMLOCK &&
                !$scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC.CRILC
              ) {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Select AMLOCK CRILIC values.",
                  actionLabel: ["Ok"],
                });
                return false;
              } else if ($scope.RejectionQueueData[0].STATUS == "N") {
                return true;
              } else {
                $scope.X_RejectionData_BS = $filter("byProp")(
                  $scope.RejectionQueueData,
                  "STATUS",
                  "BS_APPROVE"
                );
                //$scope.X_RejectionData_DVUM=$filter('byProp')($scope.RejectionQueueData ,'STATUS' , "DVUM_APPROVE");
                if (
                  $scope.X_RejectionData_BS.length ==
                  $scope.RejectionQueueData.length
                )
                  return true;
                else {
                  dmDialogueBox.alertBox({
                    title: "Alert",
                    message:
                      "Kindly approve all rejections in the rejections raised tab to proceed further.",
                    actionLabel: ["Ok"],
                  });
                }
              }
            } else {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Select AMLOCK CRILIC values.",
                actionLabel: ["Ok"],
              });
            }
          }
          //  else if(( $scope.loginServiceData[0].system_role=='ACC')&& $scope.RejectionQueueData){
          //         return false;
          // }
          else if (
            $scope.loginServiceData[0].system_role == "ACC" &&
            $scope.RejectionQueueData
          ) {
            if ($scope.RejectionQueueData[0].STATUS == "N") {
              return true;
            } else {
              $scope.X_RejectionData_BS = $filter("byProp")(
                $scope.RejectionQueueData,
                "STATUS",
                "BS_APPROVE"
              );
              $scope.X_RejectionData_DVUC = $filter("byProp")(
                $scope.RejectionQueueData,
                "STATUS",
                "DVUC_APPROVE"
              );
              if (
                $scope.X_RejectionData_BS.length +
                $scope.X_RejectionData_DVUC.length ==
                $scope.RejectionQueueData.length
              )
                return true;
              // else{
              //     dmDialogueBox.alertBox({
              //       title: 'Alert',
              //       message: "Kindly approve all rejections in the rejections raised tab to proceed further.",
              //       actionLabel: ['Ok']
              //     });
              //   };
            }
          } else {
            dmDialogueBox.alertBox({
              title: "Alert",
              message:
                "Kindly approve all rejections in the rejections raised tab to proceed further.",
              actionLabel: ["Ok"],
            });
          }
        } else {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Kindly verify all KYC details to proceed further.",
            actionLabel: ["Ok"],
          });
        }
      }
    };
    // $scope.disabledButton = function (btn, card) {
    //   if (btn.ACTION_NAME == 'REJECT') {
    //     $scope.reject_count = 0;
    //     if ($scope.RejectionQueueData) {
    //       if ($scope.RejectionQueueData[0].STATUS == 'N') return true;
    //       else {
    //         for (i = 0; i < $scope.RejectionQueueData.length; i++) {
    //           if ($scope.RejectionQueueData[i].STATUS == 'pending_rejection')
    //             $scope.reject_count++;
    //         }
    //         if ($scope.reject_count > 0)
    //           return false;
    //         else return true;

    //       }
    //     } else {
    //       return true;
    //     }
    //   }

    //   if (btn.ACTION_NAME == 'EXIT') {
    //     return false;
    //   }

    // }
    $scope.disabledButton = function (btn, card) {
      if (btn.ACTION_NAME == "REJECT") {
        $scope.reject_count = 0;
        if ($scope.RejectionQueueData) {
          if ($scope.RejectionQueueData[0].STATUS == "N") return true;
          else {
            for (i = 0; i < $scope.RejectionQueueData.length; i++) {
              if ($scope.RejectionQueueData[i].STATUS == "pending_rejection")
                $scope.reject_count++;
            }
            if ($scope.reject_count > 0) return false;
            else return true;
          }
        } else {
          return true;
        }
      }
      if (btn.ACTION_NAME == "HOLD") {
        $scope.reject_count = 0;
        if ($scope.RejectionQueueData) {
          if ($scope.RejectionQueueData[0].STATUS == "N") return true;
          else {
            for (i = 0; i < $scope.RejectionQueueData.length; i++) {
              if ($scope.RejectionQueueData[i].STATUS == "pending_rejection")
                $scope.reject_count++;
            }
            if ($scope.reject_count > 0) return false;
            else return true;
          }
        } else {
          return true;
        }
      }
      if (btn.ACTION_NAME == "ACCEPT") {
        $scope.X_tabJSONObj = $filter("byProp")(
          $scope.tabJSONObj,
          "AcceptStatus",
          "true"
        );
        if (
          $scope.loginServiceData[0].system_role == "SIGN" ||
          $scope.loginServiceData[0].system_role == "RECON"||
          ($scope.loginServiceData[0].system_role == "ACC" && $scope.selectedQ["queue_id"]==100)
        ) {
          return false;
        }
        if (
          $scope.loginServiceData[0].system_role == "BS" &&
          $scope.RejectionQueueData
        ) {
          return false;
        } else if (
          ($scope.X_tabJSONObj.length == 13 &&
            $scope.selectedQ["queue_id"] == 1) ||
          $scope.X_tabJSONObj.length == 14
        ) {
          if (
            $scope.loginServiceData[0].system_role == "DVUC" &&
            $scope.RejectionQueueData
          ) {
            if (
              !$scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC.AMLOCK &&
              !$scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC.CRILC
            ) {
              return true;
            } else if (
              $scope.RejectionQueueData[0].STATUS == "N"
              //  && $scope.cibil_pdf_status
            ) {
              return false;
            } else {
              $scope.X_RejectionData_DVU_NEW = [];
              $scope.X_RejectionData_BS = $filter("byProp")(
                $scope.RejectionQueueData,
                "STATUS",
                "BS_APPROVE"
              );
              $scope.X_RejectionData_DVUC = $filter("byProp")(
                $scope.RejectionQueueData,
                "STATUS",
                "DVUC_APPROVE"
              );
              for (i = 0; i < $scope.X_RejectionData_BS.length; i++) {
                var RAISED_BY =
                  $scope.X_RejectionData_BS[i].RAISED_BY.split("(")[1].split(
                    ")"
                  )[0];
                if (
                  RAISED_BY == "DVUC" ||
                  RAISED_BY == "DVUM" ||
                  RAISED_BY == "ACC"
                ) {
                  $scope.X_RejectionData_DVU_NEW.push(
                    $scope.X_RejectionData_BS[i]
                  );
                }
              }
              if ($scope.X_RejectionData_DVU_NEW.length > 0) {
                $scope.X_RejectionData_DVUC_NEW = $filter("byProp")(
                  $scope.X_RejectionData_DVU_NEW,
                  "STATUS",
                  "DVUC_APPROVE"
                );
                if (
                  $scope.X_RejectionData_DVUC_NEW.length ==
                  $scope.X_RejectionData_DVU_NEW.length
                )
                  return false;
                else return true;
              } else if (
                ($scope.X_RejectionData_BS.length +
                  $scope.X_RejectionData_DVUC.length ==
                  $scope.RejectionQueueData.length)
                  // &&  $scope.cibil_pdf_status
              ) {
                return false;
              } else {
                return true;
              }
            }
          } else if (
            $scope.loginServiceData[0].system_role == "DVUM" &&
            $scope.RejectionQueueData
          ) {
            if (
              !$scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC.AMLOCK &&
              !$scope.GetJSONData.AOF_CP.ENTITY_DATA.AMLOCK_CRILC.CRILC
            ) {
              return true;
            } else if (
              $scope.RejectionQueueData[0].STATUS == "N"
              // && $scope.cibil_pdf_status
            ) {
              return false;
            } else {
              $scope.X_RejectionData_BS = $filter("byProp")(
                $scope.RejectionQueueData,
                "STATUS",
                "BS_APPROVE"
              );
              if (
                $scope.X_RejectionData_BS.length ==
                $scope.RejectionQueueData.length
              )
                return false;
              else return true;
            }
          } else if (
            $scope.loginServiceData[0].system_role == "ACC" &&
            $scope.RejectionQueueData
          ) {
            if ($scope.RejectionQueueData[0].STATUS == "N") {
              return false;
            } else {
              $scope.X_RejectionData_BS = $filter("byProp")(
                $scope.RejectionQueueData,
                "STATUS",
                "BS_APPROVE"
              );
              $scope.X_RejectionData_DVUC = $filter("byProp")(
                $scope.RejectionQueueData,
                "STATUS",
                "DVUC_APPROVE"
              );
              if (
                $scope.X_RejectionData_BS.length +
                $scope.X_RejectionData_DVUC.length ==
                $scope.RejectionQueueData.length
              )
                return false;
              else return true;
            }
          }
        } else return true;
      }
      if (btn.ACTION_NAME == "EXIT") {
        return false;
      }
    };
    // -----------------------------------Service Call--------------------------------

    $scope.getNomineeValue = function () {
      if (
        $scope.GetJSONData.AOF_CP.ENTITY_DATA.NOMINEE_ENTERED.VALUE === "No"
      ) {
        return "13"; //2
      } else if (
        $scope.GetJSONData.AOF_CP.ENTITY_DATA.NOMINEE_ENTERED.VALUE === "Yes"
      ) {
        return "7"; //1
      } else {
        return "";
      }
    };

    $scope.accRegistration = function () {
      var body = {
        SEND_SMS_YBL: [
          {
            messageId: $scope.getNomineeValue(),
            messageOtp: $scope.selectedGrid.x_account_number,
            mobileNumber: $scope.selectedGrid.x_mobile_number,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* SEND_SMS_YBL */**", res);
            if (res.data["SEND_SMS_YBL"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["SEND_SMS_YBL"][0].hasOwnProperty("data")) {
              if (res.data.SEND_SMS_YBL[0].data[0].process_status == "SUCCESS")
                $location.path("/home");
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

    $scope.getAuditTrail = function () {
      var body = {
        spauditdatamaintainlog: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spauditdatamaintainlog */**", res);
            if (res.data["spauditdatamaintainlog"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spauditdatamaintainlog"][0].hasOwnProperty("data")
            ) {
              $scope.auditTrail = res.data.spauditdatamaintainlog[0].data;
              if ($scope.auditTrail.length == 0) {
                $scope.auditTrail = [
                  {
                    "lead_id": "",
                    "attribut_name": "",
                    "attribute_new_value": "",
                    "attribut_old_value": "",
                    "created_by": "",
                    "created_date": "",
                  }
                ];
              }
              console.log("showAuditTrail" + $scope.showAuditTrail);
              if ($scope.auditTrail.length == 0) $scope.showAuditTrail = true;
              else $scope.showAuditTrail = false;
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

    $scope.get_all_rejection_summary = function () {
      var body = {
        spgetrejectiondetail: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
            x_queue_id: $scope.selectedQ["queue_id"],
            x_login_id: $scope.username,
          },
        ],
      };
      // $scope.showLoader('Loading.....');
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          //   $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spgetrejectiondetail*/**", res);
            if (res.data["spgetrejectiondetail"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spgetrejectiondetail"][0].hasOwnProperty("data")
            ) {
              if (res.data.spgetrejectiondetail[0].data[0].STATUS == "N")
                $scope.RejectionQueueData =
                  res.data.spgetrejectiondetail[0].data;
              else
                $scope.RejectionQueueData =
                  res.data.spgetrejectiondetail[0].data;
              console.log($scope.RejectionQueueData);
              // for(i=0;i<$scope.RejectionQueueData.length;i++){
              //   if($scope.user.rejID){
              //       if($scope.user.rejID==$scope.RejectionQueueData[i].REJECTION_ID)
              //   $scope.RejectionQueueData[i]['deleteStatus']=true;
              //   }else
              //   $scope.RejectionQueueData[i]['deleteStatus']=false;
              //   }
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
    };

    $scope.rejectionAction = function (btn, user) {
      var body = {
        sprejectionactioncomp: [
          {
            x_primary_key1: $scope.selectedGrid.x_lead_id,
            x_rejection_id: user.rejID,
            x_role: $scope.setRole ? $scope.setRole : "",
            x_rejection_desc: user.rejReasn,
            x_rejection_category: user.rejection_category,
            x_rejection_sub_category: user.rejection_sub_category,
            x_rejection_remarks: user.remark,
            x_queue_id: $scope.selectedQ["queue_id"],
            x_login_id: $scope.username,
            x_status: "pending_rejection",
            x_index: $scope.setIndex || "x",
          },
        ],
      };
      $scope.showLoader("Loading.....");
      console.log("bodybodybodybodybody", body);
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* sprejectionactioncomp*/**", res);
            if (res.data["sprejectionactioncomp"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["sprejectionactioncomp"][0].hasOwnProperty("data")
            ) {
              $scope.rejectioSubmit = JSON.parse(
                res.data.sprejectionactioncomp[0].data[0].v_string
              );
              if ($scope.rejectioSubmit.RESULT[0].IS_SUCCESS == "Y") {
                $scope.user = {};
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Your rejection raised successfully.",
                  actionLabel: ["Ok"],
                });
              } else if ($scope.rejectioSubmit.RESULT[0].IS_SUCCESS == "N") {
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: $scope.rejectioSubmit.RESULT[0].MESSAGE,
                  actionLabel: ["Ok"],
                });
              }
              $scope.get_all_rejection_summary();
              //   $scope.user.setRejectStatus=true;
              // $scope.getJsonDataForOV();
              //$scope.rejection_raised_view();
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
    };

    $scope.getRejectionData = function (rejectID) {
      console.log($scope.tabJSONObj);
      var body = {
        spgetrejectionsublistcomp: [
          {
            x_rejection_id: rejectID,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spgetrejectionsublistcomp*/**", res);
            if (
              res.data["spgetrejectionsublistcomp"][0].hasOwnProperty("error")
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spgetrejectionsublistcomp"][0].hasOwnProperty("data")
            ) {
              $scope.dataSubList =
                res.data.spgetrejectionsublistcomp[0].data[0];
              $scope.user.rejReasn = $scope.dataSubList.rejection_desc;
              $scope.user.rejection_category =
                $scope.dataSubList.rejection_category;
              $scope.user.rejection_sub_category =
                $scope.dataSubList.rejection_sub_category;
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
    };
    $scope.setRejectionArray = function (arr, count, btn, set_status) {
      var body = {
        sprejarrayinsert: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
            x_rej_array: JSON.stringify(arr),
            x_login_id: $scope.username,
            x_rej_count: String(count.length),
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* sprejarrayinsert */**", res);
            if (res.data["sprejarrayinsert"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["sprejarrayinsert"][0].hasOwnProperty("data")) {
              // console.log(res);
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

    $scope.getSetJSON = function (btn, set_status) {
      var body = {
        sprejectionlistcomp: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* sprejectionlistcomp*/**", res);
            if (res.data["sprejectionlistcomp"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["sprejectionlistcomp"][0].hasOwnProperty("data")
            ) {
              if (res.data.sprejectionlistcomp[0].data.length !== 0) {
                $scope.getRejectionList = res.data.sprejectionlistcomp[0].data;
                console.log("$scope.getRejectionList", $scope.getRejectionList);
                $scope.rejection_array = [];
                $scope.count = $filter("byProp")(
                  $scope.RejectionQueueData,
                  "STATUS",
                  "pending_rejection"
                );
                for (i = 0; i < $scope.getRejectionList.length; i++) {
                  $scope.rejection_array.push({
                    REJECTION_DESC: $scope.getRejectionList[i].REJECTION_DESC,
                    REJECTION_CATEGORY:
                      $scope.getRejectionList[i].REJECTION_CATEGORY,
                    REJECTION_SUB_CATEGORY:
                      $scope.getRejectionList[i].REJECTION_SUB_CATEGORY,
                    SCREEN_NAME: $scope.getRejectionList[i].SCREEN_NAME,
                    CONTROL_ID: $scope.getRejectionList[i].CONTROL_ID,
                    FORM_ID: $scope.getRejectionList[i].SCREEN_ID,
                    REJECTION_STATUS: $scope.getRejectionList[i].STATUS,
                    REJECTION_REMARKS:
                      $scope.getRejectionList[i].REJECTION_REMARKS,
                    REJ_ID: $scope.getRejectionList[i].REJ_ID,
                    REJECTION_ID: $scope.getRejectionList[i].REJECTION_ID,
                    INDEX: $scope.getRejectionList[i].INDEX_VALUE,
                    STAKE_ROLE: $scope.getRejectionList[i].STAKE_ROLE,
                  });
                }
                console.log("$scope.rejection_array" + $scope.rejection_array);
                // for(let i=0;i<$scope.rejection_array.length;i++){
                //      if($scope.rejection_array[i].REJECTION_ID == "RAJ190"){
                //       delete $scope.rejection_array[i].REJECTION_ID
                //      }
                // }
                // console.log("$scope.rejection_array", $scope.rejection_array)
                //   $scope.GetJSONData.AOF_CP.ENTITY_DATA.CHOLDER[0].PENDING_REJECTION_COUNT=$scope.count.length;
                //   $scope.GetJSONData.AOF_CP.ENTITY_DATA.CHOLDER[0].REJECTED_BY=$scope.loginServiceData[0].system_role;
                //   if($scope.loginServiceData[0].system_role=='DVUM' || $scope.loginServiceData[0].system_role=='ACC' ){
                //   $scope.GetJSONData.AOF_CP.WORKFLOW_STATUS.STATUS=$scope.loginServiceData[0].system_role+'_REJECTED';
                // }else{
                //   $scope.GetJSONData.AOF_CP.WORKFLOW_STATUS.STATUS='REJECTED';
                // }
                //   $scope.GetJSONData.AOF_CP.WORKFLOW_STATUS.STATUS_TIMESTAMP = today;
                //   $scope.setJSONUpdate(btn,set_status);
                $scope.setRejectionArray(
                  $scope.rejection_array,
                  $scope.count,
                  btn,
                  set_status
                );
                $scope.buttonAction(btn, set_status);
              } else {
                console.log(
                  "reject list is empty----->" +
                  res.data.sprejectionlistcomp[0].data
                );
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
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
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };

    $scope.FOs_list = function (btn, set_status) {
      var body = {
        spfounderbs: [
          {
            x_login_id: $scope.username,
          },
        ],
      };
      // $scope.showLoader('Loading...');
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          //   $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spfounderbs*/**", res);
            if (res.data["spfounderbs"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: res.data.spfounderbs[0].error.message,
                actionLabel: ["Ok"],
              });
            } else if (res.data["spfounderbs"][0].hasOwnProperty("data")) {
              $scope.fos = res.data.spfounderbs[0].data;
              console.log($scope.fos);
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

    $scope.getMsmeValue = function () {
      if (
        $scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.MSME_SINGLE.VALUE ||
        $scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.MSME_BULK ||
        $scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.MSME_SALARY
      )
        return "Yes";
      else return "No";
    };

    $scope.change_dateFormat = function (date) {
      var new_date = date.split(" ")[0];
      new_date =
        new_date.split("-")[2] +
        "-" +
        new_date.split("-")[1] +
        "-" +
        new_date.split("-")[0];
      return new_date + "T" + date.split(" ")[1];
    };

    $scope.getacc = function () {
      if (
        // $scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.KIT_TYPE.VALUE ==
        // "Non Insta"
        $scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.KIT_TYPE.VALUE === "Non Insta" ||
    $scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.KIT_TYPE.VALUE === "Non-Insta"
      )
        return "Non-IKIT";
      else if (
        $scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.KIT_TYPE.VALUE == "Insta"
      )
        return "I Kit";
    };

    $scope.newgen_createCase = function (btn, set_status) {
      $scope.removeRecommended = function(value) {
        if (value.includes("(Recommended)")) {
            return value.replace(/\(Recommended\)/, '');
        }else if(value.includes("(recommended)")){
          return value.replace(/\(recommended\)/, '');
        }
        return value;
    };    
      var body = {
        BASE_NEWGEN_SERVICE: [
          {
            ackn_date: $scope.change_dateFormat(
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.LEAD_SINCE
            ),
            app_form_date: $scope.change_dateFormat(
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.LEAD_SINCE
            ),
            barcode: $scope.selectedGrid.x_lead_id2,
            buss_segment:
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.RM_DECLARATION.Buss_segment
                .VALUE,
            ca_acc_type: $scope.getacc(),
            ca_account_no: $scope.GetJSONData.AOF_CP.ENTITY_DATA.ACC_NUMBER,
            ca_aof_identifier: "New",
            ca_base_prod_type: "Non - Individual",
            ca_constitution_field: "Partnership",
            ca_mandate_holder: "No",
            ca_nominee: "",
            ca_prod_code:
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.PRODUCT_CODE.CODE,
            ca_prod_name: "",
            channel_type: "DECIMAL",
            contact_no: $scope.GetJSONData.AOF_CP.ENTITY_DATA.CHOLDER[0].MOBILE,
            // cust_category:
            //   $scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT
            //     .VALUE,
            cust_category:$scope.cust_category = $scope.removeRecommended($scope.GetJSONData.AOF_CP.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT.VALUE),
            cust_id: $scope.GetJSONData.AOF_CP.ENTITY_DATA.CUST_ID || "",
            cust_name:
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.CHOLDER[0].SEL_ENTITY_NAME,
            cust_type: "New",
            fatca_annexure: "",
            fatca_applicable: "YES",
            lead_id: $scope.selectedGrid.x_lead_id2,
            main_appl_pan_number:
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.CHOLDER[0].PAN_NUM,
            mdm_id: "",
            msme: "",
            negative_chklist: "Yes",
            opening_branch_id:
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.BRANCH.BRANCH_CODE.CODE,
            opening_branch_name: "",
            pan_detail: "PAN",
            prewelcomecalling: "Completed",
            prod_opt: " CURRENT",
            scanning_decision: "No",
            session_id: "",
            source_branch_id:
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.BRANCH.BRANCH_CODE.CODE,
            source_branch_name: "",
            sourcing_rm_code:
              $scope.GetJSONData.AOF_CP.ENTITY_DATA.RM_DECLARATION.sourceCode,
            threeinone_ao: "No",
            // newgen_leadid: $scope.GetJSONData.AOF_CP.ENTITY_DATA.LEADiD,
             newgen_leadid: "",
          },
        ],
      };
      $scope.showLoader("Loading...");
      console.log(body);
      apiGateway.doPost(newplatwareHeaderV2, body, {}).then(res=>{
      // executeApi(newplatwareHeaderV2, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.BASE_NEWGEN_SERVICE.status == "success") {
            console.log("**/* BASE_NEWGEN_SERVICE*/**", res);
            // if (res.data["BASE_NEWGEN_SERVICE"][0].hasOwnProperty("error")) {
            //   dmDialogueBox.alertBox({
            //     title: "Alert",
            //     message: "Oop's Something went wrong",
            //     actionLabel: ["Ok"],
            //   });
            // } 
            // else if (res.data["BASE_NEWGEN_SERVICE"][0].hasOwnProperty("data")) {
              // if(BASE_NEWGEN_SERVICE.data.status.toLowerCase() == "success") {
              if (res.BASE_NEWGEN_SERVICE?.data?.status?.toLowerCase() == "success") {
                // var response_data = res.data.BASE_NEWGEN_SERVICE[0].data[0];
                var trackerId=res.BASE_NEWGEN_SERVICE.data.trackerId;
                if (trackerId) {
                  dmDialogueBox
                    .alertBox({
                      title: "Message",
                      message: "AO Case created successfully.TrackerId is : " + trackerId,
                      actionLabel: ["Ok"],
                    })
                    .then(function (res) {
                      switch (res) {
                        case true:
                          $location.path("/home");
                      }
                    });
                  var body = {
                    spsetprcgrpdispd2: [
                      {
                        x_lead_id: $scope.selectedGrid.x_lead_id,
                        x_prc_group: $scope.loginServiceData[0].x_prc_grp,
                        x_new_disposition: $scope.loginServiceData[0].x_prc_grp,
                        x_aof_id: $scope.selectedGrid.x_lead_id,
                        x_crn_no: "",
                        x_member_id: "",
                        x_is_isstart: "",
                        x_login_id: $scope.username,
                        x_processid:
                          "YBL_" +
                          $scope.loginServiceData[0].x_prc_grp +
                          btn.ACTION_NAME,
                        x_ref_input_1: $scope.loginServiceData[0].x_prc_grp,
                        x_disp_level: "",
                        x_text_1: set_status,
                        x_ref_input_2: "",
                        x_text_2: "",
                        x_text_3: "",
                        x_text_4: "",
                        x_text_5: "",
                      },
                    ],
                  };
                  console.log("body", body);
                  executeApi(newplatwareHeader, body, function (res) {
                    $scope.$evalAsync(function () {
                      $scope.hideLoader();
                      if (res.status == true) {
                        console.log("**/* spsetprcgrpdispd2 */**", res);
                        if (
                          res.data["spsetprcgrpdispd2"][0].hasOwnProperty(
                            "error"
                          )
                        ) {
                          console.log("spsetprcgrpdispd2 Failed" + body);
                          $location.path("/home");
                          // dmDialogueBox.alertBox({
                          //   title: 'Alert',
                          //   message: "Oop's Something went wrong",
                          //   actionLabel: ['Ok']
                          //});
                        } else if (
                          res.data["spsetprcgrpdispd2"][0].hasOwnProperty(
                            "data"
                          )
                        ) {
                          if (
                            res.data.spsetprcgrpdispd2[0].data[0].STATUS == "Y"
                          ) {
                            $location.path("/home");
                            // sessionStorage.removeItem('AMLOCK');
                            // sessionStorage.removeItem('CRILC');
                          } else {
                            $location.path("/home");
                            // dmDialogueBox.alertBox({
                            //   title: 'Server Error',
                            //   message: 'Error Connecting to server..',
                            //   actionLabel: ['Ok']
                            // });
                          }
                        } else {
                          $scope.hideLoader();
                          console.log("spsetprcgrpdispd2 something went wrong");
                          $location.path("/home");
                          // dmDialogueBox.alertBox({
                          //   title: 'Message',
                          //   message: "Oop's Something went wrong",
                          //   actionLabel: ['Ok']
                          // });
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
                } else {
                  dmDialogueBox.alertBox({
                    title: "Message",
                    message:
                      "Case cannot be updated in NewGen , TrackerID not found. ",
                    actionLabel: ["Ok"],
                  });
                }
              // } 
              // else {
              // $scope.hideLoader();
              // dmDialogueBox.alertBox({
              //   title: "Message",
              //   message: "Oop's Something went wrong",
              //   actionLabel: ["Ok"],
              // });
            }
            // } else {
            //   $scope.hideLoader();
            //   dmDialogueBox.alertBox({
            //     title: "Message",
            //     message: "Oop's Something went wrong",
            //     actionLabel: ["Ok"],
            //   });
            // }
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

    // $scope.newgen_doc=function(res){
    //   var body={
    //     "NGO_ADD_DOCUMENT":[{
    //       dbid:res.dbId,
    //       folderIndex:res.folderIndex,
    //       userId:$scope.username,
    //       userRole:$scope.loginServiceData[0].system_role,
    //       leadId:res.leadId
    //     }]
    //   }
    //   $scope.showLoader('Loading...');
    // executeApi(newplatwareHeader, body, function(res) {
    //    $scope.$apply(function() {
    //     $scope.hideLoader();
    //        if(res.status==true){
    //         console.log('**/* AO_CASE_INITIATION*/**',res);
    //         if(res.data['AO_CASE_INITIATION'][0].hasOwnProperty('error')){
    //           $scope.hideLoader();
    //           dmDialogueBox.alertBox({
    //             title: 'Alert',
    //             message: res.data.AO_CASE_INITIATION[0].error.message,
    //             actionLabel: ['Ok']
    //            });
    //          }
    //         else{
    //           $scope.hideLoader();
    //                console.log(res);
    //       }
    //     }
    //     else{
    //       $scope.hideLoader();
    //       dmDialogueBox.alertBox({
    //           title: 'Server Error',
    //           message: 'Error Connecting to server..',
    //           actionLabel: ['Ok']
    //          });
    //     }
    // })
    // })
    // }

    $scope.lead_reassign = function (obj) {
      $scope.reassign_lead(obj);
    };

    $scope.reassign_lead = function (obj) {
      var body = {
        spleadreassign: [
          {
            x_login_id: obj.split("-")[0],
            x_lead_id: $scope.selectedGrid.x_lead_id,
          },
        ],
      };
      $scope.showLoader("Loading...");
      let isFO_same = false;
      if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.hasOwnProperty('REASSIGN_LOGINID')) {
        if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.REASSIGN_LOGINID == "") {
          if (obj.split("-")[0] == $scope.GetJSONData.AOF_CP.USER_DETAILS.FO_ID) {
            isFO_same = true;
          }
        }
        if (obj.split("-")[0] == $scope.GetJSONData.AOF_CP.ENTITY_DATA.REASSIGN_LOGINID) {
          isFO_same = true;
        }
      } else {
        if (obj.split("-")[0] == $scope.GetJSONData.AOF_CP.USER_DETAILS.FO_ID) {
          isFO_same = true;
        }
      }
      if (!isFO_same) {
        executeApi(newplatwareHeader, body, function (res) {
          $scope.$apply(function () {
            $scope.hideLoader();
            if (res.status == true) {
              console.log("**/* spleadreassign*/**", res);
              if (res.data["spleadreassign"][0].hasOwnProperty("error")) {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (res.data["spleadreassign"][0].hasOwnProperty("data")) {
                if (res.data.spleadreassign[0].data[0].status == "Y") {
                  $scope.reassign_Popup = false;
                  $scope.user = {};
                  dmDialogueBox
                    .alertBox({
                      title: "Message",
                      message:
                        "Lead is sucessfully Reassign to " + obj.split("-")[0],
                      actionLabel: ["Ok"],
                    })
                    .then(function (res) {
                      switch (res) {
                        case true:
                          $location.path("/home");
                      }
                    });
                } else {
                  $scope.hideLoader();
                  dmDialogueBox.alertBox({
                    title: "Server Error",
                    message: "Error Connecting to server..",
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
                title: "Message",
                message: "Error Connecting to server..",
                actionLabel: ["Ok"],
              });
            }
          });
        });
      } else {
        $scope.hideLoader();
        $scope.closePop_up('reassign');
        dmDialogueBox.alertBox({
          title: "Message",
          message: "Lead is already assigned to " + obj.split("-")[0],
          actionLabel: ["Ok"],
        });
      }
    };

    $scope.Delete_lead = function () {
      dmDialogueBox
        .confirmBox({
          title: "Message",
          message: "Do you want to discard the Case?",
          actionLabel: ["No", "Yes"],
        })
        .then(function (res) {
          switch (res) {
            case true:
              // $scope.GetJSONData.AOF_CP.WORKFLOW_STATUS.STATUS="DISCARD";
              //$scope.setJSONUpdate('DISCARD');
              // $scope.discard_lead();
              if(($scope.selectedQ["queue_id"] == "3" || $scope.selectedQ["queue_id"] == "10") && $scope.loginServiceData[0].system_role == "BS"){
                $scope.drop_status_fun();
               
              }
              else $scope.discard_lead();
          }
        });
    };
    $scope.current_popup_name = "";
    $scope.drop_type=null;
    // $scope.Drop_check_popup_cmp=false;

    $scope.drop_status_fun = function () {
      // $scope.optionalField['LOVY_DOPS_DROP_REASON']
      $scope.getLOVoption('LOVY_DOPS_DROP_REASON');
      $scope.current_popup_name = "Drop_check_popup_cmp";
      $scope.Drop_check_popup_cmp = true;
    };

    $scope.drop_status_close = function () {
      // $scope.Iscan_fields = [];
      $scope.current_popup_name = "";
      $scope.Drop_check_popup_cmp = false;
      $scope.drop_type=null;
    };
    $scope.drop_status_insert=function(val){
      $scope.discard_lead_insert(val);
    }
    
    $scope.discard_lead = function () {
      var body = {
        spleaddiscard: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spleaddiscard */**", res);
            if (res.data["spleaddiscard"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spleaddiscard"][0].hasOwnProperty("data")) {
              if (res.data.spleaddiscard[0].data[0].status == "Y") {
                $location.path("/home");
              }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Server Error",
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
    };

    $scope.discard_lead_insert = function (val) {
      var body = {
        spinsertdiscardreason: [
          {
            x_lead_id :$scope.selectedGrid.x_lead_id2,
            x_login_id : $scope.username,
            x_drop_reason:val.VALUE,
            x_remarks: '',
            x_source :$scope.selectedGrid.x_lead_source,
            x_text1:'DOPS',
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spinsertdiscardreason */**", res);
            if (res.data["spinsertdiscardreason"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spinsertdiscardreason"][0].hasOwnProperty("data")) {
              if (res.data.spinsertdiscardreason[0].data[0].status == "Y") {
                // $location.path("/home");
                $scope.discard_lead();
                $scope.drop_status_close();
              }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Server Error",
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
    };


    



    $scope.myFilter = function () {
      console.log($scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE);
      if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE) {
        $scope.duplicateObjectType = [
          ...$scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE,
        ];
        $scope.duplicateObjectType.sort((a, b) => {
          if (a.Sort == "Y") return 1;
          else if (a.Sort == "N") return -1;
          else return -1;
        });
      }
    };

    // $scope.delete_enable=function(){
    //   var body = {
    //     "sprejectiondeletestatusupdate": [{
    //       x_lead_id :$scope.selectedGrid.x_lead_id,
    //      }]
    //       }
    //         $scope.showLoader('Loading.....');
    //         executeApi(newplatwareHeader, body, function(res) {

    //             $scope.$apply(function() {
    //                 $scope.hideLoader();
    //                 if(res.status==true){
    //                   console.log('**/* sprejectiondeletestatusupdate */**',res);
    //                   if(res.data['sprejectiondeletestatusupdate'][0].hasOwnProperty('error')){
    //                       dmDialogueBox.alertBox({
    //                         title: 'Alert',
    //                         message: "Oop's Something went wrong",
    //                         actionLabel: ['Ok']
    //                        });
    //                      }else if(res.data['sprejectiondeletestatusupdate'][0].hasOwnProperty('data')){
    //                       $location.path('/home');
    //                     }else{
    //                       $scope.hideLoader();
    //                       dmDialogueBox.alertBox({
    //                        title: 'Message',
    //                        message: "Oop's Something went wrong",
    //                        actionLabel: ['Ok']
    //                       });
    //                     }
    //           }
    //               else{
    //                   dmDialogueBox.alertBox({
    //                       title: 'Server Error',
    //                       message: 'Error Connecting to server..',
    //                       actionLabel: ['Ok']
    //                      });
    //               }
    //          })
    //      })

    // };

    $scope.submitAll = function () {
      $scope.openPopupcheckConfirm = true;
    };

    $scope.RoleWiseAlertMsgs = [
      {
        action: "REJECT",
        message: "You are about to reject the Case. Do you wish to continue?",
      },
      {
        action: "ACCEPT",
        message: "You are about to accept the Case. Do you wish to continue?",
      },
      {
        action: "HOLD",
        message: "You are about to hold the Case. Do you wish to continue?",
      },
      {
        action: "EXIT",
        message: "Do you wish to exit?",
      },
    ];

    $scope.get_login_role = function () {
      var ROLES = ["SWEEP", "ACC", "SIGN"];
      return ROLES.includes($scope.loginServiceData[0].system_role);
    };

    $scope.submitData = function (btn) {
      var temp = $scope.RoleWiseAlertMsgs.filter(
        (x) => x.action == btn.ACTION_NAME
      );
      if (temp.length > 0) {
        var msg = temp[0].message;
      } else {
        var msg = "Do you wish to continue?";
      }

      if ($scope.loginServiceData[0].system_role == 'DVUM' || $scope.loginServiceData[0].system_role == 'DVUC') {
        let list = $scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE;
        list = $scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE.filter(x => x.BO);
        let aus_list = list.filter(x => x.BO.FLOW == 'AUS' || x.BO.FLOW == 'AUS&BO' || x.BO.FLOW == 'AUS&BO&BR' || x.BO.FLOW == 'AUS&BR');
        let names = aus_list.map(x => x.BO.AADHAAR_VIEW.NAME);
        let condition1 = names.filter(x => x.toLowerCase().includes(' urf '));
        let condition2 = names.filter(x => x.toLowerCase().includes(' alias '));
        if (condition1.length > 0 || condition2.length > 0) {
          dmDialogueBox.alertBox({
            title: "Message",
            message: "Customer name is with Alias / URF. Kindly perform due diligence",
            actionLabel: ["Ok"],
          }).
            then(function (res) {
              // function here to be executed
              if (res) {
                dmDialogueBox
                  .confirmBox({
                    title: "Message",
                    message: msg,
                    actionLabel: ["No", "Yes"],
                  })
                  .then(function (res) {
                    // function here to be executed
                    if (res) {
                      $scope.submitLeadData(btn);
                    }
                  });
              }
            });
        } else {
          dmDialogueBox
            .confirmBox({
              title: "Message",
              message: msg,
              actionLabel: ["No", "Yes"],
            })
            .then(function (res) {
              // function here to be executed
              if (res) {
                $scope.submitLeadData(btn);
              }
            });
        }
      } else if ($scope.get_login_role()) {
        dmDialogueBox
          .confirmBox({
            title: "Message",
            message: msg,
            actionLabel: ["No", "Yes"],
          })
          .then(function (res) {
            // function here to be executed
            if (res) {
              if($scope.selectedQ["queue_id"] == "100" && $scope.loginServiceData[0].system_role == 'ACC'){
                $scope.SPSIGNSINGLEACCEPT();
              }else{
                $scope.submitLeadData(btn);
              }
            }
          });
      } else {
        $scope.submitLeadData(btn);
      }
    };
    $scope.SPSIGNSINGLEACCEPT = function(){
      var body = {
        SPSIGNSINGLEACCEPT: [
          {
            x_lead_id_array: [$scope.selectedGrid.x_lead_id],
            x_login_id: $scope.username,
          }
        ],
      };
      $scope.showLoader("loading.....");
    executeApi(newplatwareHeader, body, function (res) {
      $scope.$apply(function () {
        $scope.hideLoader();
        if (res.status == true) {
          console.log("**/* SPSIGNSINGLEACCEPT */**", res);
          if (res.data["SPSIGNSINGLEACCEPT"][0].hasOwnProperty("data")) {
            $location.path("/home");
          } else {
            $scope.hideLoader();
            $location.path("/home");
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
    $scope.submitLeadData = function (btn) {
      if (btn.ACTION_NAME == "REJECT") {
        // if($scope.loginServiceData[0].system_role=='DVUM' || $scope.loginServiceData[0].system_role=='DVUC'){
        //   //$scope.getImageStreams(51,"json_update");
        //   // $scope.getImageStreams(50,'json_update');
        //   $timeout($scope.set_workstep(btn.ACTION_NAME,btn),3000);
        //     }else{
        $scope.set_workstep(btn);
        //}
      } else if (btn.ACTION_NAME == "ACCEPT") {
        $scope.button_values = btn;
        if ($scope.disabledButton_accept(btn)) {
          if ($scope.loginServiceData[0].system_role == "BS") {
            // if ($scope.check.length >= 5)
            //$scope.set_workstep(btn.ACTION_NAME,btn);
            if ($scope.openPopupcheckConfirm == false) {
              $scope.openPopupcheck = true;
            } else $scope.buttonAction(btn, "N");

            // else
            // $scope.openPopupcheck = true;
          } else if ($scope.loginServiceData[0].system_role == "SIGN") {
            // $scope.buttonAction(btn, 'Y');
            $scope.newgen_createCase(btn, "Y");
            // $scope.setJSONUpdate(btn,'Y');
          } else if (
            $scope.loginServiceData[0].system_role == "DVUM" ||
            $scope.loginServiceData[0].system_role == "DVUC"
          ) {
            $scope.gefuCheck = true;
            $scope.Generate_GEFU(btn);
            $scope.amlock_crilic_array(btn);
          } else if ($scope.loginServiceData[0].system_role == "ACC") {
            $scope.getCust_ID(btn, "N");
          } else {
            //$scope.set_workstep(btn.ACTION_NAME,btn);
            //$scope.setJSONUpdate(btn,'N');
            $scope.buttonAction(btn, "N");
          }
        }
      } else if (btn.ACTION_NAME == "HOLD") {
        $scope.set_workstep(btn);
      } else if (btn.ACTION_NAME == "EXIT") {
        if (
          $scope.selectedQ["queue_id"] == "1" ||
          $scope.selectedQ["queue_id"] == "11" ||
          $scope.selectedQ["queue_id"] == "2" ||
          $scope.selectedQ["queue_id"] == "3" ||
          $scope.selectedQ["queue_id"] == "4" ||
          $scope.selectedQ["queue_id"] == "10" ||
          $scope.selectedQ["queue_id"] == "12"
        ) {
          $location.path("/home");
        } else {
          $scope.Go_to_exit();
        }
      } else if (btn.ACTION_NAME == "UPLOAD") {
        $scope.openPopup = true;
      } else if (btn.ACTION_NAME == "Download") {
        $scope.download();
      } else if (btn.ACTION_NAME == "GEFU") {
        $scope.download_GEFU();
      } else if (btn.ACTION_NAME == "Reassign") {
        $scope.reassign_Popup = true;
      } else if (btn.ACTION_NAME == "Discard") {
        $scope.Delete_lead();
      }else if(btn.ACTION_NAME == 'SIGN_DOWNLOAD'){
        $scope.downloadSign();
      }
    };

    $scope.Go_to_exit = function () {
      var body = {
        spexitlead: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
            x_prc_grp: $scope.loginServiceData[0].x_prc_grp,
            x_login_id: $scope.username,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spexitlead */**", res);
            if (res.data["spexitlead"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spexitlead"][0].hasOwnProperty("data")) {
              if (
                res.data.spexitlead[0].data[0] == "n" ||
                res.data.spexitlead[0].data[0] == "y"
              ) {
                $location.path("/home");
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
    };

    $scope.getCust_ID = function (btn) {
      var body = {
        AUS_CUSTACCOUNTREL: [
          {
            leadId: $scope.selectedGrid.x_lead_id2,
            codeAccNo: $scope.GetJSONData.AOF_CP.ENTITY_DATA.ACC_NUMBER || "",
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* AUS_CUSTACCOUNTREL */**", res);
            if (res.data["AUS_CUSTACCOUNTREL"][0].hasOwnProperty("error")) {
              //  dmDialogueBox.alertBox({
              //    title: 'Alert',
              //    message: "Oop's Something went wrong",
              //    actionLabel: ['Ok']
              //   });
            } else if (
              res.data["AUS_CUSTACCOUNTREL"][0].hasOwnProperty("data")
            ) {
              //if(res.data.AUS_CUSTACCOUNTREL[0].data[0].response_type=='I'){
              //$scope.GetJSONData.AOF_CP.ENTITY_DATA.AUS_CUST_ID=res.data.AUS_CUSTACCOUNTREL[0].data[0].response.CodCust;
              //}else{
              //   $scope.hideLoader();
              //   dmDialogueBox.alertBox({
              //    title: 'Message',
              //    message: "Oop's Something went wrong",
              //    actionLabel: ['Ok']
              //   });
              // }
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            }
            //   $scope.setJSONUpdate(btn,'N');
            $scope.buttonAction(btn, "N");
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

    $scope.buttonAction = function (btn, set_status) {
      if (
        btn.ACTION_NAME == "REJECT" &&
        ($scope.loginServiceData[0].system_role == "DVUM" ||
          $scope.loginServiceData[0].system_role == "DVUC")
      ) {
        if ($scope.cibil_pdf_status && $scope.checkForAmlockRejection()) {
          $scope.sendCIBIL_Pdf_onMail();
        }
      }
      if($scope.loginServiceData[0].system_role == "ACC"){
            if(btn.ACTION_NAME !== "ACCEPT"){
              var body = {
                spsetprcgrpdispd2: [
                  {
                    x_lead_id: $scope.selectedGrid.x_lead_id,
                    x_prc_group: $scope.loginServiceData[0].x_prc_grp,
                    x_new_disposition: $scope.loginServiceData[0].x_prc_grp,
                    x_aof_id: $scope.selectedGrid.x_lead_id,
                    x_crn_no: "",
                    x_member_id: "",
                    x_is_isstart: "",
                    x_login_id: $scope.username,
                    x_processid:
                      "YBL_" + $scope.loginServiceData[0].x_prc_grp + btn.ACTION_NAME,
                    x_ref_input_1: $scope.loginServiceData[0].x_prc_grp,
                    x_disp_level: "",
                    x_text_1: set_status,
                    x_ref_input_2: "",
                    x_text_2: "",
                    x_text_3: "",
                    x_text_4: "",
                    x_text_5: "",
                  },
                ],
              };
              console.log('1st Time');
        
              $scope.showLoader("Loading.....");
              executeApi(newplatwareHeader, body, function (res) {
                $scope.countForGefu = 0;
                $scope.gefuCheck = false;
                $scope.$apply(function () {
                  $scope.hideLoader();
                  if (res.status == true) {
                    console.log("**/* spsetprcgrpdispd2 */**", res);
                    if (res.data["spsetprcgrpdispd2"][0].hasOwnProperty("error")) {
                      dmDialogueBox.alertBox({
                        title: "Alert",
                        message: "Oop's Something went wrong",
                        actionLabel: ["Ok"],
                      });
                    } else if (
                      res.data["spsetprcgrpdispd2"][0].hasOwnProperty("data")
                    ) {
                      if (res.data.spsetprcgrpdispd2[0].data[0].STATUS == "Y") {
                          $location.path("/home");                       
                      } else {
                        dmDialogueBox.alertBox({
                          title: "Server Error",
                          message: "Error Connecting to server..",
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
                    dmDialogueBox.alertBox({
                      title: "Server Error",
                      message: "Error Connecting to server..",
                      actionLabel: ["Ok"],
                    });
                  }
                });
              });
            }else{
              $scope.SPUPDATEACCACCEPTCASES();
              $scope.newgen_createCase(btn, "Y"); 
            }
      }else{
        var body = {
          spsetprcgrpdispd2: [
            {
              x_lead_id: $scope.selectedGrid.x_lead_id,
              x_prc_group: $scope.loginServiceData[0].x_prc_grp,
              x_new_disposition: $scope.loginServiceData[0].x_prc_grp,
              x_aof_id: $scope.selectedGrid.x_lead_id,
              x_crn_no: "",
              x_member_id: "",
              x_is_isstart: "",
              x_login_id: $scope.username,
              x_processid:
                "YBL_" + $scope.loginServiceData[0].x_prc_grp + btn.ACTION_NAME,
              x_ref_input_1: $scope.loginServiceData[0].x_prc_grp,
              x_disp_level: "",
              x_text_1: set_status,
              x_ref_input_2: "",
              x_text_2: "",
              x_text_3: "",
              x_text_4: "",
              x_text_5: "",
            },
          ],
        };
        console.log('1st Time');
  
        $scope.showLoader("Loading.....");
        executeApi(newplatwareHeader, body, function (res) {
          $scope.countForGefu = 0;
          $scope.gefuCheck = false;
          $scope.$apply(function () {
            $scope.hideLoader();
            if (res.status == true) {
              console.log("**/* spsetprcgrpdispd2 */**", res);
              if (res.data["spsetprcgrpdispd2"][0].hasOwnProperty("error")) {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (
                res.data["spsetprcgrpdispd2"][0].hasOwnProperty("data")
              ) {
                if (res.data.spsetprcgrpdispd2[0].data[0].STATUS == "Y") {
                  if (
                    $scope.loginServiceData[0].system_role == "DVUM" ||
                    $scope.loginServiceData[0].system_role == "DVUC"
                  ) {
                    $scope.change_delete_status();
                  }
                  else {
                    $location.path("/home");
                  }
                } else {
                  dmDialogueBox.alertBox({
                    title: "Server Error",
                    message: "Error Connecting to server..",
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
    $scope.SPUPDATEACCACCEPTCASES =function(){
      var body = {
        SPUPDATEACCACCEPTCASES: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
          },
        ],
      };
      $scope.showLoader("GEFU is uploading please wait...");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            console.log("**/* SPUPDATEACCACCEPTCASES */**", res);
            if (res.data["SPUPDATEACCACCEPTCASES"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
            } else if (
              res.data["SPUPDATEACCACCEPTCASES"][0].hasOwnProperty("data")
            ) { 
              $scope.hideLoader();
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
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
  };
    $scope.getSignatoryImage_stream = function (doc, obj) {
      var body = {
        spgetdocumentqueuelistnewcomprole: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
            x_queue_id: $scope.selectedQ["queue_id"],
            x_card_id: "",
            x_system_role: $scope.loginServiceData[0].system_role,
            x_login_id: $scope.username,
            x_image_name: doc.image_name,
            x_source: $scope.selectedGrid.x_lead_source,
            x_din_number: doc.din_number,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spgetdocumentqueuelistnewcomprole */**", res);
            if (
              res.data["spgetdocumentqueuelistnewcomprole"][0].hasOwnProperty(
                "error"
              )
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spgetdocumentqueuelistnewcomprole"][0].hasOwnProperty(
                "data"
              )
            ) {
              $scope.imageDetail =
                res.data.spgetdocumentqueuelistnewcomprole[0].data[0];
              //$scope.image_name=res.data.spgetdocumentqueuelistnewcomp[0].data[0].doc_des;
              $scope.img =
                "data:image/jpeg;base64," + $scope.imageDetail.image_stream;
              $scope.img_Rotate = $scope.img;
              // for(i=0;i<$scope.Docs.length;i++){

              // }
              if ($scope.Docs) {
              }
              if (obj == "PREVIOUS_NEXT")
                $scope.SET_IMAGE_WIDTH_HEIGTH($scope.img_Rotate);
              //            console.log($scope.img);
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
    };
    $scope.getImage_stream = function (doc, obj) {
      var body = {
        spgetdocumentqueuelistnewcomp: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
            x_queue_id: $scope.selectedQ["queue_id"],
            x_card_id: "",
            x_system_role: $scope.loginServiceData[0].system_role,
            x_login_id: $scope.username,
            x_image_name: doc.image_name,
            x_source: $scope.selectedGrid.x_lead_source,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spgetdocumentqueuelistnewcomp */**", res);
            if (
              res.data["spgetdocumentqueuelistnewcomp"][0].hasOwnProperty(
                "error"
              )
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spgetdocumentqueuelistnewcomp"][0].hasOwnProperty(
                "data"
              )
            ) {
              $scope.imageDetail =
                res.data.spgetdocumentqueuelistnewcomp[0].data[0];
              $scope.img =
                "data:image/jpeg;base64," + $scope.imageDetail.image_stream;
              $scope.img_Rotate = $scope.img;
              localStorage.setItem("obj", $scope.img_Rotate);
              if ($scope.Docs) {
              }
              if (obj == "PREVIOUS_NEXT")
                $scope.SET_IMAGE_WIDTH_HEIGTH($scope.img_Rotate);
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
    };

    $scope.getDocumentsimg = function (doc) {
      $scope.selected_IMAGE = doc;
      localStorage.setItem(
        "selectedImage",
        JSON.stringify($scope.selected_IMAGE)
      );
      for (i = 0; i < $scope.documentList.length; i++) {
        if ($scope.documentList[i].image_name == doc.image_name) {
          document.getElementById(
            "selectDOC" + doc.image_name
          ).style.borderColor = "Orange";
        } else
          document.getElementById(
            "selectDOC" + $scope.documentList[i].image_name
          ).style.borderColor = "#c5c5c5";
      }
      doc.form_id == "85"
        ? $scope.getSignatoryImage_stream(doc)
        : $scope.getImage_stream(doc);
    };

    $scope.getDocumentpertab = function (formData, obj) {
      if (formData == "80" || formData == "85") {
        $scope.Docs = [];
        $scope.Docs_aaray = [];
        $scope.documentList = $filter("byProp")(
          $scope.documentsDesc,
          "form_id",
          formData
        );

        if ($scope.documentList.length != 0) {
          $scope.document_Name = $filter("unique")(
            $scope.documentList,
            "doc_des"
          );
          for (i = 0; i < $scope.document_Name.length; i++) {
            $scope.Docs_aaray.push(
              $filter("byProp")(
                $scope.documentList,
                "doc_des",
                $scope.document_Name[i].doc_des
              )
            );
          }
          for (i = 0; i < $scope.Docs_aaray.length; i++) {
            for (j = 0; j < $scope.Docs_aaray[i].length; j++) {
              $scope.Docs_aaray[i][j]["seq_set"] = j + 1;
              $scope.Docs.push($scope.Docs_aaray[i][j]);
              localStorage.setItem("Docs_aaray", JSON.stringify($scope.Docs));
            }
          }
        }
      } else {
        $scope.Docs = [];
        $scope.Docs_aaray = [];
        $scope.documentList = $filter("byProp")(
          $scope.documentsDesc,
          "form_id",
          formData.form_id
        );
        if ($scope.documentList.length != 0) {
          $scope.document_Name = $filter("unique")(
            $scope.documentList,
            "doc_des"
          );
          for (i = 0; i < $scope.document_Name.length; i++) {
            $scope.Docs_aaray.push(
              $filter("byProp")(
                $scope.documentList,
                "doc_des",
                $scope.document_Name[i].doc_des
              )
            );
          }
          for (i = 0; i < $scope.Docs_aaray.length; i++) {
            for (j = 0; j < $scope.Docs_aaray[i].length; j++) {
              $scope.Docs_aaray[i][j]["seq_set"] = j + 1;
              $scope.Docs.push($scope.Docs_aaray[i][j]);
              localStorage.setItem("Docs_aaray", JSON.stringify($scope.Docs));
            }
          }
        }
      }
    };

    $scope.getDocumentsQueueList = function (formData, index) {
      var body = {
        spgetdocumentqueuelistcomp: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
            x_queue_id: $scope.selectedQ["queue_id"],
            x_card_id: "",
            x_system_role: $scope.loginServiceData[0].system_role,
            x_login_id: $scope.username,
            x_source: $scope.selectedGrid.x_lead_source,
          },
        ],
      };
      // $scope.showLoader('Loading.....');
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          //   $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spgetdocumentqueuelistcomp */**", res);
            if (
              res.data["spgetdocumentqueuelistcomp"][0].hasOwnProperty("error")
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spgetdocumentqueuelistcomp"][0].hasOwnProperty("data")
            ) {
              $scope.img = "";
              $scope.documentsDesc =
                res.data.spgetdocumentqueuelistcomp[0].data;
              if (formData) {
                if (formData.form_id == "87") {
                  // $scope.getDocumentsQueueList(formData,index);
                  $scope.getDocumentpertab(formData, index);
                }
                //  if(formData.form_id=='14'){
                // $scope.GetJSONData.AOF_CP.ENTITY_DATA.OTHERS.push(index['image_name']);
                // //$scope.setJSONUpdate('others');
                // }
                // $scope.current_TAB==14?$scope.getDocumentpertab(formData,index):'';

                if ($scope.set_FLAG_POPUP) {
                  $scope.openPopup = false;
                  dmDialogueBox.alertBox({
                    title: "Message",
                    message: "Image uploaded successfully.",
                    actionLabel: ["Ok"],
                  });
                }
                $scope.set_FLAG_POPUP = false;
              } else {
                $scope.getDocumentpertab("1");
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
    };

    $scope.getRejection_data_perStakeHolder = function (obj, formData) {
      if ($scope.user) {
        $scope.user.rejection_category = "";
        $scope.user.rejection_sub_category = "";
      }
      var body = {
        spgetrejectionlistrolewise: [
          {
            x_from_id: formData,
            x_source: $scope.selectedGrid.x_lead_source,
            x_role: obj.BO.FLOW,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      console.log("body" + body);
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spgetrejectionlistrolewise */**", res);
            if (
              res.data["spgetrejectionlistrolewise"][0].hasOwnProperty("error")
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spgetrejectionlistrolewise"][0].hasOwnProperty("data")
            ) {
              $scope.rejectionList =
                res.data.spgetrejectionlistrolewise[0].data;
              console.log($scope.rejectionList);
              $scope.autoStyleFormElements();
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
    };
    $scope.getRejection_data = function (formData) {
      if ($scope.user) {
        $scope.user.rejection_category = "";
        $scope.user.rejection_sub_category = "";
      }
      var body = {
        spgetrejectionlistfromidcomp: [
          {
            x_from_id: formData,
            x_source: $scope.selectedGrid.x_lead_source,
          },
        ],
      };
      console.log("spgetrejectionlistfromidcomp, body: ", body);
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spgetrejectionlistfromidcomp */**", res);
            if (
              res.data["spgetrejectionlistfromidcomp"][0].hasOwnProperty(
                "error"
              )
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spgetrejectionlistfromidcomp"][0].hasOwnProperty("data")
            ) {
              $scope.rejectionList =
                res.data.spgetrejectionlistfromidcomp[0].data;
              console.log($scope.rejectionList);
              console.log('view loaded');
              if ($scope.form[0].form_name !== 'Credit facility') {
                $scope.autoStyleFormElements();
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
    };

    $scope.autoStyleFormElements = function () {
      if ($scope.resetArray.length > 0 && document.getElementsByClassName('formFields') && document.getElementsByClassName('formFields').length > 0) {
        let fArray = document.getElementsByClassName('formFields');
        // console.log('auto', fArray);
        let textCounter = 'even';
        for (let i = 0; i < fArray.length; i++) {
          // console.log('auto i', i, 'match', $scope.resetArray[0]);
          if (fArray[i].classList.value.split(' ').includes('paramDiv')) {
            if (textCounter == 'even') {
              fArray[i].style.marginLeft = '1.8%'
            }
            if (textCounter == 'odd') {
              fArray[i].style.marginLeft = '5%'
            }
            // console.log('auto current', textCounter);
            if (textCounter == 'even') { textCounter = 'odd'; } else { textCounter = 'even'; }
            // console.log('auto next', textCounter);
            if (i == $scope.resetArray[0]) {
              textCounter = 'even';
              $scope.resetArray.shift();
              // console.log('auto new next', textCounter);
            }
          } else {
            textCounter = 'even';
            if (i == $scope.resetArray[0]) {
              textCounter = 'even';
              $scope.resetArray.shift();
              // console.log('auto new next', textCounter);
            }
            // console.log('auto not text field', textCounter);
          }
        }
      }
    };
    //-------------------------------------------------------------------------------------------------------------------------------------------------------

    $scope.rejection_raised = function (card, getStatus, index) {
      if (getStatus == "Approve") {
        $scope.approve_reopen_delete_service(
          card,
          $scope.loginServiceData[0].system_role + "_APPROVE"
        );
      }
      if (getStatus == "Reopen") {
        $scope.approve_reopen_delete_service(card, "pending_rejection", index);
      }
      if (getStatus == "Delete") {
        //  $scope.getJsonDataForOV();
        $scope.approve_reopen_delete_service(card, "DELETE", index);
      }
    };

    $scope.approve_reopen_delete_service = function (card, status, index) {
      var body = {
        spdvuinsrejectionupdate: [
          {
            x_rej_uni_id: card.REJ_ID,
            x_login_id: $scope.username,
            x_status: status,
            x_rm_remarks: "",
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spdvuinsrejectionupdate */**", res);
            if (
              res.data["spdvuinsrejectionupdate"][0].hasOwnProperty("error")
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spdvuinsrejectionupdate"][0].hasOwnProperty("data")
            ) {
              $scope.reject_status =
                res.data.spdvuinsrejectionupdate[0].data[0];
              if ($scope.reject_status["STATUS"] == "Y") {
                $scope.get_all_rejection_summary();
              } else {
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Rejection not updated",
                  actionLabel: ["Ok"],
                });
              }
              // if(status="DELETE" && $scope.RejectionQueueData.length>0){
              //   delete  $scope.RejectionQueueData[index];
              //}
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

    $scope.rejection_raised_view = function () {
      if ($scope.RejectionQueueData[0].STATUS == "N") return false;
      else {
        if (
          $scope.selectedQ["queue_id"] == "2" ||
          $scope.selectedQ["queue_id"] == "3" ||
          $scope.selectedQ["queue_id"] == "4" ||
          $scope.selectedQ["queue_id"] == "10" ||
          $scope.selectedQ["queue_id"] == "8" ||
          $scope.selectedQ["queue_id"] == "9" ||
          $scope.selectedQ["queue_id"] == "11"
        )
          $scope.hideAction = true;
        return true;
      }
    };

    $scope.change_delete_status = function () {
      var body = {
        spdeleteaction: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spdeleteaction */**", res);
            if (res.data["spdeleteaction"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spdeleteaction"][0].hasOwnProperty("data")) {
              if (res.data.spdeleteaction[0].data[0] == "T") {
                $location.path("/home");
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
            $location.path("/home");
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

    $scope.getRemarkHistory = function () {
      var body = {
        spaofhist2: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
            x_exception_id: "",
            x_member_id: "",
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spaofhist2 */**", res);
            if (res.data["spaofhist2"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spaofhist2"][0].hasOwnProperty("data")) {
              $scope.GETGridViewData = JSON.parse(
                res.data.spaofhist2[0].data[0].v_string_tab
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

    $scope.controlPanelUploadAction = function (
      uplaod_doc,
      img_dfn,
      img_type,
      doc_id,
      order,
      rep
    ) {
      //$scope.image_Data_upload=uplaod_doc;
      var allowed_type;
      // var img_dfn=img_dfn;
      //var img_type = img_type;
      var doc_id = doc_id;
      var img_size = uplaod_doc["size"];
      var chk_file_ext = function (file_data) {
        var allowed_extn = ["jpg", "jpeg", "png"];
        var chk_ext = "";
        chk_ext = file_data["name"]
          ? file_data["name"].indexOf(".") > -1
            ? file_data["name"].split(".").pop()
            : ""
          : "";
        if (allowed_extn.indexOf(chk_ext.toLowerCase()) > -1) {
          return true;
        } else {
          return false;
        }
      };
      var allowed_type = chk_file_ext(uplaod_doc);
      if (allowed_type) {
        if (img_size > 2000000) {
          $scope.imageName_upload = "";
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Image size shouldn't exceed 2 MB",
          });
          $scope.$apply();
        } else {
          $scope.getBase64(uplaod_doc).then(
            function (res) {
              var ovj = {};
              ovj["image_stream"] =
                "data:" + uplaod_doc.type + ";base64," + res;
              ovj["image_name"] =
                new Date().getTime().toString() +
                "." +
                uplaod_doc.type.split("/")[1];
              if ($scope.DOCUMENT_TYPE == "DOCUMENTS") {
                ovj["form_id"] = "14";
                ovj["doc_id"] = "20";
                $scope.imageName_upload = ovj["image_name"];
                $scope.image_Data_upload = ovj;
              } else {
                ovj["form_id"] = "8";
                $scope.DOCUMENT_TYPE == "AMLOCK"
                  ? (ovj["doc_id"] = 50)
                  : $scope.DOCUMENT_TYPE == "CRILC"
                    ? (ovj["doc_id"] = 51)
                    : "";
                console.log(uplaod_doc);
                console.log(ovj);
                $scope.saveImage_rerjct(ovj);
              }
            },
            function (rej) {
              console.log(rej);
              dmDialogueBox
                .alertBox({
                  title: "Alert",
                  message: "Unable to Replace document",
                  actionlabel: ["Ok"],
                })
                .then(function (res) { });
            }
          );
        }
      } else {
        $scope.imageName_upload = "";
        dmDialogueBox.alertBox({
          title: "Extention Error",
          message:
            "This type of file is not allowed. Only jpg ,jpeg ,png format is supported.",
        });
        $scope.$apply();
      }
    };

    $scope.getBase64 = function (file) {
      var type = file.name.split(".").pop();
      var deferred = $q.defer();
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        // console.log(reader.result.split('data:image/jpeg;base64,')[1]);
        //resolve(reader.result.split('data:image/jpeg;base64,')[1]);
        /* if (type == 'pdf') {
          deferred.resolve(reader.result.split('data:application/pdf;base64,')[1]);
      } else */ if (type.toLowerCase() == "png") {
          deferred.resolve(reader.result.split("data:image/png;base64,")[1]);
        } else {
          deferred.resolve(reader.result.split("data:image/jpeg;base64,")[1]);
        }
        // deferred.reject("error") data:image/png;base64,

        //deferred.reject("error in uploading image")
        //$scope.$apply();
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
        deferred.reject("error");
        // $scope.$apply();
      };
      return deferred.promise;
    };

    $scope.Upload_Image = function () {
      if (document.getElementById("Upload_Image").defaultValue == "AMLOCK") {
        $scope.DOCUMENT_TYPE = "AMLOCK";
        if ($scope.push_image[0].AMLOCK.length >= 10) {
          $scope.$apply(function () {
            dmDialogueBox.alertBox({
              title: "Alert",
              message:
                "Already uploaded 10 images for " +
                document.getElementById("Upload_Image").defaultValue +
                ".",
              actionLabel: ["Ok"],
            });
          });
        } else
          $scope.controlPanelUploadAction(
            $scope.fileInput_Upload_Image.files[0]
          );
      } else if (
        document.getElementById("Upload_Image").defaultValue == "CRILC"
      ) {
        $scope.DOCUMENT_TYPE = "CRILC";
        if ($scope.push_image[0].CRILC.length >= 10) {
          $scope.$apply(function () {
            dmDialogueBox.alertBox({
              title: "Alert",
              message:
                "Already uploaded 10 images for " +
                document.getElementById("Upload_Image").defaultValue +
                ".",
              actionLabel: ["Ok"],
            });
          });
        } else
          $scope.controlPanelUploadAction(
            $scope.fileInput_Upload_Image.files[0]
          );
      } else
        $scope.controlPanelUploadAction($scope.fileInput_Upload_Image.files[0]);
    };
    $scope.Upload_Image1 = function () {
      $scope.controlPanelUploadAction($scope.fileInput_Upload_Image_1.files[0]);
      $scope.DOCUMENT_TYPE = "DOCUMENTS";
    };

    $scope.$watch(
      function () {
        return document.getElementById("Upload_Image");
      },
      function (new_val, old_val) {
        if (document.getElementById("Upload_Image")) {
          if (document.getElementById("Upload_Image").id == "Upload_Image") {
            $scope.fileInput_Upload_Image =
              document.getElementById("Upload_Image");
            $scope.fileInput_Upload_Image.addEventListener(
              "click",
              function (e) {
                //$scope.fileInput_Upload_Image.removeEventListener('change', $scope.Upload_Image);
                $scope.fileInput_Upload_Image.value = "";
                $scope.fileInput_Upload_Image.addEventListener(
                  "change",
                  $scope.Upload_Image
                );
              }
            );
          }
        }
      }
    );

    $scope.$watch(
      function () {
        return document.getElementById("Upload_Image_1");
      },
      function (new_val, old_val) {
        if (document.getElementById("Upload_Image_1")) {
          if (
            document.getElementById("Upload_Image_1").id == "Upload_Image_1"
          ) {
            $scope.fileInput_Upload_Image_1 =
              document.getElementById("Upload_Image_1");
            $scope.fileInput_Upload_Image_1.addEventListener(
              "click",
              function (e) {
                $scope.fileInput_Upload_Image_1.removeEventListener(
                  "change",
                  $scope.Upload_Image1
                );
                $scope.fileInput_Upload_Image_1.value = "";
                $scope.fileInput_Upload_Image_1.addEventListener(
                  "change",
                  $scope.Upload_Image1
                );
              }
            );
          }
        }
      }
    );

    $scope.image_upload_length = function (obj) {
      if (
        $scope.loginServiceData[0].system_role == "DVUM" ||
        $scope.loginServiceData[0].system_role == "DVUC"
      ) {
        $scope.SET_VISIBILITY = true;
      } else $scope.SET_VISIBILITY = false;
    };

    $scope.delete_data = function (image) {
      $scope.imageName_upload = "";
      $scope.reject.selected_reject = "";
      $scope.image_Data_upload = "";
    };
    $scope.closePop_up = function (image) {
      if (image == "upload") {
        $scope.openPopup = false;
        $scope.reject = {};
        $scope.imageName_upload = "";
        $scope.fileInput_Upload_Image = "";
        $scope.fileInput_Upload_Image = document.getElementById("Upload_Image");
      } else if (image == "reassign") {
        $scope.reassign_Popup = false;
        $scope.user = {};
      } else if (image == "checklist") {
        $scope.openPopupcheck = false;
        //  $scope.user={};
      }
    };

    $scope.list_OF_documents = function () {
      var body = {
        spdoclistcomp: [
          {
            x_source: $scope.selectedGrid.x_lead_source,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spdoclistcomp */**", res);
            if (res.data["spdoclistcomp"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spdoclistcomp"][0].hasOwnProperty("data")) {
              console.log(res);
              $scope.DOCUMENTS_LIST = res.data["spdoclistcomp"][0].data;
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

    $scope.saveImage_rerjct = function (ovj) {
      var body = {
        spinsertdopsimagedata: [
          {
            x_doc_type: ovj.image_name.split(".")[1],
            x_object_type: "AOF_CP",
            x_doc_id: ovj.doc_id,
            x_image_name: ovj.image_name,
            x_object_pri_key_1: $scope.selectedGrid.x_lead_id,
            x_object_pri_key_2: ovj.form_id,
            x_object_pri_key_3: "",
            x_image_stream: ovj.image_stream.split(",")[1],
            x_login_id: $scope.username,
            x_is_active: "Y",
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spinsertdopsimagedata */**", res);
            if (res.data["spinsertdopsimagedata"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spinsertdopsimagedata"][0].hasOwnProperty("data")
            ) {
              if (
                res.data.spinsertdopsimagedata[0].data[0].ISSUCCESSFUL ==
                "SUCCESS"
              ) {
                $scope.set_FLAG_POPUP = true;
                var form = { form_id: ovj.form_id };
                $scope.getDocumentsQueueList(form, ovj);
                if (ovj.form_id == "14") {
                  $scope.imageName_upload = "";
                  $scope.image_Data_upload = "";
                }
                if (ovj.form_id == "8") {
                  $scope.getImageStreams(ovj.doc_id);
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

    $scope.Generate_GEFU = function (btn) {
      var body = {
        SPGENERATECOMPANYGEFUFILEPHYGITAL: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
          },
        ],
      };
      console.log("before gefu count" + $scope.countForGefu);
      if ($scope.countForGefu < 1) {
        $scope.showLoader("Loading.....");
        executeApi(newplatwareHeader, body, function (res) {
          $scope.countForGefu = $scope.countForGefu + 1;
          console.log("aftergefu count" + $scope.countForGefu);
          $scope.$apply(function () {
            $scope.hideLoader();
            if (res.status == true) {
              console.log("**/* SPGENERATECOMPANYGEFUFILEPHYGITAL */**", res);
              if (
                res.data["SPGENERATECOMPANYGEFUFILEPHYGITAL"][0].hasOwnProperty("error")
              ) {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (
                res.data["SPGENERATECOMPANYGEFUFILEPHYGITAL"][0].hasOwnProperty("data")
              ) {
                $scope.result_GEFU = JSON.parse(
                  res.data.SPGENERATECOMPANYGEFUFILEPHYGITAL[0].data[0].v_string
                );
                if ($scope.result_GEFU.RESULT[0].IS_SUCCESS == "Y") {
                  $scope.DMSUploadGefu(btn); //AUTO GEFU - 27nov25 
                  // $scope.buttonAction(btn, "N");
                } else if ($scope.result_GEFU.RESULT[0].IS_SUCCESS == "N") {
                  $scope.hideLoader();
                  dmDialogueBox.alertBox({
                    title: "Alert",
                    message: "There is an error Occurred.",
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

    // //AUTO GEFU Latest - 27Nov25
  $scope.DMSUploadGefu = function (btn) {
    var body = {
      DMS_UPLOAD_GEFU_API: [
        {
          leadId: [$scope.selectedGrid.x_lead_id],
          type: "GEFU",
        },
      ],
    };
    $scope.showLoader("GEFU is uploading please wait...");
    executeApi(newplatwareHeader, body, function (res) {
      $scope.$apply(function () {
        if (res.status == true) {
          console.log("**/* DMS_UPLOAD_GEFU_API */**", res);
          if (res.data["DMS_UPLOAD_GEFU_API"][0].hasOwnProperty("error")) {
            $scope.hideLoader();
            $scope.buttonAction(btn, "N");
          } else if (
            res.data["DMS_UPLOAD_GEFU_API"][0].hasOwnProperty("data")
          ) { 
            $scope.hideLoader();
            $scope.buttonAction(btn, "N");
          } else {
            $scope.hideLoader();
            $scope.buttonAction(btn, "N");
          }
        } else if (
          res.status == false &&
          res.errorCode == "PW-0002" &&
          res.serverCode == "528"
        ) {
          $scope.hideLoader();
          dmDialogueBox.alertBox({
            title: "Server Error",
            message: "Error Connecting to server..",
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
    }

    $scope.download_GEFU = function () {
      var body = {
        GEFUFILEDOWNLOAD: [
          {
            leadId: $scope.selectedGrid.x_lead_id2,
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
                  // "GEFU file.txt"
                  "G"+$scope.GetJSONData.AOF_CP.ENTITY_DATA.ACC_NUMBER+".txt" // GEFU PARTNERSHIP
                );
              } else if (
                res.data.GEFUFILEDOWNLOAD[0].data[0].response_type == "E"
              ) {
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
    function downloadAllSignImages() {
      return new Promise((resolve) => {
        var body = {
          SPSIGNATUREUPLOADFCRAUTO: [
            {
              x_aof_id: $scope.selectedGrid.x_lead_id2,
              x_type: "",
            },
          ],
        };
        $scope.showLoader("Downloading.....");
        executeApi(newplatwareHeader, body, function (res) {
          $scope.$apply(function () {
            if (res.status == true) {
              console.log("**/* SPSIGNATUREUPLOADFCRAUTO */**",res);
              if (
                res.data[
                  "SPSIGNATUREUPLOADFCRAUTO"
                ][0].hasOwnProperty("error")
              ) {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else {
                $scope.signImageData = [];
                // Step 1: Access the string value
                const rawJsonString = res.data.SPSIGNATUREUPLOADFCRAUTO[0].data[0];

                // Step 2: Parse it into a real array
                const parsedData = JSON.parse(rawJsonString);
                for (i = 0;i <parsedData.length;i++) {
                  $scope.signImageData.push(parsedData[i]);
                }
                console.log($scope.signImageData);
                if (
                  $scope.signImageData.length == parsedData.length
                ) {
                  $scope.hideLoader();
                  resolve($scope.signImageData);
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
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message:
                  "All documents are not downloaded. Please try again.",
                actionLabel: ["Ok"],
              });
            }
          });
        });
      });
    }
    $scope.downloadSign = async function(x){
      var msg = await downloadAllSignImages();
      $scope.downloadSignAsZIP(msg);
    }
    $scope.downloadSignAsZIP = function (imageData) {
      var zip = new JSZip();
      var img = zip.folder("Images");
      for (j = 0; j < imageData.length; j++) {
        var imagename =imageData[j].accNo + 'sign' + (j + 1)+"." +
        'webp';
        img.file(imagename, imageData[j].fcrText, { base64: true });
      }
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, $scope.selectedGrid.x_lead_id2 + ".zip");
      });
    };
    // ********************rotate Image****************

    $scope.SET_IMAGE_WIDTH_HEIGTH = function (obj) {
      var image = new Image();
      image.onload = function () {
        image.width;
        image.height;
        $scope.IMAGE_WIDTH = image.width > 400 ? 400 : image.width;
        $scope.IMAGE_HEIGHT = image.height > 560 ? 560 : image.height;
        document.querySelectorAll('[id="container"]').forEach(element=> 
          { 
         if (element) {
         element.width = $scope.IMAGE_WIDTH;
          element.height = $scope.IMAGE_HEIGHT;
         }})      
      };
      image.src = obj;
    };

    var angle = 0;
    $scope.rotate = function () {
      angle = (angle + 90) % 360;
      document.querySelectorAll('[id="container"]').forEach(element=> 
        { if(element){
         element.style.transform = `rotate(${angle}deg)`;
        }})  
    };
    $scope.zoomIn = function () {
      document.querySelectorAll('[id="container"]').forEach(element=> 
        { if(element){
          element.width =
          element.naturalWidth;
        element.height =
          element.naturalHeight;
        }})

    };

    $scope.zoomOUT = function () {
      document.querySelectorAll('[id="container"]').forEach(element=> 
        { if(element){
          element.height = $scope.IMAGE_HEIGHT;
          element.width = $scope.IMAGE_WIDTH;
        }});
    };
    // $scope.commenthere=function(obj){
    //   $scope.user.comment='';
    // obj=="comment"?$scope.showcomment=true:$scope.showcomment=false;
    // }

    $scope.submit_comment = function () {
      var body = {
        spcommentaction4: [
          {
            x_primary_key1: $scope.selectedGrid.x_lead_id,
            x_login_id: $scope.username,
            x_comment: $scope.user.comment,
            x_queue_id: $scope.selectedQ["queue_id"],
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spcommentaction4 */**", res);
            if (res.data["spcommentaction4"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spcommentaction4"][0].hasOwnProperty("data")) {
              console.log(res);
              if (res.data["spcommentaction4"][0].data[0] == "Y") {
                $scope.user.comment = "";
                $scope.showcomment = false;
                $scope.comment_details();
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

    $scope.comment_details = function () {
      var body = {
        COMMENT_DETAILS: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* COMMENT_DETAILS */**", res);
            if (res.data["COMMENT_DETAILS"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["COMMENT_DETAILS"][0].hasOwnProperty("data")) {
              console.log(res);
              if (res.data.COMMENT_DETAILS[0].data[0].STATUS == "N") {
                $scope.comments_list = [];
              } else {
                $scope.comments_list = res.data.COMMENT_DETAILS[0].data;
                for (i = 0; i < $scope.comments_list.length; i++) {
                  $scope.comments_list[i].RAISED_BY_NAME =
                    $scope.comments_list[i].RAISED_BY;
                  $scope.comments_list[i].RAISED_BY_NAME =
                    $scope.comments_list[i].RAISED_BY_NAME.toUpperCase();
                  var a = $scope.comments_list[i].RAISED_BY_NAME.split(" ");
                  $scope.comments_list[i]["NAME_CHAR"] =
                    a[0].charAt(0) + a[1].charAt(0);
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
    };

    $scope.commmentSubmit = function () {
      if (
        $scope.selectedQ["queue_id"] == 1 ||
        $scope.selectedQ["queue_id"] == 2 ||
        $scope.selectedQ["queue_id"] == 3 ||
        $scope.selectedQ["queue_id"] == 4 ||
        $scope.selectedQ["queue_id"] == 10 ||
        $scope.selectedQ["queue_id"] == 12 ||
        $scope.selectedQ["queue_id"] == 11
      )
        return false;
      else return true;
    };

    $scope.gotosub_tabSwitching = function (x, y, index, flag) {
      if (flag == "boTAB") {
        if(index == 1){
          $scope.show_bo = false;
          $scope.show_bo_smo = true;
          $scope.SUB_BOTAB[1].openSection = true;
          // $scope.SUB_BOTAB[1].openSection = false;  // hiding CIN 19sept2025
          $scope.SUB_BOTAB[0].openSection = false;
        }
        // hiding CIN 19sept2025
        // if (index == 1) {
        //   $scope.show_bo = false;
        //   $scope.show_bo_smo = false;
        //   $scope.SUB_BOTAB[2].openSection = false;
        //   $scope.SUB_BOTAB[1].openSection = true;
        //   $scope.SUB_BOTAB[0].openSection = false;
        // }
        if (index == 0) {
          $scope.show_bo = true;
          $scope.show_bo_smo = false;
          $scope.SUB_BOTAB[1].openSection = false;
          // $scope.SUB_BOTAB[1].openSection = false; // hiding CIN 19sept2025
          $scope.SUB_BOTAB[0].openSection = true;
        }
      }
      if (flag == "amlock_crilic") {
        if (y.name == "AMLOCK") {
          document.getElementById("Upload_Image")
            ? (document.getElementById("Upload_Image").defaultValue = "AMLOCK")
            : "";
          $scope.show_Amlock = true;
          $scope.show_CRILIC = false;
          $scope.credit = false;
          $scope.cibil_PDF = false;
        } else if (y.name == "CRILC") {
          document.getElementById("Upload_Image")
            ? (document.getElementById("Upload_Image").defaultValue = "CRILC")
            : "";
          $scope.show_Amlock = false;
          $scope.show_CRILIC = true;
          $scope.credit = false;
          $scope.cibil_PDF = false;
        } else if (y.name == "Credit Facility") {
          $scope.show_Amlock = false;
          $scope.show_CRILIC = false;
          $scope.credit = true;
          $scope.cibil_PDF = false;
        } else if (y.name == "CIBIL Pdf") {
          $scope.show_Amlock = false;
          $scope.show_CRILIC = false;
          $scope.credit = false;
          $scope.cibil_PDF = true;
        }
        // else if (y.name == 'Credit Facility') {
        //   $scope.show_Amlock = false; $scope.show_CRILIC = false; $scope.credit = true;
        // }
        for (i = 0; i < $scope.SUB_TABName.length; i++) {
          $scope.SUB_TABName[i].openSection = false;
          $scope.SUB_TABName[index].openSection = !x;
        }
        y.name == "AMLOCK"
          ? (document.getElementById("Upload_Image").defaultValue = "AMLOCK")
          : y.name == "CRILC"
            ? (document.getElementById("Upload_Image").defaultValue = "CRILC")
            : "";
        if (y.name == "AMLOCK" || y.name == "CRILC")
          $scope.SET_VISIBILITY ? $scope.getImageStreams(y.id) : "";
      }

      if (flag == "credit_facility") {
        if (y.name == "Credit facility") {
          // (document.getElementById('Upload_Image')) ? document.getElementById('Upload_Image').defaultValue = 'AMLOCK' : '';
          $scope.showCredit = true;
          $scope.showAnnuexure = false;
          $scope.showAccount = false;
        } else if (y.name == "Collection CA") {
          // (document.getElementById('Upload_Image')) ? document.getElementById('Upload_Image').defaultValue = 'CRILC' : '';
          $scope.showCredit = false;
          $scope.showAnnuexure = true;
          $scope.showAccount = false;
        } else if (y.name == "Eligible Account") {
          $scope.showCredit = false;
          $scope.showAnnuexure = false;
          $scope.showAccount = true;
        }
        for (i = 0; i < $scope.Credit_TABName.length; i++) {
          $scope.Credit_TABName[i].openSection = false;
          $scope.Credit_TABName[index].openSection = !x;
        }
        // (y.name == 'AMLOCK') ? document.getElementById('Upload_Image').defaultValue = 'AMLOCK' : (y.name == 'CRILC') ? document.getElementById('Upload_Image').defaultValue = 'CRILC' : '';
        // if (y.name == 'AMLOCK' || y.name == 'CRILC') $scope.SET_VISIBILITY ? $scope.getImageStreams(y.id) : '';
      }
    };

    $scope.getImageStreams = function (id, obj) {
      var body = {
        spgetdocumentqueueliststatus: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
            x_doc_type: "",
            x_doc_id: id,
            x_status: $scope.username,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spgetdocumentqueueliststatus */**", res);
            if (
              res.data["spgetdocumentqueueliststatus"][0].hasOwnProperty(
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
              res.data["spgetdocumentqueueliststatus"][0].hasOwnProperty("data")
            ) {
              console.log(res);
              $scope.getAllImages_AMLOCK_CRILC =
                res.data.spgetdocumentqueueliststatus[0].data;
              if (obj == "delete_img") {
                $scope.push_image = [{ AMLOCK: [], CRILC: [] }];
                $scope.getPush_image();
              } else {
                $scope.getPush_image();
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

    $scope.getPush_image = function () {
      for (i = 0; i < $scope.getAllImages_AMLOCK_CRILC.length; i++) {
        $scope.getAllImages_AMLOCK_CRILC[i]["image_stream_base64"] =
          "data:image/" +
          $scope.getAllImages_AMLOCK_CRILC[i].image_name.split(".")[1] +
          ";base64," +
          $scope.getAllImages_AMLOCK_CRILC[i].image_stream;
        $scope.getAllImages_AMLOCK_CRILC[i]["delete_status"] = Boolean(
          $scope.getAllImages_AMLOCK_CRILC[i].delete_status == "TRUE"
            ? 1
            : $scope.getAllImages_AMLOCK_CRILC[i].delete_status == "FALSE"
              ? 0
              : ""
        );
        if ($scope.getAllImages_AMLOCK_CRILC[i].doc_des == "AMLOCK") {
          if ($scope.push_image[0].AMLOCK.length > 0) {
            var chcek_old = $filter("byProp")(
              $scope.push_image[0].AMLOCK,
              "image_name",
              $scope.getAllImages_AMLOCK_CRILC[i].image_name
            );
            if (chcek_old.length == 0)
              $scope.push_image[0].AMLOCK.push(
                $scope.getAllImages_AMLOCK_CRILC[i]
              );
          } else
            $scope.push_image[0].AMLOCK.push(
              $scope.getAllImages_AMLOCK_CRILC[i]
            );
        } else if ($scope.getAllImages_AMLOCK_CRILC[i].doc_des == "CRILIC") {
          if ($scope.push_image[0].CRILC.length > 0) {
            var chcek_old = $filter("byProp")(
              $scope.push_image[0].CRILC,
              "image_name",
              $scope.getAllImages_AMLOCK_CRILC[i].image_name
            );
            if (chcek_old.length == 0)
              $scope.push_image[0].CRILC.push(
                $scope.getAllImages_AMLOCK_CRILC[i]
              );
          } else
            $scope.push_image[0].CRILC.push(
              $scope.getAllImages_AMLOCK_CRILC[i]
            );
        }
      }
    };

    $scope.Disabled_Credit_Facility = function (y) {
      document.getElementById(y).disabled = true;
    };

    $scope.Disabled_AMLOCK_CRILC = function (y) {
      if (
        ($scope.loginServiceData[0].system_role == "DVUM" ||
        $scope.loginServiceData[0].system_role == "DVUC" )&& ($scope.selectedQ["queue_id"] ===5||$scope.selectedQ["queue_id"] ===6||$scope.selectedQ["queue_id"] ===22||$scope.selectedQ["queue_id"] ===21)
      )
        return false;
      else {
        document.getElementById(y).disabled = true;
      }
    };
    $scope.isDisabled = function (id) {
      if (
        ($scope.loginServiceData[0].system_role === "DVUM" ||
        $scope.loginServiceData[0].system_role === "DVUC") && 
        ($scope.selectedQ.queue_id === 5 || 
        $scope.selectedQ.queue_id === 6 || 
        $scope.selectedQ.queue_id === 22 || 
        $scope.selectedQ.queue_id === 21)
      ) {
        return false;
      } else {
        return true;
      }
    };
    $scope.delete_AMLOCK_CRILC = function (obj, index) {
      var body = {
        spdeletedopsimagedata: [
          {
            x_image_name: obj.image_name,
            x_object_pri_key_1: $scope.selectedGrid.x_lead_id,
            x_doc_id: obj.doc_id,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          //$scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spdeletedopsimagedata */**", res);
            if (res.data["spdeletedopsimagedata"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spdeletedopsimagedata"][0].hasOwnProperty("data")
            ) {
              console.log(res);
              if (
                res.data.spdeletedopsimagedata[0].data[0].ISSUCCESSFUL ==
                "SUCCESS"
              ) {
                //  $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Image deleted successfully.",
                  actionLabel: ["Ok"],
                });
                $scope.getImageStreams(obj.doc_id, "delete_img");
                var form = { form_id: 8 };
                $scope.getDocumentsQueueList(form);
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

    $scope.getSignatoryimagelist = function (getdata) {
      var body = {
        spgetdocumentqueuelistcomprole: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
            x_queue_id: $scope.selectedQ["queue_id"],
            x_card_id: "",
            x_system_role: $scope.loginServiceData[0].system_role,
            x_login_id: $scope.username,
            x_source: $scope.selectedGrid.x_lead_source,
            x_din_number: getdata.BO.SH_ID,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spgetdocumentqueuelistcomprole */**", res);
            if (
              res.data["spgetdocumentqueuelistcomprole"][0].hasOwnProperty(
                "error"
              )
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spgetdocumentqueuelistcomprole"][0].hasOwnProperty(
                "data"
              )
            ) {
              $scope.img = "";
              $scope.documentsDesc =
                res.data.spgetdocumentqueuelistcomprole[0].data;
              $scope.getDocumentpertab("85");
              // if(formData){
              //   if(formData.form_id=='8'){
              //   $scope.getDocumentpertab(formData,index)
              //   }
              //    if(formData.form_id=='14'){
              //   $scope.GetJSONData.AOF_CP.ENTITY_DATA.OTHERS.push(index['image_name']);
              //   //$scope.setJSONUpdate('others');
              //   }
              //   $scope.current_TAB==14?$scope.getDocumentpertab(formData,index):'';

              //   if($scope.set_FLAG_POPUP){
              //     $scope.openPopup=false;
              //   dmDialogueBox.alertBox({
              //     title: 'Message',
              //     message: "Image uploaded successfully.",
              //     actionLabel: ['Ok']
              //    });
              //   }
              //   $scope.set_FLAG_POPUP=false;
              // }else {
              //
              //  }
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
    };


  

    // $scope.handleCardClick = function(getData, form) {
     
    //   if (getData.BO && getData.BO.FLOW.toString().toLowerCase() === 'aus&bo') {
    //     $scope.getformFields(getData, form, getData.json_index);
    //     $scope.getSignatoryimagelist(getData);
    //     $scope.set_Stakeholder_Index(getData.json_index);
    //   } else {
    //     // Optional: Add an alert or toast if needed
    //     console.log('Click ignored: Role is not AUS&BO');
    //   }
    // };
    

    $scope.getformFields = function (obj, form, index,getData) {
      
      $scope.setIndex = index.toString();
      $scope.setRole = obj.BO.FLOW.toString();
      var body = {
        spformelementresultcomproleindex: [
          {
            x_form_id: form.form_id,
            x_source: $scope.selectedGrid.x_lead_source,
            x_role: obj.BO.FLOW,
            x_index: index,
          },
        ],
      };
      console.log(body);
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spformelementresultcomproleindex */**", res);
            if (
              res.data["spformelementresultcomproleindex"][0].hasOwnProperty(
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
              res.data["spformelementresultcomproleindex"][0].hasOwnProperty(
                "data"
              )
            ) {
              $scope.formElements = JSON.parse(
                res.data["spformelementresultcomproleindex"][0].data[0]
              );
              if ($scope.formElements) {
                $scope.setTAB = true;
                $scope.setDATA = false;
              }
              $scope.currentFormSections = [];
              // if($scope.form[0].form_id == "85"){
              //   // $scope.callMSMEValue();
              // }

              //if($scope.form[0].form_id == '6' && $scope.setTAB)
              $scope.getRejection_data_perStakeHolder(
                obj,
                $scope.form[0].form_id
              );
              //else
              //$scope.getRejection_data($scope.form[0].form_id);
              $scope.form[0].form_id != "85"
                ? $scope.getDocumentpertab(obj)
                : "";
              $scope.setformElementsParamGroup(form);

              // SAME_PAN_LINKED_WITH_AADHAAR NA handling - 23Oct25
              $scope.DOPSPANLINKAADHAARSTATUS('stake');
              if($scope.form[0].form_id == "85"){
                let count = 0;
                if(count<1){
                  $scope.getJsonDataNew(index);
                  count =count+1;
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
    };
  // }
  // }
  $scope.getJsonDataNew = function (index) {
    var body = {
      spgetjson: [
        {
          x_aof_id: $scope.selectedGrid.x_lead_id,
        },
      ],
    };
    $scope.showLoader("Loading.....");
    executeApi(newplatwareHeader, body, function (res) {
      console.log("# spgetjson_new #", res);
      $scope.$apply(function () {
        if (res.status == true) {
          $scope.hideLoader();
          console.log("**/* spgetjson_new */**", res);
          if (res.data["spgetjson"][0].hasOwnProperty("error")) {
            $scope.hideLoader();
          } else if (res.data["spgetjson"][0].hasOwnProperty("data")) {  
              console.log('executed.....!')
              if($scope.form[0].form_id  == "85"){ 
                $scope.custValue =
                (NewJOSN.AOF_CP.ENTITY_DATA.OBJECT_TYPE[index].BO.AUS_CUST_ID || "").trim();                      
                document.querySelectorAll('[id="AUS Customer ID"]').forEach(element=> 
                  {
                    if(element){
                       element.value = $scope.custValue;
                      }            
                    }); 
            } 
          } else {
            $scope.hideLoader();
          }
        } else if (
          res.status == false &&
          res.errorCode == "PW-0002" &&
          res.serverCode == "528"
        ) {
          $scope.hideLoader();
        } else {
          $scope.hideLoader();
        }
      });
    });
  };
    $scope.gotosub_another = function () {
      $scope.setTAB = false;
      $scope.setDATA = true;
      const form_id_6 = {
        form_name: "Stakeholders Screen",
        tab_seq: 6,
        form_id: "85",
        view_type: "FORM",
        $$hashKey: "object:608",
      };
      $scope.getFormParam(form_id_6);
    };

    $scope.getvalidateforTab = function () {
      if ($scope.form[0].form_id == 85 && $scope.setDATA == true) {
        return false;
      } else return true;
    };

    $scope.init();
  },
]);
// hello
