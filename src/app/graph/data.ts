export let miserables = {
  organization: 'COMSATS Institute of Information Technology',
  nodes: [
  {
    id: '5cd95769833d160885ab3028',
    name: 'Zulfiqar Ali',
    group: 1,
    model: 'Cisco 456',
    type: 'core',
    location : 'Athens',
    status : 'up',

  },
  {
    id: '000',
    name: 'Hai Hong Le',
    group: 0,
    model: 'Ruckus 332',
    type: 'edge',
    location : 'Athens',
    status : 'up',

  },
  {
    id: '111',
    name: 'Sybill Ilisch',
    group: 0,
    model: 'Cambuim 43',
    location : 'Athens',
    type: 'edge',
    status : 'up',

  },
  {
    id: '222',
    name: 'Thomas Thurn-Albrecht',
    group: 0,
    model: 'Xirrus r43',
    location : 'Athens',
    type: 'edge',
    status : 'up',

  }
],
  links: [
  {
    source: '5cd95769833d160885ab3028',
    target: '000',
    value: 3,
    status: 'Up',
    type: 'optical',
    speed: 10000
  },
  {
    source: '5cd95769833d160885ab3028',
    target: '111',
    value: 3,
    status: 'Up',
    type: 'optical',
    speed: 10000
  },
  {
    source: '5cd95769833d160885ab3028',
    target: '222',
    value: 3,
    status: 'Up',
    type: 'copper',
    speed: 1000

  }]
};
