// clear the console
console.clear();

// title component
let Title = React.createClass({ displayName: "Title",
  render: function () {
    let titleClass = 'heading-text-one';
    let codedByClass = 'heading-text-two';
    return (
      React.createElement("div", null,
      React.createElement("h1", { className: titleClass }, this.props.title),
      React.createElement("h5", { className: codedByClass }, "Coded by ", React.createElement("a", { target: "_blank", href: "https://www.freecodecamp.org/Milave-kun" }, "Milave-kun"))));


  } });

ReactDOM.render(
React.createElement(Title, { title: "Markdown Previewer" }),
document.getElementById('title'));


// tip component
let Tips = React.createClass({ displayName: "Tips",
  propTypes: {
    tipArr: React.PropTypes.array },

  getInitialState: function () {
    return {
      counter: 0 };

  },
  _incrementCounter: function () {
    if (this.state.counter >= this.props.tipArr.length - 1) {
      this.setState({ counter: 0 });
    } else {
      this.setState({ counter: this.state.counter + 1 });
    }
  },
  componentDidMount: function () {
    let myInterval = setInterval(this._incrementCounter, 10000);
    this.setState({ myInterval: myInterval });
  },
  render: function () {
    let classes = 'heading-text-one';
    return (
      React.createElement("div", null,
      React.createElement("h5", { className: classes, dangerouslySetInnerHTML: { __html: this.props.tipArr[this.state.counter] } })));


  } });

// markdown and output
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false });

let MarkdownOutput = React.createClass({ displayName: "MarkdownOutput",
  render: function () {
    return (
      React.createElement("div", null,
      React.createElement("h4", null, "Markdown Output"),
      React.createElement("hr", null),
      React.createElement("div", { dangerouslySetInnerHTML: { __html: marked(this.props.value) } })));


  } });

let MarkdownContainer = React.createClass({ displayName: "MarkdownContainer",
  getInitialState: function () {
    return {
      value: '## This is some markdown\n### Consider making your own\n\n#### List items\n- Milca\n- Dave\n- Lianne\n- John\n\n#### Make it **bold** or make it *italic*\n\n#### Create links [Github](https://www.freecodecamp.org/Milave-kun)' };

  },
  handleChange(event) {
    this.setState({ value: event.target.value });
  },
  render: function () {
    console.log(marked(this.state.value));
    let containerClass = 'rounded-corners container-class col-xs-12 col-md-6';
    return (
      React.createElement("div", null,
      React.createElement("div", { className: containerClass },
      React.createElement("h4", null, "Markdown Input"),
      React.createElement("hr", null),
      React.createElement("textarea", { className: "markdown-text", onChange: this.handleChange, value: this.state.value }),
      React.createElement("hr", null),
      React.createElement(Tips, { className: "text-center", tipArr: [
        "Use # before text to create an h1.",
        "Use ** ** or __ __ to make text <b>bold</b>.",
        "Use ## before text to create an h2.",
        "Use * * or _ _ to make text <i>italic</i>.",
        "Denote sections of code with ``` ```."] })),


      React.createElement("div", { className: containerClass },
      React.createElement(MarkdownOutput, { value: this.state.value }))));



  } });

ReactDOM.render(
React.createElement(MarkdownContainer, null),
document.getElementById('markdown-container'));