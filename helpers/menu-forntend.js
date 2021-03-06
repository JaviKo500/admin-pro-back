const getMemuFrontEnd = (role = 'USER_ROLE') => {
    // console.log(role);
    const menu = [{
            title: 'Principal',
            icon: 'mdi mdi-gauge',
            subMenu: [
                { title: 'Main', url: '/' },
                { title: 'ProgresBar', url: 'progres' },
                { title: 'Gráfica', url: 'grafica1' },
                { title: 'Promesas', url: 'promesas' },
                { title: 'Rxjs', url: 'rxjs' }
            ]
        },
        {
            title: 'Mamtenimiento',
            icon: 'mdi mdi-folder-lock-open',
            subMenu: [
                // { title: 'Usuarios', url: 'usuarios' },
                { title: 'Hospitales', url: 'hospitales' },
                { title: 'Médicos', url: 'medicos' }
            ]
        }
    ];
    if (role === 'ADMIN_ROLE') {
        menu[1].subMenu.unshift({ title: 'Usuarios', url: 'usuarios' });
    }
    return menu;
};

module.exports = { getMemuFrontEnd }