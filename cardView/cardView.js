var cardViewModule = angular.module("myApp.cardView", []);
cardViewModule.controller("cardViewCtrl", [
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

    //  $scope.cardView_Data=JSON.parse(sessionStorage.getItem('Email_verify_leads'));
    $scope.cardView_Data = JSON.parse(QueueService.getCardView());
    $scope.cardView_length = $scope.cardView_Data;
    $scope.queueD = QueueService.getcardLabel();
    // $scope.card_label = $scope.queueD[0].EMAIL_GRID_DFN;
    $scope.card_label = $scope.queueD;
    console.log('card label --> ', $scope.queueD);
    $scope.search = { value: "" };

    $scope.selectedQ = JSON.parse(sessionStorage.getItem("selectedQ"));
    $scope.loginServiceData = JSON.parse(sessionStorage.getItem("usersession"));
    $scope.username = sessionStorage.getItem("userName");
    // after sprint-7 //
    $scope.overlayStatus = false;
    $scope.discard_reason_array = [];
    $scope.selected_card = null;

    $scope.searchData = function (value) {
      $scope.cardView = $filter("filter")($scope.cardView_length, value);
      $scope.pagination("search");
    };

    // *******************Pagination***********************

    $scope.totalItems = $scope.cardView_length.length;
    $scope.pageSize = 4;
    $scope.cardView = [];
    $scope.count = [];
    $scope.new_length = 0;
    $scope.data_search_pagination = [];
    $scope.data_search_pagination = $scope.cardView_length;


    $scope.pagination = function (val) {
      $scope.count = [];
      $scope.currentPage = 1;
      $scope.totalPages = Math.ceil($scope.totalItems / $scope.pageSize);
      if (val == "search") {
        $scope.new_length = 0;
        $scope.data_search_pagination = $scope.cardView;
        $scope.totalPages = Math.ceil(
          $scope.data_search_pagination.length / $scope.pageSize
        );
        $scope.cardView = [];
        for (i = 0; i < $scope.pageSize; i++) {
          if (i < $scope.data_search_pagination.length)
            $scope.cardView.push($scope.data_search_pagination[i]);
        }
        $scope.new_length = $scope.cardView.length;
      } else {
        for (i = 0; i < $scope.pageSize; i++) {
          if (i < $scope.cardView_length.length)
            $scope.cardView.push($scope.cardView_length[i]);
        }
        $scope.new_length = $scope.cardView.length;
      }
      for (i = 0; i < $scope.totalPages; i++) {
        $scope.count.push(i + 1);
      }
    };
    $scope.moveToPage = function (count) {
      $scope.previousPage = $scope.currentPage;
      if ($scope.currentPage < count) {
        $scope.currentPage = count;
        $scope.cardView = [];
        for (
          i = ($scope.currentPage - $scope.previousPage) * $scope.new_length;
          i < $scope.currentPage * $scope.pageSize;
          i++
        ) {
          if (i < $scope.data_search_pagination.length)
            $scope.cardView.push($scope.data_search_pagination[i]);
        }
        $scope.new_length =
          $scope.new_length * ($scope.currentPage - $scope.previousPage) +
          $scope.cardView.length;
      } else if ($scope.currentPage > count) {
        $scope.currentPage = count;
        $scope.new_length =
          $scope.new_length -
          $scope.cardView.length -
          ($scope.previousPage - ($scope.currentPage + 1)) * $scope.pageSize;
        $scope.cardView = [];
        for (
          i = $scope.new_length - 1;
          i >= ($scope.currentPage - 1) * $scope.pageSize;
          i--
        ) {
          if (i >= ($scope.currentPage - 1) * $scope.pageSize)
            $scope.cardView.push($scope.data_search_pagination[i]);
        }
      }
    };

    $scope.Forward_backward = function (obj) {
      if (obj == "forward") {
        if ($scope.currentPage >= $scope.totalPages)
          $scope.currentPage = $scope.currentPage;
        else {
          $scope.currentPage = $scope.currentPage + 1;
          $scope.cardView = [];
          for (
            i = $scope.new_length;
            i < $scope.currentPage * $scope.pageSize;
            i++
          ) {
            if (i < $scope.data_search_pagination.length)
              $scope.cardView.push($scope.data_search_pagination[i]);
          }
          $scope.new_length = $scope.new_length + $scope.cardView.length;
        }
      } else {
        if ($scope.currentPage <= 1) $scope.currentPage = $scope.currentPage;
        else {
          $scope.currentPage = $scope.currentPage - 1;
          $scope.new_length = $scope.new_length - $scope.cardView.length;
          $scope.cardView = [];
          for (
            i = $scope.new_length - 1;
            i >= ($scope.currentPage - 1) * $scope.pageSize;
            i--
          ) {
            if (i >= ($scope.currentPage - 1) * $scope.pageSize)
              $scope.cardView.push($scope.data_search_pagination[i]);
          }
        }
      }
    };
    // **********pagination end

    $scope.sendVerificationLink = function (card) {
      var body = {
        DUMMY_SEND_MAIL: [
          {
            emailId: card.X_EMAIL_ID,
            serviceType: "0",
            leadId: card.X_LEAD_ID,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* SEND_VERIFYLINK_EMAIL */**", res);
            if (res.data["SEND_VERIFYLINK_EMAIL"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["SEND_VERIFYLINK_EMAIL"][0].hasOwnProperty("data")
            ) {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: "Message",
                message:
                  res.data.SEND_VERIFYLINK_EMAIL[0].data[0].response_message,
                actionLabel: ["Ok"],
              });
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

    $scope.pagination();

    // dmDialogueBox
    //             .confirmBox({
    //               title: "Message",
    //               message: "Do you want to discard the Case?",
    //               actionLabel: ["Cancel", "Ok"],
    //             })
    //             .then(function (res) {
    //               switch (res) {
    //                 case true:
    //                   console.log(res);
    //               }
    //             });

    // Partner leads functions 

    $scope.discard_popup = {};

    $scope.discard_lead = function (card) {
      $scope.selected_card = card;
      console.log('... card ...', $scope.selected_card);
      if ($scope.discard_reason_array.length < 1) {
        var body = {
          spgetdiscardreason: [
            {
              x_call_flag: "1"
            },
          ],
        };
        $scope.showLoader("Loading.....");
        executeApi(newplatwareHeader, body, function (res) {
          $scope.$apply(function () {
            if (res.status == true) {
              $scope.hideLoader();
              console.log("**/* spgetdiscardreason */** ", res);
              if (res.data["spgetdiscardreason"][0].hasOwnProperty("error")) {
                dmDialogueBox.alertBox({
                  title: "Alert",
                  message: "Oop's Something went wrong",
                  actionLabel: ["Ok"],
                });
              } else if (res.data["spgetdiscardreason"][0].hasOwnProperty("data")) {
                console.log('*** discard ***', res.data["spgetdiscardreason"][0].data);
                $scope.discard_reason_array = JSON.parse(res.data["spgetdiscardreason"][0].data[0].Discard_reason);
                $scope.overlayStatus = true;
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
        $scope.discard_popup = {};
        $scope.overlayStatus = true;
      }
    };

    $scope.discard_leadSubmit = function () {
      var body = {
        sppartnerdiscarddops: [
          {
            x_lead_id: $scope.selected_card.LEAD_ID,
            x_discard_reason: $scope.discard_popup.reason_desc
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* sppartnerdiscarddops */** ", res);
            if (res.data["sppartnerdiscarddops"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["sppartnerdiscarddops"][0].hasOwnProperty("data")) {
              console.log('*** discard ***', res.data["sppartnerdiscarddops"][0].data);
              if (res.data["sppartnerdiscarddops"][0].data[0].Status === 'Y') {
                $scope.cancel_popup();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Lead discarded successfully",
                  actionLabel: ["Ok"],
                });
                $location.path("/home");
              } else {
                $scope.cancel_popup();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Discard was not completed successfully",
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

    $scope.cancel_popup = function () {
      $scope.discard_popup = {};
      $scope.overlayStatus = false;
    };

    $scope.setReason_popup = function () {
      const reason = document.getElementById('discard_select').value;
      $scope.discard_popup = { reason_id: reason.split(',')[0], reason_desc: reason.split(',')[1] };
      console.log('*** Reason *** ', $scope.discard_popup);
    };

    $scope.submit_disable = function () {
      console.log('disable ', $scope.discard_popup);
      if ($scope.discard_popup.hasOwnProperty('reason_id')) {
        return false;
      } else {
        return true;
      }
    };

    $scope.submit_reassign = function (card) {
      dmDialogueBox
        .confirmBox({
          title: "Message",
          message: "Do you want to reassign the Case?",
          actionLabel: ["Cancel", "Ok"],
        })
        .then(function (res) {
          switch (res) {
            case true:
              $scope.reassign_lead(card);
          }
        });
    };

    $scope.reassign_lead = function (card) {
      $scope.selected_card = card;
      var body = {
        sppartnerleadreassign: [
          {
            x_lead_id: $scope.selected_card.LEAD_ID,
            x_branch_code: $scope.selected_card.X_BRANCH_CODE,
            x_login_id: $scope.username
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* sppartnerleadreassign */** ", res);
            if (res.data["sppartnerleadreassign"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["sppartnerleadreassign"][0].hasOwnProperty("data")) {
              console.log('*** reassign ***', res.data["sppartnerleadreassign"][0].data);
              if (res.data["sppartnerleadreassign"][0].data[0].Status === 'Y') {
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Reassign completed successfully",
                  actionLabel: ["Ok"],
                });
                $location.path("/home");
              } else {
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Reassign request failed",
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

    $scope.remove_card = function () {
      console.log('deleted ', $scope.selected_card);
      console.log('before delete ', $scope.cardView);
      const index = $scope.cardView.findIndex(x => x.LEAD_ID === $scope.selected_card.LEAD_ID);
      $scope.cardView.splice(index, 1);
      console.log('after delete ', $scope.cardView);
      // $scope.pagination();
      // $scope.selected_card = null;
    };

    // Partner leads functions

    // *************************view*******************
    $scope.goToScrutiny = function (gridData) {
      var key,
        keys = Object.keys(gridData);
      var n = keys.length;
      var newobj = {};
      while (n--) {
        key = keys[n];
        newobj[key.toLowerCase()] = gridData[key];
      }
      sessionStorage.setItem("GridData", JSON.stringify(newobj));
      var body = {
        spleadstatus: [
          {
            x_aof_id: gridData.X_LEAD_ID,
            x_login_id: $scope.username,
            x_role: $scope.loginServiceData[0].system_role,
            x_prcess_grp: $scope.loginServiceData[0].x_prc_grp,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* spleadstatus */** ", res);
            if (res.data["spleadstatus"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spleadstatus"][0].hasOwnProperty("data")) {
              var checkLead = res.data.spleadstatus[0].data[0];
              var checkLeadStatus = JSON.parse(checkLead);
              console.log(checkLeadStatus);
              if (checkLeadStatus.RESULT[0].IS_SUCCESS == "B") {
                $scope.access_type(gridData);
              } else if (checkLeadStatus.RESULT[0].IS_SUCCESS == "D") {
                $scope.hideLoader();
                dmDialogueBox
                  .confirmBox({
                    title: "Message",
                    message: "Do you wish to assign this lead to yourself?",
                    actionLabel: ["No", "Yes"],
                  })
                  .then(function (res) {
                    switch (res) {
                      case true:
                        $scope.access_type(gridData);
                    }
                  });
              } else if (checkLeadStatus.RESULT[0].IS_SUCCESS == "Y") {
                $scope.access_type(gridData);
              } else if (checkLeadStatus.RESULT[0].IS_SUCCESS == "N") {
                $scope.hideLoader();
                dmDialogueBox.alertBox({
                  title: "Message",
                  message:
                    "Lead is already Assigned to another User " +
                    checkLeadStatus.RESULT[0].name,
                  actionLabel: ["Ok"],
                });
                $location.path("/cardView");
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

    $scope.access_type = function (gridData) {
      var body = {
        spgetaccesstype: [
          {
            x_aof_id: gridData.X_LEAD_ID,
            x_process_group: $scope.loginServiceData[0].x_prc_grp,
            x_login_id: $scope.username,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* spgetaccesstype */**", res);
            if (res.data["spgetaccesstype"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spgetaccesstype"][0].hasOwnProperty("data")) {
              if (res.data.spgetaccesstype[0].data[0] == "R") {
                // $scope.getJsonDataForOV(gridData);
                $scope.getUCICForETB(gridData); //ETB
              } else if (res.data.spgetaccesstype[0].data[0] == "W") {
                $scope.moveTo_scrutiny(gridData);
              } else {
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "Facing some technical issue.",
                  actionLabel: ["Ok"],
                });
              }
              //     QueueService.setRemarkHistory(res.data.SPREMARKSHIST[0].data[0].v_string_tab);
              //   $scope.getHolderProductMap();
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
    //ETB
    $scope.getUCICForETB = function (gridData) {
      var body = {
        SPCHECKUCICNUMBER: [
          {
            x_aof_id: gridData.X_LEAD_ID2,
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
              if(res.data.SPCHECKUCICNUMBER[0].data[0].STATUS =='Y'){
                // implement logic here to call spgetjson api
                $scope.getJsonDataForOV(gridData);
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
    $scope.getJsonDataForOV = function (gridData) {
      // var selectedGrid =JSON.parse(sessionStorage.getItem('GridData'));
      var body = {
        spgetjson: [
          {
            x_aof_id: gridData.X_LEAD_ID,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        console.log("# spgetjson #", res);
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* spgetjson */**", res);
            if (res.data["spgetjson"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spgetjson"][0].hasOwnProperty("data")) {
              //     QueueService.setRejectionQueue(res.data.spgetjson[0].data)
              QueueService.setQueueJSONData(
                res.data.spgetjson[0].data[0].OBJECT_DATA
              );
              $scope.getFormConfiguration();
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
    $scope.getFormConfiguration = function (data) {
      var selectedGrid = JSON.parse(sessionStorage.getItem("GridData"));
      var body = {
        spformresultcomp: [
          {
            x_queue_id: $scope.selectedQ.queue_id,
            x_source: selectedGrid.x_lead_source,
          },
        ],
      };
      $scope.showLoader("Loading.....");
      console.log("spformresultcomp in card view" + JSON.stringify(body));
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
              console.log($scope.webOnCardResponse);
              QueueService.setQueueCarddata($scope.webOnCardResponse);
              if (selectedGrid.x_lead_source == 'SOLECANTB') {
                $location.path("/ScrutinyForm");
              }
              if (selectedGrid.x_lead_source == 'COMPANY') {
                $location.path("/CompanyForm");
              }
              if (selectedGrid.x_lead_source == 'INDIVIDUAL') {
                $location.path("/IndividualForm");
              }

              if (selectedGrid.x_lead_source == 'PHY_PARTNERSHIP') {
                $location.path("/PartnershipForm");
              }

              if (selectedGrid.x_lead_source == 'PHY_INDIVIDUAL') {
                $location.path("/PhyIndividualForm");
              }
              if (selectedGrid.x_lead_source == 'PHY_SOLECANTB') {
                $location.path("/PhyScrutinyForm");
              }
              if (selectedGrid.x_lead_source == 'PHY_COMPANY') {
                $location.path("/PhyCompanyForm");
              }

              // if (selectedGrid.x_lead_source == 'COMPANY') {
              //   $location.path("/CompanyForm");
              // }
              if (selectedGrid.x_lead_source == 'PHY_HUF_INDI') {
                $location.path("/PhyHUFIndividualForm");
              }
              if (selectedGrid.x_lead_source == 'PHY_HUF_SOLEPROP') {
                $location.path("/PhyHUFScrutinyForm");
              }

              if (selectedGrid.x_lead_source == 'PHY_TRUST') {
                $location.path("/PhyTASCForm");
              }
              if (selectedGrid.x_lead_source == 'PHY_ASSOCIATION') {
                $location.path("/PhyTASCForm");
              }
              if (selectedGrid.x_lead_source == 'PHY_SOCIETY') {
                $location.path("/PhyTASCForm");
              }
              if (selectedGrid.x_lead_source == 'PHY_CLUB') {
                $location.path("/PhyTASCForm");
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
    $scope.moveTo_scrutiny = function (gridData) {
      var body = {
        spsetprcgrpdispd2: [
          {
            x_lead_id: gridData.X_LEAD_ID,
            x_prc_group: $scope.loginServiceData[0].x_prc_grp,
            x_new_disposition: $scope.loginServiceData[0].x_prc_grp,
            x_aof_id: gridData.X_LEAD_ID,
            x_crn_no: "",
            x_member_id: "",
            x_is_isstart: "",
            x_login_id: $scope.username,
            x_processid: "YBL_" + $scope.loginServiceData[0].x_prc_grp + "WIP",
            x_ref_input_1: $scope.loginServiceData[0].x_prc_grp,
            x_ref_input_2: "",
            x_disp_level: "",
            x_text_1: $scope.selectedQ.login_status,
            x_text_2: "",
            x_text_3: "",
            x_text_4: "",
            x_text_5: "",
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
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
                // $scope.getJsonDataForOV(gridData);
                $scope.getUCICForETB(gridData); //ETB
              } else {
                dmDialogueBox.alertBox({
                  title: "Server Error",
                  message: "Error Connecting to server..",
                  actionLabel: ["Ok"],
                });
              }
              //     QueueService.setRemarkHistory(res.data.SPREMARKSHIST[0].data[0].v_string_tab);
              //   $scope.getHolderProductMap();
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

    // IScan report pdf functions

    $scope.decodeBase64ToPdf = function (base64) {
      var link = document.createElement("a");
      link.href = "data:application/pdf;base64," + base64;
      link.download = "Iscan_pdf";
      link.click();
    };

    $scope.download_iscan_report = function (card) {
      console.log(card);
      // AFO1520220516174804
      const keys = {
        COMPANY: "Company",
        OTHERS: "Other"
      };
      const lead_type = keys[card.constitution];
      var body = {
        spgetbase64iscan: [
          {
            lead_id: card.unique_id,
            lead_type: lead_type
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          if (res.status == true) {
            $scope.hideLoader();
            console.log("**/* spgetbase64iscan */**", res);
            if (res.data["spgetbase64iscan"][0].hasOwnProperty("error")) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (res.data["spgetbase64iscan"][0].hasOwnProperty("data")) {
              console.log('Base64');
              if (res.data["spgetbase64iscan"][0].data.length > 0 && res.data["spgetbase64iscan"][0].data[0] !== null) {
                for (let index = 0; index < res.data["spgetbase64iscan"][0].data.length; index++) {
                  $scope.decodeBase64ToPdf(res.data["spgetbase64iscan"][0].data[index].pdf_base64);
                }
              } else {
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "No report available for this lead",
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

    // IScan report pdf functions
  },
]);
