(function(){
    var html = tpl.top_control_panel;
    $('body').css('padding-top', '50px');
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
        // 如果是top panel里的内容，不做相应
        if (in_apollo_container(target)){
            return;
        }
        // 获取css，并且在dom中展示
        var csspath = page_util.csspath_standard(target);
        // 对本次选择添加样式和点击事件
        $(csspath).each(function(index, el){$(el).addClass('apollo-hover')});

        // 利用Jquery绑定的click事件，激活controller的方法
        $(target).click(function(){
            apollo.add_potential_target(csspath);
            apollo.$digest();
        });
    };

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

    // init small tool
    String.prototype.startWith = function(s){
        if(s==null||s==""||this.length==0||s.length>this.length)
            return false;
        if(this.substr(0,s.length)==s)
            return true;
        else
            return false;
        return true;
    };

    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        };
    }

})();
