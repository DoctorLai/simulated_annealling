# simulated_annealling
Simulated Annealing Library in Node.Js

## Installation
```
npm install simulated_annealling
```

## Usage
```

var SimulatedAnnealing = require('simulated_annealling').SimulatedAnnealing;

var GetAnswerOfXSquareEqualsSixteen = (function() {
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

	// final solution
	console.log("Solution is: " + x);
})();

```

Output:
```
-3.99990
```

## Tests
```
npm test
```

## Contributing
1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

## Author
* © justyy, Released under the [MIT License](http://spdx.org/licenses/MIT.html).
* Authored and maintained by [@justyy](https://steemit.com/@justyy) with help from contributors ([list](https://www.npmjs.com/package/simulated_annealling/access)).
    * Email: dr.zhihua.lai@gmail.com
    * Github: [github.com/doctorlai](https://github.com/doctorlai)
    * Twitter: [doctorzlai](https://twitter.com/doctorzlai)
    * Blog: [helloacm](https://helloacm.com)
