Ext.define('Admin.view.account.MenuViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.menuviewmodel',

    requires: [

    ],

    stores: {
        menustore: {
            type: 'menustore'
        }
    }
});
