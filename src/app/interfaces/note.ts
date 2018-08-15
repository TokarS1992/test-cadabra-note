export interface Note {
    id?: number;
    position?: number;
    created_at?: Date;
    updated_at?: Date;
    due_date: Date|null;
    text: string;
    title: string;
}
