var should = require('chai').should(),
    module = require('../index'),
    SimulatedAnnealing = module.SimulatedAnnealing;

describe('x^2 = 16', function() {
  it('4 or -4', function() {
    // parameters
    let options = {
      coolingFactor: 0.09,
      stabilizingFactor: 1.005,
      freezingTemperature: 0.001,
      initialTemperature: 15,
      initialStabilizer: 30
    }

    // final solution 
    let x;
    // current solution
    let cur;

    const getCost = (v) => {
      return Math.abs(v * v - 16);
    }

    const generateNeighbor = () => {
      // neighbour is within 0.5 distance
      cur = x + (Math.random() - 0.5);
      return getCost(cur);
    }

    const generateNewSolution = () => {
      cur = Math.random() * 16; // guess a number between 0 to 16
      x = cur;
      return getCost(cur);
    }

    const acceptNeighbor = () => {
      x = cur;
    } 

    // pass parameters to SA object
    let SA = SimulatedAnnealing(options, generateNewSolution, generateNeighbor, acceptNeighbor);

    // we need to continue simulating if temperature is still high
    while (SA.Do()) {
      // console.log("Temperature: " + SA.GetCurrentTemperature());
      // console.log("GetCurrentEnergy: " + SA.GetCurrentEnergy());
    }    
    x*x.should.be.closeTo(16);
  });
});

