Ext.define('Admin.view.account.UserHeader', {
    extend: 'Ext.window.Window',
    alias: 'widget.userheader',
    autoShow: true,
    modal: true,
    draggable: false,

    header: false,
    frame: false,

    cls: 'userProfile-container',

    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],

    layout: 'responsivecolumn',

    width: 200,
    height: 200,

    tbar: [
        {
            iconCls: 'x-fa fa-close',
            listeners: {
                click: function(){
                    var view = this.up('window');
                    view.close();
                }
            }
        },
        {
            iconCls: 'x-fa fa-trash'
        },
        {
            iconCls: 'x-fa fa-exclamation-circle'
        },
        {
            iconCls:'x-fa fa-print'
        },
        {
            iconCls: 'x-fa fa-forward'
        }
    ],

    items: [

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

        this.setSize(Math.floor(width * 0.4), Math.floor(height * 0.65));
        this.setXY([ Math.floor(width * 0.05), Math.floor(height * 0.05) ]);
    }
});
