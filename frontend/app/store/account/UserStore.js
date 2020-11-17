Ext.define('Admin.store.account.UserStore', {
    extend: 'Ext.data.Store',

    alias: 'store.userstore',

    model: 'Admin.model.account.UserModel',

    proxy: {
        type: 'api',
        url: '/api/auth/QueryUserPageList',
        reader:{
            type:"json",
			rootProperty:"data.records",
			totalProperty:"data.total"
		}
    },

    autoLoad: false,

});
