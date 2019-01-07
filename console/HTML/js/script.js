$(window).on("load", function(){

    // ========== Sidemenu Functions ============ //
    // Sidemenu Open & Close
    $("body").on("click", ".sidemenu-opener", function(){
        $(".console-sidemenu").toggleClass('active');
    });

    // Sidemenu Dropdown
    $(".console-sidemenu ul ul").parent().addClass("menu-item-has-children");
    $(".console-sidemenu ul li.menu-item-has-children > a").on("click", function() {
        $(this).parent().toggleClass("active").siblings().removeClass("active");
        $(this).next("ul").slideToggle();
        $(this).parent().siblings().find("ul").slideUp();
        return false;
    });



    // ========== More Option Panel Functions ============ //
    // Open & Close
    $("body").on("click", ".more-opt-open", function(){
        $(".more-opt-panel").toggleClass('active');
    });


    // ========== Grid Stack Initialization ============ //
    var options = {
      float: true,
      cellHeight: 10,
      animate:true,
      width:12,
      verticalMargin: 20,

    };
    $('.grid-stack').gridstack(options);


    // ========== Piety ============ //
    $.fn.peity.defaults.bar = {
        delimiter: ",",
        fill: ["#5d8bd0"],
        height:32,
        max: null,
        min: 0,
        padding: 0.1,
        width: 60
    }
    $(".piety-bar").peity("bar")

    $('.sparklines').sparkline('html', { enableTagOptions: true });

})
