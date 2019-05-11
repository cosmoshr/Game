export default {
  prefix: 'Planets',
  list: [
    'Habitital_Planet',
    'Rocky',
    'Glacier',
    'Gas',
    'Jungle'
  ],
  Habitital_Planet: {
    size: [100, 150],
    resources: {
      wood: [100, 200],
      rock: [100, 200],
      food: [100, 200],
      water: [100, 200]
    }
  },
  Rocky: {
    size: [100, 150],
    resources: {
      wood: [0, 1],
      rock: [1000, 2000],
      food: [0, 5],
      water: [0, 10]
    }
  },
  Glacier: {
    resources: {
      food: [10, 50],
      water: [100, 1000]
    }
  },
  Gas: {
    resources: {}
  },
  Jungle: {
    resources: {
      wood: [1000, 10000],
      food: [1000, 10000],
      water: [100, 1000]
    }
  }
}
