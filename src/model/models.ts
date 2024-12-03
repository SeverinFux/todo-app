import {createContext} from "react";

export interface Task {
    id: number;
    title: string;
    priority: PriorityType;
    category: string;
    dueDate: Date | null;
    done: boolean;
}

export const Priority = {
    HIGH: {value: 'high', weight: 3}, // weight = how important
    MEDIUM: {value: 'medium', weight: 2},
    LOW: {value: 'low', weight: 1}
} as const;

export type PriorityType = typeof Priority[keyof typeof Priority];