export let miserables = {
  organization: 'WifiO',
  nodes: [
  {
    id: '123',
    name: 'mySwitch',
    type: 'switch',

  },
  {
    id: '000',
    type: 'ap',
    status : 'up',

  },
  {
    id: '111',
    type: 'ap',
    status : 'up',

  },
  {
    id: '222',
    type: 'ap',
    status : 'down',

  },
  {
    id: '333',
    type: 'ap',
    status : 'down',
  },
  {
    id: '444',
    type: 'router',
    status : 'up',
  },
  {
    id: '555',
    type: 'switch',
    status : 'up',
  }
  ],
  links: [
  {
    id: 'link1',
    source: '444',
    'source-tp': '444',
    target: '555',
    'dest-tp': 'tp2',
  },
  {
    id: 'link2',
    source: '444',
    'source-tp': '444',
    target: '123',
    'dest-tp': 'tp2',

  },
  {
    id: 'link3',
    source: '555',
    'source-tp': '555',
    target: '333',
    'dest-tp': 'tp2',

  },
  {
    id: 'link4',
    source: '123',
    'source-tp': '123',
    target: '000',
    'dest-tp': 'tp2',

  },
  {
    id: 'link5',
    source: '123',
    'source-tp': '123',
    target: '111',
    'dest-tp': 'tp2',

  },
  {
    id: 'link6',
     source: '123',
    'source-tp': 'tp1',
     target: '222',
    'dest-tp': 'tp2',

  }]
};
