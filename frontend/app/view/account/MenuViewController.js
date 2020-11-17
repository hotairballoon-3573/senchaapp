Ext.define('Admin.view.account.MenuViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menuviewcontroller',

    formatLeaf: function(v) {
        if (v) {
            return '是';
        }else{
            return '否';
        }
    },

    isRowAddDisabled: function(view, rowIdx, colIdx, item, record) {
        return record.data.leaf;
    },

    onAddChildNodeAction: function(grid, rowIndex, colIndex, actionItem, event, record, row) {

    }

});