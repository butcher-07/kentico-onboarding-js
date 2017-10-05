import { IAction } from './IAction';

interface IDeleteNodeDependencies {
  deleteNodeRequest: () => IAction;
  deleteNodeSuccess: (id: Guid) => IAction;
  deleteNodeFailure: (text: string) => IAction;
  deleteNodeFetch: Fetch;
}

export const deleteNodeFactory = (dependencies: IDeleteNodeDependencies) => (id: Guid) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.deleteNodeRequest());
    return dependencies.deleteNodeFetch(id)
      .then(() => dispatch(dependencies.deleteNodeSuccess(id)))
      .catch(error => dispatch(dependencies.deleteNodeFailure(error.message)));
  };
};
