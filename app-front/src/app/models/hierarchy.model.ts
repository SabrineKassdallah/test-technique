import { Critere } from "./critere.model";
import { Regle } from "./regle.model";

export class Hierarchy {
  constructor(
    public id: string,
    public node_type: string,
    public parent: Hierarchy,
    public critere: Critere,
    public regle: Regle
  ) {}
}