import { Record } from 'immutable';

interface INote {
  text: string;
  noteId: string;
  isEditActive: boolean;
}

const defaultNote: INote = {
  text: '',
  noteId: '00000000-0000-0000-0000-000000000000',
  isEditActive: false,
};

export class Note extends Record(defaultNote) implements INote {
  text: string;
  noteId: string;
  isEditActive: boolean;

  constructor(params?: INote) {
    params
      ? super(params)
      : super();
  }
}
