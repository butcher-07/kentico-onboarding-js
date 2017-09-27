import { IAction } from './IAction';
import { IFetchedNode } from './actionCreators';

interface IFetchNodesDependencies {
  fetch: () => Promise<Response>;
  fetchRequest: () => IAction;
  fetchSuccess: (nodes: Array<IFetchedNode>) => IAction;
  fetchFailure: (text: string) => IAction;
  parseFetchedNodes: (nodes: Array<IFetchedNode>)  => Array<IFetchedNode>;
}

export const fetchNodesFactory = (dependencies: IFetchNodesDependencies) => () => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.fetchRequest());

    return dependencies.fetch()
      .then(response => response.json())
      .then(json => dependencies.parseFetchedNodes(json))
      .then(nodes => dispatch(dependencies.fetchSuccess(nodes)))
      .catch(error => dispatch(dependencies.fetchFailure(error.message)));
  };
};
