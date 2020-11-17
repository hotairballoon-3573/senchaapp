Ext.define('Admin.view.account.UserCreateViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usercreateviewcontroller',

    onClickToClose : function( bt, e, eOpts ) {
        var view = controller.getView();
        view.show();
    },

    onClickToCreate : function( bt, e, eOpts ) {
        var controller = this;
        var view = controller.getView();

        var form = view.getComponent(0);

        var usercode = Ext.String.trim(form.down('textfield[name="usercode"]').getValue());
        if(!usercode || usercode === ''){
            Ext.Msg.alert("系统提示","用户编号不允许为空!!!");
            return false;
        }

        var alias = Ext.String.trim(form.down('textfield[name="alias"]').getValue());
        if(!alias || alias === ''){
            Ext.Msg.alert("系统提示","用户姓名不允许为空!!!");
            return false;
        }

        var sex = form.down('radiogroup').getValue().sex;

        Ext.Msg.confirm("系统提示", "您确定添加用户吗？", function (choice){
            if(choice === 'yes'){
                var loadMask=Ext.create("Ext.LoadMask",{
                    msg:"处理中...",
                    target:view
                });
                loadMask.show();

                Ext.Ajax.request({
                    url: '/api/auth/SubmitUserSave',
                    timeout: 5000,
                    method:'post',
                    params: {
                        usercode: usercode,
                        alias: alias,
                        sex: sex
                    },
                    success: function(response) {
                        loadMask.hide();
                        var obj = Ext.decode(response.responseText);
                        var data = obj.data;
                        if(obj.code === '0'){
                            Ext.Msg.alert('系统提示','操作成功!!!');
                            view.close();

                            var userGrid = Ext.ComponentQuery.query('accountuser')[0];
                            var userStore = userGrid.getStore();
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

});