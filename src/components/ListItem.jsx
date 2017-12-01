import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { OpenedListItem } from './OpenedListItem';
import { ClosedListItem } from './ClosedListItem';

export class ListItem extends PureComponent {
  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
    number: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
    };
  }

  onSave = (text) => {
    const { item: { id }, onSave } = this.props;

    onSave(id, text);

    this.setState({
      isOpened: false,
    });
  };

  onCancel = () => this.setState({
    isOpened: false,
  });

  onDelete = () => {
    const { item: { id }, onDelete } = this.props;

    onDelete(id);
  };

  onItemClick = (selectionRangeStarts, selectionRangeEnds) => {
    this.setState({
      isOpened: true,
      selectionRangeStarts,
      selectionRangeEnds,
    });
  };

  render() {
    const { number, item: { text } } = this.props;

    const {
      isOpened,
      selectionRangeStarts,
      selectionRangeEnds,
    } = this.state;

    return isOpened ?
      <OpenedListItem
        text={text}
        number={number}
        selectionRangeStarts={selectionRangeStarts}
        selectionRangeEnds={selectionRangeEnds}
        onSave={this.onSave}
        onCancel={this.onCancel}
        onDelete={this.onDelete}
      /> :
      <ClosedListItem
        text={text}
        number={number}
        onItemClick={this.onItemClick}
      />;
  }
}
