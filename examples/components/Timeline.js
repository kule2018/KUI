import React, { Component } from "react";
import PropTypes from "prop-types";
import { Timeline, Icon } from "main";

class TimelineView extends Component {
    render() {
        return (
            <div>
                <h1>Timeline 时间轴</h1>
                <div className="k-example">
                    <Timeline>
                        <Timeline.Item>2012</Timeline.Item>
                        <Timeline.Item color="info">2013</Timeline.Item>
                        <Timeline.Item color="success">2014</Timeline.Item>
                        <Timeline.Item color="warning">2015</Timeline.Item>
                        <Timeline.Item
                            color="danger"
                            dot={
                                <Icon
                                    type="clockcircleo"
                                    style={{ fontSize: "16px" }}
                                />
                            }
                        >
                            2016
                        </Timeline.Item>
                    </Timeline>
                </div>
                <h1>API</h1>
                <h2>Timeline.Item</h2>
                <table className="k-table k-table-hover k-table-striped">
                    <thead>
                        <tr>
                            <th>属性</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>color</td>
                            <td>
                                指定圆圈颜色 primary info success warning
                                danger，或自定义的色值
                            </td>
                            <td>string</td>
                            <td>primary</td>
                        </tr>
                        <tr>
                            <td>dot</td>
                            <td>自定义时间轴点</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TimelineView;
