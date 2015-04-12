var tpl = {
    top_control_panel: ' \
        <div id="apollo-top-panel" ng-controller="apollo-config"> \
            <div class="apollo-property-container"> \
                <div ng-repeat="c in config.collection" class="apollo-property-list"> \
                </div> \
            </div> \
            <div> \
                <ul class="apollo-nav" id="apollo-nav"> \
                    <li><a href="#" id="apollo-set">设置</a></li> \
                    <li><a href="#" id="apollo-preview">预览</a></li> \
                    <li><a href="#" id="apollo-edit-config">编辑config</a></li> \
                </ul> \
            </div> \
            <div id="apollo-display"></div> \
        </div> \
        <div id="apollo-content-container" style="display:none"><pre></pre></div>',
    top_control_panel_phone_app_demo: ' \
        <div id="apollo"> \
            <div> \
                <div ng-controller="PhoneListCtrl"> \
                    <ul> \
                        <li ng-repeat="phone in phones"> \
                            <span>{{phone.name}}</span> \
                            <p>{{phone.snippet}}</p> \
                        </li> \
                    </ul> \
                </div> \
            </div> \
            <div id="display"></div> \
        </div>',
};
