Ext.define('Admin.store.account.MenuStore', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.menustore',

    model: 'Admin.model.account.MenuModel',

    proxy: {
        type: 'api',
        url: '/api/auth/QueryMenuChildren',
        reader:{
            type:"json",
            rootProperty:"data.children",
		}
    },

    root: {
        text: 'Ext JS',
        id: 0,
        expanded: true
    },

});
