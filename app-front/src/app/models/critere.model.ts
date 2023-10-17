import { Regle } from "./regle.model";
import { Term } from "./term.model";

export class Critere {
  constructor(
    public id: string,
    public term: Term,
    public operator: string,
    public value: string,
    public regle: Regle
  ) {}
}