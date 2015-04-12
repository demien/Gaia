(function(){
    var html = tpl.top_control_panel;
    $('body').css('padding-top', '60px');
    $('body').append(html);

    // start angular
    angular.bootstrap(document,["Apollo"]);    

    // element picker start
    var last_em;
    var bg_color;

    // remove a event
    $('a').removeAttr('href');
    $('a').removeAttr('onClick');

    apollo = angular.element($('#apollo-display')).scope();

    document.onmouseover = function(e){
        var event = e || window.event;
        var target = event.target || event.srcElement;
        $('.apollo-hover').each(function(index, el){
            $(el).removeClass('apollo-hover');
            $(el).unbind('click');
        });
        var csspath = page_util.csspath_standard(target);
        if (in_apollo_container(target)){
            return;
        }
        $('#apollo-display').html(csspath);
        $(csspath).each(function(index, el){$(el).addClass('apollo-hover')});
        $(target).click(function(){
            apollo.add_property(csspath);
            apollo.$digest();
        });
    };

    // nav event combine
    $('#apollo-preview').click(function(e) {
        content_container = show_container()
        pre = $('pre').html(JSON.stringify(config().show_html(), null, 4));
        content_container.append(pre);
    });

    $('#apollo-set').click(function(e) {
        content_container = $('#apollo-content-container');
        content_container.fadeOut("fast");
    });

    $('#apollo-edit-config').click(function(e) {
        content_container = show_container()
        pre = $('pre').html(JSON.stringify(config().show_config(), null, 4));
        content_container.append(pre);
    });

    show_container = function(){
        content_container = $('#apollo-content-container');
        content_container.css('display', 'None');
        apollo_top_panel = $('#apollo-top-panel');
        content_container_height = $(window).height() - apollo_top_panel.height() + 20;
        content_container.css('height', content_container_height);
        content_container.css('top', apollo_top_panel.height() + 20);
        content_container.fadeIn("fast");
        return content_container
    }

    in_apollo_container = function(el){
        var containers = ['apollo-top-panel', 'apollo-content-container']
        while (el.parentNode){
            if(containers.indexOf(el.id) >= 0){
                return true;
            }
            el=el.parentNode;
        }
        return false;
    };

    String.prototype.startWith = function(s){
        if(s==null||s==""||this.length==0||s.length>this.length)
            return false;
        if(this.substr(0,s.length)==s)
            return true;
        else
            return false;
        return true;
    };

})();
