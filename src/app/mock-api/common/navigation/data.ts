/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'master',
        title: 'Master',
        type: 'collapsable',
        icon: 'mat_outline:manage_accounts',
        link: 'master',
        children: [
            {
                id: 'master/languages',
                title: 'Languages',
                type: 'basic',
                link: 'master/languages',
                icon: 'heroicons_outline:translate',
            },
            {
                id: 'master/units',
                title: 'Units',
                type: 'basic',
                link: 'master/units',
                icon: 'straighten',
            },
            {
                id: 'master/diving-modes',
                title: 'Diving Modes',
                type: 'basic',
                link: 'master/diving-modes',
                icon: 'feather:target',
            },
            {
                id: 'master/dive-purposes',
                title: 'Dive Purpose',
                type: 'basic',
                link: 'master/dive-purposes',
                icon: 'heroicons_outline:light-bulb',
            },
            {
                id: 'master/water-types',
                title: 'Water Types',
                type: 'basic',
                link: 'master/water-types',
                icon: 'water',
            },
            {
                id: 'master/water-entry',
                title: 'Water Entry',
                type: 'basic',
                link: 'master/water-entry',
                icon: 'mat_outline:water_drop',
            },
            {
                id: 'master/dive-visibility',
                title: 'Dive Visibility',
                type: 'basic',
                link: 'master/dive-visibility',
                icon: 'mat_outline:disabled_visible',
            },
            {
                id: 'master/diving-type',
                title: 'Diving Type',
                type: 'basic',
                link: 'master/diving-type',
                icon: 'pool',
            },
            {
                id: 'master/under-water-life',
                title: 'Under Water Life',
                type: 'basic',
                link: 'master/under-water-life',
                icon: 'mat_solid:anchor',
            },
            {
                id: 'master/disciplines',
                title: 'Disciplines',
                type: 'basic',
                link: 'master/disciplines',
                icon: 'feather:clock',
            },
            {
                id: 'master/bcd-ventilator',
                title: 'BCD Ventilator',
                type: 'basic',
                link: 'master/bcd-ventilator',
                icon: 'mat_outline:masks',
            },
            {
                id: 'master/suit-accessories',
                title: 'Suit Accessories',
                type: 'basic',
                link: 'master/suit-accessories',
                icon: 'mat_outline:checkroom',
            },
            {
                id: 'master/nations',
                title: 'Nations',
                type: 'basic',
                link: 'master/nations',
                icon: 'feather:flag',
            },
            {
                id: 'master/status',
                title: 'status',
                type: 'basic',
                link: 'master/status',
                icon: 'feather:check-circle',
            },
        ],
    },
    {
        id: 'members',
        title: 'Members',
        type: 'collapsable',
        icon: 'heroicons_outline:user-group',
        link: 'members',
        children: [
            {
                id: 'members/users',
                title: 'Users',
                type: 'basic',
                link: 'members/users',
                icon: 'mat_outline:account_circle',
            },
            {
                id: 'members/guest',
                title: 'Guest',
                type: 'basic',
                link: 'members/guest',
                icon: 'feather:users',
            },
            {
                id: 'members/log-in-logs',
                title: 'Login Logs',
                type: 'basic',
                link: 'members/log-in-logs',
                icon: 'feather:log-in',
            },
            {
                id: 'members/black-listed-tokens',
                title: 'Black Listed Tokens',
                type: 'basic',
                link: 'members/black-listed-tokens',
                icon: 'mat_outline:block',
            },
        ],
    },
    {
        id: 'devices',
        title: 'Devices',
        type: 'collapsable',
        icon: 'mat_outline:devices',
        link: 'devices',
        children: [
            {
                id: 'devices/device-categories',
                title: 'Device Categories',
                type: 'basic',
                link: 'devices/device-categories',
                icon: 'mat_solid:device_hub',
            },
            {
                id: 'devices/devices',
                title: 'Devices Master',
                type: 'basic',
                link: 'devices/devices',
                icon: 'mat_outline:important_devices',
            },
            {
                id: 'devices/member-devices',
                title: 'Member Devices',
                type: 'basic',
                link: 'devices/member-devices',
                icon: 'mat_outline:devices_other',
            },
        ],
    },
    {
        id: 'my-info',
        title: 'My Info',
        type: 'collapsable',
        icon: 'mat_outline:attribution',
        link: 'my-info',
        children: [
            {
                id: 'my-info/organizations',
                title: 'Organizations',
                type: 'basic',
                icon: 'mat_outline:account_tree',
                link: 'my-info/organizations',
            },
            {
                id: 'my-info/diving-levels',
                title: 'Diving Levels',
                type: 'basic',
                icon: 'mat_outline:trending_up',
                link: 'my-info/diving-levels',
            },
            {
                id: 'my-info/avatars',
                title: 'Avatars',
                type: 'basic',
                icon: 'mat_outline:person_pin',
                link: 'my-info/avatars',
            },
            {
                id: 'my-info/activity-medals',
                title: 'Activity Medals',
                type: 'basic',
                icon: 'iconsmind:medal_3',
                link: 'my-info/activity-medals',
            },
        ],
    },
    {
        id: 'device-settings',
        title: 'Device Settings',
        type: 'collapsable',
        icon: 'mat_outline:app_settings_alt',
        link: 'device-settings',
        children: [
            {
                id: 'device-settings/dive-condition',
                title: 'Dive Conditions',
                type: 'basic',
                icon: 'heroicons_outline:shield-check',
                link: 'device-settings/dive-condition',
            },
            {
                id: 'device-settings/oxygen-percentage',
                title: 'Oxygen Percentage',
                type: 'basic',
                icon: 'mat_outline:invert_colors',
                link: 'device-settings/oxygen-percentage',
            },
            {
                id: 'device-settings/po2-percentage',
                title: 'PO2 Percentage',
                type: 'basic',
                icon: 'mat_outline:data_usage',
                link: 'device-settings/po2-percentage',
            },
            {
                id: 'device-settings/water-depth',
                title: 'Water Depth',
                type: 'basic',
                icon: 'mat_outline:shutter_speed',
                link: 'device-settings/water-depth',
            },
        ],
    },
    {
        id: 'faq',
        title: 'FAQ',
        type: 'collapsable',
        icon: 'heroicons_solid:question-mark-circle',
        link: 'faq',
        children: [
            {
                id: 'faq/faq-categories',
                title: 'FAQ Categories',
                type: 'basic',
                icon: 'mat_outline:list_alt',
                link: 'faq/faq-categories',
            },
            {
                id: 'faq/faqs',
                title: 'FAQs ',
                type: 'basic',
                icon: 'mat_outline:question_answer',
                link: 'faq/faqs',
            },
            {
                id: 'faq/faqs-feedbacks',
                title: 'FAQs Feedbacks',
                type: 'basic',
                icon: 'mat_outline:feedback',
                link: 'faq/faqs-feedbacks',
            },
        ],
    },
];
