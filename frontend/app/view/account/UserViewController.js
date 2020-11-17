Ext.define('Admin.view.account.UserViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userviewcontroller',

    onBeforerender : function( sender, e ) {
        var controller = this;
        var userstore = controller.getViewModel().getStore('userstore');
        userstore.load({
			callback:function(me,operation,success){
                if(!success){
					Ext.Msg.alert("系统提示","无法访问后台接口服务!");
				}
			}
		});
    },

    onClickQueryUser : function( bt, e, eOpts ) {
        username = Ext.String.trim(bt.up('toolbar').getComponent(0).getValue());

        var controller = this;
        var userstore = controller.getViewModel().getStore('userstore');

        if(!username || username === ''){
            userstore.load();
        }

		userstore.load({
		    callback:function(me,operation,success){
                if(!success){
					Ext.Msg.alert("系统提示","无法访问后台接口服务!");
				}
			},
            params : {
                'username' : username
            }
		});
    },

    rendererUserHeader: function (value, metaData, record, rowIndex) {
        if (value){
            return "<img src='"+ value +"' alt='Profile Pic' height='40px' width='40px'>";
        }
    },

    renderUserSex: function (value, metaData, record, rowIndex) {
        if (value === 'M'){
            return "男";
        }

        return "女";
    },

    renderUserStatus: function (value, metaData, record, rowIndex) {
        if (value){
            return '<img src="resources/images/icons/color-warning-icon.png">';
        }

        return '<img src="resources/images/icons/color-success-icon.png">';
    },

    onClickCreateUser : function( bt, e, eOpts ) {
        var win = Ext.create('Admin.view.account.UserCreateWinow');
        win.show();
    },

    isBanDisabled: function(view, rowIdx, colIdx, item, record) {
        var is_deleted = record.data.is_deleted;

        return is_deleted;
    },

    isEnableDisabled: function(view, rowIdx, colIdx, item, record) {
        var is_deleted = record.data.is_deleted;

        return !is_deleted;
    },

    onClickToDisable: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var data = record.data;
        var id = data.id;

        var controller = this;
        var view = controller.getView();

        Ext.Msg.confirm("系统提示", "您确定禁用该用户吗？", function (choice){
            if(choice === 'yes'){
                var loadMask=Ext.create("Ext.LoadMask",{
                    msg:"处理中...",
                    target:view
                });
                loadMask.show();

                Ext.Ajax.request({
                    url: '/api/auth/SubmitUserDisable',
                    timeout: 5000,
                    method:'post',
                    params: {
                        id: id
                    },
                    success: function(response) {
                        loadMask.hide();
                        var obj = Ext.decode(response.responseText);
                        var data = obj.data;
                        if(obj.code === '0'){
                            Ext.Msg.alert('系统提示','操作成功!!!');

                            var userStore = view.getStore();
                            userStore.load();
                        }else{
                            Ext.Msg.alert(
                                '系统提示',
                                '后台程序发生异常.异常信息:' + data.exception
                            );
                        }
                    },
                    failure: function(response, opts) {
                        loadMask.hide();
                        Ext.Msg.alert('系统提示','后台程序无响应');
                    }
                });
            }
        });

    },

    onClickToEnable: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var data = record.data;
        var id = data.id;

        var controller = this;
        var view = controller.getView();

        Ext.Msg.confirm("系统提示", "您确定启用该用户吗？", function (choice){
            if(choice === 'yes'){
                var loadMask=Ext.create("Ext.LoadMask",{
                    msg:"处理中...",
                    target:view
                });
                loadMask.show();

                Ext.Ajax.request({
                    url: '/api/auth/SubmitUserEnable',
                    timeout: 5000,
                    method:'post',
                    params: {
                        id: id
                    },
                    success: function(response) {
                        loadMask.hide();
                        var obj = Ext.decode(response.responseText);
                        var data = obj.data;
                        if(obj.code === '0'){
                            Ext.Msg.alert('系统提示','操作成功!!!');

                            var userStore = view.getStore();
                            userStore.load();
                        }else{
                            Ext.Msg.alert(
                                '系统提示',
                                '后台程序发生异常.异常信息:' + data.exception
                            );
                        }
                    },
                    failure: function(response, opts) {
                        loadMask.hide();
                        Ext.Msg.alert('系统提示','后台程序无响应');
                    }
                });
            }
        });

    },

    onClickToEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var data = record.data;
        var id = data.id;

    },

    onClickToDelete: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var data = record.data;
        var id = data.id;

        var controller = this;
        var view = controller.getView();

        Ext.Msg.confirm("系统提示", "您确定删除该用户吗？", function (choice){
            if(choice === 'yes'){
                var loadMask=Ext.create("Ext.LoadMask",{
                    msg:"处理中...",
                    target:view
                });
                loadMask.show();

                Ext.Ajax.request({
                    url: '/api/auth/DeleteUser',
                    timeout: 5000,
                    method:'delete',
                    params: {
                        id: id
                    },
                    success: function(response) {
                        loadMask.hide();
                        var obj = Ext.decode(response.responseText);
                        var data = obj.data;
                        if(obj.code === '0'){
                            Ext.Msg.alert('系统提示','操作成功!!!');

                            var userStore = view.getStore();
                            userStore.load();
                        }else{
                            Ext.Msg.alert(
                                '系统提示',
                                '后台程序发生异常.异常信息:' + data.exception
                            );
                        }
                    },
                    failure: function(response, opts) {
                        loadMask.hide();
                        Ext.Msg.alert('系统提示','后台程序无响应');
                    }
                });
            }
        });

    },

    onCelldblclick : function ( sender, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
        if(cellIndex !== 1){
            return false;
        }

        var data = record.data;

        var header = data.header;
        var username = data.username;
        var alias = data.alias;

        var win = Ext.create('Admin.view.account.UserHeader');
        win.removeAll();
        win.add(
            {
                xtype: 'panel',
                userCls: 'big-100 small-100 shadow',

                requires: [
                    'Ext.Button',
                    'Ext.Container'
                ],

                layout: {
                    type: 'vbox',
                    align: 'middle'
                },

                height: 320,

                bodyPadding: 20,

                items: [
                    {
                        xtype: 'image',
                        cls: 'userProfilePic',
                        height: 120,
                        width: 120,
                        alt: 'profile-picture',
                        src:header
                    },
                    {
                        xtype: 'component',
                        cls: 'userProfileName',
                        height: '',
                        html:username
                    },
                    {
                        xtype: 'component',
                        cls: 'userProfileDesc',
                        html:alias
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'button',
                            margin: 5
                        },
                        margin: 5,
                        items: [
                            {
                                xtype: 'fileuploadfield',
                                width:70,
                                margin: 5,
                                buttonOnly: true,
                                multiple : false,
                                buttonText: '头像',
                                buttonConfig: {
                                    ui: 'facebook',
                                    iconCls: 'x-fa fa-upload',
                                },
                            },
                            {
                                ui: 'soft-purple',
                                iconCls: 'x-fa fa-key',
                                text: '密码',
                            },
                            {
                                ui: 'soft-red',
                                iconCls: 'x-fa fa-sign-out',
                                text: '注销',
                            },
                        ]
                    },
                    {
                        xtype: 'button',
                        width: 220,
                        text: ' 我的信息',
                        iconCls: 'x-fa fa-edit',
                        platformConfig: {
                            classic: {
                                scale: 'large'
                            },
                            modern: {
                                ui: 'action'
                            }
                        }
                    }
                ]
            },
        );
        win.show();
    },

});