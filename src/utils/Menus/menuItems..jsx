import {RxDashboard} from 'react-icons/rx';
import {SlScreenSmartphone} from 'react-icons/sl';
import {BsPeopleFill} from 'react-icons/bs'

export const menuItems = [
  {
    id: '001',
    name: 'Dashboard',
    icon: <RxDashboard color="#fff" />,
    blackIcon: <RxDashboard color="#000" />,
    alt: 'quadrados',
  },
  {
    id: '002',
    name: 'Planos',
    icon: <SlScreenSmartphone color="#fff" />,
    blackIcon: <SlScreenSmartphone color="#000" />,
    alt: 'celular',
  },
  {
    id: '003',
    name: 'Clientes',
    icon: <BsPeopleFill color="#fff" />,
    blackIcon: <BsPeopleFill color="#000" />,
    alt: 'pessoas',
  },
]

export const operadoras = [
  {
    id: '001',
    name: 'claro',
    image: './assets/icons/claro.png',
    alt: 'claro'
  },
  {
    id: '002',
    name: 'tim',
    image: './assets/icons/tim.png',
    alt: 'tim'
  },
  {
    id: '003',
    name: 'vivo',
    image: './assets/icons/vivo.png',
    alt: 'vivo'
  },
  {
    id: '004',
    name: 'oi',
    image: './assets/icons/oi.png',
    alt: 'oi'
  },
]

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
  }
]
