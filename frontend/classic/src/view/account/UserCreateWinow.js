Ext.define('Admin.view.account.UserCreateWinow', {
    extend: 'Ext.window.Window',
    alias: 'widget.usercreatewinow',
    autoShow: true,
    modal: true,
    maximizable: true,

    title: '创建用户',

    controller: 'usercreateviewcontroller',

    width: 200,
    height: 200,

    layout: {
        type:'hbox',
        align:'stretch'
    },

    items: [
        {
            xtype: 'form',
            flex: 1,

            border: false,
            bodyPadding: 10,

            fieldDefaults: {
                msgTarget: 'side',
                labelAlign: 'top',
                labelWidth: 100,
                labelStyle: 'font-weight:bold'
            },

            items: [
                {
                    xtype: 'fieldcontainer',
                    labelStyle: 'font-weight:bold;padding:0;',
                    layout: 'hbox',
                    defaultType: 'textfield',

                    fieldDefaults: {
                        labelAlign: 'top',
                    },

                    items: [
                        {
                            flex: 3,
                            name: 'usercode',
                            fieldLabel: '用户编号',
                        },
                        {
                            xtype: 'component',
                            flex: 2,
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    labelStyle: 'font-weight:bold;padding:0;',
                    layout: 'hbox',
                    defaultType: 'textfield',

                    fieldDefaults: {
                        labelAlign: 'top',
                    },

                    items: [
                        {
                            flex: 1,
                            name: 'alias',
                            fieldLabel: '姓名',
                        },
                        {
                            xtype: 'component',
                            flex: 1,
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    labelStyle: 'font-weight:bold;padding:0;',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    fieldLabel: '性别',
                    fieldDefaults: {
                        labelAlign: 'top',
                    },

                    items: [
                        {
                            xtype: 'radiogroup',

                            layout: {
                                autoFlex: false
                            },

                            defaults: {
                                name: 'sex',
                                margin: '0 15 0 0'
                            },

                            items: [
                                {
                                    boxLabel: '男',
                                    inputValue: 'M',
                                    checked: true
                                },
                                {
                                    boxLabel: '女',
                                    inputValue: 'F'
                                }
                            ]
                        }
                    ]
                },
            ],

            buttons: [
                {
                    text: '取消',
                    ui: 'soft-red',
                    listeners: {
                        click: 'onClickToClose'
                    },

                },
                {
                    text: '确定',
                    ui: 'soft-green',
                    listeners: {
                        click: 'onClickToCreate'
                    },
                },
            ],

        }
    ],

    afterRender: function () {
        var me = this;

        me.callParent(arguments);

        me.syncSize();

        Ext.on(me.resizeListeners = {
            resize: me.onViewportResize,
            scope: me,
            buffer: 50
        });
    },

    doDestroy: function () {
        Ext.un(this.resizeListeners);

        this.callParent();
    },

    onViewportResize: function () {
        this.syncSize();
    },

    syncSize: function () {
        var width = Ext.Element.getViewportWidth(),
            height = Ext.Element.getViewportHeight();

        this.setSize(Math.floor(width * 0.50), Math.floor(height * 0.70));
        this.setXY([ Math.floor(width * 0.05), Math.floor(height * 0.05) ]);
    }
});
