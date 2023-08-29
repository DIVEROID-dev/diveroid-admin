/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
       {
        id: 'master',
        title: 'Master',
        type: 'collapsable',
        icon: 'heroicons_outline:user-circle',
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
   
];
