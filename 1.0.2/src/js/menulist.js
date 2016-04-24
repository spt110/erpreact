"use strict";

module.exports = [
  [
    { path: '/formControl', text: 'FormControl', component: require('./pages/formControl.jsx') },
        { path: '/tree', text: 'Tree', component: require('./pages/tree.jsx') },

  ],
  [
    { path: '/modal',text:'Modal',component: require('./pages/modal.jsx')},
    {path:'/table',text:'Table',component:require('./pages/table.jsx')},
        { path: '/pagination', text: 'Pagination', component: require('./pages/pagination.jsx') },
    { path: '/grid', text: 'Grid', component: require('./pages/grid.jsx') },
        { path: '/c8DataGrid', text: 'C8DataGrid', component: require('./pages/c8DataGridPage.jsx') },
    {path:"/sysUserPage",text:'SysUserPage',component:require('./pages/sysUserPage.jsx')}

  ]
];
