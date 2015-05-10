var tpl = {
    top_control_panel: ' \
        <div id="apollo-top-panel" ng-controller="apollo-config"> \
            <div> \
                <ul class="apollo-nav" id="apollo-nav"> \
                    <li><a href="#" id="apollo-set">设置</a></li> \
                    <li><a href="#" id="apollo-preview">预览</a></li> \
                    <li><a href="#" id="apollo-edit-config">编辑config</a></li> \
                </ul> \
            </div> \
            <div id="apollo-display"></div> \
            <div ng-repeat="(key, value) in config.collection" class="apollo-property-list"> \
                <div style="margin: 3px"> \
                    <p>{{key}}</p> \
                    <ul> \
                        <textarea name="" id="" ng-model="value.name" ng-trim="boolean">{{value.name}}</textarea> \
                    </ul> \
                </div> \
            </div> \
        </div> \
        <div class="apollo-property-container"></div> \
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

    new_top_control_panel: ' \
        <div id="apollo-top-panel" ng-controller="apollo_config"> \
            <div> \
                <ul class="apollo-nav list-group" id="apollo-nav"> \
                    <li class="list-group-item"><a href="#" ng-click="preViewToggle()" id="apollo-preview">预览</a></li> \
                    <li class="list-group-item"><a href="#" ng-click="configViewToggle()" id="apollo-edit-config">配置</a></li> \
                </ul> \
            </div> \
            <div apollo-preview-panel config="config.collection" showctl="preViewStatus"></div> \
            <div apollo-edit-panel config="config.collection" showctl="configViewStatus"></div> \
            <div id="apollo-display"></div> \
        </div>'
};
