var queueModule = angular.module('myApp.queues', ['ngRoute', 'RouteData']);
queueModule.controller('queueCtrl', ['$scope', '$filter','$location', 'platwareRequest', 'parsePlatwareResponse','QueueService','dmDialogueBox', function ($scope, $filter,$location,platwareRequest, parsePlatwareResponse, QueueService,dmDialogueBox) {
    $scope.dragQueue = [];
    //////ADDED TO CHECK///
    $scope.saveQueue = function () {
        if($scope.sortedQueues.length==0){
            dmDialogueBox.alertBox({
                title: 'Alert',
                message: 'Select atleast one queue..',
                actionLabel: ['OK']
            });
            return;
        }
        var usersessionObj = JSON.parse(sessionStorage.getItem('usersession'))

        var sortSeq = [];
        angular.forEach($scope.sortedQueues, function (value, key) {
            sortSeq.push(value['QUEUE_ID']);
        });
        var submitData = [{
            processName: "SPINSQUEUEFAVMST",
            data: [{
                X_STRING:sortSeq.join('~'),
                X_SYSTEM_ROLE:usersessionObj[0].system_role
            }]
        }];
        $scope.showLoader('Submitting Request');
        platwareRequest.callPlatware(submitData).success(function (response) {
            var submitRes = parsePlatwareResponse.parse(response);
            $scope.hideLoader();
            submitRes=JSON.parse(submitRes[0]['data'][0]['result']);
            submitRes=submitRes['RESULT'][0];
            if(submitRes['IS_SUCCESS'].toLowerCase()=='y'){
                dmDialogueBox.alertBox({
                    title: 'Success',
                    message: submitRes['MESSAGE'],
                    actionLabel: ['OK']
                });
                $location.path('/home')
            }
        }).error(function (error) {
            $scope.hideLoader();
            dmDialogueBox.alertBox({
                title: 'Server Error',
                message: 'Server not responding..',
                actionLabel: ['OK']
            });
            
        });
    }


    $scope.allQueues = QueueService.getAllQueues();
    $scope.queues = angular.copy($scope.allQueues)

    // Aditya Ends here

    //        $scope.showLoader('Getting Queues');
    //        platwareRequest.callPlatware(reqData).success(function(response) {
    //            var configResponse = parsePlatwareResponse.parse(response);
    //            $scope.hideLoader();
    //            $scope.queues = configResponse[0]['data'];
    // BY Aditya starts here - DVU
    /* $scope.queues = {
         "USER_QUEUE": [{
                 "QUEUE_CODE": "EXECEPTIONQUEUE",
                 "QUEUE_SEQ": "1"
             },
             {
                 "QUEUE_CODE": "DOCUMENTQUEUE",
                 "QUEUE_SEQ": "2"
             },
             {
                 "QUEUE_CODE": "URGENTQUEUE",
                 "QUEUE_SEQ": "3"
             },
             {
                 "QUEUE_CODE": "REASSIGNEDQUEUE",
                 "QUEUE_SEQ": "4"
             },
             {
                 "QUEUE_CODE": "ERRORQUEUE",
                 "QUEUE_SEQ": "5"
             }
         ],
         "FAV_USER_QUEUE": [{
                 "QUEUE_CODE": "EXECEPTIONQUEUE",
                 "QUEUE_SEQ": "1"
             },
             {
                 "QUEUE_CODE": "DOCUMENTQUEUE",
                 "QUEUE_SEQ": "2"
             },
         ]
     }*/
    $scope.sortedQueues = []


    $scope.onDragStart = function (ele) {

        $scope.draggedQueue = {
            queueID: angular.element(ele).scope().currentQueue.QUEUE_ID,
            queueIndex: angular.element(ele).scope().$index
        }
    };

    $scope.onDragEnter = function (ele, evt) {

        evt.preventDefault();
    }
    $scope.onDragOver = function (ele, evt) {

        evt.preventDefault();
        //ele.style.border ="2px solid red";
    }
    $scope.onDrop = function (ele, evt) {
        //  console.log(angular.element(ele).scope())
        var curentIndex = -1;
        if ($scope.draggedSortQueue) {
            curentIndex = $scope.sortedQueues.findIndex(function (que) {
                return que.QUEUE_ID == $scope.draggedSortQueue['queueID']
            })
        }

        if ($scope.draggedSortQueue) {
            if (curentIndex != -1 && $scope.draggedSortQueue["queueID"] == $scope.currentTargetQueue) {
                $scope.draggedSortQueue = undefined;
                return false;
            } else if (curentIndex != -1 && $scope.draggedSortQueue["queueID"] != $scope.currentTargetQueue) {

                var targetIndex = $scope.sortedQueues.findIndex(function (que) {
                    return que.QUEUE_ID == $scope.currentTargetQueue
                });
                var temp = $scope.sortedQueues[targetIndex];
                $scope.sortedQueues[targetIndex] = $scope.sortedQueues[curentIndex];
                $scope.sortedQueues[curentIndex] = temp;
                $scope.draggedSortQueue = undefined;

            }

            $scope.draggedSortQueue = undefined;
        } else {


            var index = $scope.queues['USER_QUEUE'].findIndex(function (user_que) {

                return $scope.draggedQueue['queueID'] == user_que["QUEUE_ID"]



            });
            var dragQueue = $filter('byProp1')($scope.queues['USER_QUEUE'], 'QUEUE_ID', $scope.draggedQueue['queueID'])
            $scope.dragQueue.push(dragQueue[0]);
            var sortedArrLen = $scope.sortedQueues.length;
            var newSeq = sortedArrLen + 1;
            var dragObj = {
                "QUEUE_ID": $scope.draggedQueue["queueID"],
                "QUEUE_SEQ": newSeq.toString()
            }
            $scope.sortedQueues.push(dragObj);
            $scope.queues['USER_QUEUE'].splice(index, 1);
            $scope.draggedQueue = undefined;
        }
        $scope.$apply();
        console.log($scope.sortedQueues)
    };
    $scope.removeSortedQueue = function (index, que) {
        $scope.sortedQueues.splice(index, 1);
        $scope.dragQueue.splice(index, 1);
        var addQueue = JSON.parse(JSON.stringify(que));
        var index = $scope.allQueues['USER_QUEUE'].findIndex(function (user_que) {

            return addQueue['QUEUE_ID'] == user_que["QUEUE_ID"]

        });
        $scope.queues['USER_QUEUE'].push($scope.allQueues['USER_QUEUE'][index]);

        // if (index == -1) {
        //     $scope.queues['USER_QUEUE'].push(addQueue);

        // }

    }
    $scope.onDragStartsortedQueues = function (ele) {

        // console.log(angular.element(ele).scope());

        $scope.draggedSortQueue = {
            queueId: angular.element(ele).scope().queue.QUEUE_ID,
            queueIndex: angular.element(ele).scope().$index

        }
    }

    $scope.onDropsortedQueues = function (ele, evt) {

        var curentIndex = -1;
        if ($scope.draggedQueue) {

            var curentIndex = $scope.queues['USER_QUEUE'].findIndex(function (user_que) {

                return $scope.draggedQueue['queueId'] == user_que["QUEUE_ID"]

            });
            if (curentIndex != -1) {
                $scope.draggedQueue = undefined;
                return false;
            }
        }
        if ($scope.draggedSortQueue) {


            var curentIndex = $scope.queues['USER_QUEUE'].findIndex(function (user_que) {

                return $scope.draggedSortQueue['queueId'] == user_que["QUEUE_ID"]



            });

            if (curentIndex != -1) {
                $scope.draggedSortQueue = undefined;
                return false;
            }
        }

        var dragObj = {
            "QUEUE_ID": $scope.draggedSortQueue["queueId"],
            "QUEUE_SEQ": $scope.draggedSortQueue['queueIndex']
        }

        $scope.dropSortQueue = $filter('byProp1')($scope.allQueues['USER_QUEUE'], 'QUEUE_ID', dragObj['QUEUE_ID'])
        // $scope.queues['USER_QUEUE'].push(dragObj);
        var index = $scope.sortedQueues.findIndex(function (que) {
            return que.QUEUE_ID == $scope.draggedSortQueue["queueId"]
        })
        $scope.queues['USER_QUEUE'].push($scope.dropSortQueue[0])
        $scope.sortedQueues.splice(index, 1)
        $scope.dragQueue.splice(index, 1)
        $scope.$apply();

    }


    $scope.onDropList = function (ele, evt) {

        console.log(angular.element(ele).scope());
        $scope.currentTargetQueue = angular.element(ele).scope().queue['QUEUE_ID'];

    }

}])