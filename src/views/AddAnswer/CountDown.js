import React from 'react';
import PropTypes from 'prop-types';


class CountDown extends React.Component{
    constructor(props){
        super(props);
        this.state = {days:0, hours:0, min :0, sec:0};
    }

    componentDidMount(){
        this.interval = setInterval(()=>{
            const date = this.calculateCountDown(this.props.date);
            date ? this.setState(date) : clearInterval(this.interval);
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }
    calculateCountDown = (endDate) => {
        let different = (Date.parse(new Date(endDate))-Date.parse(new Date()))/1000;
        if (different <= 0) return false;

        const timeLeft = {
            days:0,
            hours:0,
            min :0,
            sec :0,
        };
        if(different >= 86400){
            timeLeft.days = Math.floor(different/86400);
            different -= timeLeft.days * 86400;
        }

        if(different >= 3600){
            timeLeft.hours = Math.floor(different/3600);
            different -= timeLeft.hours * 3600;
        }

        if(different >= 60){
            timeLeft.min = Math.floor(different/60);
            different -= timeLeft.min * 60;
        }

        timeLeft.sec = different;
        return timeLeft;
    }

    render(){
        const countDown = this.state;
        return (
        <div className="Countdown">
            <span className="Countdown-col">
                <span className="Countdown-col-element">
                    <strong>{countDown.days}</strong>
                    <span>{countDown.days === 1 ? ' Day ' : ' Days '}</span>
                </span>
            </span>

            <span className="Countdown-col">
                <span className="Countdown-col-element">
                    <strong>{countDown.hours}</strong>
                    <span> Hours </span>
                </span>
            </span>

            <span className="Countdown-col">
                <span className="Countdown-col-element">
                    <strong>{countDown.min}</strong>
                    <span> Min </span>
                </span>
            </span>

            <span className="Countdown-col">
                <span className="Countdown-col-element">
                    <strong>{countDown.sec}</strong>
                    <span> Sec</span>
                </span>
            </span>
        </div>);

    }
}

CountDown.propType = {
    date : PropTypes.string.isRequired
};

export default CountDown;
