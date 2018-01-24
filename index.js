'use strict';
// @justyy

const SimulatedAnnealing = (options, generateNewSolution, generateNeighbor, acceptNeighbor) => {
	// Set Parameters
    let coolingFactor            = options.coolingFactor || 0.05;
    let stabilizingFactor        = options.stabilizingFactor || 1.005;
    let freezingTemperature      = options.freezingTemperature || 0;
	let currentSystemTemperature = options.initialTemperature || 20;
    let curStabilizor            = options.initialStabilizer || 35;    

    // Init solution
    let currentSysEnergy         = generateNewSolution();

    // Probability Function
    // Higher Temperature means more likely to accept worse solutions, and vice versa
    const Prob = (t, d) => {
	    if (d < 0) {
	        return true;
	    }
	    var C = Math.exp(-d / t);
	    var R = Math.random();
	    return (R < C);
    }

    // One Iteration of Process and Return: Should we Continue?
    const _Do = () => {
	    if (currentSystemTemperature > freezingTemperature) {
	        for (var i = 0; i < curStabilizor; ++ i) {
	            var newEnergy = generateNeighbor(),
	                energyDelta = newEnergy - currentSysEnergy;

	            if (Prob(currentSystemTemperature, energyDelta)) {
	                // accept this neighbour 
	                acceptNeighbor();
	                // update energey
	                currentSysEnergy = newEnergy;
	            }
	        }
	        // temperature is cooling down
	        currentSystemTemperature = currentSystemTemperature - coolingFactor;
	        // so it is less likely to accept worse solutions
	        curStabilizor = curStabilizor * stabilizingFactor;
	        return true;
	    }
    	currentSystemTemperature = freezingTemperature;
    	return false;	    
	}

	// Get Current System Energy
	const _GetCurrentEnergy = () => {
		return currentSysEnergy;
	}

	// Get Current Temperature
	const _GetCurrentTemperature = () => {
		return currentSystemTemperature;
	}

	// Export Methods
	return {
		Do: function() {
			return _Do();
		},

		GetCurrentEnergy: function() {
			return _GetCurrentEnergy();
		},

		GetCurrentTemperature: function() {
			return _GetCurrentTemperature();
		}
	}
}

// module exports the Simulated Annealing Object
module.exports = { 
	SimulatedAnnealing 
} 
