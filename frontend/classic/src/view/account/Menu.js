Ext.define('Admin.view.account.Menu', {
    extend: 'Ext.tree.Panel',
    xtype: 'menu',

    controller: 'menuviewcontroller',

    viewModel: {
        type: 'menuviewmodel'
    },

    bind: '{menustore}',

    margin: 20,

    title: '功能菜单',

    reserveScrollbar: true,
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: true,

    columns: [
        {
            xtype: 'treecolumn',
            text: '菜单',
            dataIndex: 'text',
            flex: 3,
            sortable: true
        },
        {
            text: '视图码',
            dataIndex: 'viewType',
            flex: 3,
            sortable: true,
            align: 'center',
        },
        {
            text: '图标',
            dataIndex: 'iconCls',
            flex: 3,
            sortable: true,
            align: 'center',
        },
        {
            text: '叶子节点',
            dataIndex: 'leaf',
            flex: 2,
            align: 'center',
            formatter: 'this.formatLeaf'
        },
        {
            text: '排序号',
            dataIndex: 'order_no',
            flex: 1,
            align: 'center',
        },
    ],


});