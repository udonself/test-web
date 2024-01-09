
export interface MessageOut {
    from_id: number;
    content: string;
    hour: number;
    minute: number;
}

export interface ConversationOut {
    messages_grouped_by_date: { [date: string]: MessageOut[] };
}
