(function(){
    // var html = tpl.top_control_panel;
    var html = tpl.new_top_control_panel;
    $('body').css('padding-top', '60px');
    $('body').append(html);

    // start angular
    angular.bootstrap(document, ["Apollo"]);

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
        // 清空上次的hover态和点击绑定
        $('.apollo-hover').each(function(index, el){
            $(el).removeClass('apollo-hover');
            $(el).unbind('click');
        });
        // 如果已经选择，不再加入
        if (in_apollo_container(target)){
            return;
        }
        // 获取css，并且在dom中展示
        var csspath = page_util.csspath_standard(target);
        $('#apollo-display').html(csspath);
        // 对本次选择添加样式和点击事件
        $(csspath).each(function(index, el){$(el).addClass('apollo-hover')});
        // 利用Jquery绑定的click事件，激活controller的方法
        $(target).click(function(){
            apollo.add_property(csspath);
            apollo.$digest();
            // apollo.$apply();//TODO 哪一个更好
        });
    };
    
    // 将通过angular directive实现
    // nav event combine
    // $('#apollo-preview').click(function(e) {
    //     content_container = show_container()
    //     pre = $('pre').html(JSON.stringify(config().show_html(), null, 4));
    //     content_container.append(pre);
    // });

    // $('#apollo-set').click(function(e) {
    //     content_container = $('#apollo-content-container');
    //     content_container.fadeOut("fast");
    // });

    // $('#apollo-edit-config').click(function(e) {
    //     content_container = show_container()
    //     pre = $('pre').html(JSON.stringify(config().show_config(), null, 4));
    //     content_container.append(pre);
    //     // $('.apollo-edit-config').show();
    // });

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
