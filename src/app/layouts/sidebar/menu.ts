import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENU',
        isTitle: true
    },
    {
        id: 2,
        label: 'Dashboard',
        icon: 'bx-home-circle',
        link: '/dashboard'
    },
    {
        id: 3,
        isLayout: true
    },
    // {
    //     id: 4,
    //     label: 'MENUITEMS.APPS.TEXT',
    //     isTitle: true
    // },
    // {
    //     id: 12,
    //     label: 'MENUITEMS.ECOMMERCE.TEXT',
    //     icon: 'bx-store',
    //     subItems: [
    //         {
    //             id: 16,
    //             label: 'MENUITEMS.ECOMMERCE.LIST.CUSTOMERS',
    //             link: '/ecommerce/customers',
    //             parentId: 12
    //         },
    //     ]
    // },
    // {
    //     id: 48,
    //     label: 'MENUITEMS.CONTACTS.TEXT',
    //     icon: 'bxs-user-detail',
    //     subItems: [
    //         {
    //             id: 49,
    //             label: 'MENUITEMS.CONTACTS.LIST.USER',
    //             link: '/contacts/user',
    //             parentId: 48
    //         },
    //         {
    //             id: 51,
    //             label: 'MENUITEMS.CONTACTS.LIST.PROFILE',
    //             link: '/contacts/profile',
    //             parentId: 48
    //         }
    //     ]
    // },
];

