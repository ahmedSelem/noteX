export interface NoteInterface {
    message: string;
    Notes: Note[];
}


export interface Note {
    _id: string;
    title: string;
    desc: string;
}
