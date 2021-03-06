import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
    getDaysInMonth,
    lastDayOfMonth,
    addMonths,
    addDays,
    format
} from "date-fns";
import { dates, getWeek } from "../../utils/dateUtils";

const now = new Date();

class Cell extends Component {
    static propTypes = {
        value: PropTypes.any,
        date: PropTypes.object,
        selected: PropTypes.object,
        onClick: PropTypes.func
    };
    handleClick = () => {
        const { date, onClick } = this.props;
        if (onClick) {
            onClick(date);
        }
    };
    render() {
        const { className, value, date, selected } = this.props;
        let curDate = new Date(),
            isCur = format(curDate, "YYYY-MM-DD") == format(date, "YYYY-MM-DD"),
            isActive =
                selected &&
                format(date, "YYYY-MM-DD") == format(selected, "YYYY-MM-DD");

        return (
            <td>
                <a
                    className={classnames(className, {
                        curDay: isCur,
                        active: isActive
                    })}
                    onClick={this.handleClick}
                >
                    {value}
                </a>
            </td>
        );
    }
}

class DayView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daysName: dates[props.lang].daysMin
        };
    }
    static propTypes = {
        prefixCls: PropTypes.string,
        date: PropTypes.object,
        selected: PropTypes.object,
        lang: PropTypes.string,
        week: PropTypes.bool,
        onDaySelect: PropTypes.func
    };
    static defaultProps = {
        date: now,
        lang: "zh-cn",
        week: false
    };
    handleClick = date => {
        const { onDaySelect } = this.props;
        if (onDaySelect) {
            onDaySelect(date);
        }
    };
    renderHead() {
        const { daysName } = this.state;
        const { week } = this.props;
        let items = [];
        if (week) {
            items.push(<td key="week" />);
        }
        daysName.forEach(item => {
            items.push(<td key={item}>{item}</td>);
        });
        return items;
    }
    renderBody() {
        const { date, week, selected } = this.props;
        let curDate = new Date(),
            days = getDaysInMonth(date), //当月所有天数
            firstDate = new Date(date.getFullYear(), date.getMonth(), 1),
            dayOfWeek = firstDate.getDay(), //当月第一天是星期几
            lastDayOfPrevMonth = lastDayOfMonth(addMonths(date, -1)).getDate(), //上月最后一天
            rows = [],
            cells = [],
            tmpDate = [],
            index = 0,
            start,
            end,
            startDate;

        if (dayOfWeek == 0) {
            start = lastDayOfPrevMonth - 6;
            startDate = addDays(firstDate, -7);
        } else {
            start = lastDayOfPrevMonth - dayOfWeek + 1;
            startDate = addDays(firstDate, -dayOfWeek);
        }
        for (let i = start; i <= lastDayOfPrevMonth; i++) {
            cells.push(
                <Cell
                    className="prev"
                    key={index}
                    value={i}
                    date={startDate}
                    selected={selected}
                    onClick={this.handleClick}
                />
            );
            tmpDate.push(startDate);
            startDate = addDays(startDate, 1);
            index++;
        }
        for (let i = 1; i <= days; i++) {
            cells.push(
                <Cell
                    key={index}
                    value={i}
                    date={startDate}
                    selected={selected}
                    onClick={this.handleClick}
                />
            );
            tmpDate.push(startDate);
            startDate = addDays(startDate, 1);
            index++;
        }
        end = 42 - cells.length;
        for (let i = 1; i <= end; i++) {
            cells.push(
                <Cell
                    className="next"
                    key={index}
                    value={i}
                    date={startDate}
                    selected={selected}
                    onClick={this.handleClick}
                />
            );
            tmpDate.push(startDate);
            startDate = addDays(startDate, 1);
            index++;
        }
        for (let i = 0; i < 6; i++) {
            rows.push(
                <tr key={i} className={week ? "week-row" : ""}>
                    {week ? (
                        <Cell className="week" value={getWeek(tmpDate[0])} />
                    ) : null}
                    {cells.splice(0, 7)}
                </tr>
            );
            tmpDate.splice(0, 7);
        }

        return rows;
    }
    render() {
        const { prefixCls } = this.props;
        return (
            <table className={`${prefixCls}-day-table`}>
                <thead>
                    <tr>{this.renderHead()}</tr>
                </thead>
                <tbody>{this.renderBody()}</tbody>
            </table>
        );
    }
}

export default DayView;
