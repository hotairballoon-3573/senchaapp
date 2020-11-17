Ext.define('Admin.view.account.User', {
    extend: 'Ext.grid.Panel',
    xtype: 'accountuser',

    requires: [
        'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager'
    ],

    controller: 'userviewcontroller',

    viewModel: {
        type: 'userviewmodel'
    },

    listeners: {
        beforerender: 'onBeforerender',
        celldblclick: 'onCelldblclick'
    },

    cls: 'shadow-panel user-grid ',

    bind: '{userstore}',

    margin: 20,

    title: '用户管理',

    columnLines: true,

    tbar:[
        {
            xtype: 'textfield',
            name:'username',
            emptyText: '请输入用户名进行搜索'
        },
        {
            ui: 'soft-green',
            cls: 'widget-tool-button',
            text: '查询',
            listeners: {
                click: 'onClickQueryUser'
            }
        },
        {
            xtype: 'container',
            items: [
                {
                    xtype:"button",
                    text:"创建用户",
                    margin:'0 5 0 0',
                    handler:'onClickCreateUser'
                }
            ]
        }
    ],
    columns: [
        {
            xtype: 'rownumberer',
            width: 70,
            text: '序号'
        }
        ,{xtype: 'gridcolumn',dataIndex: 'header',text: '用户',width: 75,renderer: 'rendererUserHeader'}
        ,{xtype: 'gridcolumn',dataIndex: 'usercode',text: '人员编号',flex: 2}
        ,{xtype: 'gridcolumn',dataIndex: 'username',text: '用户名',flex: 2}
        ,{xtype: 'gridcolumn',dataIndex: 'alias',text: '姓名',flex: 2}
        ,{xtype: 'gridcolumn',dataIndex: 'sex',text: '性别',flex: 1,renderer: 'renderUserSex'}
        ,{xtype: 'gridcolumn',dataIndex: 'update_time',text: '更新时间',flex: 3}
        ,{xtype: 'gridcolumn',dataIndex: 'is_deleted',text: '状态',flex: 1,renderer: 'renderUserStatus'}
        ,{
            xtype: 'actioncolumn',
            text: '禁用',
            width: 55,
            menuDisabled: true,
            tooltip: '禁用账号',
            iconCls: 'x-fa fa-ban',
            isDisabled: 'isBanDisabled',
            handler: 'onClickToDisable'
        }
        ,{
            xtype: 'actioncolumn',
            text: '启用',
            width: 55,
            menuDisabled: true,
            tooltip: '启用账号',
            iconCls: 'x-fa fa-check',
            isDisabled: 'isEnableDisabled',
            handler: 'onClickToEnable'
        }
        ,{
            xtype: 'actioncolumn',
            text: '编辑',
            width: 55,
            menuDisabled: true,
            tooltip: '信息修改',
            iconCls: 'x-fa fa-pencil',
            handler: 'onClickToEdit'
        }
        ,{
            xtype: 'actioncolumn',
            text: '删除',
            width: 55,
            menuDisabled: true,
            tooltip: '删除用户',
            iconCls: 'x-fa fa-close',
            handler: 'onClickToDelete'
        }
    ],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        plugins: 'ux-progressbarpager',
        bind: '{userstore}'
    }
});
