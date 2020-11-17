Ext.define('Admin.model.account.UserModel', {
    extend: 'Admin.model.Base',
    fields: [
         {name:'id',type:'string'}
        ,{name:'usercode',type:'string'}
        ,{name:'username',type:'string'}
        ,{name:'alias',type:'string'}
        ,{name:'header',type:'string'}
        ,{name:'sex',type:'string'}
        ,{name:'create_time',type:'string'}
        ,{name:'update_time',type:'string'}
        ,{name:'is_deleted',type:'boolean'}
    ]
});
