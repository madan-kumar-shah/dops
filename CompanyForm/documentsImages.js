var app = angular.module('Images', []);

app.controller('myCtrl1', ['$scope', '$rootScope', '$filter', '$http', '$timeout', '$location', '$q', '$window', 'dmDialogueBox', '$sce', 'QueueService', 'formValidityPrvdr',
  function ($scope, $rootScope, $filter, $http, $timeout, $location, $q, $window, dmDialogueBox, $sce, QueueService,) {

    $scope.init = function () {
      var doc = JSON.parse(localStorage.getItem("selectedImage"));
      $scope.selected_IMAGE = doc;
      $scope.selectedGrid = JSON.parse(localStorage.getItem('gridData'));
      $scope.selectedQ = JSON.parse(localStorage.getItem('selectedQ'));
      $scope.loginServiceData = JSON.parse(localStorage.getItem('usersession'));
      $scope.username = localStorage.getItem('username');
      $scope.Docs = JSON.parse(localStorage.getItem('Docs_aaray'));
      var hash = localStorage.getItem('HashUrl');
      if(hash == "/CompanyForm") {
        if (doc.form_id == "6") {
          if (doc.doc_des == 'Digital T&C customer photo') {
              $scope.getJsonDataForOV(doc);
          } else {
              $scope.getSignatoryImage_stream(doc);
          }
      } else {
          $scope.getImage_stream(doc);
      }
      }
      else if(hash =="/ScrutinyForm") {
        if(doc.form_id==="675"){
          $scope.getJsonDataForOV(doc);
        }else{
          $scope.getImage_stream_Doc(doc);
        } 
      }   else if(hash =="/IndividualForm"){
        if(doc.form_id==="670"){
          $scope.getJsonDataForOV(doc);
        }else{
          $scope.getImage_stream_Doc(doc);
        } 
      }  else{
        $scope.getImage_stream_Doc(doc);
      }
    }

    $scope.getImage_stream_Doc_TnC = function (doc, obj) {
      var body = {
        SPGETDOCUMENTQUEUELISTNEWCOMPTNC: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
            x_queue_id: $scope.selectedQ["queue_id"],
            x_card_id: "",
            x_system_role: $scope.loginServiceData[0].system_role,
            x_login_id: $scope.username,
            x_image_name: doc.image_name,
            x_source: $scope.selectedGrid.x_lead_source,
            x_contract_id:$scope.GetJSONData.AOF_SP.ENTITY_DATA.INITATE_CONTRACT_CONTRACT_ID?$scope.GetJSONData.AOF_SP.ENTITY_DATA.INITATE_CONTRACT_CONTRACT_ID:''
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* SPGETDOCUMENTQUEUELISTNEWCOMPTNC*/**", res);
            if (
              res.data["SPGETDOCUMENTQUEUELISTNEWCOMPTNC"][0].hasOwnProperty(
                "error"
              )
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["SPGETDOCUMENTQUEUELISTNEWCOMPTNC"][0].hasOwnProperty(
                "data"
              )
            ) {
              $scope.imageDetail =
                res.data.SPGETDOCUMENTQUEUELISTNEWCOMPTNC[0].data[0];
              //$scope.image_name=res.data.SPGETDOCUMENTQUEUELISTNEWCOMPTNC[0].data[0].doc_des;
              $scope.img =
                "data:image/jpeg;base64," + $scope.imageDetail.IMAGE_STREAM;
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
    $scope.getJsonDataForOV = function (doc,obj) {
      // var selectedGrid =JSON.parse(sessionStorage.getItem('GridData'));
      var hash = localStorage.getItem('HashUrl');
      var body = {
        spgetjson: [
          {
            x_aof_id:$scope.selectedGrid.x_lead_id,
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
              const objectData = res.data["spgetjson"][0].data[0]?.OBJECT_DATA;
              if (objectData) {
                QueueService.setQueueJSONData(objectData);
    
                // Ensure data is parsed only after setting it in QueueService
                try {
                  $scope.GetJSONData = JSON.parse(QueueService.getQueueJSONData());
                  console.log("Parsed Data:", $scope.GetJSONData);
                  if(hash == "/ScrutinyForm") {
                  $scope.getImage_stream_Doc_TnC(doc);
                  }
                 else if(hash == "/CompanyForm") {
                  $scope.myFilter(doc,obj);
                 
                  }else if(hash == "/IndividualForm") {
                    $scope.getImage_stream_Doc_TnC(doc);
                   
                    }
                } catch (error) {
                  console.error("Error parsing JSON data:", error);
                }
              } else {
                dmDialogueBox.alertBox({
                  title: "Message",
                  message: "No data available.",
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
    $scope.getImage_stream_Doc_TnC = function (doc, obj) {
      var body = {
        SPGETDOCUMENTQUEUELISTNEWCOMPTNC: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
            x_queue_id: $scope.selectedQ["queue_id"],
            x_card_id: "",
            x_system_role: $scope.loginServiceData[0].system_role,
            x_login_id: $scope.username,
            x_image_name: doc.image_name,
            x_source: $scope.selectedGrid.x_lead_source,
            x_contract_id:$scope.GetJSONData.AOF_SP.ENTITY_DATA.INITATE_CONTRACT_CONTRACT_ID?$scope.GetJSONData.AOF_SP.ENTITY_DATA.INITATE_CONTRACT_CONTRACT_ID:''
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* SPGETDOCUMENTQUEUELISTNEWCOMPTNC*/**", res);
            if (
              res.data["SPGETDOCUMENTQUEUELISTNEWCOMPTNC"][0].hasOwnProperty(
                "error"
              )
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["SPGETDOCUMENTQUEUELISTNEWCOMPTNC"][0].hasOwnProperty(
                "data"
              )
            ) {
              $scope.imageDetail =
                res.data.SPGETDOCUMENTQUEUELISTNEWCOMPTNC[0].data[0];
              //$scope.image_name=res.data.SPGETDOCUMENTQUEUELISTNEWCOMPTNC[0].data[0].doc_des;
              $scope.img =
                "data:image/jpeg;base64," + $scope.imageDetail.IMAGE_STREAM;
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
    $scope.myFilter = function (doc,obj) {
      $scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE.forEach((x, index) => {
        x.json_index = index;
      });
      if ($scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE) {
        $scope.duplicateObjectType = [
          ...$scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE,
        ];
        $scope.duplicateObjectType.sort((a, b) => {
          if (a.Sort == "Y") return 1;
          else if (a.Sort == "N") return -1;
          else return -1;
        });
          // Set the selected index (example: assume you have a selected item)
  const selectedItem = $scope.duplicateObjectType.find(item => item.selected); // Replace `selected` with your condition
  $scope.stakeholder_INDEX = selectedItem ? selectedItem.json_index : 0;
      }
      $scope.getSignatoryImage_stream_TnC(doc,$scope.stakeholder_INDEX,obj);
    };
    $scope.getSignatoryImage_stream_TnC = function (doc, stakeholder_INDEX,obj) {
      var body = {
        SPGETDOCUMENTQUEUELISTNEWCOMPROLETNC: [
          {
            x_aof_id: $scope.selectedGrid.x_lead_id,
            x_queue_id: $scope.selectedQ["queue_id"],
            x_card_id: "",
            x_system_role: $scope.loginServiceData[0].system_role,
            x_login_id: $scope.username,
            x_image_name: doc.image_name,
            x_source: $scope.selectedGrid.x_lead_source,
            x_din_number: doc.din_number,
            x_contract_id:$scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[stakeholder_INDEX].INITATE_CONTRACT_CONTRACT_ID?$scope.GetJSONData.AOF_CP.ENTITY_DATA.OBJECT_TYPE[stakeholder_INDEX].INITATE_CONTRACT_CONTRACT_ID:''
          },
        ],
      };
      $scope.showLoader("Loading.....");
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log("**/* SPGETDOCUMENTQUEUELISTNEWCOMPROLETNC */**", res);
            if (
              res.data["SPGETDOCUMENTQUEUELISTNEWCOMPROLETNC"][0].hasOwnProperty(
                "error"
              )
            ) {
              dmDialogueBox.alertBox({
                title: "Alert",
                message: "Oop's Something went wrong",
                actionLabel: ["Ok"],
              });
            } else if (
              res.data["SPGETDOCUMENTQUEUELISTNEWCOMPROLETNC"][0].hasOwnProperty(
                "data"
              )
            ) {
              $scope.imageDetail =
                res.data.SPGETDOCUMENTQUEUELISTNEWCOMPROLETNC[0].data[0];
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
    $scope.getImage_stream_Doc = function (doc, obj) {
      let DIY_Ind = [17, 18, 19, 20, 21, 22, 23,24];
      if (DIY_Ind.includes($scope.selectedQ.queue_id)) {
        $scope.selectedGrid.x_lead_source = 'DIY_INDIVIDUAL';
      }
      var body = {
        "spgetdocumentqueuelistnewcomp": [  {
          x_aof_id: $scope.selectedGrid.x_lead_id,
          x_queue_id: $scope.selectedQ["queue_id"],
          x_card_id: $scope.selectedGrid.x_lead_source == 'DIY_INDIVIDUAL' ? doc.form_id : "",
          x_system_role: $scope.loginServiceData[0].system_role,
          x_login_id: $scope.username,
          x_image_name: doc.image_name,
          x_source: $scope.selectedGrid.x_lead_source,
        },]
      }

      $scope.showLoader('Loading.....');
      executeApi(newplatwareHeader, body, function (res) {
        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log('**/* spgetdocumentqueuelistnewcomp2*/**', res);
            if (res.data['spgetdocumentqueuelistnewcomp'][0].hasOwnProperty('error')) {
              dmDialogueBox.alertBox({
                title: 'Alert',
                message: "Oop's Something went wrong",
                actionLabel: ['Ok']
              });
            } else if (res.data['spgetdocumentqueuelistnewcomp'][0].hasOwnProperty('data')) {
              $scope.imageDetail = res.data.spgetdocumentqueuelistnewcomp[0].data[0];
              $scope.img = 'data:image/jpeg;base64,' + $scope.imageDetail.image_stream;
              $scope.img_Rotate = $scope.img;
              if ($scope.Docs) {

              }
              if (obj == 'PREVIOUS_NEXT')
                $scope.SET_IMAGE_WIDTH_HEIGTH($scope.img_Rotate);
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
            dmDialogueBox.alertBox({
              title: 'Server Error',
              message: 'Error Connecting to server..',
              actionLabel: ['Ok']
            });
          }
        })
      })
    }


    $scope.getImage_stream = function (doc, obj) {
      var body = {
        "spgetdocumentqueuelistnewcomp": [{
          x_aof_id: $scope.selectedGrid.x_lead_id,
          x_queue_id: $scope.selectedQ['queue_id'],
          x_card_id: '',
          x_system_role: $scope.loginServiceData[0].system_role,
          x_login_id: $scope.username,
          x_image_name: doc.image_name,
          x_source: $scope.selectedGrid.x_lead_source

        }]
      }
      $scope.showLoader('Loading.....');
      executeApi(newplatwareHeader, body, function (res) {

        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log('**/* spgetdocumentqueuelistnewcomp */**', res);
            if (res.data['spgetdocumentqueuelistnewcomp'][0].hasOwnProperty('error')) {
              dmDialogueBox.alertBox({
                title: 'Alert',
                message: "Oop's Something went wrong",
                actionLabel: ['Ok']
              });
            } else if (res.data['spgetdocumentqueuelistnewcomp'][0].hasOwnProperty('data')) {
              $scope.imageDetail = res.data.spgetdocumentqueuelistnewcomp[0].data[0];
              $scope.img = 'data:image/jpeg;base64,' + $scope.imageDetail.image_stream;
              $scope.img_Rotate = $scope.img;
              console.log("1.1")
              if ($scope.Docs) {

              }
              if (obj == 'PREVIOUS_NEXT')
                $scope.SET_IMAGE_WIDTH_HEIGTH($scope.img_Rotate);
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
            dmDialogueBox.alertBox({
              title: 'Server Error',
              message: 'Error Connecting to server..',
              actionLabel: ['Ok']
            });
          }
        })
      })
    }
    $scope.SET_IMAGE_WIDTH_HEIGTH = function (obj) {
      obj = localStorage.getItem("obj");
      var image = new Image();
      image.onload = function () {
        image.width;
        image.height;
        $scope.IMAGE_WIDTH = image.width > 400 ? 400 : image.width;
        $scope.IMAGE_HEIGHT = image.height > 560 ? 560 : image.height;
        document.getElementById('container').width = $scope.IMAGE_WIDTH;
        document.getElementById('container').height = $scope.IMAGE_HEIGHT;
      }
      image.src = obj;
    }

    $scope.getSignatoryImage_stream = function (doc, obj) {
      var body = {
        "spgetdocumentqueuelistnewcomprole": [{
          x_aof_id: $scope.selectedGrid.x_lead_id,
          x_queue_id: $scope.selectedQ['queue_id'],
          x_card_id: '',
          x_system_role: $scope.loginServiceData[0].system_role,
          x_login_id: $scope.username,
          x_image_name: doc.image_name,
          x_source: $scope.selectedGrid.x_lead_source,
          x_din_number: doc.din_number

        }]
      }
      $scope.showLoader('Loading.....');
      executeApi(newplatwareHeader, body, function (res) {

        $scope.$apply(function () {
          $scope.hideLoader();
          if (res.status == true) {
            console.log('**/* spgetdocumentqueuelistnewcomprole */**', res);
            if (res.data['spgetdocumentqueuelistnewcomprole'][0].hasOwnProperty('error')) {
              dmDialogueBox.alertBox({
                title: 'Alert',
                message: "Oop's Something went wrong",
                actionLabel: ['Ok']
              });
            } else if (res.data['spgetdocumentqueuelistnewcomprole'][0].hasOwnProperty('data')) {
              $scope.imageDetail = res.data.spgetdocumentqueuelistnewcomprole[0].data[0];
              $scope.img = 'data:image/jpeg;base64,' + $scope.imageDetail.image_stream;
              $scope.img_Rotate = $scope.img;
              if ($scope.Docs) {

              }
              if (obj == 'PREVIOUS_NEXT')
                $scope.SET_IMAGE_WIDTH_HEIGTH($scope.img_Rotate);
            } else {
              $scope.hideLoader();
              dmDialogueBox.alertBox({
                title: 'Message',
                message: "Oop's Something went wrong",
                actionLabel: ['Ok']
              });
            }
          } else if (res.status == false && res.errorCode == "PW-0002" && res.serverCode == "528") {
            localStorage.clear();
            $location.path('/');
          }
          else {
            dmDialogueBox.alertBox({
              title: 'Server Error',
              message: 'Error Connecting to server..',
              actionLabel: ['Ok']
            });
          }
        })
      })
    }


    $scope.PREVIOUS_IMAGE = function () {
      var hash = localStorage.getItem('HashUrl');
      var doc = JSON.parse(localStorage.getItem("selectedImage"));
       $scope.LIST_OF_IMAGE = $filter('byProp')($scope.Docs, 'form_id', $scope.selected_IMAGE.form_id);
      (function () {
        for (i = 0; i < $scope.LIST_OF_IMAGE.length; i++) {
          $scope.LIST_OF_IMAGE[i]['seqence'] = i + 1;
        }
      })();

      for (let j = 0; j < $scope.LIST_OF_IMAGE.length; j++) {
        if ($scope.LIST_OF_IMAGE[j].image_name == $scope.selected_IMAGE.image_name) {
          $scope.selected_IMAGE.seqence = $scope.LIST_OF_IMAGE[j]['seqence']
          break
        }

      }
      if ($scope.selected_IMAGE['seqence'] == 1) {
        dmDialogueBox.toastBox({
          title: 'Image',
          message: 'No Previous Image!',
          actionlabel: ['OK'],
          messageType: 'error'
        });
      } else {
        $scope.image_next = $filter('byProp')($scope.Docs, 'seqence', $scope.selected_IMAGE['seqence'] - 1);
        $scope.selected_IMAGE = $scope.image_next[0];
        if(hash == "/CompanyForm") {
          if (doc.form_id == "6") {
            if ($scope.selected_IMAGE == 'Digital T&C customer photo') {
                $scope.getJsonDataForOV($scope.image_next[0], 'PREVIOUS_NEXT');
            } else {
                $scope.getSignatoryImage_stream($scope.image_next[0], 'PREVIOUS_NEXT');
            }
        } else {
            $scope.getImage_stream($scope.image_next[0], 'PREVIOUS_NEXT');
        }
        }
        else if(hash =="/ScrutinyForm") {
          if(doc.form_id==="675"){
            $scope.getJsonDataForOV($scope.image_next[0], 'PREVIOUS_NEXT');
          }else{
            $scope.getImage_stream_Doc($scope.image_next[0], 'PREVIOUS_NEXT');
          } 
        }   else if(hash =="/IndividualForm"){
          if(doc.form_id==="670"){
            $scope.getJsonDataForOV($scope.image_next[0], 'PREVIOUS_NEXT');
          }else{
            $scope.getImage_stream_Doc($scope.image_next[0], 'PREVIOUS_NEXT');
          } 
        }  else{
          $scope.getImage_stream_Doc($scope.image_next[0], 'PREVIOUS_NEXT');
        }
        // $scope.getImage_stream($scope.image_next[0], 'PREVIOUS_NEXT');
      }

    }

    $scope.zoomIn = function () {
      document.getElementById('container').width = document.getElementById('container').naturalWidth;
      document.getElementById('container').height = document.getElementById('container').naturalHeight;
    }

    $scope.zoomOUT = function () {
      document.getElementById('container').height = $scope.IMAGE_HEIGHT;
      document.getElementById('container').width = $scope.IMAGE_WIDTH;

    }
    var angle = 0;
    $scope.rotate = function () {
      angle = (angle + 90) % 360;
      document.getElementById('container').style.transform = `rotate(${angle}deg)`;
    }
    $scope.NEXT_IMAGE = function () {
      var hash = localStorage.getItem('HashUrl');
      var doc = JSON.parse(localStorage.getItem("selectedImage"));
      $scope.LIST_OF_IMAGE = $filter('byProp')($scope.Docs, 'form_id', $scope.selected_IMAGE.form_id);
      (function () {
        for (i = 0; i < $scope.LIST_OF_IMAGE.length; i++) {
          $scope.LIST_OF_IMAGE[i]['seqence'] = i + 1;
        }
      })();
      for (let j = 0; j < $scope.LIST_OF_IMAGE.length; j++) {
        if ($scope.LIST_OF_IMAGE[j]['image_name'] == $scope.selected_IMAGE.image_name) {
          $scope.selected_IMAGE.seqence = $scope.LIST_OF_IMAGE[j]['seqence'];
          break
        }
      }
      if ($scope.selected_IMAGE['seqence'] == $scope.LIST_OF_IMAGE.length) {
        dmDialogueBox.toastBox({
          title: 'Image',
          message: 'No more image!',
          actionlabel: ['OK'],
          messageType: 'error'
        });
      } else {
        $scope.image_next = $filter('byProp')($scope.Docs, 'seqence', $scope.selected_IMAGE['seqence'] + 1);
        $scope.selected_IMAGE = $scope.image_next[0];
        if(hash == "/CompanyForm") {
          if (doc.form_id == "6") {
            if ($scope.selected_IMAGE.doc_des == 'Digital T&C customer photo') {
                $scope.getJsonDataForOV($scope.image_next[0], 'PREVIOUS_NEXT');
            } else {
                $scope.getSignatoryImage_stream($scope.image_next[0], 'PREVIOUS_NEXT');
            }
        } else {
            $scope.getImage_stream($scope.image_next[0], 'PREVIOUS_NEXT');
        }
        }
        else if(hash =="/ScrutinyForm") {
          if(doc.form_id==="675"){
            $scope.getJsonDataForOV($scope.image_next[0], 'PREVIOUS_NEXT');
          }else{
            $scope.getImage_stream_Doc($scope.image_next[0], 'PREVIOUS_NEXT');
          } 
        }   else if(hash =="/IndividualForm"){
          if(doc.form_id==="670"){
            $scope.getJsonDataForOV($scope.image_next[0], 'PREVIOUS_NEXT');
          }else{
            $scope.getImage_stream_Doc($scope.image_next[0], 'PREVIOUS_NEXT');
          } 
        }  else{
          $scope.getImage_stream($scope.image_next[0], 'PREVIOUS_NEXT');
        }
        // $scope.getImage_stream($scope.image_next[0], 'PREVIOUS_NEXT');
      }

    }
    $scope.init();
  }]);
