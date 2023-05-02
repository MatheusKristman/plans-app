import { RxDashboard } from 'react-icons/rx';
import { SlScreenSmartphone } from 'react-icons/sl';
import { BsPeopleFill } from 'react-icons/bs';

export const menuItems = [
    {
        id: '001',
        name: 'Dashboard',
        icon: (
            <RxDashboard
                color='#fff'
                style={{
                    minWidth: '20px',
                    maxWidth: '20px',
                    width: '20px',
                    minHeight: '20px',
                    maxHeight: '20px',
                    height: '20px',
                }}
            />
        ),
        blackIcon: (
            <RxDashboard
                color='#000'
                style={{
                    minWidth: '20px',
                    maxWidth: '20px',
                    width: '20px',
                    minHeight: '20px',
                    maxHeight: '20px',
                    height: '20px',
                }}
            />
        ),
        alt: 'quadrados',
    },
    {
        id: '002',
        name: 'Planos',
        icon: <SlScreenSmartphone color='#fff' size={20} />,
        blackIcon: <SlScreenSmartphone color='#000' size={20} />,
        alt: 'celular',
    },
    {
        id: '003',
        name: 'Clientes',
        icon: <BsPeopleFill color='#fff' size={20} />,
        blackIcon: <BsPeopleFill color='#000' size={20} />,
        alt: 'pessoas',
    },
];

export const operadoras = [
    {
        id: '001',
        name: 'Claro',
        image: './assets/icons/claro.png',
        alt: 'Claro',
    },
    {
        id: '002',
        name: 'Tim',
        image: './assets/icons/tim.png',
        alt: 'Tim',
    },
    {
        id: '003',
        name: 'Vivo',
        image: './assets/icons/vivo.png',
        alt: 'Vivo',
    },
    {
        id: '004',
        name: 'Oi',
        image: './assets/icons/oi.png',
        alt: 'Oi',
    },
];

export const checkboxGroup = [
    {
        id: '001',
        name: 'Claro',
        value: 'Claro',
    },
    {
        id: '002',
        name: 'Tim',
        value: 'Tim',
    },
    {
        id: '003',
        name: 'Vivo',
        value: 'Vivo',
    },
    {
        id: '004',
        name: 'Oi',
        value: 'Oi',
    },
];
