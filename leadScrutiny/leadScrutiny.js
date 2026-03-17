var leadModule = angular.module('myApp.leadScutiny', []);
leadModule.factory('docImageRequest', ['$http', 'environmentVars', function($http, environmentVars) {
    // factory to get image from server using imageAPI 
    function randomString(length) {
        var chars = '0123456789';
        var result = '';
        for (var i = length; i > 0; --i)
            result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }

    return {
        getImage: function(data) {
            var randomKey = randomString(8);
            var aofId = data['lms_aof_id'];
            var memberid = data['lead_member_id'];
            var docPurpose = data['doc_purpose'];
            var docId = data['doc_id'];
            var imageId = data['image_id'];
            var imagePath = data['doc_image_path'];

            var reqData = {
                request_type: 'get',
                LMS_AOF_ID: aofId,
                LEAD_MEMBER_ID: memberid,
                DOC_PURPOSE: docPurpose,
                DOC_ID: docId,
                IMAGE_ID: imageId,
                RECORD_ID: imageId,
                DOC_IMAGE_PATH: imagePath
            };
            return $http({
                url: environmentVars.apiURL + '#' + randomKey, //UAT server
                //url: 'http://localhost/testProject/KotakImageApiBNS.php#' + randomKey,
                method: 'POST',
                responseType: "blob",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', //'',
                    "Pragma": "no-cache",
                    "Expires": "-1",
                    "Cache-Control": "no-cache"
                },
                data: Object.keys(reqData).reduce(function(a, k) {
                    a.push(k + '=' + encodeURIComponent(reqData[k]));
                    return a;
                }, []).join('&'),
                timeout: 120000
            });
            //    return $http.get('json_data/images/' + data + '.jpg');
            //                return $http({
            //                    url: finalUrl,
            //                    method: "GET",
            //                    responseType: "blob"
            //                }).success(function (response) {
            //                    
            //                }).error(function (error) {
            //                    return error;
            //                });
        },
        reTagImage: function(reqData) {
            //                var aofId = data['lms_aof_id'];
            //                var memberid = data['lead_member_id'];
            //                var oldDocPurpose = data['doc_purpose'];
            //                var oldDocId = data['doc_id'];
            //                var imageId = data['image_id'];
            //                var newDocPurpose = data['newDocPurpose'];
            //                var newDocId = data['newDocId'];
            //                var reqData = {
            //                    request_type: 'get',
            //                    LMS_AOF_ID: aofId,
            //                    LEAD_MEMBER_ID: memberid,
            //                    OLD_DOC_PURPOSE: oldDocPurpose,
            //                    OLD_DOC_ID: oldDocId,
            //                    NEW_DOC_PURPOSE: newDocPurpose,
            //                    NEW_DOC_ID: newDocId,
            //                    IMAGE_ID: imageId,
            //                    RECORD_ID: imageId
            //                };
            var randomKey = randomString(8);
            return $http({
                url: environmentVars.apiURL + '#' + randomKey, //UAT Server
                //url: domainUrl + 'KotakImageApiBNS.php#' + randomKey,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }, // ''},
                data: Object.keys(reqData).reduce(function(a, k) {
                    a.push(k + '=' + encodeURIComponent(reqData[k]));
                    return a;
                }, []).join('&'),
                timeout: 120000
            });
        },
        uploadImage: function(reqData) {
            var xhr = new XMLHttpRequest();
            var fdn = new FormData();
            var randomKey = randomString(8);
            angular.forEach(reqData, function(value, key) {
                if (Object.prototype.toString.call(value) === "[object File]") {
                    fdn.append("file", reqData.file);
                } else {
                    fdn.append(key, value);
                }
            });

            //                xhr.open("POST", domainUrl + 'KotakImageApiBNS.php#' + randomKey, true);
            //                xhr.send(fdn)
            return $http({
                url: environmentVars.apiURL + '#' + randomKey, //UAT Server
                //url: 'http://localhost/KotakImageApiBNS.php#' + randomKey,
                method: 'POST',
                headers: {
                    'Content-Type': undefined
                },
                data: reqData,
                transformRequest: function(data, headersGetter) {
                    var formData = new FormData();
                    angular.forEach(data, function(value, key) {
                        formData.append(key, value);
                    });

                    var headers = headersGetter();
                    //delete headers['Content-Type'];

                    return formData;
                },

                timeout: 120000
            });
        }
    };
}]);
leadModule.controller('leadCtrl', ['$scope', '$location', '$filter', '$rootScope', '$q', 'QueueService', 'platwareRequest', 'parsePlatwareResponse', 'dmDialogueBox', 'docImageRequest', function($scope, $location, $filter, $rootScope, $q, QueueService, platwareRequest, parsePlatwareResponse, dmDialogueBox, docImageRequest) {

    $scope.searchLead = '';
    $scope.showOverlay = false;
    $scope.showGalleryContainer = false;
    $scope.showCardContainer = false;
    $scope.isParentRemarksContainerShown = false;
    $scope.showCardContainerOverlay = false;
    $scope.currentImage = 0;
    $scope.leadFormData = {};
    $scope.fvBtnDisabled = true;
    $scope.cardData = QueueService.getQueueCardData();
    console.log($scope.cardData)
    $scope.selectedQueueData = QueueService.getSelectedQueue();

    console.log($scope.selectedQueueData);
    $scope.cardWebOn = QueueService.getQueueCardData()[0]
        // Advanvced srearch starts here
    $scope.openedForm = "ADVANCE SEARCH";
    $scope.submitAdvance = function() {
        // $scope.leadFormData = {};
        // leadFormData['QUEUE_ID']=$scope.selectedQueueData['Queue_ID'];
        // console.log($scope.leadFormData);
        $scope.leadFormData['QUEUE_ID'] = $scope.selectedQueueData.QUEUE_ID;
        var reqData = [{
            processName: $scope.cardWebOn.GOLBAL_SEARCH_PROCESS_ID,
            data: [{
                X_ADV_SCR_JSON: JSON.stringify($scope.leadFormData)
            }]
        }];
        $scope.showLoader('Getting Leads')
        platwareRequest.callPlatware(reqData).success(function(response) {
            var queueLeadResponse = parsePlatwareResponse.parse(response);
            $scope.hideLoader()
            if (queueLeadResponse[0]['isError'] == 'N') {
                queueLeadResponse = JSON.parse(queueLeadResponse[0]['data'][0][':b1']);
                $scope.leads = queueLeadResponse['X_LEAD_SUMMARY'];
                angular.forEach($scope.leads, function(value, key) {
                    if (value['X_EXCEPTION_COUNT'] == "0") {

                    } else {
                        $scope.isFVActionBtnDisabled[value['X_AOF_ID']] = true;
                    }

                })
                console.log($scope.isFVActionBtnDisabled)

            } else {
                dmDialogueBox.alertBox({
                    title: 'Data Error',
                    message: 'Some Error Occured while fetching data',
                    actionLabel: ['OK']
                });
            }
        })
    }
    $scope.goToScrutinyForm = function(lead) {
        var switchQueue = $scope.cardData[0]['FV_OV_SWITCH_QUEUE'];

        var reqData = [{
            processName: "SPGETOVQUEUEMST",
            data: [{
                "QUEUE_ID": switchQueue.toString()
            }]
        }];
        $scope.showLoader('Getting Data');
        platwareRequest.callPlatware(reqData).success(function(response) {
            var webOnCardResponse = parsePlatwareResponse.parse(response);
            $scope.hideLoader();
            webOnCardResponse = JSON.parse(webOnCardResponse[0]['data'][0]['ov_data']);
            QueueService.setQueueCarddata(webOnCardResponse);
            QueueService.setCurrentAOFId(lead['X_AOF_ID']);
            $location.path('/queueData');
        })
    }
    $scope.resetAdvance = function() {
            $scope.leadFormData = {}
        }
        // Advanced search Ends here
    $scope.currentFormParameters = $scope.cardData[0]['ADVANCE_SEARCH'];
    $scope.currentFormParameters = $filter('orderObjectBy')($scope.currentFormParameters, 'PARAM_SEQ');
    $scope.currentFormSections = $filter('unique')($scope.currentFormParameters, 'PARAM_GROUP');
    $scope.checkSectionVisible = function(sectionName, dataObj, currentFormParameters) {
        var returnValue = false;
        var sectionArray = $filter('byProp')(currentFormParameters, 'PARAM_GROUP', sectionName);
        angular.forEach(sectionArray, function(paramObj) {
            if ($scope.checkFormElement(paramObj, dataObj)) {
                returnValue = true;
            }
        });
        return returnValue;
    };
    $scope.checkFormElement = function(parameter, dataObj) {
        var isElementVisible = false;
        var parentsControl = parameter['parents_control'];
        var chkForParentObj = function(parentObj) {
            var returnValue = false;
            var parentFormId = parentObj['parent_form_id'];
            var parentControlId = parentObj['parent_control_id'];
            var parentFormAction = parentObj['parent_form_action'];
            var parentJsonName = parentObj['parent_json_name'];
            var parentParamVal = parentObj['parent_param_val'];
            switch (parentFormAction.toLowerCase()) {
                case 'hide':
                    var parentFormParams = $filter('byProp')($scope.paramMasters, 'FORM_ID', parentFormId);
                    var parentParamDataType = $filter('byProp')(parentFormParams, 'paramter_id', parentControlId)[0]['DATA_TYPE'].toLowerCase();
                    switch (parentParamDataType) {
                        case 'date':
                            var today = new Date();
                            var today_utc = (today.getTime() + today.getTimezoneOffset());
                            var date = dataObj[parentFormId][parentJsonName];
                            //                                var dateArr = date.split("-");
                            //                                var selectedDate = new Date(dateArr[0], parseInt(dateArr[1]) - 1, dateArr[2], 00, 00, 00);
                            var selectedDate = $filter('parseServerDate')(date);
                            var selectedDate_utc = (selectedDate.getTime() + selectedDate.getTimezoneOffset());
                            switch (true) {
                                case parentParamVal.toLowerCase() == 't':
                                    break;
                                case parentParamVal.toLowerCase().indexOf('t-d') > -1:
                                    switch (true) {
                                        case parentParamVal.toLowerCase().indexOf('>') > -1:
                                            break;
                                        case parentParamVal.toLowerCase().indexOf('<') > -1:
                                            var valuetocheck = parentParamVal.split("<");
                                            valuetocheck = parseInt(valuetocheck[1]);
                                            var milliDiff = today_utc - selectedDate_utc;
                                            var yearsDiff = milliDiff / (24 * 60 * 60 * 1000 * 365.242);
                                            if (yearsDiff < valuetocheck) {
                                                returnValue = true;
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                    break;
                                default:

                                    break;
                            }
                            break;
                        case 'tcb':
                            var value = dataObj[parentFormId][parentJsonName];
                            var valueType = Object.prototype.toString.call(value);
                            switch (valueType) {
                                case '[object Object]':
                                    angular.forEach(value, function(value, key) {
                                        if (key.toLowerCase() == parentParamVal.toLowerCase() && value.toLowerCase() === 'y') {
                                            returnValue = true;
                                        }
                                    });
                                    break;
                                case '[object String]':
                                    if (dataObj[parentFormId][parentJsonName].toLowerCase() === parentParamVal.toLowerCase()) {
                                        returnValue = true;
                                    }
                                    break;
                                default:
                            }
                            break;
                        default:
                            if (dataObj[parentFormId][parentJsonName].toLowerCase() === parentParamVal.toLowerCase()) {
                                returnValue = true;
                            }
                            break;
                    }
                    break;
                case 'filter':
                    returnValue = true;
                    break;
            }
            return returnValue;
        };
        // if (parentsControl.length <= 0) {
        //     return true;
        // }
        var parentObjResponse = [];
        try {
            if (parentsControl.length > 0) {
                for (var i = 0; i < parentsControl.length; i++) {
                    var parentControlObj = parentsControl[i];
                    if ((parentObjResponse.length <= 0) || parentObjResponse[i - 1]) {
                        parentObjResponse.push(chkForParentObj(parentControlObj));
                    } else {
                        parentObjResponse.push(false);
                    }
                }
                if (parentObjResponse.indexOf(false) > -1) {
                    var action = parentsControl[parentObjResponse.indexOf(false)]['parent_form_action'];
                    switch (action.toLowerCase()) {
                        case 'hide':
                            isElementVisible = false;
                            break;
                        case 'filter':
                            isElementVisible = true;
                            break;
                    }
                } else {
                    isElementVisible = true;
                }
            }
        } catch (e) {

        }
        return isElementVisible;
    };
    // Ends here
    // $scope.cardWebOn=JSON.parse(localStorage.getItem('currentQueCardData'))[0];
    console.log($scope.cardWebOn)
    $scope.isFVActionBtnDisabled = {};

    $scope.dmTableDataActions = [{
        action_title: "Done",
        action_function: "doneGridData",
        seq_num: "1",
        visibility: 'cb'
    }];
    $scope.closeDataContainer = function() {
        $scope.showGridContainer = false;
        $scope.showOverlay = false;
        $scope.isRemarksContainerShown = false;
        $scope.showCardContainer = false;
        $scope.showGalleryContainer = false;

    }
    $scope.closeDataContainerDm = function() {
            $scope.showGridContainer = false;
            $scope.showOverlay = false;

            $scope.isRemarksContainerShown = false;
            // $scope.showCardContainer = true;
            $scope.showGalleryContainer = false;

        }
        // Style for Action starts here
    $scope.getStyleAction = function(queueCode) {
        var style = {};
        var count = 0;
        if (queueCode.FV_CARD_ACTION.length == 1) {
            style.width = "100%";
        } else if (queueCode.FV_CARD_ACTION.length == 2) {
            style.width = "50%";
        } else if (queueCode.FV_CARD_ACTION.length == 3) {
            style.width = "33%";
        } else if (queueCode.FV_CARD_ACTION.length == 4) {
            style.width = "25%";
        } else {
            style.width = "33%";
        }
        return style;
    }

    // Style for Action Ends here
    // $scope.scrutinyInit = function() {
    $scope.closeParentRemarksContainer = function() {
        $scope.showOverlay = false;
        $scope.isParentRemarksContainerShown = false;
    }
    $scope.closeRemarksContainer = function() {
        $scope.showCardContainerOverlay = false;
        $scope.isRemarksContainerShown = false;
        $scope.childActionRemarks = '';
    }
    $scope.scrutinyInit = function() {
        var queueConfig = QueueService.getSelectedQueue();
        //  var queueConfig = JSON.parse(localStorage.getItem('selectedQueue'));
        // By aditya starts here
        var usersessionObj = JSON.parse(sessionStorage.getItem('usersession'))
            // By aditya Ends here
        var reqData = [{
            processName: queueConfig['GET_LIST_PROCESS_NAME'],
            data: [{
                QUEUE_ID: queueConfig['QUEUE_ID'].toString(),
                SYSTEMROLE: usersessionObj.system_role
            }]
        }];
        $scope.showLoader('Getting Leads')
        platwareRequest.callPlatware(reqData).success(function(response) {
            var queueLeadResponse = parsePlatwareResponse.parse(response);
            $scope.hideLoader()
            if (queueLeadResponse[0]['isError'] == 'N') {
                queueLeadResponse = JSON.parse(queueLeadResponse[0]['data'][0][':b1']);
                $scope.leads = queueLeadResponse['X_LEAD_SUMMARY'];
                angular.forEach($scope.leads, function(value, key) {
                    if (value['X_EXCEPTION_COUNT'] == "0") {

                    } else {
                        $scope.isFVActionBtnDisabled[value['X_AOF_ID']] = true;
                    }

                })
                console.log($scope.isFVActionBtnDisabled)

            } else {
                dmDialogueBox.alertBox({
                    title: 'Data Error',
                    message: 'Some Error Occured while fetching data',
                    actionLabel: ['OK']
                });
            }

        }).error(function(error) {
            //alert(er);
            dmDialogueBox.alertBox({
                title: 'Server Error',
                message: 'Server not responding..',
                actionLabel: ['OK']
            });
            $scope.hideLoader();
        });
    }
    $scope.getGridData = function(eleData, aofId, excId) {
        var reqData = [{
            processName: eleData['DETAIL_SOURCE'],
            data: [{
                X_AOF_ID: aofId,
                X_EXCEPTION_ID: excId
            }]

        }];

        platwareRequest.callPlatware(reqData).success(function(response) {
            var queueLeadResponse = parsePlatwareResponse.parse(response);
            $scope.hideLoader();
            if (queueLeadResponse[0]['isError'] == 'N') {
                $scope.resData = queueLeadResponse[0]['data'][0]['grid_data'];
                $scope.resData = JSON.parse($scope.resData);
                if ($scope.resData == "" || !$scope.resData) {
                    dmDialogueBox.toastBox({
                        title: 'Login Error!',
                        message: 'NO Data Found',
                        actionlabel: ['OK'],
                        messageType: 'error'
                    });
                } else {
                    $scope.showOverlay = true;
                    $scope.showGridContainer = true;
                    $scope.gridViewData = JSON.parse(queueLeadResponse[0]['data'][0]['grid_data']);
                }
            } else {
                dmDialogueBox.alertBox({
                    title: 'Data Error',
                    message: 'Some Error Occured while fetching data',
                    actionLabel: ['OK']
                });


            }
        }).error(function(error) {
            //alert(er);
            dmDialogueBox.alertBox({
                title: 'Server Error',
                message: 'Server not responding..',
                actionLabel: ['OK']
            });
            $scope.hideLoader();
        });
    }

    $scope.getGalleryData = function(eleData, aofId) {
        var reqData = [{
            processName: eleData['DETAIL_SOURCE'],
            data: [{
                X_AOF_ID: aofId
            }]

        }];
        $scope.showLoader('fetching image data')
        platwareRequest.callPlatware(reqData).success(function(response) {
            var leadGalleryResponse = parsePlatwareResponse.parse(response);
            $scope.hideLoader();
            if (leadGalleryResponse[0]['isError'] == 'N') {
                $scope.documentsList = leadGalleryResponse[0]['data'];

                $scope.getDocumentsImages($scope.documentsList);
            } else {
                dmDialogueBox.alertBox({
                    title: 'Data Error',
                    message: 'Some Error Occured while fetching data',
                    actionLabel: ['OK']
                });

            }

        }).error(function(error) {
            //alert(er);
            dmDialogueBox.alertBox({
                title: 'Server Error',
                message: 'Server not responding..',
                actionLabel: ['OK']
            });
            $scope.hideLoader();
        });
    }
    $scope.createTableHeading = function(elementData) {
        $scope.tableHeading = '';
        var tableHeaderArr = elementData['GRID_DFN'][0]['GRID_ELEMENT_DFN'];
        for (var i = 0; i < tableHeaderArr.length; i++) {
            if ($scope.tableHeading.length > 0) {
                $scope.tableHeading = $scope.tableHeading + "~" + tableHeaderArr[i]['COLUMN_OBJ_NAME'];
            } else {
                $scope.tableHeading = $scope.tableHeading + tableHeaderArr[i]['COLUMN_OBJ_NAME'];
            }

        }

        console.log($scope.tableHeading)
    }
    $scope.getExceptionData = function(eleData, aofId) {
        if (!$scope.aofSatatusObject) {
            $scope.aofSatatusObject = {};
        }
        if (!(aofId in $scope.aofSatatusObject)) {

            $scope.aofSatatusObject[aofId] = {}
        }
        $scope.exceptionCardWebOn = eleData['FV_DFN_CHILD']
        var primaryKey = $scope.cardWebOn['PRIMARY_KEY_ATTRIBUTE1']
        console.log($scope.exceptionCardWebOn)
        var usersessionObj = JSON.parse(sessionStorage.getItem('usersession'))
        var reqData = [{
            processName: eleData['DETAIL_SOURCE'],
            data: [{
                [primaryKey]: aofId,
                SYSTEMROLE: usersessionObj.system_role,
                CARD_ID: $scope.cardWebOn.CARD_ID.toString(),
                QUEUE_ID: $scope.cardWebOn.QUEUE_ID.toString()
            }]

        }];

        platwareRequest.callPlatware(reqData).success(function(response) {
            $scope.hideLoader();
            var exceptionData = parsePlatwareResponse.parse(response)
            if (exceptionData[0]['isError'] == 'N') {
                $scope.exceptionData = exceptionData[0]['data'];

                for (var i = 0; i < $scope.exceptionData.length; i++) {
                    $scope.aofSatatusObject[aofId][$scope.exceptionData[i]['exception_id']] = "pending";

                }
                //     console.log(queueLeadResponse)

                if ($scope.exceptionData.length == 0) {
                    $scope.isFVActionBtnDisabled[aofId] = false;
                    dmDialogueBox.alertBox({
                        title: 'Alert',
                        message: 'All Exceptions are handled, Kindly proceed with approval/closure actions',
                        actionlabel: ['OK']
                    }).then(function(res) {
                        //console.log(res)
                    });
                } else {
                    $scope.showOverlay = true;
                    $scope.showCardContainer = true;
                }
            } else {
                dmDialogueBox.alertBox({
                    title: 'Error!',
                    message: 'Some Error occured while fetching exceptions',
                    actionlabel: ['OK']
                }).then(function(res) {
                    //console.log(res)
                });
            }


        }).error(function(error) {
            //alert(er);
            dmDialogueBox.alertBox({
                title: 'Server Error',
                message: 'Server not responding..',
                actionLabel: ['OK']
            });
            $scope.hideLoader();
        });
    }
    $scope.getImagebase64 = function(docItem) {
        var docExtn = docItem['doc_image_path'] ? (docItem['doc_image_path'].indexOf('.') > -1 ? docItem['doc_image_path'].split('.').pop() : '') : '';
        docItem['doc_extension'] = docExtn;
        var deferred = $q.defer();
        var currentDoc = docItem;
        var docImageId = currentDoc['image_id'];
        var docExtn = docItem['doc_extension'];
        var imageExtns = ['jpg', 'jpeg'];
        if (imageExtns.indexOf(docExtn.toLowerCase()) < 0) {
            deferred.resolve(currentDoc);
            currentDoc['isImageLoading'] = false;
            currentDoc['isImageError'] = false;
            return deferred.promise;
        }

        currentDoc['base64Img'] = '';
        currentDoc['blob'] = '';
        currentDoc['isImageLoading'] = true;
        currentDoc['isImageError'] = true;
        currentDoc['imageErrorMsg'] = '';
        docImageRequest.getImage(docItem).success(function(response) {
            //            docImageRequest.getImage(docImageId).success(function (response) {
            $scope.showOverlay = true;
            $scope.showGalleryContainer = true;
            currentDoc['blob'] = response;
            var reader = new FileReader();
            reader.onload = function(e) {
                var resultTarget = e.target.result;
                //console.log(e.target)
                if (resultTarget.length > 0) {
                    currentDoc['isImageError'] = false;
                }
                var dataMimeType = resultTarget.split(":")[1].split(";")[0];
                if (dataMimeType.indexOf("image") > -1) {
                    currentDoc['isImageError'] = false;
                } else {
                    currentDoc['isImageError'] = true;
                    currentDoc['isImageLoading'] = false;
                    if (dataMimeType.indexOf('html') > -1) {
                        try {
                            var base64Response = resultTarget.split(",")[1];
                            var htmlResponse = atob(base64Response);
                            htmlResponse = JSON.parse(htmlResponse);
                            if (htmlResponse['isSuccess'].toLowerCase() == 'n') {
                                $scope.showOverlay = false;
                                $scope.showGalleryContainer = false;
                                dmDialogueBox.toastBox({
                                    title: 'Login Error!',
                                    message: 'File does not exist',
                                    actionlabel: ['OK'],
                                    messageType: 'error'
                                }).then(function(res) {
                                    //console.log(res)
                                });

                            }
                            var jsonStartIndex = htmlResponse.indexOf('{"isSuccess');
                            var jsonLastIndex = htmlResponse.lastIndexOf("}");
                            var jsonResponse = htmlResponse.substring(jsonStartIndex, jsonLastIndex + 1);
                            jsonResponse = JSON.parse(jsonResponse);
                            if (jsonResponse.Message) {
                                currentDoc['imageErrorMsg'] = jsonResponse.Message;
                            } else {
                                currentDoc['imageErrorMsg'] = 'Unable to fetch image';
                            }
                        } catch (e) {
                            currentDoc['imageErrorMsg'] = 'Unable to fetch image';
                        }
                    } else {
                        currentDoc['imageErrorMsg'] = 'Unable to fetch image';
                    }

                    //  alert(currentDoc['imageErrorMsg'])
                    //                        $scope.$apply();
                    //                        return;
                }

                currentDoc['base64Img'] = resultTarget;
                console.log(resultTarget)
                    /*
                     *@Logic: every change in 'currentDoc' will be reflect back to original list i.e. $scope.modifiedDocsList because of same reference
                     * so we directly set the modified list to the service 
                     */

                $rootScope.$broadcast('on_doc_images_set');
                currentDoc['isImageLoading'] = false;
                deferred.resolve(currentDoc);
                $scope.$apply();
            };
            reader.readAsDataURL(currentDoc['blob']);
        }).error(function(e) {
            deferred.resolve(currentDoc);
            currentDoc['isImageLoading'] = false;
            currentDoc['isImageError'] = true;
            currentDoc['imageErrorMsg'] = 'Unable to fetch image';
        });
        return deferred.promise;
    };
    $scope.openDocs = function(document, isReport) {
        if (Object.keys(document).length <= 0) {
            return;
        }
        QueueService.setCurrentDocument(document);


        var docExtn = document['doc_extension'];
        var imageExtns = ['jpg', 'jpeg'];
        if (imageExtns.indexOf(docExtn.toLowerCase()) > -1) {
            $rootScope.$broadcast('on_doc_change', document);
        }
    };
    $scope.getPrevImage = function() {
        $scope.currentImage--;
        $scope.openDocs($scope.documentsList[$scope.currentImage]);
    }
    $scope.getNextImage = function() {
        $scope.currentImage++;
        $scope.openDocs($scope.documentsList[$scope.currentImage]);
    }
    $scope.getDocumentsImages = function(documents, type) {
        var perBatchCount = documents.length > 3 ? 3 : documents.length;
        var lastIndexInBatch = 0;

        var getBatchImages = function(startIndex, perBatchCount) {
            var receivedData = [];
            for (var i = startIndex; i < startIndex + perBatchCount; i++) {

                $scope.showLoader('Getting Images');
                $scope.getImagebase64(documents[i]).then(function(docObj) {

                    var imageId = docObj['image_id'];
                    receivedData.push(imageId);
                    $scope.openDocs(documents[0]);

                    var nextStartIndex = startIndex + perBatchCount;
                    var nextBatchCount = (documents.length - nextStartIndex) > perBatchCount ? perBatchCount : (documents.length - nextStartIndex);
                    if (receivedData.length == perBatchCount && nextBatchCount > 0) {
                        getBatchImages(nextStartIndex, nextBatchCount);
                    } else {
                        $scope.hideLoader();
                    }
                });
            }
        };
        getBatchImages(lastIndexInBatch, perBatchCount);
    };
    $scope.getChildData = function(eleData, viewType, leadDtl, aofId, parentCardIndex) {




        $scope.getData(eleData, viewType, leadDtl, aofId, parentCardIndex);
    }
    $scope.getData = function(eleData, viewType, leadDtl, aofId, parentCardIndex) {

            ///////////////////edited///////////
            if (eleData["DETAIL_SOURCE"] == "SPGETEXCEPTIONQUEUELIST" && $scope.isFVActionBtnDisabled && $scope.isFVActionBtnDisabled[aofId] == false) {
                return false;
            }

            /////////////////////////
            $scope.leadDtlheading = leadDtl;
            $scope.leadDtl = leadDtl;
            $scope.currentCardIndex = parentCardIndex;
            //        if (typeof (parentCardIndex) == "number") {
            //            $scope.leadDtlDm = $scope.leadDtl = leadDtl;
            //        } else {
            //            $scope.leadDtlheading = $scope.leadDtlDm;
            //        }
            $scope.parentCardIndex = parentCardIndex;
            $scope.showLoader('Getting Data')
            switch (viewType) {
                case "GRID":
                    $scope.createTableHeading(eleData);
                    $scope.getGridData(eleData, aofId, leadDtl.exception_id);
                    break;
                case "GALLERY":
                    $scope.getGalleryData(eleData, aofId);
                    break;
                case "CARD_VIEW":
                    $scope.fvBtnDisabled = false;
                    $scope.getExceptionData(eleData, aofId);
                    // $scope.showCardContainerOverlay=true;
                    break;
            }
        }
        ////added 13-06-2018////
    $scope.childCardActions = function(action, exceptionLead, c, childCardIndex) {
        $scope.childActionRemarks = '';
        $scope.fvBtnDisabled = false;
        $scope.exceptionLeadDtl = exceptionLead;
        $scope.childCardAction = action;
        $scope.childCardIndex = childCardIndex;
        $scope.exceptionLead = exceptionLead;
        if (action['ACTION_REMARKS_ATTR_REQUIRED'].toLowerCase() == 'y') {
            $scope.showCardContainerOverlay = true;
            $scope.isRemarksContainerShown = true;
        } else {
            $scope.addChildRemarks();
            if ($scope.exceptionData.length == 0) {
                $scope.showOverlay = false;
                $scope.showCardContainer = false;
                $scope.isFVActionBtnDisabled[exceptionLead['aof_id']] = false;

            }
        }
    }

    $scope.addChildRemarks = function() {
        $scope.showCardContainerOverlay = false;
        $scope.isRemarksContainerShown = false;
        var childActionReqData = [{
            processName: $scope.childCardAction['ACTION_PROCESS_ID'],
            data: [{
                QUEUE_ID: $scope.cardWebOn.QUEUE_ID.toString(),
                CARD_ID: $scope.exceptionCardWebOn[0].CARD_ID.toString(),
                ACTION_ID: $scope.childCardAction['ACTION_NAME'],
                [$scope.cardWebOn.PRIMARY_KEY_ATTRIBUTE1]: $scope.leadDtl[$scope.cardWebOn.PRIMARY_KEY_ATTRIBUTE1],
                [$scope.cardWebOn.PRIMARY_KEY_ATTRIBUTE2]: $scope.leadDtl[$scope.cardWebOn.PRIMARY_KEY_ATTRIBUTE2],
                [$scope.cardWebOn.PRIMARY_KEY_ATTRIBUTE3]: $scope.exceptionLead[$scope.cardWebOn.PRIMARY_KEY_ATTRIBUTE3.toLowerCase()] || '',
                REMARKS: $scope.childActionRemarks
            }]
        }]
        $scope.showLoader('Submitting Exception');
        platwareRequest.callPlatware(childActionReqData).success(function(response) {
            var leadActionResponse = parsePlatwareResponse.parse(response);
            $scope.hideLoader();
            if (leadActionResponse[0]['isError'] == 'N') {
                leadActionResponse = leadActionResponse[0]['data'][0][':b1'];
                leadActionResponse = JSON.parse(leadActionResponse)['RESULT'][0]['IS_SUCCESS'];
                $scope.exceptionData.splice($scope.childCardIndex, 1);
                if ($scope.exceptionData.length == 0) {
                    $scope.showOverlay = false;
                    $scope.isFVActionBtnDisabled[$scope.exceptionLead['aof_id']] = false;
                    $scope.showCardContainer = false;
                }
                if (leadActionResponse == 'Y') {
                    dmDialogueBox.toastBox({
                        title: 'Success!',
                        message: 'Exception ' + $scope.childCardAction['ACTION_NAME'] + ' Successfully',
                        actionlabel: ['OK'],
                        messageType: 'success'
                    }).then(function(res) {

                    });


                    if ($scope.cardWebOn['CHILD_DEPENDENCY'].toLowerCase() == 'y') {
                        if ($scope.exceptionData.length < 1) {
                            $scope.showOverlay = false;
                            $scope.showCardContainer = false;
                            $scope.leads.splice($scope.parentCardIndex, 1);

                        }
                    }

                } else {
                    dmDialogueBox.toastBox({
                        title: 'Error!',
                        message: 'Some error occurred while submitting exception',
                        actionlabel: ['OK'],
                        messageType: 'success'
                    }).then(function(res) {
                        //console.log(res)
                    });
                }
            } else {
                dmDialogueBox.alertBox({
                    title: 'Data Error',
                    message: 'Some Error Occured while fetching data',
                    actionLabel: ['OK']
                });
            }

        }).error(function(error) {
            //alert(er);
            dmDialogueBox.alertBox({
                title: 'Server Error',
                message: 'Server not responding..',
                actionLabel: ['OK']
            });
            $scope.hideLoader();
        });
    }

    //////////////////////
    $scope.submitLeadAction = function(actionData, cardData, leadData, leadIndex) {
        var leadAction = actionData['ACTION_LABEL'].toLowerCase();
        if ($scope.exceptionLead) {
            var primarykey3 = $scope.exceptionLead[$scope.cardWebOn.PRIMARY_KEY_ATTRIBUTE3.toLowerCase()];
        } else {
            var primarykey3 = '';
        }
        $scope.showOverlay = false;
        $scope.isParentRemarksContainerShown = false;
        var actionReqData = [{
            processName: actionData['ACTION_PROCESS_ID'],
            data: [{
                QUEUE_ID: $scope.cardWebOn.QUEUE_ID.toString(),
                CARD_ID: $scope.cardWebOn.CARD_ID.toString(),
                ACTION_ID: actionData['ACTION_NAME'],
                [$scope.cardWebOn.PRIMARY_KEY_ATTRIBUTE1]: leadData[$scope.cardWebOn.PRIMARY_KEY_ATTRIBUTE1],
                [$scope.cardWebOn.PRIMARY_KEY_ATTRIBUTE2]: leadData[$scope.cardWebOn.PRIMARY_KEY_ATTRIBUTE2],
                [$scope.cardWebOn.PRIMARY_KEY_ATTRIBUTE3]: primarykey3,
                REMARKS: $scope.childActionRemarks
            }]
        }]
        $scope.showLoader('Submitting Lead');
        platwareRequest.callPlatware(actionReqData).success(function(response) {
            var leadActionResponse = parsePlatwareResponse.parse(response);
            $scope.hideLoader()
            if (leadActionResponse[0]['isError'] == 'N') {
                leadActionResponse = leadActionResponse[0]['data'][0][':b1'];
                leadActionResponse = JSON.parse(leadActionResponse)
                if (leadActionResponse['RESULT'][0]['IS_SUCCESS'].toLowerCase() == 'y') {
                    dmDialogueBox.toastBox({
                        title: 'Success!',
                        message: 'Lead ' + leadData[cardData[0]['PRIMARY_KEY_ATTRIBUTE1']] + " " + leadAction + " Successfully",
                        actionlabel: ['OK'],
                        messageType: 'success'
                    }).then(function(res) {
                        //console.log(res)
                    });
                    $scope.leads.splice(leadIndex, 1)
                    if ($scope.leads.length <= $scope.cardData[0]['GET_DATA_THRESOLD']) {
                        $scope.scrutinyInit();
                    }
                } else {
                    dmDialogueBox.toastBox({
                        title: 'Error!',
                        message: 'Some Error Occured while submitting lead',
                        actionlabel: ['OK'],
                        messageType: 'success'
                    }).then(function(res) {
                        //console.log(res)
                    });
                }
            } else {
                dmDialogueBox.toastBox({
                    title: 'Error!',
                    message: 'Some Error Occured while submitting lead',
                    actionlabel: ['OK'],
                    messageType: 'success'
                }).then(function(res) {
                    //console.log(res)
                });
            }
        }).error(function(error) {
            //alert(er);
            dmDialogueBox.alertBox({
                title: 'Server Error',
                message: 'Server not responding..',
                actionLabel: ['OK']
            });
            $scope.hideLoader();
        });
    }
    $scope.addParentRemarks = function() {
        $scope.submitLeadAction($scope.actionData, $scope.cardData, $scope.leadDtl, $scope.leadIndex);
    }
    $scope.leadAction = function(actionData, cardData, leadData, leadIndex) {
        $scope.childActionRemarks = '';
        $scope.leadDtl = leadData;
        $scope.actionData = actionData;
        $scope.cardData = cardData;
        $scope.leadIndex = leadIndex;
        if (actionData['ACTION_REMARKS_ATTR_REQUIRED'].toLowerCase() == "n") {
            $scope.submitLeadAction(actionData, cardData, leadData, leadIndex)

        } else {
            $scope.showOverlay = true;
            $scope.isParentRemarksContainerShown = true;
        }


    }
    $scope.scrutinyInit();
    /**********************Open image and actions****************************/





    $scope.trackTransforms = function(ctx) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        var xform = svg.createSVGMatrix();
        ctx.getTransform = function() {
            ////console.log("gettrans"+xform)
            return xform;
        };
        var savedTransforms = [];
        var save = ctx.save;
        ctx.save = function() {
            savedTransforms.push(xform.translate(0, 0));
            ////console.log("save"+xform)
            return save.call(ctx);
        };
        var restore = ctx.restore;
        ctx.restore = function() {
            xform = savedTransforms.pop();
            //console.log("restore"+xform)
            return restore.call(ctx);
        };
        var scale = ctx.scale;
        ctx.scale = function(sx, sy) {
            ////console.log("sx:" + sx + "\nsy:" + sy)
            xform = xform.scaleNonUniform(sx, sy);
            //console.log("scale"+xform)
            return scale.call(ctx, sx, sy);
        };
        var rotate = ctx.rotate;
        ctx.rotate = function(radians) {
            xform = xform.rotate(radians * 180 / Math.PI);
            //console.log("rotate"+xform)
            return rotate.call(ctx, radians);
        };
        var translate = ctx.translate;
        ctx.translate = function(dx, dy) {
            xform = xform.translate(dx, dy);
            //console.log("translate"+xform)
            return translate.call(ctx, dx, dy);
        };
        var transform = ctx.transform;
        ctx.transform = function(a, b, c, d, e, f) {
            var m2 = svg.createSVGMatrix();
            m2.a = a;
            m2.b = b;
            m2.c = c;
            m2.d = d;
            m2.e = e;
            m2.f = f;
            xform = xform.multiply(m2);
            //console.log("transform"+xform)
            return transform.call(ctx, a, b, c, d, e, f);
        };
        var setTransform = ctx.setTransform;
        ctx.setTransform = function(a, b, c, d, e, f) {
            xform.a = a;
            xform.b = b;
            xform.c = c;
            xform.d = d;
            xform.e = e;
            xform.f = f;
            //console.log("settrans"+xform)
            return setTransform.call(ctx, a, b, c, d, e, f);
        };
        var pt = svg.createSVGPoint();
        ctx.transformedPoint = function(x, y) {
            pt.x = x;
            pt.y = y;
            ////console.log("transformedPt"+xform)
            return pt.matrixTransform(xform.inverse());
        };
    };

    $scope.imageWidth;
    $scope.imageHeight;
    $scope.currentAngle = 0;
    $scope.scaleFactor = 1.1;
    $scope.docCanvas = document.getElementById("verificationImageCanvas");
    $scope.docCanvasCtx = $scope.docCanvas.getContext('2d');
    var widthCanvas = $scope.docCanvas.clientWidth; //angular.element("#verificationImageCanvas").width();
    var heightCanvas = $scope.docCanvas.clientHeight; //angular.element("#verificationImageCanvas").height();
    $scope.docCanvas.width = widthCanvas;
    $scope.docCanvas.height = heightCanvas;
    $scope.lastX = $scope.docCanvas.width / 2
    $scope.lastY = $scope.docCanvas.height / 2;
    $scope.docCanvasCtx.textAlign = 'center';
    $scope.docCanvasCtx.fillStyle = '#888888';
    $scope.docCanvasCtx.font = '25px sans-serif';
    $scope.docCanvasCtx.textBaseline = 'bottom';
    $scope.docCanvasCtx.fillText('Select a Document!', $scope.docCanvas.width / 2, $scope.docCanvas.height / 2);
    $rootScope.$on('on_holder_update', function() {
        var currentDoc = QueueService.getCurrentDocument();
        if (currentDoc['lead_member_id'] !== '') {
            $scope.unsetHolderDoc();
            $scope.docCanvasImage = null;
            $scope.currentAngle = 0;
            $scope.canvasStartPos = {
                "x": 0,
                "y": 0
            };
            $scope.clearCanvas();
            $scope.docCanvasCtx.save();
            $scope.docCanvasCtx.textAlign = 'center';
            $scope.docCanvasCtx.fillStyle = '#888888';
            $scope.docCanvasCtx.font = '30px sans-serif';
            $scope.docCanvasCtx.fillText('Select a Document', $scope.docCanvas.width / 2, $scope.docCanvas.height / 2);
        }
        $scope.docCanvasCtx.save();
        $scope.clearCanvas();
        $scope.docCanvasCtx.restore();
        $scope.docCanvasCtx.fillText('Select a Document', $scope.docCanvas.width / 2, $scope.docCanvas.height / 2);
    });
    $scope.onDocumentChange = function(event, documents) {

        var canvasWidth = $scope.docCanvas.clientWidth || $scope.docCanvas.width;
        var canvasHeight = $scope.docCanvas.clientHeight || $scope.docCanvas.height;
        $scope.docCanvas.width = canvasWidth;
        $scope.docCanvas.height = canvasHeight;
        $scope.currentAngle = 0;
        $scope.currentDocImage = QueueService.getCurrentDocument();
        $scope.currentDocSrc = $scope.currentDocImage["base64Img"];


        $scope.docCanvasImage = new Image;
        $scope.docCanvasImage.src = $scope.currentDocSrc;
        $scope.trackTransforms($scope.docCanvasCtx);
        $scope.lastX = $scope.docCanvas.width / 2
        $scope.lastY = $scope.docCanvas.height / 2;
        $scope.canvasStartPos = {
            "x": 0,
            "y": 0
        };

        $scope.docCanvasImage.onload = function() {
            $scope.imageWidth = $scope.docCanvasImage.width;
            $scope.imageHeight = $scope.docCanvasImage.height;
            $scope.clearCanvas();
            $scope.docCanvasCtx.save();
            $scope.rotateCanvas();
        };
    };
    $scope.setCanvasImage = function() {
        if (!$scope.docCanvasImage) {
            return;
        }
        switch ($scope.imageHeight > $scope.imageWidth) {
            case true:
                $scope.docCanvasCtx.drawImage($scope.docCanvasImage, $scope.canvasStartPos.y, $scope.canvasStartPos.x, $scope.docCanvas.height, $scope.docCanvas.width);
                break;
            case false:
                $scope.docCanvasCtx.drawImage($scope.docCanvasImage, $scope.canvasStartPos.x, $scope.canvasStartPos.y, $scope.docCanvas.width, $scope.docCanvas.height);
                break;
            default:
                $scope.docCanvasCtx.drawImage($scope.docCanvasImage, $scope.canvasStartPos.x, $scope.canvasStartPos.y, $scope.docCanvas.width, $scope.docCanvas.height);
                break;

        }
    };
    $scope.clearCanvas = function() {
        var p1 = $scope.docCanvasCtx.transformedPoint(0, 0);
        var p2 = $scope.docCanvasCtx.transformedPoint($scope.docCanvas.width, $scope.docCanvas.height);
        $scope.docCanvasCtx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    };
    $scope.rotateCanvas = function() {
        $scope.docCanvasCtx.translate($scope.docCanvas.width / 2, $scope.docCanvas.height / 2);
        $scope.docCanvasCtx.rotate($scope.currentAngle * (Math.PI / 180));
        switch ($scope.currentAngle) {
            case '0':
                $scope.canvasStartPos.x = 0;
                $scope.canvasStartPos.y = 0;
                break;

            default:
                $scope.canvasStartPos.x = -$scope.docCanvas.width / 2;
                $scope.canvasStartPos.y = -$scope.docCanvas.height / 2;
                break;
        }
        $scope.clearCanvas();
        $scope.setCanvasImage();
        $scope.docCanvasCtx.restore();
    };

    /********************* Rotate an image*************************/

    $scope.rotateCanvasImage = function() {
        var rotateDegree = 90;
        switch ($scope.currentAngle) {
            case 0:
            case 90:
            case 180:
                $scope.currentAngle += rotateDegree;
                break;
            case 270:
                $scope.currentAngle = 0;
                break;
        }
        $scope.clearCanvas();
        $scope.docCanvasCtx.save();
        $scope.docCanvasCtx.translate(0, 0);
        $scope.rotateCanvas();

    };

    /*********************** zoom an image ****************************/

    $scope.zoomImageCanvas = function(clicks) {
        var pt = $scope.docCanvasCtx.transformedPoint($scope.lastX, $scope.lastY);
        $scope.docCanvasCtx.translate(pt.x, pt.y);
        var factor = Math.pow($scope.scaleFactor, clicks);
        $scope.docCanvasCtx.scale(factor, factor);
        $scope.docCanvasCtx.translate(-pt.x, -pt.y);
        $scope.clearCanvas();
        $scope.docCanvasCtx.save();
        $scope.rotateCanvas();

    };

    /*********************** evene for mouse scroll ****************************/

    var handleScroll = function(evt) {
        var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
        if (delta && $scope.docCanvasImage) {
            $scope.zoomImageCanvas(delta);
        }
        return evt.preventDefault() && false;
    };

    /*********************** evene for image drag ****************************/

    $scope.canvasMove = function(evt) {

        $scope.lastX = evt.offsetX || (evt.pageX - $scope.docCanvas.offsetLeft);
        $scope.lastY = evt.offsetY || (evt.pageY - $scope.docCanvas.offsetTop);
        $scope.dragged = true;
        if ($scope.dragStart) {
            var pt = $scope.docCanvasCtx.transformedPoint($scope.lastX, $scope.lastY);
            $scope.docCanvasCtx.translate(pt.x - $scope.dragStart.x, pt.y - $scope.dragStart.y);
            $scope.clearCanvas();
            $scope.docCanvasCtx.save();
            $scope.rotateCanvas();
        }
    };
    $scope.canvasDown = function(evt) {
        if (!$scope.docCanvasImage) {
            return;
        }
        $scope.docCanvas.addEventListener('mousemove', $scope.canvasMove, false);
        $scope.lastX = evt.offsetX || (evt.pageX - $scope.docCanvas.offsetLeft);
        $scope.lastY = evt.offsetY || (evt.pageY - $scope.docCanvas.offsetTop);
        $scope.dragStart = $scope.docCanvasCtx.transformedPoint($scope.lastX, $scope.lastY);
        $scope.dragged = false;
    };
    $scope.canvasUp = function(evt) {
        $scope.docCanvas.removeEventListener('mousemove', $scope.canvasMove, false);
        $scope.lastX = $scope.docCanvas.width / 2;
        $scope.lastY = $scope.docCanvas.height / 2;
        $scope.dragStart = null;
    };



    $rootScope.$on('on_doc_change', $scope.onDocumentChange);
    $scope.docCanvas.addEventListener('DOMMouseScroll', handleScroll, false);
    $scope.docCanvas.addEventListener('mousewheel', handleScroll, false);
    $scope.docCanvas.addEventListener('mousedown', $scope.canvasDown, false);
    $scope.docCanvas.addEventListener('mouseup', $scope.canvasUp, false);
    $scope.docCanvas.addEventListener('mouseleave', $scope.canvasUp, false);
}]);