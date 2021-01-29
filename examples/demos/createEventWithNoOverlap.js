import React from 'react'
import { Calendar, Views } from 'react-big-calendar'
import ExampleControlSlot from '../ExampleControlSlot'
import _ from 'lodash'

const propTypes = {}
let events = [];

class CreateEventWithNoOverlap extends React.Component {
 
  constructor(...args) {
    super(...args)
    //this.updateEvents();
    this.state = {
      
      events: events,
      dayLayoutAlgorithm: 'no-overlap',
    }
  }
  componentWillMount() {
    this.updateEvents();
}
  updateEvents() {
    /*
  let Http = new XMLHttpRequest();  
  const url='http://localhost:3000/updateEvents';
  
  
  Http.open("GET", url);
  Http.setRequestHeader('Access-Control-Allow-Headers', '*');
  Http.setRequestHeader('Content-Type', 'application/json');
  Http.setRequestHeader('Access-Control-Allow-Origin', '*');
  Http.send();
  
  Http.onreadystatechange = (e) => {
    console.log(Http.responseText);
    events = Http.responseText;
    //this.setState({ events : events })
  }
  */
 fetch('http://localhost:3000/updateEvents')
 .then((response) => response.json())
 .then((responseJson) => {
   console.log(responseJson);
   responseJson.forEach(e => {e.start = new Date(e.start); e.end = new Date(e.end);} ) 
   this.setState({ events : responseJson})

   //this.state.events =  [...responseJson];
   console.log(responseJson);
 })
 .catch((error) => {
   console.error(error);
 });

}

sendEvents() {
  let Http = new XMLHttpRequest();  
  const url='http://localhost:3000/sendEvents';
 
  
  Http.open("POST", url), false;
  Http.setRequestHeader('Access-Control-Allow-Headers', '*');
  Http.setRequestHeader('Content-Type', 'application/json');
  Http.setRequestHeader('Access-Control-Allow-Origin', '*');
  console.log(JSON.stringify(this.state.events));
  Http.send(JSON.stringify(this.state.events));
  //Http.send();
  Http.onreadystatechange = (e) => {
    console.log("DUPA");
    this.state.events = _.cloneDeep(events);
  }

}
  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event DUPA2')
    if (title){
      //this.updateEvents();
      

      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,

          },
        ],
      })
    
    
      this.sendEvents();
  }
      
  }

  render() {
    //this.updateEvents();
    const { localizer } = this.props
    return (
      <>
        <ExampleControlSlot.Entry waitForOutlet>
          <strong>
            Click an event to see more info, or drag the mouse over the calendar
            to select a date/time range.
            <br />
            The events are being arranged by `no-overlap` algorithm.
          </strong>
        </ExampleControlSlot.Entry>
        <Calendar
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={event => {alert("DUPA1"); alert(event.title);}}
          onSelectSlot={this.handleSelect}
          dayLayoutAlgorithm={this.state.dayLayoutAlgorithm}
        />
      </>
    )
  }
}

CreateEventWithNoOverlap.propTypes = propTypes

export default CreateEventWithNoOverlap
