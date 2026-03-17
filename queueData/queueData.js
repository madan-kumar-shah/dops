var queueModule = angular.module('myApp.queueData', []);
queueModule.controller('queueDataCtrl', ['$scope', '$q', '$location', '$filter', 'QueueService', 'dmDialogueBox',
  function ($scope, $q, $location, $filter, QueueService, dmDialogueBox) {

    if (myGlobalRefresh_variable == true) {
      $location.path('/home');
    }
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
    $scope.ovCardData = QueueService.getQueueCardData();
    $scope.tableConfig = QueueService.getQueueTableHeading();
    $scope.selectedQ = JSON.parse(sessionStorage.getItem('selectedQ'))
    $scope.loginServiceData = JSON.parse(sessionStorage.getItem('usersession'));
    $scope.username = sessionStorage.getItem('userName');


    $scope.init = function () {
      $scope.dmColumnActions = [{
        column_name: "Action",
        action_function: "goToScrutiny"
      }];
      $scope.queueData();
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

    //SERVICES CALL -------------------------------------------------------------

    // *************************Holder Product map***********************************
    // $scope.getHolderProductMap=function(){
    //   var body = {
    //    "SPHOLDERSPRODUCTMAP" :[{
    //     x_queue_id: $scope.selectedQ['queue_id']

    //      }]
    //      }
    //        $scope.showLoader('loading.....');
    //        executeApi(newplatwareHeader, body, function(res) {
    //            $scope.$apply(function() {
    //                $scope.hideLoader();
    //                if(res.status==true){
    //                console.log('**/* SPHOLDERSPRODUCTMAP */**',res);   
    //                if(res.data.SPHOLDERSPRODUCTMAP[0].error){
    //                 dmDialogueBox.alertBox({
    //                   title: 'Alert',
    //                   message: res.data.SPHOLDERSPRODUCTMAP[0].error.message,
    //                   actionLabel: ['Ok']
    //                  });
    //                }else{   
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

    $scope.goToScrutiny = function (gridData) {
    //   if($scope.selectedQ.queue_id== 20){
    //     $scope.access_type(gridData);
    //   }
    //   else 
      // if($scope.selectedQ.queue_id !==20){
      $scope.t0 = performance.now();
      sessionStorage.setItem("GridData", JSON.stringify(gridData));
      var body = {
        "spleadstatus": [{
          x_aof_id: gridData.x_lead_id,
          x_login_id: $scope.username,
          x_role: $scope.loginServiceData[0].system_role,
          x_prcess_grp: $scope.loginServiceData[0].x_prc_grp
        }]
      }
      $scope.showLoader('Loading.....');
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spleadstatus */** ", res);
            if (res.data['spleadstatus'][0].hasOwnProperty('error')) {
              if (res.data['spleadstatus'][0].error.code = "DBES_PARAMS_PROC_406") {
                dmDialogueBox.alertBox({
                  title: 'Alert',
                  message: "Oop's Something went wrong",
                  actionLabel: ['Ok']
                });
              } else {
                dmDialogueBox.alertBox({
                  title: 'Alert',
                  message: res.data.spleadstatus[0].error.message,
                  actionLabel: ['Ok']
                });
              }
            } else if (res.data['spleadstatus'][0].hasOwnProperty('data')) {
              var checkLead = res.data.spleadstatus[0].data[0];
              var checkLeadStatus = JSON.parse(checkLead);
              console.log(checkLeadStatus);
              if($scope.selectedQ.queue_id== 20 ||$scope.selectedQ.queue_id== 3||$scope.selectedQ.queue_id== 10||$scope.selectedQ.queue_id== 2){
                    $scope.access_type(gridData);
                  }
                  else{
                    if (checkLeadStatus.RESULT[0].IS_SUCCESS == 'B') {
                      $scope.access_type(gridData);
                    }
                    else if (checkLeadStatus.RESULT[0].IS_SUCCESS == 'D') {
                      $scope.hideLoader();
                      dmDialogueBox.confirmBox({
                        title: 'Message',
                        message: 'Do you wish to assign this lead to yourself?',
                        actionLabel: ['No', 'Yes']
                      }).then(function (res) {
                        switch (res) {
                          case true:
                            $scope.access_type(gridData);
      
                        }
                      })
                    } else if (checkLeadStatus.RESULT[0].IS_SUCCESS == 'Y') {
                      $scope.access_type(gridData);
                    }
                    else if (checkLeadStatus.RESULT[0].IS_SUCCESS == 'N') {
                      $scope.hideLoader();
                      dmDialogueBox.alertBox({
                        title: 'Message',
                        message: "Lead is already Assigned to another User " + checkLeadStatus.RESULT[0].name,
                        actionLabel: ['Ok']
                      });
                      $location.path('/queueData')
                    }
                  }
           
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
    // }
    }
    $scope.SP_UPDATE_SAVING_ACCOUNT_INDI_PHYGITAL = async function () {
    var selectedGrid = JSON.parse(sessionStorage.getItem('GridData'));
    var body = {
      "SP_UPDATE_SAVING_ACCOUNT_INDI_PHYGITAL": [{
        // x_aof_id: selectedGrid.x_lead_id,
        x_aof_id:selectedGrid.x_lead_id,
         x_constitution:"PHY_INDIVIDUAL",
         x_text_1:'',
         x_text_2:'',
      }]
    }
    $scope.showLoader('Loading.....');
    await executeApi(newplatwareHeader, body, function (res) {
      $scope.$apply(async function () {
        $scope.hideLoader();
        if (res.status == true) {
          console.log('**/* SP_UPDATE_SAVING_ACCOUNT_INDI_PHYGITAL */**', res);
          if (res.data['SP_UPDATE_SAVING_ACCOUNT_INDI_PHYGITAL'][0].hasOwnProperty('error')) {
            dmDialogueBox.alertBox({
              title: 'Alert',
              message: "Oop's Something went wrong",
              actionLabel: ['Ok']
            });
          }
          // 
          else {
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
//ETB
$scope.getUCICForETB = function (gridData) {
  var selectedGrid = JSON.parse(sessionStorage.getItem('GridData'));
  var body = {
    SPCHECKUCICNUMBER: [
      {
        x_aof_id: selectedGrid.x_lead_id2,
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
              $scope.getJsonDataForOV();
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

    // ****************Get Json data OV********************************

    $scope.getJsonDataForOV = async function () {
      var selectedGrid = JSON.parse(sessionStorage.getItem('GridData'));
      if(selectedGrid.x_lead_source == 'PHY_INDIVIDUAL'){
      $scope.SP_UPDATE_SAVING_ACCOUNT_INDI_PHYGITAL();
      }
      var selectedGrid = JSON.parse(sessionStorage.getItem('GridData'));
      var body = {
        "spgetjson": [{
          x_aof_id: selectedGrid.x_lead_id,
        }]
      }
      $scope.showLoader('Loading.....');
      await executeApi(newplatwareHeader, body, function (res) {
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
              await $scope.getFormConfiguration();
              const body = {
                'ipaddresscapturenew': [
                  {
                    x_aof_id: selectedGrid.x_lead_id,
                    x_mobile_number:"",
                    x_ipv4: localStorage.getItem("IPv4")?localStorage.getItem("IPv4"):'',
                    x_ipv6: localStorage.getItem("IPv6")?localStorage.getItem("IPv6"):''
                  },
                ],
              };
              executeApi(newplatwareHeader, body ,function(res){
                $scope.$apply(function(){
                  $scope.hideLoader();
                  if(res.status ==true){
                    console.log("**/* ipaddresscapturenew */**",res);
                    if (res.data['ipaddresscapturenew'][0].hasOwnProperty('error')) {
                      dmDialogueBox.alertBox({
                        title: 'Alert',
                        message: "Oop's Something went wrong",
                        actionLabel: ['Ok']
                      });}else{
                        console.log("IP Fetch Successfully!")
                      }
                  }
                })
              });
            //  await $scope.insertSupervisorFlagDetails();
            //  await $scope.insertSupervisorFlagDetailsIndividual();

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

    $scope.getFormConfiguration = async function (data) {
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
        "spformresultcomp": [{
          x_queue_id: $scope.selectedQ.queue_id,
          x_source: selectedGrid.x_lead_source
        }]
      }
      console.log("spformresultcomp body " + JSON.stringify(body));
      $scope.showLoader('Loading.....');
      await executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log('**/* spformresultcomp */**', res);
            if (res.data['spformresultcomp'][0].hasOwnProperty('error')) {
              dmDialogueBox.alertBox({
                title: 'Alert',
                message: "Oop's Something went wrong",
                actionLabel: ['Ok']
              });
            } else if (res.data['spformresultcomp'][0].hasOwnProperty('data')) {
              $scope.webOnCardResponse = JSON.parse(res.data.spformresultcomp[0].data[0])
              QueueService.setQueueCarddata($scope.webOnCardResponse);
              var t1 = performance.now();
              console.log("for scruitny button to one view 1st part " + (t1 - $scope.t0) + " milliseconds.");
              if (selectedGrid.x_lead_source == 'COMPANY') {
                $location.path('/CompanyForm');
              } else if (selectedGrid.x_lead_source == 'SOLECANTB') {
                $location.path('/ScrutinyForm');
              } else if (selectedGrid.x_lead_source == 'INDIVIDUAL' || selectedGrid.x_lead_source == 'DIY_INDIVIDUAL') {
                $location.path('/IndividualForm');
              }else if (selectedGrid.x_lead_source == 'PHY_PARTNERSHIP') {

                $location.path('/PartnershipForm');

              } 

              else if (selectedGrid.x_lead_source == 'PHY_COMPANY') {

                $location.path('/PhyCompanyForm');

              } 



              else if (selectedGrid.x_lead_source == 'PHY_LLP') {

                $location.path('/PhyLLPForm');

              } 



              else if (selectedGrid.x_lead_source == 'PHY_INDIVIDUAL') {

                $location.path('/PhyIndividualForm');

              } 



              else if (selectedGrid.x_lead_source == 'PHY_SOLECANTB') {

                $location.path('/PhyScrutinyForm');

              } 



              else if (selectedGrid.x_lead_source == 'PHY_HUF_INDI') {

                $location.path('/PhyHUFIndividualForm');

              } 

              else if (selectedGrid.x_lead_source == 'PHY_HUF_SOLEPROP') {

                $location.path('/PhyHUFScrutinyForm');

              } 

              else if (selectedGrid.x_lead_source == 'PHY_TRUST') {

                $location.path('/PhyTASCForm');

              } 

              else if (selectedGrid.x_lead_source == 'PHY_ASSOCIATION') {

                $location.path('/PhyTASCForm');

              } 

              else if (selectedGrid.x_lead_source == 'PHY_SOCIETY') {

                $location.path('/PhyTASCForm');

              } 

              else if (selectedGrid.x_lead_source == 'PHY_CLUB') {

                $location.path('/PhyTASCForm');

              } 
            }
            else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: 'Message',
                message: "Oop's Something went wrong",
                actionLabel: ['Ok']
              });
            }
          } else if (res.status == false && res.errorCode == "PW-0002" && res.serverCode == "528") {
            sessionStorage.clear();
            $location.path('/');
          }
          else {
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

    // $scope.insertSupervisorFlagDetails = function () {
    //   var selectedGrid = JSON.parse(sessionStorage.getItem('GridData'));
    //   var body = {
    //     spinsertchecklistsupervisor: [
    //       {
    //         x_aof_id: selectedGrid.x_lead_id,
    //       },
    //     ],
    //   };
    //   $scope.showLoader("Loading.....");
    //   executeApi(newplatwareHeader, body, function (res) {
    //     $scope.$apply(function () {
    //       $scope.hideLoader();
    //       if (res.status == true) {
    //         console.log("**/* spinsertchecklistsupervisor */**", res);
    //         if (res.data["spinsertchecklistsupervisor"][0].hasOwnProperty("error")) {
    //           $scope.hideLoader();
    //           dmDialogueBox.alertBox({
    //             title: "Alert",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         } else if (res.data["spinsertchecklistsupervisor"][0].hasOwnProperty("data")) {
    //           // $scope.GETGridViewData = JSON.parse(
    //           //   res.data.spgetchecklistsupervisor[0].data[0].v_string_tab
    //           // );
    //           $scope.insertedSupervisorCheckList = res.data.spinsertchecklistsupervisor[0].data[0].STATUS;
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
    // $scope.insertSupervisorFlagDetailsIndividual = function () {
    //   var selectedGrid = JSON.parse(sessionStorage.getItem('GridData'));
    //   var body = {
    //     spinsertchecklistsupervisorindividual: [
    //       {
    //         x_aof_id: selectedGrid.x_lead_id,
    //       },
    //     ],
    //   };
    //   $scope.showLoader("Loading.....");
    //   executeApi(newplatwareHeader, body, function (res) {
    //     $scope.$apply(function () {
    //       $scope.hideLoader();
    //       if (res.status == true) {
    //         console.log("**/* spinsertchecklistsupervisorindividual */**", res);
    //         if (res.data["spinsertchecklistsupervisorindividual"][0].hasOwnProperty("error")) {
    //           $scope.hideLoader();
    //           dmDialogueBox.alertBox({
    //             title: "Alert",
    //             message: "Oop's Something went wrong",
    //             actionLabel: ["Ok"],
    //           });
    //         } else if (res.data["spinsertchecklistsupervisorindividual"][0].hasOwnProperty("data")) {
    //           // $scope.GETGridViewData = JSON.parse(
    //           //   res.data.spgetchecklistsupervisor[0].data[0].v_string_tab
    //           // );
    //           $scope.insertedSupervisorCheckList = res.data.spinsertchecklistsupervisorindividual[0].data[0].STATUS;
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

    $scope.newgen_valid_array = [];
    $scope.generated_TrackerID = "";
    $scope.newgen_createCase = function (obj, deferred) {
      if ($scope.selectedQ["queue_id"] == 19 || $scope.selectedQ["queue_id"] == 23) {
        var body = {
          AO_CASE_INITIATION_DIY: [
            obj
          ],
        };
      }
      $scope.showLoader("Loading...");
      console.log(body);
      executeApi(newplatwareHeader, body, function (res) {
        $scope.countForNewgen = $scope.countForNewgen + 1;
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* AO_CASE_INIT_DIY */**", res);
            if (res.data["AO_CASE_INIT_DIY"][0].hasOwnProperty("error")) {
              deferred.resolve();
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
                  if ($scope.selectedQ["queue_id"] == 19 || $scope.selectedQ["queue_id"] == 23) {
                    $scope.insertTrackerID($scope.generated_TrackerID, response_data.response["leadId"], deferred);
                  }
                } else {
                  deferred.resolve();
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
                deferred.resolve();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: res.data.AO_CASE_INIT_DIY[0].data[0].response_message,
                  actionLabel: ["Ok"],
                });
              }
            } else {
              deferred.resolve();
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
    };

    $scope.insertTrackerID = function (trackerID, leadId, deferred) {
      var body = {
        spupdatetrackercopgrid: [
          {
            x_lead_id: leadId,
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
              let response = res.data["spupdatetrackercopgrid"][0].data[0];
              if (response['Status'] == 'Y') {
                $scope.newgen_valid_array = [...$scope.newgen_valid_array, leadId];
              }
              deferred.resolve();
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
            console.log('Error from ', 'spupdatetrackercopgrid');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    };

    $scope.spaccbulkacceptAPI = function (arr) {
      $scope.username = sessionStorage.getItem("userName");
      // let arr = [];
      // arr = [...case_array.map(x => x.x_lead_id)];
      var body = {
        SPACCBULKACCEPT: [
          {
            // x_lead_id_array: $scope.newgen_valid_array, 
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
            console.log("**/* SPACCBULKACCEPT */**", res);
            if (res.data["SPACCBULKACCEPT"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["SPACCBULKACCEPT"][0].hasOwnProperty("data")
            ) {
              console.log(res);
              if (res.data['SPACCBULKACCEPT'][0].data[0].Status == 'Y') {
                // $location.path("/home");
                $scope.ACCBULKAUTOGEFU(arr); //Auto Gefu New 24Dec25
              } else {
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Case bulk accept failed",
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
            console.log('Error from ', 'SPACCBULKACCEPT');
            dmDialogueBox.alertBox({
              title: "Server Error",
              message: "Error Connecting to server..",
              actionLabel: ["Ok"],
            });
          }
        });
      });
    }
    $scope.ACCBULKAUTOGEFU=function(arr){
      var body = {
        UPLOAD_BULK_KSCOP_API: [
          {leads:arr},
        ],
      };
      $scope.showLoader("loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* UPLOAD_BULK_KSCOP_API */**", res);
            if (res.data["UPLOAD_BULK_KSCOP_API"][0].hasOwnProperty("data")) {
                              // $location.path("/home");
                              $scope.filteredLeads = arr.filter(id => id.startsWith('P'));
                              if($scope.filteredLeads.length >0){
                                $scope.NEWGENKSCOPESERVICE($scope.filteredLeads);
                              }else{
                                $location.path("/home");
                              }
                              
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
    $scope.NEWGENKSCOPESERVICE=function(filteredLeads){
      var body = {
        NEWGEN_KSCOPE_SERVICE: [
          {leads:filteredLeads},
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
    
  //Auto Gefu New 24Dec25
//ETB
// $scope.spaccbulkacceptUpdateCoumnAPI = function (arr) {
//   var body = {
//     UPDATEDATECOLUMN: [
//       {
//         leadId: arr,
//       },
//     ],
//   };
//   $scope.showLoader("Loading.....");
//   executeApi(newplatwareHeader, body, function (res) {
//     $scope.$apply(function () {
//       $scope.hideLoader();
//       if (res.status == true) {
//         console.log("**/* UPDATEDATECOLUMN */**", res);
//         if (res.data["UPDATEDATECOLUMN"][0].hasOwnProperty("data")) {
//           if (res.data["UPDATEDATECOLUMN"][0].data[0]?.response_code=='200') {
//            console.log('SUCCESS');
//           } else {
//             console.log('failed');
//           }
//         } else {
//           $scope.hideLoader();
//         }
//       } else if (
//         res.status == false &&
//         res.errorCode == "PW-0002" &&
//         res.serverCode == "528"
//       ) {
//         $scope.hideLoader();
//       } else {
//         $scope.hideLoader();
//       }
//     });
//   });
// }
// auto gefu new 24dec25
    $scope.setprc_bulk = function (case_array) {
      $scope.username = sessionStorage.getItem("userName");
      var body = {
        spdiyaccbulkaccept: [
          {
            x_lead_id_array: case_array,
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
              if (res.data['spdiyaccbulkaccept'][0].data[0].Status == 'Y') {
                $location.path("/home");
              } else {
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Case bulk accept failed",
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
$scope.SignUpload =function(case_array){
  let arr = [];
        arr = [...case_array.map(x => x.x_lead_id)];
    var body = {
      DMS_UPLOAD_GEFU_API: [
        {
          leadId: arr,
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
            $scope.SPSIGNBULKACCEPT(case_array);
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
$scope.SPSIGNBULKACCEPT = function(case_array){
  let arr = [];
        arr = [...case_array.map(x => x.x_lead_id)];
        var body = {
          SPSIGNBULKACCEPT: [
            {
              x_lead_id_array: arr,
              x_login_id: $scope.username,
            }
          ],
        };
        $scope.showLoader("loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* SPSIGNBULKACCEPT */**", res);
            if (res.data["SPSIGNBULKACCEPT"][0].hasOwnProperty("data")) {
              // location.reload();
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
            $location.path("/home");
          }
        });
      });
}

    $scope.generateGEFU_bulk = function (case_array) {
      if ($scope.selectedQ["queue_id"] == 7){
        let arr = [];
        arr = [...case_array.map(x => x.x_lead_id)];
        $scope.spaccbulkacceptAPI(arr);
        // $scope.spaccbulkacceptUpdateCoumnAPI(arr); //Auto Gefu New 24Dec25
        return;
      }
      else{
        $scope.username = sessionStorage.getItem("userName");
        let arr = [];
        arr = [...case_array.map(x => x.x_lead_id)];
        var body = {
          spdiybulkgefugenerate: [
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
              console.log("**/* spdiybulkgefugenerate */**", res);
              if (res.data["spdiybulkgefugenerate"][0].hasOwnProperty("error")) {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (
                res.data["spdiybulkgefugenerate"][0].hasOwnProperty("data")
              ) {
                console.log(res);
                if (res.data["spdiybulkgefugenerate"][0].data[0].hasOwnProperty('gefu_exist')) {
                  let response = res.data["spdiybulkgefugenerate"][0].data[0];
                  if (response.Status == "Y") {
                    $scope.setprc_bulk(JSON.parse(response.gefu_exist));
                  } else {
                    dmDialogueBox.alertBox({
                      title: "Message",
                      message: "GEFU Generation Failed",
                      actionLabel: ["Ok"],
                    });
                  }
                }
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
              console.log('Error from ', 'spdiybulkgefugenerate');
              dmDialogueBox.alertBox({
                title: "Server Error",
                message: "Error Connecting to server..",
                actionLabel: ["Ok"],
              });
            }
          });
        });
      // }
      }
 
    };

    $scope.access_type = async function (gridData) {
      var body = {
        "spgetaccesstype": [{
          x_aof_id: gridData.x_lead_id,
          x_process_group: $scope.loginServiceData[0].x_prc_grp,
          x_login_id: $scope.username,
        }]
      }
      $scope.showLoader('Loading.....');
      await executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(async function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log('**/* spgetaccesstype */**', res);
            if (res.data['spgetaccesstype'][0].hasOwnProperty('error')) {
              dmDialogueBox.alertBox({
                title: 'Alert',
                message: "Oop's Something went wrong",
                actionLabel: ['Ok']
              });
            } else if (res.data['spgetaccesstype'][0].hasOwnProperty('data')) {
              // await $scope.getJsonDataForOV();
              await $scope.getUCICForETB(); //ETB
              if (res.data.spgetaccesstype[0].data[0] == 'R') {
                //$scope.getJsonDataForOV();
              } else if (res.data.spgetaccesstype[0].data[0] == 'W') {
                //auto gefu sign pending bucket 26dec25
                if($scope.selectedQ['queue_id']===100){
                }else{
                  await $scope.moveTo_scrutiny(gridData);
                }
              }else if(res.data.spgetaccesstype[0].data[0]==null){
                 //auto gefu sign pending bucket 26dec25
                if($scope.selectedQ['queue_id']===100){
                }else{
                  await $scope.moveTo_scrutiny(gridData);
                }
              }
              else {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: 'Server Error',
                  message: 'Error Connecting to server..',
                  actionLabel: ['Ok']
                });
              }
              //     QueueService.setRemarkHistory(res.data.SPREMARKSHIST[0].data[0].v_string_tab);
              //   $scope.getHolderProductMap();
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: 'Message',
                message: "Oop's Something went wrong",
                actionLabel: ['Ok']
              });
            }
          } else if (res.status == false && res.errorCode == "PW-0002" && res.serverCode == "528") {
            sessionStorage.clear();
            $location.path('/');
          }
          else {
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

    // ************************** check lead status********************************
    $scope.moveTo_scrutiny = async function (gridData) {
      var body = {
        "spsetprcgrpdispd2": [{
          x_lead_id: gridData.x_lead_id,
          x_prc_group: $scope.loginServiceData[0].x_prc_grp,
          x_new_disposition: $scope.loginServiceData[0].x_prc_grp,
          x_aof_id: gridData.x_lead_id,
          x_crn_no: '',
          x_member_id: '',
          x_is_isstart: '',
          x_login_id: $scope.username,
          x_processid: 'YBL_' + $scope.loginServiceData[0].x_prc_grp + 'WIP',
          x_ref_input_1: $scope.loginServiceData[0].x_prc_grp,
          x_ref_input_2: '',
          x_disp_level: '',
          x_text_1: $scope.selectedQ.login_status,
          x_text_2: '',
          x_text_3: '',
          x_text_4: '',
          x_text_5: '',
        }]
      }
      $scope.showLoader('Loading.....');
      await executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(async function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log('**/* spsetprcgrpdispd2 */**', res);
            if (res.data['spsetprcgrpdispd2'][0].hasOwnProperty('error')) {
              dmDialogueBox.alertBox({
                title: 'Alert',
                message: "Oop's Something went wrong",
                actionLabel: ['Ok']
              });
            } else if (res.data['spsetprcgrpdispd2'][0].hasOwnProperty('data')) {
              if (res.data.spsetprcgrpdispd2[0].data[0].STATUS == 'Y') {
                // await $scope.getJsonDataForOV();
              } else {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: 'Server Error',
                  message: 'Error Connecting to server..',
                  actionLabel: ['Ok']
                });
              }
              //     QueueService.setRemarkHistory(res.data.SPREMARKSHIST[0].data[0].v_string_tab);
              //   $scope.getHolderProductMap();
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: 'Message',
                message: "Oop's Something went wrong",
                actionLabel: ['Ok']
              });
            }
          } else if (res.status == false && res.errorCode == "PW-0002" && res.serverCode == "528") {
            sessionStorage.clear();
            $location.path('/');
          }
          else {
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

    // ********************** Queue Data***********************************
    $scope.queueData = function () {
      var body = {
        spleadsummary2: [{
          x_queue_id: $scope.selectedQ['queue_id'],
          x_login_id: $scope.username,
          x_system_role: $scope.loginServiceData[0].system_role
        }]

      }
      $scope.showLoader('Loading.....');
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log('**/* spleadsummary2 */**', res);
            if (res.data['spleadsummary2'][0].hasOwnProperty('error')) {
              dmDialogueBox.alertBox({
                title: 'Alert',
                message: "Oop's Something went wrong",
                actionLabel: ['Ok']
              });
            } else if (res.data['spleadsummary2'][0].hasOwnProperty('data')) {
              $scope.queueLeadResponse = JSON.parse(res.data.spleadsummary2[0].data[0].v_string.value);
              $scope.dataLeads = $scope.queueLeadResponse.X_LEAD_SUMMARY;
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: 'Message',
                message: "Oop's Something went wrong",
                actionLabel: ['Ok']
              });
            }
          } else if (res.status == false && res.errorCode == "PW-0002" && res.serverCode == "528") {
            sessionStorage.clear();
            $location.path('/');
          }
          else {
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
    //SERVICE CALL END-------------------------------------------------------------------


    $scope.init();

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  }
])
