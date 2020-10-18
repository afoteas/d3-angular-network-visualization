export let miserables = {
  organization: 'COMSATS Institute of Information Technology',
  nodes: [
  {
    id: '123',
    details: 'Zulfiqar Ali',
    group: 1,
    model: 'Cisco 456',
    type: 'switch',
    location : 'Athens',
    status : 'up',

  },
  {
    id: '000',
    details: 'Hai Hong Le',
    group: 0,
    model: 'Ruckus 332',
    type: 'ap',
    location : 'Athens',
    status : 'up',

  },
  {
    id: '111',
    details: 'Sybill Ilisch',
    group: 0,
    model: 'Cambuim 43',
    location : 'Athens',
    type: 'ap',
    status : 'up',

  },
  {
    id: '222',
    details: 'Thomas Thurn-Albrecht',
    group: 0,
    model: 'Xirrus r43',
    location : 'Athens',
    type: 'ap',
    status : 'down',

  },
  {
    id: '333',
    details: 'Thomas Thurn-Albrecht',
    group: 0,
    model: 'Xirrus r43',
    location : 'Athens',
    type: 'ap',
    status : 'down',
  },
  {
    id: '444',
    details: 'Thomas Thurn-Albrecht',
    group: 0,
    model: 'Cisco 443',
    location : 'Athens',
    type: 'router',
    status : 'up',
  },
  {
    id: '555',
    details: 'Thomas Thurn-Albrecht',
    group: 0,
    model: 'Cisco 443',
    location : 'Athens',
    type: 'switch',
    status : 'up',
  }
  ],
  links: [
  {
    source: '444',
    target: '555',
    value: 3,
    status: 'Up',
    type: 'optical',
    speed: 10000
  },
  // {
  //   source: '444',
  //   target: '123',
  //   value: 3,
  //   status: 'Up',
  //   type: 'optical',
  //   speed: 10000
  // },
  {
    source: '555',
    target: '333',
    value: 3,
    status: 'Up',
    type: 'optical',
    speed: 10000
  },
  {
    source: '123',
    target: '000',
    value: 3,
    status: 'Up',
    type: 'optical',
    speed: 10000
  },
  {
    source: '123',
    target: '111',
    value: 3,
    status: 'Up',
    type: 'optical',
    speed: 10000
  },
  {
    source: '123',
    target: '222',
    value: 3,
    status: 'Up',
    type: 'copper',
    speed: 1000

  }]
};
