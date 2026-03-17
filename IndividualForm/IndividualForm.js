var individualFormModule = angular.module("myApp.IndividualForm", []);
individualFormModule.controller("individualFormCtrl", [
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
      $scope.reject = {};
      $scope.fatherRadio=false;
      $scope.optionalField = {};
      $scope.stepFocus = 0;
      $scope.count = 0;
      $scope.countForNewgen = 0;
      $scope.newgenCheck = false;
      $scope.errorMSG = false;
      $scope.hideCheckAction=true; //SMART PAY
      $scope.gefuCheck = false;
      $scope.isReadonly = true;
      $scope.countForGefu = 0;
      $scope.excludedActionIdsOnMobile = ["GEFU","GEFU SA","Download",];
      $scope.showAuditTrail = false;
      $scope.ApproveSupervisorBS = false;
      $scope.ApproveSupervisorBS_Remarks = false;
      $scope.tabJSONObj = [];
      $scope.tabJSONObj.counter = 0;
      $scope.countForPdf=0;
      $scope.arrayofpdf = [];    
      $scope.rejectionIds=[];   
      $scope.countForPdf=0;
      $scope.REDFLAG = false;
      $scope.GREENFLAG = false;
      $scope.YELLOWFLAG =false;
      $scope.SuperCheckIcon =false;
      
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
      $scope.GetVKYC_Agent_Details = QueueService.getVKYCagent();
      $scope.GetVKYC_Auditor_Details = QueueService.getVKYCauditor();
      $scope.GetVKYC_FinalS_tatus_Details = QueueService.getVKYCFinalstatus();
      $scope.GetVKYC_Geo_Tagging_Details = QueueService.getVKYCGeotagging();
      $scope.GetVKYC_IP_Details = QueueService.getVKYCIP();
      $scope.GetVKYC_AGENT_NAME = QueueService.getVKYAGENTNAME();
      $scope.GetVKYC_AGENT_ID = QueueService.getVKYAGENTID();
      console.log("# getJSONData #", $scope.GetJSONData);
      if ([17, 19, 20, 18, 21, 22, 23].includes($scope.selectedQ["queue_id"])) {
        $scope.getVKYCIMAGE_DETAILS();
      }
      $scope.terminalArray = [];
      if ($scope.GetJSONData.hasOwnProperty("AOF_INDI")) {
        if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.hasOwnProperty("TERMINAL")) {
          $scope.createTerminalCards(
            $scope.GetJSONData.AOF_INDI.ENTITY_DATA.TERMINAL
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
        if($scope.loginServiceData[0].system_role =='BS'&& $scope.selectedQ["queue_id"]!==11){
          $scope.SuperCheckIcon= true;
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
                  if($scope.selectedGrid.x_lead_source == 'INDIVIDUAL'){
                    $scope.reviewDate= $scope.changeDateFormat($scope.kyc_review_date );
                    sessionStorage.setItem('kyc_reveiw_date',$scope.reviewDate.replace(/\s+/, ''));
                  }
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
      $scope.getDocumentsQueueList();
      $scope.FOs_list();
      console.log($scope.ovCardData['OV_TABS'][0]['form_id']);
      $scope.getFormFieldPerTab({ form_id: $scope.ovCardData['OV_TABS'][0]['form_id'] });
      // console.log('QUEUE ID', $scope.selectedQ["queue_id"]);
      if ($scope.selectedQ["queue_id"] == 23) {
        $scope.getREJ_tabs_fields(); // getting fields and tabs for marking them red for ACC
      }
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
       //SMART PAY
       $scope.smartPayCA = $scope.GetJSONData.AOF_INDI.ENTITY_DATA.IP_FUNDING?.FUNDING_DETAILS?.CODE?$scope.GetJSONData.AOF_INDI.ENTITY_DATA.IP_FUNDING?.FUNDING_DETAILS?.CODE:'';
       $scope.smartPaySA = $scope.GetJSONData.AOF_INDI.ENTITY_DATA.SA?.IP_FUNDING?.FUNDING_MODE?.CODE?$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SA?.IP_FUNDING?.FUNDING_MODE?.CODE:'';
       $scope.GetCheckBalance();
       $scope.setSVROptions();
      $scope.getDeclarationByLead();
      $scope.SPGETCUSTOMERPDF_DB_case_reject_scrutiny();
      $scope.kyc_review_date = new Date();
      $scope.$watch(function ($scope) {
          let promoCodeChangeCount =0;
          if(promoCodeChangeCount < 1){
            document.querySelectorAll('[id="Tracking Code (Promo Code I)"]').forEach(element=> 
              { 
                if(element){
                  promoCodeChangeCount++;
                  let transection_limit_value = $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.TRACKING_CODE
                  for(let front=0;front < parseInt($scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PROMOCODE1_FRONT); front++){
                    transection_limit_value= " " + transection_limit_value;
                   element.value =transection_limit_value;
                  }
                  for(let end=0;end < parseInt($scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PROMOCODE1_END); end++){
                    transection_limit_value=transection_limit_value + " ";
                   element.value =transection_limit_value;} 
                }
              });
              document.querySelectorAll('[id="Billing Code (Promo Code II)"]').forEach(element=> 
                { 
                  if(element){
                    promoCodeChangeCount++;
                    let billing_code_value = $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.BIILING_CODE
                    for(let front=0;front < parseInt($scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PROMOCODE2_FRONT); front++){
                      billing_code_value= " " + billing_code_value;
                     element.value =billing_code_value;
                    }
                    for(let end=0;end < parseInt($scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PROMOCODE2_END ); end++){
                      billing_code_value=billing_code_value + " ";
                    element.value =billing_code_value;
                    }
                  }
                });
           
          } 
        if ($scope.form) {
          if($scope.form[0].form_id=="28"){
            document.querySelectorAll('[id="IND_ASSISTED_MOBILE"]').forEach(element=> 
              { 
                if(element){
                  if($scope.GetJSONData.AOF_INDI.ENTITY_DATA.CUSTOMERID_MOBILE_LINKAGE.custIdList!=''||$scope.GetJSONData.AOF_INDI.ENTITY_DATA.CUSTOMERID_MOBILE_LINKAGE.custIdList!=null)
                  {
                    let MOBILECUSTID=$scope.GetJSONData.AOF_INDI.ENTITY_DATA.CUSTOMERID_MOBILE_LINKAGE.custIdList;
                    // let unique=[...new Set(MOBILECUSTID)]
                    // let valueToString=unique.join(' , ')
                    $scope.mobile=MOBILECUSTID;
                    console.log('mobile',MOBILECUSTID);
                  }
                  else{
                    // document.getElementById('IND_ASSISTED_MOBILE').value='NA'
                    $scope.mobile="NA";
                  }
                  }
              });
              document.querySelectorAll('[id="INDI_ASSISTED_EMAIL"]').forEach(element=> 
                { 
                  if(element){
                    if($scope.GetJSONData.AOF_INDI.ENTITY_DATA.CUSTOMERID_EMAIL_LINKAGE.custIdList!=''||$scope.GetJSONData.AOF_INDI.ENTITY_DATA.CUSTOMERID_EMAIL_LINKAGE.custIdList!=null)
                    {
                      let EMAILCUSTID=$scope.GetJSONData.AOF_INDI.ENTITY_DATA.CUSTOMERID_EMAIL_LINKAGE.custIdList;
                      // let unique=[...new Set(EMAILCUSTID)]
                      // let valueToString=unique.join(' , ')
                      // document.getElementById('INDI_ASSISTED_EMAIL').value=valueToString;
                      $scope.email=EMAILCUSTID;
                      console.log('email',EMAILCUSTID);
                    }
                    else{
                      // document.getElementById('INDI_ASSISTED_EMAIL').value='NA'
                      $scope.email="NA";
                    }
                  }
                });
            
            return true; 
        }else if($scope.form[0].form_id == "23"){ //ETB
          $scope.extractCutomerType();
          return true;
      }else if($scope.form[0].form_id == "690"){            //ETB
        $scope.extractCustomerIds();
        return true;
        }
        else if($scope.form[0].form_id == "25"){
          $scope.CheckBalanceFlags(); // SMART PAY
    return true;
        }else if($scope.form[0].form_id == "50"){
          $scope.CheckBalanceFlags(); // SMART PAY
    return true;
        }
          else if($scope.form[0].form_id == "38"){
            document.querySelectorAll('[id="DIY_MOBILE"]').forEach(element=> 
              { 
                if(element){
                  if($scope.GetJSONData.AOF_INDI.ENTITY_DATA.MOBILE_CUST_ID!=''||$scope.GetJSONData.AOF_INDI.ENTITY_DATA.MOBILE_CUST_ID!=null)
                  {
                    let MOBILECUSTID=$scope.GetJSONData.AOF_INDI.ENTITY_DATA.MOBILE_CUST_ID;
                    let unique=[...new Set(MOBILECUSTID)]
                    let valueToString=unique.join(' , ')
                    $scope.mobile=valueToString;
                    console.log('mobile',valueToString);
                  }
                  else{
                    // document.getElementById('DIY_MOBILE').value='NA'
                    $scope.mobile="NA";
                  }
                  }
              });
              document.querySelectorAll('[id="DIY_EMAIL"]').forEach(element=> 
                { 
                  if(element){
                    if($scope.GetJSONData.AOF_INDI.ENTITY_DATA.EMAIL_CUST_ID!=''||$scope.GetJSONData.AOF_INDI.ENTITY_DATA.EMAIL_CUST_ID!=null)
                    {
                      let EMAILCUSTID=$scope.GetJSONData.AOF_INDI.ENTITY_DATA.EMAIL_CUST_ID;
                      let unique=[...new Set(EMAILCUSTID)]
                      let valueToString=unique.join(' , ')
                      // document.getElementById('DIY_EMAIL').value=valueToString;
                      $scope.email=valueToString;
                      console.log('email',valueToString);
                    }
                    else{
                      // document.getElementById('DIY_EMAIL').value='NA'
                      $scope.email="NA";
                    }
                  }
                });
        
          return true;
          }

         else if($scope.form[0].form_id == "37"){
          document.querySelectorAll('[id="VKYC Agent details"]').forEach(element=> 
            {  if(element){
              element.value =$scope.GetVKYC_Agent_Details;
            }})  
            document.querySelectorAll('[id="VKYC Current Status"]').forEach(element=> 
              {  
            if(element){
              element.value = $scope.GetVKYC_FinalS_tatus_Details;
            }});
            document.querySelectorAll('[id="IP Details"]').forEach(element=> 
              {
            if(element){
              element.value =  $scope.GetVKYC_IP_Details;
            }});
            document.querySelectorAll('[id="Video KYC Agent ID"]').forEach(element=> 
              {
            if(element){
             element.value =  $scope.GetVKYC_AGENT_ID;
            }});
            document.querySelectorAll('[id="Video KYC Agent Name"]').forEach(element=> 
              {
            if(element){
              element.value =  $scope.GetVKYC_AGENT_NAME;
            }});
            document.querySelectorAll('[id="Geo-Tagging Details"]').forEach(element=> 
              {
            if(element){
              element.value =  $scope.GetVKYC_Geo_Tagging_Details;
            }});
            document.querySelectorAll('[id="VKYC Auditor details"]').forEach(element=> 
              {
            if(element){
              element.value = $scope.GetVKYC_Auditor_Details;
            }});
            
            return true;
          }
          else if ($scope.form[0].form_id == "19" && (document.getElementById('Yes') && document.getElementById('No'))) {
            $scope.setRadioButtonSVR();
            return true;
          } else if ($scope.form[0].form_id == "21" && (document.getElementById('VAS Standard') && document.getElementById('Connected Banking'))) {
            $scope.setVASOptions();
            return true;
          }
          else if ($scope.form[0].form_id == "43") {
            // console.log('watcher', document.getElementById($scope.declaration_content));
            document.querySelectorAll(`[id="${$scope.declaration_content}"]`).forEach(element=> 
              {
                if (element) {
                  element.checked = true;
                  if ($scope.declaration_ID === '14') {
                    let bank_name = $scope.GetJSONData.AOF_INDI.ENTITY_DATA.CREDIT_FACILITY.ESCROW_BANK_NAME;
                    $scope.declaration_content = $scope.declaration_content.replace('###', bank_name);
                    $scope.optionalField['LOVY_DOPS_DECL'][0].VALUE = $scope.declaration_content;
                  }
                  if ($scope.declaration_ID === '15') {
                    let account_no = $scope.GetJSONData.AOF_INDI.ENTITY_DATA.CREDIT_FACILITY.ESCROW_ACCOUNT_NO;
                    let account_name = $scope.GetJSONData.AOF_INDI.ENTITY_DATA.CREDIT_FACILITY.ESCROW_ACCOUNT_NAME;
                    $scope.declaration_content = $scope.declaration_content.replace('###', account_name);
                    $scope.declaration_content = $scope.declaration_content.replace('####', account_no);
                    $scope.optionalField['LOVY_DOPS_DECL'][0].VALUE = $scope.declaration_content;
                  }
                }
              });
          
            return true;
          }
          else if($scope.form[0].form_id === '23' && $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].MARITAL_STATUS.CODE=="1"){
            $scope.fatherRadio=true;
            return true
          }
 else {
            return false;
          }
        }
      }, function ($scope) {
        console.log('is current tab : SVR', $scope);
      });
      // check if lead id starts with 'D'
      const isDIYLead =
      $scope.selectedGrid?.x_lead_id2 &&
      $scope.selectedGrid.x_lead_id2.startsWith('D');
      $scope.max_tab = 0;
      let diy_queue = [17, 18, 19, 20, 21, 22, 23, 24,7];
      if (diy_queue.includes($scope.selectedQ.queue_id) && isDIYLead  && $scope.selectedGrid.x_lead_source !=='SOLECANTB') {
                $scope.max_tab = 8;
      }
      // let diy_queue = [17, 19, 20, 18, 21, 22, 23, 24,7];
      // $scope.max_tab = 0;
      // if (diy_queue.includes($scope.selectedQ["queue_id"])) {
      //   $scope.max_tab = 8;
      // }
       else {
        if($scope.loginServiceData[0].system_role =='BS'){
          $scope.max_tab = 12;
      }else{
        $scope.max_tab = 11;
      }
        
      }
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
    $scope.getVKYCIMAGE_DETAILS = function (data) {
      let key = 'GETVKYCIMAGEDETAILS';
      var body = {
        [key]: [
          {
            trackingId: $scope.selectedGrid.x_lead_id2
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
              "**/* ", key, " */**",
              res
            );
            if (data && res.data.GETVKYCIMAGEDETAILS[0].data[0].response_code=="200") {
              $scope.VKYCDocLength =0;
              $scope.getDocumentsQueueList(data);
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

    $scope.getCardParamValue = function (param, card) {
      console.log('|' + param + '|', 'card', card);
      let keyValue = {
        "Rejection Reason": "REJECTION_REASON",
        "Category": "CATEGORY",
        "Sub-Category": "SUBCATEGORY",
        "Rejection ID": "REJECTION_ID",
        "Raised By": "RAISED_BY",
        "Raised On": "RAISED_ON",
        "Queue Desc": "QUEUE_DESC",
        "Rejection Status": "STATUS",
        "Rejection Remarks": "REJECTION_REMARKS",
        "Resolved By": "RESOLVED_BY",
        "Modified On": "MODIFIED_ON",
        "Approved by": "APPROVED_BY",
        "RM Remarks": "RM_REMARKS",
        "Curing Team Remarks": "CURING_TEAM_REMARKS",
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
      return card[key];
    };

    $scope.getDeclarationByLead = function () {
      var body = {
        spgetcreditfacilitydopsdecl: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
            x_constitution: "INDIVIDUAL"
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
    // $scope.diyVKYCdetails = function () {
    //   var body = {
    //     spvkycdetailsdops: [
    //       {
    //         x_lead_id: $scope.selectedGrid.x_lead_id2,
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
    //           "**/* sp_vkyc_details_dops */**",
    //           res
    //         );
            // if (res.data["spgetcreditfacilitydopsdecl"][0].hasOwnProperty("error")) {
            //   dmDialogueBox.alertBox({
            //     title: "Alert",
            //     message: "Oop's Something went wrong",
            //     actionLabel: ["Ok"],
            //   });
            // } else if (res.data["spgetcreditfacilitydopsdecl"][0].hasOwnProperty("data")) {
            //   $scope.declaration_ID = res.data["spgetcreditfacilitydopsdecl"][0].data[0].declaration_id;
            //   $scope.declaration_content = res.data["spgetcreditfacilitydopsdecl"][0].data[0].declaration_dops;
            // } else {
            //   $scope.hideLoader();
            //   dmDialogueBox.alertBox({
            //     title: "Message",
            //     message: "Oop's Something went wrong",
            //     actionLabel: ["Ok"],
            //   });
            // }
  //         } 
  //         });
  //   });
  // }
    // Credit Facility

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
            console.log('Error from ', 'UPLOADPDFTOBLOB');
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
       $scope.GetCheckBalance = function (flag) {
        var body = {
          SP_GET_INITIAL_FUNDING_DATA: [
            {
                  x_lead_id: $scope.selectedGrid.x_lead_id,
                  x_constitution:'INDIVIDUAL',
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
            accountNumber:$scope.GetJSONData.AOF_INDI.ENTITY_DATA.IP_FUNDING?.ACC_NUM?$scope.GetJSONData.AOF_INDI.ENTITY_DATA.IP_FUNDING?.ACC_NUM:'',
            transactionAmount:$scope.GetJSONData.AOF_INDI.ENTITY_DATA.IP_FUNDING?.TRANS_AMNT?$scope.GetJSONData.AOF_INDI.ENTITY_DATA.IP_FUNDING?.TRANS_AMNT:'',
          },
        ],
      };
    }else {
      var body = {
        SMART_PAY_ACC_BAL_STATUS_CHECK_API: [
          {
            leadId: $scope.selectedGrid.x_lead_id2,
            accountNumber:$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SA?.ACC_NUMBER?$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SA?.ACC_NUMBER:'',
            transactionAmounts:$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SA?.IP_FUNDING?.TRANSACTION_AMOUNT?$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SA?.IP_FUNDING?.TRANSACTION_AMOUNT:'',
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
          x_constitution:'INDIVIDUAL',
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
      $scope.selectedQ["queue_id"] == "6" ||
      $scope.selectedQ["queue_id"] == "1"
    )
      $scope.hideCheckAction = false;
    }
    $scope.uploadDocAndConvert = function () {
      document.querySelectorAll('[id="cibil_file"]').forEach(element=> 
        {
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
                 element.value = "";
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
            console.log('Error from ', 'spuploadPdfAsBase64');
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
            console.log('Error from ', 'spsetblobimagestatus');
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
            console.log('Error from ', 'spgetblobimagestatus');
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
      if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.hasOwnProperty('VAS')) {
        if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.VAS.hasOwnProperty('STND_API')) {
          if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.VAS.STND_API.hasOwnProperty('CODE')) {
            if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.VAS.STND_API.CODE === '1~2') {
              document.querySelectorAll('[id="VAS Standard"]').forEach(element=> 
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
          }
        }
      }
    };

    // VAS functions

    // SVR functions

    $scope.setSVROptions = function () {
      if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.hasOwnProperty('EP1_DOCTYPE')) {
        if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.EP1_DOCTYPE.hasOwnProperty('CODE')) {
          var condition1 = ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.EP1_DOCTYPE.CODE == '10' ||
            $scope.GetJSONData.AOF_INDI.ENTITY_DATA.EP1_DOCTYPE.CODE == '11');
        } else {
          var condition1 = false;
        }
      }

      if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.hasOwnProperty('EP2_DOCTYPE')) {
        if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.EP2_DOCTYPE.hasOwnProperty('CODE')) {
          var condition2 = ['10', '11', '13', '14', '15'].includes($scope.GetJSONData.AOF_INDI.ENTITY_DATA.EP2_DOCTYPE.CODE);
        } else {
          var condition2 = false;
        }
      }

      if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.hasOwnProperty('MAIL_COMM_ADD')) {
        if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.MAIL_COMM_ADD.hasOwnProperty('CODE')) {
          var condition3 = $scope.GetJSONData.AOF_INDI.ENTITY_DATA.MAIL_COMM_ADD.CODE == '2';
        } else {
          var condition3 = false;
        }
      }

      console.log('c1', condition1, 'c2', condition2, 'c3', condition3);

      if (condition1 || condition2 || condition3) {
        $scope.statusSVR = true;
      } else {
        $scope.statusSVR = false;
      }
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

      if ($scope.statusSVR) {
        let value = () => {
          let array = $scope.GetJSONData.AOF_INDI.ENTITY_DATA.SVR.INFRASTRUCTURE;
          let valueArray = [];
          for (let i = 0; i < array.length; i++) {
            valueArray.push(array[i].OBJECT.VALUE);
          }
          return valueArray.join(', ');
        };
        // console.log('valuearr', value());
        document.querySelectorAll('[id="Physical infrastructure/stocks/materials"]').forEach(element=> 
          {
            element.value = value();
          });

      }
    };

    $scope.disableRejections = function (rejID) {
      if ($scope.form[0].form_id == "1" && $scope.statusSVR) {
        if (rejID == 'RAJ112') {
          return true;
        } else {
          return false;
        }
      }

      if ($scope.form[0].form_id == "19" && $scope.statusSVR) {
        if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.SVR.hasOwnProperty('VISITING_CARD')) {
          if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.SVR.VISITING_CARD.VALUE == 'No'
            && rejID == 'RAJ279') {
            return true;
          }
        }

        if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.SVR.hasOwnProperty('BUSS_ACTIVITY')) {
          if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.SVR.BUSS_ACTIVITY.VALUE == 'No'
            && rejID == 'RAJ278') {
            return true;
          }
        }

        if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.SVR.hasOwnProperty('CUST_AUS_MET')) {
          if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.SVR.CUST_AUS_MET.VALUE == 'No'
            && rejID == 'RAJ277') {
            return true;
          }
        }
      }

      if ($scope.form[0].form_id == "19" && !$scope.statusSVR) {
        return true;
      }

      if ($scope.form[0].form_id == "43") {
        if (rejID == 'RAJ393') {
          if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.CREDIT_FACILITY.ACCOUNT_ELIGIBLE.VALUE == "Collection CA") {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }
//       if ($scope.form[0].form_id == "25"){
//            if($scope.GetJSONData.AOF_INDI.ENTITY_DATA.NOMINEE_ENTERED.CODE=='2'){
// return true;
//            }else{
// return false;
//            }
        

//       }
      if ($scope.form[0].form_id == "35") {
        if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.NOMINEE_ENTERED.VALUE == 'Yes') {
          if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.NOM_AGE && $scope.GetJSONData.AOF_INDI.ENTITY_DATA.NOM_AGE > 18) {
            if (rejID == 'RAJ361' || rejID == 'RAJ362') {
              return true;
            } else {
              return false;
            }
          }
        } else {
          return true;
        }
      }

      if ($scope.form[0].form_id == "34") {
        if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.OCCUPATION_TYPE.VALUE == 'Self Employed/Business') {
          if (rejID == 'RAJ353') {
            return true;
          } else {
            return false;
          }
        }
        if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.OCCUPATION_TYPE.VALUE == 'Professional') {
          if (rejID == 'RAJ354' || rejID == 'RAJ355') {
            return true;
          } else {
            return false;
          }
        }
      }
      // if($scope.form[0].form_id=="50"){
      //   if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.OPEN_SA.VALUE == 'Yes'&&$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SA.PRODUCT.KIT_TYPE.VALUE=='Non-Insta') {
      //     if (rejID == 'RAJ982') {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   }else if($scope.GetJSONData.AOF_INDI.ENTITY_DATA.OPEN_SA.VALUE == 'No'|| $scope.GetJSONData.AOF_INDI.ENTITY_DATA.OPEN_SA.VALUE == ''||$scope.GetJSONData.AOF_INDI.ENTITY_DATA.OPEN_SA.VALUE == null)
      //   {
      //    if(rejID =='RAJ982'||rejID =='RAJ975'||rejID =='RAJ976'||rejID =='RAJ970'||rejID =='RAJ974'||rejID =='RAJ973'||rejID =='RAJ984'||rejID =='RAJ983'||rejID =='RAJ981'){
      //     return true;
      //    } else {
      //     return false;
      //    }
      //   }else if($scope.GetJSONData.AOF_INDI.ENTITY_DATA.OPEN_SA.VALUE == 'Yes'&&$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SA.PRODUCT.KIT_TYPE.VALUE=='Insta'){
      //     return false;
      //   }
      // }
       //SMART PAY Dynamic Rejection disable in IP Funding Tab //SMART PAY Dynamic Rejection disable in IP Funding Tab
       if($scope.form[0].form_id=='25'|| $scope.form[0].form_id=='50'){
        if ($scope.rejectionIdsIPFunding.includes(rejID)) {
          return false;
        }else {
          return true;
        }
       }
       //SMART PAY Dynamic Rejection disable in IP Funding Tab
       if($scope.form[0].form_id !='25'|| $scope.form[0].form_id !='50'){
        if ($scope.rejectionIds.includes(rejID)) {
          // if(($scope.GetJSONData.AOF_INDI.ENTITY_DATA.DEDUPE_CUST_TYPE=='ETB' || $scope.GetJSONData.AOF_INDI.ENTITY_DATA.DEDUPE_CUST_TYPE=='etb')){
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
  let etb_non_etb=($scope.GetJSONData.AOF_INDI.ENTITY_DATA.DEDUPE_CUST_TYPE)
  var body = {
    SP_REJECTION_DISABLE_LIST_ETB_V1: [
      {
        x_lead_id: $scope.selectedGrid.x_lead_id,
        x_etb_non_etb:etb_non_etb?etb_non_etb:'',
        x_constitution:'INDIVIDUAL',
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
        x_constitution:journey=='SA'?'INDIVIDUAL_SA':'INDIVIDUAL',
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

    // SVR functions

    // UCIC field functions

    $scope.getUCIC_Class = function (param) {
      if (param.length > 35) {
        return 'ucic_change_break';
      } else {
        return 'ucic_change';
      }
    };

    // $scope.ucic_button_status = true;

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

    $scope.enable_disable_input = function (name, action, role) {
      var inputElement = document.getElementsByName(name)[0];
      if (inputElement) {
        if (action === 'edit') {
          // document.getElementsByName(name)[0].readOnly = false;
          // $scope.ucic_button_status = false;
          $scope.isReadonly = false;
          inputElement.readOnly = false;
        }
        if (action === 'save') {
          if (role == 'DVUM' || role == 'DVUC') {
            $scope.update_ucic_key(inputElement);
          } else if (role == 'ACC') {
            let found = $scope.rejected_field_Array.filter(x => x.param_name.toLowerCase() == name.toLowerCase());
            if (found.length > 0) {
              $scope.update_REJ_FIELDS(name, found[0].json_name,inputElement);
            }
          }
        }
      }
    
    };

    $scope.get_readonly_status = function (name) {
      return document.getElementsByName(name)[0].readOnly;
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
            x_constitution: "INDIVIDUAL"
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
                // $scope.ucic_button_status = true;
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
            console.log('Error from ', 'spsetucicno');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };

    // UCIC field functions

       // Customer PDF Download
       $scope.handlePDFDownload = function(){
        if ($scope.rejection_raised_view()) {
       $scope.SPGETCUSTOMERPDF_DB();
        } else {
          $scope.downloadCustomerPDF();
      }
      }
      $scope.downloadCustomerPDF_case_reject_scrutiny = function () {
        if($scope.selectedGrid.x_lead_source == 'DIY_INDIVIDUAL'){
          $scope.PROG_VARIANT_VALUE_DIY= $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT.VALUE;
          var body = {
            SEND_PDF_INDI_BASE64_DIY: [
              {
                leadId: $scope.selectedGrid.x_lead_id2, //small leadId
                flag: "Y",
                pdfType: $scope.PROG_VARIANT_VALUE_DIY
              },
            ],
          };
          executeApi(newplatwareHeader, body, function (res) {
            $scope.$apply(function () {
              if (res.status == true) {
                console.log("Req body: ", body, "**/* SEND_PDF_INDI_BASE64_DIY */**", res);
               if (res.data["SEND_PDF_INDI_BASE64_DIY"][0].hasOwnProperty("data")) {
                  $scope.SPSETCUSTOMERPDF_DB_2(res.data["SEND_PDF_INDI_BASE64_DIY"][0].data[0].response);
                } 
              }
            });
          });
        }
        if($scope.selectedGrid.x_lead_source == 'INDIVIDUAL'){
          pdfTypeValue =$scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT.VALUE
          var body = {
            SEND_PDF_INDI_BASE64: [
              {
                leadId: $scope.selectedGrid.x_lead_id2, //small leadId
                flag: "Y",
                pdfType: pdfTypeValue  
              },
            ],
          };
          executeApi(newplatwareHeader, body, function (res) {
            $scope.$apply(function () {
              if (res.status == true) {
                console.log("Req body: ", body, "**/* SEND_PDF_INDI_BASE64 */**", res);
                  if (res.data["SEND_PDF_INDI_BASE64"][0].hasOwnProperty("data")) {
                  $scope.SPSETCUSTOMERPDF_DB_2(res.data["SEND_PDF_INDI_BASE64"][0].data[0].response);
                }  
              }
            });
          });
        }
        
      };
  
      $scope.downloadCustomerPDF = function () {
        // if($scope.selectedGrid.x_lead_source == 'DIY_INDIVIDUAL'){
        //   var body = {
        //     IND_DIY_PDF_DOPS: [
        //       {
        //         leadId: $scope.selectedGrid.x_lead_id
        //       },
        //     ],
        //   };
        //   $scope.showLoader("Loading.....");
        //   executeApi(newplatwareHeader, body, function (res) {
        //     $scope.$apply(function () {
        //       $scope.hideLoader();
        //       if (res.status == true) {
        //         console.log("Req body: ", body, "**/* IND_DIY_PDF_DOPS */**", res);
        //         if (res.data["IND_DIY_PDF_DOPS"][0].hasOwnProperty("error")) {
        //           dmDialogueBox.alertBox({
        //             title: "Alert",
        //             message: "Oop's Something went wrong",
        //             actionLabel: ["Ok"],
        //           });
        //         } else if (res.data["IND_DIY_PDF_DOPS"][0].hasOwnProperty("data")) {
        //           $scope.decodeCustomerPdf(res.data["IND_DIY_PDF_DOPS"][0].data[0].response, $scope.selectedGrid.x_lead_id);
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
        // }
        // if($scope.selectedGrid.x_lead_source == 'INDIVIDUAL'){
        //   var body = {
        //     INDIVIDUAL_PDF_DOPS: [
        //       {
        //         leadId: $scope.selectedGrid.x_lead_id
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
        //           $scope.decodeCustomerPdf(res.data["INDIVIDUAL_PDF_DOPS"][0].data[0].response, $scope.selectedGrid.x_lead_id);
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
        // }
        if($scope.selectedGrid.x_lead_source == 'DIY_INDIVIDUAL'){
          $scope.PROG_VARIANT_VALUE_DIY= $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT.VALUE;
          var body = {
            SEND_PDF_INDI_BASE64_DIY: [
              {
                leadId: $scope.selectedGrid.x_lead_id2, //small leadId
                flag: "Y",
                pdfType: $scope.PROG_VARIANT_VALUE_DIY
              },
            ],
          };
          $scope.showLoader("Loading.....");
          executeApi(newplatwareHeader, body, function (res) {
            $scope.$apply(function () {
              $scope.hideLoader();
              if (res.status == true) {
                console.log("Req body: ", body, "**/* SEND_PDF_INDI_BASE64_DIY */**", res);
                if (res.data["SEND_PDF_INDI_BASE64_DIY"][0].hasOwnProperty("error")) {
                  dmDialogueBox.alertBox({
                    title: "Alert",
                    message: "Oop's Something went wrong",
                    actionLabel: ["Ok"],
                  });
                } else if (res.data["SEND_PDF_INDI_BASE64_DIY"][0].hasOwnProperty("data")) {
                  $scope.decodeCustomerPdf(res.data["SEND_PDF_INDI_BASE64_DIY"][0].data[0].response, $scope.selectedGrid.x_lead_id);
                  $scope.SPSETCUSTOMERPDF_DB(res.data["SEND_PDF_INDI_BASE64_DIY"][0].data[0].response);
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
        if($scope.selectedGrid.x_lead_source == 'INDIVIDUAL'){
          pdfTypeValue =$scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT.VALUE
          var body = {
            SEND_PDF_INDI_BASE64: [
              {
                leadId: $scope.selectedGrid.x_lead_id2, //small leadId
                flag: "Y",
                pdfType: pdfTypeValue  
              },
            ],
          }; $scope.showLoader("Loading.....");
          executeApi(newplatwareHeader, body, function (res) {
            $scope.$apply(function () {
              $scope.hideLoader();
              if (res.status == true) {
                console.log("Req body: ", body, "**/* SEND_PDF_INDI_BASE64 */**", res);
                if (res.data["SEND_PDF_INDI_BASE64"][0].hasOwnProperty("error")) {
                  dmDialogueBox.alertBox({
                    title: "Alert",
                    message: "Oop's Something went wrong",
                    actionLabel: ["Ok"],
                  });
                }else if (res.data["SEND_PDF_INDI_BASE64"][0].hasOwnProperty("data")) {
                  $scope.decodeCustomerPdf(res.data["SEND_PDF_INDI_BASE64"][0].data[0].response, $scope.selectedGrid.x_lead_id);
                  $scope.SPSETCUSTOMERPDF_DB(res.data["SEND_PDF_INDI_BASE64"][0].data[0].response);
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
        executeApi(newplatwareHeader, body, function (res) {
          $scope.$apply(function () {
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
      
    // $scope.downloadCustomerPDF = function () {
    //   if($scope.selectedGrid.x_lead_source == 'DIY_INDIVIDUAL'){
    //     $scope.PROG_VARIANT_VALUE_DIY= $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT.VALUE;
    //     var body = {
    //       IND_DIY_PDF_DOPS: [
    //         {
    //           leadId: $scope.selectedGrid.x_lead_id,             
    //         },
    //       ],
    //     };
    //     $scope.showLoader("Loading.....");
    //     executeApi(newplatwareHeader, body, function (res) {
    //       $scope.$apply(function () {
    //         $scope.hideLoader();
    //         if (res.status == true) {
    //           console.log("Req body: ", body, "**/* IND_DIY_PDF_DOPS */**", res);
    //           if (res.data["IND_DIY_PDF_DOPS"][0].hasOwnProperty("error")) {
    //             dmDialogueBox.alertBox({
    //               title: "Alert",
    //               message: "Oop's Something went wrong",
    //               actionLabel: ["Ok"],
    //             });
    //           } else if (res.data["IND_DIY_PDF_DOPS"][0].hasOwnProperty("data")) {
    //             $scope.decodeCustomerPdf(res.data["IND_DIY_PDF_DOPS"][0].data[0].response, $scope.selectedGrid.x_lead_id);
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
    //   if($scope.selectedGrid.x_lead_source == 'INDIVIDUAL'){
    //     pdfTypeValue =$scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT.VALUE
    //     var body = {
    //       INDIVIDUAL_PDF_DOPS: [
    //         {
    //           leadId: $scope.selectedGrid.x_lead_id,
    //         },
    //       ],
    //     };
    //     $scope.showLoader("Loading.....");
    //     executeApi(newplatwareHeader, body, function (res) {
    //       $scope.$apply(function () {
    //         $scope.hideLoader();
    //         if (res.status == true) {
    //           console.log("Req body: ", body, "**/* INDIVIDUAL_PDF_DOPS */**", res);
    //           if (res.data["INDIVIDUAL_PDF_DOPS"][0].hasOwnProperty("error")) {
    //             dmDialogueBox.alertBox({
    //               title: "Alert",
    //               message: "Oop's Something went wrong",
    //               actionLabel: ["Ok"],
    //             });
    //           }else if (res.data["INDIVIDUAL_PDF_DOPS"][0].hasOwnProperty("data")) {
    //           $scope.decodeCustomerPdf(res.data["INDIVIDUAL_PDF_DOPS"][0].data[0].response, $scope.selectedGrid.x_lead_id);
    //         } else {
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

    // $scope.decodeCustomerPdf = function (base64, leadID) {
    //   var link = document.createElement("a");
    //   link.href = "data:application/pdf;base64," + base64;
    //   link.download = leadID;
    //   link.click();
    // };
//     $scope.decodeCustomerPdf = function (base64, leadID) {

// //       const linkSource = `data:application/pdf;base64,${base64}`;
// // const downloadLink = document.createElement("a");
// // const fileName =  leadID + ".pdf";
// // downloadLink.href = linkSource;
// // downloadLink.download = fileName;
// // downloadLink.click()

// // setTimeout(()=>{
// //   document.body.removeChild(downloadLink);
// //   URL.revokeObjectURL(downloadLink.href);
// // },0)

// // setTimeout(()=>{
// //   const byteString = window.atob(base64);
// //   const arrayBuffer = new ArrayBuffer(byteString.length);
// //   const int8Array = new Uint8Array(arrayBuffer);
// //   for (let i = 0; i < byteString.length; i++) {
// //     int8Array[i] = byteString.charCodeAt(i);
// //   }
// //   const blob1 = new Blob([int8Array], { type: 'application/pdf'});
// //   const url = URL.createObjectURL(blob1);
// //   window.open(url, '_blank');
// // })






//       // Decode the base64 string to binary data
//       var byteCharacters = atob(base64);
//       var byteNumbers = new Array(byteCharacters.length);
  
//       for (var i = 0; i < byteCharacters.length; i++) {
//           byteNumbers[i] = byteCharacters.charCodeAt(i);
//       }
  
//       var byteArray = new Uint8Array(byteNumbers);
//       var blob = new Blob([byteArray], { type: 'application/pdf' });
  
//       // Create a download link and click it programmatically
//       var link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = leadID + ".pdf";
//       document.body.appendChild(link);
//       link.click();
  
//       // Clean up by removing the link
//       setTimeout(()=>{
//         document.body.removeChild(link);
//         URL.revokeObjectURL(link.href);
//       },0)
      
//   };
    // Customer PDF Download
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
    // Customer EKYC Pdf

    $scope.downloadCustomerCKYCEKYCPDF = function () {
      let entity = $scope.GetJSONData?.AOF_INDI?.ENTITY_DATA || {};
let holder = entity?.HOLDER?.[0] || {};

let kycMode = entity?.KYC_MODE?.CODE;
let kycDoc = holder?.KYC_DOC?.CODE;
      if( kycMode === '2' || (!kycMode && kycDoc === '1')){
       //EKYC
        var body = {
          EKYC_PDF_INDI: [
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
              console.log("Req body: ", body, "**/* EKYC_PDF_INDI */**", res);
              if (res.data["EKYC_PDF_INDI"][0].hasOwnProperty("error")) {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (res.data["EKYC_PDF_INDI"][0].hasOwnProperty("data")) {
                $scope.decodeCustomerPdf(res.data["EKYC_PDF_INDI"][0].data[0].response, $scope.selectedGrid.x_lead_id);
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
      }else if(kycMode === '1' || kycMode === '3'){
       //CKYC
        var body = {
          CKYC_PDF_INDI: [
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
              console.log("Req body: ", body, "**/* CKYC_PDF_INDI */**", res);
              if (res.data["CKYC_PDF_INDI"][0].hasOwnProperty("error")) {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (res.data["CKYC_PDF_INDI"][0].hasOwnProperty("data")) {
                $scope.decodeCustomerPdf(res.data["CKYC_PDF_INDI"][0].data[0]?.response, $scope.selectedGrid.x_lead_id);
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
    // Customer EKYC Pdf

    $scope.getParam_Edit = function (param, group) {
      if ($scope.loginServiceData[0].system_role == 'ACC') {
        if ($scope.get_FIELDS_Marked(param, group)) {
          return param;
        } else {
          return '';
        }
      } else {
        return 'UCIC Number';
      }
    };

    // CURING REMARKS 

    $scope.remarks_cards = {};
    $scope.remarks_Array = [];

    $scope.toggle_remarks = function (rejID) {
      console.log(rejID);
      $scope.remarks_cards['save_state_' + rejID] = !$scope.remarks_cards['save_state_' + rejID];
    };

    $scope.create_remarks_card = function () {
      // console.log('Line760', $scope.RejectionQueueData);
      $scope.remarks_cards = {};
      $scope.RejectionQueueData.forEach(element => {
        $scope.remarks_cards[element.REJECTION_ID] = "";
        $scope.remarks_cards['save_state_' + element.REJECTION_ID] = false;
        $scope.remarks_cards['exist_' + element.REJECTION_ID] = false;
      });
      console.log('cards', $scope.remarks_cards);
      $scope.getCuringRemarks();
    };

    $scope.update_remarks_card = function () {
      if ($scope.remarks_Array) {
        if ($scope.remarks_Array.length > 0) {
          let arrID = $scope.remarks_Array.map(x => x.rejection_id);
          let arr_remarks = $scope.remarks_Array.map(x => x.curing_remarks);
          $scope.RejectionQueueData.forEach(element => {
            if (arrID.includes(element.REJECTION_ID)) {
              $scope.remarks_cards['exist_' + element.REJECTION_ID] = true;
              let index = arrID.findIndex(x => x == element.REJECTION_ID);
              $scope.remarks_cards[element.REJECTION_ID] = arr_remarks[index];
            }
          });
          console.log('updated_cards', $scope.remarks_cards);
        }
      }
    };

    $scope.disabled_save_remarks = function (rejID, btn) {
      if (btn == "submit") {
        if ($scope.remarks_cards[rejID]) {
          document.getElementById("sub_rem" + rejID).style.color = "#0560a6";
          return false;
        } else {
          document.getElementById("sub_rem" + rejID).style.color = "#c3c3c3";
          return true;
        }
      }
    };

    $scope.submit_remarks = function (card) {
      console.log('REMARKS ARRAY', $scope.remarks_cards);
      let key = '';
      if ($scope.remarks_cards['exist_' + card.REJECTION_ID]) {
        key = 'spupdatecuringremarks';
        var body = {
          spupdatecuringremarks: [
            {
              x_lead_id: $scope.selectedGrid.x_lead_id,
              x_rejection_id: card.REJECTION_ID,
              x_curing_remarks: $scope.remarks_cards[card.REJECTION_ID],
              x_modify_by: $scope.username
              // x_rej_category: card.CATEGORY,
              // x_rej_sub_category: card.SUBCATEGORY,
              // x_rej_desc: card.REJECTION_REASON,
              // x_raised_by: card.RAISED_BY,
              // x_queue_desc: card.QUEUE_DESC,
            },
          ],
        };
      } else {
        key = 'spinsertcuringremarks';
        var body = {
          spinsertcuringremarks: [
            {
              x_lead_id: $scope.selectedGrid.x_lead_id,
              x_rejection_id: card.REJECTION_ID,
              x_rej_category: card.CATEGORY,
              x_rej_sub_category: card.SUBCATEGORY,
              x_rej_desc: card.REJECTION_REASON,
              x_raised_by: card.RAISED_BY,
              x_queue_desc: card.QUEUE_DESC,
              x_curing_remarks: $scope.remarks_cards[card.REJECTION_ID],
              x_created_by: $scope.username
            },
          ],
        };
      }

      $scope.showLoader("Loading.....");
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
              let response = res.data[key][0].data[0];
              if (response.hasOwnProperty('Status')) {
                if (key == 'spinsertcuringremarks') {
                  if (response.Status == 'I') {
                    $scope.toggle_remarks(card.REJECTION_ID);
                    $scope.getCuringRemarks();
                  } else {
                    console.log('insert-block');
                    $scope.hideLoader();
                    dmDialogueBox.alertBox({
                      title: "Message",
                      message: "Insert remarks failed, try again",
                      actionLabel: ["Ok"],
                    });
                  }
                }
                if (key == 'spupdatecuringremarks') {
                  if (response.Status == 'U') {
                    $scope.toggle_remarks(card.REJECTION_ID);
                    $scope.getCuringRemarks();
                  } else {
                    console.log('update-block');
                    $scope.hideLoader();
                    dmDialogueBox.alertBox({
                      title: "Message",
                      message: "Insert remarks failed, try again",
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
            console.log('Error from ', 'spcommentaction4');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };

    $scope.getCuringRemarks = function () {
      $scope.remarks_Array = [];
      var body = {
        spgetcuringremarks: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spgetcuringremarks */**", res);
            if (res.data["spgetcuringremarks"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spgetcuringremarks"][0].hasOwnProperty("data")) {
              $scope.remarks_Array = JSON.parse(res.data["spgetcuringremarks"][0].data[0].Result);
              $scope.update_remarks_card();
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
            console.log('Error from ', 'spcommentaction4');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };

    // CURING REMARKS 

    // MARKING RED FIELDS IN ACC

    $scope.getREJ_tabs_fields = function () {
      var body = {
        spdiygetrejtabfields: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spdiygetrejtabfields */**", res);
            if (res.data["spdiygetrejtabfields"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spdiygetrejtabfields"][0].hasOwnProperty("data")) {
              console.log('SP rejected', res.data["spdiygetrejtabfields"][0].data[0]);
              let response = JSON.parse(res.data["spdiygetrejtabfields"][0].data[0].Object_data);
              $scope.create_Fields_Tabs_array(response);
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
            console.log('Error from ', 'spdiygetrejtabfields');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };

    $scope.red_tabs_fields = [];

    $scope.create_Fields_Tabs_array = function (response) {
      let fields_array = [];
      $scope.red_tabs_fields = [];
      response.forEach((item) => {
        fields_array = JSON.parse(item.field_name);
        let obj = { rejection_id: item.rejection_id, field_name: fields_array, form_id: item.form_id };
        $scope.red_tabs_fields.push(obj);
      });
      console.log($scope.red_tabs_fields);
      $scope.fetch_REJ_FIELDS();
    };

    $scope.get_TABS_Marked = function (formID) {
      if ($scope.loginServiceData[0].system_role == 'ACC' && $scope.red_tabs_fields) {
        return $scope.red_tabs_fields.map(x => x.form_id).includes(parseInt(formID));
      } else {
        return false;
      }
    };

    $scope.rej_info_object = {};
    $scope.rejected_field_Array = [];

    $scope.fetch_REJ_FIELDS = function () {
      $scope.rej_info_object = {};
      $scope.red_tabs_fields.forEach(item => {
        if ($scope.rej_info_object.hasOwnProperty(item.form_id)) {
          $scope.rej_info_object[item.form_id] = [...item.field_name, ...$scope.rej_info_object[item.form_id]];
        } else {
          $scope.rej_info_object[item.form_id] = item.field_name;
        }
      })
    };

    $scope.get_FIELDS_Marked = function (param_name, group_name) {
      if ($scope.loginServiceData[0].system_role == 'ACC' && $scope.rejected_field_Array) {
        // console.log('group name', group_name);
        if (document.getElementsByName(param_name) && group_name) {
          if (document.getElementsByName(param_name).length == 1) {
            group_name = null;
          }
        }
        if (group_name) {
          return $scope.rejected_field_Array.map(x => x.param_name.toLowerCase()).includes(param_name.toLowerCase()) &&
            $scope.rejected_field_Array.map(x => x.param_group.toLowerCase()).includes(group_name.toLowerCase());
        } else {
          return $scope.rejected_field_Array.map(x => x.param_name.toLowerCase()).includes(param_name.toLowerCase());
        }
      } else {
        return false;
      }
    };

    $scope.update_rejectedField_array = function (form_id, json) {
      let field_array = $scope.rej_info_object[form_id];
      let index = field_array.findIndex(x => x.json_name.toLowerCase() == json.toLowerCase());
      if (index > -1) {
        field_array[index].update_flag = true;
      }
      console.log('red tabs', $scope.red_tabs_fields);
    };

    $scope.update_REJ_FIELDS = function (name, json,inputElement) {
      var body = {
        spdiysetrejfields: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
            x_json_path: json,
            x_update_value: document.getElementsByName(name)[0].value,
            x_constitution: "INDIVIDUAL"
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spdiysetrejfields */**", res);
            if (res.data["spdiysetrejfields"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spdiysetrejfields"][0].hasOwnProperty("data")
            ) {
              console.log('Response spdiysetrejfields : ', res);
              console.log('new rejected array', $scope.rejected_field_Array);
              console.log('REJ_INFO', $scope.rej_info_object);
              if (res.data["spdiysetrejfields"][0].data[0].Status == 'Y') {
                // document.getElementsByName(name)[0].readOnly = true;
                inputElement.readOnly = true;
                $scope.isReadonly = true;
                $scope.update_rejectedField_array($scope.form[0].form_id, json);
              } else {
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Field updation failed",
                  actionLabel: ["Ok"],
                });
              }
              // $scope.ucic_button_status = true;
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
            console.log('Error from ', 'spsetucicno');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };

    // MARKING RED FIELDS IN ACC

    // ACC ACCEPT DIY LEAD

    $scope.setprc_bulk = function () {
      let arr = [];
      arr.push($scope.selectedGrid.x_lead_id);
      var body = {
        spdiyaccbulkaccept: [
          {
            x_lead_id_array: arr,
            x_login_id: $scope.username,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spdiyaccbulkaccept */**", res);
            if (res.data["spdiyaccbulkaccept"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spdiyaccbulkaccept"][0].hasOwnProperty("data")
            ) {
              console.log(res);
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
            console.log('Error from ', 'spdiyaccbulkaccept');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };

    $scope.insertTrackerID = function (trackerID) {
      var body = {
        spupdatetrackercopgrid: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id,
            x_tracker_id: trackerID,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spupdatetrackercopgrid */**", res);
            if (res.data["spupdatetrackercopgrid"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spupdatetrackercopgrid"][0].hasOwnProperty("data")
            ) {
              console.log(res);
              // $location.path("/home");
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
            console.log('Error from ', 'spdiyaccbulkaccept');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };

    // ACC ACCEPT DIY LEAD

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

      $scope.rejected_field_Array = $scope.rej_info_object[$scope.form[0].form_id];

      if ($scope.form[0].form_id == "19" && document.getElementById('Yes') && document.getElementById('No')) {
        $scope.setRadioButtonSVR();
      }
      if ($scope.form[0].form_name == "Audit Trail") {
        $scope.getAuditTrail();
      }
      if ($scope.form[0].form_name == "AOF History") {
        $scope.showAuditTrail = false;
        $scope.getRemarkHistory();
      }
      if ($scope.form[0].form_name == "Rejections Raised") {
        $scope.get_all_rejection_summary();
      }
      if ($scope.form[0].form_name == "Remarks") {
        $scope.comment_details();
      }
      if($scope.form[0].form_id == '37'){
        $scope.reFetchVKYCDocs();
      }
      if($scope.form[0].form_id=='66'){
        $scope.getSupervisorFlagDetailsIndividual();
      }
      if($scope.form[0].form_id == '28'|| $scope.form[0].form_id == '38'){
        $scope.getReviewKYCDate();
      }


     
      // if ($scope.form[0].form_name == "Remarks" && $scope.loginServiceData[0].system_role == "CURINGROLE") {
      //   $scope.get_all_rejection_summary();
      // }
      if ($scope.form[0].form_name == "AMLOCK & CRILC") {
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
            console.log('Error from ', 'spsweepinstartenddate');
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
  if ($scope.GetJSONData.AOF_INDI && $scope.GetJSONData.AOF_INDI.ENTITY_DATA && $scope.GetJSONData.AOF_INDI.ENTITY_DATA?.DEDUPE_ETB_LIST) {
      let customerIds = $scope.GetJSONData.AOF_INDI.ENTITY_DATA?.DEDUPE_ETB_LIST.map(item => item.customer_id);
      $scope.customerIdString = customerIds.join(',');
      document.querySelectorAll('[id="List of Cust id fetched"]').forEach(element=> 
        {
      if(element){
        element.value = $scope.customerIdString? $scope.customerIdString:'-';
      }})
  }
};
$scope.extractCutomerType = function () {
  document.querySelectorAll('[id="Customer Type"]').forEach(element => {
    if (element) {

      var data = $scope.GetJSONData?.AOF_INDI?.ENTITY_DATA;

      element.value =
        (data?.DEDUPE_CUST_TYPE?.toLowerCase() === 'etb')
          ? (data?.ETB_SELECTED_REPORT?.[0]?.customertypename ?? "")
          : (data?.PAN_CUST_TYPE ?? "");

    }
  });
};
    $scope.getFormFieldPerTab = function (obj) {
      var selectedGrid = JSON.parse(sessionStorage.getItem('GridData'));
      // check if lead id starts with 'D'
      const isDIYLead =
      selectedGrid?.x_lead_id2 &&
      selectedGrid.x_lead_id2.startsWith('D');
      let DIY_Ind = [17, 18, 19, 20, 21, 22, 23, 24,7,100];
      if (DIY_Ind.includes($scope.selectedQ.queue_id) && isDIYLead  && selectedGrid.x_lead_source !=='SOLECANTB') {
        selectedGrid.x_lead_source = 'DIY_INDIVIDUAL';
      }
      var body = {
        spformelementresultcomp: [
          {
            x_form_id: obj.form_id,
            x_source: selectedGrid.x_lead_source,
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
              if ($scope.loginServiceData[0].system_role == "CURINGROLE" && $scope.selectedQ["queue_id"] == 18) {
                let index = $scope.formElements.FORM_CONTROL.findIndex(x => x.PARAM_NAME == 'Curing Team Remarks');
                // console.log("index curing", index);
                if (index > -1) {
                  $scope.formElements.FORM_CONTROL.splice(index, 1);
                }
              }
              console.log($scope.formElements);
              $scope.setformElementsParamGroup(obj);
              if($scope.form[0].form_id == "22"){
                let count = 0;
                if(count<1){
                  $scope.getJsonDataUCIC();
                  count =count+1;
                }
              }
              // SAME_PAN_LINKED_WITH_AADHAAR NA handling - 25Sept25
              if($scope.form[0].form_id =='23'){
                $scope.DOPSPANLINKAADHAARSTATUS();
              }
              // SMART PAY - 4july25 //SMART PAY Dynamic Rejection disable in IP Funding Tab
               if($scope.form[0].form_id == "25"){
                $scope.SPREJECTIONDISABLELISTIPFUNDING('Entity');
                $scope.SPIPFUNDINGPAYMENTGATEWAYFIELDSCall('Entity'); //SMART PAY - PAYMENT_STATUS PAID/MULTIPLE PAID HANDLING - 21Nov25
              } 
              //SMART PAY Dynamic Rejection disable in IP Funding Tab
              if($scope.form[0].form_id == "50"){
                $scope.SPREJECTIONDISABLELISTIPFUNDING('SA');
                $scope.SPIPFUNDINGPAYMENTGATEWAYFIELDSCall('SA'); //SMART PAY - PAYMENT_STATUS PAID/MULTIPLE PAID HANDLING - 21Nov25

              }
              //SMART PAY Dynamic Rejection disable in IP Funding Tab
              if($scope.form[0].form_id != '25' && $scope.form[0].form_id != '50') {
                $scope.SPREJECTIONDISABLELISTETB();
            }
            // CKYC implementation
            if ($scope.form[0].form_id == '705') {

              let ckycDetails = $scope.GetJSONData?.AOF_INDI?.CKYCSearchResult?.ckycIDDetails || [];
          
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
            console.log('Error from ', 'spformelementresultcomp');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };
    $scope.getJsonDataUCIC = function () {
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
              document.querySelectorAll('[id="UCIC Number"]').forEach(element=> 
                {
                  if(element){
                     element.value =  NewJOSN.AOF_INDI.ENTITY_DATA?.UCIC_NUM?NewJOSN.AOF_INDI.ENTITY_DATA?.UCIC_NUM:$scope.GetJSONData.AOF_INDI.ENTITY_DATA?.UCIC_NUM;
                    }            
                  });       
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
              : $scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC.AMLOCK || "",
            x_crilic_array: JSON.stringify(Crilic_arr) || "",
            x_crilic_value: sessionStorage.getItem("CRILC")
              ? sessionStorage.getItem("CRILC")
              : $scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC.CRILC || "",
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
              // if ($scope.selectedQ["queue_id"] == "21" || $scope.selectedQ["queue_id"] == "22") {
              //   return;
              // }

              if (btn.ACTION_NAME == "REJECT") {
                $scope.getSetJSON(btn, "R");
              } else if (btn.ACTION_NAME == "HOLD") {
                $scope.getSetJSON(btn, "R");
              }
              $scope.buttonAction(btn, "N");
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
            console.log('Error from ', 'spamlockcrilicarrayinsert');
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
        $scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC
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
        $scope.selectedQ["queue_id"] == 20 ||
        $scope.selectedQ["queue_id"] == 23 ||
        $scope.selectedQ["queue_id"] == 19 ||
        $scope.loginServiceData[0].system_role == "SIGN" ||
        $scope.loginServiceData[0].system_role == "ADMINROLE" ||
        $scope.loginServiceData[0].system_role == "CURINGROLE"
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
                if (res.data.spgetdocumentqueuelistdocdownloadcomp[0].data.length > 0) {
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
                    message: "No document is available",
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
              console.log('Error from ', 'spgetdocumentqueuelistdownloadcomp');
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
          } else if (param.PARAM_DESC == "Do you want to display the name of your nominee on Fixed deposit advice/Statement of Accounts and/or other documents/letters?") {
            param.JSON_NAME = 'DISPLAY_FD';
            if($scope.GetJSONData.AOF_INDI.ENTITY_DATA.NOMINEE_ENTERED.VALUE=='Yes'){
              $scope.leadFormData.DISPLAY_FD = 'Yes';
            }
           else{
            $scope.leadFormData.DISPLAY_FD = '';
           }
            // console.log('1373 - ', param, $scope.leadFormData);
          } else {
            if (
              json == "AOF_INDI.ENTITY_DATA.MHOLDER[0].AADHAAR_VIEW.AADHAAR_ID"
            ) {
              if (
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.MHOLDER[0].KYC_TYPE
                  .VALUE == "QR Code"
              ) {
                $scope.leadFormData[json] =
                  "XXXXXXXXX" + initVal.substr(initVal.length - 4);
              } else {
                $scope.leadFormData[json] = initVal;
              }
            } else if (
              json == "AOF_INDI.ENTITY_DATA.HOLDER[0].AADHAAR_VIEW.AADHAAR_ID"
            ) {
              if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].WS_TEMP &&
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].WS_TEMP.KYC_BY &&
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].WS_TEMP.KYC_BY
                  .VALUE == "QR Code"
              ) {
                $scope.leadFormData[json] =
                  "XXXXXXXXX" + initVal.substr(initVal.length - 4);
              } else {
                $scope.leadFormData[json] = initVal;
              }
            } else if (json == "AOF_INDI.ENTITY_DATA.SHOP_SUB_DATE") {
              if (initVal) {
                var Subdate = initVal.split("/");
                $scope.leadFormData[json] =
                  Subdate[0] + "-" + Subdate[1] + "-" + Subdate[2];
              }
            } else if (json == "AOF_INDI.ENTITY_DATA.SWEEP_CAFD.END_DATE") {
              $scope.leadFormData[json] = $scope.end_date;
            } else if (json == "AOF_INDI.ENTITY_DATA.SWEEP_CAFD.START_DATE") {
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
              //     $scope.GetJSONData.AOF_INDI.ENTITY_DATA['AMLOCK_CRILC']={};
              //     $scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC['AMLOCK']=res.data.spamlockgetarray[0].data[0].amlock_array_value;
              //     $scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC['CRILC']=res.data.spamlockgetarray[0].data[0].crilic_array_value;
              //    }

              if (res.data.spamlockgetarray[0].data.length == 0) {
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA["AMLOCK_CRILC"] = {};
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC["AMLOCK"] =
                  sessionStorage.getItem("AMLOCK") || null;
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC["CRILC"] =
                  sessionStorage.getItem("CRILC") || null;
              } else {
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA["AMLOCK_CRILC"] = {};
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC["AMLOCK"] =
                  sessionStorage.getItem("AMLOCK")
                    ? sessionStorage.getItem("AMLOCK")
                    : res.data.spamlockgetarray[0].data[0].amlock_array_value;
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC["CRILC"] =
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
            console.log('Error from ', 'spamlockgetarray');
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
          if ($scope.form[0].form_id == "23") {
            // if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.CREDIT_FACILITY.DECLARATION.VALUE) {
            //   let code = $scope.GetJSONData.AOF_CP.ENTITY_DATA.CREDIT_FACILITY.DECLARATION.VALUE;
            //   $scope.optionalField['LOVY_DOPS_DECL'][0].VALUE = code;
            // }
            if($scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].ADH_PAN_NAME_DECLARATION.CODE=='1'){
              $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].ADH_PAN_NAME_DECLARATION.VALUE =$scope.optionalField['LOVY_DOPS_INDI_AADHAR'][0].VALUE
            }
            if($scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].FATCA_DECLARATION.CODE=='1'){

            
              $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].FATCA_DECLARATION.VALUE =$scope.optionalField['LOVY_DOPS_DECL_FATCA'][0].VALUE;
          }
        }
          if ($scope.form[0].form_id == "43") {
            // if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.CREDIT_FACILITY.DECLARATION.VALUE) {
            //   let code = $scope.GetJSONData.AOF_CP.ENTITY_DATA.CREDIT_FACILITY.DECLARATION.VALUE;
            //   $scope.optionalField['LOVY_DOPS_DECL'][0].VALUE = code;
            // }
            $scope.optionalField['LOVY_DOPS_DECL'][0].VALUE = $scope.declaration_content;
          }
         
          if($scope.form[0].form_id == "33"){
            // $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].CREDIT_DECLARATION.VALUE = $scope.optionalField['LOVY_DOPS_CREDITFACILITY_CONSENT'][0].VALUE;
            $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].FATCA_DECLARATION.CODE = $scope.optionalField['LOVY_DOPS_FTCR_DECLERATION'][0].VALUE; 
            $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].CREDIT_DECLARATION.CODE = $scope.optionalField['LOVY_DOPS_CIBIL_CONSENT_DECLARATION'][0].VALUE;
            
          }
          //for nudges requierement handle the upi id check box
          if($scope.form[0].form_id == "67"){
            // $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].CREDIT_DECLARATION.VALUE = $scope.optionalField['LOVY_DOPS_CREDITFACILITY_CONSENT'][0].VALUE;
            $scope.GetJSONData.AOF_INDI.ENTITY_DATA.ERP_UPI_ID.CODE = $scope.optionalField['LOVY_DOPS_UPI_ID'][0].VALUE; 
          }
        }
        return;
      });
      console.log('optional field', $scope.optionalField);
    };

    $scope.saveJSONForm = function (btn, obj) {
      console.log('btn_id', btn[0].form_id);
      QueueService.setPreviousTab(btn);
      for (i = 0; i < $scope.ovCardData.OV_TABS.length; i++) {
        if (btn[0].form_id == $scope.ovCardData.OV_TABS[i].form_id) {
          if (
            btn[0].form_id == "30" ||
            btn[0].form_id == "31" ||
            btn[0].form_id == "40" ||
            btn[0].form_id == "41" ||
            btn[0].form_id == "690"||
            btn[0].form_id == "705"||
            btn[0].form_id == "710"||
            (btn[0].form_id == "28" &&
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
          }
          // else if(btn[0].form_id == "28"){
          //   $scope.getReviewKYCDate();
          // }
          else if(btn[0].form_id == '66' && $scope.loginServiceData[0].system_role !== 'BS') {
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
          }
           else {
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
          $scope.loginServiceData[0].system_role == "SWEEP" ||
          ($scope.loginServiceData[0].system_role == "ACC" && $scope.selectedQ["queue_id"]==100)
        ) {
          return true;
        } else if (
          ($scope.X_tabJSONObj.length == ($scope.max_tab - 1) &&
            $scope.selectedQ["queue_id"] == 1) ||
          $scope.X_tabJSONObj.length == $scope.max_tab
        ) {
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
                    return true;
                  }else{
                    dmDialogueBox.alertBox({
                      title: "Alert",
                      message:
                        "Kindly Enter Remarks in Supervisor checklist tab corresponding to each Flag to proceed further.",
                      actionLabel: ["Ok"],
                    });
                  }
                }else{
                  // return true;
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
              !$scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC.CRILC.VALUE &&
              !$scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC.CRILC.VALUE
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
              $scope.GetJSONData.AOF_INDI.ENTITY_DATA.hasOwnProperty(
                "AMLOCK_CRILC"
              ) &&
              $scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC.hasOwnProperty(
                "AMLOCK"
              ) &&
              $scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC.hasOwnProperty(
                "CRILC"
              ) 
            ) {
                if(!$scope.VKYCDocLength&&$scope.selectedGrid.x_lead_source == 'DIY_INDIVIDUAL'
                )
                { 
                  console.log("LENGTH",$scope.VKYCDocLength);
                return true;
              } 
           else if (
                !$scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC.AMLOCK &&
                !$scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC.CRILC
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
          } else if (
            $scope.loginServiceData[0].system_role == "ACC" &&
            $scope.RejectionQueueData
          ) {         
              if ($scope.selectedQ["queue_id"] == 23) {
                let arr = [];
                $scope.red_tabs_fields.forEach((element) => {
                  arr = [...element.field_name, ...arr];
                })
  
                // console.log('Line: 2534', $scope.red_tabs_fields, 'map', arr.map(x => x.update_flag));
  
                if (arr.map(x => x.update_flag).includes(false)) {
                  dmDialogueBox.alertBox({
                    title: "Alert",
                    message:
                      "Kindly update all marked fields in each marked tab",
                    actionLabel: ["Ok"],
                  });
                  return false;
                } else {
                  return true;
                }
              }
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
            
            
          } else if (
            $scope.loginServiceData[0].system_role == "CURINGROLE" &&
            $scope.RejectionQueueData) {
            if ($scope.RejectionQueueData[0].STATUS == "N") {
              return true;
            } else {
              let check = [];
              for (var key in $scope.remarks_cards) {
                if ($scope.remarks_cards.hasOwnProperty(key) && key.includes('exist')) {
                  check.push($scope.remarks_cards[key]);
                }
              }
              if (!check.includes(false)) {
                return true;
              } else {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message:
                    "Kindly add remarks against each rejection in remarks tab.",
                  actionLabel: ["Ok"],
                });
                return false;
              }
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
          $scope.loginServiceData[0].system_role == "RECON" ||
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
          ($scope.X_tabJSONObj.length == ($scope.max_tab - 1) &&
            $scope.selectedQ["queue_id"] == 1) ||
          $scope.X_tabJSONObj.length == $scope.max_tab
        ) {
          if (
            $scope.loginServiceData[0].system_role == "DVUC" &&
            $scope.RejectionQueueData
          ) {
            if (
              !$scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC.AMLOCK ||
              !$scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC.CRILC
            ) {
              return true;
            } else if (
              $scope.RejectionQueueData[0].STATUS == "N"
              // &&  $scope.cibil_pdf_status
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
            if(!$scope.VKYCDocLength&&$scope.selectedGrid.x_lead_source == 'DIY_INDIVIDUAL')
            { 
              console.log("LENGTH",$scope.VKYCDocLength);
            return true;
          } 
       else
          if (
              !$scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC.AMLOCK ||
              !$scope.GetJSONData.AOF_INDI.ENTITY_DATA.AMLOCK_CRILC.CRILC
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
          // else if ($scope.loginServiceData[0].system_role == "CURINGROLE") {
          //   return false;
          // }
        } else return true;
      }
      if (btn.ACTION_NAME == "EXIT") {
        return false;
      }
    };
    $scope.getNomineeValue = function () {
      if (
        $scope.GetJSONData.AOF_INDI.ENTITY_DATA.NOMINEE_ENTERED.VALUE === "No"
      ) {
        return "13"; //2
      } else if (
        $scope.GetJSONData.AOF_INDI.ENTITY_DATA.NOMINEE_ENTERED.VALUE === "Yes"
      ) {
        return "7"; //1
      } else {
        return "";
      }
    };

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
            console.log('Error from ', 'SEND_SMS_YBL');
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
            console.log('Error from ', 'spauditdatamaintainlog');
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
              if ($scope.loginServiceData[0].system_role == "CURINGROLE") {
                $scope.create_remarks_card();
              }
              $scope.arrayofpdf = $scope.searchSequentially(
                $scope.RejectionQueueData,
                "STATUS",
                ["BS_APPROVE", "RM_RESOLVED", "DVUC_APPROVE"] // Search these sequentially
              );
              $scope.countForPdf = $scope.arrayofpdf.length;


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
            console.log('Error from ', 'spgetrejectiondetail');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };
    // SAME_PAN_LINKED_WITH_AADHAAR NA handling - 25Sept25
$scope.DOPSPANLINKAADHAARSTATUS = function () {
  var body = {
    SPDOPSPANLINKAADHAARSTATUS: [
      {
        x_lead_id: $scope.selectedGrid.x_lead_id,
        x_constitution: 'INDIVIDUAL',
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
//SMART PAY - PAYMENT_STATUS PAID/MULTIPLE PAID HANDLING - 21Nov25
$scope.SPIPFUNDINGPAYMENTGATEWAYFIELDSCall = function (journey) {
  var body = {
    SPIPFUNDINGPAYMENTGATEWAYFIELDS: [
      {
        x_lead_id: $scope.selectedGrid.x_lead_id,
        x_constitution:journey=='SA'?'INDIVIDUAL_SA':'INDIVIDUAL',
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
        sprejectionactionindividual: [
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
            console.log("**/* sprejectionactionindividual*/**", res);
            if (res.data["sprejectionactionindividual"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["sprejectionactionindividual"][0].hasOwnProperty("data")
            ) {
              $scope.rejectioSubmit = JSON.parse(
                res.data.sprejectionactionindividual[0].data[0].v_string
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
            console.log('Error from ', 'sprejectionactionindividual');
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
            console.log('Error from ', 'spgetrejectionsublist');
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
            console.log('Error from ', 'sprejarrayinsert');
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
                console.log('REJ_LIST', $scope.getRejectionList);
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
                //   $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].PENDING_REJECTION_COUNT=$scope.count.length;
                //   $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].REJECTED_BY=$scope.loginServiceData[0].system_role;
                //   if($scope.loginServiceData[0].system_role=='DVUM' || $scope.loginServiceData[0].system_role=='ACC' ){
                //   $scope.GetJSONData.AOF_INDI.WORKFLOW_STATUS.STATUS=$scope.loginServiceData[0].system_role+'_REJECTED';
                // }else{
                //   $scope.GetJSONData.AOF_INDI.WORKFLOW_STATUS.STATUS='REJECTED';
                // }
                //   $scope.GetJSONData.AOF_INDI.WORKFLOW_STATUS.STATUS_TIMESTAMP = today;

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
            console.log('Error from ', 'sprejectionlist');
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
            console.log('Error from ', 'spfounderbs');
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
        $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.MSME_SINGLE !== undefined
      ) {
        if (
          $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.MSME_SINGLE.VALUE ||
          $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.MSME_BULK ||
          $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.MSME_SALARY
        ) {
          return "Yes";
        }
        else if (
          $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.MSME_SINGLE ||
          $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.MSME_BULK ||
          $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.MSME_SALARY
        ) {
          return "Yes";
        } else {
          return "No";
        }
      } else {
        return "";
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
        $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.KIT_TYPE.VALUE ==
        "Non Insta"
      )
        return "Non-IKIT";
      else if (
        $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.KIT_TYPE.VALUE == "Insta"
      )
        return "I Kit";
    };

    // $scope.newgen_createCase = function (btn, set_status) {
    //   var body = {
    //     AO_CASE_INITIATION: [
    //       {
    //         ackn_date: $scope.change_dateFormat(
    //           $scope.GetJSONData.AOF_INDI.ENTITY_DATA.LEAD_SINCE
    //         ),
    //         app_form_date: $scope.change_dateFormat(
    //           $scope.GetJSONData.AOF_INDI.ENTITY_DATA.LEAD_SINCE
    //         ),
    //         barcode: $scope.selectedGrid.x_lead_id2,
    //         buss_segment:
    //           $scope.GetJSONData.AOF_INDI.ENTITY_DATA.RM_DECLARATION.Buss_segment
    //             .VALUE,
    //         ca_acc_type: $scope.getacc(),
    //         ca_account_no: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.ACC_NUMBER,
    //         ca_aof_identifier: "New",
    //         ca_base_prod_type: "Non - Individual",
    //         ca_constitution_field: "SOLE PROPRIETOR",
    //         ca_mandate_holder: "No",
    //         ca_nominee:
    //           $scope.GetJSONData.AOF_INDI.ENTITY_DATA.NOMINEE_ENTERED.VALUE,
    //         ca_prod_code:
    //           $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PRODUCT_CODE.CODE,
    //         ca_prod_name: "",
    //         channel_type: "DECIMAL",
    //         contact_no: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].MOBILE,
    //         cust_category:
    //           $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT
    //             .VALUE,
    //         cust_id: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.CUST_ID || "",
    //         cust_name:
    //           $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].SEL_ENTITY_NAME,
    //         cust_type: "New",
    //         fatca_annexure:
    //           $scope.GetJSONData.AOF_INDI.ENTITY_DATA.CUSTOMER_TAX_CITIZEN.VALUE,
    //         fatca_applicable: "YES",
    //         lead_id: $scope.selectedGrid.x_lead_id2,
    //         main_appl_pan_number:
    //           $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].PAN_NO,
    //         mdm_id: "",
    //         msme: $scope.getMsmeValue(),
    //         negative_chklist: "Yes",
    //         opening_branch_id:
    //           $scope.GetJSONData.AOF_INDI.ENTITY_DATA.BRANCH.BRANCH_CODE.CODE,
    //         opening_branch_name: "",
    //         pan_detail: "PAN",
    //         prewelcomecalling: "Completed",
    //         prod_opt: " CURRENT",
    //         scanning_decision: "No",
    //         session_id: "",
    //         source_branch_id:
    //           $scope.GetJSONData.AOF_INDI.ENTITY_DATA.BRANCH.BRANCH_CODE.CODE,
    //         source_branch_name: "",
    //         sourcing_rm_code:
    //           $scope.GetJSONData.AOF_INDI.ENTITY_DATA.RM_DECLARATION.sourceCode,
    //         threeinone_ao: "No",
    //         newgen_leadid: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.LEADiD,
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

    $scope.generated_TrackerID = "";

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
      if ($scope.selectedQ["queue_id"] == 23) {
        var body = {
          AO_CASE_INITIATION_DIY: [
            {
              ackn_date: $scope.change_dateFormat(
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.LEAD_SINCE
              ),
              app_form_date: $scope.change_dateFormat(
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.LEAD_SINCE
              ),
              barcode: $scope.selectedGrid.x_lead_id2,
              buss_segment: null,
              ca_acc_type: $scope.getacc(),
              ca_account_no: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.ACC_NUMBER,
              ca_aof_identifier: "New",
              ca_base_prod_type: "Individual",
              ca_constitution_field: $scope.selectedGrid.x_lead_source,
              ca_mandate_holder: "No",
              ca_nominee: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.NOMINEE_ENTERED.VALUE,
              ca_prod_code: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PRODUCT_CODE.CODE,
              ca_prod_name: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PRODUCT_CODE.VALUE,
              channel_type: "DECIMAL DIY",
              contact_no: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].MOBILE,
              cust_category:$scope.removeRecommended($scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT
                .VALUE),
              cust_id: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.CUST_ID || "",
              cust_name: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0]?.AADHAAR_VIEW?.FIRST_NAME?$scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0]?.AADHAAR_VIEW?.FIRST_NAME:$scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0]?.CKYC?.FIRST_NAME,
              cust_type: "New",
              fatca_annexure: null,
              fatca_applicable: "YES",
              lead_id: $scope.selectedGrid.x_lead_id2,
              main_appl_pan_number: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].PAN_NO,
              mdm_id: "",
              msme: $scope.getMsmeValue(),
              negative_chklist: "Yes",
              opening_branch_id: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.BRANCH.BRANCH_CODE.CODE,
              opening_branch_name: "",
              pan_detail: "PAN",
              prewelcomecalling: "Completed",
              prod_opt: " CURRENT",
              scanning_decision: "No",
              session_id: "",
              source_branch_id: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.BRANCH.BRANCH_CODE.CODE,
              source_branch_name: "",
              sourcing_rm_code: null,
              threeinone_ao: "No",
              newgen_leadid: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.LEADID ? $scope.GetJSONData.AOF_INDI.ENTITY_DATA.LEADID : "",
            },
          ],
        };
      } else {
        //CKYC 
let holder = $scope.GetJSONData?.AOF_INDI?.ENTITY_DATA?.HOLDER?.[0] || {};
let search = holder?.CKYC_SEARCH_RESPONSE?.CKYCSearchResult || {};
let status = holder?.CKYC_STATUS_RESPONSE || {};
let idDetails = search?.ckycIDDetails?.[0] || {};
let identity = status?.ckycIDDetails?.ckycIdentityDetails?.[0] || {};
//CKYC
        if(($scope.GetJSONData.AOF_INDI.ENTITY_DATA.DEDUPE_CUST_TYPE=='ETB' || $scope.GetJSONData.AOF_INDI.ENTITY_DATA.DEDUPE_CUST_TYPE=='etb')){
          cust_type_value='Existing';
        }else{
          cust_type_value='New';
          }
        var body = {
          AO_CASE_INITIATION_DIY: [
            {
              ackn_date: $scope.change_dateFormat(
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.LEAD_SINCE
              ),
              app_form_date: $scope.change_dateFormat(
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.LEAD_SINCE
              ),
              barcode: $scope.selectedGrid.x_lead_id2,
              buss_segment:$scope.selectedGrid.x_lead_source=='DIY_INDIVIDUAL' ? null:
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.RM_DECLARATION.BUSS_SEGMENT
                  .VALUE,
              ca_acc_type: $scope.getacc(),
              ca_account_no: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.ACC_NUMBER,
              ca_aof_identifier: "New",
              ca_base_prod_type: "Individual",
              ca_constitution_field: $scope.selectedGrid.x_lead_source,
              ca_mandate_holder: "No",
              ca_nominee:
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.NOMINEE_ENTERED.VALUE,
              ca_prod_code: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PRODUCT_CODE.CODE,
              ca_prod_name: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PRODUCT_CODE.VALUE,
              channel_type: $scope.selectedGrid.x_lead_source=='DIY_INDIVIDUAL' ? "DECIMAL DIY" : "DECIMAL",
              contact_no: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].MOBILE,
              cust_category:$scope.removeRecommended($scope.GetJSONData.AOF_INDI.ENTITY_DATA.PRODUCT.PROGRAM_VARIANT
                .VALUE),
              cust_id: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.CUST_ID || "",
              // cust_name:
              //   $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].AADHAAR_VIEW.FIRST_NAME,
                cust_name: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0]?.AADHAAR_VIEW?.FIRST_NAME?$scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0]?.AADHAAR_VIEW?.FIRST_NAME:$scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0]?.CKYC?.FIRST_NAME,
                cust_type:$scope.selectedGrid.x_lead_source=='DIY_INDIVIDUAL' ?'New':cust_type_value,
              fatca_annexure:$scope.selectedGrid.x_lead_source=='DIY_INDIVIDUAL' ?null:
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.CITIZENSHIP.VALUE,
              fatca_applicable: "YES",
              lead_id: $scope.selectedGrid.x_lead_id2,
              main_appl_pan_number:
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].PAN_NO,
              mdm_id: "",
              msme: $scope.getMsmeValue(),
              negative_chklist: "Yes",
              opening_branch_id:
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.BRANCH.BRANCH_CODE.CODE,
              opening_branch_name: "",
              pan_detail: "PAN",
              prewelcomecalling: "Completed",
              prod_opt: " CURRENT",
              scanning_decision: "No",
              session_id: "",
              source_branch_id:
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA.BRANCH.BRANCH_CODE.CODE,
              source_branch_name: "",
              sourcing_rm_code:$scope.selectedGrid.x_lead_source=='DIY_INDIVIDUAL' ?null:
                $scope.GetJSONData.AOF_INDI.ENTITY_DATA?.RM_DECLARATION?.sourceCode,
              threeinone_ao: "No",
              newgen_leadid: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.LEADID?$scope.GetJSONData.AOF_INDI.ENTITY_DATA.LEADID:'',
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
      }
      $scope.showLoader("Loading...");
      console.log(body);
      if ($scope.countForNewgen < 1) {
        executeApi(newplatwareHeader, body, function (res) {
          $scope.countForNewgen = $scope.countForNewgen + 1;
          $scope.$apply(function () {
            $scope.hideLoader();
            if (res.status == true) {
              console.log("**/* AO_CASE_INIT_DIY */**", res);
              if (res.data["AO_CASE_INIT_DIY"][0].hasOwnProperty("error")) {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (res.data["AO_CASE_INIT_DIY"][0].hasOwnProperty("data")) {
                if (res.data.AO_CASE_INIT_DIY[0].data[0].response_type == "I") {
                  var response_data = res.data.AO_CASE_INIT_DIY[0].data[0];
                  console.log(response_data.response["trackerId"]);
                  if (response_data.response["trackerId"]) {
                    $scope.generated_TrackerID = response_data.response["trackerId"];
                    if (($scope.selectedQ["queue_id"] == 7 && $scope.selectedGrid.x_lead_source=='DIY_INDIVIDUAL') || $scope.selectedQ["queue_id"] == 23) {
                      $scope.insertTrackerID($scope.generated_TrackerID);
                    }
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
                          console.log('Error from ', 'newgen_createCase');
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
                  res.data.AO_CASE_INIT_DIY[0].data[0].response_type == "E"
                ) {
                  dmDialogueBox.alertBox({
                    title: "Message",
                    message: res.data.AO_CASE_INIT_DIY[0].data[0].response_message,
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
              console.log('Error from ', 'newgen_createCase');
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
      if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.hasOwnProperty('REASSIGN_LOGINID')) {
        if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.REASSIGN_LOGINID == "") {
          if (obj.split("-")[0] == $scope.GetJSONData.AOF_INDI.USER_DETAILS.FO_ID) {
            isFO_same = true;
          }
        }
        if (obj.split("-")[0] == $scope.GetJSONData.AOF_INDI.ENTITY_DATA.REASSIGN_LOGINID) {
          isFO_same = true;
        }
      } else {
        if (obj.split("-")[0] == $scope.GetJSONData.AOF_INDI.USER_DETAILS.FO_ID) {
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
                  console.log('Error from ', 'spleadreassign');
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
              console.log('Error from ', 'spleadreassign');
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
              //  $scope.GetJSONData.AOF_INDI.WORKFLOW_STATUS.STATUS="DISCARD";
              // $scope.setJSONUpdate('DISCARD');
              // $scope.discard_lead();
              if (
                (
                    ($scope.selectedQ["queue_id"] == "5" || $scope.selectedQ["queue_id"] == "6") &&
                    ($scope.loginServiceData[0].system_role == "DVUM" || $scope.loginServiceData[0].system_role == "DVUC") &&
                    $scope.selectedGrid.x_lead_source == 'INDIVIDUAL'
                )
                ||
                (
                    $scope.selectedQ["queue_id"] == "3" &&
                    $scope.loginServiceData[0].system_role == "BS" &&
                    $scope.selectedGrid.x_lead_source == 'INDIVIDUAL'
                )
            ) {
                $scope.drop_status_fun();
            } else {
                $scope.discard_lead();
            }
            
          }
        });
    };

    $scope.current_popup_name = "";
    $scope.drop_type=null;
    $scope.Drop_check_popup=false;
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
            console.log('Error from ', 'spleaddiscard');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };
    //for insert discard reason
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
      var ROLES = ["DVUM", "DVUC", "SWEEP", "ACC", "SIGN"];
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
      if(btn.ACTION_NAME == "ACCEPT"){
        if ($scope.loginServiceData[0].system_role == 'DVUM' || $scope.loginServiceData[0].system_role == 'DVUC') {
          let holder = $scope.GetJSONData?.AOF_INDI?.ENTITY_DATA?.HOLDER?.[0];

          let name = holder?.AADHAAR_VIEW?.NAME?.toLowerCase() 
                  || holder?.CKYC?.CKYC_NAME?.toLowerCase() 
                  || "";

          let pepDeclCheck = $scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].PEP_DECLARATION.CODE
          if ((name.includes('urf') || name.includes('alias'))&&(pepDeclCheck =='3'||pepDeclCheck=='')) {
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
          }else if(!(name.includes('urf') || name.includes('alias'))&&((pepDeclCheck =='1')||(pepDeclCheck =='2')) && ($scope.selectedQ["queue_id"]===5 || $scope.selectedQ["queue_id"]===6 || $scope.selectedQ["queue_id"]===22 || $scope.selectedQ["queue_id"]===21)){
            dmDialogueBox.alertBox({
              title: "Message",
              message: "Customer is politically exposed person. Kindly perform due diligence",
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
          // }else if((name.includes('urf') || name.includes('alias')) && ((pepDeclCheck =='1')||(pepDeclCheck =='2')) && $scope.selectedQ["queue_id"]===21){
          //   dmDialogueBox.alertBox({
          //     title: "Message",
          //     message: "Customer name is with Alias / URF. Kindly perform due diligence",
          //     actionLabel: ["Ok"],
          //   }).
          //     then(function (res) {
          //       // function here to be executed
          //       if (res) {
          //         dmDialogueBox
          //           .confirmBox({
          //             title: "Message",
          //             message: msg,
          //             actionLabel: ["No", "Yes"],
          //           })
          //           .then(function (res) {
          //             // function here to be executed
          //             if (res) {
          //               $scope.submitLeadData(btn);
          //             }
          //           });
          //       }
          //     });
          }else if((name.includes('urf') || name.includes('alias')) && ((pepDeclCheck =='1')||(pepDeclCheck =='2')) && ($scope.selectedQ["queue_id"]===5 || $scope.selectedQ["queue_id"]===21 || $scope.selectedQ["queue_id"]===22 || $scope.selectedQ["queue_id"]===6)){
            dmDialogueBox.alertBox({
              title: "Message",
              message: "Customer is politically exposed person. Kindly perform due diligence",
              actionLabel: ["Ok"],
            }).
              then(function (res) {
                // function here to be executed
                if (res) {
                  dmDialogueBox
                    .alertBox({
                      title: "Message",
                      message: "Customer name is with Alias / URF. Kindly perform due diligence",
                      actionLabel: ["Ok"],
                    })
                    .then(function (res) {
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
                }
              });
          }else {
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
        else if($scope.get_login_role()) {
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
          }
          else {
            $scope.submitLeadData(btn);
           
          }
        
      }
      else if(btn.ACTION_NAME!=='ACCEPT' && $scope.get_login_role()){
        if(btn.ACTION_NAME=='Discard'  && ($scope.loginServiceData[0].system_role == 'DVUM'||$scope.loginServiceData[0].system_role == 'DVUC')){
          $scope.submitLeadData(btn);
        }else{
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
      }else if(temp.length > 0 && $scope.loginServiceData[0].system_role == 'BS' ){
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
        $scope.SPGETCUSTOMERPDF_DB_case_reject_scrutiny();
        $scope.set_workstep(btn);
      } else if (btn.ACTION_NAME == "HOLD") {
        $scope.SPGETCUSTOMERPDF_DB_case_reject_scrutiny();
        $scope.set_workstep(btn);
      } else if (btn.ACTION_NAME == "ACCEPT") {
        $scope.button_values = btn;
        if ($scope.disabledButton_accept(btn)) {
          if ($scope.loginServiceData[0].system_role == "BS") {
            if ($scope.openPopupcheckConfirm == false) {
              $scope.openPopupcheck = true;
            } else $scope.buttonAction(btn, "N");
          } else if ($scope.loginServiceData[0].system_role == "SIGN") {
            $scope.newgenCheck = true; //will disable this in AUTO GEFU
            $scope.newgen_createCase(btn, "Y"); //will disable this in AUTO GEFU
          } else if (
            $scope.loginServiceData[0].system_role == "DVUM" ||
            $scope.loginServiceData[0].system_role == "DVUC"
          ) {
            // $scope.gefuCheck = true;
            if ($scope.selectedQ["queue_id"].toString() !== "22")
             {
              // $scope.Generate_GEFU(btn,(status)=>{
              //   if(status){
              //     $scope.amlock_crilic_array(btn);
              //   }
               
              // } ); 
              $scope.Generate_GEFU(btn);          
            } else {
              $scope.amlock_crilic_array(btn);
            }
          } else if ($scope.loginServiceData[0].system_role == "ACC") {
            // $scope.getCust_ID(btn, "N");
            $scope.gefuCheck = true;
            if ($scope.selectedQ["queue_id"] == "23") {
              $scope.Generate_GEFU(btn);
            } else {
              $scope.buttonAction(btn, "N");
            }
          } else {
            $scope.buttonAction(btn, "N");
          }
        }
      } else if (btn.ACTION_NAME == "EXIT") {
        if (
          // $scope.selectedQ["queue_id"] == "1" ||
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
        // $scope.download_GEFU();
        $scope.download_GEFU_DIY();
      }else if(btn.ACTION_NAME =="GEFU SA"){
        $scope.download_GEFU_SA();
      } else if (btn.ACTION_NAME == "Reassign") {
        $scope.reassign_Popup = true;
      } else if (btn.ACTION_NAME == "Discard") {
        $scope.Delete_lead();
      }else if(btn.ACTION_NAME == "GEFU SA"){
        $scope.download_GEFU_SA();
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
            console.log('Error from ', 'spexitlead');
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
            codeAccNo: $scope.GetJSONData.AOF_INDI.ENTITY_DATA.ACC_NUMBER || "",
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
              //$scope.GetJSONData.AOF_INDI.ENTITY_DATA.AUS_CUST_ID=res.data.AUS_CUSTACCOUNTREL[0].data[0].response.CodCust;
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
            console.log('Error from ', 'AUS_CUSTACCOUNTREL');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };
   //  made changes in this function for AUTO GEFU
    $scope.buttonAction = function (btn, set_status) {
      let prc_id = "";
      let prc_grp = "";
      if (($scope.loginServiceData[0].system_role == "DVUM" && $scope.selectedQ["queue_id"] == 21) ||
        ($scope.loginServiceData[0].system_role == "DVUC" && $scope.selectedQ["queue_id"] == 22)) {
        if (btn.ACTION_NAME == "REJECT") {
          prc_id = "YBL_DIY_" + $scope.loginServiceData[0].x_prc_grp + btn.ACTION_NAME;
          prc_grp = "DIY_" + $scope.loginServiceData[0].x_prc_grp;
        } else {
          prc_id = "YBL_" + $scope.loginServiceData[0].x_prc_grp + btn.ACTION_NAME;
          prc_grp = $scope.loginServiceData[0].x_prc_grp;
        }
      } else if ($scope.loginServiceData[0].system_role == "CURINGROLE" && $scope.selectedQ["queue_id"] == 18) {
        if (btn.ACTION_NAME == "ACCEPT") {
          prc_id = "YBL_DIY_" + $scope.loginServiceData[0].x_prc_grp + btn.ACTION_NAME;
          prc_grp = "DIY_" + $scope.loginServiceData[0].x_prc_grp;
        }
      } else {
        prc_id = "YBL_" + $scope.loginServiceData[0].x_prc_grp + btn.ACTION_NAME;
        prc_grp = $scope.loginServiceData[0].x_prc_grp;
      }

      if (
        btn.ACTION_NAME == "REJECT" &&
        ($scope.loginServiceData[0].system_role == "DVUM" ||
          $scope.loginServiceData[0].system_role == "DVUC")
      ) {
        if ($scope.cibil_pdf_status && $scope.checkForAmlockRejection()) {
          $scope.sendCIBIL_Pdf_onMail();
        }
      }
      if ($scope.selectedQ["queue_id"] == "20") {
        $scope.setprc_bulk();
      } 
      else{ 
        if($scope.loginServiceData[0].system_role == "ACC"){
          if($scope.selectedGrid.x_lead_source == 'DIY_INDIVIDUAL' ){
            if(btn.ACTION_NAME !== "ACCEPT"){
            var body = {
              spsetprcgrpdispd2: [
                {
                  x_lead_id: $scope.selectedGrid.x_lead_id,
                  // x_prc_group: $scope.loginServiceData[0].x_prc_grp,
                  x_prc_group: prc_grp,
                  // x_new_disposition: $scope.loginServiceData[0].x_prc_grp,
                  x_new_disposition: prc_grp,
                  x_aof_id: $scope.selectedGrid.x_lead_id,
                  x_crn_no: "",
                  x_member_id: "",
                  x_is_isstart: "",
                  x_login_id: $scope.username,
                  // x_processid: "YBL_" + $scope.loginServiceData[0].x_prc_grp + btn.ACTION_NAME,
                  // x_processid: prc_id,
                  x_processid:$scope.selectedGrid.x_lead_source == 'DIY_INDIVIDUAL' ? prc_id : "YBL_" + $scope.loginServiceData[0].x_prc_grp + btn.ACTION_NAME,
                  // x_ref_input_1: $scope.loginServiceData[0].x_prc_grp,
                  x_ref_input_1: prc_grp,
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
                    } else {
                      $location.path("/home");
                    }
                  } else {
                    console.log('Error from ', 'buttonAction');
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
                console.log('Error from ', 'buttonAction');
                dmDialogueBox.alertBox({
                  title: "Server Error",
                  message: "Error Connecting to server..",
                  actionLabel: ["Ok"],
                });
              }
            });
          });
        }else{
          $scope.SignUpload();
          $scope.SPUPDATEACCACCEPTCASES();
          // $scope.newgenCheck = true;
          $scope.newgen_createCase(btn, "Y");
        }
          }else{
            if(btn.ACTION_NAME !== "ACCEPT"){
              var body = {
                spsetprcgrpdispd2: [
                  {
                    x_lead_id: $scope.selectedGrid.x_lead_id,
                    // x_prc_group: $scope.loginServiceData[0].x_prc_grp,
                    x_prc_group: prc_grp,
                    // x_new_disposition: $scope.loginServiceData[0].x_prc_grp,
                    x_new_disposition: prc_grp,
                    x_aof_id: $scope.selectedGrid.x_lead_id,
                    x_crn_no: "",
                    x_member_id: "",
                    x_is_isstart: "",
                    x_login_id: $scope.username,
                    // x_processid: "YBL_" + $scope.loginServiceData[0].x_prc_grp + btn.ACTION_NAME,
                    // x_processid: prc_id,
                    x_processid:$scope.selectedGrid.x_lead_source == 'DIY_INDIVIDUAL' ? prc_id : "YBL_" + $scope.loginServiceData[0].x_prc_grp + btn.ACTION_NAME,
                    // x_ref_input_1: $scope.loginServiceData[0].x_prc_grp,
                    x_ref_input_1: prc_grp,
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
                      } else {
                        $location.path("/home");
                      }
                    } else {
                      console.log('Error from ', 'buttonAction');
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
                  console.log('Error from ', 'buttonAction');
                  dmDialogueBox.alertBox({
                    title: "Server Error",
                    message: "Error Connecting to server..",
                    actionLabel: ["Ok"],
                  });
                }
              });
            });
            }else{
              $scope.SignUpload();
              $scope.SPUPDATEACCACCEPTCASES();
              if(($scope.GetJSONData.AOF_INDI.ENTITY_DATA.DEDUPE_CUST_TYPE=='ETB' || $scope.GetJSONData.AOF_INDI.ENTITY_DATA.DEDUPE_CUST_TYPE=='etb')){
                if($scope.GetJSONData.AOF_INDI.ENTITY_DATA?.ETB_SELECTED[0]?.customerId !=''){
                  $scope.acceptUpdateCoumnAPI();
                }
                 }
              $scope.newgenCheck = true;
                $scope.newgen_createCase(btn, "Y");
            }
          }
        }else{
          var body = {
            spsetprcgrpdispd2: [
              {
                x_lead_id: $scope.selectedGrid.x_lead_id,
                // x_prc_group: $scope.loginServiceData[0].x_prc_grp,
                x_prc_group: prc_grp,
                // x_new_disposition: $scope.loginServiceData[0].x_prc_grp,
                x_new_disposition: prc_grp,
                x_aof_id: $scope.selectedGrid.x_lead_id,
                x_crn_no: "",
                x_member_id: "",
                x_is_isstart: "",
                x_login_id: $scope.username,
                // x_processid: "YBL_" + $scope.loginServiceData[0].x_prc_grp + btn.ACTION_NAME,
                // x_processid: prc_id,
                x_processid:$scope.selectedGrid.x_lead_source == 'DIY_INDIVIDUAL' ? prc_id : "YBL_" + $scope.loginServiceData[0].x_prc_grp + btn.ACTION_NAME,
                // x_ref_input_1: $scope.loginServiceData[0].x_prc_grp,
                x_ref_input_1: prc_grp,
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
                  } else {
                    $location.path("/home");
                  }
                } else {
                  console.log('Error from ', 'buttonAction');
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
              console.log('Error from ', 'buttonAction');
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

    $scope.getImage_stream = function (doc, obj) {
      var body = {
        spgetdocumentqueuelistnewcomp: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
            x_queue_id: $scope.selectedQ["queue_id"],
            x_card_id: $scope.selectedGrid.x_lead_source == 'DIY_INDIVIDUAL' ? doc.form_id : "",
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
            console.log('Error from ', 'spgetdocumentqueuelistnewcomp');
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
  //AUTO GEFU - 27Nov25
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
            if ($scope.selectedQ["queue_id"] == "23") {
              dmDialogueBox
              .confirmBox({
                title: "Message",
                message: "Do you want to download the GEFU",
                actionLabel: ["No", "Yes"],
              })
              .then(function (res) {
                // function here to be executed
                if (res) {
                  $scope.download_GEFU_DIY();
                  // $scope.buttonAction(btn, "N");
                  $scope.newgen_createCase(btn, "Y");
                } else {
                  // $scope.buttonAction(btn, "N");
                  $scope.newgen_createCase(btn, "Y");
                }
              });
            }else{
              $scope.amlock_crilic_array(btn);
            }
          } else if (
            res.data["DMS_UPLOAD_GEFU_API"][0].hasOwnProperty("data")
          ) { 
            if ($scope.selectedQ["queue_id"] == "23") {
              dmDialogueBox
              .confirmBox({
                title: "Message",
                message: "Do you want to download the GEFU",
                actionLabel: ["No", "Yes"],
              })
              .then(function (res) {
                // function here to be executed
                if (res) {
                  $scope.download_GEFU_DIY();
                  // $scope.buttonAction(btn, "N");
                  $scope.newgen_createCase(btn, "Y");
                } else {
                  // $scope.buttonAction(btn, "N");
                  $scope.newgen_createCase(btn, "Y");
                }
              });
            }else{
              $scope.amlock_crilic_array(btn);
            }
          } else {
            $scope.hideLoader();
            if ($scope.selectedQ["queue_id"] == "23") {
              dmDialogueBox
              .confirmBox({
                title: "Message",
                message: "Do you want to download the GEFU",
                actionLabel: ["No", "Yes"],
              })
              .then(function (res) {
                // function here to be executed
                if (res) {
                  $scope.download_GEFU_DIY();
                  // $scope.buttonAction(btn, "N");
                  $scope.newgen_createCase(btn, "Y");
                } else {
                  // $scope.buttonAction(btn, "N");
                  $scope.newgen_createCase(btn, "Y");
                }
              });
            }else{
              $scope.amlock_crilic_array(btn);
            }        }
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
    $scope.getImage_stream_Doc = function (doc, obj) {
      var body = {
        spgetdocumentqueuelistnewcomp: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
            x_queue_id: $scope.selectedQ["queue_id"],
            x_card_id: $scope.selectedGrid.x_lead_source == 'DIY_INDIVIDUAL' ? doc.form_id : "",
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
            console.log('Error from ', 'getImage_stream_Doc');
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
          "22"
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
      }else {
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
        //   $scope.GetJSONData.AOF_INDI.ENTITY_DATA.OTHERS.push(obj['image_name']);
        //   $scope.setJSONUpdate('others');
        // }
      }
    };

    $scope.reFetchVKYCDocs = function () {
      const vkyc_form = {
        form_name: "VKYC Details",
        tab_seq: 6,
        form_id: "37",
        view_type: "FORM",
      };
      $scope.getVKYCIMAGE_DETAILS(vkyc_form);
      // $scope.diyVKYCdetails();
    };

    $scope.getDocumentsQueueList = function (formData, index) {
      console.log($scope.selectedGrid.x_lead_source);
      var body = {
        spgetdocumentqueuelistcomp: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
            x_queue_id: $scope.selectedQ["queue_id"],
            x_card_id: $scope.selectedGrid.x_lead_source == 'DIY_INDIVIDUAL' ? "37" : "",
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
                $scope.documentsDesc.forEach((item,index) => {
                  item.doc_des =  item.STATUS =="Y"? 
                            item.doc_des + ' New':
                           item.doc_des+ ' Old';
         
                         })
              if (formData) {
                if (formData.form_id == "37"){
                  $scope.VKYCDocLength = $scope.documentsDesc.length;
                }
                if (formData.form_id == "26"||formData.form_id == "36") {
                  $scope.getDocumentpertab(formData, index);
                }
                if (formData.form_id == "14") {
                  $scope.GetJSONData.AOF_INDI.ENTITY_DATA.OTHERS.push(
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
            console.log('Error from ', 'getDocumentsQueueList');
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
            console.log('Error from ', 'getRejection_data');
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
    $scope.supervisor_raised_Individual = function (card,getStatus,index) {
      if (getStatus == "Approve") {
        $scope.supervisor_approve_service_Indidividual(
          card,
          $scope.loginServiceData[0].system_role + "_APPROVE"
        );
      }
    };
    $scope.supervisor_approve_service_Indidividual = function (card,status,index) {
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
              $scope.getSupervisorFlagDetailsIndividual();
             } else{
              $scope.getSupervisorFlagDetailsIndividual();
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
            console.log('Error from ', 'approve_reopen_delete_service');
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
            console.log('Error from ', 'spdeleteaction');
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
            console.log('Error from ', 'spaofhist2');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };
    $scope.getSupervisorFlagDetailsIndividual = function () {
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
                  // $scope.ApproveSupervisorBS =false;
                  $scope.ApproveSupervisorBSCount++;
              }
              // else{
              //   $scope.ApproveSupervisorBS =true;
              // }
              if(($scope.SupervisorQueueData[i].UPDATED_FLAG =='' || $scope.SupervisorQueueData[i].UPDATED_FLAG ==null ) && ($scope.SupervisorQueueData[i].SUPERVISOR_REMARKS =='' || $scope.SupervisorQueueData[i].SUPERVISOR_REMARKS ==null)){
                // $scope.ApproveSupervisorBS_Remarks =false;
                $scope.ApproveSupervisorBS_RemarksCount++;
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
    $scope.getSupervisorFinalFlagIndividual = function () {
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
                ovj["form_id"] = $scope.selectedGrid.x_lead_source=="DIY_INDIVIDUAL"?"36":"26";
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
      // check if lead id starts with 'D'
      const isDIYLead =
      $scope.selectedGrid?.x_lead_id2 &&
      $scope.selectedGrid.x_lead_id2.startsWith('D');
      let DIY_Ind = [17, 18, 19, 20, 21, 22, 23, 24,7,100];
      if (DIY_Ind.includes($scope.selectedQ.queue_id) && isDIYLead  && $scope.selectedGrid.x_lead_source !=='SOLECANTB') {
        $scope.selectedGrid.x_lead_source = 'DIY_INDIVIDUAL';
      }else{
        $scope.getSupervisorFlagDetailsIndividual();
        $scope.getSupervisorFinalFlagIndividual();
      }
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
            console.log('Error from ', 'spdoclistcomp');
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
            x_object_type: "AOF_INDI",
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
                if (ovj.form_id == "36"||ovj.form_id == "26") {
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
            console.log('Error from ', 'spinsertdopsimagedata');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };

    $scope.download_GEFU_DIY = function () {
      var body = {
        spindividualgefudownload: [
          {
            x_lead_id: $scope.selectedGrid.x_lead_id2,
            x_type: 'abcd'
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
              " **/* spindividualgefudownload */**",
              res
            );
            if (res.data["spindividualgefudownload"][0].hasOwnProperty("error")) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["spindividualgefudownload"][0].hasOwnProperty("data")
            ) {
              // function goes here
              let response = res.data["spindividualgefudownload"][0].data;
              if (Array.isArray(response) && response.length > 0) {
                let base64 = response[0].encode;
                var link = document.createElement("a");
                link.href = "data:text/plain;base64," + base64;
                // link.download = "GEFU file";
                link.download = "G"+$scope.GetJSONData.AOF_INDI.ENTITY_DATA.ACC_NUMBER+".txt"; // GEFU INDI DIY
                link.click();
                if ($scope.selectedQ["queue_id"] == '20') {
                  var body ={
                    spinsertdiydetailsindividual:[{
                      x_json_text:"Gefu_File_Downloaded",
                      x_from_system: 'DIY_INDIVIDUAL',
                      x_user_id: '',
                      x_screen_id: '11',
                      x_lead_id: $scope.selectedGrid.x_lead_id,
                    },
                  ],
                  };
                  executeApi(newplatwareHeader, body, function (res){
                    $scope.$apply(function () {
                      $scope.hideLoader();
                      if (res.status == true) {
  console.log("Downlaoded GEFU Successfully!!!")
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
          "ACCEPT",
        x_ref_input_1: $scope.loginServiceData[0].x_prc_grp,
        x_disp_level: "",
        x_text_1: 'Y',
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
                      }
                    });
                  });
                }              
              } else {
                $scope.hideLoader();
                console.log('Error from ', 'spindividualgefudownload');
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "GEFU has not been generated yet",
                  actionLabel: ["Ok"],
                });
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
            console.log('Error from ', 'spindividualgefudownload');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };

    $scope.Generate_GEFU = function (btn,cb) {
      var body = {
        spgenerategefufileindividual: [
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
              console.log("**/* spgenerategefufileindividual */**", res);
              if (res.data["spgenerategefufileindividual"][0].hasOwnProperty("error")) {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (
                res.data["spgenerategefufileindividual"][0].hasOwnProperty("data")
              ) {
                $scope.result_GEFU = JSON.parse(
                  res.data.spgenerategefufileindividual[0].data[0].v_string
                );
                if ($scope.result_GEFU.RESULT[0].IS_SUCCESS == "Y") {
                  if($scope.selectedGrid.x_lead_source=='INDIVIDUAL'){
                  //AUTO GEFU - 25Nov25
                  if ($scope.GetJSONData.AOF_INDI.ENTITY_DATA.OPEN_SA.VALUE == "Yes") {
                    $scope.Generate_GEFU_SA()
                      .finally(function () {
                          $scope.DMSUploadGefu(btn);                      
                      });
                  }else{
                      $scope.DMSUploadGefu(btn); 
                  }
                 }
                 if($scope.selectedQ["queue_id"] == '21'){
                    $scope.DMSUploadGefu(btn); 
                }
                  if ($scope.selectedQ["queue_id"] == '23') {
                      $scope.DMSUploadGefu(btn);   
                      $scope.SignUpload();
                  } else {
                    // $scope.buttonAction(btn, "N");
                    $scope.Generate_GEFU_SA();
                    if (typeof cb === 'function') {
                      cb(true);
                    }
                  }
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
              console.log('Error from ', 'spgenerategefufileindividual');
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
//auto gefu new 26dec25
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
    //             // $scope.result_GEFU = JSON.parse(
    //             //   res.data.spgenerategefufilesavingaccount[0].data[0].v_string
    //             // );
    //             console.log('Response: spgenerategefufilesavingaccount', res);
    //             // if ($scope.result_GEFU.RESULT[0].IS_SUCCESS == "Y") {
    //             //   $scope.buttonAction(btn, "N");
    //             // } else if ($scope.result_GEFU.RESULT[0].IS_SUCCESS == "N") {
    //             //   $scope.hideLoader();
    //             //   dmDialogueBox.alertBox({
    //             //     title: "Alert",
    //             //     message: "There is an error Occurred.",
    //             //     actionLabel: ["Ok"],
    //             //   });
    //             // }
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

    //************** Generate Individual asst SA GEFU **********
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
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
                reject("Error in response");
              } else if (
                res.data["spgenerategefufilesavingaccount"][0].hasOwnProperty("data")
              ) {
                // $scope.result_GEFU = JSON.parse(
                //   res.data.spgenerategefufilesavingaccount[0].data[0].v_string
                // );
                console.log('Response: spgenerategefufilesavingaccount', res);
                resolve(res); // resolve on success
                // if ($scope.result_GEFU.RESULT[0].IS_SUCCESS == "Y") {
                //   $scope.buttonAction(btn, "N");
                // } else if ($scope.result_GEFU.RESULT[0].IS_SUCCESS == "N") {
                //   $scope.hideLoader();
                //   dmDialogueBox.alertBox({
                //     title: "Alert",
                //     message: "There is an error Occurred.",
                //     actionLabel: ["Ok"],
                //   });
                // }
              } else {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
                reject("Unexpected response format");
              }
            } else if (
              res.status == false &&
              res.errorCode == "PW-0002" &&
              res.serverCode == "528"
            ) {
              sessionStorage.clear();
              $location.path("/");
              reject("Session expired");
            } else {
              $scope.hideLoader();
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
                  // "GEFU file.txt"
                  "G"+$scope.GetJSONData.AOF_INDI.ENTITY_DATA.ACC_NUMBER+".txt" // GEFU INDI CA
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
            console.log('Error from ', 'GEFUFILEDOWNLOAD');
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
                        // link.download = "GEFU SA file";
                        link.download = "G"+$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SA.ACC_NUMBER+".txt" // GEFU INDI SA
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
        document.getElementById("container").width = $scope.IMAGE_WIDTH;
        document.getElementById("container").height = $scope.IMAGE_HEIGHT;
      };
      image.src = obj;
    };

    var angle = 0;
    $scope.rotate = function () {
      angle = (angle + 90) % 360;
      document.getElementById(
        "container"
      ).style.transform = `rotate(${angle}deg)`;
    };
    $scope.zoomIn = function () {
      document.getElementById("container").width =
        document.getElementById("container").naturalWidth;
      document.getElementById("container").height =
        document.getElementById("container").naturalHeight;
    };

    $scope.zoomOUT = function () {
      document.getElementById("container").height = $scope.IMAGE_HEIGHT;
      document.getElementById("container").width = $scope.IMAGE_WIDTH;
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
            console.log('Error from ', 'spcommentaction4');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };
    $scope.supervisor_submit_remarks_Individual = function (card,index) {
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
                $scope.getSupervisorFlagDetailsIndividual();
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
            console.log('Error from ', 'COMMENT_DETAILS');
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
        $scope.selectedQ["queue_id"] == 11 ||
        $scope.selectedQ["queue_id"] == 17 ||
        $scope.selectedQ["queue_id"] == 18 ||
        $scope.selectedQ["queue_id"] == 19 ||
        $scope.selectedQ["queue_id"] == 20
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
            console.log('Error from ', 'getImageStreams');
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
        $scope.loginServiceData[0].system_role == "DVUC")&& ($scope.selectedQ["queue_id"] ===5||$scope.selectedQ["queue_id"] ===6||$scope.selectedQ["queue_id"] ===22||$scope.selectedQ["queue_id"] ===21)
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
                var form = { form_id: obj.form_id };
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
            console.log('Error from ', 'spdeletedopsimagedata');
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
    <p class="rmSpace">Branch : ${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.BRANCH.BRANCH_CODE.VALUE
        }</p>
    <br>
    <p class="rmSpace">Sub: Activation of Sweep-Out Facility towards creation of Fixed Deposit</p>
    <br>
    <p class="rmSpace">Dear Sir / Madam,</p><br>
    <p class="rmSpace">I would like to avail of the Sweep Out facility on the Account no ${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.ACC_NUMBER || "-"
        }
    In the event of excess balance in my linked Current/Savings Account, please execute the Sweep-out request.  The details are as follows</p>
   <br> <div><table class="tableSet">
    <tr class="tabler">
    <th class='tableh'>Particulars</th>
    <th class='tableh'>Details</th>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Entity Name:</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].SEL_ENTITY_NAME || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Cust ID:</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.CUST_ID || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Account Number:</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.ACC_NUMBER || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Minimum Amount in CASA above which the FD should be created (INR):</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SWEEP_CAFD.MIN_AMNT_CA || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Minimum Balance in CASA below which the FD would be broken (INR):</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SWEEP_CAFD.MIN_BAL_CA || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Min Amount of FD created from Sweep-out:</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SWEEP_CAFD.MIN_AMNT_SWPOUT || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Max Amount of FD created from Sweep-out:</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SWEEP_CAFD.MAX_AMNT_SWPOUT || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>FD in multiples of INR (min 10,000):</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SWEEP_CAFD.FD_AMNT || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Start Date:</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SWEEP_CAFD.START_DATE || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>End Date (Sweep-out will be deactivated):</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SWEEP_CAFD.END_DATE || "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>Frequency of sweep (Daily, weekly-specific day, Monthly-Specific date):</td>
    <td class='tabled'> ${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SWEEP_CAFD.FREQ_SWEEPCHECK.VALUE ||
        "-"
        }</td>
    </tr>
    <tr class="tabler">
    <td class='tabled'>FD Tenor:</td>
    <td class='tabled'>${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SWEEP_CAFD.MIN_CA || "-"
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
    <p  class="rmSpace">${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].AADHAAR_VIEW.NAME
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
<p class="rmSpace">Branch:  ${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.BRANCH.BRANCH_CODE.VALUE
        }</p><br>
<p class="rmSpace">Sub: Management of Sweep Facility in Current & Savings Account</p><br>
<p class="rmSpace">Dear Sir/Madam,</p><br>
<p class="rmSpace">I would like to add the Sweep instructions on my savings and current account held with YES BANK.</p>
<br><p class="rmSpace">Current Account Number: ${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.ACC_NUMBER || "-"
        }</p>
<p class="rmSpace">Savings Account Number: ...........</p><br>
<p class="rmSpace"><b>Instruction 1:</b> In the event of excess balance above the threshold value in my linked Current Account, please execute the Sweep-out request from my current account to savings account.  The details are as follows: </p>
<br><table>
<tr>
<td style="width:70%">Threshold value in Current account at which sweepout to savings account will be executed: </td>
<td>: Rs. ${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SWEEP_CASA.MIN_SWPOUT || "-"
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
<td>: Rs. ${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.SWEEP_CASA.MIN_SWPIN || "-"
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
<p  class="rmSpace">${$scope.GetJSONData.AOF_INDI.ENTITY_DATA.HOLDER[0].AADHAAR_VIEW.NAME
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
]).directive('myDirective', function () {
  function link(scope, elem, attrs, ngModel) {
    ngModel.$parsers.push(function (viewValue) {
      var reg = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/;
      // if view values matches regexp, update model value
      if (viewValue.match(reg)) {
        return viewValue;
      }
      // keep the model value as it is
      var transformedValue = ngModel.$modelValue;
      ngModel.$setViewValue(transformedValue);
      ngModel.$render();
      return transformedValue;
    });
  }

  return {
    restrict: 'A',
    require: 'ngModel',
    link: link
  };
});