var tpl = {
    top_control_panel: ' \
        <div id="apollo-top-panel" ng-controller="apollo_config"> \
            <div> \
                <ul class="apollo-nav list-group" id="apollo-nav"> \
                    <li class="list-group-item"><a href="#" ng-click="preViewToggle()" id="apollo-preview">预览</a></li> \
                    <li class="list-group-item"><a href="#" ng-click="configViewToggle()" id="apollo-edit-config">配置</a></li> \
                </ul> \
            </div> \
            <div apollo-preview-panel config="previewData" showctl="preViewStatus"></div> \
            <div apollo-edit-panel config="config.collection" showctl="configViewStatus"></div> \
            <div id="apollo-display"></div> \
        </div>'
};
