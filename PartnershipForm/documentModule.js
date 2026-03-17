

PartnershipFormModule.controller("verificationCtrl", ['$scope', '$rootScope', '$location', 'DocumentsPrvdr', function ($scope, $rootScope, $location, DocumentsPrvdr) {
    $scope.trackTransforms = function (ctx) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        var xform = svg.createSVGMatrix();
        ctx.getTransform = function () {
            ////console.log("gettrans"+xform)
            return xform;
        };
        var savedTransforms = [];
        var save = ctx.save;
        ctx.save = function () {
            savedTransforms.push(xform.translate(0, 0));
            ////console.log("save"+xform)
            return save.call(ctx);
        };
        var restore = ctx.restore;
        ctx.restore = function () {
            xform = savedTransforms.pop();
            //console.log("restore"+xform)
            return restore.call(ctx);
        };
        var scale = ctx.scale;
        ctx.scale = function (sx, sy) {
            ////console.log("sx:" + sx + "\nsy:" + sy)
            xform = xform.scaleNonUniform(sx, sy);
            //console.log("scale"+xform)
            return scale.call(ctx, sx, sy);
        };
        var rotate = ctx.rotate;
        ctx.rotate = function (radians) {
            xform = xform.rotate(radians * 180 / Math.PI);
            //console.log("rotate"+xform)
            return rotate.call(ctx, radians);
        };
        var translate = ctx.translate;
        ctx.translate = function (dx, dy) {
            xform = xform.translate(dx, dy);
            //console.log("translate"+xform)
            return translate.call(ctx, dx, dy);
        };
        var transform = ctx.transform;
        ctx.transform = function (a, b, c, d, e, f) {
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
        ctx.setTransform = function (a, b, c, d, e, f) {
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
        ctx.transformedPoint = function (x, y) {
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
    var widthCanvas = $scope.docCanvas.clientWidth;//angular.element("#verificationImageCanvas").width();
    var heightCanvas = $scope.docCanvas.clientHeight;//angular.element("#verificationImageCanvas").height();
    $scope.docCanvas.width = widthCanvas;
    $scope.docCanvas.height = heightCanvas;
    $scope.lastX = $scope.docCanvas.width / 2
    $scope.lastY = $scope.docCanvas.height / 2;
    $scope.docCanvasCtx.textAlign = 'center';
    $scope.docCanvasCtx.fillStyle = '#888888';
    $scope.docCanvasCtx.font = '25px sans-serif';
    $scope.docCanvasCtx.textBaseline = 'bottom';
    $scope.docCanvasCtx.fillText('Select a Document!', $scope.docCanvas.width / 2, $scope.docCanvas.height / 2);
    $rootScope.$on('on_holder_update', function () {
        var currentDoc = DocumentsPrvdr.getCurrentDocument();
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
    $scope.onDocumentChange = function (event, documents) {
        $scope.integrationTabs.currentTabName = 'kyc_docs';
        var canvasWidth = $scope.docCanvas.clientWidth || $scope.docCanvas.width;
        var canvasHeight = $scope.docCanvas.clientHeight || $scope.docCanvas.height;
        $scope.docCanvas.width = canvasWidth;
        $scope.docCanvas.height = canvasHeight;
        $scope.currentAngle = 0;
        $scope.currentDocImage = DocumentsPrvdr.getCurrentDocument();
        $scope.currentDocSrc ='data:image/jpeg;base64,'+$scope.currentDocImage["image_stream"];


        $scope.docCanvasImage = new Image;
        $scope.docCanvasImage.src = $scope.currentDocSrc;
        $scope.trackTransforms($scope.docCanvasCtx);
        $scope.lastX = $scope.docCanvas.width / 2
        $scope.lastY = $scope.docCanvas.height / 2;
        $scope.canvasStartPos = {
            "x": 0,
            "y": 0
        };
        
        $scope.docCanvasImage.onload = function () {
            $scope.imageWidth = $scope.docCanvasImage.width;
            $scope.imageHeight = $scope.docCanvasImage.height;
            $scope.clearCanvas();
            $scope.docCanvasCtx.save();
            $scope.rotateCanvas();
        };
    };
    $scope.setCanvasImage = function () {
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
    $scope.clearCanvas = function () {
        var p1 = $scope.docCanvasCtx.transformedPoint(0, 0);
        var p2 = $scope.docCanvasCtx.transformedPoint($scope.docCanvas.width, $scope.docCanvas.height);
        $scope.docCanvasCtx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    };
    $scope.rotateCanvas = function () {
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
    
    $scope.rotateCanvasImage = function () {
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
    
    $scope.zoomImageCanvas = function (clicks) {
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
    
    var handleScroll = function (evt) {
        var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
        if (delta && $scope.docCanvasImage) {
            $scope.zoomImageCanvas(delta);
        }
        return evt.preventDefault() && false;
    };
    
    /*********************** evene for image drag ****************************/
    
    $scope.canvasMove = function (evt) {
        
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
    $scope.canvasDown = function (evt) {
        if (!$scope.docCanvasImage) {
            return;
        }
        $scope.docCanvas.addEventListener('mousemove', $scope.canvasMove, false);
        $scope.lastX = evt.offsetX || (evt.pageX - $scope.docCanvas.offsetLeft);
        $scope.lastY = evt.offsetY || (evt.pageY - $scope.docCanvas.offsetTop);
        $scope.dragStart = $scope.docCanvasCtx.transformedPoint($scope.lastX, $scope.lastY);
        $scope.dragged = false;
    };
    $scope.canvasUp = function (evt) {
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
