"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function Button(props) {
	return React.createElement(
		"a",
		{ href: "#", className: "button", onClick: props.clickFn },
		props.btnName
	);
};

var Clock = function Clock(props) {
	return React.createElement(
		"div",
		{ className: "stopwatch" },
		Stopwatch.pad0(props.times.minutes),
		":",
		Stopwatch.pad0(props.times.seconds),
		":",
		Stopwatch.pad0(props.times.miliseconds)
	);
};

var Stopwatch = function (_React$Component) {
	_inherits(Stopwatch, _React$Component);

	function Stopwatch(props) {
		_classCallCheck(this, Stopwatch);

		var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

		_this.state = {
			running: false,
			counter: 0,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			results: []
		};

		_this.start = _this.start.bind(_this);
		_this.reset = _this.reset.bind(_this);
		_this.clear = _this.clear.bind(_this);
		_this.step = _this.step.bind(_this);
		_this.stop = _this.stop.bind(_this);
		return _this;
	}

	_createClass(Stopwatch, [{
		key: "reset",
		value: function reset() {
			this.setState({
				running: false,
				counter: 0,
				times: {
					minutes: 0,
					seconds: 0,
					miliseconds: 0
				}
			});
		}
	}, {
		key: "start",
		value: function start() {
			var _this2 = this;

			if (!this.state.running) {
				this.setState({
					running: true
				});
				this.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			};
		}
	}, {
		key: "step",
		value: function step() {
			if (!this.state.running) return;
			this.calculate();
			this.setState({
				counter: this.state.counter + 1
			});
		}
	}, {
		key: "calculate",
		value: function calculate() {
			this.state.times.miliseconds += 1;
			if (this.state.times.miliseconds >= 100) {
				this.state.times.seconds += 1;
				this.state.times.miliseconds = 0;
			};
			if (this.state.times.seconds >= 60) {
				this.state.times.minutes += 1;
				this.state.times.seconds = 0;
			};
		}
	}, {
		key: "stop",
		value: function stop() {
			this.setState({
				running: false
			});
			clearInterval(this.watch);
		}
	}, {
		key: "clear",
		value: function clear() {
			this.running = false;
			clearInterval(this.watch);
			this.reset();
		}
	}, {
		key: "clearResults",
		value: function clearResults() {
			this.setState({
				results: []
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"nav",
					{ className: "controls" },
					React.createElement(Button, { clickFn: this.start, btnName: "Start" }),
					React.createElement(Button, { clickFn: this.stop, btnName: "Stop" }),
					React.createElement(Button, { clickFn: this.clear, btnName: "Clear" })
				),
				React.createElement(Clock, { times: this.state.times })
			);
		}
	}], [{
		key: "pad0",
		value: function pad0(value) {
			var result = value.toString();
			if (result.length < 2) {
				result = '0' + result;
			}
			return result;
		}
	}]);

	return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.querySelector('#app'));
