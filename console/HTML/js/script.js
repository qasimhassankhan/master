$(window).on("load", function(){

    // ========== Sidemenu Functions ============ //
    // Sidemenu Open & Close
    $("body").on("click", ".sidemenu-opener", function(){
        $(".console-sidemenu").toggleClass('active');
    });
    // Sidemenu Dropdown
    /*================== Octa Sidemenu Dropdown =====================*/
    $(".console-sidemenu ul ul").parent().addClass("menu-item-has-children");
    $(".console-sidemenu ul li.menu-item-has-children > a").on("click", function() {
        $(this).parent().toggleClass("active").siblings().removeClass("active");
        $(this).next("ul").slideToggle();
        $(this).parent().siblings().find("ul").slideUp();
        return false;
    });

})
