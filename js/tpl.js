var tpl = {
    top_control_panel: ' \
        <div id="apollo-top-panel" ng-controller="apollo_config"> \
            <div class="apollo-property-container"> \
                <div ng-repeat="c in config.collection" class="apollo-property-list"> \
                </div> \
            </div> \
            <div class="apollo-nav"> \
                <ul> \
                    <li><a href="#" ng-click="backViewToggle()" id="apollo-preview">返回页面</a></li> \
                    <li><a href="#" ng-click="preViewToggle()" id="apollo-preview">数据预览</a></li> \
                    <li><a href="#" ng-click="configViewToggle()" id="apollo-edit-config">配置编辑</a></li> \
                </ul> \
            </div> \
            <div apollo-preview-panel config="previewData" showctl="preViewStatus"></div> \
            <div apollo-edit-panel config="config.collection" showctl="configViewStatus"></div> \
            <div id="apollo-display"></div> \
        </div>'
};
