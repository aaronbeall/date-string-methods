import * as React from "react";
import { Alert, Button, Input, InputGroup, InputGroupAddon, Table } from "reactstrap";

export const App: React.StatelessComponent = () => (
  <div style={{ maxWidth: 900, margin: "20px auto" }}>
    <h1>Hello, JavaScript <code>Date</code>!</h1>
    <Alert>
      <a style={{ float: "right" }} href="https://github.com/aaronbeall/date-string-methods">View source on Github</a>
      <p>Reference: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">MDN | Date Objects</a></p>
    </Alert>
    <DateSection />
  </div>
);

type DateSectionState = {
  dateText: string;
  date: Date;
}

class DateSection extends React.PureComponent<{}, DateSectionState> {
  state = { 
    dateText: new Date().toString(),
    date: new Date() 
  };

  handleDateChange: React.ChangeEventHandler<HTMLInputElement> = e => this.setState({
    dateText: e.target.value,
    date: new Date(e.target.value)
  });

  handleNowClick: React.MouseEventHandler<HTMLButtonElement> = e => this.setState({
    dateText: new Date().toString(),
    date: new Date()
  })

  render() {
    const {date, dateText} = this.state;
    return (
      <section>
        <h3>Input date:</h3>
        <div>
          <code>new Date(</code>
          <InputGroup>
            <InputGroupAddon addonType="prepend"><Button onClick={this.handleNowClick}><code>Date.now()</code></Button></InputGroupAddon>
            <Input type="text" value={dateText} placeholder="Date" onChange={this.handleDateChange} />
          </InputGroup>
          <code>)</code>
        </div>
        <h3>Output strings:</h3>
        { date.toString() != "Invalid Date" ? <DateOutputTable date={date} /> : <InvalidDateMessage /> }
        
      </section>
    );
  }
}

const DateOutputTable: React.StatelessComponent<{ date: Date }> = ({ date }) => (
  <Table>
    <thead>
      <tr>
        <th>Method</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
      { [
          "toString", 
          "toDateString", 
          "toTimeString", 
          "toUTCString", 
          "toISOString", 
          "toLocaleString", 
          "toLocaleDateString", 
          "toLocaleTimeString"
        ].map(method => (
          <tr key={method}>
            <td><code>.{method}()</code></td>
            <td><code>"{date[method as "toString"]()}"</code></td>
          </tr>
        )) }
    </tbody>
  </Table>
);

const InvalidDateMessage: React.StatelessComponent<{ error: Error; }> = ({ error }) => (
  <Alert color="danger">
  <p>Invalid Date Input</p>
  </Alert>
);