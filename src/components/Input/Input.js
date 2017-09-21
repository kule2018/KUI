import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Group from './Group';
import TextArea from './TextArea';
import omit from 'object.omit';
import { kStyles, kClass, kSize, getClassSet } from '../../utils/kUtils';
import { State, PRIMARY, Sizes } from '../../utils/styleMaps';

class Input extends Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        placeholder: PropTypes.string,
        readOnly: PropTypes.bool,
        disabled: PropTypes.bool,
        addonBefore: PropTypes.node,
        addonAfter: PropTypes.node,
        prefix: PropTypes.node,
        suffix: PropTypes.node,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onPressEnter: PropTypes.func
    }
    static defaultProps = {
        type: 'text',
        disabled: false
    }
    renderLabeledInput(children) {
        const { props } = this;
        if (!props.addonBefore && !props.addonAfter) {
            return children;
        }
        return (
            <Group
                kSize={props.kSize}
                addonBefore={props.addonBefore}
                addonAfter={props.addonAfter}
            >
                {children}
            </Group>
        )
    }
    renderLabeledIcon(children) {
        const { props } = this;
        if (!('prefix' in props || 'suffix' in props)) {
            return children;
        }

        let prefixCls = 'k-input';

        const prefix = props.prefix ? (
            <span className={`${prefixCls}-prefix`}>
                {props.prefix}
            </span>
        ) : null;

        const suffix = props.suffix ? (
            <span className={`${prefixCls}-suffix`}>
                {props.suffix}
            </span>
        ) : null;

        let classString = classnames({
            [`${prefixCls}-affix-wrapper`]: true,
            [`${prefixCls}-affix-wrapper-lg`]: props.kSize == 'lg',
            [`${prefixCls}-affix-wrapper-sm`]: props.kSize == 'sm'
        })

        return (
            <div className={classString}>
                {prefix}
                {children}
                {suffix}
            </div>
        );
    }
    renderInput() {
        const { props } = this;
        const otherProps = omit(props, [
            'addonBefore',
            'addonAfter',
            'prefix',
            'suffix',
            'onPressEnter'
        ]);
        let classes = getClassSet(props);
        return this.renderLabeledIcon(
            <input ref="input" className={classnames(classes)} {...otherProps} />
        )
    }
    render() {
        return (
            this.renderLabeledInput(this.renderInput())
        )
    }
}

export default kSize([Sizes.LARGE, Sizes.SMALL],
    kClass('k-form-control', Input)
);