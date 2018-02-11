
const Button = (props) => {
	return (
		<a href="#" className="button" onClick={props.clickFn}>{props.btnName}</a>
	);
}

const Clock = (props) => {
	return (
		<div className="stopwatch">
			{Stopwatch.pad0(props.times.minutes)}:
			{Stopwatch.pad0(props.times.seconds)}:
			{Stopwatch.pad0(props.times.miliseconds)}
		</div>
	);
}

class Stopwatch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			running: false,
			counter: 0,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			results: []
		}

		this.start = this.start.bind(this);
		this.reset = this.reset.bind(this);
		this.clear = this.clear.bind(this);
		this.step = this.step.bind(this);
		this.stop = this.stop.bind(this);
	}

	static pad0(value) {
		let result = value.toString();
		if (result.length < 2) {
			result = '0' + result;
		}
		return result;
	}

	reset() {
		this.setState({
			running: false,
			counter: 0,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		})
	}

	start() {
		if (!this.state.running) {
			this.setState({
				running: true,
			})
			this.watch = setInterval(() => this.step(), 10)
		};
	}

	step() {
		if (!this.state.running) return;
		this.calculate();
		this.setState({
			counter: this.state.counter + 1
		});
	}

	calculate() {
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
	  
	stop() {
		this.setState({
			running: false
		});
		clearInterval(this.watch);
	}
	  
	clear() {
		this.running = false;
		clearInterval(this.watch);
		this.reset();
	}

	clearResults() {
		this.setState({
			results: []
		});
	}

	render() {
		return (
			<div>
				<nav className="controls">
					<Button clickFn={this.start} btnName={"Start"}/>
					<Button clickFn={this.stop} btnName={"Stop"}/>
					<Button clickFn={this.clear} btnName={"Clear"}/>
				</nav>
				<Clock times={this.state.times}/>
			</div>
		);
	}
}

ReactDOM.render(<Stopwatch />, document.querySelector('#app'));