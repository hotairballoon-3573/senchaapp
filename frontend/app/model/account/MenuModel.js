Ext.define('Admin.model.account.MenuModel', {
    extend: 'Admin.model.Base',
    fields: [
         {name:'id',type:'int'}
        ,{name:'text',type:'string'}
        ,{name:'iconCls',type:'string'}
        ,{name:'rowCls',type:'string'}
        ,{name:'expanded',type:'boolean'}
        ,{name:'selectable',type:'boolean'}
        ,{name:'viewType',type:'string'}
        ,{name:'routeId',type:'string'}
        ,{name:'leaf',type:'boolean'}
        ,{name:'pid',type:'int'}
        ,{name:'order_no',type:'int'}
    ]
});
