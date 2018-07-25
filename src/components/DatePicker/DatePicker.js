import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Input from "../Input";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Empty, getPosition, FirstChild } from "../../utils";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import YearView from "./YearView";
import MonthView from "./MonthView";
import DayView from "./DayView";
import domUtils from "../../utils/domUtils";

const prefixCls = "k-datepicker";
let seed = 1;
let instances = {};

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {
                left: -999,
                top: -999
            },
            open: false
        };
        this.id = `tooltip_${seed++}`;
        instances[this.id] = this;
    }
    static propTypes = {
        type: PropTypes.arrayOf(["year", "month", "week", "date", "dateTime"]),
        disabled: PropTypes.bool,
        defaultValue: PropTypes.object,
        format: PropTypes.string,
        open: PropTypes.bool,
        value: PropTypes.object
    };
    static defaultProps = {
        disabled: false,
        format: "YYYY-MM-DD"
    };
    //文本框点击弹出时间选择
    handleClick = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (!("open" in this.props)) {
            this.open();
        }
    };
    //定位
    setPosition = () => {
        let position = getPosition({
            trigger: this.refs.input,
            placement: "bottomLeft",
            ...this.orgSize
        });
        position.top += 2;
        this.setState({
            position
        });
    };
    //打开
    open = () => {
        const { disabled } = this.props;
        if (disabled) {
            return;
        }
        this.setPosition();
        this.setState({
            open: true
        });
        this.closeOther();
    };
    //关闭
    close = () => {
        const { disabled } = this.props;
        this.setState({
            open: false
        });
    };
    //关闭其它
    closeOther() {
        for (var k in instances) {
            if (k == this.id) {
                continue;
            }
            instances[k].close();
        }
    }
    componentDidMount() {
        this.orgSize = {
            width: domUtils.width(this.refs.picker),
            height: domUtils.height(this.refs.picker)
        };
        this.close();
        if (this.props.open === true) {
            this.open();
        }
        document.addEventListener("click", this.close);
        window.addEventListener("resize", this.setPosition);
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.close);
        window.removeEventListener("resize", this.setPosition);
    }
    renderPicker() {
        const { open, position } = this.state;
        return ReactDOM.createPortal(
            <TransitionGroup component={FirstChild}>
                {open ? (
                    <CSSTransition timeout={300} classNames="slide-down">
                        <div className={prefixCls} style={position}>
                            <Header prefixCls={prefixCls} />
                            <Body prefixCls={prefixCls}>
                                <YearView prefixCls={prefixCls}/> 
                            </Body>
                            <Footer prefixCls={prefixCls} />
                        </div>
                    </CSSTransition>
                ) : null}
            </TransitionGroup>,
            document.body
        );
    }
    render() {
        const { kSize, disabled, placeholder } = this.props;
        const { position, value } = this.state;
        return (
            <Empty>
                <Input
                    type="text"
                    ref="input"
                    kSize={kSize}
                    disabled={disabled}
                    placeholder={placeholder}
                    onClick={this.handleClick}
                />
                {this.renderPicker()}
            </Empty>
        );
    }
}

export default DatePicker;
