import Int "mo:base/Int";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
actor Citas {
 
  type Cita = {
    n : Nat;
    hour : Int;
    day : Text;
    pacient : Text;
    department : Text;
  };
  
  var citas : [Cita] = [{
    n = 1;
    hour = 3;
    day = "Jueves";
    pacient = "Daniel Arellano";
    department = "Traumatolgia";
  }];

  public func addCita(hour : Int, day : Text, pacient : Text, department : Text) : async Bool {
    let newN = Array.size(citas) + 1;
    let newCita = {
      n = newN;
      hour = hour;
      day = day;
      pacient = pacient;
      department = department;
    };

    citas := Array.append<Cita>(citas, [newCita]);
    return true;
  };
  
  public func getAllCitas() : async [Cita] {
    return citas;
  };

  public func getCitaByN(n : Nat) : async ?Cita {
    return Array.find<Cita>(citas, func(c) { c.n == n });
  };

  public func updateCita(n : Nat, hour : Int, day : Text, pacient : Text, department : Text) : async Bool {
    let citaToUpdate = Array.find<Cita>(citas, func(task) { task.n == n });

    switch (citaToUpdate) {
      case (null) { return false };
      case (?citaToUpdate) {
        let updateCita = {
          n = n;
          hour = hour;
          day = day;
          pacient = pacient;
          department = department;

        };
        citas := Array.map<Cita, Cita>(citas, func(c) { if (c.n == n) { updateCita } else { c } });
        return true;
      };
    };
  };

  public func deleteCita(n : Nat) : async Bool {
    let cita = Array.find<Cita>(citas, func(task) { task.n == n });
    if (cita != null) {
      citas := Array.filter<Cita>(citas, func(task) { task.n != n });
      return true;
    } else {
      return false;
    };
  };
};
