var scrutinyFormModule = angular.module("myApp.ScrutinyForm", []);
scrutinyFormModule.controller("scrutinyFormCtrl", [
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
      $scope.push_image = [{ AMLOCK: [], CRILC: [] }];
      $scope.count_for_image = 0;
      $scope["selectIt" + "1"] = true;
      $scope.leadFormData = {};
      $scope.user = {};
      $scope.SVR_checkbox=false;
      $scope.otherFlag_queue=true;
      $scope.savedCheckboxState= localStorage.getItem("SVR_CHECK")? localStorage.getItem("SVR_CHECK"):false;
      $scope.isChecked = $scope.savedCheckboxState === 'true'; // Ensure it's boolean
      $scope.showimage=false;
      $scope.arrayofpdf=[];
      $scope.countpdf=sessionStorage.getItem("PDFCOUNT")?sessionStorage.getItem("PDFCOUNT"):0;
      $scope.countForPdf=0;
      $scope.allowGeoRecall = true;
      $scope.isFormInvalid =true;
      $scope.showInvalidCharMessage = false;
      $scope.capturedPhotos =[];
      $scope.isVideoVisible = false;
      $scope.videoStream = null;
      $scope.videoStreamOther = null;
      $scope.isVideoVisibleOther = false;
      $scope.capturedPhotosOther = [];
      $scope.formInvalid = false;
      $scope.formData={};
      $scope.countpdf=sessionStorage.getItem("PDFCOUNT")?sessionStorage.getItem("PDFCOUNT"):0;
      $scope.countForPdf=0;
      $scope.currentCamera = sessionStorage.getItem('mode')?sessionStorage.getItem('mode'):'user'; // Default to front camera
      $scope.isFormDisabled= false;
      $scope.selection = '';
      $scope.selection2 = '';
      $scope.selection3 = '';
      $scope.selection4 = '';
      $scope.selection5 = '';
      $scope.selection6 = '';
      $scope.selection7 = '';
      $scope.selection8 = '';
      $scope.selection9 = '';
      $scope.name_of_person_met_model = '';
      $scope.contact_number_model='';
      $scope.reasonModel2 = '';
      $scope.reasonModel3 = '';
      $scope.reasonModel4 = '';
      $scope.reasonModel5 = '';
      $scope.reasonModel6 = '';
      $scope.reasonModel7 = '';
      $scope.reasonModel8 = '';
      $scope.reasonModel9 = '';
      $scope.SVRdisable=false;
      $scope.isReadonly = true;
      $scope.reject = {};
      $scope.excludedActionIdsOnMobile = ["GEFU","GEFU SA","Download",];
      $scope.optionalField = {};
      $scope.stepFocus = 0;
      $scope.count = 0;
      $scope.BSA_within_range="";
      $scope.optionalField = {};
      $scope.countForNewgen = 0;
      $scope.newgenCheck = false;
      $scope.errorMSG = false;
      $scope.gefuCheck = false;
      $scope.countForGefu = 0;
      $scope.REDFLAG = false;
      $scope.GREENFLAG = false;
      $scope.YELLOWFLAG =false;
      $scope.showAuditTrail = false;
      $scope.tabJSONObj = [];
      $scope.rejectionIds=[];
      $scope.hideCheckAction=true; //SMART PAY
      $scope.ApproveSupervisorBS = false;
      $scope.ApproveSupervisorBS_Remarks = false;
      $scope.SuperCheckIcon =false;
      $scope.tabJSONObj.counter = 0;
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
      $scope.GSTIN_Value_array=[];
      $scope.GSTNOI_array =[];
      $scope.IEC_Value_array =[];
      $scope.username = sessionStorage.getItem("userName");
      localStorage.setItem("username", $scope.username);
      $scope.selectedGrid = JSON.parse(sessionStorage.getItem("GridData"));
      localStorage.setItem("gridData", JSON.stringify($scope.selectedGrid));
      $scope.GetJSONData = JSON.parse(QueueService.getQueueJSONData());
      console.log("# getJSONData #", $scope.GetJSONData);
      $scope.SupervisorSVRflag = $scope.GetJSONData.AOF_SP.ENTITY_DATA.SUPERVISORSVRFLAG?.CODE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.SUPERVISORSVRFLAG?.CODE:'2';
      console.log(' $scope.SupervisorSVRflag', $scope.SupervisorSVRflag);
      $scope.Registeredaddress = 
      ($scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_LINE1?$scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_LINE1:'' )+ ' ' + 
      ($scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_LINE2?$scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_LINE2:'') + ' ' + 
      ($scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_LINE3?$scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_LINE3:'') + ' ' + 
      ($scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_LANDMARK?$scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_LANDMARK:'') + ' ' + 
      ($scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_PINCODE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_PINCODE:'') + ' ' + 
      ($scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_CITY?$scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_CITY:'') + ' ' + 
      ($scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_DISTRICT?$scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_DISTRICT:'') + ' ' + 
      ($scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_STATE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_STATE:'') + ' ' + 
      ($scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_COUNTRY?$scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_COUNTRY:'');
      $scope.BSA_Mobile= $scope.GetJSONData.AOF_SP.ENTITY_DATA.DOPS_COMMADD_BSA_FLAG?.CODE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.DOPS_COMMADD_BSA_FLAG?.CODE:'No';
      $scope.formData = {
        radio_model3: ''  // Default radio button model
      };
      //SMART PAY
      $scope.smartPayCA = $scope.GetJSONData.AOF_SP.ENTITY_DATA.IP_FUNDING?.FUNDING_MODE?.CODE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.IP_FUNDING?.FUNDING_MODE?.CODE:'';
      $scope.smartPaySA = $scope.GetJSONData.AOF_SP.ENTITY_DATA.SA?.IP_FUNDING?.FUNDING_MODE?.CODE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.SA?.IP_FUNDING?.FUNDING_MODE?.CODE:'';
      $scope.GetCheckBalance(); //SMART PAY
      $scope.getSupervisorSVRImage();
      $scope.terminalArray = [];
      if ($scope.GetJSONData.hasOwnProperty("AOF_SP")) {
        if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.hasOwnProperty("TERMINAL")) {
          $scope.createTerminalCards(
            $scope.GetJSONData.AOF_SP.ENTITY_DATA.TERMINAL
          );
        }
      }
      var hash = window.location.href.split("#")[1];
      localStorage.setItem("HashUrl", hash);
      $scope.list_OF_documents();
      $scope.openPopupcheckConfirm = false;
      $scope.loginServiceData[0].system_role == "SWEEP"
        ? $scope.getsweepValues()
        : "";
        if($scope.loginServiceData[0].system_role =='BS' && $scope.selectedQ["queue_id"]!==11){
            $scope.SuperCheckIcon= true;
        }
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
      $scope.SVR_TABName = [
        { id: 1, name: "Registered SVR", openSection: true },
        { id: 2, name: "Mailing SVR", openSection: false },
      ];
      $scope.getDocumentsQueueList();
      $scope.FOs_list();
      $scope.getFormFieldPerTab({ form_id: "2" });
      $scope.currentFormSections = [];
      $scope.get_all_rejection_summary();
      $scope.image_upload_length();
      $scope.AMLOCK_CRILC = {};
      $scope.openPopup = false;
      $scope.openPopupcheck = false;
      $scope.cibil_pdf_url = "";
      $scope.cibil_pdf_status = false;
      $scope.cibil_pdf_filename = "";
      $scope.cibil_pdf_docname = "";
      $scope.cibil_pdf_array = [];
      $scope.statusSVR = false;
      $scope.setSVROptions();
      $scope.getDeclarationByLead();
      $scope.SPGETCUSTOMERPDF_DB_case_reject_scrutiny();
      $scope.kyc_review_date = new Date();
      $scope.$watch(function ($scope) {
        if ($scope.form) {
          if($scope.form[0].form_id=='70'){  
                  // Initialize the radio button when the controller is loaded
                  if (!$scope.formData.radio_model3) {
                    $scope.setRadioButton();
                  }      
          if($scope.selectedQ["queue_id"] === 11 || $scope.loginServiceData[0].system_role !== 'BS'){
            if(($scope.YELLOWFLAG || $scope.REDFLAG)&& $scope.SupervisorSVRflag=='2'){
              $scope.SVR_checkbox=true;
              $scope.otherFlag_queue=true; 
            }           
           $scope.isFormDisabled= true;
           return true;
          }
          else {
            $scope.applyConditionalFlags();
          }
        }
           else if($scope.form[0].form_id !== "70" && $scope.isVideoVisible){
              $scope.toggleVideo();
              return true;
            }else if($scope.form[0].form_id !== "70" && $scope.isVideoVisibleOther){
              $scope.toggleVideoOther();
              return true;
            }
          else if ($scope.form[0].form_id == "19" && (document.getElementById('Yes') && document.getElementById('No'))) {  
            $scope.setRadioButtonSVR();
            return true;
          } else if ($scope.form[0].form_id == "21" && (document.getElementById('Vas Standard') && document.getElementById('Connected Banking'))) {
            $scope.setVASOptions();
            return true;
          } else if ($scope.form[0].form_id == "17") {
            // console.log('watcher', document.getElementById($scope.declaration_content));
            document.querySelectorAll(`[id="${$scope.declaration_content}"]`).forEach(element=> 
              {
                if (element) {
                 element.checked = true;
                  if ($scope.declaration_ID === '14') {
                    let bank_name = $scope.GetJSONData.AOF_SP.ENTITY_DATA.CREDIT_FACILITY.ESCROW_BANK_NAME;
                    $scope.declaration_content = $scope.declaration_content.replace('###', bank_name);
                    $scope.optionalField['LOVY_DOPS_DECL'][0].VALUE = $scope.declaration_content;
                  }
                  if ($scope.declaration_ID === '15') {
                    let account_no = $scope.GetJSONData.AOF_SP.ENTITY_DATA.CREDIT_FACILITY.ESCROW_ACCOUNT_NO;
                    let account_name = $scope.GetJSONData.AOF_SP.ENTITY_DATA.CREDIT_FACILITY.ESCROW_ACCOUNT_NAME;
                    $scope.declaration_content = $scope.declaration_content.replace('###', account_name);
                    $scope.declaration_content = $scope.declaration_content.replace('####', account_no);
                    $scope.optionalField['LOVY_DOPS_DECL'][0].VALUE = $scope.declaration_content;
                  }
                }
              });
            
            return true;
          } else if($scope.form[0].form_id == "2") {
            let promoCodeChangeCount =0;
            if(promoCodeChangeCount < 1){
              $scope.getGSTValue();
              document.querySelectorAll('[id="Tracking Code(Promo Code I)"]').forEach(element=> 
                {
                  if(element){
                    console.log('PRINT BLIND');
                    promoCodeChangeCount++;
                   let transection_limit_value = $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.transaction_limit
                     console.log("transection_limit_value",transection_limit_value)
                    for(let front=0;front < parseInt($scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.PROMOCODE1_FRONT); front++){
                      transection_limit_value= " " + transection_limit_value;
                     console.log("transection_limit_value",transection_limit_value)
                     element.value =transection_limit_value;
                    }
                    for(let end=0;end < parseInt($scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.PROMOCODE1_END); end++){
                      transection_limit_value=transection_limit_value + " ";
                     console.log("transection_limit_value",transection_limit_value)
                     element.value =transection_limit_value;
                    }               
                  }
                });
                document.querySelectorAll('[id="Billing Code(Promo Code II)"]').forEach(element=> 
                  {
                    if(element){
                      console.log('PRINT BLIND-2');
                      promoCodeChangeCount++;
                      let billing_code_value = $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.BIILING_CODE
                       console.log("billing_code_value",billing_code_value)
                      for(let front=0;front < parseInt($scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.PROMOCODE2_FRONT); front++){
                        billing_code_value= " " + billing_code_value;
                       console.log("billing_code_value",billing_code_value)
                       element.value =billing_code_value;
                      }
                      for(let end=0;end < parseInt($scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.PROMOCODE2_END); end++){
                        billing_code_value=billing_code_value + " ";
                       console.log("billing_code_value",billing_code_value)
                       element.value =billing_code_value;
                      }
                    }
                  });
                  document.querySelectorAll('[id="GSTIN No. Fetched using PAN"]').forEach(element=> 
                    {
                      if(element){
                        promoCodeChangeCount++;
          if($scope.GetJSONData.AOF_SP.ENTITY_DATA.PANGSTLINK=="0"||$scope.GetJSONData.AOF_SP.ENTITY_DATA.PANGSTLINK==null){
            $scope.GSTIN_Nos = $scope.GetJSONData.AOF_SP.ENTITY_DATA.PANGST_ARRAY
          console.log("GSTIN_Nos",$scope.GSTIN_Nos);
          element.value ="GSTIN NOT FOUND";
          }else if($scope.GetJSONData.AOF_SP.ENTITY_DATA.PANGSTLINK=="1"){
            $scope.GSTIN_Nos = $scope.GetJSONData.AOF_SP.ENTITY_DATA.PANGST_ARRAY
          console.log("GSTIN_Nos",$scope.GSTIN_Nos);
              for(let i=0;i<$scope.GSTIN_Nos.length-1;i++){
                let ValueGSTIN = $scope.GSTIN_Nos[i];
                $scope.GSTIN_Value_array.push(ValueGSTIN);
                let GSTIN_NAMES = $scope.GSTIN_Value_array.map( (item) => item.value);
              // console.log("GSTIN_NAMES",GSTIN_NAMES);
              let unique = [...new Set(GSTIN_NAMES)];
              let numbersToString =unique.join(" , ");
               element.value = numbersToString ;
              }
          }
                      }  
                    });
         
            } 
            return true;
          }
           
          
          else if($scope.form[0].form_id == "42"){
            $scope.CheckBalanceFlags(); // SMART PAY
            let promoCodeChangeCount =0;
            if(promoCodeChangeCount < 1){
              document.querySelectorAll('[id="Tracking Code(Promo Code 1)"]').forEach(element=> 
                {
                  if(element){
                    console.log('PRINT BLIND');
                    promoCodeChangeCount++;
          let transection_limit_value = $scope.GetJSONData.AOF_SP.ENTITY_DATA.SA.PRODUCT.transaction_limit
                     console.log("192",transection_limit_value)
                    for(let front=0;front < parseInt($scope.GetJSONData.AOF_SP.ENTITY_DATA.SA.PRODUCT.PROMOCODE1_FRONT); front++){
                      transection_limit_value= " " + transection_limit_value;
                     console.log("195",transection_limit_value)
                    element.value =transection_limit_value;
                    }
                    for(let end=0;end < parseInt($scope.GetJSONData.AOF_SP.ENTITY_DATA.SA.PRODUCT.PROMOCODE1_END); end++){
                      transection_limit_value=transection_limit_value + " ";
                     console.log("200",transection_limit_value)
                     element.value =transection_limit_value;
                    } 
                  }
                });
                document.querySelectorAll('[id="Billing Code(Promo Code 2)"]').forEach(element=> 
                  {
                    if(element){
                      console.log('PRINT BLIND-2');
                     promoCodeChangeCount++;
                      let billing_code_value = $scope.GetJSONData.AOF_SP.ENTITY_DATA.SA.PRODUCT.BIILING_CODE
                       console.log("210",billing_code_value)
                      for(let front=0;front < parseInt($scope.GetJSONData.AOF_SP.ENTITY_DATA.SA.PRODUCT.PROMOCODE2_FRONT); front++){
                        billing_code_value= " " + billing_code_value;
                       console.log("213",billing_code_value)
                       element.value =billing_code_value;
                      }
                      for(let end=0;end < parseInt($scope.GetJSONData.AOF_SP.ENTITY_DATA.SA.PRODUCT.PROMOCODE2_END); end++){
                        billing_code_value=billing_code_value + " ";
                       console.log("218",billing_code_value)
                       element.value =billing_code_value;
                      }
                    }
                  });
             
            }
            return true;
          }else if($scope.form[0].form_id == "5"){
            if($scope.GetJSONData.AOF_SP.ENTITY_DATA.IEC_BUSS_DETAILS.length >=1){
              $scope.IECvalue =$scope.GetJSONData.AOF_SP.ENTITY_DATA.IEC_BUSS_DETAILS;
              for(let i=0;i<$scope.IECvalue.length;i++){
               let valueIECdetails=$scope.IECvalue[i].VALUE;
               $scope.IEC_Value_array.push(valueIECdetails);
             
               let IEC_NAMES = $scope.IEC_Value_array.map( (item) => item);
               let unique = [...new Set(IEC_NAMES)];
               let numbersToString =unique.join(" , ");
               document.querySelectorAll('[id="Do you engage in imports or exports of any kind?"]').forEach(element=> 
                {
                  element.value = numbersToString ;
                })
              }
              
          }
          return true;
        } else if($scope.form[0].form_id == "1"){ //ETB
          $scope.extractCutomerType();
          return true;
      }
      //Auto Gefu new 23Dec25
    //   else if($scope.form[0].form_id == "6"){ //ETB
    //     $scope.extractAUSCustID();
    //     // $scope.extractAUSUCIC();
    //     return true;
    // }
    else if($scope.form[0].form_id == "3"){
      $scope.CheckBalanceFlags(); // SMART PAY
return true;
    }
        else if($scope.form[0].form_id == "700"){            //ETB
        $scope.extractCustomerIds();
        $scope.extractAusCustomerIds();
        return true;
        }else if($scope.form[0].form_id=='18'){
          $scope.POSEnable = $scope.GetJSONData.AOF_SP.ENTITY_DATA.POS_ENABLE?.CODE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.POS_ENABLE?.CODE:'6';
          return true;
        }
          //instant MSME phase 2 implementation
        else if($scope.selectedQ["queue_id"]=='11'&&$scope.form[0].form_id=='4' && ($scope.loginServiceData[0].system_role=="DVUM" || $scope.loginServiceData[0].system_role=="DVUC")){
          $scope.shouldDisableCheckbox = function(optionValue) {
            return optionValue !== 'abc';
        };
            return true;
        }
        else if($scope.form[0].form_id=='4'&& ($scope.loginServiceData[0].system_role=="DVUM" || $scope.loginServiceData[0].system_role=="DVUC")){
          $scope.shouldDisableCheckbox = function(optionValue) {
            return optionValue !== 'Default Value';
        };
          return true
        }else if($scope.form[0].form_id!=='4'&&($scope.loginServiceData[0].system_role!=="DVUM" || $scope.loginServiceData[0].system_role!=="DVUC")){
          $scope.shouldDisableCheckbox = function(optionValue) {
            return optionValue !== 'Default Value';
        };
            return true;
        }
        else if($scope.form[0].form_id=='4'&&($scope.loginServiceData[0].system_role!=="DVUM" || $scope.loginServiceData[0].system_role!=="DVUC")){
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
        console.log('is current tab : SVR', $scope);
      });
      $scope.getSupervisorFlagDetails();
      $scope.getSupervisorFinalFlag();
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
    $scope.getCardParamValue = function (param, card,test) {
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
        "RM Remarks": "RM_REMARKS",
        "SCENARIO":"SCENARIO",
        "SCENARIO_ID":"SCENARIO_ID",
        "FLAG":"FLAG",
        "FLAGGING_DATE":"FLAGGING_DATE"	,
        "FLAGGING_RESOLUTION_DATE":"FLAGGING_RESOLUTION_DATE",
        "FLAGGING_STATUS":"FLAG_STATUS",
        "SUPERVISOR_REMARKS":"SUPERVISOR_REMARKS"
      }
      let key = keyValue[param];
      console.log('key', key);
      console.log("TEST",test);
      console.log("card[key]",card[key]);
      return card[key];
    };
    onlyAlphanumerics=function(e) {
      var regex = new RegExp("^[a-zA-Z0-9_ ]*$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
          return true;
      }
      e.preventDefault();
      return false;
  } 
  onlyAddress = function(e){
    var regex = new RegExp("[A-Za-z0-9 .,\\/-]+");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
  }

  // Function to handle conditional flags when state changes
$scope.applyConditionalFlags = function() {
  if (($scope.YELLOWFLAG || $scope.REDFLAG) && $scope.SupervisorSVRflag === '2') {
      $scope.otherFlag_queue = false;
      $scope.SVR_checkbox = true;
      $scope.isFormDisabled = !$scope.isChecked; // Set based on checkbox state
  } else if (($scope.GREENFLAG) && $scope.SupervisorSVRflag === '2') {
      $scope.isFormDisabled = true;
      $scope.SVR_checkbox = false;
  }
};
$scope.validateFirstChar = function() {
  const firstChar = $scope.formData.contact_number_model ? $scope.formData.contact_number_model.charAt(0) : '';
  
  // Show the span if the first character is less than 6
  $scope.showInvalidCharMessage = firstChar && firstChar < '6';
};
  onlyMobile = function(e){
    const charCode = e.which ? e.which : e.keyCode;
    const input = e.target.value;

    // Allow only numeric characters (0-9)
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }

    // Ensure the first character is 6 or more
    if (input.length === 0 && (charCode < 54 || charCode > 57)) {
        return false;
    }

    return true;
  }
      $scope.save = function() {
        let SuperVisor_svr_flag_dops_value = "Not Completed"
        $scope.SupervisorSVRinsert(SuperVisor_svr_flag_dops_value,'save');
    };
    $scope.submitForm=function(){
    //   if ( ($scope.formData.selection !== ''&&$scope.formData.selection !==undefined) && ($scope.formData.selection2 !== '' &&$scope.formData.selection2 !== undefined) && ($scope.formData.selection3 !== '' &&$scope.formData.selection3 !== undefined)) {
    //     // Proceed with form submission
    //     sessionStorage.setItem('formData', JSON.stringify($scope.formData));
    //     $scope.SupervisorSVRinsert();
    // } else {
    //     // Show validation error
    //     $scope.formInvalid = true;
    //     console.log("Form is invalid. Please select an option.");
    // }
    let SuperVisor_svr_flag_dops_value = "Completed"
    $scope.SupervisorSVRinsert(SuperVisor_svr_flag_dops_value,'submit');
    $scope.formInvalid = true;
    }
    //Stop Video on toggle
$scope.stopVideoStream = function(stream) {
  if (stream) {
      let tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
  }
};
// Automatically stop the video stream when the location path changes
$scope.$on('$locationChangeStart', function(event, next, current) {
  if ($scope.videoStream) {
    $scope.stopVideoStream($scope.videoStream);  // Stop the current video stream
    $scope.videoStream = null;
    $scope.isVideoVisible = false;  // Hide the video after stopping the stream
  }
  
  if ($scope.videoStreamOther) {
    $scope.stopVideoStream($scope.videoStreamOther);  // Stop the other video stream if it's active
    $scope.videoStreamOther = null;
    $scope.isVideoVisibleOther = false;
  }
});
// toggle Business activity image
$scope.toggleVideo = function() {
  if ($scope.isVideoVisible) {
      $scope.stopVideoStream($scope.videoStream);
      $scope.videoStream = null;
      $scope.isVideoVisible = false;
  } else {
      // Stop the other video stream if active
      if ($scope.isVideoVisibleOther) {
          $scope.stopVideoStream($scope.videoStreamOther);
          $scope.videoStreamOther = null;
          $scope.isVideoVisibleOther = false;
      }
      
      $scope.isVideoVisible = true;
      // Access the video element
     // Get all elements with id="video1"
const videoElements = document.querySelectorAll('#video1');

// Check if the user is on a mobile device
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // Mobile view: use the first element
    if (videoElements.length > 0) {
        $scope.video = videoElements[0]; // The first element for mobile
        $scope.cameraType ='environment'
    }
} else {
    // Desktop view: use the second element
    if (videoElements.length > 1) {
        $scope.video = videoElements[1]; // The second element for desktop
        $scope.cameraType ='user'
    } else if (videoElements.length > 0) {
        $scope.video = videoElements[0]; // Fallback to the first element if only one is found
        $scope.cameraType ='user'
    }
}  
const constraints = {
  video: {
      facingMode: ($scope.cameraType === 'environment') ? { ideal: 'environment' } : 'user'
  }
};
      // $scope.video = document.getElementById('video1');
      $scope.canvas = document.createElement('canvas');
      $scope.canvas.width = 640;
      $scope.canvas.height = 480;
      $scope.context = $scope.canvas.getContext('2d');
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            $scope.video.srcObject = stream;
            $scope.videoStream = stream;
            $scope.$apply();
        })
        .catch(err => {
            console.error("Error accessing the camera: ", err);
            $scope.isVideoVisible = false;
            $scope.$apply();
        });
      }

  }
};
$scope.handleCheckboxChange=function(isChecked){
  $scope.isFormDisabled = !isChecked; // Enable/disable form based on checkbox
  localStorage.setItem("SVR_CHECK", isChecked); // Save state to localStorage
  $scope.isChecked = isChecked; // Update isChecked state
  $scope.applyConditionalFlags(); // Apply flags based on new state
}
// Function to start the camera with the desired facing mode (front or back)
$scope.startCamera = function(cameraType) {
  const constraints = {
      video: {
          facingMode: cameraType
      }
  };
  const videoElements = document.querySelectorAll('#video1');
 // Check if the user is on a mobile device
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  // Mobile view: use the first element
  if (videoElements.length > 0) {
      $scope.video = videoElements[0]; // The first element for mobile
  }
} else {
  // Desktop view: use the second element
  if (videoElements.length > 1) {
      $scope.video = videoElements[1]; // The second element for desktop
  } else if (videoElements.length > 0) {
      $scope.video = videoElements[0]; // Fallback to the first element if only one is found
  }
}
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
          // $scope.video = videoElements;
          $scope.video.srcObject = stream;
          $scope.videoStream = stream;
          $scope.$apply();
      })
      .catch(err => {
          console.error("Error accessing the camera: ", err);
          $scope.isVideoVisible = false;
          $scope.$apply();
      });
}

};
// Function to start the Other camera with the desired facing mode (front or back)
$scope.startCameraOther = function(cameraType) {
  const constraints = {
      video: {
          facingMode: cameraType
      }
  };
  const videoElements = document.querySelectorAll('#video2');
 // Check if the user is on a mobile device
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  // Mobile view: use the first element
  if (videoElements.length > 0) {
      $scope.video = videoElements[0]; // The first element for mobile
  }
} else {
  // Desktop view: use the second element
  if (videoElements.length > 1) {
      $scope.video = videoElements[1]; // The second element for desktop
  } else if (videoElements.length > 0) {
      $scope.video = videoElements[0]; // Fallback to the first element if only one is found
  }
}
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
          // $scope.video = videoElements;
          $scope.video.srcObject = stream;
          $scope.videoStreamOther = stream;
          $scope.$apply();
      })
      .catch(err => {
          console.error("Error accessing the camera: ", err);
          $scope.isVideoVisibleOther = false;
          $scope.$apply();
      });
}

};
// Function to stop the current video stream
$scope.stopVideoStream = function(stream) {
  if (stream) {
      stream.getTracks().forEach(track => track.stop());
  }
};

// Function to switch between front and back cameras
$scope.switchCamera = function() {
if ($scope.isVideoVisible) {
    $scope.stopVideoStream($scope.videoStream);}
  // $scope.currentCamera = cameraType; // Set the current camera to front or back
  $scope.currentCamera = ($scope.currentCamera === 'user') ? 'environment' : 'user';
  sessionStorage.setItem('mode',$scope.currentCamera);
  $scope.startCamera($scope.currentCamera); // Start the selected camera
};
// Function to switch between front and back cameras
$scope.switchCameraOther = function() {
  if ($scope.isVideoVisibleOther) {
    $scope.stopVideoStream($scope.videoStreamOther);
  }
  // $scope.currentCamera = cameraType; // Set the current camera to front or back
  $scope.currentCamera = ($scope.currentCamera === 'user') ? 'environment' : 'user';
  sessionStorage.setItem('mode',$scope.currentCamera);
  $scope.startCameraOther($scope.currentCamera); // Start the selected camera
};
//Toggle Other Image
$scope.toggleVideoOther = function() {
  if ($scope.isVideoVisibleOther) {
      $scope.stopVideoStream($scope.videoStreamOther);
      $scope.videoStreamOther = null;
      $scope.isVideoVisibleOther = false;
  } else {
      // Stop the main video stream if active
      if ($scope.isVideoVisible) {
          $scope.stopVideoStream($scope.videoStream);
          $scope.videoStream = null;
          $scope.isVideoVisible = false;
      }
      
      $scope.isVideoVisibleOther = true;
      // Access the video element
     // Get all elements with id="video1"
const videoElements = document.querySelectorAll('#video2');

// Check if the user is on a mobile device
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // Mobile view: use the first element
    if (videoElements.length > 0) {
        $scope.video = videoElements[0]; // The first element for mobile
        $scope.cameraType ='environment';
    }
} else {
    // Desktop view: use the second element
    if (videoElements.length > 1) {
        $scope.video = videoElements[1]; // The second element for desktop
        $scope.cameraType ='user';
    } else if (videoElements.length > 0) {
        $scope.video = videoElements[0]; // Fallback to the first element if only one is found
        $scope.cameraType ='user';
    }
}
const constraints = {
  video: {
    facingMode: ($scope.cameraType === 'environment') ? { ideal: 'environment' } : 'user'
  }
};
      $scope.canvas = document.createElement('canvas');
      $scope.canvas.width = 640;
      $scope.canvas.height = 480;
      $scope.context = $scope.canvas.getContext('2d');
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            $scope.video.srcObject = stream;
            $scope.videoStreamOther = stream;
            $scope.$apply();
        })
        .catch(err => {
            console.error("Error accessing the camera: ", err);
            $scope.isVideoVisibleOther = false;
            $scope.$apply();
        });
      }

  }
};


    $scope.successCallback=function(position) {
      if (position && position.coords) {
        console.log('GeoPosition', position);
        localStorage.setItem('long', position.coords.longitude);
        localStorage.setItem('lat', position.coords.latitude);
        $scope.longitude = position.coords.longitude;
        $scope.latitude = position.coords.latitude;
        // $scope.CaptureFuntion($scope.longitude,$scope.latitude);
        $scope.GetGeoCode($scope.longitude,$scope.latitude);
      } else {
        console.error('Position or coordinates are undefined');
      }
    } 
    $scope.errorCallback=function(error) {
      console.log('Error occurred while fetching location:', error);
      alert('Location access is mandatory, please enable it from your browser settings.');
    }
    $scope.CaptureFuntion = function(latitude,longitude){
      if ($scope.capturedPhotos.length < 3) {
        $scope.context.drawImage($scope.video, 0, 0, 640, 480);
// Adding the black background rectangle behind the text
$scope.context.fillStyle = "black";
$scope.context.fillRect(0, 450, 640, 30); // Draw a black rectangle at the bottom of the image

// Setting up the font and calculating the text width for centering
$scope.context.font = "16px Arial";
$scope.context.fillStyle = "white"; // White text on black background
const text = `Lat: ${latitude}, Long: ${longitude}`;
const textWidth = $scope.context.measureText(text).width;
const xPosition = (640 - textWidth) / 2; // Center the text horizontally

// Adding the latitude and longitude as centered text on the image
$scope.context.fillText(text, xPosition, 470);

        const dataURL = $scope.canvas.toDataURL('image/png');
        // $scope.capturedPhotos.push(dataURL);
        const photoName = 'Business activity image' + ($scope.capturedPhotos.length + 1);
        // const photoName = new Date().getTime().toString()+'BussActImg';
        if ($scope.capturedPhotos.length < 3) {
            $scope.capturedPhotos.push({ name: photoName, data: dataURL });
            $scope.SPMBINSERTAOFIMAGEDATACapture(photoName,dataURL,longitude,latitude);
        }
        // localStorage.setItem('capturedPhotos', JSON.stringify($scope.capturedPhotos));
        if ($scope.capturedPhotos.length >= 3) {
          if ($scope.isVideoVisible) {
            $scope.stopVideoStream($scope.videoStream);
            $scope.videoStream = null;
            $scope.isVideoVisible = false;
        } 
          $scope.isVideoVisible = false; // Close the video tag
      }
        $scope.$evalAsync();
    } else {
        alert('You can only capture up to 3 photos.');
        if ($scope.isVideoVisible) {
          $scope.stopVideoStream($scope.videoStream);
          $scope.videoStream = null;
          $scope.isVideoVisible = false;
          $scope.hideLoader();
      } 
    }
    }
      // Capture the image
  $scope.capture = function() {
    if ($scope.allowGeoRecall === true) {
      $scope.showLoader("Loading.....");
      navigator.geolocation.getCurrentPosition($scope.successCallback, $scope.errorCallback);
    }
};
    // Capture the Other image
    $scope.captureOther = function() {
      if ($scope.capturedPhotosOther.length < 5) {
        $scope.context.drawImage($scope.video, 0, 0, 640, 480);
        const dataURL = $scope.canvas.toDataURL('image/png');
        // $scope.capturedPhotosOther.push(dataURL);
        const photoName = 'OTHERS' + ($scope.capturedPhotosOther.length + 1);
        // const photoName = new Date().getTime().toString()+'Other';
        if ($scope.capturedPhotosOther.length < 5) {
            $scope.capturedPhotosOther.push({ name: photoName, data: dataURL });
            $scope.SPMBINSERTAOFIMAGEDATACaptureOther(photoName,dataURL);
        }
        if ($scope.capturedPhotosOther.length >= 5) {
          if ($scope.isVideoVisibleOther) {
            $scope.stopVideoStream($scope.videoStreamOther);
            $scope.videoStreamOther = null;
            $scope.isVideoVisibleOther = false;
        }
          $scope.isVideoVisibleOther = false; // Close the video tag
      }
        $scope.$evalAsync();
      } else {
          alert('You can only capture up to 5 photos.');
          if ($scope.isVideoVisibleOther) {
            $scope.stopVideoStream($scope.videoStreamOther);
            $scope.videoStreamOther = null;
            $scope.isVideoVisibleOther = false;
            $scope.hideLoader();
        }
      }
  };
// Save photos (this is a placeholder for actual save logic)
// $scope.savePhotos = function() {
//     if ($scope.capturedPhotos.length >= 1 && $scope.capturedPhotosOther.length >= 1) {
//         // Logic to save photos (e.g., sending to server)
//         console.log("Photos saved:", $scope.capturedPhotos);
//         console.log("Photos saved2:",$scope.capturedPhotosOther);
//         alert("Photos saved successfully!");
//     } else if($scope.capturedPhotos.length >= 1){
//            // Logic to save photos (e.g., sending to server)
//             console.log("Photos saved:", $scope.capturedPhotos);
//     }else {
//         alert('You must capture at least 1 photo.');
//     }
// };
$scope.deletePhoto = function(index) {
  // $scope.getSupervisorSVRImage();
  $scope.SPMBINSERTAOFIMAGEDATADelete($scope.capturedPhotos[index].name,$scope.capturedPhotos[index].data,index);
};
$scope.deletePhotoOther = function(index) {
  // $scope.getSupervisorSVRImage();
  $scope.SPMBINSERTAOFIMAGEDATADeleteOther($scope.capturedPhotosOther[index].name,$scope.capturedPhotosOther[index].data,index);
};
// $scope.updatePhotoNames = function() {
//   for (let i = 0; i < $scope.capturedPhotos.length; i++) {
//       $scope.capturedPhotos[i].name = 'Business activity image' + (i + 1);
//   }
// };
// $scope.updatePhotoNamesOther = function() {
//   for (let i = 0; i < $scope.capturedPhotosOther.length; i++) {
//       $scope.capturedPhotosOther[i].name = 'OTHERS' + (i + 1);
//   }
// };

$scope.SPMBINSERTAOFIMAGEDATACapture = function(photoName,dataURL,longitude,latitude){
  // Ensure they are not null or undefined
const latLongString = (latitude && longitude) ? `${latitude},${longitude}` : '';
  var body = {
    SPMBINSERTAOFIMAGEDATADOPS: [
      {
        x_form_id : $scope.form[0].form_id,
        x_control_id: "",
        x_image_dfn_id: "",
        x_doc_id: 3005,
        x_image_name: photoName,
        x_object_type: "AOF_SP",
        x_object_pri_key_1: $scope.selectedGrid.x_lead_id,
        x_object_pri_key_2:latLongString,
        x_object_pri_key_3: "",
        x_image_stream:dataURL.replace('data:image/png;base64,', ''),
        x_version_no: "",
        x_modification_no: "",
        x_login_id: $scope.username,
        x_modify_emp_id: $scope.username,
        x_create_app_id:"YES_POC-ZSAC0EYBVS",
        x_modify_app_id:"YES_POC-ZSAC0EYBVS",
        x_is_active: 'Y',
        x_device_create_timestamp:"",
        x_device_modify_timestamp:"",
        x_pw_session_id:"",
        x_process_id:"",
        x_doc_type:"",
        x_doc_bundle_id:"",
        x_file_type:"",
        x_file_path:"",
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        console.log("Req body: ", body, "**/* SPMBINSERTAOFIMAGEDATADOPS */**", res);
        if (res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].hasOwnProperty("error")) {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          });
        } else if (res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].hasOwnProperty("data")) {
          if (res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].data[0].hasOwnProperty('ISSUCCESSFUL')) {
            if(res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].data[0].ISSUCCESSFUL="SUCCESS"){
              console.log("SPMBINSERTAOFIMAGEDATADOPS Success!");
              var form = { form_id: 70 };
              $scope.getDocumentsQueueList(form);
              $scope.getSupervisorSVRImage();
              $scope.save();
            }
          } else {
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
        dmDialogueBox.alertBox({
          title: "Message",
          message: "Oop's Something went wrong",
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
$scope.SPMBINSERTAOFIMAGEDATACaptureOther = function(photoName,dataURL){
  var body = {
    SPMBINSERTAOFIMAGEDATADOPS: [
      {
        x_form_id : $scope.form[0].form_id,
        x_control_id: "",
        x_image_dfn_id: "",
        x_doc_id: 3010,
        x_image_name: photoName,
        x_object_type: "AOF_SP",
        x_object_pri_key_1: $scope.selectedGrid.x_lead_id,
        x_object_pri_key_2: "",
        x_object_pri_key_3: "",
        x_image_stream:dataURL.replace('data:image/png;base64,', ''),
        x_version_no: "",
        x_modification_no: "",
        x_login_id: $scope.username,
        x_modify_emp_id: $scope.username,
        x_create_app_id:"YES_POC-ZSAC0EYBVS",
        x_modify_app_id:"YES_POC-ZSAC0EYBVS",
        x_is_active: 'Y',
        x_device_create_timestamp:"",
        x_device_modify_timestamp:"",
        x_pw_session_id:"",
        x_process_id:"",
        x_doc_type:"",
        x_doc_bundle_id:"",
        x_file_type:"",
        x_file_path:"",
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        console.log("Req body: ", body, "**/* SPMBINSERTAOFIMAGEDATADOPS */**", res);
        if (res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].hasOwnProperty("error")) {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          });
        } else if (res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].hasOwnProperty("data")) {
          if (res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].data[0].hasOwnProperty('ISSUCCESSFUL')) {
            if(res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].data[0].ISSUCCESSFUL="SUCCESS"){
              console.log("SPMBINSERTAOFIMAGEDATADOPS Success!");
              var form = { form_id: 70 };
              $scope.getDocumentsQueueList(form);
              $scope.getSupervisorSVRImage();
            }
          } else {
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
        dmDialogueBox.alertBox({
          title: "Message",
          message: "Oop's Something went wrong",
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
$scope.getSupervisorSVRImage = function(){
  var body = {
    SPGETIMAGESUPERVISORSVR: [
      {
        x_lead_id: $scope.selectedGrid.x_lead_id,
        x_form_id: '70' ,
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
        console.log("Req body: ", body, "**/* SPGETIMAGESUPERVISORSVR */**", res);
        if (res.data["SPGETIMAGESUPERVISORSVR"][0].hasOwnProperty("error")) {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          });
        } else if (res.data["SPGETIMAGESUPERVISORSVR"][0].hasOwnProperty("data")) {
          if(res.data["SPGETIMAGESUPERVISORSVR"][0].data.length > 0){
            console.log("Runs Scuccessfully!")
            $scope.dataLength=res.data["SPGETIMAGESUPERVISORSVR"][0].data.length
            $scope.imageArray=[];
            for(i=0;i < $scope.dataLength;i++){
              $scope.image = res.data["SPGETIMAGESUPERVISORSVR"][0].data[i].image_name;
              $scope.image_stream =  'data:image/png;base64,'+ res.data["SPGETIMAGESUPERVISORSVR"][0].data[i].image_stream;
              $scope.imageArray.push({name:$scope.image, data:$scope.image_stream});
            }
            // $scope.capturedPhotos=$scope.imageArray?$scope.imageArray:[];
            $scope.capturedPhotos = $scope.imageArray.filter(img => img.name.includes('Business activity image'));
            // $scope.capturedPhotos = $scope.imageArray.filter(img => img.name.includes('BussActImg'));
            if($scope.capturedPhotos.length>0){
              $scope.showimage=true;
            }
            // $scope.capturedPhotosOther = $scope.imageArray.filter(img => img.name.includes('Other'));
            $scope.capturedPhotosOther = $scope.imageArray.filter(img => img.name.includes('OTHERS'));
          //  console.log('imageArray',$scope.imageArray);
          }else{
            console.log("lenght is 0")
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
        dmDialogueBox.alertBox({
          title: "Message",
          message: "Oop's Something went wrong",
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
$scope.GetGeoCode = function(longitude,latitude){
  // Ensure they are not null or undefined
  // let Registeredaddress =$scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_LINE1 + $scope.GetJSONDataAOF_SP.ENTITY_DATA.REG_ADD_LINE2 + $scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_LINE3 + $scope.GetJSONDat.AOF_SP.ENTITY_DATA.REG_ADD_LANDMARK + $scope.GetJSONDat.AOF_SP.ENTITY_DATA.REG_ADD_PINCODE + $scope.GetJSONDat.AOF_SP.ENTITY_DATA.REG_ADD_CITY + $scope.GetJSONDat.AOF_SP.ENTITY_DATA.REG_ADD_DISTRICT + $scope.GetJSONDat.AOF_SP.ENTITY_DATA.REG_ADD_STATE + $scope.GetJSONData.AOF_SP.ENTITY_DATA.REG_ADD_COUNTRY
const latLongString = (longitude && latitude ) ? `${longitude},${latitude}` : '';
  var body = {
    GETGEOCODE: [
      {
       Address:$scope.Registeredaddress?$scope.Registeredaddress:'',
       latlong:latLongString
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        console.log("Req body: ", body, "**/* GETGEOCODE */**", res);
        if (res.data["GETGEOCODE"][0].hasOwnProperty("error")) {
          dmDialogueBox
          .confirmBox({
            title: "Message",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          })
          .then(function (res) {
            // function here to be executed
            if (res) {
              $scope.showimage=true;
              $scope.BSA_within_range ='No';
              $scope.CaptureFuntion($scope.longitude,$scope.latitude);
            }
          });
        } else if (res.data["GETGEOCODE"][0].hasOwnProperty("data")) {
           console.log("SUCCESS!");
          $scope.BSA_Distance = res.data.GETGEOCODE[0].data[0].response.resDis.meters
          if($scope.BSA_Distance <= 50){
            $scope.hideLoader();
            if($scope.capturedPhotos.length < 3){
              dmDialogueBox
              .confirmBox({
                title: "Message",
                message: `Distance between Business activity address and establishment image is ${$scope.BSA_Distance} meters. Establishment image is captured at the provided business activity address.`,
                actionLabel: ["Ok"],
              })
              .then(function (res) {
                // function here to be executed
                if (res) {
                  $scope.showimage=true;
                  $scope.BSA_within_range ='Yes';
                  $scope.CaptureFuntion($scope.longitude,$scope.latitude);
                }
              });
              }
              else{
                $scope.CaptureFuntion($scope.longitude,$scope.latitude);
              }
           
          }else  if($scope.BSA_Distance > 50){
            $scope.hideLoader();
            if($scope.capturedPhotos.length < 3){
              dmDialogueBox
              .confirmBox({
                title: "Message",
                message: `Distance between Business activity address and establishment image is ${$scope.BSA_Distance} meters. Establishment image should be captured at the provided business activity Address`,
                actionLabel: ["Ok"],
              })
              .then(function (res) {
                // function here to be executed
                if (res) {
                  $scope.showimage=true;
                  $scope.BSA_within_range ='No';
                  $scope.CaptureFuntion($scope.longitude,$scope.latitude);
                }
              });
            }
            else{
              $scope.CaptureFuntion($scope.longitude,$scope.latitude);
            }
          }
        } else {
          $scope.hideLoader();
          dmDialogueBox
          .confirmBox({
            title: "Message",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          })
          .then(function (res) {
            // function here to be executed
            if (res) {
              $scope.showimage=true;
              $scope.BSA_within_range ='No';
              $scope.CaptureFuntion($scope.longitude,$scope.latitude);
            }
          });
        }
      } else if (
        res.status == false &&
        res.errorCode == "PW-0002" &&
        res.serverCode == "528"
      ) {
        dmDialogueBox
        .confirmBox({
          title: "Message",
          message: "Oop's Something went wrong",
          actionLabel: ["Ok"],
        })
        .then(function (res) {
          // function here to be executed
          if (res) {
            $scope.showimage=true;
            $scope.BSA_within_range ='No';
            $scope.CaptureFuntion($scope.longitude,$scope.latitude);
          }
        });
      } else {
        $scope.hideLoader();
        dmDialogueBox
        .confirmBox({
          title: "Server Error",
          message: "Error Connecting to server..",
          actionLabel: ["Ok"],
        })
        .then(function (res) {
          // function here to be executed
          if (res) {
            $scope.showimage=true;
            $scope.BSA_within_range ='No';
            $scope.CaptureFuntion($scope.longitude,$scope.latitude);
          }
        });
      }
    });
  });

}
$scope.SPMBINSERTAOFIMAGEDATADelete = function(photoName,dataURL,index){
  var body = {
    SPMBINSERTAOFIMAGEDATADOPS: [
      {
        x_form_id : $scope.form[0].form_id ,
        x_control_id: "",
        x_image_dfn_id: "",
        x_doc_id: 3005,
        x_image_name: photoName,
        x_object_type: "AOF_SP",
        x_object_pri_key_1: $scope.selectedGrid.x_lead_id,
        x_object_pri_key_2: "",
        x_object_pri_key_3: "",
        x_image_stream:dataURL,
        x_version_no: "",
        x_modification_no: "",
        x_login_id: $scope.username,
        x_modify_emp_id: $scope.username,
        x_create_app_id:"YES_POC-ZSAC0EYBVS",
        x_modify_app_id:"YES_POC-ZSAC0EYBVS",
        x_is_active: ($scope.RejectionQueueData[0].STATUS !== "N" && $scope.imageArray.includes(photoName)==true)? 'N':'E',
        x_device_create_timestamp:"",
        x_device_modify_timestamp:"",
        x_pw_session_id:"",
        x_process_id:"",
        x_doc_type:"",
        x_doc_bundle_id:"",
        x_file_type:"",
        x_file_path:"",
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        console.log("Req body: ", body, "**/* SPMBINSERTAOFIMAGEDATADOPS */**", res);
        if (res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].hasOwnProperty("error")) {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          });
        } else if (res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].hasOwnProperty("data")) {
          if (res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].data[0].hasOwnProperty('ISSUCCESSFUL')) {
            if(res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].data[0].ISSUCCESSFUL="SUCCESS"){
              console.log("SPMBINSERTAOFIMAGEDATADOPS Success!");
              $scope.capturedPhotos.splice(index, 1);
              // $scope.updatePhotoNames();
              var form = { form_id: 70 };
              $scope.getDocumentsQueueList(form);
            }
          } else {
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
        dmDialogueBox.alertBox({
          title: "Message",
          message: "Oop's Something went wrong",
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
$scope.SPMBINSERTAOFIMAGEDATADeleteOther = function(photoName,dataURL,index){
  var body = {
    SPMBINSERTAOFIMAGEDATADOPS: [
      {
        x_form_id : $scope.form[0].form_id ,
        x_control_id: "",
        x_image_dfn_id: "",
        x_doc_id: 3010,
        x_image_name: photoName,
        x_object_type: "AOF_SP",
        x_object_pri_key_1: $scope.selectedGrid.x_lead_id,
        x_object_pri_key_2: "",
        x_object_pri_key_3: "",
        x_image_stream:dataURL,
        x_version_no: "",
        x_modification_no: "",
        x_login_id: $scope.username,
        x_modify_emp_id: $scope.username,
        x_create_app_id:"YES_POC-ZSAC0EYBVS",
        x_modify_app_id:"YES_POC-ZSAC0EYBVS",
        x_is_active: ($scope.RejectionQueueData[0].STATUS !== "N" && $scope.imageArray.includes(photoName)==true)? 'N':'E',
        x_device_create_timestamp:"",
        x_device_modify_timestamp:"",
        x_pw_session_id:"",
        x_process_id:"",
        x_doc_type:"",
        x_doc_bundle_id:"",
        x_file_type:"",
        x_file_path:"",
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        console.log("Req body: ", body, "**/* SPMBINSERTAOFIMAGEDATADOPS */**", res);
        if (res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].hasOwnProperty("error")) {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          });
        } else if (res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].hasOwnProperty("data")) {
          if (res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].data[0].hasOwnProperty('ISSUCCESSFUL')) {
            if(res.data["SPMBINSERTAOFIMAGEDATADOPS"][0].data[0].ISSUCCESSFUL="SUCCESS"){
              console.log("SPMBINSERTAOFIMAGEDATADOPS Success!");
              $scope.capturedPhotosOther.splice(index, 1);
              // $scope.updatePhotoNamesOther();
              var form = { form_id: 70 };
              $scope.getDocumentsQueueList(form);
            }
          } else {
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
        dmDialogueBox.alertBox({
          title: "Message",
          message: "Oop's Something went wrong",
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
    $scope.SupervisorSVRinsert = function(flag,ActionButton){
      $scope.formData = {
        ...$scope.formData, // Spread operator to keep existing properties
        Name_of_BM_DBM_SSM_conducted_the_SVR :JSON.parse(sessionStorage.getItem("usersession"))[0]["user_name"],
        Designation:$scope.loginServiceData[0].system_role ,
        Employee_ID:$scope.username,
        Branch_Name_and_Sol_ID:$scope.GetJSONData.AOF_SP.ENTITY_DATA.BRANCH.BRANCH_CODE.VALUE,
        Account_Number_model:$scope.GetJSONData.AOF_SP.ENTITY_DATA.ACC_NUMBER,
        Customer_ID_model:$scope.GetJSONData.AOF_SP.ENTITY_DATA.CUST_ID,
        Customer_Name_model:$scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].SEL_ENTITY_NAME,
        Mention_the_address_Visited_model:$scope.Registeredaddress,
        completed_flag:flag,
        newcase_id:$scope.selectedGrid.x_lead_id2,
        Supervisor_within_range:$scope.BSA_within_range
    };
        var body = {
          SPINSSUPERVISORSVR: [
            {
              x_lead_id:$scope.selectedGrid.x_lead_id,
              x_role:$scope.username,
              x_json_text:[$scope.formData],
              x_constitution:'SOLECANTB'
            },
          ],
        };
        $scope.showLoader("Loading.....");
        executeApi(newplatwareHeader, body, function (res) {
          $scope.$apply(function () {
            $scope.hideLoader();
            if (res.status == true) {
              console.log("Req body: ", body, "**/* SPINSSUPERVISORSVR */**", res);
              if (res.data["SPINSSUPERVISORSVR"][0].hasOwnProperty("error")) {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (res.data["SPINSSUPERVISORSVR"][0].hasOwnProperty("data")) {
                if (res.data["SPINSSUPERVISORSVR"][0].data[0].hasOwnProperty('Status')) {
                  $scope.SupervisorSVR = res.data["SPINSSUPERVISORSVR"][0].data[0].Status;
                  if(ActionButton=='submit'){
                    $scope.isFormInvalid =false;
                  }
                } else {
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
              dmDialogueBox.alertBox({
                title: "Message",
                message: "Oop's Something went wrong",
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
    $scope.SupervisorSVRget = function(){
      var body = {
        SPGETSUPERVISORSVR: [
          {
            x_lead_id:$scope.selectedGrid.x_lead_id,
            x_role:$scope.username,
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
            console.log("Req body: ", body, "**/* SPGETSUPERVISORSVR */**", res);
            if (res.data["SPGETSUPERVISORSVR"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["SPGETSUPERVISORSVR"][0].hasOwnProperty("data")) {
              if (res.data["SPGETSUPERVISORSVR"][0].data) {
                $scope.SupervisorSVRgetValues = res.data["SPGETSUPERVISORSVR"][0].data[0];
                console.log(' $scope.SupervisorSVRgetValues', $scope.SupervisorSVRgetValues);
                if ($scope.form[0].form_id=='70'){
                  $scope.SVRdisable=true   
                  $scope.Account_Number_model=$scope.GetJSONData.AOF_SP.ENTITY_DATA.ACC_NUMBER;
                  $scope.Customer_ID_model=$scope.GetJSONData.AOF_SP.ENTITY_DATA.CUST_ID;
                  $scope.Customer_Name_model=$scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].SEL_ENTITY_NAME;
                  $scope.BSA_within_range= $scope.SupervisorSVRgetValues.supervisor_within_range?$scope.SupervisorSVRgetValues.supervisor_within_range:''
                  $scope.Mention_the_address_Visited_model=$scope.Registeredaddress;
                  $scope.formData.addressType=$scope.SupervisorSVRgetValues.addresstype?$scope.SupervisorSVRgetValues.addresstype:'';
                  $scope.formData.Other_field_address_model=$scope.SupervisorSVRgetValues.other_field_address_model?$scope.SupervisorSVRgetValues.other_field_address_model:'';
                  $scope.formData.radio_model3=$scope.SupervisorSVRgetValues.radio_model3?$scope.SupervisorSVRgetValues.radio_model3:'';
                  $scope.formData.reason_formData_radio_model3=$scope.SupervisorSVRgetValues.reason_formdata_radio_model3?$scope.SupervisorSVRgetValues.reason_formdata_radio_model3:'';
                  $scope.formData.radio_model=$scope.SupervisorSVRgetValues.radio_model?$scope.SupervisorSVRgetValues.radio_model:'';
                  $scope.formData.Account_opening_model=$scope.SupervisorSVRgetValues.account_opening_model?$scope.SupervisorSVRgetValues.account_opening_model:'';
                  $scope.formData.selection=$scope.SupervisorSVRgetValues.selection?$scope.SupervisorSVRgetValues.selection:'';
                  $scope.formData.name_of_person_met_model=$scope.SupervisorSVRgetValues.name_of_person_met_model?$scope.SupervisorSVRgetValues.name_of_person_met_model:'';
                  $scope.formData.contact_number_model=$scope.SupervisorSVRgetValues.contact_number_model?$scope.SupervisorSVRgetValues.contact_number_model:'';
                  $scope.formData.selectedAddressType=$scope.SupervisorSVRgetValues.selectedaddresstype?$scope.SupervisorSVRgetValues.selectedaddresstype:'';
                  $scope.formData.otherAddressModel=$scope.SupervisorSVRgetValues.otheraddressmodel?$scope.SupervisorSVRgetValues.otheraddressmodel:'';
                  $scope.formData.selectedAddressType2=$scope.SupervisorSVRgetValues.selectedaddresstype2?$scope.SupervisorSVRgetValues.selectedaddresstype2:'';
                  $scope.formData.selection2=$scope.SupervisorSVRgetValues.selection2?$scope.SupervisorSVRgetValues.selection2:'';
                  $scope.formData.reasonModel2=$scope.SupervisorSVRgetValues.reasonmodel2?$scope.SupervisorSVRgetValues.reasonmodel2:'';
                  $scope.formData.selection3=$scope.SupervisorSVRgetValues.selection3?$scope.SupervisorSVRgetValues.selection3:'';
                  $scope.formData.reasonModel3=$scope.SupervisorSVRgetValues.reasonmodel3?$scope.SupervisorSVRgetValues.reasonmodel3:'';
                  $scope.formData.selection4=$scope.SupervisorSVRgetValues.selection4?$scope.SupervisorSVRgetValues.selection4:'';
                  $scope.formData.reasonModel4=$scope.SupervisorSVRgetValues.reasonmodel4?$scope.SupervisorSVRgetValues.reasonmodel4:'';
                  $scope.formData.selection5=$scope.SupervisorSVRgetValues.selection5?$scope.SupervisorSVRgetValues.selection5:'';
                  $scope.formData.reasonModel5=$scope.SupervisorSVRgetValues.reasonmodel5?$scope.SupervisorSVRgetValues.reasonmodel5:'';
                  $scope.formData.selection6=$scope.SupervisorSVRgetValues.selection6?$scope.SupervisorSVRgetValues.selection6:'';
                  $scope.formData.reasonModel6=$scope.SupervisorSVRgetValues.reasonmodel6?$scope.SupervisorSVRgetValues.reasonmodel6:'';
                  $scope.formData.selection7=$scope.SupervisorSVRgetValues.selection7?$scope.SupervisorSVRgetValues.selection7:'';
                  $scope.formData.reasonModel7=$scope.SupervisorSVRgetValues.reasonmodel7?$scope.SupervisorSVRgetValues.reasonmodel7:'';
                  $scope.formData.selection8=$scope.SupervisorSVRgetValues.selection8?$scope.SupervisorSVRgetValues.selection8:'';
                  $scope.formData.selection9=$scope.SupervisorSVRgetValues.selection9?$scope.SupervisorSVRgetValues.selection9:'';
                  $scope.formData.confirmations_visitConfirmed=$scope.SupervisorSVRgetValues.confirmations_visitconfirmed=="true"?true:false;
                  $scope.formData.radio_model2=$scope.SupervisorSVRgetValues.radio_model2?$scope.SupervisorSVRgetValues.radio_model2:'';
                  $scope.formData.reason_svr_model=$scope.SupervisorSVRgetValues.reason_svr_model?$scope.SupervisorSVRgetValues.reason_svr_model:'';
                         
                   return true;
                }
              } else {
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
            dmDialogueBox.alertBox({
              title: "Message",
              message: "Oop's Something went wrong",
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

    $scope.selectOption = function(option) {
      $scope.formData.selection = option;
      $scope.formInvalid = false;
      if (option !== 'No') {
        $scope.name_of_person_met_model = '';
        $scope.contact_number_model='';
      }
  };
  $scope.selectOption2 = function(option) {
    $scope.formInvalid = false;
    $scope.formData.selection2 = option;
     if(option!=='No'){
      $scope.reasonModel2='';
    }
};
$scope.selectOption3 = function(option) {
  $scope.formInvalid = false;
  $scope.formData.selection3 = option;
   if(option!=='Yes'){
    $scope.reasonModel3='';
  }
};
$scope.selectOption4 = function(option) {
  $scope.formInvalid = false;
  $scope.formData.selection4 = option;
   if(option!=='Yes'){
    $scope.reasonModel4='';
  }
};
$scope.selectOption5 = function(option) {
  $scope.formInvalid = false;
  $scope.formData.selection5 = option;
   if(option!=='No'){
    $scope.reasonModel5='';
  }
};
$scope.selectOption6 = function(option) {
  $scope.formInvalid = false;
  $scope.formData.selection6 = option;
   if(option!=='No'){
    $scope.reasonModel6='';
  }
};
$scope.selectOption7 = function(option) {
  $scope.formInvalid = false;
  $scope.formData.selection7 = option;
   if(option!=='No'){
    $scope.reasonModel7='';
  }
};
$scope.selectOption8 = function(option) {
  $scope.formInvalid = false;
  $scope.formData.selection8= option;
   if(option!=='Yes'){
    $scope.reasonModel8='';
  }
};
$scope.selectOption9 = function(option) {
  $scope.formInvalid = false;
  $scope.formData.selection9 = option;
   if(option!=='Yes'){
    $scope.reasonModel9='';
  }
};
   // Custom validation function to check if a button has been clicked
   $scope.isFormValid = function() {
    return $scope.formData.selection !== '';
};
// Function to set the radio button based on BSA_Mobile value
$scope.setRadioButton = function() {
  if ($scope.BSA_Mobile == 1) {
    $scope.formData.radio_model3 = 'No';  // Set the radio button to "No" if BSA_Mobile is 1
  } else if ($scope.BSA_Mobile == 2||$scope.BSA_Mobile == 3) {
    $scope.formData.radio_model3 = 'Yes'; // Set to "Yes" for other values, as required
  }
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
                $scope.reviewDate= $scope.changeDateFormat($scope.kyc_review_date );
                sessionStorage.setItem('kyc_reveiw_date',$scope.reviewDate.replace(/\s+/, ''));
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
    $scope.changeDateFormat =function(dateStr){

      // Convert to Date object
      const date = new Date(dateStr.replace(" ", "T"));
      
      // Get month name and year
      const options = { month: 'long', year: 'numeric' };
      const formatted = date.toLocaleDateString('en-US', options);
      const [monthName, year] = formatted.split(" ");
      const result = monthName.slice(0, 3).toUpperCase() + year;
      console.log(result);
      return result;
          }
      
    $scope.getDisabled_FormID = function () {
      const form_id = ["17", "19"];
      const form_name = ["Credit facility", "SVR"];
      if ($scope.form) {
        return form_id.includes($scope.form[0].form_id) && form_name.includes($scope.form[0].form_name);
      } else {
        return;
      }
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

    $scope.createTerminalCards = function (terminalObj) {
      if (terminalObj.length > 0) {
        console.log("/** TERMINAL **/ ", terminalObj);
        for (let index = 0; index < terminalObj.length; index++) {
          var card = {};
          card = {
            amex_charge: terminalObj[index].AMEX_ACT_CHARGE,
            amex_msf: terminalObj[index].AMEX_MSF,
            asset_type: terminalObj[index].ASSET_TYPE.VALUE,
            comm_type: terminalObj[index].COMM_TYPE,
            dd: terminalObj[index].DD.VALUE,
            terminal_name: terminalObj[index].NO_TERMINAL.VALUE,
            tpc: terminalObj[index].TPC_VALUE,
            oti: terminalObj[index].OTI,
            rent_tenure: terminalObj[index].RENT_TENURE.VALUE,
            rent_rate: terminalObj[index].RENTAL_PER_TERMINAL,
            values: $scope.getValuesFromArray(terminalObj[index].VALUE_ADD),
          };
          $scope.terminalArray.push(card);
        }
        console.log("/terminal card/ ", $scope.terminalArray);
      } else {
        $scope.terminalArray = [];
      }
    };

    $scope.getValuesFromArray = function (obj) {
      var temp = [];
      for (let index = 0; index < obj.length; index++) {
        temp.push(obj[index].VALUE);
      }
      return temp;
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
      x_constitution:"SOLECANTB" ,
      x_pan_no:"",
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
      x_constitution:"SOLECANTB" ,
      x_pan_no:"",
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
      x_constitution:"SOLECANTB" ,
      x_pan_no:'',
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

    // Customer PDF Download
    $scope.handlePDFDownload = function(){
      if ($scope.rejection_raised_view()) {
     $scope.SPGETCUSTOMERPDF_DB();
      } else {
        $scope.downloadCustomerPDF();
    }
    }

    // $scope.downloadCustomerPDF = function () {
    //   $scope.ProgramVariantValue=$scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT.VALUE;
    //   var body = {
    //     SOLEPROP_PDF_DOPS: [
    //       {
    //         leadId: $scope.selectedGrid.x_lead_id,
    //       },
    //     ],
    //   };
    //   $scope.showLoader("Loading.....");
    //   executeApi(newplatwareHeader, body, function (res) {
    //     $scope.$apply(function () {
    //       $scope.hideLoader();
    //       if (res.status == true) {
    //         console.log("Req body: ", body, "**/* SOLEPROP_PDF_DOPS */**", res);
    //         if (res.data["SOLEPROP_PDF_DOPS"][0].hasOwnProperty("error")) {
    //           dmDialogueBox.alertBox({
    //             title: "Alert",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         } else if (res.data["SOLEPROP_PDF_DOPS"][0].hasOwnProperty("data")) {
    //           $scope.decodeCustomerPdf(res.data["SOLEPROP_PDF_DOPS"][0].data[0].response, $scope.selectedGrid.x_lead_id);
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

// Customer EKYC Pdf
$scope.downloadCustomerPDF_case_reject_scrutiny = function () {
  $scope.ProgramVariantValue=$scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT.VALUE;
  var body = { 
    SEND_PDF_SOLPROP_BASE64: [
      {
        leadId: $scope.selectedGrid.x_lead_id2,
        flag:'Y',
        pdfType:$scope.ProgramVariantValue
      },
    ],
  };
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      if (res.status == true) {
        console.log("Req body: ", body, "**/* SEND_PDF_SOLPROP_BASE64 */**", res);
       if (res.data["SEND_PDF_SOLPROP_BASE64"][0].hasOwnProperty("data")) {
          $scope.SPSETCUSTOMERPDF_DB_2(res.data["SEND_PDF_SOLPROP_BASE64"][0].data[0].response);                        
        } 
      }
    });
  });
};
$scope.downloadCustomerPDF = function () {
  $scope.ProgramVariantValue=$scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT.VALUE;
  var body = {
    SEND_PDF_SOLPROP_BASE64: [
      {
        leadId: $scope.selectedGrid.x_lead_id2,
        flag:'Y',
        pdfType:$scope.ProgramVariantValue
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        console.log("Req body: ", body, "**/* SEND_PDF_SOLPROP_BASE64 */**", res);
        if (res.data["SEND_PDF_SOLPROP_BASE64"][0].hasOwnProperty("error")) {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          });
        } else if (res.data["SEND_PDF_SOLPROP_BASE64"][0].hasOwnProperty("data")) {
          $scope.decodeCustomerPdf(res.data["SEND_PDF_SOLPROP_BASE64"][0].data[0].response, $scope.selectedGrid.x_lead_id);
          $scope.SPSETCUSTOMERPDF_DB(res.data["SEND_PDF_SOLPROP_BASE64"][0].data[0].response);
                     
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
$scope.SPSETCUSTOMERPDF_DB = function (base64Value) {
  var body = {
    SPSETCUSTOMERPDF: [
      {
        x_source: $scope.selectedGrid.x_lead_source,
        x_lead_id: $scope.selectedGrid.x_lead_id2,       //small leadId
        x_base64: base64Value?base64Value:'',
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        console.log("Req body: ", body, "**/* SPSETCUSTOMERPDF */**", res);
        if (res.data["SPSETCUSTOMERPDF"][0].hasOwnProperty("error")) {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          });
        } else if (res.data["SPSETCUSTOMERPDF"][0].hasOwnProperty("data")) {
        
         if(res.data["SPSETCUSTOMERPDF"][0].data[0].STATUS =='Y')
         {
          console.log("SETPDF success...!");
         } else{
           console.log("Already available in DB / any issue while inserting...!")
         }            } else {
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
$scope.SPSETCUSTOMERPDF_DB_2 = function (base64Value) {
  var body = {
    SPSETCUSTOMERPDF: [
      {
        x_source: $scope.selectedGrid.x_lead_source,
        x_lead_id: $scope.selectedGrid.x_lead_id2,       //small leadId
        x_base64: base64Value?base64Value:'',
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        console.log("Req body: ", body, "**/* SPSETCUSTOMERPDF */**", res);
       if (res.data["SPSETCUSTOMERPDF"][0].hasOwnProperty("data")) {
        
         if(res.data["SPSETCUSTOMERPDF"][0].data[0].STATUS =='Y')
         {
          console.log("SETPDF success...!");
         } else{
           console.log("Already available in DB / any issue while inserting...!")
         }            }
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
$scope.SPGETCUSTOMERPDF_DB_case_reject_scrutiny = function () {
  var body = {
    SPGETCUSTOMERPDF: [
      {
        x_source: $scope.selectedGrid.x_lead_source,
        x_lead_id: $scope.selectedGrid.x_lead_id2,       //small leadId
       
      },
    ],
  };
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      if (res.status == true) {
        console.log("Req body: ", body, "**/* SPGETCUSTOMERPDF */**", res);
         if (res.data["SPGETCUSTOMERPDF"][0].hasOwnProperty("data")) {
          if( res.data["SPGETCUSTOMERPDF"][0].data[0].STATUS =="N"){
            $scope.downloadCustomerPDF_case_reject_scrutiny();
           }else{
            console.log("Already Present...!");

           }            
          } 
      } 
    });
  });
};
$scope.SPGETCUSTOMERPDF_DB = function () {
  var body = {
    SPGETCUSTOMERPDF: [
      {
        x_source: $scope.selectedGrid.x_lead_source,
        x_lead_id: $scope.selectedGrid.x_lead_id2,       //small leadId
       
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        console.log("Req body: ", body, "**/* SPGETCUSTOMERPDF */**", res);
        if (res.data["SPGETCUSTOMERPDF"][0].hasOwnProperty("error")) {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          });
        } else if (res.data["SPGETCUSTOMERPDF"][0].hasOwnProperty("data")) {
          if( res.data["SPGETCUSTOMERPDF"][0].data[0].STATUS =="N"){
            $scope.downloadCustomerPDF();
           }else{
            console.log("SPGETCUSTOMERPDF success...!");
            $scope.decodeCustomerPdf(res.data["SPGETCUSTOMERPDF"][0].data[0].base64, $scope.selectedGrid.x_lead_id);

           }            } else {
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

$scope.downloadCustomerEKYCPDF = function () {
  var body = {
    EKYC_SOLPRO_PDF: [
      {
        leadId: $scope.selectedGrid.x_lead_id
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        console.log("Req body: ", body, "**/* EKYC_SOLPRO_PDF */**", res);
        if (res.data["EKYC_SOLPRO_PDF"][0].hasOwnProperty("error")) {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          });
        } else if (res.data["EKYC_SOLPRO_PDF"][0].hasOwnProperty("data")) {
          $scope.decodeCustomerPdf(res.data["EKYC_SOLPRO_PDF"][0].data[0].response, $scope.selectedGrid.x_lead_id);
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

    $scope.downloadSupervisorSVRPDF = function () {
      var body = {
        SVR_PDF_DOPS: [
          {
            leadId: $scope.selectedGrid.x_lead_id
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("Req body: ", body, "**/* SVR_PDF_DOPS */**", res);
            if (res.data["SVR_PDF_DOPS"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["SVR_PDF_DOPS"][0].hasOwnProperty("data")) {
              $scope.decodeCustomerPdf(res.data["SVR_PDF_DOPS"][0].data[0].response, $scope.selectedGrid.x_lead_id);
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
           // SMART PAY
           $scope.GetCheckBalance = function () {
            var body = {
              SP_GET_INITIAL_FUNDING_DATA: [
                {
                      x_lead_id: $scope.selectedGrid.x_lead_id,
                      x_constitution:'SOLECANTB',
                      x_text_1:'',
                      x_text_2:'',
                },
              ],
            };   
          $scope.showLoader("Loading.....");
          executeApi(newplatwareHeader, body, function (res) {
            $scope.$apply(function () {
              $scope.hideLoader();
              if (res.status == true) {
                console.log("Req body: ", body, "**/* SP_GET_INITIAL_FUNDING_DATA */**", res);
                if (res.data["SP_GET_INITIAL_FUNDING_DATA"][0].hasOwnProperty("error")) {
                  $scope.hideLoader();
                } else if (res.data["SP_GET_INITIAL_FUNDING_DATA"][0].hasOwnProperty("data")) {
                    $scope.availableBalance = res.data['SP_GET_INITIAL_FUNDING_DATA'][0].data[0].avaiable_balance_ca??'';
                    $scope.holdBalance = res.data['SP_GET_INITIAL_FUNDING_DATA'][0].data[0].hold_balance_ca??'';
                    $scope.unclearedBalance = res.data['SP_GET_INITIAL_FUNDING_DATA'][0].data[0].uncleared_balance_ca??'';
                    $scope.availableBalanceSA = res.data['SP_GET_INITIAL_FUNDING_DATA'][0].data[0].avaiable_balance_sa??'';
                    $scope.holdBalanceSA = res.data['SP_GET_INITIAL_FUNDING_DATA'][0].data[0].hold_balance_sa??'';
                    $scope.unclearedBalanceSA = res.data['SP_GET_INITIAL_FUNDING_DATA'][0].data[0].uncleared_balance_sa??'';            
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
    // SMART PAY
    $scope.checkBalance = function (flag) {
      if(flag=='CA'){
        var body = {
          SMART_PAY_ACC_BAL_STATUS_CHECK_API: [
            {
              leadId: $scope.selectedGrid.x_lead_id2,
              accountNumber:$scope.GetJSONData.AOF_SP.ENTITY_DATA.IP_FUNDING?.ACC_NUM?$scope.GetJSONData.AOF_SP.ENTITY_DATA.IP_FUNDING?.ACC_NUM:'',
              transactionAmount:$scope.GetJSONData.AOF_SP.ENTITY_DATA.IP_FUNDING?.TRANSACTION_AMOUNT?$scope.GetJSONData.AOF_SP.ENTITY_DATA.IP_FUNDING?.TRANSACTION_AMOUNT:'',
            },
          ],
        };
      }else {
        var body = {
          SMART_PAY_ACC_BAL_STATUS_CHECK_API: [
            {
              leadId: $scope.selectedGrid.x_lead_id2,
              accountNumber:$scope.GetJSONData.AOF_SP.ENTITY_DATA.SA.ACC_NUMBER?$scope.GetJSONData.AOF_SP.ENTITY_DATA.SA.ACC_NUMBER:'',
              transactionAmount:$scope.GetJSONData.AOF_SP.ENTITY_DATA.SA.IP_FUNDING.TRANSACTION_AMOUNT?$scope.GetJSONData.AOF_SP.ENTITY_DATA.SA.IP_FUNDING.TRANSACTION_AMOUNT:'',
            },
          ],
        };
      }    
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("Req body: ", body, "**/* SMART_PAY_ACC_BAL_STATUS_CHECK_API */**", res);
            if (res.data["SMART_PAY_ACC_BAL_STATUS_CHECK_API"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              if(flag=='CA'){
              $scope.availableBalance ='Technical Failure';
              $scope.holdBalance ='Technical Failure';
              $scope.unclearedBalance ='Technical Failure';
              $scope.insertsmartpaybalance({
                "availableBalance": "Techincal Failure",
                "holdBalance": "Techincal Failure",
                "unclearedBalance": "Techincal Failure"},'CA');
              }else{
                $scope.availableBalanceSA ='Technical Failure';
                $scope.holdBalanceSA ='Technical Failure';
                $scope.unclearedBalanceSA ='Technical Failure';
                $scope.insertsmartpaybalance({
                  "availableBalance": "Techincal Failure",
                  "holdBalance": "Techincal Failure",
                  "unclearedBalance": "Techincal Failure"},'SA');
              }
            } else if (res.data["SMART_PAY_ACC_BAL_STATUS_CHECK_API"][0].hasOwnProperty("data")) {
              // if(flag=='CA'){
              //   $scope.availableBalance = res.data['SMART_PAY_ACC_BAL_STATUS_CHECK_API'][0].data[0].response.availableBalance??"";
              //   $scope.holdBalance = res.data['SMART_PAY_ACC_BAL_STATUS_CHECK_API'][0].data[0].response.holdBalance??'';
              //   $scope.unclearedBalance = res.data['SMART_PAY_ACC_BAL_STATUS_CHECK_API'][0].data[0].response.unclearedBalance??'';
              //   $scope.insertsmartpaybalance(res.data['SMART_PAY_ACC_BAL_STATUS_CHECK_API'][0].data[0].response,'CA');
              // }else{
              //   $scope.availableBalanceSA = res.data['SMART_PAY_ACC_BAL_STATUS_CHECK_API'][0].data[0].response.availableBalance??'';
              //    $scope.holdBalanceSA = res.data['SMART_PAY_ACC_BAL_STATUS_CHECK_API'][0].data[0].response.holdBalance??'';
              //    $scope.unclearedBalanceSA = res.data['SMART_PAY_ACC_BAL_STATUS_CHECK_API'][0].data[0].response.unclearedBalance??'';
              //    $scope.insertsmartpaybalance(res.data['SMART_PAY_ACC_BAL_STATUS_CHECK_API'][0].data[0].response,'SA');
              // }
              $scope.filtercheckbalance(res.data['SMART_PAY_ACC_BAL_STATUS_CHECK_API'][0].data[0].response,flag);  
            } else {
              $scope.hideLoader();
              if(flag=='CA'){
                $scope.availableBalance ='Technical Failure';
                $scope.holdBalance ='Technical Failure';
                $scope.unclearedBalance ='Technical Failure';
                $scope.insertsmartpaybalance({
                  "availableBalance": "Techincal Failure",
                  "holdBalance": "Techincal Failure",
                  "unclearedBalance": "Techincal Failure"},'CA');
                }else{
                  $scope.availableBalanceSA ='Technical Failure';
                  $scope.holdBalanceSA ='Technical Failure';
                  $scope.unclearedBalanceSA ='Technical Failure';
                  $scope.insertsmartpaybalance({
                    "availableBalance": "Techincal Failure",
                    "holdBalance": "Techincal Failure",
                    "unclearedBalance": "Techincal Failure"},'SA');
                }
            }
          } else if (
            res.status == false &&
            res.errorCode == "PW-0002" &&
            res.serverCode == "528"
          ) {
            $scope.hideLoader();
            if(flag=='CA'){
              $scope.availableBalance ='Technical Failure';
              $scope.holdBalance ='Technical Failure';
              $scope.unclearedBalance ='Technical Failure';
              $scope.insertsmartpaybalance({
                "availableBalance": "Techincal Failure",
                "holdBalance": "Techincal Failure",
                "unclearedBalance": "Techincal Failure"},'CA');
              }else{
                $scope.availableBalanceSA ='Technical Failure';
                $scope.holdBalanceSA ='Technical Failure';
                $scope.unclearedBalanceSA ='Technical Failure';
                $scope.insertsmartpaybalance({
                  "availableBalance": "Techincal Failure",
                  "holdBalance": "Techincal Failure",
                  "unclearedBalance": "Techincal Failure"},'SA');
              }
          } else {
            $scope.hideLoader();
            if(flag=='CA'){
              $scope.availableBalance ='Technical Failure';
              $scope.holdBalance ='Technical Failure';
              $scope.unclearedBalance ='Technical Failure';
              $scope.insertsmartpaybalance({
                "availableBalance": "Techincal Failure",
                "holdBalance": "Techincal Failure",
                "unclearedBalance": "Techincal Failure"},'CA');
              }else{
                $scope.availableBalanceSA ='Technical Failure';
                $scope.holdBalanceSA ='Technical Failure';
                $scope.unclearedBalanceSA ='Technical Failure';
                $scope.insertsmartpaybalance({
                  "availableBalance": "Techincal Failure",
                  "holdBalance": "Techincal Failure",
                  "unclearedBalance": "Techincal Failure"},'SA');
              }
          }
        });
      });
    };
    $scope.filtercheckbalance = function(data,flag){
      if (
        data.hasOwnProperty("availableBalance") &&
        data.hasOwnProperty("holdBalance") &&
        data.hasOwnProperty("unclearedBalance")
      ) {
        if(flag=='CA'){
          $scope.availableBalance = data.availableBalance??"";
          $scope.holdBalance = data.holdBalance??'';
          $scope.unclearedBalance = data.unclearedBalance??'';
          $scope.insertsmartpaybalance(data,'CA');
        }else{
           $scope.availableBalanceSA = data.availableBalance??'';
           $scope.holdBalanceSA = data.holdBalance??'';
           $scope.unclearedBalanceSA = data.unclearedBalance??'';
           $scope.insertsmartpaybalance(data,'SA');
        }
      } else {
        if(flag=='CA'){
          $scope.availableBalance ='Technical Failure';
          $scope.holdBalance ='Technical Failure';
          $scope.unclearedBalance ='Technical Failure';
          $scope.insertsmartpaybalance({
              "availableBalance": "Techincal Failure",
              "holdBalance": "Techincal Failure",
              "unclearedBalance": "Techincal Failure"},'CA');
          }else{
            $scope.availableBalanceSA ='Technical Failure';
            $scope.holdBalanceSA ='Technical Failure';
            $scope.unclearedBalanceSA ='Technical Failure';
            $scope.insertsmartpaybalance({
              "availableBalance": "Techincal Failure",
              "holdBalance": "Techincal Failure",
              "unclearedBalance": "Techincal Failure"},'SA');
          }
      }
    }

  $scope.stringifySmartBalanceJSON = function(obj){
  try{
      JSON.parse(obj);
       return obj;
   }catch(e){
    return JSON.stringify(obj);
  }
  }
    // SMART PAY
    $scope.insertsmartpaybalance = function (json,flag) {
      
      var body = {
        SP_UPDATE_INITIAL_FUNDING_DATA: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
            x_json_text:$scope.stringifySmartBalanceJSON(json)?$scope.stringifySmartBalanceJSON(json):'',
            x_constitution:'SOLECANTB',
            x_text_1:flag=='SA'?flag:'CA',
            x_text_2:'',
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("Req body: ", body, "**/* SP_UPDATE_INITIAL_FUNDING_DATA */**", res);
            if (res.data["SP_UPDATE_INITIAL_FUNDING_DATA"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
            } else if (res.data["SP_UPDATE_INITIAL_FUNDING_DATA"][0].hasOwnProperty("data")) {
               console.log("inserted>>>>>>>>>>>.");
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
    // SMART PAY
    $scope.CheckBalanceFlags = function() {
      if (
        $scope.selectedQ["queue_id"] == "5" ||
        $scope.selectedQ["queue_id"] == "6"||
        $scope.selectedQ["queue_id"] == "1"   
      )
        $scope.hideCheckAction = false;
      }
    $scope.downloadUdhyamPDF = function () {
      var body = {
        spgetudhyambase64: [
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
            console.log("Req body: ", body, "**/* spgetudhyambase64 */**", res);
            if (res.data["spgetudhyambase64"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spgetudhyambase64"][0].hasOwnProperty("data")) {
              $scope.decodeCustomerPdf(res.data["spgetudhyambase64"][0].data[0].image_stream, $scope.selectedGrid.x_lead_id);
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
    $scope.downloadSVRPDF = function () {
      var body = {
        SVR_PDF: [
          {
            leadId: $scope.selectedGrid.x_lead_id
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("Req body: ", body, "**/* SVR_PDF */**", res);
            if (res.data["SVR_PDF"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["SVR_PDF"][0].hasOwnProperty("data")) {
              $scope.decodeCustomerPdf(res.data["SVR_PDF"][0].data[0].response, $scope.selectedGrid.x_lead_id);
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
    $scope.downloadMailingSVRPDF = function () {
      var body = {
        SVR_PDF_MAILING: [
          {
            leadId: $scope.selectedGrid.x_lead_id
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("Req body: ", body, "**/* SVR_PDF_MAILING */**", res);
            if (res.data["SVR_PDF_MAILING"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["SVR_PDF_MAILING"][0].hasOwnProperty("data")) {
              $scope.decodeCustomerPdf(res.data["SVR_PDF_MAILING"][0].data[0].response, $scope.selectedGrid.x_lead_id);
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
    // $scope.decodeCustomerPdf = function (base64, leadID) {
    //   var link = document.createElement("a");
    //   link.href = "data:application/pdf;base64," + base64;
    //   link.download = leadID;
    //   link.click();
    // };

  //   $scope.decodeCustomerPdf = function (base64, leadID) {
  //     // Decode the base64 string to binary data
  //     // var byteCharacters = atob(base64);
  //     // var byteNumbers = new Array(byteCharacters.length);
  
  //     // for (var i = 0; i < byteCharacters.length; i++) {
  //     //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //     // }
  
  //     // var byteArray = new Uint8Array(byteNumbers);
  //     // var blob = new Blob([byteArray], { type: 'application/pdf' });
  
  //     // // Create a download link and click it programmatically
  //     // var link = document.createElement("a");
  //     // link.href = URL.createObjectURL(blob);
  //     // link.download = leadID + ".pdf";
  //     // document.body.appendChild(link);
  //     // link.click();
  
  //     // // Clean up by removing the link
  //     // document.body.removeChild(link);
  //     // URL.revokeObjectURL(link.href);

      
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
    
    // if (navigator.userAgent.match(/(iP(hone|od|ad)|Macintosh)/) && 'ontouchend' in document) {
    //   window.open(link,'_blank')

    // }else{
    //    link.click();

    // }

    // Clean up
    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
    }, 0);
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

    $scope.uploadDocAndConvert = function () {
      document.querySelectorAll('[id="cibil_file"]').forEach(element=> 
        { if(element){
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
        }
        });

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
                  if(element){
                    element.value = "";
                  }
                });
             
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

    // VAS functions

    $scope.setVASOptions = function () {
      console.log('VAS');
      if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.hasOwnProperty('VAS')) {
        if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.hasOwnProperty('STND_API')) {
          if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.STND_API.hasOwnProperty('CODE')) {
            if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.STND_API.CODE === '1~2') {
              document.querySelectorAll('[id="Vas Standard"]').forEach(element=> 
                { 
                  if (element) {
                    element.checked = true;
                  }
                });
                document.querySelectorAll('[id="Connected Banking"]').forEach(element=> 
                  { 
                    if (element) {
                      element.checked = true;
                    }
                  });
            }
            if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.STND_API.CODE === '1') {
              document.querySelectorAll('[id="Vas Standard"]').forEach(element=> 
                { 
                  if (element) {
                    element.checked = true;
                  }
                });
                document.querySelectorAll('[id="Connected Banking"]').forEach(element=> 
                  { 
                    if (element) {
                      element.checked = true;
                    }
                  });
            }
            if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.STND_API.CODE === '2') {
              document.querySelectorAll('[id="Vas Standard"]').forEach(element=> 
                { 
                  if (element) {
                    element.checked = false;
                  }
                });
                document.querySelectorAll('[id="Connected Banking"]').forEach(element=> 
                  { 
                    if (element) {
                      element.checked = true;
                    }
                  });
            }
          }
        }
      }
      document.querySelectorAll('[id="List of Emails"]').forEach(element=> 
        { 
      if (element) {
        element.value = $scope.vas_emails;
      }});
      document.querySelectorAll('[id="Corporate Net Banking"]').forEach(element=> 
        { 
      if (element) {
        if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.CNB.CODE == "1") {
         element.checked = true;
        } else {
          element.checked = false;
        }
      }
    });
    };

    $scope.vas_emails = "";

    $scope.join_VAS_Emails = function () {
      if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS) {
        if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.EMAIL &&
          $scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.EMAIL.length > 0) {
          $scope.vas_emails = $scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.EMAIL.map(x => x.ID).join(', ');
        }
      }
    };

    $scope.download_VAS_PDF = function () {
      var body = {
        VAS_PDF_DOPS: [
          {
            leadId: $scope.selectedGrid.x_lead_id
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            if (res.data["VAS_PDF_DOPS"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["VAS_PDF_DOPS"][0].hasOwnProperty("data")
            ) {
              console.log(res);
              let resp = res.data["VAS_PDF_DOPS"][0].data[0];
              if (resp.hasOwnProperty('response')) {
                $scope.decodeCustomerPdf(resp.response, 'VAS_pdf');
              } else if (resp.hasOwnProperty('response_message')) {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: resp.response_message,
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

    // VAS functions
//POS PDF 
$scope.download_POS_PDF = function () {
  $scope.ProgramVariantValue=$scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT.VALUE;
  var body = {
    POS_BASE64_PDF: [
      {
        leadId: $scope.selectedGrid.x_lead_id,
        programVariant:$scope.ProgramVariantValue
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        if (res.data["POS_BASE64_PDF"][0].hasOwnProperty("error")) {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          });
        } else if (
          res.data["POS_BASE64_PDF"][0].hasOwnProperty("data")
        ) {
          console.log(res);
          let resp = res.data["POS_BASE64_PDF"][0].data[0];
          if (resp.hasOwnProperty('response')) {
            $scope.decodeCustomerPdf(resp.response, 'POS_PDF');
          } else if (resp.hasOwnProperty('response_message')) {
            $scope.hideLoader();
            dmDialogueBox.alertBox({
              title: "Message",
              message: resp.response_message,
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
    // SVR functions

    $scope.setSVROptions = function () {
      if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.hasOwnProperty('EP1_DOCTYPE')) {
        if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.EP1_DOCTYPE.hasOwnProperty('CODE')) {
          var condition1 = ($scope.GetJSONData.AOF_SP.ENTITY_DATA.EP1_DOCTYPE.CODE == '10' ||
            $scope.GetJSONData.AOF_SP.ENTITY_DATA.EP1_DOCTYPE.CODE == '11');
        } else {
          var condition1 = false;
        }
      }

      if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.hasOwnProperty('EP2_DOCTYPE')) {
        if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.EP2_DOCTYPE.hasOwnProperty('CODE')) {
          var condition2 = ['10', '11', '13', '14','17','18'].includes($scope.GetJSONData.AOF_SP.ENTITY_DATA.EP2_DOCTYPE.CODE);
        } else {
          var condition2 = false;
        }
      }

      // if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.hasOwnProperty('MAIL_COMM_ADD')) {
      //   if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.MAIL_COMM_ADD.hasOwnProperty('CODE')) {
      //     var condition3 = $scope.GetJSONData.AOF_SP.ENTITY_DATA.MAIL_COMM_ADD.CODE == '2';
      //   } else {
      //     var condition3 = false;
      //   }
      // }

      // AOF_SP.ENTITY_DATA.BUSINESS_ACTIVITY.CODE
      if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.hasOwnProperty('BUSINESS_ACTIVITY')) {
        if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.BUSINESS_ACTIVITY.hasOwnProperty('CODE')) {
          var condition4 = $scope.GetJSONData.AOF_SP.ENTITY_DATA.BUSINESS_ACTIVITY.CODE == '2';
        } else {
          var condition4 = false;
        }
      }

      // console.log('c1', condition1, 'c2', condition2, 'c3', condition3, 'c4', condition4);
      console.log('c1', condition1, 'c2', condition2, 'c4', condition4);

      if (condition1 || condition2 || condition4) {
        $scope.statusSVR = true;
      } else {
        $scope.statusSVR = false;
      }
      console.log('status svr - ', $scope.statusSVR);
    };

    $scope.setRadioButtonSVR = function () {
      if ($scope.statusSVR) {
        document.querySelectorAll('[id="Yes"]').forEach(element=> 
          { if(element){
            element.checked = true;
          }});
 
          document.querySelectorAll('[id="No"]').forEach(element=> 
            { if(element){
              element.checked = false;
            }});
      } else {
        document.querySelectorAll('[id="Yes"]').forEach(element=> 
          { if(element){
            element.checked = false;
          }});
          document.querySelectorAll('[id="No"]').forEach(element=> 
            { if(element){
              element.checked = true;
            }});
      }

      // if ($scope.statusSVR) {
      //   document.getElementById('Yes ').checked = true;
      //   document.getElementById('No ').checked = false;
      // } else {
      //   document.getElementById('Yes ').checked = false;
      //   document.getElementById('No ').checked = true;
      // }

      // if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.MAIL_COMM_ADD.CODE == '2') {
      //   document.getElementById('YES').checked = true;
      //   document.getElementById('NO').checked = false;
      // } else {
      //   document.getElementById('YES').checked = false;
      //   document.getElementById('NO').checked = true;
      // }

      if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.MAIL_COMM_ADD.CODE == '2') {
        document.querySelectorAll('[id="YES"]').forEach(element=> 
          { if(element){
            element.checked = true;
          }});
          document.querySelectorAll('[id="NO"]').forEach(element=> 
            { if(element){
              element.checked = false;
            }});
      } else {
        document.querySelectorAll('[id="YES"]').forEach(element=> 
          { if(element){
            element.checked = false;
          }});
          document.querySelectorAll('[id="NO"]').forEach(element=> 
            { if(element){
              element.checked = true;
            }});
      }

      if ($scope.statusSVR && $scope.GetJSONData.AOF_SP.ENTITY_DATA.MAIL_COMM_ADD.CODE !== '2') {
         if ($scope.showCommSVR) {
          let value = () => {
            let array = $scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.INFRASTRUCTURE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.INFRASTRUCTURE:[];
            let valueArray = [];
            for (let i = 0; i < array.length; i++) {
              valueArray.push(array[i].OBJECT.VALUE);
            }
            // console.log('INFRA', valueArray.join(', '));
            return valueArray.join(', ');
          };
          // console.log('valuearr', value());
          document.querySelectorAll('[id="Physical infrastructure/stocks/materials"]').forEach(element=> 
            {
              if(element){
                element.value = value();
              }
            });
         
        }
        if ($scope.showMailSVR) {
          let value = () => {
            let array = $scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR_MAIL.INFRASTRUCTURE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR_MAIL.INFRASTRUCTURE:[];
            let valueArray = [];
            for (let i = 0; i < array.length; i++) {
              valueArray.push(array[i].OBJECT.VALUE);
            }
            // console.log('INFRA', valueArray.join(', '));
            return valueArray.join(', ');
          };
          // console.log('valuearr', value());
          document.querySelectorAll('[id="Physical infrastructure/stocks/materials"]').forEach(element=> 
            {
              if(element){
                element.value = value();
              }
            });        }
      } else if ((!$scope.statusSVR && $scope.GetJSONData.AOF_SP.ENTITY_DATA.MAIL_COMM_ADD.CODE == '2')) {
        // let value = () => {
        //   let array = $scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR_MAIL.INFRASTRUCTURE;
        //   let valueArray = [];
        //   for (let i = 0; i < array.length; i++) {
        //     valueArray.push(array[i].OBJECT.nameValuePairs.VALUE);
        //   }
        //   // console.log('INFRA', valueArray.join(', '));
        //   return valueArray.join(', ');
        // };
        // // console.log('valuearr', value());
        // document.getElementById('Physical infrastructure/stocks/materials ').value = value();
        if ($scope.showCommSVR) {
          let value = () => {
            let array = $scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.INFRASTRUCTURE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.INFRASTRUCTURE:[];
            let valueArray = [];
            for (let i = 0; i < array.length; i++) {
              valueArray.push(array[i].OBJECT.VALUE);
            }
            // console.log('INFRA', valueArray.join(', '));
            return valueArray.join(', ');
          };
          // console.log('valuearr', value());
          document.querySelectorAll('[id="Physical infrastructure/stocks/materials"]').forEach(element=> 
            {
              if(element){
                element.value = value();
              }
            });        }
        if ($scope.showMailSVR) {
          let value = () => {
            let array = $scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR_MAIL.INFRASTRUCTURE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR_MAIL.INFRASTRUCTURE:[];
            let valueArray = [];
            for (let i = 0; i < array.length; i++) {
              valueArray.push(array[i].OBJECT.VALUE);
            }
            // console.log('INFRA', valueArray.join(', '));
            return valueArray.join(', ');
          };
          // console.log('valuearr', value());
          document.querySelectorAll('[id="Physical infrastructure/stocks/materials"]').forEach(element=> 
            {
              if(element){
                element.value = value();
              }
            });
          // document.getElementById('Physical infrastructure/stocks/materials ').value = value();
        }
      } else if ($scope.statusSVR && $scope.GetJSONData.AOF_SP.ENTITY_DATA.MAIL_COMM_ADD.CODE == '2') {
        if ($scope.showCommSVR) {
          let value = () => {
            let array = $scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.INFRASTRUCTURE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.INFRASTRUCTURE:[];
            let valueArray = [];
            for (let i = 0; i < array.length; i++) {
              valueArray.push(array[i].OBJECT.VALUE);
            }
            // console.log('INFRA', valueArray.join(', '));
            return valueArray.join(', ');
          };
          // console.log('valuearr', value());
          document.querySelectorAll('[id="Physical infrastructure/stocks/materials"]').forEach(element=> 
            {
              if(element){
                element.value = value();
              }
            });        }
        if ($scope.showMailSVR) {
          let value = () => {
            let array = $scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR_MAIL.INFRASTRUCTURE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR_MAIL.INFRASTRUCTURE:[];
            let valueArray = [];
            for (let i = 0; i < array.length; i++) {
              valueArray.push(array[i].OBJECT.VALUE);
            }
            // console.log('INFRA', valueArray.join(', '));
            return valueArray.join(', ');
          };
          // console.log('valuearr', value());
          document.querySelectorAll('[id="Physical infrastructure/stocks/materials"]').forEach(element=> 
            {
              if(element){
                element.value = value();
              }
            });        }
      }else if (!$scope.statusSVR && $scope.GetJSONData.AOF_SP.ENTITY_DATA.MAIL_COMM_ADD.CODE !== '2') {
        if ($scope.showCommSVR) {
          let value = () => {
            let array = $scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.INFRASTRUCTURE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.INFRASTRUCTURE:[];
            let valueArray = [];
            for (let i = 0; i < array.length; i++) {
              valueArray.push(array[i].OBJECT.VALUE);
            }
            // console.log('INFRA', valueArray.join(', '));
            return valueArray.join(', ');
          };
          // console.log('valuearr', value());
          document.querySelectorAll('[id="Physical infrastructure/stocks/materials"]').forEach(element=> 
            {
              if(element){
                element.value = value();
              }
            });        }
        if ($scope.showMailSVR) {
          let value = () => {
            let array = $scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR_MAIL.INFRASTRUCTURE?$scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR_MAIL.INFRASTRUCTURE:[];
            let valueArray = [];
            for (let i = 0; i < array.length; i++) {
              valueArray.push(array[i].OBJECT.VALUE);
            }
            // console.log('INFRA', valueArray.join(', '));
            return valueArray.join(', ');
          };
          // console.log('valuearr', value());
          document.querySelectorAll('[id="Physical infrastructure/stocks/materials"]').forEach(element=> 
            {
              if(element){
                element.value = value();
              }
            });        }
      }
    };

    $scope.disableRejections = function (rejID) {
      if ($scope.form[0].form_id == "1") {
        if (rejID == 'RAJ409') {
          if ($scope.statusSVR || $scope.GetJSONData.AOF_SP.ENTITY_DATA.MAIL_COMM_ADD.CODE == '2') {
            return true;
          } else {
            return false;
          }
        }
      }

      if ($scope.form[0].form_id == "1" && $scope.statusSVR) {
        if (rejID == 'RAJ112') {
          return true;
        } else {
          return false;
        }
      }

      if ($scope.form[0].form_id == "19" && $scope.statusSVR) {
        if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.hasOwnProperty('VISITING_CARD')) {
          if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR_MAIL.VISITING_CARD.VALUE == 'No'
            && rejID == 'RAJ399') {
            return true;
          }
        }

        if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.hasOwnProperty('VISITING_CARD')) {
          if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.VISITING_CARD.VALUE == 'No'
            && rejID == 'RAJ279') {
            return true;
          }
        }

        if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.hasOwnProperty('BUSS_ACTIVITY')) {
          if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.BUSS_ACTIVITY.VALUE == 'No'
            && rejID == 'RAJ278') {
            return true;
          }
        }

        if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.hasOwnProperty('CUST_AUS_MET')) {
          if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.SVR.CUST_AUS_MET.VALUE == 'No'
            && rejID == 'RAJ277') {
            return true;
          }
        }
      }

      if ($scope.form[0].form_id == "19") {
        let Comm_Rej = ["RAJ277", "RAJ278", "RAJ279", "RAJ275", "RAJ276", "RAJ405", "RAJ407"];
        let Mail_Rej = ["RAJ399", "RAJ397", "RAJ400", "RAJ401", "RAJ398", "RAJ404", "RAJ406"];
        if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.hasOwnProperty('MAIL_COMM_ADD')) {
          // If registered svr is yes and mailing svr is no
          if ($scope.statusSVR && $scope.GetJSONData.AOF_SP.ENTITY_DATA.MAIL_COMM_ADD.CODE !== '2') {
            if (Mail_Rej.includes(rejID)) {
              return true;
            } else {
              return false;
            }
          }
          // If registered svr is no and mailing svr is yes
          if (!$scope.statusSVR && $scope.GetJSONData.AOF_SP.ENTITY_DATA.MAIL_COMM_ADD.CODE == '2') {
            if (Comm_Rej.includes(rejID)) {
              return true;
            } else {
              return false;
            }
          }
          // If registered svr is yes and mailing svr is yes
          if ($scope.statusSVR && $scope.GetJSONData.AOF_SP.ENTITY_DATA.MAIL_COMM_ADD.CODE == '2') {
            return false;
          }
          if (!$scope.statusSVR && $scope.GetJSONData.AOF_SP.ENTITY_DATA.MAIL_COMM_ADD.CODE !== '2') {
            return true;
          }
        } else {
          return true;
        }
      }

      if ($scope.form[0].form_id == "17") {
        if (rejID == 'RAJ396') {
          if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.CREDIT_FACILITY.ACCOUNT_ELIGIBLE.VALUE == "Collection CA") {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }

      if ($scope.form[0].form_id == "21") {
        let Rej_Codes = ["RAJ367", "RAJ371", "RAJ372", "RAJ368", "RAJ366", "RAJ369", "RAJ370"];
        if (Rej_Codes.includes(rejID)) {
          if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS_ENABLE.VALUE == "No") {
            return true;
          } else {
            if (rejID == "RAJ368" && $scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.hasOwnProperty('CNB') && $scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.CNB.CODE !== '1') {
              return true;
            } else if (rejID == "RAJ369" && $scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.hasOwnProperty('SMART_TRADE') && $scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.SMART_TRADE.CODE !== '1') {
              return true;
            } else if (rejID == "RAJ370" && $scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.hasOwnProperty('SMART_COLLECT') && $scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.SMART_COLLECT.CODE !== '1') {
              return true;
            } else if (rejID == "RAJ371" && $scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.hasOwnProperty('STND_API') && $scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.STND_API.CODE == '1') {
              return true;
            } else if (rejID == "RAJ367" && $scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.hasOwnProperty('STND_API') && $scope.GetJSONData.AOF_SP.ENTITY_DATA.VAS.STND_API.CODE == '2') {
              return true;
            } else {
              return false;
            }
          }
        }
  
      }
        //SMART PAY Dynamic Rejection disable in IP Funding Tab //SMART PAY Dynamic Rejection disable in IP Funding Tab
      // if ($scope.form[0].form_id == "42") {
      //   let Rej_Codes = [
      //     "RAJ373",
      //     "RAJ382",
      //     "RAJ381",
      //     "RAJ374",
      //     "RAJ375",
      //     "RAJ377",
      //     "RAJ376",
      //     "RAJ383",
      //     "RAJ384",
      //     "RAJ385",
      //     "RAJ386",
      //     "RAJ387",
      //     "RAJ378",
      //     "RAJ380",
      //     "RAJ379"
      //   ];
      //   if (Rej_Codes.includes(rejID)) {
      //     if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.OPEN_SA.VALUE == "No") {
      //       return true;
      //     } else if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.OPEN_SA.VALUE == "Yes") {
      //       if (parseInt($scope.GetJSONData.AOF_SP.ENTITY_DATA.SA.NOM_AGE) >= 18) {
      //         if (rejID == "RAJ377" || rejID == "RAJ376") {
      //           return true;
      //         } else {
      //           return false;
      //         }
      //       } else if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.SA.PRODUCT.KIT_TYPE.CODE !== '1') {
      //         if (rejID === 'RAJ378') {
      //           return true;
      //         }
      //       }
      //     } else {
      //       return false;
      //     }
      //   }
      // }
        // ETB Dynamic Rejection disable function
        // if ($scope.rejectionIds.includes(rejID)) {
        //   // if(($scope.GetJSONData.AOF_SP.ENTITY_DATA.DEDUPE_CUST_TYPE=='ETB' || $scope.GetJSONData.AOF_SP.ENTITY_DATA.DEDUPE_CUST_TYPE=='etb')){
        //   //   return true;
        //   // }

        //   return true;
        // }else{
        //   return false;
        // }
        //SMART PAY Dynamic Rejection disable in IP Funding Tab //SMART PAY Dynamic Rejection disable in IP Funding Tab
       if($scope.form[0].form_id=='3'|| $scope.form[0].form_id=='42'){
        if ($scope.rejectionIdsIPFunding.includes(rejID)) {
          return false;
        }else {
          return true;
        }
       }
       //SMART PAY Dynamic Rejection disable in IP Funding Tab
       if($scope.form[0].form_id !='3'|| $scope.form[0].form_id !='42'){
        if ($scope.rejectionIds.includes(rejID)) {
          // if(($scope.GetJSONData.AOF_SP.ENTITY_DATA.DEDUPE_CUST_TYPE=='ETB' || $scope.GetJSONData.AOF_SP.ENTITY_DATA.DEDUPE_CUST_TYPE=='etb')){
          //   return true;
          // }
          return true;
        }else{
          return false;
        }
          
       
       }

    };

    // ETB / SMART PAY Dynamic Rejection disable function
$scope.SPREJECTIONDISABLELISTETB = function () {
  let etb_non_etb=($scope.GetJSONData.AOF_SP.ENTITY_DATA.DEDUPE_CUST_TYPE)
  var body = {
    SP_REJECTION_DISABLE_LIST_ETB_V1: [
      {
        x_lead_id: $scope.selectedGrid.x_lead_id,
        x_etb_non_etb:etb_non_etb?etb_non_etb:'',
        x_constitution:'SOLECANTB',
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
//SMART PAY Dynamic Rejection disable in IP Funding Tab
$scope.SPREJECTIONDISABLELISTIPFUNDING = function (journey) {
  var body = {
    SPCHECKFUNDINGCONDITIONS: [
      {
        x_lead_id: $scope.selectedGrid.x_lead_id2,
        x_constitution:journey=='SA'?'SOLECANTB_SA':'SOLECANTB',
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        console.log("**/* SPCHECKFUNDINGCONDITIONS */**", res);
        if (res.data["SPCHECKFUNDINGCONDITIONS"][0].hasOwnProperty("error")) {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          });
        } else if (
          res.data["SPCHECKFUNDINGCONDITIONS"][0].hasOwnProperty("data")
        ) {
          
          $scope.rejectionIdsIPFunding = res.data.SPCHECKFUNDINGCONDITIONS[0].data.map(item => item.REJECTION_ID);
         console.log('$scope.rejectionIdsIPFunding',$scope.rejectionIdsIPFunding);
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
//SMART PAY - PAYMENT_STATUS PAID/MULTIPLE PAID HANDLING - 21Nov25
$scope.SPIPFUNDINGPAYMENTGATEWAYFIELDSCall = function (journey) {
  var body = {
    SPIPFUNDINGPAYMENTGATEWAYFIELDS: [
      {
        x_lead_id: $scope.selectedGrid.x_lead_id,
        x_constitution:journey=='SA'?'SOLECANTB_SA':'SOLECANTB',
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        console.log("Req body: ", body, "**/* SPIPFUNDINGPAYMENTGATEWAYFIELDS */**", res);
        if (res.data["SPIPFUNDINGPAYMENTGATEWAYFIELDS"][0].hasOwnProperty("error")) {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          });
        } else if (res.data["SPIPFUNDINGPAYMENTGATEWAYFIELDS"][0].hasOwnProperty("data")) {
          $scope.Payment_Status_Value = res.data?.["SPIPFUNDINGPAYMENTGATEWAYFIELDS"]?.[0]?.data?.[0]?.['Payment_Status'] ?? '';
          document.querySelectorAll('[id="Payment Status"]').forEach(element=> 
            {
          if(element){
            element.value = $scope.Payment_Status_Value ;
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
    // SVR functions

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
      if($scope.form[0].form_id == "2"){
        var inputElement = document.getElementsByName('UCIC Number')[0];
        // console.log('inputElement',inputElement);
      }else if($scope.form[0].form_id == "6"){
        var inputElement = document.getElementsByName('UCIC Number')[1];
        // console.log('inputElement',inputElement);
      }
      if (inputElement) {
        if (action === 'edit') {
          // document.getElementsByName('UCIC Number')[0].readOnly = false;
          $scope.ucic_button_status = false;
          $scope.isReadonly = false;
          inputElement.readOnly = false;
        }
        if (action === 'save') {
          if($scope.form[0].form_id == "6"){
          $scope.update_ucic_key(inputElement,'aus');
          }else if($scope.form[0].form_id == "2"){
            $scope.update_ucic_key(inputElement,'entity');
          }
        }
      }
     
    };


    $scope.enable_disable_input_custID = function (action) {
      if($scope.form[0].form_id == "6"){
        var inputElement = document.getElementsByName('AUS Customer ID')[0];
        // console.log('inputElement',inputElement);
      }else if($scope.form[0].form_id == "13"){
        var inputElement = document.getElementsByName('Mandate Customer ID')[1];
        // console.log('inputElement',inputElement);
      }
      if (inputElement) {
        if (action === 'edit') {
          inputElement.readOnly = false;
          $scope.isReadonly = false;
          $scope.CustID_button_status = false;
        }
        if (action === 'save') {
          if($scope.form[0].form_id == "6"){
            $scope.update_custID_key(inputElement,'entity');
          }else{
            $scope.update_custID_key(inputElement,'mandate');
          }
        }
      }
    };
    $scope.update_custID_key = function (inputElement,type) {
      var body = {
        SPSETCUSTID: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
            x_cust_id:type=='entity' ? document.getElementsByName('AUS Customer ID')[0].value:document.getElementsByName('Mandate Customer ID')[1].value,
            x_constitution:type=='entity' ?'SOLECANTB_AUS':'SOLECANTB_MANDATE'
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
  
    $scope.update_ucic_key = function (inputElement,type) {
    var body = {
      spsetucicno: [
        {
          x_lead_id: $scope.selectedGrid.x_lead_id,
          x_ucic_no: type == 'aus' ? document.getElementsByName('UCIC Number')[1].value:document.getElementsByName('UCIC Number')[0].value,
          x_constitution:type == 'aus' ? 'SOLECANTB_AUS': "SOLECANTB"
        },
      ],
    };
      // var body = {
      //   spsetucicno: [
      //     {
      //       x_lead_id: $scope.selectedGrid.x_lead_id,
      //       x_ucic_no: document.getElementsByName('UCIC Number')[0].value,
      //       x_constitution: "SOLECANTB"
      //     },
      //   ],
      // };
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
                $scope.ucic_button_status = true;
                // $scope.isReadonly = false;
                // inputElement.readOnly = false;
                $scope.isReadonly = true;
                inputElement.readOnly = true;
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

    // Credit Facility

    $scope.declaration_content = "";
    $scope.declaration_ID = "";

    $scope.getDeclarationByLead = function () {
      var body = {
        spgetcreditfacilitydopsdecl: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
            x_constitution: "SOLECANTB"
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

    // UCIC field functions

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
      console.log("scope form: ", $scope.form);
      $scope.saveJSONForm($scope.form, $scope.currentFormSections);
      if ($scope.form[0].form_id == "19" && document.getElementById('Yes') && document.getElementById('No')) {
        $scope.setRadioButtonSVR();
      }
      if ($scope.form[0].form_id == "19") {
        $scope.comm_svr = true;
        $scope.mail_svr = false;
        for (i = 0; i < $scope.SVR_TABName.length; i++) {
          $scope.SVR_TABName[i].openSection = false;
          $scope.SVR_TABName[0].openSection = true;
        }
        $scope.showCommSVR = true;
        $scope.showAuditTrail = true;
      }
      if ($scope.form[0].form_id == "11") {
        $scope.getAuditTrail();
      }
      if ($scope.form[0].form_id == "10") {
        $scope.showAuditTrail = false;
        $scope.getRemarkHistory();
      }
      if ($scope.form[0].form_id == "9") {
        $scope.get_all_rejection_summary();
      }
      if($scope.form[0].form_id == "65"){
        $scope.getSupervisorFlagDetails();
      }
      if ($scope.form[0].form_id == "14") {
        $scope.getReviewKYCDate();
        $scope.comment_details();
      }
      if ($scope.form[0].form_id == "8") {
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
      if ($scope.form[0].form_id == "21") {
        $scope.join_VAS_Emails();
      }
      $scope.getRejection_data($scope.form[0].form_id);
    };

    $scope.getsweepValues = function () {
      var body = {
        spsweepinstartenddate: [
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
            console.log("**/* spsweepinstartenddate */**", res);
            if (res.data["spsweepinstartenddate"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spsweepinstartenddate"][0].hasOwnProperty("data")
            ) {
              console.log(res);
              $scope.end_date =
                res.data["spsweepinstartenddate"][0].data[0].end_date;
              $scope.start_date =
                res.data["spsweepinstartenddate"][0].data[0].start_date;
              //$scope.formElements=JSON.parse(res.data['spsweepinstartenddate'][0].data[0]);
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
              // if(obj.form_id == "4"){
              //   $scope.callMSMEValue();
              // }

              $scope.formElements = JSON.parse(
                res.data["spformelementresultcomp"][0].data[0]
              );
              console.log($scope.formElements);
              $scope.setformElementsParamGroup(obj);
              if(obj.form_id == "4"){
                $scope.callMSMEValue();
              }
              if(obj.form_id == "70"){
                $scope.SupervisorSVRget();
              }
              if(obj.form_id == "2" || obj.form_id == "6" ||obj.form_id == "13"){
                let count = 0;
                if(count<1){
                  $scope.getJsonDataUCIC(obj);
                  count =count+1;
                }
                // SAME_PAN_LINKED_WITH_AADHAAR NA handling - 25Sept25
                if(obj.form_id =='6'){
                  $scope.DOPSPANLINKAADHAARSTATUS('SOLECANTB');
                }
              } 
              // SAME_PAN_LINKED_WITH_AADHAAR NA handling - 25Sept25
              if(obj.form_id =='13' && $scope.GetJSONData.AOF_SP.ENTITY_DATA.AD_MHOLDER.CODE =='1'){
                $scope.DOPSPANLINKAADHAARSTATUS('SOLECANTB_MANDATE');
              }
              //SMART PAY Dynamic Rejection disable in IP Funding Tab
              if($scope.form[0].form_id !='3'|| $scope.form[0].form_id !='42'){
                $scope.SPREJECTIONDISABLELISTETB();

              }
              //SMART PAY Dynamic Rejection disable in IP Funding Tab
              if($scope.form[0].form_id=='3'){
                $scope.SPREJECTIONDISABLELISTIPFUNDING('entity');
                $scope.SPIPFUNDINGPAYMENTGATEWAYFIELDSCall('entity'); //SMART PAY - PAYMENT_STATUS PAID/MULTIPLE PAID HANDLING - 21Nov25
              }
              //SMART PAY Dynamic Rejection disable in IP Funding Tab
              if($scope.form[0].form_id=='42'){
                $scope.SPREJECTIONDISABLELISTIPFUNDING('SA');
                $scope.SPIPFUNDINGPAYMENTGATEWAYFIELDSCall('SA'); //SMART PAY - PAYMENT_STATUS PAID/MULTIPLE PAID HANDLING - 21Nov25

              }

                        // CKYC implementation
                        if ($scope.form[0].form_id == '710') {

                          let ckycDetails = $scope.GetJSONData?.AOF_SP?.CKYCSearchResult?.ckycIDDetails || [];
                      
                          let ckycDetailsFilter = ckycDetails.find(item =>
                              item.ckycAvailableIDTypeStatus && item.ckycIDRemarks && item.ckycAvailableIDType
                          ) || {};
            
                          $scope.CKYC_Available_ID_Type_Status = ckycDetailsFilter?.ckycAvailableIDTypeStatus || '';
                          $scope.CKYC_ID_Remarks = ckycDetailsFilter?.ckycIDRemarks || '';
                          $scope.CKYC_Available_ID_Type = ckycDetailsFilter?.ckycAvailableIDType || '';
                      
                          document.querySelectorAll('[id="CKYC Available ID Type"]').forEach(e =>
                              e.value = $scope.CKYC_Available_ID_Type?$scope.CKYC_Available_ID_Type:''
                          );
                      
                          document.querySelectorAll('[id="CKYC Available ID Type Status"]').forEach(e =>
                              e.value = $scope.CKYC_Available_ID_Type_Status?$scope.CKYC_Available_ID_Type_Status:''
                          );
                      
                          document.querySelectorAll('[id="CKYC ID Remarks"]').forEach(e =>
                              e.value = $scope.CKYC_ID_Remarks?$scope.CKYC_ID_Remarks:''
                          );
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
// ETB
$scope.extractCustomerIds = function () {
  if ($scope.GetJSONData.AOF_SP && $scope.GetJSONData.AOF_SP.ENTITY_DATA && $scope.GetJSONData.AOF_SP.ENTITY_DATA?.DEDUPE_ETB_LIST) {
      let customerIds = $scope.GetJSONData.AOF_SP.ENTITY_DATA?.DEDUPE_ETB_LIST.map(item => item.customer_id);
      $scope.customerIdString = customerIds.join(',');
      document.querySelectorAll('[id="List of Cust id fetched"]').forEach(element=> 
        {
      if(element){
        element.value = $scope.customerIdString?$scope.customerIdString:'-';
      }})
  }
};
// ETB
$scope.extractAusCustomerIds = function () {
  if ($scope.GetJSONData.AOF_SP && $scope.GetJSONData.AOF_SP.ENTITY_DATA && $scope.GetJSONData.AOF_SP.ENTITY_DATA?.AUS_DEDUPE_ETB_LIST_SP) {
      let customerIds = $scope.GetJSONData.AOF_SP.ENTITY_DATA?.AUS_DEDUPE_ETB_LIST_SP.map(item => item.customer_id);
      $scope.customerIdString = customerIds.join(',');
      document.querySelectorAll('[id="List of AUS Cust id Fetched"]').forEach(element=> 
        {
      if(element){
        element.value = $scope.customerIdString?$scope.customerIdString:'-';
      }})
  }
};
$scope.extractCutomerType = function () {
  document.querySelectorAll('[id="Customer Type"]').forEach(element => {
    if (element) {

      var data = $scope.GetJSONData?.AOF_SP?.ENTITY_DATA;

      element.value =
        (data?.DEDUPE_CUST_TYPE?.toLowerCase() === 'etb')
          ? (data?.ETB_SELECTED_REPORT?.[0]?.customertypename ?? "")
          : (data?.PAN_CUST_TYPE ?? "");

    }
  });
};
//Auto gefu New 23dec25
      //   $scope.extractAUSCustID = function () {
      //     document.querySelectorAll('[id="AUS Customer ID"]').forEach(element => {
      //         if (element) {
      //             const dedupeType = $scope.GetJSONData.AOF_SP.ENTITY_DATA?.DEDUPE_CUST_TYPE?.toUpperCase();
      //             const customerId = (dedupeType === 'ETB')
      //                 ? $scope.GetJSONData.AOF_SP.ENTITY_DATA?.AUS_ETB_SELECTED?.customerId
      //                 : $scope.GetJSONData.AOF_SP.ENTITY_DATA?.CUST_ID;
      
      //             element.value = customerId ?? "-"; // fallback if value is null or undefined
      //         }
      //     });
      // };
      
      $scope.extractAUSUCIC = function (newJSON) {
          document.querySelectorAll('[id="UCIC Number"]').forEach(element => {
              if (element) {
                  const dedupeType = $scope.GetJSONData.AOF_SP.ENTITY_DATA?.DEDUPE_CUST_TYPE?.toUpperCase();
                  const ucic = (dedupeType === 'ETB')
                      ? newJSON.AOF_SP.ENTITY_DATA?.AUS_ETB_SELECTED?.ucic
                      : newJSON.AOF_SP.ENTITY_DATA?.UCIC_NUM;
      
                  element.value = ucic ?? "-"; // fallback if value is null or undefined
              }
          });
      };
// Customer AUS EKYC Pdf
$scope.downloadAusCustomerCKYCEKYCPDF = function () {
  let entity = $scope.GetJSONData?.AOF_SP?.ENTITY_DATA || {};
  let holder = entity?.HOLDER?.[0] || {};
  
  let kycMode = entity?.KYC_MODE?.CODE;
  let kycDoc = holder?.KYC_DOC?.CODE;
  if( kycMode === '2' || (!kycMode && kycDoc === '1')){
    //EKYC
    var body = {
      GET_EKYC_SOLE_AUS: [
        {
          leadId: $scope.selectedGrid.x_lead_id
        },
      ],
    };
    $scope.showLoader("Loading.....");
    executeApi(newplatwareHeader, body, function (res) {
      $scope.$apply(function () {
        $scope.hideLoader();
        if (res.status == true) {
          console.log("Req body: ", body, "**/* GET_EKYC_SOLE_AUS */**", res);
          if (res.data["GET_EKYC_SOLE_AUS"][0].hasOwnProperty("error")) {
            dmDialogueBox.alertBox({
              title: "Alert",
              message: "Oop's Something went wrong",
              actionLabel: ["Ok"],
            });
          } else if (res.data["GET_EKYC_SOLE_AUS"][0].hasOwnProperty("data")) {
            $scope.decodeCustomerPdf(res.data["GET_EKYC_SOLE_AUS"][0].data[0].response, $scope.selectedGrid.x_lead_id);
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
  } else if(kycMode === '1' || kycMode === '3'){
    //CKYC
    var body = {
      CKYC_PDF_SOLEPROP: [
        {
          leadId: $scope.selectedGrid.x_lead_id
        },
      ],
    };
    $scope.showLoader("Loading.....");
    executeApi(newplatwareHeader, body, function (res) {
      $scope.$apply(function () {
        $scope.hideLoader();
        if (res.status == true) {
          console.log("Req body: ", body, "**/* CKYC_PDF_SOLEPROP */**", res);
          if (res.data["CKYC_PDF_SOLEPROP"][0].hasOwnProperty("error")) {
            dmDialogueBox.alertBox({
              title: "Alert",
              message: "Oop's Something went wrong",
              actionLabel: ["Ok"],
            });
          } else if (res.data["CKYC_PDF_SOLEPROP"][0].hasOwnProperty("data")) {
            $scope.decodeCustomerPdf(res.data["CKYC_PDF_SOLEPROP"][0].data[0]?.response, $scope.selectedGrid.x_lead_id);
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

// <!-- EKYC PDF -->
$scope.downloadRepositoryPDF = function () {
  var body = {
    CKYC_GET_DOCUMENT: [
      {
        leadId: $scope.selectedGrid.x_lead_id2,
        constitution:$scope.selectedGrid.x_lead_source
      },
    ],
  };
  $scope.showLoader("Loading.....");
  executeApi(newplatwareHeader, body, function (res) {
    $scope.$apply(function () {
      $scope.hideLoader();
      if (res.status == true) {
        console.log("Req body: ", body, "**/* CKYC_GET_DOCUMENT */**", res);
        if (res.data["CKYC_GET_DOCUMENT"][0].hasOwnProperty("error")) {
          dmDialogueBox.alertBox({
            title: "Alert",
            message: "Oop's Something went wrong",
            actionLabel: ["Ok"],
          });
        } else if (res.data["CKYC_GET_DOCUMENT"][0].hasOwnProperty("data")) {
          if(res.data["CKYC_GET_DOCUMENT"][0]?.data[0]?.response?.pdf){
            $scope.decodeCustomerPdf(res.data["CKYC_GET_DOCUMENT"][0]?.data[0]?.response?.pdf, $scope.selectedGrid.x_lead_id2);
          }else{
            $scope.hideLoader();
            dmDialogueBox.alertBox({
              title: "Message",
              message: res.data["CKYC_GET_DOCUMENT"][0]?.data[0]?.response_message,
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
      $scope.getJsonDataUCIC = function (obj) {
        var body = {
          spgetjson: [
            {
              x_aof_id: $scope.selectedGrid.x_lead_id,
            },
          ],
        };
        $scope.showLoader("Loading.....");
        executeApi(newplatwareHeader, body, function (res) {
          console.log("# spgetjson_ucic #", res);
          $scope.$apply(function () {
            if (res.status == true) {
              $scope.hideLoader();
              console.log("**/* spgetjson_ucic */**", res);
              if (res.data["spgetjson"][0].hasOwnProperty("error")) {
                $scope.hideLoader();
              } else if (res.data["spgetjson"][0].hasOwnProperty("data")) {  
                // $scope.showUCICField =true;   
                let NewJOSN=JSON.parse(res.data.spgetjson[0].data[0].OBJECT_DATA);
                if(obj.form_id  == "2"){
                  document.querySelectorAll('[id="UCIC Number"]').forEach(element=> 
                    {
                      if(element){
                         element.value =  NewJOSN.AOF_SP.ENTITY_DATA?.UCIC_NUM?NewJOSN.AOF_SP.ENTITY_DATA?.UCIC_NUM:$scope.GetJSONData.AOF_SP.ENTITY_DATA?.UCIC_NUM;
                        }            
                      });    
                      
                }
               else if(obj.form_id  == "6"){ //ETB
                      $scope.extractAUSUCIC(NewJOSN);
                      $scope.custValue =
                      (NewJOSN.AOF_SP.ENTITY_DATA.AUS_ETB_SELECTED?.customerId || "").trim()
                      || (NewJOSN.AOF_SP.ENTITY_DATA.AUS_ETB_SELECTED_AUS_CUST_ID || "").trim()
                      || (NewJOSN.AOF_SP.ENTITY_DATA.AUS_CUST_ID || "").trim();                      
                      document.querySelectorAll('[id="AUS Customer ID"]').forEach(element=> 
                        {
                          if(element){
                             element.value = $scope.custValue;
                            }            
                          }); 
                  }
                 else if(obj.form_id  == "13"){
                  $scope.custValue =
                      (NewJOSN.AOF_SP.ENTITY_DATA.AUS_ETB_SELECTED?.MANDATE_CUST_ID || "").trim()
                      || (NewJOSN.AOF_SP.ENTITY_DATA.MANDATE_CUST_ID || "").trim(); 
                    document.querySelectorAll('[id="Mandate Customer ID"]').forEach(element=> 
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
  
    // --------------------------------------------------------------------------------------------
    //********************DOCUMENTS SECTION ************ */
    $scope.SetAmlock_crilic_array = function (btn, amlock_arr, Crilic_arr) {
      var body = {
        spamlockcrilicarrayinsert: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
            x_amlock_array: JSON.stringify(amlock_arr) || "",
            x_amlock_value: sessionStorage.getItem("AMLOCK")
              ? sessionStorage.getItem("AMLOCK")
              : $scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC.AMLOCK || "",
            x_crilic_array: JSON.stringify(Crilic_arr) || "",
            x_crilic_value: sessionStorage.getItem("CRILC")
              ? sessionStorage.getItem("CRILC")
              : $scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC.CRILC || "",
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
              } else if (btn.ACTION_NAME == "HOLD") {
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
        $scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC
      )
        $scope.amlock_crilic_array(btn);
      else {
        $scope.getSetJSON(btn, "R");

        //  $scope.buttonAction(btn,'R');
      }
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
// SAME_PAN_LINKED_WITH_AADHAAR NA handling - 25Sept25
$scope.DOPSPANLINKAADHAARSTATUS = function (type) {
  var body = {
    SPDOPSPANLINKAADHAARSTATUS: [
      {
        x_lead_id: $scope.selectedGrid.x_lead_id,
        x_constitution: type,
        x_din_number:''
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
          document.querySelectorAll('[id="Percent (%) Match (PAN vs OVD Name)"]').forEach(element=> 
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
    $scope.showDiscrepancy = function () {
      if (
        $scope.selectedQ["queue_id"] == 2 ||
        $scope.selectedQ["queue_id"] == 3 ||
        $scope.selectedQ["queue_id"] == 4 ||
        $scope.selectedQ["queue_id"] == 10 ||
        $scope.selectedQ["queue_id"] == 12 ||
        $scope.selectedQ["queue_id"] == 11 ||
        $scope.selectedQ["queue_id"] == 14 ||
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
    $scope.download = async function (x) {
      var msg = await downloadAllImages();
      $scope.downloadAsZIP(msg);
    };

    $scope.downloadSign = async function(x){
      var msg = await downloadAllSignImages();
      $scope.downloadSignAsZIP(msg);
    }

    $scope.downloadSignAsZIP = function (imageData) {
      var zip = new JSZip();
      var img = zip.folder("Images");
      for (j = 0; j < imageData.length; j++) {
        var imagename =imageData[j].accNo + 'SIGN' + (j + 1)+"." +
        'webp';
        img.file(imagename, imageData[j].fcrText, { base64: true });
      }
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, $scope.selectedGrid.x_lead_id2 + ".zip");
      });
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
      var jsonPath = json.split(",");
      for (i = 0; i < jsonPath.length; i++) {
        var initVal = $scope.getSetValue($scope.GetJSONData, jsonPath[i]);
        if (param) {
          if (param.DATA_TYPE == "DATE" && initVal) {
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
          } else if (param.DISPLAY_ATTRIBUTE == "Product Variant") {
            let newVal = initVal.split("(");
            $scope.leadFormData[json] = "(" + newVal[1] + newVal[0];
          } else {
            if (
              json == "AOF_SP.ENTITY_DATA.MHOLDER[0].AADHAAR_VIEW.AADHAAR_ID"
            ) {
              if (
                $scope.GetJSONData.AOF_SP.ENTITY_DATA.MHOLDER[0].KYC_TYPE
                  .VALUE == "QR Code"
              ) {
                $scope.leadFormData[json] =
                  "XXXXXXXXX" + initVal.substr(initVal.length - 4);
              } else {
                $scope.leadFormData[json] = initVal;
              }
            } else if (
              json == "AOF_SP.ENTITY_DATA.HOLDER[0].AADHAAR_VIEW.AADHAAR_ID"
            ) {
              if (
                $scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].WS_TEMP.KYC_BY
                  .VALUE == "QR Code"
              ) {
                $scope.leadFormData[json] =
                  "XXXXXXXXX" + initVal.substr(initVal.length - 4);
              } else {
                $scope.leadFormData[json] = initVal;
              }
            } else if (json == "AOF_SP.ENTITY_DATA.SHOP_SUB_DATE") {
              if (initVal) {
                var Subdate = initVal.split("/");
                $scope.leadFormData[json] =
                  Subdate[0] + "-" + Subdate[1] + "-" + Subdate[2];
              }
            } else if (json == "AOF_SP.ENTITY_DATA.SWEEP_CAFD.END_DATE") {
              $scope.leadFormData[json] = $scope.end_date;
            } else if (json == "AOF_SP.ENTITY_DATA.SWEEP_CAFD.START_DATE") {
              $scope.leadFormData[json] = $scope.start_date;
              // console.log("leadFormData", $scope.leadFormData);
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
              //  if(res.data.spamlockgetarray[0].data.length==0){
              //   }else{
              //     $scope.GetJSONData.AOF_SP.ENTITY_DATA['AMLOCK_CRILC']={};
              //     $scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC['AMLOCK']=res.data.spamlockgetarray[0].data[0].amlock_array_value;
              //     $scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC['CRILC']=res.data.spamlockgetarray[0].data[0].crilic_array_value;
              //    }

              if (res.data.spamlockgetarray[0].data.length == 0) {
                $scope.GetJSONData.AOF_SP.ENTITY_DATA["AMLOCK_CRILC"] = {};
                $scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC["AMLOCK"] =
                  sessionStorage.getItem("AMLOCK") || null;
                $scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC["CRILC"] =
                  sessionStorage.getItem("CRILC") || null;
              } else {
                $scope.GetJSONData.AOF_SP.ENTITY_DATA["AMLOCK_CRILC"] = {};
                $scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC["AMLOCK"] =
                  sessionStorage.getItem("AMLOCK")
                    ? sessionStorage.getItem("AMLOCK")
                    : res.data.spamlockgetarray[0].data[0].amlock_array_value;
                $scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC["CRILC"] =
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

    $scope.getFormParam = function (selectedTab) {
      $scope.t2 = performance.now();
      $scope.currentFormSections = [];
      $scope.img = "";
      if ($scope.imageDetail) {
        $scope.imageDetail.LATITUDE = "";
        $scope.imageDetail.LONGITUDE = "";
      }
      for (i = 0; i < $scope.tabJSONObj.length; i++) {
        if ($scope.tabJSONObj[i].TAB_SEQ == selectedTab.tab_seq) {
          $scope["selectIt" + $scope.tabJSONObj[i].TAB_SEQ] = true;
        } else $scope["selectIt" + $scope.tabJSONObj[i].TAB_SEQ] = false;
      }
      $scope.getFormFieldPerTab(selectedTab);
    };

    $scope.getLOVoption = function (option) {
      console.log('Arg..', option);
      $scope.optionalField[option] = [];
      $scope.LOVradioCheckbox.filter(function (item) {
        if (item.master_type == option) {
          $scope.optionalField[option] = JSON.parse(item.data_object);
          if ($scope.form[0].form_id == "17") {
            // if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.CREDIT_FACILITY.DECLARATION.VALUE) {
            //   let code = $scope.GetJSONData.AOF_CP.ENTITY_DATA.CREDIT_FACILITY.DECLARATION.VALUE;
            //   $scope.optionalField['LOVY_DOPS_DECL'][0].VALUE = code;
            // }
            $scope.optionalField['LOVY_DOPS_DECL'][0].VALUE = $scope.declaration_content;
          }
          else if(($scope.selectedQ["queue_id"] == "3" || $scope.selectedQ["queue_id"] == "10") && $scope.loginServiceData[0].system_role == "BS"){
            $scope.optionalField['LOVY_DOPS_DROP_REASON']
          }
          //for nudges requierement handle the upi id check box
          else if ($scope.form[0].form_id == "4") {
            $scope.GetJSONData.AOF_SP.ENTITY_DATA.ERP_UPI_ID.CODE=$scope.optionalField['LOVY_DOPS_UPI_ID'][0].VALUE;
            $scope.GetJSONData.AOF_SP.ENTITY_DATA.ERP_OD_LOAN.CODE=$scope.optionalField['LOVY_DOPS_ERP_OD_LOAN'][0].VALUE;
          }
          // else if ($scope.form[0].form_id == "3") {
            
          //   $scope.GetJSONData.AOF_SP.ENTITY_DATA.GUARDIAN_ADDRESS.VALUE=$scope.optionalField['LOVY_DOPS_GUARDIAN_ADD'][0].VALUE;
          // }

        }
        return;
      });
      console.log('optional field', $scope.optionalField);
    };

    $scope.saveJSONForm = function (btn, obj) {
      // console.log('btn_id', btn[0].form_id);
      QueueService.setPreviousTab(btn);
      for (i = 0; i < $scope.ovCardData.OV_TABS.length; i++) {
        if (btn[0].form_id == $scope.ovCardData.OV_TABS[i].form_id) {
          if (
            btn[0].form_id == "10" ||
            btn[0].form_id == "11" ||
            btn[0].form_id == "18" ||
            btn[0].form_id == "700"||
            btn[0].form_id == "705"||
            btn[0].form_id == "710"||
            (btn[0].form_id == "14" &&
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
          } else if((btn[0].form_id == '65'|| btn[0].form_id=='70') && $scope.loginServiceData[0].system_role !== 'BS') {
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
          }else{
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
      if(btn=="supervisorSave"){
        document.getElementById("submit_comm_super").style.color = "#c3c3c3";
          return true;
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
    // $scope.disable_super_remarks= function (){
    //   for(let i =0;i<=$scope.SupervisorQueueData.length;i++){
    //     if($scope.SupervisorQueueData[index]['SUPERVISORREMARKS']==""){
    //       return true;
    //     }else{
    //       return false;
    //     }
    //   }
     
    // }

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
          ($scope.X_tabJSONObj.length == 17 && $scope.selectedQ["queue_id"] == 1) ||
           ($scope.X_tabJSONObj.length == 16 && $scope.selectedQ["queue_id"] !== 1)
        )
 {
          if (
            $scope.loginServiceData[0].system_role == "BS" &&
            $scope.RejectionQueueData && $scope.SupervisorQueueData
          ) {
            if ($scope.RejectionQueueData[0].STATUS == "N" &&  $scope.SupervisorQueueData.length == 0) {
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
                (($scope.X_RejectionData_BS.length +
                $scope.X_RejectionData_DVUM.length +
                $scope.X_RejectionData_DVUC.length ==
                $scope.RejectionQueueData.length-1)&&$scope.RejectionQueueData[0].STATUS == "N") ||
                $scope.X_RejectionData_BS.length +
                $scope.X_RejectionData_DVUM.length +
                $scope.X_RejectionData_DVUC.length ==
                $scope.RejectionQueueData.length
              ){
                // return true;
                if($scope.ApproveSupervisorBS == true ){
                  // return true;
                  if($scope.ApproveSupervisorBS_Remarks == true ){
                    if(($scope.YELLOWFLAG || $scope.REDFLAG)&& $scope.SupervisorSVRflag=='2'){  
                      $scope.savedCheckboxState_value=localStorage.getItem('SVR_CHECK') ;
                                      if($scope.savedCheckboxState_value === 'true'){
                                        if($scope.isFormInvalid || $scope.capturedPhotos.length < 1){
                                          dmDialogueBox.alertBox({
                                            title: "Alert",
                                            message:
                                              "Kindly fill all the details into supervisor SVR tab",
                                            actionLabel: ["Ok"],
                                          });
                                        }else{
                                          return true;
                                        }
                                      }else{
                      return true;
                    }
                        return true;
                      
                    }else if($scope.SupervisorSVRflag=='1'){
                    if(($scope.isFormInvalid || $scope.capturedPhotos.length < 1)&& $scope.SupervisorSVRflag == '1'){
                      dmDialogueBox.alertBox({
                        title: "Alert",
                        message:
                          "Kindly fill all the details into supervisor SVR tab",
                        actionLabel: ["Ok"],
                      });
                    }else{
                      return true;
                    }
                  }  
                  return true;                               
                  }
                   else{
                    dmDialogueBox.alertBox({
                      title: "Alert",
                      message:
                        "Kindly Enter Remarks in Supervisor checklist tab corresponding to each Flag to proceed further.",
                      actionLabel: ["Ok"],
                    });
                  }
                }else{
                  dmDialogueBox.alertBox({
                    title: "Alert",
                    message:
                      "Kindly approve all Flag in Supervisor checklist tab to proceed further.",
                    actionLabel: ["Ok"],
                  });
                }
              }  
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
              !$scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC.CRILC.VALUE &&
              !$scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC.CRILC.VALUE
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
              $scope.GetJSONData.AOF_SP.ENTITY_DATA.hasOwnProperty(
                "AMLOCK_CRILC"
              ) &&
              $scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC.hasOwnProperty(
                "AMLOCK"
              ) &&
              $scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC.hasOwnProperty(
                "CRILC"
              )
            ) {
              if (
                !$scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC.AMLOCK &&
                !$scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC.CRILC
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

    // $scope.disabledButton=function(btn,card){
    //      if(btn.ACTION_NAME=='REJECT'){
    //       $scope.reject_count=0;
    //        if($scope.RejectionQueueData){
    //        if($scope.RejectionQueueData[0].STATUS=='N') return true;
    //       else{
    //         for(i=0;i<$scope.RejectionQueueData.length;i++){
    //              if($scope.RejectionQueueData[i].STATUS=='pending_rejection')
    //              $scope.reject_count++;
    //               }
    //           if( $scope.reject_count>0)
    //             return false;
    //          else return true;

    //         }
    //     }

    //     }
    //     if (btn.ACTION_NAME == "ACCEPT") {
    //       $scope.X_tabJSONObj = $filter("byProp")(
    //         $scope.tabJSONObj,
    //         "AcceptStatus",
    //         "true"
    //       );
    //       if (
    //         $scope.loginServiceData[0].system_role == "SIGN" ||
    //         $scope.loginServiceData[0].system_role == "RECON"
    //       ) {
    //         return false;
    //       }
    //        if (
    //         $scope.loginServiceData[0].system_role == "BS" &&
    //         $scope.RejectionQueueData
    //       ) {
    //         return false;
    //       }
    //        if (
    //         $scope.loginServiceData[0].system_role == "DVUC" &&
    //         $scope.RejectionQueueData
    //       ) {
    //         return false;
    //       }
    //       else{
    //         return true;
    //       }
    //       if (
    //         $scope.loginServiceData[0].system_role == "DVUM" &&
    //         $scope.RejectionQueueData
    //       ) {
    //         return false;
    //       }
    //       else{
    //         return true;
    //       }

    //     }

    //     if(btn.ACTION_NAME=='EXIT'){
    //        return false;
    //     }

    // }

    // -----------------------------------Service Call--------------------------------

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
        if ($scope.loginServiceData[0].system_role == "SWEEP") {
          if ($scope.tabJSONObj.length !== 0) {
            for (var i = 0; i <= $scope.tabJSONObj.length; i++) {
              if ($scope.tabJSONObj[i] !== undefined) {
                if (
                  $scope.tabJSONObj[i].Form_ID == "15" &&
                  $scope.tabJSONObj[i].viewed == true
                ) {
                  return false;
                }
              }
            }
          } else return true;
        }

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
          ($scope.X_tabJSONObj.length == 15 &&
            $scope.selectedQ["queue_id"] == 1) ||
          $scope.X_tabJSONObj.length == 16
        ) {
          if (
            $scope.loginServiceData[0].system_role == "DVUC" &&
            $scope.RejectionQueueData
          ) {
            if (
              !$scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC.AMLOCK &&
              !$scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC.CRILC
            ) {
              return true;
            } else if (
              $scope.RejectionQueueData[0].STATUS == "N"
              // && $scope.cibil_pdf_status
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
                  // && $scope.cibil_pdf_status
              )
                return false;
              else return true;
            }
          } else if (
            $scope.loginServiceData[0].system_role == "DVUM" &&
            $scope.RejectionQueueData
          ) {
            if (
              !$scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC.AMLOCK &&
              !$scope.GetJSONData.AOF_SP.ENTITY_DATA.AMLOCK_CRILC.CRILC
            ) {
              return true;
            } else if (
              $scope.RejectionQueueData[0].STATUS == "N"
              //  &&  $scope.cibil_pdf_status
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
    let numDIGI=3;
    $scope.DigiODLimits = function(){
      
      if($scope.loginServiceData[0].system_role == "ACC"){
      if($scope.selectedGrid.x_lead_id2.match(/\b(\w)/g)=="B" ||$scope.selectedGrid.x_lead_id.match(/\b(\w)/g)=="B"){
      var body ={
        DIGI_OD_ADD_LIMIT:[
          {
           LEAD_ID: $scope.selectedGrid.x_lead_id2,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* DIGI_OD_ADD_LIMIT */**", res);
            if (res.data["DIGI_OD_ADD_LIMIT"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["DIGI_OD_ADD_LIMIT"][0].hasOwnProperty("data")) {
              // if (res.data.DIGI_OD_ADD_LIMIT[0].data[0].process_status == "SUCCESS" &&res.data.DIGI_OD_ADD_LIMIT[0].data[0].response_type =="I")
              //  {
              //   $location.path("/home");
              // }
              //  else
                if(res.data.DIGI_OD_ADD_LIMIT[0].data[0].process_status=="FAILURE"||res.data.DIGI_OD_ADD_LIMIT[0].data[0].response_type =="E"){
                  if(numDIGI>0){
                    $scope.DigiODLimits();
                    numDIGI--;
               }else{
                return;
               }
              //  else{
              //   $location.path("/home");
              // }
            }
            } 
            else {
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
  }
    $scope.getNomineeValue = function () {
      if (
        $scope.GetJSONData.AOF_SP.ENTITY_DATA.NOMINEE_ENTERED.VALUE === "No"
      ) {
        return "13"; //2
      } else if (
        $scope.GetJSONData.AOF_SP.ENTITY_DATA.NOMINEE_ENTERED.VALUE === "Yes"
      ) {
        return "7"; //1
      } else {
        return "";
      }
    };
$scope.getGSTValue = function (){
  document.querySelectorAll('[id="GSTIN Date of Registration"]').forEach(element=> 
    {
  if(element){
    let GstDate =new Date($scope.GetJSONData.AOF_SP.ENTITY_DATA.GST_RESPONSE[0].result.rgdt.split('/').reverse().join('-')).toISOString().split('T')[0];
    element.value = 
    $scope.GetJSONData.AOF_SP.ENTITY_DATA.GSTIN_DOI?$scope.GetJSONData.AOF_SP.ENTITY_DATA.GSTIN_DOI:GstDate;
  }})
  document.querySelectorAll('[id="GSTIN NOB"]').forEach(element=> 
    {
  if(element){
    element.value = $scope.GetJSONData.AOF_SP.ENTITY_DATA.GST_RESPONSE[0].result.nba 
  }})
  document.querySelectorAll('[id="GSTIN NOI"]').forEach(element=> 
    {
  if(element){
   $scope.GSTIN_NOI_Nos= $scope.GetJSONData.AOF_SP.ENTITY_DATA.GST_RESPONSE[0].result.bzgddtls
    for(let i=0;i<$scope.GSTIN_NOI_Nos.length;i++){
      let ValueGSTIN_NOI =$scope.GetJSONData.AOF_SP.ENTITY_DATA.GST_RESPONSE[0].result.bzgddtls[i].industry;
      $scope.GSTNOI_array.push(ValueGSTIN_NOI);
    }
    let unique = [...new Set($scope.GSTNOI_array)];
    let numbersToString =unique.join(" , ");
    console.log('numbersToStringnoi',numbersToString);
    element.value = numbersToString;
  }})
  }

    $scope.getUpdateAMLOCK_CRILC = function (data, value) {
      if (data == "AMLOCK") {
        sessionStorage.setItem("AMLOCK", value);
      } else {
        sessionStorage.setItem("CRILC", value);
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
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
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
            
              $scope.arrayofpdf = $scope.searchSequentially(
                $scope.RejectionQueueData,
                "STATUS",
                ["BS_APPROVE", "RM_RESOLVED", "DVUC_APPROVE"] // Search these sequentially
              );
              $scope.countForPdf = $scope.arrayofpdf.length;

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
    $scope.searchSequentially = function (data, prop, values) {
      if (!data || !prop || !values || !Array.isArray(values)) {
        return []; // Return empty array if input is invalid
      }
    
      for (let value of values) {
        const result = data.filter((item) => item[prop] === value);
        if (result.length > 0) {
          return result; // Return the first match found
        }
      }
    
      return []; // Return empty array if no matches are found
    };

    $scope.rejectionAction = function (btn, user) {
      var body = {
        sprejectionaction: [
          {
            x_primary_key1: $scope.selectedGrid.x_lead_id,
            x_rejection_id: user.rejID,
            x_rejection_desc: user.rejReasn,
            x_rejection_category: user.rejection_category,
            x_rejection_sub_category: user.rejection_sub_category,
            x_rejection_remarks: user.remark,
            x_queue_id: $scope.selectedQ["queue_id"],
            x_login_id: $scope.username,
            x_status: "pending_rejection",
          },
        ],
      };
      console.log("****rej body**** ", body);
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* sprejectionaction*/**", res);
            if (res.data["sprejectionaction"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["sprejectionaction"][0].hasOwnProperty("data")
            ) {
              $scope.rejectioSubmit = JSON.parse(
                res.data.sprejectionaction[0].data[0].v_string
              );
              if ($scope.rejectioSubmit.RESULT[0].IS_SUCCESS == "Y") {
                $scope.user = {};
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Your rejection raised successfully.",
                  actionLabel: ["Ok"],
                });
              } else if ($scope.rejectioSubmit.RESULT[0].IS_SUCCESS == "N") {
                $scope.user.remark = "";
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
        spgetrejectionsublist: [
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
            console.log("**/* spgetrejectionsublist*/**", res);
            if (res.data["spgetrejectionsublist"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spgetrejectionsublist"][0].hasOwnProperty("data")
            ) {
              $scope.dataSubList = res.data.spgetrejectionsublist[0].data[0];
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
      console.log("x_rej_arr", body);
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
        sprejectionlist: [
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
            console.log("**/* sprejectionlist*/**", res);
            if (res.data["sprejectionlist"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["sprejectionlist"][0].hasOwnProperty("data")) {
              if (res.data.sprejectionlist[0].data.length !== 0) {
                $scope.getRejectionList = res.data.sprejectionlist[0].data;
                console.log($scope.getRejectionList);
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
                  });
                }
                //   $scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].PENDING_REJECTION_COUNT=$scope.count.length;
                //   $scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].REJECTED_BY=$scope.loginServiceData[0].system_role;
                //   if($scope.loginServiceData[0].system_role=='DVUM' || $scope.loginServiceData[0].system_role=='ACC' ){
                //   $scope.GetJSONData.AOF_SP.WORKFLOW_STATUS.STATUS=$scope.loginServiceData[0].system_role+'_REJECTED';
                // }else{
                //   $scope.GetJSONData.AOF_SP.WORKFLOW_STATUS.STATUS='REJECTED';
                // }
                //   $scope.GetJSONData.AOF_SP.WORKFLOW_STATUS.STATUS_TIMESTAMP = today;

                //  $scope.setJSONUpdate(btn,set_status);
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
                  res.data.sprejectionlist[0].data
                );

                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
                return false;
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
      //  $scope.showLoader('Loading...');
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          //      $scope.hideLoader();
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
        $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.MSME_SINGLE !== undefined
      ) {
        if (
          $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.MSME_SINGLE.VALUE ||
          $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.MSME_BULK ||
          $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.MSME_SALARY
        ) {
          return "Yes";
        }
      } else if (
        $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.MSME_SINGLE ||
        $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.MSME_BULK ||
        $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.MSME_SALARY
      ) {
        return "Yes";
      } else {
        return "No";
      }
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
        $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.KIT_TYPE.VALUE ==
        "Non Insta"
      )
        return "Non-IKIT";
      else if (
        $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.KIT_TYPE.VALUE == "Insta"
      )
        return "I Kit";
    };

    // $scope.newgen_createCase = function (btn, set_status) {
    //   var body = {
    //     AO_CASE_INITIATION: [
    //       {
    //         ackn_date: $scope.change_dateFormat(
    //           $scope.GetJSONData.AOF_SP.ENTITY_DATA.LEAD_SINCE
    //         ),
    //         app_form_date: $scope.change_dateFormat(
    //           $scope.GetJSONData.AOF_SP.ENTITY_DATA.LEAD_SINCE
    //         ),
    //         barcode: $scope.selectedGrid.x_lead_id2,
    //         buss_segment:
    //           $scope.GetJSONData.AOF_SP.ENTITY_DATA.RM_DECLARATION.Buss_segment
    //             .VALUE,
    //         ca_acc_type: $scope.getacc(),
    //         ca_account_no: $scope.GetJSONData.AOF_SP.ENTITY_DATA.ACC_NUMBER,
    //         ca_aof_identifier: "New",
    //         ca_base_prod_type: "Non - Individual",
    //         ca_constitution_field: "SOLE PROPRIETOR",
    //         ca_mandate_holder: "No",
    //         ca_nominee:
    //           $scope.GetJSONData.AOF_SP.ENTITY_DATA.NOMINEE_ENTERED.VALUE,
    //         ca_prod_code:
    //           $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.PRODUCT_CODE.CODE,
    //         ca_prod_name: "",
    //         channel_type: "DECIMAL",
    //         contact_no: $scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].MOBILE,
    //         cust_category:
    //           $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT
    //             .VALUE,
    //         cust_id: $scope.GetJSONData.AOF_SP.ENTITY_DATA.CUST_ID || "",
    //         cust_name:
    //           $scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].SEL_ENTITY_NAME,
    //         cust_type: "New",
    //         fatca_annexure:
    //           $scope.GetJSONData.AOF_SP.ENTITY_DATA.CUSTOMER_TAX_CITIZEN.VALUE,
    //         fatca_applicable: "YES",
    //         lead_id: $scope.selectedGrid.x_lead_id2,
    //         main_appl_pan_number:
    //           $scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].PAN_NO,
    //         mdm_id: "",
    //         msme: $scope.getMsmeValue(),
    //         negative_chklist: "Yes",
    //         opening_branch_id:
    //           $scope.GetJSONData.AOF_SP.ENTITY_DATA.BRANCH.BRANCH_CODE.CODE,
    //         opening_branch_name: "",
    //         pan_detail: "PAN",
    //         prewelcomecalling: "Completed",
    //         prod_opt: " CURRENT",
    //         scanning_decision: "No",
    //         session_id: "",
    //         source_branch_id:
    //           $scope.GetJSONData.AOF_SP.ENTITY_DATA.BRANCH.BRANCH_CODE.CODE,
    //         source_branch_name: "",
    //         sourcing_rm_code:
    //           $scope.GetJSONData.AOF_SP.ENTITY_DATA.RM_DECLARATION.sourceCode,
    //         threeinone_ao: "No",
    //         newgen_leadid: $scope.GetJSONData.AOF_SP.ENTITY_DATA.LEADiD,
    //       },
    //     ],
    //   };
    //   $scope.showLoader("Loading...");
    //   console.log(body);
    //   executeApi(newplatwareHeader, body, function (res) {
    //     $scope.$apply(function () {
    //       $scope.hideLoader();
    //       if (res.status == true) {
    //         console.log("**/* AO_CASE_INITIATION*/**", res);
    //         if (res.data["AO_CASE_INIT"][0].hasOwnProperty("error")) {
    //           dmDialogueBox.alertBox({
    //             title: "Alert",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         } else if (res.data["AO_CASE_INIT"][0].hasOwnProperty("data")) {
    //           if (res.data.AO_CASE_INIT[0].data[0].response_type == "I") {
    //             var response_data = res.data.AO_CASE_INIT[0].data[0];
    //             console.log(response_data.response["trackerId"]);
    //             if (response_data.response["trackerId"]) {
    //               dmDialogueBox
    //                 .alertBox({
    //                   title: "Message",
    //                   message: response_data.response_message,
    //                   actionLabel: ["Ok"],
    //                 })
    //                 .then(function (res) {
    //                   switch (res) {
    //                     case true:
    //                       $location.path("/home");
    //                   }
    //                 });
    //               var body = {
    //                 spsetprcgrpdispd2: [
    //                   {
    //                     x_lead_id: $scope.selectedGrid.x_lead_id,
    //                     x_prc_group: $scope.loginServiceData[0].x_prc_grp,
    //                     x_new_disposition: $scope.loginServiceData[0].x_prc_grp,
    //                     x_aof_id: $scope.selectedGrid.x_lead_id,
    //                     x_crn_no: "",
    //                     x_member_id: "",
    //                     x_is_isstart: "",
    //                     x_login_id: $scope.username,
    //                     x_processid:
    //                       "YBL_" +
    //                       $scope.loginServiceData[0].x_prc_grp +
    //                       btn.ACTION_NAME,
    //                     x_ref_input_1: $scope.loginServiceData[0].x_prc_grp,
    //                     x_disp_level: "",
    //                     x_text_1: set_status,
    //                     x_ref_input_2: "",
    //                     x_text_2: "",
    //                     x_text_3: "",
    //                     x_text_4: "",
    //                     x_text_5: "",
    //                   },
    //                 ],
    //               };
    //               executeApi(newplatwareHeader, body, function (res) {
    //                 $scope.$apply(function () {
    //                   $scope.hideLoader();
    //                   if (res.status == true) {
    //                     console.log("**/* spsetprcgrpdispd2 */**", res);
    //                     if (
    //                       res.data["spsetprcgrpdispd2"][0].hasOwnProperty(
    //                         "error"
    //                       )
    //                     ) {
    //                       $location.path("/home");
    //                       console.log(
    //                         "**/* spsetprcgrpdispd2 */** has error" + body
    //                       );
    //                       //  dmDialogueBox.alertBox({
    //                       //    title: 'Alert',
    //                       //    message: "Oop's Something went wrong",
    //                       //    actionLabel: ['Ok']
    //                       //   });
    //                     } else if (
    //                       res.data["spsetprcgrpdispd2"][0].hasOwnProperty(
    //                         "data"
    //                       )
    //                     ) {
    //                       if (
    //                         res.data.spsetprcgrpdispd2[0].data[0].STATUS == "Y"
    //                       ) {
    //                         $location.path("/home");

    //                         // sessionStorage.removeItem('AMLOCK');
    //                         // sessionStorage.removeItem('CRILC');
    //                       } else {
    //                         $location.path("/home");

    //                         // dmDialogueBox.alertBox({
    //                         //   title: 'Server Error',
    //                         //   message: 'Error Connecting to server..',
    //                         //   actionLabel: ['Ok']
    //                         //  });
    //                       }
    //                     } else {
    //                       $scope.hideLoader();
    //                       $location.path("/home");

    //                       // dmDialogueBox.alertBox({
    //                       //  title: 'Message',
    //                       //  message: "Oop's Something went wrong",
    //                       //  actionLabel: ['Ok']
    //                       // });
    //                     }
    //                   } else if (
    //                     res.status == false &&
    //                     res.errorCode == "PW-0002" &&
    //                     res.serverCode == "528"
    //                   ) {
    //                     sessionStorage.clear();
    //                     $location.path("/");
    //                   } else {
    //                     dmDialogueBox.alertBox({
    //                       title: "Server Error",
    //                       message: "Error Connecting to server..",
    //                       actionLabel: ["Ok"],
    //                     });
    //                   }
    //                 });
    //               });
    //             } else {
    //               dmDialogueBox.alertBox({
    //                 title: "Message",
    //                 message:
    //                   "Case cannot be updated in NewGen , TrackerID not found. ",
    //                 actionLabel: ["Ok"],
    //               });
    //             }
    //           } else if (
    //             res.data.AO_CASE_INIT[0].data[0].response_type == "E"
    //           ) {
    //             dmDialogueBox.alertBox({
    //               title: "Message",
    //               message: res.data.AO_CASE_INIT[0].data[0].response_message,
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
    //         dmDialogueBox.alertBox({
    //           title: "Server Error",
    //           message: "Error Connecting to server..",
    //           actionLabel: ["Ok"],
    //         });
    //       }
    //     });
    //   });
    // };

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
    $scope.current_popup_name = "";
    $scope.drop_type=null;

    $scope.newgen_createCase = function (btn, set_status) {
      $scope.removeRecommended = function(value) {
        // if (value.includes("(Recommended)")) {
        //     return value.replace(/\(Recommended\)/, '');
        // }else if(value.includes("(recommended)")){
        //   return value.replace(/\(recommended\)/, '');
        // }
        // return value;
        if (!value) return '';

    // Step 1: Remove "(Recommended)" or any casing variation
    value = value.replace(/\(recommended\)/i, '');

    // Step 2: Normalize "YES Prosperity Family" to "YESProsperityFamily"
    // Use a regex that detects the phrase with any spacing and case-insensitive
    const yesProsperityRegex = /y\s*e\s*s\s*p\s*r\s*o\s*s\s*p\s*e\s*r\s*i\s*t\s*y\s*f\s*a\s*m\s*i\s*l\s*y/i;

    value = value.replace(yesProsperityRegex, 'YesProsperityFamily');

    // Step 3: Trim the result
    return value.trim();
    }; 
//CKYC 
let holder = $scope.GetJSONData?.AOF_SP?.ENTITY_DATA?.HOLDER?.[0] || {};
let search = holder?.CKYC_SEARCH_RESPONSE?.CKYCSearchResult || {};
let status = holder?.CKYC_STATUS_RESPONSE || {};
let idDetails = search?.ckycIDDetails?.[0] || {};
let identity = status?.ckycIDDetails?.ckycIdentityDetails?.[0] || {};
//CKYC
    if(($scope.GetJSONData.AOF_SP.ENTITY_DATA.DEDUPE_CUST_TYPE=='ETB' || $scope.GetJSONData.AOF_SP.ENTITY_DATA.DEDUPE_CUST_TYPE=='etb')){
      cust_type_value ='Existing';
    }else{
      cust_type_value='New'
    }
      var body = {
        AO_CASE_INITIATION: [
          {
            ackn_date: $scope.change_dateFormat(
              $scope.GetJSONData.AOF_SP.ENTITY_DATA.LEAD_SINCE
            ),
            app_form_date: $scope.change_dateFormat(
              $scope.GetJSONData.AOF_SP.ENTITY_DATA.LEAD_SINCE
            ),
            barcode: $scope.selectedGrid.x_lead_id2,
            buss_segment:
              $scope.GetJSONData.AOF_SP.ENTITY_DATA.RM_DECLARATION.Buss_segment
                .VALUE,
            ca_acc_type: $scope.getacc(),
            ca_account_no: $scope.GetJSONData.AOF_SP.ENTITY_DATA.ACC_NUMBER,
            ca_aof_identifier: "New",
            ca_base_prod_type: "Non - Individual",
            ca_constitution_field: "SOLE PROPRIETOR",
            ca_mandate_holder: "No",
            ca_nominee:
              $scope.GetJSONData.AOF_SP.ENTITY_DATA.NOMINEE_ENTERED.VALUE,
            ca_prod_code:
              $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.PRODUCT_CODE.CODE,
            ca_prod_name: "",
            channel_type: "DECIMAL",
            contact_no: $scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].MOBILE,
            // cust_category:
            //   $scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT
            //     .VALUE,
            cust_category:$scope.removeRecommended($scope.GetJSONData.AOF_SP.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT
              .VALUE),
            cust_id: $scope.GetJSONData.AOF_SP.ENTITY_DATA.CUST_ID || "",
            cust_name:
              $scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].SEL_ENTITY_NAME?$scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].SEL_ENTITY_NAME:'',
            // cust_type: "New",
            cust_type:cust_type_value,
            fatca_annexure:
              $scope.GetJSONData.AOF_SP.ENTITY_DATA.CUSTOMER_TAX_CITIZEN.VALUE,
            fatca_applicable: "YES",
            lead_id: $scope.selectedGrid.x_lead_id2,
            main_appl_pan_number:
              $scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].PAN_NO,
            mdm_id: "",
            msme: $scope.getMsmeValue(),
            negative_chklist: "Yes",
            opening_branch_id:
              $scope.GetJSONData.AOF_SP.ENTITY_DATA.BRANCH.BRANCH_CODE.CODE,
            opening_branch_name: "",
            pan_detail: "PAN",
            prewelcomecalling: "Completed",
            prod_opt: " CURRENT",
            scanning_decision: "No",
            session_id: "",
            source_branch_id:
              $scope.GetJSONData.AOF_SP.ENTITY_DATA.BRANCH.BRANCH_CODE.CODE,
            source_branch_name: "",
            sourcing_rm_code:
              $scope.GetJSONData.AOF_SP.ENTITY_DATA.RM_DECLARATION.sourceCode,
            threeinone_ao: "No",
            newgen_leadid: $scope.GetJSONData.AOF_SP.ENTITY_DATA.LEADiD,
            // CKYC
            ckyc_search_datetime:'',
ckyc_otp_datetime:'',
ckyc_fetch_datetime:'',
ckyc_email_datetime:'',
ckyc_sms_datetime:'',
ckyc_last_updated_datetime: search?.ckycUpdatedDate || '',
ckyc_generation_date: search?.ckycGenDate || '',
ckyc_kyc_verification_date: status?.ckycKYCVerificationDate || '',
ckyc_search_parameter:'',
ckyc_search_parameter_no:'',
ckyc_consent_status:'',
ckyc_search_status:'', 
ckyc_download_status:'',
ckyc_available:'', 
ckyc_status_ckyc_api: search?.ckycStatus || '',
ckyc_rejection_reason:'',
ckyc_id: status?.ckycNumber || '',
ckyc_reference_id: search?.ckycReferenceId || '',
ckycacctype: search?.ckycAccType || '',
ckyc_typ_doc_submit:'',
ckyc_peradd_idtype_sts: idDetails?.ckycAvailableIDTypeStatus || '',
ckyc_peradd_id_rmk: idDetails?.ckycIDRemarks || '',
ckyc_corradd_idtype_sts: idDetails?.ckycAvailableIDTypeStatus || '',
ckyc_corradd_id_rmk: idDetails?.ckycIDRemarks || '',
per_add_type:'',
per_add_verify: identity?.ckycIDVerificationStatus || '',
per_verification_date:'',
per_digipin: status?.ckycPermanentAddressPin || '',
add_type:'',
add_verified: identity?.ckycIDVerificationStatus || '',
cor_verification_date:'',
cor_digipin: status?.ckycCorrespondingAddressPin || '',
country_code_mobile:'',
email_verified:'',
mobile_verified:'',
mobile_verify_thru_thrdprty:'',
dob_verified_with_ovd:'',
gender_verified_with_ovd:'',
name_verified_with_ovd:'',
photo_verified_with_ovd:'',
add_verified_with_ovd:'',
add_supported_by_doc:'',
disability_sts_supp_doc:'',
pan_verification:'',
prsc_dl_in_rto_repo:'',
prsc_voterid_in_eci_repo:'',
prsc_passport_in_mea_repo:'',
prsc_npr_census_records:'',
prsc_nrega_respective_repo:'',
dl_expirydate:'',
passport_expirydate:'',
employee_ckycid: status?.ckycKYCVerificationEmpcode || '',
mode_of_kyc:'',
acc_type_doubt_raised: search?.ckycAccType || '',
nationality:'',
nationality_supprt_doc:'',
res_status_supprt_doc:'',
per_name_checks:'',
per_doc_no_expiry:'',
per_dob_validaton:'',
per_add_check:'',
per_photo_checks:'',
per_doc_no_match:'',
corr_ovd:'',
corr_name_chk:'',
corr_doc_no_expiry_chk:'',
corr_dob_validation:'',
corr_add_check:'',
corr_photo_checks:'',
corr_doc_no_match:'',
kyc_suggested_action:'',
person_with_disability:'',
type_of_disability:'',
percentage_of_disability:'',
udid_no:'',
per_poa_doc_legible:'',
per_poa_name_verify:'',
per_poa_dob_verify:'',
per_poa_add_verify:'',
per_poa_doc_no_verify:'',
per_poa_photo_verify:'',
cor_poa_doc_legible:'',
cor_poa_name_verify:'',
cor_poa_dob_verify:'',
cor_poa_add_verify:'',
cor_poa_docno_verify:'',
cor_poa_photo_verify:'',
resn_for_swtch_ekyc:'',
resn_for_swtch_ekyc_oth:'',
name_mtch_prcnt_e_vs_ckyc:'',
ckyc_email_id:''

// CKYC
          },
        ],
      };
      $scope.showLoader("Loading...");
      console.log(body);
      if ($scope.countForNewgen < 1) {
        executeApi(newplatwareHeader, body, function (res) {
          $scope.countForNewgen = $scope.countForNewgen + 1;
          $scope.$apply(function () {
            $scope.hideLoader();
            if (res.status == true) {
              console.log("**/* AO_CASE_INITIATION*/**", res);
              if (res.data["AO_CASE_INIT"][0].hasOwnProperty("error")) {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (res.data["AO_CASE_INIT"][0].hasOwnProperty("data")) {
                if (res.data.AO_CASE_INIT[0].data[0].response_type == "I") {
                  var response_data = res.data.AO_CASE_INIT[0].data[0];
                  console.log(response_data.response["trackerId"]);
                  if (response_data.response["trackerId"]) {
                    dmDialogueBox
                      .alertBox({
                        title: "Message",
                        message: response_data.response_message,
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
                          x_new_disposition:
                            $scope.loginServiceData[0].x_prc_grp,
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
                    console.log("spsetprcgrpdispd2 : body ->", body);
                    executeApi(newplatwareHeader, body, function (res) {
                      $scope.countForNewgen = 0;
                      $scope.newgenCheck = false;
                      $scope.$apply(function () {
                        $scope.hideLoader();
                        if (res.status == true) {
                          console.log("**/* spsetprcgrpdispd2 */**", res);
                          if (
                            res.data["spsetprcgrpdispd2"][0].hasOwnProperty(
                              "error"
                            )
                          ) {
                            $location.path("/home");
                            console.log(
                              "**/* spsetprcgrpdispd2 */** has error" + body
                            );
                          } else if (
                            res.data["spsetprcgrpdispd2"][0].hasOwnProperty(
                              "data"
                            )
                          ) {
                            if (
                              res.data.spsetprcgrpdispd2[0].data[0].STATUS ==
                              "Y"
                            ) {
                              $location.path("/home");
                            } else {
                              $location.path("/home");
                            }
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
                } else if (
                  res.data.AO_CASE_INIT[0].data[0].response_type == "E"
                ) {
                  dmDialogueBox.alertBox({
                    title: "Message",
                    message: res.data.AO_CASE_INIT[0].data[0].response_message,
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
      if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.hasOwnProperty('REASSIGN_LOGINID')) {
        if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.REASSIGN_LOGINID == "") {
          if (obj.split("-")[0] == $scope.GetJSONData.AOF_SP.USER_DETAILS.FO_ID) {
            isFO_same = true;
          }
        }
        if (obj.split("-")[0] == $scope.GetJSONData.AOF_SP.ENTITY_DATA.REASSIGN_LOGINID) {
          isFO_same = true;
        }
      } else {
        if (obj.split("-")[0] == $scope.GetJSONData.AOF_SP.USER_DETAILS.FO_ID) {
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
        })
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
              //  $scope.GetJSONData.AOF_SP.WORKFLOW_STATUS.STATUS="DISCARD";
              // $scope.setJSONUpdate('DISCARD');
              if(($scope.selectedQ["queue_id"] == "3" || $scope.selectedQ["queue_id"] == "10") && $scope.loginServiceData[0].system_role == "BS"){
                $scope.drop_status_fun();
                
              }
              else $scope.discard_lead();
              // $scope.discard_lead();
              // $scope.discard_lead();
          }
        });
    };
    $scope.drop_status_fun = function () {
      // $scope.optionalField['LOVY_DOPS_DROP_REASON']
      $scope.getLOVoption('LOVY_DOPS_DROP_REASON');
      $scope.current_popup_name = "Drop_check_popup";
      $scope.Drop_check_popup = true;
    };

    $scope.drop_status_close = function () {
      // $scope.Iscan_fields = [];
      $scope.current_popup_name = "";
      $scope.Drop_check_popup = false;
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
// for insert discard reason
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
       
        let holder = $scope.GetJSONData?.AOF_SP?.ENTITY_DATA?.HOLDER?.[0];

        let name = holder?.AADHAAR_VIEW?.NAME?.toLowerCase() 
                || holder?.CKYC?.CKYC_NAME?.toLowerCase() 
                || "";
                      
        // let name = $scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].AADHAAR_VIEW.NAME.toLowerCase();
        if (name.includes(' urf ') || name.includes(' alias ')) {
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
      } 
      else if($scope.loginServiceData[0].system_role == 'BS'  && temp.length > 0  && btn.ACTION_NAME !='ACCEPT'){
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
      else if ($scope.get_login_role()) {
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
                $scope.DigiODLimits();
              }
            }
          });
      } else {
        $scope.submitLeadData(btn);
        $scope.DigiODLimits();
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
        $scope.SPGETCUSTOMERPDF_DB_case_reject_scrutiny();
        $scope.set_workstep(btn);
      } else if (btn.ACTION_NAME == "HOLD") {
        $scope.SPGETCUSTOMERPDF_DB_case_reject_scrutiny();
        $scope.set_workstep(btn);
      } else if (btn.ACTION_NAME == "ACCEPT") {
        $scope.button_values = btn;
        if ($scope.disabledButton_accept(btn)) {
          if ($scope.loginServiceData[0].system_role == "BS") {
            $scope.savedCheckboxState_value=localStorage.getItem('SVR_CHECK') ;
            if($scope.SupervisorSVRflag=='1'){
              if(!$scope.isFormInvalid && !$scope.capturedPhotos.length < 1){
                if ($scope.openPopupcheckConfirm == false) {
                  $scope.openPopupcheck = true;
                } else $scope.buttonAction(btn, "N");
              }
            } else if($scope.SupervisorSVRflag !=='1' && $scope.savedCheckboxState_value==='true'){
              if(!$scope.isFormInvalid && !$scope.capturedPhotos.length < 1){
                if ($scope.openPopupcheckConfirm == false) {
                  $scope.openPopupcheck = true;
                } else $scope.buttonAction(btn, "N");
              }
            
            }else if($scope.SupervisorSVRflag !=='1'){
              if ($scope.openPopupcheckConfirm == false) {
                $scope.openPopupcheck = true;
              } else $scope.buttonAction(btn, "N");
            }
          } 
          // AUTO GEFU
          else if ($scope.loginServiceData[0].system_role == "SIGN") {
            $scope.newgenCheck = true; //will disable this in AUTO GEFU
            $scope.newgen_createCase(btn, "Y"); //will disable this in AUTO GEFU
          }
        // AUTO GEFU
           else if (
            $scope.loginServiceData[0].system_role == "DVUM" ||
            $scope.loginServiceData[0].system_role == "DVUC"
          ) {
            $scope.gefuCheck = true;
            $scope.amlock_crilic_array(btn);
            $scope.Generate_GEFU(btn); //AUTO GEFU Latest- 24Nov25
            // $scope.Generate_GEFU_SA();
          } else if ($scope.loginServiceData[0].system_role == "ACC") {
            $scope.getCust_ID(btn, "N"); // AUTO GEFU
          } else {
            $scope.buttonAction(btn, "N");
          }
        }
      } else if (btn.ACTION_NAME == "EXIT") {
        if ( 
         // $scope.selectedQ["queue_id"] == "1" ||  //removing to call spexitlead in sprint 12 common BS point          $scope.selectedQ["queue_id"] == "11" ||
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
        }else if(btn.ACTION_NAME == "GEFU SA"){
        $scope.download_GEFU_SA();
      } else if (btn.ACTION_NAME == "Reassign") {
        $scope.reassign_Popup = true;
      } else if (btn.ACTION_NAME == "Discard") {
        $scope.Delete_lead();
      } else if(btn.ACTION_NAME == 'SIGN_DOWNLOAD'){
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
            codeAccNo: $scope.GetJSONData.AOF_SP.ENTITY_DATA.ACC_NUMBER || "",
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
              //$scope.GetJSONData.AOF_SP.ENTITY_DATA.AUS_CUST_ID=res.data.AUS_CUSTACCOUNTREL[0].data[0].response.CodCust;
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
    $scope.selectTab = function(tabs) {
      $scope.selectedTab = tabs;
    };

    //  made changes in this function for AUTO GEFU Latest - 24Nov25
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
          if(btn.ACTION_NAME !== "ACCEPT" ){
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
           console.log("Line:3150", body);
           $scope.showLoader("Loading.....");
           executeApi(newplatwareHeader, body, function (res) {
             $scope.countForGefu = 0;
             $scope.gefuCheck = false;
             $scope.t11 = performance.now();
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
                     sessionStorage.removeItem("AMLOCK");
                     sessionStorage.removeItem("CRILC");
                     if ($scope.loginServiceData[0].system_role == "ACC") {
                       $scope.accRegistration();
                     }else {
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
         }else {
          $scope.SPUPDATEACCACCEPTCASES();
          $scope.newgenCheck = true;
          if(($scope.GetJSONData.AOF_SP.ENTITY_DATA.DEDUPE_CUST_TYPE=='ETB' || $scope.GetJSONData.AOF_SP.ENTITY_DATA.DEDUPE_CUST_TYPE=='etb')){
            $scope.acceptUpdateCoumnAPI();
            $scope.SignUpload(); //autogefu new 24dec25
           }
           $scope.newgenCheck = true;
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
          console.log("Line:3150", body);
          $scope.showLoader("Loading.....");
          executeApi(newplatwareHeader, body, function (res) {
            $scope.countForGefu = 0;
            $scope.gefuCheck = false;
            $scope.t11 = performance.now();
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
                    sessionStorage.removeItem("AMLOCK");
                    sessionStorage.removeItem("CRILC");
                    if (
                      $scope.loginServiceData[0].system_role == "DVUM" ||
                      $scope.loginServiceData[0].system_role == "DVUC"
                    ) {
                      $scope.change_delete_status();
                    } else if ($scope.loginServiceData[0].system_role == "ACC") {
                      $scope.accRegistration();
                    }
                     else if($scope.loginServiceData[0].system_role=='BS' && $scope.selectedGrid.x_lead_source=='SOLECANTB'){
                           $scope.supervisorSVRDateTime();
    
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
    //auto gefu new 24dec25
    $scope.SignUpload =function(){
        var body = {
          DMS_UPLOAD_GEFU_API: [
            {
              leadId: [$scope.selectedGrid.x_lead_id],
              type: "SIGN",
            },
          ],
        };
        $scope.showLoader("SIGN is uploading please wait...");
        executeApi(newplatwareHeader, body, function (res) {
          $scope.$apply(function () {
            if (res.status == true) {
              console.log("**/* DMS_UPLOAD_GEFU_API */**", res);
              if (res.data["DMS_UPLOAD_GEFU_API"][0].hasOwnProperty("error")) {
                $scope.hideLoader();
              } else if (
                res.data["DMS_UPLOAD_GEFU_API"][0].hasOwnProperty("data")
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
  //ETB
  $scope.acceptUpdateCoumnAPI = function () {
    var body = {
      UPDATEDATECOLUMN: [
        {
          leadId:[$scope.selectedGrid.x_lead_id],
        },
      ],
    };
    $scope.showLoader("Loading.....");
    executeApi(newplatwareHeader, body, function (res) {
      $scope.$apply(function () {
        $scope.hideLoader();
        if (res.status == true) {
          console.log("**/* UPDATEDATECOLUMN */**", res);
          if (res.data["UPDATEDATECOLUMN"][0].hasOwnProperty("data")) {
            if (res.data["UPDATEDATECOLUMN"][0].data[0]?.response_code=='200') {
             console.log('SUCCESS');
            } else {
              console.log('failed');
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
  }
    $scope.supervisorSVRDateTime =function(){
var body ={
  SPGETSUPERVISORSVRUPDATSVRDATE:[{
    x_aof_id:$scope.selectedGrid.x_lead_id,
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
      console.log("**/* SPGETSUPERVISORSVRUPDATSVRDATE*/**", res);
      if (
        res.data["SPGETSUPERVISORSVRUPDATSVRDATE"][0].hasOwnProperty(
          "error"
        )
      ) {
        dmDialogueBox.alertBox({
          title: "Alert",
          message: "Oop's Something went wrong",
          actionLabel: ["Ok"],
        });
      } else if (
        res.data["SPGETSUPERVISORSVRUPDATSVRDATE"][0].hasOwnProperty(
          "data"
        )
      ) {  
        $location.path("/home");   
      console.log("SUCCESS...")
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
            console.log("**/* spgetdocumentqueuelistnewcomp1*/**", res);
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
              // window.open($scope.img)
              // var image = new Image();
              // image.src = $scope.img;
              // var w = window.open("");
              // w.document.write(image.outerHTML,"_top");
              // for(i=0;i<$scope.Docs.length;i++){

              // }
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

    $scope.getImage_stream_Doc = function (doc, obj) {
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
            console.log("**/* spgetdocumentqueuelistnewcomp2*/**", res);
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
              //$scope.image_name=res.data.spgetdocumentqueuelistnewcomp[0].data[0].doc_des;
              $scope.img =
                "data:image/jpeg;base64," + $scope.imageDetail.image_stream;
              $scope.img_Rotate = $scope.img;
              localStorage.setItem("obj", $scope.img_Rotate);

              // window.open($scope.img)
              // var image = new Image();
              // image.src = $scope.img;
              // var w = window.open("");
              // w.document.write(image.outerHTML,"_top");
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
      $scope.getImage_stream_Doc(doc);
    };

    $scope.getDocumentpertab = function (formData, obj) {
      if (formData == "1") {
        $scope.Docs = [];
        $scope.Docs_aaray = [];
        $scope.documentList = $filter("byProp")(
          $scope.documentsDesc,
          "form_id",
          "2"
        );
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
      } else {
        $scope.Docs = [];
        $scope.Docs_aaray = [];
        $scope.documentList = $filter("byProp")(
          $scope.documentsDesc,
          "form_id",
          formData.form_id
        );
        $scope.document_Name = $filter("unique")(
          $scope.documentList,
          "doc_des"
        );
        for (i = 0; i < $scope.document_Name.length; i++) {
          // $scope.Docs_aaray.push(
          //   $filter("byProp")(
          //     $scope.documentList,
          //     "doc_des",
          //     $scope.document_Name[i].doc_des
          //   )
          // );
          let arr = [];
          // console.log('checking', $scope.document_Name[i].doc_des, 'compare', $scope.documentList.map(x => x.doc_des));
          arr = $scope.documentList.filter(x => x.doc_des == $scope.document_Name[i].doc_des);
          $scope.Docs_aaray.push(arr);
        }
        for (i = 0; i < $scope.Docs_aaray.length; i++) {
          for (j = 0; j < $scope.Docs_aaray[i].length; j++) {
            $scope.Docs_aaray[i][j]["seq_set"] = j + 1;
            $scope.Docs.push($scope.Docs_aaray[i][j]);
            localStorage.setItem("Docs_aaray", JSON.stringify($scope.Docs));
          }
        }
        // if(formData.FORM_ID=='7'){
        //   $scope.GetJSONData.AOF_SP.ENTITY_DATA.OTHERS.push(obj['image_name']);
        //   $scope.setJSONUpdate('others');
        // }
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
              $scope.img = "";
              $scope.documentsDesc =
                res.data.spgetdocumentqueuelistcomp[0].data;
                // for(let i=0;i < $scope.documentsDesc.length;i++){
                //   $scope.documentsDes[i].doc_des =  $scope.documentsDes[i].STATUS =="Y"? 
                //    $scope.documentsDes[i].doc_des + ' New':
                //     $scope.documentsDes[i].doc_des+ ' Old';

                // }
                $scope.documentsDesc.forEach((item,index) => {
         item.doc_des =  item.STATUS =="Y"? 
                   item.doc_des + ' New':
                  item.doc_des+ ' Old';

                })
              if (formData) {
                if (formData.form_id == "8" || formData.form_id=='70')  {
                  $scope.getDocumentpertab(formData, index);
                }
                if (formData.form_id == "14") {
                  $scope.GetJSONData.AOF_SP.ENTITY_DATA.OTHERS.push(
                    index["image_name"]
                  );
                  // $scope.setJSONUpdate('others');
                }
                $scope.current_TAB == 14
                  ? $scope.getDocumentpertab(formData, index)
                  : "";

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

    $scope.moveToNewWindow = function (img) {
      if (img) {
        var host = window.location.href.split("#")[0];
        window.open(host + "#/images", "mywindow", "height:100;width:100;");
      }
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
              var t1 = performance.now();
              console.log(
                " for tab clicking" + (t1 - $scope.t2) + " milliseconds."
              );
              console.log(
                " for scruitny button to one view 2nd part" +
                (t1 - $scope.t0) +
                " milliseconds."
              );
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
    $scope.supervisor_raised = function (card,getStatus,index) {
      if (getStatus == "Approve") {
        $scope.supervisor_approve_service(
          card,
          $scope.loginServiceData[0].system_role + "_APPROVE"
        );
      }
    };
    $scope.supervisor_approve_service = function (card,status,index) {
      var body = {
        spapprovesupervisorchecklist: [
          {
            x_aof_id:$scope.selectedGrid.x_lead_id,
            x_scenario_id:card.SCENARIO_ID,
            x_login_id: $scope.username,
            x_status: status,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spapprovesupervisorchecklist */**", res);
            if (
              res.data["spapprovesupervisorchecklist"][0].hasOwnProperty("error")
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spapprovesupervisorchecklist"][0].hasOwnProperty("data")
            ) {
              $scope.supervisorcheckliststatus = res.data['spapprovesupervisorchecklist'][0].data;
             if ($scope.supervisorcheckliststatus[0].STATUS == 'Y'){
              $scope.getSupervisorFlagDetails();
             } else{
              $scope.getSupervisorFlagDetails();
              console.log("API STATUS IS 'N'");
             }
             // ENTER YOUR API RESPONSE CODE HERE

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
    $scope.getSupervisorFlagDetails = function () {
      var body = {
        spgetchecklistsupervisor: [
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
            console.log("**/* spgetchecklistsupervisor */**", res);
            if (res.data["spgetchecklistsupervisor"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spgetchecklistsupervisor"][0].hasOwnProperty("data")) {
              // $scope.GETGridViewData = JSON.parse(
              //   res.data.spgetchecklistsupervisor[0].data[0].v_string_tab
              // );
              if (res.data.spgetchecklistsupervisor[0].data[0].STATUS == "No Data Found")
            {
              $scope.supervisorData = res.data.spgetchecklistsupervisor[0].data[0].STATUS
              $scope.SupervisorQueueData =
                res.data.spgetchecklistsupervisor[0].data;
              }
            else{
              $scope.supervisorData = 'Y';
              $scope.SupervisorQueueData =
                res.data.spgetchecklistsupervisor[0].data;
            console.log($scope.SupervisorQueueData);
            }
            $scope.ApproveSupervisorBSCount=0;
            $scope.ApproveSupervisorBS_RemarksCount=0;
            for(let i=0;i<$scope.SupervisorQueueData.length;i++){
              if($scope.supervisorData=="No Data Found"){
                $scope.ApproveSupervisorBSCount=0;
                $scope.ApproveSupervisorBS_RemarksCount=0;
              }else{
                $scope.SupervisorQueueData[i]['SUPERVISORREMARKS']='';
                if(($scope.SupervisorQueueData[i].UPDATED_FLAG =='' || $scope.SupervisorQueueData[i].UPDATED_FLAG ==null )&& $scope.SupervisorQueueData[i].SUPERVISOR_CHECKLIST_STATUS !== 'BS_APPROVE'){
                  $scope.ApproveSupervisorBSCount++;
                  // $scope.ApproveSupervisorBS =false;
              }
              // else{
              //   $scope.ApproveSupervisorBS =true;
              // }
              if(($scope.SupervisorQueueData[i].UPDATED_FLAG =='' || $scope.SupervisorQueueData[i].UPDATED_FLAG ==null ) && ($scope.SupervisorQueueData[i].SUPERVISOR_REMARKS =='' || $scope.SupervisorQueueData[i].SUPERVISOR_REMARKS ==null)){
                $scope.ApproveSupervisorBS_RemarksCount++;
                // $scope.ApproveSupervisorBS_Remarks =false;
              }
              // else {
              //   $scope.ApproveSupervisorBS_Remarks =true;
              // }
              }
           
            }
           if($scope.ApproveSupervisorBS_RemarksCount==0){
            $scope.ApproveSupervisorBS_Remarks=true;
           }
           if($scope.ApproveSupervisorBSCount==0){
            $scope.ApproveSupervisorBS=true;
           }
           console.log('$scope.ApproveSupervisorBSCount',$scope.ApproveSupervisorBSCount);
           console.log('$scope.ApproveSupervisorBS_RemarksCount',$scope.ApproveSupervisorBS_RemarksCount);
            console.log('$scope.ApproveSupervisorBS',$scope.ApproveSupervisorBS);
            console.log('$scope.ApproveSupervisorBS_REMARKS',$scope.ApproveSupervisorBS_Remarks);
          }else {
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
    // $scope.checkValidationForFlag = function (){
    //   for(let i=0;1<=$scope.SupervisorQueueData.length;i++){
    //     if(($scope.SupervisorQueueData[i].UPDATED_FLAG =='' || $scope.SupervisorQueueData[i].UPDATED_FLAG ==null )&& $scope.SupervisorQueueData[i].SUPERVISOR_CHECKLIST_STATUS !== 'BS_APPROVE'){
    //         $scope.ApproveSupervisorBS = true;
    //     }
    //     // if($scope.SupervisorQueueData[i].UPDATED_FLAG =='Grey' && $scope.SupervisorQueueData[i].SUPERVISOR_CHECKLIST_STATUS == 'BS_APPROVE'){

    //     // }
    //     // if($scope.SupervisorQueueData[i].SUPERVISOR_CHECKLIST_STATUS == 'BS_APPROVE'){

    //     // }
    //   }
    // }
    $scope.getSupervisorFinalFlag = function () {
      var body = {
        spgetfinalflag: [
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
            console.log("**/* spgetfinalflag */**", res);
            if (res.data["spgetfinalflag"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spgetfinalflag"][0].hasOwnProperty("data")) {
              if (res.data.spgetfinalflag[0].data[0].FINAL_FLAG == "Red")
            {
              $scope.REDFLAG =true;
              }else if(res.data.spgetfinalflag[0].data[0].FINAL_FLAG == "Yellow"){
              $scope.YELLOWFLAG =true;
              }else if(res.data.spgetfinalflag[0].data[0].FINAL_FLAG == "Green"){
              $scope.GREENFLAG = true;
              }
            }
          }
        });
      });
    }
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
      } else */ if (
          type.toLowerCase() == "png" ||
          type.toLowerCase() == "pdf"
        ) {
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
      $scope.t0 = performance.now();
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
            x_object_type: "AOF_SP",
            x_doc_id: ovj.doc_id,
            x_image_name: ovj.image_name,
            x_object_pri_key_1: $scope.selectedGrid.x_lead_id,
            x_object_pri_key_2: "",
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
            console.log(
              "Req body: ",
              body,
              " **/* spinsertdopsimagedata */**",
              res
            );
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
        spgenerategefufile: [
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
          console.log("after gefu count" + $scope.countForGefu);
          $scope.$apply(function () {
            $scope.hideLoader();
            if (res.status == true) {
              console.log("**/* spgenerategefufile */**", res);
              if (res.data["spgenerategefufile"][0].hasOwnProperty("error")) {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (
                res.data["spgenerategefufile"][0].hasOwnProperty("data")
              ) {
                $scope.result_GEFU = JSON.parse(
                  res.data.spgenerategefufile[0].data[0].v_string
                );
                if ($scope.result_GEFU.RESULT[0].IS_SUCCESS == "Y") {
                  //AUTO GEFU Latest - 24Nov25
                  if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.OPEN_SA.VALUE === "Yes") {
                    $scope.Generate_GEFU_SA()
                      .finally(function () {
                          $scope.DMSUploadGefu(btn);
                                              
                      });
                  } else {
                    $scope.DMSUploadGefu(btn); 
                }                                                  
                  // if ($scope.GetJSONData.AOF_SP.ENTITY_DATA.OPEN_SA.VALUE == "Yes") {
                  //   $scope.Generate_GEFU_SA();
                  // }
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
    $scope.Generate_GEFU_SA = function () {
      return $q(function (resolve, reject) {
        var body = {
          spgenerategefufilesavingaccount: [
            {
              x_aof_id: $scope.selectedGrid.x_lead_id,
            },
          ],
        };
    
        console.log("before gefu count" + $scope.countForGefu);
    
        if ($scope.countForGefu < 2) {
          $scope.showLoader("Loading.....");
    
          executeApi(newplatwareHeader, body, function (res) {
            $scope.countForGefu = $scope.countForGefu + 1;
            console.log("after gefu count" + $scope.countForGefu);
    
            $scope.$apply(function () {
              $scope.hideLoader();
    
              if (res.status == true) {
                console.log("**/* spgenerategefufilesavingaccount */**", res);
    
                if (res.data["spgenerategefufilesavingaccount"][0].hasOwnProperty("error")) {
                  dmDialogueBox.alertBox({
                    title: "Alert",
                    message: "Oop's Something went wrong",
                    actionLabel: ["Ok"],
                  });
                  reject("Error in response");
    
                } else if (
                  res.data["spgenerategefufilesavingaccount"][0].hasOwnProperty("data")
                ) {
                  console.log('Response: spgenerategefufilesavingaccount', res);
                  resolve(res); // resolve on success
    
                } else {
                  dmDialogueBox.alertBox({
                    title: "Message",
                    message: "Oop's Something went wrong",
                    actionLabel: ["Ok"],
                  });
                  reject("Unexpected response format");
                }
    
              } else if (
                res.status === false &&
                res.errorCode === "PW-0002" &&
                res.serverCode === "528"
              ) {
                sessionStorage.clear();
                $location.path("/");
                reject("Session expired");
    
              } else {
                dmDialogueBox.alertBox({
                  title: "Server Error",
                  message: "Error Connecting to server..",
                  actionLabel: ["Ok"],
                });
                reject("Server error");
              }
            });
          });
        } else {
          resolve("GEFU already called twice"); // Skip API, resolve directly
        }
      });
    };
    
    // $scope.Generate_GEFU_SA = function () {
    //   var body = {
    //     spgenerategefufilesavingaccount: [
    //       {
    //         x_aof_id: $scope.selectedGrid.x_lead_id,
    //       },
    //     ],
    //   };
    //   console.log("before gefu count" + $scope.countForGefu);
    //   if ($scope.countForGefu < 2) {
    //     $scope.showLoader("Loading.....");
    //     executeApi(newplatwareHeader, body, function (res) {
    //       $scope.countForGefu = $scope.countForGefu + 1;
    //       console.log("after gefu count" + $scope.countForGefu);
    //       $scope.$apply(function () {
    //         $scope.hideLoader();
    //         if (res.status == true) {
    //           console.log("**/* spgenerategefufilesavingaccount */**", res);
    //           if (res.data["spgenerategefufilesavingaccount"][0].hasOwnProperty("error")) {
    //             $scope.hideLoader();
    //             dmDialogueBox.alertBox({
    //               title: "Alert",
    //               message: "Oop's Something went wrong",
    //               actionLabel: ["Ok"],
    //             });
    //           } else if (
    //             res.data["spgenerategefufilesavingaccount"][0].hasOwnProperty("data")
    //           ) {
    //             console.log('Response: spgenerategefufilesavingaccount', res);
    //           } else {
    //             $scope.hideLoader();
    //             dmDialogueBox.alertBox({
    //               title: "Message",
    //               message: "Oop's Something went wrong",
    //               actionLabel: ["Ok"],
    //             });
    //           }
    //         } else if (
    //           res.status == false &&
    //           res.errorCode == "PW-0002" &&
    //           res.serverCode == "528"
    //         ) {
    //           sessionStorage.clear();
    //           $location.path("/");
    //         } else {
    //           $scope.hideLoader();
    //           dmDialogueBox.alertBox({
    //             title: "Server Error",
    //             message: "Error Connecting to server..",
    //             actionLabel: ["Ok"],
    //           });
    //         }
    //       });
    //     });
    //   }
    // };

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
                  "G"+$scope.GetJSONData.AOF_SP.ENTITY_DATA.ACC_NUMBER+".txt" // GEFU CA
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

    $scope.download_GEFU_SA = function () {
      var body = {
        spsavingaccountgefudownload: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id2,
            x_type: 'abcd'
          }
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
              "**/* spsavingaccountgefudownload */**",
              res
            );

            if (res.data["spsavingaccountgefudownload"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spsavingaccountgefudownload"][0].hasOwnProperty("data")) {
              // let base64 = res.data['spsavingaccountgefudownload'][0].data[0].encode;
              const checkGEFU = () => {
                if (res.data['spsavingaccountgefudownload'][0].data[0].encode) {
                  return res.data['spsavingaccountgefudownload'][0].data[0].encode;
                } else {
                  return false;
                }
              }
              let base64 = checkGEFU();
              if (base64) {
                var link = document.createElement("a");
                        link.href = "data:text/plain;base64," + base64;
                        link.download = "G"+$scope.GetJSONData.AOF_SP.ENTITY_DATA.SA.ACC_NUMBER+".txt" // GEFU SA;
                        link.click();
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
            if(element){
              element.width = $scope.IMAGE_WIDTH;
              element.height = $scope.IMAGE_HEIGHT;
            }
          });
      };
      image.src = obj;
    };

    var angle = 0;
    $scope.rotate = function () {
      angle = (angle + 90) % 360;
      document.querySelectorAll('[id="container"]').forEach(element=> 
        {
      element.style.transform = `rotate(${angle}deg)`;
      });
    };
    $scope.zoomIn = function () {
      document.querySelectorAll('[id="container"]').forEach(element=> 
        {
          if(element){
           element.width =
            element.naturalWidth;
          element.height =
            element.naturalHeight;
          }
        });
    };

    $scope.zoomOUT = function () {
      document.querySelectorAll('[id="container"]').forEach(element=> 
        {
          if(element){
           element.width =
           $scope.IMAGE_WIDTH;
          element.height =
          $scope.IMAGE_HEIGHT;
          }
        });
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

    $scope.supervisor_submit_remarks = function (card,index) {
      document.body.style.zoom = "reset";
      if($scope.SupervisorQueueData[index]['SUPERVISORREMARKS']!==""){
        var body = {
          spinsertsupervisorchecklistremarks: [
            {
              x_aof_id: $scope.selectedGrid.x_lead_id,
              x_scenario_remarks: $scope.SupervisorQueueData[index]['SUPERVISORREMARKS'],
              x_scenario_id: card.SCENARIO_ID,
            },
          ],
        };
        $scope.showLoader("Loading.....");
        executeApi(newplatwareHeader, body, function (res) {
          $scope.$apply(function () {
            $scope.hideLoader();
            if (res.status == true) {
              console.log("**/* spinsertsupervisorchecklistremarks */**", res);
              if (res.data["spinsertsupervisorchecklistremarks"][0].hasOwnProperty("error")) {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (res.data["spinsertsupervisorchecklistremarks"][0].hasOwnProperty("data")) {
                console.log(res);
                if (res.data["spinsertsupervisorchecklistremarks"][0].data[0].STATUS == "Y") {
                  $scope.getSupervisorFlagDetails();
                  $scope.user.comment = "";
                  // $scope.showcomment = false;
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
      }else {
        $scope.hideLoader();
        dmDialogueBox.alertBox({
          title: "Message",
          message: "Remarks field Cannot be empty!",
          actionLabel: ["Ok"],
        });
      }
    
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

        for (i = 0; i < $scope.SUB_TABName.length; i++) {
          $scope.SUB_TABName[i].openSection = false;
          $scope.SUB_TABName[index].openSection = !x;
        }

        // (y.name=='AMLOCK')?document.getElementById('Upload_Image').defaultValue='AMLOCK':(y.name=='CRILC')?document.getElementById('Upload_Image').defaultValue='CRILC':'';
        // if(y.name=='AMLOCK' || y.name=='CRILC')$scope.SET_VISIBILITY?$scope.getImageStreams(y.id):'';
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

      if (flag == "svr") {
        if (y.name == "Registered SVR") {
          $scope.showCommSVR = true;
          $scope.showMailSVR = false;
        } else if (y.name == "Mailing SVR") {
          $scope.showCommSVR = false;
          $scope.showMailSVR = true;
        }

        for (i = 0; i < $scope.SVR_TABName.length; i++) {
          $scope.SVR_TABName[i].openSection = false;
          $scope.SVR_TABName[index].openSection = !x;
        }
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
        $scope.loginServiceData[0].system_role == "DVUC") && ($scope.selectedQ["queue_id"] ===5||$scope.selectedQ["queue_id"] ===6||$scope.selectedQ["queue_id"] ===22||$scope.selectedQ["queue_id"] ===21)
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
   //AUTO GEFU Latest - 24Nov25
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

    $scope.download_CAFD = function () {
      $scope.HtmlData_CAFD = `<!DOCTYPE html>
    <html  id='element-to-print'>
    <head>
    <title>
    CAFD PDF
    </title>
    <style>
    #element-to-print{
      font-size:14px;
      font-family: Times, serif; 
  
    }
    .tableSet{
    width:100%;
    font-size:10px;
    }
    .tableSet,.tabled{
        border: solid 1px black;
        border-collapse: collapse;
    }
    .rmSpace
    {
    margin:0;
    }
    tr>td{
    width:50%;
    padding:4px;
    }
    .tableh{
    background-color:#005192;
    color:white;
    padding:4px;
    font-weight: bolder;
    }
    .image_ex{
    width: 15%;
    float: right;
    top: 0;
  }
    
    .heading{
    text-align: center;
    font-size:16px;
  }
    .image_add{
        top: 0;
        position: absolute;
        width: 97%;
    }
     </style>
    </head>
    <body>
    <div class="image_add"><img class='image_ex' src="images/yesBankNewLogo.png"></div><br>
    <div style="margin:2%">
       <h3 class='heading'>Sweep-Out Instruction Format</b></u></h3>
    <p  class="rmSpace">Date:...........</p><br>
    <p class="rmSpace">The Branch Manager</p>
    <p class="rmSpace">YES BANK Ltd.</p>
    <p class="rmSpace">Branch : ${$scope.GetJSONData.AOF_SP.ENTITY_DATA.BRANCH.BRANCH_CODE.VALUE
        }</p>
    <br>
    <p class="rmSpace">Sub: Activation of Sweep-Out Facility towards creation of Fixed Deposit</p>
    <br>
    <p class="rmSpace">Dear Sir / Madam,</p><br>
    <p class="rmSpace">I would like to avail of the Sweep Out facility on the Account no ${$scope.GetJSONData.AOF_SP.ENTITY_DATA.ACC_NUMBER || "-"
        }
    In the event of excess balance in my linked Current/Savings Account, please execute the Sweep-out request.  The details are as follows</p>
   <br> <div><table class="tableSet">
    <tr class="tabler">
    <th class='tableh'>Particulars</th>
    <th class='tableh'>Details</th>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Entity Name:</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].SEL_ENTITY_NAME || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Cust ID:</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_SP.ENTITY_DATA.CUST_ID || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Account Number:</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_SP.ENTITY_DATA.ACC_NUMBER || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Minimum Amount in CASA above which the FD should be created (INR):</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_SP.ENTITY_DATA.SWEEP_CAFD.MIN_AMNT_CA || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Minimum Balance in CASA below which the FD would be broken (INR):</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_SP.ENTITY_DATA.SWEEP_CAFD.MIN_BAL_CA || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Min Amount of FD created from Sweep-out:</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_SP.ENTITY_DATA.SWEEP_CAFD.MIN_AMNT_SWPOUT || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Max Amount of FD created from Sweep-out:</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_SP.ENTITY_DATA.SWEEP_CAFD.MAX_AMNT_SWPOUT || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>FD in multiples of INR (min 10,000):</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_SP.ENTITY_DATA.SWEEP_CAFD.FD_AMNT || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Start Date:</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_SP.ENTITY_DATA.SWEEP_CAFD.START_DATE || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>End Date (Sweep-out will be deactivated):</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_SP.ENTITY_DATA.SWEEP_CAFD.END_DATE || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Frequency of sweep (Daily, weekly-specific day, Monthly-Specific date):</td>
    <td class='tabled'> ${$scope.GetJSONData.AOF_SP.ENTITY_DATA.SWEEP_CAFD.FREQ_SWEEPCHECK.VALUE ||
        "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>FD Tenor:</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_SP.ENTITY_DATA.SWEEP_CAFD.MIN_CA || "-"
        }</td>
    </tr>
    <!-- <tr class="tabler">
    <td class='tabled'>No. of Sweep-out (Max 99):</td>
    <td class='tabled'></td>
    </tr> -->
    </table></div>
    <br>
    <p  class="rmSpace" >I/We, the undersigned, hereby further confirm that I/We have read, understood and agree to abide and be bound by all the provisions of the Terms & Conditions as displayed on www.yesbank.in , amended and modified from time to time, in connection with Sweep out facility.</p>
    <br>
    <p  class="rmSpace">Thank You.</p>
    <br>
    <p  class="rmSpace">Regards,</p>
    <p  class="rmSpace">${$scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].AADHAAR_VIEW.NAME
        }</p>
    </div>
    
    </body>
    </head>
    </html>`;
      var m = new DOMParser().parseFromString(
        $scope.HtmlData_CAFD,
        "text/html"
      );
      var element = m.getElementById("element-to-print");
      element.style.display = "block";
      var opt = {
        margin: 1,
        filename: "CAFD.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      // html2pdf(element);
      html2pdf().set(opt).from(element).save();
    };
    $scope.download_CASA = function () {
      $scope.HtmlData_CASA = `<!DOCTYPE html>
<html id="element-to-print-casa">
<head>
<title>
CAFD PDF
</title>
<style>
.tableSet{
width:100%;
}
.tableSet,.tabled{
    border: solid 1px black;
    border-collapse: collapse;
}
.rmSpace
{
margin:0;
}
.tabler>.tabled{
width:50%;
}
.tableh{
background-color:#005192;
color:white;
}
.image_ex{
width: 15%;
float: right;
top:0;
}

.heading{
text-align: center;

}
.image_add{
    top: 0;
    position: absolute;
    width: 97%;
}

</style>
</head>
<body>
<div class="image_add"><img class='image_ex' src="images/yesBankNewLogo.png" /></div>

<div>
<h3 class="heading">Sweep Instruction Form</h3>
<p class="rmSpace">Date: ………………….</p><br>
<p class="rmSpace">The Branch Manager</p>
<p class="rmSpace">YES BANK Ltd.</p>
<p class="rmSpace">Branch:  ${$scope.GetJSONData.AOF_SP.ENTITY_DATA.BRANCH.BRANCH_CODE.VALUE
        }</p><br>
<p class="rmSpace">Sub: Management of Sweep Facility in Current & Savings Account</p><br>
<p class="rmSpace">Dear Sir/Madam,</p><br>
<p class="rmSpace">I would like to add the Sweep instructions on my savings and current account held with YES BANK.</p>
<br><p class="rmSpace">Current Account Number: ${$scope.GetJSONData.AOF_SP.ENTITY_DATA.ACC_NUMBER || "-"
        }</p>
<p class="rmSpace">Savings Account Number: ...........</p><br>
<p class="rmSpace"><b>Instruction 1:</b> In the event of excess balance above the threshold value in my linked Current Account, please execute the Sweep-out request from my current account to savings account.  The details are as follows: </p>
<br><table>
<tr>
<td style="width:70%">Threshold value in Current account at which sweepout to savings account will be executed: </td>
<td>: Rs. ${$scope.GetJSONData.AOF_SP.ENTITY_DATA.SWEEP_CASA.MIN_SWPOUT || "-"
        }</td>
</tr>
<tr>
<td>Frequency of sweep:</td>
<td>: Every Monday BOD</td>
</tr>
</table><br>
<p class="rmSpace"><b>Instruction 2:</b> In the event of balance in my linked Current Account is below the mentioned threshold value, please execute the Sweep-in request from my savings account to current account.  The details are as follows: </p>
<br><table>
<tr>
<td style="width:70%">Threshold value in Current account at which sweepin from savings account will be executed </td>
<td>: Rs. ${$scope.GetJSONData.AOF_SP.ENTITY_DATA.SWEEP_CASA.MIN_SWPIN || "-"
        }</td>
</tr>
<tr>
<td  style="width:30%">Frequency of sweep:</td>
<td>: Daily EOD</td>
</tr>
</table><br>
<p class="rmSpace"><b>Instruction 3:</b> Sweep-in request for Savings Account.In case of insufficient funds in my Savings Account number as mentioned above, sweep-in funds from my Current Account number as mentioned above. </p>
<br><p class="rmSpace">I/We, the undersigned, hereby further confirm that I/We have read, understood and agree to abide and be bound by all the provisions of the Terms & Conditions as displayed on www.yesbank.in , amended and modified from time to time, regarding Sweep facility.</p>
<br>
<p class="rmSpace">Thank You.</p><br>
<p  class="rmSpace">Regards,</p>
<p  class="rmSpace">${$scope.GetJSONData.AOF_SP.ENTITY_DATA.HOLDER[0].AADHAAR_VIEW.NAME
        }</p>
</div>

</body>
</head>
</html>`;
      var m = new DOMParser().parseFromString(
        $scope.HtmlData_CASA,
        "text/html"
      );
      var element = m.getElementById("element-to-print-casa");
      element.style.display = "block";
      var opt = {
        margin: 1,
        filename: "CASA.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      // html2pdf(element);
      html2pdf().set(opt).from(element).save();
    };

    $scope.init();
  },
]);
