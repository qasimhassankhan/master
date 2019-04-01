$(window).on("load", function () {
    "use strict";
    $(".bottom-bar").load("Content/Includes/bottombar.html");
    /*================== Custom Dropdown List =====================*/
    $(".has-ddl > a").on("click", function () {
        $(".ddl").removeClass('active');
        $(this).next('.ddl').toggleClass('active');
        return false;
    });
    /*================== Dropdown Button =====================*/
    $("body").on("click",function(event){
        if($(event.target).parents().hasClass('has-ddl')){
            return;
        }
        else{
            $('.ddl').removeClass('active');
        }
    });
    /*================== Sidemenu Button =====================*/
    $(".sidemenu-btn").on('click',function(){
    	$(this).parent('.sidemenu').toggleClass('active');
    	return false;
    });
      $("body").on("click",".responsive-menu-btn",function(){
            $('.sidemenu').toggleClass('slidein');
            return false;
      });
      $("body").on("click",".content-area",function(e){
            $('.sidemenu').removeClass('slidein');
//            return false;
      });

    /*================== Open Settings =====================*/
    $("body").on("click",".open-settings",function(){
        $(this).toggleClass('active').next('.widget-settings-inner').slideToggle();
        return false;
    });
    /*================== By Default Sidemenu Collapse on Small Screen =====================*/
    if($(window).width() < 1025){
        $(".sidemenu").addClass('active');
    }
    $("body").on("click",".table-action > a",function(){
      $(this).parents('tr').siblings().find('.action-drop').removeClass('active');
      $(this).parents('td').css({'overflow':'visible'});
      $(this).siblings('.action-drop').toggleClass('active');
      return false;
    });
    /*=== Status Box ===*/
    $(".status-box, .sm-status").on("click",function(){
        $(this).parents('.limo-status').find('.status-box,  .sm-status').removeClass('active');
        $(this).addClass('active');
    });
    /*=== Active Class On Option Button ===*/
    $(".option-btn").on("click", function () {
        $(this).toggleClass('active');
    });
    /*================== Plugins Initializations =====================*/
    /*=== DatePicker ===*/
    $('.datepicker').datepicker();
    /*=== Select2 ===*/
    $('.select,.bottom select').select2({
        placeholder: '--Select--',
        allowClear: true
    });
    /*=== Font Awesome ===*/
    window.FontAwesomeConfig = {
    searchPseudoElements: true
    }
    /*=== Tooltip ===*/
     $('[data-toggle="tooltip"]').tooltip()

    /*------------- preloader js --------------*/
    function HideLoader()
    {
        $('.loader-container').delay(500).fadeOut('slow');// will first fade out the loading animation
        $('.page-loader').delay(500).fadeOut('slow');// will fade out the white DIV that covers the website.
    }
    function ShowLoader()
    {
        $('.loader-container').delay(500).fadeIn('slow');// will first fade out the loading animation
        $('.page-loader').delay(500).fadeIn('slow');// will fade out the white DIV that covers the website.
    }
    HideLoader();
    //For DevExpress Filter Toggle Icon
    $("a.show-search").on("click", function () {
        $(this).parents(`.dev-icons`).toggleClass('active');
    });
    //For Custom Filter Toggle Icon
    $("body").on("click", ".arrow-btn", function () {
        $(this).toggleClass('active').parents('.widget').find('.widget-settings-inner').slideToggle();
        return false;
    });
    /*------------- Toggle Button --------------*/
    $('.cb-value').click(function () {
        var mainParent = $(this).parent('.toggle-btn');
        if ($(mainParent).find('input.cb-value').is(':checked')) {
            $(mainParent).addClass('active');
        } else {
            $(mainParent).removeClass('active');
        }

    });
    $(".widget, .show-options").each(function () {
        var ctrlID = "";
        if ($(this).attr('id') != "")
            ctrlID = $(this).attr('id');

        if ($(this).attr('data-refresh') == "true") {
            $(this).find('.widget-options').append(`<a href="Javascript:RefreshGrid('`+ctrlID+`Alerts','`+ctrlID+`Grid', true)" title="Refresh"><i class="fas fa-sync-alt"></i></a>`);
        }
        if ($(this).attr('data-autorefresh') == "true") {
            $(this).find('.widget-options').append(`<a href="Javascript:AutoRefresh('` + ctrlID +`Alerts','` + ctrlID + `', true)" title="Auto Refresh"> <img src="images/icons/auto-refresh.png" alt="" /> </a>`);
        }
        if ($(this).attr('data-external') == "true") {
            $(this).find('.widget-options').append(`<a href="Javascript:OpenInNewWindow('`+ctrlID+`')" title="Open In New Window"><i class="fas fa-external-link-alt"></i></a>`);
        }
        if ($(this).attr('data-fullscreen') == "true") {
            $(this).find('.widget-options').append(`<a  href="Javascript:FullScreen('` + ctrlID +`')" title="Full Screen"><i class="fas fa-expand"></i></a>`);
        }
        if ($(this).attr('data-settings') == "true") {
            $(this).find('.widget-options').append(`<a href="Javascript:ControlSettings('` + ctrlID +`')" title="Control Settings"><i class="fa fa-cog"></i></a>`);
        }
        if ($(this).attr('data-collapsible') == "true") {
            if ($(this).attr('data-collapse-state') == "true")
            {
                $("#" + ctrlID + "Collapser").parents('.widget').find('.widget-body').slideToggle();
                $("#" + ctrlID + "Collapser").append(`<i class="fa fa-angle-double-down"></i>`);
            }
            else
            {
                $("#" + ctrlID + "Collapser").append(`<i class="fa fa-angle-double-up"></i>`);
            }
        }
    });
 });


