<!DOCTYPE html>
<html lang="en" ng-app="myApp" ng-controller="myApp.MainCtrl as main">

<head>
    <base href="/" >
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>White Company</title>
    <script src="app/bower_components/lodash/lodash.js"></script>
    <!-- Bootstrap Core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>

    <!-- Plugin CSS -->
    <link href="app/vendor/magnific-popup/magnific-popup.css" rel="stylesheet">

    <!-- Theme CSS -->
    <link href="app/css/creative.min.css" rel="stylesheet">
    <!--AOS-->
    <link rel="stylesheet" href="app/bower_components/aos/dist/aos.css" />

    <!--Calendar-->
    <link rel="stylesheet" href="app/bower_components/fullcalendar/dist/fullcalendar.css"/>
    <!--Crop-->
    <link rel="stylesheet" href="app/bower_components/ng-img-crop/compile/unminified/ng-img-crop.css"/>
    <!-- Angular Material style sheet -->
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">
    <link rel="stylesheet" type="text/css" href="http://cloud.github.com/downloads/lafeber/world-flags-sprite/flags16.css" />
    <link rel="stylesheet" type="text/css" href="http://cloud.github.com/downloads/lafeber/world-flags-sprite/flags32.css" />

    <link href='app/bower_components/ng-image-gallery/dist/ng-image-gallery.css' rel='stylesheet' type='text/css'>
    <link href='app/bower_components/angular-super-gallery/dist/angular-super-gallery.css' rel='stylesheet' type='text/css'>
    <link href='app/bower_components/trix/dist/trix.css' rel='stylesheet' type='text/css'>


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]> -->
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body id="page-top" >



<nav-bar></nav-bar>

<span ui-view autoscroll="true"></span>

<footer></footer>



<script type="text/javascript" src="app/bower_components/jquery/dist/jquery.min.js"></script>

<script src="app/bower_components/angular/angular.js"></script>
<script src="app/bower_components/angular-animate/angular-animate.js"></script>
<script src="app/bower_components/angular-messages/angular-messages.js"></script>
<script src="app/bower_components/angular-resource/angular-resource.js"></script>
<script src="app/bower_components/angular-aria/angular-aria.js"></script>
<script src="app/bower_components/angular-sanitize/angular-sanitize.js"></script>
<script src="app/bower_components/angular-route/angular-route.js"></script>
<!-- Satellizer CDN -->
<script src="app/node_modules/satellizer/dist/satellizer.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.3/angular-ui-router.min.js"></script>
<script src="app/bower_components/angular-touch/angular-touch.js"></script>
<script src="app/bower_components/angular-fullscreen/src/angular-fullscreen.js"></script>
<script src="app/bower_components/angular-validation-match/dist/angular-validation-match.js"></script>
<script src="app/bower_components/angular-text-collapse/text-collapse.js"></script>
<script src="app/bower_components/ng-image-gallery/dist/ng-image-gallery.js"></script>
<script src="app/bower_components/angular-super-gallery/dist/angular-super-gallery.js"></script>
<script src="app/bower_components/trix/dist/trix.js"></script>
<script src="app/bower_components/angular-trix/dist/angular-trix.js"></script>
<script src="app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<script src="app/bower_components/angular-timer/dist/angular-timer.js"></script>
<script src="app/bower_components/moment/min/moment.min.js"></script>
<script src="app/bower_components/moment/min/locales.min.js"></script>
<script src="app/bower_components/humanize-duration/humanize-duration.js"></script>
<script src="app/bower_components/ng-videosharing-embed/build/ng-videosharing-embed.min.js"></script>
<script src="https://www.youtube.com/iframe_api"></script>
<script src="app/bower_components/angular-socialshare/dist/angular-socialshare.js"></script>
<script src="app/bower_components/ng-file-upload/ng-file-upload.js"></script>
<script src="app/bower_components/ng-img-crop/compile/unminified/ng-img-crop.js"></script>
<script src="app/bower_components/aos/dist/aos.js"></script>



<!-- Angular Material Library -->
<script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>
<script src="app/dist/app.module.js"></script>
<script src="app/dist/app.config.js"></script>
<script src="app/dist/_all.js"></script>
<script src="app/dist/main.js"></script>


<script src="app/dist/controllers/mainController.js"></script>
<script src="app/dist/controllers/signupController.js"></script>
<script src="app/dist/controllers/toolsController.js"></script>
<script src="app/app/controllers/modalController.js"></script>

<script src="app/dist/components/ranking/ranking.module.js"></script>
<script src="app/dist/components/ranking/config.js"></script>
<script src="app/dist/components/ranking/fighterResource.js"></script>
<script src="app/dist/components/ranking/tableAllController.js"></script>

<script src="app/dist/components/fighter/fighterController.js"></script>
<script src="app/dist/components/fighter/achievementResource.js"></script>
<script src="app/dist/components/ranking/tableBohurtController.js"></script>
<script src="app/dist/components/admin/adminController.js"></script>
<script src="app/dist/components/editor/editorController.js"></script>

<script src="app/dist/components/blog/blogController.js"></script>
<script src="app/dist/components/blog/blogResource.js"></script>
<script src="app/dist/components/blog/commentResource.js"></script>
<script src="app/dist/components/blog/commentReplyResource.js"></script>

<script src="app/dist/components/gallery/galleryController.js"></script>

<script src="app/dist/components/events/eventsController.js"></script>

<script src="app/dist/filters/array.js"></script>
<script src="app/dist/filters/abs.js"></script>

<script src="app/dist/core/services/auth.service.js"></script>
<script src="app/dist/core/services/toast.service.js"></script>

<script src="app/dist/core/resources/userResource.js"></script>
<script src="app/dist/core/resources/eventResource.js"></script>
<script src="app/dist/core/resources/eventNotesResource.js"></script>
<script src="app/dist/core/resources/imageResource.js"></script>
<script src="app/dist/core/resources/postTypeResource.js"></script>

<script src="app/dist/directives/nav/nav.directive.js"></script>
<script src="app/app/directives/flag.js"></script>


<!-- jquery, moment, and angular have to get included before fullcalendar -->
<script type="text/javascript" src="app/bower_components/moment/min/moment.min.js"></script>
<script type="text/javascript" src="app/bower_components/angular-ui-calendar/src/calendar.js"></script>
<script type="text/javascript" src="app/bower_components/fullcalendar/dist/fullcalendar.min.js"></script>
<script type="text/javascript" src="app/bower_components/fullcalendar/dist/gcal.js"></script>

<script>
    AOS.init();
</script>

<script src="app/dist/directives/footer/footer.directive.js"></script>
<!-- jQuery -->
<!--<script src="vendor/jquery/jquery.min.js"></script>-->

<!-- Bootstrap Core JavaScript -->
<script src="app/vendor/bootstrap/js/bootstrap.min.js"></script>

<!-- Plugin JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<script src="app/vendor/scrollreveal/scrollreveal.min.js"></script>
<script src="app/vendor/magnific-popup/jquery.magnific-popup.min.js"></script>

<!-- Theme JavaScript -->
<script src="app/js/creative.min.js"></script>

</body>

</html>
