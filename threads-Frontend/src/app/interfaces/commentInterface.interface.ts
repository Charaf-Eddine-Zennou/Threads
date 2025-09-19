import { UserInterface } from "./userInterface.interface";

export interface commentInterface {
    text: string;
    parent: Comment | null;
    user: UserInterface;
    _id: string;
}
