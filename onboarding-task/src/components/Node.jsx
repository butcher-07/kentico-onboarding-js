import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { EditableNode } from './EditableNode';
import { ViewNode } from './ViewNode';

const Node = props => {
  const { nodeModel } = props;
  return nodeModel.isBeingEdited ? (
    <EditableNode
      nodeModel={nodeModel}
      onCancel={props.onCancel}
      onSave={props.onSave}
      onDelete={props.onDelete}
    />
  ) : (
    <ViewNode
      nodeModel={nodeModel}
      onEdit={props.onEdit}
    />
  );
};

Node.displayName = 'Node';
Node.propTypes = {
  nodeModel: ImmutablePropTypes.recordOf({
    id: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export { Node };
