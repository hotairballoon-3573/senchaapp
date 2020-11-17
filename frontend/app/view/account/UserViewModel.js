Ext.define('Admin.view.account.UserViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userviewmodel',

    requires: [

    ],

    stores: {
        userstore: {
            type: 'userstore'
        }
    }
});
